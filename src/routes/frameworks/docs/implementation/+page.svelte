<!-- src/routes/frameworks/docs/implementation/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import FrameworkSidebar from '$lib/components/FrameworkSidebar.svelte';
  import MermaidDiagram from '$lib/components/MermaidDiagram.svelte';
  
  export let data;
  
  let contentReady = false;
  let contentElement;
  
  onMount(() => {
    contentReady = true;
    
    // After content renders, find and replace the placeholder
    setTimeout(() => {
      if (contentElement) {
        const placeholder = contentElement.querySelector('p');
        if (placeholder && placeholder.textContent.includes('[TIER_DIAGRAM_PLACEHOLDER]')) {
          // Replace the placeholder paragraph with our diagram
          const diagramDiv = document.createElement('div');
          diagramDiv.className = 'diagram-container';
          diagramDiv.innerHTML = '<div id="tier-diagram-mount"></div>';
          placeholder.parentNode.replaceChild(diagramDiv, placeholder);
          
          // Mount the Mermaid diagram
          mountDiagram();
        }
      }
    }, 100);
  });
  
  function mountDiagram() {
    // This will be handled by Svelte's reactivity
    diagramMounted = true;
  }
  
  let diagramMounted = false;
  
  $: translationFunction = $t;

  const tierDiagram = `graph TD
    subgraph T0["🎯 Tier 0: Constitutional Foundation"]
        Treaty["🌐 Treaty for Our Only Home"]
    end

    subgraph T1["🎯 Tier 1: Core Operating Systems"]
        MetaGov["🏛️ Meta-Governance"]
        Indigenous["🪶 Indigenous Framework"]
        Justice["⚖️ Justice & Peace"]
        Economic["💰 Economic Systems"]
        Technology["🤖 Technology Governance"]
    end

    subgraph T2["🎯 Tier 2: Life Support Systems"]
        Ecological["🌱 Ecological Systems"]
        Health["⚕️ Health & Wellbeing"]
        Education["🎓 Education Systems"]
    end

    subgraph T3["🎯 Tier 3: Equity & Culture"]
        SocialEquity["♿ Social Equity"]
        Culture["🏛️ Cultural Heritage"]
        Development["🏙️ Development"]
    end

    subgraph T4["🎯 Tier 4: Visionary Governance"]
        Wisdom["🦉 Wisdom Systems"]
        Future["⚠️ Future Readiness"]
        Space["🚀 Space Governance"]
    end

    Treaty --> MetaGov
    Treaty --> Indigenous
    Treaty --> Justice
    Treaty --> Economic
    Treaty --> Technology
    
    MetaGov --> Ecological
    Indigenous --> Health
    Economic --> Education
    
    Ecological --> SocialEquity
    Health --> Culture
    Education --> Development
    
    SocialEquity --> Wisdom
    Culture --> Future
    Development --> Space

    classDef tier0 fill:#fbbf24,stroke:#d97706,stroke-width:3px
    classDef tier1 fill:#60a5fa,stroke:#2563eb,stroke-width:2px
    classDef tier2 fill:#34d399,stroke:#059669,stroke-width:2px
    classDef tier3 fill:#a78bfa,stroke:#7c3aed,stroke-width:2px
    classDef tier4 fill:#f472b6,stroke:#db2777,stroke-width:2px
    
    class Treaty tier0
    class MetaGov,Indigenous,Justice,Economic,Technology tier1
    class Ecological,Health,Education tier2
    class SocialEquity,Culture,Development tier3
    class Wisdom,Future,Space tier4`;
</script>

<div class="documentation-container">
  <FrameworkSidebar />

  <div class="content" bind:this={contentElement}>
    {#if browser && contentReady && data.component}
      <svelte:component this={data.component} t={translationFunction} />
    {:else if browser}
      <div class="loading">Loading content...</div>
    {:else}
      <div class="ssr-placeholder">
        <h1>Implementation Guidelines</h1>
        <p>Loading content...</p>
      </div>
    {/if}
    
    <!-- This will be positioned where the placeholder was found -->
    {#if diagramMounted}
      <div class="diagram-container">
        <MermaidDiagram diagram={tierDiagram} />
      </div>
    {/if}
  </div>
</div>

<style>
  .documentation-container {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  @media (max-width: 768px) {
    .documentation-container {
      grid-template-columns: 1fr;
    }
  }
  
  .content {
    min-width: 0;
  }

  .diagram-container {
    margin: 2rem 0;
    padding: 1.5rem;
    background-color: #fafafa;
    border-radius: 0.5rem;
    border: 1px solid #e5e7eb;
  }

  /* Your existing styles... */
  :global(.content a) {
    color: #B8860B;
    text-decoration: underline;
    text-underline-offset: 2px;
    text-decoration-thickness: 1px;
    transition: all 0.2s ease-in-out;
  }

  :global(.content a:hover) {
    color: #2B4B8C;
    text-decoration-thickness: 2px;
  }

  .content :global(h1) {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #2B4B8C;
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #2B4B8C;
  }
  
  .content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: #2B4B8C;
  }
  
  .content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #4b5563;
  }
  
  .content :global(ul), .content :global(ol) {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
    color: #4b5563;
  }

  .content :global(ul) {
    list-style-type: none;
  }

  .content :global(ul li) {
    position: relative;
    margin-bottom: 0.75rem;
    padding-left: 1rem;
  }

  .content :global(ul li::before) {
    content: "✦";
    position: absolute;
    left: 0;
    color: #DAA520;
    font-size: 0.9rem;
  }

  .content :global(strong) {
    font-weight: 600;
    color: #2B4B8C;
  }
</style>
