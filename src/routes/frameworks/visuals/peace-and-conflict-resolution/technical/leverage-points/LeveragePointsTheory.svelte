<!-- LeveragePointsTheory.svelte -->
<script lang="ts">
  import { locale } from '$lib/i18n';
  
  $: currentLocale = $locale;
  
  const translations = {
    en: {
      title: "Leverage Points Theory for Conflict Transformation",
      intro: "This page explains the theoretical foundations of leverage points and how they apply to peace and conflict work.",
      
      originTitle: "Origins of Leverage Points",
      originText: "The concept of leverage points was developed by systems thinking pioneer Donella Meadows. She identified twelve places to intervene in a system, ranked by increasing power to transform system behavior.",
      
      applicationTitle: "Applications to Conflict Transformation",
      applicationText: "When applied to conflict systems, leverage points help practitioners identify the most effective intervention strategies for sustainable peace.",
      
      casesTitle: "Case Examples",
      casesText: "The following cases illustrate how different types of leverage points have been used in conflict transformation efforts.",
      
      cases: [
        {
          title: "Post-Genocide Rwanda",
          leverage: "Paradigm Shift (Level 2)",
          description: "The establishment of Gacaca courts represented a paradigm shift from retributive to restorative justice, creating a new vision of community healing that integrated traditional practices with formal justice mechanisms."
        },
        {
          title: "Northern Ireland Peace Process",
          leverage: "Rules of the System (Level 5)",
          description: "The Good Friday Agreement created new rules for political participation, power-sharing, and cross-community consent, changing the fundamental structure of governance in Northern Ireland."
        },
        {
          title: "Colombia's Early Warning System",
          leverage: "Feedback Loops (Level 8)",
          description: "The establishment of an early warning system for potential human rights violations created new feedback loops that allowed faster responses to emerging threats and prevented escalation in many cases."
        },
        {
          title: "UN Peacekeeping in Lebanon",
          leverage: "Parameters (Level 12)",
          description: "Adjustments to troop numbers and buffer zone sizes represent parameter-level interventions that have helped stabilize certain situations but required constant maintenance and didn't address underlying causes."
        }
      ],
      
      choosingTitle: "Choosing Appropriate Leverage Points",
      choosingText: "When selecting leverage points for intervention, consider:",
      choosingPoints: [
        "Higher-level leverage points (paradigms, system goals) create more fundamental and lasting change, but may be harder to influence",
        "Lower-level points (parameters, buffers) are easier to change but require constant maintenance and may not address root causes",
        "Most effective strategies often combine interventions across multiple leverage levels",
        "Context matters - what works in one conflict may not work in another"
      ],
      
      commonMistakesTitle: "Common Mistakes in Leverage Point Interventions",
      commonMistakes: [
        {
          title: "Pushing in the wrong direction",
          description: "Sometimes well-intended interventions inadvertently strengthen negative system behavior by pushing in the wrong direction."
        },
        {
          title: "Using the wrong level",
          description: "Trying to solve paradigm-level problems with parameter-level interventions rarely creates sustainable change."
        },
        {
          title: "Ignoring delays",
          description: "Many interventions fail because they don't account for the delays between action and system response."
        },
        {
          title: "Missing connections",
          description: "Failing to understand how leverage points connect to other system elements can lead to unexpected side effects."
        }
      ]
    },
    sv: {
      title: "Hävstångspunktsteori för konflikttransformation",
      intro: "Denna sida förklarar de teoretiska grunderna för hävstångspunkter och hur de tillämpas i freds- och konfliktarbete.",
      
      originTitle: "Hävstångspunkternas ursprung",
      originText: "Konceptet med hävstångspunkter utvecklades av systemtänkandets pionjär Donella Meadows. Hon identifierade tolv platser att ingripa i ett system, rankade efter ökande kraft att transformera systembeteende.",
      
      applicationTitle: "Tillämpningar på konflikttransformation",
      applicationText: "När de appliceras på konfliktsystem hjälper hävstångspunkter praktiker att identifiera de mest effektiva interventionsstrategierna för hållbar fred.",
      
      casesTitle: "Fallexempel",
      casesText: "Följande fall illustrerar hur olika typer av hävstångspunkter har använts i konflikttransformationsinsatser.",
      
      cases: [
        {
          title: "Post-Genocid Rwanda",
          leverage: "Paradigmskifte (Nivå 2)",
          description: "Inrättandet av Gacaca-domstolar representerade ett paradigmskifte från vedergällande till återställande rättvisa, vilket skapade en ny vision av samhällsläkning som integrerade traditionella metoder med formella rättsmekanismer."
        },
        {
          title: "Nordirlands fredsprocess",
          leverage: "Systemregler (Nivå 5)",
          description: "Långfredagsavtalet skapade nya regler för politiskt deltagande, maktdelning och samtycke mellan samhällen, vilket förändrade den grundläggande styrningsstrukturen i Nordirland."
        },
        {
          title: "Colombias system för tidig varning",
          leverage: "Återkopplingsslingor (Nivå 8)",
          description: "Inrättandet av ett system för tidig varning för potentiella kränkningar av mänskliga rättigheter skapade nya återkopplingsslingor som möjliggjorde snabbare reaktioner på nya hot och förhindrade eskalering i många fall."
        },
        {
          title: "FN:s fredsbevarande insatser i Libanon",
          leverage: "Parametrar (Nivå 12)",
          description: "Justeringar av truppantal och buffertzoners storlek representerar parameternivåinterventioner som har hjälpt till att stabilisera vissa situationer men krävde konstant underhåll och adresserade inte underliggande orsaker."
        }
      ],
      
      choosingTitle: "Att välja lämpliga hävstångspunkter",
      choosingText: "När du väljer hävstångspunkter för intervention, överväg:",
      choosingPoints: [
        "Hävstångspunkter på högre nivå (paradigm, systemmål) skapar mer grundläggande och varaktig förändring, men kan vara svårare att påverka",
        "Punkter på lägre nivå (parametrar, buffertar) är lättare att förändra men kräver konstant underhåll och kanske inte adresserar grundorsaker",
        "De mest effektiva strategierna kombinerar ofta interventioner över flera hävstångsnivåer",
        "Kontext spelar roll - vad som fungerar i en konflikt kanske inte fungerar i en annan"
      ],
      
      commonMistakesTitle: "Vanliga misstag i hävstångspunktsinterventioner",
      commonMistakes: [
        {
          title: "Att trycka i fel riktning",
          description: "Ibland stärker välmenade interventioner oavsiktligt negativt systembeteende genom att trycka i fel riktning."
        },
        {
          title: "Att använda fel nivå",
          description: "Att försöka lösa problem på paradigmnivå med interventioner på parameternivå skapar sällan hållbar förändring."
        },
        {
          title: "Att ignorera fördröjningar",
          description: "Många interventioner misslyckas eftersom de inte tar hänsyn till fördröjningarna mellan åtgärd och systemrespons."
        },
        {
          title: "Att missa kopplingar",
          description: "Att misslyckas med att förstå hur hävstångspunkter kopplar till andra systemelement kan leda till oväntade bieffekter."
        }
      ]
    }
  };
  
  $: texts = translations[currentLocale] || translations.en;
