// src/routes/frameworks/global-citizenship/2-page-overview/+page.js
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export const csr = true;

export async function load({ depends }) {
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);
  
  let content;
  try {
    // Try to load the current locale version
    content = await import(`$lib/content/frameworks/${currentLocale}/global-citizenship-2-page-overview.md`);
  } catch (e) {
    // Fall back to English if translation isn't available
    content = await import(`$lib/content/frameworks/en/global-citizenship-2-page-overview.md`);
  }
  
  return {
    component: content.default
  };
}
