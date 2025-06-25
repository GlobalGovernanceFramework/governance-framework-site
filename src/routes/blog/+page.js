// src/routes/blog/+page.js

import { browser } from '$app/environment';
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export async function load({ depends, url }) {
  depends('app:locale');
  
  // Get current locale - prioritize URL param, then store, then default
  let currentLocale = 'en';
  
  if (url.searchParams.has('lang')) {
    currentLocale = url.searchParams.get('lang');
  } else if (browser) {
    currentLocale = get(locale) || 'en';
  }
  
  // Ensure we have a valid locale
  const validLocales = ['en', 'sv'];
  if (!validLocales.includes(currentLocale)) {
    currentLocale = 'en';
  }

  console.log('Blog page loading with locale:', currentLocale);

  // Dynamic import of all posts (this runs on both server and client)
  const rawPosts = import.meta.glob('/src/lib/posts/**/*.md', { eager: true });
  
  console.log('Total raw posts found:', Object.keys(rawPosts).length);
  console.log('Raw post paths:', Object.keys(rawPosts));

  const posts = Object.entries(rawPosts)
    .map(([path, post]) => {
      const parts = path.split('/');
      const filename = parts.pop();
      const langDir = parts.pop();

      const slug = filename.replace('.md', '');

      console.log(`Processing post: ${path}`);
      console.log(`  - Filename: ${filename}`);
      console.log(`  - Language: ${langDir}`);
      console.log(`  - Slug: ${slug}`);
      console.log(`  - Has metadata:`, !!post.metadata);
      if (post.metadata) {
        console.log(`  - Title: ${post.metadata.title}`);
        console.log(`  - Date: ${post.metadata.date}`);
        console.log(`  - Date type: ${typeof post.metadata.date}`);
      } else {
        console.log(`  - Metadata is undefined or null`);
      }

      return {
        meta: post.metadata || {},
        slug: slug,
        lang: langDir,
        path: path
      };
    })
    .filter(post => {
      // Filter out posts without valid metadata or date
      if (!post.meta || !post.meta.date) {
        console.warn(`Post ${post.slug} (${post.lang}) missing metadata or date, skipping`);
        return false;
      }
      
      const matches = post.lang === currentLocale;
      console.log(`Post ${post.slug} (${post.lang}) matches locale ${currentLocale}:`, matches);
      return matches;
    })
    .sort((a, b) => {
      // Additional safety check for sorting
      const dateA = a.meta?.date ? new Date(a.meta.date) : new Date(0);
      const dateB = b.meta?.date ? new Date(b.meta.date) : new Date(0);
      
      return dateB - dateA; // Sort newest first
    });

  console.log('Filtered posts:', posts);

  return {
    posts: posts,
    currentLocale: currentLocale
  };
}
