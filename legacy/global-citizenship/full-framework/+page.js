// src/routes/frameworks/global-citizenship/full-framework/+page.js
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';
import { browser } from '$app/environment';

export async function load({ depends }) {
  // Declare dependency on locale
  depends('app:locale');
  
  // Get the base locale from the store
  let currentLocale = get(locale);
  
  // Only check URL param in the browser, not during prerendering
  if (browser) {
    const url = new URL(window.location.href);
    const langParam = url.searchParams.get('lang');
    if (langParam) {
      currentLocale = langParam;
    }
  }
  
  let content;
  try {
    // Try to load the current locale version
    content = await import(`$lib/content/frameworks/${currentLocale}/global-citizenship.md`);
    console.log(`Successfully loaded ${currentLocale} content for global-citizenship`);
  } catch (e) {
    console.error(`Failed to load content for locale ${currentLocale}:`, e);
    // Fall back to English if translation isn't available
    content = await import(`$lib/content/frameworks/en/global-citizenship.md`);
    console.log('Falling back to English content');
  }
  
  return {
    component: content.default,
    usedLocale: currentLocale // This helps track which locale was actually used
  };
}

export const prerender = true;
