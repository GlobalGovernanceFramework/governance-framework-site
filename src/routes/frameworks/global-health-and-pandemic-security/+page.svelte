<!-- src/routes/frameworks/global-health-and-pandemic-security/+page.svelte -->
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
    <!-- Global Health & Pandemic Security Framework Coming Soon Card -->
    <FrameworkComingSoon 
      frameworkName="globalHealth"
      icon="⚕️"
      expectedQuarter="Q3 2025"
      themeColors={{
        primary: '#0369a1',
        secondary: '#0284c7', 
        accent: '#06b6d4',
        light: '#f0f9ff'
      }}
      contactEmail="globalgovernanceframeworks@gmail.com"
    />

    <!-- Additional Content Section -->
    <div class="framework-preview">
      <div class="preview-section">
        <h2>🌍 Building Resilient Health Systems for All</h2>
        <p>
          The COVID-19 pandemic exposed critical gaps in global health preparedness and equity. Our framework addresses these challenges by strengthening health systems, ensuring equitable access to care, and building robust pandemic prevention mechanisms rooted in solidarity and scientific cooperation.
        </p>
        
        <div class="key-principles">
          <div class="principle-card">
            <div class="principle-icon">🤝</div>
            <h3>Health as a Human Right</h3>
            <p>Universal healthcare access regardless of geography, income, or citizenship status</p>
          </div>
          
          <div class="principle-card">
            <div class="principle-icon">🔬</div>
            <h3>Science-Based Prevention</h3>
            <p>Early warning systems and rapid response grounded in open research and data sharing</p>
          </div>
          
          <div class="principle-card">
            <div class="principle-icon">⚖️</div>
            <h3>Global Health Equity</h3>
            <p>Addressing systemic inequalities that make communities vulnerable to health crises</p>
          </div>
          
          <div class="principle-card">
            <div class="principle-icon">🌱</div>
            <h3>One Health Approach</h3>
            <p>Recognizing connections between human, animal, and environmental health</p>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <h2>🎯 Core Focus Areas</h2>
        <div class="focus-areas">
          <div class="focus-card prevention">
            <div class="focus-icon">🛡️</div>
            <h4>Pandemic Prevention & Preparedness</h4>
            <p>Early warning systems, rapid response protocols, and coordinated international action to prevent outbreaks from becoming pandemics</p>
            <ul>
              <li>Global pathogen surveillance networks</li>
              <li>Rapid vaccine and treatment development</li>
              <li>International health emergency protocols</li>
            </ul>
          </div>
          
          <div class="focus-card access">
            <div class="focus-icon">🏥</div>
            <h4>Universal Health Access</h4>
            <p>Ensuring everyone has access to quality healthcare services, from basic preventive care to emergency treatment and mental health support</p>
            <ul>
              <li>Community health worker networks</li>
              <li>Telemedicine and digital health tools</li>
              <li>Essential medicines and medical supplies</li>
            </ul>
          </div>
          
          <div class="focus-card systems">
            <div class="focus-icon">💪</div>
            <h4>Health System Strengthening</h4>
            <p>Building resilient healthcare infrastructure that can withstand crises while providing consistent, quality care to all populations</p>
            <ul>
              <li>Healthcare workforce development</li>
              <li>Supply chain resilience</li>
              <li>Health facility modernization</li>
            </ul>
          </div>
          
          <div class="focus-card research">
            <div class="focus-icon">🧬</div>
            <h4>Open Health Research</h4>
            <p>Collaborative research platforms that accelerate medical breakthroughs while ensuring knowledge remains accessible to all</p>
            <ul>
              <li>Open-source drug development</li>
              <li>Global health data commons</li>
              <li>Research capacity building</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <h2>🚨 Learning from COVID-19</h2>
        <p>The pandemic taught us valuable lessons about what works and what needs improvement:</p>
        <div class="lessons-grid">
          <div class="lesson-card success">
            <h4>✅ What Worked</h4>
            <ul>
              <li>Rapid vaccine development through global collaboration</li>
              <li>Community health measures when supported properly</li>
              <li>Digital health tools for remote care delivery</li>
              <li>Scientific cooperation and data sharing</li>
            </ul>
          </div>
          
          <div class="lesson-card challenge">
            <h4>⚠️ Critical Gaps</h4>
            <ul>
              <li>Massive inequalities in vaccine and treatment access</li>
              <li>Fragmented international coordination</li>
              <li>Weak health systems in many regions</li>
              <li>Insufficient investment in prevention</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <h2>🌐 Potential Implementation Approach</h2>
        <div class="implementation-areas">
          <div class="impl-card">
            <h4>🔬 Global Health Observatory</h4>
            <p>Enhanced surveillance and early warning systems that can detect and track emerging health threats in real-time</p>
          </div>
          
          <div class="impl-card">
            <h4>🏭 Medical Manufacturing Security</h4>
            <p>Distributed production networks ensuring rapid scaling of vaccines, treatments, and medical supplies during emergencies</p>
          </div>
          
          <div class="impl-card">
            <h4>💊 Global Medicine Access</h4>
            <p>Mechanisms to ensure essential medicines and vaccines reach all populations, not just wealthy countries</p>
          </div>
          
          <div class="impl-card">
            <h4>👩‍⚕️ Health Workforce Mobility</h4>
            <p>Coordination systems allowing health workers to rapidly deploy where needed most during crises</p>
          </div>
          
          <div class="impl-card">
            <h4>📊 Health Data Commons</h4>
            <p>Secure, interoperable systems for sharing health data while protecting individual privacy</p>
          </div>
          
          <div class="impl-card">
            <h4>🌍 Climate Health Adaptation</h4>
            <p>Preparing health systems for climate-related health impacts like extreme heat, vector-borne diseases, and displacement</p>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <h2>🤝 Building on Existing Efforts</h2>
        <p>This framework would complement and strengthen existing global health initiatives:</p>
        <div class="existing-efforts">
          <div class="effort-item">
            <span class="effort-icon">🏛️</span>
            <strong>WHO Reform</strong> - Supporting World Health Organization modernization
          </div>
          <div class="effort-item">
            <span class="effort-icon">💰</span>
            <strong>Pandemic Fund</strong> - Expanding resources for prevention and preparedness
          </div>
          <div class="effort-item">
            <span class="effort-icon">🔬</span>
            <strong>CEPI & GAVI</strong> - Strengthening vaccine development and distribution
          </div>
          <div class="effort-item">
            <span class="effort-icon">📊</span>
            <strong>Global Health Security</strong> - Building on existing surveillance networks
          </div>
          <div class="effort-item">
            <span class="effort-icon">🌍</span>
            <strong>One Health Networks</strong> - Integrating human, animal, and environmental health
          </div>
          <div class="effort-item">
            <span class="effort-icon">🏥</span>
            <strong>UHC 2030</strong> - Advancing universal health coverage goals
          </div>
        </div>
      </div>

      <div class="preview-section">
        <h2>💡 Innovation Opportunities</h2>
        <div class="innovation-areas">
          <div class="innovation-item">
            <div class="innovation-icon">🤖</div>
            <h4>AI-Powered Early Warning</h4>
            <p>Machine learning systems that can predict and track disease outbreaks from multiple data sources</p>
          </div>
          
          <div class="innovation-item">
            <div class="innovation-icon">🧬</div>
            <h4>Rapid Countermeasure Development</h4>
            <p>Platform technologies that can quickly develop vaccines and treatments for new pathogens</p>
          </div>
          
          <div class="innovation-item">
            <div class="innovation-icon">📱</div>
            <h4>Digital Health Equity</h4>
            <p>Mobile health tools that work in low-resource settings and support community health workers</p>
          </div>
          
          <div class="innovation-item">
            <div class="innovation-icon">🌐</div>
            <h4>Decentralized Manufacturing</h4>
            <p>Distributed production networks that can rapidly scale medical supplies during emergencies</p>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <h2>🔗 Framework Connections</h2>
        <p>Global Health & Pandemic Security integrates with other governance frameworks:</p>
        <div class="connections-grid">
          <div class="connection-item">
            <span class="connection-icon">⚖️</span>
            <strong>Treaty for Our Only Home</strong> - Legal frameworks for health emergency response
          </div>
          <div class="connection-item">
            <span class="connection-icon">🌱</span>
            <strong>Planetary Health</strong> - Addressing environmental health determinants
          </div>
          <div class="connection-item">
            <span class="connection-icon">🧬</span>
            <strong>Biotech Governance</strong> - Ethical oversight of health technology development
          </div>
          <div class="connection-item">
            <span class="connection-icon">🏛️</span>
            <strong>Justice Systems</strong> - Health rights enforcement and accountability
          </div>
          <div class="connection-item">
            <span class="connection-icon">💚</span>
            <strong>Economic Integration</strong> - Health system financing and sustainability
          </div>
          <div class="connection-item">
            <span class="connection-icon">🎓</span>
            <strong>Educational Systems</strong> - Health literacy and professional training
          </div>
        </div>
      </div>

      <div class="preview-section realistic-tone">
        <h2>⚖️ A Balanced Approach</h2>
        <p>
          We approach this framework with both hope and realism. Building effective global health governance is complex, requiring careful balance between national sovereignty and collective action, scientific rigor and rapid response, innovation and equity.
        </p>
        <p>
          Our goal is not to create another bureaucratic layer, but to strengthen coordination, fill critical gaps, and ensure that future health crises don't devastate communities the way COVID-19 has. We're committed to learning from existing efforts, supporting proven initiatives, and focusing on practical solutions that can make a real difference.
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
    background: linear-gradient(135deg, rgba(3, 105, 161, 0.05) 0%, rgba(2, 132, 199, 0.05) 100%);
    border-radius: 1rem;
    border-left: 4px solid #0369a1;
  }

  .preview-section.realistic-tone {
    background: linear-gradient(135deg, rgba(75, 85, 99, 0.05) 0%, rgba(107, 114, 128, 0.05) 100%);
    border-left-color: #6b7280;
  }

  .preview-section h2 {
    color: #0369a1;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }

  .realistic-tone h2 {
    color: #6b7280;
  }

  .key-principles {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .principle-card {
    background: white;
    padding: 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px rgba(3, 105, 161, 0.1);
    border: 1px solid rgba(3, 105, 161, 0.2);
  }

  .principle-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .principle-card h3 {
    color: #0369a1;
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
  }

  .principle-card p {
    color: #4b5563;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .focus-areas {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .focus-card {
    padding: 1.5rem;
    border-radius: 0.75rem;
    border: 2px solid;
    background: rgba(255, 255, 255, 0.7);
  }

  .focus-card.prevention {
    border-color: #059669;
    background: rgba(5, 150, 105, 0.05);
  }

  .focus-card.access {
    border-color: #dc2626;
    background: rgba(220, 38, 38, 0.05);
  }

  .focus-card.systems {
    border-color: #7c3aed;
    background: rgba(124, 58, 237, 0.05);
  }

  .focus-card.research {
    border-color: #ea580c;
    background: rgba(234, 88, 12, 0.05);
  }

  .focus-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .focus-card h4 {
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
  }

  .focus-card.prevention h4 { color: #059669; }
  .focus-card.access h4 { color: #dc2626; }
  .focus-card.systems h4 { color: #7c3aed; }
  .focus-card.research h4 { color: #ea580c; }

  .focus-card p {
    color: #4b5563;
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }

  .focus-card ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .focus-card li {
    color: #6b7280;
    font-size: 0.85rem;
    line-height: 1.4;
    margin-bottom: 0.5rem;
    padding-left: 1rem;
    position: relative;
  }

  .focus-card li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: inherit;
  }

  .lessons-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .lesson-card {
    padding: 1.5rem;
    border-radius: 0.75rem;
    background: rgba(255, 255, 255, 0.7);
  }

  .lesson-card.success {
    border: 2px solid #059669;
    background: rgba(5, 150, 105, 0.05);
  }

  .lesson-card.challenge {
    border: 2px solid #f59e0b;
    background: rgba(245, 158, 11, 0.05);
  }

  .lesson-card h4 {
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }

  .lesson-card.success h4 { color: #059669; }
  .lesson-card.challenge h4 { color: #d97706; }

  .lesson-card ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .lesson-card li {
    color: #4b5563;
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 0.75rem;
    padding-left: 1rem;
    position: relative;
  }

  .lesson-card li::before {
    content: "•";
    position: absolute;
    left: 0;
  }

  .implementation-areas {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .impl-card {
    background: rgba(255, 255, 255, 0.7);
    padding: 1.5rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(3, 105, 161, 0.2);
  }

  .impl-card h4 {
    color: #0369a1;
    margin-bottom: 0.75rem;
    font-size: 1rem;
  }

  .impl-card p {
    color: #4b5563;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .existing-efforts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .effort-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 0.5rem;
    border: 1px solid rgba(3, 105, 161, 0.2);
  }

  .effort-icon {
    font-size: 1.5rem;
  }

  .effort-item strong {
    color: #0369a1;
  }

  .innovation-areas {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .innovation-item {
    background: rgba(255, 255, 255, 0.7);
    padding: 1.5rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(3, 105, 161, 0.2);
    text-align: center;
  }

  .innovation-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .innovation-item h4 {
    color: #0369a1;
    margin-bottom: 0.75rem;
    font-size: 1rem;
  }

  .innovation-item p {
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
    border: 1px solid rgba(3, 105, 161, 0.2);
  }

  .connection-icon {
    font-size: 1.5rem;
  }

  .connection-item strong {
    color: #0369a1;
  }

  @media (max-width: 768px) {
    .preview-section {
      padding: 1.5rem;
    }
    
    .key-principles,
    .focus-areas,
    .lessons-grid,
    .implementation-areas,
    .innovation-areas {
      grid-template-columns: 1fr;
    }
    
    .existing-efforts,
    .connections-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
