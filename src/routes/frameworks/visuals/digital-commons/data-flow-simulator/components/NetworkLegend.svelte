<!-- src/routes/frameworks/visuals/digital/data-flow-simulator/components/NetworkLegend.svelte -->
<script>
  // Legend items for network visualization
  const nodeTypes = [
    { type: 'local', label: 'Local Citizen Node', color: '#8b5cf6' },
    { type: 'regional', label: 'Regional Digital Hub', color: '#6d28d9' },
    { type: 'global', label: 'Global Council Node', color: '#4a1d96' },
    { type: 'device', label: 'Community Device', color: '#a78bfa' }
  ];
  
  const connectionTypes = [
    { type: 'main', label: 'Primary Connection', color: '#6d28d9', dash: 'none' },
    { type: 'backup', label: 'Backup Connection', color: '#a78bfa', dash: '5,5' },
    { type: 'regional', label: 'Regional Link', color: '#8b5cf6', dash: 'none' },
    { type: 'global', label: 'Global Link', color: '#4a1d96', dash: 'none' }
  ];
  
  const dataTypes = [
    { type: 'Health', label: 'Health Data', color: '#ef4444' },
    { type: 'Climate', label: 'Climate Data', color: '#10b981' },
    { type: 'Education', label: 'Education Data', color: '#3b82f6' },
    { type: 'Cultural', label: 'Cultural Data', color: '#f59e0b' }
  ];
  
  const indicators = [
    { label: 'Data Sovereignty Enabled', color: '#10b981' }
  ];
</script>

<div class="network-legend">
  <h3>Network Legend</h3>
  
  <div class="legend-section">
    <h4>Node Types</h4>
    <div class="legend-items">
      {#each nodeTypes as item}
        <div class="legend-item">
          <div class="symbol node-symbol" style="background-color: {item.color}"></div>
          <div class="label">{item.label}</div>
        </div>
      {/each}
    </div>
  </div>
  
  <div class="legend-section">
    <h4>Connection Types</h4>
    <div class="legend-items">
      {#each connectionTypes as item}
        <div class="legend-item">
          <div class="symbol connection-symbol">
            <svg width="30" height="6">
              <line 
                x1="0" y1="3" x2="30" y2="3" 
                stroke={item.color} 
                stroke-width="2" 
                stroke-dasharray={item.dash}
              />
            </svg>
          </div>
          <div class="label">{item.label}</div>
        </div>
      {/each}
    </div>
  </div>
  
  <div class="legend-section">
    <h4>Data Types</h4>
    <div class="legend-items">
      {#each dataTypes as item}
        <div class="legend-item">
          <div class="symbol data-symbol" style="background-color: {item.color}"></div>
          <div class="label">{item.label}</div>
        </div>
      {/each}
    </div>
  </div>
  
  <div class="legend-section">
    <h4>Indicators</h4>
    <div class="legend-items">
      {#each indicators as item}
        <div class="legend-item">
          <div class="symbol indicator-symbol" style="background-color: {item.color}"></div>
          <div class="label">{item.label}</div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .network-legend {
    position: absolute;
    bottom: 20px;
    right: 20px; /* Changed from left: 20px to right: 20px */
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    max-width: 250px;
    font-size: 0.8rem;
  }
  
  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: #4a1d96;
    font-size: 1rem;
  }
  
  h4 {
    margin: 0.5rem 0;
    color: #6d28d9;
    font-size: 0.9rem;
  }
  
  .legend-section {
    margin-bottom: 0.5rem;
  }
  
  .legend-items {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .symbol {
    width: 12px;
    height: 12px;
    border-radius: 3px;
    flex-shrink: 0;
  }
  
  .node-symbol {
    border-radius: 50%;
    border: 1px solid #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .connection-symbol {
    width: 30px;
    height: 2px;
  }
  
  .indicator-symbol {
    border-radius: 50%;
    width: 10px;
    height: 10px;
    border: 1px solid #fff;
  }
  
  .label {
    font-size: 0.8rem;
    color: #4b5563;
  }
</style>
