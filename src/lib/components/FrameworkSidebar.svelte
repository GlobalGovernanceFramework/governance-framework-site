<!-- src/lib/components/FrameworkSidebar.svelte -->
<script>
  import { page } from '$app/stores';
  import { t } from '$lib/i18n';
  import { frameworkNav } from '$lib/stores/frameworkNav';
  import { expandedSections } from '$lib/stores/expandedSections';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';

  // Function to check if a path is active
  function isActive(path) {
    return $page.url.pathname === base + path;
  }

  // Function to check if a path or any of its children are active
  function isActiveOrHasActiveChild(item) {
    if (isActive(item.path)) return true;
    if (item.subItems) {
      return item.subItems.some(subItem => {
        if (isActive(subItem.path)) return true;
        if (subItem.subItems) {
          return subItem.subItems.some(grandchild => isActive(grandchild.path));
        }
        return false;
      });
    }
    return false;
  }

  // Initialize expanded sections - expand active section by default
  onMount(() => {
    $frameworkNav.forEach(item => {
      if (item.subItems) {
        // Initialize in store if not already present
        expandedSections.update(current => {
          if (!(item.titleKey in current)) {
            current[item.titleKey] = isActiveOrHasActiveChild(item) || item.path.includes('/implementation');
          }
          
          // Also handle tier sections
          item.subItems.forEach(subItem => {
            if (subItem.subItems) {
              if (!(subItem.titleKey in current)) {
                current[subItem.titleKey] = isActiveOrHasActiveChild(subItem) || isActive(subItem.path);
              }
            }
          });
          
          return current;
        });
      }
    });
  });

  // Toggle a section's expanded state
  function toggleSection(titleKey) {
    expandedSections.update(current => ({
      ...current,
      [titleKey]: !current[titleKey]
    }));
  }
</script>

