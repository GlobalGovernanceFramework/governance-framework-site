<script>
  import { getFrameworksByTier, tierMetadata, statusMapping } from '$lib/stores/frameworkNav.js';
  
  // Accept tier number as prop
  export let tier;
  // Optional: show tier title and description
  export let showHeader = true;
  // Optional: custom styling class
  export let className = '';
  // Required: your i18n translation function
  export let t;
  
  // Get frameworks for this tier
  $: frameworks = getFrameworksByTier(tier);
  $: tierInfo = tierMetadata[tier];
  
  // Helper function to get status display text using your existing i18n keys
  function getStatusText(status) {
    const statusKey = statusMapping[status];
    if (statusKey && t) {
      const translated = t(statusKey);
      // Check if translation exists (some i18n systems return the key if not found)
      if (translated && translated !== statusKey) {
        return translated;
      }
    }
    
    // Fallback to English (should rarely be needed with your system)
    switch (status) {
      case 'ready': return 'Ready';
      case 'review': return 'In Review';
      case 'planned': return 'Planned';
      case 'coming-soon': return 'Coming Soon';
      default: return status;
    }
  }
  
  // Helper function to get status CSS class
  function getStatusClass(status) {
    switch (status) {
      case 'ready': return 'status-ready';
      case 'review': return 'status-review';
      case 'planned': return 'status-planned';
      case 'coming-soon': return 'status-coming-soon';
      default: return 'status-default';
    }
  }
</script>

<div class="framework-tier-list {className}">
  {#if showHeader && tierInfo && t}
    <h2>
      {t(tierInfo.titleKey)}
    </h2>
    {#if tierInfo.descriptionKey}
      <p class="tier-description">
        {t(tierInfo.descriptionKey)}
      </p>
    {/if}
  {/if}
  
  {#if frameworks.length > 0}
    <ul class="framework-list">
      {#each frameworks as framework}
        <li class="framework-item">
          <a href={framework.path} class="framework-link">
            <div class="framework-title">
              {t ? t(framework.titleKey) : framework.titleKey}
            </div>
            {#if framework.status || framework.version}
              <div class="framework-meta">
                {#if framework.status}
                  <span class="status {getStatusClass(framework.status)}">
                    {getStatusText(framework.status)}
                  </span>
                {/if}
                {#if framework.version}
                  <span class="version">{framework.version}</span>
                {/if}
              </div>
            {/if}
          </a>
        </li>
      {/each}
    </ul>
  {:else}
    <p class="no-frameworks">
      {t ? t('framework.tier.noFrameworks') || `No frameworks defined for Tier ${tier} yet.` : `No frameworks defined for Tier ${tier} yet.`}
    </p>
  {/if}
</div>

<style>
  .framework-tier-list {
    margin: 1.5rem 0;
  }
  
  .tier-description {
    color: #666;
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }
  
  .framework-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .framework-item {
    margin-bottom: 0;
    display: flex;
    height: 100%;
  }
  
  .framework-link {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-decoration: none;
    color: inherit;
  }
  
  .framework-title {
    flex: 1;
  }
  
  .framework-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: auto;
    flex-wrap: wrap;
  }
  
  .status {
    font-size: 0.875rem;
    padding: 0.125rem 0.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
  }
  
  .status-ready {
    background-color: #dcfce7;
    color: #166534;
  }
  
  .status-review {
    background-color: #fef3c7;
    color: #92400e;
  }
  
  .status-planned {
    background-color: #e0e7ff;
    color: #3730a3;
  }
  
  .status-coming-soon {
    background-color: #f3e8ff;
    color: #6b21a8;
  }
  
  .status-default {
    background-color: #f3f4f6;
    color: #374151;
  }
  
  .version {
    font-size: 0.75rem;
    background-color: #f8fafc;
    color: #475569;
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-weight: 600;
    border: 1px solid #e2e8f0;
  }
  
  .no-frameworks {
    color: #6b7280;
    font-style: italic;
    padding: 1rem;
    text-align: center;
    background-color: #f9fafb;
    border-radius: 0.5rem;
  }
  
  h2 {
    color: #1f2937;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
    font-weight: 600;
  }
</style>
