<!-- src/routes/frameworks/tools/global-ethics-and-rights-of-beings/[tool]/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import { t, locale } from '$lib/i18n';
  import { base } from '$app/paths';

  export let data;

  $: currentLocale = $locale;
  
  // Translations for the intro text
  const translations = {
    en: {
      title: "Ethics & Rights Visualization Tool",
      subtitle: "Under Development",
      description: "This visualization tool is currently in development as part of the Ethics & Rights of Beings Framework. Below you can see the documentation for what this tool will provide when fully implemented.",
      inDevelopment: "Tool in Development",
      note: "Note: This is a preview of planned functionality. The actual implementation may differ as the tool evolves based on community feedback and technological advancements.",
      backToTools: "Back to Ethics Tools"
    },
    sv: {
      title: "Etik & Rättighetsvisualiseringsverktyg",
      subtitle: "Under utveckling",
      description: "Detta visualiseringsverktyg är för närvarande under utveckling som en del av ramverket för Etik & Varelsers Rättigheter. Nedan kan du se dokumentationen för vad detta verktyg kommer att tillhandahålla när det är fullt implementerat.",
      inDevelopment: "Verktyg under utveckling",
      note: "Obs: Detta är en förhandstitt på planerad funktionalitet. Den faktiska implementeringen kan skilja sig åt när verktyget utvecklas baserat på återkoppling från gemenskapen och teknologiska framsteg.",
      backToTools: "Tillbaka till etikverktyg"
    }
  };

  // Get current translations based on active locale
  $: texts = translations[currentLocale] || translations.en;
  
  // Dynamically customize the title based on the tool
  function getToolTitle(tool) {
    const titles = {
      en: {
        'dynamic-rights-spectrum': "Dynamic Rights Spectrum Visualization",
        'implementation-timeline': "Implementation Timeline Visualizer",
        'conflict-matrix': "Conflict Resolution Decision Matrix",
        'governance-visualizer': "Governance Structure Visualizer"
      },
      sv: {
        'dynamic-rights-spectrum': "Visualisering av dynamiskt rättighetsspektrum",
        'implementation-timeline': "Visualiserare för implementeringstidslinje",
        'conflict-matrix': "Beslutsmatris för konfliktlösning",
        'governance-visualizer': "Visualiserare för styrningsstruktur"
      }
    };
    
    return (titles[currentLocale] || titles.en)[data.tool] || data.tool;
  }
</script>

<svelte:head>
  <title>{getToolTitle(data.tool)} - Global Governance Framework</title>
  <meta name="description" content={texts.description} />
</svelte:head>

<div class="tool-container">
  <!-- Header with tool title -->
  <div class="tool-header">
    <h1>{getToolTitle(data.tool)}</h1>
    <div class="development-badge">{texts.inDevelopment}</div>
  </div>
  
  <!-- Introduction note -->
  <div class="intro-card">
    <p>{texts.description}</p>
    <p class="note">{texts.note}</p>
  </div>
  
  <!-- Back link -->
  <div class="back-navigation">
    <a href="{base}/frameworks/tools/global-ethics-and-rights-of-beings" class="back-link">
      <span class="back-icon">←</span>
      {texts.backToTools}
    </a>
  </div>
  
  <!-- Tool documentation - direct rendering of component from data -->
  <div class="tool-documentation content">
    {#if data.component}
      <svelte:component this={data.component} />
    {:else}
      <p>Documentation for this tool is not available yet.</p>
    {/if}
  </div>
  
  <!-- Back link at bottom too -->
  <div class="back-navigation bottom">
    <a href="{base}/frameworks/tools/global-ethics-and-rights-of-beings" class="back-link">
      <span class="back-icon">←</span>
      {texts.backToTools}
    </a>
  </div>
</div>

<style>
  .tool-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  .tool-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .tool-header h1 {
    font-size: 2rem;
    font-weight: 700;
    color: #166534;
    margin: 0;
  }
  
  .development-badge {
    display: inline-block;
    background-color: #16a34a;
    color: white;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.375rem 0.75rem;
    border-radius: 0.375rem;
  }
  
  .intro-card {
    background-color: #f0fdf4;
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    border: 1px solid rgba(22, 101, 52, 0.2);
  }
  
  .intro-card p {
    margin: 0 0 1rem 0;
    color: #4b5563;
    line-height: 1.7;
  }
  
  .intro-card p:last-child {
    margin-bottom: 0;
  }
  
  .note {
    font-style: italic;
    font-size: 0.875rem;
    color: #6b7280;
  }
  
  .back-navigation {
    margin: 1.5rem 0;
  }
  
  .back-navigation.bottom {
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
  }
  
  .back-link {
    display: inline-flex;
    align-items: center;
    color: #166534;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }
  
  .back-link:hover {
    color: #15803d;
  }
  
  .back-icon {
    margin-right: 0.5rem;
  }
  
  .tool-documentation {
    line-height: 1.7;
    color: #4b5563;
  }
  
  .tool-documentation :global(h1) {
    font-size: 1.875rem;
    font-weight: 700;
    color: #166534;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  
  .tool-documentation :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    color: #166534;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }
  
  .tool-documentation :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    color: #166534;
    margin-top: 1.25rem;
    margin-bottom: 0.5rem;
  }
  
  .tool-documentation :global(p) {
    margin-bottom: 1rem;
  }
  
  .content :global(ul li:not(.section-nav li)) {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.75rem;
  }

  .content :global(ul li:not(.section-nav li))::before {
    content: "✦";
    position: absolute;
    left: 0;
    top: 0.1em;
    color: #166534; /* Green for ethics framework */
    font-size: 0.9rem;
  }

  .content :global(ol) {
    list-style-type: decimal;
  }

  .content :global(ol li) {
    margin-bottom: 0.75rem;
    padding-left: 0.5rem;
  }

  .content :global(ol li::marker) {
    color: #166534; /* Green for ethics framework */
    font-weight: 600;
  }

  .content :global(ul ul), .content :global(ol ul) {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .content :global(ul), .content :global(ol) {
    margin-bottom: 1.5rem;
    padding-left: 1rem;
    color: #4b5563;
  }

  .content :global(ul ul li::before) {
    content: "✧";
    color: #22c55e; /* Lighter green for nested bullets */
  }
  
  .tool-documentation :global(a) {
    color: #166534;
    text-decoration: underline;
  }
  
  .tool-documentation :global(a:hover) {
    color: #15803d;
  }
  
  .tool-documentation :global(blockquote) {
    border-left: 4px solid #166534;
    padding-left: 1rem;
    margin-left: 0;
    margin-right: 0;
    font-style: italic;
    color: #6b7280;
  }
  
  .tool-documentation :global(code) {
    background-color: #f3f4f6;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-size: 0.875em;
  }
  
  .tool-documentation :global(pre) {
    background-color: #f3f4f6;
    padding: 1rem;
    border-radius: 0.375rem;
    overflow-x: auto;
    margin-bottom: 1.5rem;
  }
  
  .tool-documentation :global(pre code) {
    background-color: transparent;
    padding: 0;
    border-radius: 0;
  }
  
  @media (max-width: 640px) {
    .tool-header {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .development-badge {
      margin-left: 0;
    }
  }
</style>
