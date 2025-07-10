// /src/lib/data/schema/cluster.ethical-os.ts

import type { GgfEntity, GgfRelationship } from './_types';

/**
 * TIER 1: ETHICAL OPERATING SYSTEM
 * Indigenous Framework: The heart providing ethical compass and philosophical foundation
 */

export const ethicalOSEntities: GgfEntity[] = [
  {
    id: 'framework_indigenous',
    type: 'Framework',
    name: 'Indigenous & Traditional Knowledge Governance Framework',
    shortName: 'Indigenous Framework',
    description: 'Ethical guidance framework centering Indigenous sovereignty and TEK',
    tier: 1,
    status: 'Review',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    enables: ['council_earth', 'institution_baz', 'protocol_fpic2'],
    ui: {
      path: '/frameworks/indigenous-governance-and-traditional-knowledge',
      titleKey: 'framework.docs.nav.frameworkTitles.indigenousGovernanceAndTraditionalKnowledge',
      emoji: '🪶',
      slug: 'indigenous-governance-and-traditional-knowledge',
      group: 'socialFabricJustice'
    }
  },
  {
    id: 'council_earth',
    type: 'Council',
    name: 'Earth Council (Kawsay Pacha)',
    shortName: 'Earth Council',
    description: 'Provides moral authority and planetary coordination based on TEK',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_indigenous']
  },
  {
    id: 'institution_baz',
    type: 'Institution',
    name: 'Bioregional Autonomous Zones',
    shortName: 'BAZs',
    description: 'Indigenous-led governance systems based on ecosystem boundaries',
    tier: 1,
    status: 'Pilot',
    primaryDomain: 'Governance',
    geographicScope: 'Regional',
    implementationPriority: 'Critical',
    dependencies: ['framework_indigenous']
  },
  {
    id: 'protocol_fpic2',
    type: 'LegalProtocol',
    name: 'Free, Prior, and Informed Consent 2.0',
    shortName: 'FPIC 2.0',
    description: 'Enhanced consent protocol with veto power for Indigenous communities',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Justice',
    geographicScope: 'Regional',
    implementationPriority: 'Critical',
    dependencies: ['framework_indigenous']
  },
  {
    id: 'framework_mos',
    type: 'Framework',
    name: 'Moral Operating System',
    shortName: 'MOS',
    description: 'The core ethical and legal framework for the GGF, defining the rights and responsibilities of all beings across the spectrum of consciousness via the Dynamic Rights Spectrum.',
    tier: 1,
    status: 'Review',
    primaryDomain: 'Ethics',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_treaty', 'framework_indigenous', 'framework_meta_gov'],
    ui: {
      path: '/frameworks/moral-operating-system',
      titleKey: 'framework.docs.nav.frameworkTitles.moralOperatingSystem',
      emoji: '🦋',
      slug: 'moral-operating-system'
    }
  }
];

export const ethicalOSRelationships: GgfRelationship[] = [
  // === ETHICAL GUIDANCE TO OTHER CORE SYSTEMS ===
  {
    from: 'framework_indigenous',
    to: 'framework_treaty',
    type: 'INFORMS',
    description: 'Indigenous principles of Rights of Nature and sovereignty foundational to Treaty legal reforms',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_indigenous',
    to: 'framework_meta_gov',
    type: 'GUIDES',
    description: 'Meta-Governance coordination must respect Indigenous protocols and sovereignty',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  
  // === INTERNAL ETHICAL OS RELATIONSHIPS ===
  {
    from: 'framework_indigenous',
    to: 'council_earth',
    type: 'ESTABLISHES',
    description: 'Indigenous Framework establishes Earth Council as moral authority',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_indigenous',
    to: 'institution_baz',
    type: 'ESTABLISHES',
    description: 'Indigenous Framework establishes BAZs as primary governance institution',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_indigenous',
    to: 'protocol_fpic2',
    type: 'ESTABLISHES',
    description: 'Indigenous Framework establishes enhanced FPIC protocols',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_indigenous',
    to: 'framework_mos',
    type: 'ESTABLISHES',
    description: 'Indigenous Framework provides foundation for MOS Rights Spectrum',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  
  // === EARTH COUNCIL OVERSIGHT ===
  {
    from: 'council_earth',
    to: 'council_mgcc',
    type: 'OVERSEES',
    description: 'Earth Council holds moral and ethical oversight over MGCC coordination',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_earth',
    to: 'institution_baz',
    type: 'OVERSEES',
    description: 'Earth Council provides guidance and oversight to BAZ governance',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  
  // === BAZ IMPLEMENTATION ===
  {
    from: 'protocol_fpic2',
    to: 'institution_baz',
    type: 'IMPLEMENTS',
    description: 'BAZs are the primary institution for implementing FPIC 2.0',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_mgcc',
    to: 'institution_baz',
    type: 'DELEGATES_TO',
    description: 'Following subsidiarity, MGCC delegates local governance to BAZs',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  }
];
