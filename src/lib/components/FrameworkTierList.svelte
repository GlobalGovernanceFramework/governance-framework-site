<script>
  import { getFrameworksByTier, getFrameworksByTierAndGroup, getGroupsForTier, tierMetadata, statusMapping, groupMetadata } from '$lib/stores/frameworkNav.js';
  
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
  $: groups = getGroupsForTier(tier);
  $: ungroupedFrameworks = getFrameworksByTierAndGroup(tier, null);
  
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

  // Helper function to get group info
  function getGroupInfo(groupKey) {
    return groupMetadata[groupKey] || { titleKey: groupKey, descriptionKey: null };
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
    <!-- Display grouped frameworks if groups exist for this tier -->
    {#if groups.length > 0}
      {#each groups as group}
        {@const groupFrameworks = getFrameworksByTierAndGroup(tier, group)}
        {@const groupInfo = getGroupInfo(group)}
        
        <div class="framework-group">
          <h3 class="group-title">
            {groupInfo.emoji || '📋'} {t ? t(groupInfo.titleKey) : group}
          </h3>
          {#if groupInfo.descriptionKey && t}
            <p class="group-description">
              {t(groupInfo.descriptionKey)}
            </p>
          {/if}
          
          <ul class="framework-list">
            {#each groupFrameworks as framework}
              <li class="framework-item">
                <a href={framework.path} class="framework-link">
                  <div class="framework-title">
                    {#if framework.slug === 'treaty-for-our-only-home' || framework.slug === 'meta-governance' || framework.slug === 'global-citizenship-practice' || framework.slug === 'indigenous-governance-and-traditional-knowledge'}
                      {t ? t(framework.titleKey) : framework.titleKey}
                    {:else}
                      {framework.emoji || '🔗'} {t ? t(framework.titleKey) : framework.titleKey}
                    {/if}
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
        </div>
      {/each}
      
      <!-- Display ungrouped frameworks if any exist -->
      {#if ungroupedFrameworks.length > 0}
        <div class="framework-group">
          <h3 class="group-title">
            📌 {t ? t('framework.groups.other.title') || 'Other Frameworks' : 'Other Frameworks'}
          </h3>
          
          <ul class="framework-list">
            {#each ungroupedFrameworks as framework}
              <li class="framework-item">
                <a href={framework.path} class="framework-link">
                  <div class="framework-title">
                    {framework.emoji || '🔗'} {t ? t(framework.titleKey) : framework.titleKey}
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
        </div>
      {/if}
    {:else}
      <!-- Display all frameworks without grouping if no groups exist -->
      <ul class="framework-list">
        {#each frameworks as framework}
          <li class="framework-item">
            <a href={framework.path} class="framework-link">
              <div class="framework-title">
                {#if framework.slug === 'treaty-for-our-only-home' || framework.slug === 'meta-governance' || framework.slug === 'global-citizenship-practice' || framework.slug === 'indigenous-governance-and-traditional-knowledge'}
                  {t ? t(framework.titleKey) : framework.titleKey}
                {:else}
                  {framework.emoji || '🔗'} {t ? t(framework.titleKey) : framework.titleKey}
                {/if}
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
    {/if}
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

  .framework-group {
    margin-bottom: 2.5rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, #fafbfc 0%, #f8fafc 100%);
    border-radius: 0.75rem;
    border: 1px solid #e2e8f0;
    position: relative;
  }

  .framework-group:last-child {
    margin-bottom: 0;
  }

  .group-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .group-description {
    color: #6b7280;
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
    font-style: italic;
  }
  
  .framework-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
  }
  
  .framework-item {
    margin-bottom: 0;
    display: flex;
    height: 100%;
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    border-radius: 0.5rem;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
    overflow: hidden;
  }

  .framework-item:hover {
    background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    border-color: #cbd5e1;
  }
  
  .framework-link {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-decoration: none;
    color: inherit;
    padding: 1.25rem;
    height: 100%;
    position: relative;
  }

  .framework-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .framework-item:hover .framework-link::before {
    opacity: 1;
  }
  
  .framework-title {
    flex: 1;
    font-size: 1rem;
    font-weight: 600;
    color: #1f2937;
    line-height: 1.4;
    transition: color 0.2s ease;
  }

  .framework-item:hover .framework-title {
    color: #4338ca;
  }
  
  .framework-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: auto;
    flex-wrap: wrap;
    padding-top: 0.75rem;
  }
  
  .status {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.375rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.025em;
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
    font-size: 0.7rem;
    background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
    color: #475569;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-weight: 600;
    border: 1px solid #cbd5e1;
  }
  
  .no-frameworks {
    color: #6b7280;
    font-style: italic;
    padding: 2rem;
    text-align: center;
    background: linear-gradient(135deg, #f9fafb, #f3f4f6);
    border-radius: 0.75rem;
    border: 2px dashed #d1d5db;
    margin: 1rem 0;
  }
  
  h2 {
    color: #1f2937;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
    font-weight: 600;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .framework-list {
      grid-template-columns: 1fr;
    }

    .framework-group {
      padding: 1rem;
      margin-bottom: 1.5rem;
    }

    .group-title {
      font-size: 1.125rem;
    }

    .framework-link {
      padding: 1rem;
    }
  }

  /* Special styling for highlighted frameworks */
  :global(.framework-item[data-highlighted="true"]) {
    border: 2px solid #fbbf24;
    background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
  }

  :global(.framework-item[data-highlighted="true"]:hover) {
    transform: translateY(-3px);
    box-shadow: 0 12px 25px rgba(251, 191, 36, 0.2);
  }

  :global(.framework-item[data-primal="true"]) {
    border: 2px solid #3b82f6;
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  }

  :global(.framework-item[data-primal="true"]:hover) {
    transform: translateY(-3px);
    box-shadow: 0 12px 25px rgba(59, 130, 246, 0.2);
  }
</style>
