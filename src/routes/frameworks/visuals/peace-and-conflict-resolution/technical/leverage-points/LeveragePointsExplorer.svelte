<!-- LeveragePointsExplorer.svelte -->
<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import { locale } from '$lib/i18n';
  import { leveragePointScenarios, type LeveragePointScenario } from './data/leveragePointScenarios.ts';
  import LeveragePointsChart from './LeveragePointsChart.svelte';
  import LeveragePointsDiagram from './LeveragePointsDiagram.svelte';
  import InterventionPanel from './InterventionPanel.svelte';
  
  // Subscribe to i18n stores
  $: currentLocale = $locale;
  
  let selectedScenarioId = 'ethnic_conflict';
  let selectedScenario: LeveragePointScenario;
  
  let simulationData = [];
  let simulationRunning = false;
  let timeStep = 0;
  let maxTimeSteps = 60;
  let interventionActive = false;
  let selectedInterventions = [];
  let simulationSpeed = 500; // milliseconds between steps
  
  $: {
    selectedScenario = leveragePointScenarios.find(s => s.id === selectedScenarioId);
    resetSimulation();
  }
  
  const translations = {
    en: {
      title: "Leverage Points Explorer",
      scenarioLabel: "Select conflict scenario:",
      runSimulation: "Run Simulation",
      stopSimulation: "Stop Simulation",
      resetSimulation: "Reset Simulation",
      interventionSection: "Intervention Panel",
      timeStep: "Time Step:",
      of: "of",
      speedLabel: "Simulation Speed:",
      diagramSection: "System Diagram",
      simulationSection: "Simulation Results",
      impactLevels: "Impact Levels Over Time"
    },
    sv: {
      title: "Hävstångspunktsutforskare",
      scenarioLabel: "Välj konfliktscenario:",
      runSimulation: "Kör simulering",
      stopSimulation: "Stoppa simulering",
      resetSimulation: "Återställ simulering",
      interventionSection: "Interventionspanel",
      timeStep: "Tidssteg:",
      of: "av",
      speedLabel: "Simuleringshastighet:",
      diagramSection: "Systemdiagram",
      simulationSection: "Simuleringsresultat",
      impactLevels: "Effektnivåer över tid"
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
        leveragePoints: selectedScenario.leveragePoints.map(point => ({
          id: point.id,
          label: point.label,
          value: point.initialImpact,
          level: point.level,
          color: getLevelColor(point.level)
        }))
      }];
    }
  }
  
  function getLevelColor(level) {
    // Colors based on leverage point levels (1-12)
    if (level <= 3) return '#e74c3c'; // Paradigms (highest leverage) - Red
    if (level <= 6) return '#e67e22'; // Design/structure - Orange
    if (level <= 9) return '#f1c40f'; // Feedback/delays - Yellow
    return '#9b59b6'; // Parameters (lowest leverage) - Purple
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
    
    // Calculate new impact values based on interactions
    const newLeveragePoints = calculateNewImpactValues(currentState);
    
    // Add the new state to our data
    simulationData = [...simulationData, {
      timeStep: timeStep,
      leveragePoints: newLeveragePoints
    }];
    
    // Schedule the next step
    setTimeout(simulationStep, simulationSpeed);
  }
  
  function calculateNewImpactValues(currentState) {
    const newLeveragePoints = [];
    
    // Deep copy the current scenario to work with
    const scenarioCopy = JSON.parse(JSON.stringify(selectedScenario));
    
    // For each leverage point, calculate its new value based on connections
    scenarioCopy.leveragePoints.forEach(point => {
      // Find the current value of this leverage point
      const currentPointData = currentState.leveragePoints.find(p => p.id === point.id);
      let currentValue = currentPointData ? currentPointData.value : point.initialImpact;
      
      // Calculate influence from connected points
      let netInfluence = 0;
      
      // Add influences from connections
      scenarioCopy.connections.forEach(conn => {
        if (conn.target === point.id) {
          // Find source point
          const sourcePoint = currentState.leveragePoints.find(p => p.id === conn.source);
          
          if (sourcePoint) {
            // Calculate influence based on connection strength and source value
            const influence = (conn.strength / 10) * (sourcePoint.value / 10) * 0.2;
            netInfluence += influence;
          }
        }
      });
      
      // Apply influence from interventions (direct effects)
      selectedInterventions.forEach(intervention => {
        if (intervention.targetPoint === point.id) {
          netInfluence += intervention.directEffect;
        }
      });
      
      // Update value with constraints
      const newValue = Math.max(1, Math.min(10, currentValue + netInfluence));
      
      newLeveragePoints.push({
        id: point.id,
        label: point.label,
        value: newValue,
        level: point.level,
        color: getLevelColor(point.level)
      });
    });
    
    return newLeveragePoints;
  }
  
  function applyInterventions() {
    // Currently all active interventions are applied automatically
    // during the calculation of new impact values
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

<div class="explorer-container">
  <h2>{texts.title}</h2>
  
  <!-- Scenario Selection and Controls -->
  <div class="control-panel">
    <div class="scenario-selection">
      <label for="scenario-select">{texts.scenarioLabel}</label>
      <select id="scenario-select" bind:value={selectedScenarioId}>
        {#each leveragePointScenarios as scenario}
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
  <div class="simulation-content">
    <!-- Full-width System Diagram -->
    <div class="diagram-section">
      <h3>{texts.diagramSection}</h3>
      <LeveragePointsDiagram 
        scenario={selectedScenario} 
        currentData={simulationData[simulationData.length - 1]?.leveragePoints || []} 
        interventions={selectedInterventions}
      />
    </div>
    
    <!-- Results Chart (also full-width) -->
    <div class="results-section">
      <h3>{texts.simulationSection}</h3>
      <LeveragePointsChart 
        data={simulationData} 
        maxTimeSteps={maxTimeSteps}
        title={texts.impactLevels}
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
  .explorer-container {
    background-color: white;
    border-radius: 0.5rem;
  }
  
  h2 {
    font-size: 1.75rem;
    font-weight: 600;
    color: #9b59b6;
    margin-bottom: 1.5rem;
  }
  
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #9b59b6;
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
    cursor: pointer;
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
    background-color: #9b59b6;
    color: white;
  }
  
  .primary-button:hover {
    background-color: #8e44ad;
  }
  
  .secondary-button {
    background-color: #e74c3c;
    color: white;
  }
  
  .secondary-button:hover {
    background-color: #c0392b;
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
    color: #9b59b6;
  }
  
  .simulation-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .diagram-section, .results-section {
    background-color: white;
    border-radius: 0.5rem;
    padding: 1rem;
    border: 1px solid #e5e7eb;
    width: 100%;
  }
  
  /* Adjust the diagram height to be taller since it now has more horizontal space */
  .diagram-section {
    min-height: 600px; /* Increase the minimum height */
  }
  
  .diagram-section, .results-section {
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
