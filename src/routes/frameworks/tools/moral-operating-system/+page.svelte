<!-- src/routes/frameworks/tools/moral-operating-system/+page.svelte -->
<script>
 import { t, locale, setLocale } from '$lib/i18n';
 import { base } from '$app/paths';

 // Subscribe to stores
 $: currentLocale = $locale;

 // Helper function for language button styles
 function getLanguageButtonStyle(lang) {
   const isActive = currentLocale === lang;
   return isActive ? 'lang-button active' : 'lang-button';
 }
</script>

<svelte:head>
 <title>{$t('toolsMoralOperatingSystem.title')} - Global Governance Framework</title>
 <meta name="description" content={$t('toolsMoralOperatingSystem.subtitle')} />
</svelte:head>

<!-- Hero Section -->
<section class="hero">
 <div class="container">
   <div class="hero-content">
     <h1>{$t('toolsMoralOperatingSystem.title')}</h1>
     <p>{$t('toolsMoralOperatingSystem.subtitle')}</p>
   </div>
 </div>
</section>

<!-- Back Navigation -->
<div class="container">
 <div class="back-navigation">
   <a href="{base}/frameworks/tools" class="back-link">
     <span class="back-icon">←</span>
     {$t('toolsMoralOperatingSystem.backToTools')}
   </a>
 </div>
</div>

