<!-- src/routes/frameworks/visuals/digital/data-flow-simulator/components/ScenarioSelector.svelte -->
<script>
  export let scenarios = [];
  
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  function handleChange(e) {
    const selectedScenario = scenarios.find(s => s.id === e.target.value);
    dispatch('change', selectedScenario);
  }
</script>

<div class="scenario-selector">
  <h3>Network Scenarios</h3>
  
  <select on:change={handleChange}>
    {#each scenarios as scenario}
      <option value={scenario.id}>{scenario.name}</option>
    {/each}
  </select>
  
  <div class="scenario-description">
    {#if scenarios.length > 0}
      <p>{scenarios[0].description}</p>
    {/if}
  </div>
</div>

<style>
  .scenario-selector {
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
  
  select {
    width: 100%;
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #d1d5db;
    margin-bottom: 1rem;
    color: #4a1d96;
    font-weight: bold;
  }
  
  .scenario-description {
    font-size: 0.9rem;
    color: #4b5563;
    line-height: 1.4;
  }
</style>
