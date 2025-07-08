<!-- src/lib/components/FrameworkRecommendations.svelte - Using Precomputed Data -->
<script>
  import { t } from '$lib/i18n';
  import { base } from '$app/paths';
  import { goto } from '$app/navigation';
  
  // Use precomputed framework database instead of runtime computation
  import { 
    getPrecomputedFrameworkDatabase,
    getFrameworkDetails,
    getTierInfoOptimized 
  } from '$lib/data/precomputedFrameworkDatabase.js';
  
  export let quizResults;


  let database = {};

  onMount(async () => {
    database = await getPrecomputedFrameworkDatabase();
  });
  
  // Use the precomputed database directly - no expensive operations
  const frameworkDatabase = database;
  
  // Optimized framework details lookup
  function getFrameworkDetailsOptimized(frameworkId) {
    return getFrameworkDetails(frameworkId);
  }
  
  // Get recommended frameworks with details - now much faster
  function getRecommendedFrameworks() {
    if (!quizResults?.recommendedFrameworks) return [];
    return quizResults.recommendedFrameworks
      .map(framework => {
        // Handle both framework objects and IDs
        const id = typeof framework === 'object' ? framework.slug || framework.id : framework;
        return getFrameworkDetailsOptimized(id);
      })
      .filter(Boolean);
  }
  
  // Get related frameworks with details - now much faster
  function getRelatedFrameworks() {
    if (!quizResults?.relatedFrameworks) return [];
    return quizResults.relatedFrameworks
      .map(framework => {
        const id = typeof framework === 'object' ? framework.slug || framework.id : framework;
        return getFrameworkDetailsOptimized(id);
      })
      .filter(Boolean)
      .slice(0, 6);
  }
  
  // Get tier label and styling using precomputed data
  function getTierInfo(tier) {
    return getTierInfoOptimized(tier);
  }

  function shouldShowSpiralDynamics() {
    if (!quizResults) return false;
    
    // Show for users who selected "systems thinking" or have multiple complex interests
    const systemsThinking = quizResults.values === 'systems' || 
                           quizResults.contribution === 'transforming' ||
                           quizResults.scale === 'connected';
    
    // Also show for users with diverse interests (multiple recommended frameworks)
    const complexInterests = getRecommendedFrameworks().length >= 3;
    
    return systemsThinking || complexInterests;
  }

  function handleRetakeQuiz(event) {
    event.preventDefault();
    localStorage.removeItem('globalCitizenshipQuiz');
    goto(`${base}/quiz`);
  }
</script>

