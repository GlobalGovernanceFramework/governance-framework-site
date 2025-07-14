<!-- lib/components/FrameworkComingSoon.svelte -->
<script>
  import { locale } from '$lib/i18n';
  
  // Required props
  export let frameworkName; // e.g., 'migration', 'urban', 'oceans', etc.
  export let icon = '🚧'; // Default construction icon
  
  // Optional props with defaults
  export let expectedQuarter = 'Q4 2025';
  export let features = [];
  export let description = '';
  export let themeColors = {
    primary: '#2B4B8C',
    secondary: '#6B5CA5', 
    accent: '#DAA520',
    light: '#f8f9fc'
  };
  export let contactEmail = 'frameworks@yourcompany.com';
  export let frameworksPageUrl = '/frameworks';
  
  // Track current locale
  $: currentLocale = $locale;
  
  // Framework-specific translations
  const frameworkTranslations = {
    migration: {
      en: {
        title: 'Migration & Human Mobility Framework',
        defaultDescription: "We're developing a revolutionary framework treating migration as a natural planetary force, creating fluid sovereignty systems that honor movement as life itself.",
        defaultFeatures: [
          'Global Mobility Passport and Hearts currency integration',
          'Climate Resilience Visas and ecological stewardship migration',
          'Regenerative resettlement and planetary healing programs',
          'Decolonized borders and Indigenous transit corridors',
          'Migration Justice Tribunals and reparative mobility policies'
        ]
      },
      sv: {
        title: 'Migration & mänsklig rörlighet ramverk',
        defaultDescription: "Vi utvecklar ett revolutionerande ramverk som behandlar migration som en naturlig planetär kraft och skapar flytande suveränitetssystem som hedrar rörelse som själva livet.",
        defaultFeatures: [
          'Globalt rörlighetspass och Hearts-valutaintegration',
          'Klimatmotståndskraftvisa och ekologisk förvaltarmigration',
          'Regenerativ återbosättning och planetära läkningsprogram',
          'Avkoloniserade gränser och ursprungsbefolknings-transitkorridorer',
          'Migrationsrättvisetribunaler och reparativa rörlighetspolicys'
        ]
      }
    },
    gaianTrade: {
      en: {
        title: 'The Gaian Trade Framework',
        defaultDescription: "We're developing a revolutionary framework that transforms global trade from colonial extraction to regenerative exchange, treating commerce as a sacred covenant with Earth through planetary resource stewardship.",
        defaultFeatures: [
          'Digital Product & Material Passports with blockchain-verified ecological and labor justice scores',
          'Regenerative Trade Zones (RTZs) replacing extractive agreements with planetary boundary compliance',
          'Global Trade and Resource Council with Indigenous veto power and youth representation',
          'Bioregional Trade and Resource Hubs managing zero-emission ports and circular infrastructure',
          'Planetary Boundary Tariffs pricing embodied carbon, biodiversity impact, and resource depletion',
          'Global Commons Contribution system funding restoration through resource royalties',
          'Just Transition Corps supporting fossil fuel regions in developing regenerative economies',
          'Hearts currency integration enabling trade incentives within the regenerative economy'
        ]
      },
      sv: {
        title: 'Det Gaianska Handelsramverket',
        defaultDescription: "Vi utvecklar ett revolutionerande ramverk som transformerar global handel från kolonialt utvinning till regenerativt utbyte, och behandlar handel som ett heligt förbund med jorden genom planetär resursförvaltning.",
        defaultFeatures: [
          'Digitala produkt- och materialpass med blockchain-verifierade ekologiska och arbetarättvisepoäng',
          'Regenerativa handelszoner (RTZ) som ersätter utvinningsavtal med planetära gränsefterlevnad',
          'Globalt handels- och resursråd med ursprungsbefolknings vetorätt och ungdomsrepresentation',
          'Bioregionala handels- och resurshub som förvaltar utsläppsfria hamnar och cirkulär infrastruktur',
          'Planetära gränstariffer som prissätter förkroppsligat kol, biologisk mångfaldseffekt och resursutarmning',
          'Globalt allmänningsbidragssystem som finansierar återställning genom resursroyalties',
          'Rättvis övergångskår som stödjer fossilbränsleregioner i att utveckla regenerativa ekonomier',
          'Hearts-valutaintegration som möjliggör handelsincitament inom den regenerativa ekonomin'
        ]
      }
    },
    synbio: {
      en: {
        title: 'Synthetic Biology & Advanced Biotech Governance',
        defaultDescription: "We're developing a comprehensive framework for governing synthetic biology and biotechnology that balances innovation with safety, equity, and respect for life's sacred complexity.",
        defaultFeatures: [
          'Global Biosafety Council with mandatory safety protocols and containment systems for engineered organisms',
          'Democratic Oversight Assembly with citizen juries and Indigenous councils holding veto power over high-risk research',
          'Universal Access Mandate ensuring life-saving biotechnology reaches all communities through compulsory licensing',
          'Rights of Nature Integration requiring ecosystem consent and integrity assessment for all bioengineering projects',
          'Biopiracy Prevention Protocols protecting traditional knowledge and genetic resources with Indigenous sovereignty',
          'Real-time Global Monitoring Network tracking engineered organisms with AI-powered early warning systems',
          'Open Knowledge Commons sharing essential research while respecting Indigenous knowledge sovereignty',
          'Precautionary Innovation Standards requiring extensive safety testing and reversibility mechanisms'
        ]
      },
      sv: {
        title: 'Syntetisk biologi & avancerad bioteknikstyrning',
        defaultDescription: "Vi utvecklar ett omfattande ramverk för att styra syntetisk biologi och bioteknik som balanserar innovation med säkerhet, rättvisa och respekt för livets heliga komplexitet.",
        defaultFeatures: [
          'Globalt biosäkerhetsråd med obligatoriska säkerhetsprotokoll och inneslutningssystem för konstruerade organismer',
          'Demokratisk tillsynsförsamling med medborgarjurys och ursprungsbefolkningsråd med vetorätt över högriskforskning',
          'Universellt tillgångsmandat som säkerställer att livräddande bioteknik når alla samhällen genom tvångslicensiering',
          'Integration av naturens rättigheter som kräver ekosystemsamtycke och integritetsbedömning för alla biotekniska projekt',
          'Protokoll för förebyggande av biopiratkopiering som skyddar traditionell kunskap och genetiska resurser med ursprungsbefolknings suveränitet',
          'Realtids globalt övervakningsnätverk som spårar konstruerade organismer med AI-drivna förvarningssystem',
          'Öppna kunskapsallmänningar som delar väsentlig forskning samtidigt som de respekterar ursprungsbefolknings kunskapssuveränitet',
          'Försiktighetsstandarder för innovation som kräver omfattande säkerhetstestning och reversiblitetsmekanismer'
        ]
      }
    },
    aubi: {
      en: {
        title: 'Adaptive Universal Basic Income (AUBI)',
        defaultDescription: "We're developing a revolutionary framework that transforms traditional UBI into a living system for enacting the Treaty for Our Only Home's social promises, channeling Hearts and Leaves currencies to nurture Right Relationship, human flourishing, and ecological restoration.",
        defaultFeatures: [
          'Four-layer payout system rooted in Indigenous wisdom: relational wealth, universal baseline, contribution bonuses, and equity supplements',
          'Hearts & Leaves dual currency rewarding care work and ecological restoration through blockchain-verified Love Ledger',
          'Social Resilience Council with 40% Indigenous representation, FPIC 2.0 protocols, and Earth Council veto power',
          'Love, Meaning & Connection Index (LMCI) replacing GDP with metrics of Right Relationship and human-land connections',
          'Hybrid fiat/Hearts baseline (70/30) ensuring economic dignity while building regenerative economy',
          'Indigenous-guided governance with ceremonial decision-making and Red Lines Clause protections',
          'Treaty integration delivering social contract promises through Pillar 4 planetary health mechanisms',
          'Global pilot program starting in Indigenous-led Bioregional Autonomous Zones with community sovereignty'
        ]
      },
      sv: {
        title: 'Adaptiv Universell Basinkomst (AUBI)',
        defaultDescription: "Vi utvecklar ett revolutionerande ramverk som transformerar traditionell UBI till ett levande system för att förverkliga Fördraget för vårt enda hems sociala löften, genom att kanalisera Hearts och Leaves-valutor för att vårda rätta relationer, mänskligt välmående och ekologisk återställning.",
        defaultFeatures: [
          'Fyralagers utbetalningssystem rotat i ursprungsbefolknings visdom: relationell rikedom, universell grundnivå, bidragsbonusar och rättviseförstärkningar',
          'Hearts & Leaves dubbelvaluta som belönar omsorgsarbete och ekologisk återställning genom blockchain-verifierad Kärleksregister',
          'Social Motståndskraftsråd med 40% ursprungsbefolkningsrepresentation, FPIC 2.0-protokoll och Jordråds vetorätt',
          'Kärlek, Mening & Anknytningsindex (LMCI) som ersätter BNP med mätvärden för rätta relationer och människa-land-förbindelser',
          'Hybrid fiat/Hearts grundnivå (70/30) som säkerställer ekonomisk värdighet samtidigt som den bygger regenerativ ekonomi',
          'Ursprungsbefolknings-guidat styre med ceremoniellt beslutsfattande och Red Lines Clause-skydd',
          'Fördragsintegration som levererar sociala kontraktslöften genom Pelare 4 planetära hälsomekanismer',
          'Globalt pilotprogram som startar i ursprungsbefolknings-ledda Bioregionala Autonoma Zoner med gemenskapssuveränitet'
        ]
      }
    },
    phoenix: {
      en: {
        title: 'The Phoenix Protocol: Waste & Circular Economy',
        defaultDescription: "We're developing a revolutionary framework that eliminates the concept of 'waste' through superior design and regenerative systems, serving as the Material Reality operating system that transforms humanity's relationship with materials and resources.",
        defaultFeatures: [
          'Global Materials Passport System with quantum-encrypted blockchain tracking circularity, toxicity, and ecosystem impact',
          'Five Core Pillars: Design standards, reverse logistics, circular finance, community composting, and toxic phase-out protocols',
          'Material categorization from biological nutrients to monstrous hybrids targeted for elimination by 2040',
          'Virgin Material Tax and Circularity Bonds creating economic incentives for regenerative design and Global South support',
          'Community Work Teams managing organic waste through Hearts and Leaves rewards in the Love Ledger',
          'Blue Circular Economy recovering 10 million tons of ocean plastic and managing maritime waste circularity',
          'Cosmic Circularity extending principles to space manufacturing and 50% orbital debris recycling by 2040',
          'Indigenous wisdom integration through Māori whakapapa stewardship and 7-generation decision-making frameworks'
        ]
      },
      sv: {
        title: 'Fenixprotokollet: Avfall & cirkulär ekonomi',
        defaultDescription: "Vi utvecklar ett revolutionerande ramverk som eliminerar begreppet 'avfall' genom överlägsen design och regenerativa system, som fungerar som Material Reality-operativsystemet som transformerar mänsklighetens relation till material och resurser.",
        defaultFeatures: [
          'Globalt materialpasssystem med kvantumkrypterat blockchain som spårar cirkularitet, toxicitet och ekosystempåverkan',
          'Fem kärnpelare: Designstandarder, omvänd logistik, cirkulär finansiering, kompostning och toxisk utfasning',
          'Materialkategorisering från biologiska näringsämnen till monstruösa hybrider med målsättning för eliminering år 2040',
          'Jungfrulig materialskatt och cirkularitetsobligationer som skapar ekonomiska incitament för regenerativ design och Global Syd-stöd',
          'Samhällsarbetsteam som hanterar organiskt avfall genom Hearts och Leaves-belöningar i Kärleksregistret',
          'Blå cirkulär ekonomi som återvinner 10 miljoner ton havsplast och hanterar maritim avfallscirkularitet',
          'Kosmisk cirkularitet som utvidgar principer till rymdtillverkning och 50% återvinning av rymdskrot år 2040',
          'Integration av ursprungsbefolknings visdom genom Māori whakapapa-förvaltning och 7-generationers beslutsramar'
        ]
      }
    },
    globalHealth: {
      en: {
        title: 'Global Health & Pandemic Security',
        defaultDescription: "We're developing a comprehensive framework that strengthens health systems, ensures equitable access to care, and builds robust pandemic prevention mechanisms rooted in solidarity, scientific cooperation, and the lessons learned from COVID-19.",
        defaultFeatures: [
          'Global Health Observatory with AI-powered early warning systems for emerging health threats',
          'Universal Health Access ensuring quality healthcare services regardless of geography or income',
          'Pandemic Prevention & Preparedness with rapid vaccine development and international coordination',
          'Open Health Research platforms accelerating medical breakthroughs while ensuring knowledge accessibility',
          'Medical Manufacturing Security through distributed production networks for emergency scaling',
          'Health System Strengthening with resilient infrastructure and workforce development',
          'One Health Approach integrating human, animal, and environmental health monitoring',
          'Climate Health Adaptation preparing systems for climate-related health impacts and displacement'
        ]
      },
      sv: {
        title: 'Global hälsa & pandemisäkerhet',
        defaultDescription: "Vi utvecklar ett omfattande ramverk som stärker hälsosystem, säkerställer rättvis tillgång till vård och bygger robusta pandemiprevention baserat på solidaritet, vetenskapligt samarbete och lärdomar från COVID-19.",
        defaultFeatures: [
          'Globalt hälsoobservatorium med AI-drivna förvarningssystem för framväxande hälsohot',
          'Universell hälsotillgång som säkerställer kvalitetsvård oavsett geografi eller inkomst',
          'Pandemiprevention & beredskap med snabb vaccinutveckling och internationell koordination',
          'Öppna hälsoforskningsplattformar som accelererar medicinska genombrott samtidigt som de säkerställer kunskapstillgänglighet',
          'Medicinsk tillverkningssäkerhet genom distribuerade produktionsnätverk för nödskalning',
          'Hälsosystemförstärkning med motståndskraftig infrastruktur och personalutveckling',
          'One Health-tillvägagångssätt som integrerar övervakning av människors, djurs och miljöhälsa',
          'Klimathälsoanpassning som förbereder system för klimatrelaterade hälsopåverkningar och förflyttning'
        ]
      }
    },
    shield: {
     en: {
       title: 'The Shield Protocol: Transnational Crime & Security',
       defaultDescription: "We're developing a comprehensive framework to prevent, disrupt, and dismantle transnational criminal networks that drain $2.2 trillion annually, using AI-powered intelligence, sovereignty-respecting cooperation, and Spiral-Aware approaches to ensure justice while respecting human dignity.",
       defaultFeatures: [
         'Global Crime Intelligence Center with AI-powered threat mapping, quantum-resistant encryption, and behavioral analysis',
         'Sovereignty safeguards including supermajority voting, cultural sensitivity protocols, and annual opt-out rights',
         'Tiered threat classification from existential risks to emergent criminal vectors with appropriate responses',
         'Global Enforcement Task Force conducting poly-jurisdictional investigations with community oversight',
         'Illicit finance disruption through asset recovery, beneficial ownership registries, and transparency certificates',
         'Spiral-Aware rehabilitation addressing consciousness stages behind criminal behavior with pro-social pathways',
         'Victim-centered justice prioritizing rescue, support, and restitution funded by seized criminal assets',
         'Sustainable funding through asset recovery (40%), sin taxes (25%), and carbon/Tobin taxes (20%)'
       ]
     },
     sv: {
       title: 'Skyddsprotokoll: Transnationell brottslighet & säkerhet',
       defaultDescription: "Vi utvecklar ett omfattande ramverk för att förebygga, störa och avveckla transnationella kriminella nätverk som dränerar 2,2 biljoner dollar årligen, med AI-driven underrättelse, suveränitetrespekterande samarbete och Spiral-medvetna tillvägagångssätt för att säkerställa rättvisa samtidigt som mänsklig värdighet respekteras.",
       defaultFeatures: [
         'Globalt brottslighetsunderrättelsecentrum med AI-driven hotmappning, kvantumresistent kryptering och beteendeanalys',
         'Suveränitetsskydd inklusive kvalificerad majoritet, kulturella känslighetsprotokoll och årliga opt-out-rättigheter',
         'Nivåindelat hotklassificeringssystem från existentiella risker till framväxande kriminella vektorer med lämpliga svar',
         'Global insatsstyrka som genomför poly-jurisdiktionella utredningar med samhällsövervakning',
         'Störning av illegal finansiering genom tillgångsåtervinning, register över verkliga ägare och transparenscertifikat',
         'Spiral-medveten rehabilitering som adresserar medvetandestadier bakom kriminellt beteende med pro-sociala vägar',
         'Offer-centrerad rättvisa som prioriterar räddning, stöd och gottgörelse finansierad av beslagtagna kriminella tillgångar',
         'Hållbar finansiering genom tillgångsåtervinning (40%), syndskatter (25%) och kol/Tobin-skatter (20%)'
       ]
     }
    },
    urban: {
      en: {
        title: 'Urban & Community Development Framework',
        defaultDescription: "We're creating a transformative framework for regenerative cities that thrive within planetary boundaries while fostering equity, resilience, and participatory governance.",
        defaultFeatures: [
          '15-minute cities with biophilic design and wildlife corridors',
          'Community land trusts and circular economy systems',
          'Universal basic services and gender-responsive urban planning',
          'Urban sanctuary networks and mental health landscapes',
          'Cross-city disaster coordination and climate adaptation infrastructure'
        ]
      },
      sv: {
        title: 'Urban & samhällsutveckling ramverk',
        defaultDescription: "Vi skapar ett transformativt ramverk för regenerativa städer som blomstrar inom planetära gränser samtidigt som de främjar rättvisa, motståndskraft och deltagande styrning.",
        defaultFeatures: [
          '15-minutersstäder med biofilisk design och vildlivskorridorer',
          'Gemenskapsjordförtroenden och cirkulära ekonomisystem',
          'Universella bastjänster och genusresponsiv stadsplanering',
          'Urbana naturskyddsnätverk och mental hälsolandskap',
          'Korsstad katastrofkoordination och klimatanpassningsinfrastruktur'
        ]
      }
    },
    soil: {
      en: {
        title: 'Soil Health & Land Use Governance Framework',
        defaultDescription: "Transforming humanity's relationship with land from extractive property to regenerative stewardship, where soil is treated as a living, sacred commons essential for all life.",
        defaultFeatures: [
          'Global Soil Health Monitoring Service with TEK integration and real-time planetary dashboard',
          'Bioregional Autonomous Zones (BAZs) with watershed governance and Indigenous authority',
          'Land Rematriation & Justice Tribunal for historical redress and stewardship reparations',
          'Global Regenerative Agriculture Fund with $50B+ transition support and risk-sharing pools',
          'Knowledge Commons Platform protecting TEK while enabling global soil wisdom sharing',
          'Regenerative Agriculture Mandates phasing out soil-degrading chemicals globally',
          'Community Land Trusts preventing speculation and ensuring commons stewardship',
          'Soil Carbon Rights Registry with community-owned credits and anti-speculation protections'
        ]
      },
      sv: {
        title: 'Markhälsa & markanvändnings-styrning ramverk',
        defaultDescription: "Transformera mänsklighetens relation till mark från utvinningsegendom till regenerativ förvaltning, där jord behandlas som en levande, helig allmänning väsentlig för allt liv.",
        defaultFeatures: [
          'Global markhälsoövervakningsservice med TEK-integration och realtids planetär dashboard',
          'Bioregionala autonoma zoner (BAZ) med vattendragsstyrning och ursprungsbefolkningsauktoritet',
          'Markåterlämnande & rättvisedomstol för historisk gottgörelse och förvaltningsreparationer',
          'Global regenerativ jordbruksfond med 50B$+ övergångsstöd och riskdelningspooler',
          'Kunskapsgemenskapsplattform som skyddar TEK samtidigt som den möjliggör global markvisdomsdelning',
          'Regenerativa jordbruksmandat som fasar ut markförstörande kemikalier globalt',
          'Gemenskapsjordförtroenden som förhindrar spekulation och säkerställer allmänning förvaltning',
          'Markkolrättighetsregister med gemenskapsägda krediter och anti-spekulationsskydd'
        ]
      }
    },
    oceans: {
      en: {
        title: 'Oceans & Marine Framework',
        defaultDescription: "We're developing a comprehensive marine framework for ocean health, sustainable fisheries, and coastal community resilience.",
        defaultFeatures: [
          'Marine ecosystem conservation and restoration',
          'Sustainable fisheries management and blue economy',
          'Ocean pollution reduction and plastic mitigation',
          'Coastal climate adaptation and resilience',
          'Indigenous-led marine stewardship programs'
        ]
      },
      sv: {
        title: 'Hav & marina ramverk',
        defaultDescription: "Vi utvecklar ett omfattande marina ramverk för havshälsa, hållbart fiske och kustsamhällens motståndskraft.",
        defaultFeatures: [
          'Bevarande och restaurering av marina ekosystem',
          'Hållbar fiskeriförvaltning och blå ekonomi',
          'Minskning av havsföroreningar och plastmittigation',
          'Klimatanpassning och motståndskraft för kustområden',
          'Ursprungsbefolknings-ledda marina förvaltningsprogram'
        ]
      }
    },
    labor: {
      en: {
        title: 'Labor & Employment Framework',
        defaultDescription: "We're building a framework for fair, dignified work in the evolving economy of the 21st century.",
        defaultFeatures: [
          'Care Bonus Pay and community work systems',
          'Shorter workweeks and flexible time arrangements',
          'Community work teams and cooperative models',
          'Green job creation and planetary stewardship',
          'Post-growth economics and care-centered work'
        ]
      },
      sv: {
        title: 'Arbete & sysselsättning ramverk',
        defaultDescription: "Vi bygger ett ramverk för rättvist, värdigt arbete i 2000-talets utvecklande ekonomi.",
        defaultFeatures: [
          'Omsorgsbonus och samhällsarbetssystem',
          'Kortare arbetsveckor och flexibla tidsarrangemang',
          'Samhällsarbetsteam och kooperativa modeller',
          'Skapande av gröna jobb och planetär förvaltning',
          'Post-tillväxtekonomi och omsorgscentrerat arbete'
        ]
      }
    },
    inclusion: {
      en: {
        title: 'Radical Disability Freedom Framework',
        defaultDescription: "Nothing About Us Without Us – A revolutionary framework reimagining governance through disability justice, centering disabled leadership to dismantle ableism and build universal design, collective care, and liberated sovereignty.",
        defaultFeatures: [
          'Global Disability Alliance with suspensive veto power over inaccessible policies',
          'Access Ombuds Network enforcing universal design with legal authority',
          'Crip Technology Labs for disabled-led innovation in AI, biotech, and assistive tech',
          'Care Cooperatives replacing exploitative systems with community-led mutual aid',
          'Ableism Tax funding reparations and accessibility infrastructure',
          'Accessibility Courts with 30-day resolutions and livestreamed proceedings',
          'Zero preventable disability deaths and 100% accessible spaces by 2040',
          'Rights of Nature integration addressing climate-induced disabilities'
        ]
      },
      sv: {
        title: 'Radikalt funktionsrättighetsfrihet ramverk',
        defaultDescription: "Inget om oss utan oss – Ett revolutionerande ramverk som omtänker styrning genom funktionsrättvisa, centrerar funktionshindersledarskap för att avskaffa ableism och bygga universell design, kollektiv omsorg och befriad suveränitet.",
        defaultFeatures: [
          'Global funktionshinderallians med suspensiv vetorätt över otillgängliga policys',
          'Tillgänglighetsombudsnätverk som genomdriver universell design med juridisk auktoritet',
          'Crip-tekniklabb för funktionshinderslett innovation inom AI, biotek och hjälpteknik',
          'Omsorgskooperativ som ersätter exploaterande system med samhällsledd ömsesidig hjälp',
          'Ableism-skatt som finansierar reparationer och tillgänglighetsinfrastruktur',
          'Tillgänglighetstribunaler med 30-dagars lösningar och livestreamade förhandlingar',
          'Noll förebyggbara funktionshinderdödsfall och 100% tillgängliga utrymmen till 2040',
          'Naturens rättigheter integration som adresserar klimatorsakade funktionshinder'
        ]
      }
    },
    gender: {
      en: {
        title: 'Gender Equality & LGBTQ+ Rights Framework',
        defaultDescription: "We're developing a framework promoting gender equality and LGBTQ+ rights across all sectors of society.",
        defaultFeatures: [
          'Intersectional policy development and implementation',
          'LGBTQ+ inclusive spaces and protection systems',
          'Economic empowerment through cooperative models',
          'Gender-responsive healthcare and rights frameworks',
          'Cultural change and anti-discrimination programs'
        ]
      },
      sv: {
        title: 'Jämställdhet & HBTQ+ rättigheter ramverk',
        defaultDescription: "Vi utvecklar ett ramverk som främjar jämställdhet och HBTQ+ rättigheter inom alla samhällssektorer.",
        defaultFeatures: [
          'Intersektionell policyutveckling och implementering',
          'HBTQ+ inkluderande utrymmen och skyddssystem',
          'Ekonomisk empowerment genom kooperativa modeller',
          'Genusresponsiva hälsovårds- och rättighetsramverk',
          'Kulturell förändring och anti-diskrimineringsprogram'
        ]
      }
    },
    culture: {
      en: {
        title: 'Cultural Heritage Preservation Framework',
        defaultDescription: "We're crafting a framework for preserving, protecting, and celebrating cultural heritage in our globalized world.",
        defaultFeatures: [
          'Digital preservation and blockchain provenance systems',
          'Indigenous stewardship and FPIC 2.0 protocols',
          'Biocultural corridors and ecosystem integration',
          'Heritage bonds and sustainable financing',
          'Global cultural exchange and education programs'
        ]
      },
      sv: {
        title: 'Kulturarvsbevarande ramverk',
        defaultDescription: "Vi utformar ett ramverk för att bevara, skydda och fira kulturarvet i vår globaliserade värld.",
        defaultFeatures: [
          'Digital bevarande och blockchain-provenienssystem',
          'Ursprungsbefolknings-förvaltning och FPIC 2.0-protokoll',
          'Biokulturella korridorer och ekosystemintegration',
          'Kulturarvsobligationer och hållbar finansiering',
          'Globala kulturutbyten och utbildningsprogram'
        ]
      }
    },
    youth: {
      en: {
        title: 'Youth & Intergenerational Framework',
        defaultDescription: "We're building a framework that empowers youth while fostering meaningful connections across generations.",
        defaultFeatures: [
          'Youth leadership in global governance',
          'Intergenerational mentorship and wisdom exchange',
          'Climate justice and environmental stewardship',
          'Digital rights and technology ethics',
          'Truth and reconciliation processes'
        ]
      },
      sv: {
        title: 'Ungdom & intergenerationell ramverk',
        defaultDescription: "Vi bygger ett ramverk som stärker ungdomar samtidigt som det främjar meningsfulla förbindelser mellan generationer.",
        defaultFeatures: [
          'Ungdomsledarskap i global styrning',
          'Intergenerationell mentorskap och visdomsutbyte',
          'Klimaträttvisa och miljöförvaltning',
          'Digitala rättigheter och tekniketik',
          'Sanning och försoningsprocesser'
        ]
      }
    },
    space: {
      en: {
        title: 'Space Framework',
        defaultDescription: "We're developing a framework for ethical, sustainable space exploration and the peaceful use of outer space.",
        defaultFeatures: [
          'Peaceful space use and planetary defense systems',
          'Sustainable orbital management and debris mitigation',
          'Equitable access and technology sharing programs',
          'Cultural heritage protection in space exploration',
          'International coordination and crisis response'
        ]
      },
      sv: {
        title: 'Rymdramverk',
        defaultDescription: "Vi utvecklar ett ramverk för etisk, hållbar rymdforskning och fredlig användning av yttre rymden.",
        defaultFeatures: [
          'Fredlig rymdanvändning och planetära försvarssystem',
          'Hållbar omloppsbaneförvaltning och skrotminskning',
          'Rättvis tillgång och teknikdelningsprogram',
          'Kulturarvsskydd inom rymdforskning',
          'Internationell koordination och krishantering'
        ]
      }
    },
    wisdom: {
      en: {
        title: 'Wisdom Framework',
        defaultDescription: "We're creating a framework that cultivates wisdom, ethical decision-making, and long-term thinking in governance and society.",
        defaultFeatures: [
          'Contemplative practices in governance and leadership',
          'Traditional knowledge integration with modern systems',
          'Long-term thinking and future generations focus',
          'Ethical decision-making frameworks and training',
          'Wisdom-based policy development and evaluation'
        ]
      },
      sv: {
        title: 'Visdomsramverk',
        defaultDescription: "Vi skapar ett ramverk som odlar visdom, etiskt beslutsfattande och långsiktigt tänkande inom styrning och samhälle.",
        defaultFeatures: [
          'Kontemplativa metoder inom styrning och ledarskap',
          'Integration av traditionell kunskap med moderna system',
          'Långsiktigt tänkande och fokus på framtida generationer',
          'Ramverk och träning för etiskt beslutsfattande',
          'Visdomsbaserad policyutveckling och utvärdering'
        ]
      }
    },
    rural: {
      en: {
        title: 'Global Rural Development Governance Framework',
        defaultDescription: "Empowering rural communities worldwide through equitable, sustainable, and participatory development rooted in dignity, self-determination, cultural integrity, ecological kinship, and justice.",
        defaultFeatures: [
          'Global Rural Development Council with Indigenous councils and youth leadership',
          'Global Fund for Rural Development targeting $50 billion over 10 years',
          'Rural Observatory with AI-assisted tools and satellite monitoring',
          'Global Rural Academy for capacity building in local languages',
          'Universal Basic Infrastructure with climate-resilient design',
          'Community-Led Conservation with payments for ecosystem services',
          'Gender-transformative approaches mandating 50% women in leadership',
          'Digital inclusion with blockchain for land rights and cybersecurity protection'
        ]
      },
      sv: {
        title: 'Global landsbygdsutvecklings-styrning ramverk',
        defaultDescription: "Stärka landsbygdsgemenskaper världen över genom rättvis, hållbar och deltagande utveckling grundad i värdighet, självbestämmande, kulturell integritet, ekologisk samhörighet och rättvisa.",
        defaultFeatures: [
          'Global landsbygdsutvecklingsråd med ursprungsbefolkningsråd och ungdomsledarskap',
          'Global fond för landsbygdsutveckling med mål på 50 miljarder dollar över 10 år',
          'Landsbygdsobservatorium med AI-assisterade verktyg och satellitövervakning',
          'Global landsbygdsakademi för kapacitetsbyggande på lokala språk',
          'Universal grundinfrastruktur med klimatmotståndskraftig design',
          'Gemenskapslett naturvård med betalningar för ekosystemtjänster',
          'Genusstransformativa tillvägagångssätt som kräver 50% kvinnor i ledarskap',
          'Digital inkludering med blockchain för markrättigheter och cybersäkerhetsskydd'
        ]
      }
    },
    synoptic: {
      en: {
        title: 'The Synoptic Protocol: Media & Epistemic Integrity',
        defaultDescription: "We're developing a revolutionary framework that transforms our global information ecosystem to foster truth-seeking, perspectival agility, and collective wisdom, protecting citizens from epistemic threats while cultivating the capacity for wise decision-making in our interconnected world.",
        defaultFeatures: [
          'Epistemic Curriculum teaching critical thinking, media literacy, and perspectival agility integrated into global education',
          'Epistemic Institution Charter creating public-funded media organizations legally bound to truth-seeking principles',
          'Algorithmic & Platform Governance mandating transparency, user choice, and epistemic circuit breakers for viral content',
          'Digital Public Square fostering healthy discourse through Bridging Dialogues and Citizen Assemblies',
          'Epistemic Justice & Accountability enforcing the Universal Right to Reality through Digital Justice Tribunal',
          'Epistemic Crisis Response with Rapid Response Teams for disinformation warfare and AI-driven deepfake threats',
          'Global Council for Epistemic Integrity with 50% Global South representation and Indigenous knowledge integration',
          'Trauma-Informed Media Literacy and Spiral-Aware Communication for constructive cross-cultural dialogue'
        ]
      },
      sv: {
        title: 'Synoptiska Protokollet: Media & epistemisk integritet',
        defaultDescription: "Vi utvecklar ett revolutionerande ramverk som transformerar vårt globala informationsekosystem för att främja sanningssökande, perspektivisk smidighet och kollektiv visdom, skydda medborgare från epistemiska hot samtidigt som det odlar kapacitet för klok beslutsfattande i vår sammankopplade värld.",
        defaultFeatures: [
          'Epistemisk läroplan som undervisar kritiskt tänkande, mediekunnighet och perspektivisk smidighet integrerat i global utbildning',
          'Epistemisk institutionsstadga som skapar offentligt finansierade medieorganisationer juridiskt bundna till sanningssökande principer',
          'Algoritmisk & plattformsstyrning som kräver transparens, användarval och epistemiska strömbrytare för viralt innehåll',
          'Digitalt offentligt torg som främjar hälsosam diskurs genom överbryggande dialoger och medborgarförsamlingar',
          'Epistemisk rättvisa & ansvarighet som genomdriver den universella rätten till verklighet genom Digital rättvisedomstol',
          'Epistemisk krishantering med snabbinsatsteam för desinformationskrigföring och AI-drivna deepfake-hot',
          'Globalt råd för epistemisk integritet med 50% Global Syd-representation och ursprungsbefolknings kunskapsintegration',
          'Traumainformerad mediekunnighet och Spiral-medveten kommunikation för konstruktiv interkulturell dialog'
        ]
      }
    },
    wdip: {
      en: {
        title: 'Wise Decision-Making & Integration Protocol (WDIP)',
        defaultDescription: "We're developing the universal methodology providing the 'How' for wise decision-making across the Global Governance Framework - a compassionate guide for navigating uncertainty, integrating diverse forms of wisdom, and arriving at choices that are not merely effective, but wise, just, and regenerative.",
        defaultFeatures: [
          'Five-Phase Process from Invitation & Framing through Deep Inquiry, Synthesis, Deliberation, to Living Implementation',
          'Holistic Sensemaking integrating scientific, Indigenous, spiritual, artistic, and experiential perspectives',
          'Seven-Generation Scoping evaluating all decisions for 200+ year impacts on future generations',
          'Relational Accountability assessing choices based on their impact on relationships with all beings and Earth',
          'Precautionary Wisdom placing burden of proof on demonstrating safety for existential risks',
          'AI-Mediated Impact Simulation Tools stress-testing decisions against core principles and long-term consequences',
          'Indigenous & Spiritual Council consultation with traditional knowledge and ceremonial guidance',
          'Adaptive Implementation with reflexivity engines and learning loops for continuous course correction'
        ]
      },
      sv: {
        title: 'Kloka Besluts- & Integrationsprotokoll (WDIP)',
        defaultDescription: "Vi utvecklar den universella metodik som tillhandahåller 'Hur' för kloka beslut inom Global Governance Framework - en medkänslig guide för att navigera osäkerhet, integrera olika former av visdom och komma fram till val som inte bara är effektiva, utan kloka, rättvisa och regenerativa.",
        defaultFeatures: [
          'Fem-fas process från Inbjudan & Inramning genom Djup utredning, Syntes, Deliberation till Levande implementering',
          'Holistisk meningsskapande som integrerar vetenskapliga, ursprungsbefolknings-, andliga, konstnärliga och erfarenhetsbaserade perspektiv',
          'Sju-generationers omfattning som utvärderar alla beslut för 200+ års påverkan på framtida generationer',
          'Relationell ansvarighet som bedömer val baserat på deras påverkan på relationer med alla varelser och jorden',
          'Försiktig visdom som placerar bevisbördan på att visa säkerhet för existentiella risker',
          'AI-medierade påverkanssimuleringsverktyg som stresstestade beslut mot kärnprinciper och långsiktiga konsekvenser',
          'Ursprungsbefolknings- & andliga rådskonsultation med traditionell kunskap och ceremoniell vägledning',
          'Adaptiv implementering med reflexivitetsmotorer och inlärningsslingor för kontinuerlig kursjustering'
        ]
      }
    },
    regenerativeEnterprise: {
      en: {
        title: 'Regenerative Enterprise Framework',
        defaultDescription: "A revolutionary framework transforming businesses from extractive to regenerative models, aligning corporate purpose with planetary well-being. Through six comprehensive modules, we're redefining governance, operations, finance, culture, and advocacy to heal ecosystems, equitably distribute value, and foster human flourishing.",
        defaultFeatures: [
          'Module 0: Digital Foundations with Ethical AI Governance through Turing Councils and regenerative digital twins',
          'Module 1: Regenerative Core with stakeholder governance, steward-ownership models, and Rights of Nature integration',
          'Module 2: Regenerative Operations featuring circular design, Digital Product Passports, and ecological impact accounting',
          'Module 3: Equitable Finance with Hearts/Leaves currencies, community wealth building, and living asset depreciation',
          'Module 4: Thriving Cultures achieving Work in Liberation certification with psychological safety and flexible arrangements',
          'Module 5: Ecosystemic Engagement through Regenerative Trade Zone charters and open-source Patent Commons',
          'Pathfinder Program implementation pathway from exploration to systemic leadership over 2-4 years',
          'Integration with Global Governance Frameworks including AUBI, Gaian Trade, and Aurora Accord systems'
        ]
      },
      sv: {
        title: 'Ramverk för regenerativa företag',
        defaultDescription: "Ett revolutionerande ramverk som transformerar företag från utvinningsmodeller till regenerativa modeller, och anpassar företagssyfte med planetär välmående. Genom sex omfattande moduler omdefinierar vi styrning, verksamhet, finans, kultur och advocacy för att läka ekosystem, rättvist fördela värde och främja mänskligt välmående.",
        defaultFeatures: [
          'Modul 0: Digitala grunder med etisk AI-styrning genom Turing-råd och regenerativa digitala tvillingar',
          'Modul 1: Regenerativ kärna med intressentstyrning, förvaltarägarskap och integration av naturens rättigheter',
          'Modul 2: Regenerativ verksamhet med cirkulär design, digitala produktpass och ekologisk påverkansbokföring',
          'Modul 3: Rättvis finans med Hearts/Leaves-valutor, samhällsvälstånd och levande tillgångsavskrivning',
          'Modul 4: Blomstrande kulturer som uppnår arbete-i-befrielse-certifiering med psykologisk säkerhet och flexibla arrangemang',
          'Modul 5: Ekosystemiskt engagemang genom regenerativa handelszon-stadgar och öppen källkods gemensamma patent',
          'Implementeringsväg av stigfinnarprogram, från utforskning till systemiskt ledarskap över 2-4 år',
          'Integration med Global Governance Frameworks inklusive AUBI, Gaian Trade och Aurora Accord-system'
        ]
      }
    },
    existential: {
      en: {
        title: 'Global Existential Risk Governance Framework',
        defaultDescription: "The IPCC for All Existential Risks - a comprehensive governance framework for preventing, mitigating, and building resilience against global catastrophic threats to humanity's survival, from AI misalignment to climate collapse.",
        defaultFeatures: [
          'Existential Risk Observatory (ERO) with AI-driven risk assessment and public dashboard',
          'Existential Security Council (UN-ESC) with veto power for global catastrophic risk resolutions',
          'Tiered risk classification system from high-priority actionable risks to watchlist monitoring',
          'AI Safety Accord with moratorium on unaligned AGI until 2040 and alignment enforcement',
          'Pandemic Radar using federated learning for privacy-preserving genomic surveillance',
          'Space Governance Body coordinating asteroid deflection and extraterrestrial risk protocols',
          'World Risk Assembly with citizen juries and Global South representation',
          'Existential Civics education for 100M people by 2030 with epistemic security training',
          'Mobile GERG Risk App providing real-time risk exposure and resilience data',
          'Global Response Teams with Interpol-like jurisdiction and oversight tribunal protection'
        ]
      },
      sv: {
        title: 'Global existentiell risk-styrning ramverk',
        defaultDescription: "IPCC för alla existentiella risker - ett omfattande styrningsramverk för att förebygga, mildra och bygga motståndskraft mot globala katastrofala hot mot mänsklighetens överlevnad, från AI-missanpassning till klimatkollaps.",
        defaultFeatures: [
          'Existentiell riskobservatorium (ERO) med AI-driven riskbedömning och offentlig dashboard',
          'Existentiell säkerhetsråd (UN-ESC) med vetorätt för globala katastrofala riskresolutioner',
          'Nivåindelat riskklassificeringssystem från högprioriterade åtgärdbara risker till bevakningslista',
          'AI-säkerhetsavtal med moratorium på ej-anpassad AGI till 2040 och anpassningsövervakning',
          'Pandemi-radar med federerad inlärning för integritetsskyddande genomisk övervakning',
          'Rymdstyrningsorgan som koordinerar asteroidavböjning och utomjordiska riskprotokoll',
          'Världsriskförsamling med medborgarjurys och Global Syd-representation',
          'Existentiell medborgarundervisning för 100M människor till 2030 med epistemisk säkerhetsträning',
          'Mobil GERG Risk-app som ger realtids-riskexponering och motståndskraftsdata',
          'Globala insatsteam med Interpol-liknande jurisdiktion och övervakningsdomstolsskydd'
        ]
      }
    }
  };

  // Get localized text for common UI elements
  function getLocalizedText(key) {
    const texts = {
      en: {
        comingSoon: 'Coming Soon',
        description: 'This framework will include:',
        developmentStatus: 'Currently in Development',
        timeline: 'Expected completion:',
        expressInterest: 'Express Interest',
        learnMore: 'Learn About Our Other Frameworks'
      },
      sv: {
        comingSoon: 'Kommer snart',
        description: 'Detta ramverk kommer att inkludera:',
        developmentStatus: 'För närvarande under utveckling',
        timeline: 'Förväntad färdigställning:',
        expressInterest: 'Uttryck intresse',
        learnMore: 'Lär dig om våra andra ramverk'
      }
    };
    
    return (texts[currentLocale] || texts.en)[key] || key;
  }

  // Get framework-specific content
  $: frameworkData = frameworkTranslations[frameworkName] || {};
  $: localizedFramework = frameworkData[currentLocale] || frameworkData.en || {};
  
  $: finalTitle = localizedFramework.title || `${frameworkName} Framework`;
  $: finalDescription = description || localizedFramework.defaultDescription || `We're developing the ${frameworkName} framework.`;
  $: finalFeatures = features.length > 0 ? features : (localizedFramework.defaultFeatures || []);

  // Track interest function
  function trackInterest() {
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'framework_interest', {
        framework_name: frameworkName,
        language: currentLocale
      });
    }
    
    // Open email client
    const subject = encodeURIComponent(`Interest in ${finalTitle}`);
    const body = encodeURIComponent(`Hi,\n\nI'm interested in learning more about the ${finalTitle} when it becomes available.\n\nBest regards`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  }
