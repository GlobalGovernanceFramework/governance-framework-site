<!-- src/routes/frameworks/existential-risk-governance/+page.svelte -->
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
  <title>Global Existential Risk Governance Framework | Global Governance Framework</title>
  <meta name="description" content="The IPCC for All Existential Risks - comprehensive governance framework for preventing and managing global catastrophic threats to humanity's survival." />
</svelte:head>

<div class="documentation-container">
  <FrameworkSidebar />

  <div class="content">
    <!-- Existential Risk Governance Framework Coming Soon Card -->
    <FrameworkComingSoon 
      frameworkName="existential"
      icon="🛡️"
      expectedQuarter="Q1 2026"
      themeColors={{
        primary: '#7c2d12',
        secondary: '#dc2626', 
        accent: '#f59e0b',
        light: '#fef7ed'
      }}
      contactEmail="contact@globalgovernanceframeworks.org"
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
