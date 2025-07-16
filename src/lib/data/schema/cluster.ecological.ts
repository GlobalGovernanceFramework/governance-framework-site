// /src/lib/data/schema/cluster.ecological.ts

import type { GgfEntity, GgfRelationship } from './_types';

/**
 * TIER 2: ECOLOGICAL LIFE SUPPORT SYSTEMS CLUSTER
 * Core biophysical systems that sustain life on Earth
 * The heart of the GGF's commitment to planetary stewardship
 */

export const ecologicalEntities: GgfEntity[] = [
  // === OVERARCHING FRAMEWORKS ===
  {
    id: 'framework_planetary_health',
    type: 'Framework',
    name: 'Planetary Health Governance Framework',
    shortName: 'Planetary Health',
    description: 'Overarching framework for planetary health governance and biophysical system coordination',
    tier: 2,
    status: 'Ready',
    primaryDomain: 'Ecological',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_meta_gov', 'mechanism_gcf'],
    enables: ['council_phc'],
    ui: {
      path: '/frameworks/planetary-health-governance',
      titleKey: 'framework.docs.nav.frameworkTitles.planetaryHealth',
      emoji: '💚',
      version: '1.0',
      slug: 'planetary-health-governance',
      group: 'planetaryHealthResilience'
    }
  },
  {
    id: 'framework_eco_intel',
    type: 'Framework',
    name: 'Ecological Intelligence & Rights Layer',
    shortName: 'Eco Intel',
    description: 'Scientific brain and ecological conscience providing standards, rights framework, and ethical guidelines for all environmental stewardship',
    tier: 2,
    status: 'Review',
    primaryDomain: 'Ecological',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_mos', 'framework_planetary_health'],
    ui: {
      path: '/frameworks/environmental-stewardship',
      titleKey: 'framework.docs.nav.frameworkTitles.environmentalStewardship',
      emoji: '🌿',
      slug: 'environmental-stewardship',
      group: 'ecologicalSystems'
    }
  },
  {
    id: 'framework_climate_energy',
    type: 'Framework',
    name: 'Climate and Energy Governance Framework',
    shortName: 'Climate & Energy',
    description: 'Governance framework for climate action and energy transition',
    tier: 2,
    status: 'Review',
    primaryDomain: 'Ecological',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_planetary_health', 'mechanism_gcf'],
    ui: {
      path: '/frameworks/climate-and-energy-governance',
      titleKey: 'framework.docs.nav.frameworkTitles.climateAndEnergyGovernance',
      emoji: '⚡',
      slug: 'climate-and-energy-governance',
      group: 'planetaryHealthResilience'
    }
  },

  // === FOOD & AGRICULTURE SYSTEMS ===
  {
    id: 'framework_food',
    type: 'Framework',
    name: 'The Kinship Garden Framework',
    shortName: 'Kinship Garden',
    description: 'Regenerative food systems based on Right Relationship with the land',
    tier: 2,
    status: 'Review',
    primaryDomain: 'Ecological',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_aubi', 'council_phc'],
    ui: {
      path: '/frameworks/food-systems-and-agriculture',
      titleKey: 'framework.docs.nav.frameworkTitles.foodSystemsAndAgriculture',
      emoji: '🌱',
      slug: 'food-systems-and-agriculture',
      group: 'planetaryHealthResilience'
    }
  },
  {
    id: 'framework_soil_health',
    type: 'Framework',
    name: 'Soil Health and Land Use Governance Framework',
    shortName: 'Soil Health',
    description: 'Framework for soil conservation and sustainable land use practices',
    tier: 2,
    status: 'Planned',
    primaryDomain: 'Ecological',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_food'],
    ui: {
      path: '/frameworks/soil-health-and-land-use-governance',
      titleKey: 'framework.docs.nav.frameworkTitles.soilHealthAndLandUseGovernance',
      emoji: '🌾',
      slug: 'soil-health-and-land-use-governance',
      group: 'ecologicalSystems'
    }
  },

  // === WATER & SANITATION ===
  {
    id: 'framework_water_sanitation',
    type: 'Framework',
    name: 'Water and Sanitation Governance Framework',
    shortName: 'Water & Sanitation',
    description: 'Governance framework for water resources and sanitation systems',
    tier: 2,
    status: 'Review',
    primaryDomain: 'Ecological',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_planetary_health'],
    ui: {
      path: '/frameworks/water-and-sanitation-governance',
      titleKey: 'framework.docs.nav.frameworkTitles.waterAndSanitationGovernance',
      emoji: '💧',
      slug: 'water-and-sanitation-governance',
      group: 'ecologicalSystems'
    }
  },

  // === BIODIVERSITY & ECOSYSTEMS ===
  {
    id: 'framework_biodiversity',
    type: 'Framework',
    name: 'Global Governance Biodiversity Implementation Framework',
    shortName: 'Biodiversity',
    description: 'Framework for biodiversity conservation and ecosystem restoration',
    tier: 2,
    status: 'Review',
    primaryDomain: 'Ecological',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_planetary_health'],
    ui: {
      path: '/frameworks/biodiversity-governance',
      titleKey: 'framework.docs.nav.frameworkTitles.biodiversityGovernance',
      emoji: '🦅',
      slug: 'biodiversity-governance',
      group: 'ecologicalSystems'
    }
  },
  {
    id: 'framework_oceans_marine',
    type: 'Framework',
    name: 'Oceans and Marine Governance Framework',
    shortName: 'Oceans & Marine',
    description: 'Governance framework for ocean health and marine ecosystems',
    tier: 2,
    status: 'Planned',
    primaryDomain: 'Ecological',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_biodiversity'],
    ui: {
      path: '/frameworks/oceans-and-marine-governance',
      titleKey: 'framework.docs.nav.frameworkTitles.oceansAndMarineGovernance',
      emoji: '🌊',
      slug: 'oceans-and-marine-governance',
      group: 'ecologicalSystems'
    }
  },
  {
    id: 'framework_animal_welfare',
    type: 'Framework',
    name: 'Global Guardian Framework for Animal Welfare',
    shortName: 'Animal Welfare',
    description: 'Framework ensuring rights and welfare of sentient animals',
    tier: 2,
    status: 'Review',
    primaryDomain: 'Ecological',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_mos'],
    ui: {
      path: '/frameworks/animal-welfare-governance',
      titleKey: 'framework.docs.nav.frameworkTitles.animalWelfareGovernance',
      emoji: '🐾',
      slug: 'animal-welfare-governance',
      group: 'ecologicalSystems'
    }
  },

  // === CIRCULAR ECONOMY & WASTE ===
  {
    id: 'framework_phoenix_protocol',
    type: 'Framework',
    name: 'The Phoenix Protocol - Waste & Circular Economy',
    shortName: 'Phoenix Protocol',
    description: 'Circular economy and waste transformation framework',
    tier: 2,
    status: 'Planned',
    primaryDomain: 'Ecological',
    geographicScope: 'Global',
    implementationPriority: 'Medium',
    dependencies: ['framework_eco_intel'],
    ui: {
      path: '/frameworks/the-phoenix-protocol',
      titleKey: 'framework.docs.nav.frameworkTitles.wasteAndCircularEconomy',
      emoji: '♻️',
      slug: 'the-phoenix-protocol',
      group: 'ecologicalSystems'
    }
  },

  // === RESILIENCE & DISASTER MANAGEMENT ===
  {
    id: 'framework_drr',
    type: 'Framework',
    name: 'Disaster Risk Reduction & Resilience Framework',
    shortName: 'DRR&R',
    description: 'Framework for disaster resilience and adaptive capacity to planetary system dynamics',
    tier: 2,
    status: 'Review',
    primaryDomain: 'Ecological',
    geographicScope: 'Global',
    implementationPriority: 'High',
    dependencies: ['framework_planetary_health'],
    ui: {
      path: '/frameworks/disaster-risk-reduction',
      titleKey: 'framework.docs.nav.frameworkTitles.disasterRiskReduction',
      emoji: '🌪️',
      slug: 'disaster-risk-reduction',
      group: 'planetaryHealthResilience'
    }
  },

  // === GOVERNANCE COUNCIL ===
  {
    id: 'council_phc',
    type: 'Council',
    name: 'Planetary Health Council',
    shortName: 'PHC',
    description: 'Primary Meta-Governance council overseeing planetary boundaries and ecological frameworks',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Ecological',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: ['framework_meta_gov', 'framework_planetary_health']
  },

  // === METRICS ===
  {
    id: 'metric_bhi',
    type: 'DataMetric',
    name: 'Biosphere Health Index (BHI)',
    shortName: 'BHI',
    description: 'A comprehensive, real-time metric of planetary well-being designed to replace GDP as the primary measure of civilizational success. It integrates scientific data with Indigenous-led indicators of ecological health, cultural vitality, and community well-being (incorporating the concept of Gross Planetary Health).',
    tier: 2,
    status: 'Draft',
    primaryDomain: 'Ecological',
    geographicScope: 'Global',
    implementationPriority: 'Critical',
    dependencies: [
      'framework_planetary_health',
      'framework_indigenous',
      'framework_aurora_accord',
      'metric_lmci'
    ],
    enables: ['council_phc']
  }
];

