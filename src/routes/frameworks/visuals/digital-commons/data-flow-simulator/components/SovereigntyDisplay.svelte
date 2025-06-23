<!-- src/routes/frameworks/visuals/digital/data-flow-simulator/components/SovereigntyDisplay.svelte -->
<script>
  export let active = false;
  export let packet = null;
  
  import { fade, fly } from 'svelte/transition';
  import { getSovereigntyMessage } from '../utils/sovereigntyUtils';
  
  $: message = packet ? getSovereigntyMessage(packet, active) : '';
  $: dataType = packet?.data?.type || '';
  $: sovereigntyStatus = packet?.verified ? 'Verified' : 'Pending';
</script>

{#if active && packet}
  <div class="sovereignty-display" in:fade>
    <div class="header">
      <h4>Data Sovereignty Protocol</h4>
      <div class="status" class:verified={packet.verified}>
        {sovereigntyStatus}
      </div>
    </div>
    
    <div class="content">
      <div class="data-info">
        <div class="info-item">
          <span class="label">Data Type:</span>
          <span class="value">{dataType}</span>
        </div>
        <div class="info-item">
          <span class="label">Source:</span>
          <span class="value">{packet.source}</span>
        </div>
        <div class="info-item">
          <span class="label">Destination:</span>
          <span class="value">{packet.destination}</span>
        </div>
      </div>
      
      {#if packet.sovereigntyChecks.length > 0}
        <div class="verification-log">
          <h5>Verification Log</h5>
          {#each packet.sovereigntyChecks as check, i}
            <div 
              class="log-entry"
              in:fly={{ y: 20, delay: i * 100 }}
            >
              <span class="timestamp">{new Date(check.timestamp).toLocaleTimeString()}</span>
              <span class="check-status">{check.status}</span>
            </div>
          {/each}
        </div>
      {/if}
      
      <div class="message">
        {message}
      </div>
    </div>
  </div>
{/if}

<style>
  .sovereignty-display {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 300px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    border: 1px solid #8b5cf6;
  }
  
  .header {
    background: #8b5cf6;
    color: white;
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  h4 {
    margin: 0;
    font-size: 1rem;
  }
  
  h5 {
    margin: 0.5rem 0;
    font-size: 0.9rem;
    color: #4a1d96;
  }
  
  .status {
    background: #f59e0b;
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 3px;
    font-size: 0.8rem;
    font-weight: bold;
  }
  
  .status.verified {
    background: #10b981;
  }
  
  .content {
    padding: 1rem;
  }
  
  .data-info {
    margin-bottom: 1rem;
  }
  
  .info-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3rem;
    font-size: 0.9rem;
  }
  
  .label {
    color: #4a1d96;
    font-weight: bold;
  }
  
  .verification-log {
    border-top: 1px solid #e5e7eb;
    border-bottom: 1px solid #e5e7eb;
    padding: 0.5rem 0;
    margin-bottom: 1rem;
    max-height: 100px;
    overflow-y: auto;
  }
  
  .log-entry {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    padding: 0.3rem 0;
  }
  
  .timestamp {
    color: #6b7280;
  }
  
  .check-status {
    color: #10b981;
    font-weight: bold;
  }
  
  .message {
    font-size: 0.9rem;
    color: #4b5563;
    font-style: italic;
    text-align: center;
  }
</style>
