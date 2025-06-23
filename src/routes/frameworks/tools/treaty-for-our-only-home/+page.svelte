<!-- src/routes/frameworks/tools/treaty-for-our-only-home/+page.svelte -->
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
      return `${base}/frameworks/tools/treaty-for-our-only-home/${toolName}`;
    }
    
    // For potentially translated documents
    if (toolName.includes('treaty-framework-essentials') || toolName === 'global-stewardship-starter-kit.zip') {
      // Special case for main guides
      if (toolName === 'treaty-framework-essentials.pdf' || toolName === 'treaty-framework-essentials.md') {
        const langSuffix = currentLocale === 'sv' ? '-sv' : '-en';
        return `${base}/frameworks/tools/treaty-for-our-only-home/treaty-framework-essentials${langSuffix}.${toolName.split('.').pop()}`;
      } else {
        // For other translated documents
        const extension = toolName.split('.').pop();
        const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
        return `${base}/frameworks/tools/treaty-for-our-only-home/${baseName}-${currentLocale}.${extension}`;
      }
    }
    
    // For tools that might have language variations
    const toolsWithTranslations = [
      'governance-readiness-assessment',
      'unsc-reform-implementation-guide', 
      'carbon-tax-pilot-template',
      'global-citizens-initiative-toolkit',
      'ecocide-law-advocacy-kit',
      'debt-justice-protocol-guide',
      'institutional-accountability-framework',
      'sovereignty-bargain-negotiation-guide',
      'crisis-response-protocol-template',
      'council-of-guardians-charter',
      'global-stewardship-advocacy-kit',
      'municipal-governance-integration-guide',
      'polycrisis-response-training-manual'
    ];
    
    if (toolsWithTranslations.includes(toolName.split('.')[0])) {
      const extension = toolName.split('.').pop();
      const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
      return `${base}/frameworks/tools/treaty-for-our-only-home/${baseName}-${currentLocale}.${extension}`;
    }
    
    // Default path for other files
    return `${base}/frameworks/tools/treaty-for-our-only-home/${toolName}`;
  };

  // Helper function for language button styles
  function getLanguageButtonStyle(lang) {
    const isActive = currentLocale === lang;
    return isActive ? 'lang-button active' : 'lang-button';
  }

  // Translations for this page
  const translations = {
    en: {
      title: "Treaty for Our Only Home Tools",
      subtitle: "Practical resources to implement global governance transformation",
      intro: "These tools and templates are designed to help you implement the Treaty for Our Only Home in various contexts. From establishing governance reform pilots to building global stewardship alliances and advocating for keystone reforms, these resources provide step-by-step guidance for transforming governance systems through cooperative transformation.",
      startKitTitle: "Global Stewardship Starter Kit",
      startKitDesc: "A complete package with everything you need to launch a global governance transformation initiative. Includes all essential tools and templates for advocacy, pilot implementation, and stewardship alliance building.",
      startKitButton: "Download Complete Starter Kit",
      coreTitle: "Core Implementation Tools",
      coreDesc: "Essential tools for implementing key components of the treaty framework, from UNSC reform to carbon taxation and global citizens' initiatives.",
      advocacyTitle: "Advocacy & Movement Building Tools",
      advocacyDesc: "Resources for building political will, educating stakeholders, and scaling governance transformation to regional and global levels.",
      institutionalTitle: "Institutional Design & Reform Tools",
      institutionalDesc: "Tools for designing new governance mechanisms, reforming existing institutions, and ensuring democratic accountability in global governance.",
      guidesTitle: "Framework Guides",
      guidesDesc: "Accessible guides to help you understand and share the Treaty for Our Only Home with diverse audiences.",
      requestTitle: "Request Tools or Provide Feedback",
      requestDesc: "Need implementation resources for a specific governance context? Have suggestions for treaty improvements? We welcome your input to make these tools more useful.",
      contactLink: "Contact us",
      languagesTitle: "Available Languages",
      downloadPDF: "Download PDF",
      downloadMarkdown: "Download Markdown",
      backToTools: "Back to Tools Overview",
      inDevelopment: "In Development",
      currentlyAvailable: "Currently Available",
      statusNote: "Status Note",
      developmentNote: "The Treaty for Our Only Home is in active development. Currently available:",
      availableItems: "Framework documentation and advocacy materials",
      generalSupport: "General support via globalgovernanceframework@gmail.com",
      inDevItems: "Specialized implementation tools (in development)",
      contactFor: "Contact for Information",
      // Tool titles
      readinessTitle: "Governance Readiness Assessment",
      readinessDesc: "Comprehensive assessment tool for communities and nations considering treaty framework implementation with democratic evaluation criteria.",
      unscReformTitle: "UNSC Reform Implementation Guide",
      unscReformDesc: "Strategic guide for implementing veto override mechanisms and security council democratization with sovereignty bargain frameworks.",
      carbonTaxTitle: "Carbon Tax Pilot Template",
      carbonTaxDesc: "Complete template for designing carbon taxation systems with revenue sharing and climate adaptation funding mechanisms.",
      citizensInitiativeTitle: "Global Citizens' Initiative Toolkit",
      citizensInitiativeDesc: "Framework for implementing global referendums and direct democratic participation in international governance.",
      ecocideAdvocacyTitle: "Ecocide Law Advocacy Kit",
      ecocideAdvocacyDesc: "Comprehensive advocacy resources for establishing ecocide as international crime with enforcement mechanisms.",
      debtJusticeTitle: "Debt Justice Protocol Guide",
      debtJusticeDesc: "Implementation framework for automatic debt pauses during crises and economic justice mechanisms.",
      accountabilityFrameworkTitle: "Institutional Accountability Framework",
      accountabilityFrameworkDesc: "Tools for establishing transparency, oversight, and democratic control of global governance institutions.",
      sovereigntyBargainTitle: "Sovereignty Bargain Negotiation Guide",
      sovereigntyBargainDesc: "Strategic framework for negotiating power transitions and enhanced leadership opportunities in emerging governance domains.",
      crisisProtocolTitle: "Crisis Response Protocol Template",
      crisisProtocolDesc: "Framework for emergency governance procedures that maintain democratic oversight during global crises.",
      guardiansCharterTitle: "Council of Guardians Charter",
      guardiansCharterDesc: "Template for establishing long-term thinking institutions that protect intergenerational interests and constitutional principles.",
      stewardshipAdvocacyTitle: "Global Stewardship Advocacy Kit",
      stewardshipAdvocacyDesc: "Complete advocacy package including talking points, media materials, and organizing resources for treaty promotion.",
      municipalGuideTitle: "Municipal Governance Integration Guide",
      municipalGuideDesc: "Framework for cities and regions to participate in global governance and implement treaty mechanisms locally.",
      polycrisisTrainingTitle: "Polycrisis Response Training Manual",
      polycrisisTrainingDesc: "Educational resource for understanding interconnected global challenges and systemic governance solutions.",
      frameworkEssentialsTitle: "Treaty Framework Essentials",
      frameworkEssentialsDesc: "Comprehensive yet accessible guide explaining the treaty's core principles and transformation pathway.",
      executiveSummaryTitle: "Executive Summary for the Skeptic",
      executiveSummaryDesc: "Strategic overview addressing practical concerns about governance transformation and systemic risk management.",
      downloadButton: "Download"
    },
    sv: {
      title: "Verktyg för Fördraget för Vårt Enda Hem",
      subtitle: "Praktiska resurser för att implementera global styrningsomvandling",
      intro: "Dessa verktyg och mallar är utformade för att hjälpa dig implementera Fördraget för Vårt Enda Hem i olika sammanhang. Från att etablera styrningsreformpiloter till att bygga globala förvaltarallienser och förespråka för nyckelreformer, ger dessa resurser steg-för-steg-vägledning för att omvandla styrningssystem genom kooperativ transformation.",
      startKitTitle: "Global Förvaltare Startpaket",
      startKitDesc: "Ett komplett paket med allt du behöver för att starta ett globalt styrningsomvandlingsinitiativ. Inkluderar alla nödvändiga verktyg och mallar för påverkansarbete, pilotimplementering och förvaltaralliansbyggande.",
      startKitButton: "Ladda ner komplett Startpaket",
      coreTitle: "Grundläggande Implementeringsverktyg",
      coreDesc: "Väsentliga verktyg för att implementera viktiga komponenter av fördragsramverket, från UNSC-reform till kolskatt och globala medborgarinitiativ.",
      advocacyTitle: "Påverkansarbete & Rörelsebyggande Verktyg",
      advocacyDesc: "Resurser för att bygga politisk vilja, utbilda intressenter och skala styrningsomvandling till regionala och globala nivåer.",
      institutionalTitle: "Institutionell Design & Reformverktyg",
      institutionalDesc: "Verktyg för att designa nya styrningsmekanismer, reformera befintliga institutioner och säkerställa demokratisk ansvarighet i global styrning.",
      guidesTitle: "Ramverksguider",
      guidesDesc: "Tillgängliga guider för att hjälpa dig förstå och dela Fördraget för Vårt Enda Hem med olika målgrupper.",
      requestTitle: "Begär verktyg eller ge feedback",
      requestDesc: "Behöver du implementeringsresurser för ett specifikt styrningssammanhang? Har du förslag på fördragsförbättringar? Vi välkomnar dina synpunkter för att göra dessa verktyg mer användbara.",
      contactLink: "Kontakta oss",
      languagesTitle: "Tillgängliga språk",
      downloadPDF: "Ladda ner PDF",
      downloadMarkdown: "Ladda ner Markdown",
      backToTools: "Tillbaka till verktygsöversikt",
      inDevelopment: "Under utveckling",
      currentlyAvailable: "För närvarande tillgänglig",
      statusNote: "Statusanteckning",
      developmentNote: "Fördraget för Vårt Enda Hem är under aktiv utveckling. För närvarande tillgängligt:",
      availableItems: "Ramverksdokumentation och påverkansmaterial",
      generalSupport: "Allmän support via globalgovernanceframework@gmail.com",
      inDevItems: "Specialiserade implementeringsverktyg (under utveckling)",
      contactFor: "Kontakta för information",
      downloadButton: "Ladda ner"
    }
  };

  // Get current translations based on active locale
  $: texts = translations[currentLocale] || translations.en;
  
  // Tool data for each section - with status indicators
  const coreTools = [
    { id: 'governance-readiness-assessment', color: 'color-primary', status: 'development' },
    { id: 'unsc-reform-implementation-guide', color: 'color-secondary', status: 'development' },
    { id: 'carbon-tax-pilot-template', color: 'color-success', status: 'development' },
    { id: 'global-citizens-initiative-toolkit', color: 'color-accent', status: 'development' },
    { id: 'ecocide-law-advocacy-kit', color: 'color-wisdom', status: 'development' },
    { id: 'debt-justice-protocol-guide', color: 'color-warning', status: 'development' }
  ];

  const advocacyTools = [
    { id: 'global-stewardship-advocacy-kit', color: 'color-primary', status: 'available' },
    { id: 'municipal-governance-integration-guide', color: 'color-secondary', status: 'development' },
    { id: 'polycrisis-response-training-manual', color: 'color-accent', status: 'development' }
  ];

  const institutionalTools = [
    { id: 'institutional-accountability-framework', color: 'color-wisdom', status: 'development' },
    { id: 'sovereignty-bargain-negotiation-guide', color: 'color-warning', status: 'development' },
    { id: 'crisis-response-protocol-template', color: 'color-danger', status: 'development' },
    { id: 'council-of-guardians-charter', color: 'color-primary', status: 'development' }
  ];

  const toolNameToTranslationKey = {
    'governance-readiness-assessment': 'readiness',
    'unsc-reform-implementation-guide': 'unscReform',
    'carbon-tax-pilot-template': 'carbonTax',
    'global-citizens-initiative-toolkit': 'citizensInitiative',
    'ecocide-law-advocacy-kit': 'ecocideAdvocacy',
    'debt-justice-protocol-guide': 'debtJustice',
    'global-stewardship-advocacy-kit': 'stewardshipAdvocacy',
    'municipal-governance-integration-guide': 'municipalGuide',
    'polycrisis-response-training-manual': 'polycrisisTraining',
    'institutional-accountability-framework': 'accountabilityFramework',
    'sovereignty-bargain-negotiation-guide': 'sovereigntyBargain',
    'crisis-response-protocol-template': 'crisisProtocol',
    'council-of-guardians-charter': 'guardiansCharter'
  };

  // Status indicator component
  function getStatusBadge(status) {
    if (status === 'available') {
      return `<span class="status-badge available">✅ ${texts.currentlyAvailable}</span>`;
    } else {
      return `<span class="status-badge development">🚧 ${texts.inDevelopment}</span>`;
    }
  }

  // Handle download with status check
  function handleDownload(toolId, format, status) {
    if (status === 'available') {
      // Proceed with download
      const link = document.createElement('a');
      link.href = getFilePath(`${toolId}-${currentLocale}.${format}`);
      link.download = `${toolId}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Show development notice
      alert(`This tool is currently in development. Please contact globalgovernanceframework@gmail.com for updates on availability.`);
    }
  }
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

      <!-- Development Status Notice -->
      <div class="status-notice">
        <h3>{texts.statusNote}</h3>
        <p>{texts.developmentNote}</p>
        <ul>
          <li>✅ {texts.availableItems}</li>
          <li>✅ {texts.generalSupport}</li>
          <li>🚧 {texts.inDevItems}</li>
        </ul>
        <p><strong>{texts.contactFor}:</strong> globalgovernanceframework@gmail.com</p>
      </div>

      <!-- Start with the Global Stewardship Starter Kit -->
      <div class="start-kit-card">
        <div class="card-content">
          <div class="card-icon">🌍</div>
          <div class="card-text">
            <h2>{texts.startKitTitle}</h2>
            <p>{texts.startKitDesc}</p>
          </div>
          <div class="card-actions">
            <button 
              on:click={() => handleDownload('global-stewardship-starter-kit', 'zip', 'development')} 
              class="primary-btn"
            >
              {texts.startKitButton}
              <span class="icon">↓</span>
            </button>
            <span class="status-badge development">🚧 {texts.inDevelopment}</span>
          </div>
        </div>
      </div>
      
      <!-- Framework Guides -->
      <h2 class="section-title">{texts.guidesTitle}</h2>
      <p class="section-desc">{texts.guidesDesc}</p>
      
      <div class="tools-grid">
        <!-- Treaty Framework Essentials -->
        <div class="tool-card color-primary">
          <h3>{texts.frameworkEssentialsTitle}</h3>
          <p>{texts.frameworkEssentialsDesc}</p>
          <div class="tool-actions">
            <button 
              on:click={() => handleDownload('treaty-framework-essentials', 'pdf', 'available')} 
              class="download-btn pdf"
            >
              {texts.downloadPDF}
              <span class="icon">↓</span>
            </button>
            <button 
              on:click={() => handleDownload('treaty-framework-essentials', 'md', 'available')} 
              class="download-btn md"
            >
              {texts.downloadMarkdown}
              <span class="icon">↓</span>
            </button>
          </div>
          <div class="status-indicator">
            {@html getStatusBadge('available')}
          </div>
        </div>
        
        <!-- Executive Summary for the Skeptic -->
        <div class="tool-card color-secondary">
          <h3>{texts.executiveSummaryTitle}</h3>
          <p>{texts.executiveSummaryDesc}</p>
          <div class="tool-actions">
            <a href="{base}/frameworks/treaty-for-our-only-home#executive-summary-for-the-skeptic" class="download-btn pdf">
              View Online
              <span class="icon">→</span>
            </a>
            <button 
              on:click={() => handleDownload('executive-summary-for-the-skeptic', 'pdf', 'available')} 
              class="download-btn md"
            >
              {texts.downloadPDF}
              <span class="icon">↓</span>
            </button>
          </div>
          <div class="status-indicator">
            {@html getStatusBadge('available')}
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
              <button 
                on:click={() => handleDownload(tool.id, 'pdf', tool.status)} 
                class="download-btn pdf"
              >
                {texts.downloadPDF}
                <span class="icon">↓</span>
              </button>
              <button 
                on:click={() => handleDownload(tool.id, 'md', tool.status)} 
                class="download-btn md"
              >
                {texts.downloadMarkdown}
                <span class="icon">↓</span>
              </button>
            </div>
            <div class="status-indicator">
              {@html getStatusBadge(tool.status)}
            </div>
          </div>
        {/each}
      </div>

      <!-- Advocacy & Movement Building Tools -->
      <h2 class="section-title">{texts.advocacyTitle}</h2>
      <p class="section-desc">{texts.advocacyDesc}</p>
      
      <div class="tools-grid">
        {#each advocacyTools as tool}
          <div class="tool-card {tool.color}">
            <h3>{texts[`${toolNameToTranslationKey[tool.id]}Title`]}</h3>
            <p>{texts[`${toolNameToTranslationKey[tool.id]}Desc`]}</p>
            <div class="tool-actions">
              {#if tool.status === 'available'}
                <a href={getFilePath(`${tool.id}-${currentLocale}.zip`)} download class="download-btn pdf">
                  {texts.downloadButton}
                  <span class="icon">↓</span>
                </a>
              {:else}
                <button 
                  on:click={() => handleDownload(tool.id, 'pdf', tool.status)} 
                  class="download-btn pdf"
                >
                  {texts.downloadPDF}
                  <span class="icon">↓</span>
                </button>
                <button 
                  on:click={() => handleDownload(tool.id, 'md', tool.status)} 
                  class="download-btn md"
                >
                  {texts.downloadMarkdown}
                  <span class="icon">↓</span>
                </button>
              {/if}
            </div>
            <div class="status-indicator">
              {@html getStatusBadge(tool.status)}
            </div>
          </div>
        {/each}
      </div>

      <!-- Institutional Design & Reform Tools -->
      <h2 class="section-title">{texts.institutionalTitle}</h2>
      <p class="section-desc">{texts.institutionalDesc}</p>
      
      <div class="tools-grid">
        {#each institutionalTools as tool}
          <div class="tool-card {tool.color}">
            <h3>{texts[`${toolNameToTranslationKey[tool.id]}Title`]}</h3>
            <p>{texts[`${toolNameToTranslationKey[tool.id]}Desc`]}</p>
            <div class="tool-actions">
              <button 
                on:click={() => handleDownload(tool.id, 'pdf', tool.status)} 
                class="download-btn pdf"
              >
                {texts.downloadPDF}
                <span class="icon">↓</span>
              </button>
              <button 
                on:click={() => handleDownload(tool.id, 'md', tool.status)} 
                class="download-btn md"
              >
                {texts.downloadMarkdown}
                <span class="icon">↓</span>
              </button>
            </div>
            <div class="status-indicator">
              {@html getStatusBadge(tool.status)}
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
  /* Treaty for Our Only Home color scheme - from the main framework page */
  :root {
    --treaty-primary: #0A2540; /* Navy Blue - authority, stability, deep governance */
    --treaty-secondary: #00C49A; /* Teal - hope, cooperation, sustainable transformation */
    --treaty-accent: #3A6EA5; /* Blue - trust, international cooperation, diplomatic wisdom */
    --treaty-success: #6DAA3F; /* Green - environmental health, regenerative systems */
    --treaty-warning: #F5A623; /* Gold - urgency, important decisions, economic transformation */
    --treaty-danger: #C43B3B; /* Red - crisis, urgent action needed, system failures */
    --treaty-light: #E8F4FD; /* Light Blue - transparency, openness, democratic participation */
    --treaty-dark: #1A365D; /* Dark Navy - serious commitment, constitutional foundation */
    --treaty-wisdom: #2D3748; /* Charcoal - institutional knowledge, long-term thinking */
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
    background: linear-gradient(135deg, var(--treaty-primary) 0%, var(--treaty-secondary) 100%);
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
    color: var(--treaty-secondary);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: var(--treaty-primary);
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

  /* Status Notice */
  .status-notice {
    background-color: rgba(0, 196, 154, 0.1);
    border-radius: 0.75rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
    border: 1px solid rgba(0, 196, 154, 0.3);
  }

  .status-notice h3 {
    color: var(--treaty-primary);
    margin-bottom: 1rem;
    margin-top: 0;
  }

  .status-notice ul {
    list-style: none;
    padding-left: 0;
    margin: 1rem 0;
  }

  .status-notice li {
    margin-bottom: 0.5rem;
    padding-left: 1.5rem;
    position: relative;
  }

  .status-notice li::before {
    content: none;
  }
  
  /* Section Titles */
  .section-title {
    font-size: 1.875rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--treaty-primary);
  }
  
  .section-desc {
    margin-bottom: 2rem;
    color: #4b5563;
    line-height: 1.7;
    font-size: 1.125rem;
  }
  
  /* Start Kit Card */
  .start-kit-card {
    background: linear-gradient(135deg, rgba(0, 196, 154, 0.1) 0%, rgba(10, 37, 64, 0.1) 100%);
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(10, 37, 64, 0.1);
    border: 1px solid rgba(10, 37, 64, 0.2);
  }
  
  .card-content {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
  }
  
  .card-icon {
    font-size: 2.5rem;
    color: var(--treaty-primary);
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--treaty-primary);
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
    position: relative;
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
  
  /* Color Variations for Treaty Framework */
  .color-primary {
    border-left-color: var(--treaty-primary);
  }
  
  .color-primary h3 {
    color: var(--treaty-primary);
  }
  
  .color-secondary {
    border-left-color: var(--treaty-secondary);
  }
  
  .color-secondary h3 {
    color: var(--treaty-secondary);
  }
  
  .color-accent {
    border-left-color: var(--treaty-accent);
  }
  
  .color-accent h3 {
    color: var(--treaty-accent);
  }
  
  .color-success {
    border-left-color: var(--treaty-success);
  }
  
  .color-success h3 {
    color: var(--treaty-success);
  }
  
  .color-warning {
    border-left-color: var(--treaty-warning);
  }
  
  .color-warning h3 {
    color: var(--treaty-warning);
  }
  
  .color-danger {
    border-left-color: var(--treaty-danger);
  }
  
  .color-danger h3 {
    color: var(--treaty-danger);
  }

  .color-wisdom {
    border-left-color: var(--treaty-wisdom);
  }
  
  .color-wisdom h3 {
    color: var(--treaty-wisdom);
  }
  
  /* Tool Actions */
  .tool-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  /* Status Indicators */
  .status-indicator {
    margin-top: 1rem;
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .status-badge.available {
    background-color: rgba(109, 170, 63, 0.1);
    color: var(--treaty-success);
    border: 1px solid rgba(109, 170, 63, 0.3);
  }

  .status-badge.development {
    background-color: rgba(245, 166, 35, 0.1);
    color: var(--treaty-warning);
    border: 1px solid rgba(245, 166, 35, 0.3);
  }
  
  /* Buttons */
  .primary-btn {
    display: inline-flex;
    align-items: center;
    background-color: var(--treaty-primary);
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
    background-color: var(--treaty-secondary);
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
    border: none;
    cursor: pointer;
  }

  .download-btn.pdf {
    color: white;
  }

  .tool-card.color-primary .download-btn.pdf {
    background-color: var(--treaty-primary);
  }

  .tool-card.color-secondary .download-btn.pdf {
    background-color: var(--treaty-secondary);
  }

  .tool-card.color-accent .download-btn.pdf {
    background-color: var(--treaty-accent);
  }

  .tool-card.color-success .download-btn.pdf {
    background-color: var(--treaty-success);
  }

  .tool-card.color-warning .download-btn.pdf {
    background-color: var(--treaty-warning);
  }

  .tool-card.color-danger .download-btn.pdf {
    background-color: var(--treaty-danger);
  }

  .tool-card.color-wisdom .download-btn.pdf {
    background-color: var(--treaty-wisdom);
  }

  .download-btn.md {
    background-color: white;
    border: 1px solid;
  }

  .tool-card.color-primary .download-btn.md {
    color: var(--treaty-primary);
    border-color: var(--treaty-primary);
  }

  .tool-card.color-secondary .download-btn.md {
    color: var(--treaty-secondary);
    border-color: var(--treaty-secondary);
  }

  .tool-card.color-accent .download-btn.md {
    color: var(--treaty-accent);
    border-color: var(--treaty-accent);
  }

  .tool-card.color-success .download-btn.md {
    color: var(--treaty-success);
    border-color: var(--treaty-success);
  }

  .tool-card.color-warning .download-btn.md {
    color: var(--treaty-warning);
    border-color: var(--treaty-warning);
  }

  .tool-card.color-danger .download-btn.md {
    color: var(--treaty-danger);
    border-color: var(--treaty-danger);
  }

  .tool-card.color-wisdom .download-btn.md {
    color: var(--treaty-wisdom);
    border-color: var(--treaty-wisdom);
  }

  .download-btn:hover {
    transform: translateY(-1px);
  }
 
  .icon {
    margin-left: 0.5rem;
  }
 
  /* Feedback Card */
  .feedback-card {
    background-color: rgba(0, 196, 154, 0.1);
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 2rem;
    border: 1px solid rgba(0, 196, 154, 0.3);
  }

  .feedback-card h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: var(--treaty-primary);
  }

  .contact-link {
    color: var(--treaty-secondary);
    text-decoration: underline;
    font-weight: 500;
  }

  .contact-link:hover {
    color: var(--treaty-primary);
  }
 
  /* Back Link Bottom */
  .back-link-bottom {
    margin: 2rem 0;
    text-align: center;
  }

  .back-link-bottom a {
    display: inline-flex;
    align-items: center;
    color: var(--treaty-secondary);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .back-link-bottom a:hover {
    color: var(--treaty-primary);
  }
 
  /* Language Section */
  .language-section {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid #e5e7eb;
  }

  .language-section h3 {
    margin-bottom: 1rem;
    color: var(--treaty-primary);
  }
 
  .language-buttons {
    display: flex;
    gap: 0.5rem;
  }
 
  .lang-button {
    padding: 0.5rem 1rem;
    border: 1px solid var(--treaty-secondary);
    background-color: white;
    color: var(--treaty-secondary);
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;
  }

  .lang-button:hover {
    background-color: rgba(0, 196, 154, 0.1);
  }
 
  .lang-button.active {
    background-color: var(--treaty-primary);
    color: white;
    border-color: var(--treaty-primary);
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

    .tool-actions {
      flex-direction: column;
    }

    .download-btn {
      width: 100%;
      justify-content: center;
    }
  }
</style>
