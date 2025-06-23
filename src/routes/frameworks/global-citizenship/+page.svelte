<!-- src/routes/frameworks/global-citizenship/+page.svelte -->
<script>
  import { t } from '$lib/i18n';
  import { base } from '$app/paths';
  import PersonalizationQuiz from './components/PersonalizationQuiz.svelte';
  import CitizenshipCompass from './components/CitizenshipCompass.svelte';
  import FrameworkRecommendations from './components/FrameworkRecommendations.svelte';
  import FoundationMessage from './components/FoundationMessage.svelte';
  import ShareButtons from '$lib/components/ShareButtons.svelte';
  import FrameworkTierList from '$lib/components/FrameworkTierList.svelte';
  import { 
    calculatePersonalizedConnections,
    getConnectionsForFramework,
    practiceToFrameworkConnections,
    valueToFrameworkConnections 
  } from '$lib/data/citizenshipConnections.js';
  import { onMount } from 'svelte';
  
  let showQuiz = false;
  let quizResults = null;
  let showConnections = false; // This controls the visibility
  let userPractices = [];
  let userValues = [];
  
  // Mock user data - in real implementation, this would come from compass component
  $: if (typeof localStorage !== 'undefined') {
    userPractices = JSON.parse(localStorage.getItem('userPractices') || '["awareness", "empathy"]');
    userValues = JSON.parse(localStorage.getItem('userValues') || '["earth", "justice", "compassion"]');
  }
  
  $: personalizedConnections = calculatePersonalizedConnections(userPractices, userValues, $t);
  
  onMount(() => {
    // Check if user has already taken the quiz
    const savedQuiz = localStorage.getItem('globalCitizenshipQuiz');
    if (savedQuiz) {
      quizResults = JSON.parse(savedQuiz);
    } else {
      showQuiz = true;
    }
  });
  
  function handleQuizComplete(results) {
    quizResults = results;
    showQuiz = false;
    localStorage.setItem('globalCitizenshipQuiz', JSON.stringify(results));
  }
  
  function resetQuiz() {
    showQuiz = true;
    quizResults = null;
    localStorage.removeItem('globalCitizenshipQuiz');
  }

  // Helper function to convert slug to camelCase for translation key
  function slugToCamelCase(slug) {
    return slug.split('-').map((word, index) => 
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    ).join('');
  }

  // Helper function to get translated framework title
  function getFrameworkTitle(slug) {
    const camelCaseKey = slugToCamelCase(slug);
    const translationKey = `framework.docs.nav.frameworkTitles.${camelCaseKey}`;
    const translated = $t(translationKey);
    
    // If translation doesn't exist, fall back to formatted slug
    if (translated === translationKey || !translated) {
      return slug.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    }
    
    return translated;
  }

  function getPracticeDisplayName(practice) {
    return $t(`globalCitizenship.compass.levels.${practice}.title`) || 
           $t(`globalCitizenship.practices.${practice}`) ||
           practice.charAt(0).toUpperCase() + practice.slice(1);
  }

  function getValueDisplayName(value) {
    return $t(`globalCitizenship.compass.values.${value}`) || value;
  }

  function getStrengthColor(strength) {
    const colors = {
      'foundation': '#8B5A3C',
      'primary': '#DC2626',
      'strong': '#2563EB', 
      'moderate': '#7C3AED',
      'weak': '#6B7280'
    };
    return colors[strength] || '#6B7280';
  }

  // Toggle function
  function toggleConnections() {
    showConnections = !showConnections;
    console.log('Toggled connections:', showConnections); // Debug log
  }
</script>

<svelte:head>
  <title>{$t('globalCitizenship.meta.title')} - Global Governance Framework</title>
  <meta name="description" content="{$t('globalCitizenship.meta.description')}" />
</svelte:head>

