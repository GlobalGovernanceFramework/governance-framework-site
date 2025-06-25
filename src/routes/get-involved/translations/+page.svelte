<!-- src/routes/get-involved/translations/+page.svelte -->
<script>
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';

  export let data;

  console.log('Translations page loading...');

  $: currentLocale = $locale;

  // Reactive variables for content loading
  let contentUsingEnglishFallback = false;
  let isLoading = true;
  let loadError = false;

  // Simple text function with language support
  function getText(key) {
    // Try the translation system first
    let value = $t(`translations.${key}`);
   
    // If we get a value that's not just the key, use it
    if (value && value !== '' && value !== `translations.${key}`) {
      return value;
    }
    
    // Fallback to hardcoded bilingual text
    const fallbackText = {
      en: {
        title: 'Translation Hub',
        subtitle: 'Help make global governance frameworks accessible worldwide',
        heroIntro: 'Join our global community of translators making governance frameworks accessible to communities worldwide.',
        getStarted: 'Ready to Get Started?',
        contributionProcessTitle: 'Our Translation Process is Evolving',
        contributionProcessText: 'To focus on establishing our formal organization, we are temporarily pausing our real-time community channels and revising our translation guides. All translation coordination is currently being managed directly on GitHub. This is the best place to access our CONTRIBUTING.md guidelines, review existing translations, submit new translations, and collaborate with other translators.',
        communityGitHubCTA: 'Contribute on GitHub',
        errorTitle: 'Translation Guide Not Available',
        errorText: 'The translation guide could not be loaded. Please try again later or contact support.'
      },
      sv: {
        title: 'Översättningscentrum',
        subtitle: 'Hjälp till att göra ramverk för global styrning tillgängliga världen över',
        heroIntro: 'Gå med i vår globala gemenskap av översättare som gör styrningsramverk tillgängliga för samhällen världen över.',
        getStarted: 'Redo att komma igång?',
        contributionProcessTitle: 'Vår översättningsprocess utvecklas',
        contributionProcessText: 'För att fokusera på att etablera vår formella organisation pausar vi tillfälligt våra realtidsgemenskapskanaler och reviderar våra översättningsguider. All översättningskoordinering hanteras för närvarande direkt på GitHub. Det här är den bästa platsen för att komma åt våra CONTRIBUTING.md-riktlinjer, granska befintliga översättningar, skicka in nya översättningar och samarbeta med andra översättare.',
        communityGitHubCTA: 'Bidra på GitHub',
        errorTitle: 'Översättningsguide inte tillgänglig',
        errorText: 'Översättningsguiden kunde inte laddas. Vänligen försök igen senare eller kontakta support.'
      }
    };
    
    const langTexts = fallbackText[currentLocale] || fallbackText.en;
    return langTexts[key] || fallbackText.en[key] || key;
  }

  function openGitHub() {
    window.open('https://github.com/GlobalGovernanceFrameworks/website', '_blank');
  }

  // Set loading to false on mount since we're showing simplified guide
  onMount(() => {
    isLoading = false;
  });
</script>

<svelte:head>
  <title>{getText('title')} - Global Governance Framework</title>
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

    <!-- Language Fallback Notice -->
    {#if contentUsingEnglishFallback && currentLocale !== 'en'}
      <div class="language-fallback-notice">
        <div class="notice-icon">🌐</div>
        <div class="notice-content">
          <strong>{currentLocale === 'sv' ? 'Innehåll på svenska kommer snart' : 'Content in your language coming soon'}</strong>
          <p>{currentLocale === 'sv' ? 'Detta avsnitt visas för närvarande på engelska tills den svenska översättningen är klar.' : 'This section is currently displayed in English until translation is complete.'}</p>
        </div>
      </div>
    {/if}

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
  /* CSS Variables - Use home page color scheme */
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
    --success-green: #10b981;
    --warning-orange: #f59e0b;
    --error-red: #ef4444;
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

  /* Global Resets and Base Styles */
  * {
    box-sizing: border-box;
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
    color: var(--secondary-purple);
    flex-shrink: 0;
    margin-top: 0.125rem;
  }

  .notice-content {
    flex: 1;
  }

  .notice-content strong {
    color: var(--secondary-purple);
    font-size: 0.95rem;
    display: block;
    margin-bottom: 0.25rem;
  }

  .notice-content p {
    color: var(--content-text);
    font-size: 0.875rem;
    margin: 0;
    line-height: 1.5;
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

  .primary-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .github-btn {
    background-color: var(--text-dark);
    color: white;
    border-color: var(--text-dark);
  }

  .github-btn:hover {
    background-color: #1f2937;
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
  .primary-btn:focus {
    outline: 2px solid var(--warm-gold);
    outline-offset: 2px;
  }

  /* Print styles */
  @media print {
    .hero-section,
    .bottom-cta {
      display: none;
    }
    
    .contribution-section {
      box-shadow: none;
      border: none;
      padding: 0;
    }
    
    .page-container {
      padding: 0;
      max-width: none;
    }
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
      word-wrap: break-word;
      overflow-wrap: break-word;
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

    .contribution-actions .primary-btn {
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

    .language-fallback-notice {
      padding: 0.75rem 1rem;
      margin-bottom: 1.25rem;
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

    .contribution-actions .primary-btn {
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

    .language-fallback-notice {
      padding: 0.5rem 0.75rem;
    }
  }
</style>
