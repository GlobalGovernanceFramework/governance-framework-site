<!-- StockFlowPatterns.svelte -->
<script lang="ts">
  import { locale } from '$lib/i18n';
  
  $: currentLocale = $locale;
  
  const translations = {
    en: {
      title: "Common Stock & Flow Patterns in Conflict Systems",
      intro: "Understanding these typical patterns helps practitioners recognize dynamics and design effective interventions.",
      
      balancingFeedbackTitle: "Balancing Feedback Loops",
      balancingFeedbackDesc: "When a stock grows, it triggers outflows that reduce it. This creates stability and resistance to change. Example: As violence increases, peacekeeping efforts intensify, eventually bringing violence levels back down.",
      
      reinforcingFeedbackTitle: "Reinforcing Feedback Loops",
      reinforcingFeedbackDesc: "When a stock grows, it triggers processes that further increase it. This creates exponential growth or collapse. Example: As social polarization increases, it leads to more extremist recruitment, which further increases polarization.",
      
      thresholdEffectsTitle: "Threshold Effects",
      thresholdEffectsDesc: "When stocks reach critical levels, system behavior changes dramatically. Example: When trust falls below a certain threshold, cooperative institutions may collapse entirely rather than just becoming less effective.",
      
      timeDelaysTitle: "Time Delays",
      timeDelaysDesc: "Changes in flows don't immediately affect stocks, creating lag times between intervention and impact. Example: Educational programs to reduce extremism may take years to show measurable effects on violence levels.",
      
      stockLimitingTitle: "Stock Limiting Factors",
      stockLimitingDesc: "Natural limits to how much stocks can grow or deplete. Example: Community grievances can't exceed 100% of the population, creating natural caps on conflict escalation.",
      
      accelDecelTitle: "Acceleration and Deceleration",
      accelDecelDesc: "The rate of change in stocks can increase or decrease over time. Example: Violence may escalate slowly at first, then rapidly accelerate once it passes a social tipping point.",
      
      tipsForIdentifying: "Tips for Identifying Patterns:",
      tip1: "Track stock levels over time to see if they follow S-curves (balancing) or J-curves (reinforcing).",
      tip2: "Look for oscillations that suggest balancing loops with delays.",
      tip3: "Identify potential threshold points where system behavior changes dramatically.",
      tip4: "Consider both quick wins (flow modifications) and long-term strategies (structural changes).",
      
      applyingPatterns: "Applying Pattern Recognition to Interventions:",
      application1: "For reinforcing loops: Intervene early before exponential growth makes change difficult.",
      application2: "For balancing loops: Strengthen feedback mechanisms to speed recovery.",
      application3: "For threshold effects: Focus on preventing critical thresholds from being crossed.",
      application4: "For time delays: Create intermediate indicators to track progress before final outcomes change."
    },
    sv: {
      title: "Vanliga Lager- och Flödesmönster i Konfliktsystem",
      intro: "Att förstå dessa typiska mönster hjälper praktiker att känna igen dynamik och utforma effektiva interventioner.",
      
      balancingFeedbackTitle: "Balanserande Återkopplingsslingor",
      balancingFeedbackDesc: "När ett lager växer utlöser det utflöden som minskar det. Detta skapar stabilitet och motstånd mot förändring. Exempel: När våldet ökar intensifieras fredsbevarande insatser, vilket så småningom får våldsnivåerna att sjunka igen.",
      
      reinforcingFeedbackTitle: "Förstärkande Återkopplingsslingor",
      reinforcingFeedbackDesc: "När ett lager växer utlöser det processer som ytterligare ökar det. Detta skapar exponentiell tillväxt eller kollaps. Exempel: När social polarisering ökar leder det till mer extremistrekrytering, vilket ytterligare ökar polariseringen.",
      
      thresholdEffectsTitle: "Tröskeleffekter",
      thresholdEffectsDesc: "När lager når kritiska nivåer förändras systemets beteende dramatiskt. Exempel: När förtroendet sjunker under en viss tröskel kan samarbetsinstitutioner kollapsa helt snarare än att bara bli mindre effektiva.",
      
      timeDelaysTitle: "Tidsfördröjningar",
      timeDelaysDesc: "Förändringar i flöden påverkar inte omedelbart lager, vilket skapar fördröjning mellan intervention och effekt. Exempel: Utbildningsprogram för att minska extremism kan ta år innan de visar mätbara effekter på våldsnivåer.",
      
      stockLimitingTitle: "Lagerbegränsande Faktorer",
      stockLimitingDesc: "Naturliga gränser för hur mycket lager kan växa eller minska. Exempel: Samhällsklagomål kan inte överstiga 100% av befolkningen, vilket skapar naturliga tak för konflikteskalering.",
      
      accelDecelTitle: "Acceleration och Inbromsning",
      accelDecelDesc: "Förändringstakten i lager kan öka eller minska över tid. Exempel: Våld kan eskalera långsamt till en början och sedan snabbt accelerera när det passerar en social tippunkt.",
      
      tipsForIdentifying: "Tips för att identifiera mönster:",
      tip1: "Spåra lagernivåer över tid för att se om de följer S-kurvor (balanserande) eller J-kurvor (förstärkande).",
      tip2: "Leta efter oscillationer som antyder balanserande slingor med fördröjningar.",
      tip3: "Identifiera potentiella tröskelpunkter där systemets beteende förändras dramatiskt.",
      tip4: "Överväg både snabba vinster (flödesmodifieringar) och långsiktiga strategier (strukturella förändringar).",
      
      applyingPatterns: "Tillämpa mönsterigenkänning på interventioner:",
      application1: "För förstärkande slingor: Ingrip tidigt innan exponentiell tillväxt gör förändring svår.",
      application2: "För balanserande slingor: Stärk återkopplingsmekanismer för att påskynda återhämtning.",
      application3: "För tröskeleffekter: Fokusera på att förhindra att kritiska trösklar korsas.",
      application4: "För tidsfördröjningar: Skapa mellanliggande indikatorer för att spåra framsteg innan slutliga resultat förändras."
    }
  };
  
  $: texts = translations[currentLocale] || translations.en;
