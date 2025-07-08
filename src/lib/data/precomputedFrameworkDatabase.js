// src/lib/data/precomputedFrameworkDatabase.js
// Simplified version without top-level await

// Import with try-catch to handle missing dependencies
let allFrameworks = [];
let isInitialized = false;

// Pre-compute expensive operations at module load time
function getIcon(slug) {
  if (!slug) return '📋';
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

// Lazy initialization function
async function initializeFrameworks() {
  if (isInitialized) return allFrameworks;
  
  try {
    const frameworkNav = await import('$lib/stores/frameworkNav.js');
    allFrameworks = frameworkNav.allFrameworks || [];
    isInitialized = true;
    console.log('Framework database initialized with', allFrameworks.length, 'frameworks');
  } catch (error) {
    console.warn('Failed to load frameworkNav, using empty frameworks array:', error);
    allFrameworks = [];
    isInitialized = true;
  }
  
  return allFrameworks;
}

// Export computed database as a function
export async function getPrecomputedFrameworkDatabase() {
  const frameworks = await initializeFrameworks();
  
  return frameworks.reduce((acc, framework) => {
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
}

// Sync version that returns empty for build-time
export const PRECOMPUTED_FRAMEWORK_DATABASE = {};
export const FRAMEWORK_BY_SLUG = new Map();
export const FRAMEWORKS_BY_TIER = new Map();

// Async lookup functions
export async function getFrameworkDetails(frameworkId) {
  if (!frameworkId) return null;
  
  try {
    const database = await getPrecomputedFrameworkDatabase();
    
    // Direct lookup from pre-computed database
    if (database[frameworkId]) {
      return database[frameworkId];
    }
    
    // Try slug conversion
    const slug = frameworkId.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    if (database[slug]) {
      return database[slug];
    }
    
    return null;
  } catch (error) {
    console.warn('Error getting framework details:', error);
    return null;
  }
}

export async function getFrameworksByTierOptimized(tier) {
  try {
    const frameworks = await initializeFrameworks();
    return frameworks.filter(f => f.tier === tier);
  } catch (error) {
    console.warn('Error getting frameworks by tier:', error);
    return [];
  }
}

// Pre-compute tier info - this can stay synchronous
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
