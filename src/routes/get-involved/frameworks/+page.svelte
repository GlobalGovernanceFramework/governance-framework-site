<!-- src/routes/get-involved/frameworks/+page.svelte -->
<script>
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';

  export let data;

  console.log('Frameworks page loading...');

  $: currentLocale = $locale;

  // Reactive variables for content loading
  let guideContent = null;
  let contentUsingEnglishFallback = false;
  let isLoading = true;
  let loadError = false;

  // Reactive function to load markdown based on current locale
  async function loadMarkdownContent(locale) {
    if (!locale) return;
    
    isLoading = true;
    loadError = false;
    contentUsingEnglishFallback = false;
    
    try {
      console.log(`Loading frameworks guide for locale: ${locale}`);
      
      // Try to load the current locale version
      const module = await import(`$lib/content/get-involved/frameworks/${locale}/frameworks-guide.md`);
      guideContent = module.default;
      console.log('Successfully loaded frameworks guide for locale:', locale);
      
    } catch (e) {
      console.log('Falling back to English frameworks guide, error was:', e.message);
      
      // Fall back to English if translation isn't available
      try {
        const module = await import(`$lib/content/get-involved/frameworks/en/frameworks-guide.md`);
        guideContent = module.default;
        console.log('Successfully loaded English frameworks guide fallback');
        
        // Track that this content is using English fallback
        if (locale !== 'en') {
          contentUsingEnglishFallback = true;
        }
      } catch (e2) {
        console.error("Failed to load any frameworks guide content:", e2);
        loadError = true;
      }
    }
    
    isLoading = false;
  }

  // Reactive statement to reload content when locale changes
  $: if (browser && currentLocale) {
    loadMarkdownContent(currentLocale);
  }

  // Initial load on mount
  onMount(() => {
    console.log('Component mounted with locale:', currentLocale);
    if (currentLocale) {
      loadMarkdownContent(currentLocale);
    }
  });

  // Bilingual fallback text
  const fallbackText = {
    en: {
      title: 'Framework Development',
      subtitle: 'Create governance frameworks that enable system interoperability',
      heroIntro: 'Join our community of framework developers and help create tools that enable different governance systems to communicate, collaborate, and evolve together.',
      downloadGuide: 'Download Development Guide',
      joinDevelopers: 'Join Framework Community',
      downloadMarkdown: 'Download Markdown Version',
      downloadPdf: 'Download PDF Version',
      joinDiscord: 'Join Our Framework Community',
      getStarted: 'Ready to Build Frameworks?',
      guideDescription: 'Get the complete framework developer\'s guide with authoring workflows, quality standards, and collaboration approaches.',
      communityDescription: 'Connect with other framework developers, share your work, and coordinate on governance innovation projects.',
      errorTitle: 'Framework Guide Not Available',
      errorText: 'The framework development guide could not be loaded. Please try again later or contact our development team.',
      caseStudies: 'View Case Studies',
      caseStudiesDescription: 'Explore real-world examples of governance frameworks in action and learn from implementation experiences.'
    },
    sv: {
      title: 'Ramverksutveckling',
      subtitle: 'Skapa styrningsramverk som möjliggör systeminteroperabilitet',
      heroIntro: 'Gå med i vår gemenskap av ramverksutvecklare och hjälp till att skapa verktyg som gör det möjligt för olika styrningssystem att kommunicera, samarbeta och utvecklas tillsammans.',
      downloadGuide: 'Ladda ner utvecklingsguide',
      joinDevelopers: 'Gå med i ramverksgemenskap',
      downloadMarkdown: 'Ladda ner Markdown-version',
      downloadPdf: 'Ladda ner PDF-version',
      joinDiscord: 'Gå med i vår ramverksgemenskap',
      getStarted: 'Redo att bygga ramverk?',
      guideDescription: 'Få den kompletta ramverksutvecklarens guide med författararbetsflöden, kvalitetsstandarder och samarbetsmetoder.',
      communityDescription: 'Anslut dig till andra ramverksutvecklare, dela ditt arbete och koordinera innovationsprojekt för styrning.',
      errorTitle: 'Ramverksguide inte tillgänglig',
      errorText: 'Ramverksutvecklingsguiden kunde inte laddas. Vänligen försök igen senare eller kontakta vårt utvecklingsteam.',
      caseStudies: 'Visa fallstudier',
      caseStudiesDescription: 'Utforska verkliga exempel på styrningsramverk i praktiken och lär dig av implementeringserfarenheter.'
    }
  };

  // Simple text function with language support
  function getText(key) {
    // Try the translation system first
    let value = $t(`frameworks.${key}`);
   
    // If we get a value that's not just the key, use it
    if (value && value !== '' && value !== `frameworks.${key}`) {
      return value;
    }
    
    // Fallback to language-specific text
    const langTexts = fallbackText[currentLocale] || fallbackText.en;
    return langTexts[key] || fallbackText.en[key] || key;
  }

  function downloadMarkdown() {
    const filename = `frameworks-guide-${currentLocale}.md`;
    const link = document.createElement('a');
    link.href = `${base}/get-involved/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function downloadPdf() {
    const filename = `frameworks-guide-${currentLocale}.pdf`;
    const link = document.createElement('a');
    link.href = `${base}/get-involved/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function joinDiscord() {
    window.open('https://discord.gg/Zx4hMJf4JU', '_blank');
  }

  function viewCaseStudies() {
    window.open(`${base}/frameworks/docs/case-studies`, '_self');
  }
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

    <!-- Quick Actions Card -->
    <div class="action-cards">
      <div class="action-card downloads-card">
        <div class="card-icon">📋</div>
        <div class="card-content">
          <h3>{getText('downloadGuide')}</h3>
          <p>{getText('guideDescription')}</p>
          <div class="card-actions">
            <button class="primary-btn" on:click={downloadMarkdown}>
              {getText('downloadMarkdown')} <span class="download-icon">↓</span>
            </button>
            <button class="secondary-btn" on:click={downloadPdf}>
              {getText('downloadPdf')} <span class="download-icon">↓</span>
            </button>
          </div>
        </div>
      </div>

      <div class="action-card community-card">
        <div class="card-icon">🤝</div>
        <div class="card-content">
          <h3>{getText('joinDevelopers')}</h3>
          <p>{getText('communityDescription')}</p>
          <div class="card-actions">
            <button class="primary-btn discord-btn" on:click={joinDiscord}>
              {getText('joinDiscord')} <span class="external-icon">↗</span>
            </button>
          </div>
        </div>
      </div>

      <div class="action-card examples-card">
        <div class="card-icon">📖</div>
        <div class="card-content">
          <h3>{getText('caseStudies')}</h3>
          <p>{getText('caseStudiesDescription')}</p>
          <div class="card-actions">
            <button class="primary-btn examples-btn" on:click={viewCaseStudies}>
              {getText('caseStudies')} <span class="external-icon">↗</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Guide Content -->
    <div class="guide-content">
      {#if isLoading}
        <div class="loading-state">
          <p>Loading content...</p>
        </div>
      {:else if loadError}
        <div class="error-state">
          <h2>{getText('errorTitle')}</h2>
          <p>{getText('errorText')}</p>
        </div>
      {:else if guideContent}
        <svelte:component this={guideContent} />
      {:else}
        <div class="error-state">
          <h2>{getText('errorTitle')}</h2>
          <p>{getText('errorText')}</p>
        </div>
      {/if}
    </div>

    <!-- Bottom Call-to-Action -->
    <div class="bottom-cta">
      <div class="cta-content">
        <h2>{getText('getStarted')}</h2>
        <div class="cta-actions">
          <button class="primary-btn large" on:click={downloadPdf}>
            {getText('downloadGuide')} <span class="download-icon">↓</span>
          </button>
          <button class="secondary-btn large discord-btn" on:click={joinDiscord}>
            {getText('joinDiscord')} <span class="external-icon">↗</span>
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

  .page-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .content {
    min-width: 0;
  }

  /* Hero Section */
  .hero-section {
    background: linear-gradient(135deg, var(--primary-blue), var(--secondary-purple));
    border-radius: 1rem;
    padding: 3rem 2rem;
    margin-bottom: 2rem;
    color: white;
    text-align: center;
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
  }

  .hero-intro {
    font-size: 1.125rem;
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto;
    opacity: 0.85;
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

  /* Action Cards */
  .action-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .action-card {
    background: white;
    border-radius: 0.75rem;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--border-color);
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .action-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }

  .downloads-card {
    border-top: 4px solid var(--primary-blue);
  }

  .community-card {
    border-top: 4px solid var(--earthy-green);
  }

  .examples-card {
    border-top: 4px solid var(--secondary-purple);
  }

  .card-icon {
    font-size: 2.5rem;
    flex-shrink: 0;
  }

  .card-content {
    flex: 1;
  }

  .card-content h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--primary-blue);
  }

  .card-content p {
    color: var(--content-text);
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  .card-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  /* Buttons */
  .primary-btn {
    background-color: var(--primary-blue);
    color: white;
    border: none;
    padding: 0.625rem 1.25rem;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .primary-btn:hover {
    background-color: var(--secondary-purple);
    transform: translateY(-1px);
  }

  .secondary-btn {
    background-color: white;
    color: var(--primary-blue);
    border: 1px solid var(--primary-blue);
    padding: 0.625rem 1.25rem;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .secondary-btn:hover {
    background-color: rgba(43, 75, 140, 0.05);
    transform: translateY(-1px);
  }

  .discord-btn {
    background-color: var(--earthy-green);
    color: white;
    border-color: var(--earthy-green);
  }

  .discord-btn:hover {
    background-color: #1f4a1f;
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

  .download-icon,
  .external-icon {
    font-size: 0.875rem;
    opacity: 0.8;
  }

  /* Guide Content */
  .guide-content {
    background: white;
    border-radius: 0.75rem;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid var(--border-color);
  }

  /* Content styling */
  .guide-content :global(h1) {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--primary-blue);
  }

  .guide-content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--secondary-purple);
  }

  .guide-content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--earthy-green);
  }

  .guide-content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: var(--content-text);
  }

  .guide-content :global(ul),
  .guide-content :global(ol) {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
    color: var(--content-text);
  }

  .guide-content :global(li) {
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }

  .guide-content :global(strong) {
    font-weight: 600;
    color: var(--primary-blue);
  }

  .guide-content :global(a) {
    color: var(--primary-blue);
    text-decoration: none;
    border-bottom: 1px solid rgba(43, 75, 140, 0.3);
    transition: all 0.2s;
  }

  .guide-content :global(a:hover) {
    color: var(--warm-gold);
    border-bottom-color: var(--warm-gold);
  }

  /* Bottom CTA */
  .bottom-cta {
    background: linear-gradient(135deg, var(--earthy-green), var(--primary-blue));
    border-radius: 1rem;
    padding: 3rem 2rem;
    text-align: center;
    color: white;
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

  .cta-actions .secondary-btn {
    background-color: transparent;
    color: white;
    border-color: white;
  }

  .cta-actions .secondary-btn:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  /* Error state */
  .error-state {
    text-align: center;
    padding: 3rem 2rem;
    color: var(--content-text);
  }

  .error-state h2 {
    color: var(--primary-blue);
    margin-bottom: 1rem;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .page-container {
      padding: 1rem;
    }

    .hero-section {
      padding: 2rem 1.5rem;
    }

    .hero-content h1 {
      font-size: 2rem;
    }

    .hero-subtitle {
      font-size: 1.125rem;
    }

    .hero-intro {
      font-size: 1rem;
    }

    .action-cards {
      grid-template-columns: 1fr;
    }

    .action-card {
      flex-direction: column;
      text-align: center;
      gap: 1rem;
    }

    .card-actions {
      justify-content: center;
    }

    .guide-content {
      padding: 1.5rem;
    }

    .bottom-cta {
      padding: 2rem 1.5rem;
    }

    .cta-content h2 {
      font-size: 1.5rem;
    }

    .cta-actions {
      flex-direction: column;
      width: 100%;
    }

    .cta-actions button {
      width: 100%;
      max-width: 300px;
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
