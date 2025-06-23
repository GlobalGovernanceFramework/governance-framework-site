<!-- src/routes/frameworks/visuals/digital/data-flow-simulator/components/ControlPanel.svelte -->
<script>
  export let simulation;
  
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  function dispatchControl(action, value = null) {
    dispatch('control', { action, value });
  }
  
  function handleSpeedChange(e) {
    dispatchControl('speed', parseInt(e.target.value));
  }
  
  function toggleSovereignty() {
    dispatchControl('sovereignty', !simulation.sovereigntyMode);
  }
</script>

<div class="control-panel">
  <h3>Simulation Controls</h3>
  
  <div class="control-buttons">
    {#if simulation.running}
      <button class="btn pause" on:click={() => dispatchControl('pause')}>
        Pause
      </button>
    {:else}
      <button class="btn start" on:click={() => dispatchControl('start')}>
        Start
      </button>
    {/if}
    
    <button class="btn reset" on:click={() => dispatchControl('reset')}>
      Reset
    </button>
  </div>
  
  <div class="control-sliders">
    <label>
      Simulation Speed
      <input 
        type="range" 
        min="1" 
        max="10" 
        step="1" 
        value={simulation.speed} 
        on:input={handleSpeedChange}
      />
      <span class="value">{simulation.speed}x</span>
    </label>
  </div>
  
  <div class="control-toggles">
    <label class="toggle">
      <span>Data Sovereignty Mode</span>
      <div class="toggle-switch">
        <input 
          type="checkbox" 
          checked={simulation.sovereigntyMode}
          on:change={toggleSovereignty}
        />
        <span class="slider"></span>
      </div>
    </label>
  </div>
</div>

<style>
  .control-panel {
    background: white;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  h3 {
    margin-top: 0;
    color: #4a1d96;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  
  .control-buttons {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .btn {
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    flex: 1;
    transition: all 0.2s ease;
  }
  
  .start {
    background-color: #10b981;
    color: white;
  }
  
  .pause {
    background-color: #f59e0b;
    color: white;
  }
  
  .reset {
    background-color: #ef4444;
    color: white;
  }
  
  .btn:hover {
    filter: brightness(1.1);
    transform: translateY(-2px);
  }
  
  .control-sliders {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #4a1d96;
    font-size: 0.9rem;
  }
  
  input[type="range"] {
    width: 100%;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  .value {
    display: inline-block;
    margin-left: 0.5rem;
    font-weight: bold;
  }
  
  .toggle {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 24px;
  }
  
  .toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 24px;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
  
  input:checked + .slider {
    background-color: #10b981;
  }
  
  input:checked + .slider:before {
    transform: translateX(16px);
  }
</style>
