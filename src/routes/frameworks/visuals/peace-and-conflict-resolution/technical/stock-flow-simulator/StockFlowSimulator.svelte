<!-- StockFlowSimulator.svelte -->
<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import { locale } from '$lib/i18n';
  import { conflictScenarios, type ConflictScenario } from './data/stockFlowScenarios.ts';
  import StockFlowDiagram from './StockFlowDiagram.svelte';
  import StockFlowChart from './StockFlowChart.svelte';
  import InterventionPanel from './InterventionPanel.svelte';
  
  $: currentLocale = $locale;
  
  let selectedScenarioId = 'resource_conflict';
  let selectedScenario: ConflictScenario;
  
  let simulationData = [];
  let simulationRunning = false;
  let timeStep = 0;
  let maxTimeSteps = 60;
  let interventionActive = false;
  let selectedInterventions = [];
  let simulationSpeed = 500; // milliseconds between steps
  
  $: {
    selectedScenario = conflictScenarios.find(s => s.id === selectedScenarioId);
    resetSimulation();
  }
  
  const translations = {
    en: {
      title: "Stock & Flow Simulator",
      scenarioLabel: "Select conflict scenario:",
      runSimulation: "Run Simulation",
      stopSimulation: "Stop Simulation",
      resetSimulation: "Reset Simulation",
      interventionSection: "Intervention Panel",
      timeStep: "Time Step:",
      of: "of",
      speedLabel: "Simulation Speed:",
      stockFlowSection: "Stock & Flow Diagram",
      simulationSection: "Simulation Results",
      stockLevels: "Stock Levels Over Time"
    },
    sv: {
      title: "Lager- och Flödessimulator",
      scenarioLabel: "Välj konfliktscenario:",
      runSimulation: "Kör simulering",
      stopSimulation: "Stoppa simulering",
      resetSimulation: "Återställ simulering",
      interventionSection: "Interventionspanel",
      timeStep: "Tidssteg:",
      of: "av",
      speedLabel: "Simuleringshastighet:",
      stockFlowSection: "Lager- och Flödesdiagram",
      simulationSection: "Simuleringsresultat",
      stockLevels: "Lagernivåer över tid"
    }
  };
  
  $: texts = translations[currentLocale] || translations.en;
  
  function resetSimulation() {
    simulationRunning = false;
    timeStep = 0;
    simulationData = [];
    selectedInterventions = [];
    
    // Initialize with starting values
    if (selectedScenario) {
      simulationData = [{
        timeStep: 0,
        stocks: selectedScenario.stocks.map(stock => ({
          id: stock.id,
          name: stock.name,
          value: stock.initialValue,
          color: stock.color
        }))
      }];
    }
  }
  
  function runSimulation() {
    if (!simulationRunning) {
      simulationRunning = true;
      simulationStep();
    }
  }
  
  function stopSimulation() {
    simulationRunning = false;
  }
  
  function simulationStep() {
    if (!simulationRunning || timeStep >= maxTimeSteps) {
      simulationRunning = false;
      return;
    }
    
    timeStep++;
    
    // Apply active interventions if any
    applyInterventions();
    
    // Get the current state (last data point)
    const currentState = simulationData[simulationData.length - 1];
    
    // Calculate new stock values based on flows
    const newStocks = calculateNewStockValues(currentState);
    
    // Add the new state to our data
    simulationData = [...simulationData, {
      timeStep: timeStep,
      stocks: newStocks
    }];
    
    // Schedule the next step
    setTimeout(simulationStep, simulationSpeed);
  }
  
  function calculateNewStockValues(currentState) {
    const newStocks = [];
    
    // Deep copy the current scenario to work with
    const scenarioCopy = JSON.parse(JSON.stringify(selectedScenario));
    
    // For each stock, calculate its new value based on inflows and outflows
    scenarioCopy.stocks.forEach(stock => {
      // Find the current value of this stock
      const currentStockData = currentState.stocks.find(s => s.id === stock.id);
      let currentValue = currentStockData ? currentStockData.value : stock.initialValue;
      
      // Calculate net flow (inflows - outflows)
      let netFlow = 0;
      
      // Add inflows
      scenarioCopy.flows.forEach(flow => {
        if (flow.target === stock.id) {
          // Calculate flow value, potentially based on other stocks
          let flowValue = flow.baseRate;
          
          // If the flow depends on a source stock
          if (flow.source) {
            const sourceStock = currentState.stocks.find(s => s.id === flow.source);
            if (sourceStock) {
              // The flow is proportional to the source stock value
              flowValue *= (sourceStock.value / 100);
            }
          }
          
          // Apply flow modifiers based on active interventions
          selectedInterventions.forEach(intervention => {
            if (intervention.targetFlow === flow.id) {
              flowValue *= intervention.multiplier;
            }
          });
          
          netFlow += flowValue;
        }
      });
      
      // Subtract outflows
      scenarioCopy.flows.forEach(flow => {
        if (flow.source === stock.id) {
          // Calculate flow value
          let flowValue = flow.baseRate;
          
          // The flow is proportional to this stock's value
          flowValue *= (currentValue / 100);
          
          // Apply flow modifiers based on active interventions
          selectedInterventions.forEach(intervention => {
            if (intervention.targetFlow === flow.id) {
              flowValue *= intervention.multiplier;
            }
          });
          
          netFlow -= flowValue;
        }
      });
      
      // Apply direct stock modifications from interventions
      selectedInterventions.forEach(intervention => {
        if (intervention.targetStock === stock.id && intervention.directEffect) {
          netFlow += intervention.directEffect;
        }
      });
      
      // Calculate the new value with limits
      const newValue = Math.max(0, Math.min(100, currentValue + netFlow));
      
      newStocks.push({
        id: stock.id,
        name: stock.name,
        value: newValue,
        color: stock.color
      });
    });
    
    return newStocks;
  }
  
  function applyInterventions() {
    // Currently all active interventions are applied automatically
    // during the calculation of new stock values
  }
  
  function handleInterventionChange(event) {
    selectedInterventions = event.detail.selectedInterventions;
  }
  
  function handleSpeedChange(event) {
    simulationSpeed = event.target.value;
  }
  
  onMount(() => {
    resetSimulation();
  });