<!-- Hero Section -->
<section class="hero">
  <div class="container">
    <div class="hero-content">
      <h1>{$t('globalCitizenship.hero.title')}</h1>
      <p class="hero-subtitle">{$t('globalCitizenship.hero.subtitle')}</p>
      <p class="hero-description">{$t('globalCitizenship.hero.description')}</p>
      {#if showQuiz}
        <button class="button-gold" on:click={() => document.querySelector('.quiz-section')?.scrollIntoView({ behavior: 'smooth' })}>
          {$t('globalCitizenship.cta.beginJourney')}
        </button>
      {/if}
      {#if quizResults}
        <button class="button-outline" on:click={resetQuiz}>
          {$t('globalCitizenship.hero.retakeQuiz')}
        </button>
      {/if}
    </div>
  </div>
</section>

<!-- Quiz or Main Content -->
{#if showQuiz}
  <PersonalizationQuiz on:complete={(e) => handleQuizComplete(e.detail)} />
{:else}
  <!-- Framework Recommendations -->
  {#if quizResults}
    <FrameworkRecommendations {quizResults} />
  {/if}

  <!-- Interactive Compass -->
  <section class="compass-section">
    <div class="container">
      <div class="compass-header">
        <h2>{$t('globalCitizenship.compass.title')}</h2>
        <p>{$t('globalCitizenship.compass.description')}</p>
        <a href="{base}/frameworks/global-citizenship-practice" class="link-subtle">
          {$t('globalCitizenship.compass.readMore')} →
        </a>
      </div>
      <CitizenshipCompass {quizResults} />
    </div>
  </section>
  
  <section class="spiral-dynamics-invitation">
    <div class="container">
      <div class="spiral-content">
        <div class="spiral-text">
          <h3>{$t('globalCitizenship.spiralDynamics.invitation.title')}</h3>
          <p>{$t('globalCitizenship.spiralDynamics.invitation.description1')}</p>
          <p>{$t('globalCitizenship.spiralDynamics.invitation.description2')}</p>
          <a href="https://www.spiralize.org" target="_blank" rel="noopener noreferrer" class="spiral-link">
            {$t('globalCitizenship.spiralDynamics.invitation.linkText')} → 
          </a>
        </div>
        <div class="spiral-visual">
          <div class="spiral-icon">🌀</div>
          <div class="spiral-stages">
            <div class="first-tier-stages">
              <span class="stage beige">{$t('globalCitizenship.spiralDynamics.stages.beige')}</span>
              <span class="stage purple">{$t('globalCitizenship.spiralDynamics.stages.purple')}</span>
              <span class="stage red">{$t('globalCitizenship.spiralDynamics.stages.red')}</span>
              <span class="stage blue">{$t('globalCitizenship.spiralDynamics.stages.blue')}</span>
              <span class="stage orange">{$t('globalCitizenship.spiralDynamics.stages.orange')}</span>
              <span class="stage green">{$t('globalCitizenship.spiralDynamics.stages.green')}</span>
            </div>
            <div class="tier-divider">
              <span class="divider-line"></span>
              <span class="tier-label">{$t('globalCitizenship.spiralDynamics.tiers.second')}</span>
              <span class="divider-line"></span>
            </div>
            <div class="second-tier-stages">
              <span class="stage yellow">{$t('globalCitizenship.spiralDynamics.stages.yellow')}</span>
              <span class="stage turquoise">{$t('globalCitizenship.spiralDynamics.stages.turquoise')}</span>
              <span class="stage coral">{$t('globalCitizenship.spiralDynamics.stages.coral')}</span>
            </div>
            <div class="tier-divider">
              <span class="divider-line"></span>
              <span class="tier-label">{$t('globalCitizenship.spiralDynamics.tiers.third')}</span>
              <span class="divider-line"></span>
            </div>
            <div class="third-tier-stages">
              <span class="stage ultra-violet">{$t('globalCitizenship.spiralDynamics.stages.ultraviolet')}</span>
              <span class="stage clear">{$t('globalCitizenship.spiralDynamics.stages.clear')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Foundation Message -->
  <FoundationMessage />
  
  <!-- Framework Connections -->
  <section class="frameworks-section">
    <div class="container">
      <h2>{$t('globalCitizenship.frameworks.title')}</h2>
      <p class="section-description">{$t('globalCitizenship.frameworks.description')}</p>
      
      <!-- Connection Controls -->
      <div class="connection-controls">
        <button 
          class="connection-toggle" 
          class:active={showConnections}
          on:click={toggleConnections}
        >
          {showConnections ? '🔗 ' + $t('globalCitizenship.frameworks.controls.hide') : '🔍 ' + $t('globalCitizenship.frameworks.controls.show')} 
          {$t('globalCitizenship.frameworks.controls.practiceConnections')}
        </button>
        
        {#if personalizedConnections.length > 0}
          <div class="connection-summary">
            <span class="summary-text">
              {$t('globalCitizenship.frameworks.controls.yourPracticesConnect')} 
              <strong>{personalizedConnections.length}</strong> 
              {$t('globalCitizenship.frameworks.controls.frameworks')}
            </span>
          </div>
        {/if}
      </div>

      <!-- Personalized Connections (if user has practices/values AND showConnections is true) -->
      {#if personalizedConnections.length > 0 && !showQuiz && showConnections}
        <div class="personalized-connections">
          <h3>🎯 {$t('globalCitizenship.frameworks.personalConnections.title')}</h3>
          <p>{$t('globalCitizenship.frameworks.personalConnections.description')}</p>
          
          <div class="personal-connections-grid">
            {#each personalizedConnections.slice(0, 6) as connection}
              <div class="personal-connection-card">
                <div class="connection-header">
                  <span class="tier-badge tier-{connection.tier}">{$t('globalCitizenship.frameworks.tier')} {connection.tier}</span>
                  <div class="strength-indicator" style="background-color: {getStrengthColor(connection.strength)}"></div>
                </div>
                
                <h4 class="framework-title">
                  <a href="{base}/frameworks/{connection.slug}">
                    {getFrameworkTitle(connection.slug)}
                  </a>
                </h4>
                
                <div class="connection-sources">
                  {#each connection.sources as source}
                    <span class="source-tag {source.type}">
                      {#if source.type === 'practice'}
                        📊 {getPracticeDisplayName(source.name)}
                      {:else}
                        💝 {getValueDisplayName(source.name)}
                      {/if}
                    </span>
                  {/each}
                </div>
                
                <p class="connection-reason">{connection.reason}</p>
              </div>
            {/each}
          </div>
        </div>
      {/if}
      
      <!-- Tier 0 - Full Width -->
      <div class="tier-0-container">
        <div class="framework-tier tier-0 tier-0-full">
          <h3>{$t('framework.tier.0.title')}</h3>
          <p>{$t('globalCitizenship.frameworks.tier0.description')}</p>
          <FrameworkTierList tier={0} showHeader={false} t={$t} className="tier-0-list" />
          
          {#if showConnections}
            <div class="tier-connections">
              <h5>{$t('globalCitizenship.frameworks.tierConnections.foundation')}:</h5>
              <div class="connection-tags">
                <span class="connection-tag">🎯 {$t('globalCitizenship.compass.levels.leadership.line1')} {$t('globalCitizenship.compass.levels.leadership.line2')}</span>
                <span class="connection-tag">🧠 {$t('globalCitizenship.compass.levels.understanding.line1')} {$t('globalCitizenship.compass.levels.understanding.line2')}</span>
                <span class="connection-tag">💎 {$t('globalCitizenship.compass.values.integrity')}</span>
              </div>
            </div>
          {/if}
        </div>
      </div>
      
      <!-- Tiers 1, 2, 3&4 - Three Column Grid -->
      <div class="frameworks-grid">
        <!-- Tier 1 -->
        <div class="framework-tier tier-1">
          <h3>{$t('framework.tier.1.title')}</h3>
          <p>{$t('globalCitizenship.frameworks.tier1.description')}</p>
          <FrameworkTierList tier={1} showHeader={false} t={$t} className="tier-1-list" />
          
          {#if showConnections}
            <div class="tier-connections">
              <h5>{$t('globalCitizenship.frameworks.tierConnections.urgent')}:</h5>
              <div class="connection-tags">
                <span class="connection-tag">🌍 {$t('globalCitizenship.compass.values.earth')}</span>
                <span class="connection-tag">⚖️ {$t('globalCitizenship.compass.values.justice')}</span>
                <span class="connection-tag">❤️ {$t('globalCitizenship.compass.values.compassion')}</span>
                <span class="connection-tag">🕊️ {$t('globalCitizenship.compass.values.peace')}</span>
              </div>
            </div>
          {/if}
          
          <a href="{base}/frameworks/docs/implementation#tier-1" class="view-all-link">
            {$t('globalCitizenship.frameworks.tier1.viewAll')} →
          </a>
        </div>
        
        <!-- Tier 2 -->
        <div class="framework-tier tier-2">
          <h3>{$t('framework.tier.2.title')}</h3>
          <p>{$t('globalCitizenship.frameworks.tier2.description')}</p>
          <FrameworkTierList tier={2} showHeader={false} t={$t} className="tier-2-list" />
          
          {#if showConnections}
            <div class="tier-connections">
              <h5>{$t('globalCitizenship.frameworks.tierConnections.systems')}:</h5>
              <div class="connection-tags">
                <span class="connection-tag">🧠 {$t('globalCitizenship.compass.levels.understanding.line1')} {$t('globalCitizenship.compass.levels.understanding.line2')}</span>
                <span class="connection-tag">🤝 {$t('globalCitizenship.compass.levels.participation.line1')} {$t('globalCitizenship.compass.levels.participation.line2')}</span>
                <span class="connection-tag">🔍 {$t('globalCitizenship.compass.values.truth')}</span>
              </div>
            </div>
          {/if}
          
          <a href="{base}/frameworks/docs/implementation#tier-2" class="view-all-link">
            {$t('globalCitizenship.frameworks.tier2.viewAll')} →
          </a>
        </div>
        
        <!-- Tier 3 & 4 Combined -->
        <div class="framework-tier tier-3">
          <h3>{$t('globalCitizenship.frameworks.tier3.title')}</h3>
          <p>{$t('globalCitizenship.frameworks.tier3.description')}</p>
          <FrameworkTierList tier={3} showHeader={false} t={$t} className="tier-3-list" />
          <FrameworkTierList tier={4} showHeader={false} t={$t} className="tier-4-list" />
          
          {#if showConnections}
            <div class="tier-connections">
              <h5>{$t('globalCitizenship.frameworks.tierConnections.visionary')}:</h5>
              <div class="connection-tags">
                <span class="connection-tag">❤️ {$t('globalCitizenship.compass.levels.empathy.line1')} {$t('globalCitizenship.compass.levels.empathy.line2')}</span>
                <span class="connection-tag">🎯 {$t('globalCitizenship.compass.levels.leadership.line1')} {$t('globalCitizenship.compass.levels.leadership.line2')}</span>
                <span class="connection-tag">🌟 {$t('globalCitizenship.compass.values.wisdom')}</span>
                <span class="connection-tag">✨ {$t('globalCitizenship.compass.values.life')}</span>
              </div>
            </div>
          {/if}
          
          <a href="{base}/frameworks/docs/implementation#tier-3" class="view-all-link">
            {$t('globalCitizenship.frameworks.tier3.viewAll')} →
          </a>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Call to Action -->
  <section class="cta-section">
    <div class="container">
      <div class="cta-content">
        <h2>{$t('globalCitizenship.cta.title')}</h2>
        <p>{$t('globalCitizenship.cta.description')}</p>
        <div class="cta-buttons">
          <a href="{base}/frameworks/docs" class="button-gold">
            {$t('globalCitizenship.cta.exploreFrameworks')}
          </a>
          <a href="{base}/frameworks/global-citizenship-practice" class="button-outline">
             {$t('globalCitizenship.cta.readTheFramework')}
          </a>
          <a href="{base}/contact" class="button-outline">
            {$t('globalCitizenship.cta.getInvolved')}
          </a>
        </div>
      </div>
    </div>
  </section>
{/if}

<!-- For Global Citizenship page -->
<ShareButtons 
  title="Global Citizenship Framework"
  hashtags="GlobalCitizenship,SpiralDynamics,PlanetaryGovernance"
  position="left"
/>

<style>
  /* Connection Controls */
  .connection-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 1rem;
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    border-radius: 0.75rem;
    border: 1px solid #0ea5e9;
  }

  .connection-toggle {
    background: #2B4B8C;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .connection-toggle:hover {
    background: #1e3a72;
    transform: translateY(-2px);
  }

  .connection-toggle.active {
    background: #DAA520;
  }

  .connection-summary {
    font-size: 0.95rem;
    color: #1e40af;
  }

  .summary-text strong {
    color: #2B4B8C;
  }

  /* Personalized Connections */
  .personalized-connections {
    margin-bottom: 3rem;
    padding: 2rem;
    background: linear-gradient(135deg, #fef7ed 0%, #fff7ed 100%);
    border-radius: 1rem;
    border: 2px solid #fed7aa;
  }

  .personalized-connections h3 {
    color: #2B4B8C;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
  }

  .personalized-connections p {
    color: #6b7280;
    margin-bottom: 1.5rem;
  }

  .personal-connections-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .personal-connection-card {
    background: white;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .personal-connection-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }

  .connection-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .tier-badge {
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    color: white;
  }

  .tier-badge.tier-0 { background: #8B5A3C; }
  .tier-badge.tier-1 { background: #DC2626; }
  .tier-badge.tier-2 { background: #2563EB; }
  .tier-badge.tier-3 { background: #7C3AED; }
  .tier-badge.tier-4 { background: #7C3AED; }

  .strength-indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  .framework-title {
    margin: 0 0 1rem 0;
    font-size: 1.1rem;
    font-weight: 600;
  }

  .framework-title a {
    color: #2B4B8C;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .framework-title a:hover {
    color: #DAA520;
  }

  .connection-sources {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .source-tag {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
  }

  .source-tag.practice {
    background: #dbeafe;
    color: #1e40af;
  }

  .source-tag.value {
    background: #fecaca;
    color: #dc2626;
  }

  .connection-reason {
    font-size: 0.9rem;
    color: #4b5563;
    line-height: 1.4;
    margin: 0;
  }

  /* Tier Connections */
  .tier-connections {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #e5e7eb;
  }

  .tier-connections h5 {
    margin: 0 0 0.75rem 0;
    font-size: 0.9rem;
    font-weight: 600;
    color: #374151;
  }

  .connection-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .connection-tag {
    font-size: 0.8rem;
    padding: 0.25rem 0.75rem;
    background: rgba(43, 75, 140, 0.1);
    color: #2B4B8C;
    border-radius: 1rem;
    border: 1px solid rgba(43, 75, 140, 0.2);
    font-weight: 500;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .connection-controls {
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .personal-connections-grid {
      grid-template-columns: 1fr;
    }
    
    .personalized-connections {
      padding: 1.5rem;
    }
    
    .connection-tags {
      justify-content: center;
    }
  }

  @media (max-width: 480px) {
    .connection-controls {
      padding: 0.75rem;
    }
    
    .connection-toggle {
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
    }
    
    .personal-connection-card {
      padding: 1rem;
    }
  }

  /* Frameworks Section Layout Updates */
  .frameworks-section {
    padding: 4rem 0;
    background: white;
  }

  .frameworks-section h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2B4B8C;
    text-align: center;
    margin-bottom: 1rem;
  }

  .section-description {
    font-size: 1.25rem;
    color: #4B5563;
    text-align: center;
    max-width: 600px;
    margin: 0 auto 3rem auto;
  }

  /* Tier 0 - Full Width Container */
  .tier-0-container {
    margin-bottom: 2rem;
  }

  .tier-0-full {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }

  /* Three Column Grid for Tiers 1, 2, 3&4 */
  .frameworks-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: 2rem;
  }

  .framework-tier {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-top: 4px solid;
    display: flex;
    flex-direction: column;
  }

  .framework-tier:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  .tier-0 {
    border-top-color: #8B5A3C;
    background: linear-gradient(135deg, #FEF7ED, #FDF2E9);
  }

  .tier-1 {
    border-top-color: #DC2626;
  }

  .tier-2 {
    border-top-color: #2563EB;
  }

  .tier-3 {
    border-top-color: #7C3AED;
  }

  .framework-tier h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #1F2937;
  }

  .framework-tier p {
    color: #4B5563;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  /* Make framework lists flex-grow to push view-all links to bottom */
  :global(.tier-1-list),
  :global(.tier-2-list),
  :global(.tier-3-list),
  :global(.tier-4-list) {
    flex-grow: 1;
    margin-bottom: 1rem;
  }

  .view-all-link {
    display: inline-block;
    margin-top: auto;
    color: #2B4B8C;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s ease;
    align-self: flex-start;
  }

  .view-all-link:hover {
    color: #DAA520;
  }

  /* Framework tier list integration styles */
  :global(.tier-0-list .framework-link),
  :global(.tier-1-list .framework-link),
  :global(.tier-2-list .framework-link),
  :global(.tier-3-list .framework-link),
  :global(.tier-4-list .framework-link) {
    color: #2B4B8C;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s ease;
    display: block;
    padding: 0.5rem 0;
    border-bottom: 1px solid #e5e7eb;
  }

  :global(.tier-0-list .framework-link:hover),
  :global(.tier-1-list .framework-link:hover),
  :global(.tier-2-list .framework-link:hover),
  :global(.tier-3-list .framework-link:hover),
  :global(.tier-4-list .framework-link:hover) {
    color: #DAA520;
  }

  :global(.tier-0-list .framework-list),
  :global(.tier-1-list .framework-list),
  :global(.tier-2-list .framework-list),
  :global(.tier-3-list .framework-list),
  :global(.tier-4-list .framework-list) {
    margin-bottom: 1rem;
  }

  :global(.tier-0-list .framework-item:last-child .framework-link),
  :global(.tier-1-list .framework-item:last-child .framework-link),
  :global(.tier-2-list .framework-item:last-child .framework-link),
  :global(.tier-3-list .framework-item:last-child .framework-link),
  :global(.tier-4-list .framework-item:last-child .framework-link) {
    border-bottom: none;
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .frameworks-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .tier-0-full {
      text-align: left;
    }
  }

  @media (max-width: 768px) {
    .frameworks-section {
      padding: 3rem 0;
    }
    
    .frameworks-section h2 {
      font-size: 2rem;
    }
    
    .section-description {
      font-size: 1.1rem;
    }
    
    .framework-tier {
      padding: 1.5rem;
    }
    
    .framework-tier h3 {
      font-size: 1.25rem;
    }
  }

  @media (max-width: 480px) {
    .tier-0-container {
      margin-bottom: 1.5rem;
    }
    
    .framework-tier {
      padding: 1.25rem;
    }
    
    .framework-tier h3 {
      font-size: 1.1rem;
    }
    
    .framework-tier p {
      font-size: 0.9rem;
    }
  }

  /* Hero Section */
  .hero {
    padding: 4rem 0;
    background: linear-gradient(135deg, #2B4B8C 0%, #6B5CA5 100%);
    color: white;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .hero-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }
  
  .hero h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.2;
  }
  
  .hero-subtitle {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #E0F2FE;
  }
  
  .hero-description {
    font-size: 1.25rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    color: #F0F9FF;
  }
  
  /* Compass Section */
  .compass-section {
    padding: 4rem 0;
    background: linear-gradient(to bottom, #F8FAFC, #E0F2FE);
  }
  
  .compass-header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .compass-header h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2B4B8C;
    margin-bottom: 1rem;
  }
  
  .compass-header p {
    font-size: 1.25rem;
    color: #4B5563;
    max-width: 600px;
    margin: 0 auto;
  }

  .link-subtle {
    display: inline-block;
    margin-top: 1rem;
    color: #2B4B8C;
    text-decoration: none;
    font-weight: 600;
    border-bottom: 2px solid rgba(218, 165, 32, 0.5); /* Subtle gold underline */
    transition: all 0.2s ease;
  }

  .link-subtle:hover {
    color: #DAA520;
    border-bottom-color: #DAA520;
  }
  
  /* Spiral Dynamics Section */
  .spiral-dynamics-invitation {
    padding: 3rem 0;
    background: linear-gradient(135deg, #FEF7ED 0%, #F3E8FF 100%);
    margin: 2rem 0;
  }

  .spiral-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 3rem;
    align-items: center;
  }

  .spiral-text h3 {
    font-size: 1.75rem;
    font-weight: 600;
    color: #2B4B8C;
    margin-bottom: 1rem;
  }

  .spiral-text p {
    color: #4B5563;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .spiral-link {
    display: inline-block;
    color: #2B4B8C;
    font-weight: 600;
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    background: rgba(218, 165, 32, 0.1);
    border-radius: 8px;
    border: 2px solid #DAA520;
    transition: all 0.3s ease;
  }

  .spiral-link:hover {
    background: #DAA520;
    color: white;
    transform: translateY(-2px);
  }

  .spiral-visual {
    text-align: center;
  }

  .spiral-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .spiral-stages {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: center;
  }

  .first-tier-stages,
  .second-tier-stages,
  .third-tier-stages {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: center;
  }

  .tier-divider {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    margin: 0.5rem 0;
  }

  .divider-line {
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg, transparent, #9CA3AF, transparent);
  }

  .tier-label {
    font-size: 0.7rem;
    font-weight: 600;
    color: #6B7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.25rem 0.5rem;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    border: 1px solid #E5E7EB;
  }

  .stage {
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
    color: white;
    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  }

  .stage.beige { background: #8B7355; }
  .stage.purple { background: #8B5A96; }
  .stage.red { background: #DC2626; }
  .stage.blue { background: #2563EB; }
  .stage.orange { background: #EA580C; }
  .stage.green { background: #16A34A; }
  .stage.yellow { background: #EAB308; }
  .stage.turquoise { background: #0D9488; }
  .stage.coral { background: #FF7F7F; }
  .stage.ultra-violet { background: #8A2BE2; }
  .stage.clear { 
    background: linear-gradient(135deg, #FFFFFF 0%, #F0F8FF 50%, #E6E6FA 100%); 
    color: #4B5563;
    border: 2px solid #D1D5DB;
    text-shadow: none;
  }
  
  /* Frameworks Section */
  .frameworks-section {
    padding: 4rem 0;
    background: white;
  }
  
  .frameworks-section h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2B4B8C;
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .section-description {
    font-size: 1.25rem;
    color: #4B5563;
    text-align: center;
    max-width: 600px;
    margin: 0 auto 3rem auto;
  }
  
  .frameworks-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }
  
  .framework-tier {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-top: 4px solid;
  }
  
  .framework-tier:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
  
  .tier-0 {
    border-top-color: #8B5A3C;
    background: linear-gradient(135deg, #FEF7ED, #FDF2E9);
  }
  
  .tier-1 {
    border-top-color: #DC2626;
  }
  
  .tier-2 {
    border-top-color: #2563EB;
  }
  
  .tier-3 {
    border-top-color: #7C3AED;
  }
  
  .framework-tier h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #1F2937;
  }
  
  .framework-tier p {
    color: #4B5563;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  
  .framework-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .framework-links a,
  .framework-link {
    color: #2B4B8C;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s ease;
  }
  
  .framework-links a:hover,
  .framework-link:hover {
    color: #DAA520;
  }
  
  /* CTA Section */
  .cta-section {
    padding: 4rem 0;
    background: linear-gradient(135deg, #E9F2E9, #F0FDF4);
  }
  
  .cta-content {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .cta-content h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2B4B8C;
    margin-bottom: 1rem;
  }
  
  .cta-content p {
    font-size: 1.25rem;
    color: #4B5563;
    margin-bottom: 2rem;
  }
  
  .cta-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  /* Buttons */
  .button-gold,
  .button-outline {
    display: inline-flex;
    align-items: center;
    padding: 0.875rem 2rem;
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
    font-size: 1.1rem;
  }
  
  .button-gold {
    background-color: #DAA520;
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .button-gold:hover {
    background-color: #B8860B;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  .button-outline {
    background-color: transparent;
    color: #2B4B8C;
    border: 2px solid #2B4B8C;
  }
  
  .button-outline:hover {
    background-color: #2B4B8C;
    color: white;
    transform: translateY(-2px);
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .hero h1 {
      font-size: 2rem;
    }
    
    .hero-subtitle {
      font-size: 1.25rem;
    }
    
    .hero-description {
      font-size: 1.1rem;
    }
    
    .compass-header h2,
    .frameworks-section h2,
    .cta-content h2 {
      font-size: 2rem;
    }
    
    .frameworks-grid {
      grid-template-columns: 1fr;
    }
    
    .cta-buttons {
      flex-direction: column;
      align-items: center;
    }
    
    .button-gold,
    .button-outline {
      width: 100%;
      max-width: 300px;
      justify-content: center;
    }
  }
</style>
