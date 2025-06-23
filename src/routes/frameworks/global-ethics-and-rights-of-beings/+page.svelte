<!-- src/routes/frameworks/global-ethics-and-rights-of-beings/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { invalidate } from '$app/navigation';
  import { base } from '$app/paths';
  import FrameworkSidebar from '$lib/components/FrameworkSidebar.svelte';
  import { onMount, afterUpdate, tick } from 'svelte';
  import { slide } from 'svelte/transition';

  export let data;

  // Extract globalEthicsFramework translations for shorter references
  $: gef = $t('globalEthicsFramework') || {};
  $: translationFunction = $t;
  
  // Debug logging
  $: if (browser && mounted) {
    console.log('Global Ethics Framework translations:', gef);
    console.log('Has global ethics framework keys:', Object.keys(gef));
    console.log('Data available:', !!data);
    console.log('Data has content:', data?.hasContent);
    console.log('Available sections:', data?.availableSections);
  }

  // Keep track of which section is active
  let activeSection = 'index';

  // Add support for accessibility level selection
  $: currentLevel = data?.currentLevel || 'standard';
  $: accessibilityLevels = data?.accessibilityLevels || ['visual', 'essential', 'standard', 'technical'];
  
  // This will track the current locale for our component
  $: currentLocale = $locale;

  // Check if we're in print mode - simplified to avoid hydration issues
  let isPrintMode = false;
  
  // Client-side only initialization to avoid hydration mismatches
  let mounted = false;
  let initializing = true;

  // If in print mode, we'll show all sections
  $: sectionsToShow = (mounted && isPrintMode) ? 
    (data?.availableSections?.[currentLevel] || []) : 
    [activeSection];

  // For handling accordion states
  let accordionStates = {
    'overview': true,
    'introduction': false,
    'foundational-values': false,
    'commitments-traditional': false,
    'commitments-emerging': false,
    'commitments-conflict': false,
    'governance-basic': false,
    'governance-councils': false,
    'governance-operations': false,
    'implementation-planning': false,
    'implementation-education': false,
    'implementation-cooperation': false,
    'implementation-management': false,
    'appendices': false
  };

  // Function to change the accessibility level
  function changeLevel(level) {
    if (browser) {
      window.location.href = constructLevelChangeUrl(level);
    }
  }

  // Function to construct the correct URL for changing levels
  function constructLevelChangeUrl(newLevel) {
    const basePath = `${base}/frameworks/global-ethics-and-rights-of-beings`;
    const targetSection = data?.availableSections?.[newLevel]?.includes(activeSection) 
      ? activeSection
      : findFallbackSection(newLevel);
    return `${basePath}?level=${newLevel}#${targetSection}`;
  }

  // Helper to find a fallback section when the current one isn't available
  function findFallbackSection(level) {
    const preferredSections = ['index', '0-preamble', '1-introduction'];
    
    for (const section of preferredSections) {
      if (data?.availableSections?.[level]?.includes(section)) {
        return section;
      }
    }
    
    return data?.availableSections?.[level]?.length > 0 
      ? data.availableSections[level][0] 
      : 'index';
  }

  // Initialize accordion states after mount
  function initializeAccordionStates() {
    // Set initial accordion states based on active section
    if (['index', 'access-guide'].includes(activeSection)) {
      accordionStates['overview'] = true;
    } else if (['0-preamble', 'youth-guide', '1-introduction'].includes(activeSection)) {
      accordionStates['introduction'] = true;
    } else if (activeSection.startsWith('2')) {
      accordionStates['foundational-values'] = true;
    } else if (activeSection.startsWith('3.1') || activeSection === '3-commitments') {
      accordionStates['commitments-traditional'] = true;
    } else if (activeSection.startsWith('3.2') && !activeSection.startsWith('3.3')) {
      accordionStates['commitments-emerging'] = true;
    } else if (activeSection.startsWith('3.3')) {
      accordionStates['commitments-conflict'] = true;
    } else if (['4-governance-mechanisms', '4.1-transparency', '4.2-inclusive-decision-making', '4.3-conflict-resolution'].includes(activeSection)) {
      accordionStates['governance-basic'] = true;
    } else if (activeSection.startsWith('4.4')) {
      accordionStates['governance-councils'] = true;
    } else if (activeSection.startsWith('4.5') || activeSection.startsWith('4.6') || activeSection.startsWith('4.7') || activeSection.startsWith('4.8') || activeSection.startsWith('4.9') || activeSection.startsWith('4.10')) {
      accordionStates['governance-operations'] = true;
    } else if (['5-implementation', '5.1-quick-wins', '5.1.1-cost-analysis', '5.2-phased-rollout', '5.2.1-space-ethics'].includes(activeSection)) {
      accordionStates['implementation-planning'] = true;
    } else if (activeSection.startsWith('5.3')) {
      accordionStates['implementation-education'] = true;
    } else if (activeSection.startsWith('5.4') || activeSection.startsWith('5.5') || activeSection.startsWith('5.6') || activeSection.startsWith('5.7')) {
      accordionStates['implementation-cooperation'] = true;
    } else if (activeSection.startsWith('5.8') || activeSection.startsWith('5.9') || activeSection.startsWith('5.10') || activeSection.startsWith('5.11')) {
      accordionStates['implementation-management'] = true;
    } else if (activeSection.startsWith('6')) {
      accordionStates['appendices'] = true;
    } else {
      // Default state for overview
      accordionStates['overview'] = true;
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
      
      // Check if we have any content first
      if (!data?.hasContent) {
        console.error('No content available');
        initializing = false;
        return;
      }
      
      let sectionToShow = null;
      
      if (sectionParam && data?.availableSections?.[currentLevel]?.includes(sectionParam)) {
        sectionToShow = sectionParam;
      } else if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        if (hash && data?.availableSections?.[currentLevel]?.includes(hash)) {
          sectionToShow = hash;
        }
      }
      
      // Find a fallback section if none specified or available
      if (!sectionToShow) {
        if (data?.availableSections?.[currentLevel]?.includes('index')) {
          sectionToShow = 'index';
        } else if (data?.availableSections?.[currentLevel]?.includes('1-introduction')) {
          sectionToShow = '1-introduction';
        } else if (data?.availableSections?.[currentLevel]?.length > 0) {
          sectionToShow = data.availableSections[currentLevel][0];
        } else {
          console.warn('No sections available for current level');
          sectionToShow = 'index'; // Fallback even if not available
        }
      }

      if (sectionToShow) {
        setActiveSection(sectionToShow);
      }

      // Initialize accordion states after setting active section
      initializeAccordionStates();

      // Listen for hash changes
      const handleHashChange = () => {
        const hash = window.location.hash.substring(1);
        if (hash && data?.availableSections?.[currentLevel]?.includes(hash) && activeSection !== hash) {
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
    // Check if section exists in data
    if (section && data?.sections?.[section] && data?.sections?.[section]?.[currentLevel]) {
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
    } else {
      console.warn(`Section ${section} not available at level ${currentLevel}`);
    }
  }

  // Function to fix internal links after content is loaded
  function fixInternalLinks() {
    if (browser) {
      const links = document.querySelectorAll('.section-content a');
      
      links.forEach(link => {
        const href = link.getAttribute('href');
        
        if (href && (
          href.includes('/frameworks/global-ethics-and-rights-of-beings/') ||
          href.startsWith('#')
        )) {
          if (href.includes('/frameworks/global-ethics-and-rights-of-beings/')) {
            const parts = href.split('/');
            const linkLevel = parts[parts.length - 2];
            const linkSection = parts[parts.length - 1];
            
            const newHref = `${base}/frameworks/global-ethics-and-rights-of-beings?level=${linkLevel}#${linkSection}`;
            link.setAttribute('href', newHref);
          } else if (href.startsWith('#')) {
            const targetSection = href.substring(1);
            
            if (data?.availableSections?.[currentLevel]?.includes(targetSection)) {
              const newHref = `${base}/frameworks/global-ethics-and-rights-of-beings?level=${currentLevel}#${targetSection}`;
              link.setAttribute('href', newHref);
            }
          }
        }
      });
    }
  }

  // Call the link fixing function after content updates
  afterUpdate(() => {
    setTimeout(fixInternalLinks, 100);
  });

  // Group the sections by their main category for navigation with level-aware structure
  function groupSectionsForLevel(sections, level) {
    const groups = {
      'overview': [],
      'introduction': [],
      'foundational-values': [],
      'commitments': [],
      'governance': [],
      'implementation': [],
      'appendices': []
    };
    
    sections.forEach(section => {
      if (section === 'index' || section === 'access-guide') {
        groups['overview'].push(section);
      } else if (section.startsWith('0-') || section === 'youth-guide' || section.startsWith('1-')) {
        groups['introduction'].push(section);
      } else if (section.startsWith('2')) {
        groups['foundational-values'].push(section);
      } else if (section.startsWith('3')) {
        groups['commitments'].push(section);
      } else if (section.startsWith('4')) {
        groups['governance'].push(section);
      } else if (section.startsWith('5')) {
        groups['implementation'].push(section);
      } else if (section.startsWith('6')) {
        groups['appendices'].push(section);
      }
    });
    
    // Create subcategories for complex sections
    const subcategorizedGroups = {};
    
    Object.keys(groups).forEach(group => {
      if (group === 'commitments' && groups[group].length > 0) {
        subcategorizedGroups[`${group}-traditional`] = groups[group].filter(s => 
          s.startsWith('3.1') || s === '3-commitments'
        );
        subcategorizedGroups[`${group}-emerging`] = groups[group].filter(s => 
          s.startsWith('3.2') && !s.startsWith('3.3')
        );
        subcategorizedGroups[`${group}-conflict`] = groups[group].filter(s => 
          s.startsWith('3.3')
        );
      } else if (group === 'governance' && groups[group].length > 0) {
        subcategorizedGroups[`${group}-basic`] = groups[group].filter(s => 
          ['4-governance-mechanisms', '4.1-transparency', '4.2-inclusive-decision-making', '4.3-conflict-resolution'].includes(s)
        );
        subcategorizedGroups[`${group}-councils`] = groups[group].filter(s => 
          s.startsWith('4.4')
        );
        subcategorizedGroups[`${group}-operations`] = groups[group].filter(s => 
          s.startsWith('4.5') || s.startsWith('4.6') || s.startsWith('4.7') || s.startsWith('4.8') || s.startsWith('4.9') || s.startsWith('4.10')
        );
      } else if (group === 'implementation' && groups[group].length > 0) {
        subcategorizedGroups[`${group}-planning`] = groups[group].filter(s => 
          ['5-implementation', '5.1-quick-wins', '5.1.1-cost-analysis', '5.2-phased-rollout', '5.2.1-space-ethics'].includes(s)
        );
        subcategorizedGroups[`${group}-education`] = groups[group].filter(s => 
          s.startsWith('5.3')
        );
        subcategorizedGroups[`${group}-cooperation`] = groups[group].filter(s => 
          s.startsWith('5.4') || s.startsWith('5.5') || s.startsWith('5.6') || s.startsWith('5.7')
        );
        subcategorizedGroups[`${group}-management`] = groups[group].filter(s => 
          s.startsWith('5.8') || s.startsWith('5.9') || s.startsWith('5.10') || s.startsWith('5.11')
        );
      } else {
        subcategorizedGroups[group] = groups[group];
      }
    });
    
    return subcategorizedGroups;
  }
  
  $: availableSectionsForLevel = data?.availableSections?.[currentLevel] || [];
  $: sectionGroups = groupSectionsForLevel(availableSectionsForLevel, currentLevel);
  
  // Progress calculation functions
  function getAllOrderedSections() {
    const allSections = availableSectionsForLevel;
    const ordered = [];
    
    // Add overview sections first
    if (allSections.includes('index')) ordered.push('index');
    if (allSections.includes('access-guide')) ordered.push('access-guide');
    
    // Add preamble
    if (allSections.includes('0-preamble')) ordered.push('0-preamble');
    if (allSections.includes('youth-guide')) ordered.push('youth-guide');
    
    // Add numbered sections in order
    const numberedSections = allSections
      .filter(s => s.match(/^\d+(-|\.)/))
      .sort((a, b) => {
        const aMainNum = parseInt(a.split(/[-\.]/)[0]);
        const bMainNum = parseInt(b.split(/[-\.]/)[0]);
        
        if (aMainNum !== bMainNum) {
          return aMainNum - bMainNum;
        }
        
        const aNumStr = a.match(/^[\d\.]+/)[0];
        const bNumStr = b.match(/^[\d\.]+/)[0];
        
        const aParts = aNumStr.split('.').map(n => parseInt(n) || 0);
        const bParts = bNumStr.split('.').map(n => parseInt(n) || 0);
        
        const maxLength = Math.max(aParts.length, bParts.length);
        
        for (let i = 0; i < maxLength; i++) {
          const aVal = aParts[i] || 0;
          const bVal = bParts[i] || 0;
          if (aVal !== bVal) {
            return aVal - bVal;
          }
        }
        
        return 0;
      });
    
    ordered.push(...numberedSections);
    return ordered;
  }

  // Progress indicators
  $: orderedSections = getAllOrderedSections();
  $: currentSectionIndex = orderedSections.indexOf(activeSection);
  $: totalSections = orderedSections.length;
  $: progressPercentage = currentSectionIndex >= 0 && totalSections > 0 
    ? Math.round(((currentSectionIndex + 1) / totalSections) * 100) 
    : 0;
  $: currentSectionNumber = currentSectionIndex >= 0 ? currentSectionIndex + 1 : 0;
  $: nextSection = currentSectionIndex >= 0 && currentSectionIndex < orderedSections.length - 1 
    ? orderedSections[currentSectionIndex + 1] 
    : null;
  $: previousSection = currentSectionIndex > 0 
    ? orderedSections[currentSectionIndex - 1] 
    : null;
  
  // Check if we should show progress (not for overview sections)
  $: showProgress = activeSection !== 'index' && activeSection !== 'access-guide' && !isPrintMode;

  // Translation functions using the framework translations
  function getSectionTitle(section) {
    return gef.sections?.[section] || section;
  }
  
  function getGroupTitle(group) {
    return gef.categories?.[group] || group;
  }
  
  function getLevelIcon(level) {
    const icons = {
      'visual': '🌱',
      'essential': '🌿',
      'standard': '🌲',
      'technical': '🌳'
    };
    return icons[level] || '';
  }
  
  function getLevelDescription(level) {
    return gef.accessibility?.levels?.[level] || '';
  }

  function getLocalizedText(key) {
    return gef.accessibility?.[key] || key;
  }

  // Get icon for each group
  function getGroupIcon(group) {
    const icons = {
      'overview': '🏠',
      'preamble': '📖',
      'introduction': '🌟',
      'foundational-values': '⚖️',
      'commitments-traditional': '📜',
      'commitments-emerging': '🔮',
      'commitments-conflict': '🤝',
      'governance-basic': '🏛️',
      'governance-councils': '👥',
      'governance-operations': '⚙️',
      'implementation-planning': '📋',
      'implementation-education': '🎓',
      'implementation-cooperation': '🌍',
      'implementation-management': '📊',
      'appendices': '📄'
    };
    
    return icons[group] || '📑';
  }

  // Check if group has active sections
  function hasActiveSection(group) {
    return sectionGroups[group] && sectionGroups[group].includes(activeSection);
  }

  function toggleAccordion(group) {
    accordionStates[group] = !accordionStates[group];
  }

  // Auto-open accordion if it contains the active section
  $: {
    Object.keys(sectionGroups).forEach(group => {
      if (hasActiveSection(group)) {
        accordionStates[group] = true;
      }
    });
  }

  // Check if we should show the access guide
  $: showAccessGuide = data?.accessGuide && !isPrintMode;

  // Close dropdowns when clicking outside
  function handleClickOutside(event) {
    if (browser) {
      const dropdown = document.querySelector('.level-selector .dropdown');
      
      if (dropdown && !dropdown.contains(event.target)) {
        // Handle dropdown close if needed
      }
    }
  }

  onMount(() => {
    if (browser) {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  });

  // Handle locale changes
  $: if (browser && mounted && $locale) {
    invalidate('app:locale');
  }
</script>

<svelte:head>
  <title>{gef.meta?.title || 'Global Ethics and Rights of Beings - Framework'}</title>
  <meta name="description" content="{gef.meta?.description || 'A comprehensive framework for global ethics and rights of all beings'}" />
</svelte:head>

<svelte:window on:click={handleClickOutside}/>

{#if mounted}
  <div class="documentation-container">
    {#if !isPrintMode}
      <FrameworkSidebar />
    {/if}

    <div class="content">
      {#if !isPrintMode}
        <!-- Accessibility Level Selector -->
        <div class="level-selector">
          <h3>{getLocalizedText('chooseLevel')}</h3>
          <div class="level-buttons">
            {#each accessibilityLevels as level}
              <a 
                href={constructLevelChangeUrl(level)}
                class="level-btn" 
                class:active={currentLevel === level}
              >
                <span class="level-icon">{getLevelIcon(level)}</span>
                <div class="level-content">
                  <span class="level-name">{level.charAt(0).toUpperCase() + level.slice(1)}</span>
                </div>
              </a>
            {/each}
          </div>
          <div class="level-description">
            {getLevelDescription(currentLevel)}
          </div>
        </div>

        <!-- Show Access Guide if available -->
        {#if showAccessGuide && activeSection === 'index'}
          <div class="access-guide-banner">
            <div class="banner-content">
              <div class="banner-icon">🧭</div>
              <div class="banner-text">
                <h3>{getLocalizedText('frameworkAccessGuide')}</h3>
                <p>{getLocalizedText('accessGuideDescription')}</p>
              </div>
              <div class="banner-actions">
                <button class="guide-btn" on:click={() => setActiveSection('access-guide')}>
                  {getLocalizedText('viewCompleteGuide')}
                </button>
              </div>
            </div>
          </div>
        {/if}
      {/if}

      <!-- Check for content availability first -->
      {#if data?.hasContent}
        <!-- Main navigation for framework sections -->
        {#if !isPrintMode && !initializing}
          <div class="section-nav">
            {#each Object.keys(sectionGroups) as group}
              {#if sectionGroups[group].length > 0}
                <div class="nav-accordion">
                  <button 
                    class="accordion-header" 
                    class:open={accordionStates[group]}
                    class:has-active={hasActiveSection(group)}
                    on:click={() => toggleAccordion(group)}
                  >
                    <span class="accordion-icon">{getGroupIcon(group)}</span>
                    <span class="accordion-title">{getGroupTitle(group)}</span>
                    <span class="section-count">({sectionGroups[group].length})</span>
                    <span class="toggle-arrow" class:rotated={accordionStates[group]}>▼</span>
                  </button>
                  {#if accordionStates[group]}
                    <div class="accordion-content" transition:slide={{ duration: 200 }}>
                      {#each sectionGroups[group] as section}
                        <button 
                          class="nav-item" 
                          class:active={activeSection === section}
                          on:click={() => setActiveSection(section)}
                        >
                          <span class="nav-icon">
                            {#if section.match(/^\d/)}
                              <span class="nav-number">{section.substring(0, section.indexOf('-'))}</span>
                            {:else}
                              📑
                            {/if}
                          </span>
                          <span class="nav-title">{getSectionTitle(section)}</span>
                          {#if !data.availableSections[currentLevel].includes(section)}
                            <span class="unavailable-indicator">⚠️</span>
                          {/if}
                        </button>
                      {/each}
                    </div>
                  {/if}
                </div>
              {/if}
            {/each}
          </div>
        {/if}

        <!-- Progress Indicator -->
        {#if showProgress}
          <div class="progress-indicator">
            <div class="progress-content">
              <div class="progress-info">
                <div class="progress-text">
                  <span class="progress-section">{gef.progress?.of?.replace('{current}', currentSectionNumber).replace('{total}', totalSections) || `Section ${currentSectionNumber} of ${totalSections}`}</span>
                  <span class="progress-percentage">{gef.progress?.percentage?.replace('{percentage}', progressPercentage) || `${progressPercentage}% complete`}</span>
                </div>
                <div class="progress-navigation">
                  {#if previousSection}
                    <button class="progress-nav-btn prev" on:click={() => setActiveSection(previousSection)}>
                      ← {gef.progress?.previousSection || 'Previous section'}
                    </button>
                  {/if}
                  {#if nextSection}
                    <button class="progress-nav-btn next" on:click={() => setActiveSection(nextSection)}>
                      {gef.progress?.nextSection || 'Next section'} →
                    </button>
                  {/if}
                </div>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar">
                  <div class="progress-fill" style="width: {progressPercentage}%"></div>
                  <div class="progress-marker" style="left: {progressPercentage}%"></div>
                </div>
              </div>
            </div>
          </div>
        {/if}

        <!-- Show active section, or all sections in print mode -->
        {#each sectionsToShow as section (section)}
          <!-- Better section availability checking -->
          {#if data.sections?.[section] && data.sections?.[section]?.[currentLevel]}
            <div class="section-content" id={section}>
              <!-- Language fallback notice -->
              {#if !isPrintMode && data.sectionsUsingEnglishFallback?.includes(`${section}-${currentLevel}`) && section !== 'index' && section !== 'access-guide'}
                <div class="language-fallback-notice">
                  <div class="notice-icon">🌐</div>
                  <div class="notice-content">
                    <strong>{gef.languageFallback?.title || 'Content in your language coming soon'}</strong>
                    <p>{gef.languageFallback?.description || 'This section is currently displayed in English until translation is complete.'}</p>
                  </div>
                </div>
              {/if}
              <div class="section-header">
                <h2>{getSectionTitle(section)}</h2>
                
                {#if !isPrintMode}
                  <!-- Layer navigation for this section -->
                  <div class="layer-navigation">
                    {#each accessibilityLevels as level}
                      {#if data.availableSections?.[level]?.includes(section)}
                        <a 
                          href={`${base}/frameworks/global-ethics-and-rights-of-beings?level=${level}#${section}`} 
                          class="layer-link" 
                          class:active={currentLevel === level}
                        >
                          {getLevelIcon(level)} {level}
                        </a>
                      {/if}
                    {/each}
                  </div>
                {/if}
              </div>
              
              <svelte:component this={data.sections[section][currentLevel].default} t={translationFunction} />

              <!-- Section navigation at bottom -->
              {#if showProgress && !isPrintMode}
                <div class="section-footer-navigation">
                  {#if previousSection}
                    <button class="footer-nav-btn prev" on:click={() => setActiveSection(previousSection)}>
                      <span class="nav-arrow">←</span>
                      <div class="nav-text">
                        <span class="nav-label">{gef.progress?.previousSection || 'Previous section'}</span>
                        <span class="nav-title">{getSectionTitle(previousSection)}</span>
                      </div>
                    </button>
                  {/if}
                  
                  {#if nextSection}
                    <button class="footer-nav-btn next" on:click={() => setActiveSection(nextSection)}>
                      <div class="nav-text">
                        <span class="nav-label">{gef.progress?.nextSection || 'Next section'}</span>
                        <span class="nav-title">{getSectionTitle(nextSection)}</span>
                      </div>
                      <span class="nav-arrow">→</span>
                    </button>
                  {/if}
                </div>
              {/if}
            </div>
          {:else if sectionsToShow.length === 1}
            <div class="section-unavailable">
              <h3>{getLocalizedText('sectionUnavailable')}</h3>
              <p>{getLocalizedText('notAvailableAtLevel').replace('{level}', currentLevel)}</p>
              <div class="alternative-levels">
                <p>{getLocalizedText('viewAtAnotherLevel')}</p>
                <div class="level-buttons small">
                 {#each accessibilityLevels as level}
                   {#if data.availableSections?.[level]?.includes(section)}
                     <a 
                       href={`${base}/frameworks/global-ethics-and-rights-of-beings?level=${level}#${section}`}
                       class="level-btn small"
                     >
                       <span class="level-icon">{getLevelIcon(level)}</span>
                       <div class="level-content">
                         <span class="level-name">{level}</span>
                       </div>
                     </a>
                   {/if}
                 {/each}
               </div>
             </div>
           </div>
         {/if}
       {/each}
     {:else}
       <!-- Show error message when no content is available -->
       <div class="no-content-message">
         <h2>⚠️ {gef.errors?.noContent || 'Content not available'}</h2>
         <p>{gef.errors?.contentDescription || 'No content could be loaded for this framework. This might be due to:'}</p>
         <ul>
           <li>Missing content files in the expected directory structure</li>
           <li>Incorrect file paths or naming conventions</li>
           <li>Network issues preventing content loading</li>
         </ul>
         <p>Loaded sections count: {data?.loadedSectionsCount || 0}</p>
         <p>Current level: {currentLevel}</p>
         <p>Available sections: {JSON.stringify(data?.availableSections || {})}</p>
       </div>
     {/if}
   </div>
 </div>
{:else}
 <!-- Loading state to prevent hydration issues -->
 <div class="loading-container">
   <div class="loading-spinner"></div>
   <p>{gef.loading?.text || 'Loading framework content...'}</p>
 </div>
{/if}

 <style>
  /* Ethics framework color scheme (green-based palette) */
  :root {
    --ethics-primary: #166534; /* Dark green for ethics framework */
    --ethics-secondary: #6b7280; /* Gray */
    --ethics-accent: #16a34a; /* Medium green */
    --ethics-light: #f0fdf4; /* Light green */
    --ethics-medium: #dcfce7; /* Medium light green */
    --ethics-hover: #059669; /* Darker green for hover states */
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
  }
  
  .content {
    min-width: 0;
  }
  
  /* Accessibility Level Selector */
  .level-selector {
    background: linear-gradient(135deg, var(--ethics-light) 0%, var(--ethics-medium) 100%);
    border: 1px solid var(--ethics-accent);
    border-radius: 0.75rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(22, 101, 52, 0.1);
  }
  
  .level-selector h3 {
    margin-top: 0;
    margin-bottom: 1.25rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--ethics-primary);
  }
  
  .level-buttons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
    margin-bottom: 1.25rem;
  }
  
  .level-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    border: 2px solid transparent;
    border-radius: 0.5rem;
    background: white;
    color: var(--ethics-primary);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    position: relative;
    overflow: hidden;
  }

  .level-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(22, 101, 52, 0.1), transparent);
    transition: left 0.5s ease;
  }
  
  .level-btn:hover {
    background: var(--ethics-light);
    border-color: var(--ethics-accent);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(22, 101, 52, 0.15);
  }

  .level-btn:hover::before {
    left: 100%;
  }
  
  .level-btn.active {
    background: var(--ethics-accent);
    color: white;
    border-color: var(--ethics-accent);
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(22, 101, 52, 0.25);
  }

  .level-btn.active::before {
    display: none;
  }
  
  .level-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  .level-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .level-name {
    font-size: 1rem;
    font-weight: 600;
  }
  
  .level-description {
    font-size: 0.9rem;
    color: var(--ethics-primary);
    line-height: 1.5;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 0.5rem;
    border: 1px solid rgba(22, 101, 52, 0.2);
  }

  /* Progress Indicator */
  .progress-indicator {
    background: linear-gradient(135deg, var(--ethics-light) 0%, var(--ethics-medium) 100%);
    border-radius: 0.75rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
    border: 1px solid var(--ethics-accent);
    box-shadow: 0 2px 8px rgba(22, 101, 52, 0.1);
  }

  .progress-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .progress-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .progress-text {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .progress-section {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--ethics-primary);
  }

  .progress-percentage {
    font-size: 0.9rem;
    color: var(--ethics-hover);
    font-weight: 500;
  }

  .progress-navigation {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .progress-nav-btn {
    padding: 0.5rem 1rem;
    border: 1px solid var(--ethics-accent);
    border-radius: 0.375rem;
    background: white;
    color: var(--ethics-primary);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
  }

  .progress-nav-btn:hover {
    background: var(--ethics-accent);
    color: white;
    transform: translateY(-1px);
  }

  .progress-bar-container {
    width: 100%;
  }

  .progress-bar {
    position: relative;
    width: 100%;
    height: 8px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 4px;
    overflow: visible;
    border: 1px solid rgba(22, 101, 52, 0.2);
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--ethics-accent), var(--ethics-hover));
    border-radius: 4px;
    transition: width 0.3s ease;
    position: relative;
  }

  .progress-marker {
    position: absolute;
    top: -2px;
    width: 12px;
    height: 12px;
    background: var(--ethics-primary);
    border-radius: 50%;
    transform: translateX(-50%);
    transition: left 0.3s ease;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  /* Access Guide Banner */
  .access-guide-banner {
    background: linear-gradient(135deg, var(--ethics-medium) 0%, #bbf7d0 100%);
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(34, 197, 94, 0.1);
    border: 1px solid rgba(34, 197, 94, 0.2);
  }
  
  .banner-content {
    display: flex;
    align-items: center;
    padding: 1.5rem;
    gap: 1.5rem;
  }

  .banner-icon {
    font-size: 2.5rem;
    color: var(--ethics-primary);
    flex-shrink: 0;
  }

  .banner-text {
    flex: 1;
  }
  
  .banner-content h3 {
    margin: 0 0 0.5rem 0;
    color: var(--ethics-primary);
    font-size: 1.25rem;
  }
  
  .banner-content p {
    margin: 0;
    color: #374151;
  }

  .banner-actions {
    flex-shrink: 0;
  }

  .guide-btn {
    background: var(--ethics-accent);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .guide-btn:hover {
    background: var(--ethics-hover);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  /* Section Navigation */
  .section-nav {
    margin-bottom: 2rem;
    background: linear-gradient(to bottom, #f8fafc, #f1f5f9);
    border-radius: 0.75rem;
    padding: 1.25rem;
    border: 1px solid #e5e7eb;
  }

  .nav-accordion {
    margin-bottom: 0.75rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    overflow: hidden;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  .accordion-header {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1.25rem;
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
    background-color: rgba(22, 101, 52, 0.05);
  }

  .accordion-header.has-active {
    background-color: rgba(22, 101, 52, 0.1);
    color: var(--ethics-primary);
    font-weight: 600;
  }

  .accordion-header.open {
    background-color: rgba(22, 101, 52, 0.1);
    border-bottom: 1px solid #e5e7eb;
  }

  .accordion-icon {
    font-size: 1.2rem;
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
    background: #f3f4f6;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
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
    padding: 0.75rem 1.25rem;
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
    background-color: rgba(22, 101, 52, 0.05);
    color: #374151;
  }

  .nav-item.active {
    background-color: var(--ethics-primary);
    color: white;
    font-weight: 600;
  }

  .nav-item.active:hover {
    background-color: var(--ethics-accent);
  }

  .nav-icon {
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  .nav-number {
    font-size: 0.8rem;
    background-color: rgba(22, 101, 52, 0.1);
    color: var(--ethics-primary);
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

  .unavailable-indicator {
    font-size: 0.8rem;
    opacity: 0.6;
  }
  
  /* Section Content */
  .section-content {
    padding-top: 1rem;
    margin-bottom: 3rem;
    scroll-margin-top: 2rem;
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .section-header h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--ethics-primary);
    margin: 0;
  }
  
  .layer-navigation {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .layer-link {
    padding: 0.375rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.8rem;
    color: var(--ethics-primary);
    text-decoration: none;
    background-color: var(--ethics-light);
    transition: all 0.2s;
    border: 1px solid transparent;
  }
  
  .layer-link:hover {
    background-color: var(--ethics-medium);
    border-color: var(--ethics-accent);
  }
  
  .layer-link.active {
    background-color: var(--ethics-accent);
    color: white;
    border-color: var(--ethics-accent);
  }

  /* Section Footer Navigation */
  .section-footer-navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid #e5e7eb;
    gap: 1rem;
  }

  .footer-nav-btn {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    border: 2px solid var(--ethics-accent);
    border-radius: 0.5rem;
    background: white;
    color: var(--ethics-primary);
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    max-width: 300px;
    flex: 1;
  }

  .footer-nav-btn.prev {
    justify-content: flex-start;
  }

  .footer-nav-btn.next {
    justify-content: flex-end;
    margin-left: auto;
  }

  .footer-nav-btn:hover {
    background: var(--ethics-accent);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(22, 101, 52, 0.2);
  }

  .nav-arrow {
    font-size: 1.25rem;
    font-weight: bold;
  }

  .nav-text {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .footer-nav-btn.next .nav-text {
    text-align: right;
  }

  .nav-label {
    font-size: 0.8rem;
    font-weight: 500;
    opacity: 0.8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .nav-title {
    font-size: 0.9rem;
    font-weight: 600;
    margin-top: 0.25rem;
  }
  
  /* Section Unavailable Message */
  .section-unavailable {
    padding: 2rem;
    background-color: #f9fafb;
    border-radius: 0.75rem;
    text-align: center;
    margin: 2rem 0;
    border: 1px solid #e5e7eb;
  }

  .section-unavailable h3 {
    color: var(--ethics-primary);
    margin-bottom: 1rem;
  }
  
  .section-unavailable p {
    font-size: 1.125rem;
    color: #4b5563;
    margin-bottom: 1.5rem;
  }
  
  .alternative-levels {
    max-width: 500px;
    margin: 0 auto;
  }
  
  .level-buttons.small {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 0.75rem;
    justify-content: center;
  }
  
  .level-btn.small {
    font-size: 0.875rem;
    padding: 0.5rem 0.75rem;
  }

  .level-btn.small .level-content {
    align-items: center;
  }

  .level-btn.small .level-name {
    font-size: 0.875rem;
  }
  
  /* Markdown Content Styling */
  .content :global(h1) {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--ethics-primary);
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--ethics-primary);
  }
  
  .content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--ethics-primary);
  }
  
  .content :global(h4) {
    font-size: 1.125rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--ethics-primary);
  }
  
  .content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #374151;
  }
  
  .content :global(ul), .content :global(ol) {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
    color: #374151;
  }
  
  .content :global(li) {
    margin-bottom: 0.5rem;
  }

  .content :global(blockquote) {
    background-color: var(--ethics-light);
    border-left: 4px solid var(--ethics-accent);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
  }
  
  .content :global(a) {
    color: var(--ethics-accent);
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s;
    border-bottom: 1px solid transparent;
  }
  
  .content :global(a:hover) {
    color: var(--ethics-hover);
    border-bottom-color: var(--ethics-hover);
  }
  
  /* Table styles */
  .content :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    font-size: 0.95rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border-radius: 0.5rem;
    overflow: hidden;
  }
  
  .content :global(thead) {
    background: linear-gradient(to right, var(--ethics-primary), var(--ethics-accent));
  }

  .content :global(th) {
    padding: 0.75rem 1rem;
    color: white;
    font-weight: 600;
    text-align: left;
  }
  
  .content :global(td) {
    padding: 0.75rem 1rem;
    border: 1px solid #e5e7eb;
    border-left: none;
    border-right: none;
    vertical-align: top;
  }
  
  .content :global(tr:nth-child(odd)) {
    background-color: #f8f9fa;
  }
  
  .content :global(tr:nth-child(even)) {
    background-color: #ffffff;
  }
  
  .content :global(tr:hover) {
    background-color: var(--ethics-light);
  }
  
  /* Custom bullet points for unordered lists */
  .content :global(ul) {
    list-style-type: none;
  }
  
  .content :global(ul li) {
    position: relative;
    padding-left: 1.5rem;
  }
  
  .content :global(ul li::before) {
    content: "✧";
    position: absolute;
    left: 0;
    color: var(--ethics-accent);
    font-size: 0.9rem;
  }
  
  .content :global(ul ul li::before) {
    content: "⋄";
    color: #22c55e;
  }
    
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .section-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
    
    .layer-navigation {
      width: 100%;
      justify-content: flex-start;
    }
    
    .level-buttons {
      grid-template-columns: 1fr;
    }

    .banner-content {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    .banner-actions {
      width: 100%;
    }

    .guide-btn {
      width: 100%;
      text-align: center;
    }

    .section-nav {
      padding: 1rem;
    }

    .accordion-header {
      padding: 0.75rem 1rem;
      font-size: 0.9rem;
    }

    .nav-item {
      padding: 0.625rem 1rem;
      font-size: 0.85rem;
    }

    .progress-info {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;
    }

    .progress-navigation {
      flex-direction: column;
      width: 100%;
    }

    .progress-nav-btn {
      width: 100%;
      text-align: center;
    }

    .section-footer-navigation {
      flex-direction: column;
    }

    .footer-nav-btn {
      max-width: none;
      justify-content: center;
    }

    .footer-nav-btn.next {
      margin-left: 0;
    }

    .footer-nav-btn .nav-text {
      text-align: center;
    }
  }
  
  @media (max-width: 480px) {
    .level-btn {
      flex-direction: column;
      text-align: center;
      gap: 0.5rem;
    }

    .level-content {
      align-items: center;
    }

    .banner-content {
      padding: 1.25rem;
    }

    .banner-icon {
      font-size: 2rem;
    }

    .banner-text h3 {
      font-size: 1.1rem;
    }

    .banner-text p {
      font-size: 0.9rem;
    }

    .progress-indicator {
      padding: 1rem;
    }

    .progress-text {
      align-items: center;
      text-align: center;
    }

    .footer-nav-btn {
      padding: 0.75rem 1rem;
      flex-direction: column;
      gap: 0.5rem;
    }

    .nav-arrow {
      font-size: 1rem;
    }
  }
  
  /* Print mode adjustments */
  @media print {
    /* Force all content to be visible */
    body * {
      visibility: visible !important;
      opacity: 1 !important;
      display: block !important;
    }
    
    /* Hide navigation and interactive elements */
    .level-selector, .section-nav, .access-guide-banner,
    .accordion-header, .accordion-content, .nav-accordion,
    .layer-navigation, .banner-actions, .progress-indicator,
    .section-footer-navigation {
      display: none !important;
    }
    
    /* Ensure proper spacing for print */
    .section-content {
      page-break-inside: avoid;
      page-break-after: always;
      margin-bottom: 2cm !important;
    }
    
    /* Adjust header sizes for print */
    h1 { font-size: 24pt !important; }
    h2 { font-size: 18pt !important; }
    h3 { font-size: 14pt !important; }
    
    /* Ensure proper link display */
    a::after {
      content: " (" attr(href) ")";
      font-size: 80%;
      font-weight: normal;
      color: #666;
    }
  }

  /* Language fallback notice */
  .language-fallback-notice {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background-color: rgba(22, 163, 74, 0.1);
    border: 1px solid rgba(22, 163, 74, 0.3);
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
    margin-bottom: 1.5rem;
  }

  .notice-icon {
    font-size: 1.25rem;
    color: var(--ethics-accent);
    flex-shrink: 0;
    margin-top: 0.125rem;
  }

  .notice-content {
    flex: 1;
  }

  .notice-content strong {
    color: var(--ethics-accent);
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
