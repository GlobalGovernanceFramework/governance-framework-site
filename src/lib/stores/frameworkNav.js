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
// Using the new consistent i18n key structure
export const allFrameworks = [
  // Tier 0: Global Institutional Reform
  {
    slug: 'treaty-for-our-only-home',
    titleKey: 'framework.docs.nav.frameworkTitles.treatyForOurOnlyHome',
    tier: 0,
    status: 'ready',
    version: 'review', // was v1.0, reverted for ethics audit
    path: '/frameworks/treaty-for-our-only-home'
  },

  // Tier 1: Urgent Global Stability & Justice
  {
    slug: 'climate-and-energy-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.climateAndEnergyGovernance',
    tier: 1,
    status: 'review',
    path: '/frameworks/climate-and-energy-governance'
  },
  {
    slug: 'peace-and-conflict-resolution',
    titleKey: 'framework.docs.nav.frameworkTitles.peaceAndConflictResolution',
    tier: 1,
    status: 'review',
    path: '/frameworks/peace-and-conflict-resolution'
  },
  {
    slug: 'indigenous-governance-and-traditional-knowledge',
    titleKey: 'framework.docs.nav.frameworkTitles.indigenousGovernanceAndTraditionalKnowledge',
    tier: 1,
    status: 'review',
    path: '/frameworks/indigenous-governance-and-traditional-knowledge'
  },
  {
    slug: 'planetary-health',
    titleKey: 'framework.docs.nav.frameworkTitles.planetaryHealth',
    tier: 1,
    status: 'review',
    path: '/frameworks/planetary-health'
  },
  {
    slug: 'food-systems-and-agriculture',
    titleKey: 'framework.docs.nav.frameworkTitles.foodSystemsAndAgriculture',
    tier: 1,
    status: 'review',
    path: '/frameworks/food-systems-and-agriculture'
  },
  {
    slug: 'economic-integration',
    titleKey: 'framework.docs.nav.frameworkTitles.economicIntegration',
    tier: 1,
    status: 'review',
    path: '/frameworks/economic-integration'
  },
  {
    slug: 'justice-systems',
    titleKey: 'framework.docs.nav.frameworkTitles.justiceSystems',
    tier: 1,
    status: 'review',
    path: '/frameworks/justice-systems'
  },
  {
    slug: 'migration-and-human-mobility',
    titleKey: 'framework.docs.nav.frameworkTitles.migrationAndHumanMobility',
    tier: 1,
    status: 'coming-soon',
    path: '/frameworks/migration-and-human-mobility'
  },
  {
    slug: 'disaster-risk-reduction',
    titleKey: 'framework.docs.nav.frameworkTitles.disasterRiskReduction',
    tier: 1,
    status: 'review',
    path: '/frameworks/disaster-risk-reduction'
  },

  // Tier 2: Systems for Long-Term Thriving
  {
    slug: 'technology-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.technologyGovernance',
    tier: 2,
    status: 'review',
    path: '/frameworks/technology-governance'
  },
  {
    slug: 'financial-systems',
    titleKey: 'framework.docs.nav.frameworkTitles.financialSystems',
    tier: 2,
    status: 'review',
    path: '/frameworks/financial-systems'
  },
  {
    slug: 'educational-systems',
    titleKey: 'framework.docs.nav.frameworkTitles.educationalSystems',
    tier: 2,
    status: 'review',
    path: '/frameworks/educational-systems'
  },
  {
    slug: 'mental-health-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.mentalHealthGovernance',
    tier: 2,
    status: 'review',
    path: '/frameworks/mental-health-governance'
  },
  {
    slug: 'urban-and-community-development',
    titleKey: 'framework.docs.nav.frameworkTitles.urbanAndCommunityDevelopment',
    tier: 2,
    status: 'coming-soon',
    path: '/frameworks/urban-and-community-development'
  },
  {
    slug: 'water-and-sanitation-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.waterAndSanitationGovernance',
    tier: 2,
    status: 'review',
    path: '/frameworks/water-and-sanitation-governance'
  },
  {
    slug: 'environmental-stewardship',
    titleKey: 'framework.docs.nav.frameworkTitles.environmentalStewardship',
    tier: 2,
    status: 'review',
    path: '/frameworks/environmental-stewardship'
  },
  {
    slug: 'animal-welfare-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.animalWelfareGovernance',
    tier: 2,
    status: 'review',
    path: '/frameworks/animal-welfare-governance'
  },
  {
    slug: 'biodiversity-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.biodiversityGovernance',
    tier: 2,
    status: 'review',
    path: '/frameworks/biodiversity-governance'
  },
  {
    slug: 'oceans-and-marine-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.oceansAndMarineGovernance',
    tier: 2,
    status: 'planned',
    path: '/frameworks/oceans-and-marine-governance'
  },
  {
    slug: 'labor-and-employment-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.laborAndEmploymentGovernance',
    tier: 2,
    status: 'planned',
    path: '/frameworks/labor-and-employment-governance'
  },
  {
    slug: 'disability-rights-and-inclusion',
    titleKey: 'framework.docs.nav.frameworkTitles.disabilityRightsAndInclusion',
    tier: 2,
    status: 'coming-soon',
    path: '/frameworks/disability-rights-and-inclusion'
  },

  // Tier 3: Equity, Culture & Future Generations
  {
    slug: 'digital-commons',
    titleKey: 'framework.docs.nav.frameworkTitles.digitalCommons',
    tier: 3,
    status: 'review',
    path: '/frameworks/digital-commons'
  },
  {
    slug: 'cultural-heritage-preservation',
    titleKey: 'framework.docs.nav.frameworkTitles.culturalHeritagePreservation',
    tier: 3,
    status: 'planned',
    path: '/frameworks/cultural-heritage-preservation'
  },
  {
    slug: 'rural-development-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.ruralDevelopmentGovernance',
    tier: 3,
    status: 'planned',
    path: '/frameworks/rural-development-governance'
  },
  {
    slug: 'religious-and-spiritual-dialogue-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.religiousAndSpiritualDialogueGovernance',
    tier: 3,
    status: 'review',
    path: '/frameworks/religious-and-spiritual-dialogue-governance'
  },
  {
    slug: 'youth-and-intergenerational-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.youthAndIntergenerationalGovernance',
    tier: 3,
    status: 'planned',
    path: '/frameworks/youth-and-intergenerational-governance'
  },
  {
    slug: 'global-citizenship-practice',
    titleKey: 'framework.docs.nav.frameworkTitles.globalCitizenshipPractice',
    tier: 3,
    status: 'review',
    path: '/frameworks/global-citizenship-practice'
  },
  {
    slug: 'global-ethics-and-rights-of-beings',
    titleKey: 'framework.docs.nav.frameworkTitles.globalEthicsAndRightsOfBeings',
    tier: 3,
    status: 'review',
    path: '/frameworks/global-ethics-and-rights-of-beings'
  },
  {
    slug: 'gender-equality-and-lgbtq-rights',
    titleKey: 'framework.docs.nav.frameworkTitles.genderEqualityAndLgbtqRights',
    tier: 3,
    status: 'planned',
    path: '/frameworks/gender-equality-and-lgbtq-rights'
  },
  {
    slug: 'aging-population-support-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.agingPopulationSupportGovernance',
    tier: 3,
    status: 'review',
    path: '/frameworks/aging-population-support-governance'
  },

  // Tier 4: Visionary Governance
  {
    slug: 'space-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.spaceGovernance',
    tier: 4,
    status: 'planned',
    path: '/frameworks/space-governance'
  },
  {
    slug: 'existential-risk-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.existentialRiskGovernance',
    tier: 4,
    status: 'planned',
    path: '/frameworks/existential-risk-governance'
  },
  {
    slug: 'consciousness-and-inner-development',
    titleKey: 'framework.docs.nav.frameworkTitles.consciousnessAndInnerDevelopment',
    tier: 4,
    status: 'review',
    path: '/frameworks/consciousness-and-inner-development'
  },
  {
    slug: 'implementation-methods-and-tools',
    titleKey: 'framework.docs.nav.frameworkTitles.implementationMethodsAndTools',
    tier: 4,
    status: 'review',
    path: '/frameworks/implementation-methods-and-tools'
  },
  {
    slug: 'wisdom-governance',
    titleKey: 'framework.docs.nav.frameworkTitles.wisdomGovernance',
    tier: 4,
    status: 'planned',
    path: '/frameworks/wisdom-governance'
  }
];

