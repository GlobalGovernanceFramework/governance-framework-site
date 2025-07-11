<!-- src/routes/frameworks/tools/work-in-liberation/+page.svelte -->
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

  // Get current translations from the i18n system
  $: texts = {
    title: $t('toolsWorkInLiberation.title'),
    subtitle: $t('toolsWorkInLiberation.subtitle'),
    intro: $t('toolsWorkInLiberation.intro'),
    seedKitTitle: $t('toolsWorkInLiberation.seedKitTitle'),
    seedKitDesc: $t('toolsWorkInLiberation.seedKitDesc'),
    seedKitButton: $t('toolsWorkInLiberation.seedKitButton'),
    individualFilesTitle: $t('toolsWorkInLiberation.individualFilesTitle'),
    individualFilesDesc: $t('toolsWorkInLiberation.individualFilesDesc'),
    guidesTitle: $t('toolsWorkInLiberation.guidesTitle'),
    guidesDesc: $t('toolsWorkInLiberation.guidesDesc'),
    requestTitle: $t('toolsWorkInLiberation.requestTitle'),
    requestDesc: $t('toolsWorkInLiberation.requestDesc'),
    contactLink: $t('toolsWorkInLiberation.contactLink'),
    languagesTitle: $t('toolsWorkInLiberation.languagesTitle'),
    downloadPDF: $t('toolsWorkInLiberation.downloadPDF'),
    downloadMarkdown: $t('toolsWorkInLiberation.downloadMarkdown'),
    downloadODT: $t('toolsWorkInLiberation.downloadODT'),
    backToTools: $t('toolsWorkInLiberation.backToTools'),
    // Individual file titles
    welcomeGuideTitle: $t('toolsWorkInLiberation.welcomeGuideTitle'),
    welcomeGuideDesc: $t('toolsWorkInLiberation.welcomeGuideDesc'),
    charterTemplateTitle: $t('toolsWorkInLiberation.charterTemplateTitle'),
    charterTemplateDesc: $t('toolsWorkInLiberation.charterTemplateDesc'),
    firstMeetingTitle: $t('toolsWorkInLiberation.firstMeetingTitle'),
    firstMeetingDesc: $t('toolsWorkInLiberation.firstMeetingDesc'),
    contributionTrackingTitle: $t('toolsWorkInLiberation.contributionTrackingTitle'),
    contributionTrackingDesc: $t('toolsWorkInLiberation.contributionTrackingDesc'),
    ataGlanceTitle: $t('toolsWorkInLiberation.ataGlanceTitle'),
    ataGlanceDesc: $t('toolsWorkInLiberation.ataGlanceDesc'),
    executiveSummaryTitle: $t('toolsWorkInLiberation.executiveSummaryTitle'),
    executiveSummaryDesc: $t('toolsWorkInLiberation.executiveSummaryDesc')
  };
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
    <a href="{base}/frameworks/tools" class="back-link">
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

      <!-- Start with the Community Work Team Starter Kit -->
      <div class="seed-kit-card">
        <div class="card-content">
          <div class="card-icon">🤝</div>
          <div class="card-text">
            <h2>{texts.seedKitTitle}</h2>
            <p>{texts.seedKitDesc}</p>
          </div>
          <div class="card-actions">
            <a href="{base}/frameworks/tools/work-in-liberation/community-work-team-starter-kit.zip" download class="big-btn primary">
              {texts.seedKitButton}
              <span class="icon">↓</span>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Framework Guides -->
      <h2 class="section-title">{texts.guidesTitle}</h2>
      <p class="section-desc">{texts.guidesDesc}</p>
      
      <div class="tools-grid">
        <!-- At-a-Glance Guide -->
        <div class="tool-card color-primary">
          <h3>{texts.ataGlanceTitle}</h3>
          <p>{texts.ataGlanceDesc}</p>
          <div class="tool-actions">
            <a href="{base}/assets/pdf/work-in-liberation-ata-glance-en.pdf" download class="big-btn pdf">
              {texts.downloadPDF}
              <span class="icon">↓</span>
            </a>
            <a href="{base}/assets/pdf/work-in-liberation-ata-glance-en_final.md" download class="big-btn md">
              {texts.downloadMarkdown}
              <span class="icon">↓</span>
            </a>
          </div>
        </div>
        
        <!-- Executive Summary -->
        <div class="tool-card color-cooperative">
          <h3>{texts.executiveSummaryTitle}</h3>
          <p>{texts.executiveSummaryDesc}</p>
          <div class="tool-actions">
            <a href="{base}/assets/pdf/work-in-liberation-executivesummary-for-the-skeptic-en.pdf" download class="big-btn pdf">
              {texts.downloadPDF}
              <span class="icon">↓</span>
            </a>
            <a href="{base}/assets/pdf/work-in-liberation-executivesummary-for-the-skeptic-en_final.md" download class="big-btn md">
              {texts.downloadMarkdown}
              <span class="icon">↓</span>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Individual Kit Files -->
      <h2 class="section-title">{texts.individualFilesTitle}</h2>
      <p class="section-desc">{texts.individualFilesDesc}</p>
      
      <div class="tools-grid">
        <!-- Welcome Guide -->
        <div class="tool-card color-primary">
          <h3>{texts.welcomeGuideTitle}</h3>
          <p>{texts.welcomeGuideDesc}</p>
          <div class="tool-actions">
            <a href="{base}/frameworks/tools/work-in-liberation/Work_in_Liberation-Community_work_team_starter_kit/1-welcome-guide.pdf" download class="big-btn pdf">
              {texts.downloadPDF}
              <span class="icon">↓</span>
            </a>
            <a href="{base}/frameworks/tools/work-in-liberation/Work_in_Liberation-Community_work_team_starter_kit/1-welcome-guide.md" download class="big-btn md">
              {texts.downloadMarkdown}
              <span class="icon">↓</span>
            </a>
            <a href="{base}/frameworks/tools/work-in-liberation/Work_in_Liberation-Community_work_team_starter_kit/1-welcome-guide.odt" download class="big-btn odt">
              {texts.downloadODT}
              <span class="icon">↓</span>
            </a>
          </div>
        </div>

        <!-- Charter Template -->
        <div class="tool-card color-cooperative">
          <h3>{texts.charterTemplateTitle}</h3>
          <p>{texts.charterTemplateDesc}</p>
          <div class="tool-actions">
            <a href="{base}/frameworks/tools/work-in-liberation/Work_in_Liberation-Community_work_team_starter_kit/2-cwt-charter-template.pdf" download class="big-btn pdf">
              {texts.downloadPDF}
              <span class="icon">↓</span>
            </a>
            <a href="{base}/frameworks/tools/work-in-liberation/Work_in_Liberation-Community_work_team_starter_kit/2-cwt-charter-template.md" download class="big-btn md">
              {texts.downloadMarkdown}
              <span class="icon">↓</span>
            </a>
            <a href="{base}/frameworks/tools/work-in-liberation/Work_in_Liberation-Community_work_team_starter_kit/2-cwt-charter-template.odt" download class="big-btn odt">
              {texts.downloadODT}
              <span class="icon">↓</span>
            </a>
          </div>
        </div>

        <!-- First Meeting Guide -->
        <div class="tool-card color-care">
          <h3>{texts.firstMeetingTitle}</h3>
          <p>{texts.firstMeetingDesc}</p>
          <div class="tool-actions">
            <a href="{base}/frameworks/tools/work-in-liberation/Work_in_Liberation-Community_work_team_starter_kit/3-your-first-circle-meeting.pdf" download class="big-btn pdf">
              {texts.downloadPDF}
              <span class="icon">↓</span>
            </a>
            <a href="{base}/frameworks/tools/work-in-liberation/Work_in_Liberation-Community_work_team_starter_kit/3-your-first-circle-meeting.md" download class="big-btn md">
              {texts.downloadMarkdown}
              <span class="icon">↓</span>
            </a>
            <a href="{base}/frameworks/tools/work-in-liberation/Work_in_Liberation-Community_work_team_starter_kit/3-your-first-circle-meeting.odt" download class="big-btn odt">
              {texts.downloadODT}
              <span class="icon">↓</span>
            </a>
          </div>
        </div>

        <!-- Contribution Tracking Guide -->
        <div class="tool-card color-tools">
          <h3>{texts.contributionTrackingTitle}</h3>
          <p>{texts.contributionTrackingDesc}</p>
          <div class="tool-actions">
            <a href="{base}/frameworks/tools/work-in-liberation/Work_in_Liberation-Community_work_team_starter_kit/4-interim-contribution-tracking-and-love-ledger-preparation-guide.pdf" download class="big-btn pdf">
              {texts.downloadPDF}
              <span class="icon">↓</span>
            </a>
            <a href="{base}/frameworks/tools/work-in-liberation/Work_in_Liberation-Community_work_team_starter_kit/4-interim-contribution-tracking-and-love-ledger-preparation-guide.md" download class="big-btn md">
              {texts.downloadMarkdown}
              <span class="icon">↓</span>
            </a>
            <a href="{base}/frameworks/tools/work-in-liberation/Work_in_Liberation-Community_work_team_starter_kit/4-interim-contribution-tracking-and-love-ledger-preparation-guide.odt" download class="big-btn odt">
              {texts.downloadODT}
              <span class="icon">↓</span>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Request & Feedback Section -->
      <div class="feedback-card">
        <h3>{texts.requestTitle}</h3>
        <p>
          {texts.requestDesc} <a href="{base}/contact" class="contact-link">{texts.contactLink}</a>
        </p>
      </div>
      
      <!-- Back to Tools Overview link -->
      <div class="back-link-bottom">
        <a href="{base}/frameworks/tools">
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
  
  /* Hero Section */
  .hero {
    padding: 3rem 0;
    background: linear-gradient(to bottom right, #2C5282, #2F855A);
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
    color: #2C5282;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: #1A365D;
  }

  .back-icon {
    margin-right: 0.5rem;
  }
  
  /* Main Content Section */
  .main-content {
    padding: 3rem 0;
    background-color: #F7FAFC;
  }
  
  .intro-text {
    margin-bottom: 2rem;
    color: #4A5568;
    line-height: 1.7;
    font-size: 1.125rem;
  }
  
  /* Section Titles */
  .section-title {
    font-size: 1.875rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #2C5282;
  }
  
  .section-desc {
    margin-bottom: 2rem;
    color: #4A5568;
    line-height: 1.7;
    font-size: 1.125rem;
  }
  
  /* Seed Kit Card */
  .seed-kit-card {
    background: linear-gradient(135deg, #EBF8FF 0%, #E6FFFA 100%);
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(44, 82, 130, 0.1);
    border: 1px solid rgba(44, 82, 130, 0.2);
  }
  
  .card-content {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
  }
  
  .card-icon {
    font-size: 2.5rem;
    color: #2C5282;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #2C5282;
  }
  
  .card-text p {
    color: #4A5568;
    margin-bottom: 1rem;
  }
  
  .card-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: center;
  }
  
  /* Tools Grid */
  .tools-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
  
  /* Tool Cards */
  .tool-card {
    background-color: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    border-left: 4px solid;
  }
  
  .tool-card h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }
  
  .tool-card p {
    color: #4A5568;
    margin-bottom: 1.5rem;
  }
  
  /* Color Variations */
  .color-primary {
    border-left-color: #2C5282;
  }
  
  .color-primary h3 {
    color: #2C5282;
  }
  
  .color-cooperative {
    border-left-color: #5A67D8;
  }
  
  .color-cooperative h3 {
    color: #5A67D8;
  }
  
  .color-care {
    border-left-color: #B794F6;
  }
  
  .color-care h3 {
    color: #B794F6;
  }
  
  .color-tools {
    border-left-color: #4299E1;
  }
  
  .color-tools h3 {
    color: #4299E1;
  }
  
  /* Tool Actions */
  .tool-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  
  /* Big Buttons (same style for all) */
  .big-btn {
    display: inline-flex;
    align-items: center;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.2s;
    color: white !important;
    border: none;
  }

  /* Primary button (main download) */
  .big-btn.primary {
    background-color: #2C5282 !important;
  }
  
  .big-btn.primary:hover {
    background-color: #1A365D !important;
    transform: translateY(-1px);
  }

  /* PDF buttons */
  .tool-card.color-primary .big-btn.pdf {
    background-color: #2C5282 !important;
  }

  .tool-card.color-cooperative .big-btn.pdf {
    background-color: #5A67D8 !important;
  }

  .tool-card.color-care .big-btn.pdf {
    background-color: #B794F6 !important;
  }

  .tool-card.color-tools .big-btn.pdf {
    background-color: #4299E1 !important;
  }

  /* Markdown buttons */
  .tool-card.color-primary .big-btn.md {
    background-color: #2B6CB0 !important;
  }

  .tool-card.color-cooperative .big-btn.md {
    background-color: #4C51BF !important;
  }

  .tool-card.color-care .big-btn.md {
    background-color: #9F7AEA !important;
  }

  .tool-card.color-tools .big-btn.md {
    background-color: #3182CE !important;
  }

  /* ODT buttons */
  .tool-card.color-primary .big-btn.odt {
    background-color: #2F855A !important;
  }

  .tool-card.color-cooperative .big-btn.odt {
    background-color: #38A169 !important;
  }

  .tool-card.color-care .big-btn.odt {
    background-color: #48BB78 !important;
  }

  .tool-card.color-tools .big-btn.odt {
    background-color: #38B2AC !important;
  }
  
  .big-btn:hover {
    transform: translateY(-1px);
  }
  
  .icon {
    margin-left: 0.5rem;
  }
  
  /* Feedback Card */
  .feedback-card {
    background-color: rgba(183, 148, 246, 0.1);
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    border-left: 4px solid #B794F6;
  }
  
  .feedback-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #B794F6;
  }
  
  .feedback-card p {
    color: #4A5568;
    margin-bottom: 1rem;
  }
  
  .contact-link {
    color: #2F855A;
    text-decoration: underline;
    font-weight: 500;
  }
  
  /* Back Link */
  .back-link-bottom {
    margin-bottom: 2rem;
  }
  
  .back-link-bottom a {
    display: inline-flex;
    align-items: center;
    color: #2C5282;
    font-weight: 500;
    text-decoration: none;
  }
  
  /* Language Section */
  .language-section {
    border-top: 1px solid #E2E8F0;
    padding-top: 2rem;
    margin-top: 2rem;
  }
  
  .language-section h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #2C5282;
  }
  
  .language-buttons {
    display: flex;
    gap: 1rem;
  }
  
  .lang-button {
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    border: 1px solid #E2E8F0;
    background-color: white;
    color: #2C5282;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
  }

  .lang-button.active {
    background-color: #2C5282;
    color: white;
    border-color: #2C5282;
  }
  
  /* Responsive styles */
  @media (min-width: 768px) {
    .tools-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 640px) {
    .card-content {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
    
    .card-actions {
      width: 100%;
      justify-content: center;
    }
    
    .tool-actions {
      flex-direction: column;
      width: 100%;
    }
    
    .big-btn {
      width: 100%;
      justify-content: center;
    }
  }
</style>
