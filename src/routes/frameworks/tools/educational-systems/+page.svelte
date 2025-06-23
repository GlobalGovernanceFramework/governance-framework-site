<!-- src/routes/frameworks/tools/educational-systems/+page.svelte -->
<script>
  import { t, locale, setLocale } from '$lib/i18n';
  import { base } from '$app/paths';

  // Subscribe to stores
  $: currentT = $t;
  $: currentLocale = $locale;

  // Define file paths. The getFilePath function included language in the filename
  const getFilePath = (toolName) => {
    // Check if the file is already language-specific
    if (toolName.includes('-swedish') || toolName.includes('-en')) {
      return `${base}/frameworks/tools/educational-systems/${toolName}`;
    }
    
    // For the lite guide and other potentially translated documents,
    // append the language code to the filename
    if (toolName.includes('education-framework-lite') || 
        toolName.includes('quick-start') || 
        toolName === 'seed-kit.zip') {
      // Special case for main lite guides
      if (toolName === 'education-framework-lite.pdf' || toolName === 'education-framework-lite.md') {
        const langSuffix = currentLocale === 'sv' ? '-swedish' : '';
        return `${base}/frameworks/tools/educational-systems/education-framework-lite${langSuffix}.${toolName.split('.').pop()}`;
      } else {
        // For other translated documents
        const extension = toolName.split('.').pop();
        const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
        return `${base}/frameworks/tools/educational-systems/${baseName}-${currentLocale}.${extension}`;
      }
    }
    
    // For tools that might have language variations but maintain the same base name
    if (['pilot-readiness-self-assessment-tool', 
         'youth-council-charter',
         'regenerative-project-guide',
         'curriculum-mapping-template',
         'mne-rubric-template',
         'advocacy-playbook',
         'bureaucratic-navigation-toolkit',
         'cost-benefit-analysis-model',
         'financial-pathway-assessment'].includes(toolName.split('.')[0])) {
      const extension = toolName.split('.').pop();
      const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
      return `${base}/frameworks/tools/educational-systems/${baseName}-${currentLocale}.${extension}`;
    }
    
    // Default path for other files
    return `${base}/frameworks/tools/educational-systems/${toolName}`;
  };

  // Helper function for language button styles
  function getLanguageButtonStyle(lang) {
    const isActive = currentLocale === lang;
    return isActive ? 'lang-button active' : 'lang-button';
  }

  // Translations for this page
  const translations = {
    en: {
      title: "Education Framework Tools",
      subtitle: "Practical resources to implement the Perfected Enhanced Educational Systems Framework",
      intro: "These tools and templates are designed to help you implement the Education Framework in various contexts. From planning regenerative projects to establishing youth councils, these resources provide step-by-step guidance for transforming educational systems.",
      seedKitTitle: "Start with the Seed Kit",
      seedKitDesc: "A complete package with everything you need to launch a Tier 1 micro-pilot. Includes all essential tools and templates in one convenient download.",
      seedKitButton: "Download Complete Seed Kit",
      toolsTitle: "Core Implementation Tools",
      toolsDesc: "These essential tools help you implement key components of the Education Framework, from assessment to planning and governance.",
      advocacyTitle: "Advocacy & Scaling Tools",
      advocacyDesc: "Resources to help you engage stakeholders, secure funding, and scale your implementation from micro-pilots to broader adoption.",
      guidesTitle: "Framework Guides",
      guidesDesc: "Compact guides to help you understand and share the Education Framework with others.",
      requestTitle: "Request Tools or Provide Feedback",
      requestDesc: "Need implementation resources for a specific purpose? Have suggestions for improvements? We welcome your input to make these tools more useful.",
      contactLink: "Contact us",
      languagesTitle: "Available Languages",
      downloadPDF: "Download PDF",
      downloadMarkdown: "Download Markdown",
      downloadExcel: "Download Excel Model",
      // Tool titles
      readinessTitle: "Pilot Readiness Self-Assessment Tool",
      readinessDesc: "Evaluate your community's readiness to launch framework pilots, identifying strengths, gaps, and actionable steps to ensure successful implementation.",
      youthCouncilTitle: "Youth Council Charter Template",
      youthCouncilDesc: "A customizable governance framework for establishing youth councils, empowering learners to participate in decision-making and policy development.",
      regenerativeTitle: "Regenerative Project Guide",
      regenerativeDesc: "Step-by-step guidance for designing and implementing regenerative projects that restore ecosystems and foster community resilience.",
      curriculumTitle: "Curriculum Mapping Template",
      curriculumDesc: "Aligns framework competencies with national or local curricula, facilitating integration with existing educational standards.",
      mneTitle: "M&E Rubric Template",
      mneDesc: "A comprehensive tool for tracking learning outcomes and system health metrics, ensuring accountability and continuous improvement.",
      advocacyPlaybookTitle: "Advocacy Playbook",
      advocacyPlaybookDesc: "Strategies, narratives, and materials to advocate for the framework with ministries, unions, community leaders, and global forums.",
      bureaucraticTitle: "Bureaucratic Navigation Toolkit",
      bureaucraticDesc: "Tools and strategies to overcome administrative and political barriers, ensuring smooth adoption in diverse governance systems.",
      costBenefitTitle: "Cost-Benefit Analysis Model",
      costBenefitDesc: "Quantify economic and social returns of adopting the framework, providing evidence to justify funding and advocacy efforts.",
      financialPathwayTitle: "Financial Pathway Assessment Tool",
      financialPathwayDesc: "Evaluate your community's readiness for Track 1 (Pragmatic Transition) vs Track 2 (Non-Extractive Transformation) financial models.",
      liteGuideEnTitle: "Education Framework Lite Guide (English)",
      liteGuideEnDesc: "A condensed overview of the framework's core principles, components, and implementation strategies in simple language.",
      liteGuideSvTitle: "Utbildningsramverk Lite Guide (Svenska)",
      liteGuideSvDesc: "En kompakt översikt över ramverkets kärnprinciper, komponenter och implementeringsstrategier på enkelt språk.",
      downloadButton: "Ladda ner"
    },
    sv: {
      title: "Verktyg för utbildningsramverket",
      subtitle: "Praktiska resurser för att implementera det Perfekterade Förstärkta Utbildningssystemets Ramverk",
      intro: "Dessa verktyg och mallar är utformade för att hjälpa dig implementera utbildningsramverket i olika sammanhang. Från planering av regenerativa projekt till etablering av ungdomsråd, ger dessa resurser steg-för-steg-vägledning för att omvandla utbildningssystem.",
      seedKitTitle: "Börja med Frö-paketet",
      seedKitDesc: "Ett komplett paket med allt du behöver för att starta en Nivå 1 mikro-pilot. Inkluderar alla nödvändiga verktyg och mallar i en bekväm nedladdning.",
      seedKitButton: "Ladda ner komplett Frö-paket",
      toolsTitle: "Grundläggande implementeringsverktyg",
      toolsDesc: "Dessa väsentliga verktyg hjälper dig att implementera viktiga komponenter i utbildningsramverket, från bedömning till planering och styrning.",
      advocacyTitle: "Opinionsbildnings- & skalningsverktyg",
      advocacyDesc: "Resurser för att hjälpa dig engagera intressenter, säkra finansiering och skala upp din implementering från mikro-piloter till bredare antagande.",
      guidesTitle: "Ramverksguider",
      guidesDesc: "Kompakta guider för att hjälpa dig förstå och dela utbildningsramverket med andra.",
      requestTitle: "Begär verktyg eller ge feedback",
      requestDesc: "Behöver du implementeringsresurser för ett specifikt syfte? Har du förslag på förbättringar? Vi välkomnar dina synpunkter för att göra dessa verktyg mer användbara.",
      contactLink: "Kontakta oss",
      languagesTitle: "Tillgängliga språk",
      downloadPDF: "Ladda ner PDF",
      downloadMarkdown: "Ladda ner Markdown",
      downloadExcel: "Ladda ner Excel-modell",
      // Tool titles in Swedish
      readinessTitle: "Självbedömningsverktyg för pilotberedskap",
      readinessDesc: "Utvärdera din gemenskaps beredskap att lansera ramverkspilotprojekt, identifiera styrkor, luckor och handlingsbara steg för att säkerställa framgångsrik implementering.",
      youthCouncilTitle: "Mall för ungdomsrådsstadga",
      youthCouncilDesc: "Ett anpassningsbart styrningsramverk för att etablera ungdomsråd, vilket ger elever möjlighet att delta i beslutsfattande och policyutveckling.",
      regenerativeTitle: "Guide för regenerativa projekt",
      regenerativeDesc: "Steg-för-steg-vägledning för att utforma och implementera regenerativa projekt som återställer ekosystem och främjar samhällets motståndskraft.",
      curriculumTitle: "Mall för läroplansanpassning",
      curriculumDesc: "Anpassar ramverkets kompetenser till nationella eller lokala läroplaner, underlättar integration med befintliga utbildningsstandarder.",
      mneTitle: "M&E-bedömningsmatris mall",
      mneDesc: "Ett omfattande verktyg för att spåra läranderesultat och systemhälsometrik, vilket säkerställer ansvarsskyldighet och kontinuerlig förbättring.",
      advocacyPlaybookTitle: "Opinionsbildningshandbok",
      advocacyPlaybookDesc: "Strategier, berättelser och material för att förespråka ramverket med ministerier, fackföreningar, samhällsledare och globala forum.",
      bureaucraticTitle: "Verktygslåda för byråkratisk navigation",
      bureaucraticDesc: "Verktyg och strategier för att övervinna administrativa och politiska hinder, säkerställa smidig antagning i olika styrsystem.",
      costBenefitTitle: "Kostnad-nytta-analysmodell",
      costBenefitDesc: "Kvantifiera ekonomiska och sociala avkastningar från antagandet av ramverket, vilket ger bevis för att motivera finansiering och förespråkande insatser.",
      financialPathwayTitle: "Bedömningsverktyg för finansiell väg",
      financialPathwayDesc: "Utvärdera din gemenskaps beredskap för Spår 1 (Pragmatisk övergång) vs Spår 2 (Icke-extraktiv transformation) finansiella modeller.",
      liteGuideEnTitle: "Utbildningsramverk Lite Guide (Engelska)",
      liteGuideEnDesc: "En komprimerad översikt över ramverkets kärnprinciper, komponenter och implementeringsstrategier på enkelt språk.",
      liteGuideSvTitle: "Utbildningsramverk Lite Guide (Svenska)",
      liteGuideSvDesc: "En kompakt översikt över ramverkets kärnprinciper, komponenter och implementeringsstrategier på enkelt språk.",
      downloadButton: "Ladda ner"
    }
  };

  // Get current translations based on active locale
  $: texts = translations[currentLocale] || translations.en;

  // Tool data for each section, using actual file names
  const coreTools = [
    { id: 'pilot-readiness-self-assessment-tool', color: 'color-1' },
    { id: 'youth-council-charter', color: 'color-2' },
    { id: 'regenerative-project-guide', color: 'color-3' },
    { id: 'curriculum-mapping-template', color: 'color-4' },
    { id: 'mne-rubric-template', color: 'color-5' },
    { id: 'financial-pathway-assessment', color: 'color-6' }
  ];
  
  const advocacyTools = [
    { id: 'advocacy-playbook', color: 'color-dark' },
    { id: 'bureaucratic-navigation-toolkit', color: 'color-1' },
    { id: 'cost-benefit-analysis-model', color: 'color-2', hasExcel: true }
  ];

  const toolNameToTranslationKey = {
    'pilot-readiness-self-assessment-tool': 'readiness',
    'youth-council-charter': 'youthCouncil',
    'regenerative-project-guide': 'regenerative',
    'curriculum-mapping-template': 'curriculum',
    'mne-rubric-template': 'mne',
    'advocacy-playbook': 'advocacyPlaybook',
    'bureaucratic-navigation-toolkit': 'bureaucratic',
    'cost-benefit-analysis-model': 'costBenefit',
    'financial-pathway-assessment': 'financialPathway'
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
      {currentLocale === 'sv' ? 'Tillbaka till verktygsöversikt' : 'Back to Tools Overview'}
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
          <div class="card-icon">📦</div>
          <div class="card-text">
            <h2>{texts.seedKitTitle}</h2>
            <p>{texts.seedKitDesc}</p>
          </div>
          <div class="card-actions">
            <a href={getFilePath(`seed-kit.zip`)} download class="primary-btn">
              {texts.seedKitButton}
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
              <a href={getFilePath(`${tool.id}.pdf`)} download class="download-btn pdf">
                {texts.downloadPDF}
                <span class="icon">↓</span>
              </a>
              <a href={getFilePath(`${tool.id}.md`)} download class="download-btn md">
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
              <a href={getFilePath(`${tool.id}.pdf`)} download class="download-btn pdf">
                {texts.downloadPDF}
                <span class="icon">↓</span>
              </a>
              <a href={getFilePath(`${tool.id}.md`)} download class="download-btn md">
                {texts.downloadMarkdown}
                <span class="icon">↓</span>
              </a>
              {#if tool.hasExcel}
                <a href={getFilePath(`${tool.id}.xlsx`)} download class="download-btn excel">
                  {texts.downloadExcel}
                  <span class="icon">↓</span>
                </a>
              {/if}
            </div>
          </div>
        {/each}
      </div>

      <!-- Framework Overview & Lite Guides -->
      <h2 class="section-title">{texts.guidesTitle}</h2>
      <p class="section-desc">{texts.guidesDesc}</p>
      
      <div class="tools-grid">
        <div class="tool-card color-2">
          <h3>
            {currentLocale === 'sv' ? texts.liteGuideSvTitle : texts.liteGuideEnTitle}
          </h3>
          <p>
            {currentLocale === 'sv' ? texts.liteGuideSvDesc : texts.liteGuideEnDesc}
          </p>
          <div class="tool-actions">
            <a href={getFilePath('education-framework-lite.pdf')} download class="download-btn pdf">
              {texts.downloadPDF}
              <span class="icon">↓</span>
            </a>
            <a href={getFilePath('education-framework-lite.md')} download class="download-btn md">
              {texts.downloadMarkdown}
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
      <div class="back-link">
        <a href="{base}/frameworks/tools">
          <span class="back-icon">←</span>
          {currentLocale === 'sv' ? 'Tillbaka till verktygsöversikt' : 'Back to Tools Overview'}
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
    background: linear-gradient(to bottom right, #2B4B8C, #6B5CA5);
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
    color: #2B4B8C;
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
    color: #2B4B8C;
  }
  
  .section-desc {
    margin-bottom: 2rem;
    color: #4b5563;
    line-height: 1.7;
    font-size: 1.125rem;
  }
  
  /* Seed Kit Card */
  .seed-kit-card {
    background-color: #f0f4ff;
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(43, 75, 140, 0.1);
    border: 1px solid rgba(43, 75, 140, 0.2);
  }
  
  .card-content {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
  }
  
  .card-icon {
    font-size: 2.5rem;
    color: #2B4B8C;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #2B4B8C;
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
  .color-dark {
    border-left-color: #2B4B8C;
  }
  
  .color-dark h3 {
    color: #2B4B8C;
  }
  
  .color-1 {
    border-left-color: #DAA520;
  }
  
  .color-1 h3 {
    color: #DAA520;
  }
  
  .color-2 {
    border-left-color: #2B4B8C;
  }
  
  .color-2 h3 {
    color: #2B4B8C;
  }
  
  .color-3 {
    border-left-color: #2D5F2D;
  }
  
  .color-3 h3 {
    color: #2D5F2D;
  }
  
  .color-4 {
    border-left-color: #6B5CA5;
  }
  
  .color-4 h3 {
    color: #6B5CA5;
  }
  
  .color-5 {
    border-left-color: #4B8AC2;
  }
  
  .color-5 h3 {
    color: #4B8AC2;
  }

  .color-6 {
    border-left-color: #8B4A9C;
  }

  .color-6 h3 {
    color: #8B4A9C;
  }

  .tool-card.color-6 .download-btn.pdf {
    background-color: #8B4A9C;
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
    background-color: #2B4B8C;
    color: white;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: #1A365D;
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
    /* Change this line to use the specific color of the parent card */
    background-color: #2B4B8C; /* Use a consistent blue background instead of currentColor */
    color: white;
  }

  .tool-card.color-1 .download-btn.pdf {
    background-color: #DAA520;
  }

  .tool-card.color-2 .download-btn.pdf {
    background-color: #2B4B8C;
  }

  .tool-card.color-3 .download-btn.pdf {
    background-color: #2D5F2D;
  }

  .tool-card.color-4 .download-btn.pdf {
    background-color: #6B5CA5;
  }

  .tool-card.color-5 .download-btn.pdf {
    background-color: #4B8AC2;
  }

  .download-btn.md, .download-btn.excel {
    background-color: white;
    border: 1px solid currentColor;
    color: inherit;
  }

  .download-btn:hover {
    transform: translateY(-1px);
  }
  
  .download-btn.md {
    background-color: white;
    border: 1px solid currentColor;
    color: currentColor;
  }
  
  .download-btn.excel {
    background-color: white;
    border: 1px solid currentColor;
    color: currentColor;
  }
  
  .download-btn:hover {
    transform: translateY(-1px);
  }
  
  .icon {
    margin-left: 0.5rem;
  }
  
  /* Feedback Card */
  .feedback-card {
    background-color: #e9f2e9;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  
  .feedback-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #2D5F2D;
  }
  
  .feedback-card p {
    color: #4b5563;
    margin-bottom: 1rem;
  }
  
  .contact-link {
    color: #DAA520;
    text-decoration: underline;
    font-weight: 500;
  }
  
  /* Back Link */
  .back-link {
    margin-bottom: 2rem;
  }
  
  .back-link a {
    display: inline-flex;
    align-items: center;
    color: #2B4B8C;
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
    color: #2B4B8C;
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
    color: #2B4B8C;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
  }
  
  .lang-button.active {
    background-color: #2B4B8C;
    color: white;
    border-color: #2B4B8C;
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
