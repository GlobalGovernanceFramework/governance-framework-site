// src/lib/stores/frameworkNav.js
import { writable } from 'svelte/store';

// Helper function to convert kebab-case slug to camelCase translation key
function slugToTitleKey(slug) {
  return slug
    .split('-')
    .map((word, index) => 
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('');
}

// Master list of all frameworks - SINGLE SOURCE OF TRUTH
// Using the new consistent i18n key structure with emojis and thematic groups
export const allFrameworks = [
  // Tier 0: Global Institutional Reform
  {
    slug: 'treaty-for-our-only-home',
    titleKey: 'framework.docs.nav.frameworkTitles.treatyForOurOnlyHome',
    emoji: '🌐',
    tier: 0,
    status: 'ready',
    version: '1.1',
    path: '/frameworks/treaty-for-our-only-home'
  },

  // Tier 1: Urgent Global Stability & Justice
  // Group: Planetary Health & Resilience
  {
    slug: 'climate-and-energy-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.climateAndEnergyGovernance',
    emoji: '⚡',
    tier: 1,
    group: 'planetaryHealthResilience',
    status: 'review',
    path: '/frameworks/climate-and-energy-governance'
  },
  {
    slug: 'planetary-health-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.planetaryHealth',
    emoji: '💚',
    tier: 1,
    group: 'planetaryHealthResilience',
    status: 'ready',
    version: '1.0',
    path: '/frameworks/planetary-health-governance'
  },
  {
    slug: 'global-health-and-pandemic-security',
    titleKey: 'framework.docs.nav.frameworkTitles.globalHealthAndPandemicSecurity',
    emoji: '⚕️',
    tier: 1,
    group: 'planetaryHealthResilience',
    status: 'ready',
    version: '1.0',
    path: '/frameworks/global-health-and-pandemic-security'
  },
  {
    slug: 'food-systems-and-agriculture',
    titleKey: 'framework.docs.nav.frameworkTitles.foodSystemsAndAgriculture',
    emoji: '🌱',
    tier: 1,
    group: 'planetaryHealthResilience',
    status: 'review',
    path: '/frameworks/food-systems-and-agriculture'
  },
  {
    slug: 'disaster-risk-reduction',
    titleKey: 'framework.docs.nav.frameworkTitles.disasterRiskReduction',
    emoji: '🌪️',
    tier: 1,
    group: 'planetaryHealthResilience',
    status: 'review',
    path: '/frameworks/disaster-risk-reduction'
  },

  // Group: Social Fabric & Justice
  {
    slug: 'peace-and-conflict-resolution',
    titleKey: 'framework.docs.nav.frameworkTitles.peaceAndConflictResolution',
    emoji: '🕊️',
    tier: 1,
    group: 'socialFabricJustice',
    status: 'review',
    path: '/frameworks/peace-and-conflict-resolution'
  },
  {
    slug: 'justice-systems',
    titleKey: 'framework.docs.nav.frameworkTitles.justiceSystems',
    emoji: '⚖️',
    tier: 1,
    group: 'socialFabricJustice',
    status: 'review',
    path: '/frameworks/justice-systems'
  },
  {
    slug: 'the-shield-protocol',
    titleKey: 'framework.docs.nav.frameworkTitles.transnationalCrimeAndSecurity',
    emoji: '🛡️',
    tier: 1,
    group: 'socialFabricJustice',
    status: 'review',
    path: '/frameworks/the-shield-protocol'
  },
  {
    slug: 'migration-and-human-mobility',
    titleKey: 'framework.docs.nav.frameworkTitles.migrationAndHumanMobility',
    emoji: '🗺️',
    tier: 1,
    group: 'socialFabricJustice',
    status: 'review',
    path: '/frameworks/migration-and-human-mobility'
  },
  {
    slug: 'indigenous-governance-and-traditional-knowledge',
    titleKey: 'framework.docs.nav.frameworkTitles.indigenousGovernanceAndTraditionalKnowledge',
    emoji: '🪶',
    tier: 1,
    group: 'socialFabricJustice',
    status: 'review',
    path: '/frameworks/indigenous-governance-and-traditional-knowledge'
  },

  // Group: Global Economic Systems
  {
    slug: 'nested-economies',
    titleKey: 'framework.docs.nav.frameworkTitles.nestedEconomies',
    emoji: '💱',
    tier: 1,
    group: 'globalEconomicSystems',
    status: 'ready',
    version: '1.0',
    path: '/frameworks/nested-economies'
  },
  {
    slug: 'financial-systems',
    titleKey: 'framework.docs.nav.frameworkTitles.financialSystems',
    emoji: '❤️',
    tier: 1,
    group: 'globalEconomicSystems',
    status: 'review',
    path: '/frameworks/financial-systems'
  },
  {
    slug: 'labor-and-employment-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.laborAndEmploymentGovernance',
    emoji: '👥',
    tier: 1,
    group: 'globalEconomicSystems',
    status: 'planned',
    path: '/frameworks/labor-and-employment-governance'
  },
  {
    slug: 'adaptive-universal-basic-income',
    titleKey: 'framework.docs.nav.frameworkTitles.adaptiveUniversalBasicIncome',
    emoji: '💰',
    tier: 1,
    group: 'globalEconomicSystems',
    status: 'ready',
    version: '1.0',
    path: '/frameworks/adaptive-universal-basic-income'
  },
  {
    slug: 'global-supply-chains-and-logistics',
    titleKey: 'framework.docs.nav.frameworkTitles.globalSupplyChainsAndLogistics',
    emoji: '🚢',
    tier: 1,
    group: 'globalEconomicSystems',
    status: 'ready',
    version: '1.0',
    path: '/frameworks/global-supply-chains-and-logistics'
  },
  {
    slug: 'gaian-trade',
    titleKey: 'framework.docs.nav.frameworkTitles.gaianTrade',
    emoji: '🌍',
    tier: 1,
    group: 'globalEconomicSystems',
    status: 'review',
    path: '/frameworks/gaian-trade'
  },
  {
    slug: 'aurora-accord',
    titleKey: 'framework.docs.nav.frameworkTitles.globalDataGovernanceAndSovereignty',
    emoji: '🔮',
    tier: 1,
    group: 'globalEconomicSystems',
    status: 'review',
    path: '/frameworks/aurora-accord'
  },

  // Tier 2: Systems for Long-Term Thriving
  // Group: Ecological Systems
  {
    slug: 'soil-health-and-land-use-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.soilHealthAndLandUseGovernance',
    emoji: '🌾',
    tier: 2,
    group: 'ecologicalSystems',
    status: 'planned',
    path: '/frameworks/soil-health-and-land-use-governance'
  },
  {
    slug: 'water-and-sanitation-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.waterAndSanitationGovernance',
    emoji: '💧',
    tier: 2,
    group: 'ecologicalSystems',
    status: 'review',
    path: '/frameworks/water-and-sanitation-governance'
  },
  {
    slug: 'environmental-stewardship',
    titleKey: 'framework.docs.nav.frameworkTitles.environmentalStewardship',
    emoji: '🌿',
    tier: 2,
    group: 'ecologicalSystems',
    status: 'review',
    path: '/frameworks/environmental-stewardship'
  },
  {
    slug: 'the-phoenix-protocol',
    titleKey: 'framework.docs.nav.frameworkTitles.wasteAndCircularEconomy',
    emoji: '♻️',
    tier: 2,
    group: 'ecologicalSystems',
    status: 'planned',
    path: '/frameworks/the-phoenix-protocol'
  },
  {
    slug: 'animal-welfare-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.animalWelfareGovernance',
    emoji: '🐾',
    tier: 2,
    group: 'ecologicalSystems',
    status: 'review',
    path: '/frameworks/animal-welfare-governance'
  },
  {
    slug: 'biodiversity-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.biodiversityGovernance',
    emoji: '🦅',
    tier: 2,
    group: 'ecologicalSystems',
    status: 'review',
    path: '/frameworks/biodiversity-governance'
  },
  {
    slug: 'oceans-and-marine-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.oceansAndMarineGovernance',
    emoji: '🌊',
    tier: 2,
    group: 'ecologicalSystems',
    status: 'planned',
    path: '/frameworks/oceans-and-marine-governance'
  },

  // Group: Human & Social Systems
  {
    slug: 'technology-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.technologyGovernance',
    emoji: '🤖',
    tier: 2,
    group: 'humanSocialSystems',
    status: 'review',
    path: '/frameworks/technology-governance'
  },
  {
    slug: 'aethelred-accord',
    titleKey: 'framework.docs.nav.frameworkTitles.syntheticBiologyAndAdvancedBiotechGovernance',
    emoji: '🧬',
    tier: 2,
    group: 'humanSocialSystems',
    status: 'ready',
    version: '1.0',
    path: '/frameworks/aethelred-accord'
  },
  {
    slug: 'educational-systems',
    titleKey: 'framework.docs.nav.frameworkTitles.educationalSystems',
    emoji: '🎓',
    tier: 2,
    group: 'humanSocialSystems',
    status: 'review',
    path: '/frameworks/educational-systems'
  },
  {
    slug: 'mental-health-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.mentalHealthGovernance',
    emoji: '🧠',
    tier: 2,
    group: 'humanSocialSystems',
    status: 'review',
    path: '/frameworks/mental-health-governance'
  },
  {
    slug: 'urban-and-community-development',
    titleKey: 'framework.docs.nav.frameworkTitles.urbanAndCommunityDevelopment',
    emoji: '🏙️',
    tier: 2,
    group: 'humanSocialSystems',
    status: 'coming-soon',
    path: '/frameworks/urban-and-community-development'
  },
  {
    slug: 'disability-rights-and-inclusion',
    titleKey: 'framework.docs.nav.frameworkTitles.disabilityRightsAndInclusion',
    emoji: '♿',
    tier: 2,
    group: 'humanSocialSystems',
    status: 'coming-soon',
    path: '/frameworks/disability-rights-and-inclusion'
  },

  // Tier 3: Equity, Culture & Future Generations (keeping these ungrouped for now as there are fewer)
  {
    slug: 'digital-commons',
    titleKey: 'framework.docs.nav.frameworkTitles.digitalCommons',
    emoji: '💻',
    tier: 3,
    status: 'review',
    path: '/frameworks/digital-commons'
  },
  {
    slug: 'cultural-heritage-preservation',
    titleKey: 'framework.docs.nav.frameworkTitles.culturalHeritagePreservation',
    emoji: '🏛️',
    tier: 3,
    status: 'planned',
    path: '/frameworks/cultural-heritage-preservation'
  },
  {
    slug: 'rural-development-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.ruralDevelopmentGovernance',
    emoji: '🚜',
    tier: 3,
    status: 'planned',
    path: '/frameworks/rural-development-governance'
  },
  {
    slug: 'religious-and-spiritual-dialogue-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.religiousAndSpiritualDialogueGovernance',
    emoji: '🕯️',
    tier: 3,
    status: 'review',
    path: '/frameworks/religious-and-spiritual-dialogue-governance'
  },
  {
    slug: 'youth-and-intergenerational-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.youthAndIntergenerationalGovernance',
    emoji: '👶',
    tier: 3,
    status: 'planned',
    path: '/frameworks/youth-and-intergenerational-governance'
  },
  {
    slug: 'global-citizenship-practice',
    titleKey: 'framework.docs.nav.frameworkTitles.globalCitizenshipPractice',
    emoji: '🤝',
    tier: 3,
    status: 'review',
    path: '/frameworks/global-citizenship-practice'
  },
  {
    slug: 'global-ethics-and-rights-of-beings',
    titleKey: 'framework.docs.nav.frameworkTitles.globalEthicsAndRightsOfBeings',
    emoji: '🦋',
    tier: 3,
    status: 'review',
    path: '/frameworks/global-ethics-and-rights-of-beings'
  },
  {
    slug: 'gender-equality-and-lgbtq-rights',
    titleKey: 'framework.docs.nav.frameworkTitles.genderEqualityAndLgbtqRights',
    emoji: '🏳️‍🌈',
    tier: 3,
    status: 'planned',
    path: '/frameworks/gender-equality-and-lgbtq-rights'
  },
  {
    slug: 'aging-population-support-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.agingPopulationSupportGovernance',
    emoji: '🌳',
    tier: 3,
    status: 'review',
    path: '/frameworks/aging-population-support-governance'
  },

  // Tier 4: Visionary Governance (keeping these ungrouped for now as there are fewer)
  {
    slug: 'meta-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.integratedMetaGovernance',
    emoji: '🏛️',
    tier: 4,
    status: 'ready',
    version: '1.1',
    path: '/frameworks/meta-governance'
  },
  {
    slug: 'space-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.spaceGovernance',
    emoji: '🚀',
    tier: 4,
    status: 'planned',
    path: '/frameworks/space-governance'
  },
  {
    slug: 'existential-risk-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.existentialRiskGovernance',
    emoji: '⚠️',
    tier: 4,
    status: 'planned',
    path: '/frameworks/existential-risk-governance'
  },
  {
    slug: 'consciousness-and-inner-development',
    titleKey: 'framework.docs.nav.frameworkTitles.consciousnessAndInnerDevelopment',
    emoji: '🧘',
    tier: 4,
    status: 'review',
    path: '/frameworks/consciousness-and-inner-development'
  },
  {
    slug: 'implementation-methods-and-tools',
    titleKey: 'framework.docs.nav.frameworkTitles.implementationMethodsAndTools',
    emoji: '🧰',
    tier: 4,
    status: 'review',
    path: '/frameworks/implementation-methods-and-tools'
  },
  {
    slug: 'wisdom-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.wisdomGovernance',
    emoji: '🦉',
    tier: 4,
    status: 'planned',
    path: '/frameworks/wisdom-governance'
  }
];

// Group metadata for i18n
export const groupMetadata = {
  planetaryHealthResilience: {
    titleKey: 'framework.groups.planetaryHealthResilience.title',
    descriptionKey: 'framework.groups.planetaryHealthResilience.description',
    emoji: '🌱'
  },
  socialFabricJustice: {
    titleKey: 'framework.groups.socialFabricJustice.title',
    descriptionKey: 'framework.groups.socialFabricJustice.description',
    emoji: '⚖️'
  },
  globalEconomicSystems: {
    titleKey: 'framework.groups.globalEconomicSystems.title',
    descriptionKey: 'framework.groups.globalEconomicSystems.description',
    emoji: '💱'
  },
  ecologicalSystems: {
    titleKey: 'framework.groups.ecologicalSystems.title',
    descriptionKey: 'framework.groups.ecologicalSystems.description',
    emoji: '🌿'
  },
  humanSocialSystems: {
    titleKey: 'framework.groups.humanSocialSystems.title',
    descriptionKey: 'framework.groups.humanSocialSystems.description',
    emoji: '🎓'
  }
};

// Tier metadata using the new consistent i18n structure with emojis
export const tierMetadata = {
  0: {
    titleKey: 'framework.tier.0.title',
    descriptionKey: 'framework.tier.0.description',
    emoji: '⚖️'
  },
  1: {
    titleKey: 'framework.tier.1.title',
    descriptionKey: 'framework.tier.1.description',
    emoji: '🌍'
  },
  2: {
    titleKey: 'framework.tier.2.title',
    descriptionKey: 'framework.tier.2.description',
    emoji: '🌱'
  },
  3: {
    titleKey: 'framework.tier.3.title',
    descriptionKey: 'framework.tier.3.description',
    emoji: '🤝'
  },
  4: {
    titleKey: 'framework.tier.4.title',
    descriptionKey: 'framework.tier.4.description',
    emoji: '🔮'
  }
};

// Status mapping using the existing status system
export const statusMapping = {
  'ready': 'framework.status.ready.label',
  'review': 'framework.status.review.label', 
  'planned': 'framework.labels.planned',
  'coming-soon': 'framework.labels.comingSoon'
};

// Helper functions
export function getFrameworksByTier(tier) {
  return allFrameworks.filter(framework => framework.tier === tier);
}

export function getFrameworksByTierAndGroup(tier, group = null) {
  const tierFrameworks = getFrameworksByTier(tier);
  if (group) {
    return tierFrameworks.filter(framework => framework.group === group);
  }
  return tierFrameworks.filter(framework => !framework.group); // Ungrouped frameworks
}

export function getGroupsForTier(tier) {
  const tierFrameworks = getFrameworksByTier(tier);
  const groups = [...new Set(tierFrameworks.map(f => f.group).filter(Boolean))];
  return groups;
}

export function getFrameworkBySlug(slug) {
  return allFrameworks.find(framework => framework.slug === slug);
}

export function getAllTiers() {
  return [...new Set(allFrameworks.map(f => f.tier))].sort();
}

// Function to dynamically generate titleKey from slug (useful for validation)
export function generateTitleKeyFromSlug(slug) {
  const camelCase = slugToTitleKey(slug);
  return `framework.docs.nav.frameworkTitles.${camelCase}`;
}

// Build navigation structure from the master list (for backwards compatibility)
function buildNavStructure(frameworks) {
  const tiers = getAllTiers();
  const navStructure = [
    { titleKey: 'framework.docs.nav.overview', path: '/frameworks' },
    { titleKey: 'framework.docs.nav.documentation', path: '/frameworks/docs' },
    { titleKey: 'framework.docs.nav.principles', path: '/frameworks/docs/principles' },
    {
      titleKey: 'framework.docs.nav.implementation',
      path: '/frameworks',
      status: 'ready',
      subItems: tiers.map(tier => ({
        titleKey: tierMetadata[tier].titleKey,
        path: `/frameworks/tier-${tier}`,
        subItems: getFrameworksByTier(tier).map(framework => ({
          titleKey: framework.titleKey,
          path: framework.path,
          status: framework.status,
          version: framework.version,
          emoji: framework.emoji
        }))
      }))
    },
    { titleKey: 'framework.docs.nav.regionalHubs', path: '/frameworks/hubs' },
    { titleKey: 'framework.docs.nav.implementationTools', path: '/frameworks/tools' },
    { titleKey: 'framework.docs.nav.visualizations', path: '/frameworks/visuals' },
    { titleKey: 'framework.docs.nav.downloads', path: '/downloads' },
    { titleKey: 'framework.docs.nav.caseStudies', path: '/frameworks/docs/case-studies' },
    { titleKey: 'framework.docs.nav.aiFutures', path: '/frameworks/ai-futures' },
    { titleKey: 'framework.docs.nav.resources', path: '/frameworks/docs/resources' },
    { titleKey: 'framework.docs.nav.glossary', path: '/frameworks/docs/glossary' },
  ];

  return navStructure;
}

// Create a writable store with the built navigation structure
export const frameworkNav = writable(buildNavStructure(allFrameworks));

// Existing update functions (maintained for backwards compatibility)
export function updateNavItem(titleKey, newData) {
  frameworkNav.update(nav => {
    return nav.map(item => {
      if (item.titleKey === titleKey) {
        return { ...item, ...newData };
      }
      return item;
    });
  });
}

export function updateFrameworkVersion(path, version) {
  // Update in master list
  const frameworkIndex = allFrameworks.findIndex(f => f.path === path);
  if (frameworkIndex !== -1) {
    allFrameworks[frameworkIndex].version = version;
  }
  
  // Update in nav store
  frameworkNav.update(nav => {
    return updateItemVersion(nav, path, version);
  });
}

// Recursive function to find and update version in nested structure
function updateItemVersion(items, targetPath, version) {
  return items.map(item => {
    if (item.path === targetPath) {
      return { ...item, version };
    }
    if (item.subItems) {
      return {
        ...item,
        subItems: updateItemVersion(item.subItems, targetPath, version)
      };
    }
    return item;
  });
}
