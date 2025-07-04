<!-- src/routes/frameworks/adaptive-universal-basic-income/+page.svelte -->
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
    <!-- Adaptive Universal Basic Income Framework Coming Soon Card -->
    <FrameworkComingSoon 
      frameworkName="aubi"
      icon="💰"
      expectedQuarter="Q1 2025"
      themeColors={{
        primary: '#059669',
        secondary: '#10b981', 
        accent: '#f59e0b',
        light: '#f0fdf4'
      }}
      contactEmail="globalgovernanceframeworks@gmail.com"
    />

    <!-- Additional Content Section -->
    <div class="framework-preview">
      <div class="preview-section">
        <h2>💚 Right Relationship Through Economic Security</h2>
        <p>
          AUBI transforms traditional Universal Basic Income into a living system for enacting the Treaty for Our Only Home's social promises. Guided by Indigenous wisdom and the principle of Right Relationship, it channels Hearts and Leaves currencies to nurture human flourishing, ecological restoration, and cultural vitality.
        </p>
        
        <div class="key-innovations">
          <div class="innovation-card">
            <div class="innovation-icon">🌱</div>
            <h3>Hearts & Leaves Economy</h3>
            <p>Dual-currency system where Hearts reward care and community contributions, while Leaves fund ecological restoration projects.</p>
          </div>
          
          <div class="innovation-card">
            <div class="innovation-icon">🪶</div>
            <h3>Indigenous-Guided Governance</h3>
            <p>Social Resilience Council with 40% Indigenous representation, FPIC 2.0 protocols, and Earth Council veto power over harmful policies.</p>
          </div>
          
          <div class="innovation-card">
            <div class="innovation-icon">📊</div>
            <h3>Love, Meaning & Connection Index</h3>
            <p>Replaces GDP with metrics measuring care relationships, cultural preservation, and human-land connections guided by Indigenous philosophy.</p>
          </div>
          
          <div class="innovation-card">
            <div class="innovation-icon">🔄</div>
            <h3>Four-Layer Adaptive System</h3>
            <p>From relational wealth (Layer 0) to universal baseline, contribution bonuses, and equity supplements, all rooted in Right Relationship.</p>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <h2>🏛️ AUBI vs Traditional UBI</h2>
        <div class="comparison-table">
          <div class="comparison-row header">
            <div class="comparison-item">Feature</div>
            <div class="comparison-item">Traditional UBI</div>
            <div class="comparison-item">Adaptive UBI (AUBI)</div>
          </div>
          <div class="comparison-row">
            <div class="comparison-item"><strong>Philosophy</strong></div>
            <div class="comparison-item">Welfare supplement</div>
            <div class="comparison-item">Expression of Right Relationship and Treaty social contract</div>
          </div>
          <div class="comparison-row">
            <div class="comparison-item"><strong>Payout</strong></div>
            <div class="comparison-item">Fixed fiat currency</div>
            <div class="comparison-item">Hybrid fiat/Hearts baseline, dynamic bonuses, Leaves for ecology</div>
          </div>
          <div class="comparison-row">
            <div class="comparison-item"><strong>Metrics</strong></div>
            <div class="comparison-item">Poverty reduction</div>
            <div class="comparison-item">LMCI (Right Relationship, care, ecology, culture)</div>
          </div>
          <div class="comparison-row">
            <div class="comparison-item"><strong>Governance</strong></div>
            <div class="comparison-item">State-based</div>
            <div class="comparison-item">Social Resilience Council under Meta-Governance, Earth Council veto</div>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <h2>🌍 Four-Layer Payout Architecture</h2>
        <div class="layers-timeline">
          <div class="layer-item">
            <div class="layer-marker">0</div>
            <div class="layer-content">
              <h4>Relational Wealth (Philosophical Foundation)</h4>
              <p>Honors unmonetized contributions through Gratitude Tokens, ceremonial recognition, and Indigenous gift economy principles</p>
            </div>
          </div>
          
          <div class="layer-item">
            <div class="layer-marker">1</div>
            <div class="layer-content">
              <h4>Universal Baseline (Hybrid Fiat/Hearts)</h4>
              <p>Ensures dignity with 70% fiat, 30% Hearts covering housing, food, utilities, transport, and healthcare for all adults 18+</p>
            </div>
          </div>
          
          <div class="layer-item">
            <div class="layer-marker">2</div>
            <div class="layer-content">
              <h4>Contribution & Development Bonus</h4>
              <p>Rewards care, cultural preservation, and ecological work with Hearts and Leaves, verified through Love Ledger</p>
            </div>
          </div>
          
          <div class="layer-item">
            <div class="layer-marker">3</div>
            <div class="layer-content">
              <h4>Equity & Needs-Based Bonus</h4>
              <p>Treaty reparations for historical injustices, health/disability support, and geographic equity, paid in Hearts</p>
            </div>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <h2>📈 Love, Meaning & Connection Index (LMCI)</h2>
        <p>AUBI's success is measured through LMCI, rooted in Right Relationship and Indigenous wisdom:</p>
        <div class="lmci-components">
          <div class="lmci-card">
            <div class="lmci-icon">💝</div>
            <h4>Love (Care & Relationships)</h4>
            <p>Care hours, mentorship, social cohesion, conflict resolution - all validated by communities through the Love Ledger</p>
          </div>
          
          <div class="lmci-card">
            <div class="lmci-icon">🎯</div>
            <h4>Meaning (Purpose & Growth)</h4>
            <p>Cultural preservation, knowledge sharing, spiritual flourishing, and intergenerational wisdom transfer</p>
          </div>
          
          <div class="lmci-card">
            <div class="lmci-icon">🌿</div>
            <h4>Connection (Human-Land Harmony)</h4>
            <p>Ecological stewardship, sacred site health, community storytelling, and regenerative land practices</p>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <h2>🔄 Implementation Pathway</h2>
        <div class="implementation-steps">
          <div class="step-card">
            <h4>🌱 Year 1: Foundation</h4>
            <ul>
              <li>Launch pilots in Indigenous-led Bioregional Autonomous Zones</li>
              <li>Deploy Hyperledger Fabric and Love Ledger beta</li>
              <li>Train 500 Flourishing Guides in Right Relationship principles</li>
            </ul>
          </div>
          
          <div class="step-card">
            <h4>💚 Year 2: Integration</h4>
            <ul>
              <li>Launch Hearts/Leaves currencies with Treaty integration</li>
              <li>Validate LMCI metrics with Indigenous communities</li>
              <li>Scale to 2,000 trained guides across pilot regions</li>
            </ul>
          </div>
          
          <div class="step-card">
            <h4>🌍 Year 3: Expansion</h4>
            <ul>
              <li>DeFi integration for Hearts/Leaves lending markets</li>
              <li>Indigenous-led AI governance systems</li>
              <li>Scale to 10,000+ guides globally</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <h2>🗺️ Pilot Site Selection</h2>
        <p>Priority regions selected based on cultural representation, Indigenous presence, and readiness:</p>
        <div class="pilot-sites">
          <div class="site-card">
            <div class="site-score">80/100</div>
            <h4>🍁 Indigenous Canada</h4>
            <p>Nation-to-nation AUBI with ceremonial governance and Leaves for land stewardship</p>
          </div>
          
          <div class="site-card">
            <div class="site-score">92/100</div>
            <h4>🇸🇪 Urban Sweden</h4>
            <p>Digital integration with Hearts supporting the care economy and elder wisdom programs</p>
          </div>
          
          <div class="site-card">
            <div class="site-score">78/100</div>
            <h4>🇰🇪 Rural Kenya</h4>
            <p>Mobile money integration with Ubuntu-based validation and community care networks</p>
          </div>
          
          <div class="site-card">
            <div class="site-score">76/100</div>
            <h4>🇧🇩 Bangladesh</h4>
            <p>Climate adaptation bonuses and women's empowerment through Hearts economy</p>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <h2>🔗 Framework Connections</h2>
        <p>AUBI integrates with other frameworks as the Treaty's social delivery mechanism:</p>
        <div class="connections-grid">
          <div class="connection-item">
            <span class="connection-icon">⚖️</span>
            <strong>Treaty for Our Only Home</strong> - Primary delivery mechanism for social contract promises
          </div>
          <div class="connection-item">
            <span class="connection-icon">🪶</span>
            <strong>Indigenous Governance</strong> - FPIC 2.0, Red Lines Clause, and ceremonial governance
          </div>
          <div class="connection-item">
            <span class="connection-icon">💚</span>
            <strong>Financial Systems</strong> - Hearts/Leaves currency integration and DeFi markets
          </div>
          <div class="connection-item">
            <span class="connection-icon">🧠</span>
            <strong>Meta-Governance</strong> - Social Resilience Council coordination and reflexivity engines
          </div>
          <div class="connection-item">
            <span class="connection-icon">🌱</span>
            <strong>Environmental Stewardship</strong> - Leaves funding for ecological restoration
          </div>
          <div class="connection-item">
            <span class="connection-icon">🎓</span>
            <strong>Educational Systems</strong> - Cultural preservation and knowledge sharing rewards
          </div>
        </div>
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
    background: linear-gradient(135deg, rgba(5, 150, 105, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%);
    border-radius: 1rem;
    border-left: 4px solid #059669;
  }

  .preview-section h2 {
    color: #059669;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
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
    box-shadow: 0 4px 6px rgba(5, 150, 105, 0.1);
    border: 1px solid rgba(5, 150, 105, 0.2);
  }

  .innovation-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .innovation-card h3 {
    color: #059669;
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
  }

  .innovation-card p {
    color: #4b5563;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .comparison-table {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 0.75rem;
    overflow: hidden;
    margin-top: 1.5rem;
  }

  .comparison-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1px;
    background: rgba(5, 150, 105, 0.1);
  }

  .comparison-row.header {
    background: #059669;
  }

  .comparison-row.header .comparison-item {
    background: #059669;
    color: white;
    font-weight: bold;
  }

  .comparison-item {
    padding: 1rem;
    background: white;
    font-size: 0.9rem;
  }

  .layers-timeline {
    margin-top: 1.5rem;
  }

  .layer-item {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .layer-marker {
    background: #059669;
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

  .layer-content h4 {
    color: #059669;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }

  .layer-content p {
    color: #4b5563;
    line-height: 1.6;
  }

  .lmci-components {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .lmci-card {
    background: rgba(255, 255, 255, 0.7);
    padding: 1.5rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(5, 150, 105, 0.2);
    text-align: center;
  }

  .lmci-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .lmci-card h4 {
    color: #059669;
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
  }

  .lmci-card p {
    color: #4b5563;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .implementation-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .step-card {
    background: rgba(255, 255, 255, 0.7);
    padding: 1.5rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(5, 150, 105, 0.2);
  }

  .step-card h4 {
    color: #059669;
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }

  .step-card ul {
    list-style: none;
    padding: 0;
  }

  .step-card li {
    color: #4b5563;
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 0.5rem;
    padding-left: 1rem;
    position: relative;
  }

  .step-card li::before {
    content: "•";
    color: #059669;
    position: absolute;
    left: 0;
  }

  .pilot-sites {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .site-card {
    background: rgba(255, 255, 255, 0.7);
    padding: 1.5rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(5, 150, 105, 0.2);
    position: relative;
  }

  .site-score {
    position: absolute;
    top: -10px;
    right: 15px;
    background: #059669;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: bold;
  }

  .site-card h4 {
    color: #059669;
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
  }

  .site-card p {
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
    border: 1px solid rgba(5, 150, 105, 0.2);
  }

  .connection-icon {
    font-size: 1.5rem;
  }

  .connection-item strong {
    color: #059669;
  }

  @media (max-width: 768px) {
    .preview-section {
      padding: 1.5rem;
    }
    
    .key-innovations,
    .lmci-components,
    .implementation-steps,
    .pilot-sites {
      grid-template-columns: 1fr;
    }
    
    .connections-grid {
      grid-template-columns: 1fr;
    }
    
    .comparison-row {
      grid-template-columns: 1fr;
    }
    
    .comparison-row.header .comparison-item:nth-child(1) {
      display: none;
    }
    
    .layer-item {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
