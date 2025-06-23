<!-- InterventionPanel.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { locale } from '$lib/i18n';
  import type { ConflictScenario } from './data/stockFlowScenarios.ts';
  
  export let scenario: ConflictScenario;
  
  $: currentLocale = $locale;
  
  const dispatch = createEventDispatcher();
  
  let selectedInterventions = [];
  
  // Translations for this component
  const translations = {
    en: {
      title: "Available Interventions",
      apply: "Apply",
      remove: "Remove",
      active: "Active Interventions",
      noActive: "No interventions active. Select from available options."
    },
    sv: {
      title: "Tillgängliga Interventioner",
      apply: "Tillämpa",
      remove: "Ta bort",
      active: "Aktiva Interventioner",
      noActive: "Inga interventioner aktiva. Välj från tillgängliga alternativ."
    }
  };
  
  $: texts = translations[currentLocale] || translations.en;
  
  function addIntervention(intervention) {
    // Check if the intervention is already applied
    if (!selectedInterventions.find(i => i.id === intervention.id)) {
      selectedInterventions = [...selectedInterventions, {
        id: intervention.id,
        targetFlow: intervention.targetFlow,
        targetStock: intervention.targetStock,
        multiplier: intervention.multiplier,
        directEffect: intervention.directEffect
      }];
      
      // Dispatch the event to notify parent component
      dispatch('change', {
        selectedInterventions
      });
    }
  }
  
  function removeIntervention(interventionId) {
    selectedInterventions = selectedInterventions.filter(i => i.id !== interventionId);
    
    // Dispatch the event to notify parent component
    dispatch('change', {
      selectedInterventions
    });
  }
</script>

<div class="intervention-panel">
  <!-- Available Interventions -->
  <div class="available-interventions">
    <h4>{texts.title}</h4>
    <div class="intervention-list">
      {#each scenario.availableInterventions as intervention}
        <div class="intervention-card">
          <div class="intervention-header">
            <span class="intervention-icon">{intervention.icon}</span>
            <span class="intervention-name">{intervention.name[currentLocale]}</span>
          </div>
          <p class="intervention-desc">{intervention.description[currentLocale]}</p>
          <button 
            class="apply-button"
            on:click={() => addIntervention(intervention)}
            disabled={selectedInterventions.some(i => i.id === intervention.id)}
          >
            {texts.apply}
          </button>
        </div>
      {/each}
    </div>
  </div>
  
  <!-- Active Interventions -->
  <div class="active-interventions">
    <h4>{texts.active}</h4>
    {#if selectedInterventions.length === 0}
      <p class="no-interventions">{texts.noActive}</p>
    {:else}
      <div class="active-intervention-list">
        {#each selectedInterventions as intervention}
          {@const interventionDef = scenario.availableInterventions.find(i => i.id === intervention.id)}
          <div class="active-intervention-card">
            <div class="active-intervention-content">
              <span class="intervention-icon">{interventionDef.icon}</span>
              <span class="intervention-name">{interventionDef.name[currentLocale]}</span>
            </div>
            <button 
              class="remove-button"
              on:click={() => removeIntervention(intervention.id)}
            >
              {texts.remove}
            </button>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .intervention-panel {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1.5rem;
  }
  
  h4 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #2C8A78;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .intervention-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .intervention-card {
    background-color: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .intervention-header {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  
  .intervention-icon {
    font-size: 1.25rem;
    margin-right: 0.5rem;
  }
  
  .intervention-name {
    font-weight: 600;
    font-size: 0.875rem;
  }
  
  .intervention-desc {
    font-size: 0.75rem;
    color: #4b5563;
    margin-bottom: 1rem;
    flex-grow: 1;
  }
  
  .apply-button {
    background-color: #2C8A78;
    color: white;
    border: none;
    border-radius: 0.25rem;
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .apply-button:hover {
    background-color: #216855;
  }
  
  .apply-button:disabled {
    background-color: #9CA3AF;
    cursor: not-allowed;
  }
  
  .active-intervention-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .active-intervention-card {
    background-color: #e6f6f4;
    border: 1px solid #2C8A78;
    border-radius: 0.25rem;
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .active-intervention-content {
    display: flex;
    align-items: center;
  }
  
  .remove-button {
    background-color: #EB5757;
    color: white;
    border: none;
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .remove-button:hover {
    background-color: #cb4b4b;
  }
  
  .no-interventions {
    font-size: 0.875rem;
    color: #6b7280;
    font-style: italic;
  }
  
  @media (max-width: 768px) {
    .intervention-panel {
      grid-template-columns: 1fr;
    }
  }
</style>
