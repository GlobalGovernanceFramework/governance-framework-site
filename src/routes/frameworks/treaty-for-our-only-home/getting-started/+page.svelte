<!-- src/routes/frameworks/treaty-for-our-only-home/getting-started/+page.svelte -->
<script>
  import { t, locale } from '$lib/i18n';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import ShareButtons from '$lib/components/ShareButtons.svelte';

  let isVisible = false;
  
  onMount(() => {
    setTimeout(() => {
      isVisible = true;
    }, 100);
  });

  // Get the correct infographic image based on language
  $: infographicImage = $locale === 'sv' 
    ? '/images/frameworks/tools/treaty-for-our-only-home/cost-of-inaction-infographic-sv.png'
    : '/images/frameworks/tools/treaty-for-our-only-home/cost-of-inaction-infographic-en.png';

  // Full URL for social media sharing
  $: fullImageUrl = `https://globalgovernanceframework.org${base}${infographicImage}`;
  $: pageUrl = `https://globalgovernanceframework.org${base}/start-treaty/`;
</script>

<svelte:head>
  <title>{$t('startTreaty.title')}</title>
  <meta name="description" content="{$t('startTreaty.meta.description')}" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="{pageUrl}" />
  <meta property="og:title" content="{$t('startTreaty.title')}" />
  <meta property="og:description" content="{$t('startTreaty.meta.description')}" />
  <meta property="og:image" content="{fullImageUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="{$t('startTreaty.hero.title')}" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="{pageUrl}" />
  <meta name="twitter:title" content="{$t('startTreaty.title')}" />
  <meta name="twitter:description" content="{$t('startTreaty.meta.description')}" />
  <meta name="twitter:image" content="{fullImageUrl}" />
  <meta name="twitter:image:alt" content="{$t('startTreaty.hero.title')}" />

  <!-- LinkedIn -->
  <meta property="og:site_name" content="Global Governance Frameworks" />
</svelte:head>

<!-- Hero Section - Reinforces Infographic Message -->
<section class="hero-section">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem; position: relative; z-index: 2;">
    <div style="max-width: 56rem; margin: 0 auto; text-align: center;">
      <h1 style="font-size: 2.5rem; line-height: 1.2; font-weight: 700; margin-bottom: 1.5rem;">
        {$t('startTreaty.hero.title')}
      </h1>
      <p style="font-size: 1.25rem; margin-bottom: 2.5rem; line-height: 1.6;">
        {$t('startTreaty.hero.subtitle')}
      </p>
      <a href="#blueprint" style="display: inline-block; background-color: #DAA520; color: #2B4B8C; font-weight: 600; padding: 1rem 2.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 6px 12px rgba(0,0,0,0.2); transition: all 0.3s; font-size: 1.125rem;">
        {$t('startTreaty.hero.primaryCTA')}
      </a>
      <div style="margin-top: 1.5rem;">
        <a href="{base}/frameworks/treaty-for-our-only-home" style="color: #DAA520; font-weight: 500; text-decoration: underline; font-size: 1rem;">
          {$t('startTreaty.hero.secondaryCTA')}
        </a>
      </div>
    </div>
  </div>
  <!-- Subtle background pattern -->
  <div class="hero-bg-pattern"></div>
</section>

