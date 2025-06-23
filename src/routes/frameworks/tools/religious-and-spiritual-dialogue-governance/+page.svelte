<!-- src/routes/frameworks/tools/religious-and-spiritual-dialogue-governance/+page.svelte -->
<script>
  import { t, locale, setLocale } from '$lib/i18n';
  import { base } from '$app/paths';

  // Subscribe to stores
  $: currentT = $t;
  $: currentLocale = $locale;

  // Define file paths with language handling
  const getFilePath = (toolName) => {
    // Special case for full framework download
    if (toolName === 'spiritual-dialogue-framework.pdf') {
      return `${base}/downloads/${currentLocale}/Spiritual-Dialogue.pdf`;
    }
    
    // Rest of the existing function stays the same
    // Check if the file already has language suffix
    if (toolName.includes('-sv') || toolName.includes('-en')) {
      return `${base}/frameworks/tools/religious-and-spiritual-dialogue-governance/${toolName}`;
    }
    
    // For potentially translated documents
    if (toolName.includes('executive-brief') || 
        toolName.includes('policy-guide') || 
        toolName.includes('youth-and-broad-audiences-guide') || 
        toolName === 'sacred-seed-kit.zip') {
      // For translated documents
      const extension = toolName.split('.').pop();
      const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
      return `${base}/frameworks/tools/religious-and-spiritual-dialogue-governance/${baseName}-${currentLocale}.${extension}`;
    }
    
    // For tools that might have language variations
    if (['adaptive-facilitation-tools', 
         'digital-feedback-dashboard',
         'dialogue-facilitation-scripts',
         'digital-access-inclusion-audit',
         'truth-reconciliation-toolkit',
         'wisdom-documentation-templates',
         'adaptive-learning-protocol',
         'impact-assessment-guide',
         'representation-metrics-dashboard',
         'cross-tradition-values-mapping-tool',
         'ethics-charter-template',
         'policy-development-guide',
         'policy-translation-guide',
         'wisdom-repository-starter-kit',
         'conflict-de-escalation-protocols',
         'cultural-appropriation-prevention',
         'dialogue-facilitation-guide',
         'local-partnership-templates',
         'regional-customization-framework',
         'representation-assessment-tool',
         'sacred-space-setup-guide'].includes(toolName.split('.')[0])) {
      const extension = toolName.split('.').pop();
      const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
      return `${base}/frameworks/tools/religious-and-spiritual-dialogue-governance/${baseName}-${currentLocale}.${extension}`;
    }
    
    // Default path for other files
    return `${base}/frameworks/tools/religious-and-spiritual-dialogue-governance/${toolName}`;
  };

  // Helper function for language button styles
  function getLanguageButtonStyle(lang) {
    const isActive = currentLocale === lang;
    return isActive ? 'lang-button active' : 'lang-button';
  }

  // Translations for this page
  const translations = {
    en: {
      title: "Spiritual Dialogue Framework Tools",
      subtitle: "Practical resources to implement the Religious & Spiritual Dialogue Framework",
      intro: "These tools and templates are designed to help you implement the Religious & Spiritual Dialogue Framework in various contexts. From facilitating interfaith dialogues to establishing ethical governance, these resources provide step-by-step guidance for meaningful spiritual collaboration.",
      seedKitTitle: "Start with the Sacred Seed Kit",
      seedKitDesc: "A complete package with everything you need to launch a local dialogue initiative. Includes all essential tools and templates in one convenient download.",
      seedKitButton: "Download Sacred Seed Kit",
      guidesTitle: "Framework Guides",
      guidesDesc: "Introductory guides to help you understand and share the Religious & Spiritual Dialogue Framework with different audiences.",
      toolsTitle: "Dialogue & Facilitation Tools",
      toolsDesc: "Essential tools to help you facilitate meaningful dialogue across diverse spiritual and religious traditions.",
      implementationTitle: "Implementation Tools",
      implementationDesc: "Resources for monitoring, assessment, and evaluating the impact of your dialogue initiatives.",
      policyTitle: "Policy & Governance Tools", 
      policyDesc: "Tools for translating spiritual insights into ethical governance frameworks and policy recommendations.",
      seedKitToolsTitle: "Sacred Space & Dialogue Tools",
      seedKitToolsDesc: "Resources for creating appropriate spaces for dialogue and preventing cultural appropriation.",
      requestTitle: "Request Tools or Provide Feedback",
      requestDesc: "Need implementation resources for a specific purpose? Have suggestions for improvements? We welcome your input to make these tools more useful.",
      contactLink: "Contact us",
      languagesTitle: "Available Languages",
      downloadPDF: "Download PDF",
      downloadMarkdown: "Download Markdown",
      fullFrameworkTitle: "Complete Framework",
      fullFrameworkDesc: "Download the complete Religious & Spiritual Dialogue Framework document with all sections and appendices.",
      backToTools: "Back to Tools Overview",
      // Guide titles
      executiveBriefTitle: "Executive Brief",
      executiveBriefDesc: "A concise overview for decision-makers highlighting the strategic value and impact of the framework.",
      policyGuideTitle: "Policy Guide",
      policyGuideDesc: "A focused guide for policymakers and governance institutions on implementing the framework.",
      youthGuideTitle: "Youth & Broad Audiences Guide",
      youthGuideDesc: "A visual, accessible guide designed for youth, communities, and general audiences.",
      // Implementation tools
      adaptiveFacilitationTitle: "Adaptive Facilitation Tools",
      adaptiveFacilitationDesc: "Dynamic system enabling facilitators to adjust dialogue approaches in real-time based on participant feedback.",
      digitalDashboardTitle: "Digital Feedback Dashboard",
      digitalDashboardDesc: "Real-time monitoring and visualization of dialogue participation, representation metrics, and implementation transparency.",
      // Core tools
      dialogueScriptsTitle: "Dialogue Facilitation Scripts",
      dialogueScriptsDesc: "Ready-to-use templates for interfaith and intergenerational dialogue sessions across diverse traditions.",
      inclusionAuditTitle: "Digital Access & Inclusion Audit",
      inclusionAuditDesc: "Assessment tools for ensuring equitable technological participation across different communities.",
      truthReconciliationTitle: "Truth & Reconciliation Toolkit",
      truthReconciliationDesc: "Structured methodologies for addressing historical tensions between traditions and fostering healing.",
      wisdomTemplatesTitle: "Wisdom Documentation Templates",
      wisdomTemplatesDesc: "Ethical frameworks for capturing and sharing traditional knowledge with appropriate permissions and context.",
      multimediaLibraryTitle: "Multimedia Resource Library",
      multimediaLibraryDesc: "Audio, video, and visual resources to support implementation across diverse contexts.",
      viewLibraryButton: "View Library",
      // Monitoring tools
      adaptiveLearningTitle: "Adaptive Learning Protocol",
      adaptiveLearningDesc: "System for continuous improvement based on implementation experiences across diverse contexts.",
      impactAssessmentTitle: "Impact Assessment Guide",
      impactAssessmentDesc: "Methodology for evaluating dialogue outcomes and influence on governance and community relationships.",
      representationDashboardTitle: "Representation Metrics Dashboard",
      representationDashboardDesc: "Tool for tracking diversity and inclusion in dialogue activities and governance structures.",
      // Policy tools
      valuesMappingTitle: "Cross-Tradition Values Mapping Tool",
      valuesMappingDesc: "Interactive process for identifying common ethical ground while honoring the unique foundations of each tradition.",
      ethicsCharterTitle: "Ethics Charter Template",
      ethicsCharterDesc: "Framework for developing shared ethical principles across diverse traditions for collaborative action.",
      policyDevelopmentTitle: "Policy Development Guide",
      policyDevelopmentDesc: "Methodology for creating policy frameworks incorporating the ethical insights from spiritual traditions.",
      policyTranslationTitle: "Policy Translation Guide",
      policyTranslationDesc: "Process for converting spiritual and religious wisdom into practical governance recommendations.",
      repositoryStarterTitle: "Wisdom Repository Starter Kit",
      repositoryStarterDesc: "Guidelines for documenting and sharing spiritual insights on governance challenges with appropriate attribution.",
      // Seed kit tools
      conflictProtocolsTitle: "Conflict De-escalation Protocols",
      conflictProtocolsDesc: "Interventions for addressing tensions in interfaith settings with cultural sensitivity.",
      appropriationPreventionTitle: "Cultural Appropriation Prevention",
      appropriationPreventionDesc: "Guidelines for respectful engagement with traditions while avoiding exploitation or misrepresentation.",
      facilitationGuideTitle: "Dialogue Facilitation Guide",
      facilitationGuideDesc: "Comprehensive guidance for leading interfaith conversations that honor all participants.",
      partnershipTemplatesTitle: "Local Partnership Templates",
      partnershipTemplatesDesc: "Sample agreements for collaboration with religious institutions and community organizations.",
      customizationFrameworkTitle: "Regional Customization Framework",
      customizationFrameworkDesc: "Adaptation guides for diverse cultural contexts and regional religious landscapes.",
      assessmentToolTitle: "Representation Assessment Tool",
      assessmentToolDesc: "Metrics for ensuring balanced representation of traditions and demographics in dialogue activities.",
      sacredSpaceTitle: "Sacred Space Setup Guide",
      sacredSpaceDesc: "Principles for creating appropriate physical environments for interfaith dialogue and ceremony.",
      downloadButton: "Download"
    },
    sv: {
      title: "Verktyg för Andlig Dialog",
      subtitle: "Praktiska resurser för att implementera Ramverket för Religiös & Andlig Dialog",
      intro: "Dessa verktyg och mallar är utformade för att hjälpa dig implementera Ramverket för Religiös & Andlig Dialog i olika sammanhang. Från att underlätta interreligiösa dialoger till att etablera etisk styrning, ger dessa resurser steg-för-steg-vägledning för meningsfull andlig samverkan.",
      seedKitTitle: "Börja med det Heliga Frö-paketet",
      seedKitDesc: "Ett komplett paket med allt du behöver för att starta ett lokalt dialoginitiativ. Inkluderar alla nödvändiga verktyg och mallar i en bekväm nedladdning.",
      seedKitButton: "Ladda ner Heligt Frö-paket",
      guidesTitle: "Ramverksguider",
      guidesDesc: "Introduktionsguider för att hjälpa dig förstå och dela Ramverket för Religiös & Andlig Dialog med olika målgrupper.",
      toolsTitle: "Dialog- & Faciliteringsverktyg",
      toolsDesc: "Viktiga verktyg för att underlätta meningsfull dialog över olika andliga och religiösa traditioner.",
      implementationTitle: "Implementeringsverktyg",
      implementationDesc: "Resurser för övervakning, bedömning och utvärdering av effekterna av dina dialoginitiativ.",
      policyTitle: "Policy- & Styrningsverktyg", 
      policyDesc: "Verktyg för att översätta andliga insikter till etiska styrningsramverk och policyrekommendationer.",
      seedKitToolsTitle: "Verktyg för Heliga Rum & Dialog",
      seedKitToolsDesc: "Resurser för att skapa lämpliga utrymmen för dialog och förhindra kulturell appropriering.",
      requestTitle: "Begär verktyg eller ge feedback",
      requestDesc: "Behöver du implementeringsresurser för ett specifikt syfte? Har du förslag på förbättringar? Vi välkomnar dina synpunkter för att göra dessa verktyg mer användbara.",
      contactLink: "Kontakta oss",
      languagesTitle: "Tillgängliga språk",
      downloadPDF: "Ladda ner PDF",
      downloadMarkdown: "Ladda ner Markdown",
      fullFrameworkTitle: "Komplett Ramverk",
      fullFrameworkDesc: "Ladda ner det kompletta dokumentet för Ramverket för Religiös & Andlig Dialog med alla avsnitt och bilagor.",
      backToTools: "Tillbaka till verktygsöversikt",
      // Guide titles in Swedish
      executiveBriefTitle: "Sammanfattning för Beslutsfattare",
      executiveBriefDesc: "En koncis översikt för beslutsfattare som belyser ramverkets strategiska värde och påverkan.",
      policyGuideTitle: "Policyguide",
      policyGuideDesc: "En fokuserad guide för beslutsfattare och styrningsinstitutioner om implementering av ramverket.",
      youthGuideTitle: "Guide för Ungdomar & Bred Publik",
      youthGuideDesc: "En visuell, tillgänglig guide designad för ungdomar, samhällen och allmän publik.",
      // Implementation tools
      adaptiveFacilitationTitle: "Adaptiva Faciliteringsverktyg",
      adaptiveFacilitationDesc: "Dynamiskt system som möjliggör för facilitatorer att justera dialogmetoder i realtid baserat på deltagarfeedback.",
      digitalDashboardTitle: "Digital Feedbackpanel",
      digitalDashboardDesc: "Realtidsövervakning och visualisering av dialogdeltagande, representationsmått och implementeringstransparens.",
      // Core tools
      dialogueScriptsTitle: "Dialogfaciliteringsskript",
      dialogueScriptsDesc: "Färdiga mallar för interreligiösa och intergenerationella dialogsessioner över olika traditioner.",
      inclusionAuditTitle: "Digital Tillgångs- & Inkluderingsgranskning",
      inclusionAuditDesc: "Bedömningsverktyg för att säkerställa jämlik teknologisk delaktighet över olika gemenskaper.",
      truthReconciliationTitle: "Sannings- & Försoningsverktygslåda",
      truthReconciliationDesc: "Strukturerade metoder för att hantera historiska spänningar mellan traditioner och främja läkning.",
      wisdomTemplatesTitle: "Visdomsdokumentationsmallar",
      wisdomTemplatesDesc: "Etiska ramverk för att fånga och dela traditionell kunskap med lämpliga tillstånd och sammanhang.",
      multimediaLibraryTitle: "Multimediabibliotek",
      multimediaLibraryDesc: "Ljud-, video- och visuella resurser för att stödja implementering i olika sammanhang.",
      viewLibraryButton: "Visa bibliotek",
      // Monitoring tools
      adaptiveLearningTitle: "Adaptivt Inlärningsprotokoll",
      adaptiveLearningDesc: "System för kontinuerlig förbättring baserat på implementeringserfarenheter från olika sammanhang.",
      impactAssessmentTitle: "Guide för Effektbedömning",
      impactAssessmentDesc: "Metodik för att utvärdera dialogresultat och påverkan på styrning och samhällsrelationer.",
      representationDashboardTitle: "Dashboard för Representationsmått",
      representationDashboardDesc: "Verktyg för att spåra mångfald och inkludering i dialogaktiviteter och styrningsstrukturer.",
      // Policy tools
      valuesMappingTitle: "Traditionsövergripande Värdemappningsverktyg",
      valuesMappingDesc: "Interaktiv process för att identifiera gemensam etisk grund samtidigt som man hedrar varje traditions unika grundvalar.",
      ethicsCharterTitle: "Mall för Etisk Stadga",
      ethicsCharterDesc: "Ramverk för att utveckla delade etiska principer över olika traditioner för samverkande handling.",
      policyDevelopmentTitle: "Guide för Policyutveckling",
      policyDevelopmentDesc: "Metodik för att skapa policyramverk som införlivar etiska insikter från andliga traditioner.",
      policyTranslationTitle: "Guide för Policyöversättning",
      policyTranslationDesc: "Process för att omvandla andlig och religiös visdom till praktiska styrningsrekommendationer.",
      repositoryStarterTitle: "Startkit för Visdomsförvar",
      repositoryStarterDesc: "Riktlinjer för att dokumentera och dela andliga insikter om styrningsutmaningar med lämplig tillskrivning.",
      // Seed kit tools
      conflictProtocolsTitle: "Protokoll för Konfliktdeeskalering",
      conflictProtocolsDesc: "Interventioner för att hantera spänningar i interreligiösa miljöer med kulturell känslighet.",
      appropriationPreventionTitle: "Förebyggande av Kulturell Appropriering",
      appropriationPreventionDesc: "Riktlinjer för respektfullt engagemang med traditioner utan exploatering eller felaktig representation.",
      facilitationGuideTitle: "Guide för Dialogfacilitering",
      facilitationGuideDesc: "Omfattande vägledning för att leda interreligiösa samtal som hedrar alla deltagare.",
      partnershipTemplatesTitle: "Mallar för Lokala Partnerskap",
      partnershipTemplatesDesc: "Exempelavtal för samarbete med religiösa institutioner och samhällsorganisationer.",
      customizationFrameworkTitle: "Ramverk för Regional Anpassning",
      customizationFrameworkDesc: "Anpassningsguider för olika kulturella kontexter och regionala religiösa landskap.",
      assessmentToolTitle: "Verktyg för Representationsbedömning",
      assessmentToolDesc: "Mätvärden för att säkerställa balanserad representation av traditioner och demografi i dialogaktiviteter.",
      sacredSpaceTitle: "Guide för Uppsättning av Heliga Rum",
      sacredSpaceDesc: "Principer för att skapa lämpliga fysiska miljöer för interreligiös dialog och ceremoni.",
      downloadButton: "Ladda ner"
    }
  };

  // Get current translations based on active locale
  $: texts = translations[currentLocale] || translations.en;
  
  // Tool data for each section
  const frameworkGuides = [
    { id: 'executive-brief', color: 'color-primary' },
    { id: 'policy-guide', color: 'color-2' },
    { id: 'youth-and-broad-audiences-guide', color: 'color-3' }
  ];
  
  const implementationTools = [
    { id: 'adaptive-facilitation-tools', color: 'color-4' },
    { id: 'digital-feedback-dashboard', color: 'color-5' }
  ];
  
  const coreTools = [
    { id: 'dialogue-facilitation-scripts', color: 'color-primary' },
    { id: 'digital-access-inclusion-audit', color: 'color-2' },
    { id: 'truth-reconciliation-toolkit', color: 'color-3' },
    { id: 'wisdom-documentation-templates', color: 'color-4' },
    { id: 'multimedia-resource-library', color: 'color-5' }
  ];
  
  const monitoringTools = [
    { id: 'adaptive-learning-protocol', color: 'color-primary' },
    { id: 'impact-assessment-guide', color: 'color-2' },
    { id: 'representation-metrics-dashboard', color: 'color-3' }
  ];
  
  const policyTools = [
    { id: 'cross-tradition-values-mapping-tool', color: 'color-primary' },
    { id: 'ethics-charter-template', color: 'color-2' },
    { id: 'policy-development-guide', color: 'color-3' },
    { id: 'policy-translation-guide', color: 'color-4' },
    { id: 'wisdom-repository-starter-kit', color: 'color-5' }
  ];
  
  const seedKitTools = [
    { id: 'conflict-de-escalation-protocols', color: 'color-primary' },
    { id: 'cultural-appropriation-prevention', color: 'color-2' },
    { id: 'dialogue-facilitation-guide', color: 'color-3' },
    { id: 'local-partnership-templates', color: 'color-4' },
    { id: 'regional-customization-framework', color: 'color-5' },
    { id: 'representation-assessment-tool', color: 'color-primary' },
    { id: 'sacred-space-setup-guide', color: 'color-2' }
  ];

  const toolNameToTranslationKey = {
    'executive-brief': 'executiveBrief',
    'policy-guide': 'policyGuide',
    'youth-and-broad-audiences-guide': 'youthGuide',
    'adaptive-facilitation-tools': 'adaptiveFacilitation',
    'digital-feedback-dashboard': 'digitalDashboard',
    'dialogue-facilitation-scripts': 'dialogueScripts',
    'digital-access-inclusion-audit': 'inclusionAudit',
    'truth-reconciliation-toolkit': 'truthReconciliation',
    'wisdom-documentation-templates': 'wisdomTemplates',
    'adaptive-learning-protocol': 'adaptiveLearning',
    'impact-assessment-guide': 'impactAssessment',
    'representation-metrics-dashboard': 'representationDashboard',
    'cross-tradition-values-mapping-tool': 'valuesMapping',
    'ethics-charter-template': 'ethicsCharter',
    'policy-development-guide': 'policyDevelopment',
    'policy-translation-guide': 'policyTranslation',
    'wisdom-repository-starter-kit': 'repositoryStarter',
    'conflict-de-escalation-protocols': 'conflictProtocols',
    'cultural-appropriation-prevention': 'appropriationPrevention',
    'dialogue-facilitation-guide': 'facilitationGuide',
    'local-partnership-templates': 'partnershipTemplates',
    'regional-customization-framework': 'customizationFramework',
    'representation-assessment-tool': 'assessmentTool',
    'sacred-space-setup-guide': 'sacredSpace'
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
      
      <!-- Full Framework Download -->
      <div class="full-framework-card">
        <div class="card-content">
          <div class="card-icon">📚</div>
          <div class="card-text">
            <h2>{texts.fullFrameworkTitle}</h2>
            <p>{texts.fullFrameworkDesc}</p>
          </div>
          <div class="card-actions">
            <a href={getFilePath('spiritual-dialogue-framework.pdf')} download class="primary-btn">
              {texts.downloadPDF}
              <span class="icon">↓</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Start with the Sacred Seed Kit -->
      <div class="seed-kit-card">
        <div class="card-content">
          <div class="card-icon">🌿</div>
          <div class="card-text">
            <h2>{texts.seedKitTitle}</h2>
            <p>{texts.seedKitDesc}</p>
          </div>
          <div class="card-actions">
            <a href={getFilePath(`sacred-seed-kit-${currentLocale}.pdf`)} download class="primary-btn">
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
        {#each frameworkGuides as tool}
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
      
      <!-- Implementation Tools -->
      <h2 class="section-title">{texts.toolsTitle}</h2>
      <p class="section-desc">{texts.toolsDesc}</p>
      
      <div class="tools-grid">
        {#each implementationTools as tool}
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
      
      <!-- Core Implementation Tools -->
      <h2 class="section-title">{texts.toolsTitle}</h2>
      <p class="section-desc">{texts.toolsDesc}</p>
      
      <div class="tools-grid">
        {#each coreTools as tool}
          <div class="tool-card {tool.color}">
            {#if tool.id === 'multimedia-resource-library'}
              <h3>{texts.multimediaLibraryTitle}</h3>
              <p>{texts.multimediaLibraryDesc}</p>
              <div class="tool-actions">
                <a href="{base}/frameworks/tools/religious-and-spiritual-dialogue-governance/multimedia-resource-library" class="view-btn">
                  {texts.viewLibraryButton}
                  <span class="icon">→</span>
                </a>
              </div>
            {:else}
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
            {/if}
          </div>
        {/each}
      </div>

      <!-- Monitoring & Evaluation Tools -->
      <h2 class="section-title">{texts.implementationTitle}</h2>
      <p class="section-desc">{texts.implementationDesc}</p>
      
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
      
      <!-- Policy & Governance Tools -->
      <h2 class="section-title">{texts.policyTitle}</h2>
      <p class="section-desc">{texts.policyDesc}</p>
      
      <div class="tools-grid">
        {#each policyTools as tool}
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
      
      <!-- Sacred Seed Kit Tools -->
      <h2 class="section-title">{texts.seedKitToolsTitle}</h2>
      <p class="section-desc">{texts.seedKitToolsDesc}</p>
      
      <div class="tools-grid">
        {#each seedKitTools as tool}
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
  
/* Hero Section - Purple/Gold theme */
  .hero {
    padding: 3rem 0;
    background: linear-gradient(to bottom right, #6a3ea1, #9f7aea);
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
    color: #6a3ea1;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: #553086;
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
    color: #6a3ea1;
  }
  
  .section-desc {
    margin-bottom: 2rem;
    color: #4b5563;
    line-height: 1.7;
    font-size: 1.125rem;
  }
  
  /* Full Framework Card */
  .full-framework-card {
    background-color: #f8f5ff;
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(106, 62, 161, 0.1);
    border: 1px solid rgba(106, 62, 161, 0.2);
  }
  
  /* Seed Kit Card */
  .seed-kit-card {
    background: linear-gradient(135deg, #f8f5ff 0%, #fff8e6 100%);
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(106, 62, 161, 0.1);
    border: 1px solid rgba(106, 62, 161, 0.2);
  }
  
  .card-content {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
  }
  
  .card-icon {
    font-size: 2.5rem;
    color: #6a3ea1;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #6a3ea1;
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
  
  /* Color Variations for Purple/Gold theme */
  .color-primary {
    border-left-color: #6a3ea1;
  }
  
  .color-primary h3 {
    color: #6a3ea1;
  }
  
  .color-1 {
    border-left-color: #9f7aea;
  }
  
  .color-1 h3 {
    color: #9f7aea;
  }
  
  .color-2 {
    border-left-color: #b78846;
  }
  
  .color-2 h3 {
    color: #b78846;
  }
  
  .color-3 {
    border-left-color: #805ad5;
  }
  
  .color-3 h3 {
    color: #805ad5;
  }
  
  .color-4 {
    border-left-color: #8b5cf6;
  }
  
  .color-4 h3 {
    color: #8b5cf6;
  }
  
  .color-5 {
    border-left-color: #d4a650;
  }
  
  .color-5 h3 {
    color: #d4a650;
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
    background-color: #6a3ea1;
    color: white;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: #553086;
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
    background-color: #6a3ea1;
  }

  .tool-card.color-1 .download-btn.pdf {
    background-color: #9f7aea;
  }

  .tool-card.color-2 .download-btn.pdf {
    background-color: #b78846;
  }

  .tool-card.color-3 .download-btn.pdf {
    background-color: #805ad5;
  }

  .tool-card.color-4 .download-btn.pdf {
    background-color: #8b5cf6;
  }

  .tool-card.color-5 .download-btn.pdf {
    background-color: #d4a650;
  }

  .download-btn.md, .download-btn.excel {
    background-color: white;
    border: 1px solid;
  }

  .tool-card.color-primary .download-btn.md, .tool-card.color-primary .download-btn.excel {
    color: #6a3ea1;
    border-color: #6a3ea1;
  }

  .tool-card.color-1 .download-btn.md, .tool-card.color-1 .download-btn.excel {
    color: #9f7aea;
    border-color: #9f7aea;
  }

  .tool-card.color-2 .download-btn.md, .tool-card.color-2 .download-btn.excel {
    color: #b78846;
    border-color: #b78846;
  }

  .tool-card.color-3 .download-btn.md, .tool-card.color-3 .download-btn.excel {
    color: #805ad5;
    border-color: #805ad5;
  }

  .tool-card.color-4 .download-btn.md, .tool-card.color-4 .download-btn.excel {
    color: #8b5cf6;
    border-color: #8b5cf6;
  }

  .tool-card.color-5 .download-btn.md, .tool-card.color-5 .download-btn.excel {
    color: #d4a650;
    border-color: #d4a650;
  }
  
  .download-btn:hover {
    transform: translateY(-1px);
  }
  
  .icon {
    margin-left: 0.5rem;
  }
  
  /* Feedback Card */
  .feedback-card {
    background-color: #f0e6ff;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  
  .feedback-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #6a3ea1;
  }
  
  .feedback-card p {
    color: #4b5563;
    margin-bottom: 1rem;
  }
  
  .contact-link {
    color: #b78846;
    text-decoration: underline;
    font-weight: 500;
  }
  
  /* Back Link */
  .back-link-bottom {
    margin-bottom: 2rem;
  }
  
  .back-link-bottom a {
    display: inline-flex;
    align-items: center;
    color: #6a3ea1;
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
    color: #6a3ea1;
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
    color: #6a3ea1;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
  }
  
  .lang-button.active {
    background-color: #6a3ea1;
    color: white;
    border-color: #6a3ea1;
  }

  .view-btn {
    display: inline-flex;
    align-items: center;
    background-color: white;
    border: 1px solid;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.2s;
  }

  .tool-card.color-5 .view-btn {
    color: #d4a650;
    border-color: #d4a650;
  }

  .view-btn:hover {
    transform: translateY(-1px);
  }
  
  /* Responsive styles */
  @media (min-width: 768px) {
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
