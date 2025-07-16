// /src/lib/data/schema/cluster.visionary-meta.ts

import type { GgfEntity, GgfRelationship } from './_types';

/**
 * TIER 4: VISIONARY & META-SYSTEMS CLUSTER
 * Highest-level frameworks that are either highly future-focused or provide 
 * meta-level governance for the entire GGF ecosystem
 */

export const visionaryMetaEntities: GgfEntity[] = [
  // === EXISTENTIAL & FUTURE GOVERNANCE ===
  {
    id: 'framework_planetary_immune_system',
    type: 'Framework',
    name: 'Planetary Immune System (Existential Risk Governance)',
    shortName: 'PIS',
    description: 'Existential risk governance with system override capabilities for planetary survival threats',
    tier: 4,
    status: 'Planned',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_meta_gov', 'process_crisis_command'],
    ui: {
      path: '/frameworks/existential-risk-governance',
      titleKey: 'framework.docs.nav.frameworkTitles.existentialRiskGovernance',
      emoji: '⚠️',
      slug: 'existential-risk-governance'
    }
  },
  {
    id: 'framework_space_governance',
    type: 'Framework',
    name: 'Space Governance Framework',
    shortName: 'Space Governance',
    description: 'Governance framework for space exploration, settlement, and off-world activities',
    tier: 4,
    status: 'Planned',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Low',
    dependencies: ['framework_treaty'],
    ui: {
      path: '/frameworks/space-governance',
      titleKey: 'framework.docs.nav.frameworkTitles.spaceGovernance',
      emoji: '🚀',
      slug: 'space-governance'
    }
  },
  {
    id: 'framework_millennium_protocol',
    type: 'Framework',
    name: 'The Millennium Protocol',
    shortName: 'Millennium Protocol',
    description: 'A supreme Tier 4 constitutional charter for guiding humanity\'s evolution into a responsible, wise, and participatory cosmic civilization over deep time.',
    tier: 4,
    status: 'Planned',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Low',
    dependencies: [
      'framework_deep_time',
      'framework_wisdom_governance',
      'framework_planetary_immune_system',
      'framework_treaty'
    ],
    ui: {
      path: '/frameworks/the-millennium-protocol',
      titleKey: 'framework.docs.nav.frameworkTitles.theMillenniumProtocol', // You would add this key to your i18n files
      emoji: '🌌',
      version: '6.0',
      slug: 'the-millennium-protocol'
    }
  },
  {
    id: 'framework_deep_time',
    type: 'Framework',
    name: 'Deep Time & Relativistic Governance Framework',
    shortName: 'Deep Time Governance',
    description: 'A visionary framework governing relativistic, causal, and temporal ethics for a multi-planetary civilization, as required by the Millennium Protocol. Includes governance of temporal paradoxes and deep time decision-making.',
    tier: 4,
    status: 'Planned',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Low', // Low for now, high in the far future
    dependencies: ['protocol_cross_temporal', 'framework_millennium_protocol', 'institution_dj_tribunal'],
    ui: {
      path: '/frameworks/deep-time-governance',
      titleKey: 'framework.docs.nav.frameworkTitles.deepTimeGovernance', // You would add this key
      emoji: '⏳',
      slug: 'deep-time-governance'
    }
  },

  // === WISDOM & META-GOVERNANCE ===
  {
    id: 'framework_wisdom_governance',
    type: 'Framework',
    name: 'Wisdom Governance Framework',
    shortName: 'Wisdom Governance',
    description: 'Framework for integrating long-term thinking and collective wisdom into governance, building upon WDIP',
    tier: 4,
    status: 'Planned',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Low',
    dependencies: ['framework_wdmip', 'framework_consciousness_development'],
    ui: {
      path: '/frameworks/wisdom-governance',
      titleKey: 'framework.docs.nav.frameworkTitles.wisdomGovernance',
      emoji: '🦉',
      slug: 'wisdom-governance'
    }
  },

  // === META-IMPLEMENTATION FRAMEWORK ===
  {
    id: 'framework_implementation_tools',
    type: 'Framework',
    name: 'Implementation Methods & Tools Framework',
    shortName: 'Implementation Tools',
    description: 'Meta-framework providing standardized tools, playbooks, and methodologies for implementing all other GGF frameworks',
    tier: 4,
    status: 'Review',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_meta_gov'],
    ui: {
      path: '/frameworks/implementation-methods-and-tools',
      titleKey: 'framework.docs.nav.frameworkTitles.implementationMethodsAndTools',
      emoji: '🧰',
      slug: 'implementation-methods-and-tools'
    }
  }
];

