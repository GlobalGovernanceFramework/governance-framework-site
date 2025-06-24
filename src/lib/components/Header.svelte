<!-- src/lib/components/Header.svelte -->
<script>
  import { t, locale, locales, getLanguageName, setLocale } from '$lib/i18n';
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  
  // Handle language selection
  function handleLocaleChange(e) {
    const newLocale = e.target.value;
    setLocale(newLocale);
  }

  // Mobile menu state
  let isMenuOpen = false;
  let isFrameworksDropdownOpen = false;
  let isMetaGovernanceDropdownOpen = false;
  let isGetInvolvedDropdownOpen = false;

  function handleMetaGovernanceNavigation(event, section) {
    event.preventDefault();
    event.stopPropagation();
    
    if (browser) {
      console.log('Header navigation triggered for section:', section); // Debug log
      console.log('Current pathname:', $page.url.pathname); // Debug log
      
      // Close dropdown
      isMetaGovernanceDropdownOpen = false;
      
      // Check if we're already on the meta-governance page
      if ($page.url.pathname === base + '/frameworks/meta-governance') {
        console.log('Already on page, updating hash'); // Debug log
        // We're already on the page, just update hash
        window.location.hash = section;
      } else {
        console.log('Navigating to page with hash'); // Debug log
        // Navigate to the page with hash using SvelteKit's goto
        goto(`${base}/frameworks/meta-governance#${section}`).then(() => {
          console.log('Navigation completed'); // Debug log
          // Force a hash change event after navigation
          setTimeout(() => {
            if (window.location.hash !== `#${section}`) {
              window.location.hash = section;
            }
          }, 100);
        });
      }
    }
  }
  
  const toggleMenu = () => (isMenuOpen = !isMenuOpen);

  const toggleFrameworksDropdown = (e) => {
    e.stopPropagation();
    isFrameworksDropdownOpen = !isFrameworksDropdownOpen;
  };

  const toggleMetaGovernanceDropdown = (e) => {
    e.stopPropagation();
    isMetaGovernanceDropdownOpen = !isMetaGovernanceDropdownOpen;
  };

  const toggleGetInvolvedDropdown = (e) => {
    e.stopPropagation();
    isGetInvolvedDropdownOpen = !isGetInvolvedDropdownOpen;
  };
  
  const closeDropdowns = () => {
    if (isFrameworksDropdownOpen) isFrameworksDropdownOpen = false;
    if (isGetInvolvedDropdownOpen) isGetInvolvedDropdownOpen = false;
    if (isMetaGovernanceDropdownOpen) isMetaGovernanceDropdownOpen = false; // ADD THIS LINE
  };
  
  let isMobile = false;
  
  onMount(() => {
    const checkMobile = () => {
      isMobile = window.innerWidth < 768;
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    document.addEventListener('click', closeDropdowns);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('click', closeDropdowns);
    };
  });

  // Function to check if a path is active - only in browser
  function isActive(path) {
    if (!browser) return false;
    return $page.url.pathname === base + path;
  }
</script>

