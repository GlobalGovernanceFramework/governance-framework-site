<!-- src/routes/frameworks/synthetic-biology-and-biotech-governance/+page.svelte -->
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
    <!-- Synthetic Biology & Biotech Governance Framework Coming Soon Card -->
    <FrameworkComingSoon 
      frameworkName="synbio"
      icon="🧬"
      expectedQuarter="Q3 2025"
      themeColors={{
        primary: '#8b5cf6',
        secondary: '#a78bfa', 
        accent: '#06b6d4',
        light: '#faf5ff'
      }}
      contactEmail="globalgovernanceframeworks@gmail.com"
    />

    <!-- Additional Content Section -->
    <div class="framework-preview">
      <div class="preview-section">
        <h2>🔬 Engineering Life Responsibly</h2>
        <p>
          Synthetic biology and advanced biotechnology hold immense promise for addressing climate change, disease, and resource scarcity. But they also pose unprecedented risks and ethical challenges. Our framework ensures these powerful technologies serve humanity and nature while respecting the sacred complexity of life itself.
        </p>
        
        <div class="key-innovations">
          <div class="innovation-card">
            <div class="innovation-icon">🛡️</div>
            <h3>Biosafety by Design</h3>
            <p>Mandatory safety protocols, containment systems, and kill switches for all engineered organisms, with real-time monitoring networks.</p>
          </div>
          
          <div class="innovation-card">
            <div class="innovation-icon">🌍</div>
            <h3>Global Access Equity</h3>
            <p>Ensuring life-saving biotechnology reaches everyone, not just wealthy nations, with compulsory licensing and technology transfer mechanisms.</p>
          </div>
          
          <div class="innovation-card">
            <div class="innovation-icon">⚖️</div>
            <h3>Rights of Nature Integration</h3>
            <p>All bioengineering projects must demonstrate respect for ecosystem integrity and obtain consent from affected natural communities.</p>
          </div>
          
          <div class="innovation-card">
            <div class="innovation-icon">🏛️</div>
            <h3>Democratic Oversight</h3>
            <p>Citizen assemblies and Indigenous councils have veto power over high-risk research, ensuring public participation in life-altering decisions.</p>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <h2>🧪 Key Governance Areas</h2>
        <div class="governance-areas">
          <div class="area-card">
            <h4>🦠 Engineered Pathogens & Biosecurity</h4>
            <p>Preventing bioweapons development while enabling medical research through international monitoring and dual-use oversight.</p>
          </div>
          
          <div class="area-card">
            <h4>🌾 Agricultural Biotechnology</h4>
            <p>Governing GMOs, gene drives, and engineered crops with farmer sovereignty, seed commons protection, and ecological impact assessment.</p>
          </div>
          
          <div class="area-card">
            <h4>🧑‍⚕️ Human Enhancement & Therapeutics</h4>
            <p>Balancing medical breakthroughs with equity, consent, and human dignity in gene therapy, longevity research, and enhancement technologies.</p>
          </div>
          
          <div class="area-card">
            <h4>🏭 Industrial Biotechnology</h4>
            <p>Scaling bio-based manufacturing while protecting workers, communities, and ecosystems from novel biological risks.</p>
          </div>
          
          <div class="area-card">
            <h4>🧠 Neural Interface Technology</h4>
            <p>Governing brain-computer interfaces and neural enhancement with cognitive liberty, privacy, and mental autonomy protections.</p>
          </div>
          
          <div class="area-card">
            <h4>🌊 Environmental Applications</h4>
            <p>Regulating pollution cleanup, carbon capture organisms, and ecosystem restoration biotechnology with precautionary principles.</p>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <h2>🔄 Implementation Philosophy</h2>
        <div class="philosophy-points">
          <div class="point">
            <span class="point-icon">🎯</span>
            <div>
              <strong>Precautionary Governance:</strong> High-risk research requires extensive safety testing, public consultation, and reversibility mechanisms before deployment.
            </div>
          </div>
          
          <div class="point">
            <span class="point-icon">🤝</span>
            <div>
              <strong>Inclusive Innovation:</strong> Communities most affected by biotechnology have meaningful participation in research priorities and regulatory decisions.
            </div>
          </div>
          
          <div class="point">
            <span class="point-icon">🌱</span>
            <div>
              <strong>Regenerative Applications:</strong> Prioritizing biotechnology that heals ecosystems, restores biodiversity, and supports planetary health.
            </div>
          </div>
          
          <div class="point">
            <span class="point-icon">📚</span>
            <div>
              <strong>Open Knowledge Commons:</strong> Essential research and safety data shared globally while respecting Indigenous knowledge sovereignty.
            </div>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <h2>⚡ Emerging Challenges</h2>
        <p>This framework addresses cutting-edge challenges at the intersection of biology, technology, and society:</p>
        
        <div class="challenges-grid">
          <div class="challenge-item">
            <span class="challenge-icon">🤖</span>
            <strong>AI-Designed Organisms</strong> - Governing autonomous biological design systems
          </div>
          <div class="challenge-item">
            <span class="challenge-icon">🧬</span>
            <strong>Gene Drives in Wild Populations</strong> - Managing ecosystem-scale genetic modifications
          </div>
          <div class="challenge-item">
            <span class="challenge-icon">⏰</span>
            <strong>Longevity & Life Extension</strong> - Addressing social equity in enhanced human lifespans
          </div>
          <div class="challenge-item">
            <span class="challenge-icon">🌾</span>
            <strong>Biopiracy Prevention</strong> - Protecting traditional knowledge and genetic resources
          </div>
          <div class="challenge-item">
            <span class="challenge-icon">🛡️</span>
            <strong>Biosafety Verification</strong> - Real-time monitoring of engineered organisms in the wild
          </div>
          <div class="challenge-item">
            <span class="challenge-icon">💊</span>
            <strong>Global Health Equity</strong> - Ensuring biotech benefits reach marginalized communities
          </div>
        </div>
      </div>

      <div class="preview-section">
        <h2>🔗 Framework Connections</h2>
        <p>Synthetic Biology & Biotech Governance integrates with other frameworks:</p>
        <div class="connections-grid">
          <div class="connection-item">
            <span class="connection-icon">⚖️</span>
            <strong>Treaty for Our Only Home</strong> - Legal foundation for planetary boundary compliance
          </div>
          <div class="connection-item">
            <span class="connection-icon">🪶</span>
            <strong>Indigenous Governance</strong> - FPIC for genetic resources and traditional knowledge
          </div>
          <div class="connection-item">
            <span class="connection-icon">🤖</span>
            <strong>Technology Governance</strong> - AI oversight and dual-use technology coordination
          </div>
          <div class="connection-item">
            <span class="connection-icon">⚕️</span>
            <strong>Global Health</strong> - Pandemic prevention and medical access equity
          </div>
          <div class="connection-item">
            <span class="connection-icon">🌱</span>
            <strong>Food Systems</strong> - Agricultural biotechnology and seed sovereignty
          </div>
          <div class="connection-item">
            <span class="connection-icon">⚠️</span>
            <strong>Existential Risk</strong> - Biorisks and civilization-scale threat prevention
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
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(167, 139, 250, 0.05) 100%);
    border-radius: 1rem;
    border-left: 4px solid #8b5cf6;
  }

  .preview-section h2 {
    color: #8b5cf6;
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
    box-shadow: 0 4px 6px rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.2);
  }

  .innovation-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .innovation-card h3 {
    color: #8b5cf6;
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
  }

  .innovation-card p {
    color: #4b5563;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .governance-areas {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .area-card {
    background: rgba(255, 255, 255, 0.7);
    padding: 1.5rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(139, 92, 246, 0.2);
  }

  .area-card h4 {
    color: #8b5cf6;
    margin-bottom: 0.75rem;
    font-size: 1.05rem;
  }

  .area-card p {
    color: #4b5563;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .philosophy-points {
    margin-top: 1.5rem;
  }

  .point {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 0.5rem;
  }

  .point-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  .point strong {
    color: #8b5cf6;
  }

  .challenges-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .challenge-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 0.5rem;
    border: 1px solid rgba(139, 92, 246, 0.2);
  }

  .challenge-icon {
    font-size: 1.5rem;
  }

  .challenge-item strong {
    color: #8b5cf6;
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
    border: 1px solid rgba(139, 92, 246, 0.2);
  }

  .connection-icon {
    font-size: 1.5rem;
  }

  .connection-item strong {
    color: #8b5cf6;
  }

  @media (max-width: 768px) {
    .preview-section {
      padding: 1.5rem;
    }
    
    .key-innovations {
      grid-template-columns: 1fr;
    }
    
    .governance-areas {
      grid-template-columns: 1fr;
    }
    
    .challenges-grid,
    .connections-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
