<!-- src/routes/get-involved/translations/+page.svelte -->
<script>
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { base } from '$app/paths';
  import { onMount, afterUpdate } from 'svelte';
  import { invalidate, afterNavigate } from '$app/navigation';

  export let data;

  console.log('Translation page loading...');

  $: currentLocale = $locale;
  
  let previousLocale = null;
  let isFirstLoad = true;
  
  // ✅ Use afterNavigate to handle the timing better
  afterNavigate(() => {
    if (isFirstLoad) {
      previousLocale = currentLocale;
      isFirstLoad = false;
      console.log('Initial navigation complete, locale set to:', currentLocale);
    }
  });
  
  // ✅ Watch for locale changes after navigation is complete
  afterUpdate(() => {
    if (browser && !isFirstLoad && currentLocale !== previousLocale) {
      console.log('Locale changed after update:', { from: previousLocale, to: currentLocale });
      previousLocale = currentLocale;
      
      // Invalidate with a small delay to ensure the change is processed
      setTimeout(() => {
        console.log('Invalidating page data...');
        invalidate('app:locale');
      }, 50);
    }
  });
  
  // Bilingual fallback text
  const fallbackText = {
    en: {
      title: 'Translation Hub',
      subtitle: 'Help make global governance frameworks accessible worldwide',
      heroIntro: 'Join our global community of translators making governance frameworks accessible to communities worldwide.',
      downloadKit: 'Download Translation Kit',
      joinCommunity: 'Join Community',
      downloadMarkdown: 'Download Markdown Version',
      downloadPdf: 'Download PDF Version',
      joinDiscord: 'Join Our Translation Community',
      getStarted: 'Ready to Get Started?',
      kitDescription: 'Get the complete translator\'s kit with technical setup, guidelines, and community information.',
      communityDescription: 'Connect with other translators, get help, and coordinate translation efforts in real-time.',
      errorTitle: 'Translation Guide Not Available',
      errorText: 'The translation guide could not be loaded. Please try again later or contact support.'
    },
    sv: {
      title: 'Översättningscentrum',
      subtitle: 'Hjälp till att göra ramverk för global styrning tillgängliga världen över',
      heroIntro: 'Gå med i vår globala gemenskap av översättare som gör styrningsramverk tillgängliga för samhällen världen över.',
      downloadKit: 'Ladda ner översättningskit',
      joinCommunity: 'Gå med i gemenskapen',
      downloadMarkdown: 'Ladda ner Markdown-version',
      downloadPdf: 'Ladda ner PDF-version',
      joinDiscord: 'Gå med i vår översättningsgemenskap',
      getStarted: 'Redo att komma igång?',
      kitDescription: 'Få det kompletta översättningskitet med teknisk installation, riktlinjer och gemenskapsinformation.',
      communityDescription: 'Anslut dig till andra översättare, få hjälp och koordinera översättningsinsatser i realtid.',
      errorTitle: 'Översättningsguide inte tillgänglig',
      errorText: 'Översättningsguiden kunde inte laddas. Vänligen försök igen senare eller kontakta support.'
    }
  };

  // Simple text function with language support
  function getText(key) {
    // Try the translation system first
    let value = $t(`translations.${key}`);
   
    // If we get a value that's not just the key, use it
    if (value && value !== '' && value !== `translations.${key}`) {
      return value;
    }
    
    // Fallback to language-specific text
    const langTexts = fallbackText[currentLocale] || fallbackText.en;
    return langTexts[key] || fallbackText.en[key] || key;
  }

  function downloadMarkdown() {
    const filename = `translation-guide-${currentLocale}.md`;
    const link = document.createElement('a');
    link.href = `${base}/get-involved/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function downloadPdf() {
    const filename = `translation-guide-${currentLocale}.pdf`;
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

  onMount(() => {
    console.log('Component mounted with locale:', currentLocale); // Debug log
    console.log('Content using English fallback:', data.contentUsingEnglishFallback); // Debug log
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
        <div class="card-icon">📘</div>
        <div class="card-content">
          <h3>{getText('downloadKit')}</h3>
          <p>{getText('kitDescription')}</p>
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
        <div class="card-icon">💬</div>
        <div class="card-content">
          <h3>{getText('joinCommunity')}</h3>
          <p>{getText('communityDescription')}</p>
          <div class="card-actions">
            <button class="primary-btn discord-btn" on:click={joinDiscord}>
              {getText('joinDiscord')} <span class="external-icon">↗</span>
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
          <button class="primary-btn large" on:click={downloadPdf}>
            {getText('downloadPdf')} <span class="download-icon">↓</span>
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
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    position: relative;
    overflow: hidden;
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

  .card-icon {
    font-size: 2.5rem;
    flex-shrink: 0;
    line-height: 1;
  }

  .card-content {
    flex: 1;
    min-width: 0;
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
  }

  .secondary-btn:hover {
    background-color: rgba(43, 75, 140, 0.05);
    transform: translateY(-1px);
  }

  .secondary-btn:active {
    transform: translateY(0);
  }

  .discord-btn {
    background-color: var(--earthy-green);
    color: white;
    border-color: var(--earthy-green);
  }

  .discord-btn:hover {
    background-color: #1f4a1f;
  }

  .large {
    padding: 0.875rem 2rem;
    font-size: 1.125rem;
  }

  .download-icon,
  .external-icon {
    font-size: 0.875rem;
    opacity: 0.8;
    flex-shrink: 0;
  }

  /* Guide Content */
  .guide-content {
    background: white;
    border-radius: 0.75rem;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid var(--border-color);
    overflow-wrap: break-word;
  }

  /* Global Content Styling for Markdown/Dynamic Content */
  .guide-content :global(*) {
    max-width: 100%;
  }

  .guide-content :global(h1) {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    margin-top: 0;
    color: var(--primary-blue);
    line-height: 1.2;
  }

  .guide-content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--secondary-purple);
    line-height: 1.3;
    border-bottom: 2px solid var(--border-color);
    padding-bottom: 0.5rem;
  }

  .guide-content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--text-dark);
    line-height: 1.3;
  }

  .guide-content :global(h4) {
    font-size: 1.125rem;
    font-weight: 600;
    margin-top: 1.25rem;
    margin-bottom: 0.5rem;
    color: var(--text-dark);
  }

  .guide-content :global(h5),
  .guide-content :global(h6) {
    font-size: 1rem;
    font-weight: 600;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    color: var(--text-dark);
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

  .guide-content :global(li > ul),
  .guide-content :global(li > ol) {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .guide-content :global(blockquote) {
    border-left: 4px solid var(--primary-blue);
    background-color: rgba(43, 75, 140, 0.05);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0 0.5rem 0.5rem 0;
    font-style: italic;
    color: var(--text-dark);
  }

  .guide-content :global(code) {
    background-color: #f3f4f6;
    color: #e11d48;
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-size: 0.875em;
    font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
  }

  .guide-content :global(pre) {
    background-color: #1f2937;
    color: #f9fafb;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1rem 0;
    font-size: 0.875rem;
    line-height: 1.5;
  }

  .guide-content :global(pre code) {
    background-color: transparent;
    color: inherit;
    padding: 0;
    border-radius: 0;
    font-size: inherit;
  }

  .guide-content :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    font-size: 0.875rem;
    overflow-x: auto;
    display: block;
    white-space: nowrap;
  }

  .guide-content :global(thead) {
    background-color: var(--light-background);
  }

  .guide-content :global(th),
  .guide-content :global(td) {
    border: 1px solid var(--border-color);
    padding: 0.75rem;
    text-align: left;
    vertical-align: top;
  }

  .guide-content :global(th) {
    font-weight: 600;
    color: var(--text-dark);
    background-color: rgba(43, 75, 140, 0.05);
  }

  .guide-content :global(td) {
    color: var(--content-text);
  }

  .guide-content :global(a) {
    color: var(--primary-blue);
    text-decoration: underline;
    transition: color 0.2s ease;
  }

  .guide-content :global(a:hover) {
    color: var(--secondary-purple);
  }

  .guide-content :global(strong) {
    font-weight: 600;
    color: var(--text-dark);
  }

  .guide-content :global(em) {
    font-style: italic;
  }

  .guide-content :global(hr) {
    border: none;
    border-top: 2px solid var(--border-color);
    margin: 2rem 0;
  }

  .guide-content :global(img) {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    margin: 1rem 0;
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
    background-color: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 0.75rem;
  }

  .error-state h2 {
    color: var(--error-red);
    margin-bottom: 1rem;
  }

  .error-state p {
    margin-bottom: 0.5rem;
  }

  /* Loading state styles */
  .loading-state {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem;
    color: var(--content-text);
  }

  .loading-spinner {
    width: 2rem;
    height: 2rem;
    border: 2px solid var(--border-color);
    border-top: 2px solid var(--primary-blue);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-right: 1rem;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Focus states for accessibility */
  .primary-btn:focus,
  .secondary-btn:focus {
    outline: 2px solid var(--warm-gold);
    outline-offset: 2px;
  }

  .guide-content :global(a:focus) {
    outline: 2px solid var(--warm-gold);
    outline-offset: 2px;
    border-radius: 2px;
  }

  /* Print styles */
  @media print {
    .hero-section,
    .action-cards,
    .bottom-cta {
      display: none;
    }
    
    .guide-content {
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

    .card-actions button {
      flex: 1;
      min-width: 0;
    }

    .guide-content {
      padding: 1.5rem;
    }

    .guide-content :global(h1) {
      font-size: 1.75rem;
    }

    .guide-content :global(h2) {
      font-size: 1.375rem;
    }

    .guide-content :global(table) {
      font-size: 0.75rem;
    }

    .guide-content :global(pre) {
      font-size: 0.75rem;
      padding: 0.75rem;
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

  @media (max-width: 480px) {
    .hero-content h1 {
      font-size: 1.75rem;
    }

    .hero-subtitle {
      font-size: 1rem;
    }

    .hero-intro {
      font-size: 0.925rem;
    }

    .action-card {
      padding: 1.5rem;
    }

    .guide-content {
      padding: 1rem;
    }

    .guide-content :global(h1) {
      font-size: 1.5rem;
    }

    .guide-content :global(h2) {
      font-size: 1.25rem;
    }

    .cta-content h2 {
      font-size: 1.375rem;
    }
  }
</style>
