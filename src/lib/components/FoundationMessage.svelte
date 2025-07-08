<!-- src/routes/frameworks/find-your-place/components/FoundationMessage.svelte -->
<script>
  import { t } from '$lib/i18n';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  
  let messageVisible = false;
  let currentSlide = 0;
  
  // Foundation message slides for progressive disclosure
  const messageSlides = [
    {
      icon: '🏛️',
      titleKey: 'findYourPlace.foundation.slides.governance.title',
      contentKey: 'findYourPlace.foundation.slides.governance.content',
      highlightKey: 'findYourPlace.foundation.slides.governance.highlight'
    },
    {
      icon: '🌍',
      titleKey: 'findYourPlace.foundation.slides.planetary.title',
      contentKey: 'findYourPlace.foundation.slides.planetary.content',
      highlightKey: 'findYourPlace.foundation.slides.planetary.highlight'
    },
    {
      icon: '🤝',
      titleKey: 'findYourPlace.foundation.slides.cooperation.title',
      contentKey: 'findYourPlace.foundation.slides.cooperation.content',
      highlightKey: 'findYourPlace.foundation.slides.cooperation.highlight'
    },
    {
      icon: '⚡',
      titleKey: 'findYourPlace.foundation.slides.action.title',
      contentKey: 'findYourPlace.foundation.slides.action.content',
      highlightKey: 'findYourPlace.foundation.slides.action.highlight'
    }
  ];
  
  onMount(() => {
    // Fade in the component
    setTimeout(() => {
      messageVisible = true;
    }, 100);
    
    // Auto-advance slides
    const slideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % messageSlides.length;
    }, 4000);
    
    return () => clearInterval(slideInterval);
  });
  
  function goToSlide(index) {
    currentSlide = index;
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % messageSlides.length;
  }
  
  function prevSlide() {
    currentSlide = currentSlide === 0 ? messageSlides.length - 1 : currentSlide - 1;
  }
</script>

