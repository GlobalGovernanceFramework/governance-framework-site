<!-- src/routes/quiz/+page.svelte -->
<script>
  import { t } from '$lib/i18n';
  import { base } from '$app/paths';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  
  // Dynamic import to handle potential loading issues
  let PersonalizationQuiz;
  let showQuiz = false;
  let isLoading = true;
  let loadError = null;
  
  // Load component dynamically and check for existing quiz
  onMount(async () => {
    try {
      console.log('Quiz page mounted, loading components...');
      
      // Check if user has already completed the quiz
      const savedQuiz = localStorage.getItem('globalCitizenshipQuiz');
      if (savedQuiz) {
        console.log('Found existing quiz results, redirecting...');
        goto(`${base}/my-path`);
        return;
      }
      
      // Dynamically import the PersonalizationQuiz component
      const module = await import('$lib/components/PersonalizationQuiz.svelte');
      PersonalizationQuiz = module.default;
      
      console.log('PersonalizationQuiz component loaded successfully');
      showQuiz = true;
      isLoading = false;
      
    } catch (error) {
      console.error('Error loading PersonalizationQuiz component:', error);
      loadError = error.message;
      isLoading = false;
    }
  });
  
  function handleQuizComplete(event) {
    try {
      const results = event.detail;
      console.log('Quiz completed with results:', results);
      
      // Save results
      localStorage.setItem('globalCitizenshipQuiz', JSON.stringify(results));
      
      // Redirect to personalized dashboard
      goto(`${base}/my-path`);
    } catch (error) {
      console.error('Error handling quiz completion:', error);
      loadError = 'Failed to save quiz results. Please try again.';
    }
  }
  
  function retryLoad() {
    loadError = null;
    isLoading = true;
    // Reload the page to retry
    window.location.reload();
  }
</script>

<svelte:head>
  <title>{$t('findYourPlace.quiz.title') || 'Global Citizenship Quiz'} - Global Governance Frameworks</title>
  <meta name="description" content="Discover your path to global citizenship with our 3-question personalization quiz" />
</svelte:head>

<!-- Loading State -->
{#if isLoading}
  <section class="loading-section">
    <div class="container">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <h2>Loading Your Citizenship Journey...</h2>
        <p>Preparing your personalized quiz experience</p>
      </div>
    </div>
  </section>
{/if}

<!-- Error State -->
{#if loadError}
  <section class="error-section">
    <div class="container">
      <div class="error-content">
        <div class="error-icon">⚠️</div>
        <h2>Unable to Load Quiz</h2>
        <p class="error-message">{loadError}</p>
        <div class="error-actions">
          <button class="retry-button" on:click={retryLoad}>
            🔄 Try Again
          </button>
          <a href="{base}/" class="home-link">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  </section>
{/if}

<!-- Quiz Component -->
{#if showQuiz && PersonalizationQuiz}
  <svelte:component this={PersonalizationQuiz} on:complete={handleQuizComplete} />
{/if}

<!-- Optional: Minimal footer with context -->
{#if showQuiz || loadError}
  <section class="quiz-footer">
    <div class="container">
      <div class="footer-content">
        <p class="footer-text">
          This quiz will help you discover which global governance frameworks align with your values and interests.
        </p>
        <a href="{base}/" class="back-link">← Back to Global Governance Frameworks</a>
      </div>
    </div>
  </section>
{/if}

<style>
  .loading-section,
  .error-section {
    min-height: 100vh;
    background: linear-gradient(135deg, #F8FAFC 0%, #E0F2FE 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;
  }
  
  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .loading-content,
  .error-content {
    text-align: center;
    background: white;
    border-radius: 20px;
    padding: 4rem 2rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  }
  
  .loading-spinner {
    width: 60px;
    height: 60px;
    border: 4px solid #e5e7eb;
    border-top: 4px solid #2B4B8C;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 2rem auto;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .loading-content h2,
  .error-content h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #1F2937;
    margin-bottom: 1rem;
  }
  
  .loading-content p {
    font-size: 1.125rem;
    color: #6B7280;
    margin: 0;
  }
  
  .error-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  
  .error-message {
    font-size: 1rem;
    color: #DC2626;
    margin-bottom: 2rem;
    background: #FEF2F2;
    border: 1px solid #FECACA;
    border-radius: 0.5rem;
    padding: 1rem;
  }
  
  .error-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .retry-button {
    background: #2B4B8C;
    color: white;
    border: none;
    padding: 0.875rem 2rem;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .retry-button:hover {
    background: #1e3a72;
    transform: translateY(-2px);
  }
  
  .home-link {
    color: #6B7280;
    text-decoration: none;
    font-weight: 500;
    padding: 0.875rem 2rem;
    border: 2px solid #E5E7EB;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .home-link:hover {
    color: #1F2937;
    border-color: #D1D5DB;
    background: #F9FAFB;
  }
  
  .quiz-footer {
    background: #f8fafc;
    padding: 2rem 0;
    border-top: 1px solid #e5e7eb;
  }
  
  .footer-content {
    text-align: center;
  }
  
  .footer-text {
    color: #6b7280;
    margin-bottom: 1rem;
    font-size: 0.95rem;
  }
  
  .back-link {
    color: #2B4B8C;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
  }
  
  .back-link:hover {
    color: #DAA520;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .loading-content,
    .error-content {
      padding: 3rem 1.5rem;
    }
    
    .loading-content h2,
    .error-content h2 {
      font-size: 1.75rem;
    }
    
    .error-actions {
      flex-direction: column;
      align-items: center;
    }
    
    .retry-button,
    .home-link {
      width: 100%;
      max-width: 300px;
      justify-content: center;
    }
  }
</style>
