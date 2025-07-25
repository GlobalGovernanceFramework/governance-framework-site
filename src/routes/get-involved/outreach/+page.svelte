<!-- src/routes/get-involved/outreach/+page.svelte -->
<script>
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';

  export let data;

  console.log('Outreach page loading...');

  $: currentLocale = $locale;

  // Show simplified guide instead of full markdown content
  let isLoading = true;
  let loadError = false;

  // Simple text function with language support
  function getText(key) {
    // Try the translation system first
    let value = $t(`outreach.${key}`);
   
    // If we get a value that's not just the key, use it
    if (value && value !== '' && value !== `outreach.${key}`) {
      return value;
    }
    
    // Fallback to hardcoded bilingual text
    const fallbackText = {
      en: {
        title: 'Community & Outreach',
        subtitle: 'Help spread our vision for cooperative governance worldwide',
        heroIntro: 'Join our global community of advocates and help share tools for better governance with communities, organizations, and leaders worldwide.',
        getStarted: 'Ready to Make an Impact?',
        outreachChannelsTitle: 'Community & Outreach Channels Under Review',
        outreachChannelsText: 'As we focus on the foundational work of establishing our formal organization, our real-time community and outreach channels are temporarily private. We are currently revising our outreach guides and advocacy kits to align with new, more sustainable contribution workflows. While our interactive channels are paused, the best way to understand our mission and message is by exploring our core frameworks and reading our blog. We look forward to re-launching our community and outreach program in the near future.',
        exploreFrameworks: 'Explore Our Frameworks',
        readBlog: 'Read Our Blog',
        errorTitle: 'Outreach Guide Not Available',
        errorText: 'The outreach guide could not be loaded. Please try again later or contact our community team.'
      },
      sv: {
        title: 'Gemenskap & uppsökande verksamhet',
        subtitle: 'Hjälp till att sprida vår vision för kooperativ styrning världen över',
        heroIntro: 'Gå med i vår globala gemenskap av förespråkare och hjälp till att dela verktyg för bättre styrning med samhällen, organisationer och ledare världen över.',
        getStarted: 'Redo att göra skillnad?',
        outreachChannelsTitle: 'Gemenskaps- och uppsökningskanaler under översyn',
        outreachChannelsText: 'När vi fokuserar på det grundläggande arbetet med att etablera vår formella organisation är våra realtidsgemenskaps- och uppsökningskanaler tillfälligt privata. Vi reviderar för närvarande våra uppsökningsguider och argumentationskit för att anpassa dem till nya, mer hållbara bidragsarbetsflöden. Medan våra interaktiva kanaler är pausade är det bästa sättet att förstå vårt uppdrag och budskap att utforska våra kärnramverk och läsa vår blogg. Vi ser fram emot att återlansera vårt gemenskaps- och uppsökningsprogram inom en snar framtid.',
        exploreFrameworks: 'Utforska våra ramverk',
        readBlog: 'Läs vår blogg',
        errorTitle: 'Uppsökningsguide inte tillgänglig',
        errorText: 'Uppsökningsguiden kunde inte laddas. Vänligen försök igen senare eller kontakta vårt gemenskapsteam.'
      }
    };
    
    const langTexts = fallbackText[currentLocale] || fallbackText.en;
    return langTexts[key] || fallbackText.en[key] || key;
  }

  function exploreFrameworks() {
    window.open(`${base}/frameworks`, '_self');
  }

  function readBlog() {
    window.open(`${base}/blog`, '_self');
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

    <!-- Single "Outreach Channels Under Review" Section -->
    <div class="contribution-section">
      <div class="contribution-content">
        <div class="contribution-header">
          <div class="contribution-icon">🔄</div>
          <div>
            <h2>{getText('outreachChannelsTitle')}</h2>
          </div>
        </div>
        
        <div class="contribution-body">
          <p>{getText('outreachChannelsText')}</p>
          
          <div class="contribution-actions">
            <button class="primary-btn large frameworks-btn" on:click={exploreFrameworks}>
              {getText('exploreFrameworks')} <span class="external-icon">↗</span>
            </button>
            <button class="secondary-btn large blog-btn" on:click={readBlog}>
              {getText('readBlog')} <span class="external-icon">↗</span>
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
          <button class="primary-btn large frameworks-btn" on:click={exploreFrameworks}>
            {getText('exploreFrameworks')} <span class="external-icon">↗</span>
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
    background-color: var(--primary-blue);
    color: white;
    font-size: 1.125rem;
    padding: 1rem 2.5rem;
    font-weight: 600;
  }

  .contribution-actions .primary-btn:hover {
    background-color: var(--secondary-purple);
  }

  .contribution-actions .secondary-btn {
    background-color: var(--warm-gold);
    color: var(--primary-blue);
    border-color: var(--warm-gold);
  }

  .contribution-actions .secondary-btn:hover {
    background-color: var(--dark-gold);
    color: white;
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

  .frameworks-btn {
    background-color: var(--primary-blue);
    color: white;
    border-color: var(--primary-blue);
  }

  .frameworks-btn:hover {
    background-color: var(--secondary-purple);
  }

  .blog-btn {
    background-color: var(--warm-gold);
    color: var(--primary-blue);
    border-color: var(--warm-gold);
  }

  .blog-btn:hover {
    background-color: var(--dark-gold);
    color: white;
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