<section class="foundation-section" class:visible={messageVisible}>
  <div class="container">
    <!-- Header -->
    <div class="foundation-header">
      <div class="header-icon">🏛️</div>
      <h2>{$t('findYourPlace.foundation.title')}</h2>
      <p class="foundation-subtitle">
        {$t('findYourPlace.foundation.subtitle')}
      </p>
    </div>
    
    <!-- Interactive Message Slides -->
    <div class="message-carousel">
      <div class="slides-container">
        {#each messageSlides as slide, index}
          <div 
            class="message-slide"
            class:active={index === currentSlide}
            class:prev={index === (currentSlide - 1 + messageSlides.length) % messageSlides.length}
            class:next={index === (currentSlide + 1) % messageSlides.length}
          >
            <div class="slide-content">
              <div class="slide-icon">{slide.icon}</div>
              <h3>{$t(slide.titleKey)}</h3>
              <p>{$t(slide.contentKey)}</p>
              <div class="slide-highlight">
                {$t(slide.highlightKey)}
              </div>
            </div>
          </div>
        {/each}
      </div>
      
      <!-- Navigation -->
      <div class="carousel-navigation">
        <button class="nav-button prev" on:click={prevSlide} aria-label="Previous slide">
          ←
        </button>
        
        <div class="slide-indicators">
          {#each messageSlides as _, index}
            <button 
              class="indicator"
              class:active={index === currentSlide}
              on:click={() => goToSlide(index)}
              aria-label="Go to slide {index + 1}"
            />
          {/each}
        </div>
        
        <button class="nav-button next" on:click={nextSlide} aria-label="Next slide">
          →
        </button>
      </div>
    </div>
    
    <!-- Key Points Grid -->
    <div class="key-points">
      <h3>{$t('findYourPlace.foundation.keyPoints.title')}</h3>
      <div class="points-grid">
        <div class="key-point">
          <div class="point-icon">🔗</div>
          <h4>{$t('findYourPlace.foundation.keyPoints.interconnected.title')}</h4>
          <p>{$t('findYourPlace.foundation.keyPoints.interconnected.description')}</p>
        </div>
        
        <div class="key-point">
          <div class="point-icon">⚖️</div>
          <h4>{$t('findYourPlace.foundation.keyPoints.coordination.title')}</h4>
          <p>{$t('findYourPlace.foundation.keyPoints.coordination.description')}</p>
        </div>
        
        <div class="key-point">
          <div class="point-icon">🌱</div>
          <h4>{$t('findYourPlace.foundation.keyPoints.enabling.title')}</h4>
          <p>{$t('findYourPlace.foundation.keyPoints.enabling.description')}</p>
        </div>
      </div>
    </div>
    
    <!-- Call to Action -->
    <div class="foundation-cta">
      <div class="cta-content">
        <h3>{$t('findYourPlace.foundation.cta.title')}</h3>
        <p>{$t('findYourPlace.foundation.cta.description')}</p>
        
        <div class="cta-buttons">
          <a 
            href="{base}/frameworks/treaty-for-our-only-home" 
            class="cta-button primary"
          >
            {$t('findYourPlace.foundation.cta.exploreTreaty')}
          </a>
          
          <a 
            href="{base}/frameworks/docs/implementation" 
            class="cta-button secondary"
          >
            {$t('findYourPlace.foundation.cta.allFrameworks')}
          </a>
        </div>
      </div>
      
      <!-- Visual Element -->
      <div class="cta-visual">
        <div class="foundation-diagram">
          <div class="center-node">
            <span class="node-icon">🏛️</span>
            <span class="node-label">{$t('findYourPlace.foundation.diagram.center')}</span>
          </div>
          
          <div class="connection-nodes">
            <div class="connection-node tier-1">
              <span class="node-icon">🌍</span>
              <span class="node-label">{$t('findYourPlace.foundation.diagram.climate')}</span>
            </div>
            
            <div class="connection-node tier-2">
              <span class="node-icon">⚡</span>
              <span class="node-label">{$t('findYourPlace.foundation.diagram.technology')}</span>
            </div>
            
            <div class="connection-node tier-3">
              <span class="node-icon">🤝</span>
              <span class="node-label">{$t('findYourPlace.foundation.diagram.culture')}</span>
            </div>
            
            <div class="connection-node tier-4">
              <span class="node-icon">🚀</span>
              <span class="node-label">{$t('findYourPlace.foundation.diagram.future')}</span>
            </div>
          </div>
          
          <!-- Animated Connections -->
          <svg class="connection-lines" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#DAA520" stop-opacity="0.8"/>
                <stop offset="100%" stop-color="#B8860B" stop-opacity="0.4"/>
              </linearGradient>
            </defs>
            
            <!-- Center to each node -->
            <line x1="100" y1="100" x2="100" y2="40" stroke="url(#connectionGradient)" stroke-width="2" class="connection-line"/>
            <line x1="100" y1="100" x2="160" y2="100" stroke="url(#connectionGradient)" stroke-width="2" class="connection-line"/>
            <line x1="100" y1="100" x2="100" y2="160" stroke="url(#connectionGradient)" stroke-width="2" class="connection-line"/>
            <line x1="100" y1="100" x2="40" y2="100" stroke="url(#connectionGradient)" stroke-width="2" class="connection-line"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .foundation-section {
    padding: 4rem 0;
    background: linear-gradient(135deg, #FEF7ED 0%, #FDF2E9 50%, #F9FAFB 100%);
    border-top: 1px solid #F3E8D3;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
  }
  
  .foundation-section.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  /* Header */
  .foundation-header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .header-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    display: block;
    animation: gentle-pulse 3s ease-in-out infinite;
  }
  
  .foundation-header h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #92400E;
    margin-bottom: 1rem;
    line-height: 1.2;
  }
  
  .foundation-subtitle {
    font-size: 1.25rem;
    color: #78350F;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
  
  /* Message Carousel */
  .message-carousel {
    margin-bottom: 4rem;
    position: relative;
  }
  
  .slides-container {
    position: relative;
    height: 375px;
    overflow: hidden;
    border-radius: 16px;
    background: white;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
  
  .message-slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.6s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .message-slide.active {
    opacity: 1;
    transform: translateX(0);
  }
  
  .message-slide.prev {
    transform: translateX(-100%);
  }
  
  .message-slide.next {
    transform: translateX(100%);
  }
  
  .slide-content {
    text-align: center;
    padding: 2rem;
    max-width: 600px;
  }
  
  .slide-icon {
    font-size: 3rem;
    margin-bottom: 1.5rem;
    display: block;
  }
  
  .slide-content h3 {
    font-size: 1.875rem;
    font-weight: 600;
    color: #1F2937;
    margin-bottom: 1rem;
  }
  
  .slide-content p {
    font-size: 1.125rem;
    color: #4B5563;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  
  .slide-highlight {
    background: linear-gradient(135deg, #FEF3C7, #FDE68A);
    border: 1px solid #F59E0B;
    border-radius: 12px;
    padding: 1rem;
    font-weight: 600;
    color: #92400E;
    font-size: 1rem;
  }
  
  /* Carousel Navigation */
  .carousel-navigation {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
  }
  
  .nav-button {
    background: white;
    border: 2px solid #E5E7EB;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    font-weight: 600;
    color: #6B7280;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .nav-button:hover {
    border-color: #DAA520;
    color: #B8860B;
    background: #FEF7ED;
    transform: scale(1.05);
  }
  
  .slide-indicators {
    display: flex;
    gap: 0.75rem;
  }
  
  .indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
    background: #D1D5DB;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .indicator.active {
    background: #DAA520;
    transform: scale(1.2);
  }
  
  .indicator:hover {
    background: #B8860B;
  }
  
  /* Key Points */
  .key-points {
    margin-bottom: 4rem;
  }
  
  .key-points h3 {
    font-size: 2rem;
    font-weight: 600;
    color: #92400E;
    text-align: center;
    margin-bottom: 2.5rem;
  }
  
  .points-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .key-point {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border-left: 4px solid #DAA520;
    transition: transform 0.3s ease;
  }
  
  .key-point:hover {
    transform: translateY(-5px);
  }
  
  .point-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    display: block;
  }
  
  .key-point h4 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1F2937;
    margin-bottom: 0.75rem;
  }
  
  .key-point p {
    color: #4B5563;
    line-height: 1.6;
  }
  
  /* Call to Action */
  .foundation-cta {
    background: white;
    border-radius: 20px;
    padding: 3rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
  }
  
  .cta-content h3 {
    font-size: 2rem;
    font-weight: 600;
    color: #1F2937;
    margin-bottom: 1rem;
  }
  
  .cta-content p {
    font-size: 1.125rem;
    color: #4B5563;
    line-height: 1.6;
    margin-bottom: 2rem;
  }
  
  .cta-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .cta-button {
    padding: 0.875rem 2rem;
    border-radius: 12px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 180px;
  }
  
  .cta-button.primary {
    background: #DAA520;
    color: white;
    box-shadow: 0 4px 12px rgba(218, 165, 32, 0.3);
  }
  
  .cta-button.primary:hover {
    background: #B8860B;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(218, 165, 32, 0.4);
  }
  
  .cta-button.secondary {
    background: transparent;
    color: #2B4B8C;
    border: 2px solid #2B4B8C;
  }
  
  .cta-button.secondary:hover {
    background: #2B4B8C;
    color: white;
    transform: translateY(-2px);
  }
  
  /* Foundation Diagram */
  .cta-visual {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .foundation-diagram {
    position: relative;
    width: 300px;
    height: 300px;
  }
  
  .center-node {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, #DAA520, #B8860B);
    color: white;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 20px rgba(218, 165, 32, 0.3);
    z-index: 10;
  }
  
  .node-icon {
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
  }
  
  .node-label {
    font-size: 0.7rem;
    font-weight: 600;
    text-align: center;
    line-height: 1.1;
  }
  
  .connection-nodes {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .connection-node {
    position: absolute;
    background: white;
    border: 3px solid;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    animation: float 4s ease-in-out infinite;
  }
  
  .connection-node.tier-1 {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    border-color: #DC2626;
    animation-delay: 0s;
  }
  
  .connection-node.tier-2 {
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    border-color: #2563EB;
    animation-delay: 1s;
  }
  
  .connection-node.tier-3 {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    border-color: #7C3AED;
    animation-delay: 2s;
  }
  
  .connection-node.tier-4 {
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    border-color: #059669;
    animation-delay: 3s;
  }
  
  .connection-node .node-icon {
    font-size: 1.25rem;
    margin-bottom: 0.125rem;
  }
  
  .connection-node .node-label {
    font-size: 0.6rem;
    font-weight: 600;
    color: #374151;
    text-align: center;
    line-height: 1;
  }
  
  .connection-lines {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
  }
  
  .connection-line {
    animation: pulse-line 2s ease-in-out infinite;
  }
  
  /* Animations */
  @keyframes gentle-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes pulse-line {
    0%, 100% { opacity: 0.6; stroke-width: 2; }
    50% { opacity: 1; stroke-width: 3; }
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .foundation-section {
      padding: 3rem 0;
    }
    
    .foundation-header h2 {
      font-size: 2rem;
    }
    
    .slides-container {
      height: 425px;
    }
    
    .slide-content {
      padding: 1.5rem;
    }
    
    .slide-content h3 {
      font-size: 1.5rem;
    }
    
    .points-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .foundation-cta {
      grid-template-columns: 1fr;
      gap: 2rem;
      padding: 2rem;
    }
    
    .cta-buttons {
      justify-content: center;
    }
    
    .foundation-diagram {
      width: 250px;
      height: 250px;
    }
    
    .center-node {
      width: 80px;
      height: 80px;
    }
    
    .connection-node {
      width: 60px;
      height: 60px;
    }
    
    .carousel-navigation {
      gap: 1rem;
    }
  }
  
  @media (max-width: 480px) {
    .foundation-cta {
      padding: 1.5rem;
    }
    
    .cta-buttons {
      flex-direction: column;
    }
    
    .cta-button {
      width: 100%;
    }
    
    .foundation-diagram {
      width: 200px;
      height: 200px;
    }
    
    .slide-content h3 {
      font-size: 1.25rem;
    }
    
    .slide-content p {
      font-size: 1rem;
    }
  }
</style>

