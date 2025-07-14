<!-- src/routes/frameworks/regenerative-enterprise/+page.svelte -->
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
  <title>Regenerative Enterprise Framework - Global Governance Framework</title>
  <meta name="description" content="A revolutionary framework transforming businesses from extractive to regenerative models, aligning corporate purpose with planetary well-being through six comprehensive transformation modules." />
</svelte:head>

<div class="documentation-container">
  <FrameworkSidebar />

  <div class="content">
    <!-- Regenerative Enterprise Framework Coming Soon Card -->
    <FrameworkComingSoon 
      frameworkName="regenerativeEnterprise"
      icon="🌱"
      expectedQuarter="Q3 2025"
      themeColors={{
        primary: '#228B22',
        secondary: '#32CD32', 
        accent: '#FF8C00',
        light: '#f0f8f0'
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
