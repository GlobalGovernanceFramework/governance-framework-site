<!-- src/routes/frameworks/the-shield-protocol/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { t, locale } from '$lib/i18n';
  import { browser } from '$app/environment';
  import { invalidate } from '$app/navigation';
  import { base } from '$app/paths';
  import FrameworkSidebar from '$lib/components/FrameworkSidebar.svelte';
  import FrameworkComingSoon from '$lib/components/FrameworkComingSoon.svelte';
     
  export let data;

  $: if (browser && $locale) {
    invalidate('app:locale');
  }
</script>

<div class="documentation-container">
  <FrameworkSidebar />

  <div class="content">
    <!-- Shield Protocol Coming Soon Card -->
    <FrameworkComingSoon 
      frameworkName="shield"
      icon="🛡️"
      expectedQuarter="Q3 2025"
      themeColors={{
        primary: '#1e293b',
        secondary: '#334155', 
        accent: '#e11d48',
        light: '#f8fafc'
      }}
      contactEmail="globalgovernanceframeworks@gmail.com"
    />

    <!-- Additional Content Section -->
    <div class="framework-preview">
      <div class="preview-section">
        <h2>🛡️ Shielding Regenerative Civilization from Predatory Networks</h2>
        <p>
          The Shield Protocol creates a comprehensive global architecture to prevent, disrupt, and dismantle transnational criminal networks that drain $2.2 trillion annually and undermine governance. Using advanced technology, sovereignty-respecting cooperation, and Spiral-Aware approaches, it ensures justice is swift while respecting human dignity and developmental diversity.
        </p>
        
        <div class="key-innovations">
          <div class="innovation-card">
            <div class="innovation-icon">🧠</div>
            <h3>AI-Powered Intelligence Fusion</h3>
            <p>Global Crime Intelligence Center uses AI, blockchain evidence chains, and zero-knowledge proofs to map criminal networks while protecting privacy.</p>
          </div>
          
          <div class="innovation-card">
            <div class="innovation-icon">⚖️</div>
            <h3>Sovereignty-Respecting Enforcement</h3>
            <p>Supermajority voting, cultural sensitivity protocols, and sovereignty safeguards ensure cooperation without compromising national autonomy.</p>
          </div>
          
          <div class="innovation-card">
            <div class="innovation-icon">🔄</div>
            <h3>Spiral-Aware Rehabilitation</h3>
            <p>Developmental rehabilitation protocols address consciousness stages behind criminal behavior, offering pro-social pathways for transformation.</p>
          </div>
          
          <div class="innovation-card">
            <div class="innovation-icon">💰</div>
            <h3>Illicit Finance Disruption</h3>
            <p>Global asset recovery and financial transparency protocols trace and seize criminal proceeds, funding victim restitution and prevention programs.</p>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <h2>🎯 Threat Classification System</h2>
        <div class="threat-tiers">
          <div class="tier-card tier-0">
            <div class="tier-label">Tier 0</div>
            <h4>Existential Threats</h4>
            <p>Threats to global survival or systemic collapse</p>
            <div class="examples">AI-driven criminal super-networks, bio-terrorism, large-scale cyberattacks</div>
          </div>
          
          <div class="tier-card tier-1">
            <div class="tier-label">Tier 1</div>
            <h4>Systemic Threats</h4>
            <p>Threats to stability, financial systems, or peace (>$1B/year)</p>
            <div class="examples">State capture, sanctions evasion, terrorism financing, weapons trafficking</div>
          </div>
          
          <div class="tier-card tier-2">
            <div class="tier-label">Tier 2</div>
            <h4>High-Harm Networks</h4>
            <p>Enterprises causing widespread suffering ($100M-$1B/year)</p>
            <div class="examples">Human trafficking, drug cartels, illegal logging/mining</div>
          </div>
          
          <div class="tier-card tier-3">
            <div class="tier-label">Tier 3</div>
            <h4>Emergent Threats</h4>
            <p>New criminal vectors (&lt;$100M/year)</p>
            <div class="examples">AI-enabled fraud, synthetic biology markets, climate migration exploitation</div>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <h2>🏗️ Six Core Pillars</h2>
        <div class="pillars-grid">
          <div class="pillar-card">
            <div class="pillar-number">1</div>
            <h4>Global Intelligence Fusion & Analysis</h4>
            <p>Global Crime Intelligence Center with AI-powered threat mapping, quantum-resistant encryption, and Spiral Dynamics behavioral analysis</p>
          </div>
          
          <div class="pillar-card">
            <div class="pillar-number">2</div>
            <h4>Unified Legal & Judicial Framework</h4>
            <p>Global Convention 2.0 with Digital Justice Tribunal, mediation ladders, and developmental rehabilitation protocols</p>
          </div>
          
          <div class="pillar-card">
            <div class="pillar-number">3</div>
            <h4>Coordinated Enforcement & Operations</h4>
            <p>Global Enforcement Task Force conducting poly-jurisdictional investigations with cultural sensitivity and community oversight</p>
          </div>
          
          <div class="pillar-card">
            <div class="pillar-number">4</div>
            <h4>Illicit Finance Disruption</h4>
            <p>Global asset recovery protocols, beneficial ownership registries, and privacy coin regulation with transparency certificates</p>
          </div>
          
          <div class="pillar-card">
            <div class="pillar-number">5</div>
            <h4>Prevention, Resilience & Victim Support</h4>
            <p>Community safety programs, victim restitution, technology transfer, and Stage Red rehabilitation pathways</p>
          </div>
          
          <div class="pillar-card">
            <div class="pillar-number">6</div>
            <h4>Governance & Implementation</h4>
            <p>Transnational Security Council with civil society oversight, performance tracking, and crisis response protocols</p>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <h2>🌍 Spiral-Aware Justice Approach</h2>
        <p>The Shield Protocol recognizes that crime emerges from different consciousness stages and tailors responses accordingly:</p>
        <div class="spiral-stages">
          <div class="stage-card red">
            <div class="stage-icon">🔴</div>
            <h4>Stage Red (Egocentric Power)</h4>
            <p><strong>Criminal Expression:</strong> Cartels, violent hierarchies</p>
            <p><strong>Healthy Pathway:</strong> Sports leagues, disaster response teams, heroic roles</p>
          </div>
          
          <div class="stage-card blue">
            <div class="stage-icon">🔵</div>
            <h4>Stage Blue (Order & Rules)</h4>
            <p><strong>Criminal Expression:</strong> Bureaucratic oppression, authoritarian abuse</p>
            <p><strong>Healthy Pathway:</strong> Governance roles, law enforcement, structured service</p>
          </div>
          
          <div class="stage-card orange">
            <div class="stage-icon">🟠</div>
            <h4>Stage Orange (Achievement)</h4>
            <p><strong>Criminal Expression:</strong> Predatory capitalism, sophisticated fraud</p>
            <p><strong>Healthy Pathway:</strong> Entrepreneurship, innovation, competitive achievement</p>
          </div>
          
          <div class="stage-card green">
            <div class="stage-icon">🟢</div>
            <h4>Stage Green (Community)</h4>
            <p><strong>Criminal Expression:</strong> Ideological extremism, misguided activism</p>
            <p><strong>Healthy Pathway:</strong> Social justice work, cooperative movements, environmental protection</p>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <h2>⚖️ Sovereignty Safeguards</h2>
        <div class="safeguards-grid">
          <div class="safeguard-item">
            <div class="safeguard-icon">🗳️</div>
            <h4>Supermajority Voting</h4>
            <p>51% for standard operations, 67% for high-intervention, 75% for constitutional changes</p>
          </div>
          
          <div class="safeguard-item">
            <div class="safeguard-icon">⚖️</div>
            <h4>Sovereignty Dispute Tribunal</h4>
            <p>Independent mediation for opt-out appeals using Wise Decision-Making protocols</p>
          </div>
          
          <div class="safeguard-item">
            <div class="safeguard-icon">🛡️</div>
            <h4>Annual Opt-Out Rights</h4>
            <p>Three minor or one major opt-out annually with transparent sovereignty index ranking</p>
          </div>
          
          <div class="safeguard-item">
            <div class="safeguard-icon">🎭</div>
            <h4>Cultural Sensitivity Protocols</h4>
            <p>Indigenous and traditional justice systems integration with elder council validation</p>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <h2>💰 Sustainable Funding Architecture</h2>
        <div class="funding-breakdown">
          <div class="funding-item">
            <div class="funding-percentage">40%</div>
            <h4>Asset Recovery</h4>
            <p>Seized criminal proceeds redirected to operations and victim restitution</p>
          </div>
          
          <div class="funding-item">
            <div class="funding-percentage">25%</div>
            <h4>Sin Tax</h4>
            <p>Taxes on harmful activities collected via national authorities</p>
          </div>
          
          <div class="funding-item">
            <div class="funding-percentage">20%</div>
            <h4>Carbon & Tobin Taxes</h4>
            <p>Environmental and financial transaction taxes supporting global security</p>
          </div>
          
          <div class="funding-item">
            <div class="funding-percentage">15%</div>
            <h4>Other Sources</h4>
            <p>Nation contributions (10%) and private partnerships (5%)</p>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <h2>🚀 Implementation Roadmap</h2>
        <div class="implementation-phases">
          <div class="phase-item">
            <div class="phase-marker">0</div>
            <div class="phase-content">
              <h4>Stakeholder Buy-In (Year 0)</h4>
              <p>Secure G20 endorsement through bilateral engagement, starting with Canada, Norway, Singapore as early adopters</p>
            </div>
          </div>
          
          <div class="phase-item">
            <div class="phase-marker">1</div>
            <div class="phase-content">
              <h4>Pilot Programs (Years 1-2)</h4>
              <p>Launch GCIC and GETF pilots in 3-5 diverse Bioregional Autonomous Zones with minimal viable pilots</p>
            </div>
          </div>
          
          <div class="phase-item">
            <div class="phase-marker">2</div>
            <div class="phase-content">
              <h4>Regional Expansion (Years 3-5)</h4>
              <p>Scale to additional BAZs, operationalize global asset recovery, fund Stage Red rehabilitation programs</p>
            </div>
          </div>
          
          <div class="phase-item">
            <div class="phase-marker">3</div>
            <div class="phase-content">
              <h4>Global Integration (Years 6-10)</h4>
              <p>Achieve full participation in Global Convention 2.0, expand Digital Justice Tribunal for Tier 0-1 cases</p>
            </div>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <h2>📊 Case Study: Dismantling a Drug Cartel</h2>
        <div class="case-study">
          <div class="scenario">
            <h4>🎯 Scenario</h4>
            <p>A cartel moves $500M/year across three BAZs, driven by Stage Red dynamics seeking power and territory.</p>
          </div>
          
          <div class="action">
            <h4>⚡ GETF Action</h4>
            <p>GCIC uses Spiral Dynamics Analysis to map hierarchy, secures Digital Justice Tribunal warrants, coordinates poly-jurisdictional raids.</p>
          </div>
          
          <div class="outcome">
            <h4>✅ Outcome</h4>
            <p>Cartel dismantled, $300M repatriated for victim restitution, 35% reduction in local violence, Stage Red members enrolled in sports leagues and disaster response teams.</p>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <h2>🔗 Framework Connections</h2>
        <p>The Shield Protocol integrates with other governance frameworks as a specialized security layer:</p>
        <div class="connections-grid">
          <div class="connection-item">
            <span class="connection-icon">⚖️</span>
            <strong>Treaty for Our Only Home</strong> - Legal foundation and Digital Justice Tribunal enforcement
          </div>
          <div class="connection-item">
            <span class="connection-icon">🧠</span>
            <strong>Meta-Governance</strong> - Transnational Security Council coordination and crisis protocols
          </div>
          <div class="connection-item">
            <span class="connection-icon">💚</span>
            <strong>AUBI Framework</strong> - Addressing crime's socioeconomic roots through basic income security
          </div>
          <div class="connection-item">
            <span class="connection-icon">🔮</span>
            <strong>Aurora Accord</strong> - AI governance, blockchain evidence chains, and quantum-resistant encryption
          </div>
          <div class="connection-item">
            <span class="connection-icon">🌱</span>
            <strong>Environmental Stewardship</strong> - Combating ecocide and environmental crimes
          </div>
          <div class="connection-item">
            <span class="connection-icon">🏛️</span>
            <strong>Justice Systems</strong> - Unified legal frameworks and restorative justice principles
          </div>
        </div>
      </div>

      <div class="preview-section balanced-tone">
        <h2>🎯 A Balanced Approach to Global Security</h2>
        <p>
          The Shield Protocol recognizes that effective crime prevention requires both strength and wisdom. We're not seeking to create a global police state, but rather a coordinated response system that respects sovereignty while ensuring criminals cannot exploit jurisdictional gaps.
        </p>
        <p>
          By addressing the developmental roots of criminal behavior and offering pro-social pathways for transformation, we aim to build a security framework that heals rather than merely punishes, creating lasting safety for regenerative civilization.
        </p>
      </div>
    </div>
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

  .framework-preview {
    margin-top: 3rem;
  }

  .preview-section {
    margin-bottom: 3rem;
    padding: 2rem;
    background: linear-gradient(135deg, rgba(30, 41, 59, 0.05) 0%, rgba(51, 65, 85, 0.05) 100%);
    border-radius: 1rem;
    border-left: 4px solid #1e293b;
  }

  .preview-section.balanced-tone {
    background: linear-gradient(135deg, rgba(75, 85, 99, 0.05) 0%, rgba(107, 114, 128, 0.05) 100%);
    border-left-color: #6b7280;
  }

  .preview-section h2 {
    color: #1e293b;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }

  .balanced-tone h2 {
    color: #6b7280;
  }

  .key-innovations {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .innovation-card {
    background: white;
    padding: 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px rgba(30, 41, 59, 0.1);
    border: 1px solid rgba(30, 41, 59, 0.2);
  }

  .innovation-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .innovation-card h3 {
    color: #1e293b;
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
  }

  .innovation-card p {
    color: #4b5563;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .threat-tiers {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .tier-card {
    padding: 1.5rem;
    border-radius: 0.75rem;
    border: 2px solid;
    background: rgba(255, 255, 255, 0.7);
    position: relative;
  }

  .tier-card.tier-0 {
    border-color: #dc2626;
    background: rgba(220, 38, 38, 0.05);
  }

  .tier-card.tier-1 {
    border-color: #ea580c;
    background: rgba(234, 88, 12, 0.05);
  }

  .tier-card.tier-2 {
    border-color: #d97706;
    background: rgba(217, 119, 6, 0.05);
  }

  .tier-card.tier-3 {
    border-color: #059669;
    background: rgba(5, 150, 105, 0.05);
  }

  .tier-label {
    position: absolute;
    top: -10px;
    left: 15px;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: bold;
    color: white;
  }

  .tier-card.tier-0 .tier-label { background: #dc2626; }
  .tier-card.tier-1 .tier-label { background: #ea580c; }
  .tier-card.tier-2 .tier-label { background: #d97706; }
  .tier-card.tier-3 .tier-label { background: #059669; }

  .tier-card h4 {
    margin-bottom: 0.75rem;
    margin-top: 0.5rem;
    font-size: 1.1rem;
  }

  .tier-card.tier-0 h4 { color: #dc2626; }
  .tier-card.tier-1 h4 { color: #ea580c; }
  .tier-card.tier-2 h4 { color: #d97706; }
  .tier-card.tier-3 h4 { color: #059669; }

  .tier-card p {
    color: #4b5563;
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }

  .examples {
    font-size: 0.8rem;
    font-style: italic;
    color: #6b7280;
    padding: 0.5rem;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 0.25rem;
  }

  .pillars-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .pillar-card {
    background: rgba(255, 255, 255, 0.7);
    padding: 1.5rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(30, 41, 59, 0.2);
    position: relative;
  }

  .pillar-number {
    position: absolute;
    top: -15px;
    left: 20px;
    background: #1e293b;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }

  .pillar-card h4 {
    color: #1e293b;
    margin-bottom: 0.75rem;
    margin-top: 0.5rem;
    font-size: 1.1rem;
  }

  .pillar-card p {
    color: #4b5563;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .spiral-stages {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .stage-card {
    padding: 1.5rem;
    border-radius: 0.75rem;
    border: 2px solid;
    background: rgba(255, 255, 255, 0.7);
  }

  .stage-card.red {
    border-color: #dc2626;
    background: rgba(220, 38, 38, 0.05);
  }

  .stage-card.blue {
    border-color: #2563eb;
    background: rgba(37, 99, 235, 0.05);
  }

  .stage-card.orange {
    border-color: #ea580c;
    background: rgba(234, 88, 12, 0.05);
  }

  .stage-card.green {
    border-color: #059669;
    background: rgba(5, 150, 105, 0.05);
  }

  .stage-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .stage-card h4 {
    margin-bottom: 0.75rem;
    font-size: 1rem;
  }

  .stage-card.red h4 { color: #dc2626; }
  .stage-card.blue h4 { color: #2563eb; }
  .stage-card.orange h4 { color: #ea580c; }
  .stage-card.green h4 { color: #059669; }

  .stage-card p {
    color: #4b5563;
    font-size: 0.85rem;
    line-height: 1.4;
    margin-bottom: 0.5rem;
  }

  .safeguards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .safeguard-item {
    background: rgba(255, 255, 255, 0.7);
    padding: 1.5rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(30, 41, 59, 0.2);
    text-align: center;
  }

  .safeguard-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .safeguard-item h4 {
    color: #1e293b;
    margin-bottom: 0.75rem;
    font-size: 1rem;
  }

  .safeguard-item p {
    color: #4b5563;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .funding-breakdown {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .funding-item {
    background: rgba(255, 255, 255, 0.7);
    padding: 1.5rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(30, 41, 59, 0.2);
    text-align: center;
  }

  .funding-percentage {
    font-size: 2.5rem;
    font-weight: bold;
    color: #e11d48;
    margin-bottom: 0.5rem;
  }

  .funding-item h4 {
    color: #1e293b;
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
  }

  .funding-item p {
    color: #4b5563;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .implementation-phases {
    margin-top: 1.5rem;
  }

  .phase-item {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .phase-marker {
    background: #1e293b;
    color: white;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
  }

  .phase-content h4 {
    color: #1e293b;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }

  .phase-content p {
    color: #4b5563;
    line-height: 1.6;
  }

  .case-study {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .scenario, .action, .outcome {
    padding: 1.5rem;
    border-radius: 0.75rem;
    background: rgba(255, 255, 255, 0.7);
  }

  .scenario {
    border-left: 4px solid #e11d48;
  }

  .action {
    border-left: 4px solid #3b82f6;
  }

  .outcome {
    border-left: 4px solid #059669;
  }

  .scenario h4 { color: #e11d48; }
  .action h4 { color: #3b82f6; }
  .outcome h4 { color: #059669; }

  .case-study h4 {
    margin-bottom: 0.75rem;
    font-size: 1rem;
  }

  .case-study p {
    color: #4b5563;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .connections-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .connection-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 0.5rem;
    border: 1px solid rgba(30, 41, 59, 0.2);
  }

  .connection-icon {
    font-size: 1.5rem;
  }

  .connection-item strong {
    color: #1e293b;
  }

  @media (max-width: 768px) {
    .preview-section {
      padding: 1.5rem;
    }
    
    .key-innovations,
    .threat-tiers,
    .pillars-grid,
    .spiral-stages,
    .safeguards-grid,
    .funding-breakdown,
    .case-study {
      grid-template-columns: 1fr;
    }
    
    .connections-grid {
      grid-template-columns: 1fr;
    }
    
    .phase-item {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
