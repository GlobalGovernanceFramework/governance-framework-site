// src/routes/frameworks/climate-and-energy-governance/+page.js
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

  // Define sections to load - updated without number prefixes
  const sections = [
    // Entry guides
    'climate-energy-technical-guide',
    'climate-energy-stakeholder-guide',
    'climate-energy-action-guide',
    
    // Main framework sections (removed number prefixes)
    'index',
    'introduction',
    'guiding-principles',
    'governance-structure',
    'core-pillars',
    'policy-mechanisms',
    'stakeholder-engagement',
    'financing-the-framework',
    'implementation-roadmap',
    'metrics-for-success',
    'challenges-and-solutions',
    'implementation-tools',
    'conclusion',
    
    // Resources
    'appendix-a',
    'appendix-b'
  ];
  
  // Track which sections fell back to English
  const sectionsUsingEnglishFallback = new Set();
  
  // Try to load modular content
  const content = {};
  let loadedSections = 0;
  
  console.log('Loading climate & energy sections for locale:', currentLocale);
  
  // Try to load each section with proper error handling
  for (const section of sections) {
    try {
      // Try to load the current locale version first
      const modulePromise = import(`$lib/content/frameworks/${currentLocale}/implementation/climate-and-energy-governance/${section}.md`);
      content[section] = await modulePromise;
      loadedSections++;
      console.log('Successfully loaded section:', section, 'in', currentLocale);
    } catch (primaryError) {
      // Fall back to English if translation isn't available
      try {
        const fallbackPromise = import(`$lib/content/frameworks/en/implementation/climate-and-energy-governance/${section}.md`);
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
      message: 'Failed to load climate & energy framework content',
      details: 'The main index section could not be loaded'
    });
  }
  
  return {
    sections: content,
    // Always use modular approach - removed legacy fallback
    isModular: true,
    isPrintMode,
    sectionsUsingEnglishFallback: Array.from(sectionsUsingEnglishFallback),
    loadedSectionsCount: loadedSections,
    totalSectionsCount: sections.length,
    
    // Additional metadata for climate & energy framework
    frameworkType: 'climate-and-energy-governance',
    totalSections: sections.length,
    coreFrameworkSections: 12,
    hasSupplementaryMaterials: true,
    hasGuides: true,
    
    // Climate-specific metadata
    frameworkVersion: '2.0',
    isModularFramework: true,
    hasMultipleGuides: true,
    targetAudiences: ['policymakers', 'stakeholders', 'communities'],
    
    // Debug information
    debug: {
      currentLocale,
      availableSections: Object.keys(content),
      fallbackSections: Array.from(sectionsUsingEnglishFallback),
      loadSuccess: loadedSections === sections.length
    }
  };
}
