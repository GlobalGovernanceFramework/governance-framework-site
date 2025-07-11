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

// Add loading state tracking
const translationsLoading = writable(false);
const translationsLoaded = writable(false);

// Create a readable store for locales
const locales = readable(supportedLocales);

// Data-driven mapping for page-specific translations
const pageSpecificTranslationsMap = [
  { route: '/quiz', dataKey: 'findYourPlace', fileName: 'findYourPlace' },
  { route: '/my-path', dataKey: 'findYourPlace', fileName: 'findYourPlace' },
  
  // Tools routes (specific before general)
  { route: '/frameworks/tools/work-in-liberation', dataKey: 'toolsWorkInLiberation', fileName: 'toolsWorkInLiberation' },
  { route: '/frameworks/tools/financial-systems', dataKey: 'toolsFinancialSystems', fileName: 'toolsFinancialSystems' },
  { route: '/frameworks/tools/indigenous-governance-and-traditional-knowledge', dataKey: 'toolsIndigenous', fileName: 'toolsIndigenous' },
  { route: '/frameworks/tools/aubi', dataKey: 'toolsAubi', fileName: 'toolsAubi' },
  { route: '/frameworks/tools/treaty-for-our-only-home', dataKey: 'toolsTreaty', fileName: 'toolsTreaty' },
  { route: '/frameworks/tools/meta-governance', dataKey: 'toolsMetaGovernance', fileName: 'toolsMetaGovernance' },
  { route: '/frameworks/tools', dataKey: 'tools', fileName: 'tools' },
  
  // Framework routes (most specific first)
  { route: '/frameworks/work-in-liberation', dataKey: 'work-in-liberation', fileName: 'frameworksWorkInLiberation' },
  { route: '/frameworks/gaian-trade', dataKey: 'gaian-trade', fileName: 'frameworksGaianTrade' },
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
  { route: '/frameworks/find-your-place', dataKey: 'findYourPlace', fileName: 'findYourPlace' },
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
  console.log(`🔍 Loading: ${locale}/${fileName}.json for dataKey: ${dataKey}`);
  try {
    const module = await import(`./${locale}/${fileName}.json`);
    translationData[dataKey] = module.default;
    console.log(`✅ Loaded ${dataKey} translations for locale: ${locale}`);
    return true;
  } catch (e) {
    console.error(`❌ Error loading ${dataKey} translations for ${locale}:`, e);
    // Fallback to English if the specified locale fails (and it's not English)
    if (locale !== 'en') {
      try {
        const fallbackModule = await import(`./en/${fileName}.json`);
        translationData[dataKey] = fallbackModule.default;
        console.log(`✅ Fallback loaded ${dataKey} translations for locale: ${locale}`);
        return true;
      } catch (fallbackError) {
        console.error(`❌ Fallback failed for ${dataKey}:`, fallbackError);
      }
    }
    return false;
  }
}

// Load ALL required translations immediately for /my-path
async function loadAllMyPathTranslations(newLocale) {
  const translationData = {};
  
  // Load ALL required translations in parallel
  const loadPromises = [
    // Always required
    loadAndAssignTranslation(newLocale, 'common', 'common', translationData),
    
    // Framework navigation (required for framework data)
    loadAndAssignTranslation(newLocale, 'framework', 'framework', translationData),
    
    // findYourPlace translations (CRITICAL - contains framework descriptions)
    loadAndAssignTranslation(newLocale, 'findYourPlace', 'findYourPlace', translationData),
    
    // Home translations (contains constellation descriptions)
    loadAndAssignTranslation(newLocale, 'home', 'home', translationData)
  ];
  
  // Wait for ALL translations to load
  const results = await Promise.allSettled(loadPromises);
  
  console.log('My-path translation loading results:', results.map((r, i) => ({
    index: i,
    status: r.status,
    value: r.status === 'fulfilled' ? r.value : r.reason
  })));
  
  return translationData;
}

// Load translations for a specific language and route
async function loadTranslations(newLocale, route = '/') {
  translationsLoading.set(true);
  translationsLoaded.set(false);
  
  // Normalize route path
  if (route.startsWith(base)) route = route.slice(base.length);
  if (!route) route = '/';

  try {
    currentRoute.set(route);
    console.log(`Loading translations for locale: ${newLocale}, route: ${route}`);

    let translationData = {};

    // Special handling for /my-path route - load ALL required translations
    if (route === '/my-path') {
      translationData = await loadAllMyPathTranslations(newLocale);
    } else {
      // Standard loading for other routes
      // 1. Load common translations
      await loadAndAssignTranslation(newLocale, 'common', 'common', translationData);

      // 2. Load framework nav translations if on a framework page
      if (route.startsWith('/frameworks')) {
        await loadAndAssignTranslation(newLocale, 'framework', 'framework', translationData);
      }

      // 3. Special case: Load findYourPlace translations on home page
      if (route === '/' || route === '') {
        await loadAndAssignTranslation(newLocale, 'findYourPlace', 'findYourPlace', translationData);
      }

      // 4. Load page-specific translations using the map
      for (const mapping of pageSpecificTranslationsMap) {
        if (route.includes(mapping.route)) {
          await loadAndAssignTranslation(newLocale, mapping.fileName, mapping.dataKey, translationData);
          break; 
        }
      }
    }

    console.log('Loaded translations data for route:', route, Object.keys(translationData));

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

    // Mark translations as loaded
    translationsLoaded.set(true);
    translationsLoading.set(false);

    return translationData;
  } catch (e) {
    console.error('General error in loadTranslations:', e);
    translationsLoading.set(false);
    return {};
  }
}

// Create a derived store that returns a translation function
const t = derived(
  [locale, translations, translationsLoaded],
  ([$locale, $translations, $loaded]) => {
    // Return a function that takes a key and returns the translation
    return (key, params = {}) => {
      // If translations are not loaded yet, return empty string to prevent flash
      if (!$loaded) {
        console.log('Translations not loaded yet for key:', key);
        return '';
      }
      
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
            console.warn(`Translation key not found: ${key}`, 'Available translations:', Object.keys($translations));
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

// Derived store to check if translations are ready
const isLocaleLoaded = derived(
  [translationsLoaded, translationsLoading],
  ([$loaded, $loading]) => $loaded && !$loading
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
  translations,
  isLocaleLoaded,
  translationsLoaded,
  translationsLoading
};
