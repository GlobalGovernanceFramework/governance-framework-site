<!-- LeveragePointsIntro.svelte -->
<script lang="ts">
  import { locale } from '$lib/i18n';
  
  $: currentLocale = $locale;
  
  const translations = {
    en: {
      title: "Understanding Leverage Points in Conflict Systems",
      introText: "Leverage points are places within a system where a small shift can produce large changes in system behavior. Learning to identify and work with leverage points is key to effective systems change in peace and conflict contexts.",
      lpTiersTitle: "The Leverage Point Framework",
      lpDesc: "Leverage points are ordered from most powerful (paradigm shifts) to least powerful (adjusting parameters), with interventions at higher levels typically creating more fundamental and sustainable change.",
      tiers: [
        {
          title: "Paradigms (Level 1-3)",
          desc: "The mindsets, goals, and worldviews that shape a system. The most powerful leverage points involve shifting these fundamental elements.",
          examples: "Changing narratives about 'the other', shifting from punishment to reconciliation approaches, establishing new collective visions."
        },
        {
          title: "System Design (Level 4-6)",
          desc: "The structures, rules, and information flows that determine how the system functions.",
          examples: "Creating new institutions, changing power distributions, establishing resource-sharing agreements, improving information access."
        },
        {
          title: "Feedback Processes (Level 7-9)",
          desc: "The feedback loops, delays, and buffers that regulate system behavior.",
          examples: "Establishing early warning systems, reducing delays in response mechanisms, creating buffers against violence escalation."
        },
        {
          title: "Parameters (Level 10-12)",
          desc: "The numbers, quantities, and settings that define how strongly parts of the system interact.",
          examples: "Changing policing ratios, adjusting aid amounts, altering military deployments, modifying economic subsidies."
        }
      ],
      explorerInstructions: "Use the interactive tools below to explore how different types of leverage points function in conflict systems. Experiment with interventions to see which ones produce the most significant and sustainable changes."
    },
    sv: {
      title: "Att förstå hävstångspunkter i konfliktsystem",
      introText: "Hävstångspunkter är platser inom ett system där en liten förändring kan producera stora förändringar i systemets beteende. Att lära sig identifiera och arbeta med hävstångspunkter är nyckeln till effektiv systemförändring i freds- och konfliktsammanhang.",
      lpTiersTitle: "Ramverket för hävstångspunkter",
      lpDesc: "Hävstångspunkter ordnas från mest kraftfulla (paradigmskiften) till minst kraftfulla (parameterjusteringar), där interventioner på högre nivåer vanligtvis skapar mer grundläggande och hållbar förändring.",
      tiers: [
        {
          title: "Paradigm (Nivå 1-3)",
          desc: "Tankesätt, mål och världsåskådningar som formar ett system. De mest kraftfulla hävstångspunkterna involverar förändring av dessa grundläggande element.",
          examples: "Att förändra berättelser om 'den andre', skifta från straff- till försoningsansatser, etablera nya kollektiva visioner."
        },
        {
          title: "Systemdesign (Nivå 4-6)",
          desc: "Strukturer, regler och informationsflöden som avgör hur systemet fungerar.",
          examples: "Skapa nya institutioner, förändra maktfördelningar, upprätta resursdelningsavtal, förbättra informationstillgång."
        },
        {
          title: "Återkopplingsprocesser (Nivå 7-9)",
          desc: "Återkopplingsslingor, fördröjningar och buffertar som reglerar systemets beteende.",
          examples: "Upprätta system för tidig varning, minska fördröjningar i responsmekanismer, skapa buffertar mot våldseskalering."
        },
        {
          title: "Parametrar (Nivå 10-12)",
          desc: "Siffror, kvantiteter och inställningar som definierar hur starkt delar av systemet interagerar.",
          examples: "Förändra poliskvoter, justera biståndsbelopp, förändra militära utplaceringar, modifiera ekonomiska subventioner."
        }
      ],
      explorerInstructions: "Använd de interaktiva verktygen nedan för att utforska hur olika typer av hävstångspunkter fungerar i konfliktsystem. Experimentera med interventioner för att se vilka som producerar de mest betydande och hållbara förändringarna."
    }
  };
  
  $: texts = translations[currentLocale] || translations.en;
</script>

<div class="intro-section">
  <h2>{texts.title}</h2>
  
  <p class="intro-text">{texts.introText}</p>
  
  <h3>{texts.lpTiersTitle}</h3>
  <p>{texts.lpDesc}</p>
  
  <div class="tiers-grid">
    {#each texts.tiers as tier, i}
      <div class="tier-card tier-{i+1}">
        <h4>{tier.title}</h4>
        <p class="tier-desc">{tier.desc}</p>
        <p class="tier-examples"><strong>Examples:</strong> {tier.examples}</p>
      </div>
    {/each}
  </div>
  
  <div class="instructions">
    <p>{texts.explorerInstructions}</p>
  </div>
</div>

<style>
  .intro-section {
    margin-bottom: 2rem;
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
  
  .intro-text {
    font-size: 1.125rem;
    color: #4b5563;
    margin-bottom: 1.5rem;
    line-height: 1.7;
  }
  
  .tiers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0;
  }
  
  .tier-card {
    padding: 1.5rem;
    border-radius: 0.75rem;
    display: flex;
    flex-direction: column;
  }
  
  .tier-1 {
    background-color: rgba(231, 76, 60, 0.1);
    border: 1px solid rgba(231, 76, 60, 0.3);
  }
  
  .tier-2 {
    background-color: rgba(230, 126, 34, 0.1);
    border: 1px solid rgba(230, 126, 34, 0.3);
  }
  
  .tier-3 {
    background-color: rgba(241, 196, 15, 0.1);
    border: 1px solid rgba(241, 196, 15, 0.3);
  }
  
  .tier-4 {
    background-color: rgba(155, 89, 182, 0.1);
    border: 1px solid rgba(155, 89, 182, 0.3);
  }
  
  .tier-card h4 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 0.75rem 0;
  }
  
  .tier-1 h4 {
    color: #e74c3c;
  }
  
  .tier-2 h4 {
    color: #e67e22;
  }
  
  .tier-3 h4 {
    color: #f1c40f;
  }
  
  .tier-4 h4 {
    color: #9b59b6;
  }
  
  .tier-desc {
    font-size: 0.95rem;
    margin-bottom: 1rem;
    color: #4b5563;
    line-height: 1.6;
  }
  
  .tier-examples {
    font-size: 0.9rem;
    color: #4b5563;
    font-style: italic;
    margin-top: auto;
    line-height: 1.5;
  }
  
  .instructions {
    background-color: #f0e6f6;
    padding: 1.25rem;
    border-radius: 0.5rem;
    border-left: 4px solid #9b59b6;
    margin-top: 1.5rem;
  }
  
  .instructions p {
    font-size: 1rem;
    color: #4b5563;
    margin-bottom: 0;
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    .tiers-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
