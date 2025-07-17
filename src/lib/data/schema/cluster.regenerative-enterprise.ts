// /src/lib/data/schema/cluster.regenerative-enterprise.ts

import type { GgfEntity, GgfRelationship } from './_types';

/**
 * TIER 1: REGENERATIVE ENTERPRISE CLUSTER
 * Voluntary framework for transforming corporate purpose to align with planetary well-being
 * Bridges corporate transformation with GGF ecosystem integration
 */

export const regenerativeEnterpriseEntities: GgfEntity[] = [
  // === CORE FRAMEWORK ===
  {
    id: 'framework_regenerative_enterprise',
    type: 'Framework',
    name: 'Regenerative Enterprise Framework',
    shortName: 'REF',
    description: 'Voluntary framework for aligning corporate purpose with planetary well-being through six-module transformation system',
    tier: 2,
    status: 'Ready',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_aubi', 'framework_gaian_trade', 'framework_aurora_accord', 'framework_work_liberation'],
    enables: ['process_pathfinder_program', 'institution_regeneration_audit_council', 'mechanism_ref_certification'],
    ui: {
      path: '/frameworks/regenerative-enterprise',
      titleKey: 'framework.docs.nav.frameworkTitles.regenerativeEnterprise',
      emoji: '✨',
      version: '1.0',
      slug: 'regenerative-enterprise',
      group: 'globalEconomicSystems'
    }
  },

  // === GOVERNANCE COUNCILS ===
  {
    id: 'council_stakeholder',
    type: 'Council',
    name: 'Stakeholder Council',
    shortName: 'Stakeholder Council',
    description: 'Multi-stakeholder governance body within regenerative enterprises including employees, communities, and ecological representatives',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Institutional',
    implementationPriority: 'Critical',
    dependencies: ['framework_regenerative_enterprise']
  },

  {
    id: 'council_turing',
    type: 'Council',
    name: 'Turing Council',
    shortName: 'Turing Council',
    description: 'Enterprise-level ethical AI governance body ensuring human-AI symbiosis and algorithmic accountability',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Technology',
    geographicScope: 'Institutional',
    implementationPriority: 'High',
    dependencies: ['framework_regenerative_enterprise', 'framework_aurora_accord']
  },

  // === SPECIALIZED INSTITUTIONS ===
  {
    id: 'institution_regeneration_audit_council',
    type: 'Institution',
    name: 'Regeneration Audit Council',
    shortName: 'Regeneration Audit Council',
    description: 'GGF body overseeing REF certification and maturity model validation with equitable stakeholder representation',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_regenerative_enterprise']
  },

  {
    id: 'institution_community_ecology_panel',
    type: 'Institution',
    name: 'Community & Ecology Review Panel',
    shortName: 'Community Review Panel',
    description: 'Local stakeholder body reviewing corporate impact, evolving into Joint BAZ-Corporate Review Board',
    tier: 1,
    status: 'Pilot',
    primaryDomain: 'Governance',
    geographicScope: 'Regional',
    implementationPriority: 'Medium',
    dependencies: ['framework_regenerative_enterprise']
  },

  // === PROCESSES & PROTOCOLS ===
  {
    id: 'process_pathfinder_program',
    type: 'Process',
    name: 'Pathfinder Program',
    shortName: 'Pathfinder Program',
    description: 'Five-phase implementation pathway for enterprise transformation from exploration to systemic leadership',
    tier: 1,
    status: 'Ready',
    primaryDomain: 'Economic',
    geographicScope: 'Institutional',
    implementationPriority: 'Critical',
    dependencies: ['framework_regenerative_enterprise']
  },

  {
    id: 'protocol_human_ai_conflict',
    type: 'LegalProtocol',
    name: 'Human-AI Conflict Resolution Protocol',
    shortName: 'AI Conflict Resolution',
    description: 'Procedural mechanism for addressing AI-related harms with escalation to GGF justice systems',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Technology',
    geographicScope: 'Institutional',
    implementationPriority: 'High',
    dependencies: ['framework_regenerative_enterprise', 'framework_aurora_accord']
  },

  {
    id: 'protocol_annual_review_adaptation',
    type: 'Process',
    name: 'Annual Review & Adaptation Protocol',
    shortName: 'Annual Review Protocol',
    description: 'Living document evolution process with equitable stakeholder representation and feedback integration',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_regenerative_enterprise']
  },

  // === TOOLS & MECHANISMS ===
  {
    id: 'mechanism_ref_certification',
    type: 'DataMetric',
    name: 'REF Certification System',
    shortName: 'REF Certification',
    description: 'Three-tier maturity model: Exploring, Integrating, Leading with comprehensive impact metrics',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_regenerative_enterprise']
  },

  {
    id: 'tool_regenerative_investment_thesis',
    type: 'Tool',
    name: 'Regenerative Investment Thesis Template',
    shortName: 'Investment Thesis Template',
    description: 'Standardized template for pitching Return on Regeneration to impact investors',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Economic',
    geographicScope: 'Institutional',
    implementationPriority: 'High',
    dependencies: ['framework_regenerative_enterprise']
  },

  {
    id: 'tool_digital_product_passport',
    type: 'Tool',
    name: 'Digital Product Passport',
    shortName: 'Digital Product Passport',
    description: 'Blockchain-based tracking system for product lifecycle, ecological impact, and labor conditions',
    tier: 1,
    status: 'Pilot',
    primaryDomain: 'Technology',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_regenerative_enterprise', 'framework_gaian_trade']
  },

  // === DATA METRICS ===
  {
    id: 'metric_reparations_index',
    type: 'DataMetric',
    name: 'Reparations Index',
    shortName: 'Reparations Index',
    description: 'Percentage of profits allocated to impacted communities, weighted higher for extractive industries',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Justice',
    geographicScope: 'Institutional',
    implementationPriority: 'High',
    dependencies: ['framework_regenerative_enterprise']
  },

  {
    id: 'metric_intergenerational_equity',
    type: 'DataMetric',
    name: 'Intergenerational Equity Score',
    shortName: 'Intergenerational Equity Score',
    description: 'Long-term impact assessment audited by Guardians of the Future',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Institutional',
    implementationPriority: 'Medium',
    dependencies: ['framework_regenerative_enterprise', 'framework_youth']
  }
];

