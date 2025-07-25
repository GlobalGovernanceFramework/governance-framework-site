<!-- src/routes/frameworks/food-systems-and-agriculture/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { invalidate } from '$app/navigation';
  import { base } from '$app/paths';
  import SectionNotice from '$lib/components/SectionNotice.svelte';
  import FrameworkSidebar from '$lib/components/FrameworkSidebar.svelte';
  import { onMount, afterUpdate, tick } from 'svelte';
  import { slide } from 'svelte/transition';

  export let data;

  // Extract foodSystemsFramework translations for shorter references
  $: fsf = $t('foodSystemsFramework') || {};
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
  let strategicOpen = false;
  let implementationOpen = false;
  let resourcesOpen = false;

  // Initialize accordion states after mount
  function initializeAccordionStates() {
    // Set initial accordion states based on active section
    if (['introduction', 'definitions', 'theory-of-change', 'stakeholder-engagement'].includes(activeSection)) {
      foundationOpen = true;
    } else if (['core-principles', 'strategic-objectives', 'implementation-mechanisms', 'systemic-leverage-points', 'regional-customization'].includes(activeSection)) {
      strategicOpen = true;
    } else if (['risk-management', 'timeline-milestones', 'communication-advocacy', 'visual-appendix', 'conclusion'].includes(activeSection)) {
      implementationOpen = true;
    } else if (['quick-guide', 'quick-guide-medium', 'quick-guide-youth', 'glossary'].includes(activeSection)) {
      resourcesOpen = true;
    } else {
      // Default state for overview
      foundationOpen = true;
    }
  }

  onMount(async () => {
    await tick();
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
    return fsf.sections?.[section] || section;
  }

  // Group sections logically with multi-lingual support using short references
  function getSectionCategoryTitle(category) {
    return fsf.categories?.[category] || category;
  }

  // Function to get shortened section titles for navigation using short references
  function getShortSectionTitle(section) {
    return fsf.sectionsShort?.[section] || getSectionTitle(section);
  }

  // Function to get section-specific icons for food systems framework
  function getSectionIcon(section) {
    const sectionIcons = {
      // Overview
      'index': '🌾', // Wheat representing agriculture overview
      
      // Foundation sections
      'introduction': '🌱', // Seedling for introduction/beginning
      'definitions': '📖', // Book for definitions and terminology
      'theory-of-change': '🔄', // Cycle representing transformation
      'stakeholder-engagement': '🤝', // Handshake for collaboration
      
      // Strategic framework sections
      'core-principles': '⚖️', // Balance scales for principles
      'strategic-objectives': '🎯', // Target for objectives
      'implementation-mechanisms': '⚙️', // Gear for mechanisms
      'systemic-leverage-points': '🎛️', // Control panel for leverage points
      'regional-customization': '🗺️', // Map for regional adaptation
      
      // Implementation sections
      'risk-management': '🛡️', // Shield for protection/risk management
      'timeline-milestones': '📅', // Calendar for timeline
      'communication-advocacy': '📢', // Megaphone for communication
      'visual-appendix': '📊', // Chart for visual data
      'conclusion': '🎉', // Celebration for conclusion
      
      // Resources and guides
      'quick-guide': '⚡', // Lightning for quick guide
      'quick-guide-medium': '🧭', // Compass for medium guide
      'quick-guide-youth': '🌟', // Star for youth guide
      'glossary': '📚' // Books for glossary
    };
    
    return sectionIcons[section] || '📋'; // Default clipboard icon
  }

  // Function to download the framework PDF
  function downloadFramework(version = '') {
    const versionSuffix = version ? `-${version}` : '';
    const pdfUrl = `${base}/assets/pdf/food-systems-framework${versionSuffix}-${currentLocale}.pdf`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `food-systems-framework${versionSuffix}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Computed values - add safety checks
  $: isQuickGuideActive = ['quick-guide', 'quick-guide-medium', 'quick-guide-youth'].includes(activeSection);
  $: isSupplementaryActive = isQuickGuideActive || activeSection === 'glossary';
  $: foundationSections = ['introduction', 'definitions', 'theory-of-change', 'stakeholder-engagement'];
  $: strategicSections = ['core-principles', 'strategic-objectives', 'implementation-mechanisms', 'systemic-leverage-points', 'regional-customization'];
  $: implementationSections = ['risk-management', 'timeline-milestones', 'communication-advocacy', 'visual-appendix', 'conclusion'];
  $: coreFrameworkSections = [...foundationSections, ...strategicSections, ...implementationSections];
  $: isCoreSection = coreFrameworkSections.includes(activeSection);

  function toggleFoundation() {
    foundationOpen = !foundationOpen;
  }

  function toggleStrategic() {
    strategicOpen = !strategicOpen;
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

  // Guide selector functionality
  let selectedQuickGuide = 'quick-guide';
  
  function selectQuickGuide(guide) {
    selectedQuickGuide = guide;
    setActiveSection(guide);
  }

  // Get guides from translation data with better icons
  $: guides = fsf.guides || [
    { id: 'quick-guide', title: 'Technical Version', description: 'Detailed guide for policy implementers', icon: '⚡' },
    { id: 'quick-guide-medium', title: 'Community Version', description: 'Balanced guide for local authorities', icon: '🧭' },
    { id: 'quick-guide-youth', title: 'Youth & Grassroots Version', description: 'Visual, accessible guide', icon: '🌟' }
  ];
</script>

<svelte:head>
  <title>{fsf.meta?.title || 'Food Systems & Agriculture Framework - Global Governance Framework'}</title>
  <meta name="description" content="{fsf.meta?.description || 'A comprehensive framework for transforming global food systems through regenerative agriculture and innovative technologies'}" />
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
      <!-- Quick Access Card for Food Systems Framework -->
      {#if !isPrintMode && !isQuickGuideActive && activeSection === 'index'}
        <div class="food-systems-guide-card">
          <div class="card-content">
            <div class="card-icon">🌾</div>
            <div class="card-text">
              <h3>{fsf.guideCard?.title || 'New to the Food Systems Framework?'}</h3>
              <p>{fsf.guideCard?.description || 'Start with one of our simplified guides that explain the core concepts for different audiences.'}</p>
            </div>
            <div class="card-actions">
              <button class="primary-btn" on:click={() => setActiveSection('quick-guide')}>
                {fsf.guideCard?.buttonText || 'Choose a Quick Guide'} <span class="arrow-icon">→</span>
              </button>
            </div>
          </div>
        </div>
      {/if}

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
              <span class="nav-icon">{getSectionIcon('index')}</span>
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
              <span class="accordion-icon">🌱</span>
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

          <!-- Strategic Framework Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={strategicOpen}
              class:has-active={strategicSections.some(section => activeSection === section)}
              on:click={toggleStrategic}
            >
              <span class="accordion-icon">🎯</span>
              <span class="accordion-title">{getSectionCategoryTitle('strategic')}</span>
              <span class="section-count">({strategicSections.length})</span>
              <span class="toggle-arrow" class:rotated={strategicOpen}>▼</span>
            </button>
            {#if strategicOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each strategicSections as section}
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
              <span class="accordion-icon">🚀</span>
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
              <span class="section-count">(4)</span>
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
                {#if data?.sections?.['glossary']}
                  <button 
                    class="nav-item subsection-item" 
                    class:active={activeSection === 'glossary'}
                    on:click={() => setActiveSection('glossary')}
                  >
                    <span class="nav-icon">{getSectionIcon('glossary')}</span>
                    <span class="nav-title">{getSectionTitle('glossary')}</span>
                  </button>
                {/if}
              </div>
            {/if}
          </div>
        </div>
      {/if}

      <!-- Progress indicator for core sections -->
      {#if !isPrintMode && isCoreSection && coreFrameworkSections.length > 0}
        <div class="progress-indicator">
          <div class="progress-bar">
            <div class="progress-fill" style="width: {((coreFrameworkSections.indexOf(activeSection) + 1) / coreFrameworkSections.length * 100)}%"></div>
          </div>
          <span class="progress-text">{fsf.progress?.text?.replace('{current}', coreFrameworkSections.indexOf(activeSection) + 1).replace('{total}', coreFrameworkSections.length) || `Section ${coreFrameworkSections.indexOf(activeSection) + 1} of ${coreFrameworkSections.length}`}</span>
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
                  <strong>{fsf.languageFallback?.title || 'Content in your language coming soon'}</strong>
                  <p>{fsf.languageFallback?.description || 'This section is currently displayed in English until translation is complete.'}</p>
                </div>
              </div>
            {/if}
            
            {#if section.startsWith('quick-guide')}
              <!-- Quick Guide selector if we're in one of the guides and not in print mode -->
              {#if !isPrintMode}
                <div class="quick-guide-selector">
                  <h2>Food Systems Framework Quick Guides</h2>
                  <p>Choose the guide version that best matches your needs:</p>
                  
                  <div class="guide-cards">
                    {#each guides as guide}
                      <div 
                        class="guide-card" 
                        class:active={activeSection === guide.id}
                        on:click={() => selectQuickGuide(guide.id)}
                      >
                        <div class="guide-icon">{guide.icon}</div>
                        <div class="guide-title">{guide.title}</div>
                        <div class="guide-desc">{guide.description}</div>
                      </div>
                    {/each}
                  </div>
                </div>
              {/if}
              
              <!-- Render the selected Quick Guide -->
              <svelte:component this={data.sections[section].default} />
              
              <!-- Navigation buttons at bottom of quick guide -->
              {#if !isPrintMode}
                <div class="guide-navigation">
                  <button class="secondary-btn" on:click={() => downloadFramework(section.replace('quick-guide', '').replace('-', ''))}>
                    {fsf.navigation?.downloadPdf || 'Download PDF Version'} <span class="download-icon">↓</span>
                  </button>
                  <button class="primary-btn" on:click={() => setActiveSection('introduction')}>
                    {fsf.navigation?.continueToFramework || 'Continue to Full Framework'} <span class="arrow-icon">→</span>
                  </button>
                </div>
              {/if}

            {:else}
              <!-- Render ALL sections including index from markdown files -->
              <svelte:component this={data.sections[section].default} t={translationFunction} />
            {/if}

            <!-- Section navigation at bottom of core sections -->
            {#if isCoreSection && !isPrintMode && coreFrameworkSections.length > 0}
              <div class="section-navigation">
                {#if coreFrameworkSections.indexOf(activeSection) > 0}
                  <button class="nav-btn prev-btn" on:click={() => {
                    const currentIndex = coreFrameworkSections.indexOf(activeSection);
                    const prevSection = coreFrameworkSections[currentIndex - 1];
                    setActiveSection(prevSection);
                  }}>
                    ← {fsf.navigation?.previousSection || 'Previous Section'}
                  </button>
                {/if}
                
                {#if coreFrameworkSections.indexOf(activeSection) < coreFrameworkSections.length - 1}
                  <button class="nav-btn next-btn" on:click={() => {
                    const currentIndex = coreFrameworkSections.indexOf(activeSection);
                    const nextSection = coreFrameworkSections[currentIndex + 1];
                    setActiveSection(nextSection);
                  }}>
                    {fsf.navigation?.nextSection || 'Next Section'} →
                  </button>
                {/if}
              </div>
            {/if}
          </div>
        {:else}
          <div class="missing-section">
            <h2>{fsf.errors?.sectionNotFound?.replace('{section}', section) || `Section "${section}" not found`}</h2>
            <p>{fsf.errors?.contentInDevelopment || 'This content is still being developed.'}</p>
          </div>
        {/if}
      {/each}
    </div>
  </div>
{:else}
  <!-- Loading state to prevent hydration issues -->
  <div class="loading-container">
    <div class="loading-spinner"></div>
    <p>{fsf.loading?.text || 'Loading food systems content...'}</p>
  </div>
{/if}

<style>
  /* Food Systems Framework color scheme - earth greens, growth, and sustainability */
  :root {
    --food-primary: #2e7d32; /* Forest Green - sustainability, growth, nature */
    --food-secondary: #4caf50; /* Fresh Green - renewal, life, agriculture */
    --food-accent: #8bc34a; /* Light Green - innovation, freshness, young growth */
    --food-earth: #795548; /* Earth Brown - soil, roots, traditional knowledge */
    --food-harvest: #ff9800; /* Harvest Orange - abundance, warmth, community */
    --food-sky: #03a9f4; /* Sky Blue - water, climate, global perspective */
    --food-seed: #ffc107; /* Seed Gold - potential, value, transformation */
    --food-deep: #1b5e20; /* Deep Green - wisdom, stability, permanence */
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
    background-color: rgba(76, 175, 80, 0.05);
  }

  .accordion-header.has-active {
    background-color: rgba(46, 125, 50, 0.1);
    color: var(--food-primary);
    font-weight: 600;
  }

  .accordion-header.open {
    background-color: rgba(76, 175, 80, 0.1);
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
    background-color: rgba(76, 175, 80, 0.05);
    color: #374151;
  }

  .nav-item.active {
    background-color: var(--food-primary);
    color: white;
    font-weight: 600;
  }

  .nav-item.active:hover {
    background-color: var(--food-deep);
  }

  .overview-item {
    background: linear-gradient(135deg, rgba(46, 125, 50, 0.1), rgba(76, 175, 80, 0.1));
    border: 1px solid rgba(46, 125, 50, 0.2);
    border-radius: 0.375rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .overview-item.active {
    background: var(--food-primary);
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
    background-color: rgba(46, 125, 50, 0.1);
    color: var(--food-primary);
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
    background: linear-gradient(90deg, rgba(46, 125, 50, 0.1), rgba(76, 175, 80, 0.1));
    border-radius: 0.5rem;
    border-left: 4px solid var(--food-primary);
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
    background: linear-gradient(90deg, var(--food-primary), var(--food-secondary));
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 0.875rem;
    color: var(--food-primary);
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
    color: var(--food-primary);
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--food-secondary);
  }
  
  .content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--food-accent);
  }

  /* Styling for h4 headers (#### in Markdown) */
  :global(h4) {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--food-accent);
  }

  /* Styling for the inset box (blockquote) */
  :global(blockquote) {
    background-color: rgba(76, 175, 80, 0.1);
    border-left: 4px solid var(--food-earth);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
  }

  :global(blockquote > p:first-child strong) {
    font-size: 1.1rem;
    color: var(--food-earth);
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
    color: var(--food-primary);
    text-decoration: underline;
    font-weight: 500;
  }

  :global(blockquote a:hover) {
    color: var(--food-deep);
  }
  
  .content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #4b5563;
  }
  
  /* Lists with food-themed bullets */
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

  /* Apply food symbols to all ul li EXCEPT those in section-nav */
  .content :global(ul li:not(.section-nav li))::before {
    content: "🌾";
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
    color: var(--food-secondary);
    font-weight: 600;
  }

  /* Nested lists */
  .content :global(ul ul), .content :global(ol ul) {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .content :global(ul ul li::before) {
    content: "🌱";
    color: var(--food-accent);
  }

  /* Table styles for food systems framework */
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
    background: linear-gradient(to right, var(--food-primary), var(--food-secondary));
  }

  :global(.content th) {
    padding: 0.75rem 1rem;
    font-weight: 600;
    text-align: left;
    color: #ffffff;
    border: none;
    border-bottom: 2px solid var(--food-primary);
  }

  :global(.content td) {
    padding: 0.75rem 1rem;
    border: 1px solid #e5e7eb;
    border-left: none;
    border-right: none;
    vertical-align: top;
  }

  :global(.content tr:nth-child(odd)) {
    background-color: rgba(76, 175, 80, 0.05);
  }

  :global(.content tr:nth-child(even)) {
    background-color: #ffffff;
  }

  :global(.content tr:hover) {
    background-color: rgba(76, 175, 80, 0.1);
  }

  :global(.content tbody tr:last-child td) {
    border-bottom: none;
  }
  
  /* Food Systems guide card */
  .food-systems-guide-card {
    background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(46, 125, 50, 0.1) 100%);
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(46, 125, 50, 0.1);
    border: 1px solid rgba(46, 125, 50, 0.2);
    overflow: visible !important;
    position: relative;
    z-index: 1;
  }

  /* Card dropdown menu - controlled by Svelte {#if} */
  .food-systems-guide-card .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1001;
    min-width: 300px;
    max-width: 350px;
    overflow: hidden;
    border: 1px solid rgba(46, 125, 50, 0.3);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: white;
    border-radius: 0.25rem;
    padding: 0.5rem 0;
    margin-top: 0.25rem;
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
    color: var(--food-primary);
    flex-shrink: 0;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h3 {
    margin: 0 0 0.5rem 0;
    color: var(--food-primary);
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
    background-color: var(--food-primary);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: var(--food-deep);
    transform: translateY(-1px);
  }
  
  .secondary-btn {
    background-color: white;
    color: var(--food-primary);
    border: 1px solid var(--food-primary);
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .secondary-btn:hover {
    background-color: rgba(76, 175, 80, 0.1);
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
    color: var(--food-secondary);
    text-decoration: underline;
    font-weight: 500;
    transition: all 0.2s;
  }

  .content :global(a:hover) {
    color: var(--food-primary);
    text-decoration: underline;
  }

  .content :global(a:active) {
    color: var(--food-primary);
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
    color: var(--food-accent);
    text-decoration: none;
    border-bottom: 1px dotted var(--food-accent);
  }

  .content :global(a[href^="#"]):hover {
    color: var(--food-secondary);
    border-bottom-color: var(--food-secondary);
  }

  /* Make sure links in tables are readable against the background */
  .content :global(table a) {
    color: var(--food-secondary);
    font-weight: 600;
  }

  /* Links in the section navigation */
  .section-nav a {
    color: #4b5563;
    text-decoration: none;
    transition: color 0.2s;
  }

  .section-nav a:hover {
    color: var(--food-primary);
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
    background-color: var(--food-primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .nav-btn:hover {
    background-color: var(--food-deep);
    transform: translateY(-1px);
  }

  .prev-btn {
    margin-right: auto;
  }

  .next-btn {
    margin-left: auto;
  }
  
  /* Quick guide selector styles */
  .quick-guide-selector {
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
    box-shadow: 0 4px 6px rgba(46, 125, 50, 0.1);
    transform: translateY(-2px);
    border-color: var(--food-primary);
  }
  
  .guide-card.active {
    border-color: var(--food-primary);
    background-color: rgba(76, 175, 80, 0.1);
  }
  
  .guide-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .guide-title {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--food-primary);
  }
  
  .guide-desc {
    font-size: 0.875rem;
    color: #6b7280;
  }

  /* Language fallback notice */
  .language-fallback-notice {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background-color: rgba(76, 175, 80, 0.1);
    border: 1px solid rgba(76, 175, 80, 0.3);
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
    margin-bottom: 1.5rem;
  }

  .notice-icon {
    font-size: 1.25rem;
    color: var(--food-secondary);
    flex-shrink: 0;
    margin-top: 0.125rem;
  }

  .notice-content {
    flex: 1;
  }

  .notice-content strong {
    color: var(--food-secondary);
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

  /* Loading container */
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    text-align: center;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #e5e7eb;
    border-top: 4px solid var(--food-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .loading-container p {
    color: #6b7280;
    font-size: 1.1rem;
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
