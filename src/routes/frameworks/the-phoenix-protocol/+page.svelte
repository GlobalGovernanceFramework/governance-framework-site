<!-- src/routes/frameworks/the-phoenix-protocol/+page.svelte -->
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
    <!-- Phoenix Protocol Coming Soon Card -->
    <FrameworkComingSoon 
      frameworkName="phoenix"
      icon="♻️"
      expectedQuarter="Q2 2025"
      themeColors={{
        primary: '#dc2626',
        secondary: '#f97316', 
        accent: '#facc15',
        light: '#fef2f2'
      }}
      contactEmail="globalgovernanceframeworks@gmail.com"
    />

    <!-- Additional Content Section -->
    <div class="framework-preview">
      <div class="preview-section">
        <h2>🔥 From Linear Destruction to Circular Regeneration</h2>
        <p>
          The Phoenix Protocol transforms humanity's relationship with materials, eliminating the concept of "waste" through superior design and regenerative systems. Drawing from Indigenous circular practices like Māori whakapapa resource stewardship, it serves as the Material Reality operating system within the global governance ecosystem.
        </p>
        
        <div class="key-innovations">
          <div class="innovation-card">
            <div class="innovation-icon">📱</div>
            <h3>Global Materials Passport</h3>
            <p>Every product carries a verified digital identity showing its circularity metrics, toxicity levels, and ecosystem impact, powered by quantum-encrypted blockchain.</p>
          </div>
          
          <div class="innovation-card">
            <div class="innovation-icon">🔄</div>
            <h3>Reverse Supply Chains</h3>
            <p>Global Circular Logistics Network coordinates take-back systems, ensuring materials flow back to producers for continuous regeneration cycles.</p>
          </div>
          
          <div class="innovation-card">
            <div class="innovation-icon">💰</div>
            <h3>Circular Finance Revolution</h3>
            <p>Virgin Material Tax and Circularity Bonds create economic incentives for regenerative design while funding the transition to waste-free systems.</p>
          </div>
          
          <div class="innovation-card">
            <div class="innovation-icon">🌱</div>
            <h3>Bioregional Metabolism</h3>
            <p>Community composting programs transform organic waste into soil nutrients, rewarded through Hearts and Leaves currencies in the Love Ledger.</p>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <h2>🗂️ Material Categorization System</h2>
        <div class="material-categories">
          <div class="category-card biological">
            <div class="category-icon">🌿</div>
            <h4>Biological Nutrients</h4>
            <p>Organic materials safely composted to enrich soil and support carbon sequestration</p>
            <div class="examples">Food scraps, natural fibers, compostable bioplastics</div>
          </div>
          
          <div class="category-card technical">
            <div class="category-icon">⚙️</div>
            <h4>Technical Nutrients</h4>
            <p>Synthetic materials designed for high-quality, closed-loop recycling</p>
            <div class="examples">Metals, pure polymers, glass, battery materials</div>
          </div>
          
          <div class="category-card transitional">
            <div class="category-icon">🔄</div>
            <h4>Transitional Materials</h4>
            <p>Non-toxic materials not yet circular but recyclable with limitations</p>
            <div class="examples">Mixed plastics, composite materials under R&D</div>
          </div>
          
          <div class="category-card monstrous">
            <div class="category-icon">☠️</div>
            <h4>Monstrous Hybrids</h4>
            <p>Toxic or complex materials targeted for complete elimination by 2040</p>
            <div class="examples">PVC plastic, multi-laminate packaging, PFAS products</div>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <h2>🏛️ Five Core Pillars</h2>
        <div class="pillars-grid">
          <div class="pillar-card">
            <div class="pillar-number">1</div>
            <h4>Universal Design & Material Standards</h4>
            <p>Global Materials Council enforces Design for Disassembly, Right to Repair, and biomimetic design principles</p>
          </div>
          
          <div class="pillar-card">
            <div class="pillar-number">2</div>
            <h4>Global Logistics & Reverse Supply Chains</h4>
            <p>Circular Logistics Network coordinates take-back systems with community-led reverse hubs and living wages</p>
          </div>
          
          <div class="pillar-card">
            <div class="pillar-number">3</div>
            <h4>Circular Finance & Economic Incentives</h4>
            <p>Virgin Material Tax and Circularity Bonds fund the transition while supporting Global South infrastructure</p>
          </div>
          
          <div class="pillar-card">
            <div class="pillar-number">4</div>
            <h4>Bioregional Metabolism & Community Composting</h4>
            <p>Community Work Teams manage organic waste streams, earning Hearts and Leaves through the Love Ledger</p>
          </div>
          
          <div class="pillar-card">
            <div class="pillar-number">5</div>
            <h4>Detoxification & Phase-Out Protocol</h4>
            <p>Systematic elimination of Monstrous Hybrids with 80% reduction by 2040 and cosmic circularity principles</p>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <h2>📊 Material Passport Scorecard</h2>
        <p>Every product receives a comprehensive evaluation across multiple dimensions:</p>
        <div class="scorecard-demo">
          <div class="scorecard-header">
            <h4>📱 Sample: PET Water Bottle</h4>
            <div class="overall-score">88/100</div>
          </div>
          <div class="scorecard-metrics">
            <div class="metric">
              <span class="metric-label">Recyclability</span>
              <div class="metric-bar">
                <div class="metric-fill" style="width: 95%">95%</div>
              </div>
            </div>
            <div class="metric">
              <span class="metric-label">Toxicity (PFAS-free)</span>
              <div class="metric-bar">
                <div class="metric-fill" style="width: 100%">0% harmful</div>
              </div>
            </div>
            <div class="metric">
              <span class="metric-label">Social Equity</span>
              <div class="metric-bar">
                <div class="metric-fill" style="width: 90%">90%</div>
              </div>
            </div>
            <div class="metric">
              <span class="metric-label">Consciousness Impact</span>
              <div class="metric-bar">
                <div class="metric-fill" style="width: 85%">85%</div>
              </div>
            </div>
            <div class="metric">
              <span class="metric-label">Planetary Boundary</span>
              <div class="metric-bar">
                <div class="metric-fill" style="width: 100%">100% compliant</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <h2>🌍 Implementation Phases</h2>
        <div class="phases-timeline">
          <div class="phase-item">
            <div class="phase-marker">0</div>
            <div class="phase-content">
              <h4>Stakeholder Mobilization (Year 0-1)</h4>
              <p>Establish governance councils, conduct baseline assessments, launch innovation challenges with ≥50% pilots in Global South</p>
            </div>
          </div>
          
          <div class="phase-item">
            <div class="phase-marker">1</div>
            <div class="phase-content">
              <h4>Pilot Programs (Years 1-5)</h4>
              <p>Test mechanisms in willing regions, develop standardized metrics, fast-track single-use plastic phase-out</p>
            </div>
          </div>
          
          <div class="phase-item">
            <div class="phase-marker">2</div>
            <div class="phase-content">
              <h4>Regional Scaling (Years 6-12)</h4>
              <p>Implement Virgin Material Tax in developed economies, expand community composting via Hearts/Leaves rewards</p>
            </div>
          </div>
          
          <div class="phase-item">
            <div class="phase-marker">3</div>
            <div class="phase-content">
              <h4>Global Implementation (Years 13-20)</h4>
              <p>Achieve 80% waste reduction trajectory by 2045, full Protocol adoption as Material Reality operating system</p>
            </div>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <h2>🎯 Quantified Impact Projections</h2>
        <div class="impact-grid">
          <div class="impact-card">
            <div class="impact-icon">👥</div>
            <div class="impact-number">10M</div>
            <div class="impact-label">Jobs Created by 2035</div>
            <div class="impact-detail">Repair, recycling, composting</div>
          </div>
          
          <div class="impact-card">
            <div class="impact-icon">🏭</div>
            <div class="impact-number">50%</div>
            <div class="impact-label">Virgin Material Reduction</div>
            <div class="impact-detail">By 2040, within planetary boundaries</div>
          </div>
          
          <div class="impact-card">
            <div class="impact-icon">💰</div>
            <div class="impact-number">$2T</div>
            <div class="impact-label">Annual Savings by 2045</div>
            <div class="impact-detail">From reduced extraction costs</div>
          </div>
          
          <div class="impact-card">
            <div class="impact-icon">🏥</div>
            <div class="impact-number">30%</div>
            <div class="impact-label">Toxic Exposure Reduction</div>
            <div class="impact-detail">Health improvements by 2040</div>
          </div>
          
          <div class="impact-card">
            <div class="impact-icon">🔄</div>
            <div class="impact-number">70%</div>
            <div class="impact-label">Worker Retraining Success</div>
            <div class="impact-detail">Displaced extractive workers by 2035</div>
          </div>
          
          <div class="impact-card">
            <div class="impact-icon">🌊</div>
            <div class="impact-number">10M</div>
            <div class="impact-label">Tons Ocean Plastic Recovered</div>
            <div class="impact-detail">Blue Circular Economy by 2035</div>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <h2>🗣️ Voices from the Field</h2>
        <div class="testimonials">
          <blockquote class="testimonial">
            <p>"With composting programs, I now sort organics for local farms, earning a living wage via Hearts and Leaves."</p>
            <cite>— Waste Picker, Kenya</cite>
          </blockquote>
          
          <blockquote class="testimonial">
            <p>"Our urban-rural nutrient exchange, including sewage mining, cut waste costs by 30%."</p>
            <cite>— City Mayor, Brazil</cite>
          </blockquote>
          
          <blockquote class="testimonial">
            <p>"Standardized parts made my repair shop thrive, with earnings tracked in the Love Ledger."</p>
            <cite>— Repair Technician, India</cite>
          </blockquote>
        </div>
      </div>

      <div class="preview-section">
        <h2>🔗 Framework Connections</h2>
        <p>The Phoenix Protocol integrates as the Material Reality layer across governance frameworks:</p>
        <div class="connections-grid">
          <div class="connection-item">
            <span class="connection-icon">⚖️</span>
            <strong>Treaty for Our Only Home</strong> - Binding phase-out protocol and Ecocide enforcement
          </div>
          <div class="connection-item">
            <span class="connection-icon">💚</span>
            <strong>Hearts & Leaves Economy</strong> - Rewards for circular contributions and ecological restoration
          </div>
          <div class="connection-item">
            <span class="connection-icon">🧠</span>
            <strong>Meta-Governance</strong> - Planetary Health and Social Resilience Council coordination
          </div>
          <div class="connection-item">
            <span class="connection-icon">🌍</span>
            <strong>Gaian Trade Framework</strong> - Circular material flows and regenerative commerce
          </div>
          <div class="connection-item">
            <span class="connection-icon">🌊</span>
            <strong>Environmental Stewardship</strong> - Ocean cleanup and marine circular economy
          </div>
          <div class="connection-item">
            <span class="connection-icon">🚀</span>
            <strong>Space Governance</strong> - Cosmic circularity and orbital debris recycling
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
    background: linear-gradient(135deg, rgba(220, 38, 38, 0.05) 0%, rgba(249, 115, 22, 0.05) 100%);
    border-radius: 1rem;
    border-left: 4px solid #dc2626;
  }

  .preview-section h2 {
    color: #dc2626;
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
    box-shadow: 0 4px 6px rgba(220, 38, 38, 0.1);
    border: 1px solid rgba(220, 38, 38, 0.2);
  }

  .innovation-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .innovation-card h3 {
    color: #dc2626;
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
  }

  .innovation-card p {
    color: #4b5563;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .material-categories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .category-card {
    padding: 1.5rem;
    border-radius: 0.75rem;
    border: 2px solid;
    position: relative;
  }

  .category-card.biological {
    background: rgba(34, 197, 94, 0.1);
    border-color: #22c55e;
  }

  .category-card.technical {
    background: rgba(59, 130, 246, 0.1);
    border-color: #3b82f6;
  }

  .category-card.transitional {
    background: rgba(251, 191, 36, 0.1);
    border-color: #fbbf24;
  }

  .category-card.monstrous {
    background: rgba(239, 68, 68, 0.1);
    border-color: #ef4444;
  }

  .category-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .category-card h4 {
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
  }

  .category-card.biological h4 { color: #16a34a; }
  .category-card.technical h4 { color: #2563eb; }
  .category-card.transitional h4 { color: #d97706; }
  .category-card.monstrous h4 { color: #dc2626; }

  .category-card p {
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
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .pillar-card {
    background: rgba(255, 255, 255, 0.7);
    padding: 1.5rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(220, 38, 38, 0.2);
    position: relative;
  }

  .pillar-number {
    position: absolute;
    top: -15px;
    left: 20px;
    background: #dc2626;
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
    color: #dc2626;
    margin-bottom: 0.75rem;
    margin-top: 0.5rem;
    font-size: 1.1rem;
  }

  .pillar-card p {
    color: #4b5563;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .scorecard-demo {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 0.75rem;
    padding: 1.5rem;
    margin-top: 1.5rem;
    border: 1px solid rgba(220, 38, 38, 0.2);
  }

  .scorecard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .scorecard-header h4 {
    color: #dc2626;
    margin: 0;
  }

  .overall-score {
    font-size: 2rem;
    font-weight: bold;
    color: #059669;
    background: rgba(5, 150, 105, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
  }

  .scorecard-metrics {
    display: grid;
    gap: 1rem;
  }

  .metric {
    display: grid;
    grid-template-columns: 200px 1fr;
    align-items: center;
    gap: 1rem;
  }

  .metric-label {
    font-weight: 500;
    color: #374151;
  }

  .metric-bar {
    background: #f3f4f6;
    border-radius: 0.5rem;
    height: 24px;
    position: relative;
    overflow: hidden;
  }

  .metric-fill {
    background: linear-gradient(90deg, #dc2626, #f97316);
    height: 100%;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.8rem;
    font-weight: 500;
    transition: width 0.3s ease;
  }

  .phases-timeline {
    margin-top: 1.5rem;
  }

  .phase-item {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .phase-marker {
    background: #dc2626;
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
    color: #dc2626;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }

  .phase-content p {
    color: #4b5563;
    line-height: 1.6;
  }

  .impact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .impact-card {
    background: rgba(255, 255, 255, 0.7);
    padding: 1.5rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(220, 38, 38, 0.2);
    text-align: center;
  }

  .impact-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .impact-number {
    font-size: 2rem;
    font-weight: bold;
    color: #dc2626;
    margin-bottom: 0.25rem;
  }

  .impact-label {
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.25rem;
  }

  .impact-detail {
    font-size: 0.8rem;
    color: #6b7280;
  }

  .testimonials {
    display: grid;
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .testimonial {
    background: rgba(255, 255, 255, 0.7);
    padding: 1.5rem;
    border-radius: 0.75rem;
    border-left: 4px solid #f97316;
    margin: 0;
  }

  .testimonial p {
    font-style: italic;
    color: #2d3748;
    margin-bottom: 0.75rem;
    font-size: 1.05rem;
  }

  .testimonial cite {
    color: #dc2626;
    font-weight: 500;
    font-style: normal;
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
    border: 1px solid rgba(220, 38, 38, 0.2);
  }

  .connection-icon {
    font-size: 1.5rem;
  }

  .connection-item strong {
    color: #dc2626;
  }

  @media (max-width: 768px) {
    .preview-section {
      padding: 1.5rem;
    }
    
    .key-innovations,
    .material-categories,
    .pillars-grid,
    .impact-grid {
      grid-template-columns: 1fr;
    }
    
    .connections-grid {
      grid-template-columns: 1fr;
    }
    
    .metric {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }
    
    .phase-item {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .scorecard-header {
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
    }
  }
</style>
