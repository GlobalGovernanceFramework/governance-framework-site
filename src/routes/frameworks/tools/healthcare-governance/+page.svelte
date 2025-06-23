<!-- src/routes/frameworks/tools/healthcare-governance/+page.svelte -->
<script>
  import { t, locale, setLocale } from '$lib/i18n';
  import { base } from '$app/paths';

  // Subscribe to stores
  $: currentT = $t;
  $: currentLocale = $locale;

  // Planetary Health color scheme
  const colors = {
    primary: '#1e3a8a', // Deep Blue - trust, stability, global cooperation
    secondary: '#059669', // Emerald Green - healing, growth, life
    accent: '#0891b2', // Cyan - technology, innovation, connectivity
    earth: '#92400e', // Earth Brown - grounding, traditional knowledge
    light: '#67e8f9', // Light Cyan - accessibility, transparency
    healing: '#10b981', // Healing Green - wellness, regeneration
    wisdom: '#7c3aed', // Deep Purple - wisdom, spirituality
    community: '#f59e0b' // Warm Orange - community, warmth, connection
  };

  // Define file paths with language handling for planetary health tools
  const getFilePath = (toolName, category = 'healthcare-governance') => {
    // Check if the file already has language suffix
    if (toolName.includes('-sv') || toolName.includes('-en')) {
      return `${base}/frameworks/tools/${category}/${toolName}`;
    }
    
    // For potentially translated documents
    if (toolName.includes('starter-kit') || toolName.includes('guide') || toolName.includes('toolkit')) {
      const extension = toolName.split('.').pop();
      const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
      return `${base}/frameworks/tools/healthcare-governance/${baseName}-${currentLocale}.${extension}`;
    }
    
    // For tools that might have language variations
    const translatableTools = [
      'global-health-equity-council-setup',
      'regional-health-hub-implementation',
      'community-health-legion-manual',
      'ai-bias-audit-framework',
      'blockchain-health-records-setup',
      'health-solidarity-fund-setup',
      'one-health-surveillance-protocols',
      'pandemic-response-playbook'
    ];
    
    if (translatableTools.some(tool => toolName.startsWith(tool))) {
      const extension = toolName.split('.').pop();
      const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
      return `${base}/frameworks/tools/healthcare-governance/${baseName}-${currentLocale}.${extension}`;
    }
    
    // Default path for other files
    return `${base}/frameworks/tools/${category}/${toolName}`;
  };

  // Helper function for language button styles
  function getLanguageButtonStyle(lang) {
    const isActive = currentLocale === lang;
    return isActive ? 'lang-button active' : 'lang-button';
  }

  // Translations for this page
  const translations = {
    en: {
      title: "Planetary Health Framework Tools",
      subtitle: "Practical resources for health equity, community empowerment, and planetary healing",
      intro: "These tools and templates are designed to help you implement the Planetary Health Accord across diverse contexts. From establishing Community Health Legions to deploying AI-powered health systems, these resources provide step-by-step guidance for transforming health systems and creating equitable healthcare for all by 2035.",
      
      starterKitTitle: "Start with the Planetary Health Starter Kit",
      starterKitDesc: "A complete implementation package with essential resources including Community Health Legion Manual, Global Health Equity Council Setup Guide, Health Sanctuary protocols, and Technology Implementation templates.",
      starterKitButton: "Download Planetary Health Starter Kit",
      
      coreToolsTitle: "Core Governance Tools",
      coreToolsDesc: "Essential tools for establishing democratic health governance, Global Health Equity Council operations, and Regional Health Hub coordination.",
      
      technologyToolsTitle: "Technology & Data Tools",
      technologyToolsDesc: "AI bias auditing frameworks, blockchain health records, federated learning systems, and cybersecurity protocols for ethical health technology.",
      
      communityToolsTitle: "Community Health Tools",
      communityToolsDesc: "Resources for Community Health Legions, cultural competency training, mental health integration, and trauma-informed care protocols.",
      
      financingToolsTitle: "Financing & Innovation Tools",
      financingToolsDesc: "Health Solidarity Fund setup, debt-for-health swaps, open-source pharmaceutical toolkits, and health impact bond frameworks.",
      
      preparednessToolsTitle: "Preparedness & Crisis Response Tools",
      preparednessToolsDesc: "One Health surveillance protocols, pandemic response playbooks, climate-health adaptation guides, and mobile clinic deployment kits.",
      
      requestTitle: "Request Tools or Provide Feedback",
      requestDesc: "Need implementation resources for a specific health context or community? Have suggestions for indigenous communities or youth-led health initiatives? We welcome your input to make these tools more inclusive and effective.",
      contactLink: "Contact us",
      languagesTitle: "Available Languages",
      downloadPDF: "Download PDF",
      downloadMarkdown: "Download Markdown",
      downloadZip: "Download Package",
      backToTools: "Back to Tools Overview",
      
      // Core Governance Tools
      councilSetupTitle: "Global Health Equity Council Setup Guide",
      councilSetupDesc: "Democratic governance structure with indigenous representation, youth councils, and community oversight mechanisms.",
      
      hubImplementationTitle: "Regional Health Hub Implementation",
      hubImplementationDesc: "Local health coordination centers with cultural competency training and traditional healer integration protocols.",
      
      conflictResolutionTitle: "Conflict Resolution Protocols",
      conflictResolutionDesc: "Democratic mediation frameworks for health governance disputes with traditional justice integration.",
      
      youthBoardTitle: "Youth Advisory Board Framework",
      youthBoardDesc: "Formal youth representation in health governance with decision-making power and intergenerational collaboration.",
      
      // Technology Tools
      aiAuditTitle: "AI Bias Audit Framework",
      aiAuditDesc: "Community-controlled bias detection and fairness testing for health AI systems with cultural competency standards.",
      
      blockchainSetupTitle: "Blockchain Health Records Setup",
      blockchainSetupDesc: "Patient-controlled health data with offline functionality and cross-border interoperability protocols.",
      
      federatedLearningTitle: "Federated Learning Implementation",
      federatedLearningDesc: "Distributed AI training systems preserving data sovereignty with community oversight and traditional knowledge protection.",
      
      cybersecurityTitle: "Cybersecurity Framework for Health",
      cybersecurityDesc: "Zero-trust security architecture with community-controlled protocols and traditional knowledge protection.",
      
      // Community Tools
      legionManualTitle: "Community Health Legion Manual",
      legionManualDesc: "Comprehensive training guide for community-selected health workers with traditional healing integration and cultural competency.",
      
      culturalTrainingTitle: "Cultural Competency Training",
      culturalTrainingDesc: "Training modules for health workers on indigenous knowledge, traditional healing, and cultural safety protocols.",
      
      mentalHealthTitle: "Mental Health Integration Toolkit",
      mentalHealthTitle: "Mental Health Integration Toolkit",
      mentalHealthDesc: "Trauma-informed care protocols with traditional healing practices and community-based psychosocial support.",
      
      traumaCareTitle: "Trauma-Informed Care Protocols",
      traumaCareDesc: "Community healing approaches addressing historical trauma with traditional and modern therapeutic integration.",
      
      // Financing Tools
      solidarityFundTitle: "Health Solidarity Fund Setup Guide",
      solidarityFundDesc: "Community-controlled health financing with participatory budgeting and traditional resource sharing principles.",
      
      debtSwapTitle: "Debt-for-Health Swap Templates",
      debtSwapDesc: "Debt restructuring agreements prioritizing community health development with sovereignty protection protocols.",
      
      pharmaToolkitTitle: "Open-Source Pharma Toolkit",
      pharmaToolkitDesc: "Patent buyout frameworks, essential medicine commons, and community-controlled pharmaceutical development.",
      
      impactBondTitle: "Health Impact Bond Framework",
      impactBondDesc: "Community-benefit financing with health outcome bonuses and traditional value assessment integration.",
      
      // Preparedness Tools
      surveillanceTitle: "One Health Surveillance Protocols",
      surveillanceDesc: "Integrated human, animal, and environmental health monitoring with traditional knowledge and community participation.",
      
      pandemicPlaybookTitle: "Pandemic Response Playbook",
      pandemicPlaybookDesc: "Community-controlled crisis response with traditional healing integration and democratic emergency governance.",
      
      climateAdaptationTitle: "Climate-Health Adaptation Guide",
      climateAdaptationDesc: "Health system climate resilience with traditional adaptation knowledge and ecosystem-based solutions.",
      
      mobileClinicTitle: "Mobile Clinic Deployment Kit",
      mobileClinicDesc: "Rapid health service deployment for emergencies and remote areas with traditional healing space integration.",
      
      downloadButton: "Download"
    },
    sv: {
      title: "Planetär Hälsa Ramverk Verktyg",
      subtitle: "Praktiska resurser för hälsorättvisa, samhällsstärkande och planetär läkning",
      intro: "Dessa verktyg och mallar är utformade för att hjälpa dig implementera Planetära Hälsa Accordet i olika sammanhang. Från att etablera Gemenskapshälsa Legioner till att distribuera AI-drivna hälsosystem, ger dessa resurser steg-för-steg-vägledning för att omvandla hälsosystem och skapa rättvis hälsovård för alla till 2035.",
      
      starterKitTitle: "Börja med Planetär Hälsa Startpaketet",
      starterKitDesc: "Ett komplett implementeringspaket med väsentliga resurser inklusive Gemenskapshälsa Legion Manual, Global Hälsorättvisa Råd Uppsättningsguide, Hälsosanktum protokoll och Teknologi Implementeringsmallar.",
      starterKitButton: "Ladda ner Planetär Hälsa Startpaket",
      
      coreToolsTitle: "Kärnstyrningsverktyg",
      coreToolsDesc: "Väsentliga verktyg för att etablera demokratisk hälsostyrning, Global Hälsorättvisa Råd operationer, och Regional Hälsohubb koordination.",
      
      technologyToolsTitle: "Teknologi & Data Verktyg",
      technologyToolsDesc: "AI bias granskningsramverk, blockchain hälsoregister, federerade inlärningssystem och cybersäkerhetsprotokoll för etisk hälsoteknologi.",
      
      communityToolsTitle: "Gemenskapshälsa Verktyg",
      communityToolsDesc: "Resurser för Gemenskapshälsa Legioner, kulturell kompetensutbildning, mental hälsa integration och traumainformerad vårdprotokoll.",
      
      financingToolsTitle: "Finansiering & Innovation Verktyg",
      financingToolsDesc: "Hälsosolidaritet Fond uppsättning, skuld-för-hälsa byten, öppen källkod farmaceutiska verktygskit och hälsoeffekt obligationsramverk.",
      
      preparednessToolsTitle: "Beredskap & Krisrespons Verktyg",
      preparednessToolsDesc: "En Hälsa övervakningsprotokoll, pandemi responshandböcker, klimat-hälsa anpassningsguider och mobil klinik distributionskit.",
      
      requestTitle: "Begär verktyg eller ge feedback",
      requestDesc: "Behöver du implementeringsresurser för ett specifikt hälsosammanhang eller samhälle? Har du förslag för ursprungssamhällen eller ungdomsledda hälsoinitiativ? Vi välkomnar dina synpunkter för att göra dessa verktyg mer inkluderande och effektiva.",
      contactLink: "Kontakta oss",
      languagesTitle: "Tillgängliga språk",
      downloadPDF: "Ladda ner PDF",
      downloadMarkdown: "Ladda ner Markdown",
      downloadZip: "Ladda ner Paket",
      backToTools: "Tillbaka till verktygsöversikt",
      
      // Swedish translations for all tool titles and descriptions
      councilSetupTitle: "Global Hälsorättvisa Råd Uppsättningsguide",
      councilSetupDesc: "Demokratisk styrningsstruktur med ursprungsbefolkning representation, ungdomsråd och samhällsöversynsmekanismer.",
      
      downloadButton: "Ladda ner"
    }
  };

  // Get current translations based on active locale
  $: texts = translations[currentLocale] || translations.en;
  
  // Tool data organized by category with health-themed colors
  const coreTools = [
    { id: 'global-health-equity-council-setup', color: 'color-primary' },
    { id: 'regional-health-hub-implementation', color: 'color-secondary' },
    { id: 'conflict-resolution-protocols', color: 'color-accent' },
    { id: 'youth-advisory-board-framework', color: 'color-community' }
  ];
  
  const technologyTools = [
    { id: 'ai-bias-audit-framework', color: 'color-primary' },
    { id: 'blockchain-health-records-setup', color: 'color-accent' },
    { id: 'federated-learning-implementation', color: 'color-secondary' },
    { id: 'cybersecurity-framework-health', color: 'color-earth' }
  ];
  
  const communityTools = [
    { id: 'community-health-legion-manual', color: 'color-healing' },
    { id: 'cultural-competency-training', color: 'color-community' },
    { id: 'mental-health-integration-toolkit', color: 'color-wisdom' },
    { id: 'trauma-informed-care-protocols', color: 'color-secondary' }
  ];
  
  const financingTools = [
    { id: 'health-solidarity-fund-setup', color: 'color-primary' },
    { id: 'debt-for-health-swap-templates', color: 'color-earth' },
    { id: 'open-source-pharma-toolkit', color: 'color-healing' },
    { id: 'health-impact-bond-framework', color: 'color-accent' }
  ];
  
  const preparednessTools = [
    { id: 'one-health-surveillance-protocols', color: 'color-secondary' },
    { id: 'pandemic-response-playbook', color: 'color-primary' },
    { id: 'climate-health-adaptation-guide', color: 'color-earth' },
    { id: 'mobile-clinic-deployment-kit', color: 'color-community' }
  ];

  // Map tool IDs to translation keys
  const toolNameToTranslationKey = {
    'global-health-equity-council-setup': 'councilSetup',
    'regional-health-hub-implementation': 'hubImplementation',
    'conflict-resolution-protocols': 'conflictResolution',
    'youth-advisory-board-framework': 'youthBoard',
    'ai-bias-audit-framework': 'aiAudit',
    'blockchain-health-records-setup': 'blockchainSetup',
    'federated-learning-implementation': 'federatedLearning',
    'cybersecurity-framework-health': 'cybersecurity',
    'community-health-legion-manual': 'legionManual',
    'cultural-competency-training': 'culturalTraining',
    'mental-health-integration-toolkit': 'mentalHealth',
    'trauma-informed-care-protocols': 'traumaCare',
    'health-solidarity-fund-setup': 'solidarityFund',
    'debt-for-health-swap-templates': 'debtSwap',
    'open-source-pharma-toolkit': 'pharmaToolkit',
    'health-impact-bond-framework': 'impactBond',
    'one-health-surveillance-protocols': 'surveillance',
    'pandemic-response-playbook': 'pandemicPlaybook',
    'climate-health-adaptation-guide': 'climateAdaptation',
    'mobile-clinic-deployment-kit': 'mobileClinic'
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

      <!-- Start with the Planetary Health Starter Kit -->
      <div class="starter-kit-card">
        <div class="card-content">
          <div class="card-icon">🌍</div>
          <div class="card-text">
            <h2>{texts.starterKitTitle}</h2>
            <p>{texts.starterKitDesc}</p>
          </div>
          <div class="card-actions">
            <a href={getFilePath(`planetary-health-starter-kit-${currentLocale}.zip`)} download class="primary-btn">
              {texts.starterKitButton}
              <span class="icon">↓</span>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Core Governance Tools -->
      <h2 class="section-title">{texts.coreToolsTitle}</h2>
      <p class="section-desc">{texts.coreToolsDesc}</p>
      
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
      
      <!-- Technology & Data Tools -->
      <h2 class="section-title">{texts.technologyToolsTitle}</h2>
      <p class="section-desc">{texts.technologyToolsDesc}</p>
      
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

      <!-- Community Health Tools -->
      <h2 class="section-title">{texts.communityToolsTitle}</h2>
      <p class="section-desc">{texts.communityToolsDesc}</p>
      
      <div class="tools-grid">
        {#each communityTools as tool}
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

      <!-- Financing & Innovation Tools -->
      <h2 class="section-title">{texts.financingToolsTitle}</h2>
      <p class="section-desc">{texts.financingToolsDesc}</p>
      
      <div class="tools-grid">
        {#each financingTools as tool}
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

      <!-- Preparedness & Crisis Response Tools -->
      <h2 class="section-title">{texts.preparednessToolsTitle}</h2>
      <p class="section-desc">{texts.preparednessToolsDesc}</p>
      
      <div class="tools-grid">
        {#each preparednessTools as tool}
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
  /* CSS Custom Properties for Planetary Health Color Scheme */
  :root {
    --health-primary: #1e3a8a; /* Deep Blue - trust, stability, global cooperation */
    --health-secondary: #059669; /* Emerald Green - healing, growth, life */
    --health-accent: #0891b2; /* Cyan - technology, innovation, connectivity */
    --health-earth: #92400e; /* Earth Brown - grounding, traditional knowledge */
    --health-light: #67e8f9; /* Light Cyan - accessibility, transparency */
    --health-healing: #10b981; /* Healing Green - wellness, regeneration */
    --health-wisdom: #7c3aed; /* Deep Purple - wisdom, spirituality */
    --health-community: #f59e0b; /* Warm Orange - community, warmth, connection */
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
  
  /* Hero Section with Health gradient */
  .hero {
    padding: 3rem 0;
    background: linear-gradient(to bottom right, var(--health-primary), var(--health-secondary));
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
    color: var(--health-secondary);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: var(--health-primary);
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
    color: var(--health-primary);
  }
  
  .section-desc {
    margin-bottom: 2rem;
    color: #4b5563;
    line-height: 1.7;
    font-size: 1.125rem;
  }
  
  /* Starter Kit Card */
  .starter-kit-card {
    background: linear-gradient(135deg, rgba(103, 232, 249, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%);
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(30, 58, 138, 0.1);
    border: 1px solid rgba(30, 58, 138, 0.2);
  }
  
  .card-content {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
  }
  
  .card-icon {
    font-size: 2.5rem;
    color: var(--health-primary);
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--health-primary);
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
    transition: all 0.3s ease;
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
  
  /* Planetary Health Color Variations */
  .color-primary {
    border-left-color: var(--health-primary);
  }
  
  .color-primary h3 {
    color: var(--health-primary);
  }
  
  .color-secondary {
    border-left-color: var(--health-secondary);
  }
  
  .color-secondary h3 {
    color: var(--health-secondary);
  }
  
  .color-accent {
    border-left-color: var(--health-accent);
  }
  
  .color-accent h3 {
    color: var(--health-accent);
  }
  
  .color-earth {
    border-left-color: var(--health-earth);
  }
  
  .color-earth h3 {
    color: var(--health-earth);
  }
  
  .color-healing {
    border-left-color: var(--health-healing);
  }
  
  .color-healing h3 {
    color: var(--health-healing);
  }
  
  .color-wisdom {
    border-left-color: var(--health-wisdom);
  }
  
  .color-wisdom h3 {
    color: var(--health-wisdom);
  }
  
  .color-community {
    border-left-color: var(--health-community);
  }
  
  .color-community h3 {
    color: var(--health-community);
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
    background-color: var(--health-primary);
    color: white;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: var(--health-secondary);
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

  /* PDF Download Button Colors for Each Tool Color */
  .tool-card.color-primary .download-btn.pdf {
    background-color: var(--health-primary);
  }

  .tool-card.color-secondary .download-btn.pdf {
    background-color: var(--health-secondary);
  }

  .tool-card.color-accent .download-btn.pdf {
    background-color: var(--health-accent);
  }

  .tool-card.color-earth .download-btn.pdf {
    background-color: var(--health-earth);
  }

  .tool-card.color-healing .download-btn.pdf {
    background-color: var(--health-healing);
  }

  .tool-card.color-wisdom .download-btn.pdf {
    background-color: var(--health-wisdom);
  }

  .tool-card.color-community .download-btn.pdf {
    background-color: var(--health-community);
  }

  /* Markdown Download Button Colors */
  .download-btn.md {
    background-color: white;
    border: 1px solid;
  }

  .tool-card.color-primary .download-btn.md {
    color: var(--health-primary);
    border-color: var(--health-primary);
  }

  .tool-card.color-secondary .download-btn.md {
    color: var(--health-secondary);
    border-color: var(--health-secondary);
  }

  .tool-card.color-accent .download-btn.md {
    color: var(--health-accent);
    border-color: var(--health-accent);
  }

  .tool-card.color-earth .download-btn.md {
    color: var(--health-earth);
    border-color: var(--health-earth);
  }

  .tool-card.color-healing .download-btn.md {
    color: var(--health-healing);
    border-color: var(--health-healing);
  }

  .tool-card.color-wisdom .download-btn.md {
    color: var(--health-wisdom);
    border-color: var(--health-wisdom);
  }

  .tool-card.color-community .download-btn.md {
    color: var(--health-community);
    border-color: var(--health-community);
  }
  
  .download-btn:hover {
    transform: translateY(-1px);
  }
  
  .icon {
    margin-left: 0.5rem;
  }
  
  /* Feedback Card */
  .feedback-card {
    background-color: rgba(124, 58, 237, 0.1);
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    border-left: 4px solid var(--health-wisdom);
  }
  
  .feedback-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--health-wisdom);
  }
  
  .feedback-card p {
    color: #4b5563;
    margin-bottom: 1rem;
  }
  
  .contact-link {
    color: var(--health-community);
    text-decoration: underline;
    font-weight: 500;
  }
  
  .contact-link:hover {
    color: var(--health-earth);
  }
  
  /* Back Link */
  .back-link-bottom {
    margin-bottom: 2rem;
  }
  
  .back-link-bottom a {
    display: inline-flex;
    align-items: center;
    color: var(--health-secondary);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }
  
  .back-link-bottom a:hover {
    color: var(--health-primary);
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
    color: var(--health-primary);
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
    color: var(--health-primary);
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s;
  }

  .lang-button:hover {
    background-color: rgba(103, 232, 249, 0.1);
    border-color: var(--health-secondary);
  }

  .lang-button.active {
    background-color: var(--health-primary);
    color: white;
    border-color: var(--health-primary);
  }
  
  /* Responsive styles */
  @media (min-width: 768px) {
    .tools-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 640px) {
    .hero h1 {
      font-size: 2rem;
    }
    
    .hero p {
      font-size: 1.125rem;
    }
    
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
    
    .language-buttons {
      flex-direction: column;
    }
    
    .lang-button {
      width: 100%;
      text-align: center;
    }
  }

  /* Special styling for health-specific elements */
  .content-wrapper {
    position: relative;
  }

  /* Add health-inspired decorative elements */
  .section-title::before {
    content: "🩺";
    margin-right: 0.5rem;
    opacity: 0.7;
  }

  /* Enhance the starter kit card with additional visual elements */
  .starter-kit-card::before {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background: linear-gradient(45deg, var(--health-primary), var(--health-secondary), var(--health-accent));
    border-radius: 0.75rem;
    z-index: -1;
    opacity: 0.1;
  }

  .starter-kit-card {
    position: relative;
  }

  /* Add hover effects for tool cards */
  .tool-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(30, 58, 138, 0.15);
  }

  /* Color-coded borders that intensify on hover */
  .tool-card.color-primary:hover {
    border-left-width: 6px;
    border-left-color: var(--health-primary);
  }

  .tool-card.color-secondary:hover {
    border-left-width: 6px;
    border-left-color: var(--health-secondary);
  }

  .tool-card.color-accent:hover {
    border-left-width: 6px;
    border-left-color: var(--health-accent);
  }

  .tool-card.color-earth:hover {
    border-left-width: 6px;
    border-left-color: var(--health-earth);
  }

  .tool-card.color-healing:hover {
    border-left-width: 6px;
    border-left-color: var(--health-healing);
  }

  .tool-card.color-wisdom:hover {
    border-left-width: 6px;
    border-left-color: var(--health-wisdom);
  }

  .tool-card.color-community:hover {
    border-left-width: 6px;
    border-left-color: var(--health-community);
  }

  /* Loading states for download buttons */
  .download-btn:active {
    transform: translateY(0);
  }

  /* Focus states for accessibility */
  .download-btn:focus,
  .primary-btn:focus,
  .lang-button:focus {
    outline: 2px solid var(--health-accent);
    outline-offset: 2px;
  }

  /* Print-friendly styles */
  @media print {
    .hero {
      background: var(--health-primary) !important;
      -webkit-print-color-adjust: exact;
    }
    
    .tool-card {
      break-inside: avoid;
      margin-bottom: 1rem;
    }
    
    .download-btn,
    .primary-btn {
      display: none;
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .tool-card {
      border: 2px solid;
    }
    
    .download-btn.md {
      border-width: 2px;
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .tool-card,
    .download-btn,
    .primary-btn,
    .lang-button {
      transition: none;
    }
    
    .tool-card:hover {
      transform: none;
    }
  }

  /* Health-specific visual enhancements */
  
  /* Different section icons for health themes */
  .section-title:nth-of-type(2)::before { content: "🏛️"; } /* Core Governance */
  .section-title:nth-of-type(4)::before { content: "💻"; } /* Technology */
  .section-title:nth-of-type(6)::before { content: "👥"; } /* Community */
  .section-title:nth-of-type(8)::before { content: "💰"; } /* Financing */
  .section-title:nth-of-type(10)::before { content: "🚨"; } /* Preparedness */

  /* Subtle health-themed gradients for different tool categories */
  .tool-card.color-primary {
    background: linear-gradient(135deg, #f9fafb 0%, rgba(30, 58, 138, 0.03) 100%);
  }

  .tool-card.color-secondary {
    background: linear-gradient(135deg, #f9fafb 0%, rgba(5, 150, 105, 0.03) 100%);
  }

  .tool-card.color-accent {
    background: linear-gradient(135deg, #f9fafb 0%, rgba(8, 145, 178, 0.03) 100%);
  }

  .tool-card.color-earth {
    background: linear-gradient(135deg, #f9fafb 0%, rgba(146, 64, 14, 0.03) 100%);
  }

  .tool-card.color-healing {
    background: linear-gradient(135deg, #f9fafb 0%, rgba(16, 185, 129, 0.03) 100%);
  }

  .tool-card.color-wisdom {
    background: linear-gradient(135deg, #f9fafb 0%, rgba(124, 58, 237, 0.03) 100%);
  }

  .tool-card.color-community {
    background: linear-gradient(135deg, #f9fafb 0%, rgba(245, 158, 11, 0.03) 100%);
  }

  /* Enhanced feedback card styling */
  .feedback-card {
    background: linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(124, 58, 237, 0.05) 100%);
    border: 1px solid rgba(124, 58, 237, 0.2);
  }

  /* Health-themed link styling in feedback card */
  .feedback-card .contact-link {
    background: linear-gradient(135deg, var(--health-community), var(--health-earth));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-decoration-color: var(--health-community);
  }

  /* Enhanced starter kit card styling */
  .starter-kit-card {
    background: linear-gradient(135deg, rgba(103, 232, 249, 0.15) 0%, rgba(5, 150, 105, 0.1) 50%, rgba(30, 58, 138, 0.05) 100%);
    border: 1px solid rgba(30, 58, 138, 0.3);
  }
</style>
