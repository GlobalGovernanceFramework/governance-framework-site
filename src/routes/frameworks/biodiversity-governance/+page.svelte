<!-- src/routes/frameworks/biodiversity-governance/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { invalidate } from '$app/navigation';
  import { base } from '$app/paths';
  import FrameworkSidebar from '$lib/components/FrameworkSidebar.svelte';
  import { onMount, tick } from 'svelte';
  import { slide } from 'svelte/transition';

  export let data;

  // Extract biodiversityGovernanceFramework translations for shorter references
  $: bdg = $t('biodiversityGovernanceFramework') || {};
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
  let governanceOpen = false;
  let implementationOpen = false;
  let resourcesOpen = false;

  // Initialize accordion states after mount
  function initializeAccordionStates() {
    // Set initial accordion states based on active section
    if (['philosophical-preamble', 'introduction-vision', 'guiding-principles', 'core-pillars'].includes(activeSection)) {
      foundationOpen = true;
    } else if (['governance-structure', 'policy-mechanisms', 'stakeholder-engagement', 'financing-mechanisms'].includes(activeSection)) {
      governanceOpen = true;
    } else if (['implementation-roadmap', 'metrics-success', 'visualizations', 'challenges-solutions', 'implementation-tools', 'reparations-protocol'].includes(activeSection)) {
      implementationOpen = true;
    } else if (isGuideActive || isAppendixActive || activeSection === 'conclusion-call-to-action') {
      resourcesOpen = true;
    } else {
      // Default state for overview
      foundationOpen = true;
    }
  }

  // Function to get section emoji
  function getSectionEmoji(section) {
    const emojiMap = {
      // Foundation sections
      'philosophical-preamble': '🌿', // Nature foundation
      'introduction-vision': '🌱', // Growth/beginning
      'guiding-principles': '🧭', // Navigation/guidance
      'core-pillars': '🏛️', // Structure/pillars
      
      // Governance sections
      'governance-structure': '🏗️', // Building governance
      'policy-mechanisms': '⚖️', // Balance/policy
      'stakeholder-engagement': '🤝', // Collaboration
      'financing-mechanisms': '💰', // Financial resources
      
      // Implementation sections
      'implementation-roadmap': '🗺️', // Roadmap/path
      'metrics-success': '📊', // Measurement/data
      'visualizations': '📈', // Charts/visuals
      'challenges-solutions': '🔧', // Problem-solving
      'implementation-tools': '🛠️', // Tools/utilities
      'reparations-protocol': '🌍', // Global justice
      
      // Specialized guides
      'technical-guide-policymakers': '📋', // Technical documents
      'community-implementation-guide': '🌱', // Community growth
      'youth-engagement-leadership-guide': '🌟', // Youth leadership
      'corporate-transition-redemption-guide': '🔄', // Transformation
      'indigenous-data-sovereignty-guide': '🦅', // Indigenous wisdom
      
      // Other sections
      'conclusion-call-to-action': '📢', // Call to action
      
      // Default fallback
      'default': '🤝' // Collaboration/partnership
    };
    
    return emojiMap[section] || emojiMap.default;
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
    return bdg.sections?.[section] || section;
  }

  // Group sections logically with multi-lingual support using short references
  function getSectionCategoryTitle(category) {
    return bdg.categories?.[category] || category;
  }

  // Function to get shortened section titles for navigation using short references
  function getShortSectionTitle(section) {
    return bdg.sectionsShort?.[section] || getSectionTitle(section);
  }

  // Function to download the framework PDF
  function downloadFramework(version = '') {
    const versionSuffix = version ? `-${version}` : '';
    const pdfUrl = `${base}/assets/pdf/biodiversity-governance${versionSuffix}-${currentLocale}.pdf`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `biodiversity-governance${versionSuffix}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Computed values - add safety checks
  $: isGuideActive = ['technical-guide-policymakers', 'community-implementation-guide', 'youth-engagement-leadership-guide', 'corporate-transition-redemption-guide', 'indigenous-data-sovereignty-guide'].includes(activeSection);
  $: isAppendixActive = activeSection.startsWith('appendix-');
  
  // Define section groups
  $: foundationSections = ['philosophical-preamble', 'introduction-vision', 'guiding-principles', 'core-pillars'];
  $: governanceSections = ['governance-structure', 'policy-mechanisms', 'stakeholder-engagement', 'financing-mechanisms'];
  $: implementationSections = ['implementation-roadmap', 'metrics-success', 'visualizations', 'challenges-solutions', 'implementation-tools', 'reparations-protocol'];
  $: guideSections = ['technical-guide-policymakers', 'community-implementation-guide', 'youth-engagement-leadership-guide', 'corporate-transition-redemption-guide', 'indigenous-data-sovereignty-guide'];
  $: appendixSections = Object.keys(data?.sections || {}).filter(section => section.startsWith('appendix-'));
  
  $: coreFrameworkSections = [...foundationSections, ...governanceSections, ...implementationSections];
  $: isCoreSection = coreFrameworkSections.includes(activeSection);

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
  <title>{bdg.meta?.title || 'Biodiversity Governance Framework - Global Governance Framework'}</title>
  <meta name="description" content="{bdg.meta?.description || 'A revolutionary blueprint for planetary healing, weaving together indigenous sovereignty, economic transformation, and cultural mobilization for our living Earth'}" />
</svelte:head>

{#if mounted}
  <div class="documentation-container">
    {#if !isPrintMode}
      <FrameworkSidebar />
    {/if}

    <div class="content">
      <!-- Quick Access Card for Biodiversity Framework -->
      {#if !isPrintMode && !isGuideActive && activeSection === 'index'}
        <div class="biodiversity-guide-card">
          <div class="card-content">
            <div class="card-icon">🌿</div>
            <div class="card-text">
              <h3>{bdg.guideCard?.title || 'New to the Biodiversity Framework?'}</h3>
              <p>{bdg.guideCard?.description || 'Start with one of our specialized guides that explain the framework for different stakeholders and contexts.'}</p>
            </div>
            <div class="card-actions">
              <button class="primary-btn" on:click={() => setActiveSection('technical-guide-policymakers')}>
                {bdg.guideCard?.buttonText || 'Choose a Guide'} <span class="arrow-icon">→</span>
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
              <span class="accordion-icon">🌱</span>
              <span class="accordion-title">{getSectionCategoryTitle('foundation')}</span>
              <span class="section-count">({foundationSections.length})</span>
              <span class="toggle-arrow" class:rotated={foundationOpen}>▼</span>
            </button>
            {#if foundationOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each foundationSections as section}
                  <button 
                    class="nav-item subsection-item" 
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                  >
                    <span class="nav-icon">{getSectionEmoji(section)}</span>
                    <span class="nav-title">{getShortSectionTitle(section)}</span>
                  </button>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Governance Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={governanceOpen}
              class:has-active={governanceSections.some(section => activeSection === section)}
              on:click={toggleGovernance}
            >
              <span class="accordion-icon">🏛️</span>
              <span class="accordion-title">{getSectionCategoryTitle('governance')}</span>
              <span class="section-count">({governanceSections.length})</span>
              <span class="toggle-arrow" class:rotated={governanceOpen}>▼</span>
            </button>
            {#if governanceOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each governanceSections as section}
                  <button 
                    class="nav-item subsection-item" 
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                  >
                    <span class="nav-icon">{getSectionEmoji(section)}</span>
                    <span class="nav-title">{getShortSectionTitle(section)}</span>
                  </button>
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
                  <button 
                    class="nav-item subsection-item" 
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                  >
                    <span class="nav-icon">{getSectionEmoji(section)}</span>
                    <span class="nav-title">{getShortSectionTitle(section)}</span>
                  </button>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Resources Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={resourcesOpen}
              class:has-active={isGuideActive || isAppendixActive || activeSection === 'conclusion-call-to-action'}
              on:click={toggleResources}
            >
              <span class="accordion-icon">📄</span>
              <span class="accordion-title">{getSectionCategoryTitle('resources')}</span>
              <span class="section-count">({guideSections.length + appendixSections.length + 1})</span>
              <span class="toggle-arrow" class:rotated={resourcesOpen}>▼</span>
            </button>
            {#if resourcesOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                <!-- Conclusion -->
                <button 
                  class="nav-item subsection-item" 
                  class:active={activeSection === 'conclusion-call-to-action'}
                  on:click={() => setActiveSection('conclusion-call-to-action')}
                >
                  <span class="nav-icon">{getSectionEmoji('conclusion-call-to-action')}</span>
                  <span class="nav-title">{getSectionTitle('conclusion-call-to-action')}</span>
                </button>
                <!-- Guides -->
                {#each guideSections as section}
                  <button 
                    class="nav-item subsection-item" 
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                  >
                    <span class="nav-icon">{getSectionEmoji(section)}</span>
                    <span class="nav-title">{getShortSectionTitle(section)}</span>
                  </button>
                {/each}
                <!-- Appendices -->
                {#each appendixSections as section}
                  <button 
                    class="nav-item subsection-item" 
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                  >
                    <span class="nav-icon">📚</span>
                    <span class="nav-title">{getSectionTitle(section)}</span>
                  </button>
                {/each}
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
          <span class="progress-text">{bdg.progress?.text?.replace('{current}', coreFrameworkSections.indexOf(activeSection) + 1).replace('{total}', coreFrameworkSections.length) || `Section ${coreFrameworkSections.indexOf(activeSection) + 1} of ${coreFrameworkSections.length}`}</span>
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
                  <strong>{bdg.languageFallback?.title || 'Content in your language coming soon'}</strong>
                  <p>{bdg.languageFallback?.description || 'This section is currently displayed in English until translation is complete.'}</p>
                </div>
              </div>
            {/if}
            
            <!-- Render sections from markdown files -->
            <svelte:component this={data.sections[section].default} t={translationFunction} />
            
            <!-- Navigation buttons at bottom of guides -->
            {#if isGuideActive && !isPrintMode}
              <div class="guide-navigation">
                <button class="secondary-btn" on:click={() => downloadFramework(section.replace('-guide', '').replace('policymakers', 'policy'))}>
                  {bdg.navigation?.downloadPdf || 'Download PDF Version'} <span class="download-icon">↓</span>
                </button>
                <button class="primary-btn" on:click={() => setActiveSection('index')}>
                  {bdg.navigation?.continueToFramework || 'Continue to Full Framework'} <span class="arrow-icon">→</span>
                </button>
              </div>
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
                    ← {bdg.navigation?.previousSection || 'Previous Section'}
                  </button>
                {/if}
                
                {#if coreFrameworkSections.indexOf(activeSection) < coreFrameworkSections.length - 1}
                  <button class="nav-btn next-btn" on:click={() => {
                    const currentIndex = coreFrameworkSections.indexOf(activeSection);
                    const nextSection = coreFrameworkSections[currentIndex + 1];
                    setActiveSection(nextSection);
                  }}>
                    {bdg.navigation?.nextSection || 'Next Section'} →
                  </button>
                {/if}
              </div>
            {/if}
          </div>
        {:else}
          <div class="missing-section">
            <h2>{bdg.errors?.sectionNotFound?.replace('{section}', section) || `Section "${section}" not found`}</h2>
            <p>{bdg.errors?.contentInDevelopment || 'This content is still being developed.'}</p>
          </div>
        {/if}
      {/each}
    </div>
  </div>
{:else}
  <!-- Loading state to prevent hydration issues -->
  <div class="loading-container">
    <div class="loading-spinner"></div>
    <p>{bdg.loading?.text || 'Loading framework content...'}</p>
  </div>
{/if}

<style>
  /* Biodiversity Framework color scheme - forest greens and earth tones */
  :root {
    --bio-primary: #2d5016; /* Deep Forest Green */
    --bio-secondary: #4a7c29; /* Forest Green */
    --bio-accent: #6b8e3d; /* Sage Green */
    --bio-light: #a8c573; /* Light Green */
    --bio-earth: #8b6f47; /* Earth Brown */
    --bio-highlight: #c7a876; /* Golden Sage */
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
    background-color: rgba(74, 124, 41, 0.05);
  }

  .accordion-header.has-active {
    background-color: rgba(45, 80, 22, 0.1);
    color: var(--bio-primary);
    font-weight: 600;
  }

  .accordion-header.open {
    background-color: rgba(74, 124, 41, 0.1);
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
    background-color: rgba(74, 124, 41, 0.05);
    color: #374151;
  }

  .nav-item.active {
    background-color: var(--bio-primary);
    color: white;
    font-weight: 600;
  }

  .nav-item.active:hover {
    background-color: var(--bio-secondary);
  }

  .overview-item {
    background: linear-gradient(135deg, rgba(45, 80, 22, 0.1), rgba(74, 124, 41, 0.1));
    border: 1px solid rgba(45, 80, 22, 0.2);
    border-radius: 0.375rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .overview-item.active {
    background: var(--bio-primary);
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
    background-color: rgba(45, 80, 22, 0.1);
    color: var(--bio-primary);
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

  /* Progress indicator */
  .progress-indicator {
    margin-bottom: 2rem;
    padding: 1rem;
    background: linear-gradient(90deg, rgba(45, 80, 22, 0.1), rgba(74, 124, 41, 0.1));
    border-radius: 0.5rem;
    border-left: 4px solid var(--bio-primary);
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
    background: linear-gradient(90deg, var(--bio-primary), var(--bio-secondary));
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 0.875rem;
    color: var(--bio-primary);
    font-weight: 500;
  }
  
  .section-content {
    padding-top: 1rem;
    scroll-margin-top: 2rem;
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
    color: var(--bio-primary);
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--bio-secondary);
  }
  
  .content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--bio-accent);
  }

  /* Styling for h4 headers (#### in Markdown) */
  :global(h4) {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--bio-accent);
  }

  /* Styling for the inset box (blockquote) */
  :global(blockquote) {
    background-color: rgba(168, 197, 115, 0.1);
    border-left: 4px solid var(--bio-earth);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
  }

  :global(blockquote > p:first-child strong) {
    font-size: 1.1rem;
    color: var(--bio-earth);
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
    color: var(--bio-secondary);
    text-decoration: underline;
    font-weight: 500;
  }

  :global(blockquote a:hover) {
    color: var(--bio-primary);
  }
  
  .content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #4b5563;
  }
  
  /* Lists with biodiversity-themed bullets */
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

  /* Apply nature symbols to all ul li EXCEPT those in section-nav */
  .content :global(ul li:not(.section-nav li))::before {
    content: "🌱";
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
    color: var(--bio-secondary);
    font-weight: 600;
  }

  /* Nested lists */
  .content :global(ul ul), .content :global(ol ul) {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .content :global(ul ul li::before) {
    content: "🍃";
    color: var(--bio-light);
  }

  /* Table styles for biodiversity framework */
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
    background: linear-gradient(to right, var(--bio-primary), var(--bio-secondary));
  }

  :global(.content th) {
    padding: 0.75rem 1rem;
    font-weight: 600;
    text-align: left;
    color: #ffffff;
    border: none;
    border-bottom: 2px solid var(--bio-primary);
  }

  :global(.content td) {
    padding: 0.75rem 1rem;
    border: 1px solid #e5e7eb;
    border-left: none;
    border-right: none;
    vertical-align: top;
  }

  :global(.content tr:nth-child(odd)) {
    background-color: rgba(168, 197, 115, 0.05);
  }

  :global(.content tr:nth-child(even)) {
    background-color: #ffffff;
  }

  :global(.content tr:hover) {
    background-color: rgba(168, 197, 115, 0.1);
  }

  :global(.content tbody tr:last-child td) {
    border-bottom: none;
  }
  
  /* Biodiversity guide card */
  .biodiversity-guide-card {
    background: linear-gradient(135deg, rgba(168, 197, 115, 0.1) 0%, rgba(107, 142, 61, 0.1) 100%);
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(45, 80, 22, 0.1);
    border: 1px solid rgba(45, 80, 22, 0.2);
    overflow: visible !important;
    position: relative;
    z-index: 1;
  }

  .biodiversity-guide-card .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1001;
    min-width: 300px;
    max-width: 350px;
    overflow: hidden;
    border: 1px solid rgba(45, 80, 22, 0.3);
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
    color: var(--bio-primary);
    flex-shrink: 0;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h3 {
    margin: 0 0 0.5rem 0;
    color: var(--bio-primary);
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
    background-color: var(--bio-primary);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: var(--bio-secondary);
    transform: translateY(-1px);
  }
  
  .secondary-btn {
    background-color: white;
    color: var(--bio-primary);
    border: 1px solid var(--bio-primary);
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .secondary-btn:hover {
    background-color: rgba(168, 197, 115, 0.1);
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
    color: var(--bio-secondary);
    text-decoration: underline;
    font-weight: 500;
    transition: all 0.2s;
  }

  .content :global(a:hover) {
    color: var(--bio-primary);
    text-decoration: underline;
  }

  .content :global(a:active) {
    color: var(--bio-primary);
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
    color: var(--bio-accent);
    text-decoration: none;
    border-bottom: 1px dotted var(--bio-accent);
  }

  .content :global(a[href^="#"]):hover {
    color: var(--bio-secondary);
    border-bottom-color: var(--bio-secondary);
  }

  /* Make sure links in tables are readable against the background */
  .content :global(table a) {
    color: var(--bio-secondary);
    font-weight: 600;
  }

  /* Links in the section navigation */
  .section-nav a {
    color: #4b5563;
    text-decoration: none;
    transition: color 0.2s;
  }

  .section-nav a:hover {
    color: var(--bio-primary);
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
    background-color: var(--bio-primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .nav-btn:hover {
    background-color: var(--bio-secondary);
    transform: translateY(-1px);
  }

  .prev-btn {
    margin-right: auto;
  }

  .next-btn {
    margin-left: auto;
  }
  
  /* Dropdown styles for guides */
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
    background-color: rgba(168, 197, 115, 0.1);
  }
  
  .guide-icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    margin-bottom: 0;
  }
  
  .guide-title {
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  .guide-desc {
    font-size: 0.75rem;
    color: #6b7280;
  }
  
  .guide-info {
    display: flex;
    flex-direction: column;
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

  /* Biodiversity Framework specific theme elements */

  /* Special callouts for biodiversity concepts */
  .content :global(.indigenous-callout) {
    background-color: rgba(139, 111, 71, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--bio-earth);
  }

  .content :global(.ecosystem-callout) {
    background-color: rgba(45, 80, 22, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--bio-primary);
  }

  .content :global(.cultural-callout) {
    background-color: rgba(199, 168, 118, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--bio-highlight);
  }

  /* Special styling for case studies */
  .content :global(.case-study) {
    background-color: rgba(107, 142, 61, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--bio-accent);
  }

  .content :global(.case-study-title) {
    color: var(--bio-accent);
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

  /* Highlight boxes for important concepts */
  .content :global(.concept-highlight) {
    background-color: rgba(168, 197, 115, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(168, 197, 115, 0.3);
  }

  .content :global(.concept-highlight-title) {
    color: var(--bio-secondary);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(168, 197, 115, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Rights recognition styling */
  .content :global(.rights-highlight) {
    background-color: rgba(74, 124, 41, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(74, 124, 41, 0.3);
  }

  .content :global(.rights-highlight-title) {
    color: var(--bio-secondary);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(74, 124, 41, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Economic transformation styling */
  .content :global(.economic-highlight) {
    background-color: rgba(199, 168, 118, 0.1);
    border-radius: 0.5rem;
    padding: 1.25rem;
    margin: 1.5rem 0;
    border: 1px solid rgba(199, 168, 118, 0.3);
  }

  .content :global(.economic-highlight-title) {
    color: var(--bio-highlight);
    font-weight: 600;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(199, 168, 118, 0.3);
    padding-bottom: 0.5rem;
  }

  /* Language fallback notice */
   .language-fallback-notice {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background-color: rgba(45, 80, 22, 0.1);
    border: 1px solid rgba(45, 80, 22, 0.3);
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
    margin-bottom: 1.5rem;
  }

  .notice-icon {
    font-size: 1.25rem;
    color: var(--bio-primary);
    flex-shrink: 0;
    margin-top: 0.125rem;
  }

  .notice-content {
    flex: 1;
  }

  .notice-content strong {
    color: var(--bio-primary);
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
