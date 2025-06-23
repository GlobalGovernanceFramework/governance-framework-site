<!-- src/routes/+page.svelte -->
<script>
  import InfoBox from '$lib/components/InfoBox.svelte';
  import { t, locale } from '$lib/i18n';
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import EthicalImpactDashboard from '$lib/components/EthicalImpactDashboard.svelte';

  // Basic animation for elements
  let isVisible = false;
  
  // State for collapsible info boxes
  let disclaimerExpanded = false;
  let whyExistsExpanded = false;
  let languageExpanded = false;
  
  onMount(() => {
    // Set visible after component is mounted for simple entrance animation
    setTimeout(() => {
      isVisible = true;
    }, 100);
  });

  // Functions to toggle each info box
  function toggleDisclaimer() {
    disclaimerExpanded = !disclaimerExpanded;
  }

  function toggleWhyExists() {
    whyExistsExpanded = !whyExistsExpanded;
  }

  function toggleLanguage() {
    languageExpanded = !languageExpanded;
  }
</script>

<svelte:head>
  <title>{$t('home.title')}</title>
  <meta name="description" content="Connecting governance innovations across the world" />
</svelte:head>

<!-- Collapsible Info Boxes Section -->
<section style="padding: 2rem 0; background-color: #f8fafc;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    
    <!-- Document Readiness Disclaimer - Collapsible -->
    <div class="collapsible-info-box" style="margin-bottom: 1rem;">
      <button 
        class="info-box-header disclaimer-header"
        on:click={toggleDisclaimer}
        aria-expanded={disclaimerExpanded}
      >
        <div class="header-content">
          <span class="icon">⚠️</span>
          <h3>{$t('home.disclaimer.title')}</h3>
        </div>
        <span class="toggle-icon" class:rotated={disclaimerExpanded}>▼</span>
      </button>
      
      {#if disclaimerExpanded}
        <div class="info-box-content disclaimer-content" style="animation: slideDown 0.3s ease-out;">
          {#each $t('home.disclaimer.text') || [] as paragraph}
            <p>{paragraph}</p>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Why This Exists - Collapsible -->
    <div class="collapsible-info-box" style="margin-bottom: 1rem;">
      <button 
        class="info-box-header why-exists-header"
        on:click={toggleWhyExists}
        aria-expanded={whyExistsExpanded}
      >
        <div class="header-content">
          <span class="icon">💡</span>
          <h3>{$t('home.whyExists.title')}</h3>
        </div>
        <span class="toggle-icon" class:rotated={whyExistsExpanded}>▼</span>
      </button>
      
      {#if whyExistsExpanded}
        <div class="info-box-content why-exists-content" style="animation: slideDown 0.3s ease-out;">
          <p>{$t('home.whyExists.paragraph1')}</p>
          <p>{$t('home.whyExists.paragraph2')}</p>
          <p>
            {$t('home.whyExists.paragraph3')} 
            <a href="{base}/start-treaty/" style="color: #1e40af; text-decoration: underline; font-weight: 500;">'{$t('home.treatyFeature.heading').split(': ')[1]}'</a> 
            {$t('home.whyExists.paragraph3b')}
          </p>
          <p>{$t('home.whyExists.paragraph4')}</p>
        </div>
      {/if}
    </div>

    <!-- Language Statement - Collapsible -->
    <div class="collapsible-info-box" style="margin-bottom: 1rem;">
      <button 
        class="info-box-header language-header"
        on:click={toggleLanguage}
        aria-expanded={languageExpanded}
      >
        <div class="header-content">
          <span class="icon">🌐</span>
          <h3>{$t('home.languageStatement.title')}</h3>
        </div>
        <span class="toggle-icon" class:rotated={languageExpanded}>▼</span>
      </button>
            
      {#if languageExpanded}
        <div class="info-box-content language-content" style="animation: slideDown 0.3s ease-out;">
          <p>
            {$t('home.languageStatement.paragraph1')} 
            <a href="{base}/start-treaty/" style="color: #92400e; text-decoration: underline; font-weight: 500;">'{$t('home.treatyFeature.heading').split(': ')[1]}'</a> 
            {$t('home.languageStatement.paragraph1b')}
          </p>
          <p>{$t('home.languageStatement.paragraph2')}</p>
          <p>{$t('home.languageStatement.paragraph3')}</p>
          <div style="text-align: center; margin-top: 1.5rem;">
            <a href="{base}/get-involved/translations" style="display: inline-block; background-color: #B8860B; color: white; font-weight: 600; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: all 0.2s;">
              {$t('home.languageStatement.button')}
            </a>
          </div>
        </div>
      {/if}
    </div>

  </div>
</section>

<!-- Hero Section -->
<section style="padding: 4rem 0; background: linear-gradient(to bottom right, #2B4B8C, #6B5CA5); color: white;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div style="max-width: 42rem; margin: 0 auto; text-align: center;">
      <!-- Add the logo above the title -->
      <img src="{base}/logo.svg" alt="Global Governance Framework Logo" style="height: 120px; width: 120px; margin: 0 auto 2rem auto;">
      
      <h1 style="font-size: 2.5rem; line-height: 1.2; font-weight: 700; margin-bottom: 1.5rem;">
        {$t('home.title')}
      </h1>
      <p style="font-size: 1.25rem; color: #ffffff; margin-bottom: 2.5rem;">
        {$t('home.subtitle')}
      </p>
      <!-- Changed button color to gold -->
      <a href="{base}/frameworks" style="display: inline-block; background-color: #DAA520; color: #2B4B8C; font-weight: 600; padding: 0.75rem 2rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: all 0.2s;">
        {$t('home.cta')}
      </a>
    </div>
  </div>
</section>

<!-- Intro Section -->
<section style="padding: 4rem 0; background-color: white;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div style="max-width: 42rem; margin: 0 auto;">
      <div style="background: linear-gradient(to right, #f3f6f0, #eaf5ea); padding: 2rem 2.5rem; border-radius: 0.75rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 1px solid #7D9F7D; transition: all 0.5s;">
        <h2 style="font-size: 1.875rem; font-weight: 700; color: #2D5F2D; margin-bottom: 1.5rem;">
          {$t('home.intro.heading')}
        </h2>
        <p style="color: #2D5F2D; font-size: 1.125rem; line-height: 1.7;">
          {$t('home.intro.text')}
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Treaty for Our Only Home Feature Section -->
<section style="padding: 4rem 0; background: linear-gradient(to right, #eef2f3, #e6e9f0);">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem; display: flex; flex-wrap: wrap; align-items: center; gap: 2rem;">
    
    <!-- Left Column: Text Content -->
    <div style="flex: 1 1 50%; min-width: 320px;">
      <h2 style="font-size: 2rem; font-weight: 700; color: #1a2a4c; margin-bottom: 1rem;">
        {$t('home.treatyFeature.heading')}
      </h2>
      <p style="font-size: 1.125rem; color: #334155; margin-bottom: 2rem; line-height: 1.7;">
        {$t('home.treatyFeature.lead')}
      </p>
      <div style="margin-bottom: 2.5rem;">
        <div style="display: flex; align-items: center; margin-bottom: 1rem;">
          <span style="font-size: 1.5rem; margin-right: 0.75rem; color: #2B4B8C;">✓</span>
          <span style="color: #1e293b;">{$t('home.treatyFeature.point1')}</span>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 1rem;">
          <span style="font-size: 1.5rem; margin-right: 0.75rem; color: #2B4B8C;">✓</span>
          <span style="color: #1e293b;">{$t('home.treatyFeature.point2')}</span>
        </div>
        <div style="display: flex; align-items: center;">
          <span style="font-size: 1.5rem; margin-right: 0.75rem; color: #2B4B8C;">✓</span>
          <span style="color: #1e293b;">{$t('home.treatyFeature.point3')}</span>
        </div>
      </div>
      <a href="{base}/frameworks/treaty-for-our-only-home" style="display: inline-block; background-color: #DAA520; color: #2B4B8C; font-weight: 600; padding: 0.75rem 2rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        {$t('home.treatyFeature.button')}
      </a>
    </div>

    <!-- Right Column: Visual Element -->
    <div style="flex: 1 1 40%; text-align: center; padding: 1rem;">
      <img src="{base}/logo.svg" alt="Treaty for Our Only Home icon" style="max-width: 200px; height: auto; opacity: 0.8; margin: 0 auto;">
    </div>

  </div>
</section>

<!-- Features Section -->
<section style="padding: 4rem 0; background-color: #f9fafb;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <h2 style="font-size: 2rem; font-weight: 700; text-align: center; color: #2B4B8C; margin-bottom: 4rem;">
      {$t('home.features.heading')}
    </h2>
    
    <div style="display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); gap: 2rem; margin-bottom: 3rem;">
      <!-- Feature 1 - Changed to cosmic blue border -->
      <div style="background-color: white; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 4px solid #2B4B8C; transition: all 0.3s;">
        <div style="width: 3.5rem; height: 3.5rem; background-color: #e9ecf6; border-radius: 9999px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
          <svg xmlns="http://www.w3.org/2000/svg" style="height: 2rem; width: 2rem; color: #2B4B8C;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 style="font-size: 1.25rem; font-weight: 700; color: #2B4B8C; margin-bottom: 1rem;">
          {$t('home.features.interoperability.title')}
        </h3>
        <p style="color: #4b5563;">
          {$t('home.features.interoperability.description')}
        </p>
      </div>
      
      <!-- Feature 2 - Changed to earthy green border -->
      <div style="background-color: white; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 4px solid #2D5F2D; transition: all 0.3s;">
        <div style="width: 3.5rem; height: 3.5rem; background-color: #e9f2e9; border-radius: 9999px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
          <svg xmlns="http://www.w3.org/2000/svg" style="height: 2rem; width: 2rem; color: #2D5F2D;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        </div>
        <h3 style="font-size: 1.25rem; font-weight: 700; color: #2D5F2D; margin-bottom: 1rem;">
          {$t('home.features.os.title')}
        </h3>
        <p style="color: #4b5563;">
          {$t('home.features.os.description')}
        </p>
      </div>
      
      <!-- Feature 3 - Changed to gold border -->
      <div style="background-color: white; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 4px solid #B8860B; transition: all 0.3s;">
        <div style="width: 3.5rem; height: 3.5rem; background-color: #f7f1e3; border-radius: 9999px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
          <svg xmlns="http://www.w3.org/2000/svg" style="height: 2rem; width: 2rem; color: #B8860B;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 style="font-size: 1.25rem; font-weight: 700; color: #B8860B; margin-bottom: 1rem;">
          {$t('home.features.patterns.title')}
        </h3>
        <p style="color: #4b5563;">
          {$t('home.features.patterns.description')}
        </p>
      </div>
    </div>
    
    <div style="text-align: center; margin-top: 2rem;">
      <a href="{base}/frameworks" style="display: inline-block; background-color: #B8860B; color: white; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: all 0.2s;">
        {$t('home.cta')}
      </a>
    </div>
  </div>
</section>

<section style="padding: 4rem 1rem; background-color: #f9fafb;">
  <div style="max-width: 42rem; margin: 0 auto; text-align: center; background-color: white; padding: 2.5rem; border-radius: 0.75rem; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #e5e7eb;">
    <h2 style="font-size: 2rem; font-weight: 700; color: #2B4B8C; margin-bottom: 1rem;">
      {$t('home.performanceTeaser.heading')}
    </h2>
    <p style="font-size: 1.125rem; color: #4b5563; line-height: 1.7; margin-bottom: 2rem;">
      {$t('home.performanceTeaser.text')}
    </p>
    <a href="{base}/frameworks-performance" style="display: inline-block; background-color: #2B4B8C; color: white; font-weight: 600; padding: 0.75rem 2rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: all 0.2s;">
      {$t('home.performanceTeaser.button')}
    </a>
  </div>
</section>

<section style="padding: 4rem 0; background: linear-gradient(to right, #f0f9ff, #e0f2fe);">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div class="row" style="display: flex; flex-wrap: wrap; align-items: center; gap: 2rem;">
      <div class="col-md-6" style="flex: 1 1 50%; min-width: 320px;">
        <h2 style="font-size: 2rem; font-weight: 700; color: #1e3a8a;">{$t('home.globalCitizenship.title')}</h2>
        <p style="font-size: 1.25rem; color: #1e40af; margin-bottom: 1rem;">{$t('home.globalCitizenship.lead')}</p>
        <p style="color: #1e293b; font-size: 1.05rem; line-height: 1.6;">
          {$t('home.globalCitizenship.description')}
        </p>
        <div style="margin-top: 1.5rem;">
          <div style="display: flex; align-items: center; margin-bottom: 0.75rem;">
            <span style="font-size: 1.5rem; margin-right: 0.75rem;">🧭</span>
            <span>{$t('home.globalCitizenship.point1')}</span>
          </div>
          <div style="display: flex; align-items: center; margin-bottom: 0.75rem;">
            <span style="font-size: 1.5rem; margin-right: 0.75rem;">💡</span>
            <span>{$t('home.globalCitizenship.point2')}</span>
          </div>
          <div style="display: flex; align-items: center;">
            <span style="font-size: 1.5rem; margin-right: 0.75rem;">🔗</span>
            <span>{$t('home.globalCitizenship.point3')}</span>
          </div>
        </div>
        <a href="{base}/frameworks/global-citizenship" style="display: inline-block; margin-top: 2rem; background-color: #DAA520; color: white; font-weight: 600; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: all 0.2s ease;">
          {$t('home.globalCitizenship.button')}
        </a>
      </div>
      <div class="col-md-6" style="flex: 1 1 40%; min-width: 320px;">
        <div style="text-align: center;">
          <img src="{base}/images/new-global-citizenship-experience.png" alt="Interactive Global Citizenship Experience" style="max-width: 100%; border-radius: 0.75rem; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        </div>
      </div>
    </div>
  </div>
</section>

<!-- New Section: Emerging Global Possibilities -->
<section style="padding: 4rem 0; background-color: white;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div style="max-width: 56rem; margin: 0 auto; text-align: center; margin-bottom: 3rem;">
      <h2 style="font-size: 2rem; font-weight: 700; color: #2B4B8C; margin-bottom: 1rem;">
        {$t('home.emergingPossibilities.heading')}
      </h2>
      <p style="font-size: 1.125rem; color: #4b5563; max-width: 42rem; margin: 0 auto;">
        {$t('home.emergingPossibilities.intro')}
      </p>
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); gap: 2rem; margin-bottom: 3rem;">
      {#if $t('home.emergingPossibilities.possibilities')}
        {#each Array.isArray($t('home.emergingPossibilities.possibilities')) ? $t('home.emergingPossibilities.possibilities') : [] as possibility, i}
          <!-- Possibility Card -->
          <div style="background-color: white; border-radius: 0.75rem; padding: 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #e5e7eb; transition: transform 0.3s, box-shadow 0.3s;">

            <div style="display: flex; align-items: flex-start; gap: 1.5rem;">
              <!-- Changed icon backgrounds to match feature colors -->
              <div style="flex-shrink: 0; background-color: {i === 0 ? '#e9ecf6' : i === 1 ? '#e9f2e9' : i === 2 ? '#f7f1e3' : '#e9ecf6'}; padding: 1rem; border-radius: 0.5rem;">
                <!-- Changed icon colors -->
                {#if i === 0}
                  <svg xmlns="http://www.w3.org/2000/svg" style="width: 2rem; height: 2rem; color: #2B4B8C;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                {:else if i === 1}
                  <svg xmlns="http://www.w3.org/2000/svg" style="width: 2rem; height: 2rem; color: #2D5F2D;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                {:else if i === 2}
                  <svg xmlns="http://www.w3.org/2000/svg" style="width: 2rem; height: 2rem; color: #B8860B;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                {:else}
                  <svg xmlns="http://www.w3.org/2000/svg" style="width: 2rem; height: 2rem; color: #6B5CA5;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                {/if}
              </div>
              <div>
                <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem; color: #111827;">{possibility.title}</h3>
                <p style="color: #4b5563; line-height: 1.6;">{possibility.description}</p>
              </div>
            </div>
          </div>
        {/each}
      {:else}
        <div style="text-align: center; padding: 2rem; color: #6b7280;">
          Loading possibilities...
        </div>
      {/if}
    </div>
  </div>
</section>

<!-- Additional Info Section -->
<section style="padding: 4rem 0; background-color: #f9fafb;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div style="max-width: 42rem; margin: 0 auto;">
      <div style="margin: 0 auto; line-height: 1.7; font-size: 1.125rem;">
        <h2 style="text-align: center; font-size: 2rem; margin-bottom: 2rem; color: #654321;">{$t('home.additionalInfo.heading')}</h2>
        <p style="margin-bottom: 1.5rem; color: #4b5563;">
          {$t('home.additionalInfo.paragraph1')}
        </p>
        <p style="margin-bottom: 1rem; color: #4b5563;">
          {$t('home.additionalInfo.paragraph2')}
        </p>
        <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem; list-style-type: disc; color: #4b5563;">
          {#each $t('home.additionalInfo.listItems') as item}
            <li style="margin-bottom: 0.5rem;">{item}</li>
          {/each}
        </ul>
        <p style="margin-bottom: 1.5rem; color: #4b5563;">
          {$t('home.additionalInfo.paragraph3')}
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Call to Action Section -->
<section style="padding: 4rem 0; background: linear-gradient(to bottom right, #2B4B8C, #4B5CA5, #6B5CA5); color: white;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div style="max-width: 42rem; margin: 0 auto; text-align: center;">
      <h2 style="font-size: 2rem; font-weight: 700; margin-bottom: 1.5rem;">{$t('home.callToAction.heading')}</h2>
      <p style="font-size: 1.25rem; color: #ffffff; margin-bottom: 2.5rem;">
        {$t('home.callToAction.text')}
      </p>
      <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center; justify-content: center;">
        <a href="{base}/frameworks" style="width: 100%; max-width: 20rem; display: inline-block; background-color: #DAA520; color: #2B4B8C; font-weight: 700; padding: 0.75rem 2rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: all 0.2s;">
          {$t('home.callToAction.primaryButton')}
        </a>
        <a href="{base}/contact" style="width: 100%; max-width: 20rem; display: inline-block; background-color: transparent; border: 2px solid #DAA520; color: #DAA520; font-weight: 700; padding: 0.75rem 2rem; border-radius: 0.5rem; text-decoration: none; transition: all 0.2s;">
          {$t('home.callToAction.secondaryButton')}
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  /* Collapsible Info Box Styles */
  .collapsible-info-box {
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: white;
    border: 1px solid #e5e7eb;
  }

  .info-box-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
  }

  .info-box-header:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }

  .disclaimer-header {
    background-color: #fef2f2;
    border-bottom: 1px solid #fecaca;
  }

  .disclaimer-header:hover {
    background-color: #fef1f1;
  }

  .why-exists-header {
    background-color: #eff6ff;
    border-bottom: 1px solid #dbeafe;
  }

  .why-exists-header:hover {
    background-color: #eef5ff;
  }

  .language-header {
    background-color: #fffbeb;
    border-bottom: 1px solid #fef3c7;
  }

  .language-header:hover {
    background-color: #fffaeb;
  }

  .header-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .header-content .icon {
    font-size: 1.25rem;
    flex-shrink: 0;
  }

  .header-content h3 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: #374151;
  }

  .toggle-icon {
    font-size: 0.875rem;
    color: #6b7280;
    transition: transform 0.2s ease;
    flex-shrink: 0;
  }

  .toggle-icon.rotated {
    transform: rotate(180deg);
  }

  .info-box-content {
    padding: 1.5rem;
    border-top: 1px solid #e5e7eb;
  }

  .disclaimer-content {
    background-color: #fef2f2;
    border-top-color: #fecaca;
  }

  .why-exists-content {
    background-color: #eff6ff;
    border-top-color: #dbeafe;
  }

  .language-content {
    background-color: #fffbeb;
    border-top-color: #fef3c7;
  }

  .info-box-content p {
    margin-bottom: 1rem;
    color: #374151;
    line-height: 1.6;
  }

  .info-box-content p:last-child {
    margin-bottom: 0;
  }

  /* Slide down animation */
  @keyframes slideDown {
    from {
      opacity: 0;
      max-height: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      max-height: 1000px;
      transform: translateY(0);
    }
  }

  /* Responsive adjustments */
  @media (max-width: 640px) {
    .info-box-header {
      padding: 0.875rem 1rem;
    }

    .header-content h3 {
      font-size: 1rem;
    }

    .info-box-content {
      padding: 1rem;
    }
  }

  /* Focus styles for accessibility */
  .info-box-header:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }

  /* Ensure proper color contrast for different themes */
  .disclaimer-header h3 {
    color: #991b1b;
  }

  .why-exists-header h3 {
    color: #1e40af;
  }

  .language-header h3 {
    color: #92400e;
  }
</style>
