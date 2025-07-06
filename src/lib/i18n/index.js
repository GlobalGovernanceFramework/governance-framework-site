// src/lib/i18n/index.js
import { browser } from '$app/environment';
import { derived, writable, readable, get } from 'svelte/store';
import { base } from '$app/paths';
import { getBrowserLanguage, getLocalStorage, setLocalStorage } from '$lib/utils/browserUtils';

// Define supported languages
const supportedLocales = ['en', 'sv'];

// Create stores for the current locale and translations
const locale = writable(getLocalStorage('locale', 'en'));
const translations = writable({});
const currentRoute = writable('/');

// Create a readable store for locales
const locales = readable(supportedLocales);

// Data-driven mapping for page-specific translations
const pageSpecificTranslationsMap = [
  // Framework routes (most specific first)
  { route: '/frameworks/adaptive-universal-basic-income', dataKey: 'aubi', fileName: 'frameworksAdaptiveUniversalBasicIncome' },
  { route: '/frameworks/aethelred-accord', dataKey: 'aethelred', fileName: 'frameworksAethelredAccord' },
  { route: '/frameworks/treaty-for-our-only-home', dataKey: 'treatyFramework', fileName: 'frameworksTreatyForOurOnlyHome' },
  { route: '/frameworks/consciousness-and-inner-development', dataKey: 'consciousnessFramework', fileName: 'frameworksConsciousnessAndInnerDevelopment' },
  { route: '/frameworks/technology-governance', dataKey: 'techFramework', fileName: 'frameworksTechnologyGovernance' },
  { route: '/frameworks/aurora-accord', dataKey: 'auroraAccord', fileName: 'frameworksAuroraAccord' },
  { route: '/frameworks/financial-systems', dataKey: 'financialSystems', fileName: 'frameworksFinancialSystems' },
  { route: '/frameworks/educational-systems', dataKey: 'educationalFramework', fileName: 'frameworksEducationalSystems' },
  { route: '/frameworks/food-systems-and-agriculture', dataKey: 'foodSystemsFramework', fileName: 'frameworksFoodSystemsAndAgriculture' },
  { route: '/frameworks/nested-economies', dataKey: 'nestedEconomies', fileName: 'frameworksNestedEconomies' },
  { route: '/frameworks/global-supply-chains-and-logistics', dataKey: 'gscl', fileName: 'frameworksGlobalSupplyChainAndLogistics' },
  { route: '/frameworks/justice-systems', dataKey: 'justiceFramework', fileName: 'frameworksJusticeSystems' },
  { route: '/frameworks/disaster-risk-reduction', dataKey: 'disasterFramework', fileName: 'frameworksDisasterRiskReduction' },
  { route: '/frameworks/planetary-health-governance', dataKey: 'planetaryHealthGovernance', fileName: 'frameworksPlanetaryHealthGovernance' },
  { route: '/frameworks/global-health-and-pandemic-security', dataKey: 'globalHealthPandemicSecurity', fileName: 'frameworksGlobalHealthAndPandemicSecurity' },
  { route: '/frameworks/indigenous-governance-and-traditional-knowledge', dataKey: 'indigenousFramework', fileName: 'frameworksIndigenousGovernanceAndTraditionalKnowledge' },
  { route: '/frameworks/peace-and-conflict-resolution', dataKey: 'peaceFramework', fileName: 'frameworksPeaceAndConflictResolution' },
  { route: '/frameworks/climate-and-energy-governance', dataKey: 'climateFramework', fileName: 'frameworksClimateAndEnergyGovernance' },
  { route: '/frameworks/migration-and-human-mobility', dataKey: 'migrationFramework', fileName: 'frameworksMigrationAndHumanMobility' },
  { route: '/frameworks/mental-health-governance', dataKey: 'mentalHealthFramework', fileName: 'frameworksMentalHealthGovernance' },
  { route: '/frameworks/water-and-sanitation-governance', dataKey: 'waterSanitationFramework', fileName: 'frameworksWaterAndSanitationGovernance' },
  { route: '/frameworks/environmental-stewardship', dataKey: 'environmentalStewardshipFramework', fileName: 'frameworksEnvironmentalStewardship' },
  { route: '/frameworks/animal-welfare-governance', dataKey: 'animalWelfareFramework', fileName: 'frameworksAnimalWelfareGovernance' },
  { route: '/frameworks/biodiversity-governance', dataKey: 'biodiversityGovernanceFramework', fileName: 'frameworksBiodiversityGovernance' },
  { route: '/frameworks/digital-commons', dataKey: 'digitalCommonsFramework', fileName: 'frameworksDigitalCommons' },
  { route: '/frameworks/global-ethics-and-rights-of-beings', dataKey: 'globalEthicsFramework', fileName: 'frameworksGlobalEthicsAndRightsOfBeings' },
  { route: '/frameworks/global-citizenship-practice', dataKey: 'globalCitizenshipFramework', fileName: 'frameworksGlobalCitizenshipPractice' },
  { route: '/frameworks/religious-and-spiritual-dialogue-governance', dataKey: 'religiousSpiritualFramework', fileName: 'frameworksReligiousAndSpiritualDialogueGovernance' },
  { route: '/frameworks/aging-population-support-governance', dataKey: 'agingFramework', fileName: 'frameworksAgingPopulationSupportGovernance' },
  { route: '/frameworks/global-citizenship', dataKey: 'globalCitizenship', fileName: 'globalCitizenship' },
  { route: '/frameworks/ai-futures', dataKey: 'aiFutures', fileName: 'aiFutures' },
  { route: '/frameworks/docs/implementation/treaty-for-our-only-home/getting-started', dataKey: 'startTreaty', fileName: 'startTreaty' },
  
  // Get-involved routes
  { route: '/get-involved/website', dataKey: 'website', fileName: 'website' },
  { route: '/get-involved/translations', dataKey: 'translations', fileName: 'translations' },
  { route: '/get-involved/outreach', dataKey: 'outreach', fileName: 'outreach' },
  { route: '/get-involved/frameworks', dataKey: 'frameworks', fileName: 'frameworks' },
  { route: '/get-involved', dataKey: 'getInvolved', fileName: 'getInvolved' },
  
  // Other specific routes
  { route: '/start-treaty', dataKey: 'startTreaty', fileName: 'startTreaty' },
  { route: '/translations', dataKey: 'translations', fileName: 'translations' },
  { route: '/about', dataKey: 'about', fileName: 'about' },
  { route: '/contact', dataKey: 'contact', fileName: 'contact' },
  { route: '/blog', dataKey: 'blog', fileName: 'blog' },
  { route: '/privacy', dataKey: 'privacy', fileName: 'privacy' },
  { route: '/terms', dataKey: 'terms', fileName: 'terms' },
  { route: '/downloads', dataKey: 'downloads', fileName: 'downloads' },
  { route: '/youth', dataKey: 'youth', fileName: 'youth' },
  
  // Home route (most general - must be last!)
  { route: '/', dataKey: 'home', fileName: 'home' }
];

