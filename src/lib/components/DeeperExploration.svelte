<!-- src/lib/components/DeeperExploration.svelte -->
<script>
  import { t } from '$lib/i18n';
  import { base } from '$app/paths';
  import CitizenshipCompass from '$lib/components/CitizenshipCompass.svelte';
  
  // Use precomputed framework database instead of computing at runtime
  import { 
    PRECOMPUTED_FRAMEWORK_DATABASE,
    getFrameworkDetails,
    getTierInfoOptimized 
  } from '$lib/data/precomputedFrameworkDatabase.js';
  
  export let quizResults;
  
  // Use the precomputed database directly - no expensive reduce operations
  const frameworkDatabase = PRECOMPUTED_FRAMEWORK_DATABASE;
  
  // Add Spiral Dynamics as special case (keeping existing logic)
  frameworkDatabase['spiral-dynamics'] = {
    name: 'Spiral Dynamics',
    description: 'Understanding how different value systems emerge and evolve helps navigate the complexity of global citizenship. This framework reveals why people approach the same challenges so differently.',
    tier: 'developmental',
    color: '#8B4513',
    route: 'https://www.spiralize.org',
    external: true,
    icon: '🌀',
    benefits: ['Cross-cultural understanding', 'Systems thinking', 'Conflict resolution'],
    type: 'developmental'
  };
  
  // Compute these once on mount instead of reactive statements
  let relatedFrameworks = [];
  let showSpiralDynamics = false;
  
  // Compute data once when component initializes
  $: if (quizResults) {
    // Only recalculate if quizResults actually changes
    relatedFrameworks = getRelatedFrameworksComputed(quizResults);
    showSpiralDynamics = shouldShowSpiralDynamicsComputed(quizResults);
  }
  
  // Pure functions that don't cause reactivity issues
  function getRelatedFrameworksComputed(results) {
    if (!results?.relatedFrameworks) return [];
    return results.relatedFrameworks
      .map(framework => {
        const id = typeof framework === 'object' ? framework.slug || framework.id : framework;
        return getFrameworkDetails(id);
      })
      .filter(Boolean)
      .slice(0, 6);
  }
  
  function shouldShowSpiralDynamicsComputed(results) {
    if (!results) return false;
    
    // Show for users who selected "systems thinking" or have multiple complex interests
    const systemsThinking = results.values === 'systems' || 
                           results.contribution === 'transforming' ||
                           results.scale === 'connected';
    
    // Also show for users with diverse interests (multiple recommended frameworks)
    const complexInterests = getRelatedFrameworksComputed(results).length >= 3;
    
    return systemsThinking || complexInterests;
  }
  
  // Pure function for tier info - no reactivity needed
  function getTierInfo(tier) {
    return getTierInfoOptimized(tier);
  }
</script>

