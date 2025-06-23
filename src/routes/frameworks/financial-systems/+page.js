// src/routes/frameworks/financial-systems/+page.js
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export const csr = true;

export async function load({ depends, url }) {
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);

  // Track which sections fell back to English
  let sectionsUsingEnglishFallback = new Set();
  
  // Safe check for print mode that works during prerendering
  const isPrintMode = import.meta.env.SSR ? false : url.searchParams.get('print') === 'true';
  
  // Define sections to load - include all financial-systems sections plus quick guides
  const sections = [
    'quick-guide',
    'quick-guide-medium', 
    'quick-guide-youth',
    'index',
    'introduction',
    'core-principles',
    'structural-components',
    'implementation-approaches',
    'metrics-evaluation',
    'supporting-sections',
    'appendices'
  ];
  
  // Define tools to load
  const tools = [
    'hearts-toolkit',
    'transition-guide',
    'validator-training',
    'love-ledger-guide',
    'hearts-technical-spec',
    'translation-layer',
    'proof-of-care'
  ];
  
  // Load modular content
  const content = {};
  const toolsContent = {};
  
  // Load each section
  for (const section of sections) {
    try {
      // Try to load the current locale version
      content[section] = await import(`$lib/content/frameworks/${currentLocale}/implementation/financial-systems/${section}.md`);
    } catch (e) {
      // Fall back to English if translation isn't available
      try {
        content[section] = await import(`$lib/content/frameworks/en/implementation/financial-systems/${section}.md`);
        // Track that this section is using English fallback
        if (currentLocale !== 'en') {
          sectionsUsingEnglishFallback.add(section);
        }
      } catch (e2) {
        console.log(`Could not load section ${section} in any language`);
      }
    }
  }
  
  // Load each tool
  for (const tool of tools) {
    try {
      // Try to load the current locale version
      toolsContent[tool] = await import(`$lib/content/frameworks/${currentLocale}/tools/financial-systems/${tool}.md`);
    } catch (e) {
      // Fall back to English if translation isn't available
      try {
        toolsContent[tool] = await import(`$lib/content/frameworks/en/tools/financial-systems/${tool}.md`);
        // Track that this tool is using English fallback
        if (currentLocale !== 'en') {
          sectionsUsingEnglishFallback.add(tool);
        }
      } catch (e2) {
        console.log(`Could not load tool ${tool} in any language`);
      }
    }
  }
  
  return {
    sections: content,
    tools: toolsContent,
    isModular: true,
    isPrintMode,
    sectionsUsingEnglishFallback: Array.from(sectionsUsingEnglishFallback)
  };
}
