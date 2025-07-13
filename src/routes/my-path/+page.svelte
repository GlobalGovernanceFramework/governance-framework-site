<!-- src/routes/my-path/+page.svelte -->
<script>
  import { t, isLocaleLoaded } from '$lib/i18n';
  import { base } from '$app/paths';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  import ExplorationSummary from '$lib/components/ExplorationSummary.svelte';
  import PrimaryRecommendations from '$lib/components/PrimaryRecommendations.svelte';
  import DeeperExploration from '$lib/components/DeeperExploration.svelte';
  import ShareButtons from '$lib/components/ShareButtons.svelte';
  
  let quizResults = null;
  let quizLoading = true;
  let dataLoadError = null;
  
  // Simplified data preloading - only load what we actually need
  async function preloadEssentialData() {
    try {
      // Only load the essential modules that actually exist and are needed
      const modules = await Promise.allSettled([
        import('$lib/data/compassData.js').catch(err => {
          console.warn('compassData not available:', err.message);
          return { default: {} }; // Fallback
        }),
        import('$lib/data/citizenshipConnections.js').catch(err => {
          console.warn('citizenshipConnections not available:', err.message);
          return { default: {} }; // Fallback
        }),
        import('$lib/data/connectionReasons.js').catch(err => {
          console.warn('connectionReasons not available:', err.message);
          return { default: {} }; // Fallback
        })
        // REMOVED: precomputedFrameworkDatabase.js - causing build issues
      ]);
      
      console.log('Essential data loaded successfully');
      return modules;
    } catch (error) {
      console.error('Error preloading essential data:', error);
      // Don't set dataLoadError for non-critical data loading issues
      return null;
    }
  }
  
  onMount(async () => {
    console.log('My-path page mounting...');
    
    // Start data preloading (but don't block on it)
    preloadEssentialData();
    
    // Load quiz results
    const savedQuiz = localStorage.getItem('globalCitizenshipQuiz');
    if (savedQuiz) {
      try {
        quizResults = JSON.parse(savedQuiz);
        console.log('Quiz results loaded:', quizResults);
        quizLoading = false;
      } catch (error) {
        console.error('Error processing quiz results:', error);
        dataLoadError = 'Error processing quiz results';
        goto(`${base}/quiz`);
      }
    } else {
      // If no quiz results, redirect to quiz
      goto(`${base}/quiz`);
    }
  });
  
  function retakeQuiz() {
    localStorage.removeItem('globalCitizenshipQuiz');
    goto(`${base}/quiz`);
  }

  // Simplified loading state management
  let isFullyLoaded = false;
  let showLoadingState = true;
  
  $: {
    if (!isFullyLoaded) {
      isFullyLoaded = !quizLoading && $isLocaleLoaded && quizResults && !dataLoadError;
      showLoadingState = !isFullyLoaded;
    }
  }
</script>

<svelte:head>
  <title>{$t('findYourPlace.meta.title')} - Global Governance Frameworks</title>
  <meta name="description" content="{$t('findYourPlace.meta.description')}" />
  <!-- Only preload modules that actually exist -->
  <link rel="modulepreload" href="/src/lib/data/compassData.js">
</svelte:head>

