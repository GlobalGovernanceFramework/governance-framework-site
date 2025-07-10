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
  }
];
