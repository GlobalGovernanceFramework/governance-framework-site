<!-- src/routes/frameworks/synoptic-protocol/+page.svelte -->
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

<svelte:head>
  <title>The Synoptic Protocol: Media & Epistemic Integrity | Global Governance Framework</title>
  <meta name="description" content="A global framework for media and epistemic integrity that fosters truth-seeking, perspectival agility, and collective wisdom while protecting citizens from epistemic threats." />
  <meta name="keywords" content="media integrity, epistemic security, disinformation, digital literacy, truth-seeking, democratic discourse, information ecosystem" />
</svelte:head>

<div class="documentation-container">
  <FrameworkSidebar />

  <div class="content">
    <!-- Synoptic Protocol Coming Soon Card -->
    <FrameworkComingSoon 
      frameworkName="synoptic"
      icon="👁️"
      expectedQuarter="Q3 2025"
      themeColors={{
        primary: '#1e40af',
        secondary: '#3b82f6', 
        accent: '#f59e0b',
        light: '#eff6ff'
      }}
      contactEmail="globalgovernanceframework@gmail.com"
      frameworksPageUrl="{base}/frameworks"
    />

    <!-- Additional Context Section -->
    <div class="context-section">
      <h2>🌐 Why Epistemic Integrity Matters</h2>
      <div class="context-grid">
        <div class="context-card">
          <h3>🎯 The Epistemic Crisis</h3>
          <p>In an era where reality itself is contested, our greatest vulnerability is not a lack of information, but a failure of knowing. When our shared understanding fractures, so does our ability to solve any other problem.</p>
        </div>
        
        <div class="context-card">
          <h3>⚖️ Universal Right to Reality</h3>
          <p>Every human being has a right to an information ecosystem free from systemic, malicious manipulation and reality-collapsing threats, enforceable by the Digital Justice Tribunal.</p>
        </div>
        
        <div class="context-card">
          <h3>🧠 Epistemic Virtues</h3>
          <p>Cultivating curiosity (genuine desire to understand), intellectual humility (joy of discovering one is wrong), and good faith (default assumption that others are partners in truth-seeking).</p>
        </div>
        
        <div class="context-card">
          <h3>🌍 Global Coordination</h3>
          <p>Coordinated international cooperation through the Treaty for Our Only Home, with specific roles for UNESCO, UNDP, ITU, and regional organizations (EU, AU, ASEAN).</p>
        </div>
      </div>
    </div>

    <!-- Threat Classification Preview -->
    <div class="threats-section">
      <h2>🚨 Epistemic Threat Classification</h2>
      <div class="threat-tiers">
        <div class="threat-tier tier-0">
          <h4>Tier 0: Existential Epistemic Threats</h4>
          <p>AI-generated content, deepfakes, and technologies that could fundamentally undermine shared truth</p>
        </div>
        
        <div class="threat-tier tier-1">
          <h4>Tier 1: Systemic Epistemic Warfare</h4>
          <p>State-sponsored campaigns designed to destabilize societies and cripple governance</p>
        </div>
        
        <div class="threat-tier tier-2">
          <h4>Tier 2: Coordinated Malicious Disinformation</h4>
          <p>Large-scale campaigns for political or commercial manipulation</p>
        </div>
        
        <div class="threat-tier tier-3">
          <h4>Tier 3: Algorithmic & Structural Distortions</h4>
          <p>Platform design promoting polarization and epistemic bubbles</p>
        </div>
      </div>
    </div>

    <!-- Implementation Preview -->
    <div class="implementation-section">
      <h2>🚀 Implementation Roadmap Preview</h2>
      <div class="timeline-preview">
        <div class="timeline-item">
          <div class="timeline-marker phase-1"></div>
          <div class="timeline-content">
            <h4>Phase 1 (Years 1-2)</h4>
            <p>Pilot programs in 10 regions, establish Global Council for Epistemic Integrity, baseline assessments</p>
          </div>
        </div>
        
        <div class="timeline-item">
          <div class="timeline-marker phase-2"></div>
          <div class="timeline-content">
            <h4>Phase 2 (Years 3-7)</h4>
            <p>Scale to 50 regions, launch Epistemic Institutions, achieve 50% improvement in critical thinking</p>
          </div>
        </div>
        
        <div class="timeline-item">
          <div class="timeline-marker phase-3"></div>
          <div class="timeline-content">
            <h4>Phase 3 (Years 8-15)</h4>
            <p>Global integration, 100+ chartered institutions, full Digital Justice Tribunal operation</p>
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

  /* Context Section */
  .context-section {
    margin: 3rem 0;
    padding: 2rem;
    background: linear-gradient(135deg, rgba(30, 64, 175, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%);
    border-radius: 1rem;
    border: 1px solid rgba(30, 64, 175, 0.1);
  }

  .context-section h2 {
    color: #1e40af;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }

  .context-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .context-card {
    background: white;
    padding: 1.5rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(30, 64, 175, 0.1);
    box-shadow: 0 2px 8px rgba(30, 64, 175, 0.1);
  }

  .context-card h3 {
    color: #1e40af;
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
  }

  .context-card p {
    color: #4b5563;
    line-height: 1.6;
    margin: 0;
  }

  /* Threats Section */
  .threats-section {
    margin: 3rem 0;
    padding: 2rem;
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(248, 113, 113, 0.05) 100%);
    border-radius: 1rem;
    border: 1px solid rgba(239, 68, 68, 0.1);
  }

  .threats-section h2 {
    color: #dc2626;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }

  .threat-tiers {
    display: grid;
    gap: 1rem;
  }

  .threat-tier {
    padding: 1.25rem;
    border-radius: 0.75rem;
    border-left: 4px solid;
  }

  .tier-0 {
    background: rgba(239, 68, 68, 0.1);
    border-left-color: #dc2626;
  }

  .tier-1 {
    background: rgba(245, 101, 101, 0.1);
    border-left-color: #ef4444;
  }

  .tier-2 {
    background: rgba(251, 146, 60, 0.1);
    border-left-color: #f97316;
  }

  .tier-3 {
    background: rgba(251, 191, 36, 0.1);
    border-left-color: #f59e0b;
  }

  .threat-tier h4 {
    margin: 0 0 0.5rem 0;
    color: #374151;
    font-size: 1rem;
  }

  .threat-tier p {
    margin: 0;
    color: #6b7280;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  /* Implementation Section */
  .implementation-section {
    margin: 3rem 0;
    padding: 2rem;
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(52, 211, 153, 0.05) 100%);
    border-radius: 1rem;
    border: 1px solid rgba(16, 185, 129, 0.1);
  }

  .implementation-section h2 {
    color: #059669;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }

  .timeline-preview {
    display: grid;
    gap: 1.5rem;
  }

  .timeline-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }

  .timeline-marker {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 0.25rem;
  }

  .phase-1 {
    background-color: #059669;
  }

  .phase-2 {
    background-color: #0891b2;
  }

  .phase-3 {
    background-color: #7c3aed;
  }

  .timeline-content h4 {
    margin: 0 0 0.5rem 0;
    color: #374151;
    font-size: 1.1rem;
  }

  .timeline-content p {
    margin: 0;
    color: #6b7280;
    line-height: 1.6;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .context-grid {
      grid-template-columns: 1fr;
    }
    
    .context-section,
    .threats-section,
    .implementation-section {
      padding: 1.5rem;
      margin: 2rem 0;
    }
    
    .timeline-item {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  }
</style>
