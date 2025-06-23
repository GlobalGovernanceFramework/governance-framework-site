<!-- src/routes/frameworks/visuals/digital/data-flow-simulator/components/HelpModal.svelte -->
<script>
  export let show = false;
  
  import { fade, fly } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  function close() {
    dispatch('close');
  }
</script>

{#if show}
  <div class="modal-backdrop" on:click={close} in:fade={{ duration: 200 }}>
    <div 
      class="modal-content"
      on:click|stopPropagation
      in:fly={{ y: 20, duration: 300 }}
    >
      <div class="modal-header">
        <h2>Data Flow Simulator Guide</h2>
        <button class="close-button" on:click={close}>×</button>
      </div>
      
      <div class="modal-body">
        <section>
          <h3>About This Simulator</h3>
          <p>
            The Data Flow Simulator demonstrates how information travels through the Digital Commons Framework network while preserving community data sovereignty. This interactive visualization shows the movement of different data types between Local Citizen Nodes, Regional Hubs, and the Global Council.
          </p>
        </section>
        
        <section>
          <h3>Understanding the Network</h3>
          <p>
            The network consists of various node types:
          </p>
          <ul>
            <li><strong>Local Citizen Nodes</strong>: Community-level governance of digital resources</li>
            <li><strong>Regional Digital Hubs</strong>: Coordinate across multiple local nodes</li>
            <li><strong>Global Council</strong>: Establishes framework-wide policies and standards</li>
          </ul>
          <p>
            Nodes with a green indicator have data sovereignty protocols enabled, allowing them to verify and manage sensitive data transfers.
          </p>
        </section>
        
        <section>
          <h3>Data Sovereignty Mode</h3>
          <p>
            When Data Sovereignty Mode is enabled, data transfers are subject to verification at sovereignty checkpoints. This ensures communities maintain control over their data while allowing beneficial sharing.
          </p>
          <p>
            You'll notice that packets with sovereignty requirements will show a green verification effect at checkpoints, indicating the data transfer has been authorized according to community protocols.
          </p>
        </section>
        
        <section>
          <h3>Interacting with the Simulator</h3>
          <ul>
            <li>Click on nodes to view detailed information</li>
            <li>Click on data packets to see transfer details and sovereignty status</li>
            <li>Use the scenario selector to explore different network configurations</li>
            <li>Adjust simulation speed to control visualization pace</li>
            <li>Toggle Data Sovereignty Mode to see its impact on the network</li>
          </ul>
        </section>
        
        <section>
          <h3>Exploring Scenarios</h3>
          <p>
            Try different scenarios to see how the Digital Commons Framework adapts to various contexts:
          </p>
          <ul>
            <li><strong>Basic Framework</strong>: Core network structure</li>
            <li><strong>Health Data Sharing</strong>: Prioritizes privacy for sensitive health information</li>
            <li><strong>Cultural Knowledge</strong>: Demonstrates Indigenous data sovereignty</li>
            <li><strong>Disaster Response</strong>: Shows adaptive connections during emergencies</li>
          </ul>
        </section>
      </div>
      
      <div class="modal-footer">
        <button class="start-button" on:click={close}>Start Exploring</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    border-radius: 10px;
    width: 90%;
    max-width: 700px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }
  
  .modal-header {
    padding: 1rem;
    background: #4a1d96;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px 10px 0 0;
  }
  
  .modal-header h2 {
    margin: 0;
    font-size: 1.4rem;
  }
  
  .close-button {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  .modal-body {
    padding: 1rem;
  }
  
  section {
    margin-bottom: 1.5rem;
  }
  
  h3 {
    color: #6d28d9;
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }
  
  p {
    margin: 0.5rem 0;
    color: #4b5563;
    line-height: 1.5;
  }
  
  ul {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
    color: #4b5563;
  }
  
  li {
    margin-bottom: 0.3rem;
  }
  
  .modal-footer {
    padding: 1rem;
    display: flex;
    justify-content: center;
    border-top: 1px solid #e5e7eb;
  }
  
  .start-button {
    background: #6d28d9;
    color: white;
    border: none;
    padding: 0.6rem 1.5rem;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .start-button:hover {
    background: #4a1d96;
    transform: translateY(-2px);
  }
</style>