<!-- The Two Paths Section -->
<section style="padding: 4rem 0; background-color: #f8fafc;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start;">
      
      <!-- Crisis Path -->
      <div style="background: linear-gradient(to bottom, #FFF5F5, #FFEAEA); padding: 2.5rem; border-radius: 1rem; border: 2px solid #C43B3B; box-shadow: 0 8px 25px rgba(196, 59, 59, 0.15);">
        <div style="text-align: center; margin-bottom: 2rem;">
          <h2 style="font-size: 1.875rem; font-weight: 700; color: #C43B3B; margin-bottom: 0.5rem;">
            {$t('startTreaty.twoPathsDeeper.crisis.title')}
          </h2>
          <p style="color: #991b1b; font-weight: 600;">
            {$t('startTreaty.twoPathsDeeper.crisis.subtitle')}
          </p>
        </div>
        
        <div style="margin-bottom: 2rem;">
          <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
            <div style="background-color: #C43B3B; color: white; border-radius: 50%; width: 3rem; height: 3rem; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.25rem; margin-right: 1rem; flex-shrink: 0;">$54T</div>
            <div>
              <div style="font-weight: 600; color: #7f1d1d;">{$t('startTreaty.twoPathsDeeper.crisis.climate.title')}</div>
              <div style="font-size: 0.875rem; color: #991b1b;">{$t('startTreaty.twoPathsDeeper.crisis.climate.description')}</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
            <div style="background-color: #C43B3B; color: white; border-radius: 50%; width: 3rem; height: 3rem; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem; margin-right: 1rem; flex-shrink: 0;">$13.8T</div>
            <div>
              <div style="font-weight: 600; color: #7f1d1d;">{$t('startTreaty.twoPathsDeeper.crisis.pandemic.title')}</div>
              <div style="font-size: 0.875rem; color: #991b1b;">{$t('startTreaty.twoPathsDeeper.crisis.pandemic.description')}</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: center;">
            <div style="background-color: #C43B3B; color: white; border-radius: 50%; width: 3rem; height: 3rem; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem; margin-right: 1rem; flex-shrink: 0;">16Y</div>
            <div>
              <div style="font-weight: 600; color: #7f1d1d;">{$t('startTreaty.twoPathsDeeper.crisis.democracy.title')}</div>
              <div style="font-size: 0.875rem; color: #991b1b;">{$t('startTreaty.twoPathsDeeper.crisis.democracy.description')}</div>
            </div>
          </div>
        </div>
        
        <div style="background-color: rgba(196, 59, 59, 0.1); padding: 1.5rem; border-radius: 0.5rem; border-left: 4px solid #C43B3B;">
          <p style="font-style: italic; color: #7f1d1d; margin: 0; text-align: center; font-weight: 500;">
            {$t('startTreaty.twoPathsDeeper.crisis.conclusion')}
          </p>
        </div>
      </div>

      <!-- Hope Path -->
      <div style="background: linear-gradient(to bottom, #F0FFF4, #E8F5E8); padding: 2.5rem; border-radius: 1rem; border: 2px solid #00C49A; box-shadow: 0 8px 25px rgba(0, 196, 154, 0.15);">
        <div style="text-align: center; margin-bottom: 2rem;">
          <h2 style="font-size: 1.875rem; font-weight: 700; color: #00C49A; margin-bottom: 0.5rem;">
            {$t('startTreaty.twoPathsDeeper.resilience.title')}
          </h2>
          <p style="color: #047857; font-weight: 600;">
            {$t('startTreaty.twoPathsDeeper.resilience.subtitle')}
          </p>
        </div>
        
        <div style="margin-bottom: 2rem;">
          <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
            <div style="background-color: #00C49A; color: white; border-radius: 50%; width: 3rem; height: 3rem; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.75rem; margin-right: 1rem; flex-shrink: 0; text-align: center; line-height: 1.2;">$100B</div>
            <div>
              <div style="font-weight: 600; color: #065f46;">{$t('startTreaty.twoPathsDeeper.resilience.climateStability.title')}</div>
              <div style="font-size: 0.875rem; color: #047857;">{$t('startTreaty.twoPathsDeeper.resilience.climateStability.description')}</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
            <div style="background-color: #00C49A; color: white; border-radius: 50%; width: 3rem; height: 3rem; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.875rem; margin-right: 1rem; flex-shrink: 0;">🛡️</div>
            <div>
              <div style="font-weight: 600; color: #065f46;">{$t('startTreaty.twoPathsDeeper.resilience.pandemicPrevention.title')}</div>
              <div style="font-size: 0.875rem; color: #047857;">{$t('startTreaty.twoPathsDeeper.resilience.pandemicPrevention.description')}</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: center;">
            <div style="background-color: #00C49A; color: white; border-radius: 50%; width: 3rem; height: 3rem; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.875rem; margin-right: 1rem; flex-shrink: 0;">💰</div>
            <div>
              <div style="font-weight: 600; color: #065f46;">{$t('startTreaty.twoPathsDeeper.resilience.economicResilience.title')}</div>
              <div style="font-size: 0.875rem; color: #047857;">{$t('startTreaty.twoPathsDeeper.resilience.economicResilience.description')}</div>
            </div>
          </div>
        </div>
        
        <div style="background-color: rgba(0, 196, 154, 0.1); padding: 1.5rem; border-radius: 0.5rem; border-left: 4px solid #00C49A;">
          <p style="font-style: italic; color: #065f46; margin: 0; text-align: center; font-weight: 500;">
            {$t('startTreaty.twoPathsDeeper.resilience.conclusion')}
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- How It Works: The Five Pillars -->
<section id="blueprint" style="padding: 4rem 0; background-color: white;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div style="text-align: center; margin-bottom: 4rem;">
      <h2 style="font-size: 2.25rem; font-weight: 700; color: #2B4B8C; margin-bottom: 1rem;">
        {$t('startTreaty.fivePillars.title')}
      </h2>
      <p style="font-size: 1.25rem; color: #4b5563; max-width: 42rem; margin: 0 auto;">
        {$t('startTreaty.fivePillars.subtitle')}
      </p>
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); gap: 2rem;">
      
      <!-- Pillar 1 -->
      <div style="background-color: white; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-left: 6px solid #2B4B8C; transition: all 0.3s;">
        <div style="display: flex; align-items: flex-start; gap: 1.5rem;">
          <div style="background-color: #e9ecf6; padding: 1rem; border-radius: 0.75rem; flex-shrink: 0;">
            <div style="width: 2.5rem; height: 2.5rem; background-color: #2B4B8C; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 1.125rem;">1</div>
          </div>
          <div style="flex: 1;">
            <h3 style="font-size: 1.375rem; font-weight: 700; color: #2B4B8C; margin-bottom: 0.5rem;">
              {$t('startTreaty.fivePillars.pillar1.title')}
            </h3>
            <p style="color: #4b5563; margin-bottom: 1rem; line-height: 1.6;">
              {$t('startTreaty.fivePillars.pillar1.description')}
            </p>
            <div style="background-color: #f8fafc; padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #DAA520;">
              <div style="font-weight: 600; color: #2B4B8C; margin-bottom: 0.25rem;">
                {$t('startTreaty.fivePillars.pillar1.keyAction.title')}
              </div>
              <div style="font-size: 0.875rem; color: #6b7280;">
                {$t('startTreaty.fivePillars.pillar1.keyAction.description')}
              </div>
            </div>
            <a href="{base}/frameworks/treaty-for-our-only-home?section=five-pillars" style="display: inline-block; margin-top: 1rem; color: #2B4B8C; font-weight: 500; text-decoration: none; border-bottom: 1px solid #2B4B8C; transition: all 0.2s;">
              {$t('startTreaty.fivePillars.learnMore')} →
            </a>
          </div>
        </div>
      </div>

      <!-- Pillar 2 -->
      <div style="background-color: white; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-left: 6px solid #2D5F2D; transition: all 0.3s;">
        <div style="display: flex; align-items: flex-start; gap: 1.5rem;">
          <div style="background-color: #e9f2e9; padding: 1rem; border-radius: 0.75rem; flex-shrink: 0;">
            <div style="width: 2.5rem; height: 2.5rem; background-color: #2D5F2D; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 1.125rem;">2</div>
          </div>
          <div style="flex: 1;">
            <h3 style="font-size: 1.375rem; font-weight: 700; color: #2D5F2D; margin-bottom: 0.5rem;">
              {$t('startTreaty.fivePillars.pillar2.title')}
            </h3>
            <p style="color: #4b5563; margin-bottom: 1rem; line-height: 1.6;">
              {$t('startTreaty.fivePillars.pillar2.description')}
            </p>
            <div style="background-color: #f8fafc; padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #DAA520;">
              <div style="font-weight: 600; color: #2D5F2D; margin-bottom: 0.25rem;">
                {$t('startTreaty.fivePillars.pillar2.keyAction.title')}
              </div>
              <div style="font-size: 0.875rem; color: #6b7280;">
                {$t('startTreaty.fivePillars.pillar2.keyAction.description')}
              </div>
            </div>
            <a href="{base}/frameworks/treaty-for-our-only-home?section=five-pillars" style="display: inline-block; margin-top: 1rem; color: #2D5F2D; font-weight: 500; text-decoration: none; border-bottom: 1px solid #2D5F2D; transition: all 0.2s;">
              {$t('startTreaty.fivePillars.learnMore')} →
            </a>
          </div>
        </div>
      </div>

      <!-- Pillar 3 -->
      <div style="background-color: white; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-left: 6px solid #B8860B; transition: all 0.3s;">
        <div style="display: flex; align-items: flex-start; gap: 1.5rem;">
          <div style="background-color: #f7f1e3; padding: 1rem; border-radius: 0.75rem; flex-shrink: 0;">
            <div style="width: 2.5rem; height: 2.5rem; background-color: #B8860B; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 1.125rem;">3</div>
          </div>
          <div style="flex: 1;">
            <h3 style="font-size: 1.375rem; font-weight: 700; color: #B8860B; margin-bottom: 0.5rem;">
              {$t('startTreaty.fivePillars.pillar3.title')}
            </h3>
            <p style="color: #4b5563; margin-bottom: 1rem; line-height: 1.6;">
              {$t('startTreaty.fivePillars.pillar3.description')}
            </p>
            <div style="background-color: #f8fafc; padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #DAA520;">
              <div style="font-weight: 600; color: #B8860B; margin-bottom: 0.25rem;">
                {$t('startTreaty.fivePillars.pillar3.keyAction.title')}
              </div>
              <div style="font-size: 0.875rem; color: #6b7280;">
                {$t('startTreaty.fivePillars.pillar3.keyAction.description')}
              </div>
            </div>
            <a href="{base}/frameworks/treaty-for-our-only-home?section=five-pillars" style="display: inline-block; margin-top: 1rem; color: #B8860B; font-weight: 500; text-decoration: none; border-bottom: 1px solid #B8860B; transition: all 0.2s;">
              {$t('startTreaty.fivePillars.learnMore')} →
            </a>
          </div>
        </div>
      </div>

      <!-- Pillar 4 -->
      <div style="background-color: white; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-left: 6px solid #00C49A; transition: all 0.3s;">
        <div style="display: flex; align-items: flex-start; gap: 1.5rem;">
          <div style="background-color: #e8f5f0; padding: 1rem; border-radius: 0.75rem; flex-shrink: 0;">
            <div style="width: 2.5rem; height: 2.5rem; background-color: #00C49A; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 1.125rem;">4</div>
          </div>
          <div style="flex: 1;">
            <h3 style="font-size: 1.375rem; font-weight: 700; color: #00C49A; margin-bottom: 0.5rem;">
              {$t('startTreaty.fivePillars.pillar4.title')}
            </h3>
            <p style="color: #4b5563; margin-bottom: 1rem; line-height: 1.6;">
              {$t('startTreaty.fivePillars.pillar4.description')}
            </p>
            <div style="background-color: #f8fafc; padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #DAA520;">
              <div style="font-weight: 600; color: #00C49A; margin-bottom: 0.25rem;">
                {$t('startTreaty.fivePillars.pillar4.keyAction.title')}
              </div>
              <div style="font-size: 0.875rem; color: #6b7280;">
                {$t('startTreaty.fivePillars.pillar4.keyAction.description')}
              </div>
            </div>
            <a href="{base}/frameworks/treaty-for-our-only-home?section=five-pillars" style="display: inline-block; margin-top: 1rem; color: #00C49A; font-weight: 500; text-decoration: none; border-bottom: 1px solid #00C49A; transition: all 0.2s;">
              {$t('startTreaty.fivePillars.learnMore')} →
            </a>
          </div>
        </div>
      </div>

      <!-- Pillar 5 -->
      <div style="background-color: white; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-left: 6px solid #6B5CA5; transition: all 0.3s;">
        <div style="display: flex; align-items: flex-start; gap: 1.5rem;">
          <div style="background-color: #f0eef7; padding: 1rem; border-radius: 0.75rem; flex-shrink: 0;">
            <div style="width: 2.5rem; height: 2.5rem; background-color: #6B5CA5; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 1.125rem;">5</div>
          </div>
          <div style="flex: 1;">
            <h3 style="font-size: 1.375rem; font-weight: 700; color: #6B5CA5; margin-bottom: 0.5rem;">
              {$t('startTreaty.fivePillars.pillar5.title')}
            </h3>
            <p style="color: #4b5563; margin-bottom: 1rem; line-height: 1.6;">
              {$t('startTreaty.fivePillars.pillar5.description')}
            </p>
            <div style="background-color: #f8fafc; padding: 1rem; border-radius: 0.5rem; border-left: 3px solid #DAA520;">
              <div style="font-weight: 600; color: #6B5CA5; margin-bottom: 0.25rem;">
                {$t('startTreaty.fivePillars.pillar5.keyAction.title')}
              </div>
              <div style="font-size: 0.875rem; color: #6b7280;">
                {$t('startTreaty.fivePillars.pillar5.keyAction.description')}
              </div>
            </div>
            <a href="{base}/frameworks/treaty-for-our-only-home?section=five-pillars" style="display: inline-block; margin-top: 1rem; color: #6B5CA5; font-weight: 500; text-decoration: none; border-bottom: 1px solid #6B5CA5; transition: all 0.2s;">
              {$t('startTreaty.fivePillars.learnMore')} →
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Credible Path Forward -->
<section style="padding: 4rem 0; background-color: #f8fafc;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div style="max-width: 56rem; margin: 0 auto; text-align: center; margin-bottom: 3rem;">
      <h2 style="font-size: 2.25rem; font-weight: 700; color: #2B4B8C; margin-bottom: 1rem;">
        {$t('startTreaty.crediblePath.title')}
      </h2>
      <p style="font-size: 1.25rem; color: #4b5563;">
        {$t('startTreaty.crediblePath.subtitle')}
      </p>
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); gap: 2rem; margin-bottom: 3rem;">
      
      <!-- Sovereignty Bargains -->
      <div style="background-color: white; padding: 2.5rem; border-radius: 1rem; box-shadow: 0 6px 20px rgba(0,0,0,0.08); border: 1px solid #e5e7eb;">
        <div style="display: flex; align-items: flex-start; gap: 2rem;">
          <div style="background-color: #e9ecf6; padding: 1.25rem; border-radius: 1rem; flex-shrink: 0;">
            <svg xmlns="http://www.w3.org/2000/svg" style="width: 2.5rem; height: 2.5rem; color: #2B4B8C;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 style="font-size: 1.5rem; font-weight: 700; color: #2B4B8C; margin-bottom: 1rem;">
              {$t('startTreaty.crediblePath.sovereigntyBargains.title')}
            </h3>
            <p style="color: #4b5563; line-height: 1.7; margin-bottom: 1rem;">
              {$t('startTreaty.crediblePath.sovereigntyBargains.description')}
            </p>
          </div>
        </div>
      </div>

      <!-- Coalition of Willing -->
      <div style="background-color: white; padding: 2.5rem; border-radius: 1rem; box-shadow: 0 6px 20px rgba(0,0,0,0.08); border: 1px solid #e5e7eb;">
        <div style="display: flex; align-items: flex-start; gap: 2rem;">
          <div style="background-color: #e9f2e9; padding: 1.25rem; border-radius: 1rem; flex-shrink: 0;">
            <svg xmlns="http://www.w3.org/2000/svg" style="width: 2.5rem; height: 2.5rem; color: #2D5F2D;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <h3 style="font-size: 1.5rem; font-weight: 700; color: #2D5F2D; margin-bottom: 1rem;">
              {$t('startTreaty.crediblePath.coalitionWilling.title')}
            </h3>
            <p style="color: #4b5563; line-height: 1.7; margin-bottom: 1rem;">
              {$t('startTreaty.crediblePath.coalitionWilling.description')}
            </p>
          </div>
        </div>
      </div>

      <!-- Have Questions -->
      <div style="background-color: white; padding: 2.5rem; border-radius: 1rem; box-shadow: 0 6px 20px rgba(0,0,0,0.08); border: 1px solid #e5e7eb;">
        <div style="display: flex; align-items: flex-start; gap: 2rem;">
          <div style="background-color: #f7f1e3; padding: 1.25rem; border-radius: 1rem; flex-shrink: 0;">
            <svg xmlns="http://www.w3.org/2000/svg" style="width: 2.5rem; height: 2.5rem; color: #B8860B;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 style="font-size: 1.5rem; font-weight: 700; color: #B8860B; margin-bottom: 1rem;">
              {$t('startTreaty.crediblePath.haveQuestions.title')}
            </h3>
            <p style="color: #4b5563; line-height: 1.7; margin-bottom: 1.5rem;">
              {$t('startTreaty.crediblePath.haveQuestions.description')}
            </p>
            <a href="{base}/frameworks/treaty-for-our-only-home#faq-and-challenges" style="display: inline-block; background-color: #B8860B; color: white; font-weight: 600; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: all 0.2s;">
              {$t('startTreaty.crediblePath.haveQuestions.button')}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Call to Action Section -->
