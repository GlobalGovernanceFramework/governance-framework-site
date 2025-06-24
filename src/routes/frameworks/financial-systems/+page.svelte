<!-- /src/routes/frameworks/financial-systems/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { invalidate } from '$app/navigation';
  import { base } from '$app/paths';
  import SectionNotice from '$lib/components/SectionNotice.svelte';
  import FrameworkSidebar from '$lib/components/FrameworkSidebar.svelte';
  import { onMount, tick } from 'svelte';
  import { slide } from 'svelte/transition';

  export let data;

  // Extract financialFramework translations for shorter references
  $: ff = $t('financialFramework') || {};
  $: translationFunction = $t;
  
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
  let implementationOpen = false;
  let operationsOpen = false;
  let resourcesOpen = false;

  // Initialize accordion states after mount
  function initializeAccordionStates() {
    // Set initial accordion states based on active section
    if (['introduction', 'core-principles'].includes(activeSection)) {
      foundationOpen = true;
    } else if (['structural-components', 'implementation-approaches'].includes(activeSection)) {
      implementationOpen = true;
    } else if (['metrics-evaluation', 'supporting-sections', 'appendices'].includes(activeSection)) {
      operationsOpen = true;
    } else if (['quick-guide', 'quick-guide-medium', 'quick-guide-youth'].includes(activeSection)) {
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

  // Function to get section icons
  function getSectionIcon(section) {
    const icons = {
      // Foundation sections
      'introduction': '🌟',
      'core-principles': '💎',
      
      // Implementation sections  
      'structural-components': '🏗️',
      'implementation-approaches': '🚀',
      
      // Operations sections
      'metrics-evaluation': '📈',
      'supporting-sections': '🤝',
      'appendices': '📚'
    };
    
    return icons[section] || '📄';
  }

  // Get section titles in current language
  function getSectionTitle(section) {
    return ff.sections?.[section] || section;
  }

  // Group sections logically with multi-lingual support using short references
  function getSectionCategoryTitle(category) {
    return ff.categories?.[category] || category;
  }

  // Function to get shortened section titles for navigation using short references
  function getShortSectionTitle(section) {
    return ff.sectionsShort?.[section] || getSectionTitle(section);
  }

  // Function to download the guide PDF
  function downloadGuide(version = '') {
    const versionSuffix = version ? `-${version}` : '';
    const pdfUrl = `${base}/assets/pdf/financial-systems-framework${versionSuffix}-${currentLocale}.pdf`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `financial-systems-framework${versionSuffix}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // For the guide selector
  let selectedGuide = 'quick-guide';
  
  function selectGuide(guide) {
    selectedGuide = guide;
    setActiveSection(guide);
  }
  
  // Guide information for the selector
  $: guides = ff.guides || [];
  
  // Check if the active section is any of the guides
  $: isGuideActive = ['quick-guide', 'quick-guide-medium', 'quick-guide-youth'].includes(activeSection);
  $: isSupplementaryActive = isGuideActive;

  // For handling dropdown states
  let isCardDropdownOpen = false;

  function toggleCardDropdown() {
    isCardDropdownOpen = !isCardDropdownOpen;
  }

  function toggleFoundation() {
    foundationOpen = !foundationOpen;
  }

  function toggleImplementation() {
    implementationOpen = !implementationOpen;
  }

  function toggleOperations() {
    operationsOpen = !operationsOpen;
  }

  function toggleResources() {
    resourcesOpen = !resourcesOpen;
  }

  // Get sections for different accordion groups - filtering out guides and grouping logically
  $: regularSections = Object.keys(data?.sections || {}).filter(section => 
    !['quick-guide', 'quick-guide-medium', 'quick-guide-youth'].includes(section)
  );

  // Group sections logically
  $: foundationSections = ['introduction', 'core-principles'];
  $: implementationSections = ['structural-components', 'implementation-approaches'];
  $: operationsSections = ['metrics-evaluation', 'supporting-sections', 'appendices'];

  // For progress indicator - count only non-guide sections
  $: totalSections = regularSections.filter(s => s !== 'index').length;
  $: currentSectionIndex = regularSections.filter(s => s !== 'index').indexOf(activeSection) + 1;
  $: isCoreSection = regularSections.includes(activeSection) && activeSection !== 'index';

  // Handle locale changes - add safety check
  $: if (browser && mounted && $locale) {
    invalidate('app:locale');
  }
</script>

<svelte:head>
  <title>{ff.meta?.title || 'Financial Systems Framework - Global Governance Framework'}</title>
  <meta name="description" content="{ff.meta?.description || 'A comprehensive blueprint for transforming global financial systems to prioritize human and ecological flourishing'}" />
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
      <!-- Quick Access Card for Financial Systems Framework -->
      {#if !isPrintMode && !isGuideActive && activeSection === 'index'}
        <div class="financial-guide-card">
          <div class="card-content">
            <div class="card-icon">💰</div>
            <div class="card-text">
              <h3>{ff.guideCard?.title || 'New to the Financial Systems Framework?'}</h3>
              <p>{ff.guideCard?.description || 'Start with one of our simplified guides that explain the core concepts for different audiences.'}</p>
            </div>
            <div class="card-actions">
              <div class="dropdown">
                <button class="primary-btn dropdown-toggle" on:click={toggleCardDropdown}>
                  {ff.guideCard?.buttonText || 'Choose a Guide'} <span class="arrow-icon">▾</span>
                </button>
                {#if isCardDropdownOpen}
                  <div class="dropdown-menu">
                    {#each guides as guide}
                      <button class="dropdown-item" on:click={() => {
                        selectGuide(guide.id);
                        isCardDropdownOpen = false; // Close dropdown after selection
                      }}>
                        <span class="guide-icon">{guide.icon}</span>
                        <div class="guide-info">
                          <span class="guide-title">{guide.title}</span>
                          <span class="guide-desc">{guide.description}</span>
                        </div>
                      </button>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
          </div>
        </div>
      {/if}

      {#if data.isModular}
        <!-- Sub-navigation for framework sections -->
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
                class:has-active={foundationSections.some(section => activeSection === section)}
                on:click={toggleFoundation}
              >
                <span class="accordion-icon">💝</span>
                <span class="accordion-title">{getSectionCategoryTitle('foundation')}</span>
                <span class="section-count">({foundationSections.length})</span>
                <span class="toggle-arrow" class:rotated={foundationOpen}>▼</span>
              </button>
              {#if foundationOpen}
                <div class="accordion-content" transition:slide={{ duration: 200 }}>
                  {#each foundationSections as section}
                    {#if data?.sections?.[section]}
                      <button 
                        class="nav-item subsection-item" 
                        class:active={activeSection === section}
                        on:click={() => setActiveSection(section)}
                      >
                        <span class="nav-icon">{getSectionIcon(section)}</span>
                        <span class="nav-title">{getShortSectionTitle(section)}</span>
                      </button>
                    {/if}
                  {/each}
                </div>
              {/if}
            </div>

            <!-- Implementation Accordion -->
            <div class="nav-accordion">
              <button 
                class="accordion-header" 
                class:open={implementationOpen}
                class:has-active={implementationSections.some(section => activeSection === section)}
                on:click={toggleImplementation}
              >
                <span class="accordion-icon">🔧</span>
                <span class="accordion-title">{getSectionCategoryTitle('implementation')}</span>
                <span class="section-count">({implementationSections.length})</span>
                <span class="toggle-arrow" class:rotated={implementationOpen}>▼</span>
              </button>
              {#if implementationOpen}
                <div class="accordion-content" transition:slide={{ duration: 200 }}>
                  {#each implementationSections as section}
                    {#if data?.sections?.[section]}
                      <button 
                        class="nav-item subsection-item" 
                        class:active={activeSection === section}
                        on:click={() => setActiveSection(section)}
                      >
                        <span class="nav-icon">{getSectionIcon(section)}</span>
                        <span class="nav-title">{getShortSectionTitle(section)}</span>
                      </button>
                    {/if}
                  {/each}
                </div>
              {/if}
            </div>

            <!-- Operations & Evaluation Accordion -->
            <div class="nav-accordion">
              <button 
                class="accordion-header" 
                class:open={operationsOpen}
                class:has-active={operationsSections.some(section => activeSection === section)}
                on:click={toggleOperations}
              >
                <span class="accordion-icon">📊</span>
                <span class="accordion-title">{getSectionCategoryTitle('operations')}</span>
                <span class="section-count">({operationsSections.length})</span>
                <span class="toggle-arrow" class:rotated={operationsOpen}>▼</span>
              </button>
              {#if operationsOpen}
                <div class="accordion-content" transition:slide={{ duration: 200 }}>
                  {#each operationsSections as section}
                    {#if data?.sections?.[section]}
                      <button 
                        class="nav-item subsection-item" 
                        class:active={activeSection === section}
                        on:click={() => setActiveSection(section)}
                      >
                        <span class="nav-icon">{getSectionIcon(section)}</span>
                        <span class="nav-title">{getShortSectionTitle(section)}</span>
                      </button>
                    {/if}
                  {/each}
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
                <span class="section-count">({guides.length})</span>
                <span class="toggle-arrow" class:rotated={resourcesOpen}>▼</span>
              </button>
              {#if resourcesOpen}
                <div class="accordion-content" transition:slide={{ duration: 200 }}>
                  {#each guides as guide}
                    <button 
                      class="nav-item subsection-item" 
                      class:active={activeSection === guide.id}
                      on:click={() => setActiveSection(guide.id)}
                    >
                      <span class="nav-icon">{guide.icon}</span>
                      <span class="nav-title">{guide.title}</span>
                    </button>
                  {/each}
                </div>
              {/if}
            </div>
          </div>
        {/if}

        <!-- Progress indicator for core sections -->
        {#if !isPrintMode && isCoreSection}
          <div class="progress-indicator">
            <div class="progress-bar">
              <div class="progress-fill" style="width: {((currentSectionIndex / totalSections) * 100)}%"></div>
            </div>
            <span class="progress-text">{ff.progress?.text?.replace('{current}', currentSectionIndex).replace('{total}', totalSections) || `Section ${currentSectionIndex} of ${totalSections}`}</span>
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
                    <strong>{ff.languageFallback?.title || 'Content in your language coming soon'}</strong>
                    <p>{ff.languageFallback?.description || 'This section is currently displayed in English until translation is complete.'}</p>
                  </div>
                </div>
              {/if}
              
              {#if isGuideActive && section === activeSection}
                <!-- Guide selector if we're in one of the guides and not in print mode -->
                {#if !isPrintMode}
                  <div class="guide-selector">
                    <h2>Financial Systems Framework Guides</h2>
                    <p>Choose the guide version that best matches your needs:</p>
                    
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
                    <button class="secondary-btn" on:click={() => downloadGuide(section.replace('quick-guide', '').replace('-', ''))}>
                      {ff.navigation?.downloadPdf || 'Download PDF Version'} <span class="download-icon">↓</span>
                    </button>
                    <button class="primary-btn" on:click={() => setActiveSection('introduction')}>
                      {ff.navigation?.continueToFull || 'Continue to Full Framework'} <span class="arrow-icon">→</span>
                    </button>
                  </div>
                {/if}

              {:else if section === 'index' && currentLocale === 'sv'}
                <!-- Manually render Swedish introduction for the index section -->
                <div class="overview-section">
                  <h1>{ff.intro?.title}</h1>
                  <h2>{ff.intro?.overview}</h2>
                  <p>{ff.intro?.paragraph1}</p>
                  <p>{ff.intro?.paragraph2}</p>
                </div>
              {:else}
                <!-- Render sections from markdown files -->
                <svelte:component this={data.sections[section].default} t={translationFunction} />
              {/if}

              <!-- Section navigation at bottom of core sections -->
              {#if isCoreSection && !isPrintMode}
                <div class="section-navigation">
                  {#if currentSectionIndex > 1}
                    <button class="nav-btn prev-btn" on:click={() => {
                      const nonIndexSections = regularSections.filter(s => s !== 'index');
                      const prevSection = nonIndexSections[currentSectionIndex - 2];
                      setActiveSection(prevSection);
                    }}>
                      ← {ff.navigation?.previousSection || 'Previous Section'}
                    </button>
                  {/if}
                  
                  {#if currentSectionIndex < totalSections}
                    <button class="nav-btn next-btn" on:click={() => {
                      const nonIndexSections = regularSections.filter(s => s !== 'index');
                      const nextSection = nonIndexSections[currentSectionIndex];
                      setActiveSection(nextSection);
                    }}>
                      {ff.navigation?.nextSection || 'Next Section'} →
                    </button>
                  {/if}
                </div>
              {/if}
            </div>
          {:else}
            <div class="missing-section">
              <h2>{ff.errors?.sectionNotFound?.replace('{section}', section) || `Section "${section}" not found`}</h2>
              <p>{ff.errors?.contentInDevelopment || 'This content is still being developed.'}</p>
            </div>
          {/if}
        {/each}
      {:else}
        <!-- Legacy single file display -->
        <div class="overview-section">
         <h1>{ff.intro?.title || 'Financial Systems Framework'}</h1>
         <h2>{ff.intro?.overview || 'Overview'}</h2>
         <p>{ff.intro?.paragraph1}</p>
         <p>{ff.intro?.paragraph2}</p>
       </div>
       
       <!-- The rest of the content -->
       <div class="remaining-content">
         <svelte:component this={data.component} />
       </div>
     {/if}
   </div>
 </div>
{:else}
 <!-- Loading state to prevent hydration issues -->
 <div class="loading-container">
   <div class="loading-spinner"></div>
   <p>{ff.loading?.text || 'Loading framework content...'}</p>
 </div>
{/if}

<style>
  /* Financial Systems Framework color scheme - Hearts-themed palette */
  :root {
    --financial-primary: #3A6EA5; /* Heart Blue - trust, stability, flow */
    --financial-secondary: #8A4F9E; /* Connection Purple - relationships, community, bonds */
    --financial-accent: #F5A623; /* Trust Gold - value, prosperity, wisdom */
    --financial-growth: #6DAA3F; /* Leaf Green - sustainability, growth, renewal */
    --financial-care: #C43B3B; /* Care Red - passion, urgency, equity */
    --financial-flow: #4A90A4; /* Flow Teal - circulation, movement, vitality */
    --financial-abundance: #F39C12; /* Abundance Orange - creativity, innovation, energy */
    --financial-harmony: #27AE60; /* Harmony Green - balance, wellbeing, peace */
    --financial-wisdom: #8E44AD; /* Wisdom Purple - depth, insight, transformation */
    --financial-light: #E8F4FD; /* Light Heart - transparency, openness, clarity */
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
    background-color: rgba(58, 110, 165, 0.05);
  }

  .accordion-header.has-active {
    background-color: rgba(58, 110, 165, 0.1);
    color: var(--financial-primary);
    font-weight: 600;
  }

  .accordion-header.open {
    background-color: rgba(58, 110, 165, 0.1);
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
    background-color: rgba(58, 110, 165, 0.05);
    color: #374151;
  }

  .nav-item.active {
    background-color: var(--financial-primary);
    color: white;
    font-weight: 600;
  }

  .nav-item.active:hover {
    background-color: var(--financial-flow);
  }

  .overview-item {
    background: linear-gradient(135deg, rgba(58, 110, 165, 0.1), rgba(138, 79, 158, 0.1));
    border: 1px solid rgba(58, 110, 165, 0.2);
    border-radius: 0.375rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .overview-item.active {
    background: var(--financial-primary);
    color: white;
  }

  .subsection-item {
    padding-left: 1.5rem;
  }

  .nav-icon {
    font-size: 1.1rem;
    flex-shrink: 0;
    width: 1.5rem;
    text-align: center;
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
    background: linear-gradient(90deg, rgba(58, 110, 165, 0.1), rgba(138, 79, 158, 0.1));
    border-radius: 0.5rem;
    border-left: 4px solid var(--financial-primary);
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
    background: linear-gradient(90deg, var(--financial-primary), var(--financial-secondary));
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 0.875rem;
    color: var(--financial-flow);
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
  
  /* Additional styles for markdown content */
  .content :global(h1) {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--financial-primary);
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--financial-secondary);
  }
  
  .content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--financial-accent);
  }

  /* Styling for h4 headers (#### in Markdown) */
  :global(h4) {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--financial-growth);
  }

  /* Styling for the inset box (blockquote) */
  :global(blockquote) {
    background-color: rgba(138, 79, 158, 0.1);
    border-left: 4px solid var(--financial-secondary);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
  }

  :global(blockquote > p:first-child strong) {
    font-size: 1.1rem;
    color: var(--financial-flow);
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
    color: var(--financial-secondary);
    text-decoration: underline;
    font-weight: 500;
  }

  :global(blockquote a:hover) {
    color: var(--financial-primary);
  }
  
  .content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #4b5563;
  }
  
  /* Lists with financial/hearts themed bullets */
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

  /* Apply hearts symbols to all ul li EXCEPT those in section-nav */
  .content :global(ul li:not(.section-nav li))::before {
    content: "♥";
    position: absolute;
    left: 0;
    top: 0.1em;
    font-size: 0.9rem;
    color: var(--financial-care);
  }

  .content :global(ol) {
    list-style-type: decimal;
  }

  .content :global(ol li) {
    margin-bottom: 0.75rem;
    padding-left: 0.5rem;
  }

  .content :global(ol li::marker) {
    color: var(--financial-secondary);
    font-weight: 600;
  }

  /* Nested lists */
  .content :global(ul ul), .content :global(ol ul) {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .content :global(ul ul li::before) {
    content: "💝";
    color: var(--financial-abundance);
  }

  /* Table styles for financial systems framework */
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
    background: linear-gradient(to right, var(--financial-primary), var(--financial-secondary));
  }

  :global(.content th) {
    padding: 0.75rem 1rem;
    font-weight: 600;
    text-align: left;
    color: #ffffff;
    border: none;
    border-bottom: 2px solid var(--financial-primary);
  }

  :global(.content td) {
    padding: 0.75rem 1rem;
    border: 1px solid #e5e7eb;
    border-left: none;
    border-right: none;
    vertical-align: top;
  }

  :global(.content tr:nth-child(odd)) {
    background-color: rgba(138, 79, 158, 0.05);
  }

  :global(.content tr:nth-child(even)) {
    background-color: #ffffff;
  }

  :global(.content tr:hover) {
    background-color: rgba(138, 79, 158, 0.1);
  }

  :global(.content tbody tr:last-child td) {
    border-bottom: none;
  }
  
  /* Financial systems framework guide card */
  .financial-guide-card {
    background: linear-gradient(135deg, rgba(138, 79, 158, 0.1) 0%, rgba(58, 110, 165, 0.1) 100%);
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(58, 110, 165, 0.1);
    border: 1px solid rgba(58, 110, 165, 0.2);
    overflow: visible !important;
    position: relative;
    z-index: 1;
  }

  .financial-guide-card .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1001;
    min-width: 300px;
    max-width: 350px;
    overflow: hidden;
    border: 1px solid rgba(58, 110, 165, 0.3);
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
    color: var(--financial-primary);
    flex-shrink: 0;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h3 {
    margin: 0 0 0.5rem 0;
    color: var(--financial-primary);
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
    background-color: var(--financial-primary);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: var(--financial-secondary);
    transform: translateY(-1px);
  }
  
  .secondary-btn {
    background-color: white;
    color: var(--financial-primary);
    border: 1px solid var(--financial-primary);
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .secondary-btn:hover {
    background-color: rgba(138, 79, 158, 0.1);
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
    color: var(--financial-secondary);
    text-decoration: underline;
    font-weight: 500;
    transition: all 0.2s;
  }

  .content :global(a:hover) {
    color: var(--financial-primary);
    text-decoration: underline;
  }

  .content :global(a:active) {
    color: var(--financial-primary);
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
    color: var(--financial-accent);
    text-decoration: none;
    border-bottom: 1px dotted var(--financial-accent);
  }

  .content :global(a[href^="#"]):hover {
    color: var(--financial-secondary);
    border-bottom-color: var(--financial-secondary);
  }

  /* Make sure links in tables are readable against the background */
  .content :global(table a) {
    color: var(--financial-secondary);
    font-weight: 600;
  }

  /* Links in the section navigation */
  .section-nav a {
    color: #4b5563;
    text-decoration: none;
    transition: color 0.2s;
  }

  .section-nav a:hover {
    color: var(--financial-primary);
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
    background-color: var(--financial-primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .nav-btn:hover {
    background-color: var(--financial-flow);
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
    min-width: 300px !important;
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
    width: 300px;
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
    background-color: rgba(138, 79, 158, 0.1) !important;
    color: var(--financial-primary) !important;
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
  .dropdown-li.active .guide-title,
  .dropdown-li.active .guide-desc,
  .dropdown-li.active .guide-icon {
    color: inherit !important;
  }

  /* Hover state */
  .dropdown-li.active .dropdown-item:hover {
    background-color: rgba(138, 79, 158, 0.1) !important;
    color: var(--financial-primary) !important;
  }

  /* Fix for guide icons in dropdown */
  .dropdown-item .guide-icon {
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
    background-color: rgba(138, 79, 158, 0.1);
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
    box-shadow: 0 4px 6px rgba(58, 110, 165, 0.1);
    transform: translateY(-2px);
    border-color: var(--financial-primary);
  }
  
  .guide-card.active {
    border-color: var(--financial-primary);
    background-color: rgba(138, 79, 158, 0.1);
  }
  
  .guide-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .guide-title {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--financial-primary);
  }
  
  .guide-desc {
    font-size: 0.875rem;
    color: #6b7280;
  }
  
  .guide-info {
    display: flex;
    flex-direction: column;
  }
  
  /* For dropdown guide items */
  .dropdown-item .guide-icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    margin-bottom: 0;
  }
  
  .dropdown-item .guide-title {
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  .dropdown-item .guide-desc {
    font-size: 0.75rem;
    color: #6b7280;
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
    
    .guide-cards {
      flex-direction: column;
    }
    
    .guide-card {
      max-width: none;
    }
  }

  /* Financial Systems Framework specific theme elements */

  /* Special callouts for Hearts and financial concepts */
  .content :global(.hearts-callout) {
    background-color: rgba(58, 110, 165, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--financial-primary);
  }

  .content :global(.trust-callout) {
    background-color: rgba(245, 166, 35, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--financial-accent);
  }

  .content :global(.connection-callout) {
    background-color: rgba(138, 79, 158, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--financial-secondary);
  }

  .content :global(.care-callout) {
    background-color: rgba(196, 59, 59, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--financial-care);
  }

  /* Special styling for case studies */
  .content :global(.case-study) {
    background-color: rgba(74, 144, 164, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--financial-flow);
  }

  .content :global(.case-study-title) {
    color: var(--financial-flow);
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  /* Alert/warning styling */
  .content :global(.alert) {
    background-color: rgba(196, 59, 59, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--financial-care);
  }

  .content :global(.alert-title) {
    color: var(--financial-care);
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  /* Highlight boxes for important financial concepts */
  .content :global(.concept-highlight) {
    background-color: rgba(138, 79, 158, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(138, 79, 158, 0.3);
  }

  .content :global(.concept-highlight-title) {
    color: var(--financial-secondary);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(138, 79, 158, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Hearts currency styling */
  .content :global(.hearts-highlight) {
    background-color: rgba(58, 110, 165, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(58, 110, 165, 0.3);
  }

  .content :global(.hearts-highlight-title) {
    color: var(--financial-primary);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(58, 110, 165, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Trust and value styling */
  .content :global(.trust-highlight) {
    background-color: rgba(245, 166, 35, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(245, 166, 35, 0.3);
  }

  .content :global(.trust-highlight-title) {
    color: var(--financial-accent);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(245, 166, 35, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Growth and sustainability styling */
  .content :global(.growth-highlight) {
    background-color: rgba(109, 170, 63, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(109, 170, 63, 0.3);
  }

  .content :global(.growth-highlight-title) {
    color: var(--financial-growth);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(109, 170, 63, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Abundance and innovation styling */
  .content :global(.abundance-highlight) {
    background-color: rgba(243, 156, 18, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(243, 156, 18, 0.3);
  }

  .content :global(.abundance-highlight-title) {
    color: var(--financial-abundance);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(243, 156, 18, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Harmony and balance styling */
  .content :global(.harmony-highlight) {
    background-color: rgba(39, 174, 96, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(39, 174, 96, 0.3);
  }

  .content :global(.harmony-highlight-title) {
    color: var(--financial-harmony);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(39, 174, 96, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Wisdom and transformation styling */
  .content :global(.wisdom-highlight) {
    background-color: rgba(142, 68, 173, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(142, 68, 173, 0.3);
  }

  .content :global(.wisdom-highlight-title) {
    color: var(--financial-wisdom);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(142, 68, 173, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Flow and circulation styling */
  .content :global(.flow-highlight) {
    background-color: rgba(74, 144, 164, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(74, 144, 164, 0.3);
  }

  .content :global(.flow-highlight-title) {
    color: var(--financial-flow);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(74, 144, 164, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Language fallback notice */
   .language-fallback-notice {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background-color: rgba(58, 110, 165, 0.1);
    border: 1px solid rgba(58, 110, 165, 0.3);
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
    margin-bottom: 1.5rem;
  }

  .notice-icon {
    font-size: 1.25rem;
    color: var(--financial-primary);
    flex-shrink: 0;
    margin-top: 0.125rem;
  }

  .notice-content {
    flex: 1;
  }

  .notice-content strong {
    color: var(--financial-primary);
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
