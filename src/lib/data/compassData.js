// Enhanced src/lib/data/compassData.js - Adding personalized connections functionality
import { allFrameworks, getFrameworkBySlug, getFrameworksByTier } from '$lib/stores/frameworkNav.js';
import { getConnectionReason as getI18nConnectionReason } from './connectionReasons.js';
import { locale } from '$lib/i18n';
import { get } from 'svelte/store';

// Re-export framework status and tiers from the centralized source
export const frameworkStatus = {
  READY: 'ready',
  IN_REVIEW: 'review',
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
  const id = framework.slug.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  
  acc[id] = {
    id,
    slug: framework.slug,
    tier: framework.tier,
    status: framework.status,
    path: framework.path,
    priority: framework.tier + 1,
    titleKey: framework.titleKey,
    version: framework.version
  };
  
  return acc;
}, {});

// Mapping from values to related frameworks (using slugs from frameworkNav.js)
export const valueFrameworkConnections = {
  life: [
    'treaty-for-our-only-home', 
    'animal-welfare-governance', 
    'biodiversity-governance', 
    'environmental-stewardship', 
    'planetary-health-governance', 
    'existential-risk-governance'
  ],
  compassion: [
    'treaty-for-our-only-home', 
    'planetary-health-governance', 
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
    'nested-economies', 
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
    'planetary-health-governance', 
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
      'nested-economies'
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
      'planetary-health-governance', 
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
      'planetary-health-governance', 
      'nested-economies'
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

// NEW: Function to get personalized connections based on user's practices and quiz results
export function getPersonalizedConnections(userProgress, quizResults) {
  if (!userProgress && !quizResults) return [];
  
  const connectionSlugs = new Set();
  const connectionDetails = [];
  
  // Always include the foundation
  connectionSlugs.add('treaty-for-our-only-home');
  connectionDetails.push({
    slug: 'treaty-for-our-only-home',
    reasons: [getConnectionReason('foundation', 'foundation', 'treaty-for-our-only-home')],
    sources: ['foundation']
  });
  
  // Add connections from active practices
  if (userProgress) {
    Object.entries(userProgress).forEach(([practice, isActive]) => {
      if (isActive && levelFrameworkConnections[practice]) {
        levelFrameworkConnections[practice].forEach(slug => {
          if (!connectionSlugs.has(slug)) {
            connectionSlugs.add(slug);
            connectionDetails.push({
              slug,
              reasons: [getConnectionReason('practice', practice, slug)],
              sources: [`practice:${practice}`]
            });
          } else {
            // Add additional reason for existing connection
            const existing = connectionDetails.find(c => c.slug === slug);
            if (existing) {
              existing.reasons.push(getConnectionReason('practice', practice, slug));
              existing.sources.push(`practice:${practice}`);
            }
          }
        });
      }
    });
  }
  
  // Add connections from quiz results
  if (quizResults) {
    Object.entries(quizResults).forEach(([category, response]) => {
      if (quizToFrameworkMapping[category] && quizToFrameworkMapping[category][response]) {
        quizToFrameworkMapping[category][response].forEach(slug => {
          if (!connectionSlugs.has(slug)) {
            connectionSlugs.add(slug);
            connectionDetails.push({
              slug,
              reasons: [getConnectionReason('quiz', `${category}:${response}`, slug)],
              sources: [`quiz:${category}:${response}`]
            });
          } else {
            // Add additional reason for existing connection
            const existing = connectionDetails.find(c => c.slug === slug);
            if (existing) {
              existing.reasons.push(getConnectionReason('quiz', `${category}:${response}`, slug));
              existing.sources.push(`quiz:${category}:${response}`);
            }
          }
        });
      }
    });
  }
  
  // Convert to framework objects with reasoning
  return connectionDetails
    .map(detail => {
      const framework = getFrameworkBySlug(detail.slug);
      if (!framework) return null;
      
      return {
        ...framework,
        reasons: [...new Set(detail.reasons)], // Remove duplicates
        sources: detail.sources,
        connectionScore: detail.sources.length // How many ways this connects
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      // Sort by connection score first, then by tier
      if (b.connectionScore !== a.connectionScore) {
        return b.connectionScore - a.connectionScore;
      }
      return a.tier - b.tier;
    });
}

// NEW: Helper function to get connection reasoning with i18n support
export function getConnectionReason(type, source, frameworkSlug) {
  const currentLocale = get(locale);
  const framework = getFrameworkBySlug(frameworkSlug);
  if (!framework) return 'Connected to your interests';
  
  if (type === 'practice') {
    const practice = source;
    return getI18nConnectionReason(currentLocale, 'practice', practice, frameworkSlug);
  }
  
  if (type === 'value') {
    const value = source;
    return getI18nConnectionReason(currentLocale, 'value', value, frameworkSlug);
  }
  
  if (type === 'quiz') {
    return getI18nConnectionReason(currentLocale, 'quiz', source, frameworkSlug);
  }
  
  if (type === 'foundation') {
    return getI18nConnectionReason(currentLocale, 'foundation', 'foundation', frameworkSlug);
  }
  
  return 'Connected to your path';
}

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
