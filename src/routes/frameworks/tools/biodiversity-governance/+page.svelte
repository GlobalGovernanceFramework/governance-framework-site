<!-- src/routes/frameworks/tools/biodiversity-governance/+page.svelte -->
<script>
  import { t, locale, setLocale } from '$lib/i18n';
  import { base } from '$app/paths';

  // Subscribe to stores
  $: currentT = $t;
  $: currentLocale = $locale;

  // Biodiversity color scheme
  const colors = {
    primary: '#2d5016', // Deep Forest Green
    secondary: '#4a7c29', // Forest Green
    accent: '#6b8e3d', // Sage Green
    light: '#a8c573', // Light Green
    earth: '#8b6f47', // Earth Brown
    highlight: '#c7a876' // Golden Sage
  };

  // Define file paths with language handling for biodiversity tools
  const getFilePath = (toolName, category = 'biodiversity-governance') => {
    // Check if the file already has language suffix
    if (toolName.includes('-sv') || toolName.includes('-en')) {
      return `${base}/frameworks/tools/${category}/${toolName}`;
    }
    
    // For potentially translated documents
    if (toolName.includes('seed-kit') || toolName.includes('guide') || toolName.includes('toolkit')) {
      const extension = toolName.split('.').pop();
      const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
      return `${base}/frameworks/tools/biodiversity-governance/${baseName}-${currentLocale}.${extension}`;
    }
    
    // For tools that might have language variations
    const translatableTools = [
      'blockchain-setup-guide',
      'fpic-2-protocols-template',
      'rights-escalation-ladder-framework',
      'hybrid-ubes-implementation-guide',
      'bio-arts-toolkit',
      'restoration-calendar-template',
      'crisis-response-protocols'
    ];
    
    if (translatableTools.some(tool => toolName.startsWith(tool))) {
      const extension = toolName.split('.').pop();
      const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
      return `${base}/frameworks/tools/biodiversity-governance/${baseName}-${currentLocale}.${extension}`;
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
      title: "Biodiversity Framework Tools",
      subtitle: "Practical resources for planetary healing and regenerative biodiversity governance",
      intro: "These tools and templates are designed to help you implement the Global Governance Biodiversity Implementation Framework across diverse contexts. From establishing Indigenous Digital Sovereignty Hubs to launching Bio-Arts Residencies, these resources provide step-by-step guidance for transforming biodiversity governance and creating a regenerative biosphere by 2045.",
      
      seedKitTitle: "Start with the Biodiversity Framework Seed Kit",
      seedKitDesc: "A complete starter package with essential resources including Sacred Seed Kit for Indigenous-Led Dialogues, FPIC 2.0 Protocols, Youth Leadership Pipeline Guide, and Corporate Redemption Pathways Toolkit.",
      seedKitButton: "Download Biodiversity Seed Kit",
      
      stakeholderGuidesTitle: "Stakeholder Implementation Guides",
      stakeholderGuidesDesc: "Specialized guides tailored for different stakeholder groups to effectively engage with and implement the biodiversity framework.",
      
      governanceToolsTitle: "Governance & Rights Tools",
      governanceToolsDesc: "Core tools for establishing indigenous-led governance, recognizing ecosystem rights, and implementing democratic biodiversity governance structures.",
      
      economicToolsTitle: "Economic Transformation Tools",
      economicToolsDesc: "Resources for implementing hybrid UBES systems, biodiversity impact bonds, and transitioning to biodiversity-positive economies.",
      
      culturalToolsTitle: "Cultural Mobilization Tools",
      culturalToolsDesc: "Tools for Bio-Arts Residencies, restoration festivals, and viral engagement campaigns to build global cultural movement for biodiversity.",
      
      technologyToolsTitle: "Technology & Monitoring Tools",
      technologyToolsDesc: "Blockchain systems, monitoring dashboards, and cyber-physical guardianship protocols for transparent and secure biodiversity governance.",
      
      requestTitle: "Request Tools or Provide Feedback",
      requestDesc: "Need implementation resources for a specific bioregion or context? Have suggestions for Indigenous communities or youth-led initiatives? We welcome your input to make these tools more inclusive and effective.",
      contactLink: "Contact us",
      languagesTitle: "Available Languages",
      downloadPDF: "Download PDF",
      downloadMarkdown: "Download Markdown",
      downloadZip: "Download Package",
      backToTools: "Back to Tools Overview",
      
      // Stakeholder Guide titles and descriptions
      technicalGuideTitle: "Technical Guide for Policymakers",
      technicalGuideDesc: "Comprehensive 14-page guide on governance structures, funding mechanisms, and pilot coordination for institutional leaders.",
      
      communityGuideTitle: "Community Implementation Guide", 
      communityGuideDesc: "5-page guide for establishing Indigenous Digital Sovereignty Hubs and participating in UBES systems.",
      
      youthGuideTitle: "Youth Engagement & Leadership Guide",
      youthGuideDesc: "4-page guide for Bio-Arts Residencies, advocacy campaigns, and BCT Youth Council participation.",
      
      corporateGuideTitle: "Corporate Transition & Redemption Guide",
      corporateGuideDesc: "12-page guide for Biodiversity Impact Bonds, transition support, and redemption pathways.",
      
      indigenousGuideTitle: "Indigenous Data Sovereignty Guide",
      indigenousGuideDesc: "10-page guide for Traditional Knowledge Repatriation and Cyber-Physical Guardianship protocols.",
      
      // Governance Tools
      blockchainSetupTitle: "Biodiversity Blockchain Setup Guide",
      blockchainSetupDesc: "Proof-of-stake implementation with AES-256 encryption and community control protocols for transparent governance.",
      
      fpicProtocolsTitle: "FPIC 2.0 Protocols Template",
      fpicProtocolsDesc: "Blockchain-verified consent mechanisms for digital age Indigenous sovereignty and Traditional Knowledge protection.",
      
      rightsLadderTitle: "Rights Escalation Ladder Framework",
      rightsLadderDesc: "Automatic ecosystem rights progression based on health indicators, leading to legal personhood for thriving ecosystems.",
      
      youthPipelineTitle: "Youth Leadership Pipeline Guide",
      youthPipelineDesc: "Mentorship and progressive responsibility structures for developing next-generation biodiversity leaders.",
      
      futureCouncilTitle: "Future Beings Council Setup",
      futureCouncilDesc: "AI-assisted intergenerational representation protocols giving future generations formal voting power.",
      
      // Economic Tools
      ubesImplementationTitle: "Hybrid UBES Implementation Guide",
      ubesImplementationDesc: "Community currency systems with CBD-backed liquidity pools and traditional exchange integration.",
      
      impactBondsTitle: "Biodiversity Impact Bonds & Financing",
      impactBondsDesc: "Pay-for-success conservation financing including debt-for-nature swaps and innovative funding mechanisms.",
      
      corporateTransitionTitle: "Corporate Transition Support Toolkit",
      corporateTransitionDesc: "Market disruption preparation, adaptation strategies, and redemption pathways for extractive industries.",
      
      // Cultural Tools
      bioArtsTitle: "Bio-Arts Residencies Toolkit",
      bioArtsDesc: "Artist-scientist-indigenous collaboration guides with cultural sovereignty protection and viral engagement strategies.",
      
      restorationCalendarTitle: "Global Restoration Calendar Template",
      restorationCalendarDesc: "Annual bioregional celebration planning and traditional ceremony integration for worldwide cultural movement.",
      
      influencerKitTitle: "Bio-Influencer Training & Campaign Kit",
      influencerKitDesc: "Region-specific social media strategies, counter-narrative approaches, and cultural tipping point measurement.",
      
      // Technology Tools
      dashboardTitle: "Public Trust Dashboard & Evaluation",
      dashboardTitle: "Public Trust Dashboard & Evaluation Template",
      dashboardDesc: "Real-time transparency, audit reporting, and M&E logic model integration for democratic accountability.",
      
      guardianshipTitle: "Cyber-Physical Guardianship Protocols",
      guardianshipDesc: "Indigenous-controlled digital infrastructure security including guardian drone systems and Traditional Knowledge protection.",
      
      crisisProtocolsTitle: "Crisis Response Protocols",
      crisisProtocolsDesc: "72-hour Biodiversity SWAT Team deployment and Auto-Defense activation for ecosystem emergencies.",
      
      downloadButton: "Download"
    },
    sv: {
      title: "Biodiversitetsramverk Verktyg",
      subtitle: "Praktiska resurser för planetär läkning och regenerativ biodiversitetsstyrning",
      intro: "Dessa verktyg och mallar är utformade för att hjälpa dig implementera det Globala Styrningsramverket för Biodiversitetsimplementering i olika sammanhang. Från att etablera Ursprungsdigital Suveränitetshubbar till att lansera Bio-Konstresidenser, ger dessa resurser steg-för-steg-vägledning för att omvandla biodiversitetsstyrning och skapa en regenerativ biosfär till 2045.",
      
      seedKitTitle: "Börja med Biodiversitetsramverkets Fröpaket",
      seedKitDesc: "Ett komplett startpaket med väsentliga resurser inklusive Heligt Fröpaket för Ursprungsbefolkningsledda Dialoger, FPIC 2.0 Protokoll, Guide för Ungdomsledarskap, och Företagsförlösningsvägar Verktygskit.",
      seedKitButton: "Ladda ner Biodiversitetsfröpaket",
      
      stakeholderGuidesTitle: "Intressentimplementeringsguider",
      stakeholderGuidesDesc: "Specialiserade guider skräddarsydda för olika intressentgrupper för att effektivt engagera sig i och implementera biodiversitetsramverket.",
      
      governanceToolsTitle: "Styrnings- och Rättighetsverktyg",
      governanceToolsDesc: "Grundläggande verktyg för att etablera ursprungsbefolkningsledd styrning, erkänna ekosystemrättigheter och implementera demokratiska biodiversitetsstyrningsstrukturer.",
      
      economicToolsTitle: "Ekonomiska Transformationsverktyg",
      economicToolsDesc: "Resurser för att implementera hybrid UBES-system, biodiversitetspåverkningsobligationer och övergång till biodiversitetspositiva ekonomier.",
      
      culturalToolsTitle: "Kulturella Mobiliseringsverktyg",
      culturalToolsDesc: "Verktyg för Bio-Konstresidenser, restaureringsfestivaler och virala engagemangskampanjer för att bygga global kulturell rörelse för biodiversitet.",
      
      technologyToolsTitle: "Teknologi- och Övervakningsverktyg",
      technologyToolsDesc: "Blockkedjor, övervakningsdashboards och cyber-fysiska vårdnadsprotokoll för transparent och säker biodiversitetsstyrning.",
      
      requestTitle: "Begär verktyg eller ge feedback",
      requestDesc: "Behöver du implementeringsresurser för en specifik bioregion eller kontext? Har du förslag för ursprungssamhällen eller ungdomsledda initiativ? Vi välkomnar dina synpunkter för att göra dessa verktyg mer inkluderande och effektiva.",
      contactLink: "Kontakta oss",
      languagesTitle: "Tillgängliga språk",
      downloadPDF: "Ladda ner PDF",
      downloadMarkdown: "Ladda ner Markdown",
      downloadZip: "Ladda ner Paket",
      backToTools: "Tillbaka till verktygsöversikt",
      
      // Swedish translations for all tool titles and descriptions
      technicalGuideTitle: "Teknisk Guide för Beslutsfattare",
      technicalGuideDesc: "Omfattande 14-sidig guide om styrningsstrukturer, finansieringsmekanismer och pilotsamordning för institutionella ledare.",
      
      communityGuideTitle: "Samhällsimplementeringsguide",
      communityGuideDesc: "5-sidig guide för att etablera Ursprungsdigital Suveränitetshubbar och delta i UBES-system.",
      
      youthGuideTitle: "Ungdomsengagemang & Ledarskapsguide",
      youthGuideDesc: "4-sidig guide för Bio-Konstresidenser, påverkanskampanjer och BCT Ungdomsrådsdeltagande.",
      
      corporateGuideTitle: "Företagsövergång & Återlösningsguide",
      corporateGuideDesc: "12-sidig guide för Biodiversitetspåverkningsobligationer, övergångsstöd och återlösningsvägar.",
      
      indigenousGuideTitle: "Ursprungsbefolknings Datasuveränitetsguide",
      indigenousGuideDesc: "10-sidig guide för Traditionell Kunskapsrepatriering och Cyber-Fysiska Vårdnadsprotokoll.",
      
      // Additional Swedish translations for other tools...
      blockchainSetupTitle: "Biodiversitetsblockkedja Uppsättningsguide",
      blockchainSetupDesc: "Proof-of-stake implementering med AES-256 kryptering och samhällskontrollprotokoll för transparent styrning.",
      
      downloadButton: "Ladda ner"
    }
  };

  // Get current translations based on active locale
  $: texts = translations[currentLocale] || translations.en;
  
  // Tool data organized by category
  const stakeholderGuides = [
    { id: 'technical-guide-policymakers', color: 'color-primary' },
    { id: 'community-implementation-guide', color: 'color-secondary' },
    { id: 'youth-engagement-leadership-guide', color: 'color-accent' },
    { id: 'corporate-transition-redemption-guide', color: 'color-earth' },
    { id: 'indigenous-data-sovereignty-guide', color: 'color-highlight' }
  ];
  
  const governanceTools = [
    { id: 'blockchain-setup-guide', color: 'color-primary' },
    { id: 'fpic-2-protocols-template', color: 'color-secondary' },
    { id: 'rights-escalation-ladder-framework', color: 'color-accent' },
    { id: 'youth-leadership-pipeline-guide', color: 'color-earth' },
    { id: 'future-beings-council-setup', color: 'color-highlight' }
  ];
  
  const economicTools = [
    { id: 'hybrid-ubes-implementation-guide', color: 'color-primary' },
    { id: 'impact-bonds-financing', color: 'color-secondary' },
    { id: 'corporate-transition-support-toolkit', color: 'color-accent' }
  ];
  
  const culturalTools = [
    { id: 'bio-arts-toolkit', color: 'color-primary' },
    { id: 'restoration-calendar-template', color: 'color-secondary' },
    { id: 'bio-influencer-campaign', color: 'color-accent' }
  ];
  
  const technologyTools = [
    { id: 'trust-dashboard-evaluation', color: 'color-primary' },
    { id: 'cyber-guardianship-complete', color: 'color-secondary' },
    { id: 'crisis-response-protocols', color: 'color-accent' }
  ];

  // Map tool IDs to translation keys
  const toolNameToTranslationKey = {
    'technical-guide-policymakers': 'technicalGuide',
    'community-implementation-guide': 'communityGuide',
    'youth-engagement-leadership-guide': 'youthGuide',
    'corporate-transition-redemption-guide': 'corporateGuide',
    'indigenous-data-sovereignty-guide': 'indigenousGuide',
    'blockchain-setup-guide': 'blockchainSetup',
    'fpic-2-protocols-template': 'fpicProtocols',
    'rights-escalation-ladder-framework': 'rightsLadder',
    'youth-leadership-pipeline-guide': 'youthPipeline',
    'future-beings-council-setup': 'futureCouncil',
    'hybrid-ubes-implementation-guide': 'ubesImplementation',
    'impact-bonds-financing': 'impactBonds',
    'corporate-transition-support-toolkit': 'corporateTransition',
    'bio-arts-toolkit': 'bioArts',
    'restoration-calendar-template': 'restorationCalendar',
    'bio-influencer-campaign': 'influencerKit',
    'trust-dashboard-evaluation': 'dashboard',
    'cyber-guardianship-complete': 'guardianship',
    'crisis-response-protocols': 'crisisProtocols'
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

      <!-- Start with the Biodiversity Framework Seed Kit -->
      <div class="seed-kit-card">
        <div class="card-content">
          <div class="card-icon">🌿</div>
          <div class="card-text">
            <h2>{texts.seedKitTitle}</h2>
            <p>{texts.seedKitDesc}</p>
          </div>
          <div class="card-actions">
            <a href={getFilePath(`biodiversity-seed-kit-${currentLocale}.zip`)} download class="primary-btn">
              {texts.seedKitButton}
              <span class="icon">↓</span>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Stakeholder Implementation Guides -->
      <h2 class="section-title">{texts.stakeholderGuidesTitle}</h2>
      <p class="section-desc">{texts.stakeholderGuidesDesc}</p>
      
      <div class="tools-grid">
        {#each stakeholderGuides as tool}
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
      
      <!-- Governance & Rights Tools -->
      <h2 class="section-title">{texts.governanceToolsTitle}</h2>
      <p class="section-desc">{texts.governanceToolsDesc}</p>
      
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

      <!-- Economic Transformation Tools -->
      <h2 class="section-title">{texts.economicToolsTitle}</h2>
      <p class="section-desc">{texts.economicToolsDesc}</p>
      
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

      <!-- Cultural Mobilization Tools -->
      <h2 class="section-title">{texts.culturalToolsTitle}</h2>
      <p class="section-desc">{texts.culturalToolsDesc}</p>
      
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

      <!-- Technology & Monitoring Tools -->
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
  /* CSS Custom Properties for Biodiversity Color Scheme */
  :root {
    --bio-primary: #2d5016; /* Deep Forest Green */
    --bio-secondary: #4a7c29; /* Forest Green */
    --bio-accent: #6b8e3d; /* Sage Green */
    --bio-light: #a8c573; /* Light Green */
    --bio-earth: #8b6f47; /* Earth Brown */
    --bio-highlight: #c7a876; /* Golden Sage */
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
  
  /* Hero Section with Biodiversity gradient */
  .hero {
    padding: 3rem 0;
    background: linear-gradient(to bottom right, var(--bio-primary), var(--bio-secondary));
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
    color: var(--bio-secondary);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: var(--bio-primary);
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
    color: var(--bio-primary);
  }
  
  .section-desc {
    margin-bottom: 2rem;
    color: #4b5563;
    line-height: 1.7;
    font-size: 1.125rem;
  }
  
  /* Seed Kit Card */
  .seed-kit-card {
    background: linear-gradient(135deg, rgba(168, 197, 115, 0.1) 0%, rgba(107, 142, 61, 0.1) 100%);
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(45, 80, 22, 0.1);
    border: 1px solid rgba(45, 80, 22, 0.2);
  }
  
  .card-content {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
  }
  
  .card-icon {
    font-size: 2.5rem;
    color: var(--bio-primary);
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--bio-primary);
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
  
  /* Biodiversity Color Variations */
  .color-primary {
    border-left-color: var(--bio-primary);
  }
  
  .color-primary h3 {
    color: var(--bio-primary);
  }
  
  .color-secondary {
    border-left-color: var(--bio-secondary);
  }
  
  .color-secondary h3 {
    color: var(--bio-secondary);
  }
  
  .color-accent {
    border-left-color: var(--bio-accent);
  }
  
  .color-accent h3 {
    color: var(--bio-accent);
  }
  
  .color-earth {
    border-left-color: var(--bio-earth);
  }
  
  .color-earth h3 {
    color: var(--bio-earth);
  }
  
  .color-highlight {
    border-left-color: var(--bio-highlight);
  }
  
  .color-highlight h3 {
    color: var(--bio-highlight);
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
    background-color: var(--bio-primary);
    color: white;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: var(--bio-secondary);
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
    background-color: var(--bio-primary);
  }

  .tool-card.color-secondary .download-btn.pdf {
    background-color: var(--bio-secondary);
  }

  .tool-card.color-accent .download-btn.pdf {
    background-color: var(--bio-accent);
  }

  .tool-card.color-earth .download-btn.pdf {
    background-color: var(--bio-earth);
  }

  .tool-card.color-highlight .download-btn.pdf {
    background-color: var(--bio-highlight);
  }

  /* Markdown Download Button Colors */
  .download-btn.md {
    background-color: white;
    border: 1px solid;
  }

  .tool-card.color-primary .download-btn.md {
    color: var(--bio-primary);
    border-color: var(--bio-primary);
  }

  .tool-card.color-secondary .download-btn.md {
    color: var(--bio-secondary);
    border-color: var(--bio-secondary);
  }

  .tool-card.color-accent .download-btn.md {
    color: var(--bio-accent);
    border-color: var(--bio-accent);
  }

  .tool-card.color-earth .download-btn.md {
    color: var(--bio-earth);
    border-color: var(--bio-earth);
  }

  .tool-card.color-highlight .download-btn.md {
    color: var(--bio-highlight);
    border-color: var(--bio-highlight);
  }
  
  .download-btn:hover {
    transform: translateY(-1px);
  }
  
  .icon {
    margin-left: 0.5rem;
  }
  
  /* Feedback Card */
  .feedback-card {
    background-color: rgba(139, 111, 71, 0.1);
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    border-left: 4px solid var(--bio-earth);
  }
  
  .feedback-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--bio-earth);
  }
  
  .feedback-card p {
    color: #4b5563;
    margin-bottom: 1rem;
  }
  
  .contact-link {
    color: var(--bio-highlight);
    text-decoration: underline;
    font-weight: 500;
  }
  
  .contact-link:hover {
    color: var(--bio-earth);
  }
  
  /* Back Link */
  .back-link-bottom {
    margin-bottom: 2rem;
  }
  
  .back-link-bottom a {
    display: inline-flex;
    align-items: center;
    color: var(--bio-secondary);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }
  
  .back-link-bottom a:hover {
    color: var(--bio-primary);
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
    color: var(--bio-primary);
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
    color: var(--bio-primary);
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s;
  }

  .lang-button:hover {
    background-color: rgba(168, 197, 115, 0.1);
    border-color: var(--bio-secondary);
  }

  .lang-button.active {
    background-color: var(--bio-primary);
    color: white;
    border-color: var(--bio-primary);
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

  /* Special styling for biodiversity-specific elements */
  .content-wrapper {
    position: relative;
  }

  /* Add subtle nature-inspired decorative elements */
  .section-title::before {
    content: "🌱";
    margin-right: 0.5rem;
    opacity: 0.7;
  }

  /* Enhance the seed kit card with additional visual elements */
  .seed-kit-card::before {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background: linear-gradient(45deg, var(--bio-primary), var(--bio-secondary), var(--bio-accent));
    border-radius: 0.75rem;
    z-index: -1;
    opacity: 0.1;
  }

  .seed-kit-card {
    position: relative;
  }

  /* Add hover effects for tool cards */
  .tool-card {
    transition: all 0.3s ease;
  }

  .tool-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(45, 80, 22, 0.15);
  }

  /* Color-coded borders that intensify on hover */
  .tool-card.color-primary:hover {
    border-left-width: 6px;
    border-left-color: var(--bio-primary);
  }

  .tool-card.color-secondary:hover {
    border-left-width: 6px;
    border-left-color: var(--bio-secondary);
  }

  .tool-card.color-accent:hover {
    border-left-width: 6px;
    border-left-color: var(--bio-accent);
  }

  .tool-card.color-earth:hover {
    border-left-width: 6px;
    border-left-color: var(--bio-earth);
  }

  .tool-card.color-highlight:hover {
    border-left-width: 6px;
    border-left-color: var(--bio-highlight);
  }

  /* Loading states for download buttons */
  .download-btn:active {
    transform: translateY(0);
  }

  /* Focus states for accessibility */
  .download-btn:focus,
  .primary-btn:focus,
  .lang-button:focus {
    outline: 2px solid var(--bio-accent);
    outline-offset: 2px;
  }

  /* Print-friendly styles */
  @media print {
    .hero {
      background: var(--bio-primary) !important;
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
</style>
