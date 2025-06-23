// src/routes/frameworks/peace-and-conflict-resolution/+page.js
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
  
  // Define sections to load - peace framework sections in correct order
  const sections = [
    // Entry point and overview
    'index',
    'preamble',
    'quick-guide',
    
    // Core framework sections
    'core-principles',
    'local-implementation',
    'indigenous-integration',
    'regional-implementation',
    'global-implementation',
    
    // Technology integration
    'digital-infrastructure',
    'ai-ethics',
    'emerging-technologies',
    
    // Actors and transformation
    'non-state-actors',
    'military-transformation',
    'whistleblower-protection',
    
    // Prevention and justice
    'structural-prevention',
    'climate-resource',
    'transitional-justice',
    'mental-health',
    
    // Systems and culture
    'developmental-value-systems',
    'educational-cultural-infrastructure',
    
    // Integration and financing
    'peace-financing',
    'peace-business-integration',
    'media-information',
    
    // Implementation and measurement
    'context-specific-roadmaps',
    'implementation-timeline',
    'implementation-challenges',
    'measuring-success',
    'cross-domain-integration',
    'visualizations',
    
    // Guides and resources
    'technical-guide-policymakers',
    'community-peace-guide',
    'youth-peace-action-guide',
    'digital-peace-ethics-guide',
    
    // Conclusion
    'conclusion'
  ];
  
  // Track which sections fell back to English
  const sectionsUsingEnglishFallback = new Set();
  
  // Try to load modular content
  const content = {};
  let loadedSections = 0;
  
  console.log('Loading peace framework sections for locale:', currentLocale);
  
  // Try to load each section with proper error handling
  for (const section of sections) {
    try {
      // Try to load the current locale version first
      const modulePromise = import(`$lib/content/frameworks/${currentLocale}/implementation/peace-and-conflict-resolution/${section}.md`);
      content[section] = await modulePromise;
      loadedSections++;
      console.log('Successfully loaded peace section:', section, 'in', currentLocale);
    } catch (primaryError) {
      // Fall back to English if translation isn't available
      try {
        const fallbackPromise = import(`$lib/content/frameworks/en/implementation/peace-and-conflict-resolution/${section}.md`);
        content[section] = await fallbackPromise;
        loadedSections++;
        
        // Track that this section is using English fallback
        if (currentLocale !== 'en') {
          sectionsUsingEnglishFallback.add(section);
        }
        console.log('Loaded peace section:', section, 'in English as fallback');
      } catch (fallbackError) {
        console.warn(`Could not load peace section ${section} in any language:`, fallbackError.message);
        
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
  
  console.log('Total peace sections loaded:', loadedSections, 'out of', sections.length);
  console.log('Loaded peace sections:', Object.keys(content));
  
  // Validate that we have at least the index section
  if (!content.index) {
    console.error('Critical: Could not load peace framework index section');
    throw error(500, {
      message: 'Failed to load peace framework content',
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
    
    // Additional metadata for peace framework
    frameworkType: 'peace-and-conflict-resolution',
    totalSections: sections.length,
    coreFrameworkSections: 5, // core-principles through global-implementation
    hasImplementationGuides: true,
    hasTechnologyIntegration: true,
    hasSpecializedGuides: true,
    
    // Peace-specific metadata
    peaceVersion: '1.0',
    isComprehensiveFramework: true,
    implementationLevels: 3, // local, regional, global
    technologySections: 3, // digital-infrastructure, ai-ethics, emerging-technologies
    specializedGuides: 4, // technical, community, youth, digital ethics
    
    // Framework characteristics
    focusAreas: [
      'prevention',
      'transformation',
      'justice',
      'integration',
      'sustainability'
    ],
    
    // Debug information
    debug: {
      currentLocale,
      availableSections: Object.keys(content),
      fallbackSections: Array.from(sectionsUsingEnglishFallback),
      loadSuccess: loadedSections === sections.length,
      frameworkType: 'peace-and-conflict-resolution'
    }
  };
}
