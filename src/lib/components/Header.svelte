<!-- src/lib/components/Header.svelte -->
<script>
  import { t, locale, locales, getLanguageName, setLocale } from '$lib/i18n';
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { allFrameworks, tierMetadata, getFrameworksByTier, getAllTiers } from '$lib/stores/frameworkNav.js';
  
  // Handle language selection
  function handleLocaleChange(e) {
    const newLocale = e.target.value;
    setLocale(newLocale);
  }

  // Mobile menu state
  let isMenuOpen = false;
  let isFrameworksDropdownOpen = false;
  let isGetInvolvedDropdownOpen = false;
  
  // Mobile submenu states
  let isTieredFrameworksOpen = false;
  let openTiers = {}; // Track which tiers are open

  // Group frameworks by tier for the tiered menu
  const frameworksByTier = {};
  const tiers = getAllTiers();
  
  tiers.forEach(tier => {
    frameworksByTier[tier] = getFrameworksByTier(tier);
  });

  function handleMetaGovernanceNavigation(event, section) {
    event.preventDefault();
    event.stopPropagation();
    
    if (browser) {
      console.log('Header navigation triggered for section:', section);
      console.log('Current pathname:', $page.url.pathname);
      
      // Close dropdown
      isFrameworksDropdownOpen = false;
      
      // Check if we're already on the meta-governance page
      if ($page.url.pathname === base + '/frameworks/meta-governance') {
        console.log('Already on page, updating hash');
        window.location.hash = section;
      } else {
        console.log('Navigating to page with hash');
        goto(`${base}/frameworks/meta-governance#${section}`).then(() => {
          console.log('Navigation completed');
          setTimeout(() => {
            if (window.location.hash !== `#${section}`) {
              window.location.hash = section;
            }
          }, 100);
        });
      }
    }
  }
  
  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
    // Close all dropdowns when main menu is closed
    if (!isMenuOpen) {
      isFrameworksDropdownOpen = false;
      isGetInvolvedDropdownOpen = false;
      isTieredFrameworksOpen = false;
      openTiers = {};
    }
  };

  const toggleFrameworksDropdown = (e) => {
    e.stopPropagation();
    isFrameworksDropdownOpen = !isFrameworksDropdownOpen;
    // Close tier dropdowns when frameworks dropdown is closed
    if (!isFrameworksDropdownOpen) {
      isTieredFrameworksOpen = false;
      openTiers = {};
    }
  };

  const toggleGetInvolvedDropdown = (e) => {
    e.stopPropagation();
    isGetInvolvedDropdownOpen = !isGetInvolvedDropdownOpen;
  };

  const toggleTieredFrameworks = (e) => {
    e.stopPropagation();
    isTieredFrameworksOpen = !isTieredFrameworksOpen;
    // Close all tier dropdowns when tiered frameworks is closed
    if (!isTieredFrameworksOpen) {
      openTiers = {};
    }
  };

  const toggleTier = (tier, e) => {
    e.stopPropagation();
    openTiers = {
      ...openTiers,
      [tier]: !openTiers[tier]
    };
  };
  
  const closeDropdowns = () => {
    if (isFrameworksDropdownOpen) isFrameworksDropdownOpen = false;
    if (isGetInvolvedDropdownOpen) isGetInvolvedDropdownOpen = false;
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
    padding: 1rem 0; /* Increased from 0.75rem */
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
    height: 40px; /* Increased from 35px */
    width: 40px; /* Increased from 35px */
    margin-right: 0.75rem; /* Increased from 0.5rem */
  }
  
  .site-title {
    font-size: 1.375rem !important; /* Increased from 1.125rem */
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
      margin-right: 1.5rem !important; /* Increased spacing due to more space */
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
    font-size: 1rem !important; /* Increased from 0.9rem */
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
    padding: 0.4rem 0.7rem !important; /* Increased from 0.3rem 0.6rem */
    border: 1px solid #2D5F2D;
    border-radius: 0.375rem;
    background-color: #ffffff;
    color: #2B4B8C;
    cursor: pointer;
    font-size: 0.9rem !important; /* Increased from 0.8rem */
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
    min-width: 210px; /* Reduced from 280px (75% of 280px = 210px) */
    background-color: #ffffff;
    border: 1px solid #2D5F2D;
    border-radius: 0.375rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 60;
    margin-top: 0.25rem;
    padding-top: 0.25rem;
    flex-direction: column;
    overflow-x: visible; /* Keep this */
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
    padding: 0.5rem 0.9rem !important; /* Increased padding */
    color: #2B4B8C;
    text-decoration: none;
    border-left: 3px solid transparent;
    transition: all 0.2s;
    font-size: 0.9rem !important; /* Increased from 0.85rem */
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
    border-left-color: #6B5CA5; /* Use purple for Global Citizenship */
  }

  .dropdown-menu a.meta-governance {
    color: #DAA520;
    font-weight: 700;
    background-color: #fffbeb;
    border-left-color: #DAA520;
  }

  .dropdown-menu a.meta-governance:hover {
    background-color: #fef3c7;
  }

  .dropdown-separator {
    height: 1px;
    background-color: #e5e7eb;
    margin: 0.5rem 0;
  }

  .dropdown-section-title {
    padding: 0.25rem 0.9rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-top: 0.25rem;
  }

  .dropdown-scrollable-content {
    max-height: 50vh; /* Adjust height as needed */
    overflow-y: auto;
  }

  .dropdown-scrollable-content a {
    display: block;
    padding: 0.5rem 0.9rem !important;
    color: #2B4B8C;
    text-decoration: none;
    border-left: 3px solid transparent;
    transition: all 0.2s;
    font-size: 0.9rem !important;
    line-height: 1.3;
  }

  .dropdown-scrollable-content a:hover {
    background-color: #f7f1e3;
    color: #DAA520;
    border-left-color: #DAA520;
  }

  .dropdown-scrollable-content a.active {
    color: #DAA520;
    border-left-color: #DAA520;
    font-weight: 600;
  }

  /* Sub-menu styles for tiered frameworks */
  .dropdown-submenu {
    position: relative;
  }

  .dropdown-submenu > a {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .dropdown-submenu > a::after {
    content: '▸';
    font-size: 0.75rem;
    opacity: 0.7;
  }

  .dropdown-submenu .dropdown-menu-level2 {
    display: none;
    position: absolute;
    top: 0;
    left: calc(100% + 2px);
    min-width: 200px; /* Reduced from 320px to adapt to content */
    width: max-content; /* Adapt to content width */
    max-width: 250px; /* Prevent it from getting too wide */
    background-color: #ffffff;
    border: 1px solid #2D5F2D;
    border-radius: 0.375rem;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    overflow-x: visible;
    overflow-y: visible; /* Remove scrolling from level 2 */
  }

  /* FIXED: Proper hover activation for level 2 menu */
  .dropdown-submenu:hover > .dropdown-menu-level2 {
    display: block;
  }

  /* FIXED: Add hover bridge for level 2 */
  .dropdown-submenu::before {
    content: '';
    position: absolute;
    top: 0;
    right: -5px;
    width: 10px;
    height: 100%;
    background-color: transparent;
    z-index: 999;
  }

  /* Tier submenu styles */
  .tier-submenu {
    position: relative;
  }

 /* Replace it with this revised version */
  .tier-submenu > a {
    display: block;
    padding: 0.4rem 0.9rem !important;
    color: #6b7280;                   
    background-color: transparent;    
    font-weight: 500;                 
    text-decoration: none;
    border-left: 3px solid transparent;
    transition: all 0.2s;
    font-size: 0.8rem !important;     
    line-height: 1.3;
    position: relative;
    text-transform: uppercase;        
    letter-spacing: 0.05em;           
  }

  .tier-submenu > a:hover {
    background-color: #f1f5f9;
    color: #1e293b;
    border-left-color: #6B5CA5;
  }

  .tier-submenu > a::after {
    content: '▸';
    font-size: 0.75rem;
    opacity: 0.7;
    position: absolute;
    right: 0.9rem;
    top: 50%;
    transform: translateY(-50%);
  }

  .tier-submenu .dropdown-menu-level3 {
    display: none;
    position: absolute;
    top: 0;
    left: calc(100% + 2px);
    min-width: 280px;
    width: max-content;
    max-width: 320px;
    background-color: #ffffff;
    border: 1px solid #2D5F2D;
    border-radius: 0.375rem;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    z-index: 1001;
    overflow-x: visible;
    padding-top: 0.25rem;
  }

  /* Add scrollable content for level 3 if there are many frameworks */
  .tier-submenu .dropdown-menu-level3-scrollable {
    max-height: 400px;
    overflow-y: auto;
    padding-bottom: 0.25rem;
  }

  /* FIXED: Proper hover activation for level 3 menu */
  .tier-submenu:hover > .dropdown-menu-level3 {
    display: block;
  }

  /* FIXED: Add hover bridge for level 3 */
  .tier-submenu::before {
    content: '';
    position: absolute;
    top: 0;
    right: -5px;
    width: 10px;
    height: 100%;
    background-color: transparent;
    z-index: 1000;
  }

  .tier-submenu .dropdown-menu-level3 a,
  .tier-submenu .dropdown-menu-level3-scrollable a {
    padding: 0.4rem 1.2rem !important;
    font-size: 0.85rem !important;
    white-space: nowrap;
    display: block;
    color: #2B4B8C;
    text-decoration: none;
    border-left: 3px solid transparent;
    transition: all 0.2s;
    line-height: 1.3;
  }

  .tier-submenu .dropdown-menu-level3 a:hover,
  .tier-submenu .dropdown-menu-level3-scrollable a:hover {
    background-color: #f7f1e3;
    color: #DAA520;
    border-left-color: #DAA520;
  }

  .tier-submenu .dropdown-menu-level3 a.active,
  .tier-submenu .dropdown-menu-level3-scrollable a.active {
    color: #DAA520;
    border-left-color: #DAA520;
    font-weight: 600;
  }

  .hidden {
    display: none;
  }
  
  @media (min-width: 768px) {
    .language-select {
      margin-left: 1rem !important; /* Increased spacing */
    }

    .md\:hidden {
      display: none;
    }
    
    .md\:inline-block {
      display: inline-block;
    }
  }

  /* Custom responsive visibility classes */
  .desktop-only {
    display: none;
  }
  
  .mobile-only {
    display: block;
  }
  
  @media (min-width: 768px) {
    .desktop-only {
      display: block;
    }
    
    .mobile-only {
      display: none;
    }
  }

  /* MOBILE-SPECIFIC STYLES */
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
      /* Add scrolling capability for mobile */
      max-height: 60vh;
      overflow-y: auto;
      background-color: rgba(255, 255, 255, 0.95);
      border-radius: 0.375rem;
      padding: 0.5rem 0;
    }
    
    .dropdown.open .dropdown-menu {
      display: block;
    }
    
    .dropdown .dropdown-toggle {
      display: inline-block;
      margin-left: 0.5rem;
      cursor: pointer;
    }

    /* Mobile: Control the sub-menus with collapsible state */
    .mobile-submenu {
      margin-left: 1rem;
      border-left: 2px solid #e5e7eb;
      background-color: #f9fafb;
      border-radius: 0.25rem;
      margin-top: 0.5rem;
      max-height: 40vh;
      overflow-y: auto;
    }

    .mobile-submenu.hidden {
      display: none;
    }

    .mobile-tier-submenu {
      margin-left: 1rem;
      border-left: 2px solid #e5e7eb;
      background-color: #f3f4f6;
      border-radius: 0.25rem;
      margin-top: 0.25rem;
      max-height: 30vh;
      overflow-y: auto;
    }

    .mobile-tier-submenu.hidden {
      display: none;
    }

    .mobile-submenu-toggle,
    .mobile-tier-toggle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 0.5rem 0.9rem;
      background: none;
      border: none;
      color: #2B4B8C;
      font-size: 0.9rem;
      cursor: pointer;
      text-align: left;
      border-left: 3px solid transparent;
      transition: all 0.2s;
    }

    .mobile-submenu-toggle:hover,
    .mobile-tier-toggle:hover {
      background-color: #f7f1e3;
      color: #DAA520;
      border-left-color: #DAA520;
    }

    .mobile-submenu-toggle svg,
    .mobile-tier-toggle svg {
      transition: transform 0.2s;
    }

    .mobile-submenu-toggle.open svg,
    .mobile-tier-toggle.open svg {
      transform: rotate(90deg);
    }

    /* Remove desktop sub-menu behavior on mobile */
    .dropdown-submenu .dropdown-menu-level2,
    .tier-submenu .dropdown-menu-level3 {
      position: static;
      box-shadow: none;
      border: none;
      margin: 0;
      display: none;
    }

    .dropdown-submenu > a::after,
    .tier-submenu > a::after {
      display: none;
    }

    /* Make sure scrollable content works on mobile */
    .dropdown-scrollable-content {
      max-height: 40vh;
      overflow-y: auto;
    }
  }
  
  .dropdown-toggle {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: 0;
  }

  /* Responsive adjustments for larger text */
  @media (max-width: 1300px) and (min-width: 768px) {
    .nav-item {
      margin-right: 1.3rem !important;
    }
  }

  @media (max-width: 1200px) and (min-width: 768px) {
    .nav-item {
      margin-right: 1.2rem !important;
    }
    
    .nav-link {
      font-size: 0.95rem !important;
    }
    
    .language-select {
      font-size: 0.85rem !important;
    }
  }

  @media (max-width: 1100px) and (min-width: 768px) {
    .nav-item {
      margin-right: 1.1rem !important;
    }
    
    .nav-link {
      font-size: 0.9rem !important;
    }
    
    .language-select {
      font-size: 0.8rem !important;
      padding: 0.35rem 0.6rem !important;
    }
    
    .dropdown-menu a {
      font-size: 0.85rem !important;
      padding: 0.45rem 0.8rem !important;
    }
  }

  .dropdown-item-btn {
    display: block;
    width: 100%;
    padding: 0.5rem 0.9rem !important;
    color: #2B4B8C;
    text-decoration: none;
    border: none;
    background: none;
    text-align: left;
    cursor: pointer;
    border-left: 3px solid transparent;
    transition: all 0.2s;
    font-size: 0.9rem !important;
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

  /* Right-side positioning for menus that would overflow */
  @media (min-width: 768px) {
    .dropdown-submenu .dropdown-menu-level2.position-right {
      left: auto;
      right: calc(100% + 2px);
    }

    .tier-submenu .dropdown-menu-level3.position-right {
      left: auto;
      right: calc(100% + 2px);
    }
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

          <!-- Single Frameworks Dropdown with Hierarchical Structure -->
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
              <!-- Foundational Frameworks Section -->
              
              <!-- Meta-Governance - The Core Architecture -->
              <a 
                href="{base}/frameworks/meta-governance" 
                class={`meta-governance ${browser && ($page.url.pathname === base + '/frameworks/meta-governance' || $page.url.pathname.startsWith(base + '/frameworks/meta-governance/')) ? 'active' : ''}`}
                data-sveltekit-preload-data="hover" 
                role="menuitem"
              >
                {browser ? ($t('common.header.metaGovernance') || 'Meta-Governance') : 'Meta-Governance'}
              </a>
              
              <!-- Global Citizenship - The Human Foundation -->
              <a 
                href="{base}/frameworks/global-citizenship" 
                class={`${isActive('/frameworks/global-citizenship') ? 'active' : ''} highlighted`} 
                data-sveltekit-preload-data="hover" 
                role="menuitem"
              >
                {browser ? ($t('common.header.frameworkGlobalCitizenship') || 'Global Citizenship') : 'Global Citizenship'}
              </a>
              
              <!-- Visual Separator -->
              <div class="dropdown-separator"></div>
              
              <!-- Desktop: Implementation Frameworks with Tiered Sub-Sub-Menus -->
              <div class="dropdown-submenu desktop-only">
                <a href="{base}/frameworks" role="menuitem">
                  {browser ? ($t('common.header.tieredFrameworks') || 'Tiered Frameworks') : 'Tiered Frameworks'}
                </a>
                <div class="dropdown-menu-level2">
                  {#each tiers as tier}
                    <div class="tier-submenu">
                      <a href="{base}/frameworks/tier-{tier}" role="menuitem">
                        {browser ? ($t(tierMetadata[tier]?.titleKey) || `Tier ${tier}`) : `Tier ${tier}`}
                      </a>
                      <div class="dropdown-menu-level3">
                        {#if (frameworksByTier[tier] || []).length > 8}
                          <!-- If more than 8 frameworks, add scrollable container -->
                          <div class="dropdown-menu-level3-scrollable">
                            {#each frameworksByTier[tier] || [] as framework}
                              <a 
                                href="{base}{framework.path}" 
                                class={isActive(framework.path) ? 'active' : ''} 
                                data-sveltekit-preload-data="hover" 
                                role="menuitem"
                              >
                                {browser ? ($t(framework.titleKey) || framework.title || framework.name || framework.slug) : (framework.title || framework.name || framework.slug)}
                              </a>
                            {/each}
                          </div>
                        {:else}
                          <!-- If 8 or fewer frameworks, no scrolling needed -->
                          {#each frameworksByTier[tier] || [] as framework}
                            <a 
                              href="{base}{framework.path}" 
                              class={isActive(framework.path) ? 'active' : ''} 
                              data-sveltekit-preload-data="hover" 
                              role="menuitem"
                            >
                              {browser ? ($t(framework.titleKey) || framework.title || framework.name || framework.slug) : (framework.title || framework.name || framework.slug)}
                            </a>
                          {/each}
                        {/if}
                      </div>
                    </div>
                  {/each}
                </div>
              </div>

              <!-- Mobile: Collapsible Tiered Frameworks -->
              <div class="mobile-only">
                <button 
                  type="button" 
                  class={`mobile-submenu-toggle ${isTieredFrameworksOpen ? 'open' : ''}`}
                  on:click|stopPropagation={(e) => toggleTieredFrameworks(e)}
                  aria-label={isTieredFrameworksOpen ? 'Close tiered frameworks' : 'Open tiered frameworks'}
                >
                  <span>{browser ? ($t('common.header.tieredFrameworks') || 'Tiered Frameworks') : 'Tiered Frameworks'}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                <div class={`mobile-submenu ${isTieredFrameworksOpen ? '' : 'hidden'}`}>
                  {#each tiers as tier}
                    <div>
                      <button 
                        type="button" 
                        class={`mobile-tier-toggle ${openTiers[tier] ? 'open' : ''}`}
                        on:click|stopPropagation={(e) => toggleTier(tier, e)}
                        aria-label={openTiers[tier] ? `Close tier ${tier}` : `Open tier ${tier}`}
                      >
                        <span>{browser ? ($t(tierMetadata[tier]?.titleKey) || `Tier ${tier}`) : `Tier ${tier}`}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      
                      <div class={`mobile-tier-submenu ${openTiers[tier] ? '' : 'hidden'}`}>
                        {#each frameworksByTier[tier] || [] as framework}
                          <a 
                            href="{base}{framework.path}" 
                            class={`${isActive(framework.path) ? 'active' : ''}`} 
                            data-sveltekit-preload-data="hover" 
                            role="menuitem"
                            style="display: block; padding: 0.4rem 1.2rem; font-size: 0.85rem; color: #2B4B8C; text-decoration: none; border-left: 3px solid transparent; transition: all 0.2s;"
                            on:mouseenter={(e) => {
                              e.target.style.backgroundColor = '#f7f1e3';
                              e.target.style.color = '#DAA520';
                              e.target.style.borderLeftColor = '#DAA520';
                            }}
                            on:mouseleave={(e) => {
                              if (!e.target.classList.contains('active')) {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.color = '#2B4B8C';
                                e.target.style.borderLeftColor = 'transparent';
                              }
                            }}
                          >
                            {browser ? ($t(framework.titleKey) || framework.title || framework.name || framework.slug) : (framework.title || framework.name || framework.slug)}
                          </a>
                        {/each}
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
              
              <!-- Visual Separator -->
              <div class="dropdown-separator"></div>
              
              <!-- Scrollable Content Area for all the static links -->
              <div class="dropdown-scrollable-content">
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
            </div>
          </li>

          <!-- Get Involved Dropdown -->
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
                {browser ? ($t('common.header.getInvolvedFounding') ||  'Founding Organization') : 'Founding Organization'}
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
