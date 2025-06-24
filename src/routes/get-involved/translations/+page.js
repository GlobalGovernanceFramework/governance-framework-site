// src/routes/get-involved/translations/+page.js
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export const csr = true;

export async function load({ depends, url }) {

  depends('app:locale');

  const currentLocale = get(locale);


  const isPrintMode = import.meta.env.SSR ? false : url.searchParams.get('print') === 'true';


  let contentUsingEnglishFallback = false;


  let guideContent = null;
  
  try {
    guideContent = await import(`$lib/content/get-involved/translations/${currentLocale}/translation-guide.md`);
  } catch (e) {

    try {
      guideContent = await import(`$lib/content/get-involved/translations/en/translation-guide.md`);

      if (currentLocale !== 'en') {
        contentUsingEnglishFallback = true;
      }
    } catch (e2) {
      console.error("Failed to load translation guide content");
    }
  }
  
  return {
    guideContent: guideContent?.default,
    isPrintMode,
    contentUsingEnglishFallback,
    currentLocale
  };
}
