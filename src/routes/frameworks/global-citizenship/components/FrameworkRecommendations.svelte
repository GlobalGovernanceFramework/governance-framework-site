<!-- src/routes/frameworks/global-citizenship/components/FrameworkRecommendations.svelte -->
<script>
  import { t } from '$lib/i18n';
  import { base } from '$app/paths';
  import { allFrameworks, getFrameworkBySlug, tierMetadata } from '$lib/stores/frameworkNav.js';
  
  export let quizResults;
  
  // Enhanced framework database using frameworkNav.js data
  const frameworkDatabase = allFrameworks.reduce((acc, framework) => {
    // Convert slug to kebab-case key for compatibility
    const key = framework.slug;
    
    // Get tier colors
    const tierColors = {
      0: '#8B5A3C',
      1: '#2D5F2D', 
      2: '#6B5CA5',
      3: '#DEB887',
      4: '#2F4F4F'
    };
    
    // Get framework icons based on slug patterns
    const getIcon = (slug) => {
      if (slug.includes('treaty')) return '🏛️';
      if (slug.includes('climate') || slug.includes('energy')) return '🌍';
      if (slug.includes('peace')) return '🕊️';
      if (slug.includes('technology')) return '⚡';
      if (slug.includes('education')) return '📚';
      if (slug.includes('digital')) return '💻';
      if (slug.includes('culture')) return '🏛️';
      if (slug.includes('space')) return '🚀';
      if (slug.includes('consciousness')) return '🧠';
      if (slug.includes('environment')) return '🌱';
      if (slug.includes('urban')) return '🏙️';
      if (slug.includes('ethics')) return '⚖️';
      return '📋'; // Default icon
    };
    
    acc[key] = {
      name: framework.titleKey,
      description: `globalCitizenship.frameworks.database.${framework.slug.replace(/-/g, '')}.description`,
      tier: framework.tier,
      color: tierColors[framework.tier] || '#6B7280',
      route: framework.path,
      importance: framework.tier === 0 ? 'critical' : 'normal',
      icon: getIcon(framework.slug),
      status: framework.status,
      version: framework.version
    };
    
    return acc;
  }, {});
  
  // Add Spiral Dynamics as special case
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
  
  // Get framework details
  function getFrameworkDetails(frameworkId) {
    // Try direct lookup first
    if (frameworkDatabase[frameworkId]) {
      return frameworkDatabase[frameworkId];
    }
    
    // Try to find by converting camelCase to slug
    const slug = frameworkId.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    if (frameworkDatabase[slug]) {
      return frameworkDatabase[slug];
    }
    
    // Try to find by slug directly in frameworkNav
    const framework = getFrameworkBySlug(frameworkId);
    if (framework) {
      return getFrameworkDetails(framework.slug);
    }
    
    return null;
  }
  
  // Get recommended frameworks with details
  function getRecommendedFrameworks() {
    if (!quizResults?.recommendedFrameworks) return [];
    return quizResults.recommendedFrameworks
      .map(framework => {
        // Handle both framework objects and IDs
        const id = typeof framework === 'object' ? framework.slug || framework.id : framework;
        return getFrameworkDetails(id);
      })
      .filter(Boolean);
  }
  
  // Get related frameworks with details
  function getRelatedFrameworks() {
    if (!quizResults?.relatedFrameworks) return [];
    return quizResults.relatedFrameworks
      .map(framework => {
        const id = typeof framework === 'object' ? framework.slug || framework.id : framework;
        return getFrameworkDetails(id);
      })
      .filter(Boolean)
      .slice(0, 6);
  }
  
  // Get tier label and styling using frameworkNav.js tierMetadata
  function getTierInfo(tier) {
    if (typeof tier === 'number' && tierMetadata[tier]) {
      const tierConfig = {
        0: { class: 'tier-0', priority: 'critical' },
        1: { class: 'tier-1', priority: 'urgent' },
        2: { class: 'tier-2', priority: 'important' },
        3: { class: 'tier-3', priority: 'strategic' },
        4: { class: 'tier-4', priority: 'visionary' }
      };
      
      return {
        label: tierMetadata[tier].titleKey,
        class: tierConfig[tier]?.class || 'tier-1',
        priority: tierConfig[tier]?.priority || 'normal'
      };
    }
    
    // Handle special tiers like 'developmental'
    return {
      label: 'globalCitizenship.tiers.developmental',
      class: 'tier-developmental',
      priority: 'strategic'
    };
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
</script>

<section class="recommendations-section">
  <div class="container">
    <!-- Primary Recommendations -->
    <div class="primary-recommendations">
      <div class="section-header">
        <h2>{$t('globalCitizenship.recommendations.primary.title')}</h2>
        <p class="section-description">
          {$t('globalCitizenship.recommendations.primary.description')}
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
                  <span class="priority-star">⭐</span>
                {/if}
                {#if index === 0}
                  <span class="primary-badge">{$t('globalCitizenship.recommendations.primaryBadge')}</span>
                {/if}
              </div>
            </div>
            
            <div class="card-content">
              <h3>{$t(framework.name)}</h3>
              <p>{$t(framework.description)}</p>
              
              {#if framework.importance === 'critical'}
                <div class="foundation-note">
                  {$t('globalCitizenship.recommendations.foundationNote')}
                </div>
              {/if}
            </div>
            
            <div class="card-footer">
              <span class="explore-link">
                {$t('globalCitizenship.recommendations.exploreFramework')} →
              </span>
            </div>
          </a>
        {/each}
      </div>
    </div>

    {#if shouldShowSpiralDynamics()}
      <div class="developmental-framework-section">
        <div class="developmental-header">
          <h3>🌀 Enhance Your Understanding</h3>
          <p>Understanding different worldviews can deepen your global citizenship practice</p>
        </div>
        
        <div class="developmental-framework-recommendation">
          <div class="framework-card spiral-dynamics">
            <div class="framework-header">
              <div class="framework-icon-large">🌀</div>
              <div class="framework-meta">
                <h4>Spiral Dynamics</h4>
                <span class="framework-badge developmental">Developmental Framework</span>
              </div>
            </div>
            
            <div class="framework-content">
              <p>Understanding how different value systems emerge and evolve helps navigate the complexity of global citizenship. This framework reveals why people approach the same challenges so differently.</p>
              
              <div class="framework-benefits">
                <span class="benefit">Cross-cultural understanding</span>
                <span class="benefit">Systems thinking</span>
                <span class="benefit">Conflict resolution</span>
              </div>
              
              <div class="spiral-stages-preview">
                <div class="stages-container">
                  <span class="stage-dot beige" title="Survival"></span>
                  <span class="stage-dot purple" title="Tribal"></span>
                  <span class="stage-dot red" title="Power"></span>
                  <span class="stage-dot blue" title="Order"></span>
                  <span class="stage-dot orange" title="Achievement"></span>
                  <span class="stage-dot green" title="Community"></span>
                  <span class="stage-dot yellow" title="Integral"></span>
                  <span class="stage-dot turquoise" title="Holistic"></span>
                </div>
                <span class="stages-label">8 Stages of Human Development</span>
              </div>
            </div>
            
            <div class="framework-action">
              <a href="https://www.spiralize.org" target="_blank" rel="noopener noreferrer" class="explore-framework">
                Learn for Free at Spiralize.org →
              </a>
              <span class="external-note">External resource</span>
            </div>
          </div>
        </div>
      </div>
    {/if}
    
    <!-- Related Frameworks -->
    {#if getRelatedFrameworks().length > 0}
      <div class="related-recommendations">
        <div class="section-header">
          <h3>{$t('globalCitizenship.recommendations.related.title')}</h3>
          <p class="section-description">
            {$t('globalCitizenship.recommendations.related.description')}
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
            {$t('globalCitizenship.recommendations.exploreAll')} →
          </a>
        </div>
      </div>
    {/if}
    
    <!-- Personalization Summary -->
    <div class="personalization-summary">
      <h3>{$t('globalCitizenship.recommendations.summary.title')}</h3>
      <div class="summary-content">
        <div class="summary-item">
          <strong>{$t('globalCitizenship.recommendations.summary.primaryInterest')}:</strong>
          {$t(getFrameworkDetails(quizResults.primaryInterest)?.name || 'globalCitizenship.recommendations.summary.unknown')}
        </div>
        <div class="summary-item">
          <strong>{$t('globalCitizenship.recommendations.summary.totalFrameworks')}:</strong>
          {getRecommendedFrameworks().length + getRelatedFrameworks().length} {$t('globalCitizenship.recommendations.summary.frameworks')}
        </div>
        <div class="summary-item">
          <strong>{$t('globalCitizenship.recommendations.summary.nextStep')}:</strong>
          {$t('globalCitizenship.recommendations.summary.nextStepText')}
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
