<!-- src/routes/frameworks/tools/animal-welfare-governance/+page.svelte -->
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
      return `${base}/frameworks/tools/animal-welfare-governance/${toolName}`;
    }
    
    // For potentially translated documents
    if (toolName.includes('global-guardian-framework-essentials') || toolName === 'guardian-community-starter-kit.zip') {
      // Special case for main guides
      if (toolName === 'global-guardian-framework-essentials.pdf' || toolName === 'global-guardian-framework-essentials.md') {
        const langSuffix = currentLocale === 'sv' ? '-sv' : '-en';
        return `${base}/frameworks/tools/animal-welfare-governance/global-guardian-framework-essentials${langSuffix}.${toolName.split('.').pop()}`;
      } else {
        // For other translated documents
        const extension = toolName.split('.').pop();
        const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
        return `${base}/frameworks/tools/animal-welfare-governance/${baseName}-${currentLocale}.${extension}`;
      }
    }
    
    // For tools that might have language variations
    const toolsWithTranslations = [
      'community-welfare-readiness-assessment',
      'welfare-transition-planning-template', 
      'cultural-adaptation-protocol-guide',
      'sentience-assessment-framework',
      'welfare-compliance-audit-tool',
      'indigenous-rights-integration-kit',
      'welfare-policy-development-guide',
      'anti-speciesism-training-materials',
      'guardian-rights-charter-template',
      'economic-impact-assessment',
      'stakeholder-engagement-framework',
      'alternative-protein-development-guide',
      'welfare-technology-assessment-kit',
      'citizen-science-monitoring-app',
      'blockchain-certification-setup-guide',
      'just-transition-planning-workbook',
      'animal-welfare-carbon-credits-guide',
      'cooperative-development-toolkit',
      'innovation-challenge-fund-kit',
      'welfare-impact-measurement-framework',
      'transparency-dashboard-setup-guide',
      'community-progress-tracking-templates'
    ];
    
    if (toolsWithTranslations.includes(toolName.split('.')[0])) {
      const extension = toolName.split('.').pop();
      const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
      return `${base}/frameworks/tools/animal-welfare-governance/${baseName}-${currentLocale}.${extension}`;
    }
    
    // Default path for other files
    return `${base}/frameworks/tools/animal-welfare-governance/${toolName}`;
  };

  // Helper function for language button styles
  function getLanguageButtonStyle(lang) {
    const isActive = currentLocale === lang;
    return isActive ? 'lang-button active' : 'lang-button';
  }

  // Translations for this page
  const translations = {
    en: {
      title: "Global Guardian Framework Tools",
      subtitle: "Practical resources to implement animal welfare transformation through community-led guardianship",
      intro: "These tools and templates are designed to help you implement the Global Guardian Framework in various contexts. From establishing community welfare assessments to creating guardian rights charters and building alternative protein transitions, these resources provide step-by-step guidance for transforming animal welfare systems through guardianship rather than ownership.",
      startKitTitle: "Guardian Community Starter Kit",
      startKitDesc: "A complete package with everything you need to launch a community-led animal welfare transformation initiative. Includes all essential tools and templates for welfare assessments, transition planning, and guardian organizing.",
      startKitButton: "Download Complete Starter Kit",
      coreTitle: "Core Implementation Tools",
      coreDesc: "Essential tools for implementing key components of the animal welfare framework, from community readiness assessments to welfare compliance auditing and Indigenous rights integration.",
      advocacyTitle: "Advocacy & Policy Tools",
      advocacyDesc: "Resources for building guardian movements, developing welfare policy, and preventing speciesism through rights-based approaches and stakeholder engagement.",
      innovationTitle: "Innovation & Technology Tools",
      innovationDesc: "Tools for implementing welfare technology, developing alternative proteins, and creating transparent monitoring systems through blockchain and citizen science.",
      economicTitle: "Economic Transition Tools",
      economicDesc: "Resources for just transitions, cooperative development, and creating welfare-linked economic mechanisms like carbon credits and impact measurement.",
      monitoringTitle: "Monitoring & Evaluation Tools",
      monitoringDesc: "Systems for measuring welfare impacts, tracking community progress, and creating transparent accountability through dashboard systems.",
      guidesTitle: "Framework Guides",
      guidesDesc: "Accessible guides to help you understand and share the Global Guardian Framework with diverse audiences including executives and communities.",
      requestTitle: "Request Tools or Provide Feedback",
      requestDesc: "Need implementation resources for a specific community? Have suggestions for guardian-led improvements? We welcome your input to make these tools more useful.",
      contactLink: "Contact us",
      languagesTitle: "Available Languages",
      downloadPDF: "Download PDF",
      downloadMarkdown: "Download Markdown",
      backToTools: "Back to Tools Overview",
      // Tool titles
      communityReadinessTitle: "Community Welfare Readiness Assessment",
      communityReadinessDesc: "Comprehensive assessment tool for communities considering animal welfare framework implementation with guardian-led evaluation criteria.",
      transitionPlanningTitle: "Welfare Transition Planning Template",
      transitionPlanningDesc: "Complete template for designing community-based transitions from exploitation to guardianship with democratic governance.",
      culturalAdaptationTitle: "Cultural Adaptation Protocol Guide",
      culturalAdaptationDesc: "Framework for adapting welfare implementation to respect traditional practices while advancing sentience protection.",
      sentienceAssessmentTitle: "Sentience Assessment Framework",
      sentienceAssessmentDesc: "Scientific protocol for evaluating sentience evidence with community participation and precautionary principles.",
      complianceAuditTitle: "Welfare Compliance Audit Tool",
      complianceAuditDesc: "Assessment system for monitoring welfare standards with independent verification and community oversight.",
      indigenousRightsTitle: "Indigenous Rights Integration Kit",
      indigenousRightsDesc: "Tools for ensuring Indigenous sovereignty and traditional knowledge protection in welfare implementation.",
      policyDevelopmentTitle: "Welfare Policy Development Guide",
      policyDevelopmentDesc: "Strategic guide for developing welfare legislation and regulations with community participation and rights-based approaches.",
      antiSpeciesismTitle: "Anti-Speciesism Training Materials",
      antiSpeciesismDesc: "Comprehensive program for recognizing and countering species discrimination in institutions and communities.",
      rightsCharterTitle: "Guardian Rights Charter Template",
      rightsCharterDesc: "Model charter establishing fundamental rights for sentient beings with enforcement mechanisms and community governance.",
      economicImpactTitle: "Economic Impact Assessment Tool",
      economicImpactDesc: "Analytical framework for evaluating economic impacts of welfare policies with distributional justice analysis.",
      stakeholderEngagementTitle: "Stakeholder Engagement Framework",
      stakeholderEngagementDesc: "Structured approach for engaging diverse stakeholders in welfare transformation with conflict resolution protocols.",
      alternativeProteinTitle: "Alternative Protein Development Guide",
      alternativeProteinDesc: "Comprehensive resource for developing plant-based, cultured, and novel protein alternatives to animal agriculture.",
      technologyAssessmentTitle: "Welfare Technology Assessment Kit",
      technologyAssessmentDesc: "Evaluation tool for welfare monitoring technology including AI systems, blockchain, and citizen science platforms.",
      citizenScienceTitle: "Citizen Science Monitoring App",
      citizenScienceDesc: "Mobile platform enabling public participation in welfare monitoring with expert validation and community empowerment.",
      blockchainSetupTitle: "Blockchain Certification Setup Guide",
      blockchainSetupDesc: "Technical guide for implementing blockchain-based welfare certification with transparent supply chain tracking.",
      justTransitionTitle: "Just Transition Planning Workbook",
      justTransitionDesc: "Comprehensive workbook for economic transition planning with worker retraining and community ownership models.",
      carbonCreditsTitle: "Animal Welfare Carbon Credits Guide",
      carbonCreditsDesc: "Implementation guide for welfare-linked carbon credit programs with environmental and animal welfare co-benefits.",
      cooperativeDevTitle: "Cooperative Development Toolkit",
      cooperativeDevDesc: "Framework for creating worker-owned alternatives to industrial animal agriculture through democratic governance.",
      innovationFundTitle: "Innovation Challenge Fund Application Kit",
      innovationFundDesc: "Resources for accessing funding for welfare innovations including technology development and alternative proteins.",
      impactMeasurementTitle: "Welfare Impact Measurement Framework",
      impactMeasurementDesc: "Comprehensive system for measuring welfare outcomes with community participation and scientific validation.",
      dashboardSetupTitle: "Transparency Dashboard Setup Guide",
      dashboardSetupDesc: "Technical specifications for public transparency platforms with real-time welfare monitoring and accountability.",
      progressTrackingTitle: "Community Progress Tracking Templates",
      progressTrackingDesc: "Structured templates for communities to monitor their own welfare transformation progress with adaptive management.",
      frameworkEssentialsTitle: "Global Guardian Framework Essentials",
      frameworkEssentialsDesc: "Comprehensive yet accessible guide explaining the framework's core principles and community-led transformation pathway.",
      executiveSummaryTitle: "Executive Summary",
      executiveSummaryDesc: "Strategic overview for executives and senior leaders highlighting implementation pathways and economic co-benefits.",
      downloadButton: "Download"
    },
    sv: {
      title: "Global Guardian Ramverk Verktyg",
      subtitle: "Praktiska resurser för att implementera djurvälfärdstransformation genom samhällslett förmyndarskap",
      intro: "Dessa verktyg och mallar är utformade för att hjälpa dig implementera Global Guardian Ramverket i olika sammanhang. Från att etablera samhällsvälfärdsbedömningar till att skapa förmyndarrättsförklaringar och bygga alternativa proteinövergångar, ger dessa resurser steg-för-steg-vägledning för att omvandla djurvälfärdssystem genom förmyndarskap snarare än ägande.",
      startKitTitle: "Guardian Samhälle Startpaket",
      startKitDesc: "Ett komplett paket med allt du behöver för att starta ett samhällslett djurvälfärdstransformationsinitiativ. Inkluderar alla nödvändiga verktyg och mallar för välfärdsbedömningar, övergångsplanering och guardian-organisering.",
      startKitButton: "Ladda ner komplett Startpaket",
      coreTitle: "Grundläggande Implementeringsverktyg",
      coreDesc: "Väsentliga verktyg för att implementera viktiga komponenter av djurvälfärdsramverket, från samhällsberedskapsbedömningar till välfärdsefterlevnadsrevision och ursprungsfolksrättsintegration.",
      advocacyTitle: "Påverkansarbete & Policyverktyg",
      advocacyDesc: "Resurser för att bygga guardian-rörelser, utveckla välfärdspolicy och förhindra speciesism genom rättsbaserade tillvägagångssätt och intressentengagemang.",
      innovationTitle: "Innovation & Teknikverktyg",
      innovationDesc: "Verktyg för att implementera välfärdsteknologi, utveckla alternativa proteiner och skapa transparenta övervakningssystem genom blockchain och medborgarvetenskap.",
      economicTitle: "Ekonomisk Övergångsverktyg",
      economicDesc: "Resurser för rättvisa övergångar, kooperativutveckling och skapande av välfärdslänkade ekonomiska mekanismer som koldioxidkrediter och effektmätning.",
      monitoringTitle: "Övervakning & Utvärderingsverktyg",
      monitoringDesc: "System för att mäta välfärdseffekter, spåra samhällsframsteg och skapa transparent ansvarsskyldighet genom dashboard-system.",
      guidesTitle: "Ramverksguider",
      guidesDesc: "Tillgängliga guider för att hjälpa dig förstå och dela Global Guardian Ramverket med olika målgrupper inklusive chefer och samhällen.",
      requestTitle: "Begär verktyg eller ge feedback",
      requestDesc: "Behöver du implementeringsresurser för ett specifikt samhälle? Har du förslag på guardian-leddaförbättringar? Vi välkomnar dina synpunkter för att göra dessa verktyg mer användbara.",
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
    { id: 'community-welfare-readiness-assessment', color: 'color-primary' },
    { id: 'welfare-transition-planning-template', color: 'color-secondary' },
    { id: 'cultural-adaptation-protocol-guide', color: 'color-gold' },
    { id: 'sentience-assessment-framework', color: 'color-accent' },
    { id: 'welfare-compliance-audit-tool', color: 'color-sanctuary' },
    { id: 'indigenous-rights-integration-kit', color: 'color-earth' }
  ];

  const advocacyTools = [
    { id: 'welfare-policy-development-guide', color: 'color-primary' },
    { id: 'anti-speciesism-training-materials', color: 'color-compassion' },
    { id: 'guardian-rights-charter-template', color: 'color-secondary' },
    { id: 'economic-impact-assessment', color: 'color-gold' },
    { id: 'stakeholder-engagement-framework', color: 'color-light' }
  ];

  const innovationTools = [
    { id: 'alternative-protein-development-guide', color: 'color-secondary' },
    { id: 'welfare-technology-assessment-kit', color: 'color-sanctuary' },
    { id: 'citizen-science-monitoring-app', color: 'color-accent' },
    { id: 'blockchain-certification-setup-guide', color: 'color-primary' }
  ];

  const economicTools = [
    { id: 'just-transition-planning-workbook', color: 'color-compassion' },
    { id: 'animal-welfare-carbon-credits-guide', color: 'color-secondary' },
    { id: 'cooperative-development-toolkit', color: 'color-gold' },
    { id: 'innovation-challenge-fund-kit', color: 'color-sanctuary' }
  ];

  const monitoringTools = [
    { id: 'welfare-impact-measurement-framework', color: 'color-primary' },
    { id: 'transparency-dashboard-setup-guide', color: 'color-light' },
    { id: 'community-progress-tracking-templates', color: 'color-secondary' }
  ];

  const toolNameToTranslationKey = {
    'community-welfare-readiness-assessment': 'communityReadiness',
    'welfare-transition-planning-template': 'transitionPlanning',
    'cultural-adaptation-protocol-guide': 'culturalAdaptation',
    'sentience-assessment-framework': 'sentienceAssessment',
    'welfare-compliance-audit-tool': 'complianceAudit',
    'indigenous-rights-integration-kit': 'indigenousRights',
    'welfare-policy-development-guide': 'policyDevelopment',
    'anti-speciesism-training-materials': 'antiSpeciesism',
    'guardian-rights-charter-template': 'rightsCharter',
    'economic-impact-assessment': 'economicImpact',
    'stakeholder-engagement-framework': 'stakeholderEngagement',
    'alternative-protein-development-guide': 'alternativeProtein',
    'welfare-technology-assessment-kit': 'technologyAssessment',
    'citizen-science-monitoring-app': 'citizenScience',
    'blockchain-certification-setup-guide': 'blockchainSetup',
    'just-transition-planning-workbook': 'justTransition',
    'animal-welfare-carbon-credits-guide': 'carbonCredits',
    'cooperative-development-toolkit': 'cooperativeDev',
    'innovation-challenge-fund-kit': 'innovationFund',
    'welfare-impact-measurement-framework': 'impactMeasurement',
    'transparency-dashboard-setup-guide': 'dashboardSetup',
    'community-progress-tracking-templates': 'progressTracking'
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

      <!-- Start with the Guardian Community Starter Kit -->
      <div class="start-kit-card">
        <div class="card-content">
          <div class="card-icon">🐾</div>
          <div class="card-text">
            <h2>{texts.startKitTitle}</h2>
            <p>{texts.startKitDesc}</p>
          </div>
          <div class="card-actions">
            <a href={getFilePath(`guardian-community-starter-kit-${currentLocale}.zip`)} download class="primary-btn">
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
        <!-- Global Guardian Framework Essentials -->
        <div class="tool-card color-primary">
          <h3>{texts.frameworkEssentialsTitle}</h3>
          <p>{texts.frameworkEssentialsDesc}</p>
          <div class="tool-actions">
            <a href={getFilePath(`global-guardian-framework-essentials-${currentLocale}.pdf`)} download class="download-btn pdf">
              {texts.downloadPDF}
              <span class="icon">↓</span>
            </a>
            <a href={getFilePath(`global-guardian-framework-essentials-${currentLocale}.md`)} download class="download-btn md">
              {texts.downloadMarkdown}
              <span class="icon">↓</span>
            </a>
          </div>
        </div>
        
        <!-- Executive Summary -->
        <div class="tool-card color-secondary">
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
      </div>
      
      <!-- Core Implementation Tools -->
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

      <!-- Advocacy & Policy Tools -->
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
            </div>
          </div>
        {/each}
      </div>

      <!-- Innovation & Technology Tools -->
      <h2 class="section-title">{texts.innovationTitle}</h2>
      <p class="section-desc">{texts.innovationDesc}</p>
      
      <div class="tools-grid">
        {#each innovationTools as tool}
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

      <!-- Economic Transition Tools -->
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

      <!-- Monitoring & Evaluation Tools -->
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
  /* Global Guardian Framework color scheme - compassion, guardianship, and environmental harmony */
  :root {
    --guardian-primary: #1e40af; /* Deep Blue - trust, protection, guardianship */
    --guardian-secondary: #059669; /* Emerald Green - life, nature, environmental harmony */
    --guardian-accent: #7c3aed; /* Purple - wisdom, transformation, sentience */
    --guardian-earth: #059669; /* Forest Green - ecological connection, earth stewardship */
    --guardian-compassion: #dc2626; /* Warm Red - care, compassion, protection */
    --guardian-light: #10b981; /* Teal - healing, balance, harmony */
    --guardian-gold: #f59e0b; /* Amber - hope, innovation, cultural wisdom */
    --guardian-deep: #1f2937; /* Deep Gray - stability, grounding, responsibility */
    --guardian-sanctuary: #6366f1; /* Indigo - sanctuary, safe spaces, refuge */
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
    background: linear-gradient(135deg, var(--guardian-primary) 0%, var(--guardian-secondary) 100%);
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
    color: var(--guardian-secondary);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: var(--guardian-primary);
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
    color: var(--guardian-primary);
  }
  
  .section-desc {
    margin-bottom: 2rem;
    color: #4b5563;
    line-height: 1.7;
    font-size: 1.125rem;
  }
  
  /* Start Kit Card */
  .start-kit-card {
    background: linear-gradient(135deg, rgba(5, 150, 105, 0.1) 0%, rgba(30, 64, 175, 0.1) 100%);
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(30, 64, 175, 0.1);
    border: 1px solid rgba(30, 64, 175, 0.2);
  }
  
  .card-content {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
  }
  
  .card-icon {
    font-size: 2.5rem;
    color: var(--guardian-primary);
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--guardian-primary);
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
  
  /* Color Variations for Guardian Framework */
  .color-primary {
    border-left-color: var(--guardian-primary);
  }
  
  .color-primary h3 {
    color: var(--guardian-primary);
  }
  
  .color-secondary {
    border-left-color: var(--guardian-secondary);
  }
  
  .color-secondary h3 {
    color: var(--guardian-secondary);
  }
  
  .color-accent {
    border-left-color: var(--guardian-accent);
  }
  
  .color-accent h3 {
    color: var(--guardian-accent);
  }
  
  .color-earth {
    border-left-color: var(--guardian-earth);
  }
  
  .color-earth h3 {
    color: var(--guardian-earth);
  }
  
  .color-compassion {
    border-left-color: var(--guardian-compassion);
  }
  
  .color-compassion h3 {
    color: var(--guardian-compassion);
  }
  
  .color-light {
    border-left-color: var(--guardian-light);
  }
  
  .color-light h3 {
    color: var(--guardian-light);
  }
  
  .color-gold {
    border-left-color: var(--guardian-gold);
  }
  
  .color-gold h3 {
    color: var(--guardian-gold);
  }

  .color-sanctuary {
    border-left-color: var(--guardian-sanctuary);
  }
  
  .color-sanctuary h3 {
    color: var(--guardian-sanctuary);
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
    background-color: var(--guardian-primary);
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
    background-color: var(--guardian-secondary);
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
    background-color: var(--guardian-primary);
  }

  .tool-card.color-secondary .download-btn.pdf {
    background-color: var(--guardian-secondary);
  }

  .tool-card.color-accent .download-btn.pdf {
    background-color: var(--guardian-accent);
  }

  .tool-card.color-earth .download-btn.pdf {
    background-color: var(--guardian-earth);
  }

  .tool-card.color-compassion .download-btn.pdf {
    background-color: var(--guardian-compassion);
  }

  .tool-card.color-light .download-btn.pdf {
    background-color: var(--guardian-light);
  }

  .tool-card.color-gold .download-btn.pdf {
    background-color: var(--guardian-gold);
  }

  .tool-card.color-sanctuary .download-btn.pdf {
    background-color: var(--guardian-sanctuary);
  }

  .download-btn.md {
    background-color: white;
    border: 1px solid;
  }

  .tool-card.color-primary .download-btn.md {
    color: var(--guardian-primary);
    border-color: var(--guardian-primary);
  }

  .tool-card.color-secondary .download-btn.md {
    color: var(--guardian-secondary);
    border-color: var(--guardian-secondary);
  }

  .tool-card.color-accent .download-btn.md {
    color: var(--guardian-accent);
    border-color: var(--guardian-accent);
  }

  .tool-card.color-earth .download-btn.md {
    color: var(--guardian-earth);
    border-color: var(--guardian-earth);
  }

  .tool-card.color-compassion .download-btn.md {
    color: var(--guardian-compassion);
    border-color: var(--guardian-compassion);
  }

  .tool-card.color-light .download-btn.md {
    color: var(--guardian-light);
    border-color: var(--guardian-light);
  }

  .tool-card.color-gold .download-btn.md {
    color: var(--guardian-gold);
    border-color: var(--guardian-gold);
  }

  .tool-card.color-sanctuary .download-btn.md {
    color: var(--guardian-sanctuary);
    border-color: var(--guardian-sanctuary);
  }

  .download-btn:hover {
    transform: translateY(-1px);
  }
 
  .icon {
    margin-left: 0.5rem;
  }
 
  /* Feedback Card */
  .feedback-card {
    background-color: rgba(5, 150, 105, 0.1);
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 2rem;
    border: 1px solid rgba(5, 150, 105, 0.3);
  }

  .feedback-card h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: var(--guardian-primary);
  }

  .contact-link {
    color: var(--guardian-secondary);
    text-decoration: underline;
    font-weight: 500;
  }

  .contact-link:hover {
    color: var(--guardian-primary);
  }
 
  /* Back Link Bottom */
  .back-link-bottom {
    margin: 2rem 0;
    text-align: center;
  }

  .back-link-bottom a {
    display: inline-flex;
    align-items: center;
    color: var(--guardian-secondary);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .back-link-bottom a:hover {
    color: var(--guardian-primary);
  }
 
  /* Language Section */
  .language-section {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid #e5e7eb;
  }

  .language-section h3 {
    margin-bottom: 1rem;
    color: var(--guardian-primary);
  }
 
  .language-buttons {
    display: flex;
    gap: 0.5rem;
  }
 
  .lang-button {
    padding: 0.5rem 1rem;
    border: 1px solid var(--guardian-secondary);
    background-color: white;
    color: var(--guardian-secondary);
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;
  }

  .lang-button:hover {
    background-color: rgba(5, 150, 105, 0.1);
  }
 
  .lang-button.active {
    background-color: var(--guardian-primary);
    color: white;
    border-color: var(--guardian-primary);
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
