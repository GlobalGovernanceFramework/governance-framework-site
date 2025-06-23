<!-- src/routes/frameworks/tools/peace-and-conflict-resolution/systems-thinking/+page.svelte -->
<script>
  import { t, locale, setLocale } from '$lib/i18n';
  import { base } from '$app/paths';
  import MetaTags from '$lib/components/MetaTags.svelte';

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
      title: "Systems Thinking Toolkit for Peace & Conflict Resolution",
      subtitle: "Advanced frameworks and practical tools for applying systems thinking to complex peace challenges",
      intro: "This toolkit provides practitioners with methods to understand and transform complex conflict systems using systems thinking approaches. By viewing conflicts as interconnected networks of relationships rather than isolated events, practitioners can design more effective, sustainable interventions that address root causes rather than symptoms.",
      toolsTitle: "Core Tools & Templates",
      toolsDesc: "Download practical tools to analyze conflicts through a systems lens and design interventions based on systems principles.",
      guidesTitle: "Implementation Guides",
      guidesDesc: "Step-by-step guidance for applying systems thinking to different peacebuilding contexts and challenges.",
      interactiveTitle: "Interactive Systems Models",
      interactiveDesc: "Explore dynamic visualizations that demonstrate key systems concepts in peace and conflict contexts.",
      resourcesTitle: "Additional Resources",
      resourcesDesc: "Further reading, case studies, and training materials to deepen your understanding of systems approaches to peacebuilding.",
      downloadPDF: "Download PDF",
      downloadMarkdown: "Download Markdown",
      viewInteractive: "View Interactive Model",
      requestTitle: "Request Resources or Provide Feedback",
      requestDesc: "Need specialized systems thinking tools for a specific context? Have suggestions for improving these resources? We welcome your input.",
      contactLink: "Contact us",
      languagesTitle: "Available Languages",
      
      // Systems concepts
      conceptsTitle: "Key Systems Concepts for Peacebuilding",
      
      feedback: "Feedback Loops",
      feedbackDesc: "Patterns where a system's outputs return as inputs, creating either reinforcing (escalating) or balancing (stabilizing) dynamics in conflict.",
      
      emergence: "Emergence",
      emergenceDesc: "How complex conflict patterns arise from simple interactions between parts of a system, often with surprising and unpredictable results.",
      
      boundaries: "System Boundaries",
      boundariesDesc: "Defining what's inside and outside your analysis, recognizing that different stakeholders perceive system boundaries differently.",
      
      leverage: "Leverage Points",
      leverageDesc: "Places within complex conflict systems where small interventions can produce large, lasting changes in system behavior.",
      
      resilience: "Resilience",
      resilienceDesc: "A system's capacity to absorb shocks while maintaining its basic functions and structure, crucial for sustainable peace.",
      
      nonlinearity: "Nonlinearity",
      nonlinearityDesc: "How causes and effects in conflicts aren't proportional, with small actions sometimes producing major consequences and vice versa.",
      
      // Tool categories
      mappingTitle: "Systems Mapping Tools",
      analysisTitle: "Systems Analysis Tools",
      designTitle: "Intervention Design Tools",
      monitoringTitle: "Monitoring & Evaluation Tools",
      
      // Specific tools
      causalTitle: "Causal Loop Diagramming Template",
      causalDesc: "A structured approach to mapping feedback loops, helping you visualize how different variables in a conflict interact in reinforcing or balancing cycles.",
      
      stakeholderTitle: "Systemic Stakeholder Mapping",
      stakeholderDesc: "A template for mapping key actors in a conflict along with their relationships, influences, and positions within the broader system.",
      
      stockFlowTitle: "Stock and Flow Analysis Framework",
      stockFlowDesc: "A framework for identifying and analyzing the accumulation and depletion of key resources, grievances, and capacities in conflict settings.",
      
      boundaryTitle: "System Boundary Definition Guide",
      boundaryDesc: "A structured process for determining what to include and exclude in your system analysis, aligned with your intervention goals.",
      
      leverageTitle: "Leverage Point Identification Matrix",
      leverageDesc: "A tool for systematically identifying and prioritizing high-impact intervention points within complex conflict systems.",
      
      iceberg: "Conflict Iceberg Model Template",
      icebergDesc: "A visualization tool that helps reveal the underlying structures, mental models, and patterns beneath visible conflict events.",
      
      archetype: "Conflict System Archetype Guide",
      archetypeDesc: "A reference guide to common patterns of conflict dynamics and their typical intervention approaches.",
      
      scenarioTitle: "Systems-Based Scenario Planning",
      scenarioDesc: "A structured approach to developing and analyzing possible futures based on different intervention strategies and system dynamics.",
      
      outcomesTitle: "Systemic Outcomes Harvesting",
      outcomesDesc: "A monitoring and evaluation approach that captures emergent, unexpected, and nonlinear outcomes of peacebuilding interventions.",
      
      // Implementation guides
      communityTitle: "Community Systems Mapping Guide",
      communityDesc: "A participatory approach to engaging local communities in mapping their own conflict systems and identifying intervention priorities.",
      
      organizationalTitle: "Organizational Systems Analysis",
      organizationalDesc: "A framework for analyzing how organizational structures and processes contribute to or mitigate conflict dynamics.",
      
      policyTitle: "Policy Systems Assessment",
      policyDesc: "A structured approach to evaluating how policy frameworks impact complex conflict systems at local, national, and regional levels."
    },
    sv: {
      title: "Verktygslåda för systemtänkande inom freds- och konfliktlösning",
      subtitle: "Avancerade ramverk och praktiska verktyg för att tillämpa systemtänkande på komplexa fredsutmaningar",
      intro: "Denna verktygslåda ger utövare metoder för att förstå och omvandla komplexa konfliktsystem med hjälp av systemtänkande. Genom att se konflikter som sammankopplade nätverk av relationer snarare än isolerade händelser kan utövare utforma mer effektiva, hållbara insatser som adresserar grundorsaker snarare än symptom.",
      toolsTitle: "Kärnverktyg och mallar",
      toolsDesc: "Ladda ner praktiska verktyg för att analysera konflikter genom ett systemperspektiv och designa insatser baserade på systemprinciper.",
      guidesTitle: "Implementeringsguider",
      guidesDesc: "Steg-för-steg-vägledning för att tillämpa systemtänkande på olika fredsbyggande sammanhang och utmaningar.",
      interactiveTitle: "Interaktiva systemmodeller",
      interactiveDesc: "Utforska dynamiska visualiseringar som demonstrerar viktiga systemkoncept i freds- och konfliktsammanhang.",
      resourcesTitle: "Ytterligare resurser",
      resourcesDesc: "Vidare läsning, fallstudier och utbildningsmaterial för att fördjupa din förståelse av systemapproacher till fredsbyggande.",
      downloadPDF: "Ladda ner PDF",
      downloadMarkdown: "Ladda ner Markdown",
      viewInteractive: "Visa interaktiv modell",
      requestTitle: "Begär resurser eller ge feedback",
      requestDesc: "Behöver du specialiserade verktyg för systemtänkande för ett specifikt sammanhang? Har du förslag på förbättringar av dessa resurser? Vi välkomnar dina synpunkter.",
      contactLink: "Kontakta oss",
      languagesTitle: "Tillgängliga språk",
      
      // Systems concepts
      conceptsTitle: "Viktiga systemkoncept för fredsbyggande",
      
      feedback: "Återkopplingsslingor",
      feedbackDesc: "Mönster där ett systems utdata återvänder som indata, vilket skapar antingen förstärkande (eskalerande) eller balanserande (stabiliserande) dynamik i konflikter.",
      
      emergence: "Emergens",
      emergenceDesc: "Hur komplexa konfliktmönster uppstår från enkla interaktioner mellan delar av ett system, ofta med överraskande och oförutsägbara resultat.",
      
      boundaries: "Systemgränser",
      boundariesDesc: "Att definiera vad som är inom och utanför din analys, med erkännande av att olika intressenter uppfattar systemgränser olika.",
      
      leverage: "Hävstångspunkter",
      leverageDesc: "Platser inom komplexa konfliktsystem där små insatser kan producera stora, varaktiga förändringar i systembeteendet.",
      
      resilience: "Resiliens",
      resilienceDesc: "Ett systems kapacitet att absorbera chocker samtidigt som det upprätthåller sina grundläggande funktioner och struktur, avgörande för hållbar fred.",
      
      nonlinearity: "Icke-linjäritet",
      nonlinearityDesc: "Hur orsaker och effekter i konflikter inte är proportionella, med små handlingar som ibland producerar stora konsekvenser och vice versa.",
      
      // Tool categories
      mappingTitle: "Verktyg för systemkartläggning",
      analysisTitle: "Verktyg för systemanalys",
      designTitle: "Verktyg för interventionsdesign",
      monitoringTitle: "Verktyg för övervakning och utvärdering",
      
      // Specific tools
      causalTitle: "Mall för kausala slingdiagram",
      causalDesc: "Ett strukturerat tillvägagångssätt för att kartlägga återkopplingsslingor, hjälper dig visualisera hur olika variabler i en konflikt interagerar i förstärkande eller balanserande cykler.",
      
      stakeholderTitle: "Systemisk intressentkartläggning",
      stakeholderDesc: "En mall för att kartlägga nyckelaktörer i en konflikt tillsammans med deras relationer, inflytande och positioner inom det bredare systemet.",
      
      stockFlowTitle: "Ramverk för lager- och flödesanalys",
      stockFlowDesc: "Ett ramverk för att identifiera och analysera ackumulering och uttömning av viktiga resurser, klagomål och kapaciteter i konfliktsituationer.",
      
      boundaryTitle: "Guide för definition av systemgränser",
      boundaryDesc: "En strukturerad process för att bestämma vad som ska inkluderas och exkluderas i din systemanalys, anpassad till dina interventionsmål.",
      
      leverageTitle: "Matrix för identifiering av hävstångspunkter",
      leverageDesc: "Ett verktyg för att systematiskt identifiera och prioritera insatspunkter med hög inverkan inom komplexa konfliktsystem.",
      
      iceberg: "Mall för konfliktisbergsmodell",
      icebergDesc: "Ett visualiseringsverktyg som hjälper till att avslöja de underliggande strukturerna, mentala modellerna och mönstren under synliga konflikthändelser.",
      
      archetype: "Guide för konfliktsystemarketyper",
      archetypeDesc: "En referensguide till vanliga mönster av konfliktdynamik och deras typiska interventionsmetoder.",
      
      scenarioTitle: "Systembaserad scenarioplanering",
      scenarioDesc: "Ett strukturerat tillvägagångssätt för att utveckla och analysera möjliga framtider baserade på olika interventionsstrategier och systemdynamik.",
      
      outcomesTitle: "Systemisk resultatinsamling",
      outcomesDesc: "En övervaknings- och utvärderingsmetod som fångar framväxande, oväntade och icke-linjära resultat av fredsbyggande insatser.",
      
      // Implementation guides
      communityTitle: "Guide för samhällssystemkartläggning",
      communityDesc: "Ett deltagandebaserat tillvägagångssätt för att engagera lokala samhällen i att kartlägga sina egna konfliktsystem och identifiera interventionsprioriteringar.",
      
      organizationalTitle: "Organisatorisk systemanalys",
      organizationalDesc: "Ett ramverk för att analysera hur organisationsstrukturer och processer bidrar till eller mildrar konfliktdynamik.",
      
      policyTitle: "Bedömning av policysystem",
      policyDesc: "Ett strukturerat tillvägagångssätt för att utvärdera hur politiska ramverk påverkar komplexa konfliktsystem på lokal, nationell och regional nivå."
    }
  };

  // Get current translations based on active locale
  $: texts = translations[currentLocale] || translations.en;
