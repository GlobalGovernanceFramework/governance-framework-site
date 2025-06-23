<!-- src/routes/frameworks/visuals/+page.svelte -->
<script>
  import { t, locale, setLocale } from '$lib/i18n';
  import { base } from '$app/paths';

  // Subscribe to stores
  $: currentT = $t;
  $: currentLocale = $locale;

  // Helper function for language button styles
  function getLanguageButtonStyle(lang) {
    const isActive = currentLocale === lang;
    return `padding: 0.5rem 1rem; border-radius: 0.375rem; border: 1px solid #e5e7eb; background-color: ${isActive ? '#2B4B8C' : 'white'}; color: ${isActive ? 'white' : '#2B4B8C'}; font-weight: 500; text-decoration: none;`;
  }

  // Translations for this page
  const translations = {
    en: {
      title: "Framework Visualizations Overview",
      subtitle: "Visual resources for Global Governance Frameworks",
      intro: "Access visual resources that help communicate complex governance concepts across our frameworks. From architectural diagrams to analytical visualizations, these resources provide stakeholders with accessible entry points to understand multi-dimensional and interconnected approaches to global challenges.",
      availableResources: "Available Visualization Collections",
      peaceTitle: "Peace & Conflict Resolution Visualizations",
      peaceDesc: "Visual resources for understanding the Peace & Conflict Resolution Framework, including governance architecture, implementation roadmaps, analytical visualizations, and interactive tools for exploring peace actor networks and conflict dynamics.",
      peaceButton: "Access Peace Visualizations",
      climateTitle: "Climate & Energy Governance Visualizations",
      climateDesc: "Diagrams and interactive tools for climate governance, including energy transition pathways, climate justice frameworks, and analytical visualizations of emissions scenarios and mitigation strategies.",
      climateButton: "Coming Soon",
      educationTitle: "Education Framework Visualizations",
      educationDesc: "Visual resources for the Education Framework, including learning progression models, systems diagrams of educational governance, and analytics tools for educational outcomes.",
      educationButton: "Coming Soon",
      environmentalTitle: "Environmental Stewardship Visualizations",
      environmentalDesc: "Visual resources for regenerative environmental governance, including ecosystem rights frameworks, climate action roadmaps, stakeholder engagement networks, and monitoring tools for planetary well-being.",
      environmentalButton: "Access Environmental Visualizations",
      foodTitle: "Food Systems & Agriculture Visualizations",
      foodDesc: "Visual tools for sustainable food systems governance, including food web diagrams, value chain visualizations, and interactive maps of agricultural transformation pathways.",
      foodButton: "Coming Soon",
      ethicsTitle: "Global Ethics & Rights of Beings Visualizations",
      ethicsDesc: "Visual resources for the Global Ethics & Rights of Beings Framework, including dynamic rights spectrum, implementation guides, governance structures, and consciousness assessment tools.",
      ethicsButton: "Access Ethics Visualizations",
      digitalTitle: "Digital Commons Visualizations",
      digitalDesc: "Visual resources for the Digital Commons Framework, including governance architecture, data sovereignty protocols, mesh network structures, and interactive tools for digital rights implementation.",
      digitalButton: "Access Digital Commons Visualizations",
      biodiversityTitle: "Biodiversity Framework Visualizations",
      biodiversityDesc: "Visual resources for planetary healing and regenerative biodiversity governance, including indigenous sovereignty networks, ecosystem rights progression, bio-arts campaigns, and monitoring tools for creating a regenerative biosphere by 2045.",
      biodiversityButton: "Access Biodiversity Visualizations",
      comingSoon: "Coming Soon",
      otherFrameworks: "Other Framework Visualizations",
      otherFrameworksDesc: "Visualization collections for the following frameworks are currently in development and will be made available soon:",
      environmentalTitle: "Environmental Stewardship Framework",
      technologyTitle: "Technology Governance Framework",
      economicTitle: "Economic Integration Framework",
      spiritualTitle: "Religious & Spiritual Dialogue Framework",
      metaTitle: "Integrated Meta-Governance Framework",
      requestTitle: "Request Visualizations or Provide Feedback",
      requestDesc: "Need visualizations for a specific framework or purpose? Have suggestions for improving our visual resources? We welcome your input to make these tools more useful.",
      contactLink: "Contact us",
      languagesTitle: "Available Languages"
    },
    sv: {
      title: "Översikt över ramverksvisualiseringar",
      subtitle: "Visuella resurser för globala styrningsramverk",
      intro: "Få tillgång till visuella resurser som hjälper till att kommunicera komplexa styrkoncept över våra ramverk. Från arkitekturdiagram till analytiska visualiseringar ger dessa resurser intressenter tillgängliga ingångspunkter för att förstå flerdimensionella och sammankopplade metoder för globala utmaningar.",
      availableResources: "Tillgängliga visualiseringssamlingar",
      peaceTitle: "Visualiseringar för freds- och konfliktlösning",
      peaceDesc: "Visuella resurser för att förstå ramverket för freds- och konfliktlösning, inklusive styrningsarkitektur, implementeringskartor, analytiska visualiseringar och interaktiva verktyg för att utforska fredsaktörsnätverk och konfliktdynamik.",
      peaceButton: "Öppna fredsvisualiseringar",
      climateTitle: "Visualiseringar för klimat- och energistyrning",
      climateDesc: "Diagram och interaktiva verktyg för klimatstyrning, inklusive energiomställningsvägar, ramverk för klimaträttvisa och analytiska visualiseringar av utsläppsscenarier och begränsningsstrategier.",
      climateButton: "Kommer snart",
      educationTitle: "Visualiseringar för utbildningsramverket",
      educationDesc: "Visuella resurser för utbildningsramverket, inklusive modeller för inlärningsprogression, systemdiagram för utbildningsstyrning och analysverktyg för utbildningsresultat.",
      educationButton: "Kommer snart",
      environmentalTitle: "Visualiseringar för miljöförvaltning",
      environmentalDesc: "Visuella resurser för regenerativ miljöstyrning, inklusive ramverk för ekosystemrättigheter, handlingsplaner för klimatåtgärder, intressentnätverk och övervakningsverktyg för planetens välbefinnande.",
      environmentalButton: "Öppna miljövisualiseringar",
      ethicsTitle: "Visualiseringar för global etik och varelsers rättigheter",
      ethicsDesc: "Visuella resurser för ramverket för global etik och varelsers rättigheter, inklusive dynamiskt rättighetsspektrum, implementeringsguider, styrningsstrukturer och verktyg för medvetenhetsbedömning.",
      ethicsButton: "Öppna etikvisualiseringar",
      digitalTitle: "Visualiseringar för digitala allmänningar",
      digitalDesc: "Visuella resurser för ramverket för digitala allmänningar, inklusive styrningsarkitektur, datasuveränitetsprotokoll, nätverksstrukturer och interaktiva verktyg för implementering av digitala rättigheter.",
      digitalButton: "Öppna visualiseringar för digitala allmänningar",
      biodiversityTitle: "Biodiversitetsramverk Visualiseringar",
      biodiversityDesc: "Visuella resurser för planetär läkning och regenerativ biodiversitetsstyrning, inklusive ursprungssuveränitetsnätverk, progression av ekosystemrättigheter, bio-konstkampanjer och övervakningsverktyg för att skapa en regenerativ biosfär till 2045.",
      biodiversityButton: "Öppna Biodiversitetsvisualiseringar",
      foodTitle: "Visualiseringar för matsystem och jordbruk",
      foodDesc: "Visuella verktyg för hållbar styrning av matsystem, inklusive matwebsdiagram, visualiseringar av värdekedjor och interaktiva kartor över jordbruksomvandlingsvägar.",
      foodButton: "Kommer snart",
      comingSoon: "Kommer snart",
      otherFrameworks: "Andra ramverksvisualiseringar",
      otherFrameworksDesc: "Visualiseringssamlingar för följande ramverk är för närvarande under utveckling och kommer att göras tillgängliga inom kort:",
      environmentalTitle: "Miljöförvaltningsramverk",
      technologyTitle: "Styrningsramverk för teknik",
      economicTitle: "Ramverk för ekonomisk integration",
      spiritualTitle: "Ramverk för religiös och andlig dialog",
      metaTitle: "Integrerat meta-styrningsramverk",
      requestTitle: "Begär visualiseringar eller ge feedback",
      requestDesc: "Behöver du visualiseringar för ett specifikt ramverk eller syfte? Har du förslag på att förbättra våra visuella resurser? Vi välkomnar dina synpunkter för att göra dessa verktyg mer användbara.",
      contactLink: "Kontakta oss",
      languagesTitle: "Tillgängliga språk"
    }
  };

  // Get current translations based on active locale
  $: texts = translations[currentLocale] || translations.en;
