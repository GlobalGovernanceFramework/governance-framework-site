// /src/lib/data/schema/cluster.economic-os.ts

import type { GgfEntity, GgfRelationship } from './_types';

/**
 * TIER 1: ECONOMIC OPERATING SYSTEM
 * Regenerative Economy: Core economic engine with Hearts/Leaves, Love Ledger, and AUBI
 * The economic incentive system that funds and rewards care work, ecological restoration, and community building
 */

export const economicOSEntities: GgfEntity[] = [
  // === CORE FRAMEWORKS ===
  {
    id: 'framework_aubi',
    type: 'Framework',
    name: 'Adaptive Universal Basic Income Framework',
    shortName: 'AUBI',
    description: 'Regenerative economic engine with Hearts/Leaves currency system and Love Ledger',
    tier: 1,
    status: 'Ready',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['mechanism_gcf'],
    enables: ['mechanism_hearts', 'mechanism_leaves', 'platform_love_ledger'],
    ui: {
      path: '/frameworks/adaptive-universal-basic-income',
      titleKey: 'framework.docs.nav.frameworkTitles.adaptiveUniversalBasicIncome',
      emoji: '💰',
      version: '1.0',
      slug: 'adaptive-universal-basic-income',
      group: 'globalEconomicSystems'
    }
  },
  {
    id: 'framework_financial_systems',
    type: 'Framework',
    name: 'Regenerative Financial Systems Framework',
    shortName: 'Financial Systems',
    description: 'Post-capitalist financial architecture supporting regenerative economy',
    tier: 1,
    status: 'Review',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    ui: {
      path: '/frameworks/financial-systems',
      titleKey: 'framework.docs.nav.frameworkTitles.financialSystems',
      emoji: '❤️',
      slug: 'financial-systems',
      group: 'globalEconomicSystems'
    }
  },
  {
    id: 'framework_work_liberation',
    type: 'Framework',
    name: 'Work in Liberation Framework',
    shortName: 'Work in Liberation',
    description: 'Framework defining and organizing "Work with Purpose" and Community Work Teams',
    tier: 1,
    status: 'Ready',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_aubi'],
    enables: ['institution_cwt'],
    ui: {
      path: '/frameworks/work-in-liberation',
      titleKey: 'framework.docs.nav.frameworkTitles.laborAndEmploymentGovernance',
      emoji: '👥',
      version: '1.0',
      slug: 'work-in-liberation',
      group: 'globalEconomicSystems'
    }
  },
  {
    id: 'framework_nested_sovereignty',
    type: 'Framework',
    name: 'Nested Economies Framework',
    shortName: 'Nested Economies',
    description: 'Multi-scale economic coordination framework enabling local and bioregional economies',
    tier: 1,
    status: 'Ready',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    ui: {
      path: '/frameworks/nested-economies',
      titleKey: 'framework.docs.nav.frameworkTitles.nestedEconomies',
      emoji: '💱',
      version: '1.0',
      slug: 'nested-economies',
      group: 'globalEconomicSystems'
    }
  },
  {
    id: 'framework_gaian_trade',
    type: 'Framework',
    name: 'The Gaian Trade Framework',
    shortName: 'Gaian Trade',
    description: 'Ecological trade and exchange framework with regenerative supply chains',
    tier: 1,
    status: 'Review',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'High',
    enables: ['tool_dpp'],
    ui: {
      path: '/frameworks/gaian-trade',
      titleKey: 'framework.docs.nav.frameworkTitles.gaianTrade',
      emoji: '🌍',
      slug: 'gaian-trade',
      group: 'globalEconomicSystems'
    }
  },
  {
    id: 'framework_gscl',
    type: 'Framework',
    name: 'Global Supply Chains & Logistics Framework',
    shortName: 'Supply Chains',
    description: 'Regenerative global supply chain governance',
    tier: 1,
    status: 'Ready',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'High',
    ui: {
      path: '/frameworks/global-supply-chains-and-logistics',
      titleKey: 'framework.docs.nav.frameworkTitles.globalSupplyChainsAndLogistics',
      emoji: '🚢',
      version: '1.0',
      slug: 'global-supply-chains-and-logistics',
      group: 'globalEconomicSystems'
    }
  },

  // === GOVERNANCE COUNCILS ===
  {
    id: 'council_social_resilience',
    type: 'Council',
    name: 'Social Resilience Council',
    shortName: 'SRC',
    description: 'Meta-Governance council overseeing AUBI, Hearts/Leaves supply, and the Love Ledger',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_meta_gov', 'framework_aubi']
  },
  {
    id: 'council_flp',
    type: 'Council',
    name: 'Fractal Labor Parliament',
    shortName: 'FLP',
    description: 'Meta-Governance council setting ethical standards and valuation for "Work with Purpose"',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_meta_gov', 'framework_work_liberation']
  },

  // === ECONOMIC MECHANISMS ===
  {
    id: 'mechanism_hearts',
    type: 'EconomicMechanism',
    name: 'Hearts Currency',
    shortName: 'Hearts',
    description: 'Social currency rewarding care, community, and cultural contributions',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_aubi']
  },
  {
    id: 'mechanism_leaves',
    type: 'EconomicMechanism',
    name: 'Leaves Currency',
    shortName: 'Leaves',
    description: 'Ecological currency rewarding verified ecosystem restoration and stewardship',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_aubi']
  },

  // === PLATFORMS & INFRASTRUCTURE ===
  {
    id: 'platform_love_ledger',
    type: 'Platform',
    name: 'Love Ledger',
    shortName: 'Love Ledger',
    description: 'Decentralized ledger for logging and validating contributions of care and ecological work',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_aubi', 'mechanism_hearts', 'mechanism_leaves']
  },

  // === INSTITUTIONS ===
  {
    id: 'institution_cwt',
    type: 'Institution',
    name: 'Community Work Teams',
    shortName: 'CWTs',
    description: 'BAZ-level teams organizing care, ecological, and cultural work',
    tier: 1,
    status: 'Pilot',
    primaryDomain: 'Economic',
    geographicScope: 'Regional',
    implementationPriority: 'Critical',
    dependencies: ['framework_work_liberation', 'institution_baz']
  },

  // === PROCESSES & TOOLS ===
  {
    id: 'process_proof_of_care',
    type: 'Process',
    name: 'Proof of Care',
    shortName: 'Proof of Care',
    description: 'The validation process for logging contributions to the Love Ledger',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['platform_love_ledger']
  },
  {
    id: 'tool_dpp',
    type: 'Tool',
    name: 'Digital Product Passports',
    shortName: 'DPPs',
    description: 'Tool for tracking the ecological and social impact of products in the supply chain',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_gaian_trade']
  },

  // === DATA METRICS ===
  {
    id: 'metric_lmci',
    type: 'DataMetric',
    name: 'Love, Meaning, and Connection Index',
    shortName: 'LMCI',
    description: 'A metric of societal flourishing that guides the AUBI system',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_aubi']
  }
];

