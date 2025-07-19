<!-- src/routes/frameworks/guides/great-transition/+page.svelte -->
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
  $: gt = translationsReady ? ($t('greatTransitionGuide') || {}) : {};
  $: currentLocale = $locale;

  // Component state
  let activeSection = 'introduction';
  let mounted = false;
  let isPrintMode = false;
  let partOneOpen = false;
  let partTwoOpen = false;
  let partThreeOpen = false;

  // Computed values - add safety checks
  $: sectionsToShow = (mounted && isPrintMode) ? Object.keys(data?.sections || {}) : [activeSection];
  $: partOneSections = ['sunsetting', 'healing'];
  $: partTwoSections = ['empowering', 'building'];
  $: partThreeSections = ['case-study', 'conclusion'];
  $: isPartOneSection = partOneSections.includes(activeSection);
  $: isPartTwoSection = partTwoSections.includes(activeSection);
  $: isPartThreeSection = partThreeSections.includes(activeSection);

  function initializeAccordionStates() {
    // Set initial accordion states based on active section
    partOneOpen = partOneSections.includes(activeSection);
    partTwoOpen = partTwoSections.includes(activeSection);
    partThreeOpen = partThreeSections.includes(activeSection);
  }

  onMount(async () => {
    await tick();
    mounted = true;
    
    if (browser) {
      // Fix URL corruption and preserve hash fragments
      let extractedHash = window.location.hash;
      
      if (window.location.pathname !== '/frameworks/guides/great-transition') {
        const pathname = window.location.pathname;
        const lastPart = pathname.split('/').pop();
        
        // Extract section from corrupted pathname
        if (data?.sections?.[lastPart] && !extractedHash) {
          extractedHash = `#${lastPart}`;
        }
        
        // Correct the URL
        const correctUrl = `/frameworks/guides/great-transition${window.location.search}${extractedHash}`;
        window.history.replaceState(null, '', correctUrl);
      }
      
      // Force reload translations if needed
      if (!translationsReady) {
        try {
          await loadTranslations($locale, '/frameworks/guides/great-transition');
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
      const newUrl = `/frameworks/guides/great-transition${window.location.search}#${section}`;
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
    return translationsReady ? (gt.sections?.[section] || section.replace(/[-_]/g, ' ')) 
                             : section.replace(/[-_]/g, ' ');
  }

  function getSectionCategoryTitle(category) {
    return translationsReady ? (gt.categories?.[category] || category) : category;
  }

  function getShortSectionTitle(section) {
    return translationsReady ? (gt.sectionsShort?.[section] || getSectionTitle(section)) : getSectionTitle(section);
  }

  function getTextWithFallback(key, fallback) {
    return translationsReady ? ($t(key) || fallback) : fallback;
  }

  function downloadGuideWithFallback(guideId = 'great-transition', version = 'v1.0') {
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
  function togglePartOne() { partOneOpen = !partOneOpen; }
  function togglePartTwo() { partTwoOpen = !partTwoOpen; }
  function togglePartThree() { partThreeOpen = !partThreeOpen; }

  // Handle locale changes
  $: if (browser && mounted && $locale) {
    invalidate('app:locale');
  }
</script>

<svelte:head>
  <title>{getTextWithFallback('greatTransitionGuide.meta.title', 'The Great Transition Implementation Guide - Global Governance Framework')}</title>
  <meta name="description" content="{getTextWithFallback('greatTransitionGuide.meta.description', 'A practical playbook for managing just transitions from extractive industries to regenerative economies using GGF frameworks')}" />
</svelte:head>

{#if mounted}
  <div class="breadcrumb-nav">
    <a href="/frameworks/guides" class="breadcrumb-link">
      <span class="breadcrumb-icon">←</span>
      <span class="breadcrumb-text">{gt.navigation?.backToGuides || 'Back to Implementation Guides'}</span>
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

         <!-- Part I: Acknowledging the Past, Sunsetting the Present -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={partOneOpen}
              class:has-active={isPartOneSection}
              on:click={togglePartOne}
            >
              <span class="accordion-icon">🌅</span>
              <span class="accordion-title">{getSectionCategoryTitle('partOne')}</span>
              <span class="section-count">(2)</span>
              <span class="toggle-arrow" class:rotated={partOneOpen}>▼</span>
            </button>
            {#if partOneOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each partOneSections as section}
                  {#if data?.sections?.[section]}
                    <button 
                      class="nav-item subsection-item" 
                      class:active={activeSection === section}
                      on:click={() => setActiveSection(section)}
                    >
                      <span class="nav-icon">
                        {#if section === 'sunsetting'}🏭
                        {:else if section === 'healing'}🌱
                        {:else}📄{/if}
                      </span>
                      <span class="nav-title">{getSectionTitle(section)}</span>
                    </button>
                  {/if}
                {/each}
              </div>
            {/if}
          </div>

          <!-- Part II: Building the Regenerative Future -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={partTwoOpen}
              class:has-active={isPartTwoSection}
              on:click={togglePartTwo}
            >
              <span class="accordion-icon">🌿</span>
              <span class="accordion-title">{getSectionCategoryTitle('partTwo')}</span>
              <span class="section-count">(2)</span>
              <span class="toggle-arrow" class:rotated={partTwoOpen}>▼</span>
            </button>
            {#if partTwoOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each partTwoSections as section}
                  {#if data?.sections?.[section]}
                    <button 
                      class="nav-item subsection-item" 
                      class:active={activeSection === section}
                      on:click={() => setActiveSection(section)}
                    >
                      <span class="nav-icon">
                        {#if section === 'empowering'}👥
                        {:else if section === 'building'}🏗️
                        {:else}📄{/if}
                      </span>
                      <span class="nav-title">{getSectionTitle(section)}</span>
                    </button>
                  {/if}
                {/each}
              </div>
            {/if}
          </div>

          <!-- Part III: Synthesis & Vision -->
          <div class="nav-accordion">
            <button 
              class="accordion-header" 
              class:open={partThreeOpen}
              class:has-active={isPartThreeSection}
              on:click={togglePartThree}
            >
              <span class="accordion-icon">🎯</span>
              <span class="accordion-title">{getSectionCategoryTitle('partThree')}</span>
              <span class="section-count">(2)</span>
              <span class="toggle-arrow" class:rotated={partThreeOpen}>▼</span>
            </button>
            {#if partThreeOpen}
              <div class="accordion-content" transition:slide={{ duration: 200 }}>
                {#each partThreeSections as section}
                  {#if data?.sections?.[section]}
                    <button 
                      class="nav-item subsection-item" 
                      class:active={activeSection === section}
                      on:click={() => setActiveSection(section)}
                    >
                      <span class="nav-icon">
                        {#if section === 'case-study'}📚
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
             <button class="download-btn" on:click={() => downloadGuideWithFallback('great-transition', 'v1.0')}>
               <span class="download-icon">📥</span>
               <span class="download-text">{gt.navigation?.downloadPdf || 'Download Complete Guide (PDF)'}</span>
             </button>
          </div>
        </div>
      {/if}
    </div>

    <div class="content">
      <!-- Progress indicator for part sections -->
      {#if !isPrintMode && (isPartOneSection || isPartTwoSection || isPartThreeSection) && translationsReady}
        <div class="progress-indicator">
          {#if isPartOneSection}
            <div class="progress-bar">
              <div class="progress-fill" style="width: {((partOneSections.indexOf(activeSection) + 1) / partOneSections.length * 100)}%"></div>
            </div>
            <span class="progress-text">{gt.progress?.partOne?.replace('{current}', partOneSections.indexOf(activeSection) + 1).replace('{total}', partOneSections.length) || `Part I: Section ${partOneSections.indexOf(activeSection) + 1} of ${partOneSections.length}`}</span>
          {:else if isPartTwoSection}
            <div class="progress-bar">
              <div class="progress-fill" style="width: {((partTwoSections.indexOf(activeSection) + 1) / partTwoSections.length * 100)}%"></div>
            </div>
            <span class="progress-text">{gt.progress?.partTwo?.replace('{current}', partTwoSections.indexOf(activeSection) + 1).replace('{total}', partTwoSections.length) || `Part II: Section ${partTwoSections.indexOf(activeSection) + 1} of ${partTwoSections.length}`}</span>
          {:else if isPartThreeSection}
            <div class="progress-bar">
              <div class="progress-fill" style="width: {((partThreeSections.indexOf(activeSection) + 1) / partThreeSections.length * 100)}%"></div>
            </div>
            <span class="progress-text">{gt.progress?.partThree?.replace('{current}', partThreeSections.indexOf(activeSection) + 1).replace('{total}', partThreeSections.length) || `Part III: Section ${partThreeSections.indexOf(activeSection) + 1} of ${partThreeSections.length}`}</span>
          {/if}
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
                  <strong>{gt.languageFallback?.title || 'Content in your language coming soon'}</strong>
                  <p>{gt.languageFallback?.description || 'This section is currently displayed in English until translation is complete.'}</p>
                </div>
              </div>
            {/if}
            
            <!-- Render sections from markdown files -->
            <svelte:component this={data.sections[section].default} t={$t} />
            
            <!-- Section navigation at bottom of part sections -->
            {#if !isPrintMode && translationsReady}
              {#if isPartOneSection}
                <div class="section-navigation">
                  {#if partOneSections.indexOf(activeSection) > 0}
                    <button class="nav-btn prev-btn" on:click={() => {
                      const currentIndex = partOneSections.indexOf(activeSection);
                      const prevSection = partOneSections[currentIndex - 1];
                      setActiveSection(prevSection);
                    }}>
                      ← {gt.navigation?.previousSection || 'Previous Section'}
                    </button>
                  {/if}
                  
                  {#if partOneSections.indexOf(activeSection) < partOneSections.length - 1}
                    <button class="nav-btn next-btn" on:click={() => {
                      const currentIndex = partOneSections.indexOf(activeSection);
                      const nextSection = partOneSections[currentIndex + 1];
                      setActiveSection(nextSection);
                    }}>
                      {gt.navigation?.nextSection || 'Next Section'} →
                    </button>
                  {:else}
                    <!-- After last section of Part I, go to Part II -->
                    <button class="nav-btn next-btn part-btn" on:click={() => setActiveSection('empowering')}>
                      {gt.navigation?.toPartTwo || 'Continue to Part II'} →
                    </button>
                  {/if}
                </div>
              {:else if isPartTwoSection}
                <div class="section-navigation">
                  {#if partTwoSections.indexOf(activeSection) > 0}
                    <button class="nav-btn prev-btn" on:click={() => {
                      const currentIndex = partTwoSections.indexOf(activeSection);
                      const prevSection = partTwoSections[currentIndex - 1];
                      setActiveSection(prevSection);
                    }}>
                      ← {gt.navigation?.previousSection || 'Previous Section'}
                    </button>
                  {:else}
                    <!-- Go back to Part I -->
                    <button class="nav-btn prev-btn part-btn" on:click={() => setActiveSection('healing')}>
                      ← {gt.navigation?.backToPartOne || 'Back to Part I'}
                    </button>
                  {/if}
                  
                  {#if partTwoSections.indexOf(activeSection) < partTwoSections.length - 1}
                    <button class="nav-btn next-btn" on:click={() => {
                      const currentIndex = partTwoSections.indexOf(activeSection);
                      const nextSection = partTwoSections[currentIndex + 1];
                      setActiveSection(nextSection);
                    }}>
                      {gt.navigation?.nextSection || 'Next Section'} →
                    </button>
                  {:else}
                    <!-- After last section of Part II, go to Part III -->
                    <button class="nav-btn next-btn part-btn" on:click={() => setActiveSection('case-study')}>
                      {gt.navigation?.toPartThree || 'Continue to Part III'} →
                    </button>
                  {/if}
                </div>
              {:else if isPartThreeSection}
                <div class="section-navigation">
                  {#if partThreeSections.indexOf(activeSection) > 0}
                    <button class="nav-btn prev-btn" on:click={() => {
                      const currentIndex = partThreeSections.indexOf(activeSection);
                      const prevSection = partThreeSections[currentIndex + 1];
                      setActiveSection(prevSection);
                    }}>
                      ← {gt.navigation?.previousSection || 'Previous Section'}
                    </button>
                  {:else}
                    <!-- Go back to Part II -->
                    <button class="nav-btn prev-btn part-btn" on:click={() => setActiveSection('building')}>
                      ← {gt.navigation?.backToPartTwo || 'Back to Part II'}
                    </button>
                  {/if}
                  
                  {#if partThreeSections.indexOf(activeSection) < partThreeSections.length - 1}
                    <button class="nav-btn next-btn" on:click={() => {
                      const currentIndex = partThreeSections.indexOf(activeSection);
                      const nextSection = partThreeSections[currentIndex + 1];
                      setActiveSection(nextSection);
                    }}>
                      {gt.navigation?.nextSection || 'Next Section'} →
                    </button>
                  {/if}
                </div>
              {/if}
            {/if}
          </div>
        {:else}
          <div class="missing-section">
            <h2>{getTextWithFallback('greatTransitionGuide.errors.sectionNotFound', `Section "${section}" not found`).replace('{section}', section)}</h2>
            <p>{getTextWithFallback('greatTransitionGuide.errors.contentInDevelopment', 'This content is still being developed.')}</p>
          </div>
        {/if}
      {/each}
    </div>
  </div>
{:else}
  <!-- Loading state to prevent hydration issues -->
  <div class="loading-container">
    <div class="loading-spinner"></div>
    <p>{getTextWithFallback('greatTransitionGuide.loading.text', 'Loading guide content...')}</p>
  </div>
{/if}

<style>
  /* Great Transition Guide color scheme - transition/industrial theme */
  :root {
    --guide-primary: #1B4332;      /* Dark green - forest/transition */
    --guide-secondary: #B07000;    /* Dark goldenrod - industrial heritage */
    --guide-accent: #D4A574;       /* Tan - bridge between old and new */
    --guide-success: #52B788;      /* Medium sea green - hope/growth */
    --guide-warning: #F77F00;      /* Orange - transformation energy */
    --guide-danger: #8B2635;       /* Dark red - legacy issues */
    --guide-light: #F1FAEE;        /* Honeydew - clean future */
    --guide-dark: #0F1419;         /* Very dark blue green */
    --guide-wisdom: #74C69D;       /* Medium aquamarine - healing */
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
    background: linear-gradient(to bottom, var(--guide-light), #e8f5f0);
    border-radius: 0.75rem;
    padding: 1.25rem;
    border: 1px solid rgba(27, 67, 50, 0.15);
    box-shadow: 0 2px 8px rgba(27, 67, 50, 0.1);
  }

  .nav-section {
    margin-bottom: 1rem;
  }

  .download-section {
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: linear-gradient(135deg, rgba(176, 112, 0, 0.1), rgba(27, 67, 50, 0.1));
    border-radius: 0.5rem;
    border: 1px solid rgba(176, 112, 0, 0.2);
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
    box-shadow: 0 4px 8px rgba(176, 112, 0, 0.3);
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
    background-color: rgba(176, 112, 0, 0.05);
  }

  .accordion-header:focus-visible {
    outline: 2px solid var(--guide-accent);
    outline-offset: 2px;
    background-color: rgba(176, 112, 0, 0.1);
  }

  .accordion-header.has-active {
    background-color: rgba(27, 67, 50, 0.1);
    color: var(--guide-primary);
    font-weight: 600;
  }

  .accordion-header.open {
    background-color: rgba(176, 112, 0, 0.1);
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
    background-color: rgba(176, 112, 0, 0.05);
    color: #374151;
  }

  .nav-item:focus-visible {
    outline: 2px solid var(--guide-accent);
    outline-offset: 2px;
    background-color: rgba(176, 112, 0, 0.1);
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
    background: linear-gradient(135deg, rgba(27, 67, 50, 0.1), rgba(176, 112, 0, 0.1));
    border: 1px solid rgba(27, 67, 50, 0.2);
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
    background: linear-gradient(90deg, rgba(27, 67, 50, 0.1), rgba(176, 112, 0, 0.1));
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

  /* Section navigation */
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

  .part-btn {
    background: linear-gradient(135deg, var(--guide-accent), var(--guide-warning));
    font-weight: 600;
  }

  .part-btn:hover {
    background: linear-gradient(135deg, var(--guide-warning), var(--guide-accent));
  }

  /* Language fallback notice */
  .language-fallback-notice {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background-color: rgba(176, 112, 0, 0.1);
    border: 1px solid rgba(176, 112, 0, 0.3);
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
    background-color: rgba(176, 112, 0, 0.1);
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
    content: "⚙️";
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
