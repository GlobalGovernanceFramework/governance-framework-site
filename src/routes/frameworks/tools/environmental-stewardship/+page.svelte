<!-- src/routes/frameworks/tools/environmental-stewardship/+page.svelte -->
<script>
  import { t, locale, setLocale } from '$lib/i18n';
  import { base } from '$app/paths';

  // Subscribe to stores
  $: currentT = $t;
  $: currentLocale = $locale;

  // Define file paths with language handling and correct routes
  const getFilePath = (toolName, category = 'environmental-stewardship') => {
    // Check if the file already has language suffix
    if (toolName.includes('-sv') || toolName.includes('-en')) {
      return `${base}/frameworks/tools/${category}/${toolName}`;
    }
    
    // For potentially translated documents
    if (toolName.includes('one-page-essence') || toolName.includes('first-100-days')) {
      // For translated documents in environmental-stewardship
      const extension = toolName.split('.').pop();
      const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
      return `${base}/frameworks/tools/environmental-stewardship/${baseName}-${currentLocale}.${extension}`;
    }
    
    // For tools that might have language variations
    if (['dynamic-rights-spectrum-guide',
         'ecosystem-health-indicators',
         'nexus-impact-assessment-tool',
         'reparations-protocol'].includes(toolName.split('.')[0])) {
      const extension = toolName.split('.').pop();
      const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
      return `${base}/frameworks/tools/environmental-stewardship/${baseName}-${currentLocale}.${extension}`;
    }
    
    // Default path for other files in their respective categories
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
      title: "Environmental Stewardship Framework Tools",
      subtitle: "Practical resources to implement regenerative environmental governance",
      intro: "These tools and templates are designed to help you implement the Environmental Stewardship Framework in various contexts. From establishing sacred seed kits for interfaith restoration to monitoring ecosystem health, these resources provide step-by-step guidance for transforming environmental governance.",
      seedKitTitle: "Start with the Sacred Seed Kit",
      seedKitDesc: "A complete package for launching interfaith and indigenous-led restoration initiatives, including Dialogue Facilitation Guide and Sacred Space Setup Guide. (From Spiritual Framework)",
      seedKitButton: "Download Sacred Seed Kit",
      coreToolsTitle: "Core Environmental Tools",
      coreToolsDesc: "Essential tools specifically designed for environmental stewardship, including rights recognition and ecosystem assessment frameworks.",
      governanceToolsTitle: "Governance & Coordination Tools",
      governanceToolsDesc: "Tools from our governance framework to facilitate stakeholder engagement and community coordination in environmental initiatives.",
      monitoringTitle: "Monitoring & Evaluation Tools",
      monitoringDesc: "Resources to track progress, measure impact, and ensure accountability in your environmental stewardship initiatives.",
      guidesTitle: "Framework Guides",
      guidesDesc: "Essential guides to help you understand and share the Environmental Stewardship Framework with others.",
      requestTitle: "Request Tools or Provide Feedback",
      requestDesc: "Need implementation resources for a specific purpose? Have suggestions for improvements? We welcome your input to make these tools more useful.",
      contactLink: "Contact us",
      languagesTitle: "Available Languages",
      downloadPDF: "Download PDF",
      downloadMarkdown: "Download Markdown",
      backToTools: "Back to Tools Overview",
      
      // Tool titles and descriptions
      sacredSeedKitTitle: "Sacred Seed Kit",
      sacredSeedKitDesc: "Complete package for interfaith and indigenous-led restoration initiatives with dialogue facilitation and sacred space setup guides.",
      
      dynamicRightsTitle: "Dynamic Rights Spectrum Guide",
      dynamicRightsDesc: "Framework for recognizing and implementing rights for ecosystems, species, AI, and other beings across the spectrum of existence.",
      
      ecosystemHealthTitle: "Ecosystem Health Indicators",
      ecosystemHealthDesc: "Comprehensive metrics and monitoring tools for assessing the health and vitality of ecosystems in your stewardship area.",
      
      nexusAssessmentTitle: "Nexus Impact Assessment Tool",
      nexusAssessmentDesc: "Tool for evaluating water-energy-food nexus interactions and trade-offs in environmental stewardship decisions.",
      
      reparationsTitle: "Reparations Protocol",
      reparationsDesc: "Structured approach for identifying, documenting, and addressing environmental and technological harms through restorative justice.",
      
      stakeholderCharterTitle: "Stakeholder Engagement Charter Template",
      stakeholderCharterDesc: "Template for creating comprehensive stakeholder engagement agreements that ensure inclusive participation in environmental governance.",
      
      communityWellBeingTitle: "Community Well-Being Index",
      communityWellBeingDesc: "Framework for measuring and tracking community well-being improvements linked to ecosystem restoration and environmental stewardship.",
      
      onePageEssenceTitle: "One-Page Essence",
      onePageEssenceDesc: "Core framework distilled into key principles, immediate actions, and 2050 vision for quick understanding and sharing.",
      
      first100DaysTitle: "First 100 Days Playbook",
      first100DaysDesc: "Practical steps for municipalities, leaders, and organizations to get started with environmental stewardship implementation.",
      
      downloadButton: "Download"
    },
    sv: {
      title: "Miljöförvaltningsramverk Verktyg",
      subtitle: "Praktiska resurser för att implementera regenerativ miljöstyrning",
      intro: "Dessa verktyg och mallar är utformade för att hjälpa dig implementera Miljöförvaltningsramverket i olika sammanhang. Från att etablera heliga fröpaket för interfaith-restaurering till att övervaka ekosystemhälsa, ger dessa resurser steg-för-steg-vägledning för att omvandla miljöstyrning.",
      seedKitTitle: "Börja med det Heliga Fröpaketet",
      seedKitDesc: "Ett komplett paket för att lansera interfaith- och ursprungsbefolkningsledda restaureringsinitiativ, inklusive dialogfacilitering och guide för uppsättning av heliga utrymmen. (Från Spirituellt Ramverk)",
      seedKitButton: "Ladda ner Heligt Fröpaket",
      coreToolsTitle: "Grundläggande miljöverktyg",
      coreToolsDesc: "Väsentliga verktyg specifikt utformade för miljöförvaltning, inklusive rättighetserkännande och ramverk för ekosystembedömning.",
      governanceToolsTitle: "Styrnings- och samordningsverktyg",
      governanceToolsDesc: "Verktyg från vårt styrningsramverk för att underlätta intressentengagemang och samhällssamordning i miljöinitiativ.",
      monitoringTitle: "Övervaknings- och utvärderingsverktyg",
      monitoringDesc: "Resurser för att spåra framsteg, mäta påverkan och säkerställa ansvarsskyldighet i dina miljöförvaltningsinitiativ.",
      guidesTitle: "Ramverksguider",
      guidesDesc: "Viktiga guider för att hjälpa dig förstå och dela Miljöförvaltningsramverket med andra.",
      requestTitle: "Begär verktyg eller ge feedback",
      requestDesc: "Behöver du implementeringsresurser för ett specifikt syfte? Har du förslag på förbättringar? Vi välkomnar dina synpunkter för att göra dessa verktyg mer användbara.",
      contactLink: "Kontakta oss",
      languagesTitle: "Tillgängliga språk",
      downloadPDF: "Ladda ner PDF",
      downloadMarkdown: "Ladda ner Markdown",
      backToTools: "Tillbaka till verktygsöversikt",
      
      // Tool titles and descriptions in Swedish
      sacredSeedKitTitle: "Heligt Fröpaket",
      sacredSeedKitDesc: "Komplett paket för interfaith- och ursprungsbefolkningsledda restaureringsinitiativ med dialogfacilitering och guider för uppsättning av heliga utrymmen.",
      
      dynamicRightsTitle: "Guide för Dynamiskt Rättighetsspektrum",
      dynamicRightsDesc: "Ramverk för att erkänna och implementera rättigheter för ekosystem, arter, AI och andra varelser över existensspektrumet.",
      
      ecosystemHealthTitle: "Indikatorer för Ekosystemhälsa",
      ecosystemHealthDesc: "Omfattande mätvärden och övervakningsverktyg för att bedöma hälsan och vitaliteten hos ekosystem i ditt förvaltningsområde.",
      
      nexusAssessmentTitle: "Nexus Konsekvensbedömningsverktyg",
      nexusAssessmentDesc: "Verktyg för att utvärdera vatten-energi-mat nexus interaktioner och avvägningar i miljöförvaltningsbeslut.",
      
      reparationsTitle: "Reparationsprotokoll",
      reparationsDesc: "Strukturerat tillvägagångssätt för att identifiera, dokumentera och åtgärda miljö- och tekniska skador genom återställande rättvisa.",
      
      stakeholderCharterTitle: "Mall för Intressentengagemangsstadga",
      stakeholderCharterDesc: "Mall för att skapa omfattande intressentengagemangsavtal som säkerställer inkluderande deltagande i miljöstyrning.",
      
      communityWellBeingTitle: "Index för Samhällets Välbefinnande",
      communityWellBeingDesc: "Ramverk för att mäta och spåra förbättringar av samhällets välbefinnande kopplade till ekosystemrestaurering och miljöförvaltning.",
      
      onePageEssenceTitle: "Sidessens",
      onePageEssenceDesc: "Kärnramverk destillerat till nyckelprinciper, omedelbara åtgärder och 2050-vision för snabb förståelse och delning.",
      
      first100DaysTitle: "Första 100 Dagarna Playbook",
      first100DaysDesc: "Praktiska steg för kommuner, ledare och organisationer att komma igång med implementering av miljöförvaltning.",
      
      downloadButton: "Ladda ner"
    }
  };

  // Get current translations based on active locale
  $: texts = translations[currentLocale] || translations.en;
  
  // Tool data for each section with correct categories
  const coreTools = [
    { id: 'dynamic-rights-spectrum-guide', color: 'color-ecosystem', category: 'environmental-stewardship' },
    { id: 'ecosystem-health-indicators', color: 'color-harmony', category: 'environmental-stewardship' },
    { id: 'nexus-impact-assessment-tool', color: 'color-solar', category: 'environmental-stewardship' },
    { id: 'reparations-protocol', color: 'color-earth', category: 'environmental-stewardship' }
  ];
  
  const governanceTools = [
    { id: 'stakeholder-engagement-charter', color: 'color-harmony', category: 'governance' },
    { id: 'community-well-being-index', color: 'color-rights', category: 'governance' }
  ];

  const toolNameToTranslationKey = {
    'dynamic-rights-spectrum-guide': 'dynamicRights',
    'ecosystem-health-indicators': 'ecosystemHealth',
    'nexus-impact-assessment-tool': 'nexusAssessment',
    'reparations-protocol': 'reparations',
    'stakeholder-engagement-charter': 'stakeholderCharter',
    'community-well-being-index': 'communityWellBeing'
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

      <!-- Start with the Sacred Seed Kit -->
      <div class="seed-kit-card">
        <div class="card-content">
          <div class="card-icon">🌱</div>
          <div class="card-text">
            <h2>{texts.seedKitTitle}</h2>
            <p>{texts.seedKitDesc}</p>
          </div>
          <div class="card-actions">
            <a href={getFilePath(`sacred-seed-kit-${currentLocale}.zip`, 'religious-and-spiritual-dialogue-governance')} download class="primary-btn">
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
        <!-- One-Page Essence -->
        <div class="tool-card color-ecosystem">
          <h3>{texts.onePageEssenceTitle}</h3>
          <p>{texts.onePageEssenceDesc}</p>
          <div class="tool-actions">
            <a href={getFilePath(`one-page-essence-${currentLocale}.pdf`)} download class="download-btn pdf">
              {texts.downloadPDF}
              <span class="icon">↓</span>
            </a>
            <a href={getFilePath(`one-page-essence-${currentLocale}.md`)} download class="download-btn md">
              {texts.downloadMarkdown}
              <span class="icon">↓</span>
            </a>
          </div>
        </div>
        
        <!-- First 100 Days Playbook -->
        <div class="tool-card color-solar">
          <h3>{texts.first100DaysTitle}</h3>
          <p>{texts.first100DaysDesc}</p>
          <div class="tool-actions">
            <a href={getFilePath(`first-100-days-playbook-${currentLocale}.pdf`)} download class="download-btn pdf">
              {texts.downloadPDF}
              <span class="icon">↓</span>
            </a>
            <a href={getFilePath(`first-100-days-playbook-${currentLocale}.md`)} download class="download-btn md">
              {texts.downloadMarkdown}
              <span class="icon">↓</span>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Core Environmental Tools -->
      <h2 class="section-title">{texts.coreToolsTitle}</h2>
      <p class="section-desc">{texts.coreToolsDesc}</p>
      
      <div class="tools-grid">
        {#each coreTools as tool}
          <div class="tool-card {tool.color}">
            <h3>{texts[`${toolNameToTranslationKey[tool.id]}Title`]}</h3>
            <p>{texts[`${toolNameToTranslationKey[tool.id]}Desc`]}</p>
            <div class="tool-actions">
              <a href={getFilePath(`${tool.id}-${currentLocale}.pdf`, tool.category)} download class="download-btn pdf">
                {texts.downloadPDF}
                <span class="icon">↓</span>
              </a>
              <a href={getFilePath(`${tool.id}-${currentLocale}.md`, tool.category)} download class="download-btn md">
                {texts.downloadMarkdown}
                <span class="icon">↓</span>
              </a>
            </div>
          </div>
        {/each}
      </div>

      <!-- Governance & Coordination Tools -->
      <h2 class="section-title">{texts.governanceToolsTitle}</h2>
      <p class="section-desc">{texts.governanceToolsDesc}</p>
      
      <div class="tools-grid">
        {#each governanceTools as tool}
          <div class="tool-card {tool.color}">
            <h3>{texts[`${toolNameToTranslationKey[tool.id]}Title`]}</h3>
            <p>{texts[`${toolNameToTranslationKey[tool.id]}Desc`]}</p>
            <div class="tool-actions">
              <a href={getFilePath(`${tool.id}-${currentLocale}.pdf`, tool.category)} download class="download-btn pdf">
                {texts.downloadPDF}
                <span class="icon">↓</span>
              </a>
              <a href={getFilePath(`${tool.id}-${currentLocale}.md`, tool.category)} download class="download-btn md">
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
  
  /* Hero Section with Environmental color scheme */
  .hero {
    padding: 3rem 0;
    background: linear-gradient(to bottom right, #6DAA3F, #3A6EA5);
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
    color: #6DAA3F;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: #5A8F33;
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
    color: #6DAA3F; /* Ecosystem Green */
  }
  
  .section-desc {
    margin-bottom: 2rem;
    color: #4b5563;
    line-height: 1.7;
    font-size: 1.125rem;
  }
  
  /* Seed Kit Card */
  .seed-kit-card {
    background: linear-gradient(135deg, #f0f8f0 0%, #e8f5e8 100%);
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(109, 170, 63, 0.1);
    border: 1px solid rgba(109, 170, 63, 0.2);
  }
  
  .card-content {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
  }
  
  .card-icon {
    font-size: 2.5rem;
    color: #6DAA3F;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #6DAA3F;
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
  
  /* Environmental Stewardship Color Variations */
  .color-ecosystem {
    border-left-color: #6DAA3F; /* Ecosystem Green */
  }
  
  .color-ecosystem h3 {
    color: #6DAA3F;
  }
  
  .color-harmony {
    border-left-color: #3A6EA5; /* Harmony Blue */
  }
  
  .color-harmony h3 {
    color: #3A6EA5;
  }
  
  .color-earth {
    border-left-color: #8B5A2B; /* Earth Brown */
  }
  
  .color-earth h3 {
    color: #8B5A2B;
  }
  
  .color-solar {
    border-left-color: #F5A623; /* Solar Gold */
  }
  
  .color-solar h3 {
    color: #F5A623;
  }
  
  .color-rights {
    border-left-color: #8A4F9E; /* Rights Purple */
  }
  
  .color-rights h3 {
    color: #8A4F9E;
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
    background-color: #6DAA3F;
    color: white;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: #5A8F33;
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

  .tool-card.color-ecosystem .download-btn.pdf {
    background-color: #6DAA3F;
  }

  .tool-card.color-harmony .download-btn.pdf {
    background-color: #3A6EA5;
  }

  .tool-card.color-earth .download-btn.pdf {
    background-color: #8B5A2B;
  }

  .tool-card.color-solar .download-btn.pdf {
    background-color: #F5A623;
  }

  .tool-card.color-rights .download-btn.pdf {
    background-color: #8A4F9E;
  }

  .download-btn.md {
    background-color: white;
    border: 1px solid;
  }

  .tool-card.color-ecosystem .download-btn.md {
    color: #6DAA3F;
    border-color: #6DAA3F;
  }

  .tool-card.color-harmony .download-btn.md {
    color: #3A6EA5;
    border-color: #3A6EA5;
  }

  .tool-card.color-earth .download-btn.md {
    color: #8B5A2B;
    border-color: #8B5A2B;
  }

  .tool-card.color-solar .download-btn.md {
    color: #F5A623;
    border-color: #F5A623;
  }

  .tool-card.color-rights .download-btn.md {
    color: #8A4F9E;
    border-color: #8A4F9E;
  }
  
  .download-btn:hover {
    transform: translateY(-1px);
  }
  
  .icon {
    margin-left: 0.5rem;
  }
  
  /* Feedback Card */
  .feedback-card {
    background-color: rgba(139, 90, 43, 0.1); /* Earth Brown background */
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    border-left: 4px solid #8B5A2B;
  }
  
  .feedback-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #8B5A2B;
  }
  
  .feedback-card p {
    color: #4b5563;
    margin-bottom: 1rem;
  }
  
  .contact-link {
    color: #F5A623; /* Solar Gold */
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
    color: #6DAA3F;
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
    color: #6DAA3F;
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
    color: #6DAA3F;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
  }

  .lang-button.active {
    background-color: #6DAA3F;
    color: white;
    border-color: #6DAA3F;
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