</script>

<MetaTags 
  title="Systems Thinking Toolkit | Peace & Conflict Resolution Framework"
  description="Advanced frameworks and practical tools for applying systems thinking to complex peace challenges, including feedback loops, leverage points, and resilience factors."
  keywords="systems thinking, peacebuilding, conflict resolution, feedback loops, leverage points, resilience, nonlinearity, systems mapping, causal loop diagrams"
/>

<div class="page-container">
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
      <a href="{base}/frameworks/tools/peace-and-conflict-resolution" class="back-link">
        <span class="back-icon">←</span>
        {currentLocale === 'sv' ? 'Tillbaka till fredsramverkets implementeringsverktyg' : 'Back to Peace Framework Implementation Tools'}
      </a>
    </div>
  </div>

  <!-- Main Content -->
  <section class="main-content">
    <div class="container">
      <div class="content-wrapper">
        <p class="intro-text">{texts.intro}</p>
        
        <!-- Key Systems Concepts Section -->
        <h2 class="section-title">{texts.conceptsTitle}</h2>
        
        <div class="concepts-grid">
          <div class="concept-card">
            <div class="concept-icon">↻</div>
            <h3>{texts.feedback}</h3>
            <p>{texts.feedbackDesc}</p>
          </div>
          
          <div class="concept-card">
            <div class="concept-icon">↑</div>
            <h3>{texts.emergence}</h3>
            <p>{texts.emergenceDesc}</p>
          </div>
          
          <div class="concept-card">
            <div class="concept-icon">◯</div>
            <h3>{texts.boundaries}</h3>
            <p>{texts.boundariesDesc}</p>
          </div>
          
          <div class="concept-card">
            <div class="concept-icon">⟁</div>
            <h3>{texts.leverage}</h3>
            <p>{texts.leverageDesc}</p>
          </div>
          
          <div class="concept-card">
            <div class="concept-icon">⇔</div>
            <h3>{texts.resilience}</h3>
            <p>{texts.resilienceDesc}</p>
          </div>
          
          <div class="concept-card">
            <div class="concept-icon">∿</div>
            <h3>{texts.nonlinearity}</h3>
            <p>{texts.nonlinearityDesc}</p>
          </div>
        </div>
        
        <!-- Systems Mapping Tools Section -->
        <h2 class="section-title">{texts.mappingTitle}</h2>
        
        <div class="tools-grid">
          <div class="tool-card">
            <h3>{texts.causalTitle}</h3>
            <p>{texts.causalDesc}</p>
            <div class="tool-actions">
              <a href={`${base}/frameworks/tools/peace-and-conflict-resolution/causal-loop-template-${currentLocale}.pdf`} download class="download-btn pdf">
                {texts.downloadPDF}
                <span class="icon">↓</span>
              </a>
              <a href={`${base}/frameworks/tools/peace-and-conflict-resolution/causal-loop-template-${currentLocale}.md`} download class="download-btn md">
                {texts.downloadMarkdown}
                <span class="icon">↓</span>
              </a>
            </div>
          </div>
          
          <div class="tool-card">
            <h3>{texts.stakeholderTitle}</h3>
            <p>{texts.stakeholderDesc}</p>
            <div class="tool-actions">
              <a href={`${base}/frameworks/tools/peace-and-conflict-resolution/systemic-stakeholder-mapping-${currentLocale}.pdf`} download class="download-btn pdf">
                {texts.downloadPDF}
                <span class="icon">↓</span>
              </a>
              <a href={`${base}/frameworks/tools/peace-and-conflict-resolution/systemic-stakeholder-mapping-${currentLocale}.md`} download class="download-btn md">
                {texts.downloadMarkdown}
                <span class="icon">↓</span>
              </a>
            </div>
          </div>
          
          <div class="tool-card">
            <h3>{texts.boundaryTitle}</h3>
            <p>{texts.boundaryDesc}</p>
            <div class="tool-actions">
              <a href={`${base}/frameworks/tools/peace-and-conflict-resolution/system-boundary-guide-${currentLocale}.pdf`} download class="download-btn pdf">
                {texts.downloadPDF}
                <span class="icon">↓</span>
              </a>
              <a href={`${base}/frameworks/tools/peace-and-conflict-resolution/system-boundary-guide-${currentLocale}.md`} download class="download-btn md">
                {texts.downloadMarkdown}
                <span class="icon">↓</span>
              </a>
            </div>
          </div>
        </div>
        
        <!-- Systems Analysis Tools Section -->
        <h2 class="section-title">{texts.analysisTitle}</h2>
        
        <div class="tools-grid">
          <div class="tool-card">
            <h3>{texts.stockFlowTitle}</h3>
            <p>{texts.stockFlowDesc}</p>
            <div class="tool-actions">
              <a href={`${base}/frameworks/tools/peace-and-conflict-resolution/stock-flow-analysis-${currentLocale}.pdf`} download class="download-btn pdf">
                {texts.downloadPDF}
                <span class="icon">↓</span>
              </a>
              <a href={`${base}/frameworks/tools/peace-and-conflict-resolution/stock-flow-analysis-${currentLocale}.md`} download class="download-btn md">
                {texts.downloadMarkdown}
                <span class="icon">↓</span>
              </a>
            </div>
          </div>
          
          <div class="tool-card">
            <h3>{texts.iceberg}</h3>
            <p>{texts.icebergDesc}</p>
            <div class="tool-actions">
              <a href={`${base}/frameworks/tools/peace-and-conflict-resolution/conflict-iceberg-template-${currentLocale}.pdf`} download class="download-btn pdf">
                {texts.downloadPDF}
                <span class="icon">↓</span>
              </a>
              <a href={`${base}/frameworks/tools/peace-and-conflict-resolution/conflict-iceberg-template-${currentLocale}.md`} download class="download-btn md">
                {texts.downloadMarkdown}
                <span class="icon">↓</span>
              </a>
            </div>
          </div>
          
          <div class="tool-card">
            <h3>{texts.archetype}</h3>
            <p>{texts.archetypeDesc}</p>
            <div class="tool-actions">
              <a href={`${base}/frameworks/tools/peace-and-conflict-resolution/conflict-archetype-guide-${currentLocale}.pdf`} download class="download-btn pdf">
                {texts.downloadPDF}
                <span class="icon">↓</span>
              </a>
              <a href={`${base}/frameworks/tools/peace-and-conflict-resolution/conflict-archetype-guide-${currentLocale}.md`} download class="download-btn md">
                {texts.downloadMarkdown}
                <span class="icon">↓</span>
              </a>
            </div>
          </div>
        </div>
        
        <!-- Intervention Design Tools Section -->
        <h2 class="section-title">{texts.designTitle}</h2>
        
        <div class="tools-grid">
          <div class="tool-card">
            <h3>{texts.leverageTitle}</h3>
            <p>{texts.leverageDesc}</p>
            <div class="tool-actions">
              <a href={`${base}/frameworks/tools/peace-and-conflict-resolution/leverage-point-matrix-${currentLocale}.pdf`} download class="download-btn pdf">
                {texts.downloadPDF}
                <span class="icon">↓</span>
              </a>
              <a href={`${base}/frameworks/tools/peace-and-conflict-resolution/leverage-point-matrix-${currentLocale}.md`} download class="download-btn md">
                {texts.downloadMarkdown}
                <span class="icon">↓</span>
              </a>
            </div>
          </div>
          
          <div class="tool-card">
            <h3>{texts.scenarioTitle}</h3>
            <p>{texts.scenarioDesc}</p>
            <div class="tool-actions">
              <a href={`${base}/frameworks/tools/peace-and-conflict-resolution/systems-scenario-planning-${currentLocale}.pdf`} download class="download-btn pdf">
                {texts.downloadPDF}
                <span class="icon">↓</span>
              </a>
              <a href={`${base}/frameworks/tools/peace-and-conflict-resolution/systems-scenario-planning-${currentLocale}.md`} download class="download-btn md">
                {texts.downloadMarkdown}
                <span class="icon">↓</span>
              </a>
            </div>
          </div>
        </div>
        
        <!-- Monitoring Tools Section -->
        <h2 class="section-title">{texts.monitoringTitle}</h2>
        
        <div class="tools-grid">
          <div class="tool-card">
            <h3>{texts.outcomesTitle}</h3>
            <p>{texts.outcomesDesc}</p>
            <div class="tool-actions">
              <a href={`${base}/frameworks/tools/peace-and-conflict-resolution/systemic-outcomes-harvesting-${currentLocale}.pdf`} download class="download-btn pdf">
                {texts.downloadPDF}
                <span class="icon">↓</span>
              </a>
              <a href={`${base}/frameworks/tools/peace-and-conflict-resolution/systemic-outcomes-harvesting-${currentLocale}.md`} download class="download-btn md">
                {texts.downloadMarkdown}
                <span class="icon">↓</span>
              </a>
            </div>
          </div>
        </div>
        
        <!-- Implementation Guides Section -->
        <h2 class="section-title">{texts.guidesTitle}</h2>
        
        <div class="tools-grid">
          <div class="tool-card">
            <h3>{texts.communityTitle}</h3>
            <p>{texts.communityDesc}</p>
            <div class="tool-actions">
              <a href={`${base}/frameworks/tools/peace-and-conflict-resolution/community-systems-mapping-${currentLocale}.pdf`} download class="download-btn pdf">
                {texts.downloadPDF}
                <span class="icon">↓</span>
              </a>
              <a href={`${base}/frameworks/tools/peace-and-conflict-resolution/community-systems-mapping-${currentLocale}.md`} download class="download-btn md">
                {texts.downloadMarkdown}
                <span class="icon">↓</span>
              </a>
            </div>
          </div>
          
          <div class="tool-card">
            <h3>{texts.organizationalTitle}</h3>
            <p>{texts.organizationalDesc}</p>
            <div class="tool-actions">
              <a href={`${base}/frameworks/tools/peace-and-conflict-resolution/organizational-systems-analysis-${currentLocale}.pdf`} download class="download-btn pdf">
                {texts.downloadPDF}
                <span class="icon">↓</span>
              </a>
              <a href={`${base}/frameworks/tools/peace-and-conflict-resolution/organizational-systems-analysis-${currentLocale}.md`} download class="download-btn md">
                {texts.downloadMarkdown}
                <span class="icon">↓</span>
              </a>
            </div>
          </div>
          
          <div class="tool-card">
            <h3>{texts.policyTitle}</h3>
            <p>{texts.policyDesc}</p>
            <div class="tool-actions">
              <a href={`${base}/frameworks/tools/peace-and-conflict-resolution/policy-systems-assessment-${currentLocale}.pdf`} download class="download-btn pdf">
                {texts.downloadPDF}
                <span class="icon">↓</span>
              </a>
              <a href={`${base}/frameworks/tools/peace-and-conflict-resolution/policy-systems-assessment-${currentLocale}.md`} download class="download-btn md">
                {texts.downloadMarkdown}
                <span class="icon">↓</span>
              </a>
            </div>
          </div>
        </div>
        
        <!-- Interactive Systems Models Section -->
        <h2 class="section-title">{texts.interactiveTitle}</h2>
        
        <div class="tools-grid">