<!-- Main Content Section -->
<section class="main-content">
 <div class="container">
   <div class="content-wrapper">
     <p class="intro-text">{$t('toolsMoralOperatingSystem.intro')}</p>

     <!-- Start with the Rights Seed Kit -->
     <div class="seed-kit-card">
       <div class="card-content">
         <div class="card-icon">🦋</div>
         <div class="card-text">
           <h2>{$t('toolsMoralOperatingSystem.seedKitTitle')}</h2>
           <p>{$t('toolsMoralOperatingSystem.seedKitDesc')}</p>
         </div>
         <div class="card-actions">
           <a href="{base}/frameworks/tools/moral-operating-system/rights-seed-kit-en.zip" download class="big-btn primary">
             {$t('toolsMoralOperatingSystem.seedKitButton')}
             <span class="icon">↓</span>
           </a>
         </div>
       </div>
     </div>
     
     <!-- Framework Guides -->
     <h2 class="section-title">{$t('toolsMoralOperatingSystem.guidesTitle')}</h2>
     <p class="section-desc">{$t('toolsMoralOperatingSystem.guidesDesc')}</p>
     
     <div class="tools-grid">
       <!-- One-Page Essence -->
       <div class="tool-card color-essence">
         <h3>{$t('toolsMoralOperatingSystem.essenceTitle')}</h3>
         <p>{$t('toolsMoralOperatingSystem.essenceDesc')}</p>
         <div class="tool-actions">
           <a href="{base}/assets/pdf/moral-operating-system-framework-essence-en.pdf" download class="big-btn pdf">
             {$t('toolsMoralOperatingSystem.downloadPDF')}
             <span class="icon">↓</span>
           </a>
         </div>
       </div>
       
       <!-- Executive Summary for Skeptics -->
       <div class="tool-card color-skeptic">
         <h3>{$t('toolsMoralOperatingSystem.executiveSummaryTitle')}</h3>
         <p>{$t('toolsMoralOperatingSystem.executiveSummaryDesc')}</p>
         <div class="tool-actions">
           <a href="{base}/assets/pdf/moral-operating-system-framework-executivesummary-for-the-skeptic-en.pdf" download class="big-btn pdf">
             {$t('toolsMoralOperatingSystem.downloadPDF')}
             <span class="icon">↓</span>
           </a>
         </div>
       </div>
     </div>

     <!-- Core Framework Tools -->
     <h2 class="section-title">{$t('toolsMoralOperatingSystem.coreToolsTitle')}</h2>
     <p class="section-desc">{$t('toolsMoralOperatingSystem.coreToolsDesc')}</p>
     
     <div class="tools-grid">
       <!-- Rights Spectrum Decision Matrix -->
       <div class="tool-card color-rights">
         <h3>{$t('toolsMoralOperatingSystem.rightsSpectrumTitle')}</h3>
         <p>{$t('toolsMoralOperatingSystem.rightsSpectrumDesc')}</p>
         <div class="tool-actions">
           <a href="{base}/frameworks/tools/moral-operating-system/rights-spectrum-matrix-en.pdf" download class="big-btn pdf">
             {$t('toolsMoralOperatingSystem.downloadPDF')}
             <span class="icon">↓</span>
           </a>
           <a href="{base}/frameworks/tools/moral-operating-system/rights-spectrum-matrix-en.md" download class="big-btn md">
             {$t('toolsMoralOperatingSystem.downloadMarkdown')}
             <span class="icon">↓</span>
           </a>
           <a href="{base}/frameworks/tools/moral-operating-system/rights-spectrum-matrix-en.odt" download class="big-btn odt">
             {$t('toolsMoralOperatingSystem.downloadODT')}
             <span class="icon">↓</span>
           </a>
         </div>
       </div>

       <!-- Spiral Translation Guide -->
       <div class="tool-card color-spiral">
         <h3>{$t('toolsMoralOperatingSystem.spiralTranslationTitle')}</h3>
         <p>{$t('toolsMoralOperatingSystem.spiralTranslationDesc')}</p>
         <div class="tool-actions">
           <a href="{base}/frameworks/tools/moral-operating-system/spiral-translation-guide-en.pdf" download class="big-btn pdf">
             {$t('toolsMoralOperatingSystem.downloadPDF')}
             <span class="icon">↓</span>
           </a>
           <a href="{base}/frameworks/tools/moral-operating-system/spiral-translation-guide-en.md" download class="big-btn md">
             {$t('toolsMoralOperatingSystem.downloadMarkdown')}
             <span class="icon">↓</span>
           </a>
         </div>
       </div>

       <!-- AI Consciousness Assessment -->
       <div class="tool-card color-ai">
         <h3>{$t('toolsMoralOperatingSystem.aiConsciousnessTitle')}</h3>
         <p>{$t('toolsMoralOperatingSystem.aiConsciousnessDesc')}</p>
         <div class="tool-actions">
           <a href="{base}/frameworks/tools/moral-operating-system/ai-consciousness-assessment-en.pdf" download class="big-btn pdf">
             {$t('toolsMoralOperatingSystem.downloadPDF')}
             <span class="icon">↓</span>
           </a>
           <a href="{base}/frameworks/tools/moral-operating-system/ai-consciousness-assessment-en.md" download class="big-btn md">
             {$t('toolsMoralOperatingSystem.downloadMarkdown')}
             <span class="icon">↓</span>
           </a>
         </div>
       </div>

       <!-- Spiral Microlearning Module -->
       <div class="tool-card color-learning">
         <h3>{$t('toolsMoralOperatingSystem.spiralMicrolearningTitle')}</h3>
         <p>{$t('toolsMoralOperatingSystem.spiralMicrolearningDesc')}</p>
         <div class="tool-actions">
           <a href="{base}/frameworks/tools/moral-operating-system/spiral-microlearning-module-en.pdf" download class="big-btn pdf">
             {$t('toolsMoralOperatingSystem.downloadPDF')}
             <span class="icon">↓</span>
           </a>
           <a href="{base}/frameworks/tools/moral-operating-system/spiral-micro-learning-module-en.md" download class="big-btn md">
             {$t('toolsMoralOperatingSystem.downloadMarkdown')}
             <span class="icon">↓</span>
           </a>
         </div>
       </div>
     </div>
     
     <!-- Implementation Tools -->
     <h2 class="section-title">{$t('toolsMoralOperatingSystem.implementationToolsTitle')}</h2>
     <p class="section-desc">{$t('toolsMoralOperatingSystem.implementationToolsDesc')}</p>
     
     <div class="tools-grid">
       <!-- Ecosystem Personhood Guide -->
       <div class="tool-card color-ecosystem">
         <h3>{$t('toolsMoralOperatingSystem.ecosystemPersonhoodTitle')}</h3>
         <p>{$t('toolsMoralOperatingSystem.ecosystemPersonhoodDesc')}</p>
         <div class="tool-actions">
           <a href="{base}/frameworks/tools/moral-operating-system/ecosystem-personhood-guide-en.pdf" download class="big-btn pdf">
             {$t('toolsMoralOperatingSystem.downloadPDF')}
             <span class="icon">↓</span>
           </a>
           <a href="{base}/frameworks/tools/moral-operating-system/ecosystem-personhood-guide-en.md" download class="big-btn md">
             {$t('toolsMoralOperatingSystem.downloadMarkdown')}
             <span class="icon">↓</span>
           </a>
         </div>
       </div>

       <!-- Community Ethics Audit -->
       <div class="tool-card color-ethics">
         <h3>{$t('toolsMoralOperatingSystem.communityEthicsTitle')}</h3>
         <p>{$t('toolsMoralOperatingSystem.communityEthicsDesc')}</p>
         <div class="tool-actions">
           <a href="{base}/frameworks/tools/moral-operating-system/community-ethics-audit-en.pdf" download class="big-btn pdf">
             {$t('toolsMoralOperatingSystem.downloadPDF')}
             <span class="icon">↓</span>
           </a>
           <a href="{base}/frameworks/tools/moral-operating-system/community-ethics-audit-en.md" download class="big-btn md">
             {$t('toolsMoralOperatingSystem.downloadMarkdown')}
             <span class="icon">↓</span>
           </a>
         </div>
       </div>
     </div>

     <!-- Individual Seed Kit Files -->
     <h2 class="section-title">{$t('toolsMoralOperatingSystem.individualFilesTitle')}</h2>
     <p class="section-desc">{$t('toolsMoralOperatingSystem.individualFilesDesc')}</p>
     
     <div class="tools-grid">
       <!-- One-Page Essence (from kit) -->
       <div class="tool-card color-essence">
         <h3>{$t('toolsMoralOperatingSystem.onePageEssenceTitle')}</h3>
         <p>{$t('toolsMoralOperatingSystem.onePageEssenceDesc')}</p>
         <div class="tool-actions">
           <a href="{base}/frameworks/tools/moral-operating-system/Rights_Seed_Kit/one-page-essence.pdf" download class="big-btn pdf">
             {$t('toolsMoralOperatingSystem.downloadPDF')}
             <span class="icon">↓</span>
           </a>
           <a href="{base}/frameworks/tools/moral-operating-system/Rights_Seed_Kit/one-page-essence.png" download class="big-btn img">
             {$t('toolsMoralOperatingSystem.downloadImage')}
             <span class="icon">↓</span>
           </a>
         </div>
       </div>

       <!-- Ethical Dilemma Cards -->
       <div class="tool-card color-dilemma">
         <h3>{$t('toolsMoralOperatingSystem.ethicalDilemmaTitle')}</h3>
         <p>{$t('toolsMoralOperatingSystem.ethicalDilemmaDesc')}</p>
         <div class="tool-actions">
           <a href="{base}/frameworks/tools/moral-operating-system/Rights_Seed_Kit/ethical-dilemma-cards.pdf" download class="big-btn pdf">
             {$t('toolsMoralOperatingSystem.downloadPDF')}
             <span class="icon">↓</span>
           </a>
           <a href="{base}/frameworks/tools/moral-operating-system/Rights_Seed_Kit/ethical-dilemma-cards.png" download class="big-btn img">
             {$t('toolsMoralOperatingSystem.downloadImage')}
             <span class="icon">↓</span>
           </a>
           <a href="{base}/frameworks/tools/moral-operating-system/Rights_Seed_Kit/ethical-dilemma-cards.svg" download class="big-btn svg">
             {$t('toolsMoralOperatingSystem.downloadSVG')}
             <span class="icon">↓</span>
           </a>
         </div>
       </div>

       <!-- Community Dialogue Facilitation Guide -->
       <div class="tool-card color-dialogue">
         <h3>{$t('toolsMoralOperatingSystem.dialogueFacilitationTitle')}</h3>
         <p>{$t('toolsMoralOperatingSystem.dialogueFacilitationDesc')}</p>
         <div class="tool-actions">
           <a href="{base}/frameworks/tools/moral-operating-system/Rights_Seed_Kit/community-dialogue-facilitation-guide.pdf" download class="big-btn pdf">
             {$t('toolsMoralOperatingSystem.downloadPDF')}
             <span class="icon">↓</span>
           </a>
         </div>
       </div>
     </div>
     
     <!-- Request & Feedback Section -->
     <div class="feedback-card">
       <h3>{$t('toolsMoralOperatingSystem.requestTitle')}</h3>
       <p>
         {$t('toolsMoralOperatingSystem.requestDesc')} <a href="{base}/contact" class="contact-link">{$t('toolsMoralOperatingSystem.contactLink')}</a>
       </p>
     </div>
     
     <!-- Back to Tools Overview link -->
     <div class="back-link-bottom">
       <a href="{base}/frameworks/tools">
         <span class="back-icon">←</span>
         {$t('toolsMoralOperatingSystem.backToTools')}
       </a>
     </div>
     
     <!-- Language switcher section -->
     <div class="language-section">
       <h3>{$t('toolsMoralOperatingSystem.languagesTitle')}</h3>
       <div class="language-buttons">
         <button on:click={() => setLocale('en')} class={getLanguageButtonStyle('en')}>
           English
         </button>
         <button on:click={() => setLocale('sv')} class={getLanguageButtonStyle('sv')}>
           Svenska
         </button>
       </div>
     </div>
   </div>
 </div>
