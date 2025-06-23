<script>
  import { getAllTiers, tierMetadata } from '$lib/stores/frameworkNav.js';
  import FrameworkTierList from './FrameworkTierList.svelte';
  
  // Optional props
  export let showTierHeaders = true;
  export let className = '';
  export let addTierIds = false; // New prop to add IDs for navigation
  // Optional: i18n translation function
  export let t = null;
</script>

<div class="all-frameworks-list {className}">
  {#each getAllTiers() as tier}
    <section 
      class="tier-section"
      id={addTierIds ? `tier-${tier}` : undefined}
    >
      <FrameworkTierList 
        {tier} 
        {t}
        showHeader={showTierHeaders}
        className="tier-{tier}"
      />
    </section>
  {/each}
</div>

<style>
  .all-frameworks-list {
    max-width: 100%;
  }
  
  .tier-section {
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid #e5e7eb;
    scroll-margin-top: 2rem; /* Add smooth scroll offset */
  }
  
  .tier-section:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  
  :global(.tier-0) {
    border-left: 4px solid #dc2626;
    padding-left: 1rem;
  }
  
  :global(.tier-1) {
    border-left: 4px solid #ea580c;
    padding-left: 1rem;
  }
  
  :global(.tier-2) {
    border-left: 4px solid #ca8a04;
    padding-left: 1rem;
  }
  
  :global(.tier-3) {
    border-left: 4px solid #16a34a;
    padding-left: 1rem;
  }
  
  :global(.tier-4) {
    border-left: 4px solid #7c3aed;
    padding-left: 1rem;
  }
</style>
