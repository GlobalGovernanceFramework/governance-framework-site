// src/routes/frameworks/meta-governance/+page.js
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';
import { browser } from '$app/environment';

export const csr = true;

export async function load({ depends, url }) {
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);

  // Track which sections fell back to English
  let sectionsUsingEnglishFallback = new Set();
  
  // Safe check for print mode that works during prerendering
  const isPrintMode = import.meta.env.SSR ? false : url.searchParams.get('print') === 'true';
  
  // CRITICAL FIX: Get hash from browser location during client-side navigation
  let initialSection = 'index'; // default
  
  if (browser) {
    // During client-side navigation, we can access window.location
    const hash = window.location.hash.substring(1);
    if (hash) {
      initialSection = hash;
    }
  }
  
  // Define sections to load
  const sections = [
    'quick-start',
    'index',
    'principles',
    'value-proposition',
    'structural',
    'implementation',
    'evaluation',
    'case-models',
    'future',
    'manifesto',
    'appendix',
    'related'
  ];
  
  const content = {};
  let isModular = false;
  
  // Try to load each modular section
  for (const section of sections) {
    try {
      // Try to load the current locale version
      content[section] = await import(`$lib/content/frameworks/${currentLocale}/implementation/meta-governance/${section}.md`);
      isModular = true;
    } catch (e) {
      // Fall back to English if the translation isn't available
      try {
        content[section] = await import(`$lib/content/frameworks/en/implementation/meta-governance/${section}.md`);
        isModular = true;
        // Track that this section is using the English fallback
        if (currentLocale !== 'en') {
          sectionsUsingEnglishFallback.add(section);
        }
      } catch (e2) {
        // Log an error if a section cannot be loaded in any language, but don't crash
        console.log(`Could not load section: ${section} in any language.`);
      }
    }
  }
  
  return {
    sections: content,
    isModular,
    isPrintMode,
    sectionsUsingEnglishFallback: Array.from(sectionsUsingEnglishFallback),
    // Pass the initial section to the component
    initialSection: initialSection
  };
}