// Reusable translation loader function
async function loadAndAssignTranslation(locale, fileName, dataKey, translationData) {
  console.log(`🔍 Attempting to load: ${locale}/${fileName}.json for dataKey: ${dataKey}`);
  try {
    const module = await import(`./${locale}/${fileName}.json`);
    translationData[dataKey] = module.default;
    console.log(`Loaded ${dataKey} translations for locale: ${locale}`);
  } catch (e) {
    console.error(`Error loading ${dataKey} translations for ${locale}:`, e);
    // Fallback to English if the specified locale fails (and it's not English)
    if (locale !== 'en') {
      try {
        const fallbackModule = await import(`./en/${fileName}.json`);
        translationData[dataKey] = fallbackModule.default;
        console.log(`✅ Successfully loaded ${dataKey} translations for locale: ${locale}`);
        console.log(`📄 Content preview:`, Object.keys(module.default));
      } catch (fallbackError) {
        console.error(`❌ Error loading ${dataKey} translations for ${locale}:`, e);
        console.error(`📁 Tried to import: ./${locale}/${fileName}.json`);
      }
    }
  }
}

// Load translations for a specific language and route
async function loadTranslations(newLocale, route = '/') {
  // Normalize route path
  if (route.startsWith(base)) route = route.slice(base.length);
  if (!route) route = '/';

  const translationData = {};

  try {
    currentRoute.set(route);
    console.log(`Loading translations for locale: ${newLocale}, route: ${route}`);

    // 1. Load common translations
    await loadAndAssignTranslation(newLocale, 'common', 'common', translationData);

    // 2. Load framework nav translations if on a framework page
    if (route.startsWith('/frameworks')) {
      await loadAndAssignTranslation(newLocale, 'framework', 'framework', translationData);
    }

    // 3. Load page-specific translations using the map
    for (const mapping of pageSpecificTranslationsMap) {
      if (route.includes(mapping.route)) {
        await loadAndAssignTranslation(newLocale, mapping.fileName, mapping.dataKey, translationData);
        // Break after the first match to mimic 'if/else if' behavior
        break; 
      }
    }

    console.log('Loaded translations data for route:', route, translationData);

    // Update the stores
    locale.set(newLocale);
    
    // Preserve existing translations and merge with new ones
    translations.update(existingTranslations => {
      console.log('Existing translations before merge:', Object.keys(existingTranslations));
      console.log('New translations to merge:', Object.keys(translationData));
      
      // Always preserve climateFramework translations if they exist and we're not explicitly updating them
      const shouldPreserveClimateFramework = existingTranslations.climateFramework && 
        !translationData.climateFramework && 
        !route.includes('/frameworks/climate-and-energy-governance');
      
      if (shouldPreserveClimateFramework) {
        console.log('Preserving existing climateFramework translations');
        return { 
          ...existingTranslations, 
          ...translationData, 
          climateFramework: existingTranslations.climateFramework 
        };
      }
      
      // Default merge
      const merged = { ...existingTranslations, ...translationData };
      console.log('Merged translations:', Object.keys(merged));
      return merged;
    });

    if (browser) {
      localStorage.setItem('locale', newLocale);
    }

    return translationData;
  } catch (e) {
    console.error('General error in loadTranslations:', e);
    return {};
  }
}

