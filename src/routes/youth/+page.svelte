<!-- src/routes/youth-and-intergenerational-governance/+page.svelte -->
<script>
  import { t, locale } from '$lib/i18n';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';

  let isVisible = false;
  
  onMount(() => {
    setTimeout(() => {
      isVisible = true;
    }, 100);
  });

  // Reactive variables for localized links
  $: comicLink = `${base}/frameworks/tools/youth-and-intergenerational-governance/youth-governance-comic-${$locale}.pdf`;
  $: starterKitLink = `${base}/frameworks/tools/youth-and-intergenerational-governance/youth-leadership-starter-kit-${$locale}.pdf`;
  $: circleGuideLink = `${base}/frameworks/tools/youth-and-intergenerational-governance/youth-dialogue-circle-guide-${$locale}.pdf`;
  $: mindfulnessLink = `${base}/frameworks/tools/youth-and-intergenerational-governance/youth-mindfulness-guide-${$locale}.pdf`;
  $: actionGuideLink = `${base}/frameworks/tools/youth-and-intergenerational-governance/youth-community-action-guide-${$locale}.pdf`;

  // Youth resources with reactive links
  $: youthResources = [
    {
      id: 'comic',
      emoji: '📚',
      title: $t('youth.getStarted.resources.comic.title'),
      description: $t('youth.getStarted.resources.comic.description'),
      color: '#6B5CA5',
      action: $t('youth.getStarted.resources.comic.action'),
      link: comicLink
    },
    {
      id: 'circles',
      emoji: '🤝',
      title: $t('youth.getStarted.resources.circles.title'),
      description: $t('youth.getStarted.resources.circles.description'),
      color: '#2D5F2D',
      action: $t('youth.getStarted.resources.circles.action'),
      link: circleGuideLink
    },
    {
      id: 'mindfulness',
      emoji: '🧘',
      title: $t('youth.getStarted.resources.mindfulness.title'),
      description: $t('youth.getStarted.resources.mindfulness.description'),
      color: '#2B4B8C',
      action: $t('youth.getStarted.resources.mindfulness.action'),
      link: mindfulnessLink
    },
    {
      id: 'action',
      emoji: '🚀',
      title: $t('youth.getStarted.resources.action.title'),
      description: $t('youth.getStarted.resources.action.description'),
      color: '#DAA520',
      action: $t('youth.getStarted.resources.action.action'),
      link: actionGuideLink
    }
  ];

  $: youthStories = [
    {
      name: $t('youth.stories.leaders.greta.name'),
      age: $t('youth.stories.leaders.greta.age'),
      location: $t('youth.stories.leaders.greta.location'),
      impact: $t('youth.stories.leaders.greta.impact'),
      lesson: $t('youth.stories.leaders.greta.lesson')
    },
    {
      name: $t('youth.stories.leaders.autumn.name'),
      age: $t('youth.stories.leaders.autumn.age'),
      location: $t('youth.stories.leaders.autumn.location'),
      impact: $t('youth.stories.leaders.autumn.impact'),
      lesson: $t('youth.stories.leaders.autumn.lesson')
    },
    {
      name: $t('youth.stories.leaders.mari.name'),
      age: $t('youth.stories.leaders.mari.age'),
      location: $t('youth.stories.leaders.mari.location'),
      impact: $t('youth.stories.leaders.mari.impact'),
      lesson: $t('youth.stories.leaders.mari.lesson')
    },
    {
      name: $t('youth.stories.leaders.xiuhtezcatl.name'),
      age: $t('youth.stories.leaders.xiuhtezcatl.age'),
      location: $t('youth.stories.leaders.xiuhtezcatl.location'),
      impact: $t('youth.stories.leaders.xiuhtezcatl.impact'),
      lesson: $t('youth.stories.leaders.xiuhtezcatl.lesson')
    }
  ];

  $: actionIdeas = [
    { 
      category: $t('youth.actionIdeas.categories.school.title'), 
      ideas: $t('youth.actionIdeas.categories.school.ideas')
    },
    { 
      category: $t('youth.actionIdeas.categories.community.title'), 
      ideas: $t('youth.actionIdeas.categories.community.ideas')
    },
    { 
      category: $t('youth.actionIdeas.categories.digital.title'), 
      ideas: $t('youth.actionIdeas.categories.digital.ideas')
    },
    { 
      category: $t('youth.actionIdeas.categories.personal.title'), 
      ideas: $t('youth.actionIdeas.categories.personal.ideas')
    }
  ];
