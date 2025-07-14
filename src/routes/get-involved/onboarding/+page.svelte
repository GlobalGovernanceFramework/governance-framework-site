<!-- src/routes/get-involved/onboarding/+page.svelte -->
<script>
  import { t, locale, isLocaleLoaded, loadTranslations } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { invalidate } from '$app/navigation';
  import { onMount, tick } from 'svelte';
  import { slide } from 'svelte/transition';

  export let data;

  // Translation state - use isLocaleLoaded for better reactivity
  $: translationsReady = $isLocaleLoaded;
  $: ob = translationsReady ? ($t('onboardingContent') || {}) : {};
  $: currentLocale = $locale;

  // Component state
  let activeSection = 'overview';
  let mounted = false;
  let isPrintMode = false;
  let foundationalOpen = false;
  let welcomeKitOpen = true; // Start with welcome kit open since 'overview' is in welcome kit

  // Computed values
  $: sectionsToShow = (mounted && isPrintMode) ? data.allSections : [activeSection];
  $: isFoundationalSection = data.foundationalSections?.includes(activeSection);
  $: isWelcomeKitSection = data.welcomeKitSections?.includes(activeSection);

  function initializeAccordionStates() {
    // Set initial accordion states based on active section
    foundationalOpen = isFoundationalSection;
    welcomeKitOpen = isWelcomeKitSection;
  }

  // Smart accordion state management
  function updateAccordionStates(newSection) {
    if (data.foundationalSections?.includes(newSection)) {
      // If switching to a foundational section, open foundational and close welcome kit
      foundationalOpen = true;
      welcomeKitOpen = false;
    } else if (data.welcomeKitSections?.includes(newSection)) {
      // If switching to a welcome kit section, open welcome kit and close foundational
      welcomeKitOpen = true;
      foundationalOpen = false;
    }
    // If it's neither (shouldn't happen), keep current state
  }

  function toggleFoundational() { 
    foundationalOpen = !foundationalOpen; 
    // If opening foundational, close welcome kit to avoid confusion
    if (foundationalOpen) {
      welcomeKitOpen = false;
    }
  }

  function toggleWelcomeKit() { 
    welcomeKitOpen = !welcomeKitOpen; 
    // If opening welcome kit, close foundational to avoid confusion
    if (welcomeKitOpen) {
      foundationalOpen = false;
    }
  }

  onMount(async () => {
    await tick();
    mounted = true;
    
    if (browser) {
      // Fix URL corruption and preserve hash fragments
      let extractedHash = window.location.hash;
      
      if (window.location.pathname !== '/get-involved/onboarding') {
        const pathname = window.location.pathname;
        const lastPart = pathname.split('/').pop();
        
        // Extract section from corrupted pathname
        if (data?.sections?.[lastPart] && !extractedHash) {
          extractedHash = `#${lastPart}`;
        }
        
        // Correct the URL
        const correctUrl = `/get-involved/onboarding${window.location.search}${extractedHash}`;
        window.history.replaceState(null, '', correctUrl);
      }
      
      // Force reload translations if needed
      if (!translationsReady) {
        try {
          await loadTranslations($locale, '/get-involved/onboarding');
        } catch (e) {
          console.error('Failed to reload translations:', e);
        }
      }
      
      // Set initial section from URL
      const urlParams = new URLSearchParams(window.location.search);
      isPrintMode = urlParams.get('print') === 'true';
      
      const sectionParam = urlParams.get('section');
      const hashSection = (extractedHash || window.location.hash).substring(1);
      
      if (sectionParam && data.sections?.[sectionParam]) {
        activeSection = sectionParam;
      } else if (hashSection && data.sections?.[hashSection]) {
        activeSection = hashSection;
      }
      
      // Set accordion states based on the initial active section
      updateAccordionStates(activeSection);
      
      // Global function for PDF generation
      window.showAllSectionsForPrint = () => { isPrintMode = true; };
      
      // Listen for hash changes
      const handleHashChange = () => {
        const hash = window.location.hash.substring(1);
        if (hash && data.sections?.[hash] && activeSection !== hash) {
          // Use setActiveSection to handle both section change and accordion state
          setActiveSection(hash);
          
          // Scroll to content
          setTimeout(() => {
            const contentElement = document.querySelector('.section-content');
            if (contentElement) {
              contentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    if (!data.sections?.[section]) return;
    
    // Update the active section
    activeSection = section;
    
    // Automatically manage accordion states based on the new section
    updateAccordionStates(section);
    
    if (browser) {
      const newUrl = `/get-involved/onboarding${window.location.search}#${section}`;
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
    return translationsReady ? (ob.sections?.[section] || section.replace(/[-_]/g, ' ')) 
                             : section.replace(/[-_]/g, ' ');
  }

  function getSectionCategoryTitle(category) {
    return translationsReady ? (ob.categories?.[category] || category) : category;
  }

  function getTextWithFallback(key, fallback) {
    return translationsReady ? ($t(key) || fallback) : fallback;
  }

  // Handle locale changes
  $: if (browser && mounted && $locale) {
    invalidate('app:locale');
  }
</script>

<svelte:head>
  <title>{getTextWithFallback('onboardingContent.meta.title', 'Onboarding - Global Governance Framework')}</title>
  <meta name="description" content="{getTextWithFallback('onboardingContent.meta.description', 'Get started with the Global Governance Framework project')}" />
</svelte:head>

{#if mounted}
  <div class="onboarding-container">
    
    <!-- Header -->
    <div class="onboarding-header">
      <h1 class="onboarding-title">{getTextWithFallback('onboardingContent.title', 'Getting Started with GGF')}</h1>
      <p class="onboarding-subtitle">{getTextWithFallback('onboardingContent.subtitle', 'Everything you need to know to begin contributing to the Global Governance Framework project')}</p>
    </div>

    <!-- Section Navigation -->
    {#if !isPrintMode}
      <div class="section-nav">
        
        <!-- Welcome Kit Accordion -->
        <div class="nav-accordion">
          <button 
            class="accordion-header" 
            class:open={welcomeKitOpen}
            class:has-active={isWelcomeKitSection}
            on:click={toggleWelcomeKit}
            aria-expanded={welcomeKitOpen}
            aria-controls="welcome-kit-content"
          >
            <span class="accordion-icon">👋</span>
            <span class="accordion-title">{ob.categories?.welcomeKit || 'Welcome Kit'}</span>
            <span class="section-count">({data.welcomeKitSections?.length || 0})</span>
            <span class="toggle-arrow" class:rotated={welcomeKitOpen}>▼</span>
          </button>
          {#if welcomeKitOpen}
            <div 
              class="accordion-content" 
              transition:slide={{ duration: 200 }}
              id="welcome-kit-content"
            >
              {#each data.welcomeKitSections || [] as section}
                {#if data.sections?.[section]}
                  <button 
                    class="nav-item subsection-item" 
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                    aria-current={activeSection === section ? 'page' : undefined}
                  >
                    <span class="nav-icon">
                      {#if section === 'overview'}📋
                      {:else if section === 'statutes'}📄
                      {:else if section === 'work-system-guide'}❤️
                      {:else if section === 'operating-system'}⚙️
                      {:else if section === 'strategic-goals'}🎯
                      {:else}📖{/if}
                    </span>
                    <span class="nav-title">{getSectionTitle(section)}</span>
                  </button>
                {/if}
              {/each}
            </div>
          {/if}
        </div>

        <!-- Foundational Accordion -->
        <div class="nav-accordion">
          <button 
            class="accordion-header" 
            class:open={foundationalOpen}
            class:has-active={isFoundationalSection}
            on:click={toggleFoundational}
            aria-expanded={foundationalOpen}
            aria-controls="foundational-content"
          >
            <span class="accordion-icon">🔧</span>
            <span class="accordion-title">{ob.categories?.foundational || 'Foundational Skills'}</span>
            <span class="section-count">({data.foundationalSections?.length || 0})</span>
            <span class="toggle-arrow" class:rotated={foundationalOpen}>▼</span>
          </button>
          {#if foundationalOpen}
            <div 
              class="accordion-content" 
              transition:slide={{ duration: 200 }}
              id="foundational-content"
            >
              {#each data.foundationalSections || [] as section}
                {#if data.sections?.[section]}
                  <button 
                    class="nav-item subsection-item" 
                    class:active={activeSection === section}
                    on:click={() => setActiveSection(section)}
                    aria-current={activeSection === section ? 'page' : undefined}
                  >
                    <span class="nav-icon">
                      {#if section === 'first-love-ledger'}❤️
                      {:else if section === 'git-and-documentation-flow'}📝
                      {:else if section === 'time-tracking'}⏰
                      {:else if section === 'working-with-ai'}🤖
                      {:else}🔧{/if}
                    </span>
                    <span class="nav-title">{getSectionTitle(section)}</span>
                  </button>
                {/if}
              {/each}
            </div>
          {/if}
        </div>

      </div>
    {/if}

    <!-- Content Area -->
    <div class="content-area">
      
      <!-- Show active section, or all sections in print mode -->
      {#each sectionsToShow as section (section)}
        {#if data.sections?.[section]}
          <div class="section-content" id={section}>
            <!-- Language fallback notice -->
            {#if !isPrintMode && data.sectionsUsingEnglishFallback?.includes(section) && translationsReady}
              <div class="language-fallback-notice">
                <div class="notice-icon">🌐</div>
                <div class="notice-content">
                  <strong>{ob.languageFallback?.title || 'Content in your language coming soon'}</strong>
                  <p>{ob.languageFallback?.description || 'This section is currently displayed in English until translation is complete.'}</p>
                </div>
              </div>
            {/if}
            
            <!-- Render section from markdown files -->
            <svelte:component this={data.sections[section].default} />
          </div>
        {:else}
          <div class="missing-section">
            <h2>{getTextWithFallback('onboardingContent.errors.sectionNotFound', `Section "${section}" not found`).replace('{section}', section)}</h2>
            <p>{getTextWithFallback('onboardingContent.errors.contentInDevelopment', 'This content is still being developed.')}</p>
          </div>
        {/if}
      {/each}

    </div>
  </div>
{:else}
  <!-- Loading state -->
  <div class="loading-container">
    <div class="loading-spinner"></div>
    <p>{getTextWithFallback('onboardingContent.loading.text', 'Loading onboarding content...')}</p>
  </div>
{/if}

<style>
  /* Color scheme based on home page */
  :root {
    --ggf-primary: #2B4B8C;
    --ggf-secondary: #6B5CA5;
    --ggf-accent: #DAA520;
    --ggf-success: #2D5F2D;
    --ggf-light: #f8fafc;
    --ggf-dark: #1e293b;
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
    border-top: 4px solid var(--ggf-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Layout */
  .onboarding-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  /* Header */
  .onboarding-header {
    text-align: center;
    margin-bottom: 3rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .onboarding-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--ggf-primary);
    margin-bottom: 1rem;
    background: linear-gradient(135deg, var(--ggf-primary) 0%, var(--ggf-secondary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .onboarding-subtitle {
    font-size: 1.25rem;
    color: #475569;
    line-height: 1.7;
    margin: 0;
  }

  /* Section Navigation */
  .section-nav {
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .nav-accordion {
    margin-bottom: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    overflow: hidden;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .accordion-header {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    background: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 1rem;
    font-weight: 600;
    color: #374151;
    text-align: left;
  }

  .accordion-header:hover {
    background-color: rgba(43, 75, 140, 0.05);
  }

  .accordion-header:focus-visible {
    outline: 2px solid var(--ggf-primary);
    outline-offset: 2px;
    background-color: rgba(43, 75, 140, 0.1);
  }

  .accordion-header.has-active {
    background-color: rgba(43, 75, 140, 0.1);
    color: var(--ggf-primary);
    font-weight: 700;
  }

  .accordion-header.open {
    background-color: rgba(43, 75, 140, 0.05);
    border-bottom: 1px solid #e5e7eb;
  }

  .accordion-icon {
    font-size: 1.25rem;
    flex-shrink: 0;
  }

  .accordion-title {
    flex-grow: 1;
    font-weight: 600;
  }

  .section-count {
    font-size: 0.875rem;
    color: #6b7280;
    font-weight: 400;
  }

  .toggle-arrow {
    font-size: 0.875rem;
    color: #6b7280;
    transition: transform 0.2s ease;
    flex-shrink: 0;
  }

  .toggle-arrow.rotated {
    transform: rotate(180deg);
  }

  .accordion-content {
    background-color: #fafafa;
  }

  .nav-item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1.25rem;
    background: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.95rem;
    color: #4b5563;
    text-align: left;
  }

  .nav-item:hover {
    background-color: rgba(43, 75, 140, 0.05);
    color: #374151;
  }

  .nav-item:focus-visible {
    outline: 2px solid var(--ggf-primary);
    outline-offset: 2px;
    background-color: rgba(43, 75, 140, 0.1);
  }

  .nav-item.active {
    background-color: var(--ggf-primary);
    color: white;
    font-weight: 600;
  }

  .nav-item.active:hover {
    background-color: var(--ggf-secondary);
  }

  .subsection-item {
    padding-left: 2rem;
  }

  .nav-icon {
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  .nav-title {
    flex-grow: 1;
    text-align: left;
  }

  /* Content Area */
  .content-area {
    max-width: 800px;
    margin: 0 auto;
  }

  .section-content {
    padding: 2rem 0;
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

  /* Language fallback notice */
  .language-fallback-notice {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background-color: rgba(218, 165, 32, 0.1);
    border: 1px solid rgba(218, 165, 32, 0.3);
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
    margin-bottom: 1.5rem;
  }

  .notice-icon {
    font-size: 1.25rem;
    color: var(--ggf-accent);
    flex-shrink: 0;
    margin-top: 0.125rem;
  }

  .notice-content {
    flex: 1;
  }

  .notice-content strong {
    color: var(--ggf-accent);
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
  .content-area :global(h1) {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--ggf-primary);
  }
  
  .content-area :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--ggf-secondary);
  }
  
  .content-area :global(h3),
  .content-area :global(h4) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--ggf-primary);
  }

  .content-area :global(h4) {
    font-size: 1.125rem;
  }
  
  .content-area :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #4b5563;
  }

  /* Blockquotes */
  .content-area :global(blockquote) {
    background-color: rgba(43, 75, 140, 0.05);
    border-left: 4px solid var(--ggf-primary);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
  }

  /* Lists */
  .content-area :global(ul), .content-area :global(ol) {
    margin-bottom: 1.5rem;
    padding-left: 1rem;
    color: #4b5563;
  }

  .content-area :global(ul) {
    list-style-type: none;
  }

  .content-area :global(ul li) {
    position: relative;
    margin-bottom: 0.75rem;
    padding-left: 1.5rem;
  }

  .content-area :global(ul li::before) {
    content: "•";
    position: absolute;
    left: 0;
    top: 0.1em;
    font-size: 1.2rem;
    color: var(--ggf-accent);
  }

  /* Ordered lists */
  .content-area :global(ol) {
    list-style-type: decimal;
    counter-reset: item;
  }

  .content-area :global(ol li) {
    position: relative;
    margin-bottom: 0.75rem;
    padding-left: 0.5rem;
    color: #4b5563;
  }

  .content-area :global(ol li::marker) {
    color: var(--ggf-primary);
    font-weight: 600;
  }

  /* Links */
  .content-area :global(a) {
    color: var(--ggf-primary);
    text-decoration: underline;
    font-weight: 500;
    transition: all 0.2s;
  }

  .content-area :global(a:hover) {
    color: var(--ggf-secondary);
  }

  /* Code blocks */
  .content-area :global(code) {
    background-color: #f1f5f9;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 0.875rem;
    color: var(--ggf-primary);
  }

  .content-area :global(pre) {
    background-color: #1e293b;
    color: #e2e8f0;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1.5rem 0;
  }

  .content-area :global(pre code) {
    background: none;
    padding: 0;
    color: inherit;
  }

  /* Tables */
  .content-area :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    background: white;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .content-area :global(th),
  .content-area :global(td) {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }

  .content-area :global(th) {
    background-color: var(--ggf-light);
    font-weight: 600;
    color: var(--ggf-primary);
  }

  .content-area :global(tr:hover) {
    background-color: rgba(43, 75, 140, 0.02);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .onboarding-container {
      padding: 1rem 0.5rem;
    }

    .onboarding-header {
      margin-bottom: 2rem;
    }

    .onboarding-title {
      font-size: 2rem;
    }

    .onboarding-subtitle {
      font-size: 1.125rem;
    }

    .section-nav {
      margin-bottom: 1.5rem;
    }

    .accordion-header {
      padding: 0.75rem 1rem;
      font-size: 0.95rem;
    }

    .nav-item {
      padding: 0.625rem 1rem;
      font-size: 0.9rem;
    }

    .subsection-item {
      padding-left: 1.5rem;
    }

    .section-content {
      padding: 1.5rem 0;
    }

    .content-area :global(h1) {
      font-size: 1.75rem;
    }

    .content-area :global(h2) {
      font-size: 1.375rem;
    }

    .content-area :global(h3) {
      font-size: 1.125rem;
    }

    .content-area :global(table) {
      font-size: 0.875rem;
    }

    .content-area :global(th),
    .content-area :global(td) {
      padding: 0.5rem 0.75rem;
    }
  }

  @media (max-width: 480px) {
    .onboarding-title {
      font-size: 1.75rem;
    }

    .onboarding-subtitle {
      font-size: 1rem;
    }

    .accordion-header {
      padding: 0.625rem 0.75rem;
    }

    .nav-item {
      padding: 0.5rem 0.75rem;
    }

    .language-fallback-notice {
      padding: 0.75rem 1rem;
    }
  }
</style>
