<!-- src/routes/frameworks/rural-development-governance/+page.svelte -->
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
  <title>Rural Development Governance Framework | Global Governance Framework</title>
  <meta name="description" content="Empowering rural communities worldwide through equitable, sustainable, and participatory development rooted in dignity and self-determination." />
</svelte:head>

<div class="documentation-container">
  <FrameworkSidebar />

  <div class="content">
    <!-- Rural Development Governance Framework Coming Soon Card -->
    <FrameworkComingSoon 
      frameworkName="rural"
      icon="🌾"
      expectedQuarter="Q4 2025"
      themeColors={{
        primary: '#15803d',
        secondary: '#22c55e', 
        accent: '#eab308',
        light: '#f0fdf4'
      }}
      contactEmail="globalgovernanceframework@gmail.com"
      frameworksPageUrl="{base}/frameworks"
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
