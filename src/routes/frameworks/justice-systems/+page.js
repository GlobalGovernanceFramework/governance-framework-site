// src/routes/frameworks/justice-systems/+page.js
import { locale, loadTranslations } from '$lib/i18n';
import { get } from 'svelte/store';
import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';

export const csr = true;

export async function load({ depends, url, params }) {
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);
  
  console.log('=== Justice Systems +page.js load function ===');
  console.log('URL pathname:', url.pathname);
  console.log('Current locale:', currentLocale);
  
  // IMPORTANT: url.hash is not available in load functions!
  // url.search is also not available during prerendering
  
  // Load framework translations for navigation and page-specific translations
  try {
    // The pathname should always be /frameworks/justice-systems
    // If it's not, we need to handle this case
    let cleanPath = url.pathname;
    
    console.log('Original pathname:', cleanPath);
    
    // Check if the pathname looks corrupted (contains section names instead of the base path)
    if (cleanPath.includes('/frameworks/') && 
        (cleanPath.includes('executive-summary') || 
         cleanPath.includes('at-a-glance') ||
         cleanPath.includes('introduction') ||
         cleanPath.includes('governance-structure') ||
         cleanPath.includes('legal-framework') ||
         cleanPath.includes('institutional-relationships') ||
         cleanPath.includes('implementation-mechanisms') ||
         cleanPath.includes('digital-justice-innovation') ||
         cleanPath.includes('monitoring-accountability') ||
         cleanPath.includes('stakeholder-engagement') ||
         cleanPath.includes('challenges-mitigation') ||
         cleanPath.includes('timeline-milestones') ||
         cleanPath.includes('conclusion') ||
         cleanPath.includes('appendices'))) {
      
      console.log('⚠️  Detected corrupted pathname, correcting to base framework path');
      cleanPath = '/frameworks/justice-systems';
    }
    
    console.log('Clean path for translations:', cleanPath);
    
    // Load translations for this specific page path
    console.log('About to call loadTranslations with:', currentLocale, cleanPath);
    const loadedTranslations = await loadTranslations(currentLocale, cleanPath);
    console.log('loadTranslations returned:', Object.keys(loadedTranslations || {}));
    console.log('Loaded translations for path:', cleanPath, 'with locale:', currentLocale);
  } catch (e) {
    console.error('Failed to load translations:', e);
    console.error('Error details:', e.stack);
  }
  
  // Safe check for print mode that works during prerendering
  // Only access url.search on the client side
  let isPrintMode = false;
  if (browser) {
    try {
      isPrintMode = url.search ? url.searchParams.get('print') === 'true' : false;
      console.log('Print mode detected:', isPrintMode);
    } catch (e) {
      console.warn('Could not access URL search params:', e);
      isPrintMode = false;
    }
  }

  // Define sections to load - justice systems framework sections in correct order
  const sections = [
    // Entry point and overview
    'index',
    'at-a-glance',
    'executive-summary-for-the-skeptic',
    
    // Core framework sections
    'introduction',
    'governance-structure',
    'legal-framework',
    'institutional-relationships',
    'implementation-mechanisms',
    'digital-justice-innovation',
    'monitoring-accountability',
    'stakeholder-engagement',
    'challenges-mitigation',
    'timeline-milestones',
    'conclusion',
    
    // Supplementary materials
    'appendices'
  ];
  
  // Track which sections fell back to English
  const sectionsUsingEnglishFallback = new Set();
  
  // Try to load modular content
  const content = {};
  let loadedSections = 0;
  
  console.log('Loading justice systems sections for locale:', currentLocale);
  
  // Try to load each section with proper error handling
  for (const section of sections) {
    try {
      // Try to load the current locale version first
      const modulePromise = import(`$lib/content/frameworks/${currentLocale}/implementation/justice-systems/${section}.md`);
      content[section] = await modulePromise;
      loadedSections++;
      console.log('Successfully loaded section:', section, 'in', currentLocale);
      
    } catch (primaryError) {
      console.warn(`Primary load failed for section ${section}:`, primaryError.message);
      
      // Fall back to English if translation isn't available
      try {
        const fallbackPromise = import(`$lib/content/frameworks/en/implementation/justice-systems/${section}.md`);
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
      message: 'Failed to load justice systems content',
      details: 'The main index section could not be loaded'
    });
  }
  
  return {
    sections: content,
    // Always use modular approach
    isModular: true,
    isPrintMode, // This will be false during prerendering, true/false on client
    sectionsUsingEnglishFallback: Array.from(sectionsUsingEnglishFallback),
    loadedSectionsCount: loadedSections,
    totalSectionsCount: sections.length,
    
    // Additional metadata for justice systems framework
    frameworkType: 'justice-systems',
    totalSections: sections.length,
    coreFrameworkSections: 9, // introduction through timeline-milestones
    foundationSections: 2, // at-a-glance and executive-summary
    resourceSections: 1, // appendices
    hasExecutiveSummary: true,
    
    // Justice Systems-specific metadata
    frameworkVersion: '1.0',
    isEnforcementFramework: true,
    implementationPhases: 5,
    specializedTribunals: 3, // Climate & Ecological, Digital Rights, Indigenous
    integrationFrameworks: ['peace-conflict-resolution', 'shield-protocol'],
    
    // GGF Integration metadata
    parentFrameworks: ['treaty-for-our-only-home', 'moral-operating-system'],
    siblingFrameworks: ['peace-and-conflict-resolution', 'shield-protocol'],
    dependentFrameworks: ['aubi', 'indigenous-governance', 'aurora-accord'],
    
    // Implementation readiness
    hasImplementationToolkit: true,
    hasPilotPrograms: true,
    stakeholderPathways: 5,
    
    // Debug information
    debug: {
      currentLocale,
      availableSections: Object.keys(content),
      fallbackSections: Array.from(sectionsUsingEnglishFallback),
      loadSuccess: loadedSections === sections.length,
      pathHandling: {
        originalPath: url.pathname,
        cleanedPath: '/frameworks/justice-systems'
      },
      // Only log search params on client side
      searchParams: browser ? (url.search || 'none') : 'prerendering'
    }
  };
}
