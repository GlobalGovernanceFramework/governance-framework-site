<!-- src/lib/components/FrameworkIntegrationMap.svelte -->
<script>
  import { onMount } from 'svelte';
  
  let selectedNode = '';
  let hoveredNode = '';
  
  const connectionInfos = {
    'indigenous': {
      title: '🔴 Indigenous Governance Framework',
      relationship: 'Foundational Authority',
      description: 'The Earth Council has ultimate veto power over Hearts implementations. Indigenous communities control implementation in their territories and provide traditional knowledge that guides cultural adaptation.',
      dataFlow: 'Traditional knowledge → Hearts cultural protocols → Community sovereignty protection',
      keyFeature: 'Red Lines Clause ensures sacred knowledge and practices remain protected regardless of economic incentives.'
    },
    'meta': {
      title: '🟣 Meta-Governance Framework', 
      relationship: 'Coordination Infrastructure',
      description: 'The Social Resilience Council operates as a specialized coordination council under Meta-Governance. Hearts communities participate in bioregional coordination while maintaining local sovereignty.',
      dataFlow: 'LMCI metrics → Reflexivity Engines → Polycentric coordination recommendations',
      keyFeature: 'Hearts networks provide mutual aid during emergencies coordinated through Meta-Governance protocols.'
    },
    'treaty': {
      title: '🟣 Treaty for Our Only Home',
      relationship: 'Legal Foundation and Funding',
      description: 'The Treaty\'s Pillar 4 provides funding through automation taxes and resource levies. Leaves NFTs coordinate with ecocide law enforcement for ecological restoration.',
      dataFlow: 'Global Commons Fund → Hearts infrastructure → Community climate adaptation',
      keyFeature: 'International legal framework protects community currencies and Indigenous economic sovereignty.'
    },
    'aubi': {
      title: '🔵 Adaptive Universal Basic Income',
      relationship: 'Shared Infrastructure',
      description: 'Hearts and Leaves operate as Layer 2 and 3 of the four-layer AUBI system. They share the Love Ledger platform and Community Weaver networks.',
      dataFlow: 'Hearts bonuses for care work integrate with AUBI Layer 2 contributions',
      keyFeature: 'Social Resilience Council coordinates both systems while maintaining community democratic control.'
    },
    'work': {
      title: '🔵 Work in Liberation Framework',
      relationship: 'Complementary Systems',
      description: 'Hearts reward care and ecological work organized through Community Work Teams. The Fractal Labor Parliament sets valuation standards for Hearts per care-hour.',
      dataFlow: 'Community Work Teams → Hearts validation → Labor rights coordination',
      keyFeature: 'Green Job Score provides Leaves NFT multipliers for restoration work.'
    },
    'climate': {
      title: '🟠 Climate & Energy Governance',
      relationship: 'Just Transition Support',
      description: 'Hearts support workers during fossil fuel industry transition. Leaves NFTs reward carbon sequestration and ecosystem restoration.',
      dataFlow: 'Community energy projects → Hearts funding → Climate adaptation',
      keyFeature: 'Hearts provide community-controlled funding for climate adaptation projects.'
    },
    'planetary': {
      title: '🟠 Planetary Health Governance',
      relationship: 'Ecological Coordination',
      description: 'LMCI Connection metrics integrate with Biosphere Health Index. Leaves NFTs demonstrate community contribution to planetary boundary respect.',
      dataFlow: 'Ecosystem restoration → Leaves NFTs → Planetary health metrics',
      keyFeature: 'Hearts recognize Indigenous practices that maintain ecosystem health.'
    }
  };
  
  function selectNode(nodeId) {
    if (selectedNode === nodeId) {
      selectedNode = '';
    } else {
      selectedNode = nodeId;
    }
  }
  
  function hoverNode(nodeId) {
    hoveredNode = nodeId;
  }
  
  function clearHover() {
    hoveredNode = '';
  }
  
  // Connection line configurations
  const connections = [
    { from: 'financial', to: 'indigenous', type: 'primary', color: '#f44336' },
    { from: 'financial', to: 'meta', type: 'primary', color: '#9c27b0' },
    { from: 'financial', to: 'treaty', type: 'primary', color: '#9c27b0' },
    { from: 'financial', to: 'aubi', type: 'secondary', color: '#2196f3' },
    { from: 'financial', to: 'work', type: 'secondary', color: '#2196f3' },
    { from: 'financial', to: 'climate', type: 'secondary', color: '#ff9800' },
    { from: 'financial', to: 'planetary', type: 'secondary', color: '#ff9800' }
  ];
  
  // Node positions
  const nodes = {
    financial: { x: 500, y: 300, r: 60, color: '#4caf50', label: 'Hearts &\nLeaves', sublabel: 'Financial Systems' },
    indigenous: { x: 200, y: 150, r: 50, color: '#f44336', label: 'Indigenous\nGovernance', sublabel: 'Earth Council Authority' },
    meta: { x: 500, y: 100, r: 45, color: '#9c27b0', label: 'Meta-\nGovernance', sublabel: 'Coordination Hub' },
    treaty: { x: 800, y: 150, r: 50, color: '#9c27b0', label: 'Treaty\nFramework', sublabel: 'Legal Foundation' },
    aubi: { x: 300, y: 400, r: 40, color: '#2196f3', label: 'AUBI\nSystem', sublabel: 'Shared Infrastructure' },
    work: { x: 700, y: 400, r: 40, color: '#2196f3', label: 'Work in\nLiberation', sublabel: 'Labor Organization' },
    climate: { x: 150, y: 450, r: 35, color: '#ff9800', label: 'Climate &\nEnergy', sublabel: 'Just Transition' },
    planetary: { x: 850, y: 450, r: 35, color: '#ff9800', label: 'Planetary\nHealth', sublabel: 'Ecosystem Restoration' }
  };
  
  function getConnectionOpacity(connection) {
    if (selectedNode) {
      return (selectedNode === connection.from || selectedNode === connection.to) ? 1 : 0.2;
    }
    if (hoveredNode) {
      return (hoveredNode === connection.from || hoveredNode === connection.to) ? 0.8 : 0.3;
    }
    return connection.type === 'primary' ? 0.7 : 0.5;
  }
  
  function getConnectionWidth(connection) {
    if (selectedNode && (selectedNode === connection.from || selectedNode === connection.to)) {
      return 5;
    }
    return connection.type === 'primary' ? 3 : 2;
  }
  
  function getNodeScale(nodeId) {
    if (selectedNode === nodeId) return 1.1;
    if (hoveredNode === nodeId) return 1.05;
    return 1;
  }
  
  function getNodeBrightness(nodeId) {
    if (selectedNode === nodeId) return 1.2;
    if (hoveredNode === nodeId) return 1.1;
    if (selectedNode && selectedNode !== nodeId) return 0.7;
    return 1;
  }
