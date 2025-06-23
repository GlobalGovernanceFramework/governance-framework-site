<!-- src/routes/frameworks/global-citizenship/components/PersonalizationQuiz.svelte -->
<script>
  import { t } from '$lib/i18n';
  import { createEventDispatcher } from 'svelte';
  import { allFrameworks, getFrameworkBySlug } from '$lib/stores/frameworkNav.js';
  
  const dispatch = createEventDispatcher();
  
  let currentQuestion = 0;
  let answers = {};
  
  // Enhanced quiz structure with tiered mapping using frameworkNav.js data
  const quizStructure = [
    {
      id: 'values',
      options: [
        { 
          key: 'climate',
          primary: ['climate-and-energy-governance', 'environmental-stewardship'],
          secondary: ['biodiversity-governance', 'oceans-and-marine-governance', 'food-systems-and-agriculture'],
          tertiary: ['treaty-for-our-only-home', 'existential-risk-governance']
        },
        { 
          key: 'justice',
          primary: ['peace-and-conflict-resolution', 'justice-systems'],
          secondary: ['indigenous-governance-and-traditional-knowledge', 'global-ethics-and-rights-of-beings', 'gender-equality-and-lgbtq-rights'],
          tertiary: ['treaty-for-our-only-home', 'implementation-methods-and-tools']
        },
        { 
          key: 'technology',
          primary: ['technology-governance', 'digital-commons'],
          secondary: ['space-governance', 'existential-risk-governance', 'consciousness-and-inner-development'],
          tertiary: ['treaty-for-our-only-home', 'implementation-methods-and-tools']
        },
        { 
          key: 'community',
          primary: ['cultural-heritage-preservation', 'urban-and-community-development'],
          secondary: ['religious-and-spiritual-dialogue-governance', 'rural-development-governance', 'youth-and-intergenerational-governance'],
          tertiary: ['treaty-for-our-only-home', 'wisdom-governance']
        },
        { 
          key: 'systems',
          primary: ['treaty-for-our-only-home'],
          secondary: ['implementation-methods-and-tools'],
          tertiary: ['wisdom-governance'],
          highlight: true
        }
      ]
    },
    {
      id: 'contribution',
      options: [
        { 
          key: 'learning',
          primary: ['educational-systems', 'consciousness-and-inner-development'],
          secondary: ['cultural-heritage-preservation', 'digital-commons', 'youth-and-intergenerational-governance'],
          tertiary: ['treaty-for-our-only-home', 'wisdom-governance']
        },
        { 
          key: 'building',
          primary: ['urban-and-community-development', 'technology-governance'],
          secondary: ['space-governance', 'implementation-methods-and-tools', 'digital-commons'],
          tertiary: ['treaty-for-our-only-home', 'implementation-methods-and-tools']
        },
        { 
          key: 'protecting',
          primary: ['environmental-stewardship', 'planetary-health'],
          secondary: ['biodiversity-governance', 'mental-health-governance', 'animal-welfare-governance'],
          tertiary: ['treaty-for-our-only-home', 'existential-risk-governance']
        },
        { 
          key: 'advocating',
          primary: ['peace-and-conflict-resolution', 'global-ethics-and-rights-of-beings'],
          secondary: ['labor-and-employment-governance', 'migration-and-human-mobility', 'gender-equality-and-lgbtq-rights'],
          tertiary: ['treaty-for-our-only-home', 'justice-systems']
        },
        { 
          key: 'transforming',
          primary: ['treaty-for-our-only-home'],
          secondary: ['implementation-methods-and-tools', 'economic-integration'],
          tertiary: ['wisdom-governance'],
          highlight: true
        }
      ]
    },
    {
      id: 'scale',
      options: [
        { 
          key: 'local',
          primary: ['urban-and-community-development', 'mental-health-governance'],
          secondary: ['rural-development-governance', 'consciousness-and-inner-development', 'cultural-heritage-preservation'],
          tertiary: ['treaty-for-our-only-home', 'wisdom-governance']
        },
        { 
          key: 'national',
          primary: ['economic-integration', 'educational-systems'],
          secondary: ['planetary-health', 'labor-and-employment-governance', 'financial-systems'],
          tertiary: ['treaty-for-our-only-home', 'implementation-methods-and-tools']
        },
        { 
          key: 'global',
          primary: ['climate-and-energy-governance', 'peace-and-conflict-resolution', 'treaty-for-our-only-home'],
          secondary: ['biodiversity-governance', 'migration-and-human-mobility', 'oceans-and-marine-governance'],
          tertiary: ['existential-risk-governance', 'space-governance']
        },
        { 
          key: 'intergenerational',
          primary: ['youth-and-intergenerational-governance', 'space-governance'],
          secondary: ['existential-risk-governance', 'consciousness-and-inner-development', 'wisdom-governance'],
          tertiary: ['treaty-for-our-only-home', 'implementation-methods-and-tools']
        },
        { 
          key: 'connected',
          primary: ['treaty-for-our-only-home'],
          secondary: ['implementation-methods-and-tools'],
          tertiary: ['wisdom-governance', 'consciousness-and-inner-development'],
          highlight: true
        }
      ]
    }
  ];
  
  function handleAnswer(option) {
    answers[quizStructure[currentQuestion].id] = option;
    
    if (currentQuestion < quizStructure.length - 1) {
      currentQuestion++;
    } else {
      calculateResults();
    }
  }
  
  function calculateResults() {
    // Collect all frameworks with weighted scoring
    const frameworkScores = {};
    
    Object.values(answers).forEach(answer => {
      // Primary frameworks get 3 points
      answer.primary.forEach(frameworkSlug => {
        frameworkScores[frameworkSlug] = (frameworkScores[frameworkSlug] || 0) + 3;
      });
      
      // Secondary frameworks get 2 points
      answer.secondary.forEach(frameworkSlug => {
        frameworkScores[frameworkSlug] = (frameworkScores[frameworkSlug] || 0) + 2;
      });
      
      // Tertiary frameworks get 1 point
      answer.tertiary.forEach(frameworkSlug => {
        frameworkScores[frameworkSlug] = (frameworkScores[frameworkSlug] || 0) + 1;
      });
    });
    
    // Special bonus for treaty framework (foundation)
    if (frameworkScores['treaty-for-our-only-home']) {
      frameworkScores['treaty-for-our-only-home'] += 5;
    }
    
    // Convert scores to framework objects and sort by score
    const sortedFrameworks = Object.entries(frameworkScores)
      .map(([slug, score]) => {
        const framework = getFrameworkBySlug(slug);
        return framework ? { ...framework, score } : null;
      })
      .filter(Boolean)
      .sort((a, b) => {
        // Sort by score first, then by tier (lower tier = higher priority)
        if (b.score !== a.score) return b.score - a.score;
        return a.tier - b.tier;
      });
    
    // Ensure treaty is in top 3 if mentioned
    const topRecommendations = [];
    const treatyFramework = sortedFrameworks.find(f => f.slug === 'treaty-for-our-only-home');
    if (treatyFramework) {
      topRecommendations.push(treatyFramework);
    }
    
    // Add other top frameworks
    sortedFrameworks
      .filter(f => f.slug !== 'treaty-for-our-only-home')
      .slice(0, topRecommendations.length === 1 ? 2 : 3)
      .forEach(f => topRecommendations.push(f));
    
    // Collect related frameworks (lower scoring ones)
    const allSecondaryTertiary = [];
    Object.values(answers).forEach(answer => {
      allSecondaryTertiary.push(...answer.secondary, ...answer.tertiary);
    });
    
    const relatedFrameworks = [...new Set(allSecondaryTertiary)]
      .map(slug => getFrameworkBySlug(slug))
      .filter(Boolean)
      .filter(f => !topRecommendations.some(top => top.slug === f.slug))
      .slice(0, 6);
    
    const results = {
      answers,
      recommendedFrameworks: topRecommendations,
      relatedFrameworks,
      primaryInterest: topRecommendations[0]?.slug || 'treaty-for-our-only-home',
      allScores: frameworkScores
    };
    
    dispatch('complete', results);
  }
  
  function goBack() {
    if (currentQuestion > 0) {
      currentQuestion--;
    }
  }
  
  $: currentQuestionData = quizStructure[currentQuestion];
  $: progress = ((currentQuestion + 1) / quizStructure.length) * 100;
