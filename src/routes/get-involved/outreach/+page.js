// src/routes/get-involved/outreach/+page.js - Simplified version
export const csr = true;

export async function load({ depends, url }) {
  depends('app:locale');
  
  // Only load non-locale-specific data here
  const isPrintMode = import.meta.env.SSR ? false : url.searchParams.get('print') === 'true';
  
  return {
    isPrintMode
  };
}
