// src/routes/frameworks/nested-economies/+page.js
import { locale, loadTranslations } from '$lib/i18n';
import { get } from 'svelte/store';
import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';

export const csr = true;

export async function load({ depends, url, params }) {
  console.log('💱 Nested Economies +page.js - URL pathname:', url.pathname);
  console.log('💱 Nested Economies +page.js - Full URL:', url.href);
  
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);
  console.log('💱 Current locale:', currentLocale);
  
  
  // Load framework translations for navigation
  try {
    console.log('💱 About to call loadTranslations with:', currentLocale, url.pathname);
    await loadTranslations(currentLocale, url.pathname);
    console.log('💱 loadTranslations completed');
  } catch (e) {
    console.warn('💱 Failed to load translations:', e);
  }
  
  // Safe check for print mode that works during prerendering
  const isPrintMode = browser ? url.searchParams.get('print') === 'true' : false;
  
  // Define sections to load - Nested Economies framework sections in correct order
  const sections = [
    // Entry point and overview
    'index',
    'at-a-glance',
    'executive-summary-for-the-skeptic',
    'preamble',
    
    // Core framework sections
    'introduction',
    'core-principles',
    'implementation-strategies',
    'resource-disparities',
    'governance-integration',
    'timeline',
    'monitoring',
    'engagement',
    
    // Conclusion and appendices
    'conclusion',
    'appendices'
  ];
  
  // Track which sections fell back to English
  const sectionsUsingEnglishFallback = new Set();
  
  // Try to load modular content
  const content = {};
  let loadedSections = 0;
  
  console.log('Loading Nested Economies sections for locale:', currentLocale);
  
  // Try to load each section with proper error handling
  for (const section of sections) {
    try {
      // Try to load the current locale version first
      const modulePromise = import(`$lib/content/frameworks/${currentLocale}/implementation/nested-economies/${section}.md`);
      content[section] = await modulePromise;
      loadedSections++;
      console.log('Successfully loaded section:', section, 'in', currentLocale);
    } catch (primaryError) {
      // Fall back to English if translation isn't available
      try {
        const fallbackPromise = import(`$lib/content/frameworks/en/implementation/nested-economies/${section}.md`);
        content[section] = await fallbackPromise;
        loadedSections++;
        
        // Track that this section is using English fallback
        if (currentLocale !== 'en') {
          sectionsUsingEnglishFallback.add(section);
        }
        console.log('Loaded section:', section, 'in English as fallback');
      } catch (fallbackError) {
        console.warn(`Could not load section ${section} in any language:`, fallbackError.message);
        
        // Create a safe placeholder for missing sections
        content[section] = {
          default: function MissingSection() {
            return {
              render: () => ({
                html: `<div class="missing-section-content">
                  <h2>Section "${section}" not found</h2>
                  <p>This content is still being developed.</p>
                </div>`,
                css: { code: '', map: null }
              })
            };
          }
        };
      }
    }
  }
  
  console.log('Total sections loaded:', loadedSections, 'out of', sections.length);
  console.log('Loaded sections:', Object.keys(content));
  
  // Validate that we have at least the index section
  if (!content.index) {
    console.error('Critical: Could not load index section');
    throw error(500, {
      message: 'Failed to load Nested Economies content',
      details: 'The main index section could not be loaded'
    });
  }
  
  return {
    sections: content,
    // Always use modular approach
    isModular: true,
    isPrintMode,
    sectionsUsingEnglishFallback: Array.from(sectionsUsingEnglishFallback),
    loadedSectionsCount: loadedSections,
    totalSectionsCount: sections.length,
    
    // Additional metadata for Nested Economies framework
    frameworkType: 'nested-economies',
    totalSections: sections.length,
    coreFrameworkSections: 8,
    hasSupplementaryMaterials: true,
    hasExecutiveSummary: true,
    
    // Nested Economies-specific metadata
    frameworkVersion: '1.0',
    isEconomicIntegrationFramework: true,
    tier: 1, // Foundational Economic Framework
    implementationPhases: 3,
    economicLevels: 3, // Local, Regional, Global
    corePrinciples: 4,
    
    // Economic integration metadata
    heartsCurrency: true,
    leavesCurrency: true,
    loveLedger: true,
    aubiIntegration: true,
    communityWeavers: true,
    socialResilienceCouncil: true,
    lmciIndex: true,
    
    // Key mechanisms metadata
    rightRelationship: true,
    resourceJustice: true,
    culturalSovereignty: true,
    bioregionalCoordination: true,
    interCurrencyTranslation: true,
    proofOfCare: true,
    
    // Integration metadata
    treatyIntegration: 'treaty-for-our-only-home',
    aubiFramework: true,
    financialSystemsFramework: true,
    indigenousFrameworkAlignment: true,
    metaGovernanceIntegration: true,
    planetaryHealthAlignment: true,
    laborGovernanceIntegration: true,
    crossFrameworkSynergies: 7,
    
    // Implementation metadata
    foundationPhase: '3-years',
    regionalPhase: '2-years',
    globalPhase: '5-years',
    communityPilots: 10,
    bioregionalNetworks: 5,
    targetCommunities: 100,
    
    // Economic sovereignty metadata
    communityControl: true,
    cooperativeEnterprise: true,
    participatoryBudgeting: true,
    economicDemocracy: true,
    wealthRedistribution: true,
    antiSpeculation: true,
    
    // Cultural integration metadata
    indigenousLeadership: true,
    traditionalKnowledge: true,
    culturalProtocols: true,
    languageSovereignty: true,
    ceremonialgGovernance: true,
    fpic2Protocol: true,
    
    // Ecological economics metadata
    regenerativeGrowth: true,
    careEconomy: true,
    ecologicalRestoration: true,
    climateAction: true,
    carbonSequestration: true,
    biodiversityProtection: true,
    
    // Debug information
    debug: {
      currentLocale,
      availableSections: Object.keys(content),
      fallbackSections: Array.from(sectionsUsingEnglishFallback),
      loadSuccess: loadedSections === sections.length,
      frameworkTier: 'foundational-economic',
      economicsOfRightRelationship: true,
      nestedSovereignty: true,
      globalCooperationLocalAutonomy: true
    }
  };
}
