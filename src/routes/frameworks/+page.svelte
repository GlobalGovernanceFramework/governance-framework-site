<!-- src/routes/frameworks/+page.svelte -->
<script>
  import { t } from '$lib/i18n';
  import { base } from '$app/paths';
  import AllFrameworksList from '$lib/components/AllFrameworksList.svelte';

  // Smooth scroll function to navigate to tier sections
  function scrollToTier(tierNumber) {
    const element = document.getElementById(`tier-${tierNumber}`);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  }
</script>

<svelte:head>
  <title>Framework - Global Governance Framework</title>
  <meta name="description" content="Explore tools for governance interoperability and evolution" />
</svelte:head>

<!-- Hero Section -->
<section style="padding: 3rem 0; background: linear-gradient(to bottom right, #2B4B8C, #6B5CA5); color: white;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div style="max-width: 42rem; margin: 0 auto;">
      <h1 style="font-size: 2.5rem; line-height: 1.2; font-weight: 700; margin-bottom: 1rem;">{$t('framework.hero.title')}</h1>
      <p style="font-size: 1.25rem; color: #ffffff;">{$t('framework.hero.subtitle')}</p>
    </div>
  </div>
</section>

<!-- Enhanced Documentation Quick Access Section -->
<section style="padding: 2rem 0; background-color: #e9f2e9; border-bottom: 1px solid #2D5F2D;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
      <div style="max-width: 700px; margin-bottom: 1.5rem;">
        <h2 style="font-size: 1.5rem; font-weight: 700; color: #2B4B8C; margin-bottom: 0.75rem;">
          {$t('framework.quickAccess.title')}
        </h2>
        <p style="color: #4b5563; margin-bottom: 1.5rem;">
          {$t('framework.quickAccess.description')}
        </p>
        <div class="quick-access-buttons">
          <a class="button-gold" href="{base}/frameworks/docs">
            {$t('framework.quickAccess.viewDocs')}
          </a>
          <a class="button-outline" href="{base}/frameworks/docs/principles">
            {$t('framework.quickAccess.corePrinciples')}
          </a>
        </div>
      </div>
      
      <!-- Framework Components Grid -->
      <div class="framework-components-grid" style="display: grid; gap: 1rem; width: 100%; max-width: 900px; margin-top: 2rem;">
        <!-- Documentation -->
        <div class="hover-card">
          <h3 style="font-size: 1.25rem; font-weight: 600; color: #2B4B8C; margin-bottom: 0.75rem;">{$t('framework.components.documentation.title')}</h3>
          <ul>
            <li>
              <a class="menu-link" href="{base}/frameworks/docs">
                {$t('common.header.frameworkDocs')}
              </a>
            </li>
            <li>
              <a class="menu-link" href="{base}/frameworks/docs/principles">
                {$t('common.header.frameworkPrinciples')}
              </a>
            </li>
            <li>
              <a class="menu-link" href="{base}/frameworks/docs/implementation">
                {$t('common.header.frameworkImplementation')}
              </a>
            </li>
            <li>
              <a class="menu-link" href="{base}/frameworks/docs/case-studies">
                {$t('common.header.frameworkCaseStudies')}
              </a>
            </li>
            <li>
              <a class="menu-link" href="{base}/frameworks/docs/resources">
                {$t('common.header.frameworkResources')}
              </a>
            </li>
          </ul>
        </div>
        
        <!-- Applications -->
        <div class="hover-card">
          <h3 style="font-size: 1.25rem; font-weight: 600; color: #DAA520; margin-bottom: 0.75rem;">{$t('framework.components.applications.title')}</h3>
          <ul>
            <li>
              <a class="menu-link" href="{base}/frameworks/hubs">
                {$t('common.header.frameworkHubs')}
              </a>
            </li>
            <li>
              <a class="menu-link" href="{base}/frameworks/ai-futures">
                {$t('common.header.frameworkAIFutures')}
              </a>
            </li>
          </ul>
        </div>
        
        <!-- Tools & Resources -->
        <div class="hover-card">
          <h3 style="font-size: 1.25rem; font-weight: 600; color: #2D5F2D; margin-bottom: 0.75rem;">{$t('framework.components.tools.title')}</h3>
          <ul>
            <li>
              <a class="menu-link" href="{base}/frameworks/tools">
                {$t('common.header.frameworkTools')}
              </a>
            </li>
            <li>
              <a class="menu-link" href="{base}/frameworks/docs/glossary">
                {$t('framework.quickAccess.glossary')}
              </a>
            </li>
            <li>
              <a class="menu-link" href="{base}/downloads">
                {$t('common.header.downloads')}
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- Overview Card -->
      <div style="background-color: white; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1); width: 100%; max-width: 900px; margin-top: 2rem; border-left: 4px solid #B8860B;">
        <div style="display: flex; align-items: center; margin-bottom: 1rem;">
          <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.5rem; height: 1.5rem; color: #B8860B; margin-right: 0.75rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 style="font-size: 1.25rem; font-weight: 600; color: #B8860B; margin: 0;">{$t('framework.overview.title')}</h3>
        </div>
        <p style="color: #4b5563; line-height: 1.6; margin-bottom: 1rem;">
          {$t('framework.overview.description')}
        </p>
        <div style="display: flex; justify-content: flex-end;">
          <a href="{base}/frameworks/docs" style="display: inline-flex; align-items: center; color: #2B4B8C; font-weight: 600; text-decoration: none; transition: color 0.2s;" on:mouseover="{e => e.target.style.color = '#DAA520'}" on:mouseout="{e => e.target.style.color = '#2B4B8C'}">
            {$t('framework.overview.learnMore')}
            <svg xmlns="http://www.w3.org/2000/svg" style="width: 1rem; height: 1rem; margin-left: 0.25rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- NEW: Implementation Frameworks Section -->
