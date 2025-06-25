// src/lib/utils/navigation.js

import { get } from 'svelte/store';
import { locale } from '$lib/i18n';
import { base } from '$app/paths';

/**
 * Creates a locale-aware URL by adding the current locale as a query parameter
 * @param {string} path - The path to navigate to
 * @param {string} [customLocale] - Optional custom locale, defaults to current locale
 * @returns {string} - The path with locale parameter
 */
export function createLocaleUrl(path, customLocale = null) {
  const currentLocale = customLocale || get(locale) || 'en';
  const url = new URL(path, 'http://localhost'); // dummy base for URL parsing
  url.searchParams.set('lang', currentLocale);
  return `${base}${url.pathname}${url.search}`;
}

/**
 * Navigate to a path while preserving the current locale
 * @param {function} goto - SvelteKit's goto function
 * @param {string} path - The path to navigate to
 * @param {string} [customLocale] - Optional custom locale
 */
export function navigateWithLocale(goto, path, customLocale = null) {
  const localeUrl = createLocaleUrl(path, customLocale);
  goto(localeUrl);
}

/**
 * Get the current locale from URL or fallback to store
 * @param {URL} pageUrl - Current page URL
 * @returns {string} - Current locale
 */
export function getCurrentLocaleFromUrl(pageUrl) {
  return pageUrl.searchParams.get('lang') || get(locale) || 'en';
}
