<!-- src/routes/frameworks/tools/consciousness-and-inner-development/+page.svelte -->
<script>
  import { t, locale, setLocale } from '$lib/i18n';
  import { base } from '$app/paths';

  // Subscribe to stores
  $: currentT = $t;
  $: currentLocale = $locale;

  // Define file paths with language handling
  const getFilePath = (toolName) => {
    // Check if the file already has language suffix
    if (toolName.includes('-sv') || toolName.includes('-en') || toolName.includes('-youth')) {
      return `${base}/frameworks/tools/consciousness-and-inner-development/${toolName}`;
    }
    
    // For potentially translated documents
    if (toolName.includes('consciousness-accord-lite') || toolName === 'conscious-governance-starter-kit.zip') {
      // Special case for main lite guides
      if (toolName === 'consciousness-accord-lite.pdf' || toolName === 'consciousness-accord-lite.md') {
        const langSuffix = currentLocale === 'sv' ? '-sv' : '-en';
        return `${base}/frameworks/tools/consciousness-and-inner-development/consciousness-accord-lite${langSuffix}.${toolName.split('.').pop()}`;
      } else {
        // For other translated documents
        const extension = toolName.split('.').pop();
        const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
        return `${base}/frameworks/tools/consciousness-and-inner-development/${baseName}-${currentLocale}.${extension}`;
      }
    }
    
    // For tools that might have language variations
    if (['global-wisdom-council-setup', 
         'mindfulness-training-module',
         'leadership-toolkit',
         'community-dialogue-manual',
         'policy-design-guide',
         'conscious-budget-template',
         'crisis-wisdom-team-protocols',
         'leader-consciousness-index-guide',
         'ai-sentiment-analysis-setup',
         'vr-wisdom-council-framework'].includes(toolName.split('.')[0])) {
      const extension = toolName.split('.').pop();
      const baseName = toolName.substring(0, toolName.lastIndexOf('.'));
      return `${base}/frameworks/tools/consciousness-and-inner-development/${baseName}-${currentLocale}.${extension}`;
    }
    
    // Default path for other files
    return `${base}/frameworks/tools/consciousness-and-inner-development/${toolName}`;
  };

  // Helper function for language button styles
  function getLanguageButtonStyle(lang) {
    const isActive = currentLocale === lang;
    return isActive ? 'lang-button active' : 'lang-button';
  }

  // Translations for this page
  const translations = {
    en: {
      title: "Consciousness & Inner Development Framework Tools",
      subtitle: "Practical resources to implement conscious governance worldwide",
      intro: "These tools and templates are designed to help you implement the Consciousness & Inner Development Framework in various contexts. From establishing wisdom councils to developing mindful leadership and engaging communities, these resources provide step-by-step guidance for transforming governance through consciousness.",
      startKitTitle: "Conscious Governance Starter Kit",
      startKitDesc: "A complete package with everything you need to launch a consciousness governance pilot project. Includes all essential tools and templates in one convenient download.",
      startKitButton: "Download Complete Starter Kit",
      toolsTitle: "Core Governance Tools",
      toolsDesc: "Essential tools for implementing key components of conscious governance, from wisdom councils to mindful decision-making and community engagement.",
      leadershipTitle: "Personal Transformation Tools",
      leadershipDesc: "Resources for developing conscious leaders through mindfulness training, shadow work, and inner development practices.",
      communityTitle: "Community Engagement Tools",
      communityDesc: "Tools for building collective consciousness, facilitating dialogue, and engaging diverse communities in governance transformation.",
      digitalTitle: "Digital Platform Tools",
      digitalDesc: "Technology resources for enhancing democratic participation, creating virtual wisdom councils, and implementing AI-assisted governance.",
      policyTitle: "Policy & Economic Tools",
      policyDesc: "Frameworks for integrating consciousness principles into policy development, budget allocation, and economic transformation.",
      crisisTitle: "Crisis Response & Assessment Tools",
      crisisDesc: "Resources for maintaining conscious governance during emergencies and measuring progress through consciousness metrics.",
      guidesTitle: "Framework Guides",
      guidesDesc: "Compact guides to help you understand and share the Consciousness & Inner Development Framework with others.",
      requestTitle: "Request Tools or Provide Feedback",
      requestDesc: "Need implementation resources for a specific purpose? Have suggestions for improvements? We welcome your input to make these tools more useful.",
      contactLink: "Contact us",
      languagesTitle: "Available Languages",
      downloadPDF: "Download PDF",
      downloadMarkdown: "Download Markdown",
      backToTools: "Back to Tools Overview",
      // Tool titles
      wisdomCouncilTitle: "Global Wisdom Council Setup Guide",
      wisdomCouncilDesc: "Comprehensive guide for establishing wisdom councils with indigenous elders, youth representatives, and community wisdom keepers.",
      regionalHubTitle: "Regional Consciousness Hub Implementation",
      regionalHubDesc: "Framework for creating regional hubs that coordinate conscious governance initiatives and facilitate cross-community collaboration.",
      policyDesignTitle: "Policy Design Guide",
      policyDesignDesc: "Methods for integrating consciousness principles into policy development, ensuring decisions serve collective well-being.",
      stakeholderProtocolsTitle: "Stakeholder Engagement Protocols",
      stakeholderProtocolsDesc: "Structured approaches for engaging diverse communities, ensuring inclusive participation in governance transformation.",
      youthFrameworkTitle: "Youth Council Framework",
      youthFrameworkDesc: "Guidelines for establishing youth councils with voting power and meaningful roles in intergenerational governance.",
      mindfulnessTitle: "Mindfulness Training Module",
      mindfulnessDesc: "Comprehensive mindfulness training specifically designed for leaders and governance professionals.",
      shadowWorkTitle: "Shadow Work Coaching Guide",
      shadowWorkDesc: "Practical guide for addressing unconscious biases and power dynamics that influence governance decisions.",
      nvcToolkitTitle: "Nonviolent Communication Toolkit",
      nvcToolkitDesc: "NVC tools adapted for governance contexts, facilitating empathetic dialogue and conflict resolution.",
      leadershipToolkitTitle: "Leadership Toolkit",
      leadershipToolkitDesc: "Resources for developing conscious leadership skills including emotional intelligence and systemic thinking.",
      dialogueManualTitle: "Community Dialogue Manual",
      dialogueManualDesc: "Step-by-step guide for facilitating community dialogues that build collective consciousness and shared understanding.",
      culturalProtocolsTitle: "Cultural Sensitivity Protocols",
      culturalProtocolsDesc: "Framework for respectful cross-cultural engagement and avoiding appropriation while honoring diverse wisdom traditions.",
      circleGuideTitle: "Consciousness-Raising Circle Guide",
      circleGuideDesc: "Instructions for organizing and facilitating consciousness-raising circles that connect personal transformation with social change.",
      aiSentimentTitle: "AI Sentiment Analysis Setup",
      aiSentimentDesc: "Technical guide for implementing AI-powered sentiment analysis to monitor collective consciousness and community well-being.",
      vrWisdomTitle: "VR Wisdom Council Framework",
      vrWisdomDesc: "Protocols for creating virtual reality wisdom councils that enable global participation while maintaining cultural protocols.",
      aiAuditTitle: "AI Bias Audit Framework",
      aiAuditDesc: "Systematic approach for auditing AI systems to ensure they support rather than undermine conscious governance principles.",
      cybersecurityTitle: "Cybersecurity Framework for Governance",
      cybersecurityDesc: "Security protocols specifically designed for protecting conscious governance digital platforms and community data.",
      budgetTemplateTitle: "Conscious Budget Template",
      budgetTemplateDesc: "Template for reallocating government budgets to prioritize well-being, sustainability, and community needs.",
      vmemeToolkitTitle: "vMeme Transition Toolkit",
      vmemeToolkitDesc: "Tools for understanding and working with different value systems in diverse communities using Spiral Dynamics.",
      leaderIndexTitle: "Leader Consciousness Index Guide",
      leaderIndexDesc: "Assessment framework for measuring and developing consciousness levels in governance leaders.",
      justiceMetricsTitle: "Intergenerational Justice Metrics Framework",
      justiceMetricsDesc: "Metrics for evaluating governance decisions based on their impact on future generations and long-term well-being.",
      crisisProtocolsTitle: "Crisis Wisdom Team Protocols",
      crisisProtocolsDesc: "Emergency protocols for deploying wisdom teams and maintaining conscious governance during crises.",
      ethicalDecisionTitle: "Ethical Decision Template",
      ethicalDecisionDesc: "Structured template for making ethical decisions that consider multiple stakeholders and long-term consequences.",
      accordLiteTitle: "Consciousness Accord Lite",
      accordLiteDesc: "A condensed overview of the framework's vision and core principles for policy-level stakeholders.",
      youthComicTitle: "Youth Governance Comic",
      youthComicDesc: "A visual, accessible guide for youth groups, schools, and diverse communities to engage with conscious governance.",
      executiveOverviewTitle: "Executive Core Overview",
      executiveOverviewDesc: "A strategic summary for executives and senior leaders highlighting implementation pathways and benefits.",
      downloadButton: "Download"
    },
    sv: {
      title: "Verktyg för Medvetenhet & Inre Utveckling Ramverk",
      subtitle: "Praktiska resurser för att implementera medveten styrning världen över",
      intro: "Dessa verktyg och mallar är utformade för att hjälpa dig implementera Medvetenhet & Inre Utveckling Ramverket i olika sammanhang. Från att etablera visdomsråd till att utveckla medvetet ledarskap och engagera samhällen, ger dessa resurser steg-för-steg-vägledning för att omvandla styrning genom medvetenhet.",
      startKitTitle: "Medveten Styrning Startpaket",
      startKitDesc: "Ett komplett paket med allt du behöver för att starta ett medvetet styrningspilotprojekt. Inkluderar alla nödvändiga verktyg och mallar i en bekväm nedladdning.",
      startKitButton: "Ladda ner komplett Startpaket",
      toolsTitle: "Grundläggande Styrningsverktyg",
      toolsDesc: "Väsentliga verktyg för att implementera viktiga komponenter av medveten styrning, från visdomsråd till medvetet beslutsfattande och samhällsengagemang.",
      leadershipTitle: "Verktyg för Personlig Transformation",
      leadershipDesc: "Resurser för att utveckla medvetna ledare genom mindfulnessträning, skuggarbete och inre utvecklingspraktiker.",
      communityTitle: "Verktyg för Samhällsengagemang",
      communityDesc: "Verktyg för att bygga kollektiv medvetenhet, underlätta dialog och engagera olika samhällen i styrningstransformation.",
      digitalTitle: "Digitala Plattformsverktyg",
      digitalDesc: "Tekniska resurser för att förbättra demokratiskt deltagande, skapa virtuella visdomsråd och implementera AI-assisterad styrning.",
      policyTitle: "Policy & Ekonomiska Verktyg",
      policyDesc: "Ramverk för att integrera medvetenhetsprinciper i policyutveckling, budgetfördelning och ekonomisk transformation.",
      crisisTitle: "Krishantering & Bedömningsverktyg",
      crisisDesc: "Resurser för att upprätthålla medveten styrning under nödsituationer och mäta framsteg genom medvetenhetsmetrik.",
      guidesTitle: "Ramverksguider",
      guidesDesc: "Kompakta guider för att hjälpa dig förstå och dela Medvetenhet & Inre Utveckling Ramverket med andra.",
      requestTitle: "Begär verktyg eller ge feedback",
      requestDesc: "Behöver du implementeringsresurser för ett specifikt syfte? Har du förslag på förbättringar? Vi välkomnar dina synpunkter för att göra dessa verktyg mer användbara.",
      contactLink: "Kontakta oss",
      languagesTitle: "Tillgängliga språk",
      downloadPDF: "Ladda ner PDF",
      downloadMarkdown: "Ladda ner Markdown",
      backToTools: "Tillbaka till verktygsöversikt",
      // Tool titles in Swedish (shortened for brevity)
      wisdomCouncilTitle: "Guide för Global Visdomsråd",
      wisdomCouncilDesc: "Omfattande guide för att etablera visdomsråd med ursprungsfolks äldste, ungdomsrepresentanter och samhällsvisdomsinnehavare.",
      // ... (continuing with Swedish translations)
      downloadButton: "Ladda ner"
    }
  };

  // Get current translations based on active locale
  $: texts = translations[currentLocale] || translations.en;
  
  // Tool data for each section
  const coreTools = [
    { id: 'global-wisdom-council-setup', color: 'color-primary' },
    { id: 'regional-consciousness-hub-implementation', color: 'color-1' },
    { id: 'policy-design-guide', color: 'color-2' },
    { id: 'stakeholder-engagement-protocols', color: 'color-3' },
    { id: 'youth-council-framework', color: 'color-4' }
  ];

  const leadershipTools = [
    { id: 'mindfulness-training-module', color: 'color-wisdom' },
    { id: 'shadow-work-coaching-guide', color: 'color-transformation' },
    { id: 'nonviolent-communication-toolkit', color: 'color-compassion' },
    { id: 'leadership-toolkit', color: 'color-accent' }
  ];

  const communityTools = [
    { id: 'community-dialogue-manual', color: 'color-primary' },
    { id: 'cultural-sensitivity-protocols', color: 'color-compassion' },
    { id: 'consciousness-raising-circle-guide', color: 'color-1' }
  ];

  const digitalTools = [
    { id: 'ai-sentiment-analysis-setup', color: 'color-2' },
    { id: 'vr-wisdom-council-framework', color: 'color-3' },
    { id: 'ai-bias-audit-framework', color: 'color-4' },
    { id: 'cybersecurity-framework-governance', color: 'color-5' }
  ];

  const policyTools = [
    { id: 'conscious-budget-template', color: 'color-transformation' },
    { id: 'vmeme-transition-toolkit', color: 'color-accent' }
  ];

  const crisisTools = [
    { id: 'leader-consciousness-index-guide', color: 'color-primary' },
    { id: 'intergenerational-justice-metrics-framework', color: 'color-earth' },
    { id: 'crisis-wisdom-team-protocols', color: 'color-1' },
    { id: 'ethical-decision-template', color: 'color-2' }
  ];

  const toolNameToTranslationKey = {
    'global-wisdom-council-setup': 'wisdomCouncil',
    'regional-consciousness-hub-implementation': 'regionalHub',
    'policy-design-guide': 'policyDesign',
    'stakeholder-engagement-protocols': 'stakeholderProtocols',
    'youth-council-framework': 'youthFramework',
    'mindfulness-training-module': 'mindfulness',
    'shadow-work-coaching-guide': 'shadowWork',
    'nonviolent-communication-toolkit': 'nvcToolkit',
    'leadership-toolkit': 'leadershipToolkit',
    'community-dialogue-manual': 'dialogueManual',
    'cultural-sensitivity-protocols': 'culturalProtocols',
    'consciousness-raising-circle-guide': 'circleGuide',
    'ai-sentiment-analysis-setup': 'aiSentiment',
    'vr-wisdom-council-framework': 'vrWisdom',
    'ai-bias-audit-framework': 'aiAudit',
    'cybersecurity-framework-governance': 'cybersecurity',
    'conscious-budget-template': 'budgetTemplate',
    'vmeme-transition-toolkit': 'vmemeToolkit',
    'leader-consciousness-index-guide': 'leaderIndex',
    'intergenerational-justice-metrics-framework': 'justiceMetrics',
    'crisis-wisdom-team-protocols': 'crisisProtocols',
    'ethical-decision-template': 'ethicalDecision'
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

      <!-- Start with the Conscious Governance Starter Kit -->
      <div class="start-kit-card">
        <div class="card-content">
          <div class="card-icon">🧘</div>
          <div class="card-text">
            <h2>{texts.startKitTitle}</h2>
            <p>{texts.startKitDesc}</p>
          </div>
          <div class="card-actions">
            <a href={getFilePath(`conscious-governance-starter-kit-${currentLocale}.zip`)} download class="primary-btn">
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
        <!-- Consciousness Accord Lite -->
        <div class="tool-card color-primary">
          <h3>{texts.accordLiteTitle}</h3>
          <p>{texts.accordLiteDesc}</p>
          <div class="tool-actions">
            <a href={getFilePath(`consciousness-accord-lite-${currentLocale}.pdf`)} download class="download-btn pdf">
              {texts.downloadPDF}
              <span class="icon">↓</span>
            </a>
            <a href={getFilePath(`consciousness-accord-lite-${currentLocale}.md`)} download class="download-btn md">
              {texts.downloadMarkdown}
              <span class="icon">↓</span>
            </a>
          </div>
        </div>
        
        <!-- Executive Overview -->
        <div class="tool-card color-2">
          <h3>{texts.executiveOverviewTitle}</h3>
          <p>{texts.executiveOverviewDesc}</p>
          <div class="tool-actions">
            <a href={getFilePath(`executive-core-overview-${currentLocale}.pdf`)} download class="download-btn pdf">
              {texts.downloadPDF}
              <span class="icon">↓</span>
            </a>
            <a href={getFilePath(`executive-core-overview-${currentLocale}.md`)} download class="download-btn md">
              {texts.downloadMarkdown}
              <span class="icon">↓</span>
            </a>
          </div>
        </div>
        
        <!-- Youth Comic -->
        <div class="tool-card color-3">
          <h3>{texts.youthComicTitle}</h3>
          <p>{texts.youthComicDesc}</p>
          <div class="tool-actions">
            <a href={getFilePath(`youth-governance-comic-${currentLocale}.pdf`)} download class="download-btn pdf">
              {texts.downloadPDF}
              <span class="icon">↓</span>
            </a>
            <a href={getFilePath(`youth-governance-comic-${currentLocale}.md`)} download class="download-btn md">
              {texts.downloadMarkdown}
              <span class="icon">↓</span>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Core Governance Tools -->
      <h2 class="section-title">{texts.toolsTitle}</h2>
      <p class="section-desc">{texts.toolsDesc}</p>
      
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

      <!-- Personal Transformation Tools -->
      <h2 class="section-title">{texts.leadershipTitle}</h2>
      <p class="section-desc">{texts.leadershipDesc}</p>
      
      <div class="tools-grid">
        {#each leadershipTools as tool}
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

      <!-- Community Engagement Tools -->
      <h2 class="section-title">{texts.communityTitle}</h2>
      <p class="section-desc">{texts.communityDesc}</p>
      
      <div class="tools-grid">
        {#each communityTools as tool}
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

      <!-- Digital Platform Tools -->
      <h2 class="section-title">{texts.digitalTitle}</h2>
      <p class="section-desc">{texts.digitalDesc}</p>
      
      <div class="tools-grid">
        {#each digitalTools as tool}
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

      <!-- Policy & Economic Tools -->
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

      <!-- Crisis Response & Assessment Tools -->
      <h2 class="section-title">{texts.crisisTitle}</h2>
      <p class="section-desc">{texts.crisisDesc}</p>
      
      <div class="tools-grid">
        {#each crisisTools as tool}
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
  /* Consciousness Framework Color Scheme */
  :root {
    --consciousness-primary: #4c1d95; /* Deep Purple - wisdom, spiritual depth, consciousness */
    --consciousness-secondary: #1e40af; /* Royal Blue - trust, clarity, mental awareness */
    --consciousness-accent: #7c3aed; /* Bright Purple - transformation, insight, awakening */
    --consciousness-wisdom: #312e81; /* Indigo - deep knowing, intuition, inner guidance */
    --consciousness-light: #a78bfa; /* Light Purple - accessibility, openness, flow */
    --consciousness-transformation: #f59e0b; /* Warm Gold - change, illumination, growth */
    --consciousness-earth: #059669; /* Earth Green - grounding, nature connection, balance */
    --consciousness-compassion: #ec4899; /* Warm Pink - love, empathy, heart wisdom */
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
    background: linear-gradient(135deg, var(--consciousness-primary) 0%, var(--consciousness-secondary) 100%);
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
    color: var(--consciousness-secondary);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: var(--consciousness-primary);
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
    color: var(--consciousness-primary);
  }
  
  .section-desc {
    margin-bottom: 2rem;
    color: #4b5563;
    line-height: 1.7;
    font-size: 1.125rem;
  }
  
  /* Start Kit Card */
  .start-kit-card {
    background: linear-gradient(135deg, rgba(167, 139, 250, 0.1) 0%, rgba(76, 29, 149, 0.1) 100%);
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(76, 29, 149, 0.1);
    border: 1px solid rgba(76, 29, 149, 0.2);
  }
  
  .card-content {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
  }
  
  .card-icon {
    font-size: 2.5rem;
    color: var(--consciousness-primary);
  }
  
  .card-text {
    flex: 1;
    min-width: 200px;
  }
  
  .card-text h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--consciousness-primary);
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
  
  /* Color Variations for Consciousness Framework */
  .color-primary {
    border-left-color: var(--consciousness-primary);
  }
  
  .color-primary h3 {
    color: var(--consciousness-primary);
  }
  
  .color-1 {
    border-left-color: var(--consciousness-secondary);
  }
  
  .color-1 h3 {
    color: var(--consciousness-secondary);
  }
  
  .color-2 {
    border-left-color: var(--consciousness-accent);
  }
  
  .color-2 h3 {
    color: var(--consciousness-accent);
  }
  
  .color-3 {
    border-left-color: var(--consciousness-light);
  }
  
  .color-3 h3 {
    color: var(--consciousness-light);
  }
  
  .color-4 {
    border-left-color: var(--consciousness-wisdom);
  }
  
  .color-4 h3 {
    color: var(--consciousness-wisdom);
  }
  
  .color-5 {
    border-left-color: var(--consciousness-transformation);
  }
  
  .color-5 h3 {
    color: var(--consciousness-transformation);
  }

  .color-wisdom {
    border-left-color: var(--consciousness-wisdom);
  }
  
  .color-wisdom h3 {
    color: var(--consciousness-wisdom);
  }

  .color-transformation {
    border-left-color: var(--consciousness-transformation);
  }
  
  .color-transformation h3 {
    color: var(--consciousness-transformation);
  }

  .color-earth {
    border-left-color: var(--consciousness-earth);
  }
  
  .color-earth h3 {
    color: var(--consciousness-earth);
  }

  .color-compassion {
    border-left-color: var(--consciousness-compassion);
  }
  
  .color-compassion h3 {
    color: var(--consciousness-compassion);
  }

  .color-accent {
    border-left-color: var(--consciousness-accent);
  }
  
  .color-accent h3 {
    color: var(--consciousness-accent);
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
    background-color: var(--consciousness-primary);
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
    background-color: var(--consciousness-secondary);
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
    background-color: var(--consciousness-primary);
  }

  .tool-card.color-1 .download-btn.pdf {
    background-color: var(--consciousness-secondary);
  }

  .tool-card.color-2 .download-btn.pdf {
    background-color: var(--consciousness-accent);
  }

  .tool-card.color-3 .download-btn.pdf {
    background-color: var(--consciousness-light);
  }

  .tool-card.color-4 .download-btn.pdf {
    background-color: var(--consciousness-wisdom);
  }

  .tool-card.color-5 .download-btn.pdf {
    background-color: var(--consciousness-transformation);
  }

  .tool-card.color-wisdom .download-btn.pdf {
    background-color: var(--consciousness-wisdom);
  }

  .tool-card.color-transformation .download-btn.pdf {
    background-color: var(--consciousness-transformation);
  }

  .tool-card.color-earth .download-btn.pdf {
    background-color: var(--consciousness-earth);
  }

  .tool-card.color-compassion .download-btn.pdf {
    background-color: var(--consciousness-compassion);
  }

  .tool-card.color-accent .download-btn.pdf {
    background-color: var(--consciousness-accent);
  }

  .download-btn.md {
    background-color: white;
    border: 1px solid;
  }

  .tool-card.color-primary .download-btn.md {
    color: var(--consciousness-primary);
    border-color: var(--consciousness-primary);
  }

  .tool-card.color-1 .download-btn.md {
    color: var(--consciousness-secondary);
    border-color: var(--consciousness-secondary);
  }

  .tool-card.color-2 .download-btn.md {
    color: var(--consciousness-accent);
    border-color: var(--consciousness-accent);
  }

  .tool-card.color-3 .download-btn.md {
    color: var(--consciousness-light);
    border-color: var(--consciousness-light);
  }

  .tool-card.color-4 .download-btn.md {
    color: var(--consciousness-wisdom);
    border-color: var(--consciousness-wisdom);
  }

  .tool-card.color-5 .download-btn.md {
    color: var(--consciousness-transformation);
    border-color: var(--consciousness-transformation);
  }

  .tool-card.color-wisdom .download-btn.md {
    color: var(--consciousness-wisdom);
    border-color: var(--consciousness-wisdom);
  }

  .tool-card.color-transformation .download-btn.md {
    color: var(--consciousness-transformation);
    border-color: var(--consciousness-transformation);
  }

  .tool-card.color-earth .download-btn.md {
    color: var(--consciousness-earth);
    border-color: var(--consciousness-earth);
  }

  .tool-card.color-compassion .download-btn.md {
    color: var(--consciousness-compassion);
    border-color: var(--consciousness-compassion);
  }

  .tool-card.color-accent .download-btn.md {
    color: var(--consciousness-accent);
    border-color: var(--consciousness-accent);
  }

  .download-btn:hover {
    transform: translateY(-1px);
  }

  .icon {
    margin-left: 0.5rem;
  }

  /* Feedback Card */
  .feedback-card {
    background-color: rgba(167, 139, 250, 0.1);
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 2rem;
    border: 1px solid rgba(167, 139, 250, 0.3);
  }

  .feedback-card h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: var(--consciousness-primary);
  }

  .contact-link {
    color: var(--consciousness-secondary);
    text-decoration: underline;
    font-weight: 500;
  }

  .contact-link:hover {
    color: var(--consciousness-primary);
  }

  /* Back Link Bottom */
  .back-link-bottom {
    margin: 2rem 0;
    text-align: center;
  }

  .back-link-bottom a {
    display: inline-flex;
    align-items: center;
    color: var(--consciousness-secondary);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .back-link-bottom a:hover {
    color: var(--consciousness-primary);
  }

  /* Language Section */
  .language-section {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid #e5e7eb;
  }

  .language-section h3 {
    margin-bottom: 1rem;
    color: var(--consciousness-primary);
  }

  .language-buttons {
    display: flex;
    gap: 0.5rem;
  }

  .lang-button {
    padding: 0.5rem 1rem;
    border: 1px solid var(--consciousness-secondary);
    background-color: white;
    color: var(--consciousness-secondary);
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;
  }

  .lang-button:hover {
    background-color: rgba(167, 139, 250, 0.1);
  }

  .lang-button.active {
    background-color: var(--consciousness-primary);
    color: white;
    border-color: var(--consciousness-primary);
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
