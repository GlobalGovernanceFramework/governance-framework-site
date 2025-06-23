<!-- src/routes/frameworks/docs/implementation/migration/+page.svelte -->
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
    <!-- Migration Framework Coming Soon Card -->
    <FrameworkComingSoon 
      frameworkName="migration"
      icon="🌍"
      expectedQuarter="Q3 2025"
      themeColors={{
        primary: '#2B4B8C',
        secondary: '#4B5CA5', 
        accent: '#DAA520',
        light: '#f8f9fc'
      }}
      contactEmail="globalgovernanceframeworks@gmail.com"
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
