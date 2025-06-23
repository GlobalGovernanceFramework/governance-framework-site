<!-- src/routes/frameworks/visuals/digital/data-flow-simulator/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import Node from './components/Node.svelte';
  import DataPacket from './components/DataPacket.svelte';
  import Connection from './components/Connection.svelte';
  import ControlPanel from './components/ControlPanel.svelte';
  import InfoPanel from './components/InfoPanel.svelte';
  import ScenarioSelector from './components/ScenarioSelector.svelte';
  import NetworkLegend from './components/NetworkLegend.svelte';
  import SovereigntyDisplay from './components/SovereigntyDisplay.svelte';
  import HelpModal from './components/HelpModal.svelte';
  import { simulationStore } from './stores/simulation';
  import { networkStore } from './stores/network';
  import { checkDataSovereignty, processSovereigntyCheck, calculateEfficiencyImpact } from './utils/sovereigntyUtils';
  
  // Subscribe to stores
  $: simulation = $simulationStore;
  $: network = $networkStore;
  
  // Active packets being visualized
  let activePackets = [];
  let packetId = 0;
  let selectedPacket = null;
  
  // Selected node for detailed info
  let selectedNode = null;
  
  // Window dimensions for responsive sizing
  let width = 0;
  let height = 0;

  let showHelp = true; // Show help on first load

  function closeHelp() {
    showHelp = false;
  }
  
  function handleNodeClick(node) {
    selectedNode = node.id === selectedNode?.id ? null : node;
  }
  
  function handlePacketClick(packet) {
    selectedPacket = packet;
  }
  
  function sendPacket(source, destination, data) {
    const sourceNode = network.nodes.find(n => n.id === source);
    const destNode = network.nodes.find(n => n.id === destination);
    
    if (!sourceNode || !destNode) return;
    
    // Check if transfer is allowed by sovereignty rules
    const allowed = checkDataSovereignty(
      { data }, 
      sourceNode, 
      destNode, 
      simulation.sovereigntyMode
    );
    
    if (!allowed) {
      // If not allowed, we could show an error or silent drop
      console.log("Transfer blocked by sovereignty rules");
      return;
    }
    
    const newPacket = {
      id: packetId++,
      source,
      destination,
      data,
      progress: 0,
      path: findPath(source, destination),
      sovereigntyChecks: [],
      verified: false
    };
    
    activePackets = [...activePackets, newPacket];
    
    // Process sovereignty check at midpoint
    setTimeout(() => {
      if (data.sovereignty && simulation.sovereigntyMode) {
        activePackets = activePackets.map(p => 
          p.id === newPacket.id ? processSovereigntyCheck(p, simulation.sovereigntyMode) : p
        );
        
        // Update simulation stats
        simulationStore.incrementSovereigntyChecks();
      }
    }, (simulation.packetSpeed * 500)); // At 50% of journey
    
    // Increment transfer counter
    simulationStore.incrementTransfers();
    
    // Remove packet when animation completes
    setTimeout(() => {
      activePackets = activePackets.filter(p => p.id !== newPacket.id);
      // If this was the selected packet, clear selection
      if (selectedPacket?.id === newPacket.id) {
        selectedPacket = null;
      }
    }, simulation.packetSpeed * 1000);
  }
  
  function findPath(source, destination) {
    // Look for direct connection
    let connection = network.connections.find(c => 
      (c.source.id === source && c.target.id === destination) || 
      (c.source.id === destination && c.target.id === source)
    );
    
    // If found, return it
    if (connection) return connection;
    
    // Otherwise find first connection from source (simplified path finding)
    const sourceNode = network.nodes.find(n => n.id === source);
    if (sourceNode && sourceNode.connections.length > 0) {
      const firstConnId = sourceNode.connections[0];
      return network.connections.find(c => 
        (c.source.id === source && c.target.id === firstConnId) || 
        (c.source.id === firstConnId && c.target.id === source)
      );
    }
    
    // Fallback
    return network.connections[0];
  }
  
  function handleScenarioChange(event) {
    const scenario = event.detail;
    networkStore.loadScenario(scenario);
    simulationStore.reset();
    activePackets = [];
    selectedNode = null;
    selectedPacket = null;
  }
  
  function handleSimulationControl(event) {
    const { action, value } = event.detail;
    
    switch(action) {
      case 'start':
        simulationStore.start();
        break;
      case 'pause':
        simulationStore.pause();
        break;
      case 'reset':
        simulationStore.reset();
        activePackets = [];
        selectedPacket = null;
        break;
      case 'speed':
        simulationStore.setSpeed(value);
        break;
      case 'sovereignty':
        simulationStore.setSovereigntyMode(value);
        // Clear packets when toggling sovereignty mode
        activePackets = [];
        selectedPacket = null;
        break;
    }
  }
  
  onMount(() => {
    const interval = setInterval(() => {
      if (!simulation.running) return;
      
      // Update packet positions
      activePackets = activePackets.map(packet => ({
        ...packet,
        progress: Math.min(1, packet.progress + 0.01 * simulation.speed)
      }));
      
      // Create new packets periodically based on network activity
      if (Math.random() < 0.05 * simulation.speed) {
        const sourceIdx = Math.floor(Math.random() * network.nodes.length);
        let destIdx;
        do {
          destIdx = Math.floor(Math.random() * network.nodes.length);
        } while (destIdx === sourceIdx);
        
        const source = network.nodes[sourceIdx].id;
        const destination = network.nodes[destIdx].id;
        
        const dataTypes = ['Health', 'Climate', 'Education', 'Cultural'];
        const randomData = {
          type: dataTypes[Math.floor(Math.random() * dataTypes.length)],
          size: Math.floor(Math.random() * 50) + 10,
          sovereignty: Math.random() < 0.7 // 70% of data has sovereignty requirements
        };
        
        sendPacket(source, destination, randomData);
      }
      
      // Update efficiency based on active packets
      const efficiency = calculateEfficiencyImpact(activePackets, simulation.sovereigntyMode);
      simulationStore.updateEfficiency(efficiency);
      
    }, 50); // 20 frames per second
    
    return () => clearInterval(interval);
  });
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<div class="simulator-container">
  <header>
    <div class="header-content">
      <h1>Data Flow Simulator</h1>
      <h2>Digital Commons Framework</h2>
    </div>
    <button class="help-button" on:click={() => showHelp = true}>
      Help
    </button>
  </header>
  
  <div class="main-content">
    <div class="network-visualization">
      <svg width={width * 0.75} height={height * 0.7}>
        <!-- Connections -->
        {#each network.connections as connection}
          <Connection {connection} />
        {/each}
        
        <!-- Nodes -->
        {#each network.nodes as node}
          <Node 
            {node} 
            isSelected={selectedNode?.id === node.id}
            on:click={() => handleNodeClick(node)}
          />
        {/each}
        
        <!-- Data Packets -->
        {#each activePackets as packet (packet.id)}
          <DataPacket 
            {packet} 
            sovereigntyMode={simulation.sovereigntyMode}
            isSelected={selectedPacket?.id === packet.id}
            on:click={() => handlePacketClick(packet)}
          />
        {/each}
      </svg>
      
      <!-- Legends and overlays -->
      <NetworkLegend />
      <SovereigntyDisplay 
        active={simulation.sovereigntyMode} 
        packet={selectedPacket} 
      />
    </div>
    
    <div class="side-panel">
      <ScenarioSelector scenarios={network.scenarios} on:change={handleScenarioChange} />
      
      <ControlPanel 
        {simulation}
        on:control={handleSimulationControl}
      />
      
      <InfoPanel 
        selectedNode={selectedNode} 
        stats={{
          ...simulation.stats,
          transfers: simulation.stats.transfers,
          sovereigntyChecks: simulation.stats.sovereigntyChecks,
          efficiency: simulation.stats.efficiency
        }}
        activePackets={activePackets.length}
      />
    </div>
  </div>
  
  <footer>
    <p>Digital Commons Framework - Data Flow Simulator</p>
    <p class="footnote">Demonstrating how information flows while preserving community control through data sovereignty protocols</p>
  </footer>

  <HelpModal show={showHelp} on:close={closeHelp} />
</div>

<style>
  .simulator-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: linear-gradient(135deg, #f5f3ff, #ede9fe);
    color: #4a1d96;
    font-family: Arial, sans-serif;
  }
  
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
  }

  .header-content {
    text-align: center;
  }

  .help-button {
    background: #6d28d9;
    color: white;
    border: none;
    padding: 0.4rem 1rem;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .help-button:hover {
    background: #4a1d96;
    transform: translateY(-2px);
  }
  
  h1 {
    font-size: 1.8rem;
    margin-bottom: 0.3rem;
    color: #4a1d96;
  }
  
  h2 {
    font-size: 1.2rem;
    font-weight: normal;
    margin-top: 0;
    color: #6d28d9;
  }
  
  .main-content {
    display: flex;
    flex: 1;
    padding: 0 1rem;
  }
  
  .network-visualization {
    flex: 3;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    position: relative;
  }
  
  .side-panel {
    flex: 1;
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  footer {
    text-align: center;
    padding: 1rem;
    font-size: 0.9rem;
    color: #6d28d9;
  }
  
  .footnote {
    font-size: 0.8rem;
    margin-top: 0.2rem;
    color: #8b5cf6;
  }
  
  @media (max-width: 768px) {
    .main-content {
      flex-direction: column;
    }
    
    .side-panel {
      margin-left: 0;
      margin-top: 1rem;
    }
  }
</style>
