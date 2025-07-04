<!-- src/routes/+page.svelte - Fixed Interactive Landing Page with i18n -->
<script>
  import InfoBox from '$lib/components/InfoBox.svelte';
  import EthicalImpactDashboard from '$lib/components/EthicalImpactDashboard.svelte';
  import FrameworkConstellation from '$lib/components/FrameworkConstellation.svelte';
  import { t, locale } from '$lib/i18n';
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { allFrameworks, getFrameworksByTier, getFrameworkBySlug } from '$lib/stores/frameworkNav.js';

  // Animation states
  let isVisible = false;
  let hoveredFramework = null;
  let activeFramework = null;
  let isMobile = false;
  
  // Collapsible sections state
  let whyExistsExpanded = false;
  let languageExpanded = false;
  
  // Quiz state
  let hasCompletedQuiz = false;
  let quizResults = null;
  
  onMount(() => {
    isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
    
    // Check if user has completed the quiz
    const savedQuiz = localStorage.getItem('globalCitizenshipQuiz');
    if (savedQuiz) {
      hasCompletedQuiz = true;
      quizResults = JSON.parse(savedQuiz);
    }
    
    setTimeout(() => {
      isVisible = true;
    }, 100);
  });

  // Featured frameworks data (using frameworkNav.js with i18n)
  $: featuredFrameworks = [
    {
      ...getFrameworkBySlug('treaty-for-our-only-home'),
      tagline: $t('home.constellation.taglines.treatyforouronlyhome'),
      points: [
        $t('home.treatyFeature.point1'),
        $t('home.treatyFeature.point2'), 
        $t('home.treatyFeature.point3')
      ],
      icon: '⚖️',
      color: '#2B4B8C'
    },
    {
      ...getFrameworkBySlug('gaian-trade-framework'),
      tagline: $t('home.constellation.taglines.gaiantradeframework'),
      points: [
        $t('home.constellation.points.gaiantrade1'),
        $t('home.constellation.points.gaiantrade2'),
        $t('home.constellation.points.gaiantrade3')
      ],
      icon: '🌍',
      color: '#2D5F2D'
    },
    {
      ...getFrameworkBySlug('economic-integration'),
      tagline: $t('home.constellation.taglines.economicintegration'),
      points: [
        $t('home.constellation.points.economic1'),
        $t('home.constellation.points.economic2'), 
        $t('home.constellation.points.economic3')
      ],
      icon: '💰',
      color: '#B8860B'
    }
  ];

  // Constellation event handlers
  function handleNodeClick(event) {
    const framework = event.detail;
    if (isMobile) {
      if (activeFramework === framework.slug) {
        if (framework.path) {
          window.location.href = base + framework.path;
        }
      } else {
        activeFramework = framework.slug;
        hoveredFramework = framework.slug;
      }
    } else {
      if (framework.path) {
        window.location.href = base + framework.path;
      }
    }
  }

  function handleNodeHover(event) {
    if (!isMobile) {
      hoveredFramework = event.detail.slug;
    }
  }

  function handleNodeLeave() {
    if (!isMobile) {
      hoveredFramework = null;
    }
  }

  function handleBackgroundClick() {
    if (isMobile) {
      activeFramework = null;
      hoveredFramework = null;
    }
  }

  // Toggle functions for collapsible sections
  function toggleWhyExists() {
    whyExistsExpanded = !whyExistsExpanded;
  }

  function toggleLanguage() {
    languageExpanded = !languageExpanded;
  }

  // Get current hovered framework data for the description panel
  $: currentHoveredFramework = hoveredFramework ? 
    [...getFrameworksByTier(0), ...getFrameworksByTier(1), ...getFrameworksByTier(2), ...getFrameworksByTier(3), ...getFrameworksByTier(4)]
      .find(f => f.slug === hoveredFramework) : null;

  // Get framework description with i18n
  function getFrameworkDescription(slug) {
    const translationKey = `home.constellation.descriptions.${slug.replace(/-/g, '')}`;
    const description = $t(translationKey);
    return description || $t('common.fallback.frameworkDescription');
  }

  // Get framework tagline with i18n
  function getFrameworkTagline(slug) {
    const translationKey = `home.constellation.taglines.${slug.replace(/-/g, '')}`;
    const tagline = $t(translationKey);
    return tagline !== translationKey ? tagline : null; // Return null if no tagline exists
  }
</script>

<svelte:head>
  <title>{$t('home.title')}</title>
  <meta name="description" content="{$t('home.subtitle')}" />
</svelte:head>

