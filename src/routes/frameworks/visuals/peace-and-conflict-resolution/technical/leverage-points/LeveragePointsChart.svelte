<!-- LeveragePointsChart.svelte -->
<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import Chart from 'chart.js/auto';
  import { locale } from '$lib/i18n';
  
  export let data = [];
  export let maxTimeSteps = 60;
  export let title = 'Impact Levels Over Time';
  
  $: currentLocale = $locale;
  
  let chartCanvas;
  let chart;
  
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
              text: 'Impact Value'
            },
            min: 0,
            max: 10,
            ticks: {
              stepSize: 2
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
    
    // Create one dataset per leverage point
    const pointIds = data[0].leveragePoints.map(point => point.id);
    
    return pointIds.map(pointId => {
      // Find the first data point to get leverage point properties
      const pointInfo = data[0].leveragePoints.find(point => point.id === pointId);
      
      // Get all values for this point over time
      const values = data.map(d => {
        const pointData = d.leveragePoints.find(point => point.id === pointId);
        return pointData ? pointData.value : null;
      });
      
      // Extract proper localized label
      const pointLabel = typeof pointInfo.label === 'object' && pointInfo.label[currentLocale] 
        ? pointInfo.label[currentLocale] 
        : pointInfo.label;
      
      return {
        label: pointLabel,
        data: values,
        borderColor: pointInfo.color,
        backgroundColor: `${pointInfo.color}33`,
        borderWidth: 2,
        fill: false
      };
    });
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