export const regenerativeEnterpriseRelationships: GgfRelationship[] = [
  // === DEPENDENCIES ON OTHER FRAMEWORKS ===
  {
    from: 'framework_aubi',
    to: 'framework_regenerative_enterprise',
    type: 'ENABLES',
    description: 'AUBI provides Hearts/Leaves currency system that REF enterprises use for equitable value distribution',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  
  {
    from: 'framework_gaian_trade',
    to: 'framework_regenerative_enterprise',
    type: 'ENABLES',
    description: 'Gaian Trade provides Digital Product Passports and regenerative trade zone frameworks for REF operations',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },

  {
    from: 'framework_aurora_accord',
    to: 'framework_regenerative_enterprise',
    type: 'GUIDES',
    description: 'Aurora Accord provides data governance standards for REF digital infrastructure and AI ethics',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },

  {
    from: 'framework_work_liberation',
    to: 'framework_regenerative_enterprise',
    type: 'CERTIFIES',
    description: 'Work in Liberation provides human flourishing certification and Green Job Score metrics for REF enterprises',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === INTERNAL REF RELATIONSHIPS ===
  {
    from: 'framework_regenerative_enterprise',
    to: 'process_pathfinder_program',
    type: 'ESTABLISHES',
    description: 'REF establishes Pathfinder Program as primary implementation pathway',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },

  {
    from: 'framework_regenerative_enterprise',
    to: 'institution_regeneration_audit_council',
    type: 'ESTABLISHES',
    description: 'REF establishes Regeneration Audit Council for certification oversight',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },

  {
    from: 'framework_regenerative_enterprise',
    to: 'council_stakeholder',
    type: 'ESTABLISHES',
    description: 'REF establishes Stakeholder Councils as core governance mechanism in enterprises',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },

  {
    from: 'framework_regenerative_enterprise',
    to: 'council_turing',
    type: 'ESTABLISHES',
    description: 'REF establishes Turing Councils for ethical AI governance within enterprises',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },

  // === CERTIFICATION AND OVERSIGHT ===
  {
    from: 'institution_regeneration_audit_council',
    to: 'mechanism_ref_certification',
    type: 'OVERSEES',
    description: 'Regeneration Audit Council manages REF certification system and maturity model validation',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  {
    from: 'protocol_annual_review_adaptation',
    to: 'institution_regeneration_audit_council',
    type: 'IMPLEMENTS',
    description: 'Annual Review Protocol is managed by Regeneration Audit Council for framework evolution',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === TECHNOLOGY INTEGRATION ===
  {
    from: 'council_turing',
    to: 'protocol_human_ai_conflict',
    type: 'IMPLEMENTS',
    description: 'Turing Councils implement Human-AI Conflict Resolution Protocol within enterprises',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Parallel'
  },

  {
    from: 'tool_digital_product_passport',
    to: 'framework_gaian_trade',
    type: 'IMPLEMENTS',
    description: 'Digital Product Passports implement Gaian Trade standards for supply chain transparency',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO GGF JUSTICE SYSTEMS ===
  {
    from: 'protocol_human_ai_conflict',
    to: 'institution_dj_tribunal',
    type: 'ESCALATES_TO',
    description: 'AI conflict resolution escalates to Digital Justice Tribunal for complex adjudication',
    strength: 'Medium',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },

  // === BIOREGIONAL INTEGRATION ===
  {
    from: 'institution_community_ecology_panel',
    to: 'institution_baz',
    type: 'EVOLVES_INTO',
    description: 'Community Review Panels evolve into Joint BAZ-Corporate Review Boards when BAZs become operational',
    strength: 'Medium',
    frequency: 'As-Needed',
    sequenceType: 'Sequential'
  },

  // === ECONOMIC SYSTEM INTEGRATION ===
  {
    from: 'mechanism_hearts',
    to: 'framework_regenerative_enterprise',
    type: 'REWARDS',
    description: 'REF enterprises create conditions for employees and communities to earn Hearts currency through care work',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  {
    from: 'mechanism_leaves',
    to: 'framework_regenerative_enterprise',
    type: 'REWARDS',
    description: 'REF enterprises generate Leaves currency through ecological restoration and stewardship activities',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === METRICS AND MEASUREMENT ===
  {
    from: 'metric_lmci',
    to: 'framework_regenerative_enterprise',
    type: 'MEASURES',
    description: 'LMCI provides primary well-being metric for REF enterprise transformation tracking',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  {
    from: 'metric_reparations_index',
    to: 'framework_indigenous',
    type: 'IMPLEMENTS',
    description: 'Reparations Index implements Indigenous framework principles for community benefit distribution',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === RELATIONSHIP FOR HEARTHSTONE PROTOCOL ===
  {
    from: 'framework_regenerative_enterprise',
    to: 'framework_hearthstone',
    type: 'COLLABORATES_WITH',
    description: 'The REF provides the "Corporate Co-op Conversion Process" that allows certified enterprises to voluntarily transition their assets into Stewardship Trusts under the Hearthstone Protocol.',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  }
];
