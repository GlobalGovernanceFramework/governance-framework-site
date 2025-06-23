<!-- src/routes/frameworks/tools/indigenous-governance-and-traditional-knowledge/+page.svelte -->
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
      return `${base}/frameworks/tools/indigenous-governance-and-traditional-knowledge/${toolName}`;
    }
    
    // For potentially translated documents
    if (toolName.includes('indigenous-framework-essentials') || toolName === 'indigenous-sovereignty-starter-kit.zip') {
      // Special case for main guides
      if (toolName === 'indigenous-framework-essentials.pdf' || toolName === 'indigenous-framework-essentials.md') {
        const langSuffix = currentLocale === 'sv' ? '-sv' : '-en';
        return `${base}/frameworks/tools/indigenous-governance-and-traditional-knowledge/indigenous-framework-essentials${langSuffix}.${toolName.split('.').pop()}`;
      } else {
        // For other translated documents
        const extension = toolName.split('.').pop();
        const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
        return `${base}/frameworks/tools/indigenous-governance-and-traditional-knowledge/${baseName}-${currentLocale}.${extension}`;
      }
    }
    
    // For tools that might have language variations
    const toolsWithTranslations = [
      'baz-readiness-assessment',
      'earth-council-formation-guide',
      'indigenous-data-sovereignty-framework',
      'municipal-indigenous-agreement',
      'tek-documentation-kit',
      'ceremonial-governance-integration-guide',
      'cultural-integrity-replication-protocol',
      'indigenous-leadership-development-program',
      'storytelling-media-strategy-toolkit',
      'gph-index-calculator',
      'land-rematriation-template',
      'legal-strategy-guide',
      'reparations-toolkit',
      'ai-governance-protocols',
      'cybersecurity-quantum-guide'
    ];
    
    if (toolsWithTranslations.includes(toolName.split('.')[0])) {
      const extension = toolName.split('.').pop();
      const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
      return `${base}/frameworks/tools/indigenous-governance-and-traditional-knowledge/${baseName}-${currentLocale}.${extension}`;
    }
    
    // Default path for other files
    return `${base}/frameworks/tools/indigenous-governance-and-traditional-knowledge/${toolName}`;
  };

  // Helper function for language button styles
  function getLanguageButtonStyle(lang) {
    const isActive = currentLocale === lang;
    return isActive ? 'lang-button active' : 'lang-button';
  }

  // Translations for this page
  const translations = {
    en: {
      title: "Indigenous & Traditional Knowledge Governance Framework Tools",
      subtitle: "Sacred technologies for Indigenous-led planetary transformation and Traditional Knowledge protection",
      intro: "These tools and templates are designed to help Indigenous communities implement sovereignty-based governance while protecting Traditional Ecological Knowledge. From establishing Bioregional Autonomous Zones to creating Indigenous AI oversight and building global Indigenous alliances, these resources provide step-by-step guidance for planetary healing through Indigenous leadership.",
      startKitTitle: "Indigenous Sovereignty Starter Kit",
      startKitDesc: "A complete package with everything needed to launch Indigenous-led governance transformation. Includes all essential tools and templates for BAZ development, Traditional Knowledge protection, and Indigenous alliance building.",
      startKitButton: "Download Complete Sovereignty Kit",
      coreTitle: "Core Governance Tools",
      coreDesc: "Essential tools for implementing Indigenous governance systems, from BAZ readiness assessment to Traditional Knowledge documentation and Earth Council formation.",
      culturalTitle: "Cultural & Leadership Tools",
      culturalDesc: "Resources for strengthening Indigenous cultural integrity, developing next-generation leaders, and integrating ceremonial governance with contemporary coordination needs.",
      economicTitle: "Economic & Legal Tools",
      economicTitle: "Economic & Legal Tools",
      economicDesc: "Tools for advancing Indigenous economic sovereignty, land rematriation, and legal strategies for Rights of Nature and Traditional Knowledge protection.",
      technologyTitle: "Technology & Innovation Tools",
      technologyDesc: "Indigenous-controlled technology tools ensuring AI serves Traditional Knowledge, cybersecurity protects Indigenous communications, and technology development follows cultural protocols.",
      guidesTitle: "Framework Guides",
      guidesDesc: "Accessible guides to help you understand and share the Indigenous & Traditional Knowledge Governance Framework with diverse audiences while maintaining cultural protocols.",
      requestTitle: "Request Tools or Provide Feedback",
      requestDesc: "Need implementation resources for a specific Indigenous community? Have suggestions for Indigenous-led improvements? We welcome your input to make these tools more useful for Indigenous sovereignty.",
      contactLink: "Contact us",
      languagesTitle: "Available Languages",
      downloadPDF: "Download PDF",
      downloadMarkdown: "Download Markdown",
      backToTools: "Back to Tools Overview",
      // Tool titles - Core Governance
      bazReadinessTitle: "BAZ Readiness Assessment",
      bazReadinessDesc: "Comprehensive assessment tool for Indigenous communities considering Bioregional Autonomous Zone establishment with Traditional Knowledge-based evaluation criteria.",
      earthCouncilTitle: "Earth Council Formation Guide",
      earthCouncilDesc: "Complete framework for establishing Indigenous-led global governance coordination while respecting diverse traditional governance systems.",
      dataSovereigntyTitle: "Indigenous Data Sovereignty Framework",
      dataSovereigntyDesc: "Protocols for Indigenous community control over data collection, storage, and use affecting traditional territories and Traditional Knowledge.",
      municipalAgreementTitle: "Municipal-Indigenous Cooperative Agreement",
      municipalAgreementDesc: "Template for establishing government partnerships that recognize Indigenous sovereignty and support land rematriation initiatives.",
      tekDocumentationTitle: "Traditional Knowledge Documentation Kit",
      tekDocumentationDesc: "Tools for systematically recording and protecting Traditional Ecological Knowledge under Indigenous community control and cultural protocols.",
      // Cultural & Leadership Tools
      ceremonialGovernanceTitle: "Ceremonial Governance Integration Guide",
      ceremonialGovernanceDesc: "Framework for integrating traditional spiritual practices and ceremony into contemporary Indigenous governance systems.",
      culturalIntegrityTitle: "Cultural Integrity Replication Protocol",
      culturalIntegrityDesc: "Safeguards ensuring framework implementation strengthens rather than compromises traditional governance systems and cultural practices.",
      leadershipDevelopmentTitle: "Indigenous Leadership Development Program",
      leadershipDevelopmentDesc: "Comprehensive program combining traditional knowledge transmission with contemporary skills for next-generation Indigenous leaders.",
      storytellingStrategyTitle: "Storytelling & Media Strategy Toolkit",
      storytellingStrategyDesc: "Resources for Global Indigenous Media Network coordination and narrative strategies amplifying Indigenous voices globally.",
      // Economic & Legal Tools
      gphIndexTitle: "Gross Planetary Health Index Calculator",
      gphIndexDesc: "Assessment system measuring ecological restoration, cultural vitality, and community wellbeing as alternatives to GDP-based economic measurement.",
      landRematriationTitle: "Land Rematriation Planning Template",
      landRematriationDesc: "Comprehensive framework for returning traditional territories to Indigenous governance through legal strategies and community organizing.",
      legalStrategyTitle: "Indigenous Rights Legal Strategy Guide",
      legalStrategyDesc: "Strategic guide for Rights of Nature advocacy, Traditional Knowledge protection, and Indigenous sovereignty legal challenges.",
      reparationsTitle: "Reparations Campaign Toolkit",
      reparationsDesc: "Framework for calculating and campaigning for corporate and government reparations supporting Indigenous-led restoration and sovereignty.",
      // Technology Tools
      aiGovernanceTitle: "Indigenous AI Ethics & Governance Protocols",
      aiGovernanceDesc: "Framework for Indigenous community oversight of artificial intelligence ensuring technology serves Traditional Knowledge rather than replacing it.",
      cybersecurityTitle: "Cybersecurity & Quantum-Threat Protection Guide",
      cybersecurityDesc: "Advanced security protocols protecting Indigenous communications and Traditional Knowledge from surveillance and appropriation.",
      frameworkEssentialsTitle: "Indigenous Framework Essentials",
      frameworkEssentialsDesc: "Comprehensive yet accessible guide explaining the framework's core principles and Indigenous-led planetary transformation pathway.",
      downloadButton: "Download"
    },
    sv: {
      title: "Verktyg för Ursprungsfolk & Traditionell Kunskap Styrningsramverk",
      subtitle: "Heliga teknologier för ursprungsfolksledd planetär transformation och skydd av traditionell kunskap",
      intro: "Dessa verktyg och mallar är utformade för att hjälpa ursprungsfolkssamhällen implementera suveränitetsbaserad styrning samtidigt som traditionell ekologisk kunskap skyddas. Från att etablera bioregionala autonoma zoner till att skapa ursprungsfolks AI-övervakning och bygga globala ursprungsfolksallianser, ger dessa resurser steg-för-steg-vägledning för planetär läkning genom ursprungsfolksledarskap.",
      startKitTitle: "Ursprungsfolks Suveränitet Startpaket",
      startKitDesc: "Ett komplett paket med allt som behövs för att starta ursprungsfolksledda styrningsomvandlingar. Inkluderar alla nödvändiga verktyg och mallar för BAZ-utveckling, skydd av traditionell kunskap och ursprungsfolksalliansbyggande.",
      startKitButton: "Ladda ner komplett Suveränitet Kit",
      coreTitle: "Grundläggande Styrningsverktyg",
      coreDesc: "Väsentliga verktyg för att implementera ursprungsfolks styrningssystem, från BAZ-beredskapsanalys till dokumentation av traditionell kunskap och jordrådsformation.",
      culturalTitle: "Kulturella & Ledarskapsverktyg",
      culturalDesc: "Resurser för att stärka ursprungsfolks kulturella integritet, utveckla nästa generations ledare och integrera ceremoniell styrning med samtida koordinationsbehov.",
      economicTitle: "Ekonomiska & Juridiska Verktyg",
      economicDesc: "Verktyg för att främja ursprungsfolks ekonomiska suveränitet, jordåterlämnande och juridiska strategier för naturens rättigheter och skydd av traditionell kunskap.",
      technologyTitle: "Teknologi & Innovationsverktyg",
      technologyDesc: "Ursprungsfolkskontrollerade teknologiverktyg som säkerställer att AI tjänar traditionell kunskap, cybersäkerhet skyddar ursprungsfolks kommunikationer och teknikutveckling följer kulturella protokoll.",
      guidesTitle: "Ramverksguider",
      guidesDesc: "Tillgängliga guider för att hjälpa dig förstå och dela Ursprungsfolk & Traditionell Kunskap Styrningsramverket med olika målgrupper samtidigt som kulturella protokoll upprätthålls.",
      requestTitle: "Begär verktyg eller ge feedback",
      requestDesc: "Behöver du implementeringsresurser för ett specifikt ursprungsfolkssamhälle? Har du förslag på ursprungsfolksledda förbättringar? Vi välkomnar dina synpunkter för att göra dessa verktyg mer användbara för ursprungsfolks suveränitet.",
      contactLink: "Kontakta oss",
      languagesTitle: "Tillgängliga språk",
      downloadPDF: "Ladda ner PDF",
      downloadMarkdown: "Ladda ner Markdown",
      backToTools: "Tillbaka till verktygsöversikt",
      // Tool titles in Swedish - Core Governance
      bazReadinessTitle: "BAZ Beredskapsanalys",
      bazReadinessDesc: "Omfattande bedömningsverktyg för ursprungsfolkssamhällen som överväger etablering av bioregionala autonoma zoner med traditionell kunskapsbaserade utvärderingskriterier.",
      earthCouncilTitle: "Jordråds Formationsguide",
      earthCouncilDesc: "Komplett ramverk för att etablera ursprungsfolksledd global styrningskoordination samtidigt som olika traditionella styrningssystem respekteras.",
      dataSovereigntyTitle: "Ursprungsfolks Datasuveränitetsramverk",
      dataSovereigntyDesc: "Protokoll för ursprungsfolkssamhällens kontroll över datainsamling, lagring och användning som påverkar traditionella territorier och traditionell kunskap.",
      municipalAgreementTitle: "Kommunal-Ursprungsfolks Samarbetsavtal",
      municipalAgreementDesc: "Mall för att etablera regeringspartnerskap som erkänner ursprungsfolks suveränitet och stöder jordåterlämnande initiativ.",
      tekDocumentationTitle: "Traditionell Kunskap Dokumentationskit",
      tekDocumentationDesc: "Verktyg för systematisk registrering och skydd av traditionell ekologisk kunskap under ursprungsfolkssamhällens kontroll och kulturella protokoll.",
      downloadButton: "Ladda ner"
    }
  };

  // Get current translations based on active locale
  $: texts = translations[currentLocale] || translations.en;
  
  // Tool data for each section
  const coreTools = [
    { id: 'baz-readiness-assessment', color: 'color-primary' },
    { id: 'earth-council-formation-guide', color: 'color-earth' },
    { id: 'indigenous-data-sovereignty-framework', color: 'color-water' },
    { id: 'municipal-indigenous-agreement', color: 'color-plant' },
    { id: 'tek-documentation-kit', color: 'color-sun' }
  ];

  const culturalTools = [
    { id: 'ceremonial-governance-integration-guide', color: 'color-fire' },
    { id: 'cultural-integrity-replication-protocol', color: 'color-primary' },
    { id: 'indigenous-leadership-development-program', color: 'color-plant' },
    { id: 'storytelling-media-strategy-toolkit', color: 'color-sky' }
  ];

  const economicTools = [
    { id: 'gph-index-calculator', color: 'color-earth' },
    { id: 'land-rematriation-template', color: 'color-primary' },
    { id: 'legal-strategy-guide', color: 'color-water' },
    { id: 'reparations-toolkit', color: 'color-sun' }
  ];

  const technologyTools = [
    { id: 'ai-governance-protocols', color: 'color-sky' },
    { id: 'cybersecurity-quantum-guide', color: 'color-secondary' }
  ];

  const toolNameToTranslationKey = {
    'baz-readiness-assessment': 'bazReadiness',
    'earth-council-formation-guide': 'earthCouncil',
    'indigenous-data-sovereignty-framework': 'dataSovereignty',
    'municipal-indigenous-agreement': 'municipalAgreement',
    'tek-documentation-kit': 'tekDocumentation',
    'ceremonial-governance-integration-guide': 'ceremonialGovernance',
    'cultural-integrity-replication-protocol': 'culturalIntegrity',
    'indigenous-leadership-development-program': 'leadershipDevelopment',
    'storytelling-media-strategy-toolkit': 'storytellingStrategy',
    'gph-index-calculator': 'gphIndex',
    'land-rematriation-template': 'landRematriation',
    'legal-strategy-guide': 'legalStrategy',
    'reparations-toolkit': 'reparations',
    'ai-governance-protocols': 'aiGovernance',
    'cybersecurity-quantum-guide': 'cybersecurity'
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

      <!-- Start with the Indigenous Sovereignty Starter Kit -->
      <div class="start-kit-card">
        <div class="card-content">
          <div class="card-icon">🪶</div>
          <div class="card-text">
            <h2>{texts.startKitTitle}</h2>
            <p>{texts.startKitDesc}</p>
          </div>
          <div class="card-actions">
            <a href={getFilePath(`indigenous-sovereignty-starter-kit-${currentLocale}.zip`)} download class="primary-btn">
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
        <!-- Indigenous Framework Essentials -->
        <div class="tool-card color-primary">
          <h3>{texts.frameworkEssentialsTitle}</h3>
          <p>{texts.frameworkEssentialsDesc}</p>
          <div class="tool-actions">
            <a href={getFilePath(`indigenous-framework-essentials-${currentLocale}.pdf`)} download class="download-btn pdf">
              {texts.downloadPDF}
              <span class="icon">↓</span>
            </a>
            <a href={getFilePath(`indigenous-framework-essentials-${currentLocale}.md`)} download class="download-btn md">
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

      <!-- Cultural & Leadership Tools -->
      <h2 class="section-title">{texts.culturalTitle}</h2>
      <p class="section-desc">{texts.culturalDesc}</p>
      
      <div class="tools-grid">
        {#each culturalTools as tool}
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

      <!-- Economic & Legal Tools -->
      <h2 class="section-title">{texts.economicTitle}</h2>
      <p class="section-desc">{texts.economicDesc}</p>
      
      <div class="tools-grid">
        {#each economicTools as tool}
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
  /* Indigenous & Traditional Knowledge Governance Framework color scheme */
  /* Earth tones representing connection to land, traditional wisdom, and natural cycles */
  :root {
    --indigenous-primary: #1c2b1a; /* Deep Forest Green - ancestral wisdom, land connection */
    --indigenous-secondary: #6b7280; /* Stone Gray - mountains, stability, endurance */
    --indigenous-earth: #92400e; /* Rich Earth Brown - soil, grounding, traditional knowledge */
    --indigenous-water: #0c4a6e; /* Deep Water Blue - rivers, life source, ceremony */
    --indigenous-fire: #dc2626; /* Sacred Fire Red - transformation, ceremony, life force */
    --indigenous-sun: #f59e0b; /* Golden Sun - guidance, renewal, seven generations */
    --indigenous-plant: #15803d; /* Living Plant Green - growth, medicine, traditional foods */
    --indigenous-sky: #3b82f6; /* Sky Blue - vision, dreams, future generations */
    --indigenous-sage: #6b7280; /* Sage Gray - wisdom, balance, traditional governance */
    --indigenous-light: #84cc16; /* Light Green - hope, renewal, youth leadership */
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
    background: linear-gradient(135deg, var(--indigenous-primary) 0%, var(--indigenous-earth) 100%);
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
    color: var(--indigenous-plant);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: var(--indigenous-primary);
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
    color: var(--indigenous-primary);
  }
  
  .section-desc {
    margin-bottom: 2rem;
    color: #4b5563;
    line-height: 1.7;
    font-size: 1.125rem;
  }
  
  /* Start Kit Card */
  .start-kit-card {
    background: linear-gradient(135deg, rgba(28, 43, 26, 0.08) 0%, rgba(146, 64, 14, 0.08) 100%);
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(28, 43, 26, 0.1);
    border: 1px solid rgba(28, 43, 26, 0.2);
  }
  
  .card-content {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
  }
  
  .card-icon {
    font-size: 2.5rem;
    color: var(--indigenous-primary);
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--indigenous-primary);
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
  
  /* Color Variations for Indigenous Framework */
  .color-primary {
    border-left-color: var(--indigenous-primary);
  }
  
  .color-primary h3 {
    color: var(--indigenous-primary);
  }
  
  .color-secondary {
    border-left-color: var(--indigenous-secondary);
  }
  
  .color-secondary h3 {
    color: var(--indigenous-secondary);
  }
  
  .color-earth {
    border-left-color: var(--indigenous-earth);
  }
  
  .color-earth h3 {
    color: var(--indigenous-earth);
  }
  
  .color-water {
    border-left-color: var(--indigenous-water);
  }
  
  .color-water h3 {
    color: var(--indigenous-water);
  }
  
  .color-fire {
    border-left-color: var(--indigenous-fire);
  }
  
  .color-fire h3 {
    color: var(--indigenous-fire);
  }
  
  .color-sun {
    border-left-color: var(--indigenous-sun);
  }
  
  .color-sun h3 {
    color: var(--indigenous-sun);
  }

  .color-plant {
    border-left-color: var(--indigenous-plant);
  }
  
  .color-plant h3 {
    color: var(--indigenous-plant);
  }

  .color-sky {
    border-left-color: var(--indigenous-sky);
  }
  
  .color-sky h3 {
    color: var(--indigenous-sky);
  }

  .color-sage {
    border-left-color: var(--indigenous-sage);
  }
  
  .color-sage h3 {
    color: var(--indigenous-sage);
  }

  .color-light {
    border-left-color: var(--indigenous-light);
  }
  
  .color-light h3 {
    color: var(--indigenous-light);
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
    background-color: var(--indigenous-primary);
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
    background-color: var(--indigenous-earth);
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
    background-color: var(--indigenous-primary);
  }

  .tool-card.color-secondary .download-btn.pdf {
    background-color: var(--indigenous-secondary);
  }

  .tool-card.color-earth .download-btn.pdf {
    background-color: var(--indigenous-earth);
  }

  .tool-card.color-water .download-btn.pdf {
    background-color: var(--indigenous-water);
  }

  .tool-card.color-fire .download-btn.pdf {
    background-color: var(--indigenous-fire);
  }

  .tool-card.color-sun .download-btn.pdf {
    background-color: var(--indigenous-sun);
  }

  .tool-card.color-plant .download-btn.pdf {
    background-color: var(--indigenous-plant);
  }

  .tool-card.color-sky .download-btn.pdf {
    background-color: var(--indigenous-sky);
  }

  .tool-card.color-sage .download-btn.pdf {
    background-color: var(--indigenous-sage);
  }

  .tool-card.color-light .download-btn.pdf {
    background-color: var(--indigenous-light);
  }

  .download-btn.md {
    background-color: white;
    border: 1px solid;
  }

  .tool-card.color-primary .download-btn.md {
    color: var(--indigenous-primary);
    border-color: var(--indigenous-primary);
  }

  .tool-card.color-secondary .download-btn.md {
    color: var(--indigenous-secondary);
    border-color: var(--indigenous-secondary);
  }

  .tool-card.color-earth .download-btn.md {
    color: var(--indigenous-earth);
    border-color: var(--indigenous-earth);
  }

  .tool-card.color-water .download-btn.md {
    color: var(--indigenous-water);
    border-color: var(--indigenous-water);
  }

  .tool-card.color-fire .download-btn.md {
    color: var(--indigenous-fire);
    border-color: var(--indigenous-fire);
  }

  .tool-card.color-sun .download-btn.md {
    color: var(--indigenous-sun);
    border-color: var(--indigenous-sun);
  }

  .tool-card.color-plant .download-btn.md {
    color: var(--indigenous-plant);
    border-color: var(--indigenous-plant);
  }

  .tool-card.color-sky .download-btn.md {
    color: var(--indigenous-sky);
    border-color: var(--indigenous-sky);
  }

  .tool-card.color-sage .download-btn.md {
    color: var(--indigenous-sage);
    border-color: var(--indigenous-sage);
  }

  .tool-card.color-light .download-btn.md {
    color: var(--indigenous-light);
    border-color: var(--indigenous-light);
  }

  .download-btn:hover {
    transform: translateY(-1px);
  }
 
  .icon {
    margin-left: 0.5rem;
  }
 
  /* Feedback Card */
  .feedback-card {
    background-color: rgba(28, 43, 26, 0.05);
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 2rem;
    border: 1px solid rgba(28, 43, 26, 0.2);
  }

  .feedback-card h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: var(--indigenous-primary);
  }

  .contact-link {
    color: var(--indigenous-plant);
    text-decoration: underline;
    font-weight: 500;
  }

  .contact-link:hover {
    color: var(--indigenous-primary);
  }
 
  /* Back Link Bottom */
  .back-link-bottom {
    margin: 2rem 0;
    text-align: center;
  }

  .back-link-bottom a {
    display: inline-flex;
    align-items: center;
    color: var(--indigenous-plant);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .back-link-bottom a:hover {
    color: var(--indigenous-primary);
  }
 
  /* Language Section */
  .language-section {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid #e5e7eb;
  }

  .language-section h3 {
    margin-bottom: 1rem;
    color: var(--indigenous-primary);
  }
 
  .language-buttons {
    display: flex;
    gap: 0.5rem;
  }
 
  .lang-button {
    padding: 0.5rem 1rem;
    border: 1px solid var(--indigenous-plant);
    background-color: white;
    color: var(--indigenous-plant);
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;
  }

  .lang-button:hover {
    background-color: rgba(28, 43, 26, 0.05);
  }
 
  .lang-button.active {
    background-color: var(--indigenous-primary);
    color: white;
    border-color: var(--indigenous-primary);
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
