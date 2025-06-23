<!-- src/routes/frameworks/tools/aging-population-support-governance/+page.svelte -->
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
      return `${base}/frameworks/tools/aging-population-support-governance/${toolName}`;
    }
    
    // For potentially translated documents
    if (toolName.includes('aging-framework-essentials') || toolName === 'elder-leadership-starter-kit.zip') {
      // Special case for main guides
      if (toolName === 'aging-framework-essentials.pdf' || toolName === 'aging-framework-essentials.md') {
        const langSuffix = currentLocale === 'sv' ? '-sv' : '-en';
        return `${base}/frameworks/tools/aging-population-support-governance/aging-framework-essentials${langSuffix}.${toolName.split('.').pop()}`;
      } else {
        // For other translated documents
        const extension = toolName.split('.').pop();
        const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
        return `${base}/frameworks/tools/aging-population-support-governance/${baseName}-${currentLocale}.${extension}`;
      }
    }
    
    // For tools that might have language variations
    const toolsWithTranslations = [
      'elder-readiness-assessment',
      'aubi-pilot-template', 
      'elder-political-organizing-toolkit',
      'technology-governance-charter',
      'elder-wellbeing-index-calculator',
      'climate-wisdom-documentation-kit',
      'ageism-interruption-training-guide',
      'aging-rights-charter',
      'elder-economic-zone-toolkit',
      'aubi-economic-modeling-tool',
      'mutual-care-network-setup-guide',
      'elder-innovation-hub-playbook',
      'intergenerational-program-templates'
    ];
    
    if (toolsWithTranslations.includes(toolName.split('.')[0])) {
      const extension = toolName.split('.').pop();
      const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
      return `${base}/frameworks/tools/aging-population-support-governance/${baseName}-${currentLocale}.${extension}`;
    }
    
    // Default path for other files
    return `${base}/frameworks/tools/aging-population-support-governance/${toolName}`;
  };

  // Helper function for language button styles
  function getLanguageButtonStyle(lang) {
    const isActive = currentLocale === lang;
    return isActive ? 'lang-button active' : 'lang-button';
  }

  // Translations for this page
  const translations = {
    en: {
      title: "Aging Population Support Framework Tools",
      subtitle: "Practical resources to implement elder-led aging transformation worldwide",
      intro: "These tools and templates are designed to help you implement the Aging Population Support Framework in various contexts. From establishing AUBI pilots to creating elder innovation hubs and building political coalitions, these resources provide step-by-step guidance for transforming aging systems through elder agency and wisdom.",
      startKitTitle: "Elder Leadership Starter Kit",
      startKitDesc: "A complete package with everything you need to launch an elder-led transformation initiative. Includes all essential tools and templates for AUBI pilots, innovation hubs, and political organizing.",
      startKitButton: "Download Complete Starter Kit",
      coreTitle: "Core Implementation Tools",
      coreDesc: "Essential tools for implementing key components of the aging support framework, from AUBI pilots to elder cooperatives and wellbeing assessment.",
      advocacyTitle: "Advocacy & Scaling Tools",
      advocacyDesc: "Resources for building political power, preventing ageism, and scaling elder-led initiatives to regional and national levels.",
      agencyTitle: "Elder Agency & Innovation Tools",
      agencyDesc: "Tools for empowering elders as leaders, innovators, and community builders through mutual care networks and innovation hubs.",
      guidesTitle: "Framework Guides",
      guidesDesc: "Accessible guides to help you understand and share the Aging Population Support Framework with diverse audiences.",
      requestTitle: "Request Tools or Provide Feedback",
      requestDesc: "Need implementation resources for a specific community? Have suggestions for elder-led improvements? We welcome your input to make these tools more useful.",
      contactLink: "Contact us",
      languagesTitle: "Available Languages",
      downloadPDF: "Download PDF",
      downloadMarkdown: "Download Markdown",
      backToTools: "Back to Tools Overview",
      // Tool titles
      elderReadinessTitle: "Elder Community Readiness Assessment",
      elderReadinessDesc: "Comprehensive assessment tool for communities considering aging framework implementation with elder-led evaluation criteria.",
      aubiPilotTitle: "AUBI Pilot Design Template",
      aubiPilotDesc: "Complete template for designing community AUBI pilot programs with contribution recognition and democratic governance.",
      politicalOrgTitle: "Elder Political Organizing Toolkit",
      politicalOrgDesc: "Strategic guide for building elder political power through voting coalitions, candidate development, and policy advocacy.",
      techGovernanceTitle: "Technology Governance Charter Template",
      techGovernanceDesc: "Framework for elder-led technology oversight ensuring digital dignity and elder data sovereignty.",
      wellbeingIndexTitle: "Elder Wellbeing Index Calculator",
      wellbeingIndexDesc: "Assessment system measuring Purpose, Connection, Agency, and Wisdom Utilization with elder community control.",
      climateWisdomTitle: "Climate Wisdom Documentation Kit",
      climateWisdomDesc: "Tools for systematically recording and integrating elder environmental knowledge into climate adaptation planning.",
      ageismTrainingTitle: "Ageism Interruption Training Guide",
      ageismTrainingDesc: "Comprehensive program for recognizing and countering age discrimination in workplaces and communities.",
      rightsCharterTitle: "Rights of Aging Beings Charter Template",
      rightsCharterDesc: "Model charter establishing fundamental rights for aging populations with enforcement mechanisms.",
      economicZoneTitle: "Elder Economic Zone Planning Toolkit",
      economicZoneDesc: "Framework for creating special economic zones that incentivize age-friendly business and elder innovation.",
      economicModelTitle: "AUBI Economic Modeling Tool",
      economicModelDesc: "Comprehensive economic analysis tool demonstrating AUBI financial sustainability and community returns.",
      mutualCareTitle: "Mutual Care Network Setup Guide",
      mutualCareDesc: "Framework for elder-led care cooperatives providing democratic, community-controlled care systems.",
      innovationHubTitle: "Elder Innovation Hub Playbook",
      innovationHubDesc: "Complete guide for establishing spaces where elders prototype solutions using their expertise and wisdom.",
      intergenerationalTitle: "Intergenerational Program Templates",
      intergenerationalDesc: "Structured programs connecting elders with younger generations for mutual learning and community building.",
      frameworkEssentialsTitle: "Aging Framework Essentials",
      frameworkEssentialsDesc: "Comprehensive yet accessible guide explaining the framework's core principles and elder-led transformation pathway.",
      executiveSummaryTitle: "Executive Summary",
      executiveSummaryDesc: "Strategic overview for executives and senior leaders highlighting implementation pathways and regenerative economics.",
      downloadButton: "Download"
    },
    sv: {
      title: "Verktyg för Åldrande Befolkningsstöd Ramverk",
      subtitle: "Praktiska resurser för att implementera äldreledda åldrande transformationer världen över",
      intro: "Dessa verktyg och mallar är utformade för att hjälpa dig implementera Åldrande Befolkningsstöd Ramverket i olika sammanhang. Från att etablera AUBI-piloter till att skapa äldre innovationshubbar och bygga politiska koalitioner, ger dessa resurser steg-för-steg-vägledning för att omvandla åldrande system genom äldre myndighet och visdom.",
      startKitTitle: "Äldre Ledarskap Startpaket",
      startKitDesc: "Ett komplett paket med allt du behöver för att starta ett äldrelett transformationsinitiativ. Inkluderar alla nödvändiga verktyg och mallar för AUBI-piloter, innovationshubbar och politisk organisering.",
      startKitButton: "Ladda ner komplett Startpaket",
      coreTitle: "Grundläggande Implementeringsverktyg",
      coreDesc: "Väsentliga verktyg för att implementera viktiga komponenter av åldrande stödramverket, från AUBI-piloter till äldrekooperativ och välbefinnandeanalys.",
      advocacyTitle: "Påverkansarbete & Skalningsverktyg",
      advocacyDesc: "Resurser för att bygga politisk makt, förhindra åldersdiskriminering och skala äldreleddainitiativ till regionala och nationella nivåer.",
      agencyTitle: "Äldre Myndighet & Innovationsverktyg",
      agencyDesc: "Verktyg för att stärka äldre som ledare, innovatörer och samhällsbyggare genom ömsesidiga vårdnätverk och innovationshubbar.",
      guidesTitle: "Ramverksguider",
      guidesDesc: "Tillgängliga guider för att hjälpa dig förstå och dela Åldrande Befolkningsstöd Ramverket med olika målgrupper.",
      requestTitle: "Begär verktyg eller ge feedback",
      requestDesc: "Behöver du implementeringsresurser för ett specifikt samhälle? Har du förslag på äldreleddaförbättringar? Vi välkomnar dina synpunkter för att göra dessa verktyg mer användbara.",
      contactLink: "Kontakta oss",
      languagesTitle: "Tillgängliga språk",
      downloadPDF: "Ladda ner PDF",
      downloadMarkdown: "Ladda ner Markdown",
      backToTools: "Tillbaka till verktygsöversikt",
      // Tool titles in Swedish
      elderReadinessTitle: "Äldre Samhälle Beredskapsanalys",
      elderReadinessDesc: "Omfattande bedömningsverktyg för samhällen som överväger åldrande ramverksimplementering med äldreleddautvärderingskriterier.",
      aubiPilotTitle: "AUBI Pilot Design Mall",
      aubiPilotDesc: "Komplett mall för att designa AUBI-pilotprogram med bidragserkännande och demokratisk styrning.",
      politicalOrgTitle: "Äldre Politisk Organisering Verktygslåda",
      politicalOrgDesc: "Strategisk guide för att bygga äldre politisk makt genom röstkoalitioner, kandidatutveckling och policyförespråkande.",
      techGovernanceTitle: "Teknikstyrning Charter Mall",
      techGovernanceDesc: "Ramverk för äldreledd teknologiövervakning som säkerställer digital värdighet och äldre datasäkerhet.",
      wellbeingIndexTitle: "Äldre Välbefinnande Index Kalkylator",
      wellbeingIndexDesc: "Bedömningssystem som mäter Syfte, Koppling, Myndighet och Visdomsanvändning med äldre samhällskontroll.",
      climateWisdomTitle: "Klimatvisdom Dokumentationskit",
      climateWisdomDesc: "Verktyg för systematisk registrering och integrering av äldre miljökunskap i klimatanpassningsplanering.",
      downloadButton: "Ladda ner"
    }
  };

  // Get current translations based on active locale
  $: texts = translations[currentLocale] || translations.en;
  
  // Tool data for each section
  const coreTools = [
    { id: 'elder-readiness-assessment', color: 'color-primary' },
    { id: 'aubi-pilot-template', color: 'color-gold' },
    { id: 'elder-political-organizing-toolkit', color: 'color-secondary' },
    { id: 'technology-governance-charter', color: 'color-innovation' },
    { id: 'elder-wellbeing-index-calculator', color: 'color-accent' },
    { id: 'climate-wisdom-documentation-kit', color: 'color-wisdom' }
  ];

  const advocacyTools = [
    { id: 'ageism-interruption-training-guide', color: 'color-care' },
    { id: 'aging-rights-charter', color: 'color-primary' },
    { id: 'elder-economic-zone-toolkit', color: 'color-gold' },
    { id: 'aubi-economic-modeling-tool', color: 'color-secondary' }
  ];

  const agencyTools = [
    { id: 'mutual-care-network-setup-guide', color: 'color-care' },
    { id: 'elder-innovation-hub-playbook', color: 'color-innovation' },
    { id: 'intergenerational-program-templates', color: 'color-accent' }
  ];

  const toolNameToTranslationKey = {
    'elder-readiness-assessment': 'elderReadiness',
    'aubi-pilot-template': 'aubiPilot',
    'elder-political-organizing-toolkit': 'politicalOrg',
    'technology-governance-charter': 'techGovernance',
    'elder-wellbeing-index-calculator': 'wellbeingIndex',
    'climate-wisdom-documentation-kit': 'climateWisdom',
    'ageism-interruption-training-guide': 'ageismTraining',
    'aging-rights-charter': 'rightsCharter',
    'elder-economic-zone-toolkit': 'economicZone',
    'aubi-economic-modeling-tool': 'economicModel',
    'mutual-care-network-setup-guide': 'mutualCare',
    'elder-innovation-hub-playbook': 'innovationHub',
    'intergenerational-program-templates': 'intergenerational'
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

      <!-- Start with the Elder Leadership Starter Kit -->
      <div class="start-kit-card">
        <div class="card-content">
          <div class="card-icon">🌱</div>
          <div class="card-text">
            <h2>{texts.startKitTitle}</h2>
            <p>{texts.startKitDesc}</p>
          </div>
          <div class="card-actions">
            <a href={getFilePath(`elder-leadership-starter-kit-${currentLocale}.zip`)} download class="primary-btn">
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
        <!-- Aging Framework Essentials -->
        <div class="tool-card color-primary">
          <h3>{texts.frameworkEssentialsTitle}</h3>
          <p>{texts.frameworkEssentialsDesc}</p>
          <div class="tool-actions">
            <a href={getFilePath(`aging-framework-essentials-${currentLocale}.pdf`)} download class="download-btn pdf">
              {texts.downloadPDF}
              <span class="icon">↓</span>
            </a>
            <a href={getFilePath(`aging-framework-essentials-${currentLocale}.md`)} download class="download-btn md">
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
            </div>
          </div>
        {/each}
      </div>

      <!-- Elder Agency & Innovation Tools -->
      <h2 class="section-title">{texts.agencyTitle}</h2>
      <p class="section-desc">{texts.agencyDesc}</p>
      
      <div class="tools-grid">
        {#each agencyTools as tool}
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
  /* Aging Population Support Framework color scheme - dignity browns, wisdom greens, vitality golds */
  :root {
    --aging-primary: #7c2d12; /* Warm Brown - dignity, grounding, elder wisdom */
    --aging-secondary: #059669; /* Emerald Green - vitality, growth, regenerative economics */
    --aging-accent: #b45309; /* Amber Brown - warmth, community, meaningful occupation */
    --aging-wisdom: #365314; /* Forest Green - deep knowledge, environmental wisdom, sustainability */
    --aging-light: #84cc16; /* Lime Green - accessibility, renewal, innovation */
    --aging-gold: #eab308; /* Golden Yellow - value, contribution, elder agency */
    --aging-earth: #451a03; /* Deep Brown - roots, stability, cultural heritage */
    --aging-care: #dc2626; /* Warm Red - care, protection, health systems */
    --aging-innovation: #0891b2; /* Cyan - innovation, technology, future thinking */
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
    background: linear-gradient(135deg, var(--aging-primary) 0%, var(--aging-secondary) 100%);
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
    color: var(--aging-secondary);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: var(--aging-primary);
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
    color: var(--aging-primary);
  }
  
  .section-desc {
    margin-bottom: 2rem;
    color: #4b5563;
    line-height: 1.7;
    font-size: 1.125rem;
  }
  
  /* Start Kit Card */
  .start-kit-card {
    background: linear-gradient(135deg, rgba(5, 150, 105, 0.1) 0%, rgba(124, 45, 18, 0.1) 100%);
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(124, 45, 18, 0.1);
    border: 1px solid rgba(124, 45, 18, 0.2);
  }
  
  .card-content {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
  }
  
  .card-icon {
    font-size: 2.5rem;
    color: var(--aging-primary);
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--aging-primary);
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
  
  /* Color Variations for Aging Framework */
  .color-primary {
    border-left-color: var(--aging-primary);
  }
  
  .color-primary h3 {
    color: var(--aging-primary);
  }
  
  .color-secondary {
    border-left-color: var(--aging-secondary);
  }
  
  .color-secondary h3 {
    color: var(--aging-secondary);
  }
  
  .color-accent {
    border-left-color: var(--aging-accent);
  }
  
  .color-accent h3 {
    color: var(--aging-accent);
  }
  
  .color-wisdom {
    border-left-color: var(--aging-wisdom);
  }
  
  .color-wisdom h3 {
    color: var(--aging-wisdom);
  }
  
  .color-gold {
    border-left-color: var(--aging-gold);
  }
  
  .color-gold h3 {
    color: var(--aging-gold);
  }
  
  .color-care {
    border-left-color: var(--aging-care);
  }
  
  .color-care h3 {
    color: var(--aging-care);
  }

  .color-innovation {
    border-left-color: var(--aging-innovation);
  }
  
  .color-innovation h3 {
    color: var(--aging-innovation);
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
    background-color: var(--aging-primary);
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
    background-color: var(--aging-secondary);
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
    background-color: var(--aging-primary);
  }

  .tool-card.color-secondary .download-btn.pdf {
    background-color: var(--aging-secondary);
  }

  .tool-card.color-accent .download-btn.pdf {
    background-color: var(--aging-accent);
  }

  .tool-card.color-wisdom .download-btn.pdf {
    background-color: var(--aging-wisdom);
  }

  .tool-card.color-gold .download-btn.pdf {
    background-color: var(--aging-gold);
  }

  .tool-card.color-care .download-btn.pdf {
    background-color: var(--aging-care);
  }

  .tool-card.color-innovation .download-btn.pdf {
    background-color: var(--aging-innovation);
  }

  .download-btn.md {
    background-color: white;
    border: 1px solid;
  }

  .tool-card.color-primary .download-btn.md {
    color: var(--aging-primary);
    border-color: var(--aging-primary);
  }

  .tool-card.color-secondary .download-btn.md {
    color: var(--aging-secondary);
    border-color: var(--aging-secondary);
  }

  .tool-card.color-accent .download-btn.md {
    color: var(--aging-accent);
    border-color: var(--aging-accent);
  }

  .tool-card.color-wisdom .download-btn.md {
    color: var(--aging-wisdom);
    border-color: var(--aging-wisdom);
  }

  .tool-card.color-gold .download-btn.md {
    color: var(--aging-gold);
    border-color: var(--aging-gold);
  }

  .tool-card.color-care .download-btn.md {
    color: var(--aging-care);
    border-color: var(--aging-care);
  }

  .tool-card.color-innovation .download-btn.md {
    color: var(--aging-innovation);
    border-color: var(--aging-innovation);
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
    color: var(--aging-primary);
  }

  .contact-link {
    color: var(--aging-secondary);
    text-decoration: underline;
    font-weight: 500;
  }

  .contact-link:hover {
    color: var(--aging-primary);
  }
 
  /* Back Link Bottom */
  .back-link-bottom {
    margin: 2rem 0;
    text-align: center;
  }

  .back-link-bottom a {
    display: inline-flex;
    align-items: center;
    color: var(--aging-secondary);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .back-link-bottom a:hover {
    color: var(--aging-primary);
  }
 
  /* Language Section */
  .language-section {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid #e5e7eb;
  }

  .language-section h3 {
    margin-bottom: 1rem;
    color: var(--aging-primary);
  }
 
  .language-buttons {
    display: flex;
    gap: 0.5rem;
  }
 
  .lang-button {
    padding: 0.5rem 1rem;
    border: 1px solid var(--aging-secondary);
    background-color: white;
    color: var(--aging-secondary);
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;
  }

  .lang-button:hover {
    background-color: rgba(5, 150, 105, 0.1);
  }
 
  .lang-button.active {
    background-color: var(--aging-primary);
    color: white;
    border-color: var(--aging-primary);
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
