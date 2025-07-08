<!-- src/routes/frameworks/find-your-place/+page.svelte - Now a comprehensive reference -->
<script>
  import { t } from '$lib/i18n';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  
  import SpiralDynamicsSection from '$lib/components/SpiralDynamicsSection.svelte';
  import CitizenshipCompass from '$lib/components/CitizenshipCompass.svelte';
  import ShareButtons from '$lib/components/ShareButtons.svelte';
  
  let quizResults = null;
  let hasCompletedQuiz = false;
  
  onMount(() => {
    // Check if user has completed the quiz
    const savedQuiz = localStorage.getItem('globalCitizenshipQuiz');
    if (savedQuiz) {
      hasCompletedQuiz = true;
      quizResults = JSON.parse(savedQuiz);
    }
  });
  
  function startQuiz() {
    goto(`${base}/quiz`);
  }
  
  function viewDashboard() {
    goto(`${base}/my-path`);
  }
</script>

<svelte:head>
  <title>{$t('findYourPlace.meta.title')} - Global Governance Frameworks</title>
  <meta name="description" content="{$t('findYourPlace.meta.description')}" />
</svelte:head>

<!-- Hero Section -->
<section class="hero">
  <div class="container">
    <div class="hero-content">
      <h1>{$t('findYourPlace.hero.title')}</h1>
      <p class="hero-subtitle">{$t('findYourPlace.hero.subtitle')}</p>
      <p class="hero-description">{$t('findYourPlace.hero.description')}</p>
      
      <div class="hero-actions">
        {#if hasCompletedQuiz}
          <button class="button-gold" on:click={viewDashboard}>
            📊 View Your Dashboard
          </button>
          <button class="button-outline" on:click={startQuiz}>
            🔄 Retake Quiz
          </button>
        {:else}
          <button class="button-gold" on:click={startQuiz}>
            🧭 {$t('findYourPlace.cta.beginJourney')}
          </button>
        {/if}
      </div>
    </div>
  </div>
</section>

<!-- Global Citizenship Framework Overview -->
<section class="framework-overview">
  <div class="container">
    <div class="overview-content">
      <h2>The Global Citizenship Practice Framework</h2>
      <p class="overview-lead">
        Global citizenship is the practice of recognizing our interconnectedness and taking responsibility 
        for our shared planetary home. This framework provides structured pathways for developing the 
        awareness, skills, and practices needed to be an effective global citizen.
      </p>
      
      <div class="framework-components">
        <div class="component-card">
          <div class="component-icon">🧭</div>
          <h3>Values Compass</h3>
          <p>Ten core values that guide global citizenship practice, from honoring life to growing in wisdom.</p>
        </div>
        
        <div class="component-card">
          <div class="component-icon">📈</div>
          <h3>Development Levels</h3>
          <p>Five progressive stages from awareness to leadership, each building on the previous.</p>
        </div>
        
        <div class="component-card">
          <div class="component-icon">🔗</div>
          <h3>Framework Connections</h3>
          <p>Direct pathways from personal practice to engagement with global governance frameworks.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Interactive Compass -->
<section class="compass-section">
  <div class="container">
    <div class="compass-header">
      <h2>{$t('findYourPlace.compass.title')}</h2>
      <p>{$t('findYourPlace.compass.description')}</p>
    </div>
    <CitizenshipCompass {quizResults} />
  </div>
</section>

<!-- Developmental Context with Spiral Dynamics -->
<SpiralDynamicsSection variant="compact" customTitle="Understanding Global Consciousness Development" />

<!-- Implementation Guide -->
<section class="implementation-section">
  <div class="container">
    <h2>How to Use This Framework</h2>
    
    <div class="implementation-steps">
      <div class="step">
        <div class="step-number">1</div>
        <div class="step-content">
          <h3>Start with the Quiz</h3>
          <p>Take our 3-question assessment to discover which global challenges and frameworks align with your values and interests.</p>
          {#if !hasCompletedQuiz}
            <button class="step-button" on:click={startQuiz}>Take the Quiz</button>
          {:else}
            <button class="step-button completed" on:click={viewDashboard}>✓ View Your Results</button>
          {/if}
        </div>
      </div>
      
      <div class="step">
        <div class="step-number">2</div>
        <div class="step-content">
          <h3>Explore Your Values</h3>
          <p>Use the interactive compass to understand how your personal values connect to global governance frameworks.</p>
          <a href="#compass" class="step-button">Explore the Compass</a>
        </div>
      </div>
      
      <div class="step">
        <div class="step-number">3</div>
        <div class="step-content">
          <h3>Choose Your Practices</h3>
          <p>Select development practices that resonate with you and track your progress as a global citizen.</p>
          <a href="{base}/frameworks/global-citizenship-practice" class="step-button">Read the Full Framework</a>
        </div>
      </div>
      
      <div class="step">
        <div class="step-number">4</div>
        <div class="step-content">
          <h3>Engage with Frameworks</h3>
          <p>Dive into the specific governance frameworks that align with your interests and values.</p>
          <a href="{base}/frameworks" class="step-button">Explore All Frameworks</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Call to Action -->
<section class="cta-section">
  <div class="container">
    <div class="cta-content">
      <h2>{$t('findYourPlace.cta.title')}</h2>
      <p>{$t('findYourPlace.cta.description')}</p>
      <div class="cta-buttons">
        <a href="{base}/frameworks/docs" class="button-gold">
          {$t('findYourPlace.cta.exploreFrameworks')}
        </a>
        <a href="{base}/get-involved" class="button-outline">
          {$t('findYourPlace.cta.getInvolved')}
        </a>
      </div>
    </div>
  </div>
</section>

<ShareButtons 
  title="Global Citizenship Framework"
  hashtags="GlobalCitizenship,PlanetaryGovernance"
  position="left"
/>

<style>
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
  
  .hero-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  /* Framework Overview */
  .framework-overview {
    padding: 4rem 0;
    background: white;
  }
  
  .overview-content {
    text-align: center;
    max-width: 900px;
    margin: 0 auto;
  }
  
  .overview-content h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1F2937;
    margin-bottom: 1.5rem;
  }
  
  .overview-lead {
    font-size: 1.25rem;
    color: #4B5563;
    line-height: 1.7;
    margin-bottom: 3rem;
  }
  
  .framework-components {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }
  
  .component-card {
    background: #F8FAFC;
    border-radius: 1rem;
    padding: 2rem;
    text-align: center;
    border: 1px solid #E5E7EB;
  }
  
  .component-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .component-card h3 {
    font-size: 1.375rem;
    font-weight: 600;
    color: #1F2937;
    margin-bottom: 1rem;
  }
  
  .component-card p {
    color: #6B7280;
    line-height: 1.6;
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
    font-size: 2.25rem;
    font-weight: 700;
    color: #2B4B8C;
    margin-bottom: 1rem;
  }
  
  .compass-header p {
    font-size: 1.125rem;
    color: #4B5563;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
  
  /* Implementation Section */
  .implementation-section {
    padding: 4rem 0;
    background: white;
  }
  
  .implementation-section h2 {
    font-size: 2.25rem;
    font-weight: 700;
    color: #1F2937;
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .implementation-steps {
    display: grid;
    gap: 2rem;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .step {
    display: flex;
    gap: 2rem;
    align-items: flex-start;
    padding: 2rem;
    background: #F9FAFB;
    border-radius: 1rem;
    border-left: 4px solid #2B4B8C;
  }
  
  .step-number {
    background: #2B4B8C;
    color: white;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.25rem;
    flex-shrink: 0;
  }
  
  .step-content h3 {
    font-size: 1.375rem;
    font-weight: 600;
    color: #1F2937;
    margin-bottom: 0.75rem;
  }
  
  .step-content p {
    color: #4B5563;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  
  .step-button {
    background: #2B4B8C;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-block;
  }
  
  .step-button:hover {
    background: #1e3a72;
    transform: translateY(-1px);
  }
  
  .step-button.completed {
    background: #059669;
  }
  
  .step-button.completed:hover {
    background: #047857;
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
    font-size: 2.25rem;
    font-weight: 700;
    color: #1F2937;
    margin-bottom: 1rem;
  }
  
  .cta-content p {
    font-size: 1.125rem;
    color: #4B5563;
    margin-bottom: 2rem;
    line-height: 1.6;
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
    gap: 0.5rem;
    padding: 0.875rem 2rem;
    border-radius: 0.5rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
    border: none;
    cursor: pointer;
  }
  
  .button-gold {
    background-color: #DAA520;
    color: white;
  }
  
  .button-gold:hover {
    background-color: #B8860B;
    transform: translateY(-2px);
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
    
    .hero-actions,
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
    
    .step {
      flex-direction: column;
      gap: 1rem;
    }
    
    .step-number {
      align-self: flex-start;
    }
    
    .framework-components {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
</style>
