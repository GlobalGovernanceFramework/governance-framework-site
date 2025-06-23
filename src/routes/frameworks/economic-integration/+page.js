// src/routes/frameworks/economic-integration/+page.js
import { locale, loadTranslations } from '$lib/i18n';
import { get } from 'svelte/store';
import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';

export const csr = true;

export async function load({ depends, url, params }) {
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);
  
  // Load framework translations for navigation
  try {
    await loadTranslations(currentLocale, url.pathname);
  } catch (e) {
    console.warn('Failed to load translations:', e);
  }
  
  // Safe check for print mode that works during prerendering
  const isPrintMode = browser ? url.searchParams.get('print') === 'true' : false;
  
  // Define sections to load - economic integration framework sections in correct order
  const sections = [
    // Entry point and overview
    'index',
    'community-guide',
    'indigenous-guide', 
    'technical-guide',
    'youth-guide',
    
    // Core framework sections
    'introduction',
    'core-principles',
    'local-implementation',
    'regional-implementation',
    'global-implementation',
    'nested-support',
    'tech-commons',
    'transitional-pathways',
    'decision-protocols',
    'cross-domain',
    'adaptive-governance',
    'monitoring',
    'public-engagement',
    'timeline',
    'challenges-lessons',
    'visualizations',
    'conclusion',
    
    // Additional resources
    'digital-ethics'
  ];
  
  // Track which sections fell back to English
  const sectionsUsingEnglishFallback = new Set();
  
  // Try to load modular content
  const content = {};
  let loadedSections = 0;
  
  console.log('Loading economic integration framework sections for locale:', currentLocale);
  
  // Try to load each section with proper error handling
  for (const section of sections) {
    try {
      // Try to load the current locale version first
      const modulePromise = import(`$lib/content/frameworks/${currentLocale}/implementation/economic-integration/${section}.md`);
      content[section] = await modulePromise;
      loadedSections++;
      console.log('Successfully loaded economic integration section:', section, 'in', currentLocale);
    } catch (primaryError) {
      // Fall back to English if translation isn't available
      try {
        const fallbackPromise = import(`$lib/content/frameworks/en/implementation/economic-integration/${section}.md`);
        content[section] = await fallbackPromise;
        loadedSections++;
        
        // Track that this section is using English fallback
        if (currentLocale !== 'en') {
          sectionsUsingEnglishFallback.add(section);
        }
        console.log('Loaded economic integration section:', section, 'in English as fallback');
      } catch (fallbackError) {
        console.warn(`Could not load economic integration section ${section} in any language:`, fallbackError.message);
        
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
  
  console.log('Total economic integration sections loaded:', loadedSections, 'out of', sections.length);
  console.log('Loaded economic integration sections:', Object.keys(content));
  
  // Validate that we have at least the index section
  if (!content.index) {
    console.error('Critical: Could not load economic integration framework index section');
    throw error(500, {
      message: 'Failed to load economic integration framework content',
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
    
    // Additional metadata for economic integration framework
    frameworkType: 'economic-integration',
    totalSections: sections.length,
    coreFrameworkSections: 16, // introduction through conclusion
    hasGuides: true,
    hasMultipleLevels: true,
    
    // Economic integration-specific metadata
    economicVersion: '1.0',
    isComprehensiveFramework: true,
    focusArea: 'economic-transformation',
    implementationScope: 'multi-level-governance',
    
    // Framework characteristics
    keyComponents: [
      'local-economic-sovereignty',
      'regional-cooperation',
      'global-coordination',
      'technology-commons',
      'adaptive-governance',
      'inclusive-participation'
    ],
    
    // Guide characteristics
    guideTypes: ['community', 'indigenous', 'technical', 'youth'],
    hasStakeholderEngagement: true,
    hasRegionalImplementation: true,
    
    // Debug information
    debug: {
      currentLocale,
      availableSections: Object.keys(content),
      fallbackSections: Array.from(sectionsUsingEnglishFallback),
      loadSuccess: loadedSections === sections.length,
      frameworkType: 'economic-integration'
    }
  };
}
