// src/routes/frameworks/disaster-risk-reduction/+page.js
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
  
  // Define sections to load - disaster risk reduction framework sections in correct order
  const sections = [
    // Entry point and overview
    'index',
    'technical-guide',
    'community-guide',
    'emergency-response-guide',
    
    // Core framework sections
    'introduction',
    'principles',
    'components',
    'approaches',
    'engagement',
    'barriers',
    'resources',
    'monitoring',
    'governance',
    'scalability',
    'conclusion',
    
    // Additional resources
    'annexes',
    'case-studies',
    'tools-templates'
  ];
  
  // Track which sections fell back to English
  const sectionsUsingEnglishFallback = new Set();
  
  // Try to load modular content
  const content = {};
  let loadedSections = 0;
  
  console.log('Loading disaster risk reduction framework sections for locale:', currentLocale);
  
  // Try to load each section with proper error handling
  for (const section of sections) {
    try {
      // Try to load the current locale version first
      const modulePromise = import(`$lib/content/frameworks/${currentLocale}/implementation/disaster-risk-reduction/${section}.md`);
      content[section] = await modulePromise;
      loadedSections++;
      console.log('Successfully loaded disaster risk reduction section:', section, 'in', currentLocale);
    } catch (primaryError) {
      // Fall back to English if translation isn't available
      try {
        const fallbackPromise = import(`$lib/content/frameworks/en/implementation/disaster-risk-reduction/${section}.md`);
        content[section] = await fallbackPromise;
        loadedSections++;
        
        // Track that this section is using English fallback
        if (currentLocale !== 'en') {
          sectionsUsingEnglishFallback.add(section);
        }
        console.log('Loaded disaster risk reduction section:', section, 'in English as fallback');
      } catch (fallbackError) {
        console.warn(`Could not load disaster risk reduction section ${section} in any language:`, fallbackError.message);
        
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
  
  console.log('Total disaster risk reduction sections loaded:', loadedSections, 'out of', sections.length);
  console.log('Loaded disaster risk reduction sections:', Object.keys(content));
  
  // Validate that we have at least the index section
  if (!content.index) {
    console.error('Critical: Could not load disaster risk reduction framework index section');
    throw error(500, {
      message: 'Failed to load disaster risk reduction framework content',
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
    
    // Additional metadata for disaster risk reduction framework
    frameworkType: 'disaster-risk-reduction',
    totalSections: sections.length,
    coreFrameworkSections: 10, // introduction through conclusion
    hasGuides: true,
    hasMultipleLevels: true,
    
    // Disaster risk reduction-specific metadata
    disasterVersion: '1.0',
    isComprehensiveFramework: true,
    focusArea: 'disaster-resilience-governance',
    implementationScope: 'multi-hazard-multi-scale',
    
    // Framework characteristics
    keyComponents: [
      'risk-assessment',
      'early-warning-systems',
      'community-preparedness',
      'infrastructure-resilience',
      'emergency-response',
      'recovery-reconstruction'
    ],
    
    // Guide characteristics
    guideTypes: ['technical', 'community', 'emergency-response'],
    hasStakeholderEngagement: true,
    hasMultiHazardApproach: true,
    
    // Debug information
    debug: {
      currentLocale,
      availableSections: Object.keys(content),
      fallbackSections: Array.from(sectionsUsingEnglishFallback),
      loadSuccess: loadedSections === sections.length,
      frameworkType: 'disaster-risk-reduction'
    }
  };
}
