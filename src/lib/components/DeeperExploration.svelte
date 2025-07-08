<!-- src/lib/components/DeeperExploration.svelte -->
<script>
  import { t } from '$lib/i18n';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import CitizenshipCompass from '$lib/components/CitizenshipCompass.svelte';
  
  // Use precomputed framework database
  import { 
    getPrecomputedFrameworkDatabase,
    getFrameworkDetails,
    getTierInfoOptimized 
  } from '$lib/data/precomputedFrameworkDatabase.js';
  
  export let quizResults;

  let database = {};
  let loading = true;
  let relatedFrameworks = [];
  let showSpiralDynamics = false;

  // Helper function to get translated benefits array
  function getSpiralDynamicsBenefits() {
    try {
      // Get the benefits array from the translation
      const benefits = $t('findYourPlace.spiralDynamics.database.benefits');
      // Handle case where it returns a key instead of array
      if (Array.isArray(benefits)) {
        return benefits;
      }
      // Fallback to English if translation fails
      return [
        'Cross-cultural understanding',
        'Systems thinking', 
        'Conflict resolution'
      ];
    } catch (error) {
      console.warn('Error getting spiral dynamics benefits:', error);
      return [
        'Cross-cultural understanding',
        'Systems thinking', 
        'Conflict resolution'
      ];
    }
  }

  onMount(async () => {
    try {
      database = await getPrecomputedFrameworkDatabase();
      
      // Add Spiral Dynamics as special case with i18n support
      database['spiral-dynamics'] = {
        name: $t('findYourPlace.spiralDynamics.database.name'),
        description: $t('findYourPlace.spiralDynamics.database.description'),
        tier: 'developmental',
        color: '#8B4513',
        route: 'https://www.spiralize.org',
        external: true,
        icon: '🌀',
        benefits: getSpiralDynamicsBenefits(), // Get translated benefits array
        type: 'developmental'
      };
      
      // Load frameworks after database is ready
      if (quizResults) {
        await loadRelatedFrameworks();
        showSpiralDynamics = shouldShowSpiralDynamicsComputed(quizResults);
      }
      
      loading = false;
    } catch (error) {
      console.error('Error loading framework database:', error);
      database = {};
      loading = false;
    }
  });

  // Watch for quiz results changes
  $: if (quizResults && !loading) {
    loadRelatedFrameworks();
    showSpiralDynamics = shouldShowSpiralDynamicsComputed(quizResults);
  }
  
  async function loadRelatedFrameworks() {
    if (!quizResults?.relatedFrameworks) {
      relatedFrameworks = [];
      return;
    }
    
    try {
      const frameworkPromises = quizResults.relatedFrameworks.map(async framework => {
        const id = typeof framework === 'object' ? framework.slug || framework.id : framework;
        return await getFrameworkDetails(id);
      });
      
      const frameworks = await Promise.all(frameworkPromises);
      relatedFrameworks = frameworks.filter(Boolean).slice(0, 6);
    } catch (error) {
      console.error('Error loading related frameworks:', error);
      relatedFrameworks = [];
    }
  }
  
  function shouldShowSpiralDynamicsComputed(results) {
    if (!results) return false;
    
    // Show for users who selected "systems thinking" or have multiple complex interests
    const systemsThinking = results.values === 'systems' || 
                           results.contribution === 'transforming' ||
                           results.scale === 'connected';
    
    // Also show for users with diverse interests (multiple recommended frameworks)
    const complexInterests = relatedFrameworks.length >= 3;
    
    return systemsThinking || complexInterests;
  }
  
  // Pure function for tier info - no reactivity needed
  function getTierInfo(tier) {
    return getTierInfoOptimized(tier);
  }
</script>

