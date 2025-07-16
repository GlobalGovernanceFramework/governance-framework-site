// src/routes/frameworks/docs/implementation/regenerative-journeys/+page.js
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

export const csr = true;

export async function load({ depends }) {
  // Declare dependency on locale
  depends('app:locale');
  
  const currentLocale = get(locale);
  
  return {
    // Any additional data for the regenerative journeys framework
    meta: {
      title: 'The Regenerative Journeys Framework - Coming Soon',
      description: 'Revolutionary framework transforming tourism from extractive practice to sacred exchange through Indigenous sovereignty and regenerative design.',
      keywords: 'regenerative tourism, Indigenous sovereignty, bioregional governance, sacred travel, climate migration, decolonized tourism'
    }
  };
}
