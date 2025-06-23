<!-- StockFlowDiagram.svelte -->
<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import type { ConflictScenario } from './data/stockFlowScenarios.ts';
  import { locale } from '$lib/i18n';
  
  export let scenario: ConflictScenario;
  export let currentData = [];
  export let interventions = [];
  
  $: currentLocale = $locale;
  
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let width = 0;
  let height = 0;
  
  const stockRadius = 60;
  const flowWidth = 6;
  const arrowSize = 12;
  
  onMount(() => {
    if (canvas) {
      ctx = canvas.getContext('2d');
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
    }
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  });
  
  function resizeCanvas() {
    const container = canvas.parentElement;
    width = container.clientWidth - 20; // Some padding
    height = 400;
    canvas.width = width;
    canvas.height = height;
    
    drawDiagram();
  }
  
  afterUpdate(() => {
    if (ctx && scenario) {
      drawDiagram();
    }
  });
  
  function drawDiagram() {
    if (!ctx || !scenario) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Calculate positions for stocks
    const stockPositions = calculateStockPositions();
    
    // Draw flows
    scenario.flows.forEach(flow => {
      drawFlow(flow, stockPositions);
    });
    
    // Draw stocks
    Object.entries(stockPositions).forEach(([stockId, position]) => {
      const stock = scenario.stocks.find(s => s.id === stockId);
      const currentStock = currentData.find(s => s.id === stockId);
      const value = currentStock ? currentStock.value : stock.initialValue;
      
      drawStock(stock, position, value);
    });
    
    // Draw active interventions
    drawInterventions(stockPositions);
  }
  
  function calculateStockPositions() {
    const positions = {};
    const numStocks = scenario.stocks.length;
    const padding = 100;
    
    // Position stocks in a circle
    if (numStocks <= 4) {
      // For 4 or fewer stocks, place them at cardinal points
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) / 2 - padding;
      
      scenario.stocks.forEach((stock, index) => {
        const angle = (index * Math.PI * 2 / numStocks) - Math.PI / 2;
        positions[stock.id] = {
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius
        };
      });
    } else {
      // For more stocks, arrange them horizontally
      const stockWidth = (width - padding * 2) / numStocks;
      
      scenario.stocks.forEach((stock, index) => {
        positions[stock.id] = {
          x: padding + stockWidth * (index + 0.5),
          y: height / 2
        };
      });
    }
    
    return positions;
  }
  
  function drawStock(stock, position, value) {
    // Draw stock circle
    ctx.beginPath();
    ctx.arc(position.x, position.y, stockRadius, 0, Math.PI * 2);
    ctx.fillStyle = hexToRgba(stock.color, 0.2);
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = stock.color;
    ctx.stroke();
    
    // Fill based on value (0-100%)
    ctx.beginPath();
    ctx.arc(position.x, position.y, stockRadius, 0, Math.PI * 2 * (value / 100));
    ctx.lineTo(position.x, position.y);
    ctx.fillStyle = hexToRgba(stock.color, 0.5);
    ctx.fill();
    
    // Draw stock name
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(stock.name[currentLocale], position.x, position.y - 15);
    
    // Draw stock value
    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = '#333';
    ctx.fillText(Math.round(value).toString(), position.x, position.y + 15);
  }
  
  function drawFlow(flow, stockPositions) {
    let startX, startY, endX, endY;
    let color = flow.isPositive ? '#2C8A78' : '#C1292E';
    
    // Check if any interventions affect this flow
    const affectedIntervention = interventions.find(i => i.targetFlow === flow.id);
    if (affectedIntervention) {
      color = '#6B5CA5'; // Highlight affected flows
    }
    
    // Determine flow endpoints
    if (flow.source && flow.target) {
      // Flow between two stocks
      const sourcePos = stockPositions[flow.source];
      const targetPos = stockPositions[flow.target];
      
      const angle = Math.atan2(targetPos.y - sourcePos.y, targetPos.x - sourcePos.x);
      
      startX = sourcePos.x + Math.cos(angle) * stockRadius;
      startY = sourcePos.y + Math.sin(angle) * stockRadius;
      endX = targetPos.x - Math.cos(angle) * stockRadius;
      endY = targetPos.y - Math.sin(angle) * stockRadius;
    } else if (flow.source) {
      // Outflow from a stock
      const sourcePos = stockPositions[flow.source];
      // Direct outflows point downward
      startX = sourcePos.x;
      startY = sourcePos.y + stockRadius;
      endX = sourcePos.x;
      endY = sourcePos.y + stockRadius + 50;
    } else if (flow.target) {
      // Inflow to a stock
      const targetPos = stockPositions[flow.target];
      // Direct inflows point upward
      startX = targetPos.x;
      startY = targetPos.y - stockRadius - 50;
      endX = targetPos.x;
      endY = targetPos.y - stockRadius;
    }
    
    // Draw the flow line
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.lineWidth = flowWidth;
    ctx.strokeStyle = color;
    ctx.stroke();
    
    // Draw arrowhead
    drawArrowhead(endX, endY, Math.atan2(endY - startY, endX - startX), color);
    
    // Draw flow label (for key flows)
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    const offsetX = (flow.source && flow.target) ? 15 : 0;
    const offsetY = (flow.source && flow.target) ? 15 : 0;
    
    ctx.font = '12px Arial';
    ctx.fillStyle = '#555';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Only draw short labels for readability
    const shortName = flow.name[currentLocale].length > 20 
      ? flow.name[currentLocale].substr(0, 17) + '...' 
      : flow.name[currentLocale];
      
    ctx.fillText(shortName, midX + offsetX, midY + offsetY);
  }
  
  function drawArrowhead(x, y, angle, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-arrowSize, -arrowSize / 2);
    ctx.lineTo(-arrowSize, arrowSize / 2);
    ctx.closePath();
    
    ctx.fillStyle = color;
    ctx.fill();
    
    ctx.restore();
  }
  
  function drawInterventions(stockPositions) {
    interventions.forEach(intervention => {
      // Find the intervention definition
      const interventionDef = scenario.availableInterventions.find(i => i.id === intervention.id);
      if (!interventionDef) return;
      
      // Determine where to draw the intervention icon
      let x, y;
      
      if (interventionDef.targetFlow) {
        // Position near the affected flow
        const flow = scenario.flows.find(f => f.id === interventionDef.targetFlow);
        if (!flow) return;
        
        if (flow.source && flow.target) {
          // Flow between two stocks
          const sourcePos = stockPositions[flow.source];
          const targetPos = stockPositions[flow.target];
          x = (sourcePos.x + targetPos.x) / 2;
          y = (sourcePos.y + targetPos.y) / 2 - 25;
        } else if (flow.source) {
          // Outflow
          const sourcePos = stockPositions[flow.source];
          x = sourcePos.x + 25;
          y = sourcePos.y + stockRadius + 25;
        } else if (flow.target) {
          // Inflow
          const targetPos = stockPositions[flow.target];
          x = targetPos.x + 25;
          y = targetPos.y - stockRadius - 25;
        }
      } else if (interventionDef.targetStock) {
        // Position near the affected stock
        const stockPos = stockPositions[interventionDef.targetStock];
        x = stockPos.x + stockRadius + 15;
        y = stockPos.y;
      }
      
      // Draw intervention icon with a background circle
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.fillStyle = '#6B5CA5';
      ctx.fill();
      
      ctx.font = '16px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(interventionDef.icon, x, y);
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

<div class="diagram-container">
  <canvas bind:this={canvas}></canvas>
  
  <div class="diagram-legend">
    <div class="legend-item">
      <div class="legend-box stock-box"></div>
      <span>Stocks (Accumulations)</span>
    </div>
    <div class="legend-item">
      <div class="legend-box flow-positive"></div>
      <span>Positive Flows</span>
    </div>
    <div class="legend-item">
      <div class="legend-box flow-negative"></div>
      <span>Negative Flows</span>
    </div>
    <div class="legend-item">
      <div class="legend-box intervention-highlight"></div>
      <span>Active Interventions</span>
    </div>
  </div>
</div>

<style>
  .diagram-container {
    width: 100%;
    height: 450px;
    background-color: white;
    border-radius: 0.5rem;
    overflow: hidden;
    position: relative;
  }
  
  canvas {
    display: block;
    background-color: #fcfcfc;
    border: 1px solid #e5e7eb;
    border-radius: 0.25rem;
  }
  
  .diagram-legend {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 0.75rem;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .legend-box {
    width: 16px;
    height: 16px;
    border-radius: 3px;
  }
  
  .stock-box {
    background-color: rgba(44, 138, 120, 0.2);
    border: 2px solid #2C8A78;
  }
  
  .flow-positive {
    background-color: #2C8A78;
  }
  
  .flow-negative {
    background-color: #C1292E;
  }
  
  .intervention-highlight {
    background-color: #6B5CA5;
  }
</style>
