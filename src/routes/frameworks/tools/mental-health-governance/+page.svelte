<!-- src/routes/frameworks/tools/mental-health-governance/+page.svelte -->
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
      return `${base}/frameworks/tools/mental-health-governance/${toolName}`;
    }
    
    // For potentially translated documents
    if (toolName.includes('mental-health-framework-essentials') || toolName === 'mental-health-governance-starter-kit.zip') {
      // Special case for main guides
      if (toolName === 'mental-health-framework-essentials.pdf' || toolName === 'mental-health-framework-essentials.md') {
        const langSuffix = currentLocale === 'sv' ? '-sv' : '-en';
        return `${base}/frameworks/tools/mental-health-governance/mental-health-framework-essentials${langSuffix}.${toolName.split('.').pop()}`;
      } else {
        // For other translated documents
        const extension = toolName.split('.').pop();
        const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
        return `${base}/frameworks/tools/mental-health-governance/${baseName}-${currentLocale}.${extension}`;
      }
    }
    
    // For tools that might have language variations
    const toolsWithTranslations = [
      'path-to-compliance-checklist',
      'community-task-force-guide', 
      'cultural-adaptation-toolkit',
      'watchdog-implementation-manual',
      'traffic-light-assessment',
      'national-commission-guide',
      'rights-based-legislation-template',
      'international-treaty-roadmap',
      'youth-parliament-charter',
      'spiritual-crisis-decision-trees',
      'consciousness-development-guide',
      'consciousness-healing-protocols',
      'traditional-healing-integration-guidelines',
      'psychedelic-therapy-lab-guide',
      'commons-fund-blueprint',
      'right-to-rest-policy-guide',
      'flourishing-metrics-dashboard-spec',
      'community-monitoring-toolkit',
      'narrative-equity-review-guide',
      'transparency-dashboard-template'
    ];
    
    if (toolsWithTranslations.includes(toolName.split('.')[0])) {
      const extension = toolName.split('.').pop();
      const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
      return `${base}/frameworks/tools/mental-health-governance/${baseName}-${currentLocale}.${extension}`;
    }
    
    // Default path for other files
    return `${base}/frameworks/tools/mental-health-governance/${toolName}`;
  };

  // Helper function for language button styles
  function getLanguageButtonStyle(lang) {
    const isActive = currentLocale === lang;
    return isActive ? 'lang-button active' : 'lang-button';
  }

  // Translations for this page
  const translations = {
    en: {
      title: "Mental Health Framework Tools",
      subtitle: "Practical resources to implement community-led mental health transformation worldwide",
      intro: "These tools and templates are designed to help you implement the Living Mandala for Planetary Mental Health Framework in various contexts. From establishing community-led task forces to creating rights-based legislation and consciousness-inclusive healing protocols, these resources provide step-by-step guidance for transforming mental health systems through community sovereignty and traditional healing wisdom.",
      startKitTitle: "Mental Health Governance Starter Kit",
      startKitDesc: "A complete package with everything you need to launch a community-led mental health transformation initiative. Includes all essential tools and templates for task forces, rights-based care, and consciousness-inclusive healing.",
      startKitButton: "Download Complete Starter Kit",
      quickStartTitle: "Quick Start Implementation Tools",
      quickStartDesc: "Essential tools for rapidly implementing key components of the mental health framework, from compliance assessments to community task force establishment.",
      governanceTitle: "Governance & Policy Tools",
      governanceDesc: "Resources for building rights-based mental health governance, from national commissions to international treaty development and youth leadership.",
      clinicalTitle: "Clinical & Service Tools",
      clinicalDesc: "Tools for implementing consciousness-inclusive healing, traditional medicine integration, and community-based mental health services.",
      financingTitle: "Financing & Economics Tools",
      financingDesc: "Resources for sustainable mental health funding, economic modeling, and implementing the Global Mental Health Commons Fund.",
      monitoringTitle: "Monitoring & Evaluation Tools",
      monitoringDesc: "Tools for community-led monitoring, psychosocial flourishing metrics, and transparent accountability systems.",
      guidesTitle: "Framework Guides",
      guidesDesc: "Accessible guides to help you understand and share the Mental Health Framework with diverse audiences and communities.",
      requestTitle: "Request Tools or Provide Feedback",
      requestDesc: "Need implementation resources for a specific community? Have suggestions for community-led improvements? We welcome your input to make these tools more useful.",
      contactLink: "Contact us",
      languagesTitle: "Available Languages",
      downloadPDF: "Download PDF",
      downloadMarkdown: "Download Markdown",
      backToTools: "Back to Tools Overview",
      // Tool titles
      pathToComplianceTitle: "Path to Compliance Checklist for UHC Integration",
      pathToComplianceDesc: "Comprehensive checklist for integrating mental health into Universal Health Coverage with ≥5% budget allocation and community oversight.",
      communityTaskForceTitle: "Community-Led Task Force Setup Guide",
      communityTaskForceDesc: "Complete guide for establishing community mental health task forces with traditional healing integration and peer leadership.",
      culturalAdaptationTitle: "Cultural Adaptation Toolkit",
      culturalAdaptationDesc: "Framework for adapting mental health approaches to diverse cultural contexts while honoring traditional healing sovereignty.",
      watchdogImplementationTitle: "Mental Health Watchdog Implementation Manual",
      watchdogImplementationDesc: "Guide for establishing Global Mental Health Watchdog systems with Traffic Light compliance monitoring and community oversight.",
      trafficLightAssessmentTitle: "Traffic Light System Assessment Framework",
      trafficLightAssessmentDesc: "Assessment tool for evaluating mental health rights compliance using the Green/Yellow/Red status system with enforcement mechanisms.",
      nationalCommissionTitle: "National Mental Health Commission Formation Guide",
      nationalCommissionDesc: "Template for establishing National Mental Health Commissions with community sovereignty and traditional healing authority.",
      rightsBasedLegislationTitle: "Rights-Based Legislation Template with Sunset Clauses",
      rightsBasedLegislationDesc: "Model legislation for eliminating coercive practices and establishing community-controlled mental health rights protection.",
      internationalTreatyTitle: "International Mental Health Rights Treaty Roadmap",
      internationalTreatyDesc: "Development pathway for the International Mental Health Rights Treaty with community consultation and enforcement mechanisms.",
      youthParliamentTitle: "Youth Mental Health Parliament Charter",
      youthParliamentDesc: "Charter template for establishing Youth Mental Health Parliaments with policy-making authority and 50% Global South representation.",
      spiritualCrisisTitle: "Clinical Decision Trees for Spiritual Crises",
      spiritualCrisisDesc: "Clinical protocols for distinguishing spiritual emergencies from psychiatric crises with traditional healer consultation pathways.",
      consciousnessDevelopmentTitle: "Consciousness Development & Worldview Transition Support Guide",
      consciousnessDevelopmentDesc: "Support framework for individuals navigating consciousness development and worldview transitions with community integration.",
      consciousnessHealingTitle: "Consciousness-Inclusive Healing Protocols",
      consciousnessHealingDesc: "Clinical protocols for supporting mystical experiences, spiritual emergence, and consciousness-expanding therapies.",
      traditionalHealingTitle: "Traditional Healing Integration Guidelines",
      traditionalHealingDesc: "Framework for respectfully integrating traditional healing practices with contemporary mental health services.",
      psychedelicTherapyTitle: "Psychedelic-Assisted Therapy Lab Setup Guide",
      psychedelicTherapyDesc: "Complete guide for establishing community-controlled psychedelic therapy labs with ethical oversight and traditional healer integration.",
      commonsFundTitle: "Global Mental Health Commons Fund Blueprint",
      commonsFundDesc: "Framework for establishing and operating the Global Mental Health Commons Fund with innovative financing and community control.",
      rightToRestTitle: "Right to Rest Policy Implementation Guide",
      rightToRestDesc: "Policy framework for implementing work-time reduction and Universal Basic Services as mental health interventions.",
      flourishingMetricsTitle: "Psychosocial Flourishing Metrics Dashboard Specification",
      flourishingMetricsDesc: "Technical specification for building community-controlled dashboards measuring well-being beyond symptom reduction.",
      communityMonitoringTitle: "Community-Led Monitoring Toolkit",
      communityMonitoringDesc: "Comprehensive toolkit for communities to monitor and evaluate their own mental health transformation progress.",
      narrativeEquityTitle: "Narrative Equity Review Process Guide",
      narrativeEquityDesc: "Framework for community-led storytelling and narrative evaluation as primary assessment methodology.",
      transparencyDashboardTitle: "Transparency Dashboard Template",
      transparencyDashboardDesc: "Template for building accessible transparency dashboards with AI-assisted analysis and community control.",
      frameworkEssentialsTitle: "Mental Health Framework Essentials",
      frameworkEssentialsDesc: "Comprehensive yet accessible guide explaining the framework's core principles and community-led transformation pathway.",
      executiveSummaryTitle: "Executive Summary",
      executiveSummaryDesc: "Strategic overview for executives and senior leaders highlighting implementation pathways and community sovereignty principles.",
      downloadButton: "Download"
    },
    sv: {
      title: "Verktyg för Mental Hälsa Ramverk",
      subtitle: "Praktiska resurser för att implementera samhällsledda mental hälsa transformationer världen över",
      intro: "Dessa verktyg och mallar är utformade för att hjälpa dig implementera Levande Mandala för Planetär Mental Hälsa Ramverket i olika sammanhang. Från att etablera samhällsledda insatsgrupper till att skapa rättighetsbaserad lagstiftning och medvetenhetsinnefattande helande protokoll, ger dessa resurser steg-för-steg-vägledning för att transformera mental hälsa system genom samhällssuveränitet och traditionell helande visdom.",
      startKitTitle: "Mental Hälsa Styrning Startpaket",
      startKitDesc: "Ett komplett paket med allt du behöver för att starta ett samhällelett mental hälsa transformationsinitiativ. Inkluderar alla nödvändiga verktyg och mallar för insatsgrupper, rättighetsbaserad vård och medvetenhetsinnefattande helande.",
      startKitButton: "Ladda ner komplett Startpaket",
      quickStartTitle: "Snabbstart Implementeringsverktyg",
      quickStartDesc: "Väsentliga verktyg för att snabbt implementera viktiga komponenter av mental hälsa ramverket, från efterlevnadsbedömningar till samhällsinsatsgrupper etablering.",
      governanceTitle: "Styrning & Policyverktyg",
      governanceDesc: "Resurser för att bygga rättighetsbaserad mental hälsa styrning, från nationella kommissioner till internationell fördragsutveckling och ungdomsledarskap.",
      clinicalTitle: "Kliniska & Tjänsteverktyg",
      clinicalDesc: "Verktyg för att implementera medvetenhetsinnefattande helande, traditionell medicin integration och samhällsbaserade mental hälsa tjänster.",
      financingTitle: "Finansiering & Ekonomiverktyg",
      financingDesc: "Resurser för hållbar mental hälsa finansiering, ekonomisk modellering och implementering av Global Mental Hälsa Commons Fond.",
      monitoringTitle: "Övervakning & Utvärderingsverktyg",
      monitoringDesc: "Verktyg för samhällsledd övervakning, psykosocial blomstring mätvärden och transparenta ansvarssystem.",
      guidesTitle: "Ramverksguider",
      guidesDesc: "Tillgängliga guider för att hjälpa dig förstå och dela Mental Hälsa Ramverket med olika målgrupper och samhällen.",
      requestTitle: "Begär verktyg eller ge feedback",
      requestDesc: "Behöver du implementeringsresurser för ett specifikt samhälle? Har du förslag på samhällsleddaförbättringar? Vi välkomnar dina synpunkter för att göra dessa verktyg mer användbara.",
      contactLink: "Kontakta oss",
      languagesTitle: "Tillgängliga språk",
      downloadPDF: "Ladda ner PDF",
      downloadMarkdown: "Ladda ner Markdown",
      backToTools: "Tillbaka till verktygsöversikt",
      downloadButton: "Ladda ner",
      // Tool titles in Swedish
      pathToComplianceTitle: "Väg till Efterlevnad Checklista för UHC Integration",
      pathToComplianceDesc: "Omfattande checklista för att integrera mental hälsa i Universal Health Coverage med ≥5% budgetallokering och samhällsövervakning.",
      communityTaskForceTitle: "Samhällsledd Insatsgrupp Installationsguide",
      communityTaskForceDesc: "Komplett guide för att etablera samhällsmentalhälsoinsatsgrupper med traditionell helande integration och kamratledarskap.",
      culturalAdaptationTitle: "Kulturell Anpassning Verktygslåda",
      culturalAdaptationDesc: "Ramverk för att anpassa mental hälsa tillvägagångssätt till olika kulturella sammanhang samtidigt som traditionell helande suveränitet hedras.",
      watchdogImplementationTitle: "Mental Hälsa Vakthund Implementeringsmanual",
      watchdogImplementationDesc: "Guide för att etablera Global Mental Hälsa Vakthund system med Traffic Light efterlevnadsövervakning och samhällsövervakning.",
      trafficLightAssessmentTitle: "Traffic Light System Bedömningsramverk",
      trafficLightAssessmentDesc: "Bedömningsverktyg för att utvärdera mental hälsa rättigheter efterlevnad med Grön/Gul/Röd statussystem med genomförandemekanismer.",
      nationalCommissionTitle: "Nationell Mental Hälsa Kommission Bildningsguide",
      nationalCommissionDesc: "Mall för att etablera Nationella Mental Hälsa Kommissioner med samhällssuveränitet och traditionell helande auktoritet.",
      rightsBasedLegislationTitle: "Rättighetsbaserad Lagstiftning Mall med Solnedgångsklausuler",
      rightsBasedLegislationDesc: "Modelllagstiftning för att eliminera tvångspraxis och etablera samhällskontrollerad mental hälsa rättighetsskydd.",
      internationalTreatyTitle: "Internationell Mental Hälsa Rättigheter Fördrag Färdplan",
      internationalTreatyDesc: "Utvecklingsväg för Internationell Mental Hälsa Rättigheter Fördrag med samhällskonsultation och genomförandemekanismer.",
      youthParliamentTitle: "Ungdom Mental Hälsa Parlament Charter",
      youthParliamentDesc: "Charter mall för att etablera Ungdom Mental Hälsa Parlament med policyskapande auktoritet och 50% Global Syd representation.",
      spiritualCrisisTitle: "Kliniska Beslutsträd för Andliga Kriser",
      spiritualCrisisDesc: "Kliniska protokoll för att särskilja andliga nödsituationer från psykiatriska kriser med traditionella helande konsultationsvägar.",
      consciousnessDevelopmentTitle: "Medvetenhetsutveckling & Världsbild Övergångsstöd Guide",
      consciousnessDevelopmentDesc: "Stödramverk för individer som navigerar medvetenhetsutveckling och världsbildövergångar med samhällsintegration.",
      consciousnessHealingTitle: "Medvetenhetsinkluderande Helande Protokoll",
      consciousnessHealingDesc: "Kliniska protokoll för att stödja mystiska upplevelser, andlig framväxt och medvetenhetsutvidgande terapier.",
      traditionalHealingTitle: "Traditionell Helande Integration Riktlinjer",
      traditionalHealingDesc: "Ramverk för att respektfullt integrera traditionella helande praxis med samtida mental hälsa tjänster.",
      psychedelicTherapyTitle: "Psykedelisk-Assisterad Terapi Lab Installationsguide",
      psychedelicTherapyDesc: "Komplett guide för att etablera samhällskontrollerade psykedeliska terapilabbar med etisk övervakning och traditionell helande integration.",
      commonsFundTitle: "Global Mental Hälsa Commons Fond Ritning",
      commonsFundDesc: "Ramverk för att etablera och driva Global Mental Hälsa Commons Fond med innovativ finansiering och samhällskontroll.",
      rightToRestTitle: "Rätt till Vila Policy Implementeringsguide",
      rightToRestDesc: "Policyramverk för att implementera arbetstidsminskning och Universal Basic Services som mental hälsa interventioner.",
      flourishingMetricsTitle: "Psykosocial Blomstring Mätvärden Dashboard Specifikation",
      flourishingMetricsDesc: "Teknisk specifikation för att bygga samhällskontrollerade dashboards som mäter välbefinnande bortom symptomminskning.",
      communityMonitoringTitle: "Samhällsledd Övervakning Verktygslåda",
      communityMonitoringDesc: "Omfattande verktygslåda för samhällen att övervaka och utvärdera sin egen mental hälsa transformationsframsteg.",
      narrativeEquityTitle: "Narrativ Rättvisa Granskningsprocess Guide",
      narrativeEquityDesc: "Ramverk för samhällsledd berättande och narrativ utvärdering som primär bedömningsmetodik.",
      transparencyDashboardTitle: "Transparens Dashboard Mall",
      transparencyDashboardDesc: "Mall för att bygga tillgängliga transparensdashboards med AI-assisterad analys och samhällskontroll.",
      frameworkEssentialsTitle: "Mental Hälsa Ramverk Grundläggande",
      frameworkEssentialsDesc: "Omfattande men tillgänglig guide som förklarar ramverkets kärnprinciper och samhällsledda transformationsväg.",
      executiveSummaryTitle: "Verkställande Sammanfattning",
      executiveSummaryDesc: "Strategisk översikt för verkställande och seniora ledare som belyser implementeringsvägar och samhällssuveränitetsprinciper."
    }
  };

  // Get current translations based on active locale
  $: texts = translations[currentLocale] || translations.en;
  
  // Tool data for each section
  const quickStartTools = [
    { id: 'path-to-compliance-checklist', color: 'color-primary' },
    { id: 'community-task-force-guide', color: 'color-healing' },
    { id: 'cultural-adaptation-toolkit', color: 'color-consciousness' },
    { id: 'watchdog-implementation-manual', color: 'color-community' },
    { id: 'traffic-light-assessment', color: 'color-flourish' }
  ];

  const governanceTools = [
    { id: 'national-commission-guide', color: 'color-primary' },
    { id: 'rights-based-legislation-template', color: 'color-community' },
    { id: 'international-treaty-roadmap', color: 'color-peace' },
    { id: 'youth-parliament-charter', color: 'color-flourish' }
  ];

  const clinicalTools = [
    { id: 'spiritual-crisis-decision-trees', color: 'color-consciousness' },
    { id: 'consciousness-development-guide', color: 'color-wisdom' },
    { id: 'consciousness-healing-protocols', color: 'color-compassion' },
    { id: 'traditional-healing-integration-guidelines', color: 'color-healing' },
    { id: 'psychedelic-therapy-lab-guide', color: 'color-wholeness' }
  ];

  const financingTools = [
    { id: 'commons-fund-blueprint', color: 'color-primary' },
    { id: 'right-to-rest-policy-guide', color: 'color-peace' }
  ];

  const monitoringTools = [
    { id: 'flourishing-metrics-dashboard-spec', color: 'color-flourish' },
    { id: 'community-monitoring-toolkit', color: 'color-healing' },
    { id: 'narrative-equity-review-guide', color: 'color-compassion' },
    { id: 'transparency-dashboard-template', color: 'color-peace' }
  ];

  const toolNameToTranslationKey = {
    'path-to-compliance-checklist': 'pathToCompliance',
    'community-task-force-guide': 'communityTaskForce',
    'cultural-adaptation-toolkit': 'culturalAdaptation',
    'watchdog-implementation-manual': 'watchdogImplementation',
    'traffic-light-assessment': 'trafficLightAssessment',
    'national-commission-guide': 'nationalCommission',
    'rights-based-legislation-template': 'rightsBasedLegislation',
    'international-treaty-roadmap': 'internationalTreaty',
    'youth-parliament-charter': 'youthParliament',
    'spiritual-crisis-decision-trees': 'spiritualCrisis',
    'consciousness-development-guide': 'consciousnessDevelopment',
    'consciousness-healing-protocols': 'consciousnessHealing',
    'traditional-healing-integration-guidelines': 'traditionalHealing',
    'psychedelic-therapy-lab-guide': 'psychedelicTherapy',
    'commons-fund-blueprint': 'commonsFund',
    'right-to-rest-policy-guide': 'rightToRest',
    'flourishing-metrics-dashboard-spec': 'flourishingMetrics',
    'community-monitoring-toolkit': 'communityMonitoring',
    'narrative-equity-review-guide': 'narrativeEquity',
    'transparency-dashboard-template': 'transparencyDashboard'
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

      <!-- Start with the Mental Health Governance Starter Kit -->
      <div class="start-kit-card">
        <div class="card-content">
          <div class="card-icon">🧠</div>
          <div class="card-text">
            <h2>{texts.startKitTitle}</h2>
            <p>{texts.startKitDesc}</p>
          </div>
          <div class="card-actions">
            <a href={getFilePath(`mental-health-governance-starter-kit-${currentLocale}.zip`)} download class="primary-btn">
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
        <!-- Mental Health Framework Essentials -->
        <div class="tool-card color-primary">
          <h3>{texts.frameworkEssentialsTitle}</h3>
          <p>{texts.frameworkEssentialsDesc}</p>
          <div class="tool-actions">
            <a href={getFilePath(`mental-health-framework-essentials-${currentLocale}.pdf`)} download class="download-btn pdf">
              {texts.downloadPDF}
              <span class="icon">↓</span>
            </a>
            <a href={getFilePath(`mental-health-framework-essentials-${currentLocale}.md`)} download class="download-btn md">
              {texts.downloadMarkdown}
              <span class="icon">↓</span>
            </a>
          </div>
        </div>
        
        <!-- Executive Summary -->
        <div class="tool-card color-healing">
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
      
      <!-- Quick Start Implementation Tools -->
      <h2 class="section-title">{texts.quickStartTitle}</h2>
      <p class="section-desc">{texts.quickStartDesc}</p>
      
      <div class="tools-grid">
        {#each quickStartTools as tool}
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

      <!-- Governance & Policy Tools -->
      <h2 class="section-title">{texts.governanceTitle}</h2>
      <p class="section-desc">{texts.governanceDesc}</p>
      
      <div class="tools-grid">
        {#each governanceTools as tool}
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

      <!-- Clinical & Service Tools -->
      <h2 class="section-title">{texts.clinicalTitle}</h2>
      <p class="section-desc">{texts.clinicalDesc}</p>
      
      <div class="tools-grid">
        {#each clinicalTools as tool}
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

      <!-- Financing & Economics Tools -->
      <h2 class="section-title">{texts.financingTitle}</h2>
      <p class="section-desc">{texts.financingDesc}</p>
      
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
  /* Mental Health Framework color scheme - healing tones representing consciousness, community care, and holistic well-being */
  :root {
    --mental-health-primary: #1e3a8a; /* Deep Wisdom Blue - consciousness, depth, stability */
    --mental-health-secondary: #6b7280; /* Grounding Gray - balance, neutrality, calm */
    --mental-health-healing: #059669; /* Healing Green - growth, renewal, community care */
    --mental-health-consciousness: #7c3aed; /* Consciousness Purple - spirituality, transformation, awareness */
    --mental-health-community: #dc2626; /* Community Fire Red - connection, passion, advocacy */
    --mental-health-flourish: #f59e0b; /* Flourishing Gold - hope, potential, healing light */
    --mental-health-peace: #0891b2; /* Peace Cyan - serenity, flow, mental clarity */
    --mental-health-compassion: #ec4899; /* Compassion Pink - love, care, emotional healing */
    --mental-health-wisdom: #6366f1; /* Wisdom Indigo - insight, understanding, intuition */
    --mental-health-wholeness: #10b981; /* Wholeness Emerald - integration, completeness, wellness */
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
    background: linear-gradient(135deg, var(--mental-health-primary) 0%, var(--mental-health-healing) 100%);
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
    color: var(--mental-health-healing);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: var(--mental-health-primary);
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
    color: var(--mental-health-primary);
  }
  
  .section-desc {
    margin-bottom: 2rem;
    color: #4b5563;
    line-height: 1.7;
    font-size: 1.125rem;
  }
  
  /* Start Kit Card */
  .start-kit-card {
    background: linear-gradient(135deg, rgba(30, 58, 138, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%);
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
    color: var(--mental-health-primary);
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--mental-health-primary);
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
  
  /* Color Variations for Mental Health Framework */
  .color-primary {
    border-left-color: var(--mental-health-primary);
  }
  
  .color-primary h3 {
    color: var(--mental-health-primary);
  }
  
  .color-healing {
    border-left-color: var(--mental-health-healing);
  }
  
  .color-healing h3 {
    color: var(--mental-health-healing);
  }
  
  .color-consciousness {
    border-left-color: var(--mental-health-consciousness);
  }
  
  .color-consciousness h3 {
    color: var(--mental-health-consciousness);
  }
  
  .color-community {
    border-left-color: var(--mental-health-community);
  }
  
  .color-community h3 {
    color: var(--mental-health-community);
  }
  
  .color-flourish {
    border-left-color: var(--mental-health-flourish);
  }
  
  .color-flourish h3 {
    color: var(--mental-health-flourish);
  }
  
  .color-peace {
    border-left-color: var(--mental-health-peace);
  }
  
  .color-peace h3 {
    color: var(--mental-health-peace);
  }

  .color-compassion {
    border-left-color: var(--mental-health-compassion);
  }
  
  .color-compassion h3 {
    color: var(--mental-health-compassion);
  }

  .color-wisdom {
    border-left-color: var(--mental-health-wisdom);
  }
  
  .color-wisdom h3 {
    color: var(--mental-health-wisdom);
  }

  .color-wholeness {
    border-left-color: var(--mental-health-wholeness);
  }
  
  .color-wholeness h3 {
    color: var(--mental-health-wholeness);
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
    background-color: var(--mental-health-primary);
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
    background-color: var(--mental-health-healing);
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
    background-color: var(--mental-health-primary);
  }

  .tool-card.color-healing .download-btn.pdf {
    background-color: var(--mental-health-healing);
  }

  .tool-card.color-consciousness .download-btn.pdf {
    background-color: var(--mental-health-consciousness);
  }

  .tool-card.color-community .download-btn.pdf {
    background-color: var(--mental-health-community);
  }

  .tool-card.color-flourish .download-btn.pdf {
    background-color: var(--mental-health-flourish);
  }

  .tool-card.color-peace .download-btn.pdf {
    background-color: var(--mental-health-peace);
  }

  .tool-card.color-compassion .download-btn.pdf {
    background-color: var(--mental-health-compassion);
  }

  .tool-card.color-wisdom .download-btn.pdf {
    background-color: var(--mental-health-wisdom);
  }

  .tool-card.color-wholeness .download-btn.pdf {
    background-color: var(--mental-health-wholeness);
  }

  .download-btn.md {
    background-color: white;
    border: 1px solid;
  }

  .tool-card.color-primary .download-btn.md {
    color: var(--mental-health-primary);
    border-color: var(--mental-health-primary);
  }

  .tool-card.color-healing .download-btn.md {
    color: var(--mental-health-healing);
    border-color: var(--mental-health-healing);
  }

  .tool-card.color-consciousness .download-btn.md {
    color: var(--mental-health-consciousness);
    border-color: var(--mental-health-consciousness);
  }

  .tool-card.color-community .download-btn.md {
    color: var(--mental-health-community);
    border-color: var(--mental-health-community);
  }

  .tool-card.color-flourish .download-btn.md {
    color: var(--mental-health-flourish);
    border-color: var(--mental-health-flourish);
  }

  .tool-card.color-peace .download-btn.md {
    color: var(--mental-health-peace);
    border-color: var(--mental-health-peace);
  }

  .tool-card.color-compassion .download-btn.md {
    color: var(--mental-health-compassion);
    border-color: var(--mental-health-compassion);
  }

  .tool-card.color-wisdom .download-btn.md {
    color: var(--mental-health-wisdom);
    border-color: var(--mental-health-wisdom);
  }

  .tool-card.color-wholeness .download-btn.md {
    color: var(--mental-health-wholeness);
    border-color: var(--mental-health-wholeness);
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
    color: var(--mental-health-primary);
  }

  .contact-link {
    color: var(--mental-health-healing);
    text-decoration: underline;
    font-weight: 500;
  }

  .contact-link:hover {
    color: var(--mental-health-primary);
  }
 
  /* Back Link Bottom */
  .back-link-bottom {
    margin: 2rem 0;
    text-align: center;
  }

  .back-link-bottom a {
    display: inline-flex;
    align-items: center;
    color: var(--mental-health-healing);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .back-link-bottom a:hover {
    color: var(--mental-health-primary);
  }
 
  /* Language Section */
  .language-section {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid #e5e7eb;
  }

  .language-section h3 {
    margin-bottom: 1rem;
    color: var(--mental-health-primary);
  }
 
  .language-buttons {
    display: flex;
    gap: 0.5rem;
  }
 
  .lang-button {
    padding: 0.5rem 1rem;
    border: 1px solid var(--mental-health-healing);
    background-color: white;
    color: var(--mental-health-healing);
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;
  }

  .lang-button:hover {
    background-color: rgba(5, 150, 105, 0.1);
  }
 
  .lang-button.active {
    background-color: var(--mental-health-primary);
    color: white;
    border-color: var(--mental-health-primary);
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
