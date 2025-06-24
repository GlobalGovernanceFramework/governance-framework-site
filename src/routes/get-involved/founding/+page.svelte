<!-- src/routes/get-involved/founding/+page.svelte -->
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
  
  // Bilingual fallback text
  const fallbackText = {
    en: {
      title: 'Our Path to Formalization',
      subtitle: 'Building a Durable Institution for Global Governance',
      heroIntro: 'Join us in establishing a formal organization to carry forward the Global Governance Frameworks mission for generations to come.',
      contactUs: 'Contact Us',
      joinFounding: 'Become a Founding Member',
      readMore: 'Read Full Details',
      emailSubject: 'Founding Team Inquiry',
      ctaTitle: 'Ready to Shape the Future?',
      ctaDescription: 'Help us transition from a research project into a durable institution that can address humanity\'s most pressing global challenges.',
      ctaContact: 'Join as Founding Member',
      ctaLearn: 'Learn About Our Mission',
      errorTitle: 'Content Not Available',
      errorText: 'The founding information could not be loaded. Please contact us directly for more information.',
      contactDescription: 'Get in touch to learn more about becoming a founding board member or offering professional advice.',
      missionDescription: 'Explore our comprehensive frameworks and understand the vision we\'re working to institutionalize.',
      contactLabel: 'Contact:',
      subjectLabel: 'Subject:'
    },
    sv: {
      title: 'Vår väg till formalisering',
      subtitle: 'Att bygga en varaktig institution för global styrning',
      heroIntro: 'Gå med oss i att etablera en formell organisation för att föra Global Governance Frameworks uppdrag framåt för kommande generationer.',
      contactUs: 'Kontakta oss',
      joinFounding: 'Bli grundande medlem',
      readMore: 'Läs fullständiga detaljer',
      emailSubject: 'Förfrågan om grundande team',
      ctaTitle: 'Redo att forma framtiden?',
      ctaDescription: 'Hjälp oss att övergå från ett forskningsprojekt till en varaktig institution som kan hantera mänsklighetens mest angelägna globala utmaningar.',
      ctaContact: 'Gå med som grundande medlem',
      ctaLearn: 'Lär dig om vårt uppdrag',
      errorTitle: 'Innehåll inte tillgängligt',
      errorText: 'Grundningsinformationen kunde inte laddas. Vänligen kontakta oss direkt för mer information.',
      contactDescription: 'Hör av dig för att lära dig mer om att bli en grundande styrelsemedlem eller erbjuda professionell rådgivning.',
      missionDescription: 'Utforska våra omfattande ramverk och förstå visionen vi arbetar för att institutionalisera.',
      contactLabel: 'Kontakt:',
      subjectLabel: 'Ämne:'
    }
  };

  // Simple text function with language support
  function getText(key) {
    // Try the translation system first
    let value = $t(`founding.${key}`);
   
    // If we get a value that's not just the key, use it
    if (value && value !== '' && value !== `founding.${key}`) {
      return value;
    }
    
    // Fallback to language-specific text
    const langTexts = fallbackText[currentLocale] || fallbackText.en;
    return langTexts[key] || fallbackText.en[key] || key;
  }

  function contactUs() {
    const subject = encodeURIComponent(getText('emailSubject'));
    const email = 'globalgovernanceframeworks@gmail.com';
    window.open(`mailto:${email}?subject=${subject}`, '_self');
  }

  function exploreFrameworks() {
    window.open(`${base}/frameworks/docs`, '_self');
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

    <!-- Main Content -->
    <div class="main-content">
      {#if data?.guideContent}
        <svelte:component this={data.guideContent} />
      {:else}
        <div class="error-state">
          <h2>{getText('errorTitle')}</h2>
          <p>{getText('errorText')}</p>
          <button class="primary-btn" on:click={contactUs}>
            {getText('contactUs')} <span class="external-icon">✉</span>
          </button>
        </div>
      {/if}
    </div>

    <!-- Call to Action Section -->
    <div class="cta-section">
      <div class="cta-content">
        <h2>{getText('ctaTitle')}</h2>
        <p class="cta-description">{getText('ctaDescription')}</p>
        
        <div class="cta-cards">
          <div class="cta-card primary-card">
            <div class="card-icon">🤝</div>
            <div class="card-content">
              <h3>{getText('joinFounding')}</h3>
              <p>{getText('contactDescription')}</p>
              <button class="primary-btn large" on:click={contactUs}>
                {getText('ctaContact')} <span class="external-icon">✉</span>
              </button>
            </div>
          </div>

          <div class="cta-card secondary-card">
            <div class="card-icon">🌍</div>
            <div class="card-content">
              <h3>{getText('ctaLearn')}</h3>
              <p>{getText('missionDescription')}</p>
              <button class="secondary-btn large" on:click={exploreFrameworks}>
                {getText('ctaLearn')} <span class="external-icon">→</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Contact Information Highlight -->
        <div class="contact-highlight">
          <div class="contact-info">
            <strong>{getText('contactLabel')}</strong> 
            <a href="mailto:globalgovernanceframeworks@gmail.com">globalgovernanceframeworks@gmail.com</a>
          </div>
          <div class="contact-info">
            <strong>{getText('subjectLabel')}</strong> {getText('emailSubject')}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* Use consistent color scheme */
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
    max-width: 900px;
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

  /* Main Content */
  .main-content {
    background: white;
    border-radius: 0.75rem;
    padding: 2.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid var(--border-color);
  }

  /* Content styling */
  .main-content :global(h1) {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--primary-blue);
  }

  .main-content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--secondary-purple);
  }

  .main-content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--earthy-green);
  }

  .main-content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: var(--content-text);
  }

  .main-content :global(ul) {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
    color: var(--content-text);
  }

  .main-content :global(li) {
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }

  .main-content :global(strong) {
    font-weight: 600;
    color: var(--primary-blue);
  }

  .main-content :global(a) {
    color: var(--primary-blue);
    text-decoration: none;
    border-bottom: 1px solid rgba(43, 75, 140, 0.3);
    transition: all 0.2s;
  }

  .main-content :global(a:hover) {
    color: var(--warm-gold);
    border-bottom-color: var(--warm-gold);
  }

  /* CTA Section */
  .cta-section {
    background: linear-gradient(135deg, var(--earthy-green), var(--primary-blue));
    border-radius: 1rem;
    padding: 3rem 2rem;
    color: white;
  }

  .cta-content {
    text-align: center;
  }

  .cta-content h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: white;
  }

  .cta-description {
    font-size: 1.125rem;
    line-height: 1.6;
    margin-bottom: 2.5rem;
    opacity: 0.9;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .cta-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .cta-card {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 0.75rem;
    padding: 2rem;
    text-align: center;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .primary-card {
    background: rgba(255, 255, 255, 0.15);
  }

  .card-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .card-content h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: white;
  }

  .card-content p {
    margin-bottom: 1.5rem;
    line-height: 1.6;
    opacity: 0.9;
  }

  /* Buttons */
  .primary-btn {
    background-color: var(--warm-gold);
    color: var(--primary-blue);
    border: none;
    padding: 0.625rem 1.25rem;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .primary-btn:hover {
    background-color: var(--dark-gold);
    color: white;
    transform: translateY(-1px);
  }

  .secondary-btn {
    background-color: transparent;
    color: white;
    border: 1px solid white;
    padding: 0.625rem 1.25rem;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .secondary-btn:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-1px);
  }

  .large {
    padding: 0.875rem 2rem;
    font-size: 1.125rem;
  }

  .external-icon {
    font-size: 0.875rem;
    opacity: 0.8;
  }

  /* Contact Highlight */
  .contact-highlight {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin-top: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .contact-info {
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }

  .contact-info:last-child {
    margin-bottom: 0;
  }

  .contact-info a {
    color: var(--warm-gold);
    text-decoration: none;
    font-weight: 500;
  }

  .contact-info a:hover {
    color: var(--dark-gold);
    text-decoration: underline;
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

  .error-state p {
    margin-bottom: 2rem;
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

    .main-content {
      padding: 2rem;
    }

    .cta-section {
      padding: 2rem 1.5rem;
    }

    .cta-content h2 {
      font-size: 1.5rem;
    }

    .cta-description {
      font-size: 1rem;
    }

    .cta-cards {
      grid-template-columns: 1fr;
    }

    .contact-highlight {
      padding: 1rem;
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
    .main-content {
      padding: 1.5rem;
    }

    .cta-cards {
      gap: 1rem;
    }

    .cta-card {
      padding: 1.5rem;
    }

    .large {
      width: 100%;
      justify-content: center;
    }
  }

  /* Mobile-specific styling for email */
  @media (max-width: 768px) {
    .contact-info {
      font-size: 0.875rem; /* Smaller base font size on mobile */
    }
    
    /* Make email appear on its own line on mobile */
    .contact-info:first-child {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    
    .contact-info a {
      font-size: 0.8rem; /* Even smaller for the email link */
      word-break: break-all; /* Allow email to break at any character if needed */
      align-self: flex-start; /* Align email to the left */
    }
  }

  @media (max-width: 480px) {
    .contact-info {
      font-size: 0.8rem; /* Even smaller on very small screens */
    }
    
    .contact-info:first-child {
      gap: 0.375rem; /* Slightly more space between "Contact:" and email */
    }
    
    .contact-info a {
      font-size: 0.75rem; /* Smallest size for email on tiny screens */
      word-break: break-all;
    }
    
    .contact-highlight {
      padding: 1rem; /* Reduce padding on small screens too */
    }
  }
</style>