<section style="padding: 4rem 0; background: linear-gradient(135deg, #2B4B8C 0%, #4B5CA5 50%, #6B5CA5 100%); color: white;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <div style="max-width: 56rem; margin: 0 auto; text-align: center; margin-bottom: 3rem;">
      <h2 style="font-size: 2.25rem; font-weight: 700; margin-bottom: 1rem;">
        {$t('startTreaty.finalCTA.title')}
      </h2>
      <p style="font-size: 1.25rem; color: #ffffff; margin-bottom: 0.5rem;">
        {$t('startTreaty.finalCTA.subtitle')}
      </p>
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 3rem;">
      
      <!-- High Engagement Option -->
      <div style="background-color: rgba(255, 255, 255, 0.1); padding: 2rem; border-radius: 1rem; backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); text-align: center;">
        <div style="background-color: #DAA520; color: #2B4B8C; border-radius: 50%; width: 4rem; height: 4rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; font-size: 1.5rem;">🤝</div>
        <h3 style="font-size: 1.375rem; font-weight: 700; margin-bottom: 1rem;">
          {$t('startTreaty.finalCTA.options.highEngagement.title')}
        </h3>
        <p style="color: #e2e8f0; margin-bottom: 1.5rem; line-height: 1.6;">
          {$t('startTreaty.finalCTA.options.highEngagement.description')}
        </p>
        <a href="{base}/contact" style="display: inline-block; background-color: #DAA520; color: #2B4B8C; font-weight: 700; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; box-shadow: 0 4px 6px rgba(0,0,0,0.2); transition: all 0.3s;">
          {$t('startTreaty.finalCTA.options.highEngagement.button')}
        </a>
      </div>

      <!-- Medium Engagement Option -->
      <div style="background-color: rgba(255, 255, 255, 0.1); padding: 2rem; border-radius: 1rem; backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); text-align: center;">
        <div style="background-color: #00C49A; color: white; border-radius: 50%; width: 4rem; height: 4rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; font-size: 1.5rem;">📢</div>
        <h3 style="font-size: 1.375rem; font-weight: 700; margin-bottom: 1rem;">
          {$t('startTreaty.finalCTA.options.mediumEngagement.title')}
        </h3>
        <p style="color: #e2e8f0; margin-bottom: 1.5rem; line-height: 1.6;">
          {$t('startTreaty.finalCTA.options.mediumEngagement.description')}
        </p>
        <div style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
          <a href="https://twitter.com/intent/tweet?text={encodeURIComponent($t('startTreaty.finalCTA.shareText'))}&url={encodeURIComponent(pageUrl)}" target="_blank" style="background-color: #1DA1F2; color: white; padding: 0.5rem 1rem; border-radius: 0.375rem; text-decoration: none; font-weight: 500;">Twitter</a>
          <a href="https://www.linkedin.com/sharing/share-offsite/?url={encodeURIComponent(pageUrl)}" target="_blank" style="background-color: #0077B5; color: white; padding: 0.5rem 1rem; border-radius: 0.375rem; text-decoration: none; font-weight: 500;">LinkedIn</a>
          <a href="https://www.facebook.com/sharer/sharer.php?u={encodeURIComponent(pageUrl)}" target="_blank" style="background-color: #1877F2; color: white; padding: 0.5rem 1rem; border-radius: 0.375rem; text-decoration: none; font-weight: 500;">Facebook</a>
        </div>
      </div>

      <!-- Low Engagement Option -->
      <div style="background-color: rgba(255, 255, 255, 0.1); padding: 2rem; border-radius: 1rem; backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); text-align: center;">
        <div style="background-color: #6B5CA5; color: white; border-radius: 50%; width: 4rem; height: 4rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; font-size: 1.5rem;">📚</div>
        <h3 style="font-size: 1.375rem; font-weight: 700; margin-bottom: 1rem;">
          {$t('startTreaty.finalCTA.options.lowEngagement.title')}
        </h3>
        <p style="color: #e2e8f0; margin-bottom: 1.5rem; line-height: 1.6;">
          {$t('startTreaty.finalCTA.options.lowEngagement.description')}
        </p>
        <a href="{base}/frameworks/treaty-for-our-only-home" style="display: inline-block; background-color: transparent; border: 2px solid #DAA520; color: #DAA520; font-weight: 700; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; transition: all 0.3s;">
          {$t('startTreaty.finalCTA.options.lowEngagement.button')}
        </a>
      </div>
    </div>
    
    <div style="text-align: center;">
      <p style="color: #cbd5e0; font-style: italic;">
        {$t('startTreaty.finalCTA.footer')}
      </p>
    </div>
  </div>
</section>

<ShareButtons 
  title="Treaty for Our Only Home"
  description="The foundational framework for global governance"
  hashtags="Treaty,GlobalGovernance,Cooperation"
/>

<style>
  .hero-section {
    padding: 4rem 0;
    background: linear-gradient(135deg, #C43B3B 0%, #2B4B8C 50%, #00C49A 100%);
    color: white;
    position: relative;
    overflow: hidden;
  }

  .hero-bg-pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.1;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    z-index: 1;
  }

  /* Responsive design */
  @media (max-width: 768px) {
    section div[style*="grid-template-columns: 1fr 1fr"] {
      display: block !important;
    }
    
    section div[style*="grid-template-columns: 1fr 1fr"] > div {
      margin-bottom: 2rem;
    }
    
    section div[style*="display: flex"] {
      flex-direction: column !important;
      text-align: center !important;
    }
    
    section div[style*="display: flex"] > div:first-child {
      margin-bottom: 1rem !important;
      margin-right: 0 !important;
    }
  }
  
  /* Hover effects */
  section div[style*="transition: all 0.3s"]:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }
</style>
