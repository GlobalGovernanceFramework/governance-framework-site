// /src/lib/data/schema/cluster.justice-os.ts

import type { GgfEntity, GgfRelationship } from './_types';

/**
 * TIER 1: JUSTICE OPERATING SYSTEM
 * Justice & Peace: Rule of law infrastructure for the entire ecosystem
 */

export const justiceOSEntities: GgfEntity[] = [
  // === PEACE & CONFLICT RESOLUTION FRAMEWORK ===
  {
    id: 'framework_peace',
    type: 'Framework',
    name: 'Peace & Conflict Resolution Framework',
    shortName: 'Peace Framework',
    description: 'Comprehensive framework for values-based conflict transformation',
    tier: 1,
    status: 'Review',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    enables: ['council_gpc', 'process_vbt'],
    ui: {
      path: '/frameworks/peace-and-conflict-resolution',
      titleKey: 'framework.docs.nav.frameworkTitles.peaceAndConflictResolution',
      emoji: '🕊️',
      slug: 'peace-and-conflict-resolution',
      group: 'socialFabricJustice'
    }
  },
  {
    id: 'council_gpc',
    type: 'Council',
    name: 'Global Peace Council',
    shortName: 'Global Peace Council',
    description: 'Oversees global peacebuilding strategy and coordinates mediation efforts',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_peace']
  },
  {
    id: 'process_vbt',
    type: 'Process',
    name: 'Values-Based Transformation',
    shortName: 'Spiral Peacecraft',
    description: 'Core methodology for diagnosing and resolving conflicts based on developmental stages',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_peace']
  },
  {
    id: 'institution_rrt_peace',
    type: 'Institution',
    name: 'Rapid Response Peace Teams',
    shortName: 'Peace Teams',
    description: 'Teams of trained mediators deployed to de-escalate active crises',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_peace', 'process_vbt']
  },
  {
    id: 'process_trc',
    type: 'Process',
    name: 'Truth and Reconciliation Process',
    shortName: 'Truth & Reconciliation',
    description: 'Community-led processes for post-conflict healing and transitional justice',
    tier: 1,
    status: 'Pilot',
    primaryDomain: 'Justice',
    geographicScope: 'Regional',
    implementationPriority: 'High',
    dependencies: ['framework_peace']
  },

  // === JUSTICE SYSTEMS IMPLEMENTATION FRAMEWORK ===
  {
    id: 'framework_justice',
    type: 'Framework',
    name: 'Justice Systems Implementation Framework',
    shortName: 'Justice Systems',
    description: 'Comprehensive framework for equitable global justice systems',
    tier: 1,
    status: 'Review',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_treaty', 'institution_dj_tribunal'],
    enables: ['institution_gjo', 'institution_cjet'],
    ui: {
      path: '/frameworks/justice-systems',
      titleKey: 'framework.docs.nav.frameworkTitles.justiceSystems',
      emoji: '⚖️',
      slug: 'justice-systems',
      group: 'socialFabricJustice'
    }
  },
  {
    id: 'institution_gjo',
    type: 'Institution',
    name: 'Global Justice Oversight Body',
    shortName: 'Global Justice Oversight',
    description: 'Oversees global justice system implementation, develops policy, monitors compliance',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_justice']
  },
  {
    id: 'institution_cjet',
    type: 'Institution',
    name: 'Climate and Ecological Justice Tribunals',
    shortName: 'Ecological Justice Tribunals',
    description: 'Specialized chamber of Digital Justice Tribunal for ecocide cases',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_justice', 'institution_dj_tribunal']
  },

  // === THE SHIELD PROTOCOL ===
  {
    id: 'framework_shield',
    type: 'Framework',
    name: 'The Shield Protocol',
    shortName: 'Shield Protocol',
    description: 'Framework for eradicating transnational crime',
    tier: 1,
    status: 'Planned',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_treaty', 'institution_gem'],
    enables: ['council_tsc', 'institution_gcic', 'institution_getf'],
    ui: {
      path: '/frameworks/the-shield-protocol',
      titleKey: 'framework.docs.nav.frameworkTitles.transnationalCrimeAndSecurity',
      emoji: '🛡️',
      slug: 'the-shield-protocol',
      group: 'socialFabricJustice'
    }
  },
  {
    id: 'council_tsc',
    type: 'Council',
    name: 'Transnational Security Council',
    shortName: 'Security Council',
    description: 'Specialized Meta-Governance Council overseeing transnational threats',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_shield']
  },
  {
    id: 'institution_gcic',
    type: 'Institution',
    name: 'Global Crime Intelligence Center',
    shortName: 'GCIC',
    description: 'Hub for intelligence fusion and analysis to counter criminal threats',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_shield']
  },
  {
    id: 'institution_getf',
    type: 'Institution',
    name: 'Global Enforcement Task Force',
    shortName: 'GETF',
    description: 'Operational enforcement arm conducting poly-jurisdictional operations',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_shield', 'institution_gem']
  }
];

