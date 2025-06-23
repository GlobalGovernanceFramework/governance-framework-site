<!-- src/routes/frameworks/visuals/biodiversity-governance/+page.svelte -->
<script>
  import { t, locale, setLocale } from '$lib/i18n';
  import { base } from '$app/paths';

  // Subscribe to stores
  $: currentT = $t;
  $: currentLocale = $locale;

  // Helper function for language button styles using biodiversity colors
  function getLanguageButtonStyle(lang) {
    const isActive = currentLocale === lang;
    return `padding: 0.5rem 1rem; border-radius: 0.375rem; border: 1px solid #e5e7eb; background-color: ${isActive ? '#2d5016' : 'white'}; color: ${isActive ? 'white' : '#2d5016'}; font-weight: 500; text-decoration: none;`;
  }

  // Translations for this page
  const translations = {
    en: {
      title: "Biodiversity Framework Visualizations",
      subtitle: "Visual resources for planetary healing and regenerative biodiversity governance",
      intro: "These visualizations help communicate the Global Governance Biodiversity Implementation Framework's transformative approach to indigenous sovereignty, economic transformation, and cultural mobilization. From governance networks to ecosystem rights progression and bio-arts campaigns, these resources support stakeholders in creating a regenerative biosphere by 2045.",
      
      governanceTitle: "Governance Architecture Visualizations",
      governanceDesc: "Core visualizations illustrating the multi-layered governance system from Indigenous Digital Sovereignty Hubs to the Global Biodiversity Commons Trust, including democratic legitimacy and rights recognition frameworks.",
      
      economicTitle: "Economic Transformation Visualizations",
      economicDesc: "Visual guides for hybrid UBES systems, biodiversity impact bonds, and corporate redemption pathways that rewire economies for biodiversity-positive outcomes.",
      
      culturalTitle: "Cultural Mobilization & Monitoring Tools",
      culturalDesc: "Interactive visualizations for Bio-Arts Residencies, restoration festivals, viral campaigns, and real-time progress tracking across global biodiversity initiatives.",
      
      requestTitle: "Request Visualizations or Provide Feedback",
      requestDesc: "Need specialized visualizations for a specific bioregion or Indigenous community? Have suggestions for cultural sovereignty protection? We welcome your input to make these resources more inclusive and effective.",
      contactLink: "Contact us",
      languagesTitle: "Available Languages",
      viewFullSize: "View Full Size",
      downloadSVG: "Download SVG",
      downloadPNG: "Download PNG",
      accessInteractive: "Access Interactive Version",
      comingSoon: "Coming Soon",
      inDevelopment: "In Development",

      // Governance Architecture Visualizations
      governanceMapTitle: "Biodiversity Governance Network Map",
      governanceMapDesc: "Multi-layered visualization showing Indigenous Digital Sovereignty Hubs, Regional Biodiversity Hubs, and Global Biodiversity Commons Trust connections, illustrating nested sovereignty and democratic accountability pathways.",
      
      rightsLadderTitle: "Rights Escalation Ladder Progression",
      rightsLadderDesc: "Dynamic visualization of ecosystem rights progression from protection status to legal personhood, showing automatic advancement based on health indicators and community advocacy.",
      
      youthPipelineTitle: "Youth Leadership Pipeline Network",
      youthPipelineDesc: "Visual map of mentorship structures, progressive responsibility pathways, and Youth Council participation in biodiversity governance decision-making processes.",
      
      futureCouncilTitle: "Future Beings Council Structure",
      futureCouncilDesc: "Diagram showing AI-assisted intergenerational representation protocols, voting mechanisms, and how future generations gain formal decision-making power in biodiversity governance.",
      
      // Economic Transformation Visualizations
      ubesFlowTitle: "Hybrid UBES Flow Diagram",
      ubesFlowDesc: "Comprehensive visualization of community currency systems, CBD-backed liquidity pools, traditional exchange integration, and biodiversity-positive economic incentives.",
      
      impactBondsTitle: "Biodiversity Impact Bonds Network",
      impactBondsDesc: "Visual representation of pay-for-success conservation financing, debt-for-nature swaps, investor networks, and measurable biodiversity outcomes funding structures.",
      
      corporatePathwaysTitle: "Corporate Redemption Pathways Map",
      corporatePathwaysDesc: "Step-by-step visual guide for extractive industries transitioning to biodiversity-positive practices, including support systems, milestones, and success metrics.",
      
      fundingRoadmapTitle: "$10B Global Biodiversity Fund Roadmap",
      fundingRoadmapDesc: "Timeline visualization of funding sources, allocation strategies, equity-focused distribution, and reliability assessments across the 20-year implementation period.",
      
      // Cultural Mobilization & Monitoring Tools
      bioArtsNetworkTitle: "Global Bio-Arts Residencies Network",
      bioArtsNetworkDesc: "Interactive map showing artist-scientist-indigenous collaborations worldwide, cultural sovereignty protections, and viral engagement campaign coordination.",
      
      restorationCalendarTitle: "Global Restoration Festival Calendar",
      restorationCalendarDesc: "Annual bioregional celebration timeline integrating traditional ceremonies, restoration activities, and cultural mobilization events across different ecosystems and seasons.",
      
      healthDashboardTitle: "Global Biodiversity Health Dashboard",
      healthDashboardDesc: "Real-time monitoring dashboard displaying ecosystem health indicators, restoration progress, rights recognition status, and cultural engagement metrics across pilot regions.",
      
      campaignViralityTitle: "Bio-Debt Campaign Virality Tracker",
      campaignViralityDesc: "Dynamic visualization tracking social media engagement, cultural tipping points, narrative shifts, and global movement momentum for biodiversity awareness campaigns."
    },
    sv: {
      title: "Biodiversitetsramverk Visualiseringar",
      subtitle: "Visuella resurser för planetär läkning och regenerativ biodiversitetsstyrning",
      intro: "Dessa visualiseringar hjälper till att kommunicera det Globala Styrningsramverket för Biodiversitetsimplementerings transformativa tillvägagångssätt för ursprungssuveränitet, ekonomisk transformation och kulturell mobilisering. Från styrningsnätverk till ekosystemrättighetsprogressioner och bio-konstkampanjer stödjer dessa resurser intressenter i att skapa en regenerativ biosfär till 2045.",
      
      governanceTitle: "Visualiseringar av styrningsarkitektur",
      governanceDesc: "Kärnvisualiseringar som illustrerar det flerskiktade styrningssystemet från Ursprungsdigital Suveränitetshubbar till den Globala Biodiversitetsallmänningstrustens, inklusive demokratisk legitimitet och rättighetserkännanderamverk.",
      
      economicTitle: "Visualiseringar av ekonomisk transformation",
      economicDesc: "Visuella guider för hybrid UBES-system, biodiversitetspåverkningsobligationer och företagsförlösningsvägar som omkopplar ekonomier för biodiversitetspositiva resultat.",
      
      culturalTitle: "Kulturell mobilisering & övervakningsverktyg",
      culturalDesc: "Interaktiva visualiseringar för Bio-Konstresidenser, restaureringsfestivaler, virala kampanjer och realtidsframstegsuppföljning över globala biodiversitetsinitiativ.",
      
      requestTitle: "Begär visualiseringar eller ge feedback",
      requestDesc: "Behöver du specialiserade visualiseringar för en specifik bioregion eller ursprungssamhälle? Har du förslag för skydd av kulturell suveränitet? Vi välkomnar dina synpunkter för att göra dessa resurser mer inkluderande och effektiva.",
      contactLink: "Kontakta oss",
      languagesTitle: "Tillgängliga språk",
      viewFullSize: "Visa full storlek",
      downloadSVG: "Ladda ner SVG",
      downloadPNG: "Ladda ner PNG",
      accessInteractive: "Åtkomst till interaktiv version",
      comingSoon: "Kommer snart",
      inDevelopment: "Under utveckling",

      // Swedish translations for all visualization titles and descriptions
      governanceMapTitle: "Karta över biodiversitetsstyrningsnätverk",
      governanceMapDesc: "Flerskiktad visualisering som visar Ursprungsdigital Suveränitetshubbar, Regionala Biodiversitetshubbar och Globala Biodiversitetsallmänningstrustens anslutningar, som illustrerar nästlad suveränitet och demokratiska ansvarsskyldighetsvägar.",
      
      rightsLadderTitle: "Rättighetsupptrappningsstege progression",
      rightsLadderDesc: "Dynamisk visualisering av ekosystemrättighetsprogressionen från skyddsstatus till juridisk personlighet, som visar automatisk avancemang baserat på hälsoindikatorer och samhällsadvokatur.",
      
      youthPipelineTitle: "Nätverk för ungdomsledarskap",
      youthPipelineDesc: "Visuell karta över mentorskapsstrukturer, progressiva ansvarsvägar och Ungdomsrådsdeltagande i beslutsprocesser för biodiversitetsstyrning.",
      
      futureCouncilTitle: "Framtida varelsers rådsstruktur",
      futureCouncilDesc: "Diagram som visar AI-assisterade intergenerationella representationsprotokoll, röstningsmekanismer och hur framtida generationer får formell beslutsmakt i biodiversitetsstyrning.",
      
      downloadButton: "Ladda ner"
    }
  };

  // Get current translations based on active locale
  $: texts = translations[currentLocale] || translations.en;

  // Visualization data organized by category using biodiversity color scheme
  const governanceVisuals = [
    { id: 'biodiversity-governance-network', format: 'svg', interactive: false, color: 'color-primary', planned: true },
    { id: 'rights-escalation-ladder', format: 'svg', interactive: false, color: 'color-secondary', planned: true },
    { id: 'youth-leadership-pipeline', format: 'svg', interactive: false, color: 'color-accent', planned: true },
    { id: 'future-beings-council', format: 'svg', interactive: false, color: 'color-earth', planned: true }
  ];
  
  const economicVisuals = [
    { id: 'hybrid-ubes-flow', format: 'svg', interactive: false, color: 'color-primary', planned: true },
    { id: 'biodiversity-impact-bonds', format: 'svg', interactive: false, color: 'color-secondary', planned: true },
    { id: 'corporate-redemption-pathways', format: 'svg', interactive: false, color: 'color-accent', planned: true },
    { id: 'global-biodiversity-fund', format: 'svg', interactive: false, color: 'color-highlight', planned: true }
  ];
  
  const culturalTools = [
    { id: 'bio-arts-network', format: 'html', interactive: true, color: 'color-primary', noDownloads: true, planned: true },
    { id: 'restoration-calendar', format: 'html', interactive: true, color: 'color-secondary', noDownloads: true, planned: true },
    { id: 'biodiversity-health-dashboard', format: 'html', interactive: true, color: 'color-accent', noDownloads: true, planned: true },
    { id: 'campaign-virality-tracker', format: 'html', interactive: true, color: 'color-earth', noDownloads: true, planned: true }
  ];

  const visualNameToTranslationKey = {
    'biodiversity-governance-network': 'governanceMap',
    'rights-escalation-ladder': 'rightsLadder',
    'youth-leadership-pipeline': 'youthPipeline',
    'future-beings-council': 'futureCouncil',
    'hybrid-ubes-flow': 'ubesFlow',
    'biodiversity-impact-bonds': 'impactBonds',
    'corporate-redemption-pathways': 'corporatePathways',
    'global-biodiversity-fund': 'fundingRoadmap',
    'bio-arts-network': 'bioArtsNetwork',
    'restoration-calendar': 'restorationCalendar',
    'biodiversity-health-dashboard': 'healthDashboard',
    'campaign-virality-tracker': 'campaignVirality'
  };

  function getVisualizationPath(id, format, forInteractive = false) {
    // For now, all are planned, so return placeholder
    // Later when actual visualizations exist, update this function
    return `${base}/images/frameworks/biodiversity-governance/placeholder.png`;
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

      <!-- Governance Architecture Visualizations Section -->
      <h2 class="section-title">{texts.governanceTitle}</h2>
      <p class="section-desc">{texts.governanceDesc}</p>
      
      <div class="visuals-grid">
        {#each governanceVisuals as visual}
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

      <!-- Economic Transformation Visualizations Section -->
      <h2 class="section-title">{texts.economicTitle}</h2>
      <p class="section-desc">{texts.economicDesc}</p>
      
      <div class="visuals-grid">
        {#each economicVisuals as visual}
          <div class="visual-card {visual.color}">
            <div class="visual-preview">
              <!-- Show placeholder for planned visualizations -->
              {#if visual.planned}
                <div class="placeholder">
                  <div class="placeholder-text">{texts.comingSoon}</div>
                </div>
              {:else if visual.format === 'html'}
                <img src={`${base}/images/frameworks/biodiversity-governance/${visual.id}-preview.png`} alt={texts[`${visualNameToTranslationKey[visual.id]}Title`]} />
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

      <!-- Cultural Mobilization & Monitoring Tools Section -->
      <h2 class="section-title">{texts.culturalTitle}</h2>
      <p class="section-desc">{texts.culturalDesc}</p>
      
      <div class="visuals-grid">
        {#each culturalTools as visual}
          <div class="visual-card {visual.color}">
            <div class="visual-preview">
              <!-- Show placeholder for planned visualizations -->
              {#if visual.planned}
                <div class="placeholder">
                  <div class="placeholder-text">{texts.comingSoon}</div>
                </div>
              {:else}
                <img src={`${base}/images/frameworks/biodiversity-governance/${visual.id}-preview.png`} alt={texts[`${visualNameToTranslationKey[visual.id]}Title`]} />
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
        <a href="{base}/frameworks/biodiversity-governance">
          <span class="back-icon">←</span>
          {currentLocale === 'sv' ? 'Tillbaka till biodiversitetsramverket' : 'Back to Biodiversity Framework'}
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
    color: var(--bio-primary);
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
    background-color: rgba(168, 197, 115, 0.1); /* Light biodiversity green background */
  }
  
  /* Placeholder for planned visualizations */
  .placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(168, 197, 115, 0.1) 0%, rgba(107, 142, 61, 0.1) 100%);
    border-radius: 0.5rem;
  }
  
  .placeholder-text {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--bio-primary);
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
  
  /* Biodiversity Color Variations */
  .color-primary {
    border-top-color: var(--bio-primary);
  }
  
  .color-primary h3 {
    color: var(--bio-primary);
  }
  
  .color-secondary {
    border-top-color: var(--bio-secondary);
  }
  
  .color-secondary h3 {
    color: var(--bio-secondary);
  }
  
  .color-accent {
    border-top-color: var(--bio-accent);
  }
  
  .color-accent h3 {
    color: var(--bio-accent);
  }
  
  .color-earth {
    border-top-color: var(--bio-earth);
  }
  
  .color-earth h3 {
    color: var(--bio-earth);
  }
  
  .color-highlight {
    border-top-color: var(--bio-highlight);
  }
  
  .color-highlight h3 {
    color: var(--bio-highlight);
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
    background-color: var(--bio-primary);
    color: white;
  }
  
  .action-btn.interactive {
    background-color: var(--bio-secondary);
    color: white;
  }
  
  .action-btn.development {
    background-color: rgba(168, 197, 115, 0.1);
    color: var(--bio-primary);
    border: 1px dashed var(--bio-primary);
    cursor: default;
  }
  
  .action-btn.download.svg {
    background-color: white;
    border: 1px solid var(--bio-primary);
    color: var(--bio-primary);
  }
  
  .action-btn.download.png {
    background-color: white;
    border: 1px solid var(--bio-secondary);
    color: var(--bio-secondary);
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
  
  /* Back Link */
  .back-link {
    margin-bottom: 2rem;
  }
  
  .back-link a {
    display: inline-flex;
    align-items: center;
    color: var(--bio-secondary);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }
  
  .back-link a:hover {
    color: var(--bio-primary);
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
    color: var(--bio-primary);
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

  /* Additional biodiversity-specific styling */
  .section-title::before {
    content: "🌱";
    margin-right: 0.5rem;
    opacity: 0.7;
  }

  /* Enhanced hover effects for biodiversity theme */
  .visual-card:hover {
    box-shadow: 0 8px 25px rgba(45, 80, 22, 0.15);
  }

  /* Special styling for different visualization categories */
  .visuals-grid:nth-of-type(1) .visual-card {
    /* Governance section - add subtle gradient border */
    border-image: linear-gradient(135deg, var(--bio-primary), var(--bio-secondary)) 1;
  }

  .visuals-grid:nth-of-type(2) .visual-card {
    /* Economic section - add earth tone accents */
    border-image: linear-gradient(135deg, var(--bio-earth), var(--bio-highlight)) 1;
  }

  .visuals-grid:nth-of-type(3) .visual-card {
    /* Cultural section - add nature-inspired accents */
    border-image: linear-gradient(135deg, var(--bio-accent), var(--bio-light)) 1;
  }

  /* Focus states for accessibility */
  .action-btn:focus,
  .language-buttons button:focus {
    outline: 2px solid var(--bio-accent);
    outline-offset: 2px;
  }

  /* Print-friendly styles */
  @media print {
    .hero {
      background: var(--bio-primary) !important;
      -webkit-print-color-adjust: exact;
    }
    
    .visual-card {
      break-inside: avoid;
      margin-bottom: 1rem;
    }
    
    .action-btn {
      display: none;
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .visual-card {
      border: 2px solid;
    }
    
    .action-btn {
      border-width: 2px;
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .visual-card,
    .action-btn {
      transition: none;
    }
    
    .visual-card:hover {
      transform: none;
    }
  }

  /* Dark mode considerations (if implemented) */
  @media (prefers-color-scheme: dark) {
    .visual-card {
      background-color: #1f2937;
      color: #f9fafb;
    }
    
    .placeholder {
      background: linear-gradient(135deg, rgba(45, 80, 22, 0.2) 0%, rgba(74, 124, 41, 0.2) 100%);
    }
    
    .placeholder-text {
      color: var(--bio-light);
    }
  }
</style>