<section class="deeper-exploration-section">
  <div class="container">
    <!-- Related Frameworks -->
    {#if relatedFrameworks.length > 0}
      <div class="related-recommendations">
        <div class="related-header">
          <h3>Related Frameworks to Explore</h3>
          <p class="related-description">
            {$t('findYourPlace.recommendations.related.description')}
          </p>
        </div>
        
        <div class="frameworks-grid related">
          {#each relatedFrameworks as framework}
            {@const tierInfo = getTierInfo(framework.tier)}
            <a 
              href="{base}{framework.route}" 
              class="framework-card related-card {tierInfo.class}"
            >
              <div class="card-header compact">
                <div class="framework-icon small">{framework.icon}</div>
                <span class="tier-label">{$t(tierInfo.label)}</span>
              </div>
              
              <div class="card-content compact">
                <h4>{$t(framework.name)}</h4>
                <p>{$t(framework.description)}</p>
              </div>
            </a>
          {/each}
        </div>
        
        <div class="explore-all">
          <a href="{base}/frameworks/docs/implementation" class="explore-all-link">
            {$t('findYourPlace.recommendations.exploreAll')} →
          </a>
        </div>
      </div>
    {/if}

    <!-- Citizenship Compass Component -->
    <div class="compass-section">
      <div class="compass-header">
        <h2>{$t('findYourPlace.compass.title')}</h2>
        <p>
          {$t('findYourPlace.compass.description')}
        </p>
      </div>
      <CitizenshipCompass {quizResults} />
    </div>

    <!-- Developmental Framework Section (Spiral Dynamics) -->
    {#if showSpiralDynamics}
      <div class="developmental-framework-section">
        <div class="developmental-header">
          <h3>{$t('findYourPlace.spiralDynamics.invitation.title')}</h3>
          <p>{$t('findYourPlace.spiralDynamics.note.description')} <a href="https://www.spiralize.org" target="_blank" rel="noopener noreferrer" class="spiral-link">{$t('findYourPlace.spiralDynamics.note.linkText')}</a>, {$t('findYourPlace.spiralDynamics.note.subtitle')}.</p>
        </div>
        
        <div class="developmental-framework-recommendation">
          <a 
            href="https://www.spiralize.org" 
            target="_blank" 
            rel="noopener noreferrer"
            class="framework-card spiral-dynamics"
          >
            <div class="framework-header">
              <div class="framework-icon-large">🌀</div>
              <div class="framework-meta">
                <h4>Spiral Dynamics</h4>
                <div class="framework-badge developmental">
                  {$t('findYourPlace.spiralDynamics.tiers.second')} & {$t('findYourPlace.spiralDynamics.tiers.third')}
                </div>
              </div>
            </div>
            
            <div class="framework-content">
              <p>{frameworkDatabase['spiral-dynamics'].description}</p>
              
              <div class="framework-benefits">
                {#each frameworkDatabase['spiral-dynamics'].benefits as benefit}
                  <span class="benefit">{benefit}</span>
                {/each}
              </div>
              
              <div class="spiral-stages-preview">
                <div class="stages-container">
                  <div class="stage-dot beige" title="{$t('findYourPlace.spiralDynamics.stages.beige')}"></div>
                  <div class="stage-dot purple" title="{$t('findYourPlace.spiralDynamics.stages.purple')}"></div>
                  <div class="stage-dot red" title="{$t('findYourPlace.spiralDynamics.stages.red')}"></div>
                  <div class="stage-dot blue" title="{$t('findYourPlace.spiralDynamics.stages.blue')}"></div>
                  <div class="stage-dot orange" title="{$t('findYourPlace.spiralDynamics.stages.orange')}"></div>
                  <div class="stage-dot green" title="{$t('findYourPlace.spiralDynamics.stages.green')}"></div>
                  <div class="stage-dot yellow" title="{$t('findYourPlace.spiralDynamics.stages.yellow')}"></div>
                  <div class="stage-dot turquoise" title="{$t('findYourPlace.spiralDynamics.stages.turquoise')}"></div>
                </div>
                <p class="stages-label">8 stages of human development</p>
              </div>
            </div>
            
            <div class="framework-action">
              <span class="explore-framework">
                {$t('findYourPlace.spiralDynamics.invitation.linkText')} →
              </span>
              <span class="external-note">External link</span>
            </div>
          </a>
        </div>
      </div>
    {/if}
  </div>
</section>

<style>
  .deeper-exploration-section {
    padding: 3rem 0;
    background: white;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .section-header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .section-header h2 {
    font-size: 2.25rem;
    font-weight: 700;
    color: #1F2937;
    margin-bottom: 1rem;
  }
  
  .section-description {
    font-size: 1.125rem;
    color: #6B7280;
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.6;
  }

  /* Compass Section */
  .compass-section {
    margin-bottom: 4rem;
  }

  .compass-header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .compass-header h2 {
    font-size: 2.25rem;
    font-weight: 700;
    color: #2B4B8C;
    margin-bottom: 1rem;
  }
  
  .compass-header p {
    font-size: 1.125rem;
    color: #4B5563;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
 
  /* Related Recommendations */
  .related-recommendations {
    background: #F9FAFB;
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    margin-bottom: 3rem;
  }

  .related-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .related-header h3 {
    font-size: 1.875rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 1rem;
  }

  .related-description {
    font-size: 1.125rem;
    color: #6B7280;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
  
  .frameworks-grid.related {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .framework-card {
    background: white;
    border-radius: 12px;
    padding: 0;
    text-decoration: none;
    color: inherit;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 2px solid transparent;
    transition: all 0.3s ease;
    overflow: hidden;
    display: block;
  }
  
  .framework-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    border-color: currentColor;
  }
  
  .related-card {
    border: 1px solid #E5E7EB;
    border-top: 3px solid;
    padding: 1.25rem;
  }
  
  .tier-0 { border-top-color: #8B5A3C; }
  .tier-1 { border-top-color: #DC2626; }
  .tier-2 { border-top-color: #2563EB; }
  .tier-3 { border-top-color: #7C3AED; }
  .tier-4 { border-top-color: #059669; }
  
  .card-header.compact {
    padding: 0 0 1rem 0;
    gap: 0.75rem;
    justify-content: flex-start;
    display: flex;
    align-items: center;
  }
  
  .framework-icon.small {
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }
  
  .tier-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #6B7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .card-content.compact {
    padding: 0;
  }
  
  .card-content h4 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1F2937;
    margin-bottom: 0.5rem;
    line-height: 1.3;
  }
  
  .card-content p {
    color: #6B7280;
    line-height: 1.6;
    margin: 0;
    font-size: 0.95rem;
  }
  
  .explore-all {
    text-align: center;
    padding-top: 1.5rem;
    border-top: 1px solid #E5E7EB;
  }
  
  .explore-all-link {
    color: #2563EB;
    font-weight: 600;
    text-decoration: none;
    font-size: 1.1rem;
    transition: color 0.2s ease;
  }
  
  .explore-all-link:hover {
    color: #1D4ED8;
  }

  /* Developmental Framework Section */
  .developmental-framework-section {
    margin: 3rem 0;
    padding: 2rem;
    background: linear-gradient(135deg, #FEF7ED 0%, #F3E8FF 100%);
    border-radius: 16px;
    border: 2px solid rgba(139, 69, 19, 0.1);
  }

  .developmental-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .developmental-header h3 {
    font-size: 1.75rem;
    font-weight: 600;
    color: #2B4B8C;
    margin-bottom: 0.5rem;
  }

  .developmental-header p {
    color: #6B7280;
    font-size: 1.125rem;
    line-height: 1.6;
  }

  .spiral-link {
    color: #8B4513;
    text-decoration: none;
    font-weight: 600;
    border-bottom: 1px solid rgba(139, 69, 19, 0.3);
    transition: all 0.2s ease;
  }

  .spiral-link:hover {
    color: #A0522D;
    border-bottom-color: #A0522D;
  }

  .developmental-framework-recommendation {
    max-width: 800px;
    margin: 0 auto;
  }

  .framework-card.spiral-dynamics {
    background: white;
    border: 2px solid #8B4513;
    border-radius: 16px;
    padding: 0;
    transition: all 0.3s ease;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(139, 69, 19, 0.1);
  }

  .framework-card.spiral-dynamics:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(139, 69, 19, 0.2);
    border-color: #A0522D;
  }

  .framework-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
    color: white;
  }

  .framework-icon-large {
    font-size: 2.5rem;
    flex-shrink: 0;
  }

  .framework-meta h4 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    color: white;
  }

  .framework-badge.developmental {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  .framework-content {
    padding: 1.5rem;
  }

  .framework-content p {
    color: #4B5563;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }

  .framework-benefits {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }

  .benefit {
    background: rgba(43, 75, 140, 0.1);
    color: #2B4B8C;
    padding: 0.5rem 1rem;
    border-radius: 16px;
    font-size: 0.875rem;
    font-weight: 500;
    border: 1px solid rgba(43, 75, 140, 0.2);
  }

  .spiral-stages-preview {
    background: rgba(139, 69, 19, 0.05);
    border-radius: 12px;
    padding: 1rem;
    text-align: center;
  }

  .stages-container {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    flex-wrap: wrap;
  }

  .stage-dot {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: inline-block;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: help;
    transition: transform 0.2s ease;
  }

  .stage-dot:hover {
    transform: scale(1.2);
  }

  .stage-dot.beige { background: #8B7355; }
  .stage-dot.purple { background: #8B5A96; }
  .stage-dot.red { background: #DC2626; }
  .stage-dot.blue { background: #2563EB; }
  .stage-dot.orange { background: #EA580C; }
  .stage-dot.green { background: #16A34A; }
  .stage-dot.yellow { background: #EAB308; }
  .stage-dot.turquoise { background: #0D9488; }

  .stages-label {
    font-size: 0.875rem;
    color: #6B7280;
    font-weight: 500;
  }

  .framework-action {
    padding: 1.5rem;
    background: #F9FAFB;
    border-top: 1px solid #E5E7EB;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .explore-framework {
    color: #2B4B8C;
    font-weight: 600;
    text-decoration: none;
    font-size: 1.1rem;
    border-bottom: 2px solid rgba(218, 165, 32, 0.5);
    transition: all 0.2s ease;
    flex-grow: 1;
  }

  .explore-framework:hover {
    color: #DAA520;
    border-bottom-color: #DAA520;
    transform: translateX(3px);
  }

  .external-note {
    font-size: 0.8rem;
    color: #9CA3AF;
    font-style: italic;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .deeper-exploration-section {
      padding: 2rem 0;
    }
    
    .frameworks-grid.related {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    
    .section-header h2 {
      font-size: 1.875rem;
    }
    
    .related-recommendations {
      padding: 1.5rem;
    }

    .developmental-framework-section {
      margin: 2rem 0;
      padding: 1.5rem;
    }
    
    .framework-header {
      flex-direction: column;
      text-align: center;
      gap: 0.75rem;
    }
    
    .framework-meta h4 {
      margin-bottom: 0.25rem;
    }
    
    .framework-benefits {
      justify-content: center;
    }
    
    .framework-action {
      flex-direction: column;
      gap: 0.75rem;
      align-items: stretch;
      text-align: center;
    }
    
    .stages-container {
      gap: 0.25rem;
    }
    
    .stage-dot {
      width: 20px;
      height: 20px;
    }
  }
  
  @media (max-width: 480px) {
    .card-header.compact {
      flex-direction: row;
      align-items: center;
    }

    .developmental-header h3 {
      font-size: 1.5rem;
    }
    
    .framework-content p {
      font-size: 1rem;
    }
    
    .benefit {
      font-size: 0.8rem;
      padding: 0.4rem 0.8rem;
    }
  }
</style>
