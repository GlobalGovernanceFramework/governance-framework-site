// src/routes/get-involved/founding/+page.js
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export const csr = true;

export async function load({ depends, url }) {
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);
  
  // Safe check for print mode that works during prerendering
  const isPrintMode = import.meta.env.SSR ? false : url.searchParams.get('print') === 'true';
  
  // Track which content fell back to English
  let contentUsingEnglishFallback = false;

  // Try to load founding guide content
  let guideContent = null;
  
  try {
    console.log(`Attempting to load: $lib/content/get-involved/founding/${currentLocale}/found-the-organization.md`);
    // Try to load the current locale version
    guideContent = await import(`$lib/content/get-involved/founding/${currentLocale}/found-the-organization.md`);
    console.log('Successfully loaded content for locale:', currentLocale);
  } catch (e) {
    console.log('Falling back to English, error was:', e.message);
    // Fall back to English if translation isn't available
    try {
      guideContent = await import(`$lib/content/get-involved/founding/en/found-the-organization.md`);
      console.log('Successfully loaded English fallback');
      // Track that this content is using English fallback
      if (currentLocale !== 'en') {
        contentUsingEnglishFallback = true;
      }
    } catch (e2) {
      console.error("Failed to load founding guide content:", e2);
    }
  }
  
  return {
    guideContent: guideContent?.default,
    isPrintMode,
    contentUsingEnglishFallback,
    currentLocale
  };
}
