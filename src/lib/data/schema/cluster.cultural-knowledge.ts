// /src/lib/data/schema/cluster.cultural-knowledge.ts

import type { GgfEntity, GgfRelationship } from './_types';

/**
 * TIER 3-4: CULTURAL & KNOWLEDGE COMMONS CLUSTER
 * The "soul" of the GGF - systems for preserving heritage, fostering dialogue, 
 * sharing knowledge, and cultivating wisdom needed to govern effectively
 */

export const culturalKnowledgeEntities: GgfEntity[] = [
  // === TIER 3: CULTURAL & KNOWLEDGE FRAMEWORKS ===
  {
    id: 'framework_cultural_heritage',
    type: 'Framework',
    name: 'Cultural Heritage Preservation Framework (Project Tapestry)',
    shortName: 'Cultural Heritage',
    description: 'Framework for preserving and protecting cultural heritage globally',
    tier: 3,
    status: 'Planned',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_digital_commons', 'framework_meta_gov'],
    enables: ['council_cawc', 'institution_cst', 'tool_cv_index'],
    ui: {
      path: '/frameworks/cultural-heritage-preservation',
      titleKey: 'framework.docs.nav.frameworkTitles.culturalHeritagePreservation',
      emoji: '🏛️',
      slug: 'cultural-heritage-preservation'
    }
  },
  {
    id: 'framework_digital_commons',
    type: 'Framework',
    name: 'Digital Commons Framework',
    shortName: 'Digital Commons',
    description: 'Knowledge commons preservation and democratic access to information, with specific protocols and decentralized infrastructure for protecting Traditional Ecological Knowledge (TEK) under the principles of Indigenous data sovereignty.',
    tier: 3,
    status: 'Review',
    primaryDomain: 'Technology',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_aurora_accord', 'framework_educational_systems'],
    enables: ['council_dcc', 'institution_lcn'],
    ui: {
      path: '/frameworks/digital-commons',
      titleKey: 'framework.docs.nav.frameworkTitles.digitalCommons',
      emoji: '💻',
      slug: 'digital-commons'
    }
  },
  {
    id: 'framework_religious_dialogue',
    type: 'Framework',
    name: 'Religious & Spiritual Dialogue Governance Framework',
    shortName: 'Spiritual Dialogue',
    description: 'Framework for interfaith dialogue and spiritual governance',
    tier: 3,
    status: 'Review',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_cultural_heritage'],
    ui: {
      path: '/frameworks/religious-and-spiritual-dialogue-governance',
      titleKey: 'framework.docs.nav.frameworkTitles.religiousAndSpiritualDialogueGovernance',
      emoji: '🕯️',
      slug: 'religious-and-spiritual-dialogue-governance'
    }
  },
  {
    id: 'framework_global_citizenship',
    type: 'Framework',
    name: 'Global Citizenship Practice Framework',
    shortName: 'Global Citizenship',
    description: 'Framework for global citizenship education and practice, fostering responsible planetary stewardship',
    tier: 3,
    status: 'Review',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_education'],
    ui: {
      path: '/frameworks/global-citizenship-practice',
      titleKey: 'framework.docs.nav.frameworkTitles.globalCitizenshipPractice',
      emoji: '🤝',
      slug: 'global-citizenship-practice'
    }
  },

  // === TIER 4: WISDOM & CONSCIOUSNESS FRAMEWORKS ===
  {
    id: 'framework_inner_dev',
    type: 'Framework',
    name: 'Inner Development & Leadership Protocol',
    shortName: 'IDLP',
    description: 'Protocol for embedding consciousness and ethical leadership across the GGF',
    tier: 4,
    status: 'Review',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_digital_commons'],
    enables: ['process_clp'],
    ui: {
      path: '/frameworks/consciousness-and-inner-development',
      titleKey: 'framework.docs.nav.frameworkTitles.consciousnessAndInnerDevelopment',
      emoji: '🧘',
      slug: 'consciousness-and-inner-development'
    }
  },
  {
    id: 'framework_wdmip',
    type: 'Framework',
    name: 'Wise Decision-Making & Integration Protocol',
    shortName: 'WDIP',
    description: 'Universal methodology providing the "How" for wise decision-making across the GGF',
    tier: 4,
    status: 'Review',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_meta_gov'],
    enables: ['process_ets'],
    ui: {
      path: '/frameworks/wise-decision-making-protocol',
      titleKey: 'framework.docs.nav.frameworkTitles.wiseDecisionMakingProtocol',
      emoji: '🧭',
      slug: 'wise-decision-making-protocol'
    }
  },

  // === GOVERNANCE COUNCILS ===
  {
    id: 'council_cawc',
    type: 'Council',
    name: 'Cultural & Ancestral Wisdom Council',
    shortName: 'CAWC',
    description: 'Meta-Governance council defining cultural preservation standards and ancestral wisdom integration',
    tier: 3,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_cultural_heritage', 'framework_meta_gov']
  },
  {
    id: 'council_dcc',
    type: 'Council',
    name: 'Digital Commons Council',
    shortName: 'DCC',
    description: 'Sub-council governing shared digital resources and knowledge commons',
    tier: 3,
    status: 'Proposed',
    primaryDomain: 'Technology',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_digital_commons', 'framework_aurora_accord']
  },

  // === SPECIALIZED INSTITUTIONS ===
  {
    id: 'institution_cst',
    type: 'Institution',
    name: 'Cultural Stewardship Teams',
    shortName: 'CSTs',
    description: 'Community Work Teams focused on cultural preservation within BAZs',
    tier: 3,
    status: 'Pilot',
    primaryDomain: 'Governance',
    geographicScope: 'Regional',
    implementationPriority: 'Medium',
    dependencies: ['framework_cultural_heritage', 'framework_work_liberation', 'institution_baz']
  },
  {
    id: 'institution_lcn',
    type: 'Institution',
    name: 'Local Citizen Nodes',
    shortName: 'Local Nodes',
    description: 'Community-driven bodies for local governance of the Digital Commons',
    tier: 3,
    status: 'Proposed',
    primaryDomain: 'Technology',
    geographicScope: 'Local',
    implementationPriority: 'Medium',
    dependencies: ['framework_digital_commons', 'institution_baz']
  },

  // === PROCESSES & TOOLS ===
  {
    id: 'process_clp',
    type: 'Process',
    name: 'Conscious Leadership Program',
    shortName: 'CLP',
    description: 'Mandatory training for all Meta-Governance council members integrating consciousness development',
    tier: 4,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_inner_dev']
  },
  {
    id: 'process_ets',
    type: 'Process',
    name: 'Ethical Stress-Testing',
    shortName: 'ETS',
    description: 'WDIP methodology for evaluating complex decisions against MOS principles',
    tier: 4,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_wdmip', 'framework_mos']
  },
  {
    id: 'tool_cv_index',
    type: 'DataMetric',
    name: 'Cultural Vitality Index',
    shortName: 'CV Index',
    description: 'Measures cultural health including language preservation, traditional practices, and community engagement',
    tier: 3,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Regional',
    implementationPriority: 'Medium',
    dependencies: ['framework_cultural_heritage']
  }
];