<!-- Collapsible Info Boxes Section -->
<section class="info-boxes-section">
  <div class="container">
    
    <!-- Why This Exists - Collapsible -->
    <div class="collapsible-info-box">
      <button 
        class="info-box-header why-exists-header"
        on:click={toggleWhyExists}
        aria-expanded={whyExistsExpanded}
      >
        <div class="header-content">
          <span class="icon">💡</span>
          <h3>{$t('home.whyExists.title')}</h3>
        </div>
        <span class="toggle-icon" class:rotated={whyExistsExpanded}>▼</span>
      </button>
      
      {#if whyExistsExpanded}
        <div class="info-box-content why-exists-content">
          <p>{$t('home.whyExists.paragraph1')}</p>
          <p>{$t('home.whyExists.paragraph2')}</p>
          <p>
            {$t('home.whyExists.paragraph3')} 
            <a href="{base}/start-treaty/" class="treaty-link">
              '{$t('home.treatyFeature.heading').split(': ')[1]}'
            </a> 
            {$t('home.whyExists.paragraph3b')}
          </p>
          <p>{$t('home.whyExists.paragraph4')}</p>
        </div>
      {/if}
    </div>

    <!-- Language Statement - Collapsible -->
    <div class="collapsible-info-box">
      <button 
        class="info-box-header language-header"
        on:click={toggleLanguage}
        aria-expanded={languageExpanded}
      >
        <div class="header-content">
          <span class="icon">🌐</span>
          <h3>{$t('home.languageStatement.title')}</h3>
        </div>
        <span class="toggle-icon" class:rotated={languageExpanded}>▼</span>
      </button>
            
      {#if languageExpanded}
        <div class="info-box-content language-content">
          <p>
            {$t('home.languageStatement.paragraph1')} 
            <a href="{base}/start-treaty/" class="treaty-link-alt">
              '{$t('home.treatyFeature.heading').split(': ')[1]}'
            </a> 
            {$t('home.languageStatement.paragraph1b')}
          </p>
          <p>{$t('home.languageStatement.paragraph2')}</p>
          <p>{$t('home.languageStatement.paragraph3')}</p>
          <div class="button-center">
            <a href="{base}/get-involved/translations" class="translation-button">
              {$t('home.languageStatement.button')}
            </a>
          </div>
        </div>
      {/if}
    </div>

  </div>
</section>

<!-- Interactive Hero Section with Framework Constellation -->
<section class="hero-section">
  <div class="hero-container">
    
    <!-- Hero Content -->
    <div class="hero-content">
      <img src="{base}/logo.svg" alt="{$t('home.title')} Logo" class="hero-logo">
      
      <h1 class="hero-title">{$t('home.title')}</h1>
      <p class="hero-subtitle">{$t('home.intro.heading')}</p>
      <p class="hero-tagline">{$t('home.intro.text')}</p>
    </div>

    <!-- Constellation Layout: Legend + Chart + Info Panel -->
    <div class="constellation-layout">
      
      <!-- Left Column: Legend + Explore Button -->
      <div class="left-column">
        <!-- Tier Legend -->
        <div class="tier-legend">
          <h3 class="legend-title">{$t('common.ui.frameworkTiers') || 'Framework Tiers'}</h3>
          <div class="legend-item">
            <div class="legend-dot tier-0-dot"></div>
            <div class="legend-content">
              <div class="legend-name tier-0-text">{$t('framework.tier.0.title') || 'Tier 0: Global Institutional Reform'}</div>
            </div>
          </div>
          <div class="legend-item">
            <div class="legend-dot tier-1-dot"></div>
            <div class="legend-content">
              <div class="legend-name tier-1-text">{$t('framework.tier.1.title') || 'Tier 1: Urgent Global Stability & Justice'}</div>
            </div>
          </div>
          <div class="legend-item">
            <div class="legend-dot tier-2-dot"></div>
            <div class="legend-content">
              <div class="legend-name tier-2-text">{$t('framework.tier.2.title') || 'Tier 2: Systems for Long-Term Thriving'}</div>
            </div>
          </div>
          <div class="legend-item">
            <div class="legend-dot tier-3-dot"></div>
            <div class="legend-content">
              <div class="legend-name tier-3-text">{$t('framework.tier.3.title') || 'Tier 3: Equity, Culture & Future Generations'}</div>
            </div>
          </div>
          <div class="legend-item">
            <div class="legend-dot tier-4-dot"></div>
            <div class="legend-content">
              <div class="legend-name tier-4-text">{$t('framework.tier.4.title') || 'Tier 4: Visionary & Meta Governance'}</div>
            </div>
          </div>
        </div>

        <!-- Explore Button -->
        <div class="explore-button-container">
          <a href="{base}/frameworks" class="explore-button">
            {$t('home.cta') || 'Explore the Frameworks'}
          </a>
        </div>
      </div>

      <!-- Right Column: Interactive Framework Constellation -->
      <div class="constellation-column">
        <FrameworkConstellation 
          {hoveredFramework} 
          {activeFramework} 
          {isMobile}
          on:nodeClick={handleNodeClick}
          on:nodeHover={handleNodeHover}
          on:nodeLeave={handleNodeLeave}
          on:backgroundClick={handleBackgroundClick}
        />
      </div>

    </div>

    <!-- Wide Description Panel - Below the constellation -->
    {#if currentHoveredFramework}
      <div class="wide-description-panel">
        <!-- Show golden tagline with click instruction if available -->
        {#if getFrameworkTagline(currentHoveredFramework.slug.replace(/-/g, ''))}
          <p class="framework-tagline">
            {getFrameworkTagline(currentHoveredFramework.slug.replace(/-/g, ''))}
            <span class="click-instruction-inline">
              ({$t('common.ui.clickToVisit') || 'click to visit'})
            </span>
          </p>
        {:else}
          <!-- If no tagline, show click instruction as the tagline -->
          <p class="framework-tagline click-instruction-only">
            {$t('common.ui.clickOnTheNode') || 'Click on the node to visit the framework'}
          </p>
        {/if}
        <div class="description-content">
          <p class="framework-description">{getFrameworkDescription(currentHoveredFramework.slug.replace(/-/g, ''))}</p>
          
          {#if isMobile && activeFramework === currentHoveredFramework.slug}
            <p class="mobile-hint">👆 {$t('common.ui.tapAgainToExplore') || 'Tap again to explore this framework'}</p>
          {/if}
        </div>
      </div>
    {:else}
      <div class="wide-description-placeholder">
        <p>{$t('common.ui.hoverToExplore') || 'Hover to explore frameworks'}</p>
      </div>
    {/if}

  </div>
</section>

<!-- Featured Frameworks Section -->
<section class="featured-section">
  <div class="container">
    <h2 class="featured-title">{$t('home.features.heading')}</h2>
    <p class="featured-subtitle">{$t('home.treatyFeature.lead')}</p>
    
    <div class="featured-grid">
      {#each featuredFrameworks as framework}
        <div class="featured-card" style="border-top-color: {framework.color};">
          
          <!-- Framework Icon -->
          <div class="card-header">
            <div class="card-icon" style="background-color: {framework.color}20;">
              {framework.icon}
            </div>
            <div class="card-header-text">
              <h3 class="card-title" style="color: {framework.color};">
                {$t(framework.titleKey)}
              </h3>
              <p class="card-tagline">{framework.tagline}</p>
            </div>
          </div>
          
          <!-- Framework Points -->
          <div class="card-points">
            {#each framework.points as point}
              <div class="point-item">
                <span class="point-check" style="color: {framework.color};">✓</span>
                <span class="point-text">{point}</span>
              </div>
            {/each}
          </div>
          
          <!-- Learn More Button -->
          <a href="{base}{framework.path}" class="card-button" style="background-color: {framework.color};">
            {$t('home.overview.learnMore')}
          </a>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Enhanced Global Citizenship Section -->
<section class="citizenship-section">
  <div class="container">
    <div class="citizenship-layout">
      
      <!-- Content Column -->
      <div class="citizenship-content">
        <h2 class="citizenship-title">{$t('home.globalCitizenship.title')}</h2>
        <p class="citizenship-lead">{$t('home.globalCitizenship.lead')}</p>
        
        <!-- Quick Quiz Starter or Results -->
        <div class="quick-quiz-starter">
          {#if !hasCompletedQuiz}
            <h3 class="quiz-starter-title">{$t('home.globalCitizenship.quickStart.title', 'Start Your Global Citizenship Journey')}</h3>
            <p class="quiz-starter-subtitle">{$t('home.globalCitizenship.quickStart.subtitle', 'Answer a quick question to discover your personalized path')}</p>
            
            <div class="quiz-question-preview">
              <h4 class="question-text">{$t('globalCitizenship.quiz.questions.values.question', 'What global challenges matter most to you?')}</h4>
              
              <div class="quiz-options-grid">
                <a href="{base}/frameworks/global-citizenship?start=climate" class="quiz-option climate">
                  <div class="option-icon">🌍</div>
                  <div class="option-content">
                    <h5>{$t('globalCitizenship.quiz.questions.values.options.climate.title', 'Climate & Environment')}</h5>
                    <p>{$t('globalCitizenship.quiz.questions.values.options.climate.description', 'Protecting our planet and building sustainable systems')}</p>
                  </div>
                </a>
                
                <a href="{base}/frameworks/global-citizenship?start=justice" class="quiz-option justice">
                  <div class="option-icon">⚖️</div>
                  <div class="option-content">
                    <h5>{$t('globalCitizenship.quiz.questions.values.options.justice.title', 'Justice & Equality')}</h5>
                    <p>{$t('globalCitizenship.quiz.questions.values.options.justice.description', 'Fighting for fairness and human rights globally')}</p>
                  </div>
                </a>
                
                <a href="{base}/frameworks/global-citizenship?start=technology" class="quiz-option technology">
                  <div class="option-icon">⚡</div>
                  <div class="option-content">
                    <h5>{$t('globalCitizenship.quiz.questions.values.options.technology.title', 'Technology & Innovation')}</h5>
                    <p>{$t('globalCitizenship.quiz.questions.values.options.technology.description', 'Using technology to solve global challenges')}</p>
                  </div>
                </a>
                
                <a href="{base}/frameworks/global-citizenship?start=community" class="quiz-option community">
                  <div class="option-icon">🤝</div>
                  <div class="option-content">
                    <h5>{$t('globalCitizenship.quiz.questions.values.options.community.title', 'Community & Culture')}</h5>
                    <p>{$t('globalCitizenship.quiz.questions.values.options.community.description', 'Building strong communities and preserving culture')}</p>
                  </div>
                </a>
                
                <a href="{base}/frameworks/global-citizenship?start=systems" class="quiz-option systems highlighted">
                  <div class="option-icon">🏛️</div>
                  <div class="option-content">
                    <h5>{$t('globalCitizenship.quiz.questions.values.options.systems.title', 'Systems Thinking')}</h5>
                    <p>{$t('globalCitizenship.quiz.questions.values.options.systems.description', 'Understanding how everything connects globally')}</p>
                  </div>
                  <div class="highlight-badge">
                    ⭐ {$t('globalCitizenship.quiz.foundationBadge', 'Foundation')}
                  </div>
                </a>
              </div>
              
              <div class="quiz-starter-footer">
                <p class="quiz-progress-text">{$t('home.globalCitizenship.quickStart.progressText', 'This is question 1 of 3 - takes less than 2 minutes')}</p>
                <a href="{base}/frameworks/global-citizenship" class="alternative-link">
                  {$t('home.globalCitizenship.quickStart.alternativeLink', 'Or explore the full framework →')}
                </a>
              </div>
            </div>
          {:else}
            <!-- Quiz Completed State -->
            <div class="quiz-completed-state">
              <div class="completed-header">
                <div class="completed-icon">🎯</div>
                <h3 class="completed-title">{$t('home.globalCitizenship.completed.title', 'Your Global Citizenship Path')}</h3>
                <p class="completed-subtitle">{$t('home.globalCitizenship.completed.subtitle', 'You\'ve discovered your personalized framework recommendations')}</p>
              </div>
              
              {#if quizResults?.recommendedFrameworks?.length > 0}
                <div class="top-recommendations">
                  <h4 class="recommendations-title">{$t('home.globalCitizenship.completed.topRecommendations', 'Your Top Recommendations:')}</h4>
                  <div class="recommendation-chips">
                    {#each quizResults.recommendedFrameworks.slice(0, 3) as framework}
                      <div class="recommendation-chip">
                        <span class="chip-icon">{framework.emoji || '📋'}</span>
                        <span class="chip-title">{$t(framework.titleKey, framework.slug?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '))}</span>
                      </div>
                    {/each}
                  </div>
                </div>
              {/if}
              
              <div class="completed-actions">
                <a href="{base}/frameworks/global-citizenship" class="view-results-button">
                  {$t('home.globalCitizenship.completed.viewResults', 'View Full Results')} →
                </a>
                <button 
                  class="retake-quiz-button" 
                  on:click={() => {
                    localStorage.removeItem('globalCitizenshipQuiz');
                    hasCompletedQuiz = false;
                    quizResults = null;
                  }}
                >
                  {$t('home.globalCitizenship.completed.retakeQuiz', 'Retake Quiz')}
                </button>
              </div>
            </div>
          {/if}
        </div>

        <p class="citizenship-description">{$t('home.globalCitizenship.description')}</p>
      </div>
      
      <!-- Visual Column -->
      <div class="citizenship-visual">
        <img src="{base}/images/new-global-citizenship-experience.png" alt="{$t('home.globalCitizenship.title')}" class="citizenship-image">
      </div>
      
    </div>
  </div>
</section>

<!-- Emerging Global Possibilities Section -->
<section class="possibilities-section">
  <div class="container">
    <div class="possibilities-header">
      <h2 class="possibilities-title">{$t('home.emergingPossibilities.heading')}</h2>
      <p class="possibilities-intro">{$t('home.emergingPossibilities.intro')}</p>
    </div>
    
    <div class="possibilities-grid">
      {#if $t('home.emergingPossibilities.possibilities')}
        {#each Array.isArray($t('home.emergingPossibilities.possibilities')) ? $t('home.emergingPossibilities.possibilities') : [] as possibility, i}
          <div class="possibility-card">
            <div class="possibility-content">
              <div class="possibility-icon possibility-icon-{i}">
                {#if i === 0}
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon-svg blue-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                {:else if i === 1}
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon-svg green-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                {:else if i === 2}
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon-svg orange-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                {:else}
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon-svg purple-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                {/if}
              </div>
              <div class="possibility-text">
                <h3 class="possibility-heading">{possibility.title}</h3>
                <p class="possibility-description">{possibility.description}</p>
              </div>
            </div>
          </div>
        {/each}
      {:else}
        <div class="loading-state">
          <p>{$t('common.ui.loading')}...</p>
        </div>
      {/if}
    </div>
  </div>
</section>

<!-- Additional Info Section -->
<section class="additional-info-section">
  <div class="container">
    <div class="info-content">
      <h2 class="info-title">{$t('home.additionalInfo.heading')}</h2>
      <p class="info-paragraph">{$t('home.additionalInfo.paragraph1')}</p>
      <p class="info-paragraph">{$t('home.additionalInfo.paragraph2')}</p>
      <ul class="info-list">
        {#each $t('home.additionalInfo.listItems') as item}
          <li class="info-list-item">{item}</li>
        {/each}
      </ul>
      <p class="info-paragraph">{$t('home.additionalInfo.paragraph3')}</p>
    </div>
  </div>
</section>

<!-- Performance Teaser Section -->
<section class="performance-section">
  <div class="performance-container">
    <h2 class="performance-title">{$t('home.performanceTeaser.heading')}</h2>
    <p class="performance-text">{$t('home.performanceTeaser.text')}</p>

    <a href="{base}/frameworks-performance" class="performance-button">
      {$t('home.performanceTeaser.button')}
    </a>
  </div>
</section>

<!-- Call to Action Section -->
<section class="final-cta-section">
  <div class="container">
    <div class="final-cta-content">
      <h2 class="final-cta-title">{$t('home.callToAction.heading')}</h2>
      <p class="final-cta-text">{$t('home.callToAction.text')}</p>
      <div class="final-cta-buttons">
        <a href="{base}/frameworks" class="primary-cta-button">
          {$t('home.callToAction.primaryButton')}
        </a>
        <a href="{base}/contact" class="secondary-cta-button">
          {$t('home.callToAction.secondaryButton')}
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  /* Base Styles */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .hero-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  /* Info Boxes Section */
  .info-boxes-section {
    padding: 2rem 0;
    background-color: #f8fafc;
  }

  .collapsible-info-box {
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: white;
    border: 1px solid #e5e7eb;
    margin-bottom: 1rem;
  }

  .info-box-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
  }

  .info-box-header:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }

  .why-exists-header {
    background-color: #eff6ff;
    border-bottom: 1px solid #dbeafe;
  }

  .why-exists-header:hover {
    background-color: #eef5ff;
  }

  .language-header {
    background-color: #fffbeb;
    border-bottom: 1px solid #fef3c7;
  }

  .language-header:hover {
    background-color: #fffaeb;
  }

  .header-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .header-content .icon {
    font-size: 1.25rem;
    flex-shrink: 0;
  }

  .header-content h3 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: #374151;
  }

  .why-exists-header h3 {
    color: #1e40af;
  }

  .language-header h3 {
    color: #92400e;
  }

  .toggle-icon {
    font-size: 0.875rem;
    color: #6b7280;
    transition: transform 0.2s ease;
    flex-shrink: 0;
  }

  .toggle-icon.rotated {
    transform: rotate(180deg);
  }

  .info-box-content {
    padding: 1.5rem;
    border-top: 1px solid #e5e7eb;
    animation: slideDown 0.3s ease-out;
  }

  .why-exists-content {
    background-color: #eff6ff;
    border-top-color: #dbeafe;
  }

  .language-content {
    background-color: #fffbeb;
    border-top-color: #fef3c7;
  }

  .info-box-content p {
    margin-bottom: 1rem;
    color: #374151;
    line-height: 1.6;
  }

  .info-box-content p:last-child {
    margin-bottom: 0;
  }

  .treaty-link {
    color: #1e40af !important;
    text-decoration: underline !important;
    font-weight: 500 !important;
  }

  .treaty-link-alt {
    color: #92400e !important;
    text-decoration: underline !important;
    font-weight: 500 !important;
  }

  .button-center {
    text-align: center;
    margin-top: 1.5rem;
  }

  .translation-button {
    display: inline-block;
    background-color: #B8860B;
    color: white;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: all 0.2s;
  }

  /* Hero Section */
  .hero-section {
    padding: 4rem 0;
    background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e40af 100%);
    color: white;
    min-height: 850px; /* Increased from 700px to accommodate the description panel */
  }

  .hero-content {
    text-align: center;
    margin-bottom: 3rem;
  }

  .hero-logo {
    height: 100px;
    width: 100px;
    margin: 0 auto 2rem auto;
    opacity: 0.9;
  }

  .hero-title {
    font-size: 2.5rem;
    line-height: 1.2;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .hero-subtitle {
    font-size: 1.5rem;
    color: #ddd6fe;
    margin-bottom: 1rem;
    font-weight: 300;
  }

  .hero-tagline {
    font-size: 1.8rem;
    color: #fbbf24;
    margin-bottom: 2rem;
    font-weight: 600;
  }

  /* Constellation Layout */
  .constellation-layout {
    display: flex;
    gap: 2rem;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .left-column {
    min-width: 300px;
    flex: 0 0 320px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .constellation-column {
    flex: 1;
    min-width: 600px;
  }

  .tier-legend {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    padding: 1.5rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .legend-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #e2e8f0;
  }

  .legend-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 1rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
  }

  .legend-item:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  .legend-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 0.1rem;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  }

  .tier-0-dot { background-color: #fbbf24; }
  .tier-1-dot { background-color: #60a5fa; }
  .tier-2-dot { background-color: #34d399; }
  .tier-3-dot { background-color: #a78bfa; }
  .tier-4-dot { background-color: #f472b6; }

  .legend-content {
    flex: 1;
  }

  .legend-name {
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
    line-height: 1.2;
  }

  .tier-0-text { color: #fbbf24 !important; }
  .tier-1-text { color: #60a5fa !important; }
  .tier-2-text { color: #34d399 !important; }
  .tier-3-text { color: #a78bfa !important; }
  .tier-4-text { color: #f472b6 !important; }

  .legend-description {
    font-size: 0.8rem;
    color: #cbd5e1 !important;
    line-height: 1.3;
  }

  /* Explore Button Container - Fixed styling */
  .explore-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .explore-button {
    display: inline-block;
    background-color: #fbbf24;
    color: #1e1b4b;
    font-weight: 700;
    padding: 1rem 2rem;
    border-radius: 0.75rem;
    text-decoration: none;
    box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
    transition: all 0.3s ease;
    font-size: 1.1rem;
    text-align: center;
    min-width: 200px;
    border: 2px solid #fbbf24;
  }

  .explore-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(251, 191, 36, 0.4);
    background-color: #f59e0b;
    border-color: #f59e0b;
  }

  .explore-button:active {
    transform: translateY(0);
    box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
  }

  /* Wide Description Panel - Subtle transparent design */
  .wide-description-panel {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%);
    color: white;
    padding: 2rem;
    border-radius: 1rem;
    backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    margin-top: 2rem;
    transition: all 0.3s ease-out;
    max-width: 100%;
    min-height: 140px; /* Ensures consistent height */
  }

  .wide-description-placeholder {
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.6);
    padding: 2rem;
    border-radius: 1rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    text-align: center;
    margin-top: 2rem;
    font-style: italic;
    min-height: 140px; /* Same height as the description panel */
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease-out;
  }

  .wide-description-placeholder p {
    margin: 0;
    font-size: 1.1rem;
  }

  .description-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .framework-tagline {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: #fbbf24;
    font-style: italic;
    line-height: 1.4;
    text-align: center;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(251, 191, 36, 0.4);
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    transition: color 0.3s ease;
  }

  .framework-description {
    margin: 0;
    font-size: 1.1rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.95);
    text-align: left;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    transition: color 0.3s ease;
  }

  /* Click instruction styling */
  .click-instruction {
    margin-top: 1.5rem;
    padding: 1rem;
    background: rgba(251, 191, 36, 0.1);
    border: 1px solid rgba(251, 191, 36, 0.3);
    border-radius: 0.5rem;
    text-align: center;
  }

  .instruction-text {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 1rem;
    color: #fbbf24;
    font-weight: 600;
  }

  .instruction-icon {
    font-size: 1.2rem;
    animation: gentle-pulse 2s ease-in-out infinite;
  }

  @keyframes gentle-pulse {
    0%, 100% { 
      transform: scale(1);
      opacity: 1;
    }
    50% { 
      transform: scale(1.1);
      opacity: 0.8;
    }
  }

  .mobile-hint {
    margin-top: 1rem !important;
    font-size: 0.9rem !important;
    color: #fbbf24 !important;
    font-style: italic;
    text-align: center;
    padding: 0.75rem;
    background: rgba(251, 191, 36, 0.15);
    border-radius: 0.5rem;
    border: 1px solid rgba(251, 191, 36, 0.3);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }

  /* Featured Section */
  .featured-section {
    padding: 4rem 0;
    background-color: #f9fafb;
  }

  .featured-title {
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    color: #1f2937;
    margin-bottom: 1rem;
  }

  .featured-subtitle {
    font-size: 1.25rem;
    text-align: center;
    color: #6b7280;
    max-width: 800px;
    margin: 0 auto 4rem auto;
  }

  .featured-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
  }

  .featured-card {
    background-color: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    border-top: 4px solid;
    transition: all 0.3s;
    position: relative;
  }

  .card-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .card-icon {
    font-size: 2.5rem;
    margin-right: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
  }

  .card-header-text {
    flex: 1;
  }

  .card-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .card-tagline {
    font-size: 1rem;
    color: #4b5563;
    font-weight: 500;
    margin: 0;
  }

  .card-points {
    margin-bottom: 2rem;
  }

  .point-item {
    display: flex;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .point-check {
    font-size: 1.2rem;
    margin-right: 0.75rem;
  }

  .point-text {
    color: #374151;
  }

  .card-button {
    display: inline-block;
    color: white;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    transition: all 0.2s;
  }

  /* Quiz Completed State */
  .quiz-completed-state {
    background: white;
    border-radius: 0.75rem;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    text-align: center;
  }

  .completed-header {
    margin-bottom: 1.5rem;
  }

  .completed-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .completed-title {
    font-size: 1.375rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .completed-subtitle {
    font-size: 1rem;
    color: #6b7280;
    margin: 0;
  }

  .top-recommendations {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
    border-radius: 0.75rem;
    border: 1px solid #bbf7d0;
  }

  .recommendations-title {
    font-size: 1rem;
    font-weight: 600;
    color: #166534;
    margin-bottom: 1rem;
  }

  .recommendation-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: center;
  }

  .recommendation-chip {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: white;
    border: 1px solid #16a34a;
    border-radius: 1.5rem;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #166534;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .chip-icon {
    font-size: 1rem;
  }

  .chip-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
  }

  .completed-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .view-results-button {
    background: #2563eb;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .view-results-button:hover {
    background: #1d4ed8;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
  }

  .retake-quiz-button {
    background: transparent;
    color: #6b7280;
    border: 2px solid #e5e7eb;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .retake-quiz-button:hover {
    border-color: #d1d5db;
    color: #374151;
    background: #f9fafb;
  }

  /* Quick Quiz Starter */
  .quick-quiz-starter {
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    border-radius: 1rem;
    padding: 2rem;
    margin: 2rem 0;
    border: 2px solid rgba(59, 130, 246, 0.2);
  }

  .quiz-starter-title {
    font-size: 1.375rem;
    font-weight: 600;
    color: #1e40af;
    margin-bottom: 0.5rem;
    text-align: center;
  }

  .quiz-starter-subtitle {
    font-size: 1rem;
    color: #1e40af;
    text-align: center;
    margin-bottom: 1.5rem;
    opacity: 0.8;
  }

  .quiz-question-preview {
    background: white;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  .question-text {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1f2937;
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .quiz-options-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .quiz-option {
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 0.75rem;
    padding: 1rem;
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
    position: relative;
    display: block;
  }

  .quiz-option:hover {
    border-color: #3b82f6;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
  }

  .quiz-option.highlighted {
    border-color: #fbbf24;
    background: linear-gradient(135deg, #fef7ed 0%, #fdf2e9 100%);
  }

  .quiz-option.highlighted:hover {
    border-color: #f59e0b;
    box-shadow: 0 4px 12px rgba(251, 191, 36, 0.25);
  }

  .option-icon {
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 0.75rem;
  }

  .option-content h5 {
    font-size: 0.95rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.5rem;
    text-align: center;
  }

  .option-content p {
    font-size: 0.8rem;
    color: #6b7280;
    line-height: 1.4;
    text-align: center;
    margin: 0;
  }

  .highlight-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #fbbf24;
    color: white;
    font-size: 0.65rem;
    font-weight: 600;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(251, 191, 36, 0.3);
  }

  .quiz-starter-footer {
    text-align: center;
    padding-top: 1rem;
    border-top: 1px solid #e5e7eb;
  }

  .quiz-progress-text {
    font-size: 0.9rem;
    color: #6b7280;
    margin-bottom: 0.5rem;
  }

  .alternative-link {
    font-size: 0.9rem;
    color: #3b82f6;
    text-decoration: none;
    font-weight: 500;
  }

  .alternative-link:hover {
    color: #1d4ed8;
    text-decoration: underline;
  }

  /* Citizenship Section */
  .citizenship-section {
    padding: 4rem 0;
    background: linear-gradient(to right, #f0f9ff, #e0f2fe);
  }

  .citizenship-layout {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 3rem;
  }

  .citizenship-content {
    flex: 1 1 50%;
    min-width: 320px;
  }

  .citizenship-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1e3a8a;
    margin-bottom: 1rem;
  }

  .citizenship-lead {
    font-size: 1.25rem;
    color: #1e40af;
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  .citizenship-paths {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .path-card {
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem;
    background-color: white;
    border: 2px solid;
    border-radius: 0.5rem;
    text-decoration: none;
    transition: all 0.2s;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .path-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }

  .ecological-path { border-color: #10b981; }
  .justice-path { border-color: #f59e0b; }
  .systemic-path { border-color: #6366f1; }

  .path-emoji {
    font-size: 1.5rem;
    margin-right: 1rem;
  }

  .path-content {
    flex: 1;
  }

  .path-title {
    font-weight: 600;
    margin-bottom: 0.25rem;
    margin: 0 0 0.25rem 0;
  }

  .ecological-path .path-title { color: #10b981; }
  .justice-path .path-title { color: #f59e0b; }
  .systemic-path .path-title { color: #6366f1; }

  .path-description {
    color: #6b7280;
    font-size: 0.9rem;
    margin: 0;
  }

  .citizenship-description {
    color: #1e293b;
    font-size: 1rem;
    line-height: 1.6;
  }

  .citizenship-visual {
    flex: 1 1 40%;
    min-width: 320px;
    text-align: center;
  }

  .citizenship-image {
    max-width: 100%;
    border-radius: 1rem;
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }

  /* Possibilities Section */
  .possibilities-section {
    padding: 4rem 0;
    background-color: white;
  }

  .possibilities-header {
    max-width: 56rem;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 3rem;
  }

  .possibilities-title {
    font-size: 2rem;
    font-weight: 700;
    color: #2B4B8C;
    margin-bottom: 1rem;
  }

  .possibilities-intro {
    font-size: 1.125rem;
    color: #4b5563;
    max-width: 42rem;
    margin: 0 auto;
  }

  .possibilities-grid {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .possibility-card {
    background-color: white;
    border-radius: 0.75rem;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    border: 1px solid #e5e7eb;
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .possibility-content {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
  }

  .possibility-icon {
    flex-shrink: 0;
    padding: 1rem;
    border-radius: 0.5rem;
  }

  .possibility-icon-0 { background-color: #e9ecf6; }
  .possibility-icon-1 { background-color: #e9f2e9; }
  .possibility-icon-2 { background-color: #f7f1e3; }
  .possibility-icon-3 { background-color: #e9ecf6; }

  .icon-svg {
    width: 2rem;
    height: 2rem;
  }

  .blue-icon { color: #2B4B8C; }
  .green-icon { color: #2D5F2D; }
  .orange-icon { color: #B8860B; }
  .purple-icon { color: #6B5CA5; }

  .possibility-text {
    flex: 1;
  }

  .possibility-heading {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #111827;
  }

  .possibility-description {
    color: #4b5563;
    line-height: 1.6;
    margin: 0;
  }

  .loading-state {
    text-align: center;
    padding: 2rem;
    color: #6b7280;
  }

  /* Additional Info Section */
  .additional-info-section {
    padding: 4rem 0;
    background-color: #f9fafb;
  }

  .info-content {
    max-width: 42rem;
    margin: 0 auto;
    line-height: 1.7;
    font-size: 1.125rem;
  }

  .info-title {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #654321;
  }

  .info-paragraph {
    margin-bottom: 1.5rem;
    color: #4b5563;
  }

  .info-list {
    margin-left: 1.5rem;
    margin-bottom: 1.5rem;
    list-style-type: disc;
    color: #4b5563;
  }

  .info-list-item {
    margin-bottom: 0.5rem;
  }

  /* Performance Section */
  .performance-section {
    padding: 4rem 1rem;
    background-color: #f9fafb;
  }

  .performance-container {
    max-width: 42rem;
    margin: 0 auto;
    text-align: center;
    background-color: white;
    padding: 2.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    border: 1px solid #e5e7eb;
  }

  .performance-title {
    font-size: 2rem;
    font-weight: 700;
    color: #2B4B8C;
    margin-bottom: 1rem;
  }

  .performance-text {
    font-size: 1.125rem;
    color: #4b5563;
    line-height: 1.7;
    margin-bottom: 2rem;
  }

  .dashboard-wrapper {
    margin-bottom: 2rem;
  }

  .performance-button {
    display: inline-block;
    background-color: #2B4B8C;
    color: white;
    font-weight: 600;
    padding: 0.75rem 2rem;
    border-radius: 0.5rem;
    text-decoration: none;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: all 0.2s;
  }

  /* Final CTA Section */
  .final-cta-section {
    padding: 4rem 0;
    background: linear-gradient(to bottom right, #2B4B8C, #4B5CA5, #6B5CA5);
    color: white;
  }

  .final-cta-content {
    max-width: 42rem;
    margin: 0 auto;
    text-align: center;
  }

  .final-cta-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  .final-cta-text {
    font-size: 1.25rem;
    color: #ffffff;
    margin-bottom: 2.5rem;
  }

  .final-cta-buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }

  .primary-cta-button {
    width: 100%;
    max-width: 20rem;
    display: inline-block;
    background-color: #DAA520;
    color: #2B4B8C;
    font-weight: 700;
    padding: 0.75rem 2rem;
    border-radius: 0.5rem;
    text-decoration: none;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: all 0.2s;
  }

  .secondary-cta-button {
    width: 100%;
    max-width: 20rem;
    display: inline-block;
    background-color: transparent;
    border: 2px solid #DAA520;
    color: #DAA520;
    font-weight: 700;
    padding: 0.75rem 2rem;
    border-radius: 0.5rem;
    text-decoration: none;
    transition: all 0.2s;
  }

  /* Animations */
  @keyframes slideDown {
    from {
      opacity: 0;
      max-height: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      max-height: 1000px;
      transform: translateY(0);
    }
  }

  /* Responsive Design */
  @media (max-width: 1200px) {
    .left-column {
      min-width: 280px;
      flex: 0 0 300px;
    }
    
    .constellation-column {
      min-width: 500px;
    }
  }

  /* Responsive adjustments for the side-by-side layout */
  @media (max-width: 900px) {
    .description-layout {
      flex-direction: column;
      gap: 1rem;
    }

    .click-instruction {
      min-width: auto;
      max-width: 100%;
      align-self: stretch;
    }

    .instruction-text {
      flex-direction: row;
      gap: 0.5rem;
    }

    .constellation-layout {
      flex-direction: column;
      align-items: center;
    }
    
    .left-column {
      min-width: 100%;
      max-width: 600px;
      flex: none;
    }

    .constellation-column {
      min-width: 100%;
      flex: none;
    }

    .citizenship-layout {
      flex-direction: column;
    }

    .explore-button {
      max-width: 100%;
    }

    .wide-description-panel,
    .wide-description-placeholder {
      margin: 1rem auto 0;
      padding: 1.5rem;
    }

    .framework-tagline {
      font-size: 1.1rem;
    }

    .framework-description {
      font-size: 1rem;
    }

    .quiz-options-grid {
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }

    .quick-quiz-starter {
      padding: 1.5rem;
    }

    .recommendation-chips {
      flex-direction: column;
      align-items: center;
    }

    .completed-actions {
      flex-direction: column;
      align-items: center;
    }

    .view-results-button,
    .retake-quiz-button {
      width: 100%;
      max-width: 250px;
      justify-content: center;
    }
  }

  @media (max-width: 640px) {
    .hero-title {
      font-size: 2rem;
    }

    .hero-subtitle {
      font-size: 1.25rem;
    }

    .hero-tagline {
      font-size: 1.5rem;
    }

    .featured-title {
      font-size: 2rem;
    }

    .citizenship-title {
      font-size: 2rem;
    }

    .wide-description-panel,
    .wide-description-placeholder {
      padding: 1rem;
    }

    .framework-tagline {
      font-size: 1rem;
    }

    .framework-description {
      font-size: 0.95rem;
    }

    .quick-quiz-starter {
      padding: 1rem;
    }

    .quiz-starter-title {
      font-size: 1.25rem;
    }

    .question-text {
      font-size: 1rem;
    }

    .option-content h5 {
      font-size: 0.9rem;
    }

    .option-content p {
      font-size: 0.75rem;
    }

    .chip-title {
      max-width: 120px;
      font-size: 0.8rem;
    }

    .completed-actions {
      gap: 0.75rem;
    }
  }

  /* Focus styles for accessibility */
  .info-box-header:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }

  .explore-button:focus {
    outline: 2px solid #fbbf24;
    outline-offset: 2px;
  }
</style>
