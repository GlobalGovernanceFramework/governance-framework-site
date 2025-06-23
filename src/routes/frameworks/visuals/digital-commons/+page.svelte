<!-- src/routes/frameworks/visuals/digital-commons/+page.svelte -->
<script>
  import { t, locale, setLocale } from '$lib/i18n';
  import { base } from '$app/paths';

  // Subscribe to stores
  $: currentT = $t;
  $: currentLocale = $locale;

  // Helper function for language button styles
  function getLanguageButtonStyle(lang) {
    const isActive = currentLocale === lang;
    return `padding: 0.5rem 1rem; border-radius: 0.375rem; border: 1px solid #e5e7eb; background-color: ${isActive ? '#6d28d9' : 'white'}; color: ${isActive ? 'white' : '#6d28d9'}; font-weight: 500; text-decoration: none;`;
  }

  // Translations for this page
  const translations = {
    en: {
      title: "Digital Commons Visualizations",
      subtitle: "Visual resources for understanding and implementing the Digital Commons Framework",
      intro: "These visualizations help communicate complex digital governance systems and commons-based approaches by providing accessible visual entry points to the framework. From architecture diagrams to flowcharts and analytical visualizations, these resources support stakeholders in implementing decentralized digital governance and fostering equitable access to digital resources.",
      architectureTitle: "Key Framework Visualizations",
      architectureDesc: "Core visualizations that illustrate the fundamental architecture and implementation approaches of the Digital Commons Framework.",
      analyticalTitle: "Analytical Visualizations",
      analyticalDesc: "These visualizations provide deeper analytical perspectives on digital commons, governance structures, and cross-system relationships.",
      technicalTitle: "Technical Interactive Visualizations",
      technicalDesc: "Advanced interactive visualizations for technical applications and detailed analysis of digital governance systems and resource flows.",
      requestTitle: "Request Visualizations or Provide Feedback",
      requestDesc: "Need specialized visualizations for a specific context? Have suggestions for improvements? We welcome your input to make these resources more useful.",
      contactLink: "Contact us",
      languagesTitle: "Available Languages",
      viewFullSize: "View Full Size",
      downloadSVG: "Download SVG",
      downloadPNG: "Download PNG",
      accessInteractive: "Access Interactive Version",
      comingSoon: "Coming Soon",
      inDevelopment: "In Development",

      // Visualization titles - Framework Architecture
      governanceTitle: "Layered Digital Governance Architecture",
      governanceDesc: "Illustrates the multi-level architecture of digital governance from Local Citizen Nodes to the Global Digital Commons Council, showing decision flows and accountability pathways.",
      timelineTitle: "Implementation Roadmap 2025-2035",
      timelineDesc: "Outlines the phased approach for digital commons implementation over a 10-year horizon, detailing Foundation, Expansion, and Maturation phases with key milestones.",
      dataTitle: "Data Sovereignty Protocol Flowchart",
      dataDesc: "Diagrams the structure and flow of data governance processes, showing how communities maintain control while enabling beneficial data sharing.",
      componentsTitle: "Key Components Relationship Map",
      componentsDesc: "Illustrates the critical interconnections between the five key components: Open Data Commons, Open-Source Software Ecosystem, Shared Digital Infrastructure, Ethical AI Models, and Knowledge Commons.",
      networksTitle: "Mesh Network Architecture Map",
      networksDesc: "Maps the decentralized infrastructure supporting the digital commons, visualizing node relationships, resilience mechanisms, and resource allocation systems.",
      ethicalTitle: "Ethical AI Governance Framework",
      ethicalDesc: "Charts the governance processes for ensuring ethical AI deployment, from development through auditing to community oversight and continuous improvement.",
      
      // Visualization titles - Analytical Visualizations
      sdgTitle: "SDG Alignment Chart",
      sdgDesc: "Maps how the Digital Commons Framework aligns with and contributes to multiple Sustainable Development Goals, with SDG 9 (Industry, Innovation and Infrastructure) and SDG 10 (Reduced Inequalities) as central focus areas.",
      crossCommonsTitle: "Cross-Commons Integration Map",
      crossCommonsDesc: "Illustrates how digital commons interact with other commons domains (environmental, economic, knowledge), showing feedback loops and synergistic relationships.",
      digitalDivideTitle: "Digital Divide Transformation Pathways",
      digitalDivideDesc: "Interactive visualization exploring how different accessibility approaches address barriers to digital participation across global contexts.",

      // Visualization titles - Technical Visualizations
      dataFlowTitle: "Data Flow Simulator",
      dataFlowDesc: "Interactive system allowing exploration of data sovereignty protocols in action, demonstrating how information flows while preserving community control.",
      govSimTitle: "Governance Simulation Tool",
      govSimDesc: "Interactive dashboard simulating governance processes across nodes, hubs, and councils, demonstrating voting, dispute resolution, and policy implementation.",
      impactTitle: "Impact Assessment Visualization",
      impactDesc: "Simulation of Digital Commons implementation effects across different contexts, demonstrating potential outcomes on metrics like accessibility, participation, and sovereignty."
    },
    sv: {
      title: "Visualiseringar för digitala allmänningar",
      subtitle: "Visuella resurser för att förstå och implementera ramverket för digitala allmänningar",
      intro: "Dessa visualiseringar hjälper till att kommunicera komplexa digitala styrningssystem och allmänningsbaserade tillvägagångssätt genom att tillhandahålla tillgängliga visuella ingångar till ramverket. Från arkitekturdiagram till flödesscheman och analytiska visualiseringar stödjer dessa resurser intressenter i att implementera decentraliserad digital styrning och främja rättvis tillgång till digitala resurser.",
      architectureTitle: "Nyckelvisualisationer av ramverket",
      architectureDesc: "Kärnvisualiseringar som illustrerar den grundläggande arkitekturen och implementeringsmetoderna för ramverket för digitala allmänningar.",
      analyticalTitle: "Analytiska visualiseringar",
      analyticalDesc: "Dessa visualiseringar ger djupare analytiska perspektiv på digitala allmänningar, styrningsstrukturer och relationer mellan system.",
      technicalTitle: "Tekniska interaktiva visualiseringar",
      technicalDesc: "Avancerade interaktiva visualiseringar för tekniska tillämpningar och detaljerad analys av digitala styrningssystem och resursflöden.",
      requestTitle: "Begär visualiseringar eller ge feedback",
      requestDesc: "Behöver du specialiserade visualiseringar för ett specifikt sammanhang? Har du förslag på förbättringar? Vi välkomnar dina synpunkter för att göra dessa resurser mer användbara.",
      contactLink: "Kontakta oss",
      languagesTitle: "Tillgängliga språk",
      viewFullSize: "Visa full storlek",
      downloadSVG: "Ladda ner SVG",
      downloadPNG: "Ladda ner PNG",
      accessInteractive: "Åtkomst till interaktiv version",
      comingSoon: "Kommer snart",
      inDevelopment: "Under utveckling",

      // Visualization titles - Framework Architecture (Swedish)
      governanceTitle: "Arkitektur för flerskiktad digital styrning",
      governanceDesc: "Illustrerar flernivåarkitekturen för digital styrning från lokala medborgarnoder till det globala rådet för digitala allmänningar, och visar beslutsflöden och ansvarsstigar.",
      timelineTitle: "Implementeringstidsplan 2025-2035",
      timelineDesc: "Beskriver den fasade metoden för implementering av digitala allmänningar över en 10-årshorisont, med detaljerade faser för grund, expansion och mognad med viktiga milstolpar.",
      dataTitle: "Flödesschema för datasuveränitet",
      dataDesc: "Diagrammerar strukturen och flödet av datastyrningsprocesser, visar hur samhällen behåller kontroll samtidigt som de möjliggör fördelaktig datadelning.",
      componentsTitle: "Relationskarta över nyckelkomponenter",
      componentsDesc: "Illustrerar de kritiska sammankopplingarna mellan de fem nyckelkomponenterna: Öppen dataallmänning, Öppen källkods-ekosystem, Delad digital infrastruktur, Etiska AI-modeller och Kunskapsallmänning.",
      networksTitle: "Arkitekturkarta för meshnätverk",
      networksDesc: "Kartlägger den decentraliserade infrastrukturen som stödjer digitala allmänningar, visualiserar nodrelationer, motståndskraftsmekanismer och resursfördelningssystem.",
      ethicalTitle: "Ramverk för etisk AI-styrning",
      ethicalDesc: "Visar styrningsprocesserna för att säkerställa etisk AI-implementering, från utveckling genom granskning till samhällsöversikt och kontinuerlig förbättring.",

      // Visualization titles - Analytical Visualizations (Swedish)
      sdgTitle: "SDG-anpassningskarta",
      sdgDesc: "Kartlägger hur ramverket för digitala allmänningar anpassas till och bidrar till flera hållbara utvecklingsmål, med SDG 9 (Industri, innovation och infrastruktur) och SDG 10 (Minskad ojämlikhet) som centrala fokusområden.",
      crossCommonsTitle: "Integrationsdiagram för olika allmänningar",
      crossCommonsDesc: "Illustrerar hur digitala allmänningar interagerar med andra allmänningsdomäner (miljö, ekonomi, kunskap), visar återkopplingsslingor och synergistiska relationer.",
      digitalDivideTitle: "Omvandlingsvägar för digital klyfta",
      digitalDivideDesc: "Interaktiv visualisering som utforskar hur olika tillgänglighetsmetoder hanterar hinder för digitalt deltagande i globala sammanhang.",

      // Visualization titles - Technical Visualizations (Swedish)
      dataFlowTitle: "Dataflödessimulator",
      dataFlowDesc: "Interaktivt system som möjliggör utforskning av datasuveränitetsprotokoll i aktion, demonstrerar hur information flödar samtidigt som samhällskontroll bevaras.",
      govSimTitle: "Styrningssimulationsverktyg",
      govSimDesc: "Interaktiv instrumentpanel som simulerar styrningsprocesser över noder, nav och råd, demonstrerar röstning, konfliktlösning och policyimplementering.",
      impactTitle: "Effektbedömningsvisualisering",
      impactDesc: "Simulering av effekter av implementering av digitala allmänningar i olika sammanhang, demonstrerar potentiella resultat på mätvärden som tillgänglighet, deltagande och suveränitet."
    }
  };

  // Get current translations based on active locale
  $: texts = translations[currentLocale] || translations.en;

  // Visualization data for each section - all marked as 'planned' since these are placeholders
  const frameworkVisuals = [
    { id: 'layered-governance-architecture', format: 'svg', interactive: false, color: 'color-1', planned: false },
    { id: 'implementation-roadmap-digital', format: 'svg', interactive: false, color: 'color-2', planned: false },
    { id: 'data-sovereignty-protocol', format: 'svg', interactive: false, color: 'color-3', planned: false },
    { id: 'key-components-relationship', format: 'svg', interactive: false, color: 'color-4', planned: false },
    { id: 'mesh-network-architecture', format: 'svg', interactive: false, color: 'color-5', planned: false },
    { id: 'ethical-ai-governance', format: 'svg', interactive: false, color: 'color-6', planned: false }
  ];
  
  const analyticalVisuals = [
    { id: 'sdg-alignment-digital', format: 'svg', interactive: false, color: 'color-2', planned: false },
    { id: 'cross-commons-integration', format: 'svg', interactive: false, color: 'color-3', planned: false },
    { id: 'digital-divide-transformation', format: 'html', interactive: true, color: 'color-4', noDownloads: true, planned: false }
  ];
  
  const technicalVisuals = [
    { id: 'data-flow-simulator', format: 'html', interactive: true, color: 'color-dark', noDownloads: true, planned: false },
    { id: 'governance-simulation-tool', format: 'html', interactive: true, color: 'color-1', noDownloads: true, planned: true },
    { id: 'impact-assessment-visualization', format: 'html', interactive: true, color: 'color-2', noDownloads: true, planned: true }
  ];

  const visualNameToTranslationKey = {
    'layered-governance-architecture': 'governance',
    'implementation-roadmap-digital': 'timeline',
    'data-sovereignty-protocol': 'data',
    'key-components-relationship': 'components',
    'mesh-network-architecture': 'networks',
    'ethical-ai-governance': 'ethical',
    'sdg-alignment-digital': 'sdg',
    'cross-commons-integration': 'crossCommons',
    'digital-divide-transformation': 'digitalDivide',
    'data-flow-simulator': 'dataFlow',
    'governance-simulation-tool': 'govSim',
    'impact-assessment-visualization': 'impact'
  };

  function getVisualizationPath(id, format, forInteractive = false) {
    // For our actual SVGs, return real paths, otherwise return placeholder
    if ((id === 'layered-governance-architecture' || 
       id === 'implementation-roadmap-digital' || 
       id === 'data-sovereignty-protocol' ||
       id === 'key-components-relationship' ||
       id === 'mesh-network-architecture' ||
       id === 'ethical-ai-governance' ||
       id === 'sdg-alignment-digital' ||
       id === 'cross-commons-integration') && format === 'svg') {
      return `${base}/images/frameworks/digital-commons/${id}-${currentLocale}.svg`;
    } else if ((id === 'layered-governance-architecture' || 
              id === 'implementation-roadmap-digital' || 
              id === 'data-sovereignty-protocol' ||
              id === 'key-components-relationship' ||
              id === 'mesh-network-architecture' ||
              id === 'ethical-ai-governance' ||
              id === 'sdg-alignment-digital' ||
              id === 'cross-commons-integration') && format === 'png') {
      return `${base}/images/frameworks/digital-commons/${id}-${currentLocale}.png`; // You'll need to create this PNG
    } else if (id === 'digital-divide-transformation' && format === 'html') {
      // New path for the HTML interactive visualization
      return `${base}/interactive/frameworks/digital-commons/${id}-${currentLocale}.html`;
    } else if (id === 'data-flow-simulator' && format === 'html') {
      // Path for the data flow simulator
      return `${base}/frameworks/visuals/digital-commons/data-flow-simulator/`;
    } else {
      // Since these are placeholders, we'll return a placeholder image path
      return `${base}/images/frameworks/digital-commons/placeholder.png`;
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

      <!-- Key Framework Visualizations Section -->
      <h2 class="section-title">{texts.architectureTitle}</h2>
      <p class="section-desc">{texts.architectureDesc}</p>
      
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

      <!-- Analytical Visualizations Section -->
      <h2 class="section-title">{texts.analyticalTitle}</h2>
      <p class="section-desc">{texts.analyticalDesc}</p>
      
      <div class="visuals-grid">
        {#each analyticalVisuals as visual}
          <div class="visual-card {visual.color}">
            <div class="visual-preview">
              <!-- Show placeholder for planned visualizations -->
              {#if visual.planned}
                <div class="placeholder">
                  <div class="placeholder-text">{texts.comingSoon}</div>
                </div>
              {:else if visual.format === 'html'}
                <img src={`${base}/images/frameworks/digital-commons/${visual.id}-preview.png`} alt={texts[`${visualNameToTranslationKey[visual.id]}Title`]} />
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

      <!-- Technical Interactive Visualizations Section -->
      <h2 class="section-title">{texts.technicalTitle}</h2>
      <p class="section-desc">{texts.technicalDesc}</p>
      
      <div class="visuals-grid">
        {#each technicalVisuals as visual}
          <div class="visual-card {visual.color}">
            <div class="visual-preview">
              <!-- Show placeholder for planned visualizations -->
              {#if visual.planned}
                <div class="placeholder">
                  <div class="placeholder-text">{texts.comingSoon}</div>
                </div>
              {:else}
                <img src={`${base}/images/frameworks/digital-commons/${visual.id}-preview.png`} alt={texts[`${visualNameToTranslationKey[visual.id]}Title`]} />
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
        <a href="{base}/frameworks/digital-commons">
          <span class="back-icon">←</span>
          {currentLocale === 'sv' ? 'Tillbaka till ramverket för digitala allmänningar' : 'Back to Digital Commons Framework'}
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
  
  /* Hero Section */
  .hero {
    padding: 3rem 0;
    background: linear-gradient(to bottom right, #4a1d96, #8b5cf6);
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
    color: #6d28d9;
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
    background-color: #f5f3ff; /* Light purple background */
  }
  
  /* Placeholder for planned visualizations */
  .placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
    border-radius: 0.5rem;
  }
  
  .placeholder-text {
    font-size: 1.25rem;
    font-weight: 600;
    color: #6d28d9;
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
  
  /* Color Variations with digital theme colors */
  .color-dark {
    border-top-color: #4a1d96;
  }
  
  .color-dark h3 {
    color: #4a1d96;
  }
  
  .color-1 {
    border-top-color: #6d28d9;
  }
  
  .color-1 h3 {
    color: #6d28d9;
  }
  
  .color-2 {
    border-top-color: #7c3aed;
  }
  
  .color-2 h3 {
    color: #7c3aed;
  }
  
  .color-3 {
    border-top-color: #8b5cf6;
  }
  
  .color-3 h3 {
    color: #8b5cf6;
  }
  
  .color-4 {
    border-top-color: #a78bfa;
  }
  
  .color-4 h3 {
    color: #a78bfa;
  }
  
  .color-5 {
    border-top-color: #c4b5fd;
  }
  
  .color-5 h3 {
    color: #c4b5fd;
  }
  
  .color-6 {
    border-top-color: #8b5cf6;
  }
  
  .color-6 h3 {
    color: #8b5cf6;
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
    background-color: #6d28d9;
    color: white;
  }
  
  .action-btn.interactive {
    background-color: #4a1d96;
    color: white;
  }
  
  .action-btn.development {
    background-color: #f5f3ff;
    color: #6d28d9;
    border: 1px dashed #6d28d9;
    cursor: default;
  }
  
  .action-btn.download.svg {
    background-color: white;
    border: 1px solid #6d28d9;
    color: #6d28d9;
  }
  
  .action-btn.download.png {
    background-color: white;
    border: 1px solid #8b5cf6;
    color: #8b5cf6;
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
    color: #4a1d96;
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
  }
</style>
