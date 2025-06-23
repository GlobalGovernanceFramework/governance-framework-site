<!-- src/routes/frameworks/tools/spiritual/multimedia-resource-library/+page.svelte -->
<script>
  import { t, locale, setLocale } from '$lib/i18n';
  import { base } from '$app/paths';

  // Subscribe to stores
  $: currentT = $t;
  $: currentLocale = $locale;

  // Helper function for language button styles
  function getLanguageButtonStyle(lang) {
    const isActive = currentLocale === lang;
    return isActive ? 'lang-button active' : 'lang-button';
  }

  // Formspree handling
  let formSubmitted = false;
  let formError = false;

  async function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    
    try {
      // Replace "YOUR_FORMSPREE_ID" with your actual Formspree form ID
      const response = await fetch("https://formspree.io/f/mjkwzkow", {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      });
      
      if (response.ok) {
        formSubmitted = true;
        form.reset();
      } else {
        formError = true;
        console.error("Form submission error:", await response.text());
      }
    } catch (error) {
      formError = true;
      console.error("Form submission error:", error);
    }
  }

  // Translations for this page
  const translations = {
    en: {
      title: "Multimedia Resource Library",
      subtitle: "Audio, video, and visual resources for the Religious & Spiritual Dialogue Framework",
      intro: "This library contains multimedia resources to support implementation of the Religious & Spiritual Dialogue Framework. From instructional videos to presentation slides and audio recordings, these resources help you engage diverse audiences in spiritual dialogue.",
      comingSoonTitle: "Coming Soon",
      comingSoonDesc: "We're currently developing this multimedia library with high-quality resources. Check back in the coming weeks as we add:",
      categoryVideosTitle: "Instructional Videos",
      categoryVideosDesc: "Step-by-step guidance on facilitating dialogues, setting up sacred spaces, and implementing the framework.",
      categoryAudioTitle: "Audio Resources",
      categoryAudioDesc: "Podcasts, guided reflections, and recorded dialogues from diverse spiritual traditions.",
      categoryPresentationsTitle: "Presentation Materials",
      categoryPresentationsDesc: "Ready-to-use slides, handouts, and visual aids for workshops and training sessions.",
      categoryGraphicsTitle: "Social Media Graphics",
      categoryGraphicsDesc: "Shareable images to promote dialogue events and framework principles.",
      requestResourceTitle: "Request Specific Resources",
      requestResourceDesc: "Need a particular type of multimedia resource for your implementation? Let us know what would be helpful.",
      contactLink: "Contact us",
      signupTitle: "Get Notified",
      signupDesc: "Sign up to receive updates when new multimedia resources are available:",
      emailPlaceholder: "Your email address",
      signupButton: "Subscribe",
      privacyNote: "We respect your privacy and will never share your information.",
      lookingForTitle: "Looking for implementation tools?",
      lookingForDesc: "If you're seeking practical implementation documents, check out our complete toolkit:",
      backToToolsButton: "View Implementation Tools",
      backToTools: "Back to Tools Overview",
      languagesTitle: "Available Languages"
    },
    sv: {
      title: "Multimediabibliotek",
      subtitle: "Ljud-, video- och visuella resurser för Ramverket för Religiös & Andlig Dialog",
      intro: "Detta bibliotek innehåller multimediaresurser som stöder implementeringen av Ramverket för Religiös & Andlig Dialog. Från instruktionsvideor till presentationsbilder och ljudinspelningar, dessa resurser hjälper dig att engagera olika målgrupper i andlig dialog.",
      comingSoonTitle: "Kommer snart",
      comingSoonDesc: "Vi utvecklar för närvarande detta multimediabibliotek med högkvalitativa resurser. Återkom under de kommande veckorna då vi lägger till:",
      categoryVideosTitle: "Instruktionsvideor",
      categoryVideosDesc: "Steg-för-steg-vägledning om facilitering av dialoger, iordningställande av heliga rum och implementering av ramverket.",
      categoryAudioTitle: "Ljudresurser",
      categoryAudioDesc: "Podcasts, guidade reflektioner och inspelade dialoger från olika andliga traditioner.",
      categoryPresentationsTitle: "Presentationsmaterial",
      categoryPresentationsDesc: "Färdiga bildspel, utdelningar och visuella hjälpmedel för workshops och utbildningssessioner.",
      categoryGraphicsTitle: "Grafik för sociala medier",
      categoryGraphicsDesc: "Delbara bilder för att främja dialogevenemang och ramverksprinciper.",
      requestResourceTitle: "Begär specifika resurser",
      requestResourceDesc: "Behöver du en särskild typ av multimediaresurs för din implementering? Låt oss veta vad som skulle vara hjälpsamt.",
      contactLink: "Kontakta oss",
      signupTitle: "Få meddelanden",
      signupDesc: "Registrera dig för att få uppdateringar när nya multimediaresurser är tillgängliga:",
      emailPlaceholder: "Din e-postadress",
      signupButton: "Prenumerera",
      privacyNote: "Vi respekterar din integritet och kommer aldrig att dela din information.",
      lookingForTitle: "Letar du efter implementeringsverktyg?",
      lookingForDesc: "Om du söker praktiska implementeringsdokument, kolla in vår kompletta verktygslåda:",
      backToToolsButton: "Visa implementeringsverktyg",
      backToTools: "Tillbaka till verktygsöversikt",
      languagesTitle: "Tillgängliga språk"
    }
  };

  // Get current translations based on active locale
  $: texts = translations[currentLocale] || translations.en;
  
  // Placeholder categories for upcoming resources
  const resourceCategories = [
    { id: 'videos', icon: '🎬' },
    { id: 'audio', icon: '🎧' },
    { id: 'presentations', icon: '📊' },
    { id: 'graphics', icon: '🖼️' }
  ];

  // Handle form submission (placeholder)
  function handleSubmit(event) {
    event.preventDefault();
    // This would normally connect to a newsletter API
    alert('This feature is not yet available. Thank you for your interest!');
  }
