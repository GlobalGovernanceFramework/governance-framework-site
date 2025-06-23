<!-- SimulationIntro.svelte -->
<script lang="ts">
  import { locale } from '$lib/i18n';
  
  $: currentLocale = $locale;
  
  const translations = {
    en: {
      title: "Understanding Stock & Flow Dynamics in Conflicts",
      introText: "Stock and flow models help us understand how different resources, capacities, and factors accumulate or deplete over time in conflict systems. These models are crucial for sustainable peacebuilding interventions.",
      stocksTitle: "Stocks (Accumulations)",
      stocksDesc: "These represent quantities that accumulate or deplete over time, such as grievances, trust, violence, reconciliation efforts, or resources. Stocks change gradually through inflows and outflows.",
      flowsTitle: "Flows (Rates of Change)",
      flowsDesc: "These represent the rates at which stocks increase (inflows) or decrease (outflows). Examples include rates of grievance formation, trust-building, violence escalation, or resource depletion.",
      instructionsTitle: "Working with this simulator",
      instructionsDesc: "Use the interactive tools below to explore how stocks and flows shape conflict trajectories. Adjust parameters, observe dynamics, and test intervention strategies to see their long-term effects."
    },
    sv: {
      title: "Att förstå lager- och flödesdynamik i konflikter",
      introText: "Lager- och flödesmodeller hjälper oss att förstå hur olika resurser, kapaciteter och faktorer samlas eller töms över tid i konfliktsystem. Dessa modeller är avgörande för hållbara fredsbyggande insatser.",
      stocksTitle: "Lager (Ackumuleringar)",
      stocksDesc: "Dessa representerar kvantiteter som samlas eller töms över tid, såsom klagomål, förtroende, våld, försoningsinsatser eller resurser. Lager förändras gradvis genom inflöden och utflöden.",
      flowsTitle: "Flöden (Förändringstakt)",
      flowsDesc: "Dessa representerar den takt med vilken lager ökar (inflöden) eller minskar (utflöden). Exempel inkluderar takter för klagomålsbildning, förtroendebyggande, våldseskalering eller resurstömning.",
      instructionsTitle: "Att arbeta med denna simulator",
      instructionsDesc: "Använd de interaktiva verktygen nedan för att utforska hur lager och flöden formar konfliktbanor. Justera parametrar, observera dynamik och testa interventionsstrategier för att se deras långsiktiga effekter."
    }
  };
  
  $: texts = translations[currentLocale] || translations.en;
</script>

<div class="intro-section">
  <h2>{texts.title}</h2>
  
  <p class="intro-text">{texts.introText}</p>
  
  <div class="system-elements">
    <div class="element stock">
      <h3>{texts.stocksTitle}</h3>
      <div class="element-icon">◧</div>
      <p>{texts.stocksDesc}</p>
    </div>
    
    <div class="element flow">
      <h3>{texts.flowsTitle}</h3>
      <div class="element-icon">→</div>
      <p>{texts.flowsDesc}</p>
    </div>
  </div>
  
  <div class="instructions">
    <h3>{texts.instructionsTitle}</h3>
    <p>{texts.instructionsDesc}</p>
  </div>
</div>

<style>
  .intro-section {
    margin-bottom: 2rem;
  }
  
  h2 {
    font-size: 1.75rem;
    font-weight: 600;
    color: #2C8A78;
    margin-bottom: 1rem;
  }
  
  .intro-text {
    font-size: 1.125rem;
    color: #4b5563;
    margin-bottom: 1.5rem;
    line-height: 1.7;
  }
  
  .system-elements {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .element {
    padding: 1.5rem;
    border-radius: 0.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .stock {
    background-color: rgba(44, 138, 120, 0.1);
    border: 1px solid rgba(44, 138, 120, 0.3);
  }
  
  .flow {
    background-color: rgba(78, 205, 196, 0.1);
    border: 1px solid rgba(78, 205, 196, 0.3);
  }
  
  .element-icon {
    font-size: 2.5rem;
    margin: 0.75rem 0;
  }
  
  .stock .element-icon {
    color: #2C8A78;
  }
  
  .flow .element-icon {
    color: #4ECDC4;
  }
  
  .element h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .stock h3 {
    color: #2C8A78;
  }
  
  .flow h3 {
    color: #4ECDC4;
  }
  
  .element p {
    font-size: 1rem;
    color: #4b5563;
    margin-bottom: 0;
  }
  
  .instructions {
    background-color: #e6f6f4;
    padding: 1.25rem;
    border-radius: 0.5rem;
    border-left: 4px solid #2C8A78;
  }
  
  .instructions h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2C8A78;
    margin-bottom: 0.5rem;
  }
  
  .instructions p {
    font-size: 1rem;
    color: #4b5563;
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    .system-elements {
      grid-template-columns: 1fr;
    }
  }
</style>