</script>

<div class="framework-map-container">
  <div class="header">
    <h1>Framework Integration Map</h1>
    <p>How Hearts & Leaves Connect with Global Governance Systems</p>
  </div>
  
  <div class="legend">
    <div class="legend-item">
      <div class="legend-color" style="background: #4caf50;"></div>
      <span>Financial Systems (Hearts & Leaves)</span>
    </div>
    <div class="legend-item">
      <div class="legend-color" style="background: #f44336;"></div>
      <span>Indigenous Governance</span>
    </div>
    <div class="legend-item">
      <div class="legend-color" style="background: #2196f3;"></div>
      <span>Economic Frameworks</span>
    </div>
    <div class="legend-item">
      <div class="legend-color" style="background: #ff9800;"></div>
      <span>Planetary Systems</span>
    </div>
    <div class="legend-item">
      <div class="legend-color" style="background: #9c27b0;"></div>
      <span>Governance & Democracy</span>
    </div>
  </div>

  <div class="svg-container">
    <svg width="100%" height="600" viewBox="0 0 1000 600">
      <!-- Connection Lines -->
      {#each connections as connection}
        <line 
          x1={nodes[connection.from].x} 
          y1={nodes[connection.from].y} 
          x2={nodes[connection.to].x} 
          y2={nodes[connection.to].y}
          stroke={connection.color}
          stroke-width={getConnectionWidth(connection)}
          opacity={getConnectionOpacity(connection)}
          class="connection-line"
        />
      {/each}

      <!-- Framework Nodes -->
      {#each Object.entries(nodes) as [nodeId, node]}
        <g class="node-group">
          <!-- Node circle -->
          <circle 
            cx={node.x} 
            cy={node.y} 
            r={node.r}
            fill={node.color}
            class="framework-node"
            class:selected={selectedNode === nodeId}
            style="transform: scale({getNodeScale(nodeId)}); filter: brightness({getNodeBrightness(nodeId)}); transform-origin: {node.x}px {node.y}px;"
            on:click={() => selectNode(nodeId)}
            on:mouseenter={() => hoverNode(nodeId)}
            on:mouseleave={clearHover}
          />
          
          <!-- Node text -->
          <text 
            x={node.x} 
            y={node.y - 5} 
            class="framework-text"
            style="pointer-events: none;"
          >
            {#each node.label.split('\n') as line, i}
              <tspan x={node.x} dy={i === 0 ? 0 : 15}>{line}</tspan>
            {/each}
          </text>
          
          <!-- Node sublabel -->
          <text 
            x={node.x} 
            y={node.y + node.r + 20} 
            class="framework-label"
            style="pointer-events: none;"
          >
            {node.sublabel}
          </text>
        </g>
      {/each}

      <!-- Data flow indicators -->
      <text x="350" y="230" class="flow-indicator">↑ Traditional Knowledge</text>
      <text x="500" y="200" class="flow-indicator">↑ LMCI Data</text>
      <text x="650" y="230" class="flow-indicator">↑ Commons Funding</text>
    </svg>
  </div>

  <div class="info-panel">
    <h3>How Integration Works</h3>
    <p><strong>Click on any framework above</strong> to see how it connects with Hearts & Leaves systems. This map shows the key relationships that make community currencies part of a larger transformation toward regenerative economics and planetary health.</p>
    
    {#if selectedNode && connectionInfos[selectedNode]}
      <div class="connection-info" transition:slide>
        <h4>{connectionInfos[selectedNode].title}</h4>
        <p><strong>Relationship:</strong> {connectionInfos[selectedNode].relationship}</p>
        <p><strong>How it works:</strong> {connectionInfos[selectedNode].description}</p>
        <p><strong>Data flows:</strong> {connectionInfos[selectedNode].dataFlow}</p>
        <p><strong>Key feature:</strong> {connectionInfos[selectedNode].keyFeature}</p>
        
        <button 
          class="close-btn" 
          on:click={() => selectedNode = ''}
          aria-label="Close information panel"
        >
          ✕
        </button>
      </div>
    {/if}
  </div>

  <div class="integration-examples">
    <div class="example-card">
      <h4>Real-World Example: Community Climate Adaptation</h4>
      <p>A coastal community faces sea level rise. Hearts networks provide mutual aid for relocation. The Treaty's Global Commons Fund provides emergency funding. Indigenous knowledge guides adaptation strategies. Leaves NFTs reward ecosystem restoration that builds coastal resilience.</p>
    </div>

    <div class="example-card">
      <h4>Policy Integration: Municipal Hearts Pilot</h4>
      <p>A city partners with Hearts communities: accepts Hearts for park permits, integrates with AUBI pilot programs, funds Community Weaver training, and coordinates with Indigenous communities under Earth Council protocols.</p>
    </div>

    <div class="example-card">
      <h4>Crisis Coordination: Economic Shock Response</h4>
      <p>Traditional banking fails during crisis. Hearts networks maintain community economic function. Meta-Governance coordinates mutual aid. AUBI provides emergency income. Communities share resources through bioregional Hearts circulation.</p>
    </div>
  </div>
</div>

<style>
  .framework-map-container {
    max-width: 1200px;
    margin: 2rem auto;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
    text-align: center;
  }
  
  .header h1 {
    margin: 0 0 0.5rem 0;
    font-size: 2.5em;
    font-weight: 300;
  }
  
  .header p {
    margin: 0;
    font-size: 1.2em;
    opacity: 0.9;
  }
  
  .legend {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin: 2rem;
    flex-wrap: wrap;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: #333;
  }
  
  .legend-color {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  
  .svg-container {
    padding: 1rem 2rem;
  }
  
  .connection-line {
    transition: opacity 0.3s ease, stroke-width 0.3s ease;
  }
  
  .framework-node {
    cursor: pointer;
    transition: all 0.25s ease;
  }
  
  .framework-node.selected {
    stroke: #333;
    stroke-width: 3;
  }
  
  .framework-text {
    font-size: 11px;
    font-weight: 600;
    text-anchor: middle;
    dominant-baseline: central;
    fill: white;
    user-select: none;
  }
  
  .framework-label {
    font-size: 12px;
    font-weight: 500;
    text-anchor: middle;
    fill: #555;
    user-select: none;
  }
  
  .flow-indicator {
    font-size: 10px;
    fill: #666;
    text-anchor: middle;
    user-select: none;
  }
  
  .info-panel {
    margin: 2rem;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #667eea;
    position: relative;
  }
  
  .info-panel h3 {
    margin: 0 0 1rem 0;
    color: #333;
  }
  
  .connection-info {
    margin-top: 1.5rem;
    padding: 1.5rem;
    background: #e3f2fd;
    border-radius: 6px;
    border-left: 3px solid #2196f3;
    position: relative;
  }
  
  .connection-info h4 {
    margin: 0 0 1rem 0;
    color: #1976d2;
    font-size: 1.1rem;
  }
  
  .connection-info p {
    margin: 0.5rem 0;
    line-height: 1.5;
  }
  
  .close-btn {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: #666;
    padding: 0.25rem;
    border-radius: 3px;
    transition: all 0.2s ease;
  }
  
  .close-btn:hover {
    background: rgba(0,0,0,0.1);
    color: #333;
  }
  
  .integration-examples {
    margin: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  .example-card {
    padding: 1.5rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    border-left: 4px solid #4caf50;
  }
  
  .example-card h4 {
    margin: 0 0 1rem 0;
    color: #2e7d32;
    font-size: 1rem;
  }
  
  .example-card p {
    margin: 0;
    line-height: 1.5;
    color: #555;
    font-size: 0.9rem;
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .framework-map-container {
      margin: 1rem;
    }
    
    .header {
      padding: 1.5rem;
    }
    
    .header h1 {
      font-size: 2rem;
    }
    
    .legend {
      gap: 1rem;
      margin: 1rem;
    }
    
    .legend-item {
      font-size: 0.8rem;
    }
    
    .svg-container {
      padding: 0.5rem 1rem;
    }
    
    .info-panel,
    .integration-examples {
      margin: 1rem;
    }
    
    .integration-examples {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }
</style>
