<!-- src/routes/frameworks/peace-and-conflict-resolution/+page.svelte -->
<script>
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { invalidate } from '$app/navigation';
  import { base } from '$app/paths';
  import SectionNotice from '$lib/components/SectionNotice.svelte';
  import FrameworkSidebar from '$lib/components/FrameworkSidebar.svelte';
  import { onMount, tick } from 'svelte';
  import { slide } from 'svelte/transition';

  export let data;

  // Extract peaceFramework translations for shorter references
  $: pf = $t('peaceFramework') || {};
  $: translationFunction = $t;
  
  // Debug logging
  $: if (browser && mounted) {
    console.log('Peace Framework translations:', pf);
    console.log('Has peace framework keys:', Object.keys(pf));
  }

  // Keep track of which section is active (for sub-navigation)
  let activeSection = 'index';

  // This will track the current locale for our component
  $: currentLocale = $locale;

  // Check if we're in print mode - simplified to avoid hydration issues
  let isPrintMode = false;
  
  // Client-side only initialization to avoid hydration mismatches
  let mounted = false;
  let initializing = true;

  // If in print mode, we'll show all sections
  $: sectionsToShow = (mounted && isPrintMode) ? Object.keys(data?.sections || {}) : [activeSection];

  // Accordion states - initialize in a way that prevents hydration issues
  let foundationsOpen = false;
  let governanceOpen = false;
  let modernOpen = false;
  let humanOpen = false;
  let actorsOpen = false;
  let structuralOpen = false;
  let implementationOpen = false;

  // Define section groupings - match the original structure
  const sectionGroups = {
    foundations: ['core-principles', 'developmental-value-systems', 'measuring-success'],
    governance: ['local-implementation', 'regional-implementation', 'global-implementation'],
    modern: ['digital-infrastructure', 'ai-ethics', 'emerging-technologies', 'climate-resource', 'media-information'],
    human: ['indigenous-integration', 'transitional-justice', 'mental-health', 'educational-cultural-infrastructure'],
    actors: ['non-state-actors', 'military-transformation', 'whistleblower-protection', 'peace-business-integration'],
    structural: ['structural-prevention', 'peace-financing', 'cross-domain-integration'],
    implementation: ['context-specific-roadmaps', 'implementation-timeline', 'implementation-challenges', 'visualizations', 'conclusion']
  };

  // Guide sections
  const guideSections = ['technical-guide-policymakers', 'community-peace-guide', 'youth-peace-action-guide', 'digital-peace-ethics-guide'];

  // Initialize accordion states after mount
  function initializeAccordionStates() {
    // Reset all accordions
    foundationsOpen = false;
    governanceOpen = false;
    modernOpen = false;
    humanOpen = false;
    actorsOpen = false;
    structuralOpen = false;
    implementationOpen = false;

    // Set initial accordion states based on active section
    if (activeSection === 'index' || guideSections.includes(activeSection)) {
      foundationsOpen = true;
    } else if (sectionGroups.foundations.includes(activeSection)) {
      foundationsOpen = true;
    } else if (sectionGroups.governance.includes(activeSection)) {
      governanceOpen = true;
    } else if (sectionGroups.modern.includes(activeSection)) {
      modernOpen = true;
    } else if (sectionGroups.human.includes(activeSection)) {
      humanOpen = true;
    } else if (sectionGroups.actors.includes(activeSection)) {
      actorsOpen = true;
    } else if (sectionGroups.structural.includes(activeSection)) {
      structuralOpen = true;
    } else if (sectionGroups.implementation.includes(activeSection)) {
      implementationOpen = true;
    } else {
      // Default state for overview
      foundationsOpen = true;
    }
  }

  onMount(async () => {
    await tick(); // Wait for DOM to be ready
    mounted = true;
    
    if (browser) {
      // Check print mode only on client
      const urlParams = new URLSearchParams(window.location.search);
      isPrintMode = urlParams.get('print') === 'true';
      
      // Make this function available globally for the PDF generator
      window.showAllSectionsForPrint = () => {
        isPrintMode = true;
      };

      // Handle URL parameters and hash
      const sectionParam = urlParams.get('section');
      
      if (sectionParam && data?.sections?.[sectionParam]) {
        activeSection = sectionParam;
      } else if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        if (hash && data?.sections?.[hash]) {
          activeSection = hash;
        }
      }

      // Initialize accordion states after setting active section
      initializeAccordionStates();

      // Listen for hash changes
      const handleHashChange = () => {
        const hash = window.location.hash.substring(1);
        if (hash && data?.sections?.[hash] && activeSection !== hash) {
          activeSection = hash;
          initializeAccordionStates();
          
          // Scroll to content
          setTimeout(() => {
            const contentElement = document.querySelector('.content');
            if (contentElement) {
              contentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }, 100);
        }
      };

      window.addEventListener('hashchange', handleHashChange);
      
      initializing = false;
      
      // Cleanup
      return () => {
        window.removeEventListener('hashchange', handleHashChange);
        if (window.showAllSectionsForPrint) {
          delete window.showAllSectionsForPrint;
        }
      };
    }
    
    initializing = false;
  });

  // Function to set active section
  function setActiveSection(section) {
    if (!data?.sections?.[section]) return;
    
    activeSection = section;
    initializeAccordionStates();
    
    if (browser) {
      const url = new URL(window.location.href);
      url.hash = section;
      history.replaceState(null, '', url.toString());

      setTimeout(() => {
        const contentElement = document.querySelector('.section-content');
        if (contentElement) {
          contentElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        }
      }, 100);
    }
  }

  // Get section titles in current language using short references
  function getSectionTitle(section) {
    return pf.sections?.[section] || section;
  }

  // Get section category titles using short references
  function getSectionCategoryTitle(category) {
    return pf.categories?.[category] || category;
  }

  // Function to get shortened section titles for navigation using short references
  function getShortSectionTitle(section) {
    return pf.sectionsShort?.[section] || getSectionTitle(section);
  }

  // Function to download the peace guide PDF
  function downloadPeaceGuide(version = '') {
    const versionSuffix = version ? `-${version}` : '';
    const pdfUrl = `${base}/assets/pdf/peace-framework-guide${versionSuffix}-${currentLocale}.pdf`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `peace-framework-guide${versionSuffix}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Computed values - add safety checks
  $: isGuideActive = guideSections.includes(activeSection);
  $: isSupplementaryActive = sectionGroups.implementation.includes(activeSection);
  $: allCoreSections = [
    ...sectionGroups.foundations,
    ...sectionGroups.governance,
    ...sectionGroups.modern,
    ...sectionGroups.human,
    ...sectionGroups.actors,
    ...sectionGroups.structural,
    ...sectionGroups.implementation
  ];
  $: isCoreSection = allCoreSections.includes(activeSection);

  // Get guides from translations
  $: guides = pf.guides?.guides || [];

  // For the guide selector
  let selectedGuide = 'technical-guide-policymakers';
  
  function selectGuide(guide) {
    selectedGuide = guide;
    setActiveSection(guide);
  }

  // Toggle functions for accordions
  function toggleFoundations() {
    foundationsOpen = !foundationsOpen;
  }

  function toggleGovernance() {
    governanceOpen = !governanceOpen;
  }

  function toggleModern() {
    modernOpen = !modernOpen;
  }

  function toggleHuman() {
    humanOpen = !humanOpen;
  }

  function toggleActors() {
    actorsOpen = !actorsOpen;
  }

  function toggleStructural() {
    structuralOpen = !structuralOpen;
  }

  function toggleImplementation() {
    implementationOpen = !implementationOpen;
  }

  // For handling dropdown states
  let isDropdownOpen = false;

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  // Close dropdowns when clicking outside
  function handleClickOutside(event) {
    if (browser) {
      const clickedInsideDropdown = event.target.closest('.dropdown');
      if (!clickedInsideDropdown && isDropdownOpen) {
        isDropdownOpen = false;
      }
    }
  }

  // Close dropdown when pressing Escape key
  function handleKeydown(event) {
    if (event.key === 'Escape') {
      isDropdownOpen = false;
    }
  }

  onMount(() => {
    if (browser) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleKeydown);
      return () => {
        document.removeEventListener('click', handleClickOutside);
        document.removeEventListener('keydown', handleKeydown);
      };
    }
  });

  // Handle locale changes - add safety check
  $: if (browser && mounted && $locale) {
    invalidate('app:locale');
  }
</script>

<svelte:head>
  <title>{pf.meta?.title || 'Peace & Conflict Resolution Framework - Global Governance Framework'}</title>
  <meta name="description" content="{pf.meta?.description || 'A comprehensive framework for peace governance, conflict prevention, and sustainable resolution across all scales of society'}" />
</svelte:head>

<SectionNotice 
  type="warning" 
  customContent={true}
>
  <p>{$t('common.notices.section.frameworks.text')}</p>
</SectionNotice>

{#if mounted}
  <div class="documentation-container">
    {#if !isPrintMode}
      <FrameworkSidebar />
    {/if}

    <div class="content">
      <!-- Quick Access Card for Peace Guides -->
      {#if !isPrintMode && !isGuideActive && activeSection === 'index'}
        <div class="peace-guide-card">
          <div class="card-content">
            <div class="card-icon">📘</div>
            <div class="card-text">
              <h3>{pf.guides?.new || 'New to the Peace & Conflict Resolution Framework?'}</h3>
              <p>{pf.guides?.start || 'Start with one of our simplified guides that explain the core concepts for different audiences.'}</p>
            </div>
            <div class="card-actions">
              <div class="dropdown">
                <button 
                  class="primary-btn dropdown-toggle" 
                  on:click={toggleDropdown}
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                  type="button"
                >
                  {pf.guides?.button || 'Choose Guide'} 
                  <span class="arrow-icon" class:rotated={isDropdownOpen}>▾</span>
                </button>
                <div 
                  class="dropdown-menu" 
                  class:show={isDropdownOpen}
                  role="menu"
                  aria-hidden={!isDropdownOpen}
                >
                  {#each guides as guide}
                    <button 
                      class="dropdown-item" 
                      on:click|stopPropagation={() => selectGuide(guide.id)}
                      role="menuitem"
                      type="button"
                    >
                      <span class="guide-icon">{guide.icon}</span>
                      <div class="guide-info">
                        <span class="guide-title">{guide.title}</span>
                        <span class="guide-desc">{guide.description}</span>
                      </div>
                    </button>
                  {/each}
                </div>
              </div>
            </div>
          </div>
        </div>
      {/if}

      <!-- Sub-navigation for peace framework sections -->
      {#if !isPrintMode && !initializing} 
        <div class="section-nav">
          <!-- Overview -->
          <div class="nav-section">
            <button 
              class="nav-item overview-item" 
              class:active={activeSection === 'index'}
              on:click={() => setActiveSection('index')}
            >
              <span class="nav-icon">🏠</span>
              <span class="nav-title">{getSectionCategoryTitle('overview')}</span>
            </button>
          </div>

          <!-- Foundations & Principles Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={foundationsOpen}
              class:has-active={isGuideActive || sectionGroups.foundations.some(section => activeSection === section)}
              on:click={toggleFoundations}
            >
              <span class="accordion-icon">📚</span>
              <span class="accordion-title">{getSectionCategoryTitle('foundations')}</span>
              <span class="section-count">({guides.length + sectionGroups.foundations.length})</span>
              <span class="toggle-arrow" class:rotated={foundationsOpen}>▼</span>
            </button>
            {#if foundationsOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each guides as guide}
                  <button 
                    class="nav-item subsection-item" 
                    class:active={activeSection === guide.id}
                    on:click={() => setActiveSection(guide.id)}
                  >
                    <span class="nav-icon">{guide.icon}</span>
                    <span class="nav-title">{getShortSectionTitle(guide.id)}</span>
                  </button>
                {/each}
                {#each sectionGroups.foundations as section}
                  <button 
                    class="nav-item subsection-item" 
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                  >
                    <span class="nav-icon">📜</span>
                    <span class="nav-title">{getShortSectionTitle(section)}</span>
                  </button>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Governance Across Scales Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={governanceOpen}
              class:has-active={sectionGroups.governance.some(section => activeSection === section)}
              on:click={toggleGovernance}
            >
              <span class="accordion-icon">🌍</span>
              <span class="accordion-title">{getSectionCategoryTitle('governance')}</span>
              <span class="section-count">({sectionGroups.governance.length})</span>
              <span class="toggle-arrow" class:rotated={governanceOpen}>▼</span>
            </button>
            {#if governanceOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each sectionGroups.governance as section}
                  <button 
                    class="nav-item subsection-item" 
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                  >
                    <span class="nav-icon">🏛️</span>
                    <span class="nav-title">{getShortSectionTitle(section)}</span>
                  </button>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Modern Conflict Arenas Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={modernOpen}
              class:has-active={sectionGroups.modern.some(section => activeSection === section)}
              on:click={toggleModern}
            >
              <span class="accordion-icon">💻</span>
              <span class="accordion-title">{getSectionCategoryTitle('modern')}</span>
              <span class="section-count">({sectionGroups.modern.length})</span>
              <span class="toggle-arrow" class:rotated={modernOpen}>▼</span>
            </button>
            {#if modernOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each sectionGroups.modern as section}
                  <button 
                    class="nav-item subsection-item" 
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                  >
                    <span class="nav-icon">⚡</span>
                    <span class="nav-title">{getShortSectionTitle(section)}</span>
                  </button>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Human-Centered Approaches Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={humanOpen}
              class:has-active={sectionGroups.human.some(section => activeSection === section)}
              on:click={toggleHuman}
            >
              <span class="accordion-icon">🤝</span>
              <span class="accordion-title">{getSectionCategoryTitle('human')}</span>
              <span class="section-count">({sectionGroups.human.length})</span>
              <span class="toggle-arrow" class:rotated={humanOpen}>▼</span>
            </button>
            {#if humanOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each sectionGroups.human as section}
                  <button 
                    class="nav-item subsection-item" 
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                  >
                    <span class="nav-icon">💙</span>
                    <span class="nav-title">{getShortSectionTitle(section)}</span>
                  </button>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Actor-Specific Engagement Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={actorsOpen}
              class:has-active={sectionGroups.actors.some(section => activeSection === section)}
              on:click={toggleActors}
            >
              <span class="accordion-icon">🎯</span>
              <span class="accordion-title">{getSectionCategoryTitle('actors')}</span>
              <span class="section-count">({sectionGroups.actors.length})</span>
              <span class="toggle-arrow" class:rotated={actorsOpen}>▼</span>
            </button>
            {#if actorsOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each sectionGroups.actors as section}
                  <button 
                    class="nav-item subsection-item" 
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                  >
                    <span class="nav-icon">🛡️</span>
                    <span class="nav-title">{getShortSectionTitle(section)}</span>
                  </button>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Structural & Systemic Dimensions Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={structuralOpen}
              class:has-active={sectionGroups.structural.some(section => activeSection === section)}
              on:click={toggleStructural}
            >
              <span class="accordion-icon">🏗️</span>
              <span class="accordion-title">{getSectionCategoryTitle('structural')}</span>
              <span class="section-count">({sectionGroups.structural.length})</span>
              <span class="toggle-arrow" class:rotated={structuralOpen}>▼</span>
            </button>
            {#if structuralOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each sectionGroups.structural as section}
                  <button 
                    class="nav-item subsection-item" 
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                  >
                    <span class="nav-icon">🔧</span>
                    <span class="nav-title">{getShortSectionTitle(section)}</span>
                  </button>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Implementation & Learning Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={implementationOpen}
              class:has-active={sectionGroups.implementation.some(section => activeSection === section)}
              on:click={toggleImplementation}
            >
              <span class="accordion-icon">🚀</span>
              <span class="accordion-title">{getSectionCategoryTitle('implementation')}</span>
              <span class="section-count">({sectionGroups.implementation.length})</span>
              <span class="toggle-arrow" class:rotated={implementationOpen}>▼</span>
            </button>
            {#if implementationOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each sectionGroups.implementation as section}
                  <button 
                    class="nav-item subsection-item" 
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                  >
                    <span class="nav-icon">📋</span>
                    <span class="nav-title">{getShortSectionTitle(section)}</span>
                  </button>
                {/each}
              </div>
            {/if}
          </div>
        </div>
      {/if}

      <!-- Progress indicator for core sections -->
      {#if !isPrintMode && isCoreSection && allCoreSections.length > 0}
        <div class="progress-indicator">
          <div class="progress-bar">
            <div class="progress-fill" style="width: {((allCoreSections.indexOf(activeSection) + 1) / allCoreSections.length * 100)}%"></div>
          </div>
          <span class="progress-text">{pf.progress?.text?.replace('{current}', allCoreSections.indexOf(activeSection) + 1).replace('{total}', allCoreSections.length) || `Section ${allCoreSections.indexOf(activeSection) + 1} of ${allCoreSections.length}`}</span>
        </div>
      {/if}

      <!-- Show active section, or all sections in print mode -->
      {#each sectionsToShow as section (section)}
        {#if data?.sections?.[section]}
          <div class="section-content" id={section}>
            <!-- Language fallback notice -->
            {#if !isPrintMode && data.sectionsUsingEnglishFallback?.includes(section) && section !== 'index'}
              <div class="language-fallback-notice">
                <div class="notice-icon">🌐</div>
                <div class="notice-content">
                  <strong>{pf.languageFallback?.title || 'Content in your language coming soon'}</strong>
                  <p>{pf.languageFallback?.description || 'This section is currently displayed in English until translation is complete.'}</p>
                </div>
              </div>
            {/if}
            
            <!-- Handle guide sections specially -->
            {#if guideSections.includes(section)}
              <!-- Guide selector if we're in one of the guides and not in print mode -->
              {#if !isPrintMode}
                <div class="guide-selector">
                  <h2>{pf.guides?.title || 'Peace & Conflict Resolution Framework Guides'}</h2>
                  <p>{pf.guides?.description || 'Choose the guide version that best matches your needs:'}</p>
                  
                  <div class="guide-cards">
                    {#each guides as guide}
                      <div 
                        class="guide-card" 
                        class:active={activeSection === guide.id}
                        on:click={() => selectGuide(guide.id)}
                      >
                        <div class="guide-icon">{guide.icon}</div>
                        <div class="guide-title">{guide.title}</div>
                        <div class="guide-desc">{guide.description}</div>
                      </div>
                    {/each}
                  </div>
                </div>
              {/if}
              
              <!-- Render the selected Guide -->
              <svelte:component this={data.sections[section].default} t={translationFunction} />
              
              <!-- Navigation buttons at bottom of guide -->
              {#if !isPrintMode}
                <div class="guide-navigation">
                  <button class="secondary-btn" on:click={() => downloadPeaceGuide(section.replace('-guide', ''))}>
                    {pf.guides?.download || 'Download PDF Version'} <span class="download-icon">↓</span>
                  </button>
                  <button class="primary-btn" on:click={() => setActiveSection('index')}>
                    {pf.guides?.continue || 'Continue to Full Framework'} <span class="arrow-icon">→</span>
                  </button>
                </div>
              {/if}
            {:else}
              <!-- Render sections from markdown files -->
              <svelte:component this={data.sections[section].default} t={translationFunction} />
            {/if}

            <!-- Section navigation at bottom of core sections -->
            {#if isCoreSection && !isPrintMode && allCoreSections.length > 0}
              <div class="section-navigation">
                {#if allCoreSections.indexOf(activeSection) > 0}
                  <button class="nav-btn prev-btn" on:click={() => {
                    const currentIndex = allCoreSections.indexOf(activeSection);
                    const prevSection = allCoreSections[currentIndex - 1];
                    setActiveSection(prevSection);
                  }}>
                    ← {pf.navigation?.previousSection || 'Previous Section'}
                  </button>
                {/if}
                
                {#if allCoreSections.indexOf(activeSection) < allCoreSections.length - 1}
                  <button class="nav-btn next-btn" on:click={() => {
                    const currentIndex = allCoreSections.indexOf(activeSection);
                    const nextSection = allCoreSections[currentIndex + 1];
                    setActiveSection(nextSection);
                  }}>
                    {pf.navigation?.nextSection || 'Next Section'} →
                  </button>
                {/if}
              </div>
            {/if}
          </div>
        {:else}
          <div class="missing-section">
            <h2>{pf.errors?.sectionNotFound?.replace('{section}', section) || `Section "${section}" not found`}</h2>
            <p>{pf.errors?.contentInDevelopment || 'This content is still being developed.'}</p>
          </div>
        {/if}
      {/each}
    </div>
  </div>
{:else}
  <!-- Loading state to prevent hydration issues -->
  <div class="loading-container">
    <div class="loading-spinner"></div>
    <p>{pf.loading?.text || 'Loading peace framework content...'}</p>
  </div>
{/if}

<style>
 /* Peace & Conflict Resolution Framework color scheme */
 :root {
   --peace-primary: #5B6FBF; /* Blue-purple for peace */
   --peace-secondary: #8A94D6; /* Lighter blue-purple */
   --peace-accent: #9370DB; /* Medium purple for innovation */
   --peace-success: #20B2AA; /* Teal for harmony */
   --peace-warning: #F5A623; /* Orange for attention */
   --peace-danger: #C43B3B; /* Red for conflict */
   --peace-light: #EEF0FA; /* Very light blue-purple */
   --peace-dark: #404E9F; /* Dark blue-purple */
 }

 /* Layout */
 .documentation-container {
   display: grid;
   grid-template-columns: 250px 1fr;
   gap: 2rem;
   max-width: 1200px;
   margin: 0 auto;
   padding: 2rem 1rem;
 }
 
 .content {
   min-width: 0;
 }
 
 .section-content {
   padding-top: 1rem;
   scroll-margin-top: 2rem; /* Adds space above when scrolled to */
 }

 /* Section Navigation */
 .section-nav {
   margin-bottom: 2rem;
   border-bottom: 1px solid #e5e7eb;
   background: linear-gradient(to bottom, #f8fafc, #f1f5f9);
   border-radius: 0.5rem;
   padding: 1rem;
 }

 .nav-section {
   margin-bottom: 0.5rem;
 }

 .nav-accordion {
   margin-bottom: 0.5rem;
   border: 1px solid #e5e7eb;
   border-radius: 0.375rem;
   overflow: hidden;
   background: white;
 }

 .accordion-header {
   width: 100%;
   display: flex;
   align-items: center;
   gap: 0.75rem;
   padding: 0.75rem 1rem;
   background: none;
   border: none;
   cursor: pointer;
   transition: all 0.2s;
   font-size: 0.95rem;
   font-weight: 500;
   color: #374151;
   text-align: left;
 }

 .accordion-header:hover {
   background-color: rgba(138, 148, 214, 0.05);
 }

 .accordion-header.has-active {
   background-color: rgba(91, 111, 191, 0.1);
   color: var(--peace-primary);
   font-weight: 600;
 }

 .accordion-header.open {
   background-color: rgba(138, 148, 214, 0.1);
   border-bottom: 1px solid #e5e7eb;
 }

 .accordion-icon {
   font-size: 1.1rem;
   flex-shrink: 0;
 }

 .accordion-title {
   flex-grow: 1;
   font-weight: 600;
 }

 .section-count {
   font-size: 0.8rem;
   color: #6b7280;
   font-weight: 400;
 }

 .toggle-arrow {
   font-size: 0.8rem;
   color: #6b7280;
   transition: transform 0.2s ease;
   flex-shrink: 0;
 }

 .toggle-arrow.rotated {
   transform: rotate(180deg);
 }

 .accordion-content {
   border-top: 1px solid #e5e7eb;
   background-color: #fafafa;
 }

 .nav-item {
   width: 100%;
   display: flex;
   align-items: center;
   gap: 0.75rem;
   padding: 0.75rem 1rem;
   background: none;
   border: none;
   cursor: pointer;
   transition: all 0.2s;
   font-size: 0.9rem;
   color: #4b5563;
   text-align: left;
   border-bottom: 1px solid #e5e7eb;
 }

 .nav-item:last-child {
   border-bottom: none;
 }

 .nav-item:hover {
   background-color: rgba(138, 148, 214, 0.05);
   color: #374151;
 }

 .nav-item.active {
   background-color: var(--peace-primary);
   color: white;
   font-weight: 600;
 }

 .nav-item.active:hover {
   background-color: var(--peace-secondary);
 }

 .overview-item {
   background: linear-gradient(135deg, rgba(91, 111, 191, 0.1), rgba(138, 148, 214, 0.1));
   border: 1px solid rgba(91, 111, 191, 0.2);
   border-radius: 0.375rem;
   font-weight: 600;
   margin-bottom: 0.5rem;
 }

 .overview-item.active {
   background: var(--peace-primary);
   color: white;
 }

 .subsection-item {
   padding-left: 1.5rem;
 }

 .nav-icon {
   font-size: 1.1rem;
   flex-shrink: 0;
 }

 .nav-title {
   flex-grow: 1;
   text-align: left;
 }

 /* Styles for Lite Guide card */
  .lite-guide-card {
    background: linear-gradient(135deg, #eef0fa 0%, #d1d6f0 100%);
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(91, 111, 191, 0.1);
    border: 1px solid rgba(91, 111, 191, 0.2);
    overflow: visible !important;
    position: relative;
    z-index: 1;
  }

  .card-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: center;
    position: relative;
    overflow: visible;
  }

 .lite-guide-card .dropdown-menu {
   position: absolute;
   top: 100%;
   left: 0;
   z-index: 1001;
   min-width: 300px;
   max-width: 350px;
   overflow: visible;
   border: 1px solid rgba(91, 111, 191, 0.3);
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
 }
 
 .card-content {
   display: flex;
   flex-wrap: wrap;
   padding: 1.5rem;
   align-items: center;
   gap: 1.5rem;
 }
 
 .card-icon {
   font-size: 2.5rem;
   color: var(--peace-primary);
   flex-shrink: 0;
 }
 
 .card-text {
   flex: 1;
   min-width: 200px;
 }
 
 .card-text h3 {
   margin: 0 0 0.5rem 0;
   color: var(--peace-primary);
   font-size: 1.25rem;
 }
 
 .card-text p {
   margin: 0;
   color: #4b5563;
   font-size: 1rem;
 }
 
 .primary-btn {
   background-color: var(--peace-primary);
   color: white;
   border: none;
   padding: 0.5rem 1rem;
   border-radius: 0.375rem;
   font-weight: 500;
   cursor: pointer;
   transition: all 0.2s;
 }
 
 .primary-btn:hover {
   background-color: var(--peace-dark);
   transform: translateY(-1px);
 }
 
 .secondary-btn {
   background-color: white;
   color: var(--peace-primary);
   border: 1px solid var(--peace-primary);
   padding: 0.5rem 1rem;
   border-radius: 0.375rem;
   font-weight: 500;
   cursor: pointer;
   transition: all 0.2s;
 }
 
 .secondary-btn:hover {
   background-color: var(--peace-light);
   transform: translateY(-1px);
 }
 
 .lite-guide-navigation {
   display: flex;
   justify-content: space-between;
   margin-top: 3rem;
   padding-top: 1.5rem;
   border-top: 1px solid #e5e7eb;
 }

 .download-icon,
 .arrow-icon {
   display: inline-block;
   margin-left: 0.25rem;
 }

  /* Progress indicator */
  .progress-indicator {
    margin-bottom: 2rem;
    padding: 1rem;
    background: linear-gradient(90deg, rgba(91, 111, 191, 0.1), rgba(138, 148, 214, 0.1));
    border-radius: 0.5rem;
    border-left: 4px solid var(--peace-primary);
  }

  .progress-bar {
    width: 100%;
    height: 8px;
    background-color: #e5e7eb;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--peace-primary), var(--peace-secondary));
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 0.875rem;
    color: var(--peace-primary);
    font-weight: 500;
  }

 /* Content styling */
 .content :global(h1) {
   font-size: 2rem;
   font-weight: 700;
   margin-bottom: 1.5rem;
   color: var(--peace-primary);
 }
 
 .content :global(h2) {
   font-size: 1.5rem;
   font-weight: 600;
   margin-top: 2rem;
   margin-bottom: 1rem;
   color: var(--peace-secondary);
 }
 
 .content :global(h3),
 :global(h4) {
   font-size: 1.25rem;
   font-weight: 600;
   margin-top: 1.5rem;
   margin-bottom: 0.75rem;
   color: var(--peace-accent);
 }

 :global(h4) {
   font-size: 1.2rem;
 }
 
 .content :global(p) {
   margin-bottom: 1rem;
   line-height: 1.7;
   color: #4b5563;
 }

 /* Blockquotes */
 :global(blockquote) {
   background-color: #f3f4fa;
   border-left: 4px solid var(--peace-primary);
   padding: 1rem 1.5rem;
   margin: 1.5rem 0;
   border-radius: 0.5rem;
 }

 :global(blockquote > p:first-child strong) {
   font-size: 1.1rem;
   color: var(--peace-primary);
   display: block;
   margin-bottom: 0.75rem;
 }

 :global(blockquote ul) {
   margin-left: 1.5rem;
   margin-top: 0.75rem;
   margin-bottom: 0.75rem;
 }

 :global(blockquote li) {
   margin-bottom: 0.5rem;
 }

 :global(blockquote p:last-child) {
   margin-top: 0.75rem;
   font-style: italic;
 }

 :global(blockquote a) {
   color: var(--peace-primary);
   text-decoration: underline;
   font-weight: 500;
 }

 :global(blockquote a:hover) {
   color: var(--peace-dark);
 }

 /* Lists */
 .content :global(ul), .content :global(ol) {
   margin-bottom: 1.5rem;
   padding-left: 2rem;
   color: #4b5563;
 }

 .content :global(ul) {
   list-style-type: none;
 }

 .content :global(ul li) {
   position: relative;
   margin-bottom: 0.75rem;
   padding-left: 1rem;
 }

 .content :global(ul li:not(.section-nav li))::before {
   content: "☮";
   position: absolute;
   left: -0.5em;
   color: var(--peace-primary);
   top: 0.15em;
   font-size: 0.9rem;
 }

 .content :global(ol) {
   list-style-type: decimal;
 }

 .content :global(ol li) {
   margin-bottom: 0.75rem;
   padding-left: 0.5rem;
 }

 .content :global(ol li::marker) {
   color: var(--peace-primary);
   font-weight: 600;
 }

 .content :global(ul ul), .content :global(ol ul) {
   margin-top: 0.5rem;
   margin-bottom: 0;
 }

 .content :global(ul ul li::before) {
   content: "•";
   color: var(--peace-secondary);
 }

 /* Tables */
 :global(.content table) {
   width: 100%;
   border-collapse: collapse;
   margin: 1.5rem 0;
   font-size: 0.95rem;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
   border-radius: 0.375rem;
   overflow: hidden;
 }

 :global(.content thead) {
   background: linear-gradient(to right, var(--peace-primary), var(--peace-secondary));
 }

 :global(.content th) {
   padding: 0.75rem 1rem;
   font-weight: 600;
   text-align: left;
   color: #ffffff;
   border: none;
   border-bottom: 2px solid var(--peace-primary);
 }

 :global(.content td) {
   padding: 0.75rem 1rem;
   border: 1px solid #e5e7eb;
   border-left: none;
   border-right: none;
   vertical-align: top;
 }

 :global(.content tr:nth-child(odd)) {
   background-color: #f8f9fc;
 }

 :global(.content tr:nth-child(even)) {
   background-color: #ffffff;
 }

 :global(.content tr:hover) {
   background-color: var(--peace-light);
 }

 :global(.content tbody tr:last-child td) {
   border-bottom: none;
 }

 :global(.content table caption),
 :global(.content table tfoot) {
   background-color: var(--peace-light);
   padding: 0.75rem;
   font-size: 0.875rem;
   color: var(--peace-primary);
   text-align: left;
   border-top: 1px solid var(--peace-primary);
 }

 :global(.content td.highlight) {
   color: var(--peace-primary);
   font-weight: 600;
 }

 /* Links */
 .content :global(a) {
   color: var(--peace-primary);
   text-decoration: underline;
   font-weight: 500;
   transition: all 0.2s;
 }

 .content :global(a:hover) {
   color: var(--peace-dark);
   text-decoration: underline;
 }

 .content :global(a:active) {
   color: var(--peace-dark);
 }

 .content :global(a[href^="http"]):after, 
 .content :global(a[href^="https://"]):after {
   content: " ↗";
   font-size: 0.8em;
   vertical-align: super;
 }

 .content :global(a[href$=".pdf"]):after {
   content: " ↓";
   font-size: 0.8em;
 }

 .content :global(a[href^="#"]) {
   color: var(--peace-secondary);
   text-decoration: none;
   border-bottom: 1px dotted var(--peace-secondary);
 }

 .content :global(a[href^="#"]):hover {
   color: var(--peace-primary);
   border-bottom-color: var(--peace-primary);
 }

 .content :global(table a) {
   color: var(--peace-primary);
   font-weight: 600;
 }
 
 
 /* Guide selector styles */
 .guide-selector {
   margin-bottom: 2rem;
   padding-bottom: 1rem;
   border-bottom: 1px solid #e5e7eb;
 }
 
 .guide-cards {
   display: flex;
   flex-wrap: wrap;
   gap: 1rem;
   margin-top: 1rem;
 }
 
 .guide-card {
   flex: 1;
   min-width: 200px;
   max-width: 300px;
   padding: 1.5rem;
   border-radius: 0.5rem;
   border: 1px solid #e5e7eb;
   cursor: pointer;
   transition: all 0.2s;
   display: flex;
   flex-direction: column;
   align-items: center;
   text-align: center;
 }
 
 .guide-card:hover {
   box-shadow: 0 4px 6px rgba(91, 111, 191, 0.1);
   transform: translateY(-2px);
   border-color: var(--peace-primary);
 }
 
 .guide-card.active {
   border-color: var(--peace-primary);
   background-color: var(--peace-light);
 }
 
 .guide-icon {
   font-size: 2rem;
   margin-bottom: 0.5rem;
 }
 
 .guide-title {
   font-weight: 600;
   margin-bottom: 0.5rem;
   color: var(--peace-primary);
 }
 
 .guide-desc {
   font-size: 0.875rem;
   color: #6b7280;
 }
 
 .guide-info {
   display: flex;
   flex-direction: column;
 }
 
  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
  }

  .dropdown-menu {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    z-index: 1001;
    min-width: 320px;
    max-width: 400px;
    padding: 0.5rem 0;
    background-color: #fff;
    border: 1px solid rgba(91, 111, 191, 0.3);
    border-radius: 0.375rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    white-space: normal;
    /* Default hidden state */
    visibility: hidden;
    opacity: 0;
    transform: translateY(-8px);
    transition: all 0.2s ease;
    pointer-events: none;
  }

  /* Show dropdown when open */
  .dropdown-menu.show {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.75rem 1.5rem;
    clear: both;
    font-weight: 400;
    color: #212529;
    text-align: inherit;
    white-space: normal !important;
    background-color: transparent;
    border: 0;
    cursor: pointer;
    transition: background-color 0.15s ease;
  }
  
  .dropdown-item:hover, 
  .dropdown-item:focus {
    color: #16181b;
    text-decoration: none;
    background-color: var(--peace-light);
  }

  /* For dropdown guide items */
  .dropdown-item .guide-icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    margin-bottom: 0;
    display: inline-block;
    width: 24px;
    text-align: center;
    flex-shrink: 0;
  }
  
  .dropdown-item .guide-info {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  
  .dropdown-item .guide-title {
    font-weight: 600;
    margin-bottom: 0.25rem;
    color: var(--peace-primary);
  }
  
  .dropdown-item .guide-desc {
    font-size: 0.8rem;
    color: #6b7280;
    line-height: 1.3;
  }

 /* Responsive Design */
 @media (max-width: 768px) {
   .documentation-container {
     grid-template-columns: 1fr;
   }

   .section-nav {
     padding: 0.75rem;
   }

   .accordion-header {
     padding: 0.5rem 0.75rem;
     font-size: 0.9rem;
   }

   .nav-item {
     padding: 0.5rem 0.75rem;
     font-size: 0.85rem;
   }

   .subsection-item {
     padding-left: 1rem;
   }

   .card-content {
     flex-direction: column;
     align-items: flex-start;
     gap: 1rem;
   }
   
   .card-actions {
     width: 100%;
     justify-content: center;
   }
   
   .lite-guide-navigation {
     flex-direction: column;
     gap: 1rem;
   }
   
   .lite-guide-navigation button {
     width: 100%;
   }
   
   .guide-cards {
     flex-direction: column;
   }
   
   .guide-card {
     max-width: none;
   }
 }

 @media (max-width: 640px) {
   :global(.content table) {
     display: block;
     overflow-x: auto;
   }
   
   :global(.content th),
   :global(.content td) {
     white-space: nowrap;
   }
 }

  /* Language fallback notice */
  .language-fallback-notice {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background-color: rgba(138, 148, 214, 0.1);
    border: 1px solid rgba(138, 148, 214, 0.3);
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
    margin-bottom: 1.5rem;
  }

  .notice-icon {
    font-size: 1.25rem;
    color: var(--peace-secondary);
    flex-shrink: 0;
    margin-top: 0.125rem;
  }

  .notice-content {
    flex: 1;
  }

  .notice-content strong {
    color: var(--peace-secondary);
    font-size: 0.95rem;
    display: block;
    margin-bottom: 0.25rem;
  }

  .notice-content p {
    color: #4b5563;
    font-size: 0.875rem;
    margin: 0;
    line-height: 1.5;
  }

  /* Responsive notice */
  @media (max-width: 640px) {
    .language-fallback-notice {
      padding: 0.75rem 1rem;
    }
    
    .notice-icon {
      font-size: 1.1rem;
    }
    
    .notice-content strong {
      font-size: 0.9rem;
    }
    
    .notice-content p {
      font-size: 0.8rem;
    }
  }

  .arrow-icon {
    display: inline-block;
    margin-left: 0.25rem;
    transition: transform 0.2s ease;
  }

  .arrow-icon.rotated {
    transform: rotate(180deg);
  }

  .section-error {
    text-align: center;
    padding: 3rem 2rem;
    background-color: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 0.5rem;
    margin: 2rem 0;
  }

  .section-error h2 {
    color: var(--peace-danger);
    margin-bottom: 1rem;
  }

  .section-error p {
    color: #6b7280;
    margin-bottom: 2rem;
  }

  html {
    scroll-behavior: smooth;
  }

  #main-content {
    scroll-margin-top: 2rem;
  }

  .section-content {
    scroll-margin-top: 2rem;
  }

  .content {
    scroll-margin-top: 2rem; /* Space above content when scrolled to */
  }

  .section-content {
    scroll-margin-top: 1rem; /* Space above sections when scrolled to */
  }

  /* Ensure the content area is easily targetable */
  .content {
    position: relative;
  }

  .scroll-target {
    height: 1px;
    width: 1px;
    visibility: hidden;
  }
</style>