export const visionaryMetaRelationships: GgfRelationship[] = [
  // === CRISIS & EXISTENTIAL RISK MANAGEMENT ===
  {
    from: 'framework_planetary_immune_system',
    to: 'process_crisis_command',
    type: 'IMPLEMENTS',
    description: 'PIS operationalizes Crisis Command Protocol for existential-level threats',
    strength: 'Strong',
    frequency: 'Crisis-Only',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_planetary_immune_system',
    to: 'framework_meta_gov',
    type: 'OVERSEES',
    description: 'PIS can override entire Meta-Governance system during existential crises',
    strength: 'Strong',
    frequency: 'Crisis-Only',
    sequenceType: 'Conditional'
  },

  // === WISDOM & DECISION-MAKING INTEGRATION ===
  {
    from: 'framework_wisdom_governance',
    to: 'framework_wdmip',
    type: 'INTEGRATES_WITH',
    description: 'Wisdom Governance builds upon and expands methodologies provided by WDIP',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_wisdom_governance',
    to: 'framework_consciousness_development',
    type: 'INTEGRATES_WITH',
    description: 'Wisdom Governance integrates consciousness development with collective decision-making',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === META-IMPLEMENTATION SUPPORT ===
  {
    from: 'framework_implementation_tools',
    to: 'framework_meta_gov',
    type: 'SUPPORTS',
    description: 'Implementation Tools provides standardized playbooks for all frameworks managed under Meta-Governance',
    strength: 'Medium',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_implementation_tools',
    to: 'framework_treaty',
    type: 'SUPPORTS',
    description: 'Implementation Tools provides practical guidance for Treaty implementation across jurisdictions',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === SPACE & FUTURE GOVERNANCE ===
  {
    from: 'framework_space_governance',
    to: 'framework_treaty',
    type: 'INTEGRATES_WITH',
    description: 'Space Governance requires Treaty extensions to establish legal principles for off-world activities',
    strength: 'Medium',
    frequency: 'As-Needed',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_space_governance',
    to: 'framework_indigenous',
    type: 'INFORMS',
    description: 'Space exploration must respect Indigenous principles of relationship with celestial bodies',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CROSS-SYSTEM COORDINATION ===
  {
    from: 'framework_planetary_immune_system',
    to: 'institution_gem',
    type: 'ACTIVATES',
    description: 'PIS can deploy Global Enforcement Mechanism for existential threat response',
    strength: 'Strong',
    frequency: 'Crisis-Only',
    sequenceType: 'Conditional'
  },
  {
    from: 'framework_planetary_immune_system',
    to: 'framework_shield',
    type: 'COORDINATES_WITH',
    description: 'PIS coordinates with Shield Protocol when existential threats involve criminal networks',
    strength: 'Medium',
    frequency: 'As-Needed',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_wisdom_governance',
    to: 'council_earth',
    type: 'COLLABORATES_WITH',
    description: 'Wisdom Governance draws upon Indigenous wisdom traditions via Earth Council',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_implementation_tools',
    to: 'institution_baz',
    type: 'SUPPORTS',
    description: 'Implementation Tools provides BAZ-specific adaptation guides and toolkits',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === FUTURE-ORIENTED COORDINATION ===
  {
    from: 'framework_space_governance',
    to: 'framework_planetary_immune_system',
    type: 'COORDINATES_WITH',
    description: 'Space activities must consider planetary protection and existential risk implications',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_wisdom_governance',
    to: 'framework_planetary_immune_system',
    type: 'INFORMS',
    description: 'Wisdom Governance provides long-term perspective for existential risk assessment',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === META-LEVEL SYSTEM SUPPORT ===
  {
    from: 'framework_implementation_tools',
    to: 'framework_aubi',
    type: 'SUPPORTS',
    description: 'Implementation Tools provides deployment guides for AUBI pilot programs',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_implementation_tools',
    to: 'framework_justice',
    type: 'SUPPORTS',
    description: 'Implementation Tools provides justice system deployment methodologies',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  }
];