<section class="recommendations-section">
  <div class="container">
    <!-- Primary Recommendations -->
    <div class="primary-recommendations">
      <div class="section-header">
        <h2>{$t('findYourPlace.recommendations.primary.title')}</h2>
        <p class="section-description">
          {$t('findYourPlace.recommendations.primary.description')}
        </p>
      </div>
      
      <div class="frameworks-grid primary">
        {#each getRecommendedFrameworks() as framework, index}
          {@const tierInfo = getTierInfo(framework.tier)}
          <a 
            href="{base}{framework.route}" 
            class="framework-card primary-card {tierInfo.class}"
            class:featured={framework.importance === 'critical'}
          >
            <div class="card-header">
              <div class="framework-icon">{framework.icon}</div>
              <div class="tier-badge {tierInfo.class}">
                {$t(tierInfo.label)}
                {#if framework.importance === 'critical'}
                  <span class="priority-star">🌐</span>
                {/if}
                {#if index === 0}
                  <span class="primary-badge">{$t('findYourPlace.recommendations.primaryBadge')}</span>
                {/if}
              </div>
            </div>
            
            <div class="card-content">
              <h3>{$t(framework.name)}</h3>
              <p>{$t(framework.description)}</p>
              
              {#if framework.importance === 'critical'}
                <div class="foundation-note">
                  {$t('findYourPlace.recommendations.foundationNote')}
                </div>
              {/if}
            </div>
            
            <div class="card-footer">
              <span class="explore-link">
                {$t('findYourPlace.recommendations.exploreFramework')} →
              </span>
            </div>
          </a>
        {/each}
      </div>
    </div>

    <!-- Related Frameworks -->
    {#if getRelatedFrameworks().length > 0}
      <div class="related-recommendations">
        <div class="section-header">
          <h3>{$t('findYourPlace.recommendations.related.title')}</h3>
          <p class="section-description">
            {$t('findYourPlace.recommendations.related.description')}
          </p>
        </div>
        
        <div class="frameworks-grid related">
          {#each getRelatedFrameworks() as framework}
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
    
    <!-- Personalization Summary -->
    <div class="personalization-summary">
      <h3>{$t('findYourPlace.recommendations.summary.title')}</h3>
      <div class="summary-content">
        <div class="summary-item">
          <strong>{$t('findYourPlace.recommendations.summary.primaryInterest')}:</strong>
          {$t(getFrameworkDetailsOptimized(quizResults.primaryInterest)?.name || 'findYourPlace.recommendations.summary.unknown')}
        </div>
        <div class="summary-item">
          <strong>{$t('findYourPlace.recommendations.summary.totalFrameworks')}:</strong>
          {getRecommendedFrameworks().length + getRelatedFrameworks().length} {$t('findYourPlace.recommendations.summary.frameworks')}
        </div>
        <div class="summary-item">
          <strong>{$t('findYourPlace.recommendations.summary.nextStep')}:</strong>
          {$t('findYourPlace.recommendations.summary.nextStepText')}
        </div>
        <!-- Add Retake Quiz Link -->
        <div class="summary-item retake-section">
          <em>{$t('findYourPlace.recommendations.summary.notFeelingRight')} <a href="{base}/quiz" class="retake-link" on:click={handleRetakeQuiz}>{$t('findYourPlace.recommendations.summary.retake')}</a>.</em>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .recommendations-section {
    padding: 3rem 0;
    background: linear-gradient(135deg, #F8FAFC 0%, #F0F9FF 100%);
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .section-header {
    text-align: center;
    margin-bottom: 2.5rem;
  }
  
  .section-header h2 {
    font-size: 2.25rem;
    font-weight: 700;
    color: #1F2937;
    margin-bottom: 1rem;
  }
  
  .section-header h3 {
    font-size: 1.875rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 1rem;
  }
  
  .section-description {
    font-size: 1.125rem;
    color: #6B7280;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
  
  /* Primary Recommendations */
  .primary-recommendations {
    margin-bottom: 4rem;
  }
  
  .frameworks-grid.primary {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }
  
  .framework-card {
    background: white;
    border-radius: 16px;
    padding: 0;
    text-decoration: none;
    color: inherit;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 2px solid transparent;
    transition: all 0.3s ease;
    overflow: hidden;
    display: block;
  }
  
  .framework-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
    border-color: currentColor;
  }
  
  .primary-card {
    border-top: 4px solid;
  }
  
  .primary-card.featured {
    background: linear-gradient(135deg, #FEF7ED 0%, #FDF2E9 100%);
    border-top-color: #DAA520;
  }
  
  .tier-0 { border-top-color: #8B5A3C; }
  .tier-1 { border-top-color: #DC2626; }
  .tier-2 { border-top-color: #2563EB; }
  .tier-3 { border-top-color: #7C3AED; }
  .tier-4 { border-top-color: #059669; }
  
  .card-header {
    padding: 1.5rem 1.5rem 1rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .card-header.compact {
    padding: 1rem;
    gap: 0.75rem;
    justify-content: flex-start;
  }
  
  .framework-icon {
    font-size: 2rem;
    margin-right: 0.75rem;
    flex-shrink: 0;
  }
  
  .framework-icon.small {
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }
  
  .tier-badge {
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 600;
    color: white;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  
  .tier-badge.tier-0 { background: #8B5A3C; }
  .tier-badge.tier-1 { background: #DC2626; }
  .tier-badge.tier-2 { background: #2563EB; }
  .tier-badge.tier-3 { background: #7C3AED; }
  .tier-badge.tier-4 { background: #059669; }
  
  .tier-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #6B7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .priority-star {
    font-size: 1rem;
  }
  
  .primary-badge {
    background: rgba(255, 255, 255, 0.2);
    padding: 0.25rem 0.5rem;
    border-radius: 10px;
    font-size: 0.75rem;
  }
  
  .card-content {
    padding: 0 1.5rem 1rem 1.5rem;
  }
  
  .card-content.compact {
    padding: 0 1rem 1rem 1rem;
  }
  
  .card-content h3 {
    font-size: 1.375rem;
    font-weight: 600;
    color: #1F2937;
    margin-bottom: 0.75rem;
    line-height: 1.3;
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
    margin-bottom: 1rem;
  }
  
  .foundation-note {
    background: #FEF7ED;
    border: 1px solid #FDE68A;
    border-radius: 8px;
    padding: 0.75rem;
    font-size: 0.875rem;
    color: #92400E;
    margin-top: 1rem;
  }
  
  .card-footer {
    padding: 0 1.5rem 1.5rem 1.5rem;
  }
  
  .explore-link {
    color: #2563EB;
    font-weight: 600;
    font-size: 0.95rem;
    transition: color 0.2s ease;
  }
  
  .framework-card:hover .explore-link {
    color: #1D4ED8;
  }
  
  /* Related Recommendations */
  .related-recommendations {
    background: white;
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    margin-bottom: 3rem;
  }
  
  .frameworks-grid.related {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .related-card {
    border: 1px solid #E5E7EB;
    border-top: 3px solid;
    padding: 1.25rem;
  }
  
  .related-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
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
  
  /* Personalization Summary */
  .personalization-summary {
    background: linear-gradient(135deg, #E0F2FE 0%, #F0F9FF 100%);
    border-radius: 16px;
    padding: 2rem;
    border: 1px solid #BAE6FD;
  }
  
  .personalization-summary h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #0F172A;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .summary-content {
    display: grid;
    gap: 1rem;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .summary-item {
    color: #374151;
    line-height: 1.6;
  }
  
  .summary-item strong {
    color: #1F2937;
  }

  .retake-section {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(43, 75, 140, 0.2);
    text-align: center;
  }

  .retake-link {
    color: #2B4B8C;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
  }

  .retake-link:hover {
    color: #DAA520;
    text-decoration: underline;
  } 
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .recommendations-section {
      padding: 2rem 0;
    }
    
    .frameworks-grid.primary {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .frameworks-grid.related {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    
    .section-header h2 {
      font-size: 1.875rem;
    }
    
    .section-header h3 {
      font-size: 1.5rem;
    }
    
    .related-recommendations {
      padding: 1.5rem;
    }
    
    .personalization-summary {
      padding: 1.5rem;
    }
    
    .tier-badge {
      flex-direction: column;
      gap: 0.25rem;
      padding: 0.5rem;
    }
  }
  
  @media (max-width: 480px) {
    .card-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
    
    .card-header.compact {
      flex-direction: row;
      align-items: center;
    }
    
    .summary-content {
      gap: 1.5rem;
    }
  }
