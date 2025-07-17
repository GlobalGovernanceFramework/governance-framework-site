// /src/lib/data/schema/cluster.technology-os.ts

import type { GgfEntity, GgfRelationship } from './_types';

/**
 * TIER 1-2: TECHNOLOGY OPERATING SYSTEM CLUSTER
 * Core technology governance framework (Tier 1) with specialized applications (Tier 2)
 * Provides ethical governance for emerging technologies including AI, biotech, and digital systems
 */

export const technologyOSEntities: GgfEntity[] = [
  // === TIER 1: CORE TECHNOLOGY GOVERNANCE ===
  {
    id: 'framework_technology_governance',
    type: 'Framework',
    name: 'Technology Governance Implementation Framework',
    shortName: 'TGIF',
    description: 'Comprehensive technology governance and AI ethics framework providing parent governance for all tech applications',
    tier: 1,
    status: 'Review',
    primaryDomain: 'Technology',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_aurora_accord'],
    enables: ['council_gtc', 'framework_aethelred_accord'],
    ui: {
      path: '/frameworks/technology-governance',
      titleKey: 'framework.docs.nav.frameworkTitles.technologyGovernance',
      emoji: '🤖',
      slug: 'technology-governance',
      group: 'humanSocialSystems'
    }
  },

  // === TIER 2: SPECIALIZED TECHNOLOGY APPLICATIONS ===
  {
    id: 'framework_aethelred_accord',
    type: 'Framework',
    name: 'Aethelred Accord - Synthetic Biology Governance',
    shortName: 'Aethelred Accord',
    description: 'Governance framework for synthetic biology and advanced biotech applications',
    tier: 2,
    status: 'Ready',
    primaryDomain: 'Technology',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_technology_governance'],
    ui: {
      path: '/frameworks/aethelred-accord',
      titleKey: 'framework.docs.nav.frameworkTitles.syntheticBiologyAndAdvancedBiotechGovernance',
      emoji: '🧬',
      version: '1.0',
      slug: 'aethelred-accord',
      group: 'humanSocialSystems'
    }
  },
  {
    id: 'institution_quantum_lab',
    type: 'Institution',
    name: 'Quantum Governance Lab',
    shortName: 'Quantum Lab',
    description: 'A specialized research and governance institution responsible for developing protocols and ethical guidelines for emerging quantum technologies, including quantum-resistant encryption, computation, and their impact on causality.',
    tier: 2, // A Tier 2 institution that enables advanced Tier 4 governance.
    status: 'Proposed',
    primaryDomain: 'Technology',
    geographicScope: 'Global',
    implementationPriority: 'High', // High due to near-term cybersecurity threats from quantum computing.
    dependencies: ['framework_technology_governance', 'council_gtc'],
    enables: ['framework_deep_time']
    // No UI block needed as it's a sub-institution, not a primary navigable framework.
  },

  // === GOVERNANCE COUNCIL ===
  {
    id: 'council_gtc',
    type: 'Council',
    name: 'Global Technology Council',
    shortName: 'GTC',
    description: 'Meta-Governance council overseeing all technology frameworks and ethical technology development',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Technology',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_technology_governance', 'framework_meta_gov']
  }
];