</script>

<div class="patterns-container">
  <h2>{texts.title}</h2>
  
  <p class="intro">{texts.intro}</p>
  
  <div class="pattern-grid">
    <!-- Balancing Feedback Loops -->
    <div class="pattern-card">
      <div class="pattern-header">
        <div class="pattern-icon">⇄</div>
        <h3>{texts.balancingFeedbackTitle}</h3>
      </div>
      <p>{texts.balancingFeedbackDesc}</p>
      <div class="pattern-image balancing-feedback"></div>
    </div>
    
    <!-- Reinforcing Feedback Loops -->
    <div class="pattern-card">
      <div class="pattern-header">
        <div class="pattern-icon">↺</div>
        <h3>{texts.reinforcingFeedbackTitle}</h3>
      </div>
      <p>{texts.reinforcingFeedbackDesc}</p>
      <div class="pattern-image reinforcing-feedback"></div>
    </div>
    
    <!-- Threshold Effects -->
    <div class="pattern-card">
      <div class="pattern-header">
        <div class="pattern-icon">▮▶</div>
        <h3>{texts.thresholdEffectsTitle}</h3>
      </div>
      <p>{texts.thresholdEffectsDesc}</p>
      <div class="pattern-image threshold-effects"></div>
    </div>
    
    <!-- Time Delays -->
    <div class="pattern-card">
      <div class="pattern-header">
        <div class="pattern-icon">⌛</div>
        <h3>{texts.timeDelaysTitle}</h3>
      </div>
      <p>{texts.timeDelaysDesc}</p>
      <div class="pattern-image time-delays"></div>
    </div>
    
    <!-- Stock Limiting Factors -->
    <div class="pattern-card">
      <div class="pattern-header">
        <div class="pattern-icon">◭</div>
        <h3>{texts.stockLimitingTitle}</h3>
      </div>
      <p>{texts.stockLimitingDesc}</p>
      <div class="pattern-image stock-limiting"></div>
    </div>
    
    <!-- Acceleration and Deceleration -->
    <div class="pattern-card">
      <div class="pattern-header">
        <div class="pattern-icon">∿</div>
        <h3>{texts.accelDecelTitle}</h3>
      </div>
      <p>{texts.accelDecelDesc}</p>
      <div class="pattern-image accel-decel"></div>
    </div>
  </div>
  
  <div class="application-section">
    <h3>{texts.tipsForIdentifying}</h3>
    <ul>
      <li>{texts.tip1}</li>
      <li>{texts.tip2}</li>
      <li>{texts.tip3}</li>
      <li>{texts.tip4}</li>
    </ul>
    
    <h3>{texts.applyingPatterns}</h3>
    <ul>
      <li>{texts.application1}</li>
      <li>{texts.application2}</li>
      <li>{texts.application3}</li>
      <li>{texts.application4}</li>
    </ul>
  </div>
