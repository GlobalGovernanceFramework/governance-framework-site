// src/routes/frameworks/global-ethics-and-rights-of-beings/+page.js
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export const prerender = false;
export const csr = true;

export async function load({ depends, url, platform }) {
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);

  // Track which sections fell back to English
  let sectionsUsingEnglishFallback = new Set();
  
  // Safe handling of URL parameters during prerendering
  let isPrintMode = false;
  let accessibilityLevel = 'standard';
  
  // Only try to access searchParams when not prerendering
  if (typeof url.searchParams !== 'undefined') {
    isPrintMode = url.searchParams.get('print') === 'true';
    accessibilityLevel = url.searchParams.get('level') || 'standard';
  }
  
  // Define the available accessibility levels
  const accessibilityLevels = ['visual', 'essential', 'standard', 'technical'];
  
  // Validate the level
  let level = accessibilityLevels.includes(accessibilityLevel) ? accessibilityLevel : 'standard';
  
  // When loading sections, ensure print mode gets all content
  if (isPrintMode) {
    // You might want to force a specific level for print
    level = 'standard'; // or another level that has all content
  }  
  
  // Define sections to load - all framework sections
  const sections = [
    '0-preamble',
    '1-introduction',
    '2-foundational-values',
    '2.3-global-ethical-traditions',
    '2.5-rights-of-beings',
    '2.6-scientific-foundations',
    '3-commitments',
    '3.1-traditional-rights',
    '3.2-emerging-rights',
    '3.2.1-ai-consciousness',
    '3.2.1a-assessment-hub-network',
    '3.2.1b-scientific-standards',
    '3.2.2-ambiguous-entities',
    '3.2.3-measurement-standards',
    '3.2.4-recognition-pathways',
    '3.2.5-non-western-recognition',
    '3.3-conflict-resolution',
    '3.3.1-moon-wish-test',
    '4-governance-mechanisms',
    '4.1-transparency',
    '4.2-inclusive-decision-making',
    '4.3-conflict-resolution',
    '4.4-guardianship-councils',
    '4.4.1-enforcement-mechanisms',
    '4.4.2-non-compliance-strategy',
    '4.5-funding-model',
    '4.5.1-hub-sustainability',
    '4.5.2-resource-optimization',
    '4.6-governance-accountability',
    '4.7-entity-conflict-resolution',
    '4.8-interoperability',
    '4.9-decision-making',
    '4.10-coordination-mechanisms',
    '5-implementation',
    '5.1-quick-wins',
    '5.1.1-cost-analysis',
    '5.2-phased-rollout',
    '5.2.1-space-ethics',
    '5.3-education-accessibility',
    '5.3.1-resource-constraint',
    '5.3.2-cultural-accessibility',
    '5.3.3-knowledge-integration',
    '5.4-global-cooperation',
    '5.5-monitoring',
    '5.6-public-engagement',
    '5.7-stakeholder-strategy',
    '5.7.1-consensus-building',
    '5.7.2-resistant-stakeholder',
    '5.8-resistance-handling',
    '5.8.1-opposition-response',
    '5.8.2-learning-system',
    '5.9-benchmarks-metrics',
    '5.10-scenario-planning',
    '5.11-accessibility-matrix',
    '6-appendices',
    '6.1-emerging-rights-toolkit',
    '6.2-case-studies',
    '6.3-ethical-forecasting',
    '6.3.1-speculative-paradigm',
    '6.3.2-validation-protocols',
    '6.4-reporting-portal',
    '6.5-plain-language',
    '6.6-edge-case-protocols',
    '6.7-philosophy-of-rights',
    '6.8-spiral-aware-primer',
    '6.9-impact-assessment',
    '6.10-pioneer-pilots',
    '6.11-crisis-ethics',
    '6.12-technical-protocols'
  ];
  
  // Additional files that may be present
  const additionalFiles = [
    'index',
    'access-guide'
  ];
  
  // Guide files (directly in the implementation/global-ethics-and-rights-of-beings folder)
  const guideFiles = [
    'youth-guide',
    'educators-guide',
    'community-guide',
    'crisis-guide',
    'policy-guide',
    'indigenous-communities-guide',
    'religious-communities-guide',
    'business-guide' // Added this as it appears in your file structure
  ];
  
  // Combine all possible files
  const allFiles = [...sections, ...additionalFiles];
  
  // Track available sections for each accessibility level
  const availableSections = {};
  for (const l of accessibilityLevels) {
    availableSections[l] = [];
  }
  
  // Load modular content
  const content = {};
  let loadedSections = 0;
  
  // For each file, try to load it at each accessibility level
  for (const section of allFiles) {
    content[section] = {};
    
    for (const l of accessibilityLevels) {
      try {
        // Try to load the current locale version - FIXED PATH
        const module = await import(`$lib/content/frameworks/${currentLocale}/implementation/global-ethics-and-rights-of-beings/${l}/${section}.md`);
        content[section][l] = module;
        availableSections[l].push(section);
        loadedSections++;
      } catch (e) {
        // Fall back to English if translation isn't available - FIXED PATH
        try {
          const module = await import(`$lib/content/frameworks/en/implementation/global-ethics-and-rights-of-beings/${l}/${section}.md`);
          content[section][l] = module;
          availableSections[l].push(section);
          loadedSections++;
          // Track that this section is using English fallback
          if (currentLocale !== 'en') {
            sectionsUsingEnglishFallback.add(`${section}-${l}`);
          }
        } catch (e2) {
          // Section not available at this level, which is expected for many sections
        }
      }
    }
  }
  
  // Load guide files directly from the main folder (not in level-specific folders)
  for (const guide of guideFiles) {
    content[guide] = {};
    
    try {
      // Try to load the current locale version - FIXED PATH
      const module = await import(`$lib/content/frameworks/${currentLocale}/implementation/global-ethics-and-rights-of-beings/${guide}.md`);
      content[guide]['standard'] = module; // Store in 'standard' level for simplicity
      loadedSections++;
    } catch (e) {
      // Fall back to English if translation isn't available - FIXED PATH
      try {
        const module = await import(`$lib/content/frameworks/en/implementation/global-ethics-and-rights-of-beings/${guide}.md`);
        content[guide]['standard'] = module; // Store in 'standard' level for simplicity
        loadedSections++;
        // Track that this guide is using English fallback
        if (currentLocale !== 'en') {
          sectionsUsingEnglishFallback.add(`${guide}-standard`);
        }
      } catch (e2) {
        // Guide not available, which is okay
        console.log(`Guide not found: ${guide}`);
      }
    }
  }
  
  // Check if we have any content loaded
  const hasContent = loadedSections > 0;
  
  // If no modular content was loaded, this indicates a serious configuration issue
  if (!hasContent) {
    console.error("No modular content could be loaded for global ethics framework. Check file structure and paths.");
    throw new Error("Global Ethics framework content not available");
  }
  
  // Get access guide if available
  let accessGuide = null;
  if (content['access-guide'] && content['access-guide'][level]) {
    accessGuide = content['access-guide'][level];
  } else if (content['access-guide'] && content['access-guide']['standard']) {
    accessGuide = content['access-guide']['standard'];
  }
  
  return {
    sections: content,
    availableSections,
    hasContent,
    loadedSectionsCount: loadedSections,
    isPrintMode,
    currentLevel: level,
    accessibilityLevels,
    accessGuide,
    sectionsUsingEnglishFallback: Array.from(sectionsUsingEnglishFallback)
  };
}