</script>

<section class="quiz-section">
  <div class="container">
    <div class="quiz-container">
      <!-- Header -->
      <div class="quiz-header">
        <h1>{$t('globalCitizenship.quiz.title')}</h1>
        <p class="quiz-subtitle">{$t('globalCitizenship.quiz.subtitle')}</p>
        
        <!-- Progress Bar -->
        <div class="progress-container">
          <div class="progress-bar" style="width: {progress}%"></div>
        </div>
        
        <!-- Question Counter -->
        <div class="question-counter">
          {$t('globalCitizenship.quiz.questionCounter', { 
            current: currentQuestion + 1, 
            total: quizStructure.length 
          })}
        </div>
      </div>
      
      <!-- Question -->
      <div class="question-container">
        <h2 class="question-title">
          {$t(`globalCitizenship.quiz.questions.${currentQuestionData.id}.question`)}
        </h2>
        
        <div class="options-grid">
          {#each currentQuestionData.options as option}
            <button
              class="option-button"
              class:highlighted={option.highlight}
              on:click={() => handleAnswer(option)}
            >
              <div class="option-content">
                <h3>{$t(`globalCitizenship.quiz.questions.${currentQuestionData.id}.options.${option.key}.title`)}</h3>
                <p>{$t(`globalCitizenship.quiz.questions.${currentQuestionData.id}.options.${option.key}.description`)}</p>
                {#if option.highlight}
                  <div class="highlight-badge">
                    ⭐ {$t('globalCitizenship.quiz.foundationBadge')}
                  </div>
                {/if}
              </div>
            </button>
          {/each}
        </div>
        
        <!-- Navigation -->
        <div class="quiz-navigation">
          {#if currentQuestion > 0}
            <button class="nav-button secondary" on:click={goBack}>
              ← {$t('globalCitizenship.quiz.navigation.back')}
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .quiz-section {
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
  
  .quiz-container {
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .quiz-header {
    background: linear-gradient(135deg, #2B4B8C 0%, #6B5CA5 100%);
    color: white;
    padding: 3rem 2rem 2rem 2rem;
    text-align: center;
  }
  
  .quiz-header h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.2;
  }
  
  .quiz-subtitle {
    font-size: 1.25rem;
    opacity: 0.9;
    margin-bottom: 2rem;
    line-height: 1.5;
  }
  
  .progress-container {
    background: rgba(255, 255, 255, 0.2);
    height: 8px;
    border-radius: 4px;
    margin-bottom: 1rem;
    overflow: hidden;
  }
  
  .progress-bar {
    background: #DAA520;
    height: 100%;
    border-radius: 4px;
    transition: width 0.5s ease;
  }
  
  .question-counter {
    font-size: 0.95rem;
    opacity: 0.8;
  }
  
  .question-container {
    padding: 3rem 2rem;
  }
  
  .question-title {
    font-size: 2rem;
    font-weight: 600;
    color: #1F2937;
    text-align: center;
    margin-bottom: 3rem;
    line-height: 1.3;
  }
  
  .options-grid {
    display: grid;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
  
  .option-button {
    background: white;
    border: 2px solid #E5E7EB;
    border-radius: 16px;
    padding: 0;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: left;
    width: 100%;
  }
  
  .option-button:hover {
    border-color: #2B4B8C;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(43, 75, 140, 0.15);
  }
  
  .option-button.highlighted {
    border-color: #DAA520;
    background: linear-gradient(135deg, #FEF7ED 0%, #FDF2E9 100%);
    box-shadow: 0 4px 20px rgba(218, 165, 32, 0.2);
  }
  
  .option-button.highlighted:hover {
    border-color: #B8860B;
    box-shadow: 0 8px 30px rgba(218, 165, 32, 0.3);
  }
  
  .option-content {
    padding: 1.5rem;
    position: relative;
  }
  
  .option-content h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1F2937;
    margin-bottom: 0.5rem;
  }
  
  .option-content p {
    font-size: 0.95rem;
    color: #6B7280;
    line-height: 1.6;
    margin: 0;
  }
  
  .highlight-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: #DAA520;
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(218, 165, 32, 0.3);
  }
  
  .quiz-navigation {
    display: flex;
    justify-content: center;
  }
  
  .nav-button {
    background: #F3F4F6;
    color: #4B5563;
    border: none;
    padding: 0.875rem 2rem;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .nav-button:hover {
    background: #E5E7EB;
    color: #1F2937;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .quiz-header {
      padding: 2rem 1.5rem 1.5rem 1.5rem;
    }
    
    .quiz-header h1 {
      font-size: 2rem;
    }
    
    .quiz-subtitle {
      font-size: 1.1rem;
    }
    
    .question-container {
      padding: 2rem 1.5rem;
    }
    
    .question-title {
      font-size: 1.5rem;
      margin-bottom: 2rem;
    }
    
    .option-content {
      padding: 1.5rem;
    }
    
    .highlight-badge {
      position: static;
      margin-top: 1rem;
      display: inline-block;
    }
  }
  
  @media (max-width: 480px) {
    .quiz-section {
      padding: 1rem 0;
    }
    
    .quiz-header h1 {
      font-size: 1.75rem;
    }
    
    .question-title {
      font-size: 1.25rem;
    }
    
    .option-content {
      padding: 1.25rem;
    }
    
    .option-content h3 {
      font-size: 1.1rem;
    }
  }
</style>
