<!-- src/routes/frameworks/tools/water-and-sanitation-governance/+page.svelte -->
<script>
  import { t, locale, setLocale } from '$lib/i18n';
  import { base } from '$app/paths';

  // Subscribe to stores
  $: currentT = $t;
  $: currentLocale = $locale;

  // Define file paths with language handling
  const getFilePath = (toolName) => {
    // Check if the file already has language suffix
    if (toolName.includes('-sv') || toolName.includes('-en')) {
      return `${base}/frameworks/tools/water-and-sanitation-governance/${toolName}`;
    }
    
    // For potentially translated documents
    if (toolName.includes('sacred-waters-kit') || toolName === 'sacred-waters-kit.zip') {
      // Special case for main starter kit
      if (toolName === 'sacred-waters-kit.zip') {
        const langSuffix = currentLocale === 'sv' ? '-sv' : '-en';
        return `${base}/frameworks/tools/water-and-sanitation-governance/sacred-waters-kit${langSuffix}.zip`;
      }
    }
    
    // For tools that might have language variations
    const toolsWithTranslations = [
      'executive-summary',
      'quick-implementation-guide',
      'youth-leadership-guide',
      'community-water-assembly-guide',
      'power-analysis-toolkit',
      'wash-constitutional-amendment-toolkit',
      'water-rights-legal-template',
      'carbon-water-credit-calculator',
      'circular-finance-planning-tool',
      'community-equity-model-template',
      'wash-sovereign-wealth-fund-model',
      'community-monitoring-toolkit',
      'hydrological-justice-assessment',
      'performance-dashboard-template',
      'ai-bias-audit-framework',
      'microgrid-planning-toolkit',
      'open-source-wash-tech-library',
      'traditional-knowledge-protection',
      'climate-adaptation-planning-tool',
      'conflict-sensitive-wash-guidelines',
      'emergency-wash-response-protocols'
    ];
    
    if (toolsWithTranslations.includes(toolName.split('.')[0])) {
      const extension = toolName.split('.').pop();
      const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
      return `${base}/frameworks/tools/water-and-sanitation-governance/${baseName}-${currentLocale}.${extension}`;
    }
    
    // Default path for other files
    return `${base}/frameworks/tools/water-and-sanitation-governance/${toolName}`;
  };

  // Helper function for language button styles
  function getLanguageButtonStyle(lang) {
    const isActive = currentLocale === lang;
    return isActive ? 'lang-button active' : 'lang-button';
  }

  // Translations for this page
  const translations = {
    en: {
      title: "Water & Sanitation (WASH) Governance Tools",
      subtitle: "Practical resources to implement water justice transformation worldwide",
      intro: "These tools and templates are designed to help you implement the WASH Governance Framework in various contexts. From establishing community water assemblies to creating sovereign wealth funds and building political coalitions, these resources provide step-by-step guidance for transforming water systems through community control and regenerative approaches.",
      startKitTitle: "Sacred Waters Implementation Kit",
      startKitDesc: "A complete package with everything you need to launch a community-controlled water transformation initiative. Includes all essential tools and templates for water assemblies, microgrid planning, and rights-based advocacy.",
      startKitButton: "Download Complete Sacred Waters Kit",
      coreTitle: "Core Governance Tools",
      coreDesc: "Essential tools for implementing key components of the water governance framework, from community assemblies to constitutional amendments and legal templates.",
      financialTitle: "Financial Planning Tools",
      financialDesc: "Resources for building sustainable financing systems including sovereign wealth funds, community equity models, and circular economy approaches.",
      monitoringTitle: "Monitoring & Accountability Tools",
      monitoringDesc: "Tools for community-controlled monitoring, performance tracking, and hydrological justice assessment with transparent accountability systems.",
      technologyTitle: "Technology & Innovation Tools",
      technologyDesc: "Resources for implementing appropriate technology with community control, including microgrid planning, AI governance, and traditional knowledge protection.",
      crisisTitle: "Crisis Response Tools",
      crisisDesc: "Emergency protocols and adaptation tools for conflict-sensitive WASH programming and climate resilience building.",
      guidesTitle: "Framework Guides",
      guidesDesc: "Accessible guides to help you understand and share the WASH Governance Framework with diverse audiences and stakeholders.",
      requestTitle: "Request Tools or Provide Feedback",
      requestDesc: "Need implementation resources for a specific community? Have suggestions for community-led improvements? We welcome your input to make these tools more useful.",
      contactLink: "Contact us",
      languagesTitle: "Available Languages",
      downloadPDF: "Download PDF",
      downloadMarkdown: "Download Markdown",
      backToTools: "Back to Tools Overview",
      
      // Tool titles and descriptions
      executiveSummaryTitle: "Executive Summary",
      executiveSummaryDesc: "Strategic overview for executives and senior leaders highlighting implementation pathways and economic benefits.",
      quickImplementationTitle: "Quick Implementation Guide",
      quickImplementationDesc: "Fast-track pathway for communities to begin water governance transformation with practical first steps.",
      youthLeadershipTitle: "Youth Leadership Guide",
      youthLeadershipDesc: "Comprehensive guide for cultivating next-generation water guardians and youth-led transformation.",
      
      communityAssemblyTitle: "Community Water Assembly Guide",
      communityAssemblyDesc: "Framework for establishing democratic water governance bodies with community control and participatory decision-making.",
      powerAnalysisTitle: "Power Analysis Toolkit",
      powerAnalysisDesc: "Strategic tools for mapping stakeholders, building coalitions, and navigating resistance in water advocacy campaigns.",
      constitutionalAmendmentTitle: "WASH Constitutional Amendment Toolkit",
      constitutionalAmendmentDesc: "Legal strategies and templates for enshrining water rights in national constitutions with enforcement mechanisms.",
      waterRightsLegalTitle: "Water Rights Legal Template",
      waterRightsLegalDesc: "Comprehensive legal framework for Rights of Nature implementation and community-controlled water governance.",
      
      carbonWaterCreditTitle: "Carbon-Water Credit Calculator",
      carbonWaterCreditDesc: "Financial tool for ecosystem service valuation and revenue generation from watershed restoration projects.",
      circularFinanceTitle: "Circular Finance Planning Tool",
      circularFinanceDesc: "Framework for developing closed-loop economic systems that generate revenue from waste recovery and resource cycling.",
      communityEquityTitle: "Community Equity Model Template",
      communityEquityDesc: "Cooperative ownership structures that enable communities to build wealth through water infrastructure investment.",
      sovereignWealthTitle: "WASH Sovereign Wealth Fund Model",
      sovereignWealthFundDesc: "National financing strategy template for sustainable water infrastructure investment through democratic wealth funds.",
      
      communityMonitoringTitle: "Community Monitoring Toolkit",
      communityMonitoringDesc: "Citizen science tools and participatory evaluation methods for community-controlled water quality assessment.",
      hydrologicalJusticeTitle: "Hydrological Justice Assessment",
      hydrologicalJusticeDesc: "Comprehensive framework for measuring systemic equity and ecosystem health in water governance systems.",
      performanceDashboardTitle: "Performance Dashboard Template",
      performanceDashboardDesc: "Real-time monitoring system with early warning indicators and adaptive management protocols.",
      
      aiBiasAuditTitle: "AI Bias Audit Framework",
      aiBiasAuditDesc: "Community-controlled methodology for ensuring equitable technology deployment and algorithmic transparency.",
      microgridPlanningTitle: "Microgrid Planning Toolkit",
      microgridPlanningDesc: "Technical guide for designing community-scale water systems with renewable energy integration.",
      openSourceWashTitle: "Open Source WASH Tech Library",
      openSourceWashDesc: "Collaborative platform for community-developed water technologies with shared innovation and local adaptation.",
      traditionalKnowledgeTitle: "Traditional Knowledge Protection Guide",
      traditionalKnowledgeDesc: "Framework for safeguarding Indigenous water wisdom while enabling respectful knowledge integration.",
      
      climateAdaptationTitle: "Climate Adaptation Planning Tool",
      climateAdaptationDesc: "Strategic framework for building climate resilience into water systems with community-controlled adaptation.",
      conflictSensitiveTitle: "Conflict-Sensitive WASH Guidelines",
      conflictSensitiveDesc: "Peace-building approaches to water programming that transform conflicts into cooperation opportunities.",
      emergencyResponseTitle: "Emergency WASH Response Protocols",
      emergencyResponseDesc: "Rapid deployment strategies for crisis situations with community leadership and trauma-informed approaches.",
      
      downloadButton: "Download"
    },
    sv: {
      title: "Vatten & Sanitet (WASH) Styrningsverktyg",
      subtitle: "Praktiska resurser för att implementera vattenrättvisa transformation världen över",
      intro: "Dessa verktyg och mallar är utformade för att hjälpa dig implementera WASH Styrningsramverket i olika sammanhang. Från att etablera kommunala vattenförsamlingar till att skapa statliga förmögenhetsfonder och bygga politiska koalitioner, ger dessa resurser steg-för-steg-vägledning för att omvandla vattensystem genom samhällskontroll och regenerativa metoder.",
      startKitTitle: "Heligt Vatten Implementeringskit",
      startKitDesc: "Ett komplett paket med allt du behöver för att starta ett samhällskontrollerat vattenomvandlingsinitiativ. Inkluderar alla nödvändiga verktyg och mallar för vattenförsamlingar, mikronät planering och rättighetsbaserad påverkansarbete.",
      startKitButton: "Ladda ner komplett Heligt Vatten Kit",
      coreTitle: "Grundläggande Styrningsverktyg",
      coreDesc: "Väsentliga verktyg för att implementera viktiga komponenter av vattenstyrningsramverket, från samhällsförsamlingar till grundlagsändringar och juridiska mallar.",
      financialTitle: "Finansplaneringsverktyg",
      financialDesc: "Resurser för att bygga hållbara finansieringssystem inklusive statliga förmögenhetsfonder, samhällsrättvisemodeller och cirkulär ekonomi metoder.",
      monitoringTitle: "Övervakning & Ansvarsverktyg",
      monitoringDesc: "Verktyg för samhällskontrollerad övervakning, prestationsspårning och hydrologisk rättvisa bedömning med transparenta ansvarssystem.",
      technologyTitle: "Teknik & Innovationsverktyg",
      technologyDesc: "Resurser för att implementera lämplig teknik med samhällskontroll, inklusive mikronät planering, AI styrning och traditionellt kunskapsskydd.",
      crisisTitle: "Krisstyrningsverktyg",
      crisisDesc: "Nödprotokoll och anpassningsverktyg för konfliktkänslig WASH-programmering och klimatresistens byggande.",
      guidesTitle: "Ramverksguider",
      guidesDesc: "Tillgängliga guider för att hjälpa dig förstå och dela WASH Styrningsramverket med olika målgrupper och intressenter.",
      requestTitle: "Begär verktyg eller ge feedback",
      requestDesc: "Behöver du implementeringsresurser för ett specifikt samhälle? Har du förslag på samhällsledda förbättringar? Vi välkomnar dina synpunkter för att göra dessa verktyg mer användbara.",
      contactLink: "Kontakta oss",
      languagesTitle: "Tillgängliga språk",
      downloadPDF: "Ladda ner PDF",
      downloadMarkdown: "Ladda ner Markdown",
      backToTools: "Tillbaka till verktygsöversikt",
      downloadButton: "Ladda ner"
    }
  };

  // Get current translations based on active locale
  $: texts = translations[currentLocale] || translations.en;
  
  // Tool data for each section
  const coreTools = [
    { id: 'community-water-assembly-guide', color: 'color-primary' },
    { id: 'power-analysis-toolkit', color: 'color-secondary' },
    { id: 'wash-constitutional-amendment-toolkit', color: 'color-sacred' },
    { id: 'water-rights-legal-template', color: 'color-justice' }
  ];

  const financialTools = [
    { id: 'carbon-water-credit-calculator', color: 'color-earth' },
    { id: 'circular-finance-planning-tool', color: 'color-accent' },
    { id: 'community-equity-model-template', color: 'color-light' },
    { id: 'wash-sovereign-wealth-fund-model', color: 'color-wisdom' }
  ];

  const monitoringTools = [
    { id: 'community-monitoring-toolkit', color: 'color-primary' },
    { id: 'hydrological-justice-assessment', color: 'color-justice' },
    { id: 'performance-dashboard-template', color: 'color-secondary' }
  ];

  const technologyTools = [
    { id: 'ai-bias-audit-framework', color: 'color-innovation' },
    { id: 'microgrid-planning-toolkit', color: 'color-accent' },
    { id: 'open-source-wash-tech-library', color: 'color-light' },
    { id: 'traditional-knowledge-protection', color: 'color-wisdom' }
  ];

  const crisisTools = [
    { id: 'climate-adaptation-planning-tool', color: 'color-earth' },
    { id: 'conflict-sensitive-wash-guidelines', color: 'color-sacred' },
    { id: 'emergency-wash-response-protocols', color: 'color-justice' }
  ];

  const toolNameToTranslationKey = {
    'executive-summary': 'executiveSummary',
    'quick-implementation-guide': 'quickImplementation',
    'youth-leadership-guide': 'youthLeadership',
    'community-water-assembly-guide': 'communityAssembly',
    'power-analysis-toolkit': 'powerAnalysis',
    'wash-constitutional-amendment-toolkit': 'constitutionalAmendment',
    'water-rights-legal-template': 'waterRightsLegal',
    'carbon-water-credit-calculator': 'carbonWaterCredit',
    'circular-finance-planning-tool': 'circularFinance',
    'community-equity-model-template': 'communityEquity',
    'wash-sovereign-wealth-fund-model': 'sovereignWealth',
    'community-monitoring-toolkit': 'communityMonitoring',
    'hydrological-justice-assessment': 'hydrologicalJustice',
    'performance-dashboard-template': 'performanceDashboard',
    'ai-bias-audit-framework': 'aiBiasAudit',
    'microgrid-planning-toolkit': 'microgridPlanning',
    'open-source-wash-tech-library': 'openSourceWash',
    'traditional-knowledge-protection': 'traditionalKnowledge',
    'climate-adaptation-planning-tool': 'climateAdaptation',
    'conflict-sensitive-wash-guidelines': 'conflictSensitive',
    'emergency-wash-response-protocols': 'emergencyResponse'
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

      <!-- Start with the Sacred Waters Implementation Kit -->
      <div class="start-kit-card">
        <div class="card-content">
          <div class="card-icon">💧</div>
          <div class="card-text">
            <h2>{texts.startKitTitle}</h2>
            <p>{texts.startKitDesc}</p>
          </div>
          <div class="card-actions">
            <a href={getFilePath(`sacred-waters-kit-${currentLocale}.zip`)} download class="primary-btn">
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
        <!-- Executive Summary -->
        <div class="tool-card color-primary">
          <h3>{texts.executiveSummaryTitle}</h3>
          <p>{texts.executiveSummaryDesc}</p>
          <div class="tool-actions">
            <a href={getFilePath(`executive-summary-${currentLocale}.pdf`)} download class="download-btn pdf">
              {texts.downloadPDF}
              <span class="icon">↓</span>
            </a>
            <a href={getFilePath(`executive-summary-${currentLocale}.md`)} download class="download-btn md">
              {texts.downloadMarkdown}
              <span class="icon">↓</span>
            </a>
          </div>
        </div>
        
        <!-- Quick Implementation Guide -->
        <div class="tool-card color-secondary">
          <h3>{texts.quickImplementationTitle}</h3>
          <p>{texts.quickImplementationDesc}</p>
          <div class="tool-actions">
            <a href={getFilePath(`quick-implementation-guide-${currentLocale}.pdf`)} download class="download-btn pdf">
              {texts.downloadPDF}
              <span class="icon">↓</span>
            </a>
            <a href={getFilePath(`quick-implementation-guide-${currentLocale}.md`)} download class="download-btn md">
              {texts.downloadMarkdown}
              <span class="icon">↓</span>
            </a>
          </div>
        </div>

        <!-- Youth Leadership Guide -->
        <div class="tool-card color-light">
          <h3>{texts.youthLeadershipTitle}</h3>
          <p>{texts.youthLeadershipDesc}</p>
          <div class="tool-actions">
            <a href={getFilePath(`youth-leadership-guide-${currentLocale}.pdf`)} download class="download-btn pdf">
              {texts.downloadPDF}
              <span class="icon">↓</span>
            </a>
            <a href={getFilePath(`youth-leadership-guide-${currentLocale}.md`)} download class="download-btn md">
              {texts.downloadMarkdown}
              <span class="icon">↓</span>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Core Governance Tools -->
      <h2 class="section-title">{texts.coreTitle}</h2>
      <p class="section-desc">{texts.coreDesc}</p>
      
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

      <!-- Financial Planning Tools -->
      <h2 class="section-title">{texts.financialTitle}</h2>
      <p class="section-desc">{texts.financialDesc}</p>
      
      <div class="tools-grid">
        {#each financialTools as tool}
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

      <!-- Monitoring & Accountability Tools -->
      <h2 class="section-title">{texts.monitoringTitle}</h2>
      <p class="section-desc">{texts.monitoringDesc}</p>
      
      <div class="tools-grid">
        {#each monitoringTools as tool}
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

      <!-- Technology & Innovation Tools -->
      <h2 class="section-title">{texts.technologyTitle}</h2>
      <p class="section-desc">{texts.technologyDesc}</p>
      
      <div class="tools-grid">
        {#each technologyTools as tool}
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

      <!-- Crisis Response Tools -->
      <h2 class="section-title">{texts.crisisTitle}</h2>
      <p class="section-desc">{texts.crisisDesc}</p>
      
      <div class="tools-grid">
        {#each crisisTools as tool}
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
  /* Water & Sanitation Framework color scheme - ocean blues, life-giving teals, earth greens */
  :root {
    --water-primary: #0369a1; /* Deep Ocean Blue - depth, trust, reliability */
    --water-secondary: #0891b2; /* Cyan Blue - flow, movement, accessibility */
    --water-accent: #0d9488; /* Teal - balance, healing, sustainability */
    --water-sacred: #1e40af; /* Sacred Blue - spiritual connection, reverence */
    --water-light: #67e8f9; /* Light Cyan - purity, clarity, hope */
    --water-earth: #15803d; /* Forest Green - life, growth, regeneration */
    --water-justice: #dc2626; /* Strong Red - urgency, justice, human rights */
    --water-wisdom: #4338ca; /* Indigo - traditional knowledge, wisdom */
    --water-innovation: #0891b2; /* Cyan - innovation, technology, future thinking */
  }

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
    background: linear-gradient(135deg, var(--water-primary) 0%, var(--water-secondary) 100%);
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
    color: var(--water-secondary);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: var(--water-primary);
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
    color: var(--water-primary);
  }
  
  .section-desc {
    margin-bottom: 2rem;
    color: #4b5563;
    line-height: 1.7;
    font-size: 1.125rem;
  }
  
  /* Start Kit Card */
  .start-kit-card {
    background: linear-gradient(135deg, rgba(103, 232, 249, 0.1) 0%, rgba(3, 105, 161, 0.1) 100%);
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(3, 105, 161, 0.1);
    border: 1px solid rgba(3, 105, 161, 0.2);
  }
  
  .card-content {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
  }
  
  .card-icon {
    font-size: 2.5rem;
    color: var(--water-primary);
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--water-primary);
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
 
  /* Color Variations for Water Framework */
  .color-primary {
    border-left-color: var(--water-primary);
  }
  
  .color-primary h3 {
    color: var(--water-primary);
  }
  
  .color-secondary {
    border-left-color: var(--water-secondary);
  }
  
  .color-secondary h3 {
    color: var(--water-secondary);
  }
  
  .color-accent {
    border-left-color: var(--water-accent);
  }
  
  .color-accent h3 {
    color: var(--water-accent);
  }
  
  .color-sacred {
    border-left-color: var(--water-sacred);
  }
  
  .color-sacred h3 {
    color: var(--water-sacred);
  }
  
  .color-light {
    border-left-color: var(--water-light);
  }
  
  .color-light h3 {
    color: var(--water-secondary);
  }
  
  .color-earth {
    border-left-color: var(--water-earth);
  }
  
  .color-earth h3 {
    color: var(--water-earth);
  }
 
  .color-justice {
    border-left-color: var(--water-justice);
  }
  
  .color-justice h3 {
    color: var(--water-justice);
  } 
 
  .color-wisdom {
    border-left-color: var(--water-wisdom);
  }
  
  .color-wisdom h3 {
    color: var(--water-wisdom);
  }
 
  .color-innovation {
    border-left-color: var(--water-innovation);
  }
  
  .color-innovation h3 {
    color: var(--water-innovation);
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
    background-color: var(--water-primary);
    color: white;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.2s;
    border: none;
    cursor: pointer;
  }
  
  .primary-btn:hover {
    background-color: var(--water-secondary);
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
    background-color: var(--water-primary);
  }

  .tool-card.color-secondary .download-btn.pdf {
    background-color: var(--water-secondary);
  }  

  .tool-card.color-accent .download-btn.pdf {
    background-color: var(--water-accent);
  }

  .tool-card.color-sacred .download-btn.pdf {
    background-color: var(--water-sacred);
  }

  .tool-card.color-light .download-btn.pdf {
    background-color: var(--water-secondary);
  }
 
  .tool-card.color-earth .download-btn.pdf {
    background-color: var(--water-earth);
  }

  .tool-card.color-justice .download-btn.pdf {
    background-color: var(--water-justice);
  }
 
  .tool-card.color-wisdom .download-btn.pdf {
    background-color: var(--water-wisdom);
  }
 
  .tool-card.color-innovation .download-btn.pdf {
    background-color: var(--water-innovation);
  }
 
  .download-btn.md {
    background-color: white;
    border: 1px solid;
  }
 
  .tool-card.color-primary .download-btn.md {
    color: var(--water-primary);
    border-color: var(--water-primary);
  }
 
  .tool-card.color-secondary .download-btn.md {
    color: var(--water-secondary);
    border-color: var(--water-secondary);
  }
 
  .tool-card.color-accent .download-btn.md {
    color: var(--water-accent);
    border-color: var(--water-accent);
  }
 
  .tool-card.color-sacred .download-btn.md {
    color: var(--water-sacred);
    border-color: var(--water-sacred);
  }
 
  .tool-card.color-light .download-btn.md {
    color: var(--water-secondary);
    border-color: var(--water-secondary);
  }
 
  .tool-card.color-earth .download-btn.md {
    color: var(--water-earth);
    border-color: var(--water-earth);
  }
 
  .tool-card.color-justice .download-btn.md {
    color: var(--water-justice);
    border-color: var(--water-justice);
  }
 
  .tool-card.color-wisdom .download-btn.md {
    color: var(--water-wisdom);
    border-color: var(--water-wisdom);
  }
 
  .tool-card.color-innovation .download-btn.md {
    color: var(--water-innovation);
    border-color: var(--water-innovation);
  }
 
  .download-btn:hover {
    transform: translateY(-1px);
  }
 
  .icon {
    margin-left: 0.5rem;
  }

  /* Feedback Card */
  .feedback-card {
    background-color: rgba(103, 232, 249, 0.1);
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 2rem;
    border: 1px solid rgba(103, 232, 249, 0.3);
  } 

  .feedback-card h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: var(--water-primary);
  } 

  .contact-link {
    color: var(--water-secondary);
    text-decoration: underline;
    font-weight: 500;
  }

  .contact-link:hover {
    color: var(--water-primary);
  } 

  /* Back Link Bottom */
  .back-link-bottom {
    margin: 2rem 0;
    text-align: center;
  }
 
  .back-link-bottom a {
    display: inline-flex;
    align-items: center;
    color: var(--water-secondary);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }
 
  .back-link-bottom a:hover {
    color: var(--water-primary);
  }

  /* Language Section */
  .language-section {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid #e5e7eb;
  }
 
  .language-section h3 {
    margin-bottom: 1rem;
    color: var(--water-primary);
  }
 
  .language-buttons {
    display: flex;
    gap: 0.5rem;
  }
 
  .lang-button {
    padding: 0.5rem 1rem;
    border: 1px solid var(--water-secondary);
    background-color: white;
    color: var(--water-secondary);
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;
  }
 
  .lang-button:hover {
    background-color: rgba(103, 232, 249, 0.1);
  }
 
  .lang-button.active {
    background-color: var(--water-primary);
    color: white;
    border-color: var(--water-primary);
  }
 
  /* Responsive Design */
  @media (min-width: 640px) {
    .tools-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
 
  @media (min-width: 768px) {
    .tools-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
 
  @media (min-width: 1024px) {
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
    
    .hero h1 {
      font-size: 2rem;
    }
    
    .hero p {
      font-size: 1.125rem;
    }
   
    .section-title {
      font-size: 1.5rem;
    } 

    .language-buttons {
      flex-direction: column;
    } 

    .lang-button {
      width: 100%;
    }
  }
</style>
