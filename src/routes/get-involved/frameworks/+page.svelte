<!-- src/routes/get-involved/frameworks/+page.svelte -->
<script>
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';

  export let data;

  console.log('Frameworks page loading...');

  $: currentLocale = $locale;

  // Show simplified guide instead of full markdown content
  let isLoading = true;
  let loadError = false;

  // Simple text function with language support
  function getText(key) {
    // Try the translation system first
    let value = $t(`frameworks.${key}`);
   
    // If we get a value that's not just the key, use it
    if (value && value !== '' && value !== `frameworks.${key}`) {
      return value;
    }
    
    // Fallback to hardcoded bilingual text
    const fallbackText = {
      en: {
        title: 'Framework Development',
        subtitle: 'Create governance frameworks that enable system interoperability',
        heroIntro: 'Join our community of framework developers and help create tools that enable different governance systems to communicate, collaborate, and evolve together.',
        getStarted: 'Ready to Build Frameworks?',
        contributionProcessTitle: 'Our Framework Development Process is Evolving',
        contributionProcessText: 'To focus on establishing our formal organization, we are temporarily pausing our real-time community channels and revising our framework development guides. All framework development coordination is currently being managed directly on GitHub. This is the best place to access our CONTRIBUTING.md guidelines, review existing frameworks, contribute new frameworks, and collaborate with other developers.',
        communityGitHubCTA: 'Contribute on GitHub',
        caseStudies: 'View Case Studies',
        caseStudiesDescription: 'Explore real-world examples of governance frameworks in action and learn from implementation experiences.',
        errorTitle: 'Framework Guide Not Available',
        errorText: 'The framework development guide could not be loaded. Please try again later or contact our development team.'
      },
      sv: {
        title: 'Ramverksutveckling',
        subtitle: 'Skapa styrningsramverk som möjliggör systeminteroperabilitet',
        heroIntro: 'Gå med i vår gemenskap av ramverksutvecklare och hjälp till att skapa verktyg som möjliggör för olika styrsystem att kommunicera, samarbeta och utvecklas tillsammans.',
        getStarted: 'Redo att bygga ramverk?',
        contributionProcessTitle: 'Vår ramverksutvecklingsprocess utvecklas',
        contributionProcessText: 'För att fokusera på att etablera vår formella organisation pausar vi tillfälligt våra realtidsgemenskapskanaler och reviderar våra ramverksutvecklingsguider. All ramverksutvecklingskoordinering hanteras för närvarande direkt på GitHub. Det här är den bästa platsen för att komma åt våra CONTRIBUTING.md-riktlinjer, granska befintliga ramverk, bidra med nya ramverk och samarbeta med andra utvecklare.',
        communityGitHubCTA: 'Bidra på GitHub',
        caseStudies: 'Visa fallstudier',
        caseStudiesDescription: 'Utforska verkliga exempel på styrningsramverk i aktion och lär av implementeringserfarenheter.',
        errorTitle: 'Ramverksguide inte tillgänglig',
        errorText: 'Ramverksutvecklingsguiden kunde inte laddas. Försök igen senare eller kontakta vårt utvecklingsteam.'
      }
    };
    
    const langTexts = fallbackText[currentLocale] || fallbackText.en;
    return langTexts[key] || fallbackText.en[key] || key;
  }

  function openGitHub() {
    window.open('https://github.com/GlobalGovernanceFrameworks/website', '_blank');
  }

  function viewCaseStudies() {
    window.open(`${base}/frameworks/docs/case-studies`, '_self');
  }

  // Set loading to false on mount since we're showing simplified guide
  onMount(() => {
    isLoading = false;
  });
</script>

<svelte:head>
  <title>{getText('title')} - Global Governance Frameworks</title>
  <meta name="description" content={getText('subtitle')} />
</svelte:head>