<style>
  header {
    background: linear-gradient(to bottom right, #2B4B8C, #6B5CA5);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 50;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .header-content {
    display: flex;
    flex-direction: column;
    padding: 0.75rem 0;
  }
  
  @media (min-width: 768px) {
    .header-content {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
  
  .logo-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  
  @media (min-width: 768px) {
    .logo-section {
      width: auto;
    }
  }
  
  .logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
  }
  
  .logo-img {
    height: 35px;
    width: 35px;
    margin-right: 0.5rem;
  }
  
  .site-title {
    font-size: 1.125rem !important;
    font-weight: 600;
    color: #ffffff;
  }
  
  .menu-button {
    background: none;
    border: none;
    color: #DAA520;
    cursor: pointer;
  }
  
  @media (min-width: 768px) {
    .menu-button {
      display: none;
    }
  }
  
  .nav-container {
    display: none;
    width: 100%;
    margin-top: 1rem;
  }
  
  .nav-container.open {
    display: flex;
    flex-direction: column;
  }
  
  @media (min-width: 768px) {
    .nav-container {
      display: flex !important;
      flex-direction: row;
      align-items: center;
      width: auto;
      margin-top: 0;
    }
  }
  
  .nav-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
  }
  
  @media (min-width: 768px) {
    .nav-list {
      flex-direction: row;
      margin-right: 1.5rem;
      align-items: center;
    }
  }
  
  .nav-item {
    margin-bottom: 1rem;
  }
  
  @media (min-width: 768px) {
    .nav-item {
      margin-bottom: 0;
      margin-right: 1.25rem !important;
    }
  }

  .nav-link.nav-link-highlight {
    color: #DAA520;
  }
  
  .nav-link {
    color: #ffffff;
    text-decoration: none;
    padding-bottom: 0.25rem;
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
    font-size: 0.9rem !important;
    line-height: 1.2;
  }
  
  .nav-link:hover {
    color: #DAA520;
    border-bottom-color: #DAA520;
  }
  
  .nav-link.active {
    color: #DAA520;
    border-bottom-color: #DAA520;
    font-weight: 600;
  }
  
  .language-select {
    padding: 0.3rem 0.6rem !important;
    border: 1px solid #2D5F2D;
    border-radius: 0.375rem;
    background-color: #ffffff;
    color: #2B4B8C;
    cursor: pointer;
    font-size: 0.8rem !important;
  }

  .dropdown {
    position: relative;
  }

  .dropdown-icon {
    display: inline-block;
    margin-left: 0.25rem;
    vertical-align: middle;
    transition: transform 0.2s;
    width: 14px !important;
    height: 14px !important;
  }

  .dropdown:hover .dropdown-icon {
    transform: rotate(180deg);
  }

  .dropdown-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 180px;
    background-color: #ffffff;
    border: 1px solid #2D5F2D;
    border-radius: 0.375rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 60;
    margin-top: 0.25rem;
    padding-top: 0.25rem;
    flex-direction: column;
  }

  .dropdown:hover .dropdown-menu {
    display: block;
  }

  .dropdown::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 0.5rem;
    background-color: transparent;
  }

  .dropdown-menu a {
    display: block;
    padding: 0.45rem 0.8rem !important;
    color: #2B4B8C;
    text-decoration: none;
    border-left: 3px solid transparent;
    transition: all 0.2s;
    font-size: 0.85rem !important;
    line-height: 1.3;
  }

  .dropdown-menu a:hover {
    background-color: #f7f1e3;
    color: #DAA520;
    border-left-color: #DAA520;
  }

  .dropdown-menu a.active {
    color: #DAA520;
    border-left-color: #DAA520;
    font-weight: 600;
  }

  .dropdown-menu a.highlighted {
    background-color: #f0f8ff;
    font-weight: 600;
    border-left-color: #DAA520;
  }

  .hidden {
    display: none;
  }
  
  @media (min-width: 768px) {
    .language-select {
      margin-left: 0.75rem !important;
    }

    .md\:hidden {
      display: none;
    }
    
    .md\:inline-block {
      display: inline-block;
    }
  }

  @media (max-width: 768px) {
    .dropdown-menu {
      position: static;
      box-shadow: none;
      border: none;
      border-left: 3px solid #2D5F2D;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      margin-left: 1rem;
      display: none;
    }
    
    .dropdown.open .dropdown-menu {
      display: block;
    }
    
    .dropdown .dropdown-toggle {
      display: inline-block;
      margin-left: 0.5rem;
      cursor: pointer;
    }
  }
  
  .dropdown-toggle {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: 0;
  }

  @media (max-width: 1300px) and (min-width: 768px) {
    .nav-item {
      margin-right: 1.1rem !important;
    }
  }

  @media (max-width: 1200px) and (min-width: 768px) {
    .nav-item {
      margin-right: 1rem !important;
    }
    
    .nav-link {
      font-size: 0.85rem !important;
    }
    
    .language-select {
      font-size: 0.75rem !important;
    }
  }

  @media (max-width: 1100px) and (min-width: 768px) {
    .nav-item {
      margin-right: 0.9rem !important;
    }
    
    .nav-link {
      font-size: 0.8rem !important;
    }
    
    .language-select {
      font-size: 0.7rem !important;
      padding: 0.25rem 0.5rem !important;
    }
    
    .dropdown-menu a {
      font-size: 0.8rem !important;
      padding: 0.4rem 0.7rem !important;
    }
  }

  .dropdown-item-btn {
    display: block;
    width: 100%;
    padding: 0.45rem 0.8rem !important;
    color: #2B4B8C;
    text-decoration: none;
    border: none;
    background: none;
    text-align: left;
    cursor: pointer;
    border-left: 3px solid transparent;
    transition: all 0.2s;
    font-size: 0.85rem !important;
    line-height: 1.3;
  }

  .dropdown-item-btn:hover {
    background-color: #f7f1e3;
    color: #DAA520;
    border-left-color: #DAA520;
  }

  .dropdown-item-btn:focus {
    outline: 2px solid #DAA520;
    outline-offset: -2px;
  }
