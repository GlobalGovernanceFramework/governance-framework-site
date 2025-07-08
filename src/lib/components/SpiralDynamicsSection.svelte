<!-- src/lib/components/SpiralDynamicsSection.svelte -->
<script>
  import { t } from '$lib/i18n';
  
  export let variant = 'full'; // 'full', 'compact', or 'minimal'
  export let showTitle = true;
  export let customTitle = null;
</script>

<section class="spiral-dynamics-section {variant}">
  <div class="container">
    
    {#if showTitle}
      <div class="spiral-header">
        <h3 class="spiral-title">
          {customTitle || $t('findYourPlace.spiralDynamics.invitation.title')}
        </h3>
        {#if variant === 'full'}
          <p class="spiral-intro">
            {$t('findYourPlace.spiralDynamics.invitation.description1')}
          </p>
          <p class="spiral-intro">
            {$t('findYourPlace.spiralDynamics.invitation.description2')}
          </p>
        {:else if variant === 'compact'}
          <p class="spiral-intro">
            Understanding different worldviews enhances global citizenship practice. Spiral Dynamics reveals how people and cultures approach values and change differently.
          </p>
        {/if}
      </div>
    {/if}

    <div class="spiral-content">
      
      <!-- Spiral Visual -->
      <div class="spiral-visual">
        <div class="spiral-icon">🌀</div>
        <div class="spiral-stages">
          
          {#if variant === 'full' || variant === 'compact'}
            <!-- First Tier -->
            <div class="first-tier-stages">
              <div class="tier-label">First Tier - Subsistence</div>
              <span class="stage beige">{$t('findYourPlace.spiralDynamics.stages.beige')}</span>
              <span class="stage purple">{$t('findYourPlace.spiralDynamics.stages.purple')}</span>
              <span class="stage red">{$t('findYourPlace.spiralDynamics.stages.red')}</span>
              <span class="stage blue">{$t('findYourPlace.spiralDynamics.stages.blue')}</span>
              <span class="stage orange">{$t('findYourPlace.spiralDynamics.stages.orange')}</span>
              <span class="stage green">{$t('findYourPlace.spiralDynamics.stages.green')}</span>
            </div>
            
            <!-- Second Tier -->
            <div class="tier-divider">
              <span class="divider-line"></span>
              <span class="tier-label">{$t('findYourPlace.spiralDynamics.tiers.second')}</span>
              <span class="divider-line"></span>
            </div>
            <div class="second-tier-stages">
              <span class="stage yellow">{$t('findYourPlace.spiralDynamics.stages.yellow')}</span>
              <span class="stage turquoise">{$t('findYourPlace.spiralDynamics.stages.turquoise')}</span>
              {#if variant === 'full'}
                <span class="stage coral">{$t('findYourPlace.spiralDynamics.stages.coral')}</span>
              {/if}
            </div>
            
            {#if variant === 'full'}
              <!-- Third Tier -->
              <div class="tier-divider">
                <span class="divider-line"></span>
                <span class="tier-label">{$t('findYourPlace.spiralDynamics.tiers.third')}</span>
                <span class="divider-line"></span>
              </div>
              <div class="third-tier-stages">
                <span class="stage ultra-violet">{$t('findYourPlace.spiralDynamics.stages.ultraviolet')}</span>
                <span class="stage clear">{$t('findYourPlace.spiralDynamics.stages.clear')}</span>
              </div>
            {/if}
          {:else}
            <!-- Minimal version - just key stages -->
            <div class="minimal-stages">
              <span class="stage orange">Achievement</span>
              <span class="stage green">Community</span>
              <span class="stage yellow">Integral</span>
              <span class="stage turquoise">Holistic</span>
            </div>
          {/if}
          
        </div>
      </div>
      
      <!-- Spiral Description & CTA -->
      <div class="spiral-text">
        {#if variant === 'minimal'}
          <p class="spiral-description">
            Our approach to governance evolution is informed by developmental models like Spiral Dynamics, 
            which help us understand how different worldviews can work together for planetary transformation.
          </p>
        {:else}
          <div class="spiral-benefits">
            <h4>What You'll Learn:</h4>
            <ul>
              <li>How different cultures approach global challenges</li>
              <li>Why people see the same issues so differently</li>
              <li>How to build bridges across worldviews</li>
              <li>The evolutionary stages of human consciousness</li>
            </ul>
          </div>
        {/if}
        
        <div class="spiral-cta">
          <a href="https://www.spiralize.org" target="_blank" rel="noopener noreferrer" class="spiral-link">
            {$t('findYourPlace.spiralDynamics.invitation.linkText')} →
          </a>
          <span class="external-note">Free educational resource</span>
        </div>
      </div>
      
    </div>
  </div>
</section>

<style>
  .spiral-dynamics-section {
    padding: 3rem 0;
  }
  
  .spiral-dynamics-section.full {
    background: linear-gradient(135deg, #FEF7ED 0%, #F3E8FF 100%);
    border-radius: 1rem;
    margin: 2rem 0;
  }
  
  .spiral-dynamics-section.compact {
    background: rgba(139, 69, 19, 0.05);
    border-radius: 0.75rem;
    padding: 2rem 0;
  }
  
  .spiral-dynamics-section.minimal {
    background: transparent;
    padding: 1.5rem 0;
  }
  
  .container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .spiral-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .spiral-title {
    font-size: 1.75rem;
    font-weight: 600;
    color: #2B4B8C;
    margin-bottom: 1rem;
  }
  
  .spiral-dynamics-section.minimal .spiral-title {
    font-size: 1.375rem;
  }
  
  .spiral-intro {
    color: #4B5563;
    line-height: 1.6;
    margin-bottom: 1rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .spiral-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
  }
  
  .spiral-dynamics-section.minimal .spiral-content {
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
  }
  
  .spiral-visual {
    text-align: center;
  }
  
  .spiral-icon {
    font-size: 3rem;
    margin-bottom: 1.5rem;
  }
  
  .spiral-dynamics-section.minimal .spiral-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .spiral-stages {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: center;
  }
  
  .first-tier-stages,
  .second-tier-stages,
  .third-tier-stages {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: center;
  }
  
  .minimal-stages {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
  }
  
  .tier-divider {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    margin: 0.5rem 0;
  }
  
  .divider-line {
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg, transparent, #9CA3AF, transparent);
  }
  
  .tier-label {
    font-size: 0.7rem;
    font-weight: 600;
    color: #6B7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.25rem 0.5rem;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    border: 1px solid #E5E7EB;
  }
  
  .stage {
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
    color: white;
    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
    cursor: help;
    transition: transform 0.2s ease;
  }
  
  .stage:hover {
    transform: scale(1.05);
  }
  
  .spiral-dynamics-section.minimal .stage {
    font-size: 0.7rem;
    padding: 0.2rem 0.6rem;
  }
  
  /* Stage Colors */
  .stage.beige { background: #8B7355; }
  .stage.purple { background: #8B5A96; }
  .stage.red { background: #DC2626; }
  .stage.blue { background: #2563EB; }
  .stage.orange { background: #EA580C; }
  .stage.green { background: #16A34A; }
  .stage.yellow { background: #EAB308; }
  .stage.turquoise { background: #0D9488; }
  .stage.coral { background: #FF7F7F; }
  .stage.ultra-violet { background: #8A2BE2; }
  .stage.clear { 
    background: linear-gradient(135deg, #FFFFFF 0%, #F0F8FF 50%, #E6E6FA 100%); 
    color: #4B5563;
    border: 2px solid #D1D5DB;
    text-shadow: none;
  }
  
  .spiral-text h4 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1F2937;
    margin-bottom: 0.75rem;
  }
  
  .spiral-benefits ul {
    list-style: none;
    padding: 0;
    margin-bottom: 1.5rem;
  }
  
  .spiral-benefits li {
    padding: 0.5rem 0;
    position: relative;
    padding-left: 1.5rem;
    color: #4B5563;
    line-height: 1.5;
  }
  
  .spiral-benefits li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: #2B4B8C;
    font-weight: bold;
  }
  
  .spiral-description {
    color: #4B5563;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  
  .spiral-cta {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .spiral-dynamics-section.minimal .spiral-cta {
    align-items: center;
  }
  
  .spiral-link {
    display: inline-block;
    color: #2B4B8C;
    font-weight: 600;
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    background: rgba(218, 165, 32, 0.1);
    border-radius: 8px;
    border: 2px solid #DAA520;
    transition: all 0.3s ease;
  }
  
  .spiral-link:hover {
    background: #DAA520;
    color: white;
    transform: translateY(-2px);
  }
  
  .external-note {
    font-size: 0.8rem;
    color: #9CA3AF;
    font-style: italic;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .spiral-content {
      grid-template-columns: 1fr;
      gap: 2rem;
      text-align: center;
    }
    
    .spiral-dynamics-section.minimal .spiral-content {
      grid-template-columns: 1fr;
    }
    
    .spiral-title {
      font-size: 1.5rem;
    }
    
    .spiral-benefits {
      text-align: left;
    }
    
    .spiral-cta {
      align-items: center;
    }
    
    .minimal-stages {
      gap: 0.25rem;
    }
    
    .stage {
      font-size: 0.75rem;
      padding: 0.2rem 0.6rem;
    }
  }
  
  @media (max-width: 480px) {
    .spiral-dynamics-section {
      padding: 2rem 0;
    }
    
    .spiral-dynamics-section.full,
    .spiral-dynamics-section.compact {
      margin: 1rem 0;
      border-radius: 0.5rem;
    }
    
    .spiral-icon {
      font-size: 2.5rem;
    }
    
    .spiral-link {
      padding: 0.6rem 1.2rem;
      font-size: 0.9rem;
    }
  }
</style>