</script>

<svelte:head>
  <title>{texts.title} - Global Governance Framework</title>
  <meta name="description" content={texts.subtitle} />
</svelte:head>

<!-- Hero Section -->
<section class="hero">
  <div class="container">
    <div class="hero-content">
      <h1>{texts.title}</h1>
      <p>{texts.subtitle}</p>
    </div>
  </div>
</section>

<!-- Back Navigation -->
<div class="container">
  <div class="back-navigation">
    <a href="{base}/frameworks/tools/religious-and-spiritual-dialogue-governance" class="back-link">
      <span class="back-icon">←</span>
      {texts.backToTools}
    </a>
  </div>
</div>

<!-- Main Content Section -->
<section class="main-content">
  <div class="container">
    <div class="content-wrapper">
      <p class="intro-text">{texts.intro}</p>
      
      <!-- Coming Soon Banner -->
      <div class="coming-soon-banner">
        <div class="banner-icon">🚧</div>
        <div class="banner-content">
          <h2>{texts.comingSoonTitle}</h2>
          <p>{texts.comingSoonDesc}</p>
        </div>
      </div>
      
      <!-- Resource Categories -->
      <div class="resource-categories">
        <div class="category-card">
          <div class="category-icon">{resourceCategories[0].icon}</div>
          <h3>{texts.categoryVideosTitle}</h3>
          <p>{texts.categoryVideosDesc}</p>
          <div class="placeholder-preview">
            <div class="placeholder-video">
              <div class="placeholder-play-button">▶</div>
            </div>
          </div>
        </div>
        
        <div class="category-card">
          <div class="category-icon">{resourceCategories[1].icon}</div>
          <h3>{texts.categoryAudioTitle}</h3>
          <p>{texts.categoryAudioDesc}</p>
          <div class="placeholder-preview">
            <div class="placeholder-audio">
              <div class="placeholder-waveform">
                <div class="waveform-bar"></div>
                <div class="waveform-bar"></div>
                <div class="waveform-bar"></div>
                <div class="waveform-bar"></div>
                <div class="waveform-bar"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="category-card">
          <div class="category-icon">{resourceCategories[2].icon}</div>
          <h3>{texts.categoryPresentationsTitle}</h3>
          <p>{texts.categoryPresentationsDesc}</p>
          <div class="placeholder-preview">
            <div class="placeholder-slides">
              <div class="slide-thumbnail"></div>
              <div class="slide-thumbnail"></div>
              <div class="slide-thumbnail"></div>
            </div>
          </div>
        </div>
        
        <div class="category-card">
          <div class="category-icon">{resourceCategories[3].icon}</div>
          <h3>{texts.categoryGraphicsTitle}</h3>
          <p>{texts.categoryGraphicsDesc}</p>
          <div class="placeholder-preview">
            <div class="placeholder-graphics">
              <div class="graphic-thumbnail"></div>
              <div class="graphic-thumbnail"></div>
              <div class="graphic-thumbnail"></div>
              <div class="graphic-thumbnail"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Request Resources -->
      <div class="feedback-card">
        <h3>{texts.requestResourceTitle}</h3>
        <p>
          {texts.requestResourceDesc} <a href="{base}/contact" class="contact-link">{texts.contactLink}</a>
        </p>
      </div>
      
      <!-- Newsletter Signup with Formspree -->
      <div class="signup-card">
        <h3>{texts.signupTitle}</h3>
        <p>{texts.signupDesc}</p>
        
        {#if formSubmitted}
          <div class="form-success">
            <p>Thank you for subscribing! We'll notify you when new resources are available.</p>
          </div>
        {:else}
          <form on:submit={handleFormSubmit} class="signup-form">
            <input type="email" name="email" placeholder={texts.emailPlaceholder} aria-label="Email" required />
            <input type="hidden" name="source" value="multimedia-resource-library" />
            <button type="submit" class="primary-btn" disabled={formSubmitted}>
              {formSubmitted ? 'Submitted' : texts.signupButton}
            </button>
          </form>
          {#if formError}
            <p class="form-error">There was an error submitting the form. Please try again later.</p>
          {/if}
          <p class="privacy-note">{texts.privacyNote}</p>
        {/if}
      </div>
      
      <!-- Looking for implementation tools -->
      <div class="looking-for-card">
        <h3>{texts.lookingForTitle}</h3>
        <p>{texts.lookingForDesc}</p>
        <a href="{base}/frameworks/tools/religious-and-spiritual-dialogue-governance" class="primary-btn">{texts.backToToolsButton}</a>
      </div>
      
      <!-- Back to Tools Overview link -->
      <div class="back-link-bottom">
        <a href="{base}/frameworks/tools/religious-and-spiritual-dialogue-governance">
          <span class="back-icon">←</span>
          {texts.backToTools}
        </a>
      </div>
      
      <!-- Language switcher section -->
      <div class="language-section">
        <h3>{texts.languagesTitle}</h3>
        <div class="language-buttons">
          <button on:click={() => setLocale('en')} class={getLanguageButtonStyle('en')}>
            English
          </button>
          <button on:click={() => setLocale('sv')} class={getLanguageButtonStyle('sv')}>
            Svenska
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  /* Global Styles */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .content-wrapper {
    max-width: 42rem;
    margin: 0 auto;
  }
  
  /* Hero Section - Purple/Gold theme */
  .hero {
    padding: 3rem 0;
    background: linear-gradient(to bottom right, #6a3ea1, #9f7aea);
    color: white;
  }
  
  .hero-content {
    max-width: 42rem;
    margin: 0 auto;
  }
  
  .hero h1 {
    font-size: 2.5rem;
    line-height: 1.2;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  .hero p {
    font-size: 1.25rem;
    color: #ffffff;
  }
  
  /* Back Navigation */
  .back-navigation {
    margin: 1.5rem 0;
    max-width: 42rem;
    margin-left: auto;
    margin-right: auto;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    color: #6a3ea1;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: #553086;
  }

  .back-icon {
    margin-right: 0.5rem;
  }
  
  /* Main Content Section */
  .main-content {
    padding: 3rem 0;
    background-color: white;
  }
  
  .intro-text {
    margin-bottom: 2rem;
    color: #4b5563;
    line-height: 1.7;
    font-size: 1.125rem;
  }
  
  /* Coming Soon Banner */
  .coming-soon-banner {
    display: flex;
    align-items: center;
    background-color: #fdf2f8;
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin-bottom: 2.5rem;
    box-shadow: 0 4px 6px rgba(106, 62, 161, 0.1);
    border: 1px solid rgba(236, 72, 153, 0.2);
  }
  
  .banner-icon {
    font-size: 2.5rem;
    margin-right: 1.5rem;
  }
  
  .banner-content h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #be185d;
  }
  
  .banner-content p {
    color: #4b5563;
    margin-bottom: 0;
  }
  
  /* Resource Categories */
  .resource-categories {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
  }
  
  .category-card {
    background-color: #f8f5ff;
    padding: 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px rgba(106, 62, 161, 0.1);
    border: 1px solid rgba(106, 62, 161, 0.2);
  }
  
  .category-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .category-card h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #6a3ea1;
  }
  
  .category-card p {
    color: #4b5563;
    margin-bottom: 1.5rem;
  }
  
  /* Placeholder Previews */
  .placeholder-preview {
    margin-top: 1rem;
  }
  
  .placeholder-video {
    background-color: rgba(106, 62, 161, 0.1);
    height: 180px;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .placeholder-play-button {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #6a3ea1;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
  }
  
  .placeholder-audio {
    background-color: rgba(106, 62, 161, 0.1);
    height: 100px;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1.5rem;
  }
  
  .placeholder-waveform {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 0.25rem;
  }
  
  .waveform-bar {
    flex-grow: 1;
    background-color: #6a3ea1;
    border-radius: 2px;
  }
  
  .waveform-bar:nth-child(1) { height: 30px; }
  .waveform-bar:nth-child(2) { height: 50px; }
  .waveform-bar:nth-child(3) { height: 70px; }
  .waveform-bar:nth-child(4) { height: 40px; }
  .waveform-bar:nth-child(5) { height: 20px; }
  
  .placeholder-slides {
    display: flex;
    gap: 0.75rem;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }
  
  .slide-thumbnail {
    flex: 0 0 auto;
    width: 120px;
    height: 80px;
    background-color: rgba(106, 62, 161, 0.1);
    border-radius: 0.25rem;
    border: 1px solid rgba(106, 62, 161, 0.2);
  }
  
  .placeholder-graphics {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  
  .graphic-thumbnail {
    width: 100%;
    height: 80px;
    background-color: rgba(106, 62, 161, 0.1);
    border-radius: 0.25rem;
    border: 1px solid rgba(106, 62, 161, 0.2);
  }
  
  /* Feedback Card */
  .feedback-card {
    background-color: #f0e6ff;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 2rem;
  }
  
  .feedback-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #6a3ea1;
  }
  
  .feedback-card p {
    color: #4b5563;
    margin-bottom: 0;
  }
  
  .contact-link {
    color: #b78846;
    text-decoration: underline;
    font-weight: 500;
  }
  
  /* Signup Card */
  .signup-card {
    background-color: #fef3c7;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 2rem;
  }
  
  .signup-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #92400e;
  }
  
  .signup-card p {
    color: #4b5563;
    margin-bottom: 1rem;
  }
  
  .signup-form {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
  
  .signup-form input {
    flex: 1;
    padding: 0.75rem;
    border-radius: 0.375rem;
    border: 1px solid #e5e7eb;
  }
  
  .privacy-note {
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 0;
  }
  
  /* Looking For Card */
  .looking-for-card {
    background-color: #f8f5ff;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .looking-for-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #6a3ea1;
  }
  
  .looking-for-card p {
    color: #4b5563;
    margin-bottom: 1.5rem;
  }
  
  /* Back Link */
  .back-link-bottom {
    margin-bottom: 2rem;
  }
  
  .back-link-bottom a {
    display: inline-flex;
    align-items: center;
    color: #6a3ea1;
    font-weight: 500;
    text-decoration: none;
  }
  
  /* Buttons */
  .primary-btn {
    display: inline-flex;
    align-items: center;
    background-color: #6a3ea1;
    color: white;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    border: none;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: #553086;
    transform: translateY(-1px);
  }
  
  /* Language Section */
  .language-section {
    border-top: 1px solid #e5e7eb;
    padding-top: 2rem;
    margin-top: 2rem;
  }
  
  .language-section h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #6a3ea1;
  }
  
  .language-buttons {
    display: flex;
    gap: 1rem;
  }
  
  .lang-button {
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    border: 1px solid #e5e7eb;
    background-color: white;
    color: #6a3ea1;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
  }
  
  .lang-button.active {
    background-color: #6a3ea1;
    color: white;
    border-color: #6a3ea1;
  }

  .form-success {
    background-color: #d1fae5;
    padding: 1rem;
    border-radius: 0.375rem;
    margin-bottom: 1rem;
    color: #065f46;
  }

  .form-error {
    background-color: #fee2e2;
    padding: 1rem;
    border-radius: 0.375rem;
    margin-bottom: 1rem;
    color: #b91c1c;
  }
  
  /* Responsive styles */
  @media (min-width: 768px) {
    .resource-categories {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .signup-form {
      max-width: 80%;
    }
  }
  
  @media (max-width: 640px) {
    .coming-soon-banner {
      flex-direction: column;
      text-align: center;
    }
    
    .banner-icon {
      margin-right: 0;
      margin-bottom: 1rem;
    }
    
    .signup-form {
      flex-direction: column;
    }
  }
</style>
