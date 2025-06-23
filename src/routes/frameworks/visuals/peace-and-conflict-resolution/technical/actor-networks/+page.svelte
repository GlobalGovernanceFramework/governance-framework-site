<!-- src/routes/frameworks/visuals/peace-and-conflict-resolution/technical/actor-networks/+page.svelte -->
<script>
  import NetworkVisualization from '$lib/components/Network/NetworkVisualization.svelte';
  import MetaTags from '$lib/components/MetaTags.svelte';
  import { onMount } from 'svelte';
  
  // Define state variables
  let networkType = 'formal-informal';
  let selectedView = 'global';
  let visualizationHeight = '600px';
  
  // For responsive design
  let windowWidth;
  
  // Adjust height based on window width for responsiveness
  $: if (windowWidth < 768) {
    visualizationHeight = '400px';
  } else {
    visualizationHeight = '600px';
  }
  
  // Handle network type change
  function handleNetworkTypeChange(event) {
    networkType = event.detail.type;
  }
  
  // Handle view change
  function handleViewChange(event) {
    selectedView = event.detail.view;
  }
  
  let networkComponent;
  
  onMount(() => {
    // Listen for window resize events
    const handleResize = () => {
      windowWidth = window.innerWidth;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<svelte:window bind:innerWidth={windowWidth} />

<MetaTags 
  title="Network Analysis of Peace Actors | Peace & Conflict Resolution Framework"
  description="Interactive visualizations of relationships between peace actors, including formal-informal connections, resource flows, influence analysis, and trust relationships."
  keywords="peace governance, network analysis, actor relationships, peacebuilding stakeholders, influence mapping, trust networks"
/>

<div class="container">
  <header>
    <h1>Network Analysis of Peace Actors</h1>
    <p class="subtitle">Visualizing relationships between peacebuilding stakeholders across different contexts</p>
  </header>

  <div class="visualization-container">
    <NetworkVisualization 
      bind:this={networkComponent}
      networkType={networkType}
      selectedView={selectedView}
      height={visualizationHeight}
      on:networkTypeChange={handleNetworkTypeChange}
      on:viewChange={handleViewChange}
    />
  </div>

  <div class="info-section">
    <h2>About Network Analysis</h2>
    <p>These interactive network visualizations map relationships between different actors in peace processes. By understanding how these diverse stakeholders connect, interact, and influence each other, we can identify key leverage points for effective peacebuilding interventions and strengthen collaborative approaches to conflict resolution.</p>
    
    <h3>Network Types</h3>
    <div class="network-types-grid">
      <div class="network-type-item">
        <h4>Formal-Informal Actor Networks</h4>
        <p>Visualizes connections between official institutions and grassroots initiatives, revealing how information flows between official diplomatic channels and community-based peacebuilding efforts.</p>
      </div>
      
      <div class="network-type-item">
        <h4>Resource Flow Mapping</h4>
        <p>Shows how funding and support move through the peacebuilding ecosystem, highlighting potential resource gaps and identifying efficient pathways for delivering peacebuilding support.</p>
      </div>
      
      <div class="network-type-item">
        <h4>Influence Analysis</h4>
        <p>Maps power relationships between key decision-makers and opinion leaders, revealing which actors have disproportionate influence and potential leverage points for promoting peace.</p>
      </div>
      
      <div class="network-type-item">
        <h4>Trust Relationship Matrices</h4>
        <p>Examines trust levels between conflict parties, showing where trust-building efforts should be focused and which relationships could be leveraged as bridges across conflict lines.</p>
      </div>
    </div>
  </div>

  <div class="instructions-panel">
    <h3>How to Use These Visualizations</h3>
    <ul>
      <li><strong>Select Network Type</strong>: Choose between different network analyses using the selector on the left.</li>
      <li><strong>Select Context</strong>: View networks in global or regional contexts from the view menu.</li>
      <li><strong>Explore Connections</strong>: Hover over nodes to see their connections highlighted. Click on nodes to view detailed information.</li>
      <li><strong>Adjust Layout</strong>: Use the layout controls to modify how the network is displayed, including zoom, clustering, and filtering options.</li>
    </ul>
  </div>

  <div class="context-section">
    <h2>Implementation Applications</h2>
    <p>Network analysis helps peacebuilding practitioners in several concrete ways:</p>
    <ul>
      <li><strong>Stakeholder Mapping</strong>: Identifying all relevant actors in a peace process and understanding their relationships</li>
      <li><strong>Resource Optimization</strong>: Finding the most efficient pathways for delivering support and addressing resource gaps</li>
      <li><strong>Bridge Building</strong>: Locating key individuals or organizations that can connect divided communities</li>
      <li><strong>Strategic Planning</strong>: Developing interventions that leverage existing networks rather than creating parallel structures</li>
      <li><strong>Early Warning</strong>: Monitoring relationship changes that might indicate increasing tensions or opportunities</li>
    </ul>
  </div>

  <footer>
    <p>© 2025 Global Governance Frameworks | <a href="https://www.globalgovernanceframeworks.org">www.globalgovernanceframeworks.org</a></p>
  </footer>
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    font-family: Arial, sans-serif;
  }
  
  header {
    margin-bottom: 2rem;
    text-align: center;
  }
  
  h1 {
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  .subtitle {
    color: #666;
    font-size: 1.2rem;
    margin-top: 0;
  }
  
  .visualization-container {
    margin-bottom: 2rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    background-color: #f8f9fa;
  }
  
  .info-section {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .network-types-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
  }
  
  .network-type-item {
    background-color: #f8f9fa;
    border-radius: 6px;
    padding: 1rem;
  }
  
  .network-type-item h4 {
    color: #2c3e50;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  
  .network-type-item p {
    color: #555;
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.4;
  }
  
  .instructions-panel {
    background-color: #f0f7ff;
    border: 1px solid #cce5ff;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .instructions-panel h3 {
    color: #0056b3;
    margin-top: 0;
  }
  
  .instructions-panel ul {
    padding-left: 1.5rem;
  }
  
  .instructions-panel li {
    margin-bottom: 0.75rem;
  }
  
  .context-section {
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .context-section ul {
    padding-left: 1.5rem;
  }
  
  .context-section li {
    margin-bottom: 0.5rem;
  }
  
  footer {
    text-align: center;
    color: #666;
    font-size: 0.9rem;
    margin-top: 3rem;
  }
  
  footer a {
    color: #666;
    text-decoration: none;
  }
  
  footer a:hover {
    text-decoration: underline;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }
    
    .network-types-grid {
      grid-template-columns: 1fr;
    }
    
    .subtitle {
      font-size: 1rem;
    }
  }
</style>
