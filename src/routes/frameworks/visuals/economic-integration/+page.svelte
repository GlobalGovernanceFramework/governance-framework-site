<!-- src/routes/frameworks/visuals/economic-integration/+page.svelte -->
<script>
  import { t, locale, setLocale } from '$lib/i18n';
  import { base } from '$app/paths';

  // Subscribe to stores
  $: currentT = $t;
  $: currentLocale = $locale;

  // Helper function for language button styles
  function getLanguageButtonStyle(lang) {
    const isActive = currentLocale === lang;
    return `padding: 0.5rem 1rem; border-radius: 0.375rem; border: 1px solid #e5e7eb; background-color: ${isActive ? '#088F8F' : 'white'}; color: ${isActive ? 'white' : '#088F8F'}; font-weight: 500; text-decoration: none;`;
  }

  // Translations for this page
  const translations = {
    en: {
      title: "Economic Integration Visualizations",
      subtitle: "Visual resources for understanding and implementing the Economic Integration Framework",
      intro: "These visualizations help communicate complex economic systems and nested sovereignty approaches by providing accessible visual entry points to the framework. From architecture diagrams to flowcharts and analytical visualizations, these resources support stakeholders in understanding multi-level economic governance and integration.",
      architectureTitle: "Key Framework Visualizations",
      architectureDesc: "Core visualizations that illustrate the fundamental architecture and implementation approaches of the Economic Integration Framework.",
      analyticalTitle: "Analytical Visualizations",
      analyticalDesc: "These visualizations provide deeper analytical perspectives on economic systems, commons governance, and cross-sector relationships.",
      technicalTitle: "Technical Interactive Visualizations",
      technicalDesc: "Advanced interactive visualizations for technical applications and detailed analysis of economic systems and currency flows.",
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
      nestedTitle: "Nested Economic Sovereignty Architecture",
      nestedDesc: "Illustrates the multi-level architecture of economic integration from local to global scales, showing how governance structures at different levels interact through vertical coordination pathways and resource flows.",
      timelineTitle: "Implementation Timeline Roadmap",
      timelineDesc: "Outlines the phased implementation approach for economic integration over a 10-year horizon, detailing Foundation Building, Systems Development, and Full Integration phases with key milestones.",
      currencyTitle: "Community Currency System Flowchart",
      currencyDesc: "Diagrams the structure and flow of complementary currencies at community levels, showing issuance, circulation, and backing mechanisms within the nested sovereignty approach.",
      nexusTitle: "Economy-Climate-Resource Nexus",
      nexusDesc: "Illustrates the critical interconnections between economic systems, climate resilience, and resource governance, with transformation pathways for sustainable prosperity.",
      digitalTitle: "Digital Commons Infrastructure Map",
      digitalDesc: "Maps the technological ecosystem supporting economic integration, visualizing blockchain networks, open source platforms, coordination tools, and knowledge commons.",
      transitionTitle: "Just Transition Timeline",
      transitionDesc: "Charts the typical progression of economic transition dynamics, from current extractive systems through transformation phases to regenerative economics, with key intervention points.",
      
      // Visualization titles - Analytical Visualizations
      sdgTitle: "SDG Alignment Chart",
      sdgDesc: "Maps how the Economic Integration Framework aligns with and contributes to multiple Sustainable Development Goals, with SDG 8 (Decent Work and Economic Growth) and SDG 10 (Reduced Inequalities) as central focus areas.",
      systemsTitle: "Systems Mapping of Economic Flows",
      systemsDesc: "Illustrates how systems thinking reveals complex patterns in economic relationships, showing feedback loops, leverage points, and intervention strategies for equitable prosperity.",
      valueTitle: "Value System Mapping in Economic Paradigms",
      valueDesc: "Interactive visualization exploring how different value systems influence economic models, mapping eight value systems and their impact on economic governance approaches.",

      // Visualization titles - Technical Visualizations
      simulatorTitle: "Currency Flow Simulator",
      simulatorDesc: "Interactive system allowing exploration of complementary currency dynamics in local and regional contexts, with options to adjust parameters and observe outcomes.",
      dashboardTitle: "Nested Economic Health Dashboard",
      dashboardDesc: "Interactive dashboard displaying indicators of economic health across scales, from local community indicators to global metrics, emphasizing sovereignty and cooperation metrics.",
      aubiTitle: "AUBI Impact Modeling Tool",
      aubiDesc: "Simulation of Adaptive Universal Basic Income effects across different contexts and implementation approaches, demonstrating potential outcomes on various economic indicators."
    },
    sv: {
      title: "Visualiseringar för ekonomisk integration",
      subtitle: "Visuella resurser för att förstå och implementera ramverket för ekonomisk integration",
      intro: "Dessa visualiseringar hjälper till att kommunicera komplexa ekonomiska system och nästlade suveränitetstillvägagångssätt genom att tillhandahålla tillgängliga visuella ingångar till ramverket. Från arkitekturdiagram till flödesscheman och analytiska visualiseringar stödjer dessa resurser intressenter i att förstå ekonomisk styrning och integration på flera nivåer.",
      architectureTitle: "Nyckelvisualisationer av ramverket",
      architectureDesc: "Kärnvisualiseringar som illustrerar den grundläggande arkitekturen och implementeringsmetoderna för ramverket för ekonomisk integration.",
      analyticalTitle: "Analytiska visualiseringar",
      analyticalDesc: "Dessa visualiseringar ger djupare analytiska perspektiv på ekonomiska system, allmänningsstyrning och relationer mellan sektorer.",
      technicalTitle: "Tekniska interaktiva visualiseringar",
      technicalDesc: "Avancerade interaktiva visualiseringar för tekniska tillämpningar och detaljerad analys av ekonomiska system och valutaflöden.",
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
      nestedTitle: "Arkitektur för nästlad ekonomisk suveränitet",
      nestedDesc: "Illustrerar flernivåarkitekturen för ekonomisk integration från lokal till global skala, och visar hur styrningsstrukturer på olika nivåer interagerar genom vertikala koordineringsvägar och resursflöden.",
      timelineTitle: "Implementeringstidsplan",
      timelineDesc: "Beskriver den fasade implementeringen för ekonomisk integration över en 10-årshorisont, med detaljerade faser för grundläggande uppbyggnad, systemutveckling och fullständig integration med viktiga milstolpar.",
      currencyTitle: "Flödesschema för lokala valutasystem",
      currencyDesc: "Diagrammerar strukturen och flödet av komplementära valutor på samhällsnivå, visar utgivning, cirkulation och stödmekanismer inom det nästlade suveränitetstillvägagångssättet.",
      nexusTitle: "Ekonomi-klimat-resurssambandet",
      nexusDesc: "Illustrerar de kritiska sammankopplingarna mellan ekonomiska system, klimatmotståndskraft och resursstyrning, med transformationsvägar för hållbart välstånd.",
      digitalTitle: "Karta över digital allmänningsinfrastruktur",
      digitalDesc: "Kartlägger det teknologiska ekosystem som stödjer ekonomisk integration, visualiserar blockkedjor, plattformar med öppen källkod, koordineringsverktyg och kunskapsallmänningar.",
      transitionTitle: "Tidslinje för rättvis övergång",
      transitionDesc: "Beskriver den typiska progressionen av ekonomiska övergångsdynamiker, från nuvarande utvinningssystem genom transformationsfaser till regenerativ ekonomi, med viktiga interventionspunkter.",

      // Visualization titles - Analytical Visualizations (Swedish)
      sdgTitle: "SDG-anpassningskarta",
      sdgDesc: "Kartlägger hur ramverket för ekonomisk integration anpassas till och bidrar till flera hållbara utvecklingsmål, med SDG 8 (Anständiga arbetsvillkor och ekonomisk tillväxt) och SDG 10 (Minskad ojämlikhet) som centrala fokusområden.",
      systemsTitle: "Systemkartläggning av ekonomiska flöden",
      systemsDesc: "Illustrerar hur systemtänkande avslöjar komplexa mönster i ekonomiska relationer, visar återkopplingsslingor, hävstångspunkter och interventionsstrategier för rättvist välstånd.",
      valueTitle: "Värdesystemkartläggning i ekonomiska paradigm",
      valueDesc: "Interaktiv visualisering som utforskar hur olika värdesystem påverkar ekonomiska modeller, kartlägger åtta värdesystem och deras inverkan på ekonomiska styrningsmetoder.",

      // Visualization titles - Technical Visualizations (Swedish)
      simulatorTitle: "Valutaflödessimulator",
      simulatorDesc: "Interaktivt system som möjliggör utforskning av komplementära valutadynamiker i lokala och regionala sammanhang, med alternativ att justera parametrar och observera resultat.",
      dashboardTitle: "Dashboard för nästlad ekonomisk hälsa",
      dashboardDesc: "Interaktiv instrumentpanel som visar indikatorer på ekonomisk hälsa över olika skalor, från lokala samhällsindikatorer till globala mått, med betoning på suveränitets- och samarbetsmått.",
      aubiTitle: "AUBI-effektmodelleringsverktyg",
      aubiDesc: "Simulering av effekter av adaptiv universell basinkomst över olika sammanhang och implementeringsmetoder, demonstrerar potentiella resultat på olika ekonomiska indikatorer."
    }
  };

  // Get current translations based on active locale
  $: texts = translations[currentLocale] || translations.en;

  // Visualization data for each section - all marked as 'planned' since these are placeholders
  const frameworkVisuals = [
    { id: 'nested-sovereignty-architecture', format: 'svg', interactive: false, color: 'color-1', planned: true },
    { id: 'implementation-roadmap', format: 'svg', interactive: false, color: 'color-2', planned: true },
    { id: 'community-currency-flowchart', format: 'svg', interactive: false, color: 'color-3', planned: true },
    { id: 'economy-climate-resource-nexus', format: 'svg', interactive: false, color: 'color-4', planned: true },
    { id: 'digital-commons-infrastructure', format: 'svg', interactive: false, color: 'color-5', planned: true },
    { id: 'just-transition-timeline', format: 'svg', interactive: false, color: 'color-6', planned: true }
  ];
  
  const analyticalVisuals = [
    { id: 'sdg-alignment-economic', format: 'svg', interactive: false, color: 'color-2', planned: true },
    { id: 'systems-mapping-economic', format: 'svg', interactive: false, color: 'color-3', planned: true },
    { id: 'value-system-mapping', format: 'html', interactive: true, color: 'color-4', noDownloads: true, planned: true }
  ];
  
  const technicalVisuals = [
    { id: 'currency-flow-simulator', format: 'html', interactive: true, color: 'color-dark', noDownloads: true, planned: true },
    { id: 'economic-health-dashboard', format: 'html', interactive: true, color: 'color-1', noDownloads: true, planned: true },
    { id: 'aubi-impact-modeling', format: 'html', interactive: true, color: 'color-2', noDownloads: true, planned: true }
  ];

  const visualNameToTranslationKey = {
    'nested-sovereignty-architecture': 'nested',
    'implementation-roadmap': 'timeline',
    'community-currency-flowchart': 'currency',
    'economy-climate-resource-nexus': 'nexus',
    'digital-commons-infrastructure': 'digital',
    'just-transition-timeline': 'transition',
    'sdg-alignment-economic': 'sdg',
    'systems-mapping-economic': 'systems',
    'value-system-mapping': 'value',
    'currency-flow-simulator': 'simulator',
    'economic-health-dashboard': 'dashboard',
    'aubi-impact-modeling': 'aubi'
  };

  // Helper function to get visualization path with language
  function getVisualizationPath(id, format, forInteractive = false) {
    // Since these are placeholders, we'll return a placeholder image path
    return `${base}/images/frameworks/economic-integration/placeholder.png`;
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
                <img src={`${base}/images/frameworks/economic-integration/${visual.id}-preview.png`} alt={texts[`${visualNameToTranslationKey[visual.id]}Title`]} />
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
                <img src={`${base}/images/frameworks/economic-integration/${visual.id}-preview.png`} alt={texts[`${visualNameToTranslationKey[visual.id]}Title`]} />
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
        <a href="{base}/frameworks/nested-economies">
          <span class="back-icon">←</span>
          {currentLocale === 'sv' ? 'Tillbaka till ramverket för ekonomisk integration' : 'Back to Economic Integration Framework'}
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
    background: linear-gradient(to bottom right, #006666, #48BF91);
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
    color: #088F8F;
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
  }
  
  /* Placeholder for planned visualizations */
  .placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #eef9f9 0%, #d1f0e8 100%);
    border-radius: 0.5rem;
  }
  
  .placeholder-text {
    font-size: 1.25rem;
    font-weight: 600;
    color: #088F8F;
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
  
  /* Color Variations with economic theme colors */
  .color-dark {
    border-top-color: #006666;
  }
  
  .color-dark h3 {
    color: #006666;
  }
  
  .color-1 {
    border-top-color: #088F8F;
  }
  
  .color-1 h3 {
    color: #088F8F;
  }
  
  .color-2 {
    border-top-color: #1AA394;
  }
  
  .color-2 h3 {
    color: #1AA394;
  }
  
  .color-3 {
    border-top-color: #2BB59B;
  }
  
  .color-3 h3 {
    color: #2BB59B;
  }
  
  .color-4 {
    border-top-color: #3CC9A4;
  }
  
  .color-4 h3 {
    color: #3CC9A4;
  }
  
  .color-5 {
    border-top-color: #48BF91;
  }
  
  .color-5 h3 {
    color: #48BF91;
  }
  
  .color-6 {
    border-top-color: #56C790;
  }
  
  .color-6 h3 {
    color: #56C790;
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
    background-color: #088F8F;
    color: white;
  }
  
  .action-btn.interactive {
    background-color: #006666;
    color: white;
  }
  
  .action-btn.development {
    background-color: #eef9f9;
    color: #088F8F;
    border: 1px dashed #088F8F;
    cursor: default;
  }
  
  .action-btn.download.svg {
    background-color: white;
    border: 1px solid #088F8F;
    color: #088F8F;
  }
  
  .action-btn.download.png {
    background-color: white;
    border: 1px solid #2BB59B;
    color: #2BB59B;
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
    background-color: #eef9f9;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  
  .feedback-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #088F8F;
  }
  
  .feedback-card p {
    color: #4b5563;
    margin-bottom: 1rem;
  }
  
  .contact-link {
    color: #006666;
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
    color: #088F8F;
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
    color: #088F8F;
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