<div class="sidebar">
  <nav>
    <ul>
      {#each $frameworkNav as item}
        <li class="nav-item {isActiveOrHasActiveChild(item) ? 'active-section' : ''}">
          {#if item.subItems && item.subItems.length > 0}
            <div class="nav-header">
              <a 
                href="{base}{item.path}" 
                class:active={isActive(item.path)}
              >
                {$t(item.titleKey)}
                {#if item.status === 'ready' && item.version}
                  <span class="version-badge">{item.version}</span>
                {/if}
              </a>
              <button 
                class="toggle-btn" 
                on:click|preventDefault={() => toggleSection(item.titleKey)}
                aria-expanded={$expandedSections[item.titleKey] ? 'true' : 'false'}
              >
                {#if $expandedSections[item.titleKey]}
                  <span>▼</span>
                {:else}
                  <span>▶</span>
                {/if}
              </button>
            </div>
            
            {#if $expandedSections[item.titleKey]}
              <ul class="subnav">
                {#each item.subItems as subItem}
                  <li class="subnav-item {isActiveOrHasActiveChild(subItem) ? 'active-section' : ''}">
                    <!-- Handle tier items with their own subItems -->
                    {#if subItem.subItems && subItem.subItems.length > 0}
                      <div class="nav-header tier-header">
                        <a 
                          href="{base}{subItem.path}" 
                          class:active={isActive(subItem.path)}
                        >
                          {$t(subItem.titleKey)}
                          {#if subItem.status === 'ready' && subItem.version}
                            <span class="version-badge">{subItem.version}</span>
                          {/if}
                        </a>
                        <button 
                          class="toggle-btn" 
                          on:click|preventDefault={() => toggleSection(subItem.titleKey)}
                          aria-expanded={$expandedSections[subItem.titleKey] ? 'true' : 'false'}
                        >
                          {#if $expandedSections[subItem.titleKey]}
                            <span>▼</span>
                          {:else}
                            <span>▶</span>
                          {/if}
                        </button>
                      </div>
                      
                      <!-- Tier subItems (actual implementation docs) -->
                      {#if $expandedSections[subItem.titleKey]}
                        <ul class="tier-subnav">
                          {#each subItem.subItems as implItem}
                            <li class="impl-item">
                              {#if implItem.comingSoon || implItem.planned}
                                <span class="coming-soon">
                                  {$t(implItem.titleKey)} <em>({implItem.planned ? $t('framework.labels.planned') : $t('framework.labels.comingSoon')})</em>
                                </span>
                              {:else}
                                <a 
                                  href="{base}{implItem.path}" 
                                  class:active={isActive(implItem.path)}
                                >
                                  {$t(implItem.titleKey)}
                                  {#if implItem.status === 'ready' && implItem.version}
                                    <span class="version-badge">{implItem.version}</span>
                                  {/if}
                                  {#if implItem.status && implItem.status !== 'ready'}
                                    <span class="status-badge {implItem.status}" 
                                      title={$t(`framework.status.${implItem.status}.description`)}>
                                      {$t(`framework.status.${implItem.status}.label`)}
                                    </span>
                                  {/if}
                                </a>
                              {/if}
                            </li>
                          {/each}
                        </ul>
                      {/if}
                    {:else}
                      <!-- Regular subItems without further nesting -->
                      {#if subItem.comingSoon || subItem.planned}
                        <span class="coming-soon">
                          {$t(subItem.titleKey)} <em>({subItem.planned ? $t('framework.labels.planned') : $t('framework.labels.comingSoon')})</em>
                        </span>
                      {:else}
                        <a 
                          href="{base}{subItem.path}" 
                          class:active={isActive(subItem.path)}
                        >
                          {$t(subItem.titleKey)}
                          {#if subItem.status === 'ready' && subItem.version}
                            <span class="version-badge">{subItem.version}</span>
                          {/if}
                          {#if subItem.status && subItem.status !== 'ready'}
                            <span class="status-badge {subItem.status}" 
                              title={$t(`framework.status.${subItem.status}.description`)}>
                              {$t(`framework.status.${subItem.status}.label`)}
                            </span>
                          {/if}
                        </a>
                      {/if}
                    {/if}
                  </li>
                {/each}
              </ul>
            {/if}
          {:else}
            <a 
              href="{base}{item.path}" 
              class:active={isActive(item.path)}
            >
              {$t(item.titleKey)}
              {#if item.status === 'ready' && item.version}
                <span class="version-badge">{item.version}</span>
              {/if}
              {#if item.status && item.status !== 'ready'}
                <span class="status-badge {item.status}" 
                  title={$t(`framework.status.${item.status}.description`)}>
                  {$t(`framework.status.${item.status}.label`)}
                </span>
              {/if}
            </a>
          {/if}
        </li>
      {/each}
    </ul>
  </nav>
</div>

<style>
  .sidebar {
    border-right: 1px solid #2D5F2D; /* Earthy green border */
    padding-right: 1.5rem;
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .nav-item {
    margin-bottom: 0.75rem;
  }
  
  .nav-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .toggle-btn {
    background: none;
    border: none;
    color: #4b5563;
    cursor: pointer;
    padding: 0.2rem 0.5rem;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .toggle-btn:hover {
    color: #DAA520;
  }
  
  .sidebar a {
    display: block;
    padding: 0.5rem 0;
    color: #4b5563;
    text-decoration: none;
    border-left: 3px solid transparent;
    padding-left: 1rem;
    transition: all 0.2s;
    flex-grow: 1;
  }
  
  .sidebar a:hover {
    color: #DAA520; /* Gold on hover */
    border-left-color: #DAA520;
  }
  
  .sidebar a.active {
    color: #DAA520; /* Gold for active */
    border-left-color: #DAA520;
    font-weight: 600;
  }
  
  .coming-soon {
    display: block;
    padding: 0.5rem 0;
    color: #9ca3af; /* Gray color for disabled items */
    padding-left: 1rem;
    font-style: italic;
  }
  
  .subnav {
    margin-left: 1.5rem;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    border-left: 1px dashed #2D5F2D;
  }
  
  .subnav-item {
    margin-bottom: 0.5rem;
  }
  
  .subnav a {
    font-size: 0.95rem;
    padding: 0.3rem 0;
  }
  
  /* Styles for tier subnav */
  .tier-header {
    margin-top: 0.3rem;
  }
  
  .tier-subnav {
    margin-left: 1.5rem;
    margin-top: 0.3rem;
    margin-bottom: 0.5rem;
    border-left: 1px dotted #2D5F2D;
  }
  
  .impl-item {
    margin-bottom: 0.3rem;
  }
  
  .impl-item a {
    font-size: 0.9rem;
    padding: 0.2rem 0;
  }

  .status-badge {
    display: inline-block;
    font-size: 0.7rem;
    padding: 0.15rem 0.4rem;
    border-radius: 1rem;
    margin-left: 0.5rem;
    vertical-align: middle;
  }
  
  .status-badge.concept {
    background-color: #FEF3C7; /* Light yellow */
    color: #92400E;
  }
  
  .status-badge.development {
    background-color: #DBEAFE; /* Light blue */
    color: #1E40AF;
  }
  
  .status-badge.review {
    background-color: #E0E7FF; /* Light purple */
    color: #4338CA;
  }

  .status-badge.community-review {
    background-color: #FEF3C7;
    color: #92400E;
  }
  
  .status-badge.ready {
    background-color: #D1FAE5; /* Light green */
    color: #065F46;
  }

  .version-badge {
    display: inline-block;
    font-size: 0.65rem;
    padding: 0.1rem 0.3rem;
    border-radius: 0.75rem;
    margin-left: 0.5rem;
    vertical-align: middle;
    background-color: #1E40AF; /* Blue background */
    color: #FFFFFF; /* White text */
    font-weight: 600;
    font-family: 'Monaco', 'Menlo', monospace; /* Monospace for version numbers */
  }

  /* Version badge specific colors for different statuses */
  .sidebar a.active .version-badge {
    background-color: #FFFFFF;
    color: #DAA520;
  }

  .sidebar a:hover .version-badge {
    background-color: #FFFFFF;
    color: #1E40AF;
  }
  
  .active-section {
    /* Style for the parent item when it or its child is active */
  }

  /* Responsive considerations */
  @media (max-width: 768px) {
    .version-badge {
      font-size: 0.6rem;
      padding: 0.05rem 0.25rem;
    }
  }
</style>