export const justiceOSRelationships: GgfRelationship[] = [
  // === PEACE -> JUSTICE -> ENFORCEMENT FLOW ===
  {
    from: 'framework_peace',
    to: 'framework_justice',
    type: 'ESCALATES_TO',
    description: 'Unresolved conflicts from Peace Framework escalated to Justice Systems',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },
  {
    from: 'framework_justice',
    to: 'framework_shield',
    type: 'ESCALATES_TO',
    description: 'Criminal matters from Justice Systems escalated to Shield Protocol',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Conditional'
  },
  {
    from: 'institution_gjo',
    to: 'framework_shield',
    type: 'DELEGATES_TO',
    description: 'Global Justice Oversight delegates enforcement to Shield Protocol',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === INTERNAL PEACE FRAMEWORK RELATIONSHIPS ===
  {
    from: 'framework_peace',
    to: 'council_gpc',
    type: 'ESTABLISHES',
    description: 'Peace Framework establishes Global Peace Council',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_peace',
    to: 'process_vbt',
    type: 'ESTABLISHES',
    description: 'Peace Framework establishes Values-Based Transformation methodology',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'council_gpc',
    to: 'process_vbt',
    type: 'OVERSEES',
    description: 'Global Peace Council oversees VBT methodology development',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'process_vbt',
    to: 'institution_rrt_peace',
    type: 'GUIDES',
    description: 'VBT methodology guides Rapid Response Peace Teams',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'process_trc',
    to: 'framework_justice',
    type: 'COLLABORATES_WITH',
    description: 'Truth & Reconciliation complements formal justice system',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === INTERNAL JUSTICE FRAMEWORK RELATIONSHIPS ===
  {
    from: 'framework_justice',
    to: 'institution_gjo',
    type: 'ESTABLISHES',
    description: 'Justice Framework establishes Global Justice Oversight Body',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_justice',
    to: 'institution_cjet',
    type: 'ESTABLISHES',
    description: 'Justice Framework establishes Climate & Ecological Justice Tribunals',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'institution_gjo',
    to: 'institution_cjet',
    type: 'OVERSEES',
    description: 'Global Justice Oversight coordinates Ecological Justice Tribunals',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'protocol_mos_rights',
    to: 'framework_justice',
    type: 'GUIDES',
    description: 'MOS Rights Spectrum provides ethical foundation for justice systems',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },

  // === INTERNAL SHIELD PROTOCOL RELATIONSHIPS ===
  {
    from: 'framework_shield',
    to: 'council_tsc',
    type: 'ESTABLISHES',
    description: 'Shield Protocol establishes Transnational Security Council',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_shield',
    to: 'institution_gcic',
    type: 'ESTABLISHES',
    description: 'Shield Protocol establishes Global Crime Intelligence Center',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_shield',
    to: 'institution_getf',
    type: 'ESTABLISHES',
    description: 'Shield Protocol establishes Global Enforcement Task Force',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'council_tsc',
    to: 'institution_getf',
    type: 'OVERSEES',
    description: 'Transnational Security Council directs GETF operations',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_tsc',
    to: 'institution_gcic',
    type: 'OVERSEES',
    description: 'Transnational Security Council provides strategic direction to GCIC',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_gcic',
    to: 'institution_getf',
    type: 'INFORMS',
    description: 'GCIC intelligence guides GETF operational priorities',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO CONSTITUTIONAL LAYER ===
  {
    from: 'institution_dj_tribunal',
    to: 'framework_justice',
    type: 'IMPLEMENTS',
    description: 'Justice Framework operationalizes Digital Justice Tribunal',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_dj_tribunal',
    to: 'institution_cjet',
    type: 'ESTABLISHES',
    description: 'Digital Justice Tribunal establishes Ecological Justice chamber',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'institution_getf',
    to: 'institution_gem',
    type: 'IMPLEMENTS',
    description: 'GETF operates as specialized unit within Global Enforcement Mechanism',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO META-GOVERNANCE ===
  {
    from: 'council_gpc',
    to: 'council_mgcc',
    type: 'COORDINATES_WITH',
    description: 'Global Peace Council operates within Meta-Governance architecture',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_tsc',
    to: 'council_mgcc',
    type: 'COORDINATES_WITH',
    description: 'Transnational Security Council operates within Meta-Governance architecture',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO INDIGENOUS FRAMEWORK ===
  {
    from: 'framework_peace',
    to: 'framework_indigenous',
    type: 'COLLABORATES_WITH',
    description: 'Peace Framework defers to Indigenous tribunals and uses FPIC 2.0',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_peace',
    to: 'institution_baz',
    type: 'IMPLEMENTS',
    description: 'Values-Based Transformation implemented through BAZ-led mediation',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO AURORA ACCORD ===
  {
    from: 'framework_shield',
    to: 'framework_aurora_accord',
    type: 'ENFORCES',
    description: 'The Shield Protocol investigates and prosecutes major violations of the Aurora Accord\'s cybersecurity mandates, particularly attacks on Indigenous data sovereignty.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },

  // === FUNDING CONNECTIONS ===
  {
    from: 'mechanism_gcf',
    to: 'framework_peace',
    type: 'FUNDS',
    description: 'Global Commons Fund provides resources for peacebuilding initiatives',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'mechanism_gcf',
    to: 'framework_justice',
    type: 'FUNDS',
    description: 'Global Commons Fund finances justice system implementation',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'mechanism_gcf',
    to: 'framework_shield',
    type: 'FUNDS',
    description: 'Global Commons Fund provides resources for transnational crime prevention',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  }
];