{#if dataLoadError}
  <!-- Data Load Error State -->
  <div class="error-container">
    <div class="error-content">
      <h1>Data Loading Error</h1>
      <p>There was an issue loading your quiz results: {dataLoadError}</p>
      <p>This might be a temporary issue. Please try refreshing the page.</p>
      <div class="error-actions">
        <button on:click={() => window.location.reload()} class="retry-button">
          Refresh Page
        </button>
        <button on:click={retakeQuiz} class="retake-button">
          Return to Quiz
        </button>
      </div>
    </div>
  </div>
{:else if showLoadingState}
  <div class="loading-container">
    <div class="loading-content">
      <div class="loading-spinner"></div>
      {#if quizLoading}
        <p>Loading your quiz results...</p>
      {:else if !$isLocaleLoaded}
        <p>Loading translations...</p>
        <p class="loading-detail">Preparing framework descriptions...</p>
      {:else}
        <p>Preparing your personalized path...</p>
      {/if}
    </div>
  </div>
{:else if isFullyLoaded}

  <!-- Hero Section -->
  <section class="dashboard-hero">
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title">{$t('findYourPlace.hero.title')}</h1>
        <p class="hero-subtitle">
          {$t('findYourPlace.hero.description')}
        </p>
      </div>
    </div>
  </section>

  <!-- Summary and retake option -->
  <div class="container">
    <ExplorationSummary {quizResults} />

    <!-- Primary recommendations -->
    <PrimaryRecommendations {quizResults} />

    <!-- Deeper Exploration -->
    <div class="exploration-section">
      <DeeperExploration {quizResults} />
    </div>
  </div>

  <!-- Next Steps -->
  <section class="next-steps-section">
    <div class="container">
      <div class="next-steps-content">
        <h2>{$t('findYourPlace.cta.title')}</h2>
        <p>
          {$t('findYourPlace.cta.description')}
        </p>
        
        <div class="action-grid">
          <a href="{base}/frameworks" class="action-card primary">
            <div class="card-icon">📚</div>
            <h3>Dive Deeper</h3>
            <p>Explore the full documentation and implementation guides for your recommended frameworks.</p>
          </a>
          
          <a href="{base}/get-involved" class="action-card secondary">
            <div class="card-icon">🤝</div>
            <h3>{$t('findYourPlace.cta.getInvolved')}</h3>
            <p>Join our community and contribute to developing these frameworks for global transformation.</p>
          </a>
          
          <a href="{base}/frameworks/global-citizenship-practice" class="action-card tertiary">
            <div class="card-icon">🧭</div>
            <h3>Practice Framework</h3>
            <p>{$t('findYourPlace.cta.readTheFramework')}</p>
          </a>
        </div>
        
        <!-- Retake Quiz Option -->
        <div class="retake-section">
          <p>Want to explore different aspects of global citizenship?</p>
          <button on:click={retakeQuiz} class="retake-button-secondary">
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Share Component -->
  <ShareButtons 
    title="My Global Citizenship Path"
    hashtags="GlobalCitizenship,PlanetaryGovernance"
    position="left"
  />
{:else}
  <!-- Fallback state -->
  <div class="error-container">
    <div class="error-content">
      <h1>Unable to Load Page</h1>
      <p>There was an issue loading your personalized path. Please try refreshing the page or retaking the quiz.</p>
      <button on:click={retakeQuiz} class="retake-button">
        Retake Quiz
      </button>
    </div>
  </div>
{/if}

<style>
  .loading-container,
  .error-container {
    min-height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .loading-content,
  .error-content {
    text-align: center;
    max-width: 400px;
    padding: 2rem;
  }
  
  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #e5e7eb;
    border-top: 4px solid #2B4B8C;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem auto;
  }
  
  .loading-detail {
    font-size: 0.875rem;
    color: #6B7280;
    margin-top: 0.5rem;
  }
  
  .error-content h1 {
    color: #DC2626;
    margin-bottom: 1rem;
  }
  
  .error-content p {
    color: #6B7280;
    margin-bottom: 1rem;
    line-height: 1.6;
  }
  
  .error-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 2rem;
  }
  
  .retry-button,
  .retake-button {
    background: #2B4B8C;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  
  .retry-button:hover,
  .retake-button:hover {
    background: #1e3a72;
  }
  
  .retry-button {
    background: #059669;
  }
  
  .retry-button:hover {
    background: #047857;
  }
  
  .retake-section {
    margin-top: 3rem;
    padding: 2rem;
    background: #f8fafc;
    border-radius: 1rem;
    border: 1px solid #e2e8f0;
  }
  
  .retake-section p {
    margin-bottom: 1rem;
    color: #4a5568;
  }
  
  .retake-button-secondary {
    background: #718096;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  
  .retake-button-secondary:hover {
    background: #4a5568;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .dashboard-hero {
    padding: 4rem 0;
    background: linear-gradient(135deg, #2B4B8C 0%, #6B5CA5 100%);
    color: white;
    text-align: center;
    position: relative;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .hero-content {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
  }
  
  .hero-title {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    line-height: 1.2;
    background: linear-gradient(45deg, #ffffff, #DAA520);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .hero-subtitle {
    font-size: 1.375rem;
    margin-bottom: 2.5rem;
    color: #E0F2FE;
    line-height: 1.6;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .exploration-section {
    scroll-margin-top: 2rem;
  }
  
  .next-steps-section {
    padding: 4rem 0;
    background: white;
  }
  
  .next-steps-content {
    text-align: center;
    max-width: 900px;
    margin: 0 auto;
  }
  
  .next-steps-content h2 {
    font-size: 2.25rem;
    font-weight: 700;
    color: #1F2937;
    margin-bottom: 1rem;
  }
  
  .next-steps-content > p {
    font-size: 1.125rem;
    color: #6B7280;
    margin-bottom: 3rem;
    line-height: 1.6;
  }
  
  .action-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }
  
  .action-card {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    text-decoration: none;
    color: inherit;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 2px solid transparent;
    transition: all 0.3s ease;
    display: block;
  }
  
  .action-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }
  
  .action-card.primary {
    border-color: #2B4B8C;
  }
  
  .action-card.primary:hover {
    border-color: #1e3a72;
    background: #f8fafc;
  }
  
  .action-card.secondary {
    border-color: #059669;
  }
  
  .action-card.secondary:hover {
    border-color: #047857;
    background: #f0fdf4;
  }
  
  .action-card.tertiary {
    border-color: #DAA520;
  }
  
  .action-card.tertiary:hover {
    border-color: #B8860B;
    background: #fefce8;
  }
  
  .card-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .action-card h3 {
    font-size: 1.375rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #1F2937;
  }
  
  .action-card p {
    color: #4B5563;
    line-height: 1.6;
    margin: 0;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .hero-title {
      font-size: 2.25rem;
    }
    
    .hero-subtitle {
      font-size: 1.125rem;
    }
    
    .action-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .action-card {
      padding: 1.5rem;
    }
    
    .loading-content,
    .error-content {
      padding: 1rem;
    }
    
    .error-actions {
      flex-direction: column;
      align-items: center;
    }
    
    .retry-button,
    .retake-button,
    .retake-button-secondary {
      width: 100%;
      max-width: 200px;
    }
  }

  @media (max-width: 480px) {
    .dashboard-hero {
      padding: 3rem 0;
    }

    .hero-title {
      font-size: 2rem;
    }

    .hero-subtitle {
      font-size: 1rem;
    }
  }
</style>
