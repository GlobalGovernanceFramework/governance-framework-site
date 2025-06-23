<!-- src/routes/frameworks/tools/food-systems-and-agriculture/+page.svelte -->
<script>
  import { t, locale, setLocale } from '$lib/i18n';
  import { base } from '$app/paths';

  // Subscribe to stores
  $: currentT = $t;
  $: currentLocale = $locale;

  // Define file paths with language handling
  const getFilePath = (toolName) => {
    // Check if the file already has language suffix
    if (toolName.includes('-sv') || toolName.includes('-en') || toolName.includes('-youth')) {
      return `${base}/frameworks/tools/food-systems-and-agriculture/${toolName}`;
    }
    
    // For potentially translated documents
    if (toolName.includes('quick-guide') || toolName === 'seed-kit.zip') {
      // Special case for main quick guides
      if (toolName === 'quick-guide.pdf' || toolName === 'quick-guide.md') {
        const langSuffix = currentLocale === 'sv' ? '-sv' : '-en';
        return `${base}/frameworks/tools/food-systems-and-agriculture/quick-guide${langSuffix}.${toolName.split('.').pop()}`;
      } else {
        // For other translated documents
        const extension = toolName.split('.').pop();
        const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
        return `${base}/frameworks/tools/food-systems-and-agriculture/${baseName}-${currentLocale}.${extension}`;
      }
    }
    
    // For tools that might have language variations
    if (['advocacy-playbook', 
         'cost-benefit-analysis-model',
         'monitoring-evaluation-rubric',
         'pilot-readiness-self-assessment-tool',
         'policy-harmonization-toolkit',
         'regenerative-farming-guide',
         'seed-kit-getting-started-guide',
         'stakeholder-engagement-charter',
         'tek-integration-template'].includes(toolName.split('.')[0])) {
      const extension = toolName.split('.').pop();
      const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
      return `${base}/frameworks/tools/food-systems-and-agriculture/${baseName}-${currentLocale}.${extension}`;
    }
    
    // Default path for other files
    return `${base}/frameworks/tools/food-systems-and-agriculture/${toolName}`;
  };

  // Helper function for language button styles
  function getLanguageButtonStyle(lang) {
    const isActive = currentLocale === lang;
    return isActive ? 'lang-button active' : 'lang-button';
  }

  // Translations for this page
  const translations = {
    en: {
      title: "Food Systems Framework Tools",
      subtitle: "Practical resources to implement the Food Systems & Agriculture Framework",
      intro: "These tools and templates are designed to help you implement the Food Systems Framework in various contexts. From planning regenerative agriculture projects to engaging stakeholders, these resources provide step-by-step guidance for transforming food systems.",
      seedKitTitle: "Start with the Seed Kit",
      seedKitDesc: "A complete package with everything you need to launch a Tier 1 micro-pilot. Includes all essential tools and templates in one convenient download.",
      seedKitButton: "Download Complete Seed Kit",
      toolsTitle: "Core Implementation Tools",
      toolsDesc: "These essential tools help you implement key components of the Food Systems Framework, from assessment to planning and stakeholder engagement.",
      advocacyTitle: "Advocacy & Scaling Tools",
      advocacyDesc: "Resources to help you engage stakeholders, secure funding, and scale your implementation from pilot projects to broader adoption.",
      guidesTitle: "Framework Guides",
      guidesDesc: "Compact guides to help you understand and share the Food Systems Framework with others.",
      requestTitle: "Request Tools or Provide Feedback",
      requestDesc: "Need implementation resources for a specific purpose? Have suggestions for improvements? We welcome your input to make these tools more useful.",
      contactLink: "Contact us",
      languagesTitle: "Available Languages",
      downloadPDF: "Download PDF",
      downloadMarkdown: "Download Markdown",
      downloadExcel: "Download Excel Model",
      backToTools: "Back to Tools Overview",
      // Tool titles
      readinessTitle: "Pilot Readiness Self-Assessment Tool",
      readinessDesc: "Evaluate your community's readiness to launch framework pilots, identifying strengths, gaps, and actionable steps to ensure successful implementation.",
      stakeholderTitle: "Stakeholder Engagement Charter",
      stakeholderDesc: "A customizable governance framework for establishing inclusive stakeholder engagement, empowering diverse participants in decision-making.",
      regenerativeTitle: "Regenerative Farming Guide",
      regenerativeDesc: "Step-by-step guidance for designing and implementing regenerative agriculture projects that restore ecosystems and build soil health.",
      tekTitle: "TEK Integration Template",
      tekDesc: "Framework for respectfully integrating Traditional Ecological Knowledge with modern practices to enhance sustainability and preserve cultural heritage.",
      mneTitle: "Monitoring & Evaluation Rubric",
      mneDesc: "A comprehensive tool for tracking key performance indicators and system health metrics, ensuring accountability and continuous improvement.",
      advocacyPlaybookTitle: "Advocacy Playbook",
      advocacyPlaybookDesc: "Strategies, narratives, and materials to advocate for the framework with policymakers, organizations, community leaders, and global forums.",
      policyTitle: "Policy Harmonization Toolkit",
      policyDesc: "Tools and strategies to align local and regional policies with sustainable food systems principles and international agreements.",
      costBenefitTitle: "Cost-Benefit Analysis Model",
      costBenefitDesc: "Quantify economic and social returns of adopting the framework, providing evidence to justify funding and advocacy efforts.",
      gettingStartedTitle: "Getting Started Guide",
      gettingStartedDesc: "A practical introduction to implementing the framework with step-by-step instructions for beginners.",
      quickGuideTitle: "Food Systems Framework Quick Guide (Technical)",
      quickGuideDesc: "A condensed overview of the framework's core principles and implementation strategies for policy-level stakeholders.",
      quickGuideMediumTitle: "Food Systems Framework Quick Guide (Community)",
      quickGuideMediumDesc: "A balanced guide for local authorities, extension workers, and community groups implementing the framework.",
      quickGuideYouthTitle: "Food Systems Framework Quick Guide (Youth)",
      quickGuideYouthDesc: "A visual, accessible guide for youth groups, schools, and diverse communities to engage with the framework.",
      downloadButton: "Download"
    },
    sv: {
      title: "Verktygslåda för Matsystem",
      subtitle: "Praktiska resurser för att implementera Mat- och Jordbrukssystemets Ramverk",
      intro: "Dessa verktyg och mallar är utformade för att hjälpa dig implementera matsystemets ramverk i olika sammanhang. Från planering av regenerativa jordbruksprojekt till engagerande av intressenter, ger dessa resurser steg-för-steg-vägledning för att omvandla matsystem.",
      seedKitTitle: "Börja med Frö-paketet",
      seedKitDesc: "Ett komplett paket med allt du behöver för att starta en Nivå 1 mikro-pilot. Inkluderar alla nödvändiga verktyg och mallar i en bekväm nedladdning.",
      seedKitButton: "Ladda ner komplett Frö-paket",
      toolsTitle: "Grundläggande implementeringsverktyg",
      toolsDesc: "Dessa väsentliga verktyg hjälper dig att implementera viktiga komponenter i matsystemets ramverk, från bedömning till planering och intressentengagemang.",
      advocacyTitle: "Påverkans- & skalningsverktyg",
      advocacyDesc: "Resurser för att hjälpa dig engagera intressenter, säkra finansiering och skala upp din implementering från pilotprojekt till bredare antagande.",
      guidesTitle: "Ramverksguider",
      guidesDesc: "Kompakta guider för att hjälpa dig förstå och dela matsystemets ramverk med andra.",
      requestTitle: "Begär verktyg eller ge feedback",
      requestDesc: "Behöver du implementeringsresurser för ett specifikt syfte? Har du förslag på förbättringar? Vi välkomnar dina synpunkter för att göra dessa verktyg mer användbara.",
      contactLink: "Kontakta oss",
      languagesTitle: "Tillgängliga språk",
      downloadPDF: "Ladda ner PDF",
      downloadMarkdown: "Ladda ner Markdown",
      downloadExcel: "Ladda ner Excel-modell",
      backToTools: "Tillbaka till verktygsöversikt",
      // Tool titles in Swedish
      readinessTitle: "Verktyg för självskattning av pilotberedskap",
      readinessDesc: "Utvärdera din gemenskaps beredskap att lansera ramverkspilotprojekt, identifiera styrkor, luckor och handlingsbara steg för att säkerställa framgångsrik implementering.",
      stakeholderTitle: "Mall för Intressentengagemangsstadga",
      stakeholderDesc: "Ett anpassningsbart styrningsramverk för att etablera inkluderande intressentengagemang, vilket ger olika deltagare möjlighet till delaktighet i beslutsfattande.",
      regenerativeTitle: "Guide för regenerativt jordbruk",
      regenerativeDesc: "Steg-för-steg-vägledning för att utforma och implementera regenerativa jordbruksprojekt som återställer ekosystem och bygger jordhälsa.",
      tekTitle: "Mall för integration av traditionell ekologisk kunskap",
      tekDesc: "Ramverk för respektfull integration av traditionell ekologisk kunskap med moderna metoder för att förbättra hållbarhet och bevara kulturarv.",
      mneTitle: "Mall för uppföljnings- och utvärderingsmatris",
      mneDesc: "Ett omfattande verktyg för att spåra nyckeltal och systemhälsometrik, vilket säkerställer ansvarsskyldighet och kontinuerlig förbättring.",
      advocacyPlaybookTitle: "Handbok för påverkansarbete",
      advocacyPlaybookDesc: "Strategier, berättelser och material för att förespråka ramverket med beslutsfattare, organisationer, samhällsledare och globala forum.",
      policyTitle: "Verktygslåda för policysamordning",
      policyDesc: "Verktyg och strategier för att anpassa lokala och regionala policyer med principer för hållbara matsystem och internationella avtal.",
      costBenefitTitle: "Modell för kostnads-/nyttobedömning",
      costBenefitDesc: "Kvantifiera ekonomiska och sociala avkastningar från antagandet av ramverket, vilket ger bevis för att motivera finansiering och förespråkande insatser.",
      gettingStartedTitle: "Kom igång-guide",
      gettingStartedDesc: "En praktisk introduktion till implementering av ramverket med steg-för-steg-instruktioner för nybörjare.",
      quickGuideTitle: "Snabbguide för Matsystem (Teknisk)",
      quickGuideDesc: "En komprimerad översikt över ramverkets kärnprinciper och implementeringsstrategier för intressenter på policynivå.",
      quickGuideMediumTitle: "Snabbguide för Matsystem (Samhälle)",
      quickGuideMediumDesc: "En balanserad guide för lokala myndigheter, rådgivare och samhällsgrupper som implementerar ramverket.",
      quickGuideYouthTitle: "Snabbguide för Matsystem (Ungdom)",
      quickGuideYouthDesc: "En visuell, tillgänglig guide för ungdomsgrupper, skolor och olika samhällen att engagera sig i ramverket.",
      downloadButton: "Ladda ner"
    }
  };

  // Get current translations based on active locale
  $: texts = translations[currentLocale] || translations.en;
  
  // Tool data for each section
  const coreTools = [
    { id: 'pilot-readiness-self-assessment-tool', color: 'color-1' },
    { id: 'stakeholder-engagement-charter', color: 'color-2' },
    { id: 'regenerative-farming-guide', color: 'color-3' },
    { id: 'tek-integration-template', color: 'color-4' },
    { id: 'monitoring-evaluation-rubric', color: 'color-5' }
  ];
  
  const advocacyTools = [
    { id: 'advocacy-playbook', color: 'color-primary' },
    { id: 'policy-harmonization-toolkit', color: 'color-1' },
    { id: 'cost-benefit-analysis-model', color: 'color-2' },
    { id: 'seed-kit-getting-started-guide', color: 'color-3' }
  ];

  const toolNameToTranslationKey = {
    'pilot-readiness-self-assessment-tool': 'readiness',
    'stakeholder-engagement-charter': 'stakeholder',
    'regenerative-farming-guide': 'regenerative',
    'tek-integration-template': 'tek',
    'monitoring-evaluation-rubric': 'mne',
    'advocacy-playbook': 'advocacyPlaybook',
    'policy-harmonization-toolkit': 'policy',
    'cost-benefit-analysis-model': 'costBenefit',
    'seed-kit-getting-started-guide': 'gettingStarted'
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

      <!-- Start with the Seed Kit -->
      <div class="seed-kit-card">
        <div class="card-content">
          <div class="card-icon">🌱</div>
          <div class="card-text">
            <h2>{texts.seedKitTitle}</h2>
            <p>{texts.seedKitDesc}</p>
          </div>
          <div class="card-actions">
            <a href={getFilePath(`seed-kit-${currentLocale}.zip`)} download class="primary-btn">
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
        <!-- Technical Quick Guide -->
        <div class="tool-card color-primary">
          <h3>{texts.quickGuideTitle}</h3>
          <p>{texts.quickGuideDesc}</p>
          <div class="tool-actions">
            <a href={getFilePath(`quick-guide-${currentLocale}.pdf`)} download class="download-btn pdf">
              {texts.downloadPDF}
              <span class="icon">↓</span>
            </a>
            <a href={getFilePath(`quick-guide-${currentLocale}.md`)} download class="download-btn md">
              {texts.downloadMarkdown}
              <span class="icon">↓</span>
            </a>
          </div>
        </div>
        
        <!-- Community Quick Guide -->
        <div class="tool-card color-2">
          <h3>{texts.quickGuideMediumTitle}</h3>
          <p>{texts.quickGuideMediumDesc}</p>
          <div class="tool-actions">
            <a href={getFilePath(`quick-guide-medium-${currentLocale}.pdf`)} download class="download-btn pdf">
              {texts.downloadPDF}
              <span class="icon">↓</span>
            </a>
            <a href={getFilePath(`quick-guide-medium-${currentLocale}.md`)} download class="download-btn md">
              {texts.downloadMarkdown}
              <span class="icon">↓</span>
            </a>
          </div>
        </div>
        
        <!-- Youth Quick Guide -->
        <div class="tool-card color-3">
          <h3>{texts.quickGuideYouthTitle}</h3>
          <p>{texts.quickGuideYouthDesc}</p>
          <div class="tool-actions">
            <a href={getFilePath(`quick-guide-medium-youth-${currentLocale}.pdf`)} download class="download-btn pdf">
              {texts.downloadPDF}
              <span class="icon">↓</span>
            </a>
            <a href={getFilePath(`quick-guide-medium-youth-${currentLocale}.md`)} download class="download-btn md">
              {texts.downloadMarkdown}
              <span class="icon">↓</span>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Core Implementation Tools -->
      <h2 class="section-title">{texts.toolsTitle}</h2>
      <p class="section-desc">{texts.toolsDesc}</p>
      
      <div class="tools-grid">
        {#each coreTools as tool}
          <div class="tool-card {tool.color}">
            <h3>{texts[`${toolNameToTranslationKey[tool.id]}Title`]}</h3>
            <p>{texts[`${toolNameToTranslationKey[tool.id]}Desc`]}</p>
            <div class="tool-actions">
              <a href={getFilePath(`${tool.id}-${currentLocale}.pdf`)} download class="download-btn pdf">
                {texts.downloadPDF}
                <span class="icon">↓</span>
              </a>
              <a href={getFilePath(`${tool.id}-${currentLocale}.md`)} download class="download-btn md">
                {texts.downloadMarkdown}
                <span class="icon">↓</span>
              </a>
            </div>
          </div>
        {/each}
      </div>

      <!-- Advocacy & Scaling Tools -->
      <h2 class="section-title">{texts.advocacyTitle}</h2>
      <p class="section-desc">{texts.advocacyDesc}</p>
      
      <div class="tools-grid">
        {#each advocacyTools as tool}
          <div class="tool-card {tool.color}">
            <h3>{texts[`${toolNameToTranslationKey[tool.id]}Title`]}</h3>
            <p>{texts[`${toolNameToTranslationKey[tool.id]}Desc`]}</p>
            <div class="tool-actions">
              <a href={getFilePath(`${tool.id}-${currentLocale}.pdf`)} download class="download-btn pdf">
                {texts.downloadPDF}
                <span class="icon">↓</span>
              </a>
              <a href={getFilePath(`${tool.id}-${currentLocale}.md`)} download class="download-btn md">
                {texts.downloadMarkdown}
                <span class="icon">↓</span>
              </a>
              {#if tool.id === 'cost-benefit-analysis-model'}
                <a href={getFilePath(`${tool.id}.xlsx`)} download class="download-btn excel">
                  {texts.downloadExcel}
                  <span class="icon">↓</span>
                </a>
              {/if}
            </div>
          </div>
        {/each}
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
    background: linear-gradient(to bottom right, #2e7d32, #4caf50);
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
    color: #2e7d32;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: #1b5e20;
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
  
  /* Section Titles */
  .section-title {
    font-size: 1.875rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #2e7d32;
  }
  
  .section-desc {
    margin-bottom: 2rem;
    color: #4b5563;
    line-height: 1.7;
    font-size: 1.125rem;
  }
  
  /* Seed Kit Card */
  .seed-kit-card {
    background-color: #f1f8e9;
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(46, 125, 50, 0.1);
    border: 1px solid rgba(46, 125, 50, 0.2);
  }
  
  .card-content {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
  }
  
  .card-icon {
    font-size: 2.5rem;
    color: #2e7d32;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #2e7d32;
  }
  
  .card-text p {
    color: #4b5563;
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
    background-color: #f9fafb;
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
    color: #4b5563;
    margin-bottom: 1.5rem;
  }
  
  /* Color Variations */
  .color-primary {
    border-left-color: #2e7d32;
  }
  
  .color-primary h3 {
    color: #2e7d32;
  }
  
  .color-1 {
    border-left-color: #00796b;
  }
  
  .color-1 h3 {
    color: #00796b;
  }
  
  .color-2 {
    border-left-color: #4caf50;
  }
  
  .color-2 h3 {
    color: #4caf50;
  }
  
  .color-3 {
    border-left-color: #33691e;
  }
  
  .color-3 h3 {
    color: #33691e;
  }
  
  .color-4 {
    border-left-color: #8d6e63;
  }
  
  .color-4 h3 {
    color: #8d6e63;
  }
  
  .color-5 {
    border-left-color: #43a047;
  }
  
  .color-5 h3 {
    color: #43a047;
  }
  
  /* Tool Actions */
  .tool-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  
  /* Buttons */
  .primary-btn {
    display: inline-flex;
    align-items: center;
    background-color: #2e7d32;
    color: white;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: #1b5e20;
    transform: translateY(-1px);
  }
  
  .download-btn {
    display: inline-flex;
    align-items: center;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.2s;
  }

  .download-btn.pdf {
    color: white;
  }

  .tool-card.color-primary .download-btn.pdf {
    background-color: #2e7d32;
  }

  .tool-card.color-1 .download-btn.pdf {
    background-color: #00796b;
  }

  .tool-card.color-2 .download-btn.pdf {
    background-color: #4caf50;
  }

  .tool-card.color-3 .download-btn.pdf {
    background-color: #33691e;
  }

  .tool-card.color-4 .download-btn.pdf {
    background-color: #8d6e63;
  }

  .tool-card.color-5 .download-btn.pdf {
    background-color: #43a047;
  }

  .download-btn.md, .download-btn.excel {
    background-color: white;
    border: 1px solid;
  }

  .tool-card.color-primary .download-btn.md, .tool-card.color-primary .download-btn.excel {
    color: #2e7d32;
    border-color: #2e7d32;
  }

  .tool-card.color-1 .download-btn.md, .tool-card.color-1 .download-btn.excel {
    color: #00796b;
    border-color: #00796b;
  }

  .tool-card.color-2 .download-btn.md, .tool-card.color-2 .download-btn.excel {
    color: #4caf50;
    border-color: #4caf50;
  }

  .tool-card.color-3 .download-btn.md, .tool-card.color-3 .download-btn.excel {
    color: #33691e;
    border-color: #33691e;
  }

  .tool-card.color-4 .download-btn.md, .tool-card.color-4 .download-btn.excel {
    color: #8d6e63;
    border-color: #8d6e63;
  }

  .tool-card.color-5 .download-btn.md, .tool-card.color-5 .download-btn.excel {
    color: #43a047;
    border-color: #43a047;
  }
  
  .download-btn:hover {
    transform: translateY(-1px);
  }
  
  .icon {
    margin-left: 0.5rem;
  }
  
  /* Feedback Card */
  .feedback-card {
    background-color: #e8f5e9;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  
  .feedback-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #2e7d32;
  }
  
  .feedback-card p {
    color: #4b5563;
    margin-bottom: 1rem;
  }
  
  .contact-link {
    color: #f57c00;
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
    color: #2e7d32;
    font-weight: 500;
    text-decoration: none;
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
    color: #2e7d32;
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
    color: #2e7d32;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
  }
  
  .lang-button.active {
    background-color: #2e7d32;
    color: white;
    border-color: #2e7d32;
  }
  
  /* Responsive styles */
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
    
    .download-btn {
      width: 100%;
      justify-content: center;
    }
  }
</style>
