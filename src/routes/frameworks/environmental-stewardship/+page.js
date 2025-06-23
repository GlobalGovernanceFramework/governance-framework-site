// src/routes/frameworks/environmental-stewardship/+page.js
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
  
  // Define sections to load - environmental stewardship framework sections (without numbering)
  const sections = [
    'index',
    'one-page-essence',
    'first-100-days-playbook',
    'introduction',
    'guiding-principles',
    'governance-structure',
    'core-pillars',
    'policy-mechanisms',
    'stakeholder-engagement',
    'financing-mechanisms',
    'implementation-roadmap',
    'metrics-for-success',
    'visualizations',
    'challenges-and-solutions',
    'implementation-tools',
    'reparations-protocol',
    'conclusion',
    'appendices'
  ];
  
  // Load modular content
  const content = {};
  
  // Load each section
  for (const section of sections) {
    try {
      // Try to load the current locale version
      content[section] = await import(`$lib/content/frameworks/${currentLocale}/implementation/environmental-stewardship/${section}.md`);
    } catch (e) {
      // Fall back to English if translation isn't available
      try {
        content[section] = await import(`$lib/content/frameworks/en/implementation/environmental-stewardship/${section}.md`);
        // Track that this section is using English fallback
        if (currentLocale !== 'en') {
          sectionsUsingEnglishFallback.add(section);
        }
      } catch (e2) {
        console.log(`Could not load section ${section} in any language`);
      }
    }
  }
  
  return {
    sections: content,
    isModular: true,
    isPrintMode,
    sectionsUsingEnglishFallback: Array.from(sectionsUsingEnglishFallback)
  };
}
