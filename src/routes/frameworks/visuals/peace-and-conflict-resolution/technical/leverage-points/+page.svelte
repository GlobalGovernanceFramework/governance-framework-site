<!-- src/routes/frameworks/visuals/peace/technical/leverage-points-explorer/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { t, locale } from '$lib/i18n';
  import MetaTags from '$lib/components/MetaTags.svelte';
  import LeveragePointsExplorer from './LeveragePointsExplorer.svelte';
  import LeveragePointsIntro from './LeveragePointsIntro.svelte';
  import LeveragePointsTheory from './LeveragePointsTheory.svelte';
  
  // Subscribe to i18n stores
  $: currentT = $t;
  $: currentLocale = $locale;
  
  let activeTab = 'explorer';
  
  // Translations for this page
  const translations = {
    en: {
      title: "Leverage Points Explorer for Conflict Systems",
      subtitle: "Interactive tool for identifying and testing high-impact intervention points within conflict systems",
      intro: "This tool allows you to explore different types of leverage points in conflict systems and simulate the ripple effects of interventions.",
      explorerTab: "Leverage Points Explorer",
      theoryTab: "Leverage Points Theory",
      backToTools: "Back to Peace and Conflict Resolution Toolkit"
    },
    sv: {
      title: "Hävstångspunktsutforskare för Konfliktsystem",
      subtitle: "Interaktivt verktyg för att identifiera och testa högeffektiva interventionspunkter i konfliktsystem",
      intro: "Detta verktyg låter dig utforska olika typer av hävstångspunkter i konfliktsystem och simulera spridningseffekter av interventioner.",
      explorerTab: "Hävstångspunktsutforskare",
      theoryTab: "Hävstångspunktsteori",
      backToTools: "Tillbaka till verktygslådan för fred och konfliktlösning"
    }
  };
  
  // Get current translations based on active locale
  $: texts = translations[currentLocale] || translations.en;
</script>

<MetaTags 
  title="Leverage Points Explorer | Systems Thinking for Peace"
  description="Interactive tool for identifying and testing high-impact intervention points within conflict systems, simulating the ripple effects of different actions."
  keywords="systems thinking, leverage points, intervention design, conflict systems, peace systems, system dynamics"
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
      <LeveragePointsIntro />
      
      <!-- Tab Navigation -->
      <div class="tab-navigation">
        <button 
          class={activeTab === 'explorer' ? 'tab-button active' : 'tab-button'} 
          on:click={() => activeTab = 'explorer'}
        >
          {texts.explorerTab}
        </button>
        <button 
          class={activeTab === 'theory' ? 'tab-button active' : 'tab-button'} 
          on:click={() => activeTab = 'theory'}
        >
          {texts.theoryTab}
        </button>
      </div>
      
      <!-- Tab Content -->
      <div class="tab-content">
        {#if activeTab === 'explorer'}
          <LeveragePointsExplorer />
        {:else if activeTab === 'theory'}
          <LeveragePointsTheory />
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
  /* Global Styles - Similar to Stock & Flow Simulator */
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
    background: linear-gradient(to bottom right, #9b59b6, #8e44ad);
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
    color: #9b59b6;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }
  
  .back-link:hover {
    color: #8e44ad;
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
    color: #9b59b6;
  }
  
  .tab-button.active {
    color: #9b59b6;
    border-bottom-color: #9b59b6;
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
      border-left-color: #9b59b6;
      border-bottom-color: #e5e7eb;
    }
    
    .tab-content {
      padding: 1rem;
    }
  }
</style>