<section style="padding: 3rem 0; background-color: #f8fafc;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div style="text-align: center; margin-bottom: 3rem;">
      <h2 style="font-size: 2rem; font-weight: 700; color: #2B4B8C; margin-bottom: 1rem;">
        {$t('framework.implementationFrameworks.title')}
      </h2>
      <p style="color: #4b5563; font-size: 1.125rem; max-width: 42rem; margin: 0 auto; line-height: 1.7;">
        {$t('framework.implementationFrameworks.description')}
      </p>
    </div>
    
    <!-- Implementation Roadmap Explanation -->
    <div style="background: linear-gradient(to right, #e9f2e9, #eaf5ea); padding: 2rem; border-radius: 0.75rem; margin-bottom: 3rem; border-left: 4px solid #2D5F2D;">
      <div style="display: flex; align-items: center; margin-bottom: 1rem;">
        <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.5rem; height: 1.5rem; color: #2D5F2D; margin-right: 0.75rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <h3 style="font-size: 1.375rem; font-weight: 600; color: #2D5F2D; margin: 0;">{$t('framework.implementationFrameworks.roadmapTitle')}</h3>
      </div>
      <p style="color: #2D5F2D; line-height: 1.7; margin-bottom: 1rem;">
        {$t('framework.implementationFrameworks.roadmapDescription')}
      </p>
      <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-top: 1.5rem;">
        <button 
          class="tier-nav-button tier-0-button"
          on:click={() => scrollToTier(0)}
          style="flex: 1; min-width: 200px; text-align: center; cursor: pointer; border: none; background: none; padding: 0;"
        >
          <div style="background-color: #fbbf24; color: white; padding: 0.5rem; border-radius: 0.375rem; font-weight: 600; margin-bottom: 0.5rem; transition: all 0.2s ease;">Tier 0</div>
          <span style="font-size: 0.875rem; color: #374151; display: block;">{$t('framework.implementationFrameworks.tiers.tier0')}</span>
        </button>
        <button 
          class="tier-nav-button tier-1-button"
          on:click={() => scrollToTier(1)}
          style="flex: 1; min-width: 200px; text-align: center; cursor: pointer; border: none; background: none; padding: 0;"
        >
          <div style="background-color: #60a5fa; color: white; padding: 0.5rem; border-radius: 0.375rem; font-weight: 600; margin-bottom: 0.5rem; transition: all 0.2s ease;">Tier 1</div>
          <span style="font-size: 0.875rem; color: #374151; display: block;">{$t('framework.implementationFrameworks.tiers.tier1')}</span>
        </button>
        <button 
          class="tier-nav-button tier-2-button"
          on:click={() => scrollToTier(2)}
          style="flex: 1; min-width: 200px; text-align: center; cursor: pointer; border: none; background: none; padding: 0;"
        >
          <div style="background-color: #34d399; color: white; padding: 0.5rem; border-radius: 0.375rem; font-weight: 600; margin-bottom: 0.5rem; transition: all 0.2s ease;">Tier 2</div>
          <span style="font-size: 0.875rem; color: #374151; display: block;">{$t('framework.implementationFrameworks.tiers.tier2')}</span>
        </button>
        <button 
          class="tier-nav-button tier-3-button"
          on:click={() => scrollToTier(3)}
          style="flex: 1; min-width: 200px; text-align: center; cursor: pointer; border: none; background: none; padding: 0;"
        >
          <div style="background-color: #a78bfa; color: white; padding: 0.5rem; border-radius: 0.375rem; font-weight: 600; margin-bottom: 0.5rem; transition: all 0.2s ease;">Tier 3</div>
          <span style="font-size: 0.875rem; color: #374151; display: block;">{$t('framework.implementationFrameworks.tiers.tier3')}</span>
        </button>
        <button 
          class="tier-nav-button tier-4-button"
          on:click={() => scrollToTier(4)}
          style="flex: 1; min-width: 200px; text-align: center; cursor: pointer; border: none; background: none; padding: 0;"
        >
          <div style="background-color: #f472b6; color: white; padding: 0.5rem; border-radius: 0.375rem; font-weight: 600; margin-bottom: 0.5rem; transition: all 0.2s ease;">Tier 4</div>
          <span style="font-size: 0.875rem; color: #374151; display: block;">{$t('framework.implementationFrameworks.tiers.tier4')}</span>
        </button>
      </div>
    </div>

    <!-- Dynamic Frameworks List using your existing component -->
    <AllFrameworksList t={$t} showTierHeaders={true} className="implementation-frameworks" addTierIds={true} />

    <!-- Implementation Getting Started -->
    <div style="background-color: white; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-top: 3rem; text-align: center;">
      <h3 style="font-size: 1.5rem; font-weight: 600; color: #2B4B8C; margin-bottom: 1rem;">
        {$t('framework.implementationFrameworks.gettingStarted.title')}
      </h3>
      <p style="color: #4b5563; line-height: 1.7; margin-bottom: 2rem; max-width: 36rem; margin-left: auto; margin-right: auto;">
        {$t('framework.implementationFrameworks.gettingStarted.description')}
      </p>
      <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center; justify-content: center; max-width: 20rem; margin: 0 auto;">
        <a href="{base}/frameworks/docs/implementation" style="width: 100%; display: inline-block; background-color: #DAA520; color: white; font-weight: 600; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: all 0.2s;">
          {$t('framework.implementationFrameworks.gettingStarted.implementationButton')}
        </a>
        <a href="{base}/frameworks/docs/case-studies" style="width: 100%; display: inline-block; background-color: transparent; border: 2px solid #2B4B8C; color: #2B4B8C; font-weight: 600; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; transition: all 0.2s;">
          {$t('framework.implementationFrameworks.gettingStarted.caseStudiesButton')}
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Main Content Section -->
<section style="padding: 3rem 0; background-color: white;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div style="max-width: 42rem; margin: 0 auto;">
      <!-- Intro Section -->
      <div style="margin-bottom: 3rem;">
        <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem; color: #2B4B8C;">{$t('framework.intro.title')}</h2>
        <p style="margin-bottom: 1.5rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('framework.intro.paragraph1')}
        </p>
        <p style="margin-bottom: 1.5rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('framework.intro.paragraph2')}
        </p>
      </div>
      
      <!-- Emerging Possibilities in Action -->
      <div style="margin-bottom: 3rem;">
        <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem; color: #2B4B8C;">{$t('framework.emergingExamples.title')}</h2>
        <p style="margin-bottom: 2rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('framework.emergingExamples.intro')}
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem;">
          {#each $t('framework.emergingExamples.examples') as example}
            <div style="background-color: white; border-radius: 0.75rem; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #2D5F2D;">
              <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem; color: #B8860B;">{example.title}</h3>
              <p style="color: #4b5563; line-height: 1.6;">{example.description}</p>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Technological Enablers -->
      <div style="margin-bottom: 3rem; background-color: #e9f2e9; padding: 2rem; border-radius: 0.75rem;">
        <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem; color: #2B4B8C;">{$t('framework.techEnablers.title')}</h2>
        <p style="margin-bottom: 2rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('framework.techEnablers.intro')}
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem;">
          {#each $t('framework.techEnablers.enablers') as enabler, i}
            <div style="background-color: white; border-radius: 0.75rem; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                <div style="background-color: #d1dbe9; width: 2.5rem; height: 2.5rem; border-radius: 9999px; display: flex; align-items: center; justify-content: center; margin-right: 1rem;">
                  {#if i === 0}
                    <!-- AI icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.5rem; height: 1.5rem; color: #2B4B8C;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  {:else if i === 1}
                    <!-- Blockchain icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.5rem; height: 1.5rem; color: #2B4B8C;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  {:else if i === 2}
                    <!-- Translation icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.5rem; height: 1.5rem; color: #2B4B8C;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                  {:else}
                    <!-- Network icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.5rem; height: 1.5rem; color: #2B4B8C;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  {/if}
                </div>
                <h3 style="font-size: 1.25rem; font-weight: 600; color: #B8860B;">{enabler.title}</h3>
              </div>
              <p style="color: #4b5563; line-height: 1.6;">{enabler.description}</p>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Bottom-Up Approaches -->
      <div style="margin-bottom: 3rem;">
        <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem; color: #2B4B8C;">{$t('framework.bottomUpApproaches.title')}</h2>
        <p style="margin-bottom: 2rem; color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('framework.bottomUpApproaches.intro')}
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
          {#each $t('framework.bottomUpApproaches.principles') as principle}
            <div style="background-color: white; border-radius: 0.75rem; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 1px solid #2D5F2D;">
              <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem; color: #B8860B;">{principle.title}</h3>
              <p style="color: #4b5563; line-height: 1.6;">{principle.description}</p>
            </div>
          {/each}
        </div>
        
        <p style="color: #4b5563; line-height: 1.7; font-size: 1.125rem;">
          {$t('framework.bottomUpApproaches.conclusion')}
        </p>
      </div>
      
      <!-- Core Framework Elements -->
      <div style="margin-top: 3rem; margin-bottom: 3rem;">
        <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem; color: #2B4B8C;">{$t('framework.coreElements.title')}</h2>
        
        <!-- Interoperability Framework -->
        <div style="margin-bottom: 2rem;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; color: #B8860B;">{$t('framework.coreElements.interoperability.title')}</h3>
          <p style="margin-bottom: 1rem; color: #4b5563; line-height: 1.7;">
            {$t('framework.coreElements.interoperability.intro')}
          </p>
          <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem; list-style-type: disc; color: #4b5563;">
            {#each $t('framework.coreElements.interoperability.items') as item}
              <li style="margin-bottom: 0.5rem;"><strong>{item.name}:</strong> {item.description}</li>
            {/each}
          </ul>
        </div>
        
        <!-- Governance Operating System -->
        <div style="margin-bottom: 2rem;">
          <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; color: #B8860B;">{$t('framework.coreElements.operatingSystem.title')}</h3>
          <p style="margin-bottom: 1rem; color: #4b5563; line-height: 1.7;">
            {$t('framework.coreElements.operatingSystem.intro')}
          </p>
          <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem; list-style-type: disc; color: #4b5563;">
            {#each $t('framework.coreElements.operatingSystem.items') as item}
              <li style="margin-bottom: 0.5rem;"><strong>{item.name}:</strong> {item.description}</li>
            {/each}
          </ul>
        </div>
      </div>

      <!-- Learn More Section -->
      <section style="padding: 3rem 0; background-color: #e9f2e9; margin-top: 3rem;">
        <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
          <div style="max-width: 42rem; margin: 0 auto; text-align: center;">
            <h2 style="font-size: 1.5rem; font-weight: 700; color: #2B4B8C; margin-bottom: 1rem;">
              {$t('framework.learnMore.title')}
            </h2>
            <p style="color: #4b5563; margin-bottom: 2rem;">
              {$t('framework.learnMore.description')}
            </p>
            <a href="{base}/frameworks/docs" style="display: inline-flex; align-items: center; background-color: #DAA520; color: white; font-weight: 600; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: background-color 0.2s;" on:mouseover="{e => e.target.style.backgroundColor = '#B8860B'}" on:mouseout="{e => e.target.style.backgroundColor = '#DAA520'}">
              {$t('framework.learnMore.button')}
              <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-left: 0.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
      
      <!-- Call to Action -->
      <div style="text-align: center; margin-top: 3rem;">
        <a href="{base}/contact" style="display: inline-block; background-color: #DAA520; color: white; font-weight: 600; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: background-color 0.2s;" on:mouseover="{e => e.target.style.backgroundColor = '#B8860B'}" on:mouseout="{e => e.target.style.backgroundColor = '#DAA520'}">
          {$t('framework.cta')}
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  /* --- Card Container --- */
  .hover-card {
    background-color: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease;
    transform-style: preserve-3d;
    will-change: transform;
    border-top: 4px solid currentColor;
  }

  .hover-card:hover {
    transform: translateY(-5px);
  }

  /* --- Section Titles in Cards --- */
  .card-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  /* --- Vertical List Items --- */
  li {
    margin-bottom: 0.5rem;
  }

  /* --- Menu Links Inside Cards --- */
  .menu-link {
    display: block;
    color: #4b5563;
    font-weight: 600;
    text-decoration: none;
    padding: 0.5rem 0.5rem 0.5rem 0.75rem;
    border-left: 3px solid transparent;
    transition: color 0.2s ease, border-color 0.2s ease;
    line-height: 1.5;
    box-sizing: border-box;
  }

  .menu-link:hover {
    color: #DAA520;
    border-color: #DAA520;
  }

  /* --- Top Buttons --- */
  .button-gold,
  .button-outline {
    min-width: 180px;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    text-align: center;
    display: inline-block;
  }

  .button-gold {
    background-color: #DAA520;
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.2s ease;
  }

  .button-gold:hover {
    background-color: #B8860B;
  }

  .button-outline {
    background-color: white;
    color: #2D5F2D;
    border: 1px solid #2D5F2D;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: color 0.2s ease, border-color 0.2s ease;
  }

  .button-outline:hover {
    color: #DAA520;
    border-color: #DAA520;
  }

  .quick-access-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  /* --- Tier Navigation Buttons --- */
  .tier-nav-button {
    transition: all 0.2s ease;
    border-radius: 0.5rem;
    padding: 0.5rem;
  }

  .tier-nav-button:hover {
    background-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }

  .tier-nav-button:hover div {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  .tier-nav-button:active {
    transform: translateY(0);
  }

  .tier-nav-button:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }

  /* Add visual feedback for button interaction */
  .tier-0-button:hover div { box-shadow: 0 4px 8px rgba(251, 191, 36, 0.3); }
  .tier-1-button:hover div { box-shadow: 0 4px 8px rgba(96, 165, 250, 0.3); }
  .tier-2-button:hover div { box-shadow: 0 4px 8px rgba(52, 211, 153, 0.3); }
  .tier-3-button:hover div { box-shadow: 0 4px 8px rgba(167, 139, 250, 0.3); }
  .tier-4-button:hover div { box-shadow: 0 4px 8px rgba(244, 114, 182, 0.3); }
  :global(.implementation-frameworks) {
    margin-top: 2rem;
  }

  /* Enhanced tier section styling that matches page design */
  :global(.implementation-frameworks .tier-section) {
    background: linear-gradient(to right, #f8fafc, #f1f5f9);
    border-radius: 1rem;
    padding: 2.5rem;
    margin-bottom: 2.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border: 1px solid #e2e8f0;
    position: relative;
    overflow: hidden;
  }

  /* Add subtle background pattern */
  :global(.implementation-frameworks .tier-section::before) {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, var(--tier-color), transparent);
  }

  :global(.implementation-frameworks .tier-section:last-child) {
    margin-bottom: 0;
  }

  /* Tier-specific color variables and styling */
  :global(.tier-0) {
    --tier-color: #fbbf24;
    border-top: 4px solid #fbbf24;
  }

  :global(.tier-1) {
    --tier-color: #60a5fa;
    border-top: 4px solid #60a5fa;
  }

  :global(.tier-2) {
    --tier-color: #34d399;
    border-top: 4px solid #34d399;
  }

  :global(.tier-3) {
    --tier-color: #a78bfa;
    border-top: 4px solid #a78bfa;
  }

  :global(.tier-4) {
    --tier-color: #f472b6;
    border-top: 4px solid #f472b6;
  }

  /* Tier headers styling */
  :global(.implementation-frameworks .tier-section h2) {
    color: #1f2937;
    margin-bottom: 0.75rem;
    font-size: 1.75rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  :global(.implementation-frameworks .tier-section h2::before) {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--tier-color);
    flex-shrink: 0;
  }

  :global(.implementation-frameworks .tier-description) {
    color: #4b5563;
    font-size: 1.125rem;
    line-height: 1.7;
    margin-bottom: 2rem;
    font-style: italic;
  }

  /* Enhanced framework grid layout */
  :global(.implementation-frameworks .framework-list) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.25rem;
    margin-top: 1.5rem;
    list-style: none;
    padding: 0;
    margin-left: 0;
  }

  /* Beautiful framework cards - now fully clickable */
  :global(.implementation-frameworks .framework-item) {
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    border-radius: 0.75rem;
    padding: 0; /* Remove padding from container since link will handle it */
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }

  /* Make the framework link fill the entire card */
  :global(.implementation-frameworks .framework-link) {
    font-size: 1.125rem;
    line-height: 1.4;
    font-weight: 600;
    color: #1f2937;
    text-decoration: none;
    transition: color 0.2s ease;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    height: 100%;
    position: relative;
  }

  /* Subtle accent line for each framework card */
  :global(.implementation-frameworks .framework-link::before) {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--tier-color), rgba(255,255,255,0.5));
    opacity: 0.7;
  }

  :global(.implementation-frameworks .framework-item:hover) {
    background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
    border-color: var(--tier-color);
  }

  :global(.implementation-frameworks .framework-item:hover .framework-link::before) {
    opacity: 1;
  }

  :global(.implementation-frameworks .framework-item:hover .framework-link) {
    color: var(--tier-color);
  }

  /* Framework title styling within the link */
  :global(.implementation-frameworks .framework-link .framework-title) {
    font-size: 1.125rem;
    line-height: 1.4;
    font-weight: 600;
    margin: 0;
  }

  /* Status and version badges container */
  :global(.implementation-frameworks .framework-meta) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: auto; /* Push to bottom of card */
    flex-wrap: wrap;
  }

  /* Status and version badges */
  :global(.implementation-frameworks .status) {
    font-size: 0.8rem;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.025em;
  }

  :global(.implementation-frameworks .version) {
    font-size: 0.75rem;
    background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
    color: #64748b;
    padding: 0.25rem 0.5rem;
    border-radius: 0.375rem;
    font-weight: 600;
    border: 1px solid #cbd5e1;
  }

  /* No frameworks message styling */
  :global(.implementation-frameworks .no-frameworks) {
    color: #6b7280;
    font-style: italic;
    padding: 2rem;
    text-align: center;
    background: linear-gradient(135deg, #f9fafb, #f3f4f6);
    border-radius: 0.75rem;
    border: 2px dashed #d1d5db;
    margin: 1rem 0;
  }

  /* Responsive adjustments */
  /* Framework Components Grid - Mobile Responsive Fix */
  @media (max-width: 768px) {
    /* Make the framework components grid stack vertically on mobile */
    .quick-access-buttons {
      flex-direction: column;
      align-items: center;
    }

    .button-gold,
    .button-outline {
      min-width: 200px;
    }

    /* Override the 3-column grid to be single column on mobile */
    section[style*="grid-template-columns: repeat(3, minmax(0, 1fr))"] {
      display: grid !important;
      grid-template-columns: 1fr !important; /* Single column on mobile */
      gap: 1.5rem !important; /* Slightly larger gap for better spacing */
    }

    /* Ensure hover cards stack nicely */
    .hover-card {
      margin-bottom: 1rem;
    }

    /* Make menu links more touch-friendly on mobile */
    .menu-link {
      padding: 0.75rem 0.75rem 0.75rem 1rem;
      font-size: 0.95rem;
    }

    /* Adjust card titles for mobile */
    .hover-card h3 {
      font-size: 1.125rem;
    }
  }

  /* For very small screens (phones in portrait) */
  @media (max-width: 480px) {
    /* Further adjustments for very small screens */
    .hover-card {
      padding: 1.25rem;
    }

    .menu-link {
      padding: 0.625rem 0.625rem 0.625rem 0.875rem;
      font-size: 0.9rem;
    }

    .button-gold,
    .button-outline {
      min-width: 100%;
      text-align: center;
    }
  }

  .framework-components-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    .framework-components-grid {
      grid-template-columns: 1fr !important;
      gap: 1.5rem !important;
    }
  }

  @media (max-width: 768px) {
    .quick-access-buttons {
      flex-direction: column;
      align-items: center;
    }

    .button-gold,
    .button-outline {
      min-width: 200px;
    }

    :global(.implementation-frameworks .framework-list) {
      grid-template-columns: 1fr;
    }

    :global(.implementation-frameworks .tier-section) {
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }

    :global(.implementation-frameworks .tier-section h2) {
      font-size: 1.5rem;
    }
  }

  /* Subtle animation for framework items */
  @media (prefers-reduced-motion: no-preference) {
    :global(.implementation-frameworks .framework-item) {
      animation: fadeInUp 0.6s ease-out;
      animation-fill-mode: both;
    }

    :global(.implementation-frameworks .framework-item:nth-child(1)) { animation-delay: 0.1s; }
    :global(.implementation-frameworks .framework-item:nth-child(2)) { animation-delay: 0.2s; }
    :global(.implementation-frameworks .framework-item:nth-child(3)) { animation-delay: 0.3s; }
    :global(.implementation-frameworks .framework-item:nth-child(4)) { animation-delay: 0.4s; }
    :global(.implementation-frameworks .framework-item:nth-child(5)) { animation-delay: 0.5s; }
    :global(.implementation-frameworks .framework-item:nth-child(6)) { animation-delay: 0.6s; }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