export const culturalKnowledgeRelationships: GgfRelationship[] = [
  // === INTERNAL CLUSTER INTEGRATION ===
  {
    from: 'framework_cultural_heritage',
    to: 'framework_digital_commons',
    type: 'USES_DATA_FROM',
    description: 'Cultural heritage preserved in quantum-safe decentralized archives managed by Digital Commons',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_cawc',
    to: 'council_dcc',
    type: 'COORDINATES_WITH',
    description: 'CAWC and DCC coordinate on standards for ethical access to digital cultural heritage',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_inner_dev',
    to: 'framework_wdmip',
    type: 'INFORMS',
    description: 'IDLP provides the "Who" (conscious leader) needed to properly execute WDIP\'s "How" (wise process)',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_religious_dialogue',
    to: 'council_cawc',
    type: 'INFORMS',
    description: 'Spiritual Dialogue framework provides protocols and insights to CAWC',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_global_citizenship',
    to: 'framework_education',
    type: 'COLLABORATES_WITH',
    description: 'Global Citizenship practice is integrated into educational curricula and civic education programs',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },

  // === FRAMEWORK ESTABLISHMENT OF ENTITIES ===
  {
    from: 'framework_cultural_heritage',
    to: 'council_cawc',
    type: 'ESTABLISHES',
    description: 'Cultural Heritage framework establishes CAWC as governance body for cultural preservation',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_cultural_heritage',
    to: 'institution_cst',
    type: 'ESTABLISHES',
    description: 'Cultural Heritage framework establishes Cultural Stewardship Teams as implementation mechanism',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_digital_commons',
    to: 'council_dcc',
    type: 'ESTABLISHES',
    description: 'Digital Commons framework establishes DCC as governance body for shared digital resources',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_digital_commons',
    to: 'institution_lcn',
    type: 'ESTABLISHES',
    description: 'Digital Commons framework establishes Local Citizen Nodes for community governance',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_wdmip',
    to: 'process_ets',
    type: 'ESTABLISHES',
    description: 'WDIP establishes Ethical Stress-Testing as core decision-making methodology',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_inner_dev',
    to: 'process_clp',
    type: 'ESTABLISHES',
    description: 'IDLP establishes Conscious Leadership Program as mandatory training',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },

  // === CONNECTIONS TO ETHICAL OS ===
  {
    from: 'framework_indigenous',
    to: 'framework_digital_commons',
    type: 'GUIDES',
    description: 'The Indigenous Framework provides the core ethical protocols for how the Digital Commons must steward and protect Traditional Ecological Knowledge (TEK).',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_cawc',
    to: 'council_earth',
    type: 'REPORTS_TO',
    description: 'CAWC operates under moral authority and guidance of Earth Council',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_cst',
    to: 'institution_baz',
    type: 'IMPLEMENTS',
    description: 'Cultural Stewardship Teams operate within BAZ governance structures',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_lcn',
    to: 'institution_baz',
    type: 'IMPLEMENTS',
    description: 'Local Citizen Nodes operate within BAZ structures for Digital Commons governance',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO GOVERNANCE OS ===
  {
    from: 'framework_wdmip',
    to: 'council_mgcc',
    type: 'GUIDES',
    description: 'WDIP provides Standard Operating Procedures for decision-making in all Meta-Governance councils',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'process_clp',
    to: 'council_mgcc',
    type: 'IMPLEMENTS',
    description: 'Conscious Leadership Program is mandatory training for all Meta-Governance council members',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_cawc',
    to: 'council_mgcc',
    type: 'REPORTS_TO',
    description: 'CAWC operates within Meta-Governance architecture',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO JUSTICE OS ===
  {
    from: 'framework_wdmip',
    to: 'institution_dj_tribunal',
    type: 'GUIDES',
    description: 'Digital Justice Tribunal uses WDIP methodologies like Ethical Stress-Testing for complex cases',
    strength: 'Medium',
    frequency: 'As-Needed',
    sequenceType: 'Parallel'
  },
  {
    from: 'process_ets',
    to: 'framework_mos',
    type: 'IMPLEMENTS',
    description: 'Ethical Stress-Testing evaluates decisions against MOS principles and rights spectrum',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO ECONOMIC OS ===
  {
    from: 'institution_cst',
    to: 'framework_work_liberation',
    type: 'IMPLEMENTS',
    description: 'Cultural Stewardship Teams are specialized type of Community Work Team',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_cst',
    to: 'framework_aubi',
    type: 'REWARDS',
    description: 'Cultural preservation work by CSTs is rewarded with Hearts via AUBI system',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'tool_cv_index',
    to: 'framework_aubi',
    type: 'INFORMS',
    description: 'Cultural Vitality Index guides AUBI bonuses and investment decisions',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO HUMAN FLOURISHING ===
  {
    from: 'framework_education',
    to: 'framework_cultural_heritage',
    type: 'COLLABORATES_WITH',
    description: 'Education framework uses resources from Cultural Heritage archives for curricula',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_digital_commons',
    to: 'framework_synoptic',
    type: 'COLLABORATES_WITH',
    description: 'Digital Commons and Synoptic Protocol coordinate on information integrity standards',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_education',
    to: 'framework_global_citizenship',
    type: 'ENABLES',
    description: 'Educational Systems framework provides foundation and curricula for Global Citizenship practice',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },

  // === CONNECTIONS TO DATA OS ===
  {
    from: 'framework_digital_commons',
    to: 'framework_aurora_accord',
    type: 'IMPLEMENTS',
    description: 'Digital Commons implements data governance principles from Aurora Accord',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },

  // === CROSS-TIER WISDOM INTEGRATION ===
  {
    from: 'framework_inner_dev',
    to: 'framework_digital_commons',
    type: 'ENABLES',
    description: 'Consciousness development provides foundation for wise stewardship of knowledge commons',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_cultural_heritage',
    to: 'framework_inner_dev',
    type: 'INFORMS',
    description: 'Traditional wisdom and cultural practices inform consciousness development approaches',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_global_citizenship',
    to: 'framework_meta_gov',
    type: 'INFORMS',
    description: 'Practice of global citizenship informs and strengthens capacity for effective meta-governance',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_global_citizenship',
    to: 'framework_wdmip',
    type: 'BENEFITS_FROM',
    description: 'Global citizenship practice benefits from and implements wise decision-making methodologies',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  }
];
