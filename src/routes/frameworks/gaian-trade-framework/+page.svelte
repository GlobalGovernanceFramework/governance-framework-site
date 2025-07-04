<!-- src/routes/frameworks/gaian-trade-framework/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { invalidate } from '$app/navigation';
  import { base } from '$app/paths';
  import FrameworkSidebar from '$lib/components/FrameworkSidebar.svelte';
  import FrameworkComingSoon from '$lib/components/FrameworkComingSoon.svelte';
     
  export let data;

  $: if (browser && $locale) {
    invalidate('app:locale');
  }
</script>

<div class="documentation-container">
  <FrameworkSidebar />

  <div class="content">
    <!-- Gaian Trade Framework Coming Soon Card -->
    <FrameworkComingSoon 
      frameworkName="gaianTrade"
      icon="🌍"
      expectedQuarter="Q2 2025"
      themeColors={{
        primary: '#16a085',
        secondary: '#27ae60', 
        accent: '#f39c12',
        light: '#f0fff4'
      }}
      contactEmail="globalgovernanceframeworks@gmail.com"
    />
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

  .framework-preview {
    margin-top: 3rem;
  }

  .preview-section {
    margin-bottom: 3rem;
    padding: 2rem;
    background: linear-gradient(135deg, rgba(22, 160, 133, 0.05) 0%, rgba(39, 174, 96, 0.05) 100%);
    border-radius: 1rem;
    border-left: 4px solid #16a085;
  }

  .preview-section h2 {
    color: #16a085;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }

  .key-innovations {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .innovation-card {
    background: white;
    padding: 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px rgba(22, 160, 133, 0.1);
    border: 1px solid rgba(22, 160, 133, 0.2);
  }

  .innovation-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .innovation-card h3 {
    color: #16a085;
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
  }

  .innovation-card p {
    color: #4b5563;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .testimonials {
    display: grid;
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .testimonial {
    background: rgba(255, 255, 255, 0.7);
    padding: 1.5rem;
    border-radius: 0.75rem;
    border-left: 4px solid #27ae60;
    margin: 0;
  }

  .testimonial p {
    font-style: italic;
    color: #2d3748;
    margin-bottom: 0.75rem;
    font-size: 1.05rem;
  }

  .testimonial cite {
    color: #16a085;
    font-weight: 500;
    font-style: normal;
  }

  .pathway-timeline {
    margin-top: 1.5rem;
  }

  .timeline-item {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .timeline-marker {
    background: #16a085;
    color: white;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
  }

  .timeline-content h4 {
    color: #16a085;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }

  .timeline-content p {
    color: #4b5563;
    line-height: 1.6;
  }

  .connections-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .connection-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 0.5rem;
    border: 1px solid rgba(22, 160, 133, 0.2);
  }

  .connection-icon {
    font-size: 1.5rem;
  }

  .connection-item strong {
    color: #16a085;
  }

  @media (max-width: 768px) {
    .preview-section {
      padding: 1.5rem;
    }
    
    .key-innovations {
      grid-template-columns: 1fr;
    }
    
    .connections-grid {
      grid-template-columns: 1fr;
    }
    
    .timeline-item {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
