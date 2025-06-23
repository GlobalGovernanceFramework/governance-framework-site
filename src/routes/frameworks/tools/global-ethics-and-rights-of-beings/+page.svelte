<!-- src/routes/frameworks/tools/global-ethics-and-rights-of-beings/+page.svelte -->
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
      return `${base}/frameworks/tools/global-ethics-and-rights-of-beings/${toolName}`;
    }
    
    // Special case for rights-recognition-starter-kit
    if (toolName === 'rights-recognition-starter-kit.pdf' || toolName === 'rights-recognition-starter-kit.md') {
      const langSuffix = currentLocale === 'sv' ? '-sv' : '-en';
      return `${base}/frameworks/tools/global-ethics-and-rights-of-beings/rights-recognition-starter-kit${langSuffix}.${toolName.split('.').pop()}`;
    }
    
    // For the guides and other potentially translated documents
    if (toolName.includes('guide') || 
        toolName === 'seed-kit.zip') {
      // Special case for main guides
      if (toolName === 'youth-guide.pdf' || toolName === 'youth-guide.md') {
        const langSuffix = currentLocale === 'sv' ? '-sv' : '-en';
        return `${base}/frameworks/tools/global-ethics-and-rights-of-beings/youth-guide${langSuffix}.${toolName.split('.').pop()}`;
      } else {
        // For other translated documents
        const extension = toolName.split('.').pop();
        const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
        return `${base}/frameworks/tools/global-ethics-and-rights-of-beings/${baseName}-${currentLocale}.${extension}`;
      }
    }
    
    // For tools that might have language variations but maintain the same base name
    if ([
        'rights-assessment-methodology',
        'spiral-aware-implementation-guide',
        'consciousness-assessment-toolkit',
        'guardianship-handbook',
        'conflict-resolution-guide',
        'resistance-management-playbook',
        'crisis-ethics-field-guide',
        'indigenous-knowledge-protocol',
        'commons-glossary',
        'pioneer-pilots-manual',
        'edge-case-handbook'
        ].includes(toolName.split('.')[0])) {
      const extension = toolName.split('.').pop();
      const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
      return `${base}/frameworks/tools/global-ethics-and-rights-of-beings/${baseName}-${currentLocale}.${extension}`;
    }
    
    // Default path for other files
    return `${base}/frameworks/tools/global-ethics-and-rights-of-beings/${toolName}`;
  };

  // Helper function for language button styles
  function getLanguageButtonStyle(lang) {
    const isActive = currentLocale === lang;
    return isActive ? 'lang-button active' : 'lang-button';
  }

  // Translations for this page
  const translations = {
    en: {
      title: "Ethics & Rights of Beings Tools",
      subtitle: "Practical resources to implement the Global Ethics & Rights of Beings Framework",
      intro: "These tools and templates are designed to help you implement the Ethics & Rights of Beings Framework in various contexts. From rights assessment methodologies to guardianship handbooks and conflict resolution guides, these resources provide step-by-step guidance for creating ethical governance systems that recognize and protect the rights of all beings—human, animal, ecosystem, and artificial intelligence.",
      seedKitTitle: "Start with the Rights Recognition Starter Kit",
      seedKitDesc: "A complete package with everything you need to launch implementation. Includes all essential tools and templates in one convenient download.",
      seedKitButton: "Download Complete Starter Kit",
      guidesTitle: "Framework Guides",
      guidesDesc: "Specialized guides tailored to specific audiences to help you understand and share the Ethics & Rights of Beings Framework.",
      toolsTitle: "Core Implementation Tools",
      toolsDesc: "These essential tools help you implement key components of the framework, from rights assessment to guardianship and conflict resolution.",
      sectoralTitle: "Specialized Assessment Tools",
      sectoralDesc: "Targeted instruments for evaluating and implementing rights recognition across different entity categories.",
      crisisTitle: "Crisis & Special Situations",
      crisisDesc: "Resources for ethical decision-making during emergencies and complex scenarios.",
      communityTitle: "Community Implementation Resources",
      communityDesc: "Tools to help communities implement the framework through diverse cultural contexts and with varying resource levels.",
      visualTitle: "Interactive Visual Resources",
      visualDesc: "Visual aids and resources to help communicate and implement framework concepts.",
      requestTitle: "Request Tools or Provide Feedback",
      requestDesc: "Need implementation resources for a specific purpose? Have suggestions for improvements? We welcome your input to make these tools more useful.",
      contactLink: "Contact us",
      languagesTitle: "Available Languages",
      downloadPDF: "Download PDF",
      downloadMarkdown: "Download Markdown",
      contributionTitle: "Contribute to Development",
      contributionDesc: "These implementation tools are continuously evolving. You can contribute to their advancement by sharing your experiences and feedback.",
      contributionButton: "Provide Implementation Feedback",

      // Tool titles - Framework Guides
      youthGuideTitle: "Youth Guide",
      youthGuideDesc: "Framework concepts for young changemakers with engaging activities and simplified explanations.",
      communityGuideTitle: "Community Guide",
      communityGuideDesc: "Practical steps for implementing the framework in local communities and organizations.",
      policyGuideTitle: "Policy Guide",
      policyGuideDesc: "Implementation guidance for policymakers and government officials with legal integration pathways.",
      educatorsGuideTitle: "Educators Guide",
      educatorsGuideDesc: "Resources for teaching framework concepts in educational settings across age groups.",
      crisisGuideTitle: "Crisis Situations Guide",
      crisisGuideDesc: "Ethical decision-making protocols for emergencies when full deliberative processes aren't possible.",
      
      // Tool titles - Core Implementation
      assessmentMethodologyTitle: "Rights Assessment Methodology",
      assessmentMethodologyDesc: "Comprehensive protocols for evaluating potential rights-holders across entity categories.",
      spiralImplementationTitle: "Spiral-Aware Implementation Guide",
      spiralImplementationDesc: "Strategies for introducing the framework across different worldviews and developmental stages.",
      consciousnessToolkitTitle: "Consciousness Assessment Toolkit",
      consciousnessToolkitDesc: "Scientific instruments for evaluating consciousness indicators in different entity types.",
      guardianshipHandbookTitle: "Guardianship Council Handbook",
      guardianshipHandbookDesc: "Complete guide to establishing and operating guardianship structures for non-human entities.",
      conflictResolutionTitle: "Conflict Resolution Protocol Guide",
      conflictResolutionDesc: "Methods for resolving tensions between different rights claims and stakeholders.",
      
      // Tool titles - Specialized Assessment
      resistanceManagementTitle: "Resistance Management Playbook",
      resistanceManagementDesc: "Strategies for addressing and overcoming opposition to framework implementation.",
      crisisEthicsTitle: "Crisis Ethics Field Guide",
      crisisEthicsDesc: "Rapid ethical assessment tools for emergency decision-making that maintains core principles.",
      indigenousProtocolTitle: "Indigenous Knowledge Integration Protocol",
      indigenousProtocolDesc: "Guidelines for respectfully incorporating traditional knowledge in rights recognition.",
      edgeCaseHandbookTitle: "Edge Case Handbook",
      edgeCaseHandbookDesc: "Approaches for evaluating novel or borderline entities for rights consideration.",
      pioneerPilotsTitle: "Pioneer Pilots Implementation Manual",
      pioneerPilotsDesc: "Template for establishing model implementation projects in different contexts.",
      
      // Tool titles - Visual Resources
      dynamicRightsTitle: "Dynamic Rights Spectrum Visualization",
      dynamicRightsDesc: "Interactive tool illustrating the graduated approach to rights across entity categories.",
      implementationTimelineTitle: "Implementation Timeline Visualizer",
      implementationTimelineDesc: "Visual roadmap showing phased implementation pathways for the framework.",
      conflictMatrixTitle: "Conflict Resolution Decision Matrix",
      conflictMatrixDesc: "Visual guide to navigating complex rights conflicts using framework principles.",
      governanceVisualizerTitle: "Governance Structure Visualizer",
      governanceVisualizerDesc: "Interactive diagram of guardianship council structures and governance mechanisms.",
      
      viewTool: "View Visualization",
      underDevelopment: "Under Development",
      downloadButton: "Download"
    },
    sv: {
      title: "Etik & Varelsers Rättigheter Verktyg",
      subtitle: "Praktiska resurser för att implementera Globala Etik & Varelsers Rättigheter Ramverket",
      intro: "Dessa verktyg och mallar är utformade för att hjälpa dig implementera Etik & Varelsers Rättigheter-ramverket i olika sammanhang. Från rättighetsbedömningsmetoder till förvallarhandböcker och konfliktlösningsguider, dessa resurser ger steg-för-steg-vägledning för att skapa etiska styrningssystem som erkänner och skyddar rättigheterna för alla varelser—mänskliga, djur, ekosystem och artificiell intelligens.",
      seedKitTitle: "Börja med startpaketet för rättighetserkännande",
      seedKitDesc: "Ett komplett paket med allt du behöver för att påbörja implementeringen. Inkluderar alla nödvändiga verktyg och mallar i en bekväm nedladdning.",
      seedKitButton: "Ladda ner komplett startpaket",
      guidesTitle: "Ramverksguider",
      guidesDesc: "Specialiserade guider anpassade för specifika målgrupper för att hjälpa dig förstå och dela Etik & Varelsers Rättigheter-ramverket.",
      toolsTitle: "Centrala implementeringsverktyg",
      toolsDesc: "Dessa väsentliga verktyg hjälper dig att implementera viktiga komponenter i ramverket, från rättighetsbedömning till förvaltarskap och konfliktlösning.",
      sectoralTitle: "Specialiserade bedömningsverktyg",
      sectoralDesc: "Riktade instrument för att utvärdera och implementera rättighetserkännande över olika entitetskategorier.",
      crisisTitle: "Kris & Speciella situationer",
      crisisDesc: "Resurser för etiskt beslutsfattande under nödsituationer och komplexa scenarier.",
      communityTitle: "Samhällsimplementeringsresurser",
      communityDesc: "Verktyg för att hjälpa samhällen implementera ramverket genom olika kulturella sammanhang och med varierande resursnivåer.",
      visualTitle: "Interaktiva visuella resurser",
      visualDesc: "Visuella hjälpmedel och resurser för att hjälpa till att kommunicera och implementera ramverkskoncept.",
      requestTitle: "Begär verktyg eller ge feedback",
      requestDesc: "Behöver du implementeringsresurser för ett specifikt syfte? Har du förslag på förbättringar? Vi välkomnar dina synpunkter för att göra dessa verktyg mer användbara.",
      contactLink: "Kontakta oss",
      languagesTitle: "Tillgängliga språk",
      downloadPDF: "Ladda ner PDF",
      downloadMarkdown: "Ladda ner Markdown",
      contributionTitle: "Bidra till utvecklingen",
      contributionDesc: "Dessa implementeringsverktyg utvecklas kontinuerligt. Du kan bidra till deras framsteg genom att dela dina erfarenheter och återkoppling.",
      contributionButton: "Ge implementeringsåterkoppling",
      
      // Tool titles - Framework Guides (Swedish)
      youthGuideTitle: "Ungdomsguide",
      youthGuideDesc: "Ramverkskoncept för unga förändringsaktörer med engagerande aktiviteter och förenklade förklaringar.",
      communityGuideTitle: "Samhällsguide",
      communityGuideDesc: "Praktiska steg för att implementera ramverket i lokala samhällen och organisationer.",
      policyGuideTitle: "Policyguide",
      policyGuideDesc: "Implementeringsvägledning för beslutsfattare och myndighetspersoner med juridiska integrationsvägar.",
      educatorsGuideTitle: "Lärarguide",
      educatorsGuideDesc: "Resurser för att undervisa ramverkskoncept i utbildningsmiljöer över olika åldersgrupper.",
      crisisGuideTitle: "Guide för krissituationer",
      crisisGuideDesc: "Etiska beslutsprotokoll för nödsituationer när fullständiga överläggningsprocesser inte är möjliga.",
      
      // Tool titles - Core Implementation (Swedish)
      assessmentMethodologyTitle: "Rättighetsbedömningsmetodik",
      assessmentMethodologyDesc: "Omfattande protokoll för att utvärdera potentiella rättighetsinnehavare över entitetskategorier.",
      spiralImplementationTitle: "Spiralmedveten implementeringsguide",
      spiralImplementationDesc: "Strategier för att introducera ramverket över olika världsbilder och utvecklingsstadier.",
      consciousnessToolkitTitle: "Medvetenhetsbedömningsverktygsset",
      consciousnessToolkitDesc: "Vetenskapliga instrument för att utvärdera medvetandeindikatorer i olika entitetstyper.",
      guardianshipHandbookTitle: "Handbok för förvaltarråd",
      guardianshipHandbookDesc: "Komplett guide för att etablera och driva förvaltarstrukturer för icke-mänskliga entiteter.",
      conflictResolutionTitle: "Guide för konfliktlösningsprotokoll",
      conflictResolutionDesc: "Metoder för att lösa spänningar mellan olika rättighetsanspråk och intressenter.",
      
      // Tool titles - Specialized Assessment (Swedish)
      resistanceManagementTitle: "Motståndhanteringshandbok",
      resistanceManagementDesc: "Strategier för att adressera och övervinna motstånd mot ramverksimplementering.",
      crisisEthicsTitle: "Fältguide för krisetik",
      crisisEthicsDesc: "Snabba etiska bedömningsverktyg för beslutsfattande i nödsituationer som upprätthåller kärnprinciper.",
      indigenousProtocolTitle: "Protokoll för integration av urfolkskunskap",
      indigenousProtocolDesc: "Riktlinjer för respektfull inkorporering av traditionell kunskap i rättighetserkännande.",
      edgeCaseHandbookTitle: "Handbok för gränsfall",
      edgeCaseHandbookDesc: "Tillvägagångssätt för att utvärdera nya eller gränsfall-entiteter för rättighetsövervägande.",
      pioneerPilotsTitle: "Implementeringsmanual för pilotprojekt",
      pioneerPilotsDesc: "Mall för att etablera modellimplementeringsprojekt i olika sammanhang.",
      
      // Tool titles - Visual Resources (Swedish)
      dynamicRightsTitle: "Visualisering av dynamiskt rättighetsspektrum",
      dynamicRightsDesc: "Interaktivt verktyg som illustrerar den graduerade metoden för rättigheter över entitetskategorier.",
      implementationTimelineTitle: "Visualiserare för implementeringstidslinje",
      implementationTimelineDesc: "Visuell färdplan som visar fasade implementeringsvägar för ramverket.",
      conflictMatrixTitle: "Beslutsmatris för konfliktlösning",
      conflictMatrixDesc: "Visuell guide för att navigera komplexa rättighetskonflikter med hjälp av ramverksprinciper.",
      governanceVisualizerTitle: "Visualiserare för styrningsstruktur",
      governanceVisualizerDesc: "Interaktivt diagram över förvaltarrådsstrukturer och styrningsmekanismer.",
      
      viewTool: "Visa visualisering",
      underDevelopment: "Under utveckling",
      downloadButton: "Ladda ner"
    }
  };

  // Get current translations based on active locale
  $: texts = translations[currentLocale] || translations.en;

  // Tool data for each section, using actual file names
  const guideTools = [
    { id: 'youth-guide', color: 'color-1' },
    { id: 'community-guide', color: 'color-2' },
    { id: 'policy-guide', color: 'color-3' },
    { id: 'educators-guide', color: 'color-4' },
    { id: 'crisis-guide', color: 'color-5' }
  ];
  
  const coreTools = [
    { id: 'rights-assessment-methodology', color: 'color-dark' },
    { id: 'spiral-aware-implementation-guide', color: 'color-1' },
    { id: 'consciousness-assessment-toolkit', color: 'color-2' },
    { id: 'guardianship-handbook', color: 'color-3' },
    { id: 'conflict-resolution-guide', color: 'color-4' }
  ];
  
  const specializedTools = [
    { id: 'resistance-management-playbook', color: 'color-dark' },
    { id: 'crisis-ethics-field-guide', color: 'color-1' },
    { id: 'indigenous-knowledge-protocol', color: 'color-2' },
    { id: 'edge-case-handbook', color: 'color-3' },
    { id: 'pioneer-pilots-manual', color: 'color-4' }
  ];
  
  const visualTools = [
    { id: 'dynamic-rights-spectrum', color: 'color-dark', isPageLink: true },
    { id: 'implementation-timeline', color: 'color-1', isPageLink: true },
    { id: 'conflict-matrix', color: 'color-2', isPageLink: true },
    { id: 'governance-visualizer', color: 'color-3', isPageLink: true }
  ];

  const toolNameToTranslationKey = {
    'youth-guide': 'youthGuide',
    'community-guide': 'communityGuide',
    'policy-guide': 'policyGuide',
    'educators-guide': 'educatorsGuide',
    'crisis-guide': 'crisisGuide',
    'rights-assessment-methodology': 'assessmentMethodology',
    'spiral-aware-implementation-guide': 'spiralImplementation',
    'consciousness-assessment-toolkit': 'consciousnessToolkit',
    'guardianship-handbook': 'guardianshipHandbook',
    'conflict-resolution-guide': 'conflictResolution',
    'resistance-management-playbook': 'resistanceManagement',
    'crisis-ethics-field-guide': 'crisisEthics',
    'indigenous-knowledge-protocol': 'indigenousProtocol',
    'edge-case-handbook': 'edgeCaseHandbook',
    'pioneer-pilots-manual': 'pioneerPilots',
    'dynamic-rights-spectrum': 'dynamicRights',
    'implementation-timeline': 'implementationTimeline',
    'conflict-matrix': 'conflictMatrix',
    'governance-visualizer': 'governanceVisualizer'
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

      <!-- Start with the Starter Kit -->
      <div class="seed-kit-card">
        <div class="card-content">
          <div class="card-icon">🌱</div>
          <div class="card-text">
            <h2>{texts.seedKitTitle}</h2>
            <p>{texts.seedKitDesc}</p>
          </div>
          <div class="card-actions">
            <a href={getFilePath(`rights-recognition-starter-kit.pdf`)} download class="primary-btn">
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

      <!-- Core Implementation Tools Section -->
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

      <!-- Specialized Assessment Tools Section -->
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
      
      <!-- Visual Resources Section -->
      <h2 class="section-title">{texts.visualTitle}</h2>
      <p class="section-desc">{texts.visualDesc}</p>
      
      <!-- Contribution Card -->
      <div class="contribution-card">
        <div class="card-content">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" width="36" height="36" fill="#166534">
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm1-10.5v-2h-2v2h2zm0 6.5v-5h-2v5h2z"/>
            </svg>
          </div>
          <div class="card-text">
            <h2>{texts.contributionTitle}</h2>
            <p>{texts.contributionDesc}</p>
          </div>
          <div class="card-actions">
            <a href="{base}/contact" class="contribute-btn">
              {texts.contributionButton}
              <span class="icon">→</span>
            </a>
          </div>
        </div>
      </div>
      
      <div class="tools-grid">
        {#each visualTools as tool}
          <div class="tool-card {tool.color}">
            <h3>{texts[`${toolNameToTranslationKey[tool.id]}Title`]}</h3>
            <p>{texts[`${toolNameToTranslationKey[tool.id]}Desc`]}</p>
            <div class="tool-actions">
              {#if tool.isPageLink}
                <!-- Page links to the placeholder pages -->
                <a href="{base}/frameworks/tools/global-ethics-and-rights-of-beings/{tool.id}" class="page-link-btn">
                  {texts.viewTool}
                  <span class="icon">→</span>
                </a>
                <span class="development-badge">{texts.underDevelopment}</span>
              {:else}
                <!-- Normal download buttons (shouldn't happen for visual tools) -->
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

  /* Hero Section - Using Ethics & Rights colors (green palette) */
  .hero {
    padding: 3rem 0;
    background: linear-gradient(to bottom right, #166534, #22c55e);
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
    color: #166534;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: #15803d;
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
    color: #166534;
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
    background-color: #f0fdf4;
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(22, 101, 52, 0.1);
    border: 1px solid rgba(22, 101, 52, 0.2);
  }

  .card-content {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
  }

  .card-icon {
    font-size: 2.5rem;
    color: #166534;
  }

  .card-text {
    flex: 1;
    min-width: 200px;
  }

  .card-text h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #166534;
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

  /* Contribution Card */
  .contribution-card {
    background-color: #f0fdf4;
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(22, 101, 52, 0.1);
    border: 1px solid rgba(22, 101, 52, 0.2);
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

  /* Color Variations with Ethics & Rights Theme - Green palette */
  .color-dark {
    border-left-color: #166534;
  }

  .color-dark h3 {
    color: #166534;
  }

  .color-1 {
    border-left-color: #15803d;
  }

  .color-1 h3 {
    color: #15803d;
  }

  .color-2 {
    border-left-color: #16a34a;
  }

  .color-2 h3 {
    color: #16a34a;
  }

  .color-3 {
    border-left-color: #22c55e;
  }

  .color-3 h3 {
    color: #22c55e;
  }

  .color-4 {
    border-left-color: #4ade80;
  }

  .color-4 h3 {
    color: #4ade80;
  }

  .color-5 {
    border-left-color: #86efac;
  }

  .color-5 h3 {
    color: #86efac;
  }

  /* Tool Actions */
  .tool-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: auto;
    align-items: center;
  }

  /* Buttons */
  .primary-btn {
    display: inline-flex;
    align-items: center;
    background-color: #166534;
    color: white;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.2s;
  }

  .primary-btn:hover {
    background-color: #15803d;
    transform: translateY(-1px);
  }

  .contribute-btn {
    display: inline-flex;
    align-items: center;
    background-color: #166534;
    color: white;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.2s;
  }

  .contribute-btn:hover {
    background-color: #15803d;
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
    background-color: #166534;
    color: white;
  }

  .download-btn.md {
    background-color: white;
    border: 1px solid #166534;
    color: #166534;
  }

  .download-btn:hover {
    transform: translateY(-1px);
  }

  .page-link-btn {
    display: inline-flex;
    align-items: center;
    background-color: #166534;
    color: white;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.2s;
  }

  .page-link-btn:hover {
    background-color: #15803d;
    transform: translateY(-1px);
  }

  .development-badge {
    display: inline-block;
    background-color: #16a34a;
    color: white;
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    margin-left: 0.5rem;
  }

  .icon {
    margin-left: 0.5rem;
  }

  /* Feedback Card */
  .feedback-card {
    background-color: #f0fdf4;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .feedback-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #166534;
  }

  .feedback-card p {
    color: #4b5563;
    margin-bottom: 1rem;
  }

  .contact-link {
    color: #166534;
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
    color: #166534;
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
    color: #166534;
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
    color: #166534;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
  }

  .lang-button.active {
    background-color: #166534;
    color: white;
    border-color: #166534;
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
