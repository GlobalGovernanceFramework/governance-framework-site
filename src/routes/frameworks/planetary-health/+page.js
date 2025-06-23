// src/routes/frameworks/planetary-health/+page.js
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
  
  // Define sections to load - planetary health framework sections in correct order
  const sections = [
    // Entry point and overview
    'index',
    'planetary-health-accord-lite',
    
    // Core framework sections (00-17)
    'manifesto',
    'governance-structure',
    'technology-data-infrastructure',
    'financing-mechanisms',
    'medical-innovation-access',
    'pandemic-climate-preparedness',
    'community-centered-healthcare',
    'transparency-anti-corruption',
    'health-literacy',
    'borderless-health-rights',
    'ethical-technology-governance',
    'implementation-roadmap',
    'health-conflict-zones',
    'global-knowledge-commons',
    'visual-architecture-map',
    'cross-cutting-mechanisms',
    'spiritual-framing',
    'conclusion',
    
    // Supplementary materials
    'childrens-health-rights-comic'
  ];
  
  // Track which sections fell back to English
  const sectionsUsingEnglishFallback = new Set();
  
  // Try to load modular content
  const content = {};
  let loadedSections = 0;
  
  console.log('Loading planetary health framework sections for locale:', currentLocale);
  
  // Try to load each section with proper error handling
  for (const section of sections) {
    try {
      // Try to load the current locale version first
      const modulePromise = import(`$lib/content/frameworks/${currentLocale}/implementation/planetary-health/${section}.md`);
      content[section] = await modulePromise;
      loadedSections++;
      console.log('Successfully loaded planetary health section:', section, 'in', currentLocale);
    } catch (primaryError) {
      // Fall back to English if translation isn't available
      try {
        const fallbackPromise = import(`$lib/content/frameworks/en/implementation/planetary-health/${section}.md`);
        content[section] = await fallbackPromise;
        loadedSections++;
        
        // Track that this section is using English fallback
        if (currentLocale !== 'en') {
          sectionsUsingEnglishFallback.add(section);
        }
        console.log('Loaded planetary health section:', section, 'in English as fallback');
      } catch (fallbackError) {
        console.warn(`Could not load planetary health section ${section} in any language:`, fallbackError.message);
        
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
  
  console.log('Total planetary health sections loaded:', loadedSections, 'out of', sections.length);
  console.log('Loaded planetary health sections:', Object.keys(content));
  
  // Validate that we have at least the index section
  if (!content.index) {
    console.error('Critical: Could not load planetary health framework index section');
    throw error(500, {
      message: 'Failed to load planetary health framework content',
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
    
    // Additional metadata for planetary health framework
    frameworkType: 'planetary-health',
    totalSections: sections.length,
    coreFrameworkSections: 18, // manifesto through conclusion
    hasSupplementaryMaterials: true,
    hasLiteVersion: true,
    
    // Planetary health-specific metadata
    planetaryHealthVersion: '1.0',
    isComprehensiveFramework: true,
    focusArea: 'global-health-equity',
    implementationScope: 'planetary',
    
    // Framework characteristics
    keyComponents: [
      'health-equity',
      'climate-adaptation',
      'pandemic-preparedness',
      'community-centered-care',
      'technology-governance',
      'borderless-rights'
    ],
    
    // Accord characteristics
    accordType: 'planetary-health-governance',
    hasLiteAccord: true,
    supplementaryContent: ['childrens-health-rights-comic'],
    
    // Debug information
    debug: {
      currentLocale,
      availableSections: Object.keys(content),
      fallbackSections: Array.from(sectionsUsingEnglishFallback),
      loadSuccess: loadedSections === sections.length,
      frameworkType: 'planetary-health'
    }
  };
}