<!-- Removed due to technical implementation difficulties    
          <div class="tool-card interactive-card">
            <h3>Feedback Loop Dynamics</h3>
            <p>Interactive visualization of reinforcing and balancing feedback loops in conflict systems, showing how small changes can create cascading effects.</p>
            <div class="tool-actions">
              <a href={`${base}/frameworks/visuals/peace-and-conflict-resolution/technical/systems-dynamics`} target="_blank" class="view-btn">
                {texts.viewInteractive}
                <span class="icon">↗</span>
              </a>
            </div>
          </div> -->
          
          <div class="tool-card interactive-card">
            <h3>Stock & Flow Simulator</h3>
            <p>Interactive model demonstrating how resources, grievances, and capacities accumulate or deplete over time in conflict settings, based on various intervention strategies.</p>
            <div class="tool-actions">
              <a href={`${base}/frameworks/visuals/peace-and-conflict-resolution/technical/stock-flow-simulator`} target="_blank" class="view-btn">
                {texts.viewInteractive}
                <span class="icon">↗</span>
              </a>
            </div>
          </div>
          
          <div class="tool-card interactive-card">
            <h3>Leverage Points Explorer</h3>
            <p>Interactive tool for identifying and testing high-impact intervention points within conflict systems, simulating the ripple effects of different actions.</p>
            <div class="tool-actions">
              <a href={`${base}/frameworks/visuals/peace-and-conflict-resolution/technical/leverage-points`} target="_blank" class="view-btn">
                {texts.viewInteractive}
                <span class="icon">↗</span>
              </a>
            </div>
          </div>
        </div>
        
        <!-- Request & Feedback Section -->
        <div class="feedback-card">
          <h3>{texts.requestTitle}</h3>
          <p>
            {texts.requestDesc} <a href="{base}/contact" class="contact-link">{texts.contactLink}</a>
          </p>
        </div>
        
        <!-- Back to Tools link -->
        <div class="back-link">
          <a href="{base}/frameworks/tools/peace-and-conflict-resolution">
            <span class="back-icon">←</span>
            {currentLocale === 'sv' ? 'Tillbaka till fredsverktyg' : 'Back to Peace Tools'}
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
</div>

