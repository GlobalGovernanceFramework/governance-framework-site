<!-- src/routes/frameworks/tools/digital-commons/+page.svelte -->
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
      return `${base}/frameworks/tools/digital-commons/${toolName}`;
    }
    
    // Special case for digital-ethics
    if (toolName === 'digital-ethics-guide.pdf' || toolName === 'digital-ethics-guide.md') {
      const langSuffix = currentLocale === 'sv' ? '-sv' : '-en';
      return `${base}/frameworks/tools/digital-commons/digital-ethics-guide${langSuffix}.${toolName.split('.').pop()}`;
    }
    
    // For the guides and other potentially translated documents
    if (toolName.includes('guide') || 
        toolName === 'seed-kit.zip') {
      // Special case for main guides
      if (toolName === 'youth-guide.pdf' || toolName === 'youth-guide.md') {
        const langSuffix = currentLocale === 'sv' ? '-sv' : '-en';
        return `${base}/frameworks/tools/digital-commons/youth-guide${langSuffix}.${toolName.split('.').pop()}`;
      } else {
        // For other translated documents
        const extension = toolName.split('.').pop();
        const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
        return `${base}/frameworks/tools/digital-commons/${baseName}-${currentLocale}.${extension}`;
      }
    }
    
    // For tools that might have language variations but maintain the same base name
    if ([
        'data-sovereignty-protocol',
        'node-setup-guide',
        'sms-voting-template',
        'ethical-ai-audit-checklist',
        'failure-analysis-report-template',
        'commons-in-practice-documentation',
        'commons-glossary',
        'minimal-viable-node-quickstart',
        'field-test-logbook-template',
        'global-commons-framework',
        'digital-advocacy-toolkit',
        'digital-financing-navigator',
        'ppp-template',
        'community-digital-fund-guide',
        'digital-micro-grant-template',
        'resource-mapping-tool'
        ].includes(toolName.split('.')[0])) {
      const extension = toolName.split('.').pop();
      const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
      return `${base}/frameworks/tools/digital-commons/${baseName}-${currentLocale}.${extension}`;
    }
    
    // Default path for other files
    return `${base}/frameworks/tools/digital-commons/${toolName}`;
  };

  // Helper function for language button styles
  function getLanguageButtonStyle(lang) {
    const isActive = currentLocale === lang;
    return isActive ? 'lang-button active' : 'lang-button';
  }

  // Translations for this page
  const translations = {
    en: {
      title: "Digital Commons Tools",
      subtitle: "Practical resources to implement the Digital Commons Framework",
      intro: "These tools and templates are designed to help you implement the Digital Commons Framework in various contexts. From local citizen nodes to ethical AI governance and data sovereignty protocols, these resources provide step-by-step guidance for creating equitable, transparent, and sustainable digital systems that support both local autonomy and global collaboration.",
      seedKitTitle: "Start with the Seed Kit",
      seedKitDesc: "A complete package with everything you need to launch implementation. Includes all essential tools and templates in one convenient download.",
      seedKitButton: "Download Complete Seed Kit",
      guidesTitle: "Framework Guides",
      guidesDesc: "Lite guides tailored to specific audiences to help you understand and share the Digital Commons Framework with others.",
      toolsTitle: "Core Governance Tools",
      toolsDesc: "These essential tools help you implement key components of the Digital Commons Framework, from node setup to data sovereignty and ethical AI governance.",
      sectoralTitle: "Context-Specific Implementation Guides",
      sectoralDesc: "Specialized tools to support implementation across key areas including minimal-viable nodes, field testing, and failure analysis.",
      advocacyTitle: "Advocacy & Scaling Tools",
      advocacyDesc: "Resources to help you engage stakeholders, secure funding, and scale your implementation from local initiatives to broader adoption.",
      fundingTitle: "Low-Resource Tools",
      fundingDesc: "Tools to help communities with limited resources implement digital initiatives through micro-grants, fund management, and resource mapping.",
      digitalTitle: "Interactive Digital Tools",
      digitalDesc: "Interactive applications and platforms to simulate, monitor, and collaborate on digital commons initiatives.",
      requestTitle: "Request Tools or Provide Feedback",
      requestDesc: "Need implementation resources for a specific purpose? Have suggestions for improvements? We welcome your input to make these tools more useful.",
      contactLink: "Contact us",
      languagesTitle: "Available Languages",
      downloadPDF: "Download PDF",
      downloadMarkdown: "Download Markdown",
      contributionTitle: "Contribute to Development",
      contributionDesc: "These digital tools are currently in development. You can contribute to their advancement by visiting our GitHub repository.",
      contributionButton: "Visit GitHub Repository",

      // Tool titles - Lite Guides
      technicalGuideTitle: "Technical Guide for Policymakers",
      technicalGuideDesc: "Detailed guide on governance, infrastructure, and ethical implementation for officials and decision-makers.",
      communityGuideTitle: "Community Implementation Guide",
      communityGuideDesc: "Practical guide for setting up local citizen nodes and community governance processes.",
      youthGuideTitle: "Youth Engagement Guide",
      youthGuideDesc: "Accessible guide for youth, educators, and community groups on digital commons participation.",
      digitalEthicsGuideTitle: "Digital Ethics Guide",
      digitalEthicsGuideDesc: "Guide for ethical governance of AI, data, and digital infrastructure within the commons.",
      indigenousGuideTitle: "Indigenous Data Stewardship Guide",
      indigenousGuideDesc: "Co-designed guide for indigenous data sovereignty and cultural knowledge governance.",
      
      // Tool titles - Core Governance
      dataSovereigntyTitle: "Data Sovereignty Protocol",
      dataSovereigntyDesc: "Framework for ensuring community control over data collection, storage, usage, and sharing.",
      nodeSetupTitle: "Node Setup Guide",
      nodeSetupDesc: "Step-by-step instructions for establishing and operating a Local Citizen Node.",
      smsVotingTitle: "SMS Voting Template",
      smsVotingDesc: "System for conducting secure, accessible governance decisions via mobile phones.",
      aiAuditTitle: "Ethical AI Audit Checklist",
      aiAuditDesc: "Methodology for evaluating AI systems against community values and ethical standards.",
      failureAnalysisTitle: "Failure Analysis Report Template",
      failureAnalysisDesc: "Framework for learning from challenges and setbacks during implementation.",
      
      // Tool titles - Context-Specific Implementation
      commonsDocumentationTitle: "Commons-in-Practice Documentation",
      commonsDocumentationDesc: "Templates for capturing and sharing implementation experiences across contexts.",
      glossaryTitle: "Commons Glossary",
      glossaryDesc: "Comprehensive definitions of key terms and concepts for shared understanding.",
      minimalNodeTitle: "Minimal-Viable Node Quickstart",
      minimalNodeDesc: "Simplified one-page guide for immediate implementation with minimal resources.",
      fieldTestTitle: "Field-Test Logbook Template",
      fieldTestDesc: "Structured format for documenting pilot experiences and gathering feedback.",
      
      // Tool titles - Digital Tools
      governanceSimulatorTitle: "Governance Simulator App",
      governanceSimulatorDesc: "Interactive tool to model governance decisions and stakeholder impacts before implementation.",
      healthDashboardTitle: "Digital Commons Health Dashboard",
      healthDashboardDesc: "Real-time metrics for monitoring framework implementation and community impacts.",
      aiChatbotTitle: "AI Chatbot for Tool Navigation",
      aiChatbotDesc: "Interactive assistant to help users find and apply the right tools for their context.",
      collaborationPlatformTitle: "Real-Time Collaboration Platform",
      collaborationPlatformDesc: "GitHub-based hub for implementers to share adaptations and coordinate efforts.",
      
      viewTool: "View Tool",
      underDevelopment: "Under Development",
      downloadButton: "Download"
    },
    sv: {
      title: "Verktyg för digitala allmänningar",
      subtitle: "Praktiska resurser för att implementera ramverket för digitala allmänningar",
      intro: "Dessa verktyg och mallar är utformade för att hjälpa dig implementera ramverket för digitala allmänningar i olika sammanhang. Från lokala medborgarnoder till etisk AI-styrning och datasuveränitetsprotokoll, ger dessa resurser steg-för-steg-vägledning för att skapa rättvisa, transparenta och hållbara digitala system som stödjer både lokal autonomi och globalt samarbete.",
      seedKitTitle: "Börja med startpaketet",
      seedKitDesc: "Ett komplett paket med allt du behöver för att påbörja implementeringen. Inkluderar alla nödvändiga verktyg och mallar i en bekväm nedladdning.",
      seedKitButton: "Ladda ner komplett startpaket",
      guidesTitle: "Ramverksguider",
      guidesDesc: "Enkla guider anpassade för specifika målgrupper för att hjälpa dig förstå och dela ramverket för digitala allmänningar med andra.",
      toolsTitle: "Grundläggande styrningsverktyg",
      toolsDesc: "Dessa väsentliga verktyg hjälper dig att implementera viktiga komponenter i ramverket för digitala allmänningar, från nodinställning till datasuveränitet och etisk AI-styrning.",
      sectoralTitle: "Kontextspecifika implementeringsguider",
      sectoralDesc: "Specialiserade verktyg för att stödja implementering inom viktiga områden inklusive minimalt livskraftiga noder, fälttestning och felanalys.",
      advocacyTitle: "Påverkans- och skalningsverktyg",
      advocacyDesc: "Resurser för att hjälpa dig engagera intressenter, säkra finansiering och skala upp din implementering från lokala initiativ till bredare antagande.",
      fundingTitle: "Resurssnåla verktyg",
      fundingDesc: "Verktyg för att hjälpa samhällen med begränsade resurser genomföra digitala initiativ genom mikrostipendier, fondförvaltning och resurskartläggning.",
      digitalTitle: "Interaktiva digitala verktyg",
      digitalDesc: "Interaktiva applikationer och plattformar för att simulera, övervaka och samarbeta kring digitala allmänningsinitiativ.",
      requestTitle: "Begär verktyg eller ge feedback",
      requestDesc: "Behöver du implementeringsresurser för ett specifikt syfte? Har du förslag på förbättringar? Vi välkomnar dina synpunkter för att göra dessa verktyg mer användbara.",
      contactLink: "Kontakta oss",
      languagesTitle: "Tillgängliga språk",
      downloadPDF: "Ladda ner PDF",
      downloadMarkdown: "Ladda ner Markdown",
      contributionTitle: "Bidra till utvecklingen",
      contributionDesc: "Dessa digitala verktyg är för närvarande under utveckling. Du kan bidra till deras framsteg genom att besöka vår GitHub-repository.",
      contributionButton: "Besök GitHub-repositoriet",

      // Tool titles - Lite Guides (Swedish)
      technicalGuideTitle: "Teknisk guide för beslutsfattare",
      technicalGuideDesc: "Detaljerad guide om styrning, infrastruktur och etisk implementering för tjänstemän och beslutsfattare.",
      communityGuideTitle: "Samhällsimplementeringsguide",
      communityGuideDesc: "Praktisk guide för att sätta upp lokala medborgarnoder och samhällsstyrningsprocesser.",
      youthGuideTitle: "Guide för ungdomsengagemang",
      youthGuideDesc: "Tillgänglig guide för ungdomar, pedagoger och samhällsgrupper om deltagande i digitala allmänningar.",
      digitalEthicsGuideTitle: "Digital etikguide",
      digitalEthicsGuideDesc: "Guide för etisk styrning av AI, data och digital infrastruktur inom allmänningen.",
      indigenousGuideTitle: "Guide för urfolks dataförvaltning",
      indigenousGuideDesc: "Samdesignad guide för urfolks datasuveränitet och kulturell kunskapsstyrning.",
      
      // Tool titles - Core Governance (Swedish)
      dataSovereigntyTitle: "Datasuveränitetsprotokoll",
      dataSovereigntyDesc: "Ramverk för att säkerställa samhällskontroll över datainsamling, lagring, användning och delning.",
      nodeSetupTitle: "Guide för nodinställning",
      nodeSetupDesc: "Steg-för-steg-instruktioner för att etablera och driva en lokal medborgarnod.",
      smsVotingTitle: "SMS-röstmall",
      smsVotingDesc: "System för att genomföra säkra, tillgängliga styrningsbeslut via mobiltelefoner.",
      aiAuditTitle: "Checklista för etisk AI-revision",
      aiAuditDesc: "Metodik för att utvärdera AI-system mot samhällsvärderingar och etiska standarder.",
      failureAnalysisTitle: "Mall för felanalysrapport",
      failureAnalysisDesc: "Ramverk för att lära sig av utmaningar och motgångar under implementering.",
      
      // Tool titles - Context-Specific Implementation (Swedish)
      commonsDocumentationTitle: "Dokumentation för allmänningar i praktiken",
      commonsDocumentationDesc: "Mallar för att fånga och dela implementeringserfarenheter över olika kontexter.",
      glossaryTitle: "Allmänningsordlista",
      glossaryDesc: "Omfattande definitioner av nyckeltermer och koncept för gemensam förståelse.",
      minimalNodeTitle: "Snabbstart för minimal livskraftig nod",
      minimalNodeDesc: "Förenklad ensidiguide för omedelbar implementering med minimala resurser.",
      fieldTestTitle: "Mall för fälttestloggbok",
      fieldTestDesc: "Strukturerat format för att dokumentera piloterfarenheter och samla feedback.",
      
      // Tool titles - Digital Tools (Swedish)
      governanceSimulatorTitle: "App för styrningssimulator",
      governanceSimulatorDesc: "Interaktivt verktyg för att modellera styrningsbeslut och intressentpåverkan innan implementering.",
      healthDashboardTitle: "Hälsodashboard för digitala allmänningar",
      healthDashboardDesc: "Realtidsmått för övervakning av ramverksimplementering och samhällspåverkan.",
      aiChatbotTitle: "AI-chatbot för verktygsnavigering",
      aiChatbotDesc: "Interaktiv assistent för att hjälpa användare hitta och tillämpa rätt verktyg för deras kontext.",
      collaborationPlatformTitle: "Realtidssamarbetsplattform",
      collaborationPlatformDesc: "GitHub-baserad hub för implementerare att dela anpassningar och koordinera insatser.",
      
      viewTool: "Visa verktyg",
      underDevelopment: "Under utveckling",
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
    { id: 'digital-ethics-guide', color: 'color-4' },
    { id: 'indigenous-guide', color: 'color-5' }
  ];
  
  const coreTools = [
    { id: 'data-sovereignty-protocol', color: 'color-dark' },
    { id: 'node-setup-guide', color: 'color-1' },
    { id: 'sms-voting-template', color: 'color-2' },
    { id: 'ethical-ai-audit-checklist', color: 'color-3' },
    { id: 'failure-analysis-report-template', color: 'color-4' }
  ];
  
  const specializedTools = [
    { id: 'commons-in-practice-documentation', color: 'color-dark' },
    { id: 'commons-glossary', color: 'color-1' },
    { id: 'minimal-viable-node-quickstart', color: 'color-2' },
    { id: 'field-test-logbook-template', color: 'color-3' }
  ];
  
  const digitalTools = [
    { id: 'governance-simulator-app', color: 'color-dark', isPageLink: true },
    { id: 'health-dashboard', color: 'color-1', isPageLink: true },
    { id: 'ai-chatbot', color: 'color-2', isPageLink: true },
    { id: 'collaboration-platform', color: 'color-3', isPageLink: true }
  ];

  const toolNameToTranslationKey = {
    'technical-guide': 'technicalGuide',
    'community-guide': 'communityGuide',
    'youth-guide': 'youthGuide',
    'digital-ethics-guide': 'digitalEthicsGuide',
    'indigenous-guide': 'indigenousGuide',
    'data-sovereignty-protocol': 'dataSovereignty',
    'node-setup-guide': 'nodeSetup',
    'sms-voting-template': 'smsVoting',
    'ethical-ai-audit-checklist': 'aiAudit',
    'failure-analysis-report-template': 'failureAnalysis',
    'commons-in-practice-documentation': 'commonsDocumentation',
    'commons-glossary': 'glossary',
    'minimal-viable-node-quickstart': 'minimalNode',
    'field-test-logbook-template': 'fieldTest',
    'governance-simulator-app': 'governanceSimulator',
    'health-dashboard': 'healthDashboard',
    'ai-chatbot': 'aiChatbot',
    'collaboration-platform': 'collaborationPlatform'
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
      
      <!-- Digital Tools Section -->
      <h2 class="section-title">{texts.digitalTitle}</h2>
      <p class="section-desc">{texts.digitalDesc}</p>
      
      <!-- GitHub Contribution Card -->
      <div class="github-card">
        <div class="card-content">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" width="36" height="36" fill="#6e5494">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
          <div class="card-text">
            <h2>{texts.contributionTitle}</h2>
            <p>{texts.contributionDesc}</p>
          </div>
          <div class="card-actions">
            <a href="https://github.com/GlobalGovernanceFramework/governance-framework-site" target="_blank" rel="noopener noreferrer" class="github-btn">
              {texts.contributionButton}
              <span class="icon">→</span>
            </a>
          </div>
        </div>
      </div>
      
      <div class="tools-grid">
        {#each digitalTools as tool}
          <div class="tool-card {tool.color}">
            <h3>{texts[`${toolNameToTranslationKey[tool.id]}Title`]}</h3>
            <p>{texts[`${toolNameToTranslationKey[tool.id]}Desc`]}</p>
            <div class="tool-actions">
              {#if tool.isPageLink}
                <!-- Page links to the placeholder pages -->
                <a href="{base}/frameworks/tools/digital-commons/{tool.id}" class="page-link-btn">
                  {texts.viewTool}
                  <span class="icon">→</span>
                </a>
                <span class="development-badge">{texts.underDevelopment}</span>
              {:else}
                <!-- Normal download buttons (shouldn't happen for digital tools) -->
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

  /* Hero Section - Using Digital Commons colors from main page */
  .hero {
    padding: 3rem 0;
    background: linear-gradient(to bottom right, #6d28d9, #8b5cf6);
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
    color: #6d28d9;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: #5b21b6;
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
    color: #6d28d9;
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
    background-color: #f5f3ff;
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(109, 40, 217, 0.1);
    border: 1px solid rgba(109, 40, 217, 0.2);
  }

  .card-content {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
  }

  .card-icon {
    font-size: 2.5rem;
    color: #6d28d9;
  }

  .card-text {
    flex: 1;
    min-width: 200px;
  }

  .card-text h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #6d28d9;
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

  /* GitHub Card */
  .github-card {
    background-color: #f6f8fa;
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid #e1e4e8;
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

  /* Color Variations with Digital Commons Theme - Purple palette */
  .color-dark {
    border-left-color: #6d28d9;
  }

  .color-dark h3 {
    color: #6d28d9;
  }

  .color-1 {
    border-left-color: #7c3aed;
  }

  .color-1 h3 {
    color: #7c3aed;
  }

  .color-2 {
    border-left-color: #8b5cf6;
  }

  .color-2 h3 {
    color: #8b5cf6;
  }

  .color-3 {
    border-left-color: #a78bfa;
  }

  .color-3 h3 {
    color: #a78bfa;
  }

  .color-4 {
    border-left-color: #c4b5fd;
  }

  .color-4 h3 {
    color: #c4b5fd;
  }

  .color-5 {
    border-left-color: #ddd6fe;
  }

  .color-5 h3 {
    color: #ddd6fe;
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
    background-color: #6d28d9;
    color: white;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.2s;
  }

  .primary-btn:hover {
    background-color: #5b21b6;
    transform: translateY(-1px);
  }

  .github-btn {
    display: inline-flex;
    align-items: center;
    background-color: #6e5494;
    color: white;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.2s;
  }

  .github-btn:hover {
    background-color: #583e7e;
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
    background-color: #6d28d9;
    color: white;
  }

  .download-btn.md {
    background-color: white;
    border: 1px solid #6d28d9;
    color: #6d28d9;
  }

  .download-btn:hover {
    transform: translateY(-1px);
  }

  .page-link-btn {
    display: inline-flex;
    align-items: center;
    background-color: #6d28d9;
    color: white;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.2s;
  }

  .page-link-btn:hover {
    background-color: #5b21b6;
    transform: translateY(-1px);
  }

  .development-badge {
    display: inline-block;
    background-color: #9333ea;
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
    background-color: #f5f3ff;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .feedback-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #6d28d9;
  }

  .feedback-card p {
    color: #4b5563;
    margin-bottom: 1rem;
  }

  .contact-link {
    color: #6d28d9;
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
    color: #6d28d9;
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
    color: #6d28d9;
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
    color: #6d28d9;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
  }

  .lang-button.active {
    background-color: #6d28d9;
    color: white;
    border-color: #6d28d9;
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
