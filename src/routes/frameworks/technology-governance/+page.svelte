<!-- src/routes/frameworks/docs/implementation/technology/+page.svelte -->
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

  // Extract techFramework translations for shorter references
  $: tf = $t('techFramework') || {};
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
  let structureOpen = false;
  let operationOpen = false;
  let adaptationOpen = false;
  let learningOpen = false;

  // Initialize accordion states after mount
  function initializeAccordionStates() {
    // Set initial accordion states based on active section
    if (['introduction', 'context'].includes(activeSection)) {
      foundationOpen = true;
    } else if (['governance-model', 'implementation'].includes(activeSection)) {
      structureOpen = true;
    } else if (['tools', 'operational'].includes(activeSection)) {
      operationOpen = true;
    } else if (['emerging', 'evaluation'].includes(activeSection)) {
      adaptationOpen = true;
    } else if (['case-studies', 'appendices'].includes(activeSection)) {
      learningOpen = true;
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

  // Get section titles in current language
  function getSectionTitle(section) {
    return tf.sections?.[section] || section;
  }

  // Group sections logically with multi-lingual support using short references
  function getSectionCategoryTitle(category) {
    return tf.categories?.[category] || category;
  }

  // Function to get shortened section titles for navigation using short references
  function getShortSectionTitle(section) {
    return tf.sectionsShort?.[section] || getSectionTitle(section);
  }

  // Computed values - add safety checks
  $: coreFrameworkSections = ['introduction', 'context', 'governance-model', 'implementation', 'tools', 'operational', 'emerging', 'evaluation', 'case-studies', 'appendices'].filter(section => 
    data?.sections?.[section]
  );
  $: isCoreSection = coreFrameworkSections.includes(activeSection) && activeSection !== 'index';

  function toggleFoundation() {
    foundationOpen = !foundationOpen;
  }

  function toggleStructure() {
    structureOpen = !structureOpen;
  }

  function toggleOperation() {
    operationOpen = !operationOpen;
  }

  function toggleAdaptation() {
    adaptationOpen = !adaptationOpen;
  }

  function toggleLearning() {
    learningOpen = !learningOpen;
  }

  // Handle locale changes - add safety check
  $: if (browser && mounted && $locale) {
    invalidate('app:locale');
  }

  // Get localized text for buttons and UI elements
  function getLocalizedText(key) {
    return tf.localizedText?.[key] || key;
  }
</script>

<svelte:head>
  <title>{tf.meta?.title || 'Technology Governance Implementation Framework - Global Governance Framework'}</title>
  <meta name="description" content="{tf.meta?.description || 'A comprehensive framework for implementing effective technology governance systems'}" />
</svelte:head>

{#if mounted}
  <div class="documentation-container">
    {#if !isPrintMode}
      <FrameworkSidebar />
    {/if}

    <div class="content">
      <!-- Quick Access Card for Tech Governance Framework -->
      {#if !isPrintMode && activeSection === 'index'}
        <div class="tech-guide-card">
          <div class="card-content">
            <div class="card-icon">⚙️</div>
            <div class="card-text">
              <h3>{tf.guideCard?.title || getLocalizedText('newToFramework')}</h3>
              <p>{tf.guideCard?.description || getLocalizedText('startWithIntroduction')}</p>
            </div>
            <div class="card-actions">
              <button class="primary-btn" on:click={() => setActiveSection('introduction')}>
                {tf.guideCard?.buttonText || getLocalizedText('readIntroduction')} <span class="arrow-icon">→</span>
              </button>
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

            <!-- Foundation & Understanding Accordion -->
            <div class="nav-accordion">
              <button 
                class="accordion-header" 
                class:open={foundationOpen}
                class:has-active={['introduction', 'context'].some(section => activeSection === section)}
                on:click={toggleFoundation}
              >
                <span class="accordion-icon">🧭</span>
                <span class="accordion-title">{getSectionCategoryTitle('foundation')}</span>
                <span class="section-count">(2)</span>
                <span class="toggle-arrow" class:rotated={foundationOpen}>▼</span>
              </button>
              {#if foundationOpen}
                <div class="accordion-content" transition:slide={{ duration: 200 }}>
                  {#if data?.sections?.['introduction']}
                    <button 
                      class="nav-item subsection-item" 
                      class:active={activeSection === 'introduction'}
                      on:click={() => setActiveSection('introduction')}
                    >
                      <span class="nav-icon">🔹</span>
                      <span class="nav-title">{getShortSectionTitle('introduction')}</span>
                    </button>
                  {/if}
                  {#if data?.sections?.['context']}
                    <button 
                      class="nav-item subsection-item" 
                      class:active={activeSection === 'context'}
                      on:click={() => setActiveSection('context')}
                    >
                      <span class="nav-icon">🔹</span>
                      <span class="nav-title">{getShortSectionTitle('context')}</span>
                    </button>
                  {/if}
                </div>
              {/if}
            </div>

            <!-- Building Governance Systems Accordion -->
            <div class="nav-accordion">
              <button 
                class="accordion-header" 
                class:open={structureOpen}
                class:has-active={['governance-model', 'implementation'].some(section => activeSection === section)}
                on:click={toggleStructure}
              >
                <span class="accordion-icon">🏗️</span>
                <span class="accordion-title">{getSectionCategoryTitle('structure')}</span>
                <span class="section-count">(2)</span>
                <span class="toggle-arrow" class:rotated={structureOpen}>▼</span>
              </button>
              {#if structureOpen}
                <div class="accordion-content" transition:slide={{ duration: 200 }}>
                  {#if data?.sections?.['governance-model']}
                    <button 
                      class="nav-item subsection-item" 
                      class:active={activeSection === 'governance-model'}
                      on:click={() => setActiveSection('governance-model')}
                    >
                      <span class="nav-icon">🔹</span>
                      <span class="nav-title">{getShortSectionTitle('governance-model')}</span>
                    </button>
                  {/if}
                  {#if data?.sections?.['implementation']}
                    <button 
                      class="nav-item subsection-item" 
                      class:active={activeSection === 'implementation'}
                      on:click={() => setActiveSection('implementation')}
                    >
                      <span class="nav-icon">🔹</span>
                      <span class="nav-title">{getShortSectionTitle('implementation')}</span>
                    </button>
                  {/if}
                </div>
              {/if}
            </div>

            <!-- Making Governance Work Accordion -->
            <div class="nav-accordion">
              <button 
                class="accordion-header" 
                class:open={operationOpen}
                class:has-active={['tools', 'operational'].some(section => activeSection === section)}
                on:click={toggleOperation}
              >
                <span class="accordion-icon">⚙️</span>
                <span class="accordion-title">{getSectionCategoryTitle('operation')}</span>
                <span class="section-count">(2)</span>
                <span class="toggle-arrow" class:rotated={operationOpen}>▼</span>
              </button>
              {#if operationOpen}
                <div class="accordion-content" transition:slide={{ duration: 200 }}>
                  {#if data?.sections?.['tools']}
                    <button 
                      class="nav-item subsection-item" 
                      class:active={activeSection === 'tools'}
                      on:click={() => setActiveSection('tools')}
                    >
                      <span class="nav-icon">🔹</span>
                      <span class="nav-title">{getShortSectionTitle('tools')}</span>
                    </button>
                  {/if}
                  {#if data?.sections?.['operational']}
                    <button 
                      class="nav-item subsection-item" 
                      class:active={activeSection === 'operational'}
                      on:click={() => setActiveSection('operational')}
                    >
                      <span class="nav-icon">🔹</span>
                      <span class="nav-title">{getShortSectionTitle('operational')}</span>
                    </button>
                  {/if}
                </div>
              {/if}
            </div>

            <!-- Staying Ahead Accordion -->
            <div class="nav-accordion">
              <button 
                class="accordion-header" 
                class:open={adaptationOpen}
                class:has-active={['emerging', 'evaluation'].some(section => activeSection === section)}
                on:click={toggleAdaptation}
              >
                <span class="accordion-icon">🚀</span>
                <span class="accordion-title">{getSectionCategoryTitle('adaptation')}</span>
                <span class="section-count">(2)</span>
                <span class="toggle-arrow" class:rotated={adaptationOpen}>▼</span>
              </button>
              {#if adaptationOpen}
                <div class="accordion-content" transition:slide={{ duration: 200 }}>
                  {#if data?.sections?.['emerging']}
                    <button 
                      class="nav-item subsection-item" 
                      class:active={activeSection === 'emerging'}
                      on:click={() => setActiveSection('emerging')}
                    >
                      <span class="nav-icon">🔹</span>
                      <span class="nav-title">{getShortSectionTitle('emerging')}</span>
                    </button>
                  {/if}
                  {#if data?.sections?.['evaluation']}
                    <button 
                      class="nav-item subsection-item" 
                      class:active={activeSection === 'evaluation'}
                      on:click={() => setActiveSection('evaluation')}
                    >
                      <span class="nav-icon">🔹</span>
                      <span class="nav-title">{getShortSectionTitle('evaluation')}</span>
                    </button>
                  {/if}
                </div>
              {/if}
            </div>

            <!-- Learning & Improvement Accordion -->
            <div class="nav-accordion">
              <button 
                class="accordion-header" 
                class:open={learningOpen}
                class:has-active={['case-studies', 'appendices'].some(section => activeSection === section)}
                on:click={toggleLearning}
              >
                <span class="accordion-icon">📚</span>
                <span class="accordion-title">{getSectionCategoryTitle('learning')}</span>
                <span class="section-count">(2)</span>
                <span class="toggle-arrow" class:rotated={learningOpen}>▼</span>
              </button>
              {#if learningOpen}
                <div class="accordion-content" transition:slide={{ duration: 200 }}>
                  {#if data?.sections?.['case-studies']}
                    <button 
                      class="nav-item subsection-item" 
                      class:active={activeSection === 'case-studies'}
                      on:click={() => setActiveSection('case-studies')}
                    >
                      <span class="nav-icon">🔹</span>
                      <span class="nav-title">{getShortSectionTitle('case-studies')}</span>
                    </button>
                  {/if}
                  {#if data?.sections?.['appendices']}
                    <button 
                      class="nav-item subsection-item" 
                      class:active={activeSection === 'appendices'}
                      on:click={() => setActiveSection('appendices')}
                    >
                      <span class="nav-icon">🔹</span>
                      <span class="nav-title">{getShortSectionTitle('appendices')}</span>
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
            <span class="progress-text">{tf.progress?.text?.replace('{current}', coreFrameworkSections.indexOf(activeSection) + 1).replace('{total}', coreFrameworkSections.length) || `Section ${coreFrameworkSections.indexOf(activeSection) + 1} of ${coreFrameworkSections.length}`}</span>
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
                    <strong>{tf.languageFallback?.title || 'Content in your language coming soon'}</strong>
                    <p>{tf.languageFallback?.description || 'This section is currently displayed in English until translation is complete.'}</p>
                  </div>
                </div>
              {/if}
              
              <!-- Render sections from markdown files -->
              <svelte:component this={data.sections[section].default} t={translationFunction} />
              
              <!-- Section navigation at bottom of core sections -->
              {#if isCoreSection && !isPrintMode && coreFrameworkSections.length > 0}
                <div class="section-navigation">
                  {#if coreFrameworkSections.indexOf(activeSection) > 0}
                    <button class="nav-btn prev-btn" on:click={() => {
                      const currentIndex = coreFrameworkSections.indexOf(activeSection);
                      const prevSection = coreFrameworkSections[currentIndex - 1];
                      setActiveSection(prevSection);
                    }}>
                      ← {tf.navigation?.previousSection || 'Previous Section'}
                    </button>
                  {/if}
                  
                  {#if coreFrameworkSections.indexOf(activeSection) < coreFrameworkSections.length - 1}
                    <button class="nav-btn next-btn" on:click={() => {
                      const currentIndex = coreFrameworkSections.indexOf(activeSection);
                      const nextSection = coreFrameworkSections[currentIndex + 1];
                      setActiveSection(nextSection);
                    }}>
                      {tf.navigation?.nextSection || 'Next Section'} →
                    </button>
                  {/if}
                </div>
              {/if}
            </div>
          {:else}
            <div class="missing-section">
              <h2>{tf.errors?.sectionNotFound?.replace('{section}', section) || `Section "${section}" not found`}</h2>
              <p>{tf.errors?.contentInDevelopment || 'This content is still being developed.'}</p>
            </div>
          {/if}
        {/each}
      {:else}
        <!-- Legacy single file display -->
        <svelte:component this={data.component} />
      {/if}
    </div>
  </div>
{:else}
  <!-- Loading state to prevent hydration issues -->
  <div class="loading-container">
    <div class="loading-spinner"></div>
    <p>{tf.loading?.text || 'Loading framework content...'}</p>
  </div>
{/if}

<style>
  /* Technology Governance color scheme */
  :root {
    --tech-primary: #2B4B8C;
    --tech-secondary: #6b7280;
    --tech-innovation: #6B5CA5;
    --tech-ethics: #4B5CA5;
    --tech-governance: #2D5F2D;
    --tech-responsibility: #C43B3B;
    --tech-progress: #DAA520;
    --tech-systems: #1E6B96;
    --tech-adaptation: #8B4513;
    --tech-future: #6DAA3F;
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
    border-top: 4px solid var(--tech-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
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

  /* Navigation styles */
  .section-nav {
    margin-bottom: 2rem;
    border-bottom: 1px solid #e5e7eb;
    background: linear-gradient(to bottom, #f8fafc, #f1f5f9);
    border-radius: 0.5rem;
    padding: 1rem;
  }

  .nav-section {
    margin-bottom: 1rem;
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
    background-color: rgba(43, 75, 140, 0.05);
  }

  .accordion-header:focus-visible {
    outline: 2px solid var(--tech-innovation);
    outline-offset: 2px;
  }

  .accordion-header.has-active {
    background-color: rgba(43, 75, 140, 0.1);
    color: var(--tech-primary);
    font-weight: 600;
  }

  .accordion-header.open {
    background-color: rgba(43, 75, 140, 0.1);
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
    background-color: rgba(43, 75, 140, 0.05);
    color: #374151;
  }

  .nav-item:focus-visible {
    outline: 2px solid var(--tech-innovation);
    outline-offset: 2px;
  }

  .nav-item.active {
    background-color: var(--tech-primary);
    color: white;
    font-weight: 600;
  }

  .nav-item.active:hover {
    background-color: var(--tech-innovation);
  }

  .overview-item {
    background: linear-gradient(135deg, rgba(43, 75, 140, 0.1), rgba(107, 92, 165, 0.1));
    border: 1px solid rgba(43, 75, 140, 0.2);
    border-radius: 0.375rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .overview-item.active {
    background: var(--tech-primary);
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
    background: linear-gradient(90deg, rgba(43, 75, 140, 0.1), rgba(107, 92, 165, 0.1));
    border-radius: 0.5rem;
    border-left: 4px solid var(--tech-primary);
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
    background: linear-gradient(90deg, var(--tech-primary), var(--tech-innovation));
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 0.875rem;
    color: var(--tech-primary);
    font-weight: 500;
  }

  /* Tech governance framework guide card */
  .tech-guide-card {
    background: linear-gradient(135deg, rgba(43, 75, 140, 0.08) 0%, rgba(107, 92, 165, 0.08) 100%);
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(43, 75, 140, 0.1);
    border: 1px solid rgba(43, 75, 140, 0.2);
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
    color: var(--tech-primary);
    flex-shrink: 0;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h3 {
    margin: 0 0 0.5rem 0;
    color: var(--tech-primary);
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
  }
  
  .primary-btn {
    background-color: var(--tech-primary);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: var(--tech-innovation);
    transform: translateY(-1px);
  }

  .primary-btn:focus-visible {
    outline: 2px solid var(--tech-innovation);
    outline-offset: 2px;
  }

  .arrow-icon {
    display: inline-block;
    margin-left: 0.25rem;
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
    background-color: var(--tech-primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .nav-btn:hover {
    background-color: var(--tech-innovation);
    transform: translateY(-1px);
  }

  .nav-btn:focus-visible {
    outline: 2px solid var(--tech-innovation);
    outline-offset: 2px;
  }

  .prev-btn {
    margin-right: auto;
  }

  .next-btn {
    margin-left: auto;
  }

  /* Language fallback notice */
  .language-fallback-notice {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background-color: rgba(107, 92, 165, 0.1);
    border: 1px solid rgba(107, 92, 165, 0.3);
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
    margin-bottom: 1.5rem;
  }

  .notice-icon {
    font-size: 1.25rem;
    color: var(--tech-innovation);
    flex-shrink: 0;
    margin-top: 0.125rem;
  }

  .notice-content {
    flex: 1;
  }

  .notice-content strong {
    color: var(--tech-innovation);
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
    color: var(--tech-primary);
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--tech-innovation);
  }
  
  .content :global(h3),
  .content :global(h4) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--tech-ethics);
  }

  .content :global(h4) {
    font-size: 1.2rem;
    color: var(--tech-systems);
  }
  
  .content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #4b5563;
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
    content: "✦";
    position: absolute;
    left: 0;
    top: 0.1em;
    color: var(--tech-progress);
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
    color: var(--tech-ethics);
    font-weight: 600;
  }

  /* Links */
  .content :global(a) {
    color: var(--tech-ethics);
    text-decoration: underline;
    font-weight: 500;
    transition: all 0.2s;
  }

  .content :global(a:hover) {
    color: var(--tech-primary);
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

    .section-navigation {
      flex-direction: column;
      gap: 1rem;
    }

    .section-navigation button {
      width: 100%;
    }

    .loading-container {
      padding: 2rem 1rem;
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
