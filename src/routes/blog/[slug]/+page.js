// src/routes/blog/[slug]/+page.js

import { error } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export const prerender = false;

export async function load({ params, depends, url }) {
  depends('app:locale');
  
  // Get current locale - handle prerendering safely
  let currentLocale = 'en';
  
  // Only access searchParams if not prerendering
  if (url && url.searchParams) {
    try {
      if (url.searchParams.has('lang')) {
        currentLocale = url.searchParams.get('lang');
      } else if (browser) {
        currentLocale = get(locale) || 'en';
      }
    } catch (e) {
      // During prerendering, searchParams might not be available
      // Fall back to default locale or store value
      if (browser) {
        currentLocale = get(locale) || 'en';
      }
    }
  } else if (browser) {
    currentLocale = get(locale) || 'en';
  }
  
  // Ensure we have a valid locale
  const validLocales = ['en', 'sv'];
  if (!validLocales.includes(currentLocale)) {
    currentLocale = 'en';
  }

  console.log('Loading blog post with locale:', currentLocale, 'slug:', params.slug);

  try {
    // Dynamically import the specific Markdown file based on the locale and slug
    const postModule = await import(`../../../lib/posts/${currentLocale}/${params.slug}.md`);

    // Create the current URL for meta tags
    const currentUrl = browser ? 
      window.location.href : 
      `${url.origin}${url.pathname}${url.search}`;

    return {
      post: {
        meta: postModule.metadata,
        slug: params.slug,
        locale: currentLocale
      },
      currentUrl: currentUrl,
      currentLocale: currentLocale
    };
  } catch (e) {
    console.error('Error loading post:', e);
    console.error('Attempted path:', `../../../lib/posts/${currentLocale}/${params.slug}.md`);
    throw error(404, `Post not found or not available in ${currentLocale}`);
  }
}
