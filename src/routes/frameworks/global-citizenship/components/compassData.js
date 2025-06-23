// src/routes/frameworks/global-citizenship/components/compassData.js
import { allFrameworks, getFrameworkBySlug, getFrameworksByTier } from '$lib/stores/frameworkNav.js';

// Re-export framework status and tiers from the centralized source
export const frameworkStatus = {
  READY: 'ready',
  IN_REVIEW: 'review', // Updated to match frameworkNav.js
  PLANNED: 'planned',
  COMING_SOON: 'coming-soon'
};

export const tiers = {
  TIER_0: 0,
  TIER_1: 1, 
  TIER_2: 2,
  TIER_3: 3,
  TIER_4: 4
};

// Create a lookup object for frameworks using the centralized data
export const frameworks = allFrameworks.reduce((acc, framework) => {
  // Convert slug to camelCase ID for backward compatibility
  const id = framework.slug.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  
  acc[id] = {
    id,
    slug: framework.slug,
    tier: framework.tier,
    status: framework.status,
    path: framework.path,
    priority: framework.tier + 1, // Priority based on tier
    titleKey: framework.titleKey,
    version: framework.version
  };
  
  return acc;
}, {});

// Helper function to convert camelCase back to slug
function camelCaseToSlug(camelCase) {
  return camelCase.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// Mapping from values to related frameworks (using slugs from frameworkNav.js)
export const valueFrameworkConnections = {
  life: [
    'treaty-for-our-only-home', 
    'animal-welfare-governance', 
    'biodiversity-governance', 
    'environmental-stewardship', 
    'planetary-health', 
    'existential-risk-governance'
  ],
  compassion: [
    'treaty-for-our-only-home', 
    'planetary-health', 
    'mental-health-governance', 
    'migration-and-human-mobility', 
    'aging-population-support-governance', 
    'disability-rights-and-inclusion'
  ],
  justice: [
    'treaty-for-our-only-home', 
    'justice-systems', 
    'global-ethics-and-rights-of-beings', 
    'gender-equality-and-lgbtq-rights', 
    'economic-integration', 
    'indigenous-governance-and-traditional-knowledge'
  ],
  truth: [
    'treaty-for-our-only-home', 
    'educational-systems', 
    'digital-commons', 
    'cultural-heritage-preservation', 
    'religious-and-spiritual-dialogue-governance', 
    'wisdom-governance'
  ],
  freedom: [
    'treaty-for-our-only-home', 
    'global-ethics-and-rights-of-beings', 
    'digital-commons', 
    'gender-equality-and-lgbtq-rights', 
    'migration-and-human-mobility', 
    'youth-and-intergenerational-governance'
  ],
  earth: [
    'treaty-for-our-only-home', 
    'climate-and-energy-governance', 
    'environmental-stewardship', 
    'biodiversity-governance', 
    'food-systems-and-agriculture', 
    'water-and-sanitation-governance'
  ],
  peace: [
    'treaty-for-our-only-home', 
    'peace-and-conflict-resolution', 
    'disaster-risk-reduction', 
    'religious-and-spiritual-dialogue-governance', 
    'implementation-methods-and-tools', 
    'indigenous-governance-and-traditional-knowledge'
  ],
  integrity: [
    'treaty-for-our-only-home', 
    'justice-systems', 
    'global-ethics-and-rights-of-beings', 
    'financial-systems', 
    'technology-governance', 
    'implementation-methods-and-tools'
  ],
  gratitude: [
    'treaty-for-our-only-home', 
    'cultural-heritage-preservation', 
    'religious-and-spiritual-dialogue-governance', 
    'indigenous-governance-and-traditional-knowledge', 
    'wisdom-governance', 
    'consciousness-and-inner-development'
  ],
  wisdom: [
    'treaty-for-our-only-home', 
    'wisdom-governance', 
    'consciousness-and-inner-development', 
    'educational-systems', 
    'religious-and-spiritual-dialogue-governance', 
    'implementation-methods-and-tools'
  ]
};

// Mapping from development levels to frameworks
export const levelFrameworkConnections = {
  awareness: [
    'treaty-for-our-only-home', 
    'educational-systems', 
    'digital-commons', 
    'cultural-heritage-preservation'
  ],
  understanding: [
    'treaty-for-our-only-home', 
    'climate-and-energy-governance', 
    'peace-and-conflict-resolution', 
    'global-ethics-and-rights-of-beings', 
    'wisdom-governance'
  ],
  empathy: [
    'treaty-for-our-only-home', 
    'migration-and-human-mobility', 
    'planetary-health', 
    'mental-health-governance', 
    'indigenous-governance-and-traditional-knowledge', 
    'religious-and-spiritual-dialogue-governance'
  ],
  participation: [
    'treaty-for-our-only-home', 
    'youth-and-intergenerational-governance', 
    'urban-and-community-development', 
    'rural-development-governance', 
    'digital-commons', 
    'implementation-methods-and-tools'
  ],
  leadership: [
    'treaty-for-our-only-home', 
    'implementation-methods-and-tools', 
    'consciousness-and-inner-development', 
    'existential-risk-governance', 
    'space-governance', 
    'wisdom-governance'
  ]
};

// Quiz response to framework mapping (using slugs)
export const quizToFrameworkMapping = {
  values: {
    climate: [
      'climate-and-energy-governance', 
      'environmental-stewardship', 
      'biodiversity-governance', 
      'food-systems-and-agriculture'
    ],
    justice: [
      'justice-systems', 
      'global-ethics-and-rights-of-beings', 
      'gender-equality-and-lgbtq-rights', 
      'economic-integration'
    ],
    technology: [
      'technology-governance', 
      'digital-commons', 
      'space-governance', 
      'existential-risk-governance'
    ],
    community: [
      'cultural-heritage-preservation', 
      'urban-and-community-development', 
      'rural-development-governance', 
      'youth-and-intergenerational-governance'
    ],
    systems: [
      'treaty-for-our-only-home', 
      'implementation-methods-and-tools', 
      'wisdom-governance'
    ]
  },
  contribution: {
    learning: [
      'educational-systems', 
      'digital-commons', 
      'cultural-heritage-preservation', 
      'wisdom-governance'
    ],
    building: [
      'technology-governance', 
      'urban-and-community-development', 
      'financial-systems', 
      'implementation-methods-and-tools'
    ],
    protecting: [
      'peace-and-conflict-resolution', 
      'planetary-health', 
      'environmental-stewardship', 
      'disaster-risk-reduction'
    ],
    advocating: [
      'justice-systems', 
      'global-ethics-and-rights-of-beings', 
      'gender-equality-and-lgbtq-rights', 
      'youth-and-intergenerational-governance'
    ],
    transforming: [
      'treaty-for-our-only-home', 
      'implementation-methods-and-tools', 
      'consciousness-and-inner-development', 
      'existential-risk-governance'
    ]
  },
  scale: {
    local: [
      'urban-and-community-development', 
      'rural-development-governance', 
      'cultural-heritage-preservation', 
      'mental-health-governance'
    ],
    national: [
      'justice-systems', 
      'educational-systems', 
      'planetary-health', 
      'economic-integration'
    ],
    global: [
      'treaty-for-our-only-home', 
      'climate-and-energy-governance', 
      'peace-and-conflict-resolution', 
      'migration-and-human-mobility'
    ],
    intergenerational: [
      'existential-risk-governance', 
      'space-governance', 
      'consciousness-and-inner-development', 
      'wisdom-governance'
    ],
    connected: [
      'treaty-for-our-only-home', 
      'implementation-methods-and-tools', 
      'climate-and-energy-governance'
    ]
  }
};

// Utility functions that now use the centralized data
export function getFrameworksByStatus(status) {
  return allFrameworks.filter(fw => fw.status === status);
}

export function getFrameworksByTierLevel(tier) {
  return getFrameworksByTier(tier);
}

export function getConnectedFrameworks(elementType, elementId) {
  let connectedSlugs = [];
  
  if (elementType === 'value') {
    connectedSlugs = valueFrameworkConnections[elementId] || [];
  } else if (elementType === 'practice') {
    connectedSlugs = levelFrameworkConnections[elementId] || [];
  }
  
  // Convert slugs to framework objects from centralized data
  return connectedSlugs
    .map(slug => getFrameworkBySlug(slug))
    .filter(Boolean);
}

export function generateRecommendations(quizResults) {
  if (!quizResults) return [];
  
  const recommendationSlugs = new Set();
  
  // Always include foundation
  recommendationSlugs.add('treaty-for-our-only-home');
  
  // Add frameworks based on quiz responses
  Object.entries(quizResults).forEach(([category, response]) => {
    const mappings = quizToFrameworkMapping[category];
    if (mappings && mappings[response]) {
      mappings[response].forEach(slug => recommendationSlugs.add(slug));
    }
  });
  
  // Convert slugs to framework objects and sort by priority (tier)
  return Array.from(recommendationSlugs)
    .map(slug => getFrameworkBySlug(slug))
    .filter(Boolean)
    .sort((a, b) => a.tier - b.tier);
}
