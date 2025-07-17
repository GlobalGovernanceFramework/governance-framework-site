// /src/lib/data/schema/cluster.governance-os.ts

import type { GgfEntity, GgfRelationship } from './_types';

/**
 * TIER 1: GOVERNANCE OPERATING SYSTEM
 * Meta-Governance: The nervous system coordinating all other frameworks
 */

export const governanceOSEntities: GgfEntity[] = [
  {
    id: 'framework_meta_gov',
    type: 'Framework',
    name: 'Integrated Meta-Governance Framework',
    shortName: 'Meta-Governance',
    description: 'Coordination framework enabling interoperability across governance domains',
    tier: 1,
    status: 'Ready',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_treaty'],
    enables: ['council_mgcc', 'process_crisis_command'],
    ui: {
      path: '/frameworks/meta-governance',
      titleKey: 'framework.docs.nav.frameworkTitles.integratedMetaGovernance',
      emoji: '🏛️',
      version: '1.1',
      slug: 'meta-governance'
    }
  },
  {
    id: 'council_mgcc',
    type: 'Council',
    name: 'Meta-Governance Coordination Council',
    shortName: 'MGCC',
    description: 'Primary venue for alignment across governance domains',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_meta_gov']
  },
  {
    id: 'process_crisis_command',
    type: 'Process',
    name: 'Crisis Command Protocol',
    shortName: 'Crisis Command',
    description: 'Temporary configuration of Meta-Governance councils to manage existential crises',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_meta_gov']
  },
  {
    id: 'protocol_polycentric',
    type: 'Protocol',
    name: 'Polycentric Coordination',
    shortName: 'Polycentric Coordination',
    description: 'Core principle of sharing power across many centers rather than a single hierarchy',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_meta_gov']
  },
  {
    id: 'protocol_cross_temporal',
    type: 'Protocol',
    name: 'Cross-Temporal Coordination Protocol',
    shortName: 'Temporal Coordination',
    description: 'A core protocol of the Meta-Governance Framework for harmonizing linear, cyclical, and multi-horizon timeframes across diverse governance systems, enabling effective coordination between institutional and Indigenous frameworks.',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_meta_gov', 'framework_indigenous'],
    // No UI entry needed if it's considered an internal protocol of Meta-Gov, 
    // or it could have its own page.
  },
  {
    id: 'council_global_metrology',
    type: 'Council',
    name: 'Global Metrology Council',
    shortName: 'Metrology Council',
    description: 'A specialized council under the MGCC responsible for overseeing universal metrology governance. Its mandated composition (40% Indigenous/traditional, 30% scientific, 30% Global South) ensures metrics are just, pluralistic, and decolonial. It oversees the Metric Lifecycle Process.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_meta_gov']
  },
  {
    id: 'process_metric_lifecycle',
    type: 'Process',
    name: 'Metric Lifecycle Governance Process',
    shortName: 'Metric Lifecycle',
    description: 'The official GGF process for the proposal, co-development, piloting, standardization, periodic review, and sunsetting of all universal metrics (e.g., BHI, LMCI). This process ensures metrics are ethically designed, culturally relevant, and scientifically robust.',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['council_global_metrology']
  }
];

export const governanceOSRelationships: GgfRelationship[] = [
  // === DEPENDENCIES ON CONSTITUTIONAL LAYER ===
  {
    from: 'framework_treaty',
    to: 'framework_meta_gov',
    type: 'ENABLES',
    description: 'Treaty provides legal foundation for Meta-Governance coordination',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  
  // === INTERNAL GOVERNANCE OS RELATIONSHIPS ===
  {
    from: 'framework_meta_gov',
    to: 'council_mgcc',
    type: 'ESTABLISHES',
    description: 'Meta-Governance framework establishes the MGCC as primary coordination body',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_meta_gov',
    to: 'process_crisis_command',
    type: 'ESTABLISHES',
    description: 'Meta-Governance establishes crisis command protocols for emergency coordination',
    strength: 'Strong',
    frequency: 'Crisis-Only',
    sequenceType: 'Sequential'
  },
  {
    from: 'protocol_polycentric',
    to: 'council_mgcc',
    type: 'GUIDES',
    description: 'Polycentric coordination principles guide how the MGCC operates',
    strength: 'Medium',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'process_crisis_command',
    to: 'institution_gem',
    type: 'ACTIVATES',
    description: 'Crisis Command Protocol can deploy the Global Enforcement Mechanism',
    strength: 'Strong',
    frequency: 'Crisis-Only',
    sequenceType: 'Conditional'
  },
  // === EXTERNAL RELATIONSHIPS ===
  {
    from: 'framework_meta_gov',
    to: 'institution_baz',
    type: 'COORDINATES_WITH',
    description: 'Provides the polycentric coordination protocols for how BAZs can interoperate and form "fractal governance networks" while maintaining sovereignty.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  },
  {
    from: 'protocol_cross_temporal',
    to: 'framework_deep_time',
    type: 'ENABLES',
    description: 'The foundational principles of cross-temporal coordination are the prerequisite for, and evolve into, the advanced applications of Deep Time & Relativistic Governance.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  },

  {
    from: 'council_global_metrology',
    to: 'council_mgcc',
    type: 'REPORTS_TO',
    description: 'The Global Metrology Council is a specialized sub-council that reports to and operates within the Meta-Governance Coordination Council.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_global_metrology',
    to: 'process_metric_lifecycle',
    type: 'OVERSEES',
    description: 'The Metrology Council is the governing body that manages and enforces the Metric Lifecycle Governance Process.',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'process_metric_lifecycle',
    to: 'metric_bhi',
    type: 'GUIDES',
    description: 'The lifecycle process governs the development, validation, and evolution of the Biosphere Health Index.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'process_metric_lifecycle',
    to: 'metric_lmci',
    type: 'GUIDES',
    description: 'The lifecycle process governs the development, validation, and evolution of the Love, Meaning, and Connection Index.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_meta_gov',
    to: 'framework_hearthstone',
    type: 'INTEGRATES_WITH',
    description: 'Meta-Governance provides the "Emergency Stewardship Protocol" trigger via its Crisis Command Protocol, allowing Hearthstone to secure endangered commons during crises.',
    strength: 'Strong',
    frequency: 'Crisis-Only',
    sequenceType: 'Conditional'
  }
];
