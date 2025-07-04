<!-- src/routes/frameworks/global-citizenship/+page.svelte -->
<script>
  import { t, locale } from '$lib/i18n';
  import { base } from '$app/paths';
  import FrameworkSidebar from '$lib/components/FrameworkSidebar.svelte';
  import InfoBox from '$lib/components/InfoBox.svelte';

  // For downloading the 4-page summary
  function downloadSummary() {
    const langPath = $locale === 'sv' ? 'sv' : 'en';
    const downloadUrl = `${base}/downloads/${langPath}/Global-Citizenship-4-page-overview.pdf`;
    window.open(downloadUrl, '_blank');
  }
</script>

<div class="documentation-container">
  <FrameworkSidebar />
  
  <div class="content">
    <h1>{$locale === 'sv' ? 'Ramverk för Globalt Medborgarskap' : 'Global Citizenship Framework'}</h1>
    
    <InfoBox 
      title={$locale === 'sv' ? 'Ett ramverk för att förstå och praktisera globalt medborgarskap' : 'A framework for understanding and practicing global citizenship'} 
      color="#2B4B8C"
      background="#f0f4f9"
      borderTop="#DAA520">
      <p>{$locale === 'sv' 
        ? 'Detta ramverk ger en strukturerad väg för individer och samhällen att utvecklas från medvetenhet till aktivt deltagande i vår sammankopplade värld.' 
        : 'This framework provides a structured pathway for individuals and communities to develop from awareness to active participation in our interconnected world.'}</p>
    </InfoBox>

    <!-- Hero Section with Diagram -->
    <section class="hero-section">
      <div class="diagram-container">
        {#if $locale === 'sv'}
          <img src="{base}/images/global-citizenship-diagram-sv.svg" alt="Ramverk för Globalt Medborgarskap Visualisering" class="framework-diagram">
        {:else}
          <img src="{base}/images/global-citizenship-diagram.svg" alt="Global Citizenship Framework Visualization" class="framework-diagram">
        {/if}
      </div>
    </section>

    <!-- What is Global Citizenship -->
    <section class="framework-section">
      <h2>{$locale === 'sv' ? 'Vad är Globalt Medborgarskap?' : 'What is Global Citizenship?'}</h2>
      <p>{$locale === 'sv' 
        ? 'Globalt medborgarskap är inte en juridisk status—det är ett sätt att vara. Det innebär att se sig själv som en del av en mänsklig familj, ansvarig för välbefinnandet för alla människor, arter och ekosystem på jorden—och bortom.' 
        : 'Global citizenship is not a legal status—it\'s a way of being. It means seeing yourself as part of one human family, responsible for the wellbeing of all people, species, and ecosystems on Earth—and beyond.'}</p>
      <p>{$locale === 'sv'
        ? 'Det utvidgar vår identitet bortom gränser, främjar delat ansvar och kopplar lokala handlingar till global påverkan.'
        : 'It expands our identity beyond borders, fosters shared responsibility, and connects local action to global impact.'}</p>
      
      <div class="action-links">
        <a href="{base}/frameworks/global-citizenship/full-framework" class="primary-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          {$locale === 'sv' ? 'Utforska fullständigt ramverk' : 'Explore Full Framework'}
        </a>
        <button class="secondary-link" on:click={downloadSummary}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          {$locale === 'sv' ? 'Ladda ner 4-sidors sammanfattning' : 'Download 4-Page Summary'}
        </button>
      </div>
    </section>

    <!-- The 10 Core Values -->
    <section class="framework-section">
      <h2>{$locale === 'sv' ? 'De 10 grundläggande värderingarna' : 'The 10 Core Values'}</h2>
      <p>{$locale === 'sv'
        ? 'Dessa värderingar återspeglar delade etiska principer över kulturer och traditioner:'
        : 'These values reflect shared ethical principles across cultures and traditions:'}</p>
      
      <div class="values-grid">
        <div class="value-card">
          <div class="value-icon">✨</div>
          <h3>{$locale === 'sv' ? 'Värdesätt Liv i Alla Varelser' : 'Honor the Life in All Beings'}</h3>
          <p>{$locale === 'sv' ? 'Respektera och upplyft allt liv—mänskligt, djur, AI och mer' : 'Respect and uplift all life—human, animal, AI, and more'}</p>
        </div>

        <div class="value-card">
          <div class="value-icon">❤️</div>
          <h3>{$locale === 'sv' ? 'Agera med Medkänsla' : 'Act with Compassion'}</h3>
          <p>{$locale === 'sv' ? 'Lindra lidande genom vänlighet och omsorg' : 'Alleviate suffering through kindness and care'}</p>
        </div>

        <div class="value-card">
          <div class="value-icon">⚖️</div>
          <h3>{$locale === 'sv' ? 'Upprätthåll Rättvisa' : 'Uphold Justice and Fairness'}</h3>
          <p>{$locale === 'sv' ? 'Konfrontera exploatering och främja jämlikhet' : 'Confront exploitation and promote equity'}</p>
        </div>

        <div class="value-card">
          <div class="value-icon">🔍</div>
          <h3>{$locale === 'sv' ? 'Sök Sanning med Ödmjukhet' : 'Seek Truth with Humility'}</h3>
          <p>{$locale === 'sv' ? 'Sök kunskap med öppenhet och ärlighet' : 'Pursue knowledge with openness and honesty'}</p>
        </div>

        <div class="value-card">
          <div class="value-icon">🕊️</div>
          <h3>{$locale === 'sv' ? 'Respektera Frihet' : 'Respect Freedom of Thought'}</h3>
          <p>{$locale === 'sv' ? 'Försvara autentiska uttryck och mänsklig värdighet' : 'Defend authentic expression and human dignity'}</p>
        </div>

        <div class="value-card">
          <div class="value-icon">🌱</div>
          <h3>{$locale === 'sv' ? 'Vårda Jorden' : 'Care for the Earth'}</h3>
          <p>{$locale === 'sv' ? 'Skydda ekosystem och framtida generationer' : 'Protect ecosystems and future generations'}</p>
        </div>

        <div class="value-card">
          <div class="value-icon">🤝</div>
          <h3>{$locale === 'sv' ? 'Bygg Fred' : 'Build Peace through Dialogue'}</h3>
          <p>{$locale === 'sv' ? 'Lös konflikter genom lyssnande och samarbete' : 'Resolve conflict through listening and cooperation'}</p>
        </div>

        <div class="value-card">
          <div class="value-icon">🔷</div>
          <h3>{$locale === 'sv' ? 'Praktisera Integritet' : 'Practice Honesty and Integrity'}</h3>
          <p>{$locale === 'sv' ? 'Låt dina handlingar överensstämma med sanning och värderingar' : 'Let your actions align with truth and values'}</p>
        </div>

        <div class="value-card">
          <div class="value-icon">🙏</div>
          <h3>{$locale === 'sv' ? 'Odla Tacksamhet' : 'Cultivate Gratitude & Reverence'}</h3>
          <p>{$locale === 'sv' ? 'Uppskatta liv, natur och mysterium' : 'Appreciate life, nature, and mystery'}</p>
        </div>

        <div class="value-card">
          <div class="value-icon">🌟</div>
          <h3>{$locale === 'sv' ? 'Väx i Visdom och Kärlek' : 'Grow in Wisdom and Love'}</h3>
          <p>{$locale === 'sv' ? 'Utvecklas mot enhet, medkänsla och högre medvetenhet' : 'Evolve toward unity, compassion, and higher awareness'}</p>
        </div>
      </div>
    </section>

    <!-- The 5 Levels of Practice -->
    <section class="framework-section">
      <h2>{$locale === 'sv' ? '5 Praktiska Nivåer' : '5 Levels of Practice'}</h2>
      <p>{$locale === 'sv'
        ? 'Globalt medborgarskap utvecklas genom dessa progressiva nivåer:'
        : 'Global citizenship develops through these progressive levels:'}</p>
      
      <div class="levels-container">
        <div class="level-card level-1">
          <h3>{$locale === 'sv' ? '1. Medvetande' : '1. Awareness'}</h3>
          <p class="level-mindset">{$locale === 'sv' ? '"Jag lär mig om vår värld"' : '"I\'m learning about our world"'}</p>
          <p>{$locale === 'sv' ? 'Lär dig om globala system och problem' : 'Learn about global systems and issues'}</p>
        </div>
        
        <div class="level-card level-2">
          <h3>{$locale === 'sv' ? '2. Förståelse' : '2. Understanding'}</h3>
          <p class="level-mindset">{$locale === 'sv' ? '"Jag tänker systemiskt"' : '"I\'m thinking systemically"'}</p>
          <p>{$locale === 'sv' ? 'Analysera grundorsaker och sammankopplingar' : 'Analyze root causes and interconnections'}</p>
        </div>
        
        <div class="level-card level-3">
          <h3>{$locale === 'sv' ? '3. Empati & Identitet' : '3. Empathy & Identity'}</h3>
          <p class="level-mindset">{$locale === 'sv' ? '"Vi sitter alla i samma båt"' : '"We\'re all in this together"'}</p>
          <p>{$locale === 'sv' ? 'Känn dig ansluten till globala gemenskaper' : 'Feel connected to global communities'}</p>
        </div>
        
        <div class="level-card level-4">
          <h3>{$locale === 'sv' ? '4. Deltagande' : '4. Participation'}</h3>
          <p class="level-mindset">{$locale === 'sv' ? '"Jag gör val som hjälper världen"' : '"I make choices that help the world"'}</p>
          <p>{$locale === 'sv' ? 'Vidta åtgärder för att ta itu med globala utmaningar' : 'Take action to address global challenges'}</p>
        </div>
        
        <div class="level-card level-5">
          <h3>{$locale === 'sv' ? '5. Ledarskap' : '5. Leadership'}</h3>
          <p class="level-mindset">{$locale === 'sv' ? '"Jag hjälper mänskligheten att blomstra"' : '"I\'m helping humanity flourish"'}</p>
          <p>{$locale === 'sv' ? 'Bygg system och inspirera andra' : 'Build systems and inspire others'}</p>
        </div>
      </div>
    </section>

    <!-- Benefits -->
    <section class="framework-section">
      <h2>{$locale === 'sv' ? 'Märkbara fördelar' : 'Tangible Benefits'}</h2>
      
      <div class="benefits-container">
        <div class="benefit-column">
          <h3>{$locale === 'sv' ? 'För individer' : 'For Individuals'}</h3>
          <ul>
            <li>{$locale === 'sv' ? 'Känsla av syfte och global identitet' : 'Sense of purpose and global identity'}</li>
            <li>{$locale === 'sv' ? 'Kritiskt tänkande och anpassningsförmåga' : 'Critical thinking and adaptability'}</li>
            <li>{$locale === 'sv' ? 'Tvärkulturell kompetens' : 'Cross-cultural competence'}</li>
          </ul>
        </div>
        
        <div class="benefit-column">
          <h3>{$locale === 'sv' ? 'För samhällen' : 'For Communities'}</h3>
          <ul>
            <li>{$locale === 'sv' ? 'Kulturell rikedom och innovation' : 'Cultural richness and innovation'}</li>
            <li>{$locale === 'sv' ? 'Konfliktförebyggande och fredsbyggande' : 'Conflict prevention and peacebuilding'}</li>
            <li>{$locale === 'sv' ? 'Delade lösningar och motståndskraft' : 'Shared solutions and resilience'}</li>
          </ul>
        </div>
        
        <div class="benefit-column">
          <h3>{$locale === 'sv' ? 'För planeten' : 'For the Planet'}</h3>
          <ul>
            <li>{$locale === 'sv' ? 'Klimatsamarbete' : 'Climate cooperation'}</li>
            <li>{$locale === 'sv' ? 'Inkluderande utveckling' : 'Inclusive development'}</li>
            <li>{$locale === 'sv' ? 'Systemförändring för långsiktigt välbefinnande' : 'Systems change for long-term wellbeing'}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Implementation Tools -->
    <section class="framework-section">
      <h2>{$locale === 'sv' ? 'Implementeringsverktyg' : 'Implementation Tools'}</h2>
      <p>{$locale === 'sv'
        ? 'Det fullständiga ramverket innehåller praktiska verktyg för att implementera globalt medborgarskap i olika sammanhang:'
        : 'The full framework includes practical tools for implementing global citizenship in various contexts:'}</p>
      
      <div class="tools-grid">
        <div class="tool-card">
          <div class="tool-icon">📋</div>
          <h3>{$locale === 'sv' ? 'Självutvärdering' : 'Self-Assessment'}</h3>
          <p>{$locale === 'sv' ? 'Ett verktyg med 20 punkter för att mäta din utveckling som global medborgare' : 'A 20-item reflection tool to measure your growth as a global citizen'}</p>
        </div>
        
        <div class="tool-card">
          <div class="tool-icon">🧰</div>
          <h3>{$locale === 'sv' ? 'Verktygslådor' : 'Toolkits'}</h3>
          <p>{$locale === 'sv' ? 'Resurser för skolor, kommuner och arbetsplatser' : 'Resources for schools, municipalities, and workplaces'}</p>
        </div>
        
        <div class="tool-card">
          <div class="tool-icon">🧠</div>
          <h3>{$locale === 'sv' ? 'Teknik & Etik' : 'Tech & Ethics'}</h3>
          <p>{$locale === 'sv' ? 'Verktyg för AI-assisterad samarbete och empatiutveckling' : 'Tools for AI-assisted collaboration and empathy development'}</p>
        </div>
        
        <div class="tool-card">
          <div class="tool-icon">🌐</div>
          <h3>{$locale === 'sv' ? 'Utvidga cirkeln' : 'Expanding the Circle'}</h3>
          <p>{$locale === 'sv' ? 'Metoder för att inkludera icke-mänskliga varelser i etiska överväganden' : 'Methods for including non-human beings in ethical considerations'}</p>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="cta-section">
      <h2>{$locale === 'sv' ? 'Börja din resa' : 'Begin Your Journey'}</h2>
      <p>{$locale === 'sv'
        ? 'Du är redan en global medborgare. Resan handlar om att leva det—mer medvetet, mer medkännande och mer kollektivt.'
        : 'You are already a global citizen. The journey is to live it—more consciously, more compassionately, and more collectively.'}</p>
      
      <div class="cta-buttons">
        <a href="{base}/frameworks/global-citizenship/full-framework" class="primary-button">
          {$locale === 'sv' ? 'Utforska fullständigt ramverk' : 'Explore Full Framework'}
        </a>
        <button class="secondary-button" on:click={downloadSummary}>
          {$locale === 'sv' ? 'Ladda ner 4-sidors sammanfattning' : 'Download 4-Page Summary'}
        </button>
      </div>
    </section>
  </div>
</div>

<style>
  .documentation-container {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  @media (max-width: 768px) {
    .documentation-container {
      grid-template-columns: 1fr;
    }
  }
  
  .content {
    min-width: 0;
  }
  
  .content h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2B4B8C;
    margin-bottom: 1.5rem;
  }
  
  .hero-section {
    margin: 2rem 0;
    display: flex;
    justify-content: center;
  }
  
  .diagram-container {
    max-width: 100%;
    text-align: center;
  }
  
  .framework-diagram {
    max-width: 100%;
    height: auto;
    border-radius: 0.75rem;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }
  
  .framework-section {
    margin: 3rem 0;
    padding: 1.5rem;
    background-color: #f9fafb;
    border-radius: 0.75rem;
    border-left: 4px solid #DAA520;
  }
  
  .framework-section h2 {
    font-size: 1.75rem;
    font-weight: 600;
    color: #2B4B8C;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #DAA520;
    display: inline-block;
  }
  
  .action-links {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
    flex-wrap: wrap;
  }
  
  .primary-link, .secondary-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    border-radius: 0.5rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s;
  }
  
  .primary-link {
    background-color: #2B4B8C;
    color: white;
  }
  
  .primary-link:hover {
    background-color: #1d3a6a;
    transform: translateY(-2px);
  }
  
  .secondary-link {
    background-color: white;
    color: #2B4B8C;
    border: 2px solid #2B4B8C;
    cursor: pointer;
  }
  
  .secondary-link:hover {
    background-color: #f0f4f9;
    transform: translateY(-2px);
  }
  
  /* Values Grid */
  .values-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }
  
  .value-card {
    background-color: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .value-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
  
  .value-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .value-card h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #2B4B8C;
    margin-bottom: 0.5rem;
  }
  
  .value-card p {
    font-size: 0.9rem;
    color: #4b5563;
  }
  
  /* Levels of Practice */
  .levels-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1.5rem;
  }
  
  .level-card {
    display: grid;
    grid-template-columns: auto 1fr 2fr;
    align-items: center;
    gap: 1.5rem;
    background-color: white;
    padding: 1.25rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    transition: transform 0.2s;
  }
  
  .level-card:hover {
    transform: translateX(10px);
  }
  
  .level-1 { border-left: 6px solid #2D5F2D; }
  .level-2 { border-left: 6px solid #7D9F7D; }
  .level-3 { border-left: 6px solid #2B4B8C; }
  .level-4 { border-left: 6px solid #6B5CA5; }
  .level-5 { border-left: 6px solid #DAA520; }
  
  .level-card h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #2B4B8C;
    margin: 0;
    width: 150px;
  }
  
  .level-mindset {
    font-style: italic;
    color: #6b7280;
    margin: 0;
    width: 200px;
  }
  
  .level-card p:not(.level-mindset) {
    margin: 0;
    color: #4b5563;
  }
  
  /* Benefits */
  .benefits-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }
  
  .benefit-column {
    background-color: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }
  
  .benefit-column h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #2B4B8C;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #DAA520;
  }
  
  .benefit-column ul {
    margin: 0;
    padding-left: 1.5rem;
  }
  
  .benefit-column li {
    margin-bottom: 0.5rem;
    color: #4b5563;
  }
  
  /* Tools Grid */
  .tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }
  
  .tool-card {
    background-color: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .tool-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .tool-card h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #2B4B8C;
    margin-bottom: 0.5rem;
  }
  
  .tool-card p {
    font-size: 0.9rem;
    color: #4b5563;
  }
  
  /* Call to Action */
  .cta-section {
    margin: 3rem 0;
    padding: 2rem;
    background: linear-gradient(to bottom right, #2B4B8C, #6B5CA5);
    color: white;
    border-radius: 0.75rem;
    text-align: center;
  }
  
  .cta-section h2 {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  .cta-section p {
    margin-bottom: 1.5rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .cta-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .primary-button, .secondary-button {
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s;
  }
  
  .primary-button {
    background-color: #DAA520;
    color: #2B4B8C;
  }
  
  .primary-button:hover {
    background-color: #B8860B;
    transform: translateY(-2px);
  }
  
  .secondary-button {
    background-color: transparent;
    color: white;
    border: 2px solid white;
    cursor: pointer;
  }
  
  .secondary-button:hover {
    background-color: rgba(255,255,255,0.1);
    transform: translateY(-2px);
  }
  
  /* Media Queries */
  @media (max-width: 768px) {
    .level-card {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }
    
    .level-card h3, .level-mindset {
      width: auto;
    }
    
    .action-links, .cta-buttons {
      flex-direction: column;
    }
    
    .primary-link, .secondary-link, .primary-button, .secondary-button {
      width: 100%;
      text-align: center;
      justify-content: center;
    }
  }
</style>
