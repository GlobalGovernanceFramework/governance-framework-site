<!-- src/routes/get-involved/frameworks/+page.svelte -->
<script>
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { base } from '$app/paths';
  import { onMount, afterUpdate } from 'svelte';
  import { invalidate, afterNavigate } from '$app/navigation';

  export let data;

  console.log('Page loading...');

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
  
  // Simple fallback text
  const fallbackText = {
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
  };

  // Simple text function - try multiple ways to get translations
  function getText(key) {
    // Try the translation system with the correct nested path
    let value = $t(`frameworks.${key}`);
   
    // If we get a value, use it, otherwise use fallback
    if (value && value !== '') {
      return value;
    }
    
    // Fallback to hardcoded text
    return fallbackText[key] || key;
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

  onMount(() => {
    console.log('Frameworks contribution page mounted successfully');
    console.log('Component mounted with locale:', currentLocale); // ✅ Add debug log
    console.log('Content using English fallback:', data.contentUsingEnglishFallback); // ✅ Add debug log
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
              View Examples <span class="external-icon">↗</span>
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

  .guide-content :global(strong) {
    font-weight: 600;
    color: var(--primary-blue);
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
