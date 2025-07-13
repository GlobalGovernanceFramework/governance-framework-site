// /src/lib/data/schema/cluster.institutional-regeneration.ts

import type { GgfEntity, GgfRelationship } from './_types';

/**
 * TIER 1: INSTITUTIONAL REGENERATION CLUSTER
 * Practical implementation framework for transforming existing global governance institutions
 * Bridges the gap between high-level treaty reforms and operational institutional reality
 */

export const institutionalRegenerationEntities: GgfEntity[] = [
  // === CORE FRAMEWORK ===
  {
    id: 'framework_institutional_regeneration',
    type: 'Framework',
    name: 'Institutional Regeneration Framework',
    shortName: 'Institutional Regeneration',
    description: 'Comprehensive playbook for evolving existing global governance institutions from bureaucratic inertia to agile, mission-driven service',
    tier: 1,
    status: 'Ready',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_treaty', 'framework_meta_gov', 'mechanism_gcf'],
    enables: ['council_regeneration_audit', 'institution_evolution_cells', 'platform_regeneration_community'],
    ui: {
      path: '/frameworks/institutional-regeneration',
      titleKey: 'framework.docs.nav.frameworkTitles.institutionalRegeneration',
      emoji: '🔄',
      version: '0.8',
      slug: 'institutional-regeneration'
    }
  },

  // === GOVERNANCE COUNCILS ===
  {
    id: 'council_regeneration_audit',
    type: 'Council',
    name: 'Regeneration Audit Council',
    shortName: 'Regeneration Audit Council',
    description: 'Independent oversight body verifying institutional regeneration progress and preventing elite capture',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_institutional_regeneration']
  },

  // === SPECIALIZED INSTITUTIONS ===
  {
    id: 'institution_evolution_cells',
    type: 'Institution',
    name: 'Evolution Cells',
    shortName: 'Evolution Cells',
    description: 'Cross-departmental teams within institutions trained to lead regeneration adoption and continuous reinvention',
    tier: 1,
    status: 'Pilot',
    primaryDomain: 'Governance',
    geographicScope: 'Institutional',
    implementationPriority: 'Critical',
    dependencies: ['framework_institutional_regeneration']
  },

  {
    id: 'institution_ggf_catalyst',
    type: 'Institution',
    name: 'GGF Catalyst',
    shortName: 'GGF Catalyst',
    description: 'Central coordinating body supporting institutional regeneration through training, resources, and community facilitation',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_institutional_regeneration']
  },

  // === PLATFORMS & INFRASTRUCTURE ===
  {
    id: 'platform_regeneration_community',
    type: 'Platform',
    name: 'Regenerative Institutions Community of Practice',
    shortName: 'Regeneration Community',
    description: 'Digital platform hosting Living Knowledge Commons for institutional regeneration practitioners',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Technology',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_institutional_regeneration']
  },

  // === PROCESSES & PROTOCOLS ===
  {
    id: 'process_regeneration_compact',
    type: 'Process',
    name: 'Regeneration Compact',
    shortName: 'Regeneration Compact',
    description: 'Non-binding MOU framework for institutions committing to regeneration principles and GCF funding eligibility',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_institutional_regeneration']
  },

  {
    id: 'process_mandate_audit',
    type: 'Process',
    name: 'Purpose & Mandate Audit',
    shortName: 'Mandate Audit',
    description: 'AI-enabled diagnostic process for assessing institutional relevance and purpose in 21st-century context',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Institutional',
    implementationPriority: 'Critical',
    dependencies: ['framework_institutional_regeneration']
  },

  {
    id: 'process_graceful_sunsetting',
    type: 'Process',
    name: 'Graceful Sunsetting Protocol',
    shortName: 'Graceful Sunsetting',
    description: 'Dignified process for winding down redundant institutions while preserving knowledge and reallocating resources',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Institutional',
    implementationPriority: 'Medium',
    dependencies: ['framework_institutional_regeneration']
  },

  // === TOOLS & MECHANISMS ===
  {
    id: 'tool_governance_upgrade_kit',
    type: 'Tool',
    name: 'Governance Upgrade Kit',
    shortName: 'Governance Upgrade Kit',
    description: 'Library of proven templates for integrating new voices and upgrading decision-making architecture',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Institutional',
    implementationPriority: 'High',
    dependencies: ['framework_institutional_regeneration']
  },

  {
    id: 'tool_cultural_transformation_toolkit',
    type: 'Tool',
    name: 'Cultural Transformation Toolkit',
    shortName: 'Cultural Transformation',
    description: 'Tools for shifting institutional culture from bureaucracy to dynamic, mission-driven service',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Institutional',
    implementationPriority: 'High',
    dependencies: ['framework_institutional_regeneration']
  },

  {
    id: 'mechanism_regeneration_index',
    type: 'DataMetric',
    name: 'Regeneration Index',
    shortName: 'Regeneration Index',
    description: 'Public scorecard measuring institutional regeneration progress for transparency and peer pressure',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_institutional_regeneration']
  }
];