// Tier metadata using the new consistent i18n structure
export const tierMetadata = {
  0: {
    titleKey: 'framework.tier.0.title',
    descriptionKey: 'framework.tier.0.description'
  },
  1: {
    titleKey: 'framework.tier.1.title',
    descriptionKey: 'framework.tier.1.description'
  },
  2: {
    titleKey: 'framework.tier.2.title',
    descriptionKey: 'framework.tier.2.description'
  },
  3: {
    titleKey: 'framework.tier.3.title',
    descriptionKey: 'framework.tier.3.description'
  },
  4: {
    titleKey: 'framework.tier.4.title',
    descriptionKey: 'framework.tier.4.description'
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
    { titleKey: 'framework.docs.nav.overview', path: '/frameworks/docs' },
    { titleKey: 'framework.docs.nav.principles', path: '/frameworks/docs/principles' },
    { 
      titleKey: 'framework.docs.nav.globalCitizenship', 
      path: '/frameworks/global-citizenship',
      status: 'ready'
    },
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
          version: framework.version
        }))
      }))
    },
    { titleKey: 'framework.docs.nav.regionalHubs', path: '/frameworks/hubs' },
    { titleKey: 'framework.docs.nav.implementationTools', path: '/frameworks/tools' },
    { titleKey: 'framework.docs.nav.visualizations', path: '/frameworks/visuals' },
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