export const technologyOSRelationships: GgfRelationship[] = [
  // === CORE TECHNOLOGY GOVERNANCE ===
  {
    from: 'framework_technology_governance',
    to: 'council_gtc',
    type: 'ESTABLISHES',
    description: 'TGIF establishes Global Technology Council as primary governance body for technology oversight',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_technology_governance',
    to: 'framework_aethelred_accord',
    type: 'GUIDES',
    description: 'TGIF provides parent governance principles for specialized tech frameworks like Aethelred Accord',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO META-GOVERNANCE ===
  {
    from: 'council_gtc',
    to: 'council_mgcc',
    type: 'REPORTS_TO',
    description: 'Global Technology Council operates within Meta-Governance architecture',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO DATA OS ===
  {
    from: 'framework_technology_governance',
    to: 'framework_aurora_accord',
    type: 'INTEGRATES_WITH',
    description: 'TGIF coordinates with Aurora Accord on all data-related technology governance matters',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO HUMAN FLOURISHING ===
  {
    from: 'framework_aethelred_accord',
    to: 'framework_global_health',
    type: 'COORDINATES_WITH',
    description: 'Synthetic biology governance coordinates with global health systems on biotech applications',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_technology_governance',
    to: 'framework_synoptic',
    type: 'COORDINATES_WITH',
    description: 'TGIF coordinates with Synoptic Protocol on AI ethics and algorithmic transparency',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO ETHICAL OS ===
  {
    from: 'framework_indigenous',
    to: 'framework_technology_governance',
    type: 'GUIDES',
    description: 'Provides the ethical guardrails and sovereignty protocols for any technology, including "Indigenous AI Oracles," that interacts with or is trained on Traditional Ecological Knowledge (TEK).',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_technology_governance',
    to: 'framework_mos',
    type: 'IMPLEMENTS',
    description: 'TGIF implements MOS rights principles for AI consciousness assessment and digital entity rights',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_gtc',
    to: 'council_earth',
    type: 'COORDINATES_WITH',
    description: 'GTC consults with Earth Council on technology impacts on Indigenous communities and natural systems',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO JUSTICE OS ===
  {
    from: 'framework_technology_governance',
    to: 'institution_dj_tribunal',
    type: 'ESCALATES_TO',
    description: 'Technology governance violations and AI rights cases escalated to Digital Justice Tribunal',
    strength: 'Medium',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },

  // === CONNECTIONS TO ECONOMIC OS ===
  {
    from: 'framework_aethelred_accord',
    to: 'framework_gaian_trade',
    type: 'INFORMS',
    description: 'Synthetic biology governance informs biotechnology trade standards and ethical supply chains',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO ECOLOGICAL CLUSTER ===
  {
    from: 'framework_aethelred_accord',
    to: 'framework_biodiversity',
    type: 'COORDINATES_WITH',
    description: 'Synthetic biology governance coordinates with biodiversity conservation on genetic modification impacts',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_technology_governance',
    to: 'framework_eco_intel',
    type: 'COLLABORATES_WITH',
    description: 'TGIF collaborates with Eco Intel on environmental monitoring technologies and AI applications',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CONSTITUTIONAL LAYER SUPPORT ===
  {
    from: 'mechanism_gcf',
    to: 'framework_technology_governance',
    type: 'FUNDS',
    description: 'Global Commons Fund supports ethical technology development and governance initiatives',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CROSS-CLUSTER TECHNOLOGY INTEGRATION ===
  {
    from: 'framework_technology_governance',
    to: 'framework_shield',
    type: 'COORDINATES_WITH',
    description: 'TGIF coordinates with Shield Protocol on cybersecurity and AI-enabled crime prevention',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_technology_governance',
    to: 'framework_digital_commons',
    type: 'GUIDES',
    description: 'TGIF provides ethical guidelines for digital commons governance and technology access',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // --- Quantum Lab's role within the Technology OS ---
  {
    from: 'council_gtc',
    to: 'institution_quantum_lab',
    type: 'OVERSEES',
    description: 'The Global Technology Council oversees the work of the Quantum Governance Lab, ensuring its alignment with overall technology ethics.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_quantum_lab',
    to: 'framework_aurora_accord',
    type: 'INFORMS',
    description: 'The Quantum Lab provides the technical standards for the quantum-resistant cybersecurity protocols required by the Aurora Accord.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // --- Quantum Lab's connection to Deep Time Governance ---
  {
    from: 'institution_quantum_lab',
    to: 'framework_deep_time',
    type: 'COLLABORATES_WITH',
    description: 'The Lab collaborates with the Deep Time Governance framework to draft "Causality Preservation Laws" and understand the implications of quantum phenomena on temporal ethics.',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_quantum_lab',
    to: 'institution_dj_tribunal',
    type: 'INFORMS',
    description: 'The Lab provides expert technical testimony to the Digital Justice Tribunal, particularly its "Butterfly Courts" chamber, on matters of causality and temporal mechanics.',
    strength: 'Medium',
    frequency: 'As-Needed',
    sequenceType: 'Parallel'
  },

  // === CONNECTION TO HEARTHSTONE PROTOCOL ===
  {
    from: 'framework_technology_governance',
    to: 'framework_hearthstone',
    type: 'GUIDES',
    description: 'Technology Governance provides the ethical principles for how intangible digital assets, such as AI models, are managed as part of the commons under the Hearthstone Protocol.',
    strength: 'Medium',
    sequenceType: 'Parallel'
  }
];
