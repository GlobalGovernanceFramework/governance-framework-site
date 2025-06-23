<!-- StockFlowChart.svelte -->
<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import Chart from 'chart.js/auto';
  import { locale } from '$lib/i18n';
  
  export let data = [];
  export let maxTimeSteps = 60;
  export let title = 'Stock Levels Over Time';
  
  let chartCanvas;
  let chart;
  
  // Subscribe to the locale store
  $: currentLocale = $locale;
  
  onMount(() => {
    if (data && data.length > 0) {
      initChart();
    }
  });
  
  afterUpdate(() => {
    if (data && data.length > 0) {
      if (chart) {
        updateChart();
      } else {
        initChart();
      }
    }
  });
  
  function initChart() {
    if (!chartCanvas) return;
    
    // Create the dataset structure for the chart
    const datasets = createDatasets();
    
    // Initialize the chart
    chart = new Chart(chartCanvas, {
      type: 'line',
      data: {
        labels: Array.from({ length: maxTimeSteps + 1 }, (_, i) => i.toString()),
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: title,
            font: {
              size: 16,
              weight: 'bold'
            }
          },
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time Steps'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Value'
            },
            min: 0,
            max: 100,
            ticks: {
              stepSize: 20
            }
          }
        },
        elements: {
          line: {
            tension: 0.3 // Smoother curves
          },
          point: {
            radius: 2, // Smaller points
            hoverRadius: 5
          }
        }
      }
    });
  }
  
  function updateChart() {
    if (!chart) return;
    
    // Update datasets
    chart.data.datasets = createDatasets();
    chart.update();
  }
  
  function createDatasets() {
    if (!data || data.length === 0) return [];
    
    // Create one dataset per stock
    const stockIds = data[0].stocks.map(stock => stock.id);
    
    return stockIds.map(stockId => {
      // Find the first data point to get stock properties
      const stockInfo = data[0].stocks.find(stock => stock.id === stockId);
      
      // Get all values for this stock over time
      const values = data.map(d => {
        const stockData = d.stocks.find(stock => stock.id === stockId);
        return stockData ? stockData.value : null;
      });
      
      // Extract the localized name based on current locale
      const stockName = typeof stockInfo.name === 'object' && stockInfo.name[currentLocale] 
        ? stockInfo.name[currentLocale]  // Use the localized name if available
        : stockInfo.name;                // Fallback to the name as is
      
      return {
        label: stockName,
        data: values,
        borderColor: stockInfo.color,
        backgroundColor: hexToRgba(stockInfo.color, 0.1),
        borderWidth: 2,
        fill: true
      };
    });
  }
  
  // Helper function to convert hex color to rgba with alpha
  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
</script>

<div class="chart-container">
  <canvas bind:this={chartCanvas}></canvas>
</div>

<style>
  .chart-container {
    height: 300px;
    width: 100%;
  }
</style>
