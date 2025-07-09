<!-- src/lib/components/AllFrameworksList.svelte -->
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
    scroll-margin-top: 2rem;
    
    /* Clean positioning without competing optimizations */
    position: relative;
  }
  
  .tier-section:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  
  /* The :global styles remain the same as they correctly style the child component */
  :global(.tier-0) {
    border-left: 4px solid #fbbf24;
    padding-left: 1rem;
  }
  
  :global(.tier-1) {
    border-left: 4px solid #60a5fa;
    padding-left: 1rem;
  }
  
  :global(.tier-2) {
    border-left: 4px solid #34d399;
    padding-left: 1rem;
  }
  
  :global(.tier-3) {
    border-left: 4px solid #a78bfa;
    padding-left: 1rem;
  }
  
  :global(.tier-4) {
    border-left: 4px solid #f472b6;
    padding-left: 1rem;
  }

  :global(.framework-tier-list .group-title) {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: color 0.2s ease;
  }

  :global(.framework-tier-list .group-description) {
    color: #6b7280;
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
    font-style: italic;
  }

  :global(.framework-tier-list .framework-list) {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
    align-items: stretch;
  }
</style>