</script>

<svelte:head>
  <title>{$t('youth.title')} - Global Governance Framework</title>
  <meta name="description" content={$t('youth.metaDescription')} />
</svelte:head>

<style>
  .hero-youth {
    padding: 4rem 0;
    background: linear-gradient(135deg, #6B5CA5 0%, #2B4B8C 50%, #DAA520 100%);
    color: white;
    position: relative;
    overflow: hidden;
  }
  
  .hero-youth::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="80" r="1.5" fill="rgba(255,255,255,0.1)"/></svg>');
    animation: float 20s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    position: relative;
    z-index: 1;
  }
  
  .hero-content {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .hero-title {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  }
  
  .hero-subtitle {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    opacity: 0.95;
  }
  
  .hero-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .btn-primary {
    background-color: #DAA520;
    color: #2B4B8C;
    font-weight: 700;
    padding: 1rem 2rem;
    border-radius: 50px;
    text-decoration: none;
    box-shadow: 0 6px 12px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
  }
  
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.3);
  }
  
  .btn-secondary {
    background-color: transparent;
    color: white;
    border: 2px solid #DAA520;
    font-weight: 600;
    padding: 1rem 2rem;
    border-radius: 50px;
    text-decoration: none;
    transition: all 0.3s ease;
  }
  
  .btn-secondary:hover {
    background-color: #DAA520;
    color: #2B4B8C;
  }
  
  .section {
    padding: 4rem 0;
  }
  
  .section-title {
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 1rem;
    color: #2B4B8C;
  }
  
  .section-subtitle {
    font-size: 1.25rem;
    text-align: center;
    color: #4b5563;
    margin-bottom: 3rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .resources-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }
  
  .resource-card {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
    border-top: 4px solid var(--card-color);
  }
  
  .resource-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }
  
  .resource-emoji {
    font-size: 3rem;
    margin-bottom: 1rem;
    display: block;
  }
  
  .resource-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #2B4B8C;
  }
  
  .resource-description {
    color: #4b5563;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
  
  .resource-action {
    background-color: var(--card-color);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    font-weight: 600;
    display: inline-block;
    transition: all 0.3s ease;
  }
  
  .resource-action:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  
  .stories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .story-card {
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    border-radius: 1rem;
    padding: 1.5rem;
    border-left: 4px solid #2B4B8C;
  }
  
  .story-name {
    font-size: 1.25rem;
    font-weight: 700;
    color: #2B4B8C;
    margin-bottom: 0.5rem;
  }
  
  .story-details {
    font-size: 0.9rem;
    color: #6b7280;
    margin-bottom: 0.75rem;
  }
  
  .story-impact {
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
  }
  
  .story-lesson {
    font-style: italic;
    color: #2B4B8C;
    font-weight: 500;
  }
  
  .action-categories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }
  
  .action-category {
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  
  .action-category-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #2B4B8C;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .action-list {
    list-style: none;
    padding: 0;
  }
  
  .action-item {
    background: #f8fafc;
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
    border-left: 3px solid #DAA520;
    font-weight: 500;
    color: #374151;
  }
  
  .comic-preview {
    background: linear-gradient(135deg, #6B5CA5 0%, #2B4B8C 100%);
    border-radius: 1rem;
    padding: 2rem;
    color: white;
    text-align: center;
    margin: 2rem 0;
  }
  
  .comic-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  .comic-panels {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin: 2rem 0;
  }
  
  .comic-panel {
    background: rgba(255,255,255,0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    backdrop-filter: blur(10px);
  }
  
  .panel-title {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .panel-description {
    font-size: 0.9rem;
    opacity: 0.9;
  }
  
  .cta-section {
    background: linear-gradient(135deg, #DAA520 0%, #B8860B 100%);
    color: white;
    text-align: center;
    border-radius: 1rem;
    padding: 3rem 2rem;
    margin: 3rem 0;
  }
  
  .cta-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  .cta-description {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    opacity: 0.95;
  }
  
  @media (max-width: 768px) {
    .hero-title {
      font-size: 2rem;
    }
    
    .hero-subtitle {
      font-size: 1.25rem;
    }
    
    .hero-buttons {
      flex-direction: column;
      align-items: center;
    }
    
    .btn-primary, .btn-secondary {
      width: 100%;
      max-width: 300px;
    }
  }
</style>

<!-- Hero Section -->
<section class="hero-youth">
  <div class="container">
    <div class="hero-content">
      <h1 class="hero-title">🌟 {$t('youth.hero.title')}</h1>
      <p class="hero-subtitle">{$t('youth.hero.subtitle')}</p>
      <div class="hero-buttons">
        <button class="btn-primary" on:click={() => document.getElementById('get-started').scrollIntoView()}>
          {$t('youth.hero.primaryButton')}
        </button>
        <a href="#stories" class="btn-secondary">{$t('youth.hero.secondaryButton')}</a>
      </div>
    </div>
  </div>
</section>

<!-- What is Conscious Leadership Section -->
<section class="section" style="background-color: #f9fafb;">
  <div class="container">
    <h2 class="section-title">{$t('youth.consciousLeadership.title')}</h2>
    <p class="section-subtitle">
      {$t('youth.consciousLeadership.subtitle')}
    </p>
    
    <div style="max-width: 800px; margin: 0 auto; background: white; border-radius: 1rem; padding: 2rem; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 2rem; text-align: center;">
        <div>
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🧭</div>
          <h3 style="color: #2B4B8C; font-weight: 600; margin-bottom: 0.5rem;">{$t('youth.consciousLeadership.traits.selfAware.title')}</h3>
          <p style="color: #6b7280; font-size: 0.9rem;">{$t('youth.consciousLeadership.traits.selfAware.description')}</p>
        </div>
        <div>
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">❤️</div>
          <h3 style="color: #2B4B8C; font-weight: 600; margin-bottom: 0.5rem;">{$t('youth.consciousLeadership.traits.empathetic.title')}</h3>
          <p style="color: #6b7280; font-size: 0.9rem;">{$t('youth.consciousLeadership.traits.empathetic.description')}</p>
        </div>
        <div>
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🌱</div>
          <h3 style="color: #2B4B8C; font-weight: 600; margin-bottom: 0.5rem;">{$t('youth.consciousLeadership.traits.actionOriented.title')}</h3>
          <p style="color: #6b7280; font-size: 0.9rem;">{$t('youth.consciousLeadership.traits.actionOriented.description')}</p>
        </div>
        <div>
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔮</div>
          <h3 style="color: #2B4B8C; font-weight: 600; margin-bottom: 0.5rem;">{$t('youth.consciousLeadership.traits.futureFocused.title')}</h3>
          <p style="color: #6b7280; font-size: 0.9rem;">{$t('youth.consciousLeadership.traits.futureFocused.description')}</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Comic Preview Section -->
<section class="section" style="background-color: white;">
  <div class="container">
    <div class="comic-preview">
      <h2 class="comic-title">📚 {$t('youth.comic.title')}</h2>
      <p style="font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.9;">
        {$t('youth.comic.subtitle')}
      </p>
      
      <div class="comic-panels">
        <div class="comic-panel">
          <div class="panel-title">🏪 {$t('youth.comic.panels.invitation.title')}</div>
          <div class="panel-description">{$t('youth.comic.panels.invitation.description')}</div>
        </div>
        <div class="comic-panel">
          <div class="panel-title">🪞 {$t('youth.comic.panels.lookWithin.title')}</div>
          <div class="panel-description">{$t('youth.comic.panels.lookWithin.description')}</div>
        </div>
        <div class="comic-panel">
          <div class="panel-title">🧰 {$t('youth.comic.panels.getTools.title')}</div>
          <div class="panel-description">{$t('youth.comic.panels.getTools.description')}</div>
        </div>
        <div class="comic-panel">
          <div class="panel-title">👂 {$t('youth.comic.panels.listenDeeply.title')}</div>
          <div class="panel-description">{$t('youth.comic.panels.listenDeeply.description')}</div>
        </div>
        <div class="comic-panel">
          <div class="panel-title">🚀 {$t('youth.comic.panels.takeAction.title')}</div>
          <div class="panel-description">{$t('youth.comic.panels.takeAction.description')}</div>
        </div>
        <div class="comic-panel">
          <div class="panel-title">🌍 {$t('youth.comic.panels.changeWorld.title')}</div>
          <div class="panel-description">{$t('youth.comic.panels.changeWorld.description')}</div>
        </div>
      </div>
      
      <a href="{comicLink}" class="btn-primary" style="background-color: white; color: #6B5CA5;">
        {$t('youth.comic.button')}
      </a>
    </div>
  </div>
</section>

<!-- Get Started Resources -->
<section class="section" id="get-started" style="background-color: #f9fafb;">
  <div class="container">
    <h2 class="section-title">{$t('youth.getStarted.title')}</h2>
    <p class="section-subtitle">
      {$t('youth.getStarted.subtitle')}
    </p>
    
    <div class="resources-grid">
      {#each youthResources as resource}
        <div class="resource-card" style="--card-color: {resource.color}">
          <span class="resource-emoji">{resource.emoji}</span>
          <h3 class="resource-title">{resource.title}</h3>
          <p class="resource-description">{resource.description}</p>
          <a href="{resource.link}" class="resource-action">{resource.action}</a>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Young Leaders Stories -->
<section class="section" id="stories" style="background-color: white;">
  <div class="container">
    <h2 class="section-title">{$t('youth.stories.title')}</h2>
    <p class="section-subtitle">
      {$t('youth.stories.subtitle')}
    </p>
    
    <div class="stories-grid">
      {#each youthStories as story}
        <div class="story-card">
          <div class="story-name">{story.name}</div>
          <div class="story-details">{story.age} • {story.location}</div>
          <div class="story-impact">{story.impact}</div>
          <div class="story-lesson">💡 {story.lesson}</div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Action Ideas -->
<section class="section" style="background-color: #f9fafb;">
  <div class="container">
    <h2 class="section-title">{$t('youth.actionIdeas.title')}</h2>
    <p class="section-subtitle">
      {$t('youth.actionIdeas.subtitle')}
    </p>
    
    <div class="action-categories">
      {#each actionIdeas as category}
        <div class="action-category">
          <h3 class="action-category-title">
            {#if category.category === $t('youth.actionIdeas.categories.school.title')}🏫
            {:else if category.category === $t('youth.actionIdeas.categories.community.title')}🏘️
            {:else if category.category === $t('youth.actionIdeas.categories.digital.title')}💻
            {:else}🌱{/if}
            {category.category}
          </h3>
          <ul class="action-list">
            {#each category.ideas as idea}
              <li class="action-item">{idea}</li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Tools and Resources -->
<section class="section" style="background-color: white;">
  <div class="container">
    <h2 class="section-title">{$t('youth.toolkit.title')}</h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
      
      <!-- Daily Practices -->
      <div style="background: linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%); border-radius: 1rem; padding: 2rem;">
        <h3 style="color: #2B4B8C; font-size: 1.5rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
          🧘 {$t('youth.toolkit.dailyPractices.title')}
        </h3>
        <ul style="list-style: none; padding: 0; color: #374151;">
          <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">
            <span style="position: absolute; left: 0;">✨</span>
            <strong>{$t('youth.toolkit.dailyPractices.items.intention.label')}</strong> {$t('youth.toolkit.dailyPractices.items.intention.description')}
          </li>
          <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">
            <span style="position: absolute; left: 0;">🌬️</span>
            <strong>{$t('youth.toolkit.dailyPractices.items.breathing.label')}</strong> {$t('youth.toolkit.dailyPractices.items.breathing.description')}
          </li>
          <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">
            <span style="position: absolute; left: 0;">📝</span>
            <strong>{$t('youth.toolkit.dailyPractices.items.reflection.label')}</strong> {$t('youth.toolkit.dailyPractices.items.reflection.description')}
          </li>
          <li style="padding-left: 1.5rem; position: relative;">
            <span style="position: absolute; left: 0;">🙏</span>
            <strong>{$t('youth.toolkit.dailyPractices.items.gratitude.label')}</strong> {$t('youth.toolkit.dailyPractices.items.gratitude.description')}
          </li>
        </ul>
      </div>

      <!-- Communication Skills -->
      <div style="background: linear-gradient(135deg, #e9f2e9 0%, #f0f9f0 100%); border-radius: 1rem; padding: 2rem;">
        <h3 style="color: #2D5F2D; font-size: 1.5rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
          💬 {$t('youth.toolkit.communication.title')}
        </h3>
        <ul style="list-style: none; padding: 0; color: #374151;">
          <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">
            <span style="position: absolute; left: 0;">👂</span>
            <strong>{$t('youth.toolkit.communication.items.listen.label')}</strong> {$t('youth.toolkit.communication.items.listen.description')}
          </li>
          <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">
            <span style="position: absolute; left: 0;">❤️</span>
            <strong>{$t('youth.toolkit.communication.items.speak.label')}</strong> {$t('youth.toolkit.communication.items.speak.description')}
          </li>
          <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">
            <span style="position: absolute; left: 0;">🤔</span>
            <strong>{$t('youth.toolkit.communication.items.ask.label')}</strong> {$t('youth.toolkit.communication.items.ask.description')}
          </li>
          <li style="padding-left: 1.5rem; position: relative;">
            <span style="position: absolute; left: 0;">🤝</span>
            <strong>{$t('youth.toolkit.communication.items.common.label')}</strong> {$t('youth.toolkit.communication.items.common.description')}
          </li>
        </ul>
      </div>

      <!-- Self-Care for Leaders -->
      <div style="background: linear-gradient(135deg, #fef3c7 0%, #fef7d4 100%); border-radius: 1rem; padding: 2rem;">
        <h3 style="color: #B8860B; font-size: 1.5rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
          💚 {$t('youth.toolkit.selfCare.title')}
        </h3>
        <ul style="list-style: none; padding: 0; color: #374151;">
          <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">
            <span style="position: absolute; left: 0;">⚡</span>
            <strong>{$t('youth.toolkit.selfCare.items.energy.label')}</strong> {$t('youth.toolkit.selfCare.items.energy.description')}
          </li>
          <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">
            <span style="position: absolute; left: 0;">🎭</span>
            <strong>{$t('youth.toolkit.selfCare.items.emotion.label')}</strong> {$t('youth.toolkit.selfCare.items.emotion.description')}
          </li>
          <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">
            <span style="position: absolute; left: 0;">👥</span>
            <strong>{$t('youth.toolkit.selfCare.items.support.label')}</strong> {$t('youth.toolkit.selfCare.items.support.description')}
          </li>
          <li style="padding-left: 1.5rem; position: relative;">
            <span style="position: absolute; left: 0;">🎯</span>
            <strong>{$t('youth.toolkit.selfCare.items.celebrate.label')}</strong> {$t('youth.toolkit.selfCare.items.celebrate.description')}
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- Call to Action -->
<section class="section">
 <div class="container">
   <div class="cta-section">
     <h2 class="cta-title">{$t('youth.cta.title')}</h2>
     <p class="cta-description">
       {$t('youth.cta.description')}
     </p>
     <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
       <a href="{base}/frameworks/tools/youth-and-intergenerational-governance/youth-leadership-starter-kit.zip" class="btn-primary" style="background-color: white; color: #DAA520;">
         {$t('youth.cta.primaryButton')}
       </a>
       <a href="{base}/contact" class="btn-secondary" style="border-color: white; color: white;">
         {$t('youth.cta.secondaryButton')}
       </a>
     </div>
   </div>
 </div>
</section>

<!-- Community Section -->
<section class="section" style="background-color: #f9fafb;">
 <div class="container">
   <div style="max-width: 800px; margin: 0 auto; text-align: center;">
     <h2 style="color: #2B4B8C; font-size: 2rem; margin-bottom: 1rem;">🌟 {$t('youth.community.title')}</h2>
     <p style="color: #6b7280; font-size: 1.25rem; margin-bottom: 2rem;">
       {$t('youth.community.subtitle')}
     </p>
     
     <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
       <div style="background: white; padding: 1.5rem; border-radius: 1rem; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
         <div style="font-size: 2rem; margin-bottom: 0.5rem;">📱</div>
         <h4 style="color: #2B4B8C; margin-bottom: 0.5rem;">{$t('youth.community.features.share.title')}</h4>
         <p style="color: #6b7280; font-size: 0.9rem;">{$t('youth.community.features.share.description')}</p>
       </div>
       <div style="background: white; padding: 1.5rem; border-radius: 1rem; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
         <div style="font-size: 2rem; margin-bottom: 0.5rem;">🤝</div>
         <h4 style="color: #2B4B8C; margin-bottom: 0.5rem;">{$t('youth.community.features.collaborate.title')}</h4>
         <p style="color: #6b7280; font-size: 0.9rem;">{$t('youth.community.features.collaborate.description')}</p>
       </div>
       <div style="background: white; padding: 1.5rem; border-radius: 1rem; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
         <div style="font-size: 2rem; margin-bottom: 0.5rem;">📚</div>
         <h4 style="color: #2B4B8C; margin-bottom: 0.5rem;">{$t('youth.community.features.learn.title')}</h4>
         <p style="color: #6b7280; font-size: 0.9rem;">{$t('youth.community.features.learn.description')}</p>
       </div>
       <div style="background: white; padding: 1.5rem; border-radius: 1rem; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
         <div style="font-size: 2rem; margin-bottom: 0.5rem;">⭐</div>
         <h4 style="color: #2B4B8C; margin-bottom: 0.5rem;">{$t('youth.community.features.inspire.title')}</h4>
         <p style="color: #6b7280; font-size: 0.9rem;">{$t('youth.community.features.inspire.description')}</p>
       </div>
     </div>
     
     <div style="background: linear-gradient(135deg, #2B4B8C 0%, #6B5CA5 100%); color: white; padding: 2rem; border-radius: 1rem; margin-top: 2rem;">
       <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">🚀 Ready to Connect?</h3>
       <p style="margin-bottom: 1.5rem; opacity: 0.9;">Join thousands of young changemakers worldwide who are already making a difference.</p>
       <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
         <a href="{base}/contact" style="background-color: #DAA520; color: #2B4B8C; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600;">
           Join Our Community
         </a>
         <a href="{base}/downloads" style="background-color: transparent; border: 2px solid #DAA520; color: #DAA520; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600;">
           Get Resources
         </a>
       </div>
     </div>
   </div>
 </div>
</section>