export const ecologicalRelationships: GgfRelationship[] = [
  // === PHC OVERSIGHT ===
  {
    from: 'council_phc',
    to: 'framework_planetary_health',
    type: 'OVERSEES',
    description: 'PHC is the primary governance body for Planetary Health framework',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_phc',
    to: 'framework_drr',
    type: 'OVERSEES',
    description: 'PHC provides strategic oversight for global disaster resilience within planetary boundaries',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'council_phc',
    to: 'framework_phoenix_protocol',
    type: 'OVERSEES',
    description: 'PHC oversees circular economy governance to ensure waste systems support planetary health',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_eco_intel',
    to: 'council_phc',
    type: 'INFORMS',
    description: 'Eco Intel provides scientific standards, rights architecture, and ethical guidelines that PHC uses to govern',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },

  // === PLANETARY HEALTH INTEGRATION ===
  {
    from: 'framework_planetary_health',
    to: 'framework_food',
    type: 'INTEGRATES_WITH',
    description: 'Planetary Health provides overarching strategic goals that Kinship Garden implements for agriculture',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_planetary_health',
    to: 'framework_water_sanitation',
    type: 'INTEGRATES_WITH',
    description: 'Planetary Health coordinates global water security with local sanitation needs',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_planetary_health',
    to: 'framework_biodiversity',
    type: 'INTEGRATES_WITH',
    description: 'Planetary Health ensures biodiversity conservation aligns with planetary boundary science',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_planetary_health',
    to: 'framework_climate_energy',
    type: 'INTEGRATES_WITH',
    description: 'Planetary Health provides framework for climate action within planetary boundaries',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_planetary_health',
    to: 'framework_drr',
    type: 'INTEGRATES_WITH',
    description: 'Planetary Health coordinates with disaster resilience to ensure recovery supports planetary boundaries',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === ECO INTEL GUIDANCE ===
  {
    from: 'framework_eco_intel',
    to: 'framework_animal_welfare',
    type: 'GUIDES',
    description: 'Eco Intel provides scientific and ethical standards for animal welfare governance',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_eco_intel',
    to: 'framework_phoenix_protocol',
    type: 'GUIDES',
    description: 'Eco Intel provides circular economy principles and waste transformation standards',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_eco_intel',
    to: 'framework_drr',
    type: 'INFORMS',
    description: 'Eco Intel provides risk models, early warning systems, and ecological data for disaster preparedness',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },

  // === INTER-FRAMEWORK DEPENDENCIES ===
  {
    from: 'framework_food',
    to: 'framework_soil_health',
    type: 'DEPENDS_ON',
    description: 'Regenerative food systems depend on principles and protocols defined in Soil Health framework',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Sequential'
  },
  {
    from: 'framework_food',
    to: 'framework_water_sanitation',
    type: 'DEPENDS_ON',
    description: 'Food production is critically dependent on sustainable water governance',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_biodiversity',
    to: 'framework_oceans_marine',
    type: 'INTEGRATES_WITH',
    description: 'Biodiversity governance includes and coordinates with marine ecosystem management',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_biodiversity',
    to: 'framework_animal_welfare',
    type: 'COORDINATES_WITH',
    description: 'Coordinates on issues like invasive species management and rewilding, with disputes mediated by PHC',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO ECONOMIC OS ===
  {
    from: 'mechanism_leaves',
    to: 'framework_planetary_health',
    type: 'FUNDS',
    description: 'Leaves currency is primary economic incentive for all restoration activities governed by this cluster',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },
  {
    from: 'mechanism_leaves',
    to: 'framework_biodiversity',
    type: 'REWARDS',
    description: 'Leaves reward verified ecosystem restoration and biodiversity conservation work',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'mechanism_hearts',
    to: 'framework_animal_welfare',
    type: 'REWARDS',
    description: 'Hearts reward animal care and welfare work',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO JUSTICE OS ===
  {
    from: 'institution_cjet',
    to: 'framework_planetary_health',
    type: 'ENFORCES',
    description: 'Climate and Ecological Justice Tribunals enforce rules (e.g., against ecocide) for all frameworks in this cluster',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO OTHER APPLICATION CLUSTERS ===
  {
    from: 'framework_drr',
    to: 'framework_mental_health',
    type: 'INTEGRATES_WITH',
    description: 'DRR&R framework integrates mental health support at every stage of the disaster cycle',
    strength: 'Strong',
    frequency: 'As-Needed',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_drr',
    to: 'framework_migration',
    type: 'COLLABORATES_WITH',
    description: 'DRR&R coordinates with Migration framework on managing and supporting climate-displaced populations',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_drr',
    to: 'framework_urban_community',
    type: 'INFORMS',
    description: 'DRR&R provides resilience standards that inform urban planning and development',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CIRCULAR ECONOMY INTEGRATIONS ===
  {
    from: 'framework_phoenix_protocol',
    to: 'framework_gscl',
    type: 'INTEGRATES_WITH',
    description: 'Phoenix Protocol defines rules for circular supply chains managed by GSCL framework',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_phoenix_protocol',
    to: 'mechanism_leaves',
    type: 'REWARDS',
    description: 'Large-scale waste cleanup and recycling innovation activities are rewarded with Leaves',
    strength: 'Medium',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === DISASTER RESILIENCE ECONOMIC INTEGRATION ===
  {
    from: 'framework_aubi',
    to: 'framework_drr',
    type: 'FUNDS',
    description: 'AUBI Layer 1 can be surged to provide immediate post-disaster relief and recovery support',
    strength: 'Strong',
    frequency: 'Crisis-Only',
    sequenceType: 'Conditional'
  },
  {
    from: 'framework_work_liberation',
    to: 'framework_drr',
    type: 'IMPLEMENTS',
    description: 'Community Work Teams carry out resilience-building and recovery projects, earning Hearts/Leaves',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO META-GOVERNANCE ===
  {
    from: 'council_phc',
    to: 'council_mgcc',
    type: 'REPORTS_TO',
    description: 'PHC operates within Meta-Governance architecture as key ecological coordination body',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },

  // === BHI INTEGRATION RELATIONSHIPS ===
  {
    from: 'council_phc',
    to: 'metric_bhi',
    type: 'OVERSEES',
    description: 'The Planetary Health Council is responsible for maintaining, publishing, and governing the BHI as the primary metric for planetary well-being.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_indigenous',
    to: 'metric_bhi',
    type: 'INFORMS',
    description: 'Traditional Ecological Knowledge (TEK) and Indigenous concepts of "right relationship" are foundational data sources and guiding principles for the BHI.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_aurora_accord',
    to: 'metric_bhi',
    type: 'GUIDES',
    description: 'The Aurora Accord provides the data sovereignty, transparency, and ethical AI rules for how BHI data is collected, managed, and used.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },
  {
    from: 'metric_lmci',
    to: 'metric_bhi',
    type: 'INTEGRATES_WITH',
    description: 'The BHI\'s human flourishing component is computed directly from the Love, Meaning, and Connection Index (LMCI), ensuring a holistic view of well-being.',
    strength: 'Strong',
    sequenceType: 'Parallel'
  },

  // === CONNECTIONS TO ETHICAL OS ===
  {
    from: 'council_earth',
    to: 'council_phc',
    type: 'GUIDES',
    description: 'Earth Council provides Indigenous wisdom to planetary health decisions',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  },
  {
    from: 'framework_mos',
    to: 'framework_eco_intel',
    type: 'GUIDES',
    description: 'MOS Rights Spectrum provides ethical foundation for ecological rights and stewardship standards',
    strength: 'Strong',
    frequency: 'Continuous',
    sequenceType: 'Parallel'
  },

  // === CONSTITUTIONAL LAYER SUPPORT ===
  {
    from: 'mechanism_gcf',
    to: 'framework_planetary_health',
    type: 'FUNDS',
    description: 'Global Commons Fund provides core funding for planetary health initiatives',
    strength: 'Strong',
    frequency: 'Regular',
    sequenceType: 'Parallel'
  }
];
