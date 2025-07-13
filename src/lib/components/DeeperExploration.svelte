<!-- src/lib/components/DeeperExploration.svelte -->
<script>
  import { t } from '$lib/i18n';
  import { base } from '$app/paths';
  import { writable, derived } from 'svelte/store';
  import CitizenshipCompass from '$lib/components/CitizenshipCompass.svelte';
  
  // Use stores for better async state management
  import { 
    getPrecomputedFrameworkDatabase,
    getFrameworkDetails,
    getTierInfoOptimized 
  } from '$lib/data/precomputedFrameworkDatabase.js';
  
  export let quizResults;

  // Create reactive stores for clean state management
  const database = writable({});
  const loading = writable(true);
  
  // Derived stores for computed values
  const relatedFrameworks = derived(
    [database, loading],
    ([$database, $loading], set) => {
      if ($loading || !quizResults?.relatedFrameworks) {
        set([]);
        return;
      }
      
      // Process related frameworks asynchronously
      Promise.all(
        quizResults.relatedFrameworks
          .slice(0, 6) // Limit early to reduce work
          .map(framework => {
            const id = typeof framework === 'object' ? framework.slug || framework.id : framework;
            return getFrameworkDetails(id);
          })
      ).then(frameworks => {
        set(frameworks.filter(Boolean));
      }).catch(error => {
        console.error('Error loading related frameworks:', error);
        set([]);
      });
    },
    [] // Initial value
  );

  const showSpiralDynamics = derived(
    [relatedFrameworks],
    ([$relatedFrameworks]) => {
      if (!quizResults) return false;
      
      // Compute spiral dynamics visibility
      const systemsThinking = quizResults.values === 'systems' || 
                             quizResults.contribution === 'transforming' ||
                             quizResults.scale === 'connected';
      
      const complexInterests = $relatedFrameworks.length >= 3;
      
      return systemsThinking || complexInterests;
    }
  );

  // Single initialization function
  async function initializeData() {
    try {
      const dbData = await getPrecomputedFrameworkDatabase();
      
      // Add Spiral Dynamics with translated data
      const spiralDynamics = {
        name: $t('findYourPlace.spiralDynamics.database.name'),
        description: $t('findYourPlace.spiralDynamics.database.description'),
        tier: 'developmental',
        color: '#8B4513',
        route: 'https://www.spiralize.org',
        external: true,
        icon: '🌀',
        benefits: getSpiralDynamicsBenefits(),
        type: 'developmental'
      };
      
      database.set({ ...dbData, 'spiral-dynamics': spiralDynamics });
    } catch (error) {
      console.error('Error loading framework database:', error);
      database.set({});
    } finally {
      loading.set(false);
    }
  }

  // Helper function moved outside to avoid recreation
  function getSpiralDynamicsBenefits() {
    try {
      const benefits = $t('findYourPlace.spiralDynamics.database.benefits');
      return Array.isArray(benefits) ? benefits : [
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

  // Initialize once when component mounts
  initializeData();

  // Pure function for tier info
  function getTierInfo(tier) {
    return getTierInfoOptimized(tier);
  }
</script>

{#if $loading}
  <div class="loading-state">
    <div class="loading-spinner"></div>
    <p>Loading framework data...</p>
  </div>
{:else}
  <section class="deeper-exploration-section">
    <div class="container">
      <!-- Related Frameworks -->
      {#if $relatedFrameworks.length > 0}
        <div class="related-recommendations">
          <div class="related-header">
            <h3>Related Frameworks to Explore</h3>
            <p class="related-description">
              {$t('findYourPlace.recommendations.related.description')}
            </p>
          </div>
          
          <div class="frameworks-grid related">
            {#each $relatedFrameworks as framework}
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
      {#if $showSpiralDynamics && $database['spiral-dynamics']}
        <div class="developmental-framework-section">
          <div class="developmental-header">
            <h3>{$t('findYourPlace.spiralDynamics.invitation.title')}</h3>
            <p>
              {$t('findYourPlace.spiralDynamics.note.description')} 
              <a href="https://www.spiralize.org" target="_blank" rel="noopener noreferrer" class="spiral-link">
                {$t('findYourPlace.spiralDynamics.note.linkText')}
              </a>, 
              {$t('findYourPlace.spiralDynamics.note.subtitle')}.
            </p>
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
                  <h4>{$database['spiral-dynamics'].name}</h4>
                  <div class="framework-badge developmental">
                    {$t('findYourPlace.spiralDynamics.tiers.second')} & {$t('findYourPlace.spiralDynamics.tiers.third')}
                  </div>
                </div>
              </div>
              
              <div class="framework-content">
                <p>{$database['spiral-dynamics'].description}</p>
                
                <div class="framework-benefits">
                  {#each $database['spiral-dynamics'].benefits as benefit}
                    <span class="benefit">{benefit}</span>
                  {/each}
                </div>
                
                <div class="spiral-stages-preview">
                  <div class="stages-container">
                    {#each ['beige', 'purple', 'red', 'blue', 'orange', 'green', 'yellow', 'turquoise'] as stage}
                      <div class="stage-item">
                        <div class="stage-dot {stage}"></div>
                        <span class="stage-label">{$t(`findYourPlace.spiralDynamics.stages.${stage}`)}</span>
                      </div>
                    {/each}
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

<!-- Keep existing styles exactly the same -->