</script>

<div class="theory-container">
  <h2>{texts.title}</h2>
  
  <p class="intro">{texts.intro}</p>
  
  <div class="theory-section">
    <h3>{texts.originTitle}</h3>
    <p>{texts.originText}</p>
    
    <div class="leverage-points-diagram">
      <div class="leverage-scale">
        <div class="scale-label low">Low Leverage</div>
        <div class="scale-bar"></div>
        <div class="scale-label high">High Leverage</div>
      </div>
      
      <div class="leverage-levels">
        <div class="level-group parameters">
          <div class="level-title">Parameters (10-12)</div>
          <div class="level-items">
            <div class="level-item">12. Constants, parameters, numbers</div>
            <div class="level-item">11. Buffer sizes and stabilizing stocks</div>
            <div class="level-item">10. Physical structure of elements</div>
          </div>
        </div>
        
        <div class="level-group feedback">
          <div class="level-title">Feedback & Delays (7-9)</div>
          <div class="level-items">
            <div class="level-item">9. Length of delays in feedback loops</div>
            <div class="level-item">8. Strength of negative feedback loops</div>
            <div class="level-item">7. Gain of driving positive feedback loops</div>
          </div>
        </div>
        
        <div class="level-group design">
          <div class="level-title">System Design (4-6)</div>
          <div class="level-items">
            <div class="level-item">6. Structure of information flows</div>
            <div class="level-item">5. Rules of the system</div>
            <div class="level-item">4. Power to add, change or self-organize</div>
          </div>
        </div>
        
        <div class="level-group paradigm">
          <div class="level-title">Paradigms (1-3)</div>
          <div class="level-items">
            <div class="level-item">3. Goals of the system</div>
            <div class="level-item">2. Mindset/paradigm from which the system arises</div>
            <div class="level-item">1. Power to transcend paradigms</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="theory-section">
    <h3>{texts.applicationTitle}</h3>
    <p>{texts.applicationText}</p>
    
    <h4>{texts.casesTitle}</h4>
    <p>{texts.casesText}</p>
    
    <div class="cases-grid">
      {#each texts.cases as caseItem}
        <div class="case-card">
          <h5>{caseItem.title}</h5>
          <div class="case-leverage">{caseItem.leverage}</div>
          <p>{caseItem.description}</p>
        </div>
      {/each}
    </div>
  </div>
  
  <div class="theory-section">
    <h3>{texts.choosingTitle}</h3>
    <p>{texts.choosingText}</p>
    
    <ul class="choosing-points">
      {#each texts.choosingPoints as point}
        <li>{point}</li>
      {/each}
    </ul>
  </div>
  
  <div class="theory-section">
    <h3>{texts.commonMistakesTitle}</h3>
    
    <div class="mistakes-grid">
      {#each texts.commonMistakes as mistake}
        <div class="mistake-card">
          <h5>{mistake.title}</h5>
          <p>{mistake.description}</p>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .theory-container {
    max-width: 100%;
    overflow-x: hidden;
  }
  
  h2 {
    font-size: 1.75rem;
    font-weight: 600;
    color: #9b59b6;
    margin-bottom: 1rem;
  }
  
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #9b59b6;
    margin: 1.5rem 0 1rem;
  }
  
  h4 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #9b59b6;
    margin: 1.5rem 0 1rem;
  }
  
  h5 {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
  }
  
  .intro {
    font-size: 1.125rem;
    color: #4b5563;
    margin-bottom: 1.5rem;
    line-height: 1.7;
  }
  
  .theory-section {
    margin-bottom: 2.5rem;
  }
  
  .theory-section p {
    color: #4b5563;
    line-height: 1.6;
  }
  
  /* Leverage Points Diagram */
  .leverage-points-diagram {
    margin: 2rem 0;
  }
  
  .leverage-scale {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  
  .scale-label {
    font-weight: 600;
    font-size: 0.875rem;
  }
  
  .scale-label.low {
    color: #9b59b6;
  }
  
  .scale-label.high {
    color: #e74c3c;
  }
  
  .scale-bar {
    flex-grow: 1;
    height: 4px;
    margin: 0 1rem;
    background: linear-gradient(to right, #9b59b6, #f1c40f, #e67e22, #e74c3c);
    border-radius: 2px;
  }
  
  .leverage-levels {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .level-group {
    padding: 1rem;
    border-radius: 0.5rem;
  }
  
  .parameters {
    background-color: rgba(155, 89, 182, 0.1);
    border: 1px solid rgba(155, 89, 182, 0.3);
  }
  
  .feedback {
    background-color: rgba(241, 196, 15, 0.1);
    border: 1px solid rgba(241, 196, 15, 0.3);
  }
  
  .design {
    background-color: rgba(230, 126, 34, 0.1);
    border: 1px solid rgba(230, 126, 34, 0.3);
  }
  
  .paradigm {
    background-color: rgba(231, 76, 60, 0.1);
    border: 1px solid rgba(231, 76, 60, 0.3);
  }
  
  .level-title {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .parameters .level-title {
    color: #9b59b6;
  }
  
  .feedback .level-title {
    color: #f1c40f;
  }
  
  .design .level-title {
    color: #e67e22;
  }
  
  .paradigm .level-title {
    color: #e74c3c;
  }
  
  .level-items {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .level-item {
    font-size: 0.9rem;
    color: #4b5563;
    padding: 0.5rem;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 0.25rem;
  }
  
  /* Cases Grid */
  .cases-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0;
  }
  
  .case-card {
    padding: 1.5rem;
    border-radius: 0.5rem;
    background-color: white;
    border: 1px solid #e5e7eb;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  .case-leverage {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: 0.25rem;
    margin-bottom: 0.75rem;
  }
  
  .case-card:nth-child(1) .case-leverage {
    background-color: rgba(231, 76, 60, 0.1);
    color: #e74c3c;
  }
  
  .case-card:nth-child(2) .case-leverage {
    background-color: rgba(230, 126, 34, 0.1);
    color: #e67e22;
  }
  
  .case-card:nth-child(3) .case-leverage {
    background-color: rgba(241, 196, 15, 0.1);
    color: #f1c40f;
  }
  
  .case-card:nth-child(4) .case-leverage {
    background-color: rgba(155, 89, 182, 0.1);
    color: #9b59b6;
  }
  
  .case-card p {
    font-size: 0.9rem;
    color: #4b5563;
    margin: 0;
    line-height: 1.5;
  }
  
  /* Choosing Points */
  .choosing-points {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }
  
  .choosing-points li {
    margin-bottom: 0.75rem;
    color: #4b5563;
    line-height: 1.5;
  }
  
  /* Mistakes Grid */
  .mistakes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
  }
  
  .mistake-card {
    padding: 1.25rem;
    border-radius: 0.5rem;
    background-color: #fee2e2;
    border: 1px solid #fecaca;
  }
  
  .mistake-card h5 {
    color: #b91c1c;
  }
  
  .mistake-card p {
    font-size: 0.9rem;
    color: #4b5563;
    margin: 0;
    line-height: 1.5;
  }
  
  /* Responsive styles */
  @media (max-width: 768px) {
    .cases-grid,
    .mistakes-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
