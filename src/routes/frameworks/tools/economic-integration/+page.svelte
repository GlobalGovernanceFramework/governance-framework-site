<!-- src/routes/frameworks/tools/economic-integration/+page.svelte -->
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
      return `${base}/frameworks/tools/economic-integration/${toolName}`;
    }
    
    // Special case for digital-ethics
    if (toolName === 'digital-ethics.pdf' || toolName === 'digital-ethics.md') {
      const langSuffix = currentLocale === 'sv' ? '-sv' : '-en';
      return `${base}/frameworks/tools/economic-integration/digital-ethics${langSuffix}.${toolName.split('.').pop()}`;
    }
    
    // For the guides and other potentially translated documents
    if (toolName.includes('guide') || 
        toolName === 'seed-kit.zip') {
      // Special case for main guides
      if (toolName === 'youth-economic-action-guide.pdf' || toolName === 'youth-economic-action-guide.md') {
        const langSuffix = currentLocale === 'sv' ? '-sv' : '-en';
        return `${base}/frameworks/tools/economic-integration/youth-economic-action-guide${langSuffix}.${toolName.split('.').pop()}`;
      } else {
        // For other translated documents
        const extension = toolName.split('.').pop();
        const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
        return `${base}/frameworks/tools/economic-integration/${baseName}-${currentLocale}.${extension}`;
      }
    }
    
    // For tools that might have language variations but maintain the same base name
    if ([
        'economic-analysis-framework',
        'currency-design-template',
        'participatory-budgeting-protocol',
        'ethical-trade-zone-charter',
        'aubi-implementation-guide',
        'commons-management-toolkit',
        'urban-economic-toolkit',
        'rural-cooperative-guide',
        'bioregional-protocol',
        'global-commons-framework',
        'economic-advocacy-toolkit',
        'economic-financing-navigator',
        'institutional-integration-guide',
        'ppp-template',
        'community-economic-fund-guide',
        'economic-micro-grant-template',
        'resource-mapping-tool'
        ].includes(toolName.split('.')[0])) {
      const extension = toolName.split('.').pop();
      const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
      return `${base}/frameworks/tools/economic-integration/${baseName}-${currentLocale}.${extension}`;
    }
    
    // Default path for other files
    return `${base}/frameworks/tools/economic-integration/${toolName}`;
  };

  // Helper function for language button styles
  function getLanguageButtonStyle(lang) {
    const isActive = currentLocale === lang;
    return isActive ? 'lang-button active' : 'lang-button';
  }

  // Translations for this page
  const translations = {
    en: {
      title: "Economic Integration Tools",
      subtitle: "Practical resources to implement the Economic Integration Framework",
      intro: "These tools and templates are designed to help you implement the Economic Integration Framework in various contexts. From community currencies to ethical trade zones and universal basic income, these resources provide step-by-step guidance for creating equitable, sustainable economic systems that support both local sovereignty and global cooperation.",
      seedKitTitle: "Start with the Seed Kit",
      seedKitDesc: "A complete package with everything you need to launch implementation. Includes all essential tools and templates in one convenient download.",
      seedKitButton: "Download Complete Seed Kit",
      guidesTitle: "Framework Guides",
      guidesDesc: "Lite guides tailored to specific audiences to help you understand and share the Economic Integration Framework with others.",
      toolsTitle: "Core Governance Tools",
      toolsDesc: "These essential tools help you implement key components of the Economic Integration Framework, from analysis to planning and stakeholder engagement.",
      sectoralTitle: "Context-Specific Implementation Guides",
      sectoralDesc: "Specialized tools to support implementation across key areas including urban, rural, bioregional and global commons governance.",
      advocacyTitle: "Advocacy & Scaling Tools",
      advocacyDesc: "Resources to help you engage stakeholders, secure funding, and scale your implementation from local initiatives to broader adoption.",
      fundingTitle: "Low-Resource Funding Tools",
      fundingDesc: "Tools to help communities with limited resources implement economic initiatives through micro-grants, fund management, and resource mapping.",
      digitalTitle: "Digital Tools",
      digitalDesc: "Interactive applications and platforms to simulate, monitor, and collaborate on economic integration initiatives.",
      requestTitle: "Request Tools or Provide Feedback",
      requestDesc: "Need implementation resources for a specific purpose? Have suggestions for improvements? We welcome your input to make these tools more useful.",
      contactLink: "Contact us",
      languagesTitle: "Available Languages",
      downloadPDF: "Download PDF",
      downloadMarkdown: "Download Markdown",

      // Tool titles - Lite Guides
      technicalGuideTitle: "Technical Guide for Policymakers",
      technicalGuideDesc: "Detailed guide on governance, AUBI, and trade zones for officials and decision-makers.",
      communityGuideTitle: "Community Economic Implementation Guide",
      communityGuideDesc: "Practical guide for currencies, cooperatives, and local economic development.",
      youthGuideTitle: "Youth Economic Action Guide",
      youthGuideDesc: "Accessible guide for youth, educators, and community groups on economic advocacy and participation.",
      digitalEthicsGuideTitle: "Digital Economic Ethics Guide",
      digitalEthicsGuideDesc: "Guide for blockchain and data ethics in economic systems.",
      indigenousGuideTitle: "Indigenous Economic Stewardship Guide",
      indigenousGuideDesc: "Co-designed guide for commons protocols and indigenous approaches to economic governance.",
      
      // Tool titles - Core Governance
      economicAnalysisTitle: "Economic Analysis Framework",
      economicAnalysisDesc: "Systematic approach to analyzing economic systems, stakeholders, and power dynamics to inform effective strategies.",
      currencyDesignTitle: "Community Currency Design Template",
      currencyDesignDesc: "Template for establishing local complementary currencies that support community resilience and economic autonomy.",
      participatoryBudgetingTitle: "Participatory Budgeting Protocol",
      participatoryBudgetingDesc: "A structured approach to inclusive, democratic allocation of resources at various scales.",
      ethicalTradeTitle: "Ethical Trade Zone Charter",
      ethicalTradeDesc: "Framework for establishing fair trade relationships that prioritize social and environmental values.",
      aubiImplementationTitle: "AUBI Implementation Guide",
      aubiImplementationDesc: "Comprehensive guide for implementing Adaptive Universal Basic Income at various scales.",
      
      // Tool titles - Context-Specific Implementation
      commonsManagementTitle: "Commons Management Toolkit",
      commonsManagementDesc: "Practical tools for effective commons governance across various resource domains.",
      urbanEconomicTitle: "Urban Economic Integration Toolkit",
      urbanEconomicDesc: "Specialized guide for implementing economic frameworks in urban environments.",
      ruralCooperativeTitle: "Rural Cooperative Development Guide",
      ruralCooperativeDesc: "Tools and templates for establishing agricultural and resource-based cooperatives.",
      bioregionalTitle: "Bioregional Resource Sharing Protocol",
      bioregionalDesc: "Framework for watershed-scale governance of shared natural resources.",
      globalCommonsTitle: "Global Commons Governance Framework",
      globalCommonsDesc: "Approaches for governing shared planetary resources through nested sovereignty.",
      
      // Tool titles - Advocacy & Scaling
      economicAdvocacyTitle: "Economic Advocacy Campaign Toolkit",
      economicAdvocacyDesc: "Resources for advocating for economic reforms and policy adoption.",
      economicFinancingTitle: "Economic Financing Navigator",
      economicFinancingDesc: "Guide to identifying, accessing, and leveraging diverse funding sources.",
      institutionalTitle: "Institutional Economic Integration Guide",
      institutionalDesc: "Framework for integrating economic approaches into institutional policies and practices.",
      pppTemplateTitle: "Public-Private Partnership Template",
      pppTemplateDesc: "Standard agreement for co-funding implementation between public entities and businesses.",
      
      // Tool titles - Low-Resource Funding
      communityFundTitle: "Community Economic Fund Guide",
      communityFundDesc: "Template for establishing and managing community-owned financial pools.",
      microGrantTitle: "Economic Micro-Grant Template",
      microGrantDesc: "Simple application and management template for small-scale community funding.",
      resourceMappingTitle: "Resource Mapping Tool",
      resourceMappingDesc: "Method for identifying underutilized community assets and resources for economic initiatives.",
      
      // Tool titles - Digital Tools
      currencySimulatorTitle: "Currency Simulator App",
      currencySimulatorDesc: "Interactive tool to model local currency dynamics and effects on community economics.",
      healthIndexTitle: "Nested Economic Health Index Dashboard",
      healthIndexDesc: "Real-time metrics for monitoring economic framework implementation outcomes.",
      aiChatbotTitle: "AI Chatbot for Tool Navigation",
      aiChatbotDesc: "Interactive assistant to help users find and apply the right tools for their context.",
      collaborationPlatformTitle: "Real-Time Collaboration Platform",
      collaborationPlatformDesc: "GitHub-based hub for implementers to share adaptations and coordinate efforts.",
      
      downloadButton: "Download"
    },
    sv: {
      title: "Verktyg för ekonomisk integration",
      subtitle: "Praktiska resurser för att implementera ramverket för ekonomisk integration",
      intro: "Dessa verktyg och mallar är utformade för att hjälpa dig implementera ramverket för ekonomisk integration i olika sammanhang. Från lokala valutor till etiska handelszoner och universell basinkomst, ger dessa resurser steg-för-steg-vägledning för att skapa rättvisa, hållbara ekonomiska system som stödjer både lokal suveränitet och global samverkan.",
      seedKitTitle: "Börja med startpaketet",
      seedKitDesc: "Ett komplett paket med allt du behöver för att påbörja implementeringen. Inkluderar alla nödvändiga verktyg och mallar i en bekväm nedladdning.",
      seedKitButton: "Ladda ner komplett startpaket",
      guidesTitle: "Ramverksguider",
      guidesDesc: "Enkla guider anpassade för specifika målgrupper för att hjälpa dig förstå och dela ramverket för ekonomisk integration med andra.",
      toolsTitle: "Grundläggande styrningsverktyg",
      toolsDesc: "Dessa väsentliga verktyg hjälper dig att implementera viktiga komponenter i ramverket för ekonomisk integration, från analys till planering och intressentengagemang.",
      sectoralTitle: "Kontextspecifika implementeringsguider",
      sectoralDesc: "Specialiserade verktyg för att stödja implementering inom viktiga områden inklusive stads-, landsbygds-, bioregional och global allmänning-styrning.",
      advocacyTitle: "Påverkans- och skalningsverktyg",
      advocacyDesc: "Resurser för att hjälpa dig engagera intressenter, säkra finansiering och skala upp din implementering från lokala initiativ till bredare antagande.",
      fundingTitle: "Finansieringsverktyg för resurssnåla miljöer",
      fundingDesc: "Verktyg för att hjälpa samhällen med begränsade resurser genomföra ekonomiska initiativ genom mikrostipendier, fondförvaltning och resurskartläggning.",
      digitalTitle: "Digitala verktyg",
      digitalDesc: "Interaktiva applikationer och plattformar för att simulera, övervaka och samarbeta kring ekonomiska integrationsinitiativ.",
      requestTitle: "Begär verktyg eller ge feedback",
      requestDesc: "Behöver du implementeringsresurser för ett specifikt syfte? Har du förslag på förbättringar? Vi välkomnar dina synpunkter för att göra dessa verktyg mer användbara.",
      contactLink: "Kontakta oss",
      languagesTitle: "Tillgängliga språk",
      downloadPDF: "Ladda ner PDF",
      downloadMarkdown: "Ladda ner Markdown",

      // Tool titles - Lite Guides (Swedish)
      technicalGuideTitle: "Teknisk guide för beslutsfattare",
      technicalGuideDesc: "Detaljerad guide om styrning, AUBI och handelszoner för tjänstemän och beslutsfattare.",
      communityGuideTitle: "Samhällsguide för ekonomisk implementering",
      communityGuideDesc: "Praktisk guide för valutor, kooperativ och lokal ekonomisk utveckling.",
      youthGuideTitle: "Ekonomisk handlingsguide för ungdomar",
      youthGuideDesc: "Tillgänglig guide för ungdomar, pedagoger och samhällsgrupper om ekonomiskt förespråkande och deltagande.",
      digitalEthicsGuideTitle: "Digital ekonomietikguide",
      digitalEthicsGuideDesc: "Guide för blockchain- och dataetik i ekonomiska system.",
      indigenousGuideTitle: "Urfolks ekonomiska förvaltningsguide",
      indigenousGuideDesc: "Samdesignad guide för allmänningsprotokoll och urfolks metoder för ekonomisk styrning.",
      
      // Tool titles - Core Governance (Swedish)
      economicAnalysisTitle: "Ramverk för ekonomisk analys",
      economicAnalysisDesc: "Systematiskt tillvägagångssätt för att analysera ekonomiska system, intressenter och maktdynamik för att informera effektiva strategier.",
      currencyDesignTitle: "Mall för design av lokalvaluta",
      currencyDesignDesc: "Mall för att etablera lokala komplementära valutor som stödjer samhällsresiliens och ekonomisk autonomi.",
      participatoryBudgetingTitle: "Protokoll för deltagarbudgetering",
      participatoryBudgetingDesc: "Ett strukturerat tillvägagångssätt för inkluderande, demokratisk fördelning av resurser på olika nivåer.",
      ethicalTradeTitle: "Stadga för etisk handelszon",
      ethicalTradeDesc: "Ramverk för att etablera rättvisa handelsrelationer som prioriterar sociala och miljömässiga värden.",
      aubiImplementationTitle: "Implementeringsguide för AUBI",
      aubiImplementationDesc: "Omfattande guide för implementering av adaptiv universell basinkomst på olika nivåer.",
      
      // Tool titles - Context-Specific Implementation (Swedish)
      commonsManagementTitle: "Verktygslåda för allmänningsförvaltning",
      commonsManagementDesc: "Praktiska verktyg för effektiv allmänningsstyrning inom olika resursdomäner.",
      urbanEconomicTitle: "Verktygslåda för urban ekonomisk integration",
      urbanEconomicDesc: "Specialiserad guide för implementering av ekonomiska ramverk i stadsmiljöer.",
      ruralCooperativeTitle: "Utvecklingsguide för landsbygdskooperativ",
      ruralCooperativeDesc: "Verktyg och mallar för att etablera jordbruks- och resursbaserade kooperativ.",
      bioregionalTitle: "Protokoll för bioregional resursdelning",
      bioregionalDesc: "Ramverk för styrning av delade naturresurser på avrinningsområdesnivå.",
      globalCommonsTitle: "Ramverk för global allmänningsstyrning",
      globalCommonsDesc: "Tillvägagångssätt för att styra delade planetära resurser genom nästlad suveränitet.",
      
      // Tool titles - Advocacy & Scaling (Swedish)
      economicAdvocacyTitle: "Verktygslåda för ekonomisk påverkanskampanj",
      economicAdvocacyDesc: "Resurser för att förespråka ekonomiska reformer och policyadoption.",
      economicFinancingTitle: "Navigator för ekonomisk finansiering",
      economicFinancingDesc: "Guide till att identifiera, få tillgång till och utnyttja olika finansieringskällor.",
      institutionalTitle: "Guide för institutionell ekonomisk integration",
      institutionalDesc: "Ramverk för att integrera ekonomiska metoder i institutionella policyer och praktiker.",
      pppTemplateTitle: "Mall för offentlig-privat partnerskap",
      pppTemplateDesc: "Standardavtal för samfinansiering av implementering mellan offentliga enheter och företag.",
      
      // Tool titles - Low-Resource Funding (Swedish)
      communityFundTitle: "Guide för samhällsekonomisk fond",
      communityFundDesc: "Mall för att etablera och hantera samhällsägda finansiella pooler.",
      microGrantTitle: "Mall för ekonomiskt mikrobidrag",
      microGrantDesc: "Enkel ansöknings- och hanteringsmall för småskalig samhällsfinansiering.",
      resourceMappingTitle: "Verktyg för resurskartläggning",
      resourceMappingDesc: "Metod för att identifiera underutnyttjade samhällstillgångar och resurser för ekonomiska initiativ.",
      
      // Tool titles - Digital Tools (Swedish)
      currencySimulatorTitle: "Valutasimulatorapp",
      currencySimulatorDesc: "Interaktivt verktyg för att modellera lokala valutadynamiker och effekter på samhällsekonomi.",
      healthIndexTitle: "Dashboard för nästlat ekonomiskt hälsoindex",
      healthIndexDesc: "Realtidsmått för övervakning av utfall från implementering av ekonomiska ramverk.",
      aiChatbotTitle: "AI-chatbot för verktygsnavigering",
      aiChatbotDesc: "Interaktiv assistent för att hjälpa användare hitta och tillämpa rätt verktyg för deras sammanhang.",
      collaborationPlatformTitle: "Realtidssamarbetsplattform",
      collaborationPlatformDesc: "GitHub-baserad hubb för implementerare att dela anpassningar och koordinera ansträngningar.",
      
      downloadButton: "Ladda ner"
    }
  };

  // Get current translations based on active locale
  $: texts = translations[currentLocale] || translations.en;

  // Tool data for each section, using actual file names
  const guideTools = [
    { id: 'technical-guide', color: 'color-1' },
    { id: 'community-guide', color: 'color-2' },
    { id: 'youth-guide', color: 'color-3' },
    { id: 'digital-ethics', color: 'color-4' },
    { id: 'indigenous-guide', color: 'color-5' }
  ];
  
  const coreTools = [
    { id: 'economic-analysis-framework', color: 'color-dark' },
    { id: 'currency-design-template', color: 'color-1' },
    { id: 'participatory-budgeting-protocol', color: 'color-2' },
    { id: 'ethical-trade-zone-charter', color: 'color-3' },
    { id: 'aubi-implementation-guide', color: 'color-4' },
    { id: 'commons-management-toolkit', color: 'color-5' }
  ];
  
  const specializedTools = [
    { id: 'urban-economic-toolkit', color: 'color-dark' },
    { id: 'rural-cooperative-guide', color: 'color-1' },
    { id: 'bioregional-protocol', color: 'color-2' },
    { id: 'global-commons-framework', color: 'color-3' }
  ];
  
  const advocacyTools = [
    { id: 'economic-advocacy-toolkit', color: 'color-dark' },
    { id: 'economic-financing-navigator', color: 'color-1' },
    { id: 'institutional-integration-guide', color: 'color-2' },
    { id: 'ppp-template', color: 'color-3' }
  ];
  
  const fundingTools = [
    { id: 'community-economic-fund-guide', color: 'color-dark' },
    { id: 'economic-micro-grant-template', color: 'color-1' },
    { id: 'resource-mapping-tool', color: 'color-2' }
  ];
  
  const digitalTools = [
    { id: 'currency-simulator-app', color: 'color-dark', isPageLink: true },
    { id: 'nested-economic-health-dashboard', color: 'color-1', isPageLink: true },
    { id: 'ai-chatbot-for-tool-navigation', color: 'color-2', isPageLink: true },
    { id: 'real-time-collaboration-platform', color: 'color-3', isPageLink: true }
  ];

  const toolNameToTranslationKey = {
    'technical-guide': 'technicalGuide',
    'community-guide': 'communityGuide',
    'youth-guide': 'youthGuide',
    'digital-ethics': 'digitalEthicsGuide',
    'indigenous-guide': 'indigenousGuide',
    'economic-analysis-framework': 'economicAnalysis',
    'currency-design-template': 'currencyDesign',
    'participatory-budgeting-protocol': 'participatoryBudgeting',
    'ethical-trade-zone-charter': 'ethicalTrade',
    'aubi-implementation-guide': 'aubiImplementation',
    'commons-management-toolkit': 'commonsManagement',
    'urban-economic-toolkit': 'urbanEconomic',
    'rural-cooperative-guide': 'ruralCooperative',
    'bioregional-protocol': 'bioregional',
    'global-commons-framework': 'globalCommons',
    'economic-advocacy-toolkit': 'economicAdvocacy',
    'economic-financing-navigator': 'economicFinancing',
    'institutional-integration-guide': 'institutional',
    'ppp-template': 'pppTemplate',
    'community-economic-fund-guide': 'communityFund',
    'economic-micro-grant-template': 'microGrant',
    'resource-mapping-tool': 'resourceMapping',
    'currency-simulator-app': 'currencySimulator',
    'nested-economic-health-dashboard': 'healthIndex',
    'ai-chatbot-for-tool-navigation': 'aiChatbot',
    'real-time-collaboration-platform': 'collaborationPlatform'
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
      {currentLocale === 'sv' ? 'Tillbaka till implementeringsverktyg' : 'Back to Implementation Tools'}
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
            <a href={getFilePath(`seed-kit.zip`)} download class="primary-btn">
              {texts.seedKitButton}
              <span class="icon">↓</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Framework Guides Section -->
      <h2 class="section-title">{texts.guidesTitle}</h2>
      <p class="section-desc">{texts.guidesDesc}</p>
      <div class="tools-grid">
        {#each guideTools as tool}
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

      <!-- Core Governance Tools Section -->
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

      <!-- Context-Specific Implementation Guides Section -->
      <h2 class="section-title">{texts.sectoralTitle}</h2>
      <p class="section-desc">{texts.sectoralDesc}</p>
      <div class="tools-grid">
        {#each specializedTools as tool}
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

      <!-- Advocacy & Scaling Tools Section -->
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
            </div>
          </div>
        {/each}
      </div>
      
      <!-- Low-Resource Funding Tools Section -->
      <h2 class="section-title">{texts.fundingTitle}</h2>
      <p class="section-desc">{texts.fundingDesc}</p>
      <div class="tools-grid">
        {#each fundingTools as tool}
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
      
      <!-- Digital Tools Section -->
      <h2 class="section-title">{texts.digitalTitle}</h2>
      <p class="section-desc">{texts.digitalDesc}</p>
      <div class="tools-grid">
        {#each digitalTools as tool}
          <div class="tool-card {tool.color}">
            <h3>{texts[`${toolNameToTranslationKey[tool.id]}Title`]}</h3>
            <p>{texts[`${toolNameToTranslationKey[tool.id]}Desc`]}</p>
            <div class="tool-actions">
              {#if tool.isPageLink}
                <!-- Special case for page links -->
                <a href="{base}/frameworks/tools/economic-integration/{tool.id}" class="page-link-btn">
                  {currentLocale === 'sv' ? 'Visa verktyg' : 'View Tool'}
                  <span class="icon">→</span>
                </a>
              {:else}
                <!-- Normal download buttons -->
                <a href={getFilePath(`${tool.id}.pdf`)} download class="download-btn pdf">
                  {texts.downloadPDF}
                  <span class="icon">↓</span>
                </a>
                <a href={getFilePath(`${tool.id}.md`)} download class="download-btn md">
                  {texts.downloadMarkdown}
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
    background: linear-gradient(to bottom right, #006666, #48BF91);
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
    color: #088F8F;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: #006666;
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
    color: #088F8F;
    margin-top: 3rem;
  }
  
  .section-desc {
    margin-bottom: 2rem;
    color: #4b5563;
    line-height: 1.7;
    font-size: 1.125rem;
  }
  
  /* Seed Kit Card */
  .seed-kit-card {
    background-color: #eef9f9;
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(8, 143, 143, 0.1);
    border: 1px solid rgba(8, 143, 143, 0.2);
  }
  
  .card-content {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
  }
  
  .card-icon {
    font-size: 2.5rem;
    color: #088F8F;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #088F8F;
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
  
  @media (min-width: 768px) {
    .tools-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  /* Tool Cards */
  .tool-card {
    background-color: #f9fafb;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    border-left: 4px solid;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .tool-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }
  
  .tool-card p {
    color: #4b5563;
    margin-bottom: 1.5rem;
    flex-grow: 1;
  }
  
  /* Color Variations with Economic Theme */
  .color-dark {
    border-left-color: #006666;
  }
  
  .color-dark h3 {
    color: #006666;
  }
  
  .color-1 {
    border-left-color: #088F8F;
  }
  
  .color-1 h3 {
    color: #088F8F;
  }
  
  .color-2 {
    border-left-color: #1AA394;
  }
  
  .color-2 h3 {
    color: #1AA394;
  }
  
  .color-3 {
    border-left-color: #2BB59B;
  }
  
  .color-3 h3 {
    color: #2BB59B;
  }
  
  .color-4 {
    border-left-color: #3CC9A4;
  }
  
  .color-4 h3 {
    color: #3CC9A4;
  }
  
  .color-5 {
    border-left-color: #48BF91;
  }
  
  .color-5 h3 {
    color: #48BF91;
  }
  
  /* Tool Actions */
  .tool-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: auto;
  }
  
  /* Buttons */
  .primary-btn {
    display: inline-flex;
    align-items: center;
    background-color: #088F8F;
    color: white;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: #006666;
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
    background-color: #088F8F;
    color: white;
  }

  .download-btn.md {
    background-color: white;
    border: 1px solid #088F8F;
    color: #088F8F;
  }
  
  .download-btn:hover {
    transform: translateY(-1px);
  }

  .page-link-btn {
    display: inline-flex;
    align-items: center;
    background-color: #088F8F;
    color: white;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.2s;
  }

  .page-link-btn:hover {
    background-color: #006666;
    transform: translateY(-1px);
  }
  
  .icon {
    margin-left: 0.5rem;
  }
  
  /* Feedback Card */
  .feedback-card {
    background-color: #eef9f9;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  
  .feedback-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #088F8F;
  }
  
  .feedback-card p {
    color: #4b5563;
    margin-bottom: 1rem;
  }
  
  .contact-link {
    color: #006666;
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
    color: #088F8F;
    font-weight: 500;
    text-decoration: none;
  }
  
  .back-icon {
    margin-right: 0.5rem;
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
    color: #088F8F;
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
    color: #088F8F;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
  }
  
  .lang-button.active {
    background-color: #088F8F;
    color: white;
    border-color: #088F8F;
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
    
    .page-link-btn {
      width: 100%;
      justify-content: center;
    }
  }
</style>
