<!-- src/routes/frameworks/soil-health-and-land-use-governance/+page.svelte -->
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

<svelte:head>
  <title>Soil Health & Land Use Governance Framework - Global Governance Framework</title>
  <meta name="description" content="A comprehensive framework transforming humanity's relationship with land and soil from extractive property to regenerative stewardship, centering Traditional Ecological Knowledge and bioregional governance." />
  <meta name="keywords" content="soil health, regenerative agriculture, land stewardship, bioregional governance, Traditional Ecological Knowledge, land rematriation, soil carbon, food sovereignty" />
</svelte:head>

<div class="documentation-container">
  <FrameworkSidebar />

  <div class="content">
    <!-- Soil Health & Land Use Governance Framework Coming Soon Card -->
    <FrameworkComingSoon 
      frameworkName="soil"
      icon="🌱"
      expectedQuarter="Q2 2025"
      themeColors={{
        primary: '#2d5016',
        secondary: '#52803a', 
        accent: '#8fbc8f',
        light: '#f0f8e8'
      }}
      contactEmail="contact@globalgovernanceframeworks.org"
    />

    <!-- Original content (if any legacy content exists) -->
    <svelte:component this={data.component} />
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
</style>
