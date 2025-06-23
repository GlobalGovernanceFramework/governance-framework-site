<!-- src/routes/frameworks/tools/climate-and-energy-governance/+page.svelte -->
<script>
  import { t, locale, setLocale } from '$lib/i18n';
  import { base } from '$app/paths';

  // Subscribe to stores
  $: currentT = $t;
  $: currentLocale = $locale;

  // Define file paths. The getFilePath function includes language in the filename
  const getFilePath = (toolName) => {
    // Check if the file is already language-specific
    if (toolName.includes('-sv') || toolName.includes('-en')) {
      return `${base}/frameworks/tools/climate-and-energy-governance/${toolName}`;
    }
    
    // For the guides and other potentially translated documents
    if (toolName.includes('guide') || 
        toolName === 'seed-kit.zip') {
      // Special case for main guides
      if (toolName === 'climate-energy-action-guide.pdf' || toolName === 'climate-energy-action-guide.md') {
        const langSuffix = currentLocale === 'sv' ? '-sv' : '-en';
        return `${base}/frameworks/tools/climate-and-energy-governance/climate-energy-action-guide${langSuffix}.${toolName.split('.').pop()}`;
      } else {
        // For other translated documents
        const extension = toolName.split('.').pop();
        const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
        return `${base}/frameworks/tools/climate-and-energy-governance/${baseName}-${currentLocale}.${extension}`;
      }
    }
    
    // For tools that might have language variations but maintain the same base name
    if ([
        'governance-readiness-assessment',
        'just-transition-planning-template',
        'stakeholder-engagement-protocol',
        'policy-integration-matrix',
        'governance-coordination-guide',
        'energy-transition-roadmap',
        'adaptation-planning-framework',
        'carbon-pricing-guide',
        'nature-based-solutions-tool',
        'innovation-acceleration-kit',
        'policy-brief-templates',
        'governance-communication-toolkit',
        'institutional-reform-guide',
        'finance-access-navigator',
        'regional-hub-connection-guide'
        ].includes(toolName.split('.')[0])) {
      const extension = toolName.split('.').pop();
      const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
      return `${base}/frameworks/tools/climate-and-energy-governance/${baseName}-${currentLocale}.${extension}`;
    }
    
    // Default path for other files
    return `${base}/frameworks/tools/climate-and-energy-governance/${toolName}`;
  };

  // Helper function for language button styles
  function getLanguageButtonStyle(lang) {
    const isActive = currentLocale === lang;
    return isActive ? 'lang-button active' : 'lang-button';
  }

  // Translations for this page
  const translations = {
    en: {
      title: "Climate & Energy Governance Tools",
      subtitle: "Practical resources to implement the Climate & Energy Governance Framework",
      intro: "These tools and templates are designed to help you implement the Climate & Energy Governance Framework in various contexts. From assessment to planning and advocacy, these resources provide step-by-step guidance for transforming energy systems and strengthening climate governance.",
      seedKitTitle: "Start with the Seed Kit",
      seedKitDesc: "A complete package with everything you need to launch implementation. Includes all essential tools and templates in one convenient download.",
      seedKitButton: "Download Complete Seed Kit",
      guidesTitle: "Framework Guides",
      guidesDesc: "Lite guides tailored to specific audiences to help you understand and share the Climate & Energy Governance Framework with others.",
      toolsTitle: "Core Governance Tools",
      toolsDesc: "These essential tools help you implement key components of the Climate & Energy Governance Framework, from assessment to planning and stakeholder engagement.",
      sectoralTitle: "Sectoral Implementation Guides",
      sectoralDesc: "Specialized tools to support implementation across key sectoral areas including energy transition, adaptation, and innovation.",
      advocacyTitle: "Advocacy & Scaling Tools",
      advocacyDesc: "Resources to help you engage stakeholders, secure funding, and scale your implementation from pilot projects to broader adoption.",
      requestTitle: "Request Tools or Provide Feedback",
      requestDesc: "Need implementation resources for a specific purpose? Have suggestions for improvements? We welcome your input to make these tools more useful.",
      contactLink: "Contact us",
      languagesTitle: "Available Languages",
      downloadPDF: "Download PDF",
      downloadMarkdown: "Download Markdown",

      // Tool titles - Lite Guides
      technicalGuideTitle: "Technical Guide for Policymakers",
      technicalGuideDesc: "Detailed 15-page guide focusing on governance structures, policy mechanisms, and technical implementation for officials and decision-makers.",
      stakeholderGuideTitle: "Stakeholder Implementation Guide",
      stakeholderGuideDesc: "Practical 10-page guide for businesses, civil society organizations, and regional authorities emphasizing engagement and sectoral implementation.",
      actionGuideTitle: "Climate Action Guide",
      actionGuideDesc: "Accessible 6-page guide for broader audiences including youth and community groups, focusing on local action and participatory governance.",
      
      // Tool titles - Core Governance
      readinessTitle: "Governance Readiness Assessment Tool",
      readinessDesc: "Evaluate your governance readiness to implement climate and energy policies, identifying strengths, gaps, and actionable steps to ensure successful implementation.",
      justTransitionTitle: "Just Transition Planning Template",
      justTransitionDesc: "A customizable planning template for designing and implementing equitable transitions that ensure no one is left behind in the shift to clean energy systems.",
      stakeholderTitle: "Stakeholder Engagement Protocol",
      stakeholderDesc: "A structured approach to inclusive stakeholder engagement, ensuring diverse participants can shape climate and energy decision-making.",
      policyIntegrationTitle: "Climate-Energy Policy Integration Matrix",
      policyIntegrationDesc: "Analytical tool to assess policy coherence and identify opportunities for integrating climate and energy considerations across sectors.",
      coordinationGuideTitle: "Multi-level Governance Coordination Guide",
      coordinationGuideDesc: "Guidance for effective coordination between local, regional, national, and international governance levels to enhance policy implementation.",
      hubConnectionTitle: "Regional Hub Connection Guide",
      hubConnectionDesc: "Guidance for connecting local climate action to regional coordination mechanisms through the Regional Climate & Energy Governance Hubs.",
      
      // Tool titles - Sectoral Implementation
      energyTransitionTitle: "Energy Transition Roadmap Template",
      energyTransitionDesc: "Framework for developing comprehensive roadmaps to transform energy systems, with phased timelines and key milestones.",
      adaptationPlanningTitle: "Adaptation Planning Framework",
      adaptationPlanningDesc: "Systematic approach to developing climate resilience plans that address vulnerabilities and build adaptive capacity.",
      carbonPricingTitle: "Carbon Pricing Implementation Guide",
      carbonPricingDesc: "Practical guidance for designing and implementing effective carbon pricing mechanisms adapted to diverse contexts.",
      natureSolutionsTitle: "Nature-based Solutions Assessment Tool",
      natureSolutionsDesc: "Methodology for evaluating and implementing nature-based approaches to climate mitigation and adaptation.",
      innovationTitle: "Climate Innovation Acceleration Kit",
      innovationDesc: "Resources to support and accelerate climate technology innovation and deployment across sectors.",
      
      // Tool titles - Advocacy & Scaling
      policyBriefTitle: "Climate Policy Brief Templates",
      policyBriefDesc: "Customizable templates for creating compelling policy briefs to influence climate and energy decision-making.",
      communicationTitle: "Governance Communication Toolkit",
      communicationDesc: "Strategic approaches and materials for communicating complex governance concepts to diverse audiences.",
      institutionalTitle: "Climate Institutional Reform Guide",
      institutionalDesc: "Framework for evaluating and strengthening institutional arrangements to better address climate challenges.",
      financeTitle: "Climate Finance Access Navigator",
      financeDesc: "Guide to identifying, accessing, and leveraging climate finance from diverse sources for implementing governance measures.",
      
      downloadButton: "Download"
    },
    sv: {
      title: "Verktyg för klimat- och energistyrning",
      subtitle: "Praktiska resurser för att implementera ramverket för klimat- och energistyrning",
      intro: "Dessa verktyg och mallar är utformade för att hjälpa dig implementera ramverket för klimat- och energistyrning i olika sammanhang. Från bedömning till planering och påverkansarbete, ger dessa resurser steg-för-steg-vägledning för att omvandla energisystem och stärka klimatstyrning.",
      seedKitTitle: "Börja med startpaketet",
      seedKitDesc: "Ett komplett paket med allt du behöver för att påbörja implementeringen. Inkluderar alla nödvändiga verktyg och mallar i en bekväm nedladdning.",
      seedKitButton: "Ladda ner komplett startpaket",
      guidesTitle: "Ramverksguider",
      guidesDesc: "Enkla guider anpassade för specifika målgrupper för att hjälpa dig förstå och dela ramverket för klimat- och energistyrning med andra.",
      toolsTitle: "Grundläggande styrningsverktyg",
      toolsDesc: "Dessa väsentliga verktyg hjälper dig att implementera viktiga komponenter i ramverket för klimat- och energistyrning, från bedömning till planering och intressentengagemang.",
      sectoralTitle: "Sektorspecifika implementeringsguider",
      sectoralDesc: "Specialiserade verktyg för att stödja implementering inom viktiga sektorområden inklusive energiomställning, anpassning och innovation.",
      advocacyTitle: "Påverkans- och skalningsverktyg",
      advocacyDesc: "Resurser för att hjälpa dig engagera intressenter, säkra finansiering och skala upp din implementering från pilotprojekt till bredare antagande.",
      requestTitle: "Begär verktyg eller ge feedback",
      requestDesc: "Behöver du implementeringsresurser för ett specifikt syfte? Har du förslag på förbättringar? Vi välkomnar dina synpunkter för att göra dessa verktyg mer användbara.",
      contactLink: "Kontakta oss",
      languagesTitle: "Tillgängliga språk",
      downloadPDF: "Ladda ner PDF",
      downloadMarkdown: "Ladda ner Markdown",

      // Tool titles - Lite Guides (Swedish)
      technicalGuideTitle: "Teknisk guide för beslutsfattare",
      technicalGuideDesc: "Detaljerad 15-sidig guide med fokus på styrningsstrukturer, policymekanismer och teknisk implementering för tjänstemän och beslutsfattare.",
      stakeholderGuideTitle: "Implementeringsguide för intressenter",
      stakeholderGuideDesc: "Praktisk 10-sidig guide för företag, civilsamhällesorganisationer och regionala myndigheter med betoning på engagemang och sektoriell implementering.",
      actionGuideTitle: "Klimataktionsguide",
      actionGuideDesc: "Tillgänglig 6-sidig guide för bredare målgrupper inklusive ungdomar och samhällsgrupper, med fokus på lokala åtgärder och deltagandebaserad styrning.",
      
      // Tool titles - Core Governance (Swedish)
      readinessTitle: "Verktyg för bedömning av styrningsberedskap",
      readinessDesc: "Utvärdera din styrningsberedskap för att implementera klimat- och energipolitik, identifiera styrkor, luckor och handlingsbara steg för att säkerställa framgångsrik implementering.",
      justTransitionTitle: "Mall för planering av rättvis omställning",
      justTransitionDesc: "En anpassningsbar planeringsmall för att utforma och genomföra rättvisa omställningar som säkerställer att ingen lämnas efter i övergången till rena energisystem.",
      stakeholderTitle: "Protokoll för intressentengagemang",
      stakeholderDesc: "Ett strukturerat tillvägagångssätt för inkluderande intressentengagemang, vilket säkerställer att olika deltagare kan forma klimat- och energibeslut.",
      policyIntegrationTitle: "Integrationsmatris för klimat- och energipolitik",
      policyIntegrationDesc: "Analytiskt verktyg för att bedöma politisk samstämmighet och identifiera möjligheter för att integrera klimat- och energiöverväganden över sektorer.",
      coordinationGuideTitle: "Guide för samordning av flernivåstyrning",
      coordinationGuideDesc: "Vägledning för effektiv samordning mellan lokala, regionala, nationella och internationella styrningsnivåer för att förbättra policyimplementering.",
      hubConnectionTitle: "Guide för regional navkoppling",
      hubConnectionDesc: "Vägledning för att koppla lokala klimatåtgärder till regionala samordningsmekanismer genom de regionala klimat- och energistyrningsnavena.",
      
      // Tool titles - Sectoral Implementation (Swedish)
      energyTransitionTitle: "Mall för färdplan för energiomställning",
      energyTransitionDesc: "Ramverk för att utveckla omfattande färdplaner för att omvandla energisystem, med fasade tidslinjer och viktiga milstolpar.",
      adaptationPlanningTitle: "Ramverk för anpassningsplanering",
      adaptationPlanningDesc: "Systematiskt tillvägagångssätt för att utveckla klimatresiliensplaner som adresserar sårbarheter och bygger anpassningsförmåga.",
      carbonPricingTitle: "Implementeringsguide för koldioxidprissättning",
      carbonPricingDesc: "Praktisk vägledning för att utforma och implementera effektiva mekanismer för koldioxidprissättning anpassade till olika sammanhang.",
      natureSolutionsTitle: "Utvärderingsverktyg för naturbaserade lösningar",
      natureSolutionsDesc: "Metodik för att utvärdera och implementera naturbaserade tillvägagångssätt för klimatbegränsning och anpassning.",
      innovationTitle: "Accelerationspaket för klimatinnovation",
      innovationDesc: "Resurser för att stödja och accelerera klimatteknikinnovation och utplacering över sektorer.",
      
      // Tool titles - Advocacy & Scaling (Swedish)
      policyBriefTitle: "Mallar för klimatpolicyöversikter",
      policyBriefDesc: "Anpassningsbara mallar för att skapa övertygande policyöversikter för att påverka klimat- och energibeslut.",
      communicationTitle: "Verktygslåda för styrningskommunikation",
      communicationDesc: "Strategiska tillvägagångssätt och material för att kommunicera komplexa styrningskoncept till olika målgrupper.",
      institutionalTitle: "Guide till klimatinstitutionell reform",
      institutionalDesc: "Ramverk för att utvärdera och stärka institutionella arrangemang för att bättre hantera klimatutmaningar.",
      financeTitle: "Klimatfinansieringsåtkomstnavigator",
      financeDesc: "Guide till att identifiera, få tillgång till och utnyttja klimatfinansiering från olika källor för att implementera styrningsåtgärder.",
      
      downloadButton: "Ladda ner"
    }
  };

  // Get current translations based on active locale
  $: texts = translations[currentLocale] || translations.en;

  // Tool data for each section, using actual file names
  const guideTools = [
    { id: 'technical-guide', fileName: 'climate-energy-technical-guide', color: 'color-1' },
    { id: 'stakeholder-guide', fileName: 'climate-energy-stakeholder-guide', color: 'color-2' },
    { id: 'action-guide', fileName: 'climate-energy-action-guide', color: 'color-3' }
  ];
  
  const coreTools = [
    { id: 'hub-connection', fileName: 'regional-hub-connection-guide', color: 'color-dark' },
    { id: 'readiness', fileName: 'governance-readiness-assessment', color: 'color-1' },
    { id: 'just-transition', fileName: 'just-transition-planning-template', color: 'color-2' },
    { id: 'stakeholder', fileName: 'stakeholder-engagement-protocol', color: 'color-3' },
    { id: 'policy-integration', fileName: 'policy-integration-matrix', color: 'color-4' },
    { id: 'coordination-guide', fileName: 'governance-coordination-guide', color: 'color-5' }
  ];
  
  const sectoralTools = [
    { id: 'energy-transition', fileName: 'energy-transition-roadmap', color: 'color-1' },
    { id: 'adaptation-planning', fileName: 'adaptation-planning-framework', color: 'color-2' },
    { id: 'carbon-pricing', fileName: 'carbon-pricing-guide', color: 'color-3' },
    { id: 'nature-solutions', fileName: 'nature-based-solutions-tool', color: 'color-4' },
    { id: 'innovation', fileName: 'innovation-acceleration-kit', color: 'color-5' }
  ];
  
  const advocacyTools = [
    { id: 'policy-brief', fileName: 'policy-brief-templates', color: 'color-1' },
    { id: 'communication', fileName: 'governance-communication-toolkit', color: 'color-2' },
    { id: 'institutional', fileName: 'institutional-reform-guide', color: 'color-3' },
    { id: 'finance', fileName: 'finance-access-navigator', color: 'color-4' }
  ];

  const toolNameToTranslationKey = {
    'technical-guide': 'technicalGuide',
    'stakeholder-guide': 'stakeholderGuide',
    'action-guide': 'actionGuide',
    'hub-connection': 'hubConnection',
    'readiness': 'readiness',
    'just-transition': 'justTransition',
    'stakeholder': 'stakeholder',
    'policy-integration': 'policyIntegration',
    'coordination-guide': 'coordinationGuide',
    'energy-transition': 'energyTransition',
    'adaptation-planning': 'adaptationPlanning',
    'carbon-pricing': 'carbonPricing',
    'nature-solutions': 'natureSolutions',
    'innovation': 'innovation',
    'policy-brief': 'policyBrief',
    'communication': 'communication',
    'institutional': 'institutional',
    'finance': 'finance'
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
          <div class="card-icon">⚡</div>
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

      <!-- Framework Guides -->
      <h2 class="section-title">{texts.guidesTitle}</h2>
      <p class="section-desc">{texts.guidesDesc}</p>
      
      <div class="tools-grid">
        {#each guideTools as tool}
          <div class="tool-card {tool.color}">
            <h3>{texts[`${toolNameToTranslationKey[tool.id]}Title`]}</h3>
            <p>{texts[`${toolNameToTranslationKey[tool.id]}Desc`]}</p>
            <div class="tool-actions">
              <a href={getFilePath(`${tool.fileName}-${currentLocale}.pdf`)} download class="download-btn pdf">
                {texts.downloadPDF}
                <span class="icon">↓</span>
              </a>
              <a href={getFilePath(`${tool.fileName}-${currentLocale}.md`)} download class="download-btn md">
                {texts.downloadMarkdown}
                <span class="icon">↓</span>
              </a>
            </div>
          </div>
        {/each}
      </div>

      <!-- Core Governance Tools -->
      <h2 class="section-title">{texts.toolsTitle}</h2>
      <p class="section-desc">{texts.toolsDesc}</p>
      
      <div class="tools-grid">
        {#each coreTools as tool}
          <div class="tool-card {tool.color}">
            <h3>{texts[`${toolNameToTranslationKey[tool.id]}Title`]}</h3>
            <p>{texts[`${toolNameToTranslationKey[tool.id]}Desc`]}</p>
            <div class="tool-actions">
              <a href={getFilePath(`${tool.fileName}-${currentLocale}.pdf`)} download class="download-btn pdf">
                {texts.downloadPDF}
                <span class="icon">↓</span>
              </a>
              <a href={getFilePath(`${tool.fileName}-${currentLocale}.md`)} download class="download-btn md">
                {texts.downloadMarkdown}
                <span class="icon">↓</span>
              </a>
            </div>
          </div>
        {/each}
      </div>

      <!-- Sectoral Implementation Guides Section -->
      <h2 class="section-title">{texts.sectoralTitle}</h2>
      <p class="section-desc">{texts.sectoralDesc}</p>
      
      <div class="tools-grid">
        {#each sectoralTools as tool}
          <div class="tool-card {tool.color}">
            <h3>{texts[`${toolNameToTranslationKey[tool.id]}Title`]}</h3>
            <p>{texts[`${toolNameToTranslationKey[tool.id]}Desc`]}</p>
            <div class="tool-actions">
              <a href={getFilePath(`${tool.fileName}-${currentLocale}.pdf`)} download class="download-btn pdf">
                {texts.downloadPDF}
                <span class="icon">↓</span>
              </a>
              <a href={getFilePath(`${tool.fileName}-${currentLocale}.md`)} download class="download-btn md">
                {texts.downloadMarkdown}
                <span class="icon">↓</span>
              </a>
            </div>
          </div>
        {/each}
      </div>

      <!-- Advocacy & Scaling Tools Section -->
      <h2 class="section-title">{texts.advocacyTitle}</h2>
      <p class="section-desc">{texts.advocacyDesc}</p>
      
      <div class="tools-grid">
        {#each advocacyTools as tool}
          <div class="tool-card {tool.color}">
            <h3>{texts[`${toolNameToTranslationKey[tool.id]}Title`]}</h3>
            <p>{texts[`${toolNameToTranslationKey[tool.id]}Desc`]}</p>
            <div class="tool-actions">
              <a href={getFilePath(`${tool.fileName}-${currentLocale}.pdf`)} download class="download-btn pdf">
                {texts.downloadPDF}
                <span class="icon">↓</span>
              </a>
              <a href={getFilePath(`${tool.fileName}-${currentLocale}.md`)} download class="download-btn md">
                {texts.downloadMarkdown}
                <span class="icon">↓</span>
              </a>
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
    background: linear-gradient(to bottom right, #156D64, #2C8A78);
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
    color: #2C8A78;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: #156D64;
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
    color: #2C8A78;
  }
  
  .section-desc {
    margin-bottom: 2rem;
    color: #4b5563;
    line-height: 1.7;
    font-size: 1.125rem;
  }
  
  /* Seed Kit Card */
  .seed-kit-card {
    background-color: #e6f2f0;
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(44, 138, 120, 0.1);
    border: 1px solid rgba(44, 138, 120, 0.2);
  }
  
  .card-content {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
  }
  
  .card-icon {
    font-size: 2.5rem;
    color: #2C8A78;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #2C8A78;
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
    border-left-color: #156D64;
  }
  
  .color-dark h3 {
    color: #156D64;
  }
  
  .color-1 {
    border-left-color: #2C8A78;
  }
  
  .color-1 h3 {
    color: #2C8A78;
  }
  
  .color-2 {
    border-left-color: #39857A;
  }
  
.color-2 h3 {
    color: #39857A;
  }
  
  .color-3 {
    border-left-color: #468F80;
  }
  
  .color-3 h3 {
    color: #468F80;
  }
  
  .color-4 {
    border-left-color: #539987;
  }
  
  .color-4 h3 {
    color: #539987;
  }
  
  .color-5 {
    border-left-color: #60A38D;
  }
  
  .color-5 h3 {
    color: #60A38D;
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
    background-color: #2C8A78;
    color: white;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: #156D64;
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
    background-color: #2C8A78;
    color: white;
  }
  
  .tool-card.color-dark .download-btn.pdf {
    background-color: #156D64;
  }
  
  .tool-card.color-1 .download-btn.pdf {
    background-color: #2C8A78;
  }
  
  .tool-card.color-2 .download-btn.pdf {
    background-color: #39857A;
  }
  
  .tool-card.color-3 .download-btn.pdf {
    background-color: #468F80;
  }
  
  .tool-card.color-4 .download-btn.pdf {
    background-color: #539987;
  }
  
  .tool-card.color-5 .download-btn.pdf {
    background-color: #60A38D;
  }
  
  .download-btn.md {
    background-color: white;
    border: 1px solid currentColor;
    color: inherit;
  }
  
  .download-btn:hover {
    transform: translateY(-1px);
  }
  
  .icon {
    margin-left: 0.5rem;
  }
  
  /* Feedback Card */
  .feedback-card {
    background-color: #e6f2f0;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  
  .feedback-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #2C8A78;
  }
  
  .feedback-card p {
    color: #4b5563;
    margin-bottom: 1rem;
  }
  
  .contact-link {
    color: #156D64;
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
    color: #2C8A78;
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
    color: #2C8A78;
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
    color: #2C8A78;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
  }
  
  .lang-button.active {
    background-color: #2C8A78;
    color: white;
    border-color: #2C8A78;
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
