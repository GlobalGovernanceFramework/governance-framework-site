<!-- src/routes/frameworks/planetary-health/+page.svelte -->
<script>
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { invalidate } from '$app/navigation';
  import { base } from '$app/paths';
  import FrameworkSidebar from '$lib/components/FrameworkSidebar.svelte';
  import { onMount, tick } from 'svelte';
  import { slide } from 'svelte/transition';

  export let data;

  // Extract planetaryHealthFramework translations for shorter references
  $: phf = $t('planetaryHealthFramework') || {};
  $: translationFunction = $t;
  
  // Debug logging
  $: if (browser && mounted) {
    console.log('Planetary Health Framework translations:', phf);
    console.log('Has planetary health framework keys:', Object.keys(phf));
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
  let foundationOpen = false;
  let governanceOpen = false;
  let implementationOpen = false;
  let resourcesOpen = false;

  // Define section groupings for the Planetary Health framework
  const sectionGroups = {
    foundation: ['manifesto', 'governance-structure', 'technology-data-infrastructure'],
    governance: ['financing-mechanisms', 'medical-innovation-access', 'pandemic-climate-preparedness', 'community-centered-healthcare', 'transparency-anti-corruption', 'health-literacy', 'borderless-health-rights', 'ethical-technology-governance'],
    implementation: ['implementation-roadmap', 'health-conflict-zones', 'global-knowledge-commons', 'visual-architecture-map', 'cross-cutting-mechanisms', 'spiritual-framing', 'conclusion'],
    resources: ['planetary-health-accord-lite', 'childrens-health-rights-comic']
  };

  // Initialize accordion states after mount
  function initializeAccordionStates() {
    // Reset all accordions
    foundationOpen = false;
    governanceOpen = false;
    implementationOpen = false;
    resourcesOpen = false;

    // Set initial accordion states based on active section
    if (activeSection === 'index') {
      foundationOpen = true;
    } else if (sectionGroups.foundation.includes(activeSection)) {
      foundationOpen = true;
    } else if (sectionGroups.governance.includes(activeSection)) {
      governanceOpen = true;
    } else if (sectionGroups.implementation.includes(activeSection)) {
      implementationOpen = true;
    } else if (sectionGroups.resources.includes(activeSection)) {
      resourcesOpen = true;
    } else {
      // Default state for overview
      foundationOpen = true;
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
    return phf.sections?.[section] || section;
  }

  // Get section category titles using short references
  function getSectionCategoryTitle(category) {
    return phf.categories?.[category] || category;
  }

  // Function to get shortened section titles for navigation using short references
  function getShortSectionTitle(section) {
    return phf.sectionsShort?.[section] || getSectionTitle(section);
  }

  // Function to download the planetary health guide PDF
  function downloadPlanetaryHealthGuide(version = '') {
    const versionSuffix = version ? `-${version}` : '';
    const pdfUrl = `${base}/assets/pdf/planetary-health-guide${versionSuffix}-${currentLocale}.pdf`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `planetary-health-guide${versionSuffix}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Computed values - add safety checks
  $: isLiteActive = activeSection === 'planetary-health-accord-lite';
  $: isSupplementaryActive = sectionGroups.resources.includes(activeSection);
  $: allCoreSections = [
    ...sectionGroups.foundation,
    ...sectionGroups.governance,
    ...sectionGroups.implementation
  ];
  $: isCoreSection = allCoreSections.includes(activeSection);

  // Toggle functions for accordions
  function toggleFoundation() {
    foundationOpen = !foundationOpen;
  }

  function toggleGovernance() {
    governanceOpen = !governanceOpen;
  }

  function toggleImplementation() {
    implementationOpen = !implementationOpen;
  }

  function toggleResources() {
    resourcesOpen = !resourcesOpen;
  }

  // Handle locale changes - add safety check
  $: if (browser && mounted && $locale) {
    invalidate('app:locale');
  }
</script>

<svelte:head>
  <title>{phf.meta?.title || 'Planetary Health Accord Implementation Framework - Global Governance Framework'}</title>
  <meta name="description" content="{phf.meta?.description || 'A revolutionary blueprint for global health transformation, weaving together indigenous sovereignty, technological innovation, and community-centered care'}" />
</svelte:head>

{#if mounted}
  <div class="documentation-container">
    {#if !isPrintMode}
      <FrameworkSidebar />
    {/if}

    <div class="content">
      <!-- Quick Access Card for Planetary Health Accord -->
      {#if !isPrintMode && !isLiteActive && activeSection === 'index'}
        <div class="planetary-health-guide-card">
          <div class="card-content">
            <div class="card-icon">🌍</div>
            <div class="card-text">
              <h3>{phf.buttons?.newToFramework || 'New to the Planetary Health Accord?'}</h3>
              <p>{phf.buttons?.startWithGuides || 'Start with our accessible summary that explains the framework\'s core principles and implementation strategy.'}</p>
            </div>
            <div class="card-actions">
              <button class="primary-btn" on:click={() => setActiveSection('planetary-health-accord-lite')}>
                {phf.buttons?.readGuide || 'Read the Lite Version'} <span class="arrow-icon">→</span>
              </button>
            </div>
          </div>
        </div>
      {/if}

      <!-- Sub-navigation for planetary health framework sections -->
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

<!-- Foundation Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={foundationOpen}
              class:has-active={sectionGroups.foundation.some(section => activeSection === section)}
              on:click={toggleFoundation}
            >
              <span class="accordion-icon">🏛️</span>
              <span class="accordion-title">{getSectionCategoryTitle('foundation')}</span>
              <span class="section-count">({sectionGroups.foundation.length})</span>
              <span class="toggle-arrow" class:rotated={foundationOpen}>▼</span>
            </button>
            {#if foundationOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'manifesto'}
                  on:click={() => setActiveSection('manifesto')}
                >
                  <span class="nav-icon">📜</span>
                  <span class="nav-title">{getShortSectionTitle('manifesto')}</span>
                </button>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'governance-structure'}
                  on:click={() => setActiveSection('governance-structure')}
                >
                  <span class="nav-icon">🏗️</span>
                  <span class="nav-title">{getShortSectionTitle('governance-structure')}</span>
                </button>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'technology-data-infrastructure'}
                  on:click={() => setActiveSection('technology-data-infrastructure')}
                >
                  <span class="nav-icon">💻</span>
                  <span class="nav-title">{getShortSectionTitle('technology-data-infrastructure')}</span>
                </button>
              </div>
            {/if}
          </div>

          <!-- Governance & Systems Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={governanceOpen}
              class:has-active={sectionGroups.governance.some(section => activeSection === section)}
              on:click={toggleGovernance}
            >
              <span class="accordion-icon">⚖️</span>
              <span class="accordion-title">{getSectionCategoryTitle('governance')}</span>
              <span class="section-count">({sectionGroups.governance.length})</span>
              <span class="toggle-arrow" class:rotated={governanceOpen}>▼</span>
            </button>
            {#if governanceOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'financing-mechanisms'}
                  on:click={() => setActiveSection('financing-mechanisms')}
                >
                  <span class="nav-icon">💰</span>
                  <span class="nav-title">{getShortSectionTitle('financing-mechanisms')}</span>
                </button>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'medical-innovation-access'}
                  on:click={() => setActiveSection('medical-innovation-access')}
                >
                  <span class="nav-icon">🔬</span>
                  <span class="nav-title">{getShortSectionTitle('medical-innovation-access')}</span>
                </button>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'pandemic-climate-preparedness'}
                  on:click={() => setActiveSection('pandemic-climate-preparedness')}
                >
                  <span class="nav-icon">🛡️</span>
                  <span class="nav-title">{getShortSectionTitle('pandemic-climate-preparedness')}</span>
                </button>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'community-centered-healthcare'}
                  on:click={() => setActiveSection('community-centered-healthcare')}
                >
                  <span class="nav-icon">🏥</span>
                  <span class="nav-title">{getShortSectionTitle('community-centered-healthcare')}</span>
                </button>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'transparency-anti-corruption'}
                  on:click={() => setActiveSection('transparency-anti-corruption')}
                >
                  <span class="nav-icon">🔍</span>
                  <span class="nav-title">{getShortSectionTitle('transparency-anti-corruption')}</span>
                </button>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'health-literacy'}
                  on:click={() => setActiveSection('health-literacy')}
                >
                  <span class="nav-icon">📚</span>
                  <span class="nav-title">{getShortSectionTitle('health-literacy')}</span>
                </button>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'borderless-health-rights'}
                  on:click={() => setActiveSection('borderless-health-rights')}
                >
                  <span class="nav-icon">🌐</span>
                  <span class="nav-title">{getShortSectionTitle('borderless-health-rights')}</span>
                </button>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'ethical-technology-governance'}
                  on:click={() => setActiveSection('ethical-technology-governance')}
                >
                  <span class="nav-icon">⚖️</span>
                  <span class="nav-title">{getShortSectionTitle('ethical-technology-governance')}</span>
                </button>
              </div>
            {/if}
          </div>

          <!-- Implementation Accordion -->
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
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'implementation-roadmap'}
                  on:click={() => setActiveSection('implementation-roadmap')}
                >
                  <span class="nav-icon">🗺️</span>
                  <span class="nav-title">{getShortSectionTitle('implementation-roadmap')}</span>
                </button>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'health-conflict-zones'}
                  on:click={() => setActiveSection('health-conflict-zones')}
                >
                  <span class="nav-icon">🏴‍☠️</span>
                  <span class="nav-title">{getShortSectionTitle('health-conflict-zones')}</span>
                </button>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'global-knowledge-commons'}
                  on:click={() => setActiveSection('global-knowledge-commons')}
                >
                  <span class="nav-icon">🧠</span>
                  <span class="nav-title">{getShortSectionTitle('global-knowledge-commons')}</span>
                </button>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'visual-architecture-map'}
                  on:click={() => setActiveSection('visual-architecture-map')}
                >
                  <span class="nav-icon">🗺️</span>
                  <span class="nav-title">{getShortSectionTitle('visual-architecture-map')}</span>
                </button>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'cross-cutting-mechanisms'}
                  on:click={() => setActiveSection('cross-cutting-mechanisms')}
                >
                  <span class="nav-icon">🔗</span>
                  <span class="nav-title">{getShortSectionTitle('cross-cutting-mechanisms')}</span>
                </button>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'spiritual-framing'}
                  on:click={() => setActiveSection('spiritual-framing')}
                >
                  <span class="nav-icon">🕊️</span>
                  <span class="nav-title">{getShortSectionTitle('spiritual-framing')}</span>
                </button>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'conclusion'}
                  on:click={() => setActiveSection('conclusion')}
                >
                  <span class="nav-icon">🎯</span>
                  <span class="nav-title">{getShortSectionTitle('conclusion')}</span>
                </button>
              </div>
            {/if}
          </div>

          <!-- Resources Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={resourcesOpen}
              class:has-active={isSupplementaryActive}
              on:click={toggleResources}
            >
              <span class="accordion-icon">📄</span>
              <span class="accordion-title">{getSectionCategoryTitle('resources')}</span>
              <span class="section-count">({sectionGroups.resources.length})</span>
              <span class="toggle-arrow" class:rotated={resourcesOpen}>▼</span>
            </button>
            {#if resourcesOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'planetary-health-accord-lite'}
                  on:click={() => setActiveSection('planetary-health-accord-lite')}
                >
                  <span class="nav-icon">📋</span>
                  <span class="nav-title">{phf.buttons?.liteVersion || 'Lite Version'}</span>
                </button>
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'childrens-health-rights-comic'}
                  on:click={() => setActiveSection('childrens-health-rights-comic')}
                >
                  <span class="nav-icon">📚</span>
                  <span class="nav-title">{phf.buttons?.childrensComic || 'Children\'s Comic'}</span>
                </button>
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
          <span class="progress-text">{phf.progress?.text?.replace('{current}', allCoreSections.indexOf(activeSection) + 1).replace('{total}', allCoreSections.length) || `Section ${allCoreSections.indexOf(activeSection) + 1} of ${allCoreSections.length}`}</span>
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
                  <strong>{phf.languageFallback?.title || 'Content in your language coming soon'}</strong>
                  <p>{phf.languageFallback?.description || 'This section is currently displayed in English until translation is complete.'}</p>
                </div>
              </div>
            {/if}
            
            <!-- Handle index section with custom intro -->
            {#if section === 'index'}
              <div class="overview-section">
                <h1>{phf.intro?.title || 'Planetary Health Accord Implementation Framework'}</h1>
                <h2>{phf.intro?.overview || 'Overview'}</h2>
                <p>{phf.intro?.paragraph1 || 'The Planetary Health Accord Implementation Framework emerges as a revolutionary blueprint for global health transformation, weaving together indigenous sovereignty, technological innovation, and community-centered care into a tapestry of hope for our living Earth.'}</p>
                <p>{phf.intro?.paragraph2 || 'This framework reimagines healthcare to honor every person, community, and ecosystem as a co-creator of planetary health, from Community Health Legions asserting cultural sovereignty to AI systems serving justice.'}</p>
              </div>
            {:else}
              <!-- Render sections from markdown files -->
              <svelte:component this={data.sections[section].default} t={translationFunction} />
            {/if}
            
            <!-- Navigation buttons at bottom of lite version -->
            {#if section === 'planetary-health-accord-lite' && !isPrintMode}
              <div class="guide-navigation">
                <button class="secondary-btn" on:click={() => downloadPlanetaryHealthGuide('lite')}>
                  {phf.buttons?.downloadPdf || 'Download PDF Version'} <span class="download-icon">↓</span>
                </button>
                <button class="primary-btn" on:click={() => setActiveSection('manifesto')}>
                  {phf.buttons?.continueToFull || 'Continue to Full Framework'} <span class="arrow-icon">→</span>
                </button>
              </div>
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
                    ← {phf.navigation?.previousSection || 'Previous Section'}
                  </button>
                {/if}
                
                {#if allCoreSections.indexOf(activeSection) < allCoreSections.length - 1}
                  <button class="nav-btn next-btn" on:click={() => {
                    const currentIndex = allCoreSections.indexOf(activeSection);
                    const nextSection = allCoreSections[currentIndex + 1];
                    setActiveSection(nextSection);
                  }}>
                    {phf.navigation?.nextSection || 'Next Section'} →
                  </button>
                {/if}
              </div>
            {/if}
          </div>
        {:else}
          <div class="missing-section">
            <h2>{phf.errors?.sectionNotFound?.replace('{section}', section) || `Section "${section}" not found`}</h2>
            <p>{phf.errors?.contentInDevelopment || 'This content is still being developed.'}</p>
          </div>
        {/if}
      {/each}
    </div>
  </div>
{:else}
  <!-- Loading state to prevent hydration issues -->
  <div class="loading-container">
    <div class="loading-spinner"></div>
    <p>{phf.loading?.text || 'Loading planetary health framework content...'}</p>
  </div>
{/if}

<style>
  /* Planetary Health Framework color scheme - healing blues, earth greens, and warm accent colors */
  :root {
    --health-primary: #1e3a8a; /* Deep Blue - trust, stability, global cooperation */
    --health-secondary: #059669; /* Emerald Green - healing, growth, life */
    --health-accent: #0891b2; /* Cyan - technology, innovation, connectivity */
    --health-earth: #92400e; /* Earth Brown - grounding, traditional knowledge */
    --health-light: #67e8f9; /* Light Cyan - accessibility, transparency */
    --health-healing: #10b981; /* Healing Green - wellness, regeneration */
    --health-wisdom: #7c3aed; /* Deep Purple - wisdom, spirituality */
    --health-community: #f59e0b; /* Warm Orange - community, warmth, connection */
  }

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
    background-color: rgba(5, 150, 105, 0.05);
  }

  .accordion-header.has-active {
    background-color: rgba(30, 58, 138, 0.1);
    color: var(--health-primary);
    font-weight: 600;
  }

  .accordion-header.open {
    background-color: rgba(5, 150, 105, 0.1);
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
    background-color: rgba(5, 150, 105, 0.05);
    color: #374151;
  }

  .nav-item.active {
    background-color: var(--health-primary);
    color: white;
    font-weight: 600;
  }

  .nav-item.active:hover {
    background-color: var(--health-secondary);
  }

  .overview-item {
    background: linear-gradient(135deg, rgba(30, 58, 138, 0.1), rgba(5, 150, 105, 0.1));
    border: 1px solid rgba(30, 58, 138, 0.2);
    border-radius: 0.375rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .overview-item.active {
    background: var(--health-primary);
    color: white;
  }

  .subsection-item {
    padding-left: 1.5rem;
  }

  .nav-icon {
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  .nav-number {
    font-size: 0.8rem;
    background-color: rgba(30, 58, 138, 0.1);
    color: var(--health-primary);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-weight: 600;
    min-width: 2rem;
    text-align: center;
    flex-shrink: 0;
  }

  .nav-item.active .nav-number {
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
  }

  .nav-title {
    flex-grow: 1;
    text-align: left;
  }

  /* Auto-expand accordion when section is active */
  .accordion-header.has-active + .accordion-content {
    display: block;
  }

  /* Progress indicator */
  .progress-indicator {
    margin-bottom: 2rem;
    padding: 1rem;
    background: linear-gradient(90deg, rgba(30, 58, 138, 0.1), rgba(5, 150, 105, 0.1));
    border-radius: 0.5rem;
    border-left: 4px solid var(--health-primary);
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
    background: linear-gradient(90deg, var(--health-primary), var(--health-secondary));
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 0.875rem;
    color: var(--health-primary);
    font-weight: 500;
  }
  
  .section-content {
    padding-top: 1rem;
    scroll-margin-top: 2rem; /* Adds space above when scrolled to */
  }

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
  }
  
  .content {
    min-width: 0;
  }
  
  .map-container {
    margin: 2rem 0;
  }
  
  /* Additional styles for markdown content */
  .content :global(h1) {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--health-primary);
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--health-secondary);
  }
  
  .content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--health-accent);
  }

  /* Styling for h4 headers (#### in Markdown) */
  :global(h4) {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--health-accent);
  }

  /* Styling for the inset box (blockquote) */
  :global(blockquote) {
    background-color: rgba(103, 232, 249, 0.1);
    border-left: 4px solid var(--health-earth);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
  }

  :global(blockquote > p:first-child strong) {
    font-size: 1.1rem;
    color: var(--health-earth);
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
    color: var(--health-secondary);
    text-decoration: underline;
    font-weight: 500;
  }

  :global(blockquote a:hover) {
    color: var(--health-primary);
  }
  
  .content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #4b5563;
  }
  
  /* Lists with health-themed bullets */
  .content :global(ul), .content :global(ol) {
    margin-bottom: 1.5rem;
    padding-left: 1rem;
    color: #4b5563;
  }

  .content :global(ul) {
    list-style-type: none;
  }

  .content :global(ul li) {
    position: relative;
    margin-bottom: 0.75rem;
    padding-left: 1.5rem;
  }

  /* Apply health symbols to all ul li EXCEPT those in section-nav */
  .content :global(ul li:not(.section-nav li))::before {
    content: "🩺";
    position: absolute;
    left: 0;
    top: 0.1em;
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
    color: var(--health-secondary);
    font-weight: 600;
  }

  /* Nested lists */
  .content :global(ul ul), .content :global(ol ul) {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .content :global(ul ul li::before) {
    content: "💊";
    color: var(--health-light);
  }

  /* Table styles for planetary health framework */
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
    background: linear-gradient(to right, var(--health-primary), var(--health-secondary));
  }

  :global(.content th) {
    padding: 0.75rem 1rem;
    font-weight: 600;
    text-align: left;
    color: #ffffff;
    border: none;
    border-bottom: 2px solid var(--health-primary);
  }

  :global(.content td) {
    padding: 0.75rem 1rem;
    border: 1px solid #e5e7eb;
    border-left: none;
    border-right: none;
    vertical-align: top;
  }

  :global(.content tr:nth-child(odd)) {
    background-color: rgba(103, 232, 249, 0.05);
  }

  :global(.content tr:nth-child(even)) {
    background-color: #ffffff;
  }

  :global(.content tr:hover) {
    background-color: rgba(103, 232, 249, 0.1);
  }

  :global(.content tbody tr:last-child td) {
    border-bottom: none;
  }

  /* Table caption or footer */
  :global(.content table caption),
  :global(.content table tfoot) {
    background-color: rgba(103, 232, 249, 0.1);
    padding: 0.75rem;
    font-size: 0.875rem;
    color: var(--health-primary);
    text-align: left;
    border-top: 1px solid var(--health-primary);
  }

  /* Highlight important cells */
  :global(.content td.highlight) {
    color: var(--health-primary);
    font-weight: 600;
  }

  /* For responsive tables on small screens */
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
  
  /* Planetary Health guide card */
  .planetary-health-guide-card {
    background: linear-gradient(135deg, rgba(103, 232, 249, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%);
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(30, 58, 138, 0.1);
    border: 1px solid rgba(30, 58, 138, 0.2);
    overflow: visible !important;
    position: relative;
    z-index: 1;
  }

  .planetary-health-guide-card .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1001;
    min-width: 300px;
    max-width: 350px;
    overflow: hidden;
    border: 1px solid rgba(30, 58, 138, 0.3);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: white;
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
    color: var(--health-primary);
    flex-shrink: 0;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h3 {
    margin: 0 0 0.5rem 0;
    color: var(--health-primary);
    font-size: 1.25rem;
  }
  
  .card-text p {
    margin: 0;
    color: #4b5563;
    font-size: 1rem;
  }
  
  .card-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: center;
    position: relative;
    overflow: visible;
  }
  
  .primary-btn {
    background-color: var(--health-primary);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: var(--health-secondary);
    transform: translateY(-1px);
  }
  
  .secondary-btn {
    background-color: white;
    color: var(--health-primary);
    border: 1px solid var(--health-primary);
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .secondary-btn:hover {
    background-color: rgba(103, 232, 249, 0.1);
    transform: translateY(-1px);
  }
  
  .download-icon {
    display: inline-block;
    margin-left: 0.25rem;
  }
  
  .arrow-icon {
    display: inline-block;
    margin-left: 0.25rem;
  }

  /* Link styles for content */
  .content :global(a) {
    color: var(--health-secondary);
    text-decoration: underline;
    font-weight: 500;
    transition: all 0.2s;
  }

  .content :global(a:hover) {
    color: var(--health-primary);
    text-decoration: underline;
  }

  .content :global(a:active) {
    color: var(--health-primary);
  }

  /* External link styles with a subtle indicator */
  .content :global(a[href^="http"]):after, 
  .content :global(a[href^="https://"]):after {
    content: " ↗";
    font-size: 0.8em;
    vertical-align: super;
  }

  /* PDF link styles with download indicator */
  .content :global(a[href$=".pdf"]):after {
    content: " ↓";
    font-size: 0.8em;
  }

  /* Section link styles - more subtle but still distinct */
  .content :global(a[href^="#"]) {
    color: var(--health-accent);
    text-decoration: none;
    border-bottom: 1px dotted var(--health-accent);
  }

  .content :global(a[href^="#"]):hover {
    color: var(--health-secondary);
    border-bottom-color: var(--health-secondary);
  }

  /* Make sure links in tables are readable against the background */
  .content :global(table a) {
    color: var(--health-secondary);
    font-weight: 600;
  }

  /* Links in the section navigation */
  .section-nav a {
    color: #4b5563;
    text-decoration: none;
    transition: color 0.2s;
  }

  .section-nav a:hover {
    color: var(--health-primary);
  }

  /* Styles for navigation at bottom of guide */
  .guide-navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
  }

  /* Section navigation for core framework sections */
  .section-navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
  }

  .nav-btn {
    background-color: var(--health-primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .nav-btn:hover {
    background-color: var(--health-secondary);
    transform: translateY(-1px);
  }

  .prev-btn {
    margin-right: auto;
  }

  .next-btn {
    margin-left: auto;
  }
  
  /* Dropdown styles for supplementary materials */
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
    top: 100%;
    left: 0;
    z-index: 1000;
    width: auto !important;
    min-width: 250px !important;
    padding: 0.5rem 0;
    margin: 0.125rem 0 0;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175);
    margin-top: 0;
    padding-top: 10px;
    white-space: normal !important;
  }

  .dropdown:hover .dropdown-menu,
  .dropdown-li:hover .dropdown-menu {
    display: block;
  }

  .dropdown::after,
  .dropdown-li::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 10px;
    background: transparent;
  }
  
  .dropdown-li {
    position: relative;
  }

  .dropdown-li .dropdown-menu {
    width: 250px;
    display: none;
  }

  .dropdown-li:hover .dropdown-menu {
    display: block;
  }

  /* Fix for dropdown items when supplementary is active */
  .dropdown-li.active .dropdown-menu {
    background-color: white !important;
  }

  .dropdown-li.active .dropdown-item {
    color: #212529 !important;
  }

  .dropdown-li.active .dropdown-item:hover {
    background-color: rgba(103, 232, 249, 0.1) !important;
    color: var(--health-primary) !important;
  }

  .dropdown-li.active .dropdown-menu .dropdown-item {
    color: #212529 !important;
    background-color: transparent !important;
  }

  .dropdown-li.active .dropdown-menu {
    background-color: white !important;
  }

  /* Remove any inherited text color styling */
  .dropdown-li.active .dropdown-item *,
  .dropdown-li.active .supplement-title,
  .dropdown-li.active .supplement-icon {
    color: inherit !important;
  }

  /* Hover state */
  .dropdown-li.active .dropdown-item:hover {
    background-color: rgba(103, 232, 249, 0.1) !important;
    color: var(--health-primary) !important;
  }

  /* Fix for supplement icons in dropdown */
  .dropdown-item .supplement-icon {
    display: inline-block;
    width: 24px;
    text-align: center;
    margin-right: 8px;
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
  }
  
  .dropdown-item:hover, .dropdown-item:focus {
    color: #16181b;
    text-decoration: none;
    background-color: rgba(103, 232, 249, 0.1);
  }
  
  .supplement-icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    margin-bottom: 0;
  }
  
  .supplement-title {
    font-weight: 600;
  }
  
  @media (max-width: 640px) {
    .card-content {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
    
    .card-actions {
      width: 100%;
      justify-content: center;
    }
    
    .guide-navigation {
      flex-direction: column;
      gap: 1rem;
    }
    
    .guide-navigation button {
      width: 100%;
    }

    .section-navigation {
      flex-direction: column;
      gap: 1rem;
    }

    .section-navigation button {
      width: 100%;
    }
  }

  /* Planetary Health Framework specific theme elements */

  /* Special callouts for health concepts */
  .content :global(.community-callout) {
    background-color: rgba(245, 158, 11, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--health-community);
  }

  .content :global(.technology-callout) {
    background-color: rgba(8, 145, 178, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--health-accent);
  }

  .content :global(.spiritual-callout) {
    background-color: rgba(124, 58, 237, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--health-wisdom);
  }

  /* Special styling for case studies */
  .content :global(.case-study) {
    background-color: rgba(5, 150, 105, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--health-secondary);
  }

  .content :global(.case-study-title) {
    color: var(--health-secondary);
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  /* Alert/warning styling */
  .content :global(.alert) {
    background-color: rgba(196, 59, 59, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-left: 4px solid #C43B3B;
  }

  .content :global(.alert-title) {
    color: #C43B3B;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  /* Highlight boxes for important health concepts */
  .content :global(.concept-highlight) {
    background-color: rgba(103, 232, 249, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(103, 232, 249, 0.3);
  }

  .content :global(.concept-highlight-title) {
    color: var(--health-secondary);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(103, 232, 249, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Rights recognition styling */
  .content :global(.rights-highlight) {
    background-color: rgba(30, 58, 138, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(30, 58, 138, 0.3);
  }

  .content :global(.rights-highlight-title) {
    color: var(--health-primary);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(30, 58, 138, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Health innovation styling */
  .content :global(.innovation-highlight) {
    background-color: rgba(16, 185, 129, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(16, 185, 129, 0.3);
  }

  .content :global(.innovation-highlight-title) {
    color: var(--health-healing);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(16, 185, 129, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Traditional knowledge styling */
  .content :global(.traditional-highlight) {
    background-color: rgba(146, 64, 14, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(146, 64, 14, 0.3);
  }

  .content :global(.traditional-highlight-title) {
    color: var(--health-earth);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(146, 64, 14, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Language fallback notice */
   .language-fallback-notice {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background-color: rgba(5, 150, 105, 0.1);
    border: 1px solid rgba(5, 150, 105, 0.3);
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
    margin-bottom: 1.5rem;
  }

  .notice-icon {
    font-size: 1.25rem;
    color: var(--health-secondary);
    flex-shrink: 0;
    margin-top: 0.125rem;
  }

  .notice-content {
    flex: 1;
  }

  .notice-content strong {
    color: var(--health-secondary);
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
</style>