</script>

<div class="simulator-container">
  <h2>{texts.title}</h2>
  
  <!-- Scenario Selection and Controls -->
  <div class="control-panel">
    <div class="scenario-selection">
      <label for="scenario-select">{texts.scenarioLabel}</label>
      <select id="scenario-select" bind:value={selectedScenarioId}>
        {#each conflictScenarios as scenario}
          <option value={scenario.id}>{scenario.name[currentLocale]}</option>
        {/each}
      </select>
    </div>
    
    <div class="simulation-controls">
      {#if !simulationRunning}
        <button on:click={runSimulation} class="primary-button">
          {texts.runSimulation}
        </button>
      {:else}
        <button on:click={stopSimulation} class="secondary-button">
          {texts.stopSimulation}
        </button>
      {/if}
      <button on:click={resetSimulation} class="tertiary-button">
        {texts.resetSimulation}
      </button>
    </div>
    
    <div class="speed-control">
      <label for="speed-slider">{texts.speedLabel}</label>
      <input 
        id="speed-slider" 
        type="range" 
        min="100" 
        max="1000" 
        step="100" 
        bind:value={simulationSpeed} 
        on:change={handleSpeedChange}
      />
    </div>
  </div>
  
  <!-- Simulation Status -->
  <div class="simulation-status">
    <div class="status-badge">
      <span>{texts.timeStep}</span>
      <span class="time-value">{timeStep}</span>
      <span>{texts.of} {maxTimeSteps}</span>
    </div>
  </div>
  
  <!-- Main Simulation Area -->
  <div class="simulation-grid">
    <!-- Left: Stock & Flow Diagram -->
    <div class="stock-flow-section">
      <h3>{texts.stockFlowSection}</h3>
      <StockFlowDiagram 
        scenario={selectedScenario} 
        currentData={simulationData[simulationData.length - 1]?.stocks || []} 
        interventions={selectedInterventions}
      />
    </div>
    
    <!-- Right: Results Chart -->
    <div class="results-section">
      <h3>{texts.simulationSection}</h3>
      <StockFlowChart 
        data={simulationData} 
        maxTimeSteps={maxTimeSteps}
        title={texts.stockLevels}
      />
    </div>
  </div>
  
  <!-- Intervention Panel -->
  <div class="intervention-section">
    <h3>{texts.interventionSection}</h3>
    <InterventionPanel 
      scenario={selectedScenario}
      on:change={handleInterventionChange}
    />
  </div>
</div>

<style>
  .simulator-container {
    background-color: white;
    border-radius: 0.5rem;
  }
  
  h2 {
    font-size: 1.75rem;
    font-weight: 600;
    color: #2C8A78;
    margin-bottom: 1.5rem;
  }
  
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2C8A78;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  /* Control Panel */
  .control-panel {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background-color: #f9fafb;
    border-radius: 0.5rem;
  }
  
  .scenario-selection {
    grid-column: 1 / 2;
  }
  
  .scenario-selection label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #4b5563;
  }
  
  .scenario-selection select {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #d1d5db;
    font-size: 0.875rem;
  }
  
  .simulation-controls {
    grid-column: 2 / 3;
    display: flex;
    gap: 0.75rem;
    align-items: flex-end;
  }
  
  .speed-control {
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .speed-control label {
    font-weight: 500;
    color: #4b5563;
  }
  
  .speed-control input {
    width: 100%;
  }
  
  /* Buttons */
  .primary-button, .secondary-button, .tertiary-button {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    font-weight: 500;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid transparent;
  }
  
  .primary-button {
    background-color: #2C8A78;
    color: white;
  }
  
  .primary-button:hover {
    background-color: #216855;
  }
  
  .secondary-button {
    background-color: #EB5757;
    color: white;
  }
  
  .secondary-button:hover {
    background-color: #cb4b4b;
  }
  
  .tertiary-button {
    background-color: white;
    color: #4b5563;
    border-color: #d1d5db;
  }
  
  .tertiary-button:hover {
    background-color: #f9fafb;
  }
  
  /* Simulation Status */
  .simulation-status {
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: center;
  }
  
  .status-badge {
    background-color: #f9fafb;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #4b5563;
  }
  
  .time-value {
    font-weight: 600;
    font-size: 1.25rem;
    color: #2C8A78;
  }
  
  /* Simulation Grid */
  .simulation-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .stock-flow-section, .results-section {
    background-color: white;
    border-radius: 0.5rem;
    padding: 1rem;
    border: 1px solid #e5e7eb;
  }
  
  .intervention-section {
    background-color: #f9fafb;
    border-radius: 0.5rem;
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
  
  /* Responsive styles */
  @media (max-width: 768px) {
    .control-panel {
      grid-template-columns: 1fr;
    }
    
    .scenario-selection, .simulation-controls {
      grid-column: 1;
    }
    
    .simulation-grid {
      grid-template-columns: 1fr;
    }
    
    .simulation-controls {
      flex-direction: column;
    }
    
    .primary-button, .secondary-button, .tertiary-button {
      width: 100%;
    }
  }
</style>