</script>

<div class="framework-planned-card" style="--primary-color: {themeColors.primary}; --secondary-color: {themeColors.secondary}; --accent-color: {themeColors.accent}; --light-color: {themeColors.light}">
  <div class="card-header">
    <div class="card-icon">{icon}</div>
    <div class="card-title-section">
      <h1>{finalTitle}</h1>
      <div class="status-badge">
        <span class="status-dot"></span>
        {getLocalizedText('developmentStatus')}
      </div>
    </div>
  </div>
  
  <div class="card-content">
    <p class="description">{finalDescription}</p>
    
    {#if finalFeatures.length > 0}
      <div class="features-section">
        <h3>{getLocalizedText('description')}</h3>
        <ul class="features-list">
          {#each finalFeatures as feature, index}
            <li>
              {#if frameworkName === 'shield'}
                {index === 0 ? '🧠' : index === 1 ? '⚖️' : index === 2 ? '🎯' : index === 3 ? '🚔' : index === 4 ? '💰' : index === 5 ? '🔄' : index === 6 ? '❤️' : '🛡️'}
              {:else if frameworkName === 'wdip'}
                {index === 0 ? '🔄' : index === 1 ? '🌀' : index === 2 ? '🌳' : index === 3 ? '❤️' : index === 4 ? '⚠️' : index === 5 ? '🤖' : index === 6 ? '🪶' : '🔄'}
              {:else if frameworkName === 'synoptic'}
                {index === 0 ? '🎓' : index === 1 ? '🏛️' : index === 2 ? '⚙️' : index === 3 ? '🗣️' : index === 4 ? '⚖️' : index === 5 ? '🚨' : index === 6 ? '🌍' : '🧠'}
              {:else if frameworkName === 'globalHealth'}
                {index === 0 ? '🔬' : index === 1 ? '🏥' : index === 2 ? '🛡️' : index === 3 ? '📚' : index === 4 ? '🏭' : index === 5 ? '💪' : index === 6 ? '🌍' : '🌡️'}
              {:else if frameworkName === 'phoenix'}
                {index === 0 ? '📱' : index === 1 ? '🏗️' : index === 2 ? '🗂️' : index === 3 ? '💰' : index === 4 ? '🌱' : index === 5 ? '🌊' : index === 6 ? '🚀' : '🪶'}
              {:else if frameworkName === 'aubi'}
                {index === 0 ? '🌱' : index === 1 ? '💚' : index === 2 ? '🏛️' : index === 3 ? '📊' : index === 4 ? '💰' : index === 5 ? '🪶' : index === 6 ? '⚖️' : '🌍'}
              {:else if frameworkName === 'synbio'}
                {index === 0 ? '🛡️' : index === 1 ? '🏛️' : index === 2 ? '🌍' : index === 3 ? '⚖️' : index === 4 ? '🌾' : index === 5 ? '📡' : index === 6 ? '📚' : '🔬'}
              {:else if frameworkName === 'gaianTrade'}
                {index === 0 ? '📱' : index === 1 ? '🌱' : index === 2 ? '🏛️' : index === 3 ? '🚢' : index === 4 ? '💰' : index === 5 ? '🌊' : index === 6 ? '⚡' : '💚'}
              {:else if frameworkName === 'migration'}
                {index === 0 ? '🌡️' : index === 1 ? '💼' : index === 2 ? '🏛️' : index === 3 ? '⚖️' : '💻'}
              {:else if frameworkName === 'urban'}
                {index === 0 ? '🏙️' : index === 1 ? '👥' : index === 2 ? '🌱' : index === 3 ? '🏠' : '🤝'}
              {:else if frameworkName === 'oceans'}
                {index === 0 ? '🐋' : index === 1 ? '🎣' : index === 2 ? '🌊' : index === 3 ? '🏖️' : '💙'}
              {:else if frameworkName === 'labor'}
                {index === 0 ? '🤖' : index === 1 ? '✊' : index === 2 ? '📚' : index === 3 ? '💼' : '💰'}
              {:else if frameworkName === 'inclusion'}
                {index === 0 ? '🏛️' : index === 1 ? '⚖️' : index === 2 ? '🔬' : index === 3 ? '🤝' : index === 4 ? '💰' : index === 5 ? '🏛️' : index === 6 ? '🎯' : '🌍'}
              {:else if frameworkName === 'gender'}
                {index === 0 ? '⚖️' : index === 1 ? '🏳️‍🌈' : index === 2 ? '💪' : index === 3 ? '🏥' : '📚'}
              {:else if frameworkName === 'culture'}
                {index === 0 ? '📜' : index === 1 ? '🏛️' : index === 2 ? '💾' : index === 3 ? '👥' : '🎓'}
              {:else if frameworkName === 'youth'}
                {index === 0 ? '👨‍💼' : index === 1 ? '🤝' : index === 2 ? '💚' : index === 3 ? '🚀' : '🌍'}
              {:else if frameworkName === 'space'}
                {index === 0 ? '🚀' : index === 1 ? '🌍' : index === 2 ? '⚖️' : index === 3 ? '🛸' : '🔬'}
              {:else if frameworkName === 'wisdom'}
                {index === 0 ? '🧠' : index === 1 ? '⚖️' : index === 2 ? '🔮' : index === 3 ? '📚' : '🧘'}
              {:else if frameworkName === 'soil'}
                {index === 0 ? '📊' : index === 1 ? '🌊' : index === 2 ? '⚖️' : index === 3 ? '💰' : index === 4 ? '📚' : index === 5 ? '🚜' : index === 6 ? '🏡' : '🌱'}
              {:else if frameworkName === 'rural'}
                {index === 0 ? '🏛️' : index === 1 ? '💰' : index === 2 ? '📡' : index === 3 ? '🎓' : index === 4 ? '🏗️' : index === 5 ? '🌱' : index === 6 ? '👩‍💼' : '🔐'}
              {:else if frameworkName === 'existential'}
                {index === 0 ? '📊' : index === 1 ? '🏛️' : index === 2 ? '📋' : index === 3 ? '🤖' : index === 4 ? '🦠' : index === 5 ? '🚀' : index === 6 ? '🗳️' : index === 7 ? '📚' : index === 8 ? '📱' : '⚡'}
              {:else}
                🔹
              {/if}
              {feature}
            </li>
          {/each}
        </ul>
      </div>
    {/if}
    
    <div class="timeline-section">
      <p class="timeline">{getLocalizedText('timeline')} {expectedQuarter}</p>
    </div>
    
    <div class="card-actions">
      <button class="primary-btn" on:click={trackInterest}>
        {getLocalizedText('expressInterest')} <span class="mail-icon">✉️</span>
      </button>
      <a href={frameworksPageUrl} class="secondary-btn">
        {getLocalizedText('learnMore')} <span class="arrow-icon">→</span>
      </a>
    </div>
  </div>
</div>

<style>
  /* Framework Coming Soon Card */
  .framework-planned-card {
    background: linear-gradient(135deg, rgba(43, 75, 140, 0.1) 0%, rgba(107, 92, 165, 0.1) 100%);
    border-radius: 1rem;
    margin-bottom: 2rem;
    box-shadow: 0 8px 16px rgba(43, 75, 140, 0.15);
    border: 1px solid var(--primary-color, #2B4B8C);
    border-opacity: 0.2;
    overflow: hidden;
  }

  .card-header {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    padding: 2rem 2rem 1rem 2rem;
    background: linear-gradient(135deg, rgba(43, 75, 140, 0.05), rgba(107, 92, 165, 0.05));
  }

  .card-icon {
    font-size: 3rem;
    color: var(--primary-color, #2B4B8C);
    flex-shrink: 0;
    margin-top: 0.25rem;
  }

  .card-title-section {
    flex: 1;
  }

  .card-title-section h1 {
    margin: 0 0 0.75rem 0;
    color: var(--primary-color, #2B4B8C);
    font-size: 2rem;
    font-weight: 700;
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background-color: rgba(218, 165, 32, 0.1);
    color: var(--accent-color, #DAA520);
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-size: 0.875rem;
    font-weight: 500;
    border: 1px solid rgba(218, 165, 32, 0.3);
  }

  .status-dot {
    width: 8px;
    height: 8px;
    background-color: var(--accent-color, #DAA520);
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .card-content {
    padding: 1rem 2rem 2rem 2rem;
  }

  .description {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #4b5563;
    margin-bottom: 2rem;
  }

  .features-section {
    margin-bottom: 2rem;
  }

  .features-section h3 {
    color: var(--primary-color, #2B4B8C);
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }

  .features-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .features-list li {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 0;
    color: #4b5563;
    font-size: 1rem;
    border-bottom: 1px solid rgba(43, 75, 140, 0.1);
  }

  .features-list li:last-child {
    border-bottom: none;
  }

  .timeline-section {
    background-color: rgba(43, 75, 140, 0.05);
    border-radius: 0.5rem;
    padding: 1rem 1.5rem;
    margin-bottom: 2rem;
    border-left: 4px solid var(--primary-color, #2B4B8C);
  }

  .timeline {
    margin: 0;
    color: var(--primary-color, #2B4B8C);
    font-weight: 600;
    font-size: 1rem;
  }

  .card-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
  }

  .primary-btn {
    background-color: var(--primary-color, #2B4B8C);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
  }

  .primary-btn:hover {
    background-color: var(--secondary-color, #6B5CA5);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(43, 75, 140, 0.2);
  }

  .secondary-btn {
    background-color: white;
    color: var(--primary-color, #2B4B8C);
    border: 1px solid var(--primary-color, #2B4B8C);
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .secondary-btn:hover {
    background-color: rgba(43, 75, 140, 0.05);
    transform: translateY(-1px);
  }

  .mail-icon,
  .arrow-icon {
    font-size: 1rem;
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .card-header {
      flex-direction: column;
      align-items: flex-start;
      padding: 1.5rem;
      gap: 1rem;
    }
    
    .card-content {
      padding: 1rem 1.5rem 1.5rem 1.5rem;
    }
    
    .card-title-section h1 {
      font-size: 1.5rem;
    }
    
    .card-actions {
      flex-direction: column;
      width: 100%;
    }
    
    .primary-btn,
    .secondary-btn {
      width: 100%;
      justify-content: center;
    }
    
    .card-icon {
      font-size: 2.5rem;
    }
  }

  @media (max-width: 480px) {
    .card-header,
    .card-content {
      padding-left: 1rem;
      padding-right: 1rem;
    }
    
    .features-list li {
      font-size: 0.9rem;
    }
    
    .description {
      font-size: 1rem;
    }
  }
</style>
