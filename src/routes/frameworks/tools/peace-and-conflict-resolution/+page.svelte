<!-- src/routes/frameworks/tools/peace-and-conflict-resolution/+page.svelte -->
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
      return `${base}/frameworks/tools/peace-and-conflict-resolution/${toolName}`;
    }
    
    // For the guides and other potentially translated documents
    if (toolName.includes('guide') || 
        toolName === 'seed-kit.zip') {
      // Special case for main guides
      if (toolName === 'youth-peace-action-guide.pdf' || toolName === 'youth-peace-action-guide.md') {
        const langSuffix = currentLocale === 'sv' ? '-sv' : '-en';
        return `${base}/frameworks/tools/peace-and-conflict-resolution/youth-peace-action-guide${langSuffix}.${toolName.split('.').pop()}`;
      } else {
        // For other translated documents
        const extension = toolName.split('.').pop();
        const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
        return `${base}/frameworks/tools/peace-and-conflict-resolution/${baseName}-${currentLocale}.${extension}`;
      }
    }
    
    // For tools that might have language variations but maintain the same base name
    if ([
        'conflict-analysis-framework',
        'peace-committee-charter',
        'multi-track-dialogue-protocol',
        'early-warning-design-guide',
        'peace-tech-ethics-assessment',
        'value-system-mapping-template',
        'trauma-informed-toolkit',
        'resource-conflict-guide',
        'reconciliation-framework',
        'business-peace-guide',
        'protection-transition-manual',
        'peace-advocacy-toolkit',
        'peace-financing-navigator',
        'institutional-integration-guide',
        'media-peace-messaging-guide'
        ].includes(toolName.split('.')[0])) {
      const extension = toolName.split('.').pop();
      const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
      return `${base}/frameworks/tools/peace-and-conflict-resolution/${baseName}-${currentLocale}.${extension}`;
    }
    
    // Default path for other files
    return `${base}/frameworks/tools/peace-and-conflict-resolution/${toolName}`;
  };

  // Helper function for language button styles
  function getLanguageButtonStyle(lang) {
    const isActive = currentLocale === lang;
    return isActive ? 'lang-button active' : 'lang-button';
  }

  // Translations for this page
  const translations = {
    en: {
      title: "Peace & Conflict Resolution Tools",
      subtitle: "Practical resources to implement the Peace & Conflict Resolution Framework",
      intro: "These tools and templates are designed to help you implement the Peace & Conflict Resolution Framework in various contexts. From assessment to planning and mediation, these resources provide step-by-step guidance for preventing conflicts, resolving disputes, and building sustainable peace.",
      seedKitTitle: "Start with the Seed Kit",
      seedKitDesc: "A complete package with everything you need to launch implementation. Includes all essential tools and templates in one convenient download.",
      seedKitButton: "Download Complete Seed Kit",
      guidesTitle: "Framework Guides",
      guidesDesc: "Lite guides tailored to specific audiences to help you understand and share the Peace & Conflict Resolution Framework with others.",
      toolsTitle: "Core Governance Tools",
      toolsDesc: "These essential tools help you implement key components of the Peace & Conflict Resolution Framework, from assessment to planning and stakeholder engagement.",
      sectoralTitle: "Specialized Implementation Guides",
      sectoralDesc: "Specialized tools to support implementation across key areas including peacebuilding, transitional justice, and digital peace ethics.",
      advocacyTitle: "Advocacy & Scaling Tools",
      advocacyDesc: "Resources to help you engage stakeholders, secure funding, and scale your implementation from local initiatives to broader adoption.",
      requestTitle: "Request Tools or Provide Feedback",
      requestDesc: "Need implementation resources for a specific purpose? Have suggestions for improvements? We welcome your input to make these tools more useful.",
      contactLink: "Contact us",
      languagesTitle: "Available Languages",
      downloadPDF: "Download PDF",
      downloadMarkdown: "Download Markdown",

      // Tool titles - Lite Guides
      technicalGuideTitle: "Technical Guide for Policymakers",
      technicalGuideDesc: "Detailed guide focusing on governance structures, policy mechanisms, and mediation for officials and decision-makers.",
      communityGuideTitle: "Community Peace Implementation Guide",
      communityGuideDesc: "Practical guide for civil society organizations, local leaders, and community mediators emphasizing grassroots peacebuilding.",
      youthGuideTitle: "Youth Peace Action Guide",
      youthGuideDesc: "Accessible guide for youth, educators, and community groups, focusing on local action and peace advocacy.",
      digitalEthicsGuideTitle: "Digital Peace Ethics Guide",
      digitalEthicsGuideDesc: "Guide for navigating ethical considerations in using technology for peacebuilding and conflict prevention.",
      
      // Tool titles - Core Governance
      conflictAnalysisTitle: "Conflict Analysis Framework",
      conflictAnalysisDesc: "Systematic approach to analyzing conflict dynamics, stakeholders, and root causes to inform effective peacebuilding strategies.",
      peaceCommitteeTitle: "Local Peace Committee Charter Template",
      peaceCommitteeDesc: "Template for establishing community-led peace committees that can mediate local disputes and monitor tensions.",
      dialogueProtocolTitle: "Multi-Track Dialogue Protocol",
      dialogueProtocolDesc: "A structured approach to facilitating inclusive dialogue across different tracks of society, ensuring diverse voices are heard.",
      earlyWarningTitle: "Early Warning System Design Guide",
      earlyWarningDesc: "Framework for developing systems to detect and respond to emerging conflicts before they escalate into violence.",
      techEthicsTitle: "Peace-Technology Ethics Assessment",
      techEthicsDesc: "Tool to evaluate the ethical implications of using technology in conflict settings and ensure 'do no harm' principles.",
      
      // Tool titles - Specialized Implementation
      systemsThinkingTitle: "Systems Thinking Toolkit for Peace & Conflict Resolution",
      systemsThinkingDesc: "Advanced frameworks and practical tools for applying systems thinking to complex peace challenges.",
      valueSystemTitle: "Value System Mapping Template",
      valueSystemDesc: "Framework for understanding and bridging different value systems and worldviews in conflict settings.",
      traumaInformedTitle: "Trauma-Informed Facilitation Toolkit",
      traumaInformedDesc: "Guidance for conducting trauma-sensitive dialogues and mediations that avoid re-traumatization.",
      resourceConflictTitle: "Resource Conflict Transformation Guide",
      resourceConflictDesc: "Approaches for resolving conflicts over natural resources like land, water, and minerals.",
      reconciliationTitle: "Post-Conflict Reconciliation Framework",
      reconciliationDesc: "Comprehensive approach to truth, justice, healing, and reconciliation after violent conflict.",
      businessPeaceTitle: "Private Sector Peace Engagement Guide",
      businessPeaceDesc: "Strategies for involving businesses in peacebuilding and ensuring conflict-sensitive business practices.",
      
      // Tool titles - Advocacy & Scaling
      protectionTitle: "Military-Civilian Protection Transition Manual",
      protectionDesc: "Guide for transitioning from military to civilian-led protection and security arrangements.",
      advocacyToolkitTitle: "Peace Advocacy Campaign Toolkit",
      advocacyToolkitDesc: "Resources for designing and implementing advocacy campaigns to promote peace policies and practices.",
      financingTitle: "Peace Financing Navigator",
      financingDesc: "Guide to identifying, accessing, and leveraging finance from diverse sources for implementing peace initiatives.",
      institutionalTitle: "Institutional Peace Integration Guide",
      institutionalDesc: "Framework for integrating peace approaches into institutional policies and practices.",
      mediaMessagingTitle: "Media Peace Messaging Guide",
      mediaMessagingDesc: "Strategies for using media to promote peace narratives and counter hate speech and disinformation.",
            
      downloadButton: "Download"
    },
    sv: {
      title: "Verktyg för freds- och konfliktlösning",
      subtitle: "Praktiska resurser för att implementera ramverket för freds- och konfliktlösning",
      intro: "Dessa verktyg och mallar är utformade för att hjälpa dig implementera ramverket för freds- och konfliktlösning i olika sammanhang. Från bedömning till planering och medling, ger dessa resurser steg-för-steg-vägledning för att förebygga konflikter, lösa tvister och bygga hållbar fred.",
      seedKitTitle: "Börja med startpaketet",
      seedKitDesc: "Ett komplett paket med allt du behöver för att påbörja implementeringen. Inkluderar alla nödvändiga verktyg och mallar i en bekväm nedladdning.",
      seedKitButton: "Ladda ner komplett startpaket",
      guidesTitle: "Ramverksguider",
      guidesDesc: "Enkla guider anpassade för specifika målgrupper för att hjälpa dig förstå och dela ramverket för freds- och konfliktlösning med andra.",
      toolsTitle: "Grundläggande styrningsverktyg",
      toolsDesc: "Dessa väsentliga verktyg hjälper dig att implementera viktiga komponenter i ramverket för freds- och konfliktlösning, från bedömning till planering och intressentengagemang.",
      sectoralTitle: "Specialiserade implementeringsguider",
      sectoralDesc: "Specialiserade verktyg för att stödja implementering inom viktiga områden inklusive fredsbyggande, övergångsrättvisa och digital fredsetik.",
      advocacyTitle: "Påverkans- och skalningsverktyg",
      advocacyDesc: "Resurser för att hjälpa dig engagera intressenter, säkra finansiering och skala upp din implementering från lokala initiativ till bredare antagande.",
      requestTitle: "Begär verktyg eller ge feedback",
      requestDesc: "Behöver du implementeringsresurser för ett specifikt syfte? Har du förslag på förbättringar? Vi välkomnar dina synpunkter för att göra dessa verktyg mer användbara.",
      contactLink: "Kontakta oss",
      languagesTitle: "Tillgängliga språk",
      downloadPDF: "Ladda ner PDF",
      downloadMarkdown: "Ladda ner Markdown",

      // Tool titles - Lite Guides (Swedish)
      technicalGuideTitle: "Teknisk guide för beslutsfattare",
      technicalGuideDesc: "Detaljerad guide med fokus på styrningsstrukturer, policymekanismer och medling för tjänstemän och beslutsfattare.",
      communityGuideTitle: "Samhällsguide för fred",
      communityGuideDesc: "Praktisk guide för civilsamhällesorganisationer, lokala ledare och samhällsmediatorer med betoning på gräsrotsfredsbyggande.",
      youthGuideTitle: "Fredshandlingsguide för ungdomar",
      youthGuideDesc: "Tillgänglig guide för ungdomar, pedagoger och samhällsgrupper, med fokus på lokala åtgärder och fredsförespråkande.",
      digitalEthicsGuideTitle: "Digital fredsetikguide",
      digitalEthicsGuideDesc: "Guide för att navigera etiska överväganden vid användning av teknik för fredsbyggande och konfliktförebyggande.",
      
      // Tool titles - Core Governance (Swedish)
      conflictAnalysisTitle: "Ramverk för konfliktanalys",
      conflictAnalysisDesc: "Systematiskt tillvägagångssätt för att analysera konfliktdynamik, intressenter och grundorsaker för att informera effektiva fredsbyggande strategier.",
      peaceCommitteeTitle: "Mall för lokala fredskommittéstadgar",
      peaceCommitteeDesc: "Mall för att etablera samhällsledda fredskommittéer som kan medla i lokala tvister och övervaka spänningar.",
      dialogueProtocolTitle: "Protokoll för flerspårsdialog",
      dialogueProtocolDesc: "Ett strukturerat tillvägagångssätt för att underlätta inkluderande dialog över olika samhällsspår, vilket säkerställer att olika röster hörs.",
      earlyWarningTitle: "Designguide för tidig varning",
      earlyWarningDesc: "Ramverk för att utveckla system för att upptäcka och reagera på framväxande konflikter innan de eskalerar till våld.",
      techEthicsTitle: "Fredsteknologisk etikbedömning",
      techEthicsDesc: "Verktyg för att utvärdera de etiska konsekvenserna av att använda teknik i konfliktsituationer och säkerställa principer om att inte skada.",
      
      // Tool titles - Specialized Implementation (Swedish)
      systemsThinkingTitle: "Verktygslåda för systemtänkande inom fred och konfliktlösning",
      systemsThinkingDesc: "Avancerade ramverk och praktiska verktyg för att tillämpa systemtänkande på komplexa fredsutmaningar.",
      valueSystemTitle: "Mall för värdesystemkartläggning",
      valueSystemDesc: "Ramverk för att förstå och överbrygga olika värdesystem och världsuppfattningar i konfliktsituationer.",
      traumaInformedTitle: "Verktygslåda för traumainformerad facilitering",
      traumaInformedDesc: "Vägledning för att genomföra traumakänsliga dialoger och medlingar som undviker återtraumatisering.",
      resourceConflictTitle: "Guide för omvandling av resurskonflikter",
      resourceConflictDesc: "Tillvägagångssätt för att lösa konflikter om naturresurser som mark, vatten och mineraler.",
      reconciliationTitle: "Ramverk för försoningsefterkonfliktsarbete",
      reconciliationDesc: "Omfattande tillvägagångssätt för sanning, rättvisa, läkning och försoning efter våldsam konflikt.",
      businessPeaceTitle: "Guide för privat sektors fredsengagemang",
      businessPeaceDesc: "Strategier för att involvera företag i fredsbyggande och säkerställa konfliktkänsliga affärsmetoder.",
      
      // Tool titles - Advocacy & Scaling (Swedish)
      protectionTitle: "Manual för militär-civil skyddsövergång",
      protectionDesc: "Guide för övergång från militärt till civilt ledda skydds- och säkerhetsarrangemang.",
      advocacyToolkitTitle: "Verktygslåda för fredsförespråkande kampanjer",
      advocacyToolkitDesc: "Resurser för att utforma och genomföra påverkanskampanjer för att främja fredspolitik och praxis.",
      financingTitle: "Navigator för fredsfinansiering",
      financingDesc: "Guide för att identifiera, få tillgång till och utnyttja finansiering från olika källor för att genomföra fredsinitiativ.",
      institutionalTitle: "Guide för institutionell fredsintegration",
      institutionalDesc: "Ramverk för att integrera fredsmetoder i institutionella policyer och praktiker.",
      mediaMessagingTitle: "Guide för mediefredsbudskap",
      mediaMessagingDesc: "Strategier för att använda media för att främja fredsnarrativ och motverka hatprat och desinformation.",
            
      downloadButton: "Ladda ner"
    }
  };

  // Get current translations based on active locale
  $: texts = translations[currentLocale] || translations.en;

  // Tool data for each section, using actual file names
  const guideTools = [
    { id: 'technical-guide-policymakers', color: 'color-1' },
    { id: 'community-peace-guide', color: 'color-2' },
    { id: 'youth-peace-action-guide', color: 'color-3' },
    { id: 'digital-peace-ethics-guide', color: 'color-4' }
  ];
  
  const coreTools = [
    { id: 'conflict-analysis-framework', color: 'color-dark' },
    { id: 'peace-committee-charter', color: 'color-1' },
    { id: 'multi-track-dialogue-protocol', color: 'color-2' },
    { id: 'early-warning-design-guide', color: 'color-3' },
    { id: 'peace-tech-ethics-assessment', color: 'color-4' }
  ];
  
  const specializedTools = [
    { id: 'systems-thinking', color: 'color-5', isPageLink: true },
    { id: 'value-system-mapping-template', color: 'color-1' },
    { id: 'trauma-informed-toolkit', color: 'color-2' },
    { id: 'resource-conflict-guide', color: 'color-3' },
    { id: 'reconciliation-framework', color: 'color-4' },
    { id: 'business-peace-guide', color: 'color-5' }
  ];
  
  const advocacyTools = [
    { id: 'protection-transition-manual', color: 'color-dark' },
    { id: 'peace-advocacy-toolkit', color: 'color-1' },
    { id: 'peace-financing-navigator', color: 'color-2' },
    { id: 'institutional-integration-guide', color: 'color-3' },
    { id: 'media-peace-messaging-guide', color: 'color-4' }
  ];

  const toolNameToTranslationKey = {
    'technical-guide-policymakers': 'technicalGuide',
    'community-peace-guide': 'communityGuide',
    'youth-peace-action-guide': 'youthGuide',
    'digital-peace-ethics-guide': 'digitalEthicsGuide',
    'conflict-analysis-framework': 'conflictAnalysis',
    'peace-committee-charter': 'peaceCommittee',
    'multi-track-dialogue-protocol': 'dialogueProtocol',
    'early-warning-design-guide': 'earlyWarning',
    'peace-tech-ethics-assessment': 'techEthics',
    'systems-thinking': 'systemsThinking',
    'value-system-mapping-template': 'valueSystem',
    'trauma-informed-toolkit': 'traumaInformed',
    'resource-conflict-guide': 'resourceConflict',
    'reconciliation-framework': 'reconciliation',
    'business-peace-guide': 'businessPeace',
    'protection-transition-manual': 'protection',
    'peace-advocacy-toolkit': 'advocacyToolkit',
    'peace-financing-navigator': 'financing',
    'institutional-integration-guide': 'institutional',
    'media-peace-messaging-guide': 'mediaMessaging'
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
          <div class="card-icon">🕊️</div>
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

      <!-- Framework Guides -->
      <div class="tools-grid">
        {#each guideTools as tool}
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

      <!-- Core Governance Tools -->
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

      <!-- Specialized Implementation Guides Section -->
      <div class="tools-grid">
        {#each specializedTools as tool}
          <div class="tool-card {tool.color}">
            <h3>{texts[`${toolNameToTranslationKey[tool.id]}Title`]}</h3>
            <p>{texts[`${toolNameToTranslationKey[tool.id]}Desc`]}</p>
            <div class="tool-actions">
              {#if tool.isPageLink}
                <!-- Special case for page links -->
                <a href="{base}/frameworks/tools/peace-and-conflict-resolution/systems-thinking" class="page-link-btn">
                  {currentLocale === 'sv' ? 'Visa verktygslåda' : 'View Toolkit'}
                  <span class="icon">→</span>
                </a>
              {:else}
                <!-- Normal download buttons -->
                <a href={getFilePath(`${tool.id}-${currentLocale}.pdf`)} download class="download-btn pdf">
                  {texts.downloadPDF}
                  <span class="icon">↓</span>
                </a>
                <a href={getFilePath(`${tool.id}-${currentLocale}.md`)} download class="download-btn md">
                  {texts.downloadMarkdown}
                  <span class="icon">↓</span>
                </a>
              {/if}
            </div>
          </div>
        {/each}
      </div>

      <!-- Advocacy & Scaling Tools Section -->
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
  
  /* Hero Section */
  .hero {
    padding: 3rem 0;
    background: linear-gradient(to bottom right, #4A3D8F, #6B5CA5);
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
    color: #6B5CA5;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: #4A3D8F;
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
    color: #6B5CA5;
  }
  
  .section-desc {
    margin-bottom: 2rem;
    color: #4b5563;
    line-height: 1.7;
    font-size: 1.125rem;
  }
  
  /* Seed Kit Card */
  .seed-kit-card {
    background-color: #f0edfa;
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(107, 92, 165, 0.1);
    border: 1px solid rgba(107, 92, 165, 0.2);
  }
  
  .card-content {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
  }
  
  .card-icon {
    font-size: 2.5rem;
    color: #6B5CA5;
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #6B5CA5;
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
  
  /* Color Variations */
  .color-dark {
    border-left-color: #4A3D8F;
  }
  
  .color-dark h3 {
    color: #4A3D8F;
  }
  
  .color-1 {
    border-left-color: #6B5CA5;
  }
  
  .color-1 h3 {
    color: #6B5CA5;
  }
  
  .color-2 {
    border-left-color: #7E70B5;
  }
  
  .color-2 h3 {
    color: #7E70B5;
  }
  
  .color-3 {
    border-left-color: #9183C3;
  }
  
  .color-3 h3 {
    color: #9183C3;
  }
  
  .color-4 {
    border-left-color: #A497D0;
  }
  
  .color-4 h3 {
    color: #A497D0;
  }
  
  .color-5 {
    border-left-color: #B5ABDD;
  }
  
  .color-5 h3 {
    color: #B5ABDD;
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
    background-color: #6B5CA5;
    color: white;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.2s;
  }
  
  .primary-btn:hover {
    background-color: #574A99;
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
    background-color: #6B5CA5; /* Use a consistent purple background instead of currentColor */
    color: white;
  }

  .download-btn.md {
    background-color: white;
    border: 1px solid #6B5CA5; /* Use a consistent border color */
    color: #6B5CA5; /* Use a consistent text color */
  }
  
  .download-btn:hover {
    transform: translateY(-1px);
  }

  .page-link-btn {
    display: inline-flex;
    align-items: center;
    background-color: #6B5CA5;
    color: white;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.2s;
  }

  .page-link-btn:hover {
    background-color: #574A99;
    transform: translateY(-1px);
  }
  
  .icon {
    margin-left: 0.5rem;
  }
  
  /* Feedback Card */
  .feedback-card {
    background-color: #f0edfa;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  
  .feedback-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #6B5CA5;
  }
  
  .feedback-card p {
    color: #4b5563;
    margin-bottom: 1rem;
  }
  
  .contact-link {
    color: #4A3D8F;
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
    color: #6B5CA5;
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
    color: #6B5CA5;
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
    color: #6B5CA5;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
  }
  
  .lang-button.active {
    background-color: #6B5CA5;
    color: white;
    border-color: #6B5CA5;
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
  }
</style>
