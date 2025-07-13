// src/lib/data/precomputedFrameworkDatabase.js
// Improved version with better caching and error handling

import { writable, derived } from 'svelte/store';

// Singleton pattern for database state
let frameworksStore = null;
let databaseStore = null;

// Pre-compute expensive operations at module load time
const getIcon = (() => {
  const iconMap = new Map([
    ['treaty', '🏛️'],
    ['climate', '🌍'],
    ['energy', '🌍'],
    ['peace', '🕊️'],
    ['technology', '⚡'],
    ['education', '📚'],
    ['digital', '💻'],
    ['culture', '🏛️'],
    ['space', '🚀'],
    ['consciousness', '🧠'],
    ['environment', '🌱'],
    ['urban', '🏙️'],
    ['ethics', '⚖️']
  ]);
  
  return (slug) => {
    if (!slug) return '📋';
    
    for (const [key, icon] of iconMap) {
      if (slug.includes(key)) return icon;
    }
    return '📋';
  };
})();

const tierColors = Object.freeze({
  0: '#8B5A3C',
  1: '#2D5F2D', 
  2: '#6B5CA5',
  3: '#DEB887',
  4: '#2F4F4F'
});

// Cached tier info
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

// Create stores for reactive framework data
function createFrameworkStores() {
  if (frameworksStore) return { frameworksStore, databaseStore };
  
  // Store for raw frameworks data
  frameworksStore = writable([]);
  
  // Derived store for computed database
  databaseStore = derived(
    frameworksStore,
    ($frameworks, set) => {
      const database = $frameworks.reduce((acc, framework) => {
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
      
      set(database);
    },
    {} // Initial value
  );
  
  return { frameworksStore, databaseStore };
}

// Lazy initialization with better error handling
async function initializeFrameworks() {
  const { frameworksStore: fStore } = createFrameworkStores();
  
  try {
    const frameworkNav = await import('$lib/stores/frameworkNav.js');
    const frameworks = frameworkNav.allFrameworks || [];
    
    fStore.set(frameworks);
    console.log('Framework database initialized with', frameworks.length, 'frameworks');
    
    return frameworks;
  } catch (error) {
    console.warn('Failed to load frameworkNav:', error);
    fStore.set([]);
    return [];
  }
}

// Main export - returns a promise to the database
export async function getPrecomputedFrameworkDatabase() {
  const { databaseStore: dbStore } = createFrameworkStores();
  
  // Initialize if not already done
  await initializeFrameworks();
  
  // Return current value from store
  return new Promise((resolve) => {
    const unsubscribe = dbStore.subscribe((database) => {
      unsubscribe();
      resolve(database);
    });
  });
}

// Optimized lookup with caching
const frameworkCache = new Map();

export async function getFrameworkDetails(frameworkId) {
  if (!frameworkId) return null;
  
  // Check cache first
  if (frameworkCache.has(frameworkId)) {
    return frameworkCache.get(frameworkId);
  }
  
  try {
    const database = await getPrecomputedFrameworkDatabase();
    
    // Direct lookup
    let framework = database[frameworkId];
    
    // Try slug conversion if direct lookup fails
    if (!framework) {
      const slug = frameworkId.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      framework = database[slug];
    }
    
    // Cache the result (even if null)
    frameworkCache.set(frameworkId, framework || null);
    
    return framework || null;
  } catch (error) {
    console.warn('Error getting framework details:', error);
    return null;
  }
}

export async function getFrameworksByTierOptimized(tier) {
  try {
    // Get from store instead of re-initializing
    const { frameworksStore: fStore } = createFrameworkStores();
    
    return new Promise((resolve) => {
      const unsubscribe = fStore.subscribe((frameworks) => {
        unsubscribe();
        resolve(frameworks.filter(f => f.tier === tier));
      });
    });
  } catch (error) {
    console.warn('Error getting frameworks by tier:', error);
    return [];
  }
}

// Store-based reactive API for components
export function useFrameworkDatabase() {
  const { frameworksStore, databaseStore } = createFrameworkStores();
  
  // Initialize if needed
  initializeFrameworks();
  
  return {
    frameworks: frameworksStore,
    database: databaseStore,
    loading: derived(databaseStore, db => Object.keys(db).length === 0)
  };
}

// Cleanup function for testing
export function resetFrameworkCache() {
  frameworkCache.clear();
  frameworksStore = null;
  databaseStore = null;
}