<div class="page-container">
  <div class="content">
   
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1>{getText('title')}</h1>
        <p class="hero-subtitle">{getText('subtitle')}</p>
        <p class="hero-intro">{getText('heroIntro')}</p>
      </div>
    </div>

    <!-- Single "How to Contribute Now" Section -->
    <div class="contribution-section">
      <div class="contribution-content">
        <div class="contribution-header">
          <div class="contribution-icon">🔄</div>
          <div>
            <h2>{getText('contributionProcessTitle')}</h2>
          </div>
        </div>
        
        <div class="contribution-body">
          <p>{getText('contributionProcessText')}</p>
          
          <div class="contribution-actions">
            <button class="primary-btn large github-btn" on:click={openGitHub}>
              {getText('communityGitHubCTA')} <span class="external-icon">↗</span>
            </button>
            <button class="secondary-btn large examples-btn" on:click={viewCaseStudies}>
              {getText('caseStudies')} <span class="external-icon">↗</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Simplified Bottom Call-to-Action -->
    <div class="bottom-cta">
      <div class="cta-content">
        <h2>{getText('getStarted')}</h2>
        <div class="cta-actions">
          <button class="primary-btn large github-btn" on:click={openGitHub}>
            {getText('communityGitHubCTA')} <span class="external-icon">↗</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* Use home page color scheme */
  :root {
    --primary-blue: #2B4B8C;
    --secondary-purple: #6B5CA5;
    --earthy-green: #2D5F2D;
    --warm-gold: #DAA520;
    --dark-gold: #B8860B;
    --light-background: #f8fafc;
    --content-text: #4b5563;
    --border-color: #e5e7eb;
    --text-dark: #374151;
    --text-light: #6b7280;
    --warning-orange: #f59e0b;
  }

  .page-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
    min-height: 100vh;
    background-color: var(--light-background);
  }

  .content {
    min-width: 0;
    width: 100%;
  }

  /* Typography Defaults */
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    line-height: 1.2;
    font-weight: 600;
  }

  p {
    margin: 0;
    line-height: 1.6;
  }

  /* Hero Section */
  .hero-section {
    background: linear-gradient(135deg, var(--primary-blue), var(--secondary-purple));
    border-radius: 1rem;
    padding: 3rem 2rem;
    margin-bottom: 2rem;
    color: white;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .hero-content {
    max-width: 800px;
    margin: 0 auto;
  }

  .hero-content h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: white;
  }

  .hero-subtitle {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
    opacity: 0.9;
    font-weight: 400;
  }

  .hero-intro {
    font-size: 1.125rem;
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto;
    opacity: 0.85;
    font-weight: 300;
  }

  /* Contribution Section */
  .contribution-section {
    background: white;
    border-radius: 1rem;
    padding: 0;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--border-color);
    overflow: hidden;
  }

  .contribution-content {
    background-color: rgba(245, 158, 11, 0.05);
    border: 1px solid rgba(245, 158, 11, 0.2);
    padding: 2.5rem;
  }

  .contribution-header {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .contribution-icon {
    font-size: 3rem;
    color: var(--warning-orange);
    flex-shrink: 0;
    line-height: 1;
  }

  .contribution-header h2 {
    color: var(--warning-orange);
    font-size: 1.875rem;
    font-weight: 700;
    margin: 0;
    line-height: 1.2;
  }

  .contribution-body p {
    color: var(--content-text);
    font-size: 1.25rem;
    line-height: 1.7;
    margin-bottom: 2.5rem;
    max-width: none;
  }

  .contribution-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .contribution-actions .primary-btn {
    background-color: var(--warning-orange);
    color: white;
    font-size: 1.125rem;
    padding: 1rem 2.5rem;
    font-weight: 600;
  }

  .contribution-actions .primary-btn:hover {
    background-color: #d97706;
  }

  .contribution-actions .secondary-btn {
    background-color: var(--secondary-purple);
    color: white;
    border-color: var(--secondary-purple);
  }

  .contribution-actions .secondary-btn:hover {
    background-color: var(--primary-blue);
  }

  /* Button Styles */
  button {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    margin: 0;
    outline: none;
    text-decoration: none;
    user-select: none;
  }

  .primary-btn {
    background-color: var(--primary-blue);
    color: white;
    border: none;
    padding: 0.625rem 1.25rem;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  .primary-btn:hover {
    background-color: var(--secondary-purple);
    transform: translateY(-1px);
  }

  .primary-btn:active {
    transform: translateY(0);
  }

  .secondary-btn {
    background-color: white;
    color: var(--primary-blue);
    border: 1px solid var(--primary-blue);
    padding: 0.625rem 1.25rem;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  .secondary-btn:hover {
    background-color: rgba(43, 75, 140, 0.05);
    transform: translateY(-1px);
  }

  .github-btn {
    background-color: var(--text-dark);
    color: white;
    border-color: var(--text-dark);
  }

  .github-btn:hover {
    background-color: #1f2937;
  }

  .examples-btn {
    background-color: var(--secondary-purple);
    color: white;
    border-color: var(--secondary-purple);
  }

  .examples-btn:hover {
    background-color: var(--primary-blue);
  }

  .large {
    padding: 0.875rem 2rem;
    font-size: 1.125rem;
  }

  .external-icon {
    font-size: 0.875rem;
    opacity: 0.8;
    flex-shrink: 0;
  }

  /* Loading state */
  .loading-state {
    text-align: center;
    padding: 3rem 2rem;
    color: var(--content-text);
  }
  
  .loading-state p {
    font-size: 1.125rem;
    opacity: 0.7;
  }

  /* Bottom CTA */
  .bottom-cta {
    background: linear-gradient(135deg, var(--earthy-green), var(--primary-blue));
    border-radius: 1rem;
    padding: 3rem 2rem;
    text-align: center;
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .cta-content {
    max-width: 600px;
    margin: 0 auto;
  }

  .cta-content h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: white;
  }

  .cta-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    align-items: center;
  }

  .cta-actions .primary-btn {
    background-color: var(--warm-gold);
    color: var(--primary-blue);
    font-weight: 600;
  }

  .cta-actions .primary-btn:hover {
    background-color: var(--dark-gold);
    color: white;
  }

  /* Focus states for accessibility */
  .primary-btn:focus,
  .secondary-btn:focus {
    outline: 2px solid var(--warm-gold);
    outline-offset: 2px;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .page-container {
      padding: 1rem 0.5rem;
    }

    .hero-section {
      padding: 2rem 1rem;
      margin-bottom: 1.5rem;
    }

    .hero-content h1 {
      font-size: 1.75rem;
      line-height: 1.1;
      margin-bottom: 0.75rem;
    }

    .hero-subtitle {
      font-size: 1rem;
      margin-bottom: 1rem;
    }

    .hero-intro {
      font-size: 0.95rem;
    }

    .contribution-section {
      margin-bottom: 1.5rem;
    }

    .contribution-content {
      padding: 2rem 1.5rem;
    }

    .contribution-header {
      flex-direction: column;
      text-align: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .contribution-header h2 {
      font-size: 1.5rem;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .contribution-body p {
      font-size: 1.125rem;
      line-height: 1.6;
      margin-bottom: 2rem;
    }

    .contribution-actions {
      flex-direction: column;
      align-items: center;
    }

    .contribution-actions .primary-btn,
    .contribution-actions .secondary-btn {
      width: 100%;
      max-width: 280px;
      font-size: 1rem;
      padding: 0.875rem 2rem;
    }

    .bottom-cta {
      padding: 2rem 1rem;
    }

    .cta-content h2 {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .cta-actions {
      flex-direction: column;
      width: 100%;
      gap: 0.75rem;
    }

    .cta-actions button {
      width: 100%;
      max-width: 280px;
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    .page-container {
      padding: 0.75rem 0.25rem;
    }

    .hero-content h1 {
      font-size: 1.5rem;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .hero-subtitle {
      font-size: 0.95rem;
    }

    .hero-intro {
      font-size: 0.9rem;
    }

    .contribution-content {
      padding: 1.5rem 1rem;
    }

    .contribution-header h2 {
      font-size: 1.25rem;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .contribution-body p {
      font-size: 1rem;
      margin-bottom: 1.5rem;
    }

    .contribution-actions .primary-btn,
    .contribution-actions .secondary-btn {
      max-width: 100%;
      font-size: 0.9rem;
      padding: 0.75rem 1.5rem;
    }

    .cta-content h2 {
      font-size: 1.25rem;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .cta-actions button {
      max-width: 100%;
      font-size: 0.85rem;
    }
  }
</style>
