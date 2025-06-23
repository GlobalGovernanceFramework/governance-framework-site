// src/routes/frameworks/food-systems-and-agriculture/+page.js
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
  
  // Define sections to load - food systems and agriculture framework sections in correct order
  const sections = [
    // Entry point and overview
    'index',
    'quick-guide',
    'quick-guide-medium',
    'quick-guide-youth',
    
    // Core framework sections
    'introduction',
    'definitions',
    'theory-of-change',
    'stakeholder-engagement',
    'core-principles',
    'strategic-objectives',
    'implementation-mechanisms',
    'systemic-leverage-points',
    'regional-customization',
    'risk-management',
    'timeline-milestones',
    'communication-advocacy',
    'visual-appendix',
    'conclusion',
    
    // Resources
    'glossary'
  ];
  
  // Track which sections fell back to English
  const sectionsUsingEnglishFallback = new Set();
  
  // Try to load modular content
  const content = {};
  let loadedSections = 0;
  
  console.log('Loading food systems and agriculture framework sections for locale:', currentLocale);
  
  // Try to load each section with proper error handling
  for (const section of sections) {
    try {
      // Try to load the current locale version first
      const modulePromise = import(`$lib/content/frameworks/${currentLocale}/implementation/food-systems/${section}.md`);
      content[section] = await modulePromise;
      loadedSections++;
      console.log('Successfully loaded food systems and agriculture section:', section, 'in', currentLocale);
    } catch (primaryError) {
      // Fall back to English if translation isn't available
      try {
        const fallbackPromise = import(`$lib/content/frameworks/en/implementation/food-systems/${section}.md`);
        content[section] = await fallbackPromise;
        loadedSections++;
        
        // Track that this section is using English fallback
        if (currentLocale !== 'en') {
          sectionsUsingEnglishFallback.add(section);
        }
        console.log('Loaded food systems and agriculture section:', section, 'in English as fallback');
      } catch (fallbackError) {
        console.warn(`Could not load food systems and agriculture section ${section} in any language:`, fallbackError.message);
        
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
  
  console.log('Total food systems and agriculture sections loaded:', loadedSections, 'out of', sections.length);
  console.log('Loaded food systems and agriculture sections:', Object.keys(content));
  
  // Validate that we have at least the index section
  if (!content.index) {
    console.error('Critical: Could not load food systems and agriculture framework index section');
    throw error(500, {
      message: 'Failed to load food systems and agriculture framework content',
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
    
    // Additional metadata for food systems and agriculture framework
    frameworkType: 'food-systems-and-agriculture',
    totalSections: sections.length,
    coreFrameworkSections: 15, // introduction through conclusion
    hasQuickGuides: true,
    hasMultipleLevels: true,
    
    // food systems and agriculture-specific metadata
    foodSystemsVersion: '1.0',
    isComprehensiveFramework: true,
    focusArea: 'regenerative-agriculture',
    implementationScope: 'global-food-systems',
    
    // Framework characteristics
    keyComponents: [
      'food-sovereignty',
      'regenerative-agriculture',
      'sustainable-nutrition',
      'climate-resilience',
      'social-equity',
      'biodiversity-protection'
    ],
    
    // Guide characteristics
    guideTypes: ['quick', 'medium', 'youth'],
    hasStakeholderEngagement: true,
    hasRegionalCustomization: true,
    
    // Debug information
    debug: {
      currentLocale,
      availableSections: Object.keys(content),
      fallbackSections: Array.from(sectionsUsingEnglishFallback),
      loadSuccess: loadedSections === sections.length,
      frameworkType: 'food-systems-and-agriculture'
    }
  };
}