// Create a derived store that returns a translation function
const t = derived(
  [locale, translations],
  ([$locale, $translations]) => {
    // Return a function that takes a key and returns the translation
    return (key, params = {}) => {
      // If the key is empty or not a string, return an empty string
      if (!key || typeof key !== 'string') {
        return '';
      }
      
      // Split the key by dots to navigate nested objects
      const parts = key.split('.');
      let result = $translations;
      
      // Navigate through the translation object
      for (const part of parts) {
        if (result && typeof result === 'object' && part in result) {
          result = result[part];
        } else {
          // If in development, log warning
          if (process.env.NODE_ENV === 'development') {
            console.warn(`Translation key not found: ${key}`);
          }
          // Return empty string instead of the key to avoid showing raw translation keys
          return '';
        }
      }
      
      // Handle different types of results
      if (result === null || result === undefined) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Translation value is null or undefined for key: ${key}`);
        }
        return '';
      }
      
      // Handle string interpolation for parameters like {current} and {total}
      if (typeof result === 'string' && Object.keys(params).length > 0) {
        return result.replace(/\{(\w+)\}/g, (match, paramName) => {
          return params[paramName] !== undefined ? params[paramName] : match;
        });
      }
      
      return result;
    };
  }
);

// Function to reload translations when locale changes
function setLocale(newLocale) {
  if (supportedLocales.includes(newLocale)) {
    // Load translations for the current route with the new locale
    const route = get(currentRoute);
    loadTranslations(newLocale, route);
    
    // Update localStorage
    setLocalStorage('locale', newLocale);
    
    // Set cookie for server-side locale detection
    if (browser) {
      document.cookie = `locale=${newLocale}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`;
    }
    
    // Update URL with language parameter for immediate effect
    if (browser) {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', newLocale);
      
      // For blog pages, we want to reload to get the correct posts
      if (window.location.pathname.startsWith('/blog')) {
        window.location.href = url.toString();
      } else {
        window.history.replaceState(null, '', url.toString());
      }
    }
  }
}

// Utility function to detect the user's preferred locale
const detectLocale = () => {
  if (!browser) return 'en';
  
  // First check URL params
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');
  if (urlLang && supportedLocales.includes(urlLang)) {
    return urlLang;
  }
  
  // Then check localStorage
  const savedLocale = getLocalStorage('locale', null);
  if (savedLocale && supportedLocales.includes(savedLocale)) {
    return savedLocale;
  }
  
  // Finally fall back to browser language
  const userLocale = getBrowserLanguage();
  return supportedLocales.includes(userLocale) ? userLocale : 'en';
};

// Add information about available languages
const languageData = {
  en: { language: 'English' },
  sv: { language: 'Svenska' }
};

// Function to get language name
function getLanguageName(localeCode) {
  return languageData[localeCode]?.language || localeCode;
}

// Export everything needed by the app
export {
  loadTranslations,
  locale,
  locales,
  t,
  setLocale,
  detectLocale,
  languageData,
  getLanguageName,
  currentRoute,
  translations
};
