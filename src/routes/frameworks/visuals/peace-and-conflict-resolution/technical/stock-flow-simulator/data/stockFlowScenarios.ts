// data/stockFlowScenarios.ts

export interface Stock {
  id: string;
  name: { en: string; sv: string };
  description: { en: string; sv: string };
  initialValue: number;
  color: string;
}

export interface Flow {
  id: string;
  name: { en: string; sv: string };
  description: { en: string; sv: string };
  source: string | null; // stock id or null for external inflow
  target: string | null; // stock id or null for external outflow
  baseRate: number;
  isPositive: boolean; // for visualization (green vs red)
}

export interface Intervention {
  id: string;
  name: { en: string; sv: string };
  description: { en: string; sv: string };
  targetFlow: string | null;
  targetStock: string | null;
  multiplier: number; // for flows: 0.5 = halve the flow, 1.5 = increase by 50%
  directEffect: number | null; // for direct stock modifications
  icon: string; // for visualization
}

export interface ConflictScenario {
  id: string;
  name: { en: string; sv: string };
  description: { en: string; sv: string };
  stocks: Stock[];
  flows: Flow[];
  availableInterventions: Intervention[];
}

// Define a few sample scenarios
export const conflictScenarios: ConflictScenario[] = [
  {
    id: 'resource_conflict',
    name: {
      en: 'Natural Resource Conflict',
      sv: 'Naturresurskonflikt'
    },
    description: {
      en: 'A simulation of a conflict driven by competition over declining natural resources, showing how resource scarcity can lead to violence and community tension.',
      sv: 'En simulering av en konflikt driven av konkurrens om minskande naturresurser, som visar hur resursbrist kan leda till våld och spänningar i samhället.'
    },
    stocks: [
      {
        id: 'resources',
        name: { 
          en: 'Available Resources', 
          sv: 'Tillgängliga Resurser' 
        },
        description: {
          en: 'The quantity of accessible natural resources (water, land, minerals, etc.) available to communities.',
          sv: 'Mängden tillgängliga naturresurser (vatten, mark, mineraler, etc.) som är tillgängliga för samhällen.'
        },
        initialValue: 80,
        color: '#4ECDC4'
      },
      {
        id: 'grievances',
        name: { 
          en: 'Community Grievances', 
          sv: 'Samhällsklagomål' 
        },
        description: {
          en: 'The level of grievances and complaints within the communities regarding resource distribution and access.',
          sv: 'Nivån av klagomål och missnöje inom samhällen angående resursfördelning och tillgång.'
        },
        initialValue: 20,
        color: '#FF6B6B'
      },
      {
        id: 'violence',
        name: { 
          en: 'Violence Levels', 
          sv: 'Våldsnivåer' 
        },
        description: {
          en: 'The intensity and frequency of violent incidents related to resource competition.',
          sv: 'Intensiteten och frekvensen av våldsamma incidenter relaterade till resurskonkurrens.'
        },
        initialValue: 10,
        color: '#C1292E'
      },
      {
        id: 'cooperation',
        name: { 
          en: 'Cooperation Capacity', 
          sv: 'Samarbetskapacitet' 
        },
        description: {
          en: 'The ability and willingness of communities to work together on shared resource management.',
          sv: 'Förmågan och viljan hos samhällen att samarbeta kring gemensam resurshantering.'
        },
        initialValue: 30,
        color: '#2C8A78'
      }
    ],
    flows: [
      {
        id: 'resource_depletion',
        name: {
          en: 'Resource Depletion',
          sv: 'Resurstömning'
        },
        description: {
          en: 'The rate at which available resources are being consumed or degraded.',
          sv: 'Takten med vilken tillgängliga resurser förbrukas eller försämras.'
        },
        source: 'resources',
        target: null,
        baseRate: 2,
        isPositive: false
      },
      {
        id: 'grievance_formation',
        name: {
          en: 'Grievance Formation',
          sv: 'Klagomålsbildning'
        },
        description: {
          en: 'The rate at which grievances form due to resource scarcity.',
          sv: 'Takten med vilken klagomål bildas på grund av resursbrist.'
        },
        source: null,
        target: 'grievances',
        baseRate: 3,
        isPositive: false
      },
      {
        id: 'violence_escalation',
        name: {
          en: 'Violence Escalation',
          sv: 'Våldseskalering'
        },
        description: {
          en: 'The rate at which grievances escalate into violent confrontation.',
          sv: 'Takten med vilken klagomål eskalerar till våldsam konfrontation.'
        },
        source: 'grievances',
        target: 'violence',
        baseRate: 2,
        isPositive: false
      },
      {
        id: 'cooperation_building',
        name: {
          en: 'Cooperation Building',
          sv: 'Samarbetsbyggande'
        },
        description: {
          en: 'The rate at which cooperation capacity is built through dialogue and shared activities.',
          sv: 'Takten med vilken samarbetskapacitet byggs upp genom dialog och gemensamma aktiviteter.'
        },
        source: null,
        target: 'cooperation',
        baseRate: 1,
        isPositive: true
      },
      {
        id: 'grievance_resolution',
        name: {
          en: 'Grievance Resolution',
          sv: 'Klagomålslösning'
        },
        description: {
          en: 'The rate at which grievances are resolved through cooperation.',
          sv: 'Takten med vilken klagomål löses genom samarbete.'
        },
        source: 'grievances',
        target: null,
        baseRate: 1,
        isPositive: true
      },
      {
        id: 'violence_reduction',
        name: {
          en: 'Violence Reduction',
          sv: 'Våldsminskning'
        },
        description: {
          en: 'The rate at which violence decreases due to cooperation.',
          sv: 'Takten med vilken våld minskar på grund av samarbete.'
        },
        source: 'violence',
        target: null,
        baseRate: 0.5,
        isPositive: true
      },
      {
        id: 'resource_regeneration',
        name: {
          en: 'Resource Regeneration',
          sv: 'Resursregenerering'
        },
        description: {
          en: 'The rate at which resources naturally regenerate or are restored.',
          sv: 'Takten med vilken resurser naturligt regenererar eller återställs.'
        },
        source: null,
        target: 'resources',
        baseRate: 1,
        isPositive: true
      }
    ],
    availableInterventions: [
      {
        id: 'sustainable_management',
        name: {
          en: 'Sustainable Resource Management',
          sv: 'Hållbar Resurshantering'
        },
        description: {
          en: 'Implementation of sustainable resource management practices to reduce depletion rates.',
          sv: 'Implementering av hållbara resurshanteringsmetoder för att minska tömningstakten.'
        },
        targetFlow: 'resource_depletion',
        targetStock: null,
        multiplier: 0.6, // Reduces depletion rate by 40%
        directEffect: null,
        icon: '🌱'
      },
      {
        id: 'mediation',
        name: {
          en: 'Community Mediation',
          sv: 'Samhällsmedling'
        },
        description: {
          en: 'Facilitated dialogue between communities to address grievances and build cooperative solutions.',
          sv: 'Underlättad dialog mellan samhällen för att ta itu med klagomål och bygga samarbetslösningar.'
        },
        targetFlow: 'grievance_resolution',
        targetStock: null,
        multiplier: 2.0, // Doubles the grievance resolution rate
        directEffect: null,
        icon: '🤝'
      },
      {
        id: 'peacekeeping',
        name: {
          en: 'Peacekeeping Presence',
          sv: 'Fredsbevarande Närvaro'
        },
        description: {
          en: 'Deployment of peacekeepers to reduce violence and provide security.',
          sv: 'Utplacering av fredsbevarare för att minska våld och ge säkerhet.'
        },
        targetFlow: 'violence_reduction',
        targetStock: null,
        multiplier: 2.5, // Increases violence reduction
        directEffect: null,
        icon: '🛡️'
      },
      {
        id: 'restoration',
        name: {
          en: 'Ecosystem Restoration',
          sv: 'Ekosystemåterställning'
        },
        description: {
          en: 'Projects to restore degraded ecosystems and increase resource availability.',
          sv: 'Projekt för att återställa degraderade ekosystem och öka resurstillgängligheten.'
        },
        targetFlow: 'resource_regeneration',
        targetStock: null,
        multiplier: 3.0, // Triples resource regeneration
        directEffect: null,
        icon: '🌳'
      },
      {
        id: 'cooperative_governance',
        name: {
          en: 'Cooperative Governance',
          sv: 'Kooperativ Styrning'
        },
        description: {
          en: 'Establishment of shared resource governance institutions with representatives from all communities.',
          sv: 'Etablering av institutioner för gemensam resursstyrning med representanter från alla samhällen.'
        },
        targetFlow: 'cooperation_building',
        targetStock: null,
        multiplier: 2.0, // Doubles cooperation building
        directEffect: null,
        icon: '⚖️'
      }
    ]
  },
  {
    id: 'ethnic_relations',
    name: {
      en: 'Ethnic Group Relations',
      sv: 'Etniska Grupprelationer'
    },
    description: {
      en: 'A model of intergroup relations showing how trust, grievances, and polarization interact to either escalate or resolve conflicts between ethnic groups.',
      sv: 'En modell av mellangrupprelationer som visar hur förtroende, klagomål och polarisering samverkar för att antingen eskalera eller lösa konflikter mellan etniska grupper.'
    },
    stocks: [
      {
        id: 'trust',
        name: { 
          en: 'Intergroup Trust', 
          sv: 'Mellangruppförtroende' 
        },
        description: {
          en: 'The level of trust between different ethnic groups in the society.',
          sv: 'Nivån av förtroende mellan olika etniska grupper i samhället.'
        },
        initialValue: 40,
        color: '#4ECDC4'
      },
      {
        id: 'polarization',
        name: { 
          en: 'Social Polarization', 
          sv: 'Social Polarisering' 
        },
        description: {
          en: 'The degree to which society is divided along ethnic lines, with separate identities and spaces.',
          sv: 'I vilken grad samhället är uppdelat längs etniska linjer, med separata identiteter och utrymmen.'
        },
        initialValue: 30,
        color: '#FF6B6B'
      },
      {
        id: 'extremism',
        name: { 
          en: 'Extremist Activity', 
          sv: 'Extremistisk Aktivitet' 
        },
        description: {
          en: 'The level of activity by extremist groups exploiting ethnic tensions.',
          sv: 'Nivån av aktivitet från extremistgrupper som utnyttjar etniska spänningar.'
        },
        initialValue: 15,
        color: '#C1292E'
      },
      {
        id: 'integration',
        name: { 
          en: 'Social Integration', 
          sv: 'Social Integration' 
        },
        description: {
          en: 'The degree to which different ethnic groups interact, share spaces, and form connections.',
          sv: 'I vilken grad olika etniska grupper interagerar, delar utrymmen och bildar kopplingar.'
        },
        initialValue: 25,
        color: '#2C8A78'
      }
    ],
    flows: [
      {
        id: 'trust_erosion',
        name: {
          en: 'Trust Erosion',
          sv: 'Förtroendeförsämring'
        },
        description: {
          en: 'The rate at which trust between groups is eroded by polarization and extremism.',
          sv: 'Takten med vilken förtroende mellan grupper försämras av polarisering och extremism.'
        },
        source: 'trust',
        target: null,
        baseRate: 2,
        isPositive: false
      },
      {
        id: 'polarization_increase',
        name: {
          en: 'Polarization Increase',
          sv: 'Polariseringsökning'
        },
        description: {
          en: 'The rate at which social polarization increases due to extremist activity.',
          sv: 'Takten med vilken social polarisering ökar på grund av extremistisk aktivitet.'
        },
        source: null,
        target: 'polarization',
        baseRate: 2,
        isPositive: false
      },
      {
        id: 'extremism_recruitment',
        name: {
          en: 'Extremist Recruitment',
          sv: 'Extremistrekrytering'
        },
        description: {
          en: 'The rate at which extremist groups grow by exploiting polarization.',
          sv: 'Takten med vilken extremistgrupper växer genom att utnyttja polarisering.'
        },
        source: null,
        target: 'extremism',
        baseRate: 1,
        isPositive: false
      },
      {
        id: 'integration_building',
        name: {
          en: 'Integration Building',
          sv: 'Integrationsbyggande'
        },
        description: {
          en: 'The rate at which social integration is fostered through intergroup contact and initiatives.',
          sv: 'Takten med vilken social integration främjas genom kontakt mellan grupper och initiativ.'
        },
        source: null,
        target: 'integration',
        baseRate: 1,
        isPositive: true
      },
      {
        id: 'trust_building',
        name: {
          en: 'Trust Building',
          sv: 'Förtroendebyggande'
        },
        description: {
          en: 'The rate at which trust is built through integration activities.',
          sv: 'Takten med vilken förtroende byggs upp genom integrationsaktiviteter.'
        },
        source: null,
        target: 'trust',
        baseRate: 1,
        isPositive: true
      },
      {
        id: 'polarization_reduction',
        name: {
          en: 'Polarization Reduction',
          sv: 'Polariseringsminskning'
        },
        description: {
          en: 'The rate at which polarization decreases due to integration and trust.',
          sv: 'Takten med vilken polarisering minskar på grund av integration och förtroende.'
        },
        source: 'polarization',
        target: null,
        baseRate: 0.5,
        isPositive: true
      },
      {
        id: 'extremism_reduction',
        name: {
          en: 'Extremism Reduction',
          sv: 'Extremismminskning'
        },
        description: {
          en: 'The rate at which extremist activity decreases due to societal resilience.',
          sv: 'Takten med vilken extremistisk aktivitet minskar på grund av samhällelig motståndskraft.'
        },
        source: 'extremism',
        target: null,
        baseRate: 0.5,
        isPositive: true
      }
    ],
    availableInterventions: [
      {
        id: 'dialogue_program',
        name: {
          en: 'Interethnic Dialogue Program',
          sv: 'Program för Interetnisk Dialog'
        },
        description: {
          en: 'Structured dialogue sessions between ethnic groups to build understanding and trust.',
          sv: 'Strukturerade dialogsessioner mellan etniska grupper för att bygga förståelse och förtroende.'
        },
        targetFlow: 'trust_building',
        targetStock: null,
        multiplier: 2.0, // Doubles trust building
        directEffect: null,
        icon: '💬'
      },
      {
        id: 'integration_policy',
        name: {
          en: 'Integration Policy Package',
          sv: 'Integrationspaket'
        },
        description: {
          en: 'Comprehensive policy measures to promote integration in housing, education, and employment.',
          sv: 'Omfattande policyåtgärder för att främja integration inom boende, utbildning och arbete.'
        },
        targetFlow: 'integration_building',
        targetStock: null,
        multiplier: 2.5, // Increases integration building
        directEffect: null,
        icon: '🏘️'
      },
      {
        id: 'countering_extremism',
        name: {
          en: 'Countering Violent Extremism',
          sv: 'Motverka Våldsam Extremism'
        },
        description: {
          en: 'Targeted programs to counter extremist narratives and prevent recruitment.',
          sv: 'Riktade program för att motverka extremistiska narrativ och förhindra rekrytering.'
        },
        targetFlow: 'extremism_reduction',
        targetStock: null,
        multiplier: 2.0, // Doubles extremism reduction
        directEffect: null,
        icon: '🛑'
      },
      {
        id: 'media_campaign',
        name: {
          en: 'Inclusive Media Campaign',
          sv: 'Inkluderande Mediekampanj'
        },
        description: {
          en: 'Media campaign promoting tolerance, shared values, and countering stereotypes.',
          sv: 'Mediekampanj som främjar tolerans, gemensamma värderingar och motverkar stereotyper.'
        },
        targetFlow: 'polarization_reduction',
        targetStock: null,
        multiplier: 1.5, // Increases polarization reduction
        directEffect: null,
        icon: '📱'
      },
      {
        id: 'truth_commission',
        name: {
          en: 'Truth and Reconciliation',
          sv: 'Sanning och Försoning'
        },
        description: {
          en: 'Process to address historical grievances, acknowledge harm, and foster reconciliation.',
          sv: 'Process för att hantera historiska klagomål, erkänna skada och främja försoning.'
        },
        targetFlow: null,
        targetStock: 'trust',
        multiplier: 1.0,
        directEffect: 10, // Direct boost to trust
        icon: '⚖️'
      }
    ]
  }
];