</script>

<svelte:head>
  <title>{texts.title} - Global Governance Framework</title>
  <meta name="description" content={texts.subtitle} />
</svelte:head>

<!-- Hero Section -->
<section style="padding: 3rem 0; background: linear-gradient(to bottom right, #2B4B8C, #4A5CAA); color: white;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div style="max-width: 42rem; margin: 0 auto;">
      <h1 style="font-size: 2.5rem; line-height: 1.2; font-weight: 700; margin-bottom: 1rem;">
        {texts.title}
      </h1>
      <p style="font-size: 1.25rem; color: #ffffff;">
        {texts.subtitle}
      </p>
    </div>
  </div>
</section>

<!-- Main Content Section -->
<section style="padding: 3rem 0; background-color: white;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div style="max-width: 42rem; margin: 0 auto;">
      <p style="margin-bottom: 2rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
        {texts.intro}
      </p>

      <!-- Available Resources Section -->
      <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1.5rem; color: #2B4B8C;">{texts.availableResources}</h2>

      <!-- Climate Framework Card -->
      <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #2C8A78; margin-bottom: 2rem;">
        <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center;">
          <div style="font-size: 2.5rem; color: #2C8A78;">⚡</div>
          <div style="flex: 1; min-width: 200px;">
            <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #2C8A78;">{texts.climateTitle}</h2>
            <p style="color: #4b5563; margin-bottom: 1rem;">
              {texts.climateDesc}
            </p>
            <button disabled style="display: inline-flex; align-items: center; background-color: #9ca3af; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); border: none; cursor: not-allowed;">
              {texts.climateButton}
            </button>
          </div>
        </div>
      </div>

      <!-- Peace Framework Card -->
      <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #6B5CA5; margin-bottom: 2rem;">
        <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center;">
          <div style="font-size: 2.5rem; color: #6B5CA5;">🕊️</div>
          <div style="flex: 1; min-width: 200px;">
            <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #6B5CA5;">{texts.peaceTitle}</h2>
            <p style="color: #4b5563; margin-bottom: 1rem;">
              {texts.peaceDesc}
            </p>
            <a href="{base}/frameworks/visuals/peace-and-conflict-resolution" style="display: inline-flex; align-items: center; background-color: #6B5CA5; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.peaceButton}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Food Systems Framework Card -->
      <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #2e7d32; margin-bottom: 2rem;">
        <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center;">
          <div style="font-size: 2.5rem; color: #2e7d32;">🌱</div>
          <div style="flex: 1; min-width: 200px;">
            <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #2e7d32;">{texts.foodTitle}</h2>
            <p style="color: #4b5563; margin-bottom: 1rem;">
              {texts.foodDesc}
            </p>
            <button disabled style="display: inline-flex; align-items: center; background-color: #9ca3af; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); border: none; cursor: not-allowed;">
              {texts.foodButton}
            </button>
          </div>
        </div>
      </div>
      
      <!-- Education Framework Card -->
      <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #2D5F2D; margin-bottom: 2rem;">
        <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center;">
          <div style="font-size: 2.5rem; color: #2D5F2D;">🎓</div>
          <div style="flex: 1; min-width: 200px;">
            <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #2D5F2D;">{texts.educationTitle}</h2>
            <p style="color: #4b5563; margin-bottom: 1rem;">
              {texts.educationDesc}
            </p>
            <button disabled style="display: inline-flex; align-items: center; background-color: #9ca3af; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); border: none; cursor: not-allowed;">
              {texts.educationButton}
            </button>
          </div>
        </div>
      </div>

      <!-- Environmental Stewardship Framework Card -->
      <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #6DAA3F; margin-bottom: 2rem;">
        <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center;">
          <div style="font-size: 2.5rem; color: #6DAA3F;">🌿</div>
          <div style="flex: 1; min-width: 200px;">
            <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #6DAA3F;">{texts.environmentalTitle}</h2>
            <p style="color: #4b5563; margin-bottom: 1rem;">
              {texts.environmentalDesc}
            </p>
            <a href="{base}/frameworks/visuals/environmental-stewardship" style="display: inline-flex; align-items: center; background-color: #6DAA3F; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.environmentalButton}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Digital Commons Framework Card -->
      <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #6d28d9; margin-bottom: 2rem;">
        <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center;">
          <div style="font-size: 2.5rem; color: #6d28d9;">💻</div>
          <div style="flex: 1; min-width: 200px;">
            <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #6d28d9;">{texts.digitalTitle}</h2>
            <p style="color: #4b5563; margin-bottom: 1rem;">
              {texts.digitalDesc}
            </p>
            <a href="{base}/frameworks/visuals/digital-commons" style="display: inline-flex; align-items: center; background-color: #6d28d9; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.digitalButton}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Biodiversity Framework Card -->
      <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #2d5016; margin-bottom: 2rem;">
        <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center;">
          <div style="font-size: 2.5rem; color: #2d5016;">🦅</div>
          <div style="flex: 1; min-width: 200px;">
            <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #2d5016;">{texts.biodiversityTitle}</h2>
            <p style="color: #4b5563; margin-bottom: 1rem;">
              {texts.biodiversityDesc}
            </p>
            <a href="{base}/frameworks/visuals/biodiversity-governance" style="display: inline-flex; align-items: center; background-color: #2d5016; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.biodiversityButton}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Global Ethics & Rights of Beings Framework Card -->
      <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #16a34a; margin-bottom: 2rem;">
        <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center;">
          <div style="font-size: 2.5rem; color: #16a34a;">🦋</div>
          <div style="flex: 1; min-width: 200px;">
            <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #16a34a;">{texts.ethicsTitle}</h2>
            <p style="color: #4b5563; margin-bottom: 1rem;">
              {texts.ethicsDesc}
            </p>
            <a href="{base}/frameworks/visuals/global-ethics-and-rights-of-beings" style="display: inline-flex; align-items: center; background-color: #16a34a; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s;">
              {texts.ethicsButton}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
     
      <!-- Coming Soon Section -->
      <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1.5rem; color: #2B4B8C;">{texts.comingSoon}</h2>
      
      <!-- Other Frameworks Section -->
      <div style="background-color: #f0f4ff; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 2rem;">
        <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #2B4B8C;">{texts.otherFrameworks}</h3>
        <p style="color: #4b5563; margin-bottom: 1.5rem;">
          {texts.otherFrameworksDesc}
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
          
          <!-- Technology Framework -->
          <div style="background-color: white; padding: 1rem; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border-left: 3px solid #4B8AC2;">
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
              <span style="font-size: 1.5rem; color: #4B8AC2;">🤖</span>
              <h4 style="font-size: 1.125rem; font-weight: 600; color: #4B8AC2; margin: 0;">{texts.technologyTitle}</h4>
            </div>
          </div>
          
          <!-- Economic Framework -->
          <div style="background-color: white; padding: 1rem; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border-left: 3px solid #B8860B;">
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
              <span style="font-size: 1.5rem; color: #B8860B;">💱</span>
              <h4 style="font-size: 1.125rem; font-weight: 600; color: #B8860B; margin: 0;">{texts.economicTitle}</h4>
            </div>
          </div>
          
          <!-- Spiritual Framework -->
          <div style="background-color: white; padding: 1rem; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border-left: 3px solid #9B6A8F;">
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
              <span style="font-size: 1.5rem; color: #9B6A8F;">🕊️</span>
              <h4 style="font-size: 1.125rem; font-weight: 600; color: #9B6A8F; margin: 0;">{texts.spiritualTitle}</h4>
            </div>
          </div>
          
          <!-- Meta-Governance Framework -->
          <div style="background-color: white; padding: 1rem; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border-left: 3px solid #5E4B8B;">
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
              <span style="font-size: 1.5rem; color: #5E4B8B;">🔄</span>
              <h4 style="font-size: 1.125rem; font-weight: 600; color: #5E4B8B; margin: 0;">{texts.metaTitle}</h4>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Request & Feedback Section -->
      <div style="background-color: #e9f2e9; padding: 1.5rem; border-radius: 0.5rem; margin-top: 2rem; margin-bottom: 2rem;">
        <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem; color: #2D5F2D;">{texts.requestTitle}</h3>
        <p style="color: #4b5563; margin-bottom: 1rem;">
          {texts.requestDesc} <a href="{base}/contact" style="color: #2B4B8C; text-decoration: underline; font-weight: 500;">{texts.contactLink}</a>
        </p>
      </div>
      
      <!-- Back to Frameworks link -->
      <div style="margin-bottom: 2rem;">
        <a href="{base}/frameworks" style="display: inline-flex; align-items: center; color: #2B4B8C; font-weight: 500; text-decoration: none;">
          <span style="margin-right: 0.5rem;">←</span>
          {currentLocale === 'sv' ? 'Tillbaka till ramverk' : 'Back to Frameworks'}
        </a>
      </div>
      
      <!-- Language switcher section -->
      <div style="border-top: 1px solid #e5e7eb; padding-top: 2rem; margin-top: 2rem;">
        <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: #2B4B8C;">{texts.languagesTitle}</h3>
        <div style="display: flex; gap: 1rem;">
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
