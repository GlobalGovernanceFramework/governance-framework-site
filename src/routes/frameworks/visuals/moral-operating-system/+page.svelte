<!-- src/routes/frameworks/visuals/moral-operating-system/+page.svelte -->
<script>
  import { t, locale, setLocale } from '$lib/i18n';
  import { base } from '$app/paths';

  // Subscribe to stores
  $: currentT = $t;
  $: currentLocale = $locale;

  // Helper function for language button styles
  function getLanguageButtonStyle(lang) {
    const isActive = currentLocale === lang;
    return `padding: 0.5rem 1rem; border-radius: 0.375rem; border: 1px solid #e5e7eb; background-color: ${isActive ? '#16a34a' : 'white'}; color: ${isActive ? 'white' : '#16a34a'}; font-weight: 500; text-decoration: none;`;
  }

  // Translations for this page
  const translations = {
    en: {
      title: "Ethics & Rights Visualizations",
      subtitle: "Visual resources for understanding and implementing the Global Ethics & Rights of Beings Framework",
      intro: "These visualizations help communicate complex ethical principles and rights frameworks by providing accessible visual entry points to the framework. From conceptual diagrams to decision trees and implementation flowcharts, these resources support stakeholders in recognizing and protecting the rights of all beings across diverse contexts.",
      architectureTitle: "Key Framework Visualizations",
      architectureDesc: "Core visualizations that illustrate the fundamental architecture and implementation approaches of the Global Ethics & Rights of Beings Framework.",
      analyticalTitle: "Implementation Visualizations",
      analyticalDesc: "These visualizations provide practical guidance for framework implementation, decision-making processes, and conflict resolution.",
      technicalTitle: "Interactive Assessment Tools",
      technicalDesc: "Advanced interactive visualizations for rights assessment, ethical decision-making, and implementation planning across diverse contexts.",
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
      rightsSpectrumTitle: "Dynamic Rights Spectrum",
      rightsSpectrumDesc: "Visualization of the graduated approach to rights recognition across different beings, illustrating how rights protection extends outward with appropriate protections scaled to capacity for suffering, complexity, and ecological significance.",
      spiralTitle: "Spiral-Aware Implementation Matrix",
      spiralDesc: "Guide to implementing the framework across different developmental stages and worldviews, showing how to translate universal principles into language and frameworks that resonate with each perspective.",
      governanceTitle: "Governance Structure Diagram",
      governanceDesc: "Illustration of key governance mechanisms and their relationships, visualizing how Guardianship Councils, transparency systems, and enforcement mechanisms work together.",
      timelineTitle: "Implementation Timeline",
      timelineDesc: "Visual roadmap showing the phased approach to implementation over time, highlighting quick wins, focus areas, and contingency paths for different scenarios.",
      aiConsciousnessTitle: "AI Consciousness Assessment Flowchart",
      aiConsciousnessDesc: "Decision tree for evaluating potential consciousness in artificial intelligence systems, outlining the methodical process combining multiple indicators with scientific validation protocols.",
      
      // Visualization titles - Implementation Visualizations
      conflictResolutionTitle: "Conflict Resolution Decision Matrix",
      conflictResolutionDesc: "Structured approach to resolving conflicts between different rights claims, ensuring balanced consideration of critical factors rather than arbitrary prioritization.",
      pioneerPilotsTitle: "Pioneer Pilots Map",
      pioneerPilotsDesc: "Interactive visualization of implementation pilots worldwide, showcasing real-world applications across diverse contexts, scales, and rights categories.",
      crisisEthicsTitle: "Crisis Ethics Decision Flowcharts",
      crisisEthicsDesc: "Visual guides for ethical decision-making during emergencies, providing structured approaches to rights-respecting decisions under urgent conditions.",

      // Visualization titles - Interactive Tools
      assessmentToolTitle: "Rights Assessment Simulator",
      assessmentToolDesc: "Interactive tool for exploring how different beings might be evaluated within the Dynamic Rights Spectrum, demonstrating the application of consciousness assessment protocols and ethical considerations.",
      scenarioTitle: "Implementation Scenario Explorer",
      scenarioDesc: "Interactive simulation allowing users to explore different implementation contexts and challenges, providing insights into context-specific adaptation strategies and solution pathways.",
      guardianshipTitle: "Guardianship Council Designer",
      guardianshipDesc: "Tool for modelling and designing appropriate Guardianship Council structures for different entity types and implementation contexts, with guidance on composition and operating procedures."
    },
    sv: {
      title: "Visualiseringar för etik och rättigheter",
      subtitle: "Visuella resurser för att förstå och implementera det globala ramverket för etik och varelsers rättigheter",
      intro: "Dessa visualiseringar hjälper till att kommunicera komplexa etiska principer och rättighetsramverk genom att tillhandahålla tillgängliga visuella ingångar till ramverket. Från konceptuella diagram till beslutsträd och implementeringsflödesscheman stödjer dessa resurser intressenter i att erkänna och skydda alla varelsers rättigheter i olika sammanhang.",
      architectureTitle: "Nyckelvisualisationer av ramverket",
      architectureDesc: "Kärnvisualiseringar som illustrerar den grundläggande arkitekturen och implementeringsmetoderna för det globala ramverket för etik och varelsers rättigheter.",
      analyticalTitle: "Implementeringsvisualiseringar",
      analyticalDesc: "Dessa visualiseringar ger praktisk vägledning för ramverksimplementering, beslutsprocesser och konfliktlösning.",
      technicalTitle: "Interaktiva bedömningsverktyg",
      technicalDesc: "Avancerade interaktiva visualiseringar för rättighetsbedömning, etiskt beslutsfattande och implementeringsplanering i olika sammanhang.",
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
      rightsSpectrumTitle: "Dynamiskt rättighetsspektrum",
      rightsSpectrumDesc: "Visualisering av det graderade tillvägagångssättet för rättighetserkännande över olika varelser, som illustrerar hur rättighetsskydd sträcker sig utåt med lämpliga skydd anpassade efter kapacitet för lidande, komplexitet och ekologisk betydelse.",
      spiralTitle: "Spiralmedveten implementeringsmatris",
      spiralDesc: "Guide för att implementera ramverket över olika utvecklingsstadier och världsbilder, som visar hur man översätter universella principer till språk och ramverk som resonerar med varje perspektiv.",
      governanceTitle: "Diagram över styrningsstruktur",
      governanceDesc: "Illustration av viktiga styrningsmekanismer och deras relationer, visualisering av hur väktarråd, transparenssystem och verkställighetsmekanismer fungerar tillsammans.",
      timelineTitle: "Implementeringstidsplan",
      timelineDesc: "Visuell färdplan som visar det fasade tillvägagångssättet för implementering över tid, som belyser snabba vinster, fokusområden och beredskapsvägar för olika scenarier.",
      aiConsciousnessTitle: "Flödesschema för AI-medvetenhetsbedömning",
      aiConsciousnessDesc: "Beslutsträd för att utvärdera potentiell medvetenhet i artificiella intelligenssystem, som beskriver den metodiska processen som kombinerar flera indikatorer med vetenskapliga valideringsprotokoll.",
      
      // Visualization titles - Implementation Visualizations (Swedish)
      conflictResolutionTitle: "Beslutsmatris för konfliktlösning",
      conflictResolutionDesc: "Strukturerat tillvägagångssätt för att lösa konflikter mellan olika rättighetsanspråk, säkerställande av balanserad hänsyn till kritiska faktorer snarare än godtycklig prioritering.",
      pioneerPilotsTitle: "Karta över pionjärpiloter",
      pioneerPilotsDesc: "Interaktiv visualisering av implementeringspiloter världen över, som visar verkliga tillämpningar över olika sammanhang, skalor och rättighetskategorier.",
      crisisEthicsTitle: "Beslutsflödesscheman för krisetik",
      crisisEthicsDesc: "Visuella guider för etiskt beslutsfattande under nödsituationer, som tillhandahåller strukturerade metoder för rättighetsrespekterande beslut under brådskande förhållanden.",

      // Visualization titles - Interactive Tools (Swedish)
      assessmentToolTitle: "Simulator för rättighetsbedömning",
      assessmentToolDesc: "Interaktivt verktyg för att utforska hur olika varelser kan utvärderas inom det dynamiska rättighetsspektrumet, som demonstrerar tillämpningen av medvetenhetsbedömningsprotokoll och etiska överväganden.",
      scenarioTitle: "Utforskare för implementeringsscenarier",
      scenarioDesc: "Interaktiv simulering som låter användare utforska olika implementeringskontexter och utmaningar, som ger insikter om kontextspecifika anpassningsstrategier och lösningsvägar.",
      guardianshipTitle: "Designer för väktarråd",
      guardianshipDesc: "Verktyg för att modellera och utforma lämpliga strukturer för väktarråd för olika enhetstyper och implementeringskontexter, med vägledning om sammansättning och operativa procedurer."
    }
  };

  // Get current translations based on active locale
  $: texts = translations[currentLocale] || translations.en;

  // Visualization data for each section - all marked as 'planned' since these are placeholders
  const frameworkVisuals = [
    { id: 'dynamic-rights-spectrum', format: 'svg', interactive: false, color: 'color-1', planned: false },
    { id: 'spiral-aware-implementation', format: 'svg', interactive: false, color: 'color-2', planned: false },
    { id: 'governance-structure-diagram', format: 'svg', interactive: false, color: 'color-3', planned: false },
    { id: 'implementation-timeline', format: 'svg', interactive: false, color: 'color-4', planned: true },
    { id: 'ai-consciousness-framework', format: 'svg', interactive: false, color: 'color-5', planned: true }
  ];
  
  const implementationVisuals = [
    { id: 'conflict-resolution-matrix', format: 'svg', interactive: false, color: 'color-2', planned: true },
    { id: 'pioneer-pilots-map', format: 'html', interactive: true, color: 'color-3', noDownloads: true, planned: true },
    { id: 'crisis-ethics-flowcharts', format: 'svg', interactive: false, color: 'color-4', planned: true }
  ];
  
  const interactiveTools = [
    { id: 'rights-assessment-simulator', format: 'html', interactive: true, color: 'color-1', noDownloads: true, planned: true },
    { id: 'implementation-scenario-explorer', format: 'html', interactive: true, color: 'color-2', noDownloads: true, planned: true },
    { id: 'guardianship-council-designer', format: 'html', interactive: true, color: 'color-3', noDownloads: true, planned: true }
  ];

  const visualNameToTranslationKey = {
    'dynamic-rights-spectrum': 'rightsSpectrum',
    'spiral-aware-implementation': 'spiral',
    'governance-structure-diagram': 'governance',
    'implementation-timeline': 'timeline',
    'ai-consciousness-framework': 'aiConsciousness',
    'conflict-resolution-matrix': 'conflictResolution',
    'pioneer-pilots-map': 'pioneerPilots',
    'crisis-ethics-flowcharts': 'crisisEthics',
    'rights-assessment-simulator': 'assessmentTool',
    'implementation-scenario-explorer': 'scenario',
    'guardianship-council-designer': 'guardianship'
  };

  function getVisualizationPath(id, format, forInteractive = false) {
    // For our actual SVGs, return real paths, otherwise return placeholder
    if ((id === 'dynamic-rights-spectrum' || 
         id === 'spiral-aware-implementation' ||
         id === 'governance-structure-diagram') && format === 'svg') {
      return `${base}/images/frameworks/moral-operating-system/${id}-${currentLocale}.svg`;
    } else if ((id === 'dynamic-rights-spectrum' || 
                id === 'spiral-aware-implementation' ||
                id === 'governance-structure-diagram') && format === 'png') {
      return `${base}/images/frameworks/moral-operating-system/${id}-${currentLocale}.png`;
    } else {
      return `${base}/images/frameworks/moral-operating-system/placeholder.png`;
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

      <!-- Implementation Visualizations Section -->
      <h2 class="section-title">{texts.analyticalTitle}</h2>
      <p class="section-desc">{texts.analyticalDesc}</p>
      
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
                <img src={`${base}/images/frameworks/moral-operating-system/${visual.id}-preview.png`} alt={texts[`${visualNameToTranslationKey[visual.id]}Title`]} />
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

      <!-- Interactive Assessment Tools Section -->
      <h2 class="section-title">{texts.technicalTitle}</h2>
      <p class="section-desc">{texts.technicalDesc}</p>
      
      <div class="visuals-grid">
        {#each interactiveTools as visual}
          <div class="visual-card {visual.color}">
            <div class="visual-preview">
              <!-- Show placeholder for planned visualizations -->
              {#if visual.planned}
                <div class="placeholder">
                  <div class="placeholder-text">{texts.comingSoon}</div>
                </div>
              {:else}
                <img src={`${base}/images/frameworks/moral-operating-system/${visual.id}-preview.png`} alt={texts[`${visualNameToTranslationKey[visual.id]}Title`]} />
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
        <a href="{base}/frameworks/moral-operating-system">
          <span class="back-icon">←</span>
          {currentLocale === 'sv' ? 'Tillbaka till ramverket för etik och rättigheter' : 'Back to Ethics & Rights of Beings Framework'}
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
    background: linear-gradient(to bottom right, #166534, #22c55e);
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
    color: #166534;
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
    background-color: #f0fdf4; /* Light green background */
  }
  
  /* Placeholder for planned visualizations */
  .placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
    border-radius: 0.5rem;
  }
  
  .placeholder-text {
    font-size: 1.25rem;
    font-weight: 600;
    color: #166534;
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
  
  /* Color Variations with ethics theme colors (greens) */
  .color-dark {
    border-top-color: #166534;
  }
  
  .color-dark h3 {
    color: #166534;
  }
  
  .color-1 {
    border-top-color: #16a34a;
  }
  
  .color-1 h3 {
    color: #16a34a;
  }
  
  .color-2 {
    border-top-color: #22c55e;
  }
  
  .color-2 h3 {
    color: #22c55e;
  }
  
  .color-3 {
    border-top-color: #4ade80;
  }
  
  .color-3 h3 {
    color: #4ade80;
  }
  
  .color-4 {
    border-top-color: #86efac;
  }
  
  .color-4 h3 {
    color: #16a34a;
  }
  
  .color-5 {
    border-top-color: #bbf7d0;
  }
  
  .color-5 h3 {
    color: #16a34a;
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
    background-color: #16a34a;
    color: white;
  }
  
  .action-btn.interactive {
    background-color: #166534;
    color: white;
  }
  
  .action-btn.development {
    background-color: #f0fdf4;
    color: #16a34a;
    border: 1px dashed #16a34a;
    cursor: default;
  }
  
  .action-btn.download.svg {
    background-color: white;
    border: 1px solid #16a34a;
    color: #16a34a;
  }
  
  .action-btn.download.png {
    background-color: white;
    border: 1px solid #22c55e;
    color: #22c55e;
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
    background-color: #f0fdf4;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  
  .feedback-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #166534;
  }
  
  .feedback-card p {
    color: #4b5563;
    margin-bottom: 1rem;
  }
  
  .contact-link {
    color: #166534;
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
    color: #16a34a;
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
    color: #166534;
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
