<!-- src/routes/frameworks/tools/justice-systems/+page.svelte -->
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
      return `${base}/frameworks/tools/justice-systems/${toolName}`;
    }
    
    // For potentially translated documents
    if (toolName.includes('justice-framework-lite-guide') || toolName === 'start-with-justice-kit.zip') {
      // Special case for main lite guides
      if (toolName === 'justice-framework-lite-guide.pdf' || toolName === 'justice-framework-lite-guide.md') {
        const langSuffix = currentLocale === 'sv' ? '-sv' : '-en';
        return `${base}/frameworks/tools/justice-systems/justice-framework-lite-guide${langSuffix}.${toolName.split('.').pop()}`;
      } else {
        // For other translated documents
        const extension = toolName.split('.').pop();
        const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
        return `${base}/frameworks/tools/justice-systems/${baseName}-${currentLocale}.${extension}`;
      }
    }
    
    // For tools that might have language variations
    if (['advocacy-playbook', 
         'cost-benefit-analysis-model',
         'monitoring-evaluation-rubric',
         'pilot-readiness-self-assessment-tool',
         'policy-harmonization-toolkit',
         'restorative-justice-guide',
         'indigenous-justice-integration-template',
         'stakeholder-engagement-charter',
         'youth-justice-guide'].includes(toolName.split('.')[0])) {
      const extension = toolName.split('.').pop();
      const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
      return `${base}/frameworks/tools/justice-systems/${baseName}-${currentLocale}.${extension}`;
    }
    
    // Default path for other files
    return `${base}/frameworks/tools/justice-systems/${toolName}`;
  };

  // Helper function for language button styles
  function getLanguageButtonStyle(lang) {
    const isActive = currentLocale === lang;
    return isActive ? 'lang-button active' : 'lang-button';
  }

  // Translations for this page
  const translations = {
    en: {
      title: "Justice Systems Framework Tools",
      subtitle: "Practical resources to implement the Justice Systems Framework",
      intro: "These tools and templates are designed to help you implement the Justice Systems Framework in various contexts. From planning restorative justice programs to engaging stakeholders and youth, these resources provide step-by-step guidance for transforming justice systems.",
      startKitTitle: "Start with Justice Kit",
      startKitDesc: "A complete package with everything you need to launch a Tier 1 pilot project. Includes all essential tools and templates in one convenient download.",
      startKitButton: "Download Complete Justice Kit",
      toolsTitle: "Core Implementation Tools",
      toolsDesc: "These essential tools help you implement key components of the Justice Systems Framework, from assessment to planning and stakeholder engagement.",
      advocacyTitle: "Advocacy & Scaling Tools",
      advocacyDesc: "Resources to help you engage stakeholders, secure funding, and scale your implementation from pilot projects to broader adoption.",
      guidesTitle: "Framework Guides",
      guidesDesc: "Compact guides to help you understand and share the Justice Systems Framework with others.",
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
      readinessDesc: "Evaluate your jurisdiction's readiness to launch framework pilots, identifying strengths, gaps, and actionable steps to ensure successful implementation.",
      stakeholderTitle: "Stakeholder Engagement Charter",
      stakeholderDesc: "A customizable governance framework for establishing inclusive stakeholder engagement, empowering diverse participants in decision-making.",
      restorativeTitle: "Restorative Justice Guide",
      restorativeDesc: "Step-by-step guidance for designing and implementing restorative justice programs that heal relationships and provide alternatives to punitive measures.",
      indigenousTitle: "Indigenous Justice Integration Template",
      indigenousDesc: "Framework for respectfully integrating Indigenous legal traditions with modern justice systems to enhance equity and preserve cultural heritage.",
      mneTitle: "Monitoring & Evaluation Rubric",
      mneDesc: "A comprehensive tool for tracking key performance indicators and system health metrics, ensuring accountability and continuous improvement.",
      advocacyPlaybookTitle: "Advocacy Playbook",
      advocacyPlaybookDesc: "Strategies, narratives, and materials to advocate for the framework with policymakers, organizations, community leaders, and global forums.",
      policyTitle: "Policy Harmonization Toolkit",
      policyDesc: "Tools and strategies to align local and regional policies with equitable justice principles and international agreements.",
      costBenefitTitle: "Cost-Benefit Analysis Model",
      costBenefitDesc: "Quantify economic and social returns of adopting the framework, providing evidence to justify funding and advocacy efforts.",
      youthGuideTitle: "Youth Justice Guide",
      youthGuideDesc: "Specialized resources for implementing youth-centered justice reforms that prioritize rehabilitation, restoration, and youth empowerment.",
      liteGuideTitle: "Justice Systems Framework Lite Guide",
      liteGuideDesc: "A condensed overview of the framework's core principles and implementation strategies for policy-level stakeholders.",
      liteGuideMediumTitle: "Justice Systems Framework Lite Guide (Community)",
      liteGuideMediumDesc: "A balanced guide for local authorities, justice practitioners, and community groups implementing the framework.",
      liteGuideYouthTitle: "Justice Systems Framework Lite Guide (Youth)",
      liteGuideYouthDesc: "A visual, accessible guide for youth groups, schools, and diverse communities to engage with the framework.",
      downloadButton: "Download"
    },
    sv: {
      title: "Verktygslåda för Rättssystem",
      subtitle: "Praktiska resurser för att implementera Rättssystemets Ramverk",
      intro: "Dessa verktyg och mallar är utformade för att hjälpa dig implementera rättssystemets ramverk i olika sammanhang. Från planering av restaurativ rättvisa till engagerande av intressenter och ungdomar, ger dessa resurser steg-för-steg-vägledning för att omvandla rättssystem.",
      startKitTitle: "Börja med Rättvisepaket",
      startKitDesc: "Ett komplett paket med allt du behöver för att starta en Nivå 1 pilotprojekt. Inkluderar alla nödvändiga verktyg och mallar i en bekväm nedladdning.",
      startKitButton: "Ladda ner komplett Rättvisepaket",
      toolsTitle: "Grundläggande implementeringsverktyg",
      toolsDesc: "Dessa väsentliga verktyg hjälper dig att implementera viktiga komponenter i rättssystemets ramverk, från bedömning till planering och intressentengagemang.",
      advocacyTitle: "Påverkans- & skalningsverktyg",
      advocacyDesc: "Resurser för att hjälpa dig engagera intressenter, säkra finansiering och skala upp din implementering från pilotprojekt till bredare antagande.",
      guidesTitle: "Ramverksguider",
      guidesDesc: "Kompakta guider för att hjälpa dig förstå och dela rättssystemets ramverk med andra.",
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
      readinessDesc: "Utvärdera din jurisdiktions beredskap att lansera ramverkspilotprojekt, identifiera styrkor, luckor och handlingsbara steg för att säkerställa framgångsrik implementering.",
      stakeholderTitle: "Mall för Intressentengagemangsstadga",
      stakeholderDesc: "Ett anpassningsbart styrningsramverk för att etablera inkluderande intressentengagemang, vilket ger olika deltagare möjlighet till delaktighet i beslutsfattande.",
      restorativeTitle: "Guide för restaurativ rättvisa",
      restorativeDesc: "Steg-för-steg-vägledning för att utforma och implementera restaurativa rättvisaprogram som läker relationer och erbjuder alternativ till straffåtgärder.",
      indigenousTitle: "Mall för integration av ursprungsfolks rättvisa",
      indigenousDesc: "Ramverk för respektfull integration av ursprungsfolks rättstraditioner med moderna rättssystem för att förbättra rättvisa och bevara kulturarv.",
      mneTitle: "Mall för uppföljnings- och utvärderingsmatris",
      mneDesc: "Ett omfattande verktyg för att spåra nyckeltal och systemhälsometrik, vilket säkerställer ansvarsskyldighet och kontinuerlig förbättring.",
      advocacyPlaybookTitle: "Handbok för påverkansarbete",
      advocacyPlaybookDesc: "Strategier, berättelser och material för att förespråka ramverket med beslutsfattare, organisationer, samhällsledare och globala forum.",
      policyTitle: "Verktygslåda för policysamordning",
      policyDesc: "Verktyg och strategier för att anpassa lokala och regionala policyer med principer för rättvis rättvisa och internationella avtal.",
      costBenefitTitle: "Modell för kostnads-/nyttobedömning",
      costBenefitDesc: "Kvantifiera ekonomiska och sociala avkastningar från antagandet av ramverket, vilket ger bevis för att motivera finansiering och förespråkande insatser.",
      youthGuideTitle: "Guide för ungdomsrättvisa",
      youthGuideDesc: "Specialiserade resurser för att implementera ungdomscentrerade rättviseformer som prioriterar rehabilitering, återställning och ungdomars egenmakt.",
      liteGuideTitle: "Förenklad guide för rättssystemets ramverk",
      liteGuideDesc: "En komprimerad översikt över ramverkets kärnprinciper och implementeringsstrategier för intressenter på policynivå.",
      liteGuideMediumTitle: "Förenklad guide för rättssystemets ramverk (Samhälle)",
      liteGuideMediumDesc: "En balanserad guide för lokala myndigheter, rättspraktiker och samhällsgrupper som implementerar ramverket.",
      liteGuideYouthTitle: "Förenklad guide för rättssystemets ramverk (Ungdom)",
      liteGuideYouthDesc: "En visuell, tillgänglig guide för ungdomsgrupper, skolor och olika samhällen att engagera sig i ramverket.",
      downloadButton: "Ladda ner"
    }
  };

  // Get current translations based on active locale
  $: texts = translations[currentLocale] || translations.en;
  
  // Tool data for each section
  const coreTools = [
    { id: 'pilot-readiness-self-assessment-tool', color: 'color-1' },
    { id: 'stakeholder-engagement-charter', color: 'color-2' },
    { id: 'restorative-justice-guide', color: 'color-3' },
    { id: 'indigenous-justice-integration-template', color: 'color-4' },
    { id: 'monitoring-evaluation-rubric', color: 'color-5' }
  ];
  
  const advocacyTools = [
    { id: 'advocacy-playbook', color: 'color-primary' },
    { id: 'policy-harmonization-toolkit', color: 'color-1' },
    { id: 'cost-benefit-analysis-model', color: 'color-2' },
    { id: 'youth-justice-guide', color: 'color-3' }
  ];

  const toolNameToTranslationKey = {
    'pilot-readiness-self-assessment-tool': 'readiness',
    'stakeholder-engagement-charter': 'stakeholder',
    'restorative-justice-guide': 'restorative',
    'indigenous-justice-integration-template': 'indigenous',
    'monitoring-evaluation-rubric': 'mne',
    'advocacy-playbook': 'advocacyPlaybook',
    'policy-harmonization-toolkit': 'policy',
    'cost-benefit-analysis-model': 'costBenefit',
    'youth-justice-guide': 'youthGuide'
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

      <!-- Start with the Justice Kit -->
      <div class="start-kit-card">
        <div class="card-content">
          <div class="card-icon">⚖️</div>
          <div class="card-text">
            <h2>{texts.startKitTitle}</h2>
            <p>{texts.startKitDesc}</p>
          </div>
          <div class="card-actions">
            <a href={getFilePath(`start-with-justice-kit-${currentLocale}.zip`)} download class="primary-btn">
              {texts.startKitButton}
              <span class="icon">↓</span>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Framework Guides -->
      <h2 class="section-title">{texts.guidesTitle}</h2>
      <p class="section-desc">{texts.guidesDesc}</p>
      
      <div class="tools-grid">
        <!-- Technical Lite Guide -->
        <div class="tool-card color-primary">
          <h3>{texts.liteGuideTitle}</h3>
          <p>{texts.liteGuideDesc}</p>
          <div class="tool-actions">
            <a href={getFilePath(`justice-framework-lite-guide-${currentLocale}.pdf`)} download class="download-btn pdf">
              {texts.downloadPDF}
              <span class="icon">↓</span>
            </a>
            <a href={getFilePath(`justice-framework-lite-guide-${currentLocale}.md`)} download class="download-btn md">
              {texts.downloadMarkdown}
              <span class="icon">↓</span>
            </a>
          </div>
        </div>
        
        <!-- Community Lite Guide -->
        <div class="tool-card color-2">
          <h3>{texts.liteGuideMediumTitle}</h3>
          <p>{texts.liteGuideMediumDesc}</p>
          <div class="tool-actions">
            <a href={getFilePath(`justice-lite-guide-community-${currentLocale}.pdf`)} download class="download-btn pdf">
              {texts.downloadPDF}
              <span class="icon">↓</span>
            </a>
            <a href={getFilePath(`justice-lite-guide-community-${currentLocale}.md`)} download class="download-btn md">
              {texts.downloadMarkdown}
              <span class="icon">↓</span>
            </a>
          </div>
        </div>
        
        <!-- Youth Lite Guide -->
        <div class="tool-card color-3">
          <h3>{texts.liteGuideYouthTitle}</h3>
          <p>{texts.liteGuideYouthDesc}</p>
          <div class="tool-actions">
            <a href={getFilePath(`youth-justice-guide-${currentLocale}.pdf`)} download class="download-btn pdf">
              {texts.downloadPDF}
              <span class="icon">↓</span>
            </a>
            <a href={getFilePath(`youth-justice-guide-${currentLocale}.md`)} download class="download-btn md">
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
    background: linear-gradient(to bottom right, #1e3a8a, #3b82f6);
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
    color: #1e40af;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: #1e3a8a;
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
    color: #1e40af;
  }
  
  .section-desc {
    margin-bottom: 2rem;
    color: #4b5563;
    line-height: 1.7;
    font-size: 1.125rem;
  }
  
  /* Start Kit Card */
  .start-kit-card {
    background-color: #eff6ff;
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(37, 99, 235, 0.1);
    border: 1px solid rgba(37, 99, 235, 0.2);
  }
  
  .card-content {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
  }
  
  .card-icon {
    font-size: 2.5rem;
    color: #1e40af;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #1e40af;
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
    border-left-color: #1e40af;
  }
  
  .color-primary h3 {
    color: #1e40af;
  }
  
  .color-1 {
    border-left-color: #1e3a8a;
  }
  
  .color-1 h3 {
    color: #1e3a8a;
  }
  
  .color-2 {
    border-left-color: #3b82f6;
  }
  
  .color-2 h3 {
    color: #3b82f6;
  }
  
  .color-3 {
    border-left-color: #60a5fa;
  }
  
  .color-3 h3 {
    color: #60a5fa;
  }
  
  .color-4 {
    border-left-color: #6366f1;
  }
  
  .color-4 h3 {
    color: #6366f1;
  }
  
  .color-5 {
    border-left-color: #4f46e5;
  }
  
  .color-5 h3 {
    color: #4f46e5;
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
    background-color: #1e40af;
    color: white;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: #1e3a8a;
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
    background-color: #1e40af;
  }

  .tool-card.color-1 .download-btn.pdf {
    background-color: #1e3a8a;
  }

  .tool-card.color-2 .download-btn.pdf {
    background-color: #3b82f6;
  }

  .tool-card.color-3 .download-btn.pdf {
    background-color: #60a5fa;
  }

  .tool-card.color-4 .download-btn.pdf {
    background-color: #6366f1;
  }

  .tool-card.color-5 .download-btn.pdf {
    background-color: #4f46e5;
  }

  .download-btn.md, .download-btn.excel {
    background-color: white;
    border: 1px solid;
  }

  .tool-card.color-primary .download-btn.md, .tool-card.color-primary .download-btn.excel {
    color: #1e40af;
    border-color: #1e40af;
  }

  .tool-card.color-1 .download-btn.md, .tool-card.color-1 .download-btn.excel {
    color: #1e3a8a;
    border-color: #1e3a8a;
  }

  .tool-card.color-2 .download-btn.md, .tool-card.color-2 .download-btn.excel {
    color: #3b82f6;
    border-color: #3b82f6;
  }

  .tool-card.color-3 .download-btn.md, .tool-card.color-3 .download-btn.excel {
    color: #60a5fa;
    border-color: #60a5fa;
  }

  .tool-card.color-4 .download-btn.md, .tool-card.color-4 .download-btn.excel {
    color: #6366f1;
    border-color: #6366f1;
  }

  .tool-card.color-5 .download-btn.md, .tool-card.color-5 .download-btn.excel {
    color: #4f46e5;
    border-color: #4f46e5;
  }
</style>
