<!-- src/routes/frameworks/gender-equality-and-lgbtq-rights/+page.svelte -->
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
  <title>Gender Equality & LGBTQ+ Rights Framework - Global Governance Framework</title>
  <meta name="description" content="A comprehensive framework promoting gender equality and LGBTQ+ rights across all sectors of society through intersectional policy development and inclusive governance." />
</svelte:head>

<div class="documentation-container">
  <FrameworkSidebar />

  <div class="content">
    <!-- Gender Equality & LGBTQ+ Rights Framework Coming Soon Card -->
    <FrameworkComingSoon 
      frameworkName="gender"
      icon="🏳️‍🌈"
      expectedQuarter="Q3 2025"
      themeColors={{
        primary: '#e91e63',
        secondary: '#f06292', 
        accent: '#ff9800',
        light: '#fce4ec'
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
