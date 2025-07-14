// src/routes/get-involved/onboarding/+page.js
import { locale, loadTranslations } from '$lib/i18n';
import { get } from 'svelte/store';
import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';

export const csr = true;

export async function load({ depends, url, params }) {
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);
  
  console.log('=== Onboarding +page.js load function ===');
  console.log('URL pathname:', url.pathname);
  console.log('Current locale:', currentLocale);
  
  // Load translations for this specific page path
  try {
    // Clean path handling similar to treaty page
    let cleanPath = url.pathname;
    
    console.log('Original pathname:', cleanPath);
    
    // Check if the pathname looks corrupted (contains section names instead of the base path)
    if (cleanPath.includes('/get-involved/onboarding/') && 
        (cleanPath.includes('first-love-ledger') || 
         cleanPath.includes('git-and-documentation-flow') ||
         cleanPath.includes('time-tracking') ||
         cleanPath.includes('working-with-ai') ||
         cleanPath.includes('overview') ||
         cleanPath.includes('statutes') ||
         cleanPath.includes('work-system-guide') ||
         cleanPath.includes('operating-system') ||
         cleanPath.includes('strategic-goals'))) {
      
      console.log('⚠️  Detected corrupted pathname, correcting to base onboarding path');
      cleanPath = '/get-involved/onboarding';
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

  // Define sections to load - organized by category
  const foundationalSections = [
    'first-love-ledger',
    'git-and-documentation-flow', 
    'time-tracking',
    'working-with-ai'
  ];

  const welcomeKitSections = [
    'overview',
    'statutes',
    'work-system-guide',
    'operating-system',
    'strategic-goals'
  ];

  const allSections = [...foundationalSections, ...welcomeKitSections];
  
  // Track which sections fell back to English
  const sectionsUsingEnglishFallback = new Set();
  
  // Try to load modular content
  const content = {};
  let loadedSections = 0;
  
  console.log('Loading onboarding sections for locale:', currentLocale);
  
  // Load foundational sections
  for (const section of foundationalSections) {
    try {
      const modulePromise = import(`$lib/content/get-involved/onboarding/${currentLocale}/foundational/${section}.md`);
      content[section] = await modulePromise;
      loadedSections++;
      console.log('Successfully loaded foundational section:', section, 'in', currentLocale);
      
    } catch (primaryError) {
      console.warn(`Primary load failed for foundational section ${section}:`, primaryError.message);
      
      // Fall back to English if translation isn't available
      try {
        const fallbackPromise = import(`$lib/content/get-involved/onboarding/en/foundational/${section}.md`);
        content[section] = await fallbackPromise;
        loadedSections++;
        
        if (currentLocale !== 'en') {
          sectionsUsingEnglishFallback.add(section);
        }
        console.log('Loaded foundational section:', section, 'in English as fallback');
        
      } catch (fallbackError) {
        console.warn(`Could not load foundational section ${section} in any language:`, fallbackError.message);
        
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

  // Load welcome kit sections
  for (const section of welcomeKitSections) {
    try {
      const modulePromise = import(`$lib/content/get-involved/onboarding/${currentLocale}/welcome-kit/${section}.md`);
      content[section] = await modulePromise;
      loadedSections++;
      console.log('Successfully loaded welcome-kit section:', section, 'in', currentLocale);
      
    } catch (primaryError) {
      console.warn(`Primary load failed for welcome-kit section ${section}:`, primaryError.message);
      
      // Fall back to English if translation isn't available
      try {
        const fallbackPromise = import(`$lib/content/get-involved/onboarding/en/welcome-kit/${section}.md`);
        content[section] = await fallbackPromise;
        loadedSections++;
        
        if (currentLocale !== 'en') {
          sectionsUsingEnglishFallback.add(section);
        }
        console.log('Loaded welcome-kit section:', section, 'in English as fallback');
        
      } catch (fallbackError) {
        console.warn(`Could not load welcome-kit section ${section} in any language:`, fallbackError.message);
        
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
  
  console.log('Total sections loaded:', loadedSections, 'out of', allSections.length);
  console.log('Loaded sections:', Object.keys(content));
  
  // Validate that we have at least some content
  if (Object.keys(content).length === 0) {
    console.error('Critical: Could not load any onboarding sections');
    throw error(500, {
      message: 'Failed to load onboarding content',
      details: 'No sections could be loaded'
    });
  }
  
  return {
    sections: content,
    foundationalSections,
    welcomeKitSections,
    allSections,
    isModular: true,
    isPrintMode,
    sectionsUsingEnglishFallback: Array.from(sectionsUsingEnglishFallback),
    loadedSectionsCount: loadedSections,
    totalSectionsCount: allSections.length,
    
    // Additional metadata for onboarding
    pageType: 'onboarding',
    hasFoundational: foundationalSections.length > 0,
    hasWelcomeKit: welcomeKitSections.length > 0,
    
    // Debug information
    debug: {
      currentLocale,
      availableSections: Object.keys(content),
      fallbackSections: Array.from(sectionsUsingEnglishFallback),
      loadSuccess: loadedSections === allSections.length,
      pathHandling: {
        originalPath: url.pathname,
        cleanedPath: '/get-involved/onboarding'
      },
      // Only log search params on client side
      searchParams: browser ? (url.search || 'none') : 'prerendering'
    }
  };
}
