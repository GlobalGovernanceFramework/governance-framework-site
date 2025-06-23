// src/routes/about/+page.js
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export const csr = true;

export async function load({ depends }) {
  // Declare dependency on locale to trigger reloads when locale changes
  depends('app:locale');
  
  const currentLocale = get(locale);
  
  console.log(`Loading about page for locale: ${currentLocale}`);
  
  // The translation loading will be handled by the layout's loadTranslations
  // based on the current route, but this ensures proper timing
  
  return {
    locale: currentLocale
  };
}
