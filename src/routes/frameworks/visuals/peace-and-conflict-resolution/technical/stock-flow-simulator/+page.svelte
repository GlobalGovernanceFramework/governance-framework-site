<!-- src/routes/frameworks/visuals/peace-and-conflict-resolution/technical/stock-flow-simulator/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { t, locale } from '$lib/i18n';
  import MetaTags from '$lib/components/MetaTags.svelte';
  import StockFlowSimulator from './StockFlowSimulator.svelte';
  import StockFlowPatterns from './StockFlowPatterns.svelte';
  import SimulationIntro from './SimulationIntro.svelte';
  
  // Subscribe to i18n stores
  $: currentT = $t;
  $: currentLocale = $locale;
  
  let activeTab = 'simulator';
  
  // Translations for this page
  const translations = {
    en: {
      title: "Stock & Flow Simulator for Conflict Systems",
      subtitle: "Interactive visualization of how resources, grievances, and capacities accumulate or deplete over time",
      intro: "This tool demonstrates how stocks (accumulations) and flows (rates of change) shape conflict dynamics and peacebuilding possibilities.",
      simulatorTab: "Stock & Flow Simulator",
      patternsTab: "Common Patterns",
      backToTools: "Back to Peace & Conflict Resolution Toolkit"
    },
    sv: {
      title: "Lager- och Flödessimulator för Konfliktsystem",
      subtitle: "Interaktiv visualisering av hur resurser, klagomål och kapaciteter samlas eller töms över tid",
      intro: "Detta verktyg visar hur lager (ackumuleringar) och flöden (förändringstakt) formar konfliktdynamik och fredsbyggande möjligheter.",
      simulatorTab: "Lager- och Flödessimulator",
      patternsTab: "Vanliga Mönster",
      backToTools: "Tillbaka till verktygslådan för fred och konfliktlösning"
    }
  };
  
  // Get current translations based on active locale
  $: texts = translations[currentLocale] || translations.en;
</script>

<MetaTags 
  title="Stock & Flow Simulator | Systems Thinking for Peace"
  description="Interactive visualization of how resources, grievances, and capacities accumulate or deplete over time in conflict settings, based on various intervention strategies."
  keywords="systems thinking, stock and flow, resource dynamics, conflict systems, peace systems, intervention modeling"
/>

<div class="page-container">
  <!-- Hero Section -->
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <h1>{texts.title}</h1>
        <p>{texts.subtitle}</p>
      </div>
    </div>
  </section>

  <!-- Back Navigation -->
  <div class="container">
    <div class="back-navigation">
      <a href="{base}/frameworks/tools/peace-and-conflict-resolution" class="back-link">
        <span class="back-icon">←</span>
        {texts.backToTools}
      </a>
    </div>
  </div>

  <!-- Main Content -->
  <div class="container">
    <div class="content-wrapper">
      <!-- Introduction -->
      <SimulationIntro />
      
      <!-- Tab Navigation -->
      <div class="tab-navigation">
        <button 
          class={activeTab === 'simulator' ? 'tab-button active' : 'tab-button'} 
          on:click={() => activeTab = 'simulator'}
        >
          {texts.simulatorTab}
        </button>
        <button 
          class={activeTab === 'patterns' ? 'tab-button active' : 'tab-button'} 
          on:click={() => activeTab = 'patterns'}
        >
          {texts.patternsTab}
        </button>
      </div>
      
      <!-- Tab Content -->
      <div class="tab-content">
        {#if activeTab === 'simulator'}
          <StockFlowSimulator />
        {:else if activeTab === 'patterns'}
          <StockFlowPatterns />
        {/if}
      </div>
      
      <!-- Bottom Navigation -->
      <div class="bottom-navigation">
        <a href="{base}/frameworks/tools/peace-and-conflict-resolution" class="back-link">
          <span class="back-icon">←</span>
          {texts.backToTools}
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  /* Global Styles */
  .page-container {
    font-family: Arial, sans-serif;
    line-height: 1.6;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .content-wrapper {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem 0;
  }
  
  /* Hero Section */
  .hero {
    padding: 3rem 0;
    background: linear-gradient(to bottom right, #2C8A78, #4ECDC4);
    color: white;
  }
  
  .hero-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }
  
  .hero h1 {
    font-size: 2.5rem;
    line-height: 1.2;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  .hero p {
    font-size: 1.25rem;
    color: #ffffff;
  }
  
  /* Back Navigation */
  .back-navigation {
    margin: 1.5rem 0;
  }
  
  .back-link {
    display: inline-flex;
    align-items: center;
    color: #2C8A78;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }
  
  .back-link:hover {
    color: #216855;
  }
  
  .back-icon {
    margin-right: 0.5rem;
  }
  
  /* Tab Navigation */
  .tab-navigation {
    display: flex;
    margin-bottom: 1.5rem;
    border-bottom: 2px solid #e5e7eb;
  }
  
  .tab-button {
    padding: 0.75rem 1.5rem;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    margin-bottom: -2px;
    font-weight: 500;
    color: #4b5563;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .tab-button:hover {
    color: #2C8A78;
  }
  
  .tab-button.active {
    color: #2C8A78;
    border-bottom-color: #2C8A78;
  }
  
  /* Tab Content */
  .tab-content {
    background-color: #f9fafb;
    border-radius: 0.5rem;
    padding: 1.5rem;
    min-height: 500px;
    margin-bottom: 2rem;
  }
  
  /* Bottom Navigation */
  .bottom-navigation {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
  }
  
  /* Responsive Styles */
  @media (max-width: 768px) {
    .hero h1 {
      font-size: 2rem;
    }
    
    .hero p {
      font-size: 1.125rem;
    }
    
    .tab-navigation {
      flex-direction: column;
      border-bottom: none;
    }
    
    .tab-button {
      width: 100%;
      text-align: left;
      border-left: 2px solid transparent;
      border-bottom: 1px solid #e5e7eb;
      margin-bottom: 0;
    }
    
    .tab-button.active {
      border-left-color: #2C8A78;
      border-bottom-color: #e5e7eb;
    }
    
    .tab-content {
      padding: 1rem;
    }
  }
</style>
