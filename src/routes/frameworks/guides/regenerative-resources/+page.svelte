<!-- src/routes/frameworks/guides/regenerative-resources/+page.svelte -->
<script>
  import { t, locale, isLocaleLoaded, loadTranslations } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { invalidate } from '$app/navigation';
  import { base } from '$app/paths';
  import { onMount, tick } from 'svelte';
  import { slide } from 'svelte/transition';

  export let data;

  // Translation state - use isLocaleLoaded for better reactivity
  $: translationsReady = $isLocaleLoaded;
  $: rg = translationsReady ? ($t('regenerativeResourcesGuide') || {}) : {};
  $: currentLocale = $locale;

  // Component state
  let activeSection = 'introduction';
  let mounted = false;
  let isPrintMode = false;
  let principlesOpen = false;
  let pillarsOpen = false;
  let synthesisOpen = false;

  // Computed values - add safety checks
  $: sectionsToShow = (mounted && isPrintMode) ? Object.keys(data?.sections || {}) : [activeSection];
  $: pillarSections = ['pillar-1', 'pillar-2', 'pillar-3', 'pillar-4', 'pillar-5'];
  $: principlesSections = ['core-principle'];
  $: synthesisSections = ['unified-workflow', 'conclusion'];
  $: isPillarSection = pillarSections.includes(activeSection);
  $: isPrincipleSection = principlesSections.includes(activeSection);
  $: isSynthesisSection = synthesisSections.includes(activeSection);

  function initializeAccordionStates() {
    // Set initial accordion states based on active section
    principlesOpen = principlesSections.includes(activeSection);
    pillarsOpen = pillarSections.includes(activeSection);
    synthesisOpen = synthesisSections.includes(activeSection);
  }

  onMount(async () => {
    await tick();
    mounted = true;
    
    if (browser) {
      // Fix URL corruption and preserve hash fragments
      let extractedHash = window.location.hash;
      
      if (window.location.pathname !== '/frameworks/guides/regenerative-resources') {
        const pathname = window.location.pathname;
        const lastPart = pathname.split('/').pop();
        
        // Extract section from corrupted pathname
        if (data?.sections?.[lastPart] && !extractedHash) {
          extractedHash = `#${lastPart}`;
        }
        
        // Correct the URL
        const correctUrl = `/frameworks/guides/regenerative-resources${window.location.search}${extractedHash}`;
        window.history.replaceState(null, '', correctUrl);
      }
      
      // Force reload translations if needed
      if (!translationsReady) {
        try {
          await loadTranslations($locale, '/frameworks/guides/regenerative-resources');
        } catch (e) {
          console.error('Failed to reload translations:', e);
        }
      }
      
      // Set initial section from URL
      const urlParams = new URLSearchParams(window.location.search);
      isPrintMode = urlParams.get('print') === 'true';
      
      const sectionParam = urlParams.get('section');
      const hashSection = (extractedHash || window.location.hash).substring(1);
      
      if (sectionParam && data?.sections?.[sectionParam]) {
        activeSection = sectionParam;
      } else if (hashSection && data?.sections?.[hashSection]) {
        activeSection = hashSection;
      }
      
      initializeAccordionStates();
      
      // Global function for PDF generation
      window.showAllSectionsForPrint = () => { isPrintMode = true; };
      
      // Listen for hash changes
      const handleHashChange = () => {
        const hash = window.location.hash.substring(1);
        if (hash && data?.sections?.[hash] && activeSection !== hash) {
          activeSection = hash;
          initializeAccordionStates();
          
          // Scroll to content
          setTimeout(() => {
            const contentElement = document.querySelector('.section-content');
            if (contentElement) {
              contentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }, 100);
        }
      };

      window.addEventListener('hashchange', handleHashChange);
      
      // Cleanup
      return () => {
        window.removeEventListener('hashchange', handleHashChange);
        if (window.showAllSectionsForPrint) {
          delete window.showAllSectionsForPrint;
        }
      };
    }
  });

  // Function to set active section
  function setActiveSection(section) {
    if (!data?.sections?.[section]) return;
    
    activeSection = section;
    initializeAccordionStates();
    
    if (browser) {
      const newUrl = `/frameworks/guides/regenerative-resources${window.location.search}#${section}`;
      history.replaceState(null, '', newUrl);

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

  // Translation helper functions with fallbacks
  function getSectionTitle(section) {
    return translationsReady ? (rg.sections?.[section] || section.replace(/[-_]/g, ' ')) 
                             : section.replace(/[-_]/g, ' ');
  }

  function getSectionCategoryTitle(category) {
    return translationsReady ? (rg.categories?.[category] || category) : category;
  }

  function getShortSectionTitle(section) {
    return translationsReady ? (rg.sectionsShort?.[section] || getSectionTitle(section)) : getSectionTitle(section);
  }

  function getTextWithFallback(key, fallback) {
    return translationsReady ? ($t(key) || fallback) : fallback;
  }

  function downloadGuideWithFallback(guideId = 'regenerative-resources', version = 'v1.0') {
    const currentLocale = $locale || 'en';
    
    // Try current locale first
    const localizedUrl = `${base}/downloads/${currentLocale}/ggf-guide-${guideId}-${version}.pdf`;
    
    // Check if localized version exists, fallback to English if not
    checkFileExists(localizedUrl)
      .then(exists => {
        if (exists) {
          downloadFile(localizedUrl, `ggf-guide-${guideId}-${version}-${currentLocale}.pdf`);
        } else {
          console.warn(`Localized PDF not found for ${currentLocale}, falling back to English`);
          const fallbackUrl = `${base}/downloads/en/ggf-guide-${guideId}-${version}.pdf`;
          downloadFile(fallbackUrl, `ggf-guide-${guideId}-${version}-en.pdf`);
        }
      })
      .catch(() => {
        // If check fails, try fallback directly
        const fallbackUrl = `${base}/downloads/en/ggf-guide-${guideId}-${version}.pdf`;
        downloadFile(fallbackUrl, `ggf-guide-${guideId}-${version}-en.pdf`);
      });
  }

  // Helper function to check if file exists
  async function checkFileExists(url) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }

  // Helper function to download file
  function downloadFile(url, filename) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Accordion toggle functions
  function togglePrinciples() { principlesOpen = !principlesOpen; }
  function togglePillars() { pillarsOpen = !pillarsOpen; }
  function toggleSynthesis() { synthesisOpen = !synthesisOpen; }

  // Handle locale changes
  $: if (browser && mounted && $locale) {
    invalidate('app:locale');
  }
</script>

<svelte:head>
  <title>{getTextWithFallback('regenerativeResourcesGuide.meta.title', 'Regenerative Resource Stewardship Guide - Global Governance Framework')}</title>
  <meta name="description" content="{getTextWithFallback('regenerativeResourcesGuide.meta.description', 'A comprehensive implementation guide for governing mineral and resource stewardship using GGF frameworks')}" />
</svelte:head>

{#if mounted}
  <div class="breadcrumb-nav">
    <a href="/frameworks/guides" class="breadcrumb-link">
      <span class="breadcrumb-icon">←</span>
      <span class="breadcrumb-text">{rg.navigation?.backToGuides || 'Back to Implementation Guides'}</span>
    </a>
  </div>

  <div class="documentation-container">
    <div class="sidebar">
      {#if !isPrintMode} 
        <div class="section-nav">
          <!-- Overview -->
          <div class="nav-section">
            <button 
              class="nav-item overview-item" 
              class:active={activeSection === 'introduction'}
              on:click={() => setActiveSection('introduction')}
            >
              <span class="nav-icon">🏠</span>
              <span class="nav-title">{getSectionCategoryTitle('introduction')}</span>
            </button>
            
            <button 
              class="nav-item overview-item" 
              class:active={activeSection === 'table-of-contents'}
              on:click={() => setActiveSection('table-of-contents')}
            >
              <span class="nav-icon">📋</span>
              <span class="nav-title">{getSectionCategoryTitle('tableOfContents')}</span>
            </button>
          </div>

         <!-- Core Principles Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={principlesOpen}
              class:has-active={isPrincipleSection}
              on:click={togglePrinciples}
            >
              <span class="accordion-icon">🎯</span>
              <span class="accordion-title">{getSectionCategoryTitle('principles')}</span>
              <span class="section-count">(1)</span>
              <span class="toggle-arrow" class:rotated={principlesOpen}>▼</span>
            </button>
            {#if principlesOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each principlesSections as section}
                  {#if data?.sections?.[section]}
                    <button 
                      class="nav-item subsection-item" 
                      class:active={activeSection === section}
                      on:click={() => setActiveSection(section)}
                    >
                      <span class="nav-icon">🌿</span>
                      <span class="nav-title">{getSectionTitle(section)}</span>
                    </button>
                  {/if}
                {/each}
              </div>
            {/if}
          </div>

          <!-- Five Pillars Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={pillarsOpen}
              class:has-active={isPillarSection}
              on:click={togglePillars}
            >
              <span class="accordion-icon">🏛️</span>
              <span class="accordion-title">{getSectionCategoryTitle('pillars')}</span>
              <span class="section-count">(5)</span>
              <span class="toggle-arrow" class:rotated={pillarsOpen}>▼</span>
            </button>
            {#if pillarsOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each pillarSections as section}
                  {#if data?.sections?.[section]}
                    <button 
                      class="nav-item subsection-item" 
                      class:active={activeSection === section}
                      on:click={() => setActiveSection(section)}
                    >
                      <span class="nav-icon">
                        {#if section === 'pillar-1'}🪶
                        {:else if section === 'pillar-2'}♻️
                        {:else if section === 'pillar-3'}🤝
                        {:else if section === 'pillar-4'}⚖️
                        {:else if section === 'pillar-5'}🔗
                        {:else}🏛️{/if}
                      </span>
                      <span class="nav-title">{getShortSectionTitle(section)}</span>
                    </button>
                  {/if}
                {/each}
              </div>
            {/if}
          </div>

          <!-- Synthesis Accordion -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={synthesisOpen}
              class:has-active={isSynthesisSection}
              on:click={toggleSynthesis}
            >
              <span class="accordion-icon">🔄</span>
              <span class="accordion-title">{getSectionCategoryTitle('synthesis')}</span>
              <span class="section-count">(2)</span>
              <span class="toggle-arrow" class:rotated={synthesisOpen}>▼</span>
            </button>
            {#if synthesisOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each synthesisSections as section}
                  {#if data?.sections?.[section]}
                    <button 
                      class="nav-item subsection-item" 
                      class:active={activeSection === section}
                      on:click={() => setActiveSection(section)}
                    >
                      <span class="nav-icon">
                        {#if section === 'unified-workflow'}🔄
                        {:else if section === 'conclusion'}🎯
                        {:else}📄{/if}
                      </span>
                      <span class="nav-title">{getSectionTitle(section)}</span>
                    </button>
                  {/if}
                {/each}
              </div>
            {/if}
          </div>
          <!-- Download PDF Button -->
          <div class="download-section">
             <button class="download-btn" on:click={() => downloadGuideWithFallback('regenerative-resources', 'v1.0')}>
               <span class="download-icon">📥</span>
               <span class="download-text">{rg.navigation?.downloadPdf || 'Download Complete Guide (PDF)'}</span>
             </button>
          </div>
        </div>
      {/if}
    </div>

    <div class="content">
      <!-- Progress indicator for pillar sections -->
      {#if !isPrintMode && isPillarSection && pillarSections.length > 0 && translationsReady}
        <div class="progress-indicator">
          <div class="progress-bar">
            <div class="progress-fill" style="width: {((pillarSections.indexOf(activeSection) + 1) / pillarSections.length * 100)}%"></div>
          </div>
          <span class="progress-text">{rg.progress?.text?.replace('{current}', pillarSections.indexOf(activeSection) + 1).replace('{total}', pillarSections.length) || `Pillar ${pillarSections.indexOf(activeSection) + 1} of ${pillarSections.length}`}</span>
        </div>
      {/if}

      <!-- Show active section, or all sections in print mode -->
      {#each sectionsToShow as section (section)}
        {#if data?.sections?.[section]}
          <div class="section-content" id={section}>
            <!-- Language fallback notice -->
            {#if !isPrintMode && data.sectionsUsingEnglishFallback?.includes(section) && section !== 'introduction' && translationsReady}
              <div class="language-fallback-notice">
                <div class="notice-icon">🌐</div>
                <div class="notice-content">
                  <strong>{rg.languageFallback?.title || 'Content in your language coming soon'}</strong>
                  <p>{rg.languageFallback?.description || 'This section is currently displayed in English until translation is complete.'}</p>
                </div>
              </div>
            {/if}
            
            <!-- Render sections from markdown files -->
            <svelte:component this={data.sections[section].default} t={$t} />
            
            <!-- Section navigation at bottom of pillar sections -->
            {#if isPillarSection && !isPrintMode && pillarSections.length > 0 && translationsReady}
              <div class="section-navigation">
                {#if pillarSections.indexOf(activeSection) > 0}
                  <button class="nav-btn prev-btn" on:click={() => {
                    const currentIndex = pillarSections.indexOf(activeSection);
                    const prevSection = pillarSections[currentIndex - 1];
                    setActiveSection(prevSection);
                  }}>
                    ← {rg.navigation?.previousPillar || 'Previous Pillar'}
                  </button>
                {/if}
                
                {#if pillarSections.indexOf(activeSection) < pillarSections.length - 1}
                  <button class="nav-btn next-btn" on:click={() => {
                    const currentIndex = pillarSections.indexOf(activeSection);
                    const nextSection = pillarSections[currentIndex + 1];
                    setActiveSection(nextSection);
                  }}>
                    {rg.navigation?.nextPillar || 'Next Pillar'} →
                  </button>
                {:else}
                  <!-- After last pillar, go to synthesis -->
                  <button class="nav-btn next-btn synthesis-btn" on:click={() => setActiveSection('unified-workflow')}>
                    {rg.navigation?.toSynthesis || 'Continue to Synthesis'} →
                  </button>
                {/if}
              </div>
            {/if}
          </div>
        {:else}
          <div class="missing-section">
            <h2>{getTextWithFallback('regenerativeResourcesGuide.errors.sectionNotFound', `Section "${section}" not found`).replace('{section}', section)}</h2>
            <p>{getTextWithFallback('regenerativeResourcesGuide.errors.contentInDevelopment', 'This content is still being developed.')}</p>
          </div>
        {/if}
      {/each}
    </div>
  </div>
{:else}
  <!-- Loading state to prevent hydration issues -->
  <div class="loading-container">
    <div class="loading-spinner"></div>
    <p>{getTextWithFallback('regenerativeResourcesGuide.loading.text', 'Loading guide content...')}</p>
  </div>
{/if}

<style>
  /* Regenerative Resources Guide color scheme - earthy/mineral theme */
  :root {
    --guide-primary: #2D5016;      /* Deep forest green */
    --guide-secondary: #8B4513;    /* Saddle brown - earth/mineral */
    --guide-accent: #CD853F;       /* Peru - warm earth tone */
    --guide-success: #6B8E23;      /* Olive drab - natural green */
    --guide-warning: #DAA520;      /* Goldenrod - mineral yellow */
    --guide-danger: #A0522D;       /* Sienna - earth red */
    --guide-light: #F5F5DC;        /* Beige - natural light */
    --guide-dark: #1A1A0F;         /* Very dark green */
    --guide-wisdom: #8FBC8F;       /* Dark sea green */
  }

  /* Loading state */
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    gap: 1rem;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #e5e7eb;
    border-top: 4px solid var(--guide-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .breadcrumb-nav {
    margin-bottom: 1.5rem;
    padding: 0.75rem 0;
  }

  /* Breadcrumb */
  .breadcrumb-nav {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 1rem 0 1rem;
  }

  .breadcrumb-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--guide-secondary);
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s;
    padding: 0.5rem 0;
  }

  .breadcrumb-link:hover {
    color: var(--guide-primary);
    transform: translateX(-2px);
  }

  .breadcrumb-icon {
    font-size: 1rem;
  }

  .breadcrumb-text {
    font-size: 0.95rem;
  }

  /* Layout */
  .documentation-container {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
    min-height: calc(100vh - 200px);
  }

  /* Sidebar - sticky navigation */
  .sidebar {
    position: sticky;
    top: 2rem;
    height: fit-content;
    max-height: calc(100vh - 4rem);
    overflow-y: auto;
  }
  
  /* Content area */
  .content {
    min-width: 0;
    padding: 0;
  }
  
  .section-content {
    padding-top: 1rem;
    scroll-margin-top: 2rem;
  }

  .missing-section {
    background-color: #f3f4f6;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    padding: 2rem;
    text-align: center;
    color: #6b7280;
  }

  .missing-section h2 {
    color: #374151;
    margin-bottom: 0.5rem;
  }

  /* Section Navigation */
  .section-nav {
    background: linear-gradient(to bottom, var(--guide-light), #f0f0e8);
    border-radius: 0.75rem;
    padding: 1.25rem;
    border: 1px solid rgba(45, 80, 22, 0.15);
    box-shadow: 0 2px 8px rgba(45, 80, 22, 0.1);
  }

  .nav-section {
    margin-bottom: 1rem;
  }

  .download-section {
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: linear-gradient(135deg, rgba(139, 69, 19, 0.1), rgba(45, 80, 22, 0.1));
    border-radius: 0.5rem;
    border: 1px solid rgba(139, 69, 19, 0.2);
  }

  .download-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, var(--guide-secondary), var(--guide-accent));
    color: white;
    border: none;
    border-radius: 0.375rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.95rem;
  }

  .download-btn:hover {
    background: linear-gradient(135deg, var(--guide-primary), var(--guide-secondary));
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(139, 69, 19, 0.3);
  }

  .download-btn:focus-visible {
    outline: 2px solid var(--guide-accent);
    outline-offset: 2px;
    background: linear-gradient(135deg, var(--guide-primary), var(--guide-secondary));
    transform: translateY(-1px);
  }

  .download-icon {
    font-size: 1.1rem;
  }

  .download-text {
    flex-grow: 1;
  }

  .nav-accordion {
    margin-bottom: 1rem;
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
    background-color: rgba(139, 69, 19, 0.05);
  }

  .accordion-header:focus-visible {
    outline: 2px solid var(--guide-accent);
    outline-offset: 2px;
    background-color: rgba(139, 69, 19, 0.1);
  }

  .accordion-header.has-active {
    background-color: rgba(45, 80, 22, 0.1);
    color: var(--guide-primary);
    font-weight: 600;
  }

  .accordion-header.open {
    background-color: rgba(139, 69, 19, 0.1);
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
    margin-bottom: 0.25rem;
  }

  .nav-item:last-child {
    margin-bottom: 0;
  }

  .nav-item:hover {
    background-color: rgba(139, 69, 19, 0.05);
    color: #374151;
  }

  .nav-item:focus-visible {
    outline: 2px solid var(--guide-accent);
    outline-offset: 2px;
    background-color: rgba(139, 69, 19, 0.1);
  }

  .nav-item.active {
    background-color: var(--guide-primary);
    color: white;
    font-weight: 600;
  }

  .nav-item.active:hover {
    background-color: var(--guide-secondary);
  }

  .overview-item {
    background: linear-gradient(135deg, rgba(45, 80, 22, 0.1), rgba(139, 69, 19, 0.1));
    border: 1px solid rgba(45, 80, 22, 0.2);
    border-radius: 0.375rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .overview-item.active {
    background: var(--guide-primary);
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

  /* Progress indicator */
  .progress-indicator {
    margin-bottom: 2rem;
    padding: 1rem;
    background: linear-gradient(90deg, rgba(45, 80, 22, 0.1), rgba(139, 69, 19, 0.1));
    border-radius: 0.5rem;
    border-left: 4px solid var(--guide-primary);
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
    background: linear-gradient(90deg, var(--guide-primary), var(--guide-secondary));
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 0.875rem;
    color: var(--guide-primary);
    font-weight: 500;
  }

  /* Guide card */
  .guide-card {
    background: linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(45, 80, 22, 0.1) 100%);
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(45, 80, 22, 0.1);
    border: 1px solid rgba(45, 80, 22, 0.2);
    position: relative;
    z-index: 1;
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
    color: var(--guide-primary);
    flex-shrink: 0;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h3 {
    margin: 0 0 0.5rem 0;
    color: var(--guide-primary);
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
    background: linear-gradient(135deg, var(--guide-primary), var(--guide-secondary));
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background: linear-gradient(135deg, var(--guide-secondary), var(--guide-accent));
    transform: translateY(-1px);
  }

  .primary-btn:focus-visible {
    outline: 2px solid var(--guide-accent);
    outline-offset: 2px;
    background: linear-gradient(135deg, var(--guide-secondary), var(--guide-accent));
    transform: translateY(-1px);
  }
  
  .section-navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
  }

  .nav-btn {
    background-color: var(--guide-primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .nav-btn:hover {
    background-color: var(--guide-secondary);
    transform: translateY(-1px);
  }

  .nav-btn:focus-visible {
    outline: 2px solid var(--guide-accent);
    outline-offset: 2px;
    background-color: var(--guide-secondary);
    transform: translateY(-1px);
  }

  .prev-btn {
    margin-right: auto;
  }

  .next-btn {
    margin-left: auto;
  }

  .synthesis-btn {
    background: linear-gradient(135deg, var(--guide-accent), var(--guide-warning));
    font-weight: 600;
  }

  .synthesis-btn:hover {
    background: linear-gradient(135deg, var(--guide-warning), var(--guide-accent));
  }

  .download-icon {
    display: inline-block;
    margin-left: 0.25rem;
  }

  /* Language fallback notice */
  .language-fallback-notice {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background-color: rgba(139, 69, 19, 0.1);
    border: 1px solid rgba(139, 69, 19, 0.3);
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
    margin-bottom: 1.5rem;
  }

  .notice-icon {
    font-size: 1.25rem;
    color: var(--guide-secondary);
    flex-shrink: 0;
    margin-top: 0.125rem;
  }

  .notice-content {
    flex: 1;
  }

  .notice-content strong {
    color: var(--guide-secondary);
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

  /* Content styling */
  .content :global(h1) {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--guide-primary);
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--guide-secondary);
  }
  
  .content :global(h3),
  .content :global(h4) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--guide-accent);
  }

  .content :global(h4) {
    font-size: 1.2rem;
  }
  
  .content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #4b5563;
  }

  /* Blockquotes */
  .content :global(blockquote) {
    background-color: rgba(139, 69, 19, 0.1);
    border-left: 4px solid var(--guide-secondary);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
  }

  /* Lists */
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

  .content :global(ul li:not(.section-nav li))::before {
    content: "⛏️";
    position: absolute;
    left: 0;
    top: 0.1em;
    font-size: 1rem;
    color: var(--guide-secondary);
  }

  /* Ordered lists */
  .content :global(ol) {
    list-style-type: decimal;
    counter-reset: item;
  }

  .content :global(ol li) {
    position: relative;
    margin-bottom: 0.75rem;
    padding-left: 0.5rem;
    color: #4b5563;
  }

  .content :global(ol li::marker) {
    color: var(--guide-secondary);
    font-weight: 600;
  }

  /* Links */
  .content :global(a) {
    color: var(--guide-secondary);
    text-decoration: underline;
    font-weight: 500;
    transition: all 0.2s;
  }

  .content :global(a:hover) {
    color: var(--guide-primary);
  }

  /* Responsive adjustments */
  @media (max-width: 1024px) {
    .documentation-container {
      grid-template-columns: 260px 1fr;
      gap: 1.5rem;
    }
  }

  /* Responsive Design */
  @media (max-width: 768px) {

    .breadcrumb-nav {
      padding: 1rem;
    }
    
    .documentation-container {
      grid-template-columns: 1fr;
      gap: 1rem;
      padding: 0.5rem;
    }
    
    .sidebar {
      position: static;
      max-height: none;
    }

    .section-nav {
      margin-bottom: 1rem;
      padding: 1rem;
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
   
    .section-navigation {
      flex-direction: column;
      gap: 1rem;
    }

    .section-navigation button {
      width: 100%;
    }

    .download-section {
      padding: 0.75rem;
    }

    .download-btn {
      font-size: 0.9rem;
      padding: 0.75rem 1rem;
    }

    .loading-container {
      padding: 2rem 1rem;
    }
  }
</style>
