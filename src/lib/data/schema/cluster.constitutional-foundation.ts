// /src/lib/data/schema/cluster.constitutional-foundation.ts

import type { GgfEntity, GgfRelationship } from './_types';

/**
 * TIER 0: CONSTITUTIONAL LAYER
 * The Treaty for Our Only Home - the singular constitutional framework that enables all others
 */

export const constitutionalFoundationEntities: GgfEntity[] = [
  // === THE TREATY FOR OUR ONLY HOME (Hardware) ===
  {
    id: 'framework_treaty',
    type: 'Framework',
    name: 'The Treaty for Our Only Home',
    shortName: 'The Treaty',
    description: 'Core legal framework providing enforcement mechanisms and institutional reforms for global governance',
    tier: 0,
    status: 'Ready',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    enables: ['framework_meta_gov', 'framework_justice', 'framework_shield', 'mechanism_gcf', 'framework_hearthstone'],
    ui: {
      path: '/frameworks/treaty-for-our-only-home',
      titleKey: 'framework.docs.nav.frameworkTitles.treatyForOurOnlyHome',
      emoji: '🌐',
      version: '1.1',
      slug: 'treaty-for-our-only-home'
    }
  },
  {
    id: 'institution_unsc_reformed',
    type: 'Institution',
    name: 'Reformed UN Security Council',
    shortName: 'Reformed UNSC',
    description: 'UNSC with tiered veto override and expanded membership',
    tier: 0,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_treaty']
  },
  {
    id: 'institution_unga_reformed',
    type: 'Institution',
    name: 'Reformed UN General Assembly',
    shortName: 'Reformed UNGA',
    description: 'UNGA with binding resolution powers on crises',
    tier: 0,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_treaty']
  },
  {
    id: 'institution_dj_tribunal',
    type: 'Institution',
    name: 'Digital Justice Tribunal',
    shortName: 'Digital Justice Tribunal',
    description: 'Adjudicates major global harms, including Ecocide and digital rights violations',
    tier: 0,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_treaty'],
    enables: ['framework_justice', 'institution_cjet']
  },
  {
    id: 'institution_gem',
    type: 'Institution',
    name: 'Global Enforcement Mechanism',
    shortName: 'GEM',
    description: 'The Treaty\'s enforcement arm with specialized corps',
    tier: 0,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_treaty'],
    enables: ['institution_getf']
  },
  {
    id: 'mechanism_gcf',
    type: 'EconomicMechanism',
    name: 'Global Commons Fund',
    shortName: 'Global Commons Fund',
    description: 'Fund for planetary public goods, financed by global taxes',
    tier: 0,
    status: 'Proposed',
    primaryDomain: 'Economic',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_treaty'],
    enables: ['framework_aubi', 'framework_food', 'framework_drr']
  }
];

export const constitutionalFoundationRelationships: GgfRelationship[] = [
  // === HOW THE TREATY (Hardware) PROVIDES STRUCTURE ===
  {
    from: 'framework_treaty',
    to: 'institution_dj_tribunal',
    type: 'ESTABLISHES',
    description: 'The Treaty establishes the Digital Justice Tribunal as its primary judicial body',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_treaty',
    to: 'institution_gem',
    type: 'ESTABLISHES',
    description: 'The Treaty establishes the Global Enforcement Mechanism as its enforcement arm',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_treaty',
    to: 'mechanism_gcf',
    type: 'ESTABLISHES',
    description: 'The Treaty creates the Global Commons Fund through Pillar 4 financing mechanisms',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_treaty',
    to: 'institution_unsc_reformed',
    type: 'ESTABLISHES',
    description: 'The Treaty reforms the UNSC with tiered veto override mechanisms',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_treaty',
    to: 'institution_unga_reformed',
    type: 'ESTABLISHES',
    description: 'The Treaty grants UNGA binding resolution powers for global crises',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'institution_dj_tribunal',
    to: 'framework_treaty',
    type: 'ENFORCES',
    description: 'The Tribunal enforces the laws and principles set out in the Treaty',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'institution_gem',
    to: 'institution_dj_tribunal',
    type: 'REPORTS_TO',
    description: 'The enforcement arm acts on the rulings of the judicial arm',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  
  // === COMMONS RELATIONSHIP ===
  {
    from: 'framework_treaty',
    to: 'framework_hearthstone',
    type: 'ENABLES',
    description: 'The Treaty provides the constitutional authority and enforcement mechanisms for the Hearthstone Protocol\'s legal tools, like Stewardship Trusts.',
    strength: 'Strong',
    sequenceType: 'Sequential'
  }
];
