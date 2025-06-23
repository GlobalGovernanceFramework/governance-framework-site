<!-- src/routes/frameworks/visuals/peace-and-conflict-resolution/+page.svelte -->
<script>
  import { t, locale, setLocale } from '$lib/i18n';
  import { base } from '$app/paths';

  // Subscribe to stores
  $: currentT = $t;
  $: currentLocale = $locale;

  // Helper function for language button styles
  function getLanguageButtonStyle(lang) {
    const isActive = currentLocale === lang;
    return `padding: 0.5rem 1rem; border-radius: 0.375rem; border: 1px solid #e5e7eb; background-color: ${isActive ? '#6B5CA5' : 'white'}; color: ${isActive ? 'white' : '#6B5CA5'}; font-weight: 500; text-decoration: none;`;
  }

  // Translations for this page
  const translations = {
    en: {
      title: "Peace & Conflict Resolution Visualizations",
      subtitle: "Visual resources for understanding and implementing the Peace & Conflict Resolution Framework",
      intro: "These visualizations help communicate complex peace and conflict dynamics by providing accessible visual entry points to the framework. From architecture diagrams to flowcharts and analytical visualizations, these resources support stakeholders in understanding multi-dimensional and interconnected approaches to peace governance.",
      architectureTitle: "Key Framework Visualizations",
      architectureDesc: "Core visualizations that illustrate the fundamental architecture and implementation approaches of the Peace & Conflict Resolution Framework.",
      analyticalTitle: "Analytical Visualizations",
      analyticalDesc: "These visualizations provide deeper analytical perspectives on conflict dynamics, developmental stages, and cross-system relationships.",
      technicalTitle: "Technical Interactive Visualizations",
      technicalDesc: "Advanced interactive visualizations for technical applications and detailed analysis of peace and conflict systems.",
      requestTitle: "Request Visualizations or Provide Feedback",
      requestDesc: "Need specialized visualizations for a specific context? Have suggestions for improvements? We welcome your input to make these resources more useful.",
      contactLink: "Contact us",
      languagesTitle: "Available Languages",
      viewFullSize: "View Full Size",
      downloadSVG: "Download SVG",
      downloadPNG: "Download PNG",
      accessInteractive: "Access Interactive Version",

      // Visualization titles - Framework Architecture
      governanceTitle: "Peace Governance Architecture",
      governanceDesc: "Illustrates the multi-level architecture of peace governance from local to global scales, showing how governance structures at different levels interact through vertical coordination pathways and information flows.",
      timelineTitle: "Implementation Timeline Roadmap",
      timelineDesc: "Outlines the phased implementation approach for peace governance over a 10-year horizon, detailing Foundation Building, Systems Development, and Full Integration phases with key milestones.",
      trackTitle: "Multi-Track Peace Engagement Flowchart",
      trackDesc: "Based on the Diamond Model of Multi-Track Diplomacy, this flowchart shows nine interconnected tracks of peacebuilding engagement from official diplomacy to grassroots initiatives.",
      nexusTitle: "Peace-Climate-Migration Nexus",
      nexusDesc: "Illustrates the critical interconnections between climate change, migration patterns, and peace/conflict dynamics, with governance components for prevention, response, and transformation.",
      digitalTitle: "Digital Peace Infrastructure Map",
      digitalDesc: "Maps the technological ecosystem supporting peace governance, visualizing early warning systems, communication platforms, documentation tools, and coordination systems.",
      transformationTitle: "Conflict Transformation Timeline",
      transformationDesc: "Charts the typical progression of conflict dynamics and intervention points, from pre-conflict conditions through escalation, violent conflict, de-escalation, and post-conflict to sustainable peace.",
      
      // Visualization titles - Analytical Visualizations
      sdgTitle: "SDG Alignment Chart",
      sdgDesc: "Maps how the Peace & Conflict Resolution Framework aligns with and contributes to multiple Sustainable Development Goals, with SDG 16 as the central focus.",
      neuralTitle: "Neural Network Analysis of Conflict Dynamics",
      neuralDesc: "Illustrates how computational approaches can reveal complex patterns in conflict systems, showing input nodes representing factors, hidden layers for pattern recognition, and output nodes predicting outcomes.",
      spiralTitle: "Spiral Dynamics in Conflict and Peace",
      spiralDesc: "Interactive visualization exploring how developmental value systems influence conflict and peacebuilding, mapping eight value systems and their impact on peace processes.",

      // Visualization titles - Technical Visualizations
      networkTitle: "Network Analysis of Peace Actors",
      networkDesc: "Allows exploration of complex relationships between different actors in peace processes, revealing connections between official institutions and grassroots initiatives.",
      gisTitle: "Geographic Information System (GIS) Applications",
      gisDesc: "Provides spatial analysis of conflict dynamics and peace infrastructure, displaying resource conflict hotspots, cross-border dynamics, and climate-migration projections. [NOTE: Not finished!]",
      systemsTitle: "Systems Dynamics Models",
      systemsDesc: "Applies systems thinking to peace and conflict, revealing complex relationships, feedback loops, and intervention points through feedback diagrams and stock and flow models."
    },
    sv: {
      title: "Visualiseringar för freds- och konfliktlösning",
      subtitle: "Visuella resurser för att förstå och implementera ramverket för freds- och konfliktlösning",
      intro: "Dessa visualiseringar hjälper till att kommunicera komplexa freds- och konfliktdynamik genom att tillhandahålla tillgängliga visuella ingångar till ramverket. Från arkitekturdiagram till flödesscheman och analytiska visualiseringar stödjer dessa resurser intressenter i att förstå flerdimensionella och sammankopplade metoder för fredsstyrning.",
      architectureTitle: "Nyckelvisualisationer av ramverket",
      architectureDesc: "Kärnvisualiseringar som illustrerar den grundläggande arkitekturen och implementeringsmetoderna för freds- och konfliktlösningsramverket.",
      analyticalTitle: "Analytiska visualiseringar",
      analyticalDesc: "Dessa visualiseringar ger djupare analytiska perspektiv på konfliktdynamik, utvecklingsstadier och korsande systemrelationer.",
      technicalTitle: "Tekniska interaktiva visualiseringar",
      technicalDesc: "Avancerade interaktiva visualiseringar för tekniska tillämpningar och detaljerad analys av freds- och konfliktsystem.",
      requestTitle: "Begär visualiseringar eller ge feedback",
      requestDesc: "Behöver du specialiserade visualiseringar för ett specifikt sammanhang? Har du förslag på förbättringar? Vi välkomnar dina synpunkter för att göra dessa resurser mer användbara.",
      contactLink: "Kontakta oss",
      languagesTitle: "Tillgängliga språk",
      viewFullSize: "Visa full storlek",
      downloadSVG: "Ladda ner SVG",
      downloadPNG: "Ladda ner PNG",
      accessInteractive: "Åtkomst till interaktiv version",

      // Visualization titles - Framework Architecture (Swedish)
      governanceTitle: "Fredsstyrningsarkitektur",
      governanceDesc: "Illustrerar den flernivåarkitektur för fredsstyrning från lokal till global skala, och visar hur styrningsstrukturer på olika nivåer interagerar genom vertikala koordineringsvägar och informationsflöden.",
      timelineTitle: "Implementeringstidsplan",
      timelineDesc: "Beskriver den fasade implementeringen för fredsstyrning över en 10-årshorisont, med detaljerade faser för grundläggande uppbyggnad, systemutveckling och fullständig integration med viktiga milstolpar.",
      trackTitle: "Flerspårsflödesschema för fredsengagemang",
      trackDesc: "Baserat på diamantmodellen för flerspårsdiplomati visar detta flödesschema nio sammankopplade spår av fredsbyggande engagemang från officiell diplomati till gräsrotsinitiativ.",
      nexusTitle: "Freds-klimat-migrationssamband",
      nexusDesc: "Illustrerar de kritiska sammankopplingarna mellan klimatförändringar, migrationsmönster och freds/konfliktdynamik, med styrningskomponenter för förebyggande, respons och transformation.",
      digitalTitle: "Digital fredsinfrastrukturkarta",
      digitalDesc: "Kartlägger det teknologiska ekosystemet som stödjer fredsstyrning, visualiserar system för tidig varning, kommunikationsplattformar, dokumentationsverktyg och koordineringssystem.",
      transformationTitle: "Tidslinje för konflikttransformation",
      transformationDesc: "Beskriver den typiska progressionen av konfliktdynamik och interventionspunkter, från förkonfliktsvillkor genom eskalering, våldsam konflikt, de-eskalering och efterkonflikt till hållbar fred.",

      // Visualization titles - Analytical Visualizations (Swedish)
      sdgTitle: "SDG-anpassningskarta",
      sdgDesc: "Kartlägger hur ramverket för freds- och konfliktlösning anpassas till och bidrar till flera hållbara utvecklingsmål, med SDG 16 som central fokus.",
      neuralTitle: "Neuralnätverksanalys av konfliktdynamik",
      neuralDesc: "Illustrerar hur beräkningsmetoder kan avslöja komplexa mönster i konfliktsystem, visar indatanoder som representerar faktorer, dolda lager för mönsterigenkänning och utdatanoder som förutspår resultat.",
      spiralTitle: "Spiraldynamik i konflikt och fred",
      spiralDesc: "Interaktiv visualisering som utforskar hur utvecklingsmässiga värdesystem påverkar konflikt och fredsbyggande, kartlägger åtta värdesystem och deras inverkan på fredsprocesser.",

      // Visualization titles - Technical Visualizations (Swedish)
      networkTitle: "Nätverksanalys av fredsaktörer",
      networkDesc: "Möjliggör utforskning av komplexa relationer mellan olika aktörer i fredsprocesser, avslöjar kopplingar mellan officiella institutioner och gräsrotsinitiativ.",
      gisTitle: "Geografiska informationssystem (GIS) applikationer",
      gisDesc: "Tillhandahåller rumslig analys av konfliktdynamik och fredsinfrastruktur, visar resurskonflikthot, gränsöverskridande dynamik och klimat-migrationsprojektioner. [Notera: Inte färdig!]",
      systemsTitle: "Systemdynamikmodeller",
      systemsDesc: "Tillämpar systemtänkande på fred och konflikt, avslöjar komplexa relationer, återkopplingsslingor och interventionspunkter genom återkopplingsdiagram och stock- och flödesmodeller."
    }
  };

  // Get current translations based on active locale
  $: texts = translations[currentLocale] || translations.en;

  // Visualization data for each section
  const frameworkVisuals = [
    { id: 'governance-architecture', format: 'svg', interactive: false, color: 'color-1' },
    { id: 'implementation-roadmap', format: 'svg', interactive: false, color: 'color-2' },
    { id: 'multi-track-engagement', format: 'svg', interactive: false, color: 'color-3' },
    { id: 'climate-migration-nexus', format: 'svg', interactive: false, color: 'color-4' },
    { id: 'digital-infrastructure', format: 'svg', interactive: false, color: 'color-5' },
    { id: 'conflict-transformation-timeline', format: 'svg', interactive: false, color: 'color-6' }
  ];
  
  const analyticalVisuals = [
    { id: 'sdg-alignment', format: 'svg', interactive: false, color: 'color-2' },
    { id: 'neural-network-conflict-dynamics', format: 'svg', interactive: false, color: 'color-3' },
    { id: 'spiral-dynamics', format: 'html', interactive: true, color: 'color-4', noDownloads: true }
  ];
  
  const technicalVisuals = [
    { id: 'actor-networks', format: 'html', interactive: true, color: 'color-dark', noDownloads: true },
    { id: 'gis-applications', format: 'html', interactive: true, color: 'color-1', noDownloads: true }
  ];

  const visualNameToTranslationKey = {
    'governance-architecture': 'governance',
    'implementation-roadmap': 'timeline',
    'multi-track-engagement': 'track',
    'climate-migration-nexus': 'nexus',
    'digital-infrastructure': 'digital',
    'conflict-transformation-timeline': 'transformation',
    'sdg-alignment': 'sdg',
    'neural-network-conflict-dynamics': 'neural',
    'spiral-dynamics': 'spiral',
    'actor-networks': 'network',
    'gis-applications': 'gis',
    'systems-dynamics': 'systems',
  };

  // Helper function to get visualization path with language
  function getVisualizationPath(id, format, forInteractive = false) {
    // Check if we want the interactive version URL
    if (forInteractive) {
      return `${base}/frameworks/visuals/peace-and-conflict-resolution/technical/${id}`;
    }
    
    // Special case for Spiral Dynamics HTML file
    if (id === 'spiral-dynamics' && format === 'html') {
      return `/images/frameworks/peace-and-conflict-resolution/spiral-dynamics-${currentLocale}.html`;
    }
    
    // Otherwise, return the image URL with language suffix if applicable
    const langSuffix = ['governance-architecture', 'implementation-roadmap', 'multi-track-engagement'].includes(id) ? `-${currentLocale}` : '';
    return `${base}/images/frameworks/peace-and-conflict-resolution/${id}${langSuffix}.${format}`;
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
              <img src={getVisualizationPath(visual.id, visual.format)} alt={texts[`${visualNameToTranslationKey[visual.id]}Title`]} />
            </div>
            <h3>{texts[`${visualNameToTranslationKey[visual.id]}Title`]}</h3>
            <p>{texts[`${visualNameToTranslationKey[visual.id]}Desc`]}</p>
            <div class="visual-actions">
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
              {#if visual.format === 'html'}
                <img src={`${base}/images/frameworks/peace-and-conflict-resolution/${visual.id}-preview.png`} alt={texts[`${visualNameToTranslationKey[visual.id]}Title`]} />
              {:else}
                <img src={getVisualizationPath(visual.id, visual.format)} alt={texts[`${visualNameToTranslationKey[visual.id]}Title`]} />
              {/if}
            </div>
            <h3>{texts[`${visualNameToTranslationKey[visual.id]}Title`]}</h3>
            <p>{texts[`${visualNameToTranslationKey[visual.id]}Desc`]}</p>
            <div class="visual-actions">
              {#if visual.id === 'spiral-dynamics'}
                <a href={getVisualizationPath(visual.id, 'html')} target="_blank" class="action-btn interactive">
                  {texts.accessInteractive}
                  <span class="icon">↗</span>
                </a>
              {:else if visual.interactive}
                <a href={getVisualizationPath(visual.id, visual.format, true)} target="_blank" class="action-btn interactive">
                  {texts.accessInteractive}
                  <span class="icon">↗</span>
                </a>
              {:else}
                <a href={getVisualizationPath(visual.id, visual.format)} target="_blank" class="action-btn view">
                  {texts.viewFullSize}
                  <span class="icon">↗</span>
                </a>
              {/if}
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
              <img src={`${base}/images/frameworks/peace-and-conflict-resolution/${visual.id}-preview.png`} alt={texts[`${visualNameToTranslationKey[visual.id]}Title`]} />
            </div>
            <h3>{texts[`${visualNameToTranslationKey[visual.id]}Title`]}</h3>
            <p>{texts[`${visualNameToTranslationKey[visual.id]}Desc`]}</p>
            <div class="visual-actions">
              <a href={getVisualizationPath(visual.id, visual.format, true)} target="_blank" class="action-btn interactive">
                {texts.accessInteractive}
                <span class="icon">↗</span>
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
      
      <!-- Back to Framework link -->
      <div class="back-link">
        <a href="{base}/frameworks/peace-and-conflict-resolution">
          <span class="back-icon">←</span>
          {currentLocale === 'sv' ? 'Tillbaka till ramverk för fred' : 'Back to Peace Framework'}
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
    color: #6B5CA5;
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
  
  /* Color Variations */
  .color-dark {
    border-top-color: #4A3D8F;
  }
  
  .color-dark h3 {
    color: #4A3D8F;
  }
  
  .color-1 {
    border-top-color: #6B5CA5;
  }
  
  .color-1 h3 {
    color: #6B5CA5;
  }
  
  .color-2 {
    border-top-color: #7E70B5;
  }
  
  .color-2 h3 {
    color: #7E70B5;
  }
  
  .color-3 {
    border-top-color: #9183C3;
  }
  
  .color-3 h3 {
    color: #9183C3;
  }
  
  .color-4 {
    border-top-color: #A497D0;
  }
  
  .color-4 h3 {
    color: #A497D0;
  }
  
  .color-5 {
    border-top-color: #B5ABDD;
  }
  
  .color-5 h3 {
    color: #B5ABDD;
  }
  
  .color-6 {
    border-top-color: #C8BFEB;
  }
  
  .color-6 h3 {
    color: #C8BFEB;
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
    background-color: #6B5CA5;
    color: white;
  }
  
  .action-btn.interactive {
    background-color: #4A3D8F;
    color: white;
  }
  
  .action-btn.download.svg {
    background-color: white;
    border: 1px solid #6B5CA5;
    color: #6B5CA5;
  }
  
  .action-btn.download.png {
    background-color: white;
    border: 1px solid #9183C3;
    color: #9183C3;
  }
  
  .action-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
