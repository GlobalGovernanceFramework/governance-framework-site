// src/routes/frameworks/migration-and-human-mobility/+page.js
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
  
  // Define sections to load - migration framework sections in correct order
  const sections = [
    // Entry point and overview
    'index',
    'migration-guide',
    'community-guide',
    'policy-guide',
    
    // Core framework sections
    'introduction',
    'global-context',
    'governance-principles',
    'rights-protection',
    'integration-pathways',
    'economic-frameworks',
    'social-cohesion',
    'climate-migration',
    'regional-cooperation',
    'implementation-mechanisms',
    'monitoring-evaluation',
    'stakeholder-engagement',
    'challenges-solutions',
    'timeline-milestones',
    'conclusion',
    
    // Additional resources
    'case-studies',
    'legal-frameworks',
    'best-practices'
  ];
  
  // Track which sections fell back to English
  const sectionsUsingEnglishFallback = new Set();
  
  // Try to load modular content
  const content = {};
  let loadedSections = 0;
  
  console.log('Loading migration framework sections for locale:', currentLocale);
  
  // Try to load each section with proper error handling
  for (const section of sections) {
    try {
      // Try to load the current locale version first
      const modulePromise = import(`$lib/content/frameworks/${currentLocale}/implementation/migration-and-human-mobility/${section}.md`);
      content[section] = await modulePromise;
      loadedSections++;
      console.log('Successfully loaded migration section:', section, 'in', currentLocale);
    } catch (primaryError) {
      // Fall back to English if translation isn't available
      try {
        const fallbackPromise = import(`$lib/content/frameworks/en/implementation/migration-and-human-mobility/${section}.md`);
        content[section] = await fallbackPromise;
        loadedSections++;
        
        // Track that this section is using English fallback
        if (currentLocale !== 'en') {
          sectionsUsingEnglishFallback.add(section);
        }
        console.log('Loaded migration section:', section, 'in English as fallback');
      } catch (fallbackError) {
        console.warn(`Could not load migration section ${section} in any language:`, fallbackError.message);
        
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
  
  console.log('Total migration sections loaded:', loadedSections, 'out of', sections.length);
  console.log('Loaded migration sections:', Object.keys(content));
  
  // Validate that we have at least the index section
  if (!content.index) {
    console.error('Critical: Could not load migration framework index section');
    throw error(500, {
      message: 'Failed to load migration framework content',
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
    
    // Additional metadata for migration framework
    frameworkType: 'migration-and-human-mobility',
    totalSections: sections.length,
    coreFrameworkSections: 12, // introduction through conclusion
    hasGuides: true,
    hasMultipleLevels: true,
    
    // Migration-specific metadata
    migrationVersion: '1.0',
    isComprehensiveFramework: true,
    focusArea: 'human-mobility-governance',
    implementationScope: 'global-regional-local',
    
    // Framework characteristics
    keyComponents: [
      'rights-based-approach',
      'climate-migration',
      'integration-pathways',
      'regional-cooperation',
      'social-cohesion',
      'economic-inclusion'
    ],
    
    // Guide characteristics
    guideTypes: ['technical', 'community', 'policy'],
    hasStakeholderEngagement: true,
    hasRegionalFocus: true,
    
    // Debug information
    debug: {
      currentLocale,
      availableSections: Object.keys(content),
      fallbackSections: Array.from(sectionsUsingEnglishFallback),
      loadSuccess: loadedSections === sections.length,
      frameworkType: 'migration-and-human-mobility'
    }
  };
}
