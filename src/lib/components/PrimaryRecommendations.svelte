<!-- src/lib/components/PrimaryRecommendations.svelte -->
<script>
  import { t } from '$lib/i18n';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  
  // Use precomputed framework database
  import { 
    getPrecomputedFrameworkDatabase,
    getFrameworkDetails,
    getTierInfoOptimized 
  } from '$lib/data/precomputedFrameworkDatabase.js';
  
  export let quizResults;

  let database = {};
  let loading = true;
  let recommendedFrameworks = [];

  onMount(async () => {
    try {
      database = await getPrecomputedFrameworkDatabase();
      
      // Load recommended frameworks after database is ready
      if (quizResults?.recommendedFrameworks) {
        await loadRecommendedFrameworks();
      }
      
      loading = false;
    } catch (error) {
      console.error('Error loading framework database:', error);
      database = {};
      loading = false;
    }
  });
  
  // Watch for quiz results changes
  $: if (quizResults?.recommendedFrameworks && !loading) {
    loadRecommendedFrameworks();
  }
  
  async function loadRecommendedFrameworks() {
    try {
      const frameworks = await Promise.all(
        quizResults.recommendedFrameworks.map(async framework => {
          const id = typeof framework === 'object' ? framework.slug || framework.id : framework;
          return await getFrameworkDetails(id);
        })
      );
      recommendedFrameworks = frameworks.filter(Boolean);
    } catch (error) {
      console.error('Error loading recommended frameworks:', error);
      recommendedFrameworks = [];
    }
  }
  
  function getTierInfo(tier) {
    return getTierInfoOptimized(tier);
  }
</script>

{#if loading}
  <div class="loading-state">
    <div class="loading-spinner"></div>
    <p>Loading recommendations...</p>
  </div>
{:else}
  <section class="primary-recommendations-section">
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
          {#each recommendedFrameworks as framework, index}
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
    </div>
  </section>
{/if}

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

  /* Rest of your existing styles... */
  .primary-recommendations-section {
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
  
  .section-description {
    font-size: 1.125rem;
    color: #6B7280;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
  
  /* Primary Recommendations */
  .primary-recommendations {
    margin-bottom: 2rem;
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
  
  .framework-icon {
    font-size: 2rem;
    margin-right: 0.75rem;
    flex-shrink: 0;
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
  
  .card-content h3 {
    font-size: 1.375rem;
    font-weight: 600;
    color: #1F2937;
    margin-bottom: 0.75rem;
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
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .primary-recommendations-section {
      padding: 2rem 0;
    }
    
    .frameworks-grid.primary {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .section-header h2 {
      font-size: 1.875rem;
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
  }
</style>