{#if loading}
  <div class="loading-state">
    <div class="loading-spinner"></div>
    <p>Loading framework data...</p>
  </div>
{:else}
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
      {#if showSpiralDynamics && database['spiral-dynamics']}
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
                  <h4>{database['spiral-dynamics'].name}</h4>
                  <div class="framework-badge developmental">
                    {$t('findYourPlace.spiralDynamics.tiers.second')} & {$t('findYourPlace.spiralDynamics.tiers.third')}
                  </div>
                </div>
              </div>
              
              <div class="framework-content">
                <p>{database['spiral-dynamics'].description}</p>
                
                <div class="framework-benefits">
                  {#each database['spiral-dynamics'].benefits as benefit}
                    <span class="benefit">{benefit}</span>
                  {/each}
                </div>
                
                <div class="spiral-stages-preview">
                  <div class="stages-container">
                    <div class="stage-item">
                      <div class="stage-dot beige"></div>
                      <span class="stage-label">{$t('findYourPlace.spiralDynamics.stages.beige')}</span>
                    </div>
                    <div class="stage-item">
                      <div class="stage-dot purple"></div>
                      <span class="stage-label">{$t('findYourPlace.spiralDynamics.stages.purple')}</span>
                    </div>
                    <div class="stage-item">
                      <div class="stage-dot red"></div>
                      <span class="stage-label">{$t('findYourPlace.spiralDynamics.stages.red')}</span>
                    </div>
                    <div class="stage-item">
                      <div class="stage-dot blue"></div>
                      <span class="stage-label">{$t('findYourPlace.spiralDynamics.stages.blue')}</span>
                    </div>
                    <div class="stage-item">
                      <div class="stage-dot orange"></div>
                      <span class="stage-label">{$t('findYourPlace.spiralDynamics.stages.orange')}</span>
                    </div>
                    <div class="stage-item">
                      <div class="stage-dot green"></div>
                      <span class="stage-label">{$t('findYourPlace.spiralDynamics.stages.green')}</span>
                    </div>
                    <div class="stage-item">
                      <div class="stage-dot yellow"></div>
                      <span class="stage-label">{$t('findYourPlace.spiralDynamics.stages.yellow')}</span>
                    </div>
                    <div class="stage-item">
                      <div class="stage-dot turquoise"></div>
                      <span class="stage-label">{$t('findYourPlace.spiralDynamics.stages.turquoise')}</span>
                    </div>
                  </div>
                  <p class="stages-label">{$t('findYourPlace.spiralDynamics.stages.eightStages')}</p>
                </div>
              </div>
              
              <div class="framework-action">
                <div class="action-left">
                  <span class="explore-framework">
                    {$t('findYourPlace.spiralDynamics.invitation.linkText')} →
                  </span>
                  <span class="website-url">spiralize.org</span>
                </div>
                <span class="external-note">{$t('findYourPlace.spiralDynamics.invitation.externalLink')}</span>
              </div>
            </a>
          </div>
        </div>
      {/if}
    </div>
  </section>
{/if}

<!-- Keep the existing styles exactly the same -->
<style>
  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    text-align: center;
    color: #6B7280;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #e5e7eb;
    border-top: 4px solid #2B4B8C;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .deeper-exploration-section {
    padding: 3rem 0;
    background: white;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
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
  
  .tier-0 { border-top-color: #fbbf24; }
  .tier-1 { border-top-color: #60a5fa; }
  .tier-2 { border-top-color: #34d399; }
  .tier-3 { border-top-color: #a78bfa; }
  .tier-4 { border-top-color: #f472b6; }

  :global(.tier-0) {
    border-left: 4px solid #fbbf24;
    padding-left: 1rem;
  }
  
  :global(.tier-1) {
    border-left: 4px solid #60a5fa;
    padding-left: 1rem;
  }
  
  :global(.tier-2) {
    border-left: 4px solid #34d399;
    padding-left: 1rem;
  }
  
  :global(.tier-3) {
    border-left: 4px solid #a78bfa;
    padding-left: 1rem;
  }
  
  :global(.tier-4) {
    border-left: 4px solid #f472b6;
    padding-left: 1rem;
  }
  
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
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
    gap: 0.75rem;
    margin-bottom: 1rem;
    justify-items: center;
  }

  .stage-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    text-align: center;
  }

  .stage-dot {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: block;
    border: 3px solid white;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
    transition: transform 0.2s ease;
    flex-shrink: 0;
  }

  .stage-dot:hover {
    transform: scale(1.1);
  }

  .stage-label {
    font-size: 0.7rem;
    color: #4B5563;
    font-weight: 500;
    line-height: 1.2;
    text-transform: capitalize;
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
    gap: 1rem;
  }

  .action-left {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .explore-framework {
    color: #2B4B8C;
    font-weight: 600;
    text-decoration: none;
    font-size: 1.1rem;
    border-bottom: 2px solid rgba(218, 165, 32, 0.5);
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .explore-framework:hover {
    color: #DAA520;
    border-bottom-color: #DAA520;
    transform: translateX(3px);
  }

  .website-url {
    font-size: 0.9rem;
    color: #8B4513;
    font-weight: 500;
    font-family: 'Monaco', 'Consolas', monospace;
  }

  .external-note {
    font-size: 0.8rem;
    color: #6B7280;
    font-style: italic;
    flex-shrink: 0;
    text-align: right;
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

    .action-left {
      align-items: center;
    }
    
    .stages-container {
      grid-template-columns: repeat(4, 1fr);
      gap: 0.5rem;
    }
    
    .stage-dot {
      width: 24px;
      height: 24px;
    }

    .stage-label {
      font-size: 0.65rem;
    }
  }
</style>
