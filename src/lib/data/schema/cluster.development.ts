// /src/lib/data/schema/cluster.development.ts

import type { GgfEntity, GgfRelationship } from './_types';

/**
 * TIER 3: DEVELOPMENT APPLICATIONS CLUSTER
 * Frameworks for sustainable urban and rural development coordinating 
 * human settlements with ecological and economic systems
 */

export const developmentEntities: GgfEntity[] = [
  // === CORE DEVELOPMENT FRAMEWORKS ===
  {
    id: 'framework_urban_community',
    type: 'Framework',
    name: 'Urban and Community Development Framework',
    shortName: 'Urban Development',
    description: 'Framework for sustainable urban planning and community development',
    tier: 3,
    status: 'Coming-Soon',
    primaryDomain: 'Governance',
    geographicScope: 'Regional',
    implementationPriority: 'Medium',
    dependencies: ['framework_educational_systems', 'framework_nested_sovereignty'],
    ui: {
      path: '/frameworks/urban-and-community-development',
      titleKey: 'framework.docs.nav.frameworkTitles.urbanAndCommunityDevelopment',
      emoji: '🏙️',
      slug: 'urban-and-community-development',
      group: 'humanSocialSystems'
    }
  },
  {
    id: 'framework_rural_development',
    type: 'Framework',
    name: 'Rural Development Governance Framework',
    shortName: 'Rural Development',
    description: 'Framework for sustainable rural development and agriculture integration',
    tier: 3,
    status: 'Planned',
    primaryDomain: 'Economic',
    geographicScope: 'Regional',
    implementationPriority: 'Medium',
    dependencies: ['framework_food', 'framework_nested_sovereignty'],
    ui: {
      path: '/frameworks/rural-development-governance',
      titleKey: 'framework.docs.nav.frameworkTitles.ruralDevelopmentGovernance',
      emoji: '🚜',
      slug: 'rural-development-governance'
    }
  }
];

export const developmentRelationships: GgfRelationship[] = [
  // === INTER-FRAMEWORK COORDINATION ===
  {
    from: 'framework_urban_community',
    to: 'framework_rural_development',
    type: 'COORDINATES_WITH',
    description: 'Urban and rural development must coordinate to manage resource flows, migration, and food systems',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO ECOLOGICAL CLUSTER ===
  {
    from: 'framework_rural_development',
    to: 'framework_food',
    type: 'INTEGRATES_WITH',
    description: 'Rural development is inextricably linked to governance of food and agriculture systems',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_urban_community',
    to: 'framework_planetary_health',
    type: 'COLLABORATES_WITH',
    description: 'Urban planning must align with planetary health boundaries and ecological limits',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_rural_development',
    to: 'framework_biodiversity',
    type: 'COLLABORATES_WITH',
    description: 'Rural development must integrate biodiversity conservation and ecosystem services',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO ECONOMIC OS ===
  {
    from: 'framework_nested_sovereignty',
    to: 'framework_urban_community',
    type: 'GUIDES',
    description: 'Nested Sovereignty framework provides governance model for city-level and bioregional organization',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_nested_sovereignty',
    to: 'framework_rural_development',
    type: 'GUIDES',
    description: 'Nested Sovereignty provides multi-scale economic coordination for rural bioregional economies',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_aubi',
    to: 'framework_rural_development',
    type: 'SUPPORTS',
    description: 'AUBI provides economic foundation for rural communities and agricultural transitions',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_work_liberation',
    to: 'framework_urban_community',
    type: 'IMPLEMENTS',
    description: 'Urban development incorporates Community Work Teams for local infrastructure and services',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO HUMAN FLOURISHING ===
  {
    from: 'framework_education',
    to: 'framework_urban_community',
    type: 'INFORMS',
    description: 'Educational systems planning informs urban community development strategies',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_global_health',
    to: 'framework_urban_community',
    type: 'INFORMS',
    description: 'Urban planning incorporates public health principles and pandemic preparedness',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO OTHER APPLICATION CLUSTERS ===
  {
    from: 'framework_urban_community',
    to: 'framework_drr',
    type: 'INTEGRATES_WITH',
    description: 'Urban planning must incorporate disaster resilience standards and climate adaptation',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_rural_development',
    to: 'framework_drr',
    type: 'INTEGRATES_WITH',
    description: 'Rural development planning incorporates climate resilience and disaster preparedness',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO SOCIAL EQUITY ===
  {
    from: 'framework_urban_community',
    to: 'framework_disability',
    type: 'IMPLEMENTS',
    description: 'Urban development incorporates universal design and accessibility standards from Disability Justice',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_rural_development',
    to: 'framework_youth',
    type: 'COLLABORATES_WITH',
    description: 'Rural development addresses youth migration and intergenerational farming transitions',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO CULTURAL & KNOWLEDGE ===
  {
    from: 'framework_urban_community',
    to: 'framework_cultural_heritage',
    type: 'INTEGRATES_WITH',
    description: 'Urban development preserves and integrates cultural heritage sites and practices',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_rural_development',
    to: 'framework_cultural_heritage',
    type: 'INTEGRATES_WITH',
    description: 'Rural development preserves traditional agricultural practices and rural cultural heritage',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO ETHICAL OS ===
  {
    from: 'framework_urban_community',
    to: 'institution_baz',
    type: 'IMPLEMENTS',
    description: 'Urban development implemented through BAZ governance structures where applicable',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_rural_development',
    to: 'institution_baz',
    type: 'IMPLEMENTS',
    description: 'Rural development primarily implemented through BAZ bioregional governance',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO JUSTICE OS ===
  {
    from: 'framework_urban_community',
    to: 'framework_migration',
    type: 'COORDINATES_WITH',
    description: 'Urban development must plan for climate migration and refugee integration',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_rural_development',
    to: 'framework_migration',
    type: 'COORDINATES_WITH',
    description: 'Rural development addresses migration pressures and supports climate refugee integration',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CONSTITUTIONAL LAYER SUPPORT ===
  {
    from: 'mechanism_gcf',
    to: 'framework_urban_community',
    type: 'FUNDS',
    description: 'Global Commons Fund supports sustainable urban development initiatives',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'mechanism_gcf',
    to: 'framework_rural_development',
    type: 'FUNDS',
    description: 'Global Commons Fund supports rural development and agricultural transition programs',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  }
];
