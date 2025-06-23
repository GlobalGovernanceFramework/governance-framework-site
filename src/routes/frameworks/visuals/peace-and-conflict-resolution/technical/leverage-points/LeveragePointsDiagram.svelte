<!-- LeveragePointsDiagram.svelte -->
<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import type { LeveragePointScenario } from './data/leveragePointScenarios.ts';
  import { locale } from '$lib/i18n';
  
  export let scenario: LeveragePointScenario;
  export let currentData = [];
  export let interventions = [];
  
  $: currentLocale = $locale;
  
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let width = 0;
  let height = 0;
  
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
    height = 600; // Match the height set in CSS
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
    
    // Draw boundaries first (if available)
    if (scenario.boundaries) {
      scenario.boundaries.forEach(boundary => {
        drawBoundary(boundary);
      });
    }
    
    // Draw connections
    if (scenario.connections) {
      scenario.connections.forEach(connection => {
        drawConnection(connection);
      });
    }
    
    // Draw leverage points
    if (scenario.leveragePoints) {
      scenario.leveragePoints.forEach(point => {
        // Find current impact
        const currentPoint = currentData.find(p => p.id === point.id);
        const impact = currentPoint ? currentPoint.value : point.initialImpact;
        
        drawLeveragePoint(point, impact);
      });
    }
    
    // Draw elements (if they exist)
    if (scenario.elements) {
      scenario.elements.forEach(element => {
        drawElement(element);
      });
    }
    
    // Draw active interventions
    drawInterventions();
  }
  
  function drawBoundary(boundary) {
    const { points, label, color, id } = boundary;
    if (!points || points.length < 3) return;
    
    // Draw boundary area
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    
    ctx.closePath();
    ctx.fillStyle = color ? `${color}33` : '#f0f0f033';
    ctx.strokeStyle = color || '#777';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 3]);
    ctx.fill();
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw label if available
    if (label) {
      const centerX = points.reduce((sum, p) => sum + p.x, 0) / points.length;
      const centerY = points.reduce((sum, p) => sum + p.y, 0) / points.length;
      
      ctx.font = 'bold 14px Arial';
      ctx.fillStyle = '#555';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label[currentLocale] || label, centerX, centerY);
    }
  }
  
  function drawLeveragePoint(point, impact) {
    const { x, y, label, level, id } = point;
    const size = 25 + (impact / 10) * 15; // Size based on impact
    
    // Check if this point has an active intervention
    const isAffected = interventions.some(i => i.targetPoint === id);
    
    // Set color based on leverage level (1-12, with 1 being highest)
    let fillColor;
    let strokeColor;
    
    if (level <= 3) {
      // Paradigm/goals levels - highest leverage
      fillColor = '#e74c3c';
      strokeColor = '#c0392b';
    } else if (level <= 6) {
      // Rules/information levels - medium high leverage
      fillColor = '#e67e22';
      strokeColor = '#d35400';
    } else if (level <= 9) {
      // Feedback/delay levels - medium low leverage
      fillColor = '#f1c40f';
      strokeColor = '#f39c12';
    } else {
      // Buffer/parameter levels - lowest leverage
      fillColor = '#9b59b6';
      strokeColor = '#8e44ad';
    }
    
    // Highlight if affected by intervention
    if (isAffected) {
      strokeColor = '#3498db';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#3498db';
    }
    
    // Draw hexagon for leverage points
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const pointX = x + Math.sin(angle) * (size / 2);
      const pointY = y - Math.cos(angle) * (size / 2);
      
      if (i === 0) {
        ctx.moveTo(pointX, pointY);
      } else {
        ctx.lineTo(pointX, pointY);
      }
    }
    ctx.closePath();
    
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = isAffected ? 3 : 2;
    ctx.fill();
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowBlur = 0;
    
    // Draw label
    ctx.font = '12px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label[currentLocale] || label, x, y);
    
    // Draw level and impact indicators
    ctx.font = 'bold 10px Arial';
    ctx.fillText(`L${level} - ${impact.toFixed(1)}`, x, y + size / 2 + 15);
  }
  
  function drawElement(element) {
    const { x, y, label, type, id } = element;
    const size = 20;
    
    // Set styles based on element type
    let fillColor;
    let strokeColor;
    
    if (type === 'actor') {
      fillColor = '#3498db';
      strokeColor = '#2980b9';
    } else if (type === 'resource') {
      fillColor = '#2ecc71';
      strokeColor = '#27ae60';
    } else if (type === 'process') {
      fillColor = '#f1c40f';
      strokeColor = '#f39c12';
    } else {
      fillColor = '#bdc3c7';
      strokeColor = '#95a5a6';
    }
    
    // Draw shape based on type
    ctx.beginPath();
    
    if (type === 'process') {
      // Rounded rectangle for process
      const rectWidth = 70;
      const rectHeight = 40;
      const radius = 8;
      
      ctx.moveTo(x - rectWidth/2 + radius, y - rectHeight/2);
      ctx.lineTo(x + rectWidth/2 - radius, y - rectHeight/2);
      ctx.quadraticCurveTo(x + rectWidth/2, y - rectHeight/2, x + rectWidth/2, y - rectHeight/2 + radius);
      ctx.lineTo(x + rectWidth/2, y + rectHeight/2 - radius);
      ctx.quadraticCurveTo(x + rectWidth/2, y + rectHeight/2, x + rectWidth/2 - radius, y + rectHeight/2);
      ctx.lineTo(x - rectWidth/2 + radius, y + rectHeight/2);
      ctx.quadraticCurveTo(x - rectWidth/2, y + rectHeight/2, x - rectWidth/2, y + rectHeight/2 - radius);
      ctx.lineTo(x - rectWidth/2, y - rectHeight/2 + radius);
      ctx.quadraticCurveTo(x - rectWidth/2, y - rectHeight/2, x - rectWidth/2 + radius, y - rectHeight/2);
    } else if (type === 'resource') {
      // Circle for resource
      ctx.arc(x, y, size, 0, Math.PI * 2);
    } else if (type === 'actor') {
      // Triangle for actor
      ctx.moveTo(x, y - size);
      ctx.lineTo(x + size, y + size);
      ctx.lineTo(x - size, y + size);
      ctx.closePath();
    } else {
      // Default square
      ctx.rect(x - size, y - size, size * 2, size * 2);
    }
    
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();
    
    // Draw label
    ctx.font = '11px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    if (type === 'process') {
      ctx.fillText(label[currentLocale] || label, x, y);
    } else {
      // Position label below other shapes
      ctx.fillText(label[currentLocale] || label, x, y + size + 12);
    }
  }
  
  function drawConnection(connection) {
    const { source, target, strength, id } = connection;
    
    // Find source and target objects
    let sourceObj, targetObj;
    
    if (source.startsWith('lp')) {
      sourceObj = scenario.leveragePoints.find(p => p.id === source);
    } else if (source.startsWith('elem')) {
      sourceObj = scenario.elements.find(e => e.id === source);
    }
    
    if (target.startsWith('lp')) {
      targetObj = scenario.leveragePoints.find(p => p.id === target);
    } else if (target.startsWith('elem')) {
      targetObj = scenario.elements.find(e => e.id === target);
    }
    
    if (!sourceObj || !targetObj) return;
    
    // Check if this connection has an active intervention
    const isAffected = interventions.some(i => i.targetConnection === id);
    
    // Calculate control point for curved line
    const dx = targetObj.x - sourceObj.x;
    const dy = targetObj.y - sourceObj.y;
    const controlX = sourceObj.x + dx / 2 - dy / 6;
    const controlY = sourceObj.y + dy / 2 + dx / 6;
    
    // Set styles based on influence strength
    let strokeColor;
    let lineWidth = 1 + (strength / 10) * 2;
    
    if (strength > 7) {
      strokeColor = '#2c3e50';
    } else if (strength > 4) {
      strokeColor = '#7f8c8d';
    } else {
      strokeColor = '#95a5a6';
    }
    
    // Highlight if affected by intervention
    if (isAffected) {
      strokeColor = '#3498db';
      lineWidth += 1;
      ctx.shadowBlur = 5;
      ctx.shadowColor = '#3498db';
    }
    
    // Draw curved line
    ctx.beginPath();
    ctx.moveTo(sourceObj.x, sourceObj.y);
    ctx.quadraticCurveTo(controlX, controlY, targetObj.x, targetObj.y);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowBlur = 0;
    
    // Draw arrowhead
    drawArrowhead(
      controlX, 
      controlY, 
      targetObj.x, 
      targetObj.y,
      strokeColor
    );
    
    // Draw influence strength
    if (strength) {
      ctx.font = 'bold 11px Arial';
      ctx.fillStyle = strokeColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(strength.toString(), controlX, controlY - 10);
    }
  }
  
  // Draw active interventions
  function drawInterventions() {
    interventions.forEach(intervention => {
      // Find the intervention definition
      const interventionDef = scenario.availableInterventions.find(i => i.id === intervention.id);
      if (!interventionDef) return;
      
      // Determine where to draw the intervention icon
      let x, y;
      let targetObj;
      
      if (intervention.targetPoint) {
        // Intervention targets a leverage point
        targetObj = scenario.leveragePoints.find(p => p.id === intervention.targetPoint);
        if (!targetObj) return;
        
        // Position near the leverage point
        x = targetObj.x + 40;
        y = targetObj.y - 20;
      } else if (intervention.targetConnection) {
        // Intervention targets a connection
        const connection = scenario.connections.find(c => c.id === intervention.targetConnection);
        if (!connection) return;
        
        // Find source and target objects
        const sourceObj = scenario.leveragePoints.find(p => p.id === connection.source) ||
                         scenario.elements.find(e => e.id === connection.source);
        const targetObj = scenario.leveragePoints.find(p => p.id === connection.target) ||
                         scenario.elements.find(e => e.id === connection.target);
        
        if (!sourceObj || !targetObj) return;
        
        // Position near the middle of the connection
        const dx = targetObj.x - sourceObj.x;
        const dy = targetObj.y - sourceObj.y;
        x = sourceObj.x + dx / 2 + 30;
        y = sourceObj.y + dy / 2 - 30;
      } else {
        return; // No valid target
      }
      
      // Draw intervention icon
      ctx.beginPath();
      ctx.arc(x, y, 18, 0, Math.PI * 2);
      ctx.fillStyle = '#3498db';
      ctx.fill();
      
      ctx.font = '20px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(interventionDef.icon, x, y);
      
      // Draw a connection line to the target
      if (targetObj) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(targetObj.x, targetObj.y);
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    });
  }
  
  // Helper function to draw arrowhead
  function drawArrowhead(fromX, fromY, toX, toY, color) {
    const headLength = 10;
    const angle = Math.atan2(toY - fromY, toX - fromX);
    
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(
      toX - headLength * Math.cos(angle - Math.PI / 6),
      toY - headLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
      toX - headLength * Math.cos(angle + Math.PI / 6),
      toY - headLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    
    ctx.fillStyle = color;
    ctx.fill();
  }
</script>

<div class="diagram-container">
  <canvas bind:this={canvas}></canvas>
  
  <div class="diagram-legend">
    <div class="legend-title">Legend</div>
    <!-- Leverage Point Levels -->
    <div class="legend-section">
      <div class="legend-heading">Leverage Point Levels</div>
      <div class="legend-item">
        <div class="legend-color" style="background-color: #e74c3c;"></div>
        <span>High (Paradigms) - L1-3</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background-color: #e67e22;"></div>
        <span>Medium-High (Design) - L4-6</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background-color: #f1c40f;"></div>
        <span>Medium-Low (Feedback) - L7-9</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background-color: #9b59b6;"></div>
        <span>Low (Parameters) - L10-12</span>
      </div>
    </div>
    
    <!-- Element Types -->
    <div class="legend-section">
      <div class="legend-heading">System Elements</div>
      <div class="legend-item">
        <div class="legend-color" style="background-color: #3498db;"></div>
        <span>Actors</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background-color: #2ecc71;"></div>
        <span>Resources</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background-color: #f1c40f;"></div>
        <span>Processes</span>
      </div>
    </div>
    
    <!-- Interventions -->
    <div class="legend-section">
      <div class="legend-item">
        <div class="legend-color" style="background-color: #3498db;"></div>
        <span>Active Interventions</span>
      </div>
    </div>
  </div>
</div>

<style>
  .diagram-container {
    width: 100%;
    height: 600px; /* Increase from 400px to 600px */
    position: relative;
    background-color: white;
    border-radius: 0.5rem;
    overflow: hidden;
  }
  
  canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
  
  .diagram-legend {
    position: absolute;
    bottom: 10px;
    right: 10px; /* Change from left to right */
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #e5e7eb;
    max-width: 220px;
    font-size: 12px;
    z-index: 10;
  }
  
  .legend-title {
    font-weight: bold;
    margin-bottom: 5px;
    color: #2c3e50;
  }
  
  .legend-section {
    margin-bottom: 10px;
  }
  
  .legend-heading {
    font-weight: 600;
    font-size: 11px;
    color: #7f8c8d;
    margin-bottom: 3px;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    margin-bottom: 3px;
  }
  
  .legend-color {
    width: 12px;
    height: 12px;
    border-radius: 2px;
    margin-right: 6px;
  }
</style>