export const institutionalRegenerationRelationships: GgfRelationship[] = [
  // === CONSTITUTIONAL LAYER DEPENDENCIES ===
  {
    from: 'framework_treaty',
    to: 'framework_institutional_regeneration',
    type: 'ENABLES',
    description: 'Treaty provides constitutional framework that Institutional Regeneration operationalizes at institutional level',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },

  // === META-GOVERNANCE INTEGRATION ===
  {
    from: 'framework_meta_gov',
    to: 'framework_institutional_regeneration',
    type: 'GUIDES',
    description: 'Meta-Governance principles of polycentrism and subsidiarity guide institutional regeneration design',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },

  {
    from: 'framework_institutional_regeneration',
    to: 'framework_meta_gov',
    type: 'IMPLEMENTS',
    description: 'Institutional Regeneration provides practical "how-to" for institutions to adopt meta-governance principles',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },

  // === ECONOMIC FUNDING INTEGRATION ===
  {
    from: 'mechanism_gcf',
    to: 'framework_institutional_regeneration',
    type: 'FUNDS',
    description: 'Global Commons Fund provides tiered funding incentives for institutional regeneration adoption',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  {
    from: 'framework_institutional_regeneration',
    to: 'mechanism_gcf',
    type: 'QUALIFIES_FOR',
    description: 'Successful regeneration adoption makes institutions eligible for GCF funding tiers (Bronze, Silver, Gold)',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Sequential'
  },

  // === INTERNAL FRAMEWORK RELATIONSHIPS ===
  {
    from: 'framework_institutional_regeneration',
    to: 'council_regeneration_audit',
    type: 'ESTABLISHES',
    description: 'Framework establishes independent audit council for verification and accountability',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },

  {
    from: 'framework_institutional_regeneration',
    to: 'institution_evolution_cells',
    type: 'ESTABLISHES',
    description: 'Framework creates Evolution Cells as primary implementation mechanism within institutions',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },

  {
    from: 'framework_institutional_regeneration',
    to: 'platform_regeneration_community',
    type: 'ESTABLISHES',
    description: 'Framework creates Community of Practice platform for knowledge sharing and peer support',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },

  {
    from: 'institution_ggf_catalyst',
    to: 'platform_regeneration_community',
    type: 'OVERSEES',
    description: 'GGF Catalyst manages and facilitates the Community of Practice platform',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },

  {
    from: 'institution_evolution_cells',
    to: 'platform_regeneration_community',
    type: 'PARTICIPATES_IN',
    description: 'Evolution Cells form the nodes of the Community of Practice network',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === PROCESS IMPLEMENTATION ===
  {
    from: 'process_regeneration_compact',
    to: 'mechanism_gcf',
    type: 'QUALIFIES_FOR',
    description: 'Signing Regeneration Compact creates pathway to GCF funding eligibility',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Sequential'
  },

  {
    from: 'process_mandate_audit',
    to: 'process_graceful_sunsetting',
    type: 'ENABLES',
    description: 'Mandate audit can identify institutions ready for graceful sunsetting',
    strength: 'Medium',
    frequency: 'As-Needed',
    sequenceType: 'Sequential'
  },

  {
    from: 'tool_governance_upgrade_kit',
    to: 'institution_evolution_cells',
    type: 'GUIDES',
    description: 'Governance Upgrade Kit provides templates and tools for Evolution Cells to implement',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === ACCOUNTABILITY & MONITORING ===
  {
    from: 'council_regeneration_audit',
    to: 'mechanism_regeneration_index',
    type: 'PRODUCES',
    description: 'Audit Council produces data for Regeneration Index public scorecards',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  {
    from: 'mechanism_regeneration_index',
    to: 'mechanism_gcf',
    type: 'INFORMS',
    description: 'Regeneration Index scores inform GCF funding tier decisions',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO OTHER FRAMEWORKS ===
  {
    from: 'framework_institutional_regeneration',
    to: 'framework_indigenous',
    type: 'INTEGRATES_WITH',
    description: 'Governance Upgrade Kit includes templates for Indigenous Council integration and FPIC 2.0 compliance',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  {
    from: 'framework_institutional_regeneration',
    to: 'framework_technology_governance',
    type: 'USES',
    description: 'Framework leverages AI diagnostics and blockchain transparency tools for reform tracking',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  {
    from: 'framework_institutional_regeneration',
    to: 'framework_youth',
    type: 'IMPLEMENTS',
    description: 'Governance Upgrade Kit mandates Youth Advisory Councils with 30% voting power',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO JUSTICE & PEACE SYSTEMS ===
  {
    from: 'framework_institutional_regeneration',
    to: 'framework_peace',
    type: 'COLLABORATES_WITH',
    description: 'Framework includes conflict zone adaptability sub-module co-designed with peacebuilding organizations',
    strength: 'Medium',
    frequency: 'As-Needed',
    sequenceType: 'Parallel'
  },

  // === GLOBAL FEEDBACK INTEGRATION ===
  {
    from: 'platform_regeneration_community',
    to: 'framework_meta_gov',
    type: 'INFORMS',
    description: 'Community of Practice feedback loop informs meta-governance coordination improvements',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  }
];

// === PLACEMENT IN MAIN SCHEMA ===
// This cluster should be added to the main schema index as:

// In allEntities array:
// ...institutionalRegenerationEntities,

// In allRelationships array:  
// ...institutionalRegenerationRelationships,

// In clusters array:
/*
{
  id: 'institutional_regeneration_cluster',
  name: 'Institutional Regeneration System',
  description: 'Practical framework for transforming existing global governance institutions from bureaucratic inertia to agile, mission-driven service',
  tier: 1,
  entities: institutionalRegenerationEntities.map(e => e.id),
  color: '#7c3aed' // Purple for Tier 1
}
*/
