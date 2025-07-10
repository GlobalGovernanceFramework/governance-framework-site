// /src/lib/data/schema/_types.ts

/**
 * Core type definitions for the GGF Schema modular system
 */

export interface GgfEntity {
  id: string;
  type: 'Framework' | 'Council' | 'EconomicMechanism' | 'DataMetric' | 'LegalProtocol' | 
        'Platform' | 'Initiative' | 'Process' | 'Institution' | 'Tool' | 'Protocol' | 'Hub';
  name: string;
  shortName?: string;
  description?: string;
  // Strategic tier system (0-4)
  tier?: 0 | 1 | 2 | 3 | 4;
  status?: 'Draft' | 'Pilot' | 'Implemented' | 'Proposed' | 'Ready' | 'Review' | 'Planned' | 'Coming-Soon';
  primaryDomain?: 'Ecological' | 'Economic' | 'Justice' | 'Governance' | 'Technology' | 'Health' | 'Ethics';
  geographicScope?: 'Local' | 'Regional' | 'Global' | 'BAZ';
  // Strategic metadata
  implementationPriority?: 'Critical' | 'High' | 'Medium' | 'Low';
  dependencies?: string[]; // Array of entity IDs this depends on
  enables?: string[]; // Array of entity IDs this enables
  
  // === UI METADATA FOR NAVIGATION GENERATION ===
  ui?: {
    path?: string;       // e.g., '/frameworks/kinship-garden'
    titleKey?: string;   // i18n key, e.g., 'framework.docs.nav.frameworkTitles.kinshipGarden'
    emoji?: string;      // e.g., '🌱'
    version?: string;    // e.g., '2.0'
    slug?: string;       // URL-friendly identifier
    group?: string;      // Thematic grouping for navigation
  };
}

export interface GgfRelationship {
  from: string;
  to: string;
  type: 'OVERSEES' | 'INFORMS' | 'FUNDS' | 'ENFORCES' | 'PRODUCES' | 'USES_DATA_FROM' | 
        'REPORTS_TO' | 'COORDINATES_WITH' | 'IMPLEMENTS' | 'MEDIATES' | 'REWARDS' | 
        'ESCALATES_TO' | 'DELEGATES_TO' | 'AUDITS' | 'COLLABORATES_WITH' | 'ESTABLISHES' | 
        'GUIDES' | 'ACTIVATES' | 'COMMISSIONS' | 'INTEGRATES_WITH' | 'VALIDATES' |
        'DEPENDS_ON' | 'ENABLES' | 'PREREQUISITES';
  description?: string;
  strength?: 'Strong' | 'Medium' | 'Weak';
  frequency?: 'Continuous' | 'Regular' | 'As-Needed' | 'Crisis-Only';
  direction?: 'Bidirectional' | 'Unidirectional';
  // Implementation sequencing
  sequenceType?: 'Sequential' | 'Parallel' | 'Conditional';
}

export interface GgfCluster {
  id: string;
  name: string;
  description: string;
  color?: string;
  entities: string[];
  tier?: 0 | 1 | 2 | 3 | 4;
}

// Strategic tier metadata - UPDATED WITH PROPER TRANSLATION KEYS
export const tierMetadata = {
  0: {
    name: 'Constitutional Layer',
    titleKey: 'framework.tier.0.title',
    descriptionKey: 'framework.tier.0.description',
    emoji: '⚖️',
    description: 'The absolute, non-negotiable prerequisite. The new global "constitution" that makes everything else legally and institutionally possible.',
    color: '#1e1b4b', // Deep indigo
    priority: 'Critical',
    keyCharacteristics: ['Legal foundation', 'Institutional reform', 'Enforcement mechanisms']
  },
  1: {
    name: 'Core Operating Systems',
    titleKey: 'framework.tier.1.title',
    descriptionKey: 'framework.tier.1.description',
    emoji: '🌍',
    description: 'Foundational frameworks that define the GGF\'s core governance, economic, ethical, and justice systems.',
    color: '#7c3aed', // Purple
    priority: 'Critical',
    keyCharacteristics: ['Governance coordination', 'Economic engine', 'Justice foundation', 'Ethical compass']
  },
  2: {
    name: 'Foundational Application Layer',
    titleKey: 'framework.tier.2.title',
    descriptionKey: 'framework.tier.2.description',
    emoji: '🌱',
    description: 'Essential frameworks for managing core societal and ecological systems.',
    color: '#059669', // Green
    priority: 'High',
    keyCharacteristics: ['Life support systems', 'Human capabilities', 'Ecological integrity']
  },
  3: {
    name: 'Equity & Cultural Flourishing Layer',
    titleKey: 'framework.tier.3.title',
    descriptionKey: 'framework.tier.3.description',
    emoji: '🤝',
    description: 'Frameworks ensuring deep equity, inclusion, and cultural preservation.',
    color: '#dc2626', // Red
    priority: 'Medium',
    keyCharacteristics: ['Social equity', 'Cultural preservation', 'Knowledge commons']
  },
  4: {
    name: 'Visionary & Meta-Governance Layer',
    titleKey: 'framework.tier.4.title',
    descriptionKey: 'framework.tier.4.description',
    emoji: '🔮',
    description: 'Highest level frameworks governing the entire system and addressing future risks.',
    color: '#0891b2', // Cyan
    priority: 'Medium',
    keyCharacteristics: ['System governance', 'Future orientation', 'Existential risk', 'Consciousness evolution']
  }
};

// Group metadata for navigation (aligned with frameworkNav.js structure)
export const groupMetadata = {
  planetaryHealthResilience: {
    titleKey: 'framework.groups.planetaryHealthResilience.title',
    descriptionKey: 'framework.groups.planetaryHealthResilience.description',
    emoji: '🌱'
  },
  socialFabricJustice: {
    titleKey: 'framework.groups.socialFabricJustice.title',
    descriptionKey: 'framework.groups.socialFabricJustice.description',
    emoji: '⚖️'
  },
  globalEconomicSystems: {
    titleKey: 'framework.groups.globalEconomicSystems.title',
    descriptionKey: 'framework.groups.globalEconomicSystems.description',
    emoji: '💱'
  },
  ecologicalSystems: {
    titleKey: 'framework.groups.ecologicalSystems.title',
    descriptionKey: 'framework.groups.ecologicalSystems.description',
    emoji: '🌿'
  },
  humanSocialSystems: {
    titleKey: 'framework.groups.humanSocialSystems.title',
    descriptionKey: 'framework.groups.humanSocialSystems.description',
    emoji: '🎓'
  }
};

// Validation result interface
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
