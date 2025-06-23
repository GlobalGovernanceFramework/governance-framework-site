<!-- src/routes/frameworks/visuals/digital/data-flow-simulator/components/InfoPanel.svelte -->
<script>
  export let selectedNode = null;
  export let stats = {};
  export let activePackets = 0;
  
  $: nodeInfo = selectedNode ? {
    name: selectedNode.name,
    type: formatNodeType(selectedNode.type),
    location: selectedNode.location,
    dataSovereignty: selectedNode.dataSovereignty ? 'Enabled' : 'Disabled',
    connections: selectedNode.connections?.length || 0
  } : null;
  
  function formatNodeType(type) {
    switch(type) {
      case 'local': return 'Local Citizen Node';
      case 'regional': return 'Regional Digital Hub';
      case 'global': return 'Global Council Node';
      case 'device': return 'Community Device';
      default: return type;
    }
  }
</script>

<div class="info-panel">
  <h3>Network Information</h3>
  
  {#if selectedNode}
    <div class="selected-node">
      <h4>{nodeInfo.name}</h4>
      
      <div class="info-grid">
        <div class="info-label">Type:</div>
        <div class="info-value">{nodeInfo.type}</div>
        
        <div class="info-label">Location:</div>
        <div class="info-value">{nodeInfo.location}</div>
        
        <div class="info-label">Data Sovereignty:</div>
        <div class="info-value">{nodeInfo.dataSovereignty}</div>
        
        <div class="info-label">Connections:</div>
        <div class="info-value">{nodeInfo.connections}</div>
      </div>
    </div>
  {:else}
    <div class="no-selection">
      <p>Click on a node to see detailed information</p>
    </div>
  {/if}
  
  <div class="stats-section">
    <h4>Simulation Statistics</h4>
    
    <div class="stat-item">
      <div class="stat-label">Active Data Packets:</div>
      <div class="stat-value">{activePackets}</div>
    </div>
    
    <div class="stat-item">
      <div class="stat-label">Data Transfers:</div>
      <div class="stat-value">{stats.transfers || 0}</div>
    </div>
    
    <div class="stat-item">
      <div class="stat-label">Sovereignty Checks:</div>
      <div class="stat-value">{stats.sovereigntyChecks || 0}</div>
    </div>
    
    <div class="stat-item">
      <div class="stat-label">Network Efficiency:</div>
      <div class="stat-value">{stats.efficiency || 0}%</div>
    </div>
  </div>
</div>

<style>
  .info-panel {
    background: white;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  
  h3 {
    margin-top: 0;
    color: #4a1d96;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  
  h4 {
    color: #6d28d9;
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }
  
  .selected-node {
    margin-bottom: 1.5rem;
  }
  
  .info-grid {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.5rem;
    font-size: 0.9rem;
  }
  
  .info-label {
    font-weight: bold;
    color: #4a1d96;
  }
  
  .info-value {
    color: #333;
  }
  
  .no-selection {
    font-style: italic;
    color: #6b7280;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .stats-section {
    margin-top: auto;
    border-top: 1px solid #e5e7eb;
    padding-top: 1rem;
  }
  
  .stat-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }
  
  .stat-label {
    color: #4a1d96;
  }
  
  .stat-value {
    font-weight: bold;
  }
</style>
