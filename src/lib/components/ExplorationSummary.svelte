<!-- src/lib/components/ExplorationSummary.svelte -->
<script>
  import { t } from '$lib/i18n';
  import { base } from '$app/paths';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  
  // Use precomputed framework database
  import { getFrameworkDetails } from '$lib/data/precomputedFrameworkDatabase.js';
  
  export let quizResults;
  
  let primaryFramework = null;
  let loading = true;
  
  onMount(async () => {
    if (quizResults?.primaryInterest) {
      try {
        primaryFramework = await getFrameworkDetails(quizResults.primaryInterest);
        loading = false;
      } catch (error) {
        console.error('Error loading primary framework:', error);
        loading = false;
      }
    } else {
      console.warn('No primary interest found in quiz results:', quizResults);
      loading = false;
    }
  });
  
  // Compute total frameworks count
  let totalFrameworksCount = 0;
  $: if (quizResults) {
    const recommendedCount = quizResults?.recommendedFrameworks?.length || 0;
    const relatedCount = quizResults?.relatedFrameworks?.length || 0;
    totalFrameworksCount = recommendedCount + relatedCount;
  }

  function handleRetakeQuiz(event) {
    event.preventDefault();
    localStorage.removeItem('globalCitizenshipQuiz');
    goto(`${base}/quiz`);
  }
</script>

<section class="exploration-summary-section">
  <div class="container">
    <!-- Personalization Summary -->
    <div class="personalization-summary">
      <h3>{$t('findYourPlace.recommendations.summary.title')}</h3>
      <div class="summary-content">
        <div class="summary-item">
          <strong>{$t('findYourPlace.recommendations.summary.primaryInterest')}:</strong>
          {#if loading}
            <span class="loading-text">Loading...</span>
          {:else if primaryFramework}
            {$t(primaryFramework.name)}
          {:else}
            {$t('findYourPlace.recommendations.summary.unknown')}
          {/if}
        </div>
        <div class="summary-item">
          <strong>{$t('findYourPlace.recommendations.summary.totalFrameworks')}:</strong>
          {totalFrameworksCount} {$t('findYourPlace.recommendations.summary.frameworks')}
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
  .exploration-summary-section {
    padding: 2rem 0;
    background: linear-gradient(135deg, #F8FAFC 0%, #F0F9FF 100%);
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
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

  .loading-text {
    color: #6B7280;
    font-style: italic;
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
    .exploration-summary-section {
      padding: 1.5rem 0;
    }
    
    .personalization-summary {
      padding: 1.5rem;
    }
  }
  
  @media (max-width: 480px) {
    .summary-content {
      gap: 1.5rem;
    }
  }
</style>
