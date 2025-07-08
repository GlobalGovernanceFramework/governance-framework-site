// src/lib/data/precomputedFrameworkDatabase.js
// Pre-compute framework database to avoid runtime delays

import { allFrameworks } from '$lib/stores/frameworkNav.js';

// Pre-compute expensive operations at module load time
function getIcon(slug) {
  if (slug.includes('treaty')) return '🏛️';
  if (slug.includes('climate') || slug.includes('energy')) return '🌍';
  if (slug.includes('peace')) return '🕊️';
  if (slug.includes('technology')) return '⚡';
  if (slug.includes('education')) return '📚';
  if (slug.includes('digital')) return '💻';
  if (slug.includes('culture')) return '🏛️';
  if (slug.includes('space')) return '🚀';
  if (slug.includes('consciousness')) return '🧠';
  if (slug.includes('environment')) return '🌱';
  if (slug.includes('urban')) return '🏙️';
  if (slug.includes('ethics')) return '⚖️';
  return '📋';
}

const tierColors = {
  0: '#8B5A3C',
  1: '#2D5F2D', 
  2: '#6B5CA5',
  3: '#DEB887',
  4: '#2F4F4F'
};

// Pre-compute the entire framework database at module initialization
export const PRECOMPUTED_FRAMEWORK_DATABASE = allFrameworks.reduce((acc, framework) => {
  const key = framework.slug;
  
  acc[key] = {
    name: framework.titleKey,
    description: `findYourPlace.frameworks.database.${framework.slug.replace(/-/g, '')}.description`,
    tier: framework.tier,
    color: tierColors[framework.tier] || '#6B7280',
    route: framework.path,
    importance: framework.tier === 0 ? 'critical' : 'normal',
    icon: getIcon(framework.slug),
    status: framework.status,
    version: framework.version,
    slug: framework.slug
  };
  
  return acc;
}, {});

// Pre-compute framework lookups
export const FRAMEWORK_BY_SLUG = new Map();
export const FRAMEWORKS_BY_TIER = new Map();

allFrameworks.forEach(framework => {
  FRAMEWORK_BY_SLUG.set(framework.slug, framework);
  
  if (!FRAMEWORKS_BY_TIER.has(framework.tier)) {
    FRAMEWORKS_BY_TIER.set(framework.tier, []);
  }
  FRAMEWORKS_BY_TIER.get(framework.tier).push(framework);
});

// Optimized lookup functions
export function getFrameworkDetails(frameworkId) {
  // Direct lookup from pre-computed database
  if (PRECOMPUTED_FRAMEWORK_DATABASE[frameworkId]) {
    return PRECOMPUTED_FRAMEWORK_DATABASE[frameworkId];
  }
  
  // Try slug conversion
  const slug = frameworkId.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  if (PRECOMPUTED_FRAMEWORK_DATABASE[slug]) {
    return PRECOMPUTED_FRAMEWORK_DATABASE[slug];
  }
  
  // Try direct framework lookup
  const framework = FRAMEWORK_BY_SLUG.get(frameworkId);
  if (framework) {
    return PRECOMPUTED_FRAMEWORK_DATABASE[framework.slug];
  }
  
  return null;
}

export function getFrameworksByTierOptimized(tier) {
  return FRAMEWORKS_BY_TIER.get(tier) || [];
}

// Pre-compute tier info
export const TIER_INFO_CACHE = new Map([
  [0, { class: 'tier-0', priority: 'critical', label: 'framework.tier.0.title' }],
  [1, { class: 'tier-1', priority: 'urgent', label: 'framework.tier.1.title' }],
  [2, { class: 'tier-2', priority: 'important', label: 'framework.tier.2.title' }],
  [3, { class: 'tier-3', priority: 'strategic', label: 'framework.tier.3.title' }],
  [4, { class: 'tier-4', priority: 'visionary', label: 'framework.tier.4.title' }]
]);

export function getTierInfoOptimized(tier) {
  return TIER_INFO_CACHE.get(tier) || {
    label: 'findYourPlace.tiers.developmental',
    class: 'tier-developmental',
    priority: 'strategic'
  };
}

// Initialize framework computations immediately
console.log('Framework database pre-computed:', Object.keys(PRECOMPUTED_FRAMEWORK_DATABASE).length, 'frameworks');
console.log('Framework lookups initialized:', FRAMEWORK_BY_SLUG.size, 'entries');
console.log('Tier mappings initialized:', FRAMEWORKS_BY_TIER.size, 'tiers');