</style>

<header>
  <div class="container">
    <div class="header-content">
      <div class="logo-section">
        <a href="{base}/" class="logo-link">
          <img src="{base}/logo.svg" alt="Global Governance Frameworks" class="logo-img" />
          <span class="site-title">Global Governance Frameworks</span>
        </a>
        
        <button 
          type="button" 
          class="menu-button" 
          on:click={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {#if isMenuOpen}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          {:else}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          {/if}
        </button>
      </div>
      
      <nav class={`nav-container ${isMenuOpen ? 'open' : ''}`}>
        <ul class="nav-list">
          <li class="nav-item">
            <a 
              href="{base}/"
              class={`nav-link ${isActive('/') || isActive('') ? 'active' : ''}`}
              data-sveltekit-preload-data="hover"
            >
              {browser ? ($t('common.header.home') || 'Home') : 'Home'}
            </a>
          </li>

          <li class="nav-item dropdown" class:open={isMetaGovernanceDropdownOpen}>
            <div class="dropdown-header">
              <a 
                href="{base}/frameworks/meta-governance"
                class={`nav-link nav-link-highlight ${browser && ($page.url.pathname === base + '/frameworks/meta-governance' || $page.url.pathname.startsWith(base + '/frameworks/meta-governance/')) ? 'active' : ''}`}
                data-sveltekit-preload-data="hover"
              >
                {browser ? ($t('common.header.metaGovernance') || 'Meta-Governance') : 'Meta-Governance'}
                <svg xmlns="http://www.w3.org/2000/svg" class="dropdown-icon hidden md:inline-block" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <button 
                type="button" 
                class="dropdown-toggle md:hidden" 
                on:click|stopPropagation={toggleMetaGovernanceDropdown}
                on:keydown={(e) => e.key === 'Enter' && toggleMetaGovernanceDropdown(e)}
                aria-label={isMetaGovernanceDropdownOpen ? 'Close meta-governance menu' : 'Open meta-governance menu'}
                role="button"
                tabindex="0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d={isMetaGovernanceDropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                </svg>
              </button>
            </div>

            <div class="dropdown-menu" on:click|stopPropagation={() => {}} role="menu">
              <a 
                href="{base}/frameworks/meta-governance#index" 
                on:click={(e) => handleMetaGovernanceNavigation(e, 'index')}
                data-sveltekit-preload-data="hover" 
                role="menuitem"
              >
                {browser ? ($t('common.header.metaGovernanceOverview') || 'Overview') : 'Overview'}
              </a>
              <a 
                href="{base}/frameworks/meta-governance#principles" 
                on:click={(e) => handleMetaGovernanceNavigation(e, 'principles')}
                data-sveltekit-preload-data="hover" 
                role="menuitem"
              >
                {browser ? ($t('common.header.metaGovernancePrinciples') || 'Core Principles') : 'Core Principles'}
              </a>
              <a 
                href="{base}/frameworks/meta-governance#structural" 
                on:click={(e) => handleMetaGovernanceNavigation(e, 'structural')}
                data-sveltekit-preload-data="hover" 
                role="menuitem"
              >
                {browser ? ($t('common.header.metaGovernanceStructural') || 'Structural Components') : 'Structural Components'}
              </a>
              <a 
                href="{base}/frameworks/meta-governance#implementation" 
                on:click={(e) => handleMetaGovernanceNavigation(e, 'implementation')}
                data-sveltekit-preload-data="hover" 
                role="menuitem"
              >
                {browser ? ($t('common.header.metaGovernanceImplementation') || 'Implementation') : 'Implementation'}
              </a>
              <a 
                href="{base}/frameworks/meta-governance#evaluation" 
                on:click={(e) => handleMetaGovernanceNavigation(e, 'evaluation')}
                data-sveltekit-preload-data="hover" 
                role="menuitem"
              >
                {browser ? ($t('common.header.metaGovernanceEvaluation') || 'Evaluation') : 'Evaluation'}
              </a>
              <a 
                href="{base}/frameworks/meta-governance#case-models" 
                on:click={(e) => handleMetaGovernanceNavigation(e, 'case-models')}
                data-sveltekit-preload-data="hover" 
                role="menuitem"
              >
                {browser ? ($t('common.header.metaGovernanceCaseModels') || 'Case Models') : 'Case Models'}
              </a>
              <a 
                href="{base}/frameworks/meta-governance#future" 
                on:click={(e) => handleMetaGovernanceNavigation(e, 'future')}
                data-sveltekit-preload-data="hover" 
                role="menuitem"
              >
                {browser ? ($t('common.header.metaGovernanceFuture') || 'Future Potential') : 'Future Potential'}
              </a>
              <a 
                href="{base}/frameworks/meta-governance#manifesto" 
                on:click={(e) => handleMetaGovernanceNavigation(e, 'manifesto')}
                data-sveltekit-preload-data="hover" 
                role="menuitem"
              >
                {browser ? ($t('common.header.metaGovernanceWhy') || 'Why Join?') : 'Why Join?'}
              </a>
              <a 
                href="{base}/frameworks/meta-governance#quick-start" 
                on:click={(e) => handleMetaGovernanceNavigation(e, 'quick-start')}
                data-sveltekit-preload-data="hover" 
                role="menuitem"
              >
                {browser ? ($t('common.header.metaGovernanceQuickStart') || 'Quick Start') : 'Quick Start'}
              </a>
            </div>
          </li>

          <!-- Frameworks Dropdown (now includes Global Citizenship) -->
          <li class="nav-item dropdown" class:open={isFrameworksDropdownOpen}>
            <div class="dropdown-header">
              <a 
                href="{base}/frameworks"
                class={`nav-link ${browser && $page.url.pathname.startsWith(base + '/frameworks') ? 'active' : ''}`}
                data-sveltekit-preload-data="hover"
              >
                {browser ? ($t('common.header.framework') || 'Frameworks') : 'Frameworks'}
                <svg xmlns="http://www.w3.org/2000/svg" class="dropdown-icon hidden md:inline-block" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <button 
                type="button" 
                class="dropdown-toggle md:hidden" 
                on:click|stopPropagation={toggleFrameworksDropdown}
                on:keydown={(e) => e.key === 'Enter' && toggleFrameworksDropdown(e)}
                aria-label={isFrameworksDropdownOpen ? 'Close frameworks menu' : 'Open frameworks menu'}
                role="button"
                tabindex="0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d={isFrameworksDropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                </svg>
              </button>
            </div>

            <div class="dropdown-menu" on:click|stopPropagation={() => {}} role="menu">
              <!-- Global Citizenship - highlighted as the main framework -->
              <a 
                href="{base}/frameworks/global-citizenship" 
                class={`${isActive('/frameworks/global-citizenship') ? 'active' : ''} highlighted`} 
                data-sveltekit-preload-data="hover" 
                role="menuitem"
              >
                {browser ? ($t('common.header.frameworkGlobalCitizenship') || 'Global Citizenship') : 'Global Citizenship'}
              </a>
              
              <a href="{base}/frameworks" class={isActive('/frameworks') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.frameworkOverview') || 'Overview') : 'Overview'}
              </a>
              <a href="{base}/frameworks/docs" class={isActive('/frameworks/docs') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.frameworkDocs') || 'Documentation') : 'Documentation'}
              </a>
              <a href="{base}/frameworks/docs/principles" class={isActive('/frameworks/docs/principles') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.frameworkPrinciples') || 'Principles') : 'Principles'}
              </a>
              <a href="{base}/frameworks/docs/implementation" class={isActive('/frameworks/docs/implementation') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.frameworkImplementation') || 'Implementation') : 'Implementation'}
              </a>
              <a href="{base}/frameworks/hubs" class={isActive('/frameworks/hubs') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.frameworkHubs') || 'Hubs') : 'Hubs'}
              </a>
              <a href="{base}/frameworks/tools" class={isActive('/frameworks/tools') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.frameworkTools') || 'Tools') : 'Tools'}
              </a>
              <a href="{base}/frameworks/visuals" class={isActive('/frameworks/visuals') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.frameworkVisuals') || 'Visuals') : 'Visuals'}
              </a>
              <a href="{base}/downloads" class={isActive('/downloads') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.frameworkDownloads') || 'Framework Downloads') : 'Downloads'}
              </a>
              <a href="{base}/frameworks/docs/case-studies" class={isActive('/frameworks/docs/case-studies') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.frameworkCaseStudies') || 'Case Studies') : 'Case Studies'}
              </a>
              <a href="{base}/frameworks/ai-futures" class={isActive('/frameworks/ai-futures') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.frameworkAIFutures') || 'AI Futures') : 'AI Futures'}
              </a>
              <a href="{base}/frameworks/docs/resources" class={isActive('/frameworks/docs/resources') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.frameworkResources') || 'Resources') : 'Resources'}
              </a>
              <a href="{base}/frameworks/docs/glossary" class={isActive('/frameworks/docs/glossary') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.frameworkGlossary') || 'Glossary') : 'Glossary'}
              </a>
            </div>
          </li>

          <!-- New Get Involved Dropdown -->
          <li class="nav-item dropdown" class:open={isGetInvolvedDropdownOpen}>
            <div class="dropdown-header">
              <a 
                href="{base}/get-involved"
                class={`nav-link ${browser && $page.url.pathname.startsWith(base + '/get-involved') ? 'active' : ''}`}
                data-sveltekit-preload-data="hover"
              >
                {browser ? ($t('common.header.getInvolved') || 'Get Involved') : 'Get Involved'}
                <svg xmlns="http://www.w3.org/2000/svg" class="dropdown-icon hidden md:inline-block" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <button 
                type="button" 
                class="dropdown-toggle md:hidden" 
                on:click|stopPropagation={toggleGetInvolvedDropdown}
                on:keydown={(e) => e.key === 'Enter' && toggleGetInvolvedDropdown(e)}
                aria-label={isGetInvolvedDropdownOpen ? 'Close get involved menu' : 'Open get involved menu'}
                role="button"
                tabindex="0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d={isGetInvolvedDropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                </svg>
              </button>
            </div>

            <div class="dropdown-menu" on:click|stopPropagation={() => {}} role="menu">
              <a href="{base}/get-involved/founding" class={isActive('/get-involved/founding') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.getInvolvedFounding') || 'Founding Organization') : 'Founding Organization'}
              </a>
              <a href="{base}/get-involved/frameworks" class={isActive('/get-involved/frameworks') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.getInvolvedFrameworks') || 'Contribute to Frameworks') : 'Contribute to Frameworks'}
              </a>
              <a href="{base}/get-involved/translations" class={isActive('/get-involved/translations') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.getInvolvedTranslations') || 'Contribute Translations') : 'Contribute Translations'}
              </a>
              <a href="{base}/get-involved/website" class={isActive('/get-involved/website') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.getInvolvedWebsite') || 'Contribute to Website') : 'Contribute to Website'}
              </a>
              <a href="{base}/get-involved/outreach" class={isActive('/get-involved/outreach') ? 'active' : ''} data-sveltekit-preload-data="hover" role="menuitem">
                {browser ? ($t('common.header.getInvolvedOutreach') || 'Community & Outreach') : 'Community & Outreach'}
              </a>
            </div>
          </li>

          <li class="nav-item">
            <a 
              href="{base}/blog"
              class={`nav-link ${isActive('/blog') ? 'active' : ''}`}
              data-sveltekit-preload-data="hover"
            >
              {browser ? ($t('common.header.blog') || 'Blog') : 'Blog'}
            </a>
          </li>

          <li class="nav-item">
            <a 
              href="{base}/about"
              class={`nav-link ${isActive('/about') ? 'active' : ''}`}
              data-sveltekit-preload-data="hover"
            >
              {browser ? ($t('common.header.about') || 'About') : 'About'}
            </a>
          </li>
          <li class="nav-item">
            <a 
              href="{base}/contact"
              class={`nav-link ${isActive('/contact') ? 'active' : ''}`}
              data-sveltekit-preload-data="hover"
            >
              {browser ? ($t('common.header.contact') || 'Contact') : 'Contact'}
            </a>
          </li>
        </ul>
        
        <div>
          <select 
            aria-label={browser ? ($t('common.language.select') || 'Select language') : 'Select language'}
            value={browser ? $locale : 'en'} 
            on:change={handleLocaleChange}
            class="language-select"
            title={browser ? ($t('common.language.tooltip') || 'Change language') : 'Change language'}
          >
            {#each (browser ? $locales : ['en', 'sv']) as loc}
              <option value={loc}>{loc.toUpperCase()}</option>
            {/each}
          </select>
        </div>
      </nav>
    </div>
  </div>
</header>
