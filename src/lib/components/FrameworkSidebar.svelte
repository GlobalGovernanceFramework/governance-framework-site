<!-- src/lib/components/FrameworkSidebar.svelte -->
<script>
  import { page } from '$app/stores';
  import { t } from '$lib/i18n';
  import { frameworkNav } from '$lib/stores/frameworkNav';
  import { expandedSections } from '$lib/stores/expandedSections';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';

  // Hover state management - move from CSS to Svelte
  let hoveredPath = null;

  // Cache active states to prevent recalculation on every render
  let activeStates = {};
  let currentPath = '';

  // Reactive statement to update active states only when path changes
  $: if ($page.url.pathname !== currentPath) {
    currentPath = $page.url.pathname;
    activeStates = calculateActiveStates($frameworkNav, currentPath);
  }

  // Function to check if a path is active
  function isActive(path) {
    return currentPath === base + path;
  }

  // Pre-calculate all active states to avoid recalculation during render
  function calculateActiveStates(nav, pathname) {
    const states = {};
    
    function processItem(item) {
      const itemPath = base + item.path;
      const isItemActive = pathname === itemPath;
      
      let hasActiveChild = false;
      if (item.subItems) {
        item.subItems.forEach(subItem => {
          processItem(subItem);
          if (activeStates[subItem.titleKey]) {
            hasActiveChild = true;
          }
        });
      }
      
      states[item.titleKey] = isItemActive || hasActiveChild;
    }
    
    nav.forEach(processItem);
    return states;
  }

  // Optimized function to check if item is active or has active child
  function isActiveOrHasActiveChild(item) {
    return activeStates[item.titleKey] || false;
  }

  // Debounced hover handlers to prevent rapid state changes
  let hoverTimeout;
  function handleMouseEnter(path) {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
      hoveredPath = path;
    }, 10); // Small delay to prevent flickering
  }

  function handleMouseLeave() {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
      hoveredPath = null;
    }, 10);
  }

  // Initialize expanded sections - expand active section by default
  onMount(() => {
    // Calculate initial active states
    activeStates = calculateActiveStates($frameworkNav, $page.url.pathname);
    
    $frameworkNav.forEach(item => {
      if (item.subItems) {
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

    // Cleanup timeout on unmount
    return () => {
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
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
      {#each $frameworkNav as item (item.titleKey)}
        {@const isItemActiveOrHasChild = isActiveOrHasActiveChild(item)}
        <li class="nav-item" class:active-section={isItemActiveOrHasChild}>
          {#if item.subItems && item.subItems.length > 0}
            <div class="nav-header">
              <a 
                href="{base}{item.path}" 
                class:active={isActive(item.path)}
                class:hovered={hoveredPath === item.path}
                on:mouseenter={() => handleMouseEnter(item.path)}
                on:mouseleave={handleMouseLeave}
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
                {#each item.subItems as subItem (subItem.titleKey)}
                  {@const isSubItemActiveOrHasChild = isActiveOrHasActiveChild(subItem)}
                  <li class="subnav-item" class:active-section={isSubItemActiveOrHasChild}>
                    <!-- Handle tier items with their own subItems -->
                    {#if subItem.subItems && subItem.subItems.length > 0}
                      <div class="nav-header tier-header">
                        <a 
                          href="{base}{subItem.path}" 
                          class:active={isActive(subItem.path)}
                          class:hovered={hoveredPath === subItem.path}
                          on:mouseenter={() => handleMouseEnter(subItem.path)}
                          on:mouseleave={handleMouseLeave}
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
                          {#each subItem.subItems as implItem (implItem.titleKey)}
                            {@const isImplItemActive = isActive(implItem.path)}
                            {@const isImplItemHovered = hoveredPath === implItem.path}
                            <li class="impl-item">
                              {#if implItem.comingSoon || implItem.planned}
                                <span class="coming-soon">
                                  {$t(implItem.titleKey)} <em>({implItem.planned ? $t('framework.labels.planned') : $t('framework.labels.comingSoon')})</em>
                                </span>
                              {:else}
                                <a 
                                  href="{base}{implItem.path}" 
                                  class:active={isImplItemActive}
                                  class:hovered={isImplItemHovered}
                                  on:mouseenter={() => handleMouseEnter(implItem.path)}
                                  on:mouseleave={handleMouseLeave}
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
                      {@const isSubItemActive = isActive(subItem.path)}
                      {@const isSubItemHovered = hoveredPath === subItem.path}
                      {#if subItem.comingSoon || subItem.planned}
                        <span class="coming-soon">
                          {$t(subItem.titleKey)} <em>({subItem.planned ? $t('framework.labels.planned') : $t('framework.labels.comingSoon')})</em>
                        </span>
                      {:else}
                        <a 
                          href="{base}{subItem.path}" 
                          class:active={isSubItemActive}
                          class:hovered={isSubItemHovered}
                          on:mouseenter={() => handleMouseEnter(subItem.path)}
                          on:mouseleave={handleMouseLeave}
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
            <!-- Items without subItems -->
            {@const isItemActive = isActive(item.path)}
            {@const isItemHovered = hoveredPath === item.path}
            <a 
              href="{base}{item.path}" 
              class:active={isItemActive}
              class:hovered={isItemHovered}
              on:mouseenter={() => handleMouseEnter(item.path)}
              on:mouseleave={handleMouseLeave}
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
    border-right: 1px solid #2D5F2D;
    padding-right: 1.5rem;
    /* Force hardware acceleration */
    transform: translateZ(0);
    will-change: auto;
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .nav-item {
    margin-bottom: 0.75rem;
    /* Prevent layout shifts */
    contain: layout style;
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
    transition: color 0.15s ease-out;
    /* Prevent button from causing reflows */
    min-width: 24px;
    min-height: 24px;
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
    transition: all 0.15s ease-out;
    flex-grow: 1;
    /* Force GPU acceleration for smooth transitions */
    transform: translateZ(0);
    backface-visibility: hidden;
    /* Prevent text selection flickering */
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
  
  /* Separate hover and active states to prevent conflicts */
  .sidebar a.hovered:not(.active) {
    color: #DAA520;
    border-left-color: #DAA520;
  }
  
  .sidebar a.active {
    color: #DAA520;
    border-left-color: #DAA520;
    font-weight: 600;
  }
  
  /* Ensure active state always takes precedence */
  .sidebar a.active.hovered {
    color: #DAA520;
    border-left-color: #DAA520;
    font-weight: 600;
  }
  
  .coming-soon {
    display: block;
    padding: 0.5rem 0;
    color: #9ca3af;
    padding-left: 1rem;
    font-style: italic;
    /* Prevent selection */
    user-select: none;
    -webkit-user-select: none;
  }
  
  .subnav {
    margin-left: 1.5rem;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    border-left: 1px dashed #2D5F2D;
    /* Optimize rendering */
    contain: layout;
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
    contain: layout;
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
    transition: all 0.15s ease-out;
    /* Prevent badge from causing layout shifts */
    white-space: nowrap;
  }
  
  .status-badge.concept {
    background-color: #FEF3C7;
    color: #92400E;
  }
  
  .status-badge.development {
    background-color: #DBEAFE;
    color: #1E40AF;
  }
  
  .status-badge.review {
    background-color: #E0E7FF;
    color: #4338CA;
  }

  .status-badge.community-review {
    background-color: #FEF3C7;
    color: #92400E;
  }
  
  .status-badge.ready {
    background-color: #D1FAE5;
    color: #065F46;
  }

  .version-badge {
    display: inline-block;
    font-size: 0.65rem;
    padding: 0.1rem 0.3rem;
    border-radius: 0.75rem;
    margin-left: 0.5rem;
    vertical-align: middle;
    background-color: #1E40AF;
    color: #FFFFFF;
    font-weight: 600;
    font-family: 'Monaco', 'Menlo', monospace;
    transition: all 0.15s ease-out;
    white-space: nowrap;
  }

  /* Version badge hover states - only for non-active links */
  .sidebar a.hovered:not(.active) .version-badge {
    background-color: #FFFFFF;
    color: #1E40AF;
  }

  /* Version badge active states */
  .sidebar a.active .version-badge {
    background-color: #FFFFFF;
    color: #DAA520;
  }
  
  .active-section {
    /* Style for the parent item when it or its child is active */
    position: relative;
  }

  /* Responsive considerations */
  @media (max-width: 768px) {
    .version-badge {
      font-size: 0.6rem;
      padding: 0.05rem 0.25rem;
    }
    
    .sidebar {
      /* Optimize mobile performance */
      -webkit-overflow-scrolling: touch;
    }
  }

  /* Reduce motion for users with motion sensitivity */
  @media (prefers-reduced-motion: reduce) {
    .sidebar a,
    .toggle-btn,
    .status-badge,
    .version-badge {
      transition: none;
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .sidebar a.hovered:not(.active) {
      outline: 2px solid currentColor;
      outline-offset: -2px;
    }
  }
</style>
