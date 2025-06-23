<!-- src/routes/frameworks/visuals/environmental-stewardship/+page.svelte -->
<script>
  import { t, locale, setLocale } from '$lib/i18n';
  import { base } from '$app/paths';

  // Subscribe to stores
  $: currentT = $t;
  $: currentLocale = $locale;

  // Helper function for language button styles
  function getLanguageButtonStyle(lang) {
    const isActive = currentLocale === lang;
    return `padding: 0.5rem 1rem; border-radius: 0.375rem; border: 1px solid #e5e7eb; background-color: ${isActive ? '#6DAA3F' : 'white'}; color: ${isActive ? 'white' : '#6DAA3F'}; font-weight: 500; text-decoration: none;`;
  }

  // Translations for this page
  const translations = {
    en: {
      title: "Environmental Stewardship Visualizations",
      subtitle: "Visual resources for understanding and implementing regenerative environmental governance",
      intro: "These visualizations help communicate the Environmental Stewardship Framework's integrated approach to ecosystem rights, climate action, and regenerative governance. From conceptual diagrams to implementation roadmaps and monitoring dashboards, these resources support stakeholders in transforming environmental governance for planetary well-being.",
      frameworkTitle: "Framework Architecture Visualizations",
      frameworkDesc: "Core visualizations that illustrate the fundamental architecture and governance structure of the Environmental Stewardship Framework for Multi-Level Governance.",
      implementationTitle: "Implementation & Roadmap Visualizations",
      implementationDesc: "Visual guides for framework implementation, including timelines, stakeholder engagement processes, and phased deployment strategies.",
      monitoringTitle: "Interactive Monitoring Tools",
      monitoringDesc: "Advanced interactive visualizations for ecosystem health monitoring, progress tracking, and adaptive management across environmental stewardship initiatives.",
      requestTitle: "Request Visualizations or Provide Feedback",
      requestDesc: "Need specialized visualizations for a specific environmental context? Have suggestions for improvements? We welcome your input to make these resources more useful.",
      contactLink: "Contact us",
      languagesTitle: "Available Languages",
      viewFullSize: "View Full Size",
      downloadSVG: "Download SVG",
      downloadPNG: "Download PNG",
      accessInteractive: "Access Interactive Version",
      comingSoon: "Coming Soon",
      inDevelopment: "In Development",

      // Visualization titles - Framework Architecture
      governanceMapTitle: "Ecosystem Governance Map",
      governanceMapDesc: "Radial layered visualization showing local-to-global governance with spiritual, ecological, and technological nodes, illustrating how communities, regional hubs, and global councils work together for environmental stewardship.",
      
      rightsSpectrumTitle: "Dynamic Rights Spectrum for Environmental Entities",
      rightsSpectrumDesc: "Visualization of rights progression from natural resources to ecosystems, species, and AI systems, showing how environmental stewardship recognizes and protects the rights of all beings in nature.",
      
      nexusVisualizationTitle: "Water-Energy-Food Nexus Interactions",
      nexusVisualizationDesc: "Diagram illustrating complex interactions between water, energy, and food systems, highlighting trade-offs and optimization opportunities for sustainable resource management.",
      
      theoryChangeTitle: "Theory of Change Diagram",
      theoryChangeDesc: "Visual representation of how principles like equity and adaptability drive actions such as AUBI and ecosystem personhood to achieve regenerative outcomes and thriving ecosystems.",
      
      // Visualization titles - Implementation & Roadmap
      implementationTimelineTitle: "Implementation Roadmap (2026-2050)",
      implementationTimelineDesc: "Comprehensive visual timeline showing phased implementation from capacity building through full deployment, with milestones, risk scenarios, and adaptive pathways.",
      
      stakeholderMapTitle: "Stakeholder Engagement Network",
      stakeholderMapDesc: "Interactive map showing relationships between municipalities, indigenous groups, spiritual leaders, NGOs, private sector, and youth in environmental governance implementation.",
      
      pilotLocationsTitle: "Global Pilot Implementation Map",
      pilotLocationsDesc: "World map showcasing pilot regions (Amazon, Sahel, Pacific Islands) with real-time progress indicators, success metrics, and implementation strategies.",
      
      // Visualization titles - Interactive Monitoring Tools
      ecosystemDashboardTitle: "Ecosystem Health Dashboard",
      ecosystemDashboardDesc: "Real-time monitoring dashboard displaying ecosystem health indicators, biodiversity metrics, climate adaptation progress, and restoration achievements across pilot regions.",
      
      rightsStatusTitle: "Rights Recognition Atlas",
      rightsStatusDesc: "Interactive atlas tracking legal personhood status for ecosystems, species protection enhancements, and AI consciousness assessments across different jurisdictions and pilot areas.",
      
      wellBeingIndexTitle: "Community Well-Being Index Tracker",
      wellBeingIndexDesc: "Dynamic visualization tracking community well-being improvements linked to ecosystem restoration, showing mental health benefits, economic indicators, and social cohesion metrics."
    },
    sv: {
      title: "Visualiseringar för Miljöförvaltning",
      subtitle: "Visuella resurser för att förstå och implementera regenerativ miljöstyrning",
      intro: "Dessa visualiseringar hjälper till att kommunicera miljöförvaltningsramverkets integrerade tillvägagångssätt för ekosystemrättigheter, klimatåtgärder och regenerativ styrning. Från konceptuella diagram till implementeringsplaner och övervakningsdashboards stödjer dessa resurser intressenter i att omvandla miljöstyrning för planetens välbefinnande.",
      frameworkTitle: "Visualiseringar av ramverkets arkitektur",
      frameworkDesc: "Kärnvisualiseringar som illustrerar den grundläggande arkitekturen och styrningsstrukturen för miljöförvaltningsramverket för flernivåstyrning.",
      implementationTitle: "Implementerings- och färdplansvisualiseringar",
      implementationDesc: "Visuella guider för ramverksimplementering, inklusive tidslinjer, intressentengagemangsprocesser och fasade implementeringsstrategier.",
      monitoringTitle: "Interaktiva övervakningsverktyg",
      monitoringDesc: "Avancerade interaktiva visualiseringar för övervakning av ekosystemhälsa, framstegsuppföljning och adaptiv förvaltning över miljöförvaltningsinitiativ.",
      requestTitle: "Begär visualiseringar eller ge feedback",
      requestDesc: "Behöver du specialiserade visualiseringar för ett specifikt miljösammanhang? Har du förslag på förbättringar? Vi välkomnar dina synpunkter för att göra dessa resurser mer användbara.",
      contactLink: "Kontakta oss",
      languagesTitle: "Tillgängliga språk",
      viewFullSize: "Visa full storlek",
      downloadSVG: "Ladda ner SVG",
      downloadPNG: "Ladda ner PNG",
      accessInteractive: "Åtkomst till interaktiv version",
      comingSoon: "Kommer snart",
      inDevelopment: "Under utveckling",

      // Visualization titles - Framework Architecture (Swedish)
      governanceMapTitle: "Karta över ekosystemstyrning",
      governanceMapDesc: "Radiell skiktad visualisering som visar lokal-till-global styrning med andliga, ekologiska och teknologiska noder, som illustrerar hur samhällen, regionala nav och globala råd arbetar tillsammans för miljöförvaltning.",
      
      rightsSpectrumTitle: "Dynamiskt rättighetsspektrum för miljöenheter",
      rightsSpectrumDesc: "Visualisering av rättighetsprogression från naturresurser till ekosystem, arter och AI-system, som visar hur miljöförvaltning erkänner och skyddar alla varelsers rättigheter i naturen.",
      
      nexusVisualizationTitle: "Vatten-energi-mat nexus interaktioner",
      nexusVisualizationDesc: "Diagram som illustrerar komplexa interaktioner mellan vatten-, energi- och matsystem, som belyser avvägningar och optimeringsmöjligheter för hållbar resursförvaltning.",
      
      theoryCchangeTitle: "Förändringsteoridiagram",
      theoryCchangeDesc: "Visuell representation av hur principer som rättvisa och anpassningsförmåga driver handlingar som AUBI och ekosystempersonlighet för att uppnå regenerativa resultat och blomstrande ekosystem.",
      
      // Visualization titles - Implementation & Roadmap (Swedish)
      implementationTimelineTitle: "Implementeringsplan (2026-2050)",
      implementationTimelineDesc: "Omfattande visuell tidslinje som visar fasad implementering från kapacitetsuppbyggnad genom full driftsättning, med milstolpar, riskscenarier och adaptiva vägar.",
      
      stakeholderMapTitle: "Nätverk för intressentengagemang",
      stakeholderMapDesc: "Interaktiv karta som visar relationer mellan kommuner, ursprungsgrupper, andliga ledare, NGOs, privat sektor och ungdomar i miljöstyrningsimplementering.",
      
      pilotLocationsTitle: "Global karta över pilotimplementering",
      pilotLocationsDesc: "Världskarta som visar pilotregioner (Amazonas, Sahel, Stillahavsöarna) med realtidsframstegsindikatorer, framgångsmått och implementeringsstrategier.",
      
      // Visualization titles - Interactive Monitoring Tools (Swedish)
      ecosystemDashboardTitle: "Dashboard för ekosystemhälsa",
      ecosystemDashboardDesc: "Realtidsövervakningsdashboard som visar indikatorer för ekosystemhälsa, biologisk mångfaldsmått, klimatanpassningsframsteg och restaureringsresultat över pilotregioner.",
      
      rightsStatusTitle: "Atlas för rättighetserkännande",
      rightsStatusDesc: "Interaktiv atlas som spårar status för juridisk personlighet för ekosystem, artskyddsförbättringar och AI-medvetenhetsbedömningar över olika jurisdiktioner och pilotområden.",
      
      wellBeingIndexTitle: "Spårare för samhällets välbefinnandeindex",
      wellBeingIndexDesc: "Dynamisk visualisering som spårar förbättringar av samhällets välbefinnande kopplade till ekosystemrestaurering, som visar mental hälsonytta, ekonomiska indikatorer och sociala sammanhållningsmått."
    }
  };

  // Get current translations based on active locale
  $: texts = translations[currentLocale] || translations.en;

  // Visualization data for each section
  const frameworkVisuals = [
    { id: 'ecosystem-governance-map', format: 'svg', interactive: false, color: 'color-ecosystem', planned: false },
    { id: 'dynamic-rights-spectrum', format: 'svg', interactive: false, color: 'color-harmony', planned: false },
    { id: 'nexus-interactions', format: 'svg', interactive: false, color: 'color-solar', planned: false },
    { id: 'theory-of-change', format: 'svg', interactive: false, color: 'color-earth', planned: false }
  ];
  
  const implementationVisuals = [
    { id: 'implementation-timeline', format: 'svg', interactive: false, color: 'color-ecosystem', planned: true },
    { id: 'stakeholder-network-map', format: 'html', interactive: true, color: 'color-harmony', noDownloads: true, planned: true },
    { id: 'pilot-locations-map', format: 'html', interactive: true, color: 'color-solar', noDownloads: true, planned: true }
  ];
  
  const monitoringTools = [
    { id: 'ecosystem-health-dashboard', format: 'html', interactive: true, color: 'color-ecosystem', noDownloads: true, planned: true },
    { id: 'rights-status-atlas', format: 'html', interactive: true, color: 'color-rights', noDownloads: true, planned: true },
    { id: 'wellbeing-index-tracker', format: 'html', interactive: true, color: 'color-earth', noDownloads: true, planned: true }
  ];

  const visualNameToTranslationKey = {
    'ecosystem-governance-map': 'governanceMap',
    'dynamic-rights-spectrum': 'rightsSpectrum',
    'nexus-interactions': 'nexusVisualization',
    'theory-of-change': 'theoryChange',
    'implementation-timeline': 'implementationTimeline',
    'stakeholder-network-map': 'stakeholderMap',
    'pilot-locations-map': 'pilotLocations',
    'ecosystem-health-dashboard': 'ecosystemDashboard',
    'rights-status-atlas': 'rightsStatus',
    'wellbeing-index-tracker': 'wellBeingIndex'
  };

  function getVisualizationPath(id, format, forInteractive = false) {
    // For our actual SVGs, return real paths, otherwise return placeholder
    if ((id === 'ecosystem-governance-map' || 
         id === 'dynamic-rights-spectrum' ||
         id === 'nexus-interactions' ||
         id === 'theory-of-change') && format === 'svg') {
      return `${base}/images/frameworks/environmental-stewardship/${id}-${currentLocale}.svg`;
    } else if ((id === 'ecosystem-governance-map' || 
                id === 'dynamic-rights-spectrum' || 
                id === 'nexus-interactions' || 
                id === 'theory-of-change') && format === 'png') {
      return `${base}/images/frameworks/environmental-stewardship/${id}-${currentLocale}.png`;
    } else {
      return `${base}/images/frameworks/environmental-stewardship/placeholder.png`;
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

<!-- Main Content Section -->
<section class="main-content">
  <div class="container">
    <div class="content-wrapper">
      <p class="intro-text">{texts.intro}</p>

      <!-- Framework Architecture Visualizations Section -->
      <h2 class="section-title">{texts.frameworkTitle}</h2>
      <p class="section-desc">{texts.frameworkDesc}</p>
      
      <div class="visuals-grid">
        {#each frameworkVisuals as visual}
          <div class="visual-card {visual.color}">
            <div class="visual-preview">
              <!-- Show placeholder for planned visualizations -->
              {#if visual.planned}
                <div class="placeholder">
                  <div class="placeholder-text">{texts.comingSoon}</div>
                </div>
              {:else}
                <img src={getVisualizationPath(visual.id, visual.format)} alt={texts[`${visualNameToTranslationKey[visual.id]}Title`]} />
              {/if}
            </div>
            <h3>{texts[`${visualNameToTranslationKey[visual.id]}Title`]}</h3>
            <p>{texts[`${visualNameToTranslationKey[visual.id]}Desc`]}</p>
            <div class="visual-actions">
              <!-- Show placeholder action for planned visualizations -->
              {#if visual.planned}
                <span class="action-btn development">
                  {texts.inDevelopment}
                </span>
              {:else}
                <a href={getVisualizationPath(visual.id, visual.format)} target="_blank" class="action-btn view">
                  {texts.viewFullSize}
                  <span class="icon">↗</span>
                </a>
                <a href={getVisualizationPath(visual.id, 'svg')} download class="action-btn download svg">
                  {texts.downloadSVG}
                  <span class="icon">↓</span>
                </a>
                <a href={getVisualizationPath(visual.id, 'png')} download class="action-btn download png">
                  {texts.downloadPNG}
                  <span class="icon">↓</span>
                </a>
              {/if}
            </div>
          </div>
        {/each}
      </div>

      <!-- Implementation & Roadmap Visualizations Section -->
      <h2 class="section-title">{texts.implementationTitle}</h2>
      <p class="section-desc">{texts.implementationDesc}</p>
      
      <div class="visuals-grid">
        {#each implementationVisuals as visual}
          <div class="visual-card {visual.color}">
            <div class="visual-preview">
              <!-- Show placeholder for planned visualizations -->
              {#if visual.planned}
                <div class="placeholder">
                  <div class="placeholder-text">{texts.comingSoon}</div>
                </div>
              {:else if visual.format === 'html'}
                <img src={`${base}/images/frameworks/environmental-stewardship/${visual.id}-preview.png`} alt={texts[`${visualNameToTranslationKey[visual.id]}Title`]} />
              {:else}
                <img src={getVisualizationPath(visual.id, visual.format)} alt={texts[`${visualNameToTranslationKey[visual.id]}Title`]} />
              {/if}
            </div>
            <h3>{texts[`${visualNameToTranslationKey[visual.id]}Title`]}</h3>
            <p>{texts[`${visualNameToTranslationKey[visual.id]}Desc`]}</p>
            <div class="visual-actions">
              <!-- Show placeholder action for planned visualizations -->
              {#if visual.planned}
                <span class="action-btn development">
                  {texts.inDevelopment}
                </span>
              {:else if visual.interactive}
                <a href={getVisualizationPath(visual.id, visual.format, true)} target="_blank" class="action-btn interactive">
                  {texts.accessInteractive}
                  <span class="icon">↗</span>
                </a>
                {#if !visual.noDownloads}
                  <a href={getVisualizationPath(visual.id, 'svg')} download class="action-btn download svg">
                    {texts.downloadSVG}
                    <span class="icon">↓</span>
                  </a>
                  <a href={getVisualizationPath(visual.id, 'png')} download class="action-btn download png">
                    {texts.downloadPNG}
                    <span class="icon">↓</span>
                  </a>
                {/if}
              {:else}
                <a href={getVisualizationPath(visual.id, visual.format)} target="_blank" class="action-btn view">
                  {texts.viewFullSize}
                  <span class="icon">↗</span>
                </a>
                <a href={getVisualizationPath(visual.id, 'svg')} download class="action-btn download svg">
                  {texts.downloadSVG}
                  <span class="icon">↓</span>
                </a>
                <a href={getVisualizationPath(visual.id, 'png')} download class="action-btn download png">
                  {texts.downloadPNG}
                  <span class="icon">↓</span>
                </a>
              {/if}
            </div>
          </div>
        {/each}
      </div>

      <!-- Interactive Monitoring Tools Section -->
      <h2 class="section-title">{texts.monitoringTitle}</h2>
      <p class="section-desc">{texts.monitoringDesc}</p>
      
      <div class="visuals-grid">
        {#each monitoringTools as visual}
          <div class="visual-card {visual.color}">
            <div class="visual-preview">
              <!-- Show placeholder for planned visualizations -->
              {#if visual.planned}
                <div class="placeholder">
                  <div class="placeholder-text">{texts.comingSoon}</div>
                </div>
              {:else}
                <img src={`${base}/images/frameworks/environmental-stewardship/${visual.id}-preview.png`} alt={texts[`${visualNameToTranslationKey[visual.id]}Title`]} />
              {/if}
            </div>
            <h3>{texts[`${visualNameToTranslationKey[visual.id]}Title`]}</h3>
            <p>{texts[`${visualNameToTranslationKey[visual.id]}Desc`]}</p>
            <div class="visual-actions">
              <!-- Show placeholder action for planned visualizations -->
              {#if visual.planned}
                <span class="action-btn development">
                  {texts.inDevelopment}
                </span>
              {:else}
                <a href={getVisualizationPath(visual.id, visual.format, true)} target="_blank" class="action-btn interactive">
                  {texts.accessInteractive}
                  <span class="icon">↗</span>
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
      
      <!-- Back to Framework link -->
      <div class="back-link">
        <a href="{base}/frameworks/environmental-stewardship">
          <span class="back-icon">←</span>
          {currentLocale === 'sv' ? 'Tillbaka till miljöförvaltningsramverket' : 'Back to Environmental Stewardship Framework'}
        </a>
      </div>
      
      <!-- Language switcher section -->
      <div class="language-section">
        <h3>{texts.languagesTitle}</h3>
        <div class="language-buttons">
          <button on:click={() => setLocale('en')} style={getLanguageButtonStyle('en')}>
            English
          </button>
          <button on:click={() => setLocale('sv')} style={getLanguageButtonStyle('sv')}>
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
    margin-bottom: 1rem;
    color: #6DAA3F; /* Ecosystem Green */
  }
  
  .section-desc {
    margin-bottom: 2rem;
    color: #4b5563;
    line-height: 1.7;
    font-size: 1.125rem;
  }
  
  /* Visualizations Grid */
  .visuals-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 2rem;
    margin-bottom: 3rem;
  }
  
  @media (min-width: 768px) {
    .visuals-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  /* Visual Cards */
  .visual-card {
    background-color: #f9fafb;
    padding: 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    border-top: 4px solid;
    transition: transform 0.2s;
  }
  
  .visual-card:hover {
    transform: translateY(-5px);
  }
  
  .visual-preview {
    height: 200px;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f3f4f6;
  } 
  
  .visual-preview img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    background-color: #f0f8f0; /* Light green background */
  }
  
  /* Placeholder for planned visualizations */
  .placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f0f8f0 0%, #e8f5e8 100%);
    border-radius: 0.5rem;
  }
  
  .placeholder-text {
    font-size: 1.25rem;
    font-weight: 600;
    color: #6DAA3F;
    text-align: center;
    padding: 1rem;
  }
  
  .visual-card h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }
  
  .visual-card p {
    color: #4b5563;
    margin-bottom: 1.5rem;
    min-height: 4.5rem;
  }
  
  /* Environmental Stewardship Color Variations */
  .color-ecosystem {
    border-top-color: #6DAA3F; /* Ecosystem Green */
  }
  
  .color-ecosystem h3 {
    color: #6DAA3F;
  }
  
  .color-harmony {
    border-top-color: #3A6EA5; /* Harmony Blue */
  }
  
  .color-harmony h3 {
    color: #3A6EA5;
  }
  
  .color-earth {
    border-top-color: #8B5A2B; /* Earth Brown */
  }
  
  .color-earth h3 {
    color: #8B5A2B;
  }
  
  .color-solar {
    border-top-color: #F5A623; /* Solar Gold */
  }
  
  .color-solar h3 {
    color: #F5A623;
  }
  
  .color-rights {
    border-top-color: #8A4F9E; /* Rights Purple */
  }
  
  .color-rights h3 {
    color: #8A4F9E;
  }
  
  /* Visual Actions */
  .visual-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  
  /* Buttons */
  .action-btn {
    display: inline-flex;
    align-items: center;
    font-weight: 500;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    text-decoration: none;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    transition: all 0.2s;
    font-size: 0.875rem;
  }
  
  .action-btn.view {
    background-color: #6DAA3F;
    color: white;
  }
  
  .action-btn.interactive {
    background-color: #3A6EA5;
    color: white;
  }
  
  .action-btn.development {
    background-color: #f0f8f0;
    color: #6DAA3F;
    border: 1px dashed #6DAA3F;
    cursor: default;
  }
  
  .action-btn.download.svg {
    background-color: white;
    border: 1px solid #6DAA3F;
    color: #6DAA3F;
  }
  
  .action-btn.download.png {
    background-color: white;
    border: 1px solid #3A6EA5;
    color: #3A6EA5;
  }
  
  .action-btn:hover:not(.development) {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
  .back-link {
    margin-bottom: 2rem;
  }
  
  .back-link a {
    display: inline-flex;
    align-items: center;
    color: #6DAA3F;
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
    color: #6DAA3F;
  }
  
  .language-buttons {
    display: flex;
    gap: 1rem;
  }
  
/* Responsive styles */
  @media (max-width: 640px) {
    .visual-actions {
      flex-direction: column;
    }
    
    .action-btn {
      width: 100%;
      justify-content: center;
    }
    
    .visual-card p {
      min-height: auto;
    }
    
    .hero h1 {
      font-size: 2rem;
    }
    
    .section-title {
      font-size: 1.5rem;
    }
    
    .language-buttons {
      flex-direction: column;
    }
  }
</style>
