<!-- src/routes/frameworks/docs/implementation/regenerative-journeys/+page.svelte -->
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

  // Custom features for this specific framework
  const customFeatures = [
    "BAZ Tourism Councils with Indigenous leadership and community veto power",
    "Guest Hearts currency for certified regenerative businesses and restoration projects", 
    "Climate-adaptive infrastructure serving tourists and climate migrants",
    "Sacred Journey Protocols with FPIC 2.0 and anti-commodification safeguards",
    "Tourism Impact Assessments measuring cultural continuity and seven-generation impacts",
    "Dynamic Tourism Levy funding ecosystem restoration and community healing",
    "Climate Migration Integration with diaspora tourism and managed retreat protocols",
    "Decolonization Scorecard tracking land rematriation and Indigenous sovereignty"
  ];
</script>

<svelte:head>
  <title>{data.meta?.title || 'The Regenerative Journeys Framework - Coming Soon'}</title>
  <meta name="description" content={data.meta?.description || 'Revolutionary framework transforming tourism from extractive practice to sacred exchange.'} />
  <meta name="keywords" content={data.meta?.keywords || 'regenerative tourism, Indigenous sovereignty, bioregional governance'} />
</svelte:head>

<div class="documentation-container">
  <FrameworkSidebar />

  <div class="content">
    <!-- Hero Section with Context -->
    <div class="hero-section">
      <div class="framework-context">
        <div class="tier-badge">
          <span class="tier-icon">🤝</span>
          <span class="tier-text">Tier 3: Equity & Cultural Flourishing</span>
        </div>
        <div class="connections">
          <span class="connection-tag">🌍 Mobility Commons</span>
          <span class="connection-tag">🪶 Indigenous Framework</span>
          <span class="connection-tag">💚 Planetary Health</span>
          <span class="connection-tag">💰 AUBI Hearts/Leaves</span>
        </div>
      </div>
    </div>

    <!-- Main Coming Soon Component -->
    <FrameworkComingSoon 
      frameworkName="regenerativeJourneys"
      icon="✨"
      expectedQuarter="Q1 2026"
      features={customFeatures}
      themeColors={{
        primary: '#dc2626',
        secondary: '#ef4444', 
        accent: '#f59e0b',
        light: '#fef2f2'
      }}
      contactEmail="regenerative-journeys@globalgovernanceframeworks.org"
    />

    <!-- Additional Context Section -->
    <div class="framework-details">
      <div class="detail-card">
        <h3>🌍 Framework Position</h3>
        <p>As a <strong>Tier 3 framework</strong>, Regenerative Journeys governs global tourism by leveraging The Mobility Commons (Tier 2) for infrastructure, adhering to the Planetary Health Framework for ecological standards, and using the AUBI Framework for economic tools like Guest Hearts currency.</p>
      </div>

      <div class="detail-card">
        <h3>🏛️ Five Pillars Design</h3>
        <div class="pillars-grid">
          <div class="pillar">
            <span class="pillar-icon">🏛️</span>
            <h4>Governance Layer</h4>
            <p>BAZ Tourism Councils with Indigenous leadership and community veto power</p>
          </div>
          <div class="pillar">
            <span class="pillar-icon">💰</span>
            <h4>Economic Layer</h4>
            <p>Guest Hearts system and Dynamic Tourism Levy for regenerative exchange</p>
          </div>
          <div class="pillar">
            <span class="pillar-icon">🏗️</span>
            <h4>Infrastructure</h4>
            <p>Climate-adaptive facilities serving tourists and climate migrants</p>
          </div>
          <div class="pillar">
            <span class="pillar-icon">🪶</span>
            <h4>Sacred Exchange</h4>
            <p>Cultural protocols protecting Indigenous sites and wisdom</p>
          </div>
          <div class="pillar">
            <span class="pillar-icon">📊</span>
            <h4>Accountability</h4>
            <p>Impact assessments and Decolonization Scorecard metrics</p>
          </div>
        </div>
      </div>

      <div class="detail-card">
        <h3>🔄 From Extractive to Regenerative</h3>
        <div class="transformation-comparison">
          <div class="before">
            <h4>❌ Extractive Tourism</h4>
            <ul>
              <li>Overtourism and community displacement</li>
              <li>Cultural commodification and sacred site exploitation</li>
              <li>Economic leakage to external corporations</li>
              <li>Environmental degradation and resource depletion</li>
            </ul>
          </div>
          <div class="after">
            <h4>✅ Regenerative Journeys</h4>
            <ul>
              <li>Community-controlled visitor limits and veto power</li>
              <li>Sacred protocols with FPIC 2.0 and anti-commodification</li>
              <li>60%+ local ownership and wealth concentration limits</li>
              <li>Net ecological healing and BHI improvement</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="detail-card">
        <h3>🌡️ Climate Integration</h3>
        <p>The framework addresses climate realities through <strong>Climate Migration Integration</strong> with diaspora tourism protocols, <strong>Managed Retreat Planning</strong> for vulnerable regions, and <strong>Climate-Adaptive Infrastructure</strong> that serves both tourists and displaced communities during crises.</p>
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

  /* Hero Section */
  .hero-section {
    margin-bottom: 1rem;
  }

  .framework-context {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .tier-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, #dc2626, #ef4444);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 2rem;
    font-weight: 600;
    width: fit-content;
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
  }

  .tier-icon {
    font-size: 1.2rem;
  }

  .connections {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .connection-tag {
    background: rgba(220, 38, 38, 0.1);
    color: #dc2626;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    border: 1px solid rgba(220, 38, 38, 0.2);
  }

  /* Framework Details */
  .framework-details {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .detail-card {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 16px rgba(220, 38, 38, 0.1);
    border: 1px solid rgba(220, 38, 38, 0.1);
  }

  .detail-card h3 {
    margin: 0 0 1rem 0;
    color: #dc2626;
    font-size: 1.3rem;
    font-weight: 700;
  }

  .detail-card p {
    color: #4b5563;
    line-height: 1.6;
    margin: 0;
  }

  /* Pillars Grid */
  .pillars-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
  }

  .pillar {
    text-align: center;
    padding: 1.5rem;
    background: rgba(220, 38, 38, 0.05);
    border-radius: 0.75rem;
    border: 1px solid rgba(220, 38, 38, 0.1);
  }

  .pillar-icon {
    font-size: 2rem;
    display: block;
    margin-bottom: 0.75rem;
  }

  .pillar h4 {
    margin: 0 0 0.5rem 0;
    color: #dc2626;
    font-size: 1rem;
    font-weight: 600;
  }

  .pillar p {
    margin: 0;
    font-size: 0.875rem;
    color: #6b7280;
    line-height: 1.4;
  }

  /* Transformation Comparison */
  .transformation-comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 1rem;
  }

  .before,
  .after {
    padding: 1.5rem;
    border-radius: 0.75rem;
  }

  .before {
    background: rgba(239, 68, 68, 0.05);
    border: 1px solid rgba(239, 68, 68, 0.2);
  }

  .after {
    background: rgba(34, 197, 94, 0.05);
    border: 1px solid rgba(34, 197, 94, 0.2);
  }

  .before h4 {
    color: #ef4444;
    margin: 0 0 1rem 0;
    font-size: 1.1rem;
  }

  .after h4 {
    color: #22c55e;
    margin: 0 0 1rem 0;
    font-size: 1.1rem;
  }

  .before ul,
  .after ul {
    margin: 0;
    padding-left: 1.5rem;
  }

  .before li,
  .after li {
    margin-bottom: 0.5rem;
    color: #4b5563;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    .transformation-comparison {
      grid-template-columns: 1fr;
    }
    
    .pillars-grid {
      grid-template-columns: 1fr;
    }
    
    .connections {
      justify-content: center;
    }
    
    .framework-context {
      align-items: center;
      text-align: center;
    }
  }
</style>
