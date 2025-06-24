// src/routes/get-involved/founding/+page.js
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export const csr = true;

export async function load({ depends, url, cookies }) {
  // Declare dependency on locale
  depends('app:locale');
  
  // Get locale from multiple sources with proper fallback chain
  let currentLocale = get(locale);
  
  // During SSR or if locale store isn't initialized, check other sources
  if (!currentLocale || currentLocale === '' || import.meta.env.SSR) {
    // Priority order: URL param > cookie > default
    const urlLocale = url.searchParams.get('lang');
    let cookieLocale = null;
    
    // Safely try to get cookie
    try {
      cookieLocale = cookies?.get('locale') || null;
    } catch (e) {
      console.log('Could not read locale cookie:', e.message);
      cookieLocale = null;
    }
    
    // For SSR, we can't access browser language, so use cookie or default
    currentLocale = urlLocale || cookieLocale || 'sv'; // Default to Swedish
    
    // Validate that we support this locale
    if (!['en', 'sv'].includes(currentLocale)) {
      currentLocale = 'sv'; // Default to Swedish instead of English
    }
    
    console.log('Load function detected locale:', currentLocale, 'from:', {
      urlLocale,
      cookieLocale,
      SSR: import.meta.env.SSR
    });
  }
  
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
