<!-- src/routes/get-involved/website/+page.svelte -->
<script>
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { invalidate } from '$app/navigation';

  export let data;

  console.log('Website page loading...');

  $: currentLocale = $locale;
  
  // Watch for locale changes and invalidate data if needed
  let previousLocale = currentLocale;
  $: if (browser && currentLocale !== previousLocale && previousLocale !== undefined) {
    console.log('Locale changed, invalidating data:', { from: previousLocale, to: currentLocale });
    previousLocale = currentLocale;
    invalidate('app:locale');
  }
  
  // Bilingual fallback text
  const fallbackText = {
    en: {
      title: "Website Development",
      subtitle: "Help build and improve our global governance platform",
      heroIntro: "Join our development community and contribute to building tools that enable governance system interoperability worldwide.",
      downloadGuide: "Download Website Contributor Guide",
      joinDevelopers: "Join Developer Community",
      downloadMarkdown: "Download Markdown Version",
      downloadPdf: "Download PDF Version",
      joinDiscord: "Join Our Developer Community",
      getStarted: "Ready to Start Coding?",
      guideDescription: "Get the complete guide for developers. Includes setup instructions, coding standards, and workflows for integrating new frameworks into our SvelteKit site.",
      communityDescription: "Connect with other developers, get code reviews, and collaborate on features in real-time.",
      errorTitle: "Website contributor guide Not Available",
      errorText: "The website contributor guide could not be loaded. Please try again later or contact our development team.",
      githubRepo: "View GitHub Repository",
      githubDescription: "Access the source code, submit issues, and contribute directly to the project."
    },
    sv: {
      title: "Webbutveckling",
      subtitle: "Hjälp till att bygga och förbättra vår globala styrningsplattform",
      heroIntro: "Gå med i vår utvecklargemenskap och bidra till att bygga verktyg som möjliggör interoperabilitet mellan styrningssystem världen över.",
      downloadGuide: "Ladda ner webbplatsens bidragsguide",
      joinDevelopers: "Gå med i utvecklargemenskap",
      downloadMarkdown: "Ladda ner Markdown-version",
      downloadPdf: "Ladda ner PDF-version",
      joinDiscord: "Gå med i vår utvecklargemenskap",
      getStarted: "Redo att börja koda?",
      guideDescription: "Få den kompletta guiden för utvecklare. Inkluderar installationsinstruktioner, kodningsstandarder och arbetsflöden för att integrera nya ramverk i vår SvelteKit-webbplats.",
      communityDescription: "Anslut dig till andra utvecklare, få kodgranskningar och samarbeta om funktioner i realtid.",
      errorTitle: "Webbplatsens bidragsguide inte tillgänglig",
      errorText: "Webbplatsens bidragsguide kunde inte laddas. Vänligen försök igen senare eller kontakta vårt utvecklingsteam.",
      githubRepo: "Visa GitHub-arkiv",
      githubDescription: "Få tillgång till källkoden, skicka in problem och bidra direkt till projektet."
    }
  };

  // Simple text function with language support
  function getText(key) {
    // Try the translation system first
    let value = $t(`website.${key}`);
   
    // If we get a value that's not just the key, use it
    if (value && value !== '' && value !== `website.${key}`) {
      return value;
    }
    
    // Fallback to language-specific text
    const langTexts = fallbackText[currentLocale] || fallbackText.en;
    return langTexts[key] || fallbackText.en[key] || key;
  }

  function downloadMarkdown() {
    const filename = `website-guide-${currentLocale}.md`;
    const link = document.createElement('a');
    link.href = `${base}/get-involved/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function downloadPdf() {
    const filename = `website-guide-${currentLocale}.pdf`;
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

  function viewGitHub() {
    window.open('https://github.com/GlobalGovernanceFrameworks/website', '_blank');
  }

  onMount(() => {
    console.log('Component mounted with locale:', currentLocale);
    console.log('Content using English fallback:', data.contentUsingEnglishFallback);
    previousLocale = currentLocale; // Initialize previous locale
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
    {#if data.contentUsingEnglishFallback && currentLocale !== 'en'}
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
        <div class="card-icon">💻</div>
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
        <div class="card-icon">👥</div>
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

      <div class="action-card github-card">
        <div class="card-icon">🔧</div>
        <div class="card-content">
          <h3>{getText('githubRepo')}</h3>
          <p>{getText('githubDescription')}</p>
          <div class="card-actions">
            <button class="primary-btn github-btn" on:click={viewGitHub}>
              View on GitHub <span class="external-icon">↗</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Guide Content -->
    <div class="guide-content">
      {#if data?.guideContent}
        <svelte:component this={data.guideContent} />
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
          <button class="primary-btn large" on:click={viewGitHub}>
            View on GitHub <span class="external-icon">↗</span>
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

  .github-card {
    border-top: 4px solid var(--dark-gold);
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

  .github-btn {
    background-color: #24292e;
    color: white;
    border-color: #24292e;
  }

  .github-btn:hover {
    background-color: #1a1e22;
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

  .guide-content :global(code) {
    background-color: #f1f5f9;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-family: 'Monaco', 'Consolas', monospace;
    font-size: 0.875rem;
  }

  .guide-content :global(pre) {
    background-color: #1e293b;
    color: #e2e8f0;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1rem 0;
  }

  .guide-content :global(pre code) {
    background-color: transparent;
    padding: 0;
    color: inherit;
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
  }
</style>