</div>

<style>
  .patterns-container {
    max-width: 100%;
    overflow-x: hidden;
  }
  
  h2 {
    font-size: 1.75rem;
    font-weight: 600;
    color: #2C8A78;
    margin-bottom: 1rem;
  }
  
  .intro {
    font-size: 1.1rem;
    color: #4b5563;
    margin-bottom: 2rem;
    line-height: 1.7;
  }
  
  .pattern-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .pattern-card {
    background-color: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
  }
  
  .pattern-header {
    display: flex;
    align-items: center;
    margin-bottom: 0.75rem;
  }
  
  .pattern-icon {
    font-size: 1.5rem;
    color: #2C8A78;
    margin-right: 0.75rem;
  }
  
  .pattern-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2C8A78;
    margin: 0;
  }
  
  .pattern-card p {
    font-size: 0.95rem;
    color: #4b5563;
    margin-bottom: 1.25rem;
    line-height: 1.6;
  }
  
  .pattern-image {
    height: 120px;
    background-color: #f9fafb;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9CA3AF;
    font-size: 0.875rem;
    text-align: center;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
  
  /* These would be replaced with actual pattern SVGs in a production system */
  .balancing-feedback {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 100'%3E%3Cpath d='M20,80 Q50,20 100,50 Q150,80 180,20' stroke='%232C8A78' fill='none' stroke-width='3'/%3E%3C/svg%3E");
  }
  
  .reinforcing-feedback {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 100'%3E%3Cpath d='M20,80 Q60,70 100,50 Q140,30 180,10' stroke='%23C1292E' fill='none' stroke-width='3'/%3E%3C/svg%3E");
  }
  
  .threshold-effects {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 100'%3E%3Cpath d='M20,80 L80,80 L100,20 L180,20' stroke='%236B5CA5' fill='none' stroke-width='3'/%3E%3Cline x1='80' y1='10' x2='80' y2='90' stroke='%236B5CA5' stroke-width='1' stroke-dasharray='4'/%3E%3C/svg%3E");
  }
  
  .time-delays {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 100'%3E%3Cpath d='M20,80 L60,80 Q80,80 80,60 L80,40 Q80,20 100,20 L180,20' stroke='%234ECDC4' fill='none' stroke-width='3'/%3E%3C/svg%3E");
  }
  
  .stock-limiting {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 100'%3E%3Cpath d='M20,80 Q60,20 100,20 Q140,20 180,20' stroke='%23F9A826' fill='none' stroke-width='3'/%3E%3Cline x1='0' y1='20' x2='200' y2='20' stroke='%23F9A826' stroke-width='1' stroke-dasharray='4'/%3E%3C/svg%3E");
  }
  
  .accel-decel {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 100'%3E%3Cpath d='M20,80 C40,80 50,70 80,20 S120,20 180,80' stroke='%23EB5757' fill='none' stroke-width='3'/%3E%3C/svg%3E");
  }
  
  .application-section {
    background-color: #f9fafb;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
  }
  
  .application-section h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2C8A78;
    margin-top: 0;
    margin-bottom: 1rem;
  }
  
  .application-section ul {
    margin: 0 0 1.5rem 0;
    padding-left: 1.5rem;
  }
  
  .application-section li {
    margin-bottom: 0.5rem;
    line-height: 1.6;
    color: #4b5563;
  }
  
  @media (max-width: 768px) {
    .pattern-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