</section>

<style>
 /* Ethereal Wisdom & Rights theme for Moral Operating System Tools */
 :root {
   --mos-primary: #6B46C1;        /* Deep mystical purple */
   --mos-secondary: #8B5CF6;      /* Lighter purple */
   --mos-accent: #EC4899;         /* Vibrant pink/magenta */
   --mos-rights: #3B82F6;         /* Blue for rights */
   --mos-consciousness: #F59E0B;  /* Amber for consciousness */
   --mos-spirit: #EC4899;         /* Pink for spiritual elements */
   --mos-light: #F3F0FF;          /* Very light purple */
   --mos-dark: #553C9A;           /* Dark purple */
   
   /* Dynamic Rights Spectrum colors */
   --tier1-human: #3B82F6;        /* Blue for humans */
   --tier2-animals: #10B981;      /* Green for animals */
   --tier3-ecosystems: #059669;   /* Dark green for ecosystems */
   --tier4-ai: #F59E0B;           /* Amber for AI */
   --tier5-planetary: #8B5CF6;    /* Purple for planetary */
 }

 /* Global Styles */
 .container {
   max-width: 1200px;
   margin: 0 auto;
   padding: 0 1rem;
 }
 
 .content-wrapper {
   max-width: 42rem;
   margin: 0 auto;
 }
 
 /* Hero Section */
 .hero {
   padding: 3rem 0;
   background: linear-gradient(135deg, var(--mos-primary), var(--mos-secondary));
   color: white;
 }
 
 .hero-content {
   max-width: 42rem;
   margin: 0 auto;
 }
 
 .hero h1 {
   font-size: 2.5rem;
   line-height: 1.2;
   font-weight: 700;
   margin-bottom: 1rem;
 }
 
 .hero p {
   font-size: 1.25rem;
   color: #ffffff;
 }
 
 /* Back Navigation */
 .back-navigation {
   margin: 1.5rem 0;
   max-width: 42rem;
   margin-left: auto;
   margin-right: auto;
 }

 .back-link {
   display: inline-flex;
   align-items: center;
   color: var(--mos-primary);
   font-weight: 500;
   text-decoration: none;
   transition: color 0.2s;
 }

 .back-link:hover {
   color: var(--mos-dark);
 }

 .back-icon {
   margin-right: 0.5rem;
 }
 
 /* Main Content Section */
 .main-content {
   padding: 3rem 0;
   background-color: #FEFCFF;
 }
 
 .intro-text {
   margin-bottom: 2rem;
   color: #4A5568;
   line-height: 1.7;
   font-size: 1.125rem;
 }
 
 /* Section Titles */
 .section-title {
   font-size: 1.875rem;
   font-weight: 700;
   margin-bottom: 1.5rem;
   color: var(--mos-primary);
 }
 
 .section-desc {
   margin-bottom: 2rem;
   color: #4A5568;
   line-height: 1.7;
   font-size: 1.125rem;
 }
 
 /* Seed Kit Card */
 .seed-kit-card {
   background: linear-gradient(135deg, #fefcff 0%, #f3f0ff 100%);
   padding: 1.5rem;
   border-radius: 0.75rem;
   margin-bottom: 2rem;
   box-shadow: 0 4px 6px rgba(107, 70, 193, 0.1);
   border: 1px solid rgba(107, 70, 193, 0.2);
 }
 
 .card-content {
   display: flex;
   flex-wrap: wrap;
   gap: 1.5rem;
   align-items: center;
 }
 
 .card-icon {
   font-size: 2.5rem;
   color: var(--mos-primary);
 }
 
 .card-text {
   flex: 1;
   min-width: 200px;
 }
 
 .card-text h2 {
   font-size: 1.5rem;
   font-weight: 600;
   margin-bottom: 0.75rem;
   color: var(--mos-primary);
 }
 
 .card-text p {
   color: #4A5568;
   margin-bottom: 1rem;
 }
 
 .card-actions {
   display: flex;
   flex-wrap: wrap;
   gap: 0.75rem;
   align-items: center;
 }
 
 /* Tools Grid */
 .tools-grid {
   display: grid;
   grid-template-columns: repeat(1, 1fr);
   gap: 1.5rem;
   margin-bottom: 3rem;
 }
 
 /* Tool Cards with MOS-specific color variations */
 .tool-card {
   background-color: white;
   padding: 1.5rem;
   border-radius: 0.5rem;
   box-shadow: 0 1px 3px rgba(0,0,0,0.1);
   border-left: 4px solid;
 }
 
 .tool-card h3 {
   font-size: 1.5rem;
   font-weight: 600;
   margin-bottom: 0.75rem;
 }
 
 .tool-card p {
   color: #4A5568;
   margin-bottom: 1.5rem;
 }
 
 /* MOS Color Variations */
 .color-essence {
   border-left-color: var(--mos-primary);
 }
 .color-essence h3 {
   color: var(--mos-primary);
 }
 
 .color-skeptic {
   border-left-color: var(--mos-consciousness);
 }
 .color-skeptic h3 {
   color: var(--mos-consciousness);
 }
 
 .color-rights {
   border-left-color: var(--tier1-human);
 }
 .color-rights h3 {
   color: var(--tier1-human);
 }
 
 .color-spiral {
   border-left-color: var(--tier5-planetary);
 }
 .color-spiral h3 {
   color: var(--tier5-planetary);
 }
 
 .color-ai {
   border-left-color: var(--tier4-ai);
 }
 .color-ai h3 {
   color: var(--tier4-ai);
 }
 
 .color-learning {
   border-left-color: var(--mos-secondary);
 }
 .color-learning h3 {
   color: var(--mos-secondary);
 }
 
 .color-ecosystem {
   border-left-color: var(--tier3-ecosystems);
 }
 .color-ecosystem h3 {
   color: var(--tier3-ecosystems);
 }
 
 .color-ethics {
   border-left-color: var(--mos-accent);
 }
 .color-ethics h3 {
   color: var(--mos-accent);
 }
 
 .color-dilemma {
   border-left-color: var(--tier2-animals);
 }
 .color-dilemma h3 {
   color: var(--tier2-animals);
 }
 
 .color-dialogue {
   border-left-color: var(--mos-spirit);
 }
 .color-dialogue h3 {
   color: var(--mos-spirit);
 }
 
 /* Tool Actions */
 .tool-actions {
   display: flex;
   flex-wrap: wrap;
   gap: 0.75rem;
 }
 
 /* Big Buttons */
 .big-btn {
   display: inline-flex;
   align-items: center;
   font-weight: 500;
   padding: 0.75rem 1.5rem;
   border-radius: 0.5rem;
   text-decoration: none;
   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
   transition: all 0.2s;
   color: white !important;
   border: none;
 }

 /* Primary button (main download) */
 .big-btn.primary {
   background-color: var(--mos-primary) !important;
 }
 
 .big-btn.primary:hover {
   background-color: var(--mos-dark) !important;
   transform: translateY(-1px);
 }

 /* PDF buttons - match card colors */
 .tool-card.color-essence .big-btn.pdf,
 .tool-card.color-skeptic .big-btn.pdf,
 .tool-card.color-rights .big-btn.pdf,
 .tool-card.color-spiral .big-btn.pdf,
 .tool-card.color-ai .big-btn.pdf,
 .tool-card.color-learning .big-btn.pdf,
 .tool-card.color-ecosystem .big-btn.pdf,
 .tool-card.color-ethics .big-btn.pdf,
 .tool-card.color-dilemma .big-btn.pdf,
 .tool-card.color-dialogue .big-btn.pdf {
   background-color: var(--mos-primary) !important;
 }

 /* Markdown buttons */
 .tool-card .big-btn.md {
   background-color: var(--mos-secondary) !important;
 }

 /* ODT buttons */
 .tool-card .big-btn.odt {
   background-color: var(--tier3-ecosystems) !important;
 }

 /* Image buttons */
 .tool-card .big-btn.img {
   background-color: var(--mos-accent) !important;
 }

 /* SVG buttons */
 .tool-card .big-btn.svg {
   background-color: var(--tier4-ai) !important;
 }
 
 .big-btn:hover {
   transform: translateY(-1px);
 }
 
 .icon {
   margin-left: 0.5rem;
 }
 
 /* Feedback Card */
 .feedback-card {
   background-color: rgba(139, 92, 246, 0.1);
   padding: 1.5rem;
   border-radius: 0.5rem;
   margin-top: 2rem;
   margin-bottom: 2rem;
   border-left: 4px solid var(--mos-secondary);
 }
 
 .feedback-card h3 {
   font-size: 1.25rem;
   font-weight: 600;
   margin-bottom: 0.75rem;
   color: var(--mos-secondary);
 }
 
 .feedback-card p {
   color: #4A5568;
   margin-bottom: 1rem;
 }
 
 .contact-link {
   color: var(--tier3-ecosystems);
   text-decoration: underline;
   font-weight: 500;
 }
 
 /* Back Link */
 .back-link-bottom {
   margin-bottom: 2rem;
 }
 
 .back-link-bottom a {
   display: inline-flex;
   align-items: center;
   color: var(--mos-primary);
   font-weight: 500;
   text-decoration: none;
 }
 
 /* Language Section */
 .language-section {
   border-top: 1px solid #E2E8F0;
   padding-top: 2rem;
   margin-top: 2rem;
 }
 
 .language-section h3 {
   font-size: 1.25rem;
   font-weight: 600;
   margin-bottom: 1rem;
   color: var(--mos-primary);
 }
 
 .language-buttons {
   display: flex;
   gap: 1rem;
 }
 
 .lang-button {
   padding: 0.5rem 1rem;
   border-radius: 0.375rem;
   border: 1px solid #E2E8F0;
   background-color: white;
   color: var(--mos-primary);
   font-weight: 500;
   text-decoration: none;
   cursor: pointer;
 }

 .lang-button.active {
   background-color: var(--mos-primary);
   color: white;
   border-color: var(--mos-primary);
 }
 
 /* Responsive styles */
 @media (min-width: 768px) {
   .tools-grid {
     grid-template-columns: repeat(2, 1fr);
   }
 }
 
 @media (max-width: 640px) {
   .card-content {
     flex-direction: column;
     align-items: flex-start;
     gap: 1rem;
   }
   
   .card-actions {
     width: 100%;
     justify-content: center;
   }
   
   .tool-actions {
     flex-direction: column;
     width: 100%;
   }
   
   .big-btn {
     width: 100%;
     justify-content: center;
   }
 }
</style>