<style>
  /* Global Styles */
  .page-container {
    font-family: Arial, sans-serif;
    line-height: 1.6;
  }
  
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
    margin-top: 2.5rem;
    margin-bottom: 1.5rem;
    color: #6B5CA5;
    border-bottom: 2px solid #f0edfa;
    padding-bottom: 0.5rem;
  }
  
  /* Concepts Grid */
  .concepts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2.5rem;
  }
  
  .concept-card {
    background-color: #f9fafb;
    padding: 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-left: 4px solid #6B5CA5;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .concept-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  .concept-icon {
    font-size: 2rem;
    color: #6B5CA5;
    margin-bottom: 0.75rem;
  }
  
  .concept-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #4A3D8F;
    margin-top: 0;
    margin-bottom: 0.75rem;
  }
  
  .concept-card p {
    color: #4b5563;
    margin-bottom: 0;
    font-size: 0.95rem;
  }
  
  /* Tools Grid */
  .tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2.5rem;
  }
  
  .tool-card {
    background-color: #f9fafb;
    padding: 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-top: 4px solid #6B5CA5;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .tool-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  .tool-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #4A3D8F;
    margin-top: 0;
    margin-bottom: 0.75rem;
  }
  
  .tool-card p {
    color: #4b5563;
    margin-bottom: 1.5rem;
    flex-grow: 1;
  }
  
  .interactive-card {
    border-top-color: #2C8A78;
  }
  
  .interactive-card h3 {
    color: #2C8A78;
  }
  
  /* Tool Actions */
  .tool-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: auto;
  }
  
  /* Buttons */
  .download-btn {
    display: inline-flex;
    align-items: center;
    font-weight: 500;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    text-decoration: none;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    transition: all 0.2s;
    font-size: 0.875rem;
  }
  
  .download-btn.pdf {
    background-color: #6B5CA5;
    color: white;
  }
  
  .download-btn.md {
    background-color: white;
    border: 1px solid #6B5CA5;
    color: #6B5CA5;
  }
  
  .view-btn {
    display: inline-flex;
    align-items: center;
    font-weight: 500;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    text-decoration: none;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    background-color: #2C8A78;
    color: white;
    transition: all 0.2s;
    font-size: 0.875rem;
  }
  
  .download-btn:hover, .view-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  }
  
  .icon {
    margin-left: 0.5rem;
  }
  
  /* Feedback Card */
  .feedback-card {
    background-color: #f0edfa;
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin-top: 2.5rem;
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
    margin-bottom: 0;
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
  
  .back-link a:hover {
    text-decoration: underline;
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
  @media (max-width: 768px) {
    .hero h1 {
      font-size: 2rem;
    }
    
    .hero p {
      font-size: 1.125rem;
    }
    
    .section-title {
      font-size: 1.5rem;
    }
    
    .concepts-grid {
      grid-template-columns: 1fr;
    }
    
    .tools-grid {
      grid-template-columns: 1fr;
    }
    
    .tool-actions {
      flex-direction: column;
    }
    
    .download-btn, .view-btn {
      width: 100%;
      justify-content: center;
    }
  }
</style>