export const economicOSRelationships: GgfRelationship[] = [
  // === DEPENDENCIES ON CONSTITUTIONAL LAYER ===
  {
    from: 'mechanism_gcf',
    to: 'framework_aubi',
    type: 'FUNDS',
    description: 'Global Commons Fund is primary funding source for AUBI Layer 1',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },

  // === INTERNAL ECONOMIC ENGINE MECHANICS ===
  
  // Council Oversight
  {
    from: 'council_social_resilience',
    to: 'framework_aubi',
    type: 'OVERSEES',
    description: 'SRC manages the AUBI system and the supply of Hearts/Leaves',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_flp',
    to: 'framework_work_liberation',
    type: 'OVERSEES',
    description: 'FLP sets the standards for what constitutes valid work',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_social_resilience',
    to: 'council_flp',
    type: 'COORDINATES_WITH',
    description: 'SRC and FLP coordinate closely on work valuation and currency supply',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // AUBI Currency Distribution
  {
    from: 'framework_aubi',
    to: 'mechanism_hearts',
    type: 'REWARDS',
    description: 'AUBI Layer 2 rewards care and community contributions with Hearts',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_aubi',
    to: 'mechanism_leaves',
    type: 'REWARDS',
    description: 'AUBI Layer 2 rewards ecological work with Leaves',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },

  // Love Ledger Operations
  {
    from: 'platform_love_ledger',
    to: 'process_proof_of_care',
    type: 'IMPLEMENTS',
    description: 'Love Ledger is the platform where Proof of Care is recorded',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_cwt',
    to: 'platform_love_ledger',
    type: 'USES_DATA_FROM',
    description: 'Community Work Teams log their completed work on the Love Ledger',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // Economic Coordination
  {
    from: 'framework_nested_sovereignty',
    to: 'mechanism_hearts',
    type: 'IMPLEMENTS',
    description: 'Nested Sovereignty provides principles for local economies to use Hearts',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_nested_sovereignty',
    to: 'mechanism_leaves',
    type: 'IMPLEMENTS',
    description: 'Nested Sovereignty enables bioregional economies to use Leaves',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // Supply Chain Integration
  {
    from: 'framework_gaian_trade',
    to: 'tool_dpp',
    type: 'ESTABLISHES',
    description: 'Gaian Trade establishes Digital Product Passports for supply chain transparency',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'tool_dpp',
    to: 'platform_love_ledger',
    type: 'USES_DATA_FROM',
    description: 'Digital Product Passports pull data from Love Ledger to verify ethical claims',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_gscl',
    to: 'framework_gaian_trade',
    type: 'IMPLEMENTS',
    description: 'Supply Chains implements Gaian Trade principles',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // Data and Feedback Loops
  {
    from: 'metric_lmci',
    to: 'council_social_resilience',
    type: 'INFORMS',
    description: 'LMCI provides feedback on societal well-being, informing AUBI policy',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO GOLDEN TRIANGLE ===
  
  // Meta-Governance Integration
  {
    from: 'council_social_resilience',
    to: 'council_mgcc',
    type: 'REPORTS_TO',
    description: 'SRC is a key council within the Meta-Governance structure',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_flp',
    to: 'council_mgcc',
    type: 'REPORTS_TO',
    description: 'FLP is a key council within the Meta-Governance structure',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // Justice System Integration
  {
    from: 'framework_financial_systems',
    to: 'framework_justice',
    type: 'ESCALATES_TO',
    description: 'Disputes over Love Ledger or financial fraud escalate to Justice Systems',
    strength: 'Medium',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },

  // Indigenous Framework Coordination
  {
    from: 'institution_cwt',
    to: 'institution_baz',
    type: 'IMPLEMENTS',
    description: 'Community Work Teams operate within BAZ governance structures',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO ECOLOGICAL CLUSTER ===
  {
    from: 'mechanism_leaves',
    to: 'framework_biodiversity',
    type: 'FUNDS',
    description: 'Leaves are primary economic mechanism to fund restoration work',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'mechanism_leaves',
    to: 'framework_food',
    type: 'REWARDS',
    description: 'Leaves reward regenerative agriculture practices',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'mechanism_hearts',
    to: 'framework_animal_welfare',
    type: 'REWARDS',
    description: 'Hearts reward animal care and welfare work',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  }
];
