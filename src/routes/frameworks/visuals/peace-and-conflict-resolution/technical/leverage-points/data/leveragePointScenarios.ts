// data/leveragePointScenarios.ts

export interface LeveragePoint {
  id: string;
  x: number;
  y: number;
  label: { en: string; sv: string };
  level: number; // 1-12, with 1 being highest leverage
  initialImpact: number; // 0-10 scale
  difficulty: number; // 0-10 scale of difficulty to implement
  description: { en: string; sv: string };
}

export interface Connection {
  id: string;
  source: string;
  target: string;
  strength: number; // 0-10 scale of influence strength
}

export interface SystemElement {
  id: string;
  x: number;
  y: number;
  label: { en: string; sv: string };
  type: 'actor' | 'resource' | 'process';
  description: { en: string; sv: string };
}

export interface Boundary {
  id: string;
  label: { en: string; sv: string };
  points: { x: number; y: number }[];
  color: string;
}

export interface Intervention {
  id: string;
  name: { en: string; sv: string };
  description: { en: string; sv: string };
  targetPoint?: string; // ID of leverage point to affect
  targetConnection?: string; // ID of connection to affect
  directEffect?: number; // Direct impact on the target point
  multiplier?: number; // Multiplier for connection strength
  icon: string;
}

export interface LeveragePointScenario {
  id: string;
  name: { en: string; sv: string };
  description: { en: string; sv: string };
  leveragePoints: LeveragePoint[];
  connections: Connection[];
  elements: SystemElement[];
  boundaries: Boundary[];
  availableInterventions: Intervention[];
}

// Sample leverage point scenarios
export const leveragePointScenarios: LeveragePointScenario[] = [
  {
    id: 'ethnic_conflict',
    name: {
      en: 'Ethnic Conflict Transformation',
      sv: 'Etnisk Konflikttransformation'
    },
    description: {
      en: 'A model of interethnic conflict transformation focusing on identity narratives, institutional design, and cross-community relations.',
      sv: 'En modell för interetnisk konflikttransformation med fokus på identitetsberättelser, institutionell design och relationer mellan samhällen.'
    },
    leveragePoints: [
      {
        id: 'lp1',
        x: 300,
        y: 150,
        label: {
          en: 'Identity\nNarratives',
          sv: 'Identitets-\nberättelser'
        },
        level: 2,
        initialImpact: 5,
        difficulty: 8,
        description: {
          en: 'The collective narratives about group identities, histories, and relationships. Shifting these narratives can transform how groups perceive themselves and others.',
          sv: 'De kollektiva berättelserna om gruppidentiteter, historier och relationer. Att förändra dessa berättelser kan transformera hur grupper uppfattar sig själva och andra.'
        }
      },
      {
        id: 'lp2',
        x: 150,
        y: 250,
        label: {
          en: 'Institutional\nDesign',
          sv: 'Institutionell\nDesign'
        },
        level: 5,
        initialImpact: 4,
        difficulty: 6,
        description: {
          en: 'The formal structures and rules of governance and decision-making. Changes to these structures can alter power dynamics and create more inclusive processes.',
          sv: 'De formella strukturerna och reglerna för styrning och beslutsfattande. Förändringar i dessa strukturer kan förändra maktdynamik och skapa mer inkluderande processer.'
        }
      },
      {
        id: 'lp3',
        x: 450,
        y: 250,
        label: {
          en: 'Inter-group\nContact',
          sv: 'Kontakt mellan\ngrupper'
        },
        level: 6,
        initialImpact: 3,
        difficulty: 5,
        description: {
          en: 'The frequency, quality, and nature of interactions between groups. Increasing positive contact can reduce prejudice and build trust.',
          sv: 'Frekvensen, kvaliteten och karaktären av interaktioner mellan grupper. Att öka positiv kontakt kan minska fördomar och bygga förtroende.'
        }
      },
      {
        id: 'lp4',
        x: 200,
        y: 350,
        label: {
          en: 'Early Warning\nSystems',
          sv: 'System för\ntidig varning'
        },
        level: 8,
        initialImpact: 2,
        difficulty: 4,
        description: {
          en: 'Mechanisms to detect rising tensions or potential violence. Effective early warning can enable preventive action before conflicts escalate.',
          sv: 'Mekanismer för att upptäcka ökande spänningar eller potentiellt våld. Effektiv tidig varning kan möjliggöra förebyggande åtgärder innan konflikter eskalerar.'
        }
      },
      {
        id: 'lp5',
        x: 400,
        y: 350,
        label: {
          en: 'Resource\nAllocation',
          sv: 'Resurs-\nfördelning'
        },
        level: 11,
        initialImpact: 2,
        difficulty: 3,
        description: {
          en: 'How resources are distributed among communities. More equitable allocation can reduce grievances and competition.',
          sv: 'Hur resurser fördelas mellan samhällen. Mer rättvis fördelning kan minska klagomål och konkurrens.'
        }
      },
      {
        id: 'lp6',
        x: 300,
        y: 450,
        label: {
          en: 'Security\nArrangements',
          sv: 'Säkerhets-\narrangemang'
        },
        level: 12,
        initialImpact: 3,
        difficulty: 2,
        description: {
          en: 'Physical security measures like peacekeeping forces, police presence, and buffer zones. These can create immediate stability but don\'t address root causes.',
          sv: 'Fysiska säkerhetsåtgärder som fredsbevarande styrkor, polisiär närvaro och buffertzoner. Dessa kan skapa omedelbar stabilitet men adresserar inte grundorsakerna.'
        }
      }
    ],
    connections: [
      { id: 'conn1', source: 'lp1', target: 'lp2', strength: 7 },
      { id: 'conn2', source: 'lp1', target: 'lp3', strength: 8 },
      { id: 'conn3', source: 'lp2', target: 'lp4', strength: 5 },
      { id: 'conn4', source: 'lp2', target: 'lp5', strength: 6 },
      { id: 'conn5', source: 'lp3', target: 'lp1', strength: 4 },
      { id: 'conn6', source: 'lp4', target: 'lp6', strength: 5 },
      { id: 'conn7', source: 'lp6', target: 'lp3', strength: 3 },
      { id: 'conn8', source: 'elem1', target: 'lp1', strength: 7 },
      { id: 'conn9', source: 'elem2', target: 'lp3', strength: 6 },
      { id: 'conn10', source: 'elem1', target: 'lp2', strength: 8 },
      { id: 'conn11', source: 'elem3', target: 'lp5', strength: 7 },
      { id: 'conn12', source: 'elem4', target: 'lp6', strength: 8 }
    ],
    elements: [
      {
        id: 'elem1',
        x: 100,
        y: 150,
        label: {
          en: 'Political\nLeadership',
          sv: 'Politiskt\nLedarskap'
        },
        type: 'actor',
        description: {
          en: 'Key decision-makers and opinion leaders who influence policy and public discourse.',
          sv: 'Viktiga beslutsfattare och opinionsbildare som påverkar politik och offentlig diskurs.'
        }
      },
      {
        id: 'elem2',
        x: 500,
        y: 150,
        label: {
          en: 'Civil Society',
          sv: 'Civilsamhälle'
        },
        type: 'actor',
        description: {
          en: 'Non-governmental organizations, community groups, and activists.',
          sv: 'Icke-statliga organisationer, samhällsgrupper och aktivister.'
        }
      },
      {
        id: 'elem3',
        x: 100,
        y: 450,
        label: {
          en: 'Economic\nResources',
          sv: 'Ekonomiska\nResurser'
        },
        type: 'resource',
        description: {
          en: 'The economic assets, infrastructure, and opportunities available to different communities.',
          sv: 'De ekonomiska tillgångar, infrastruktur och möjligheter som är tillgängliga för olika samhällen.'
        }
      },
      {
        id: 'elem4',
        x: 500,
        y: 450,
        label: {
          en: 'Security\nActors',
          sv: 'Säkerhets-\naktörer'
        },
        type: 'actor',
        description: {
          en: 'Military, police, and other formal security providers.',
          sv: 'Militär, polis och andra formella säkerhetsleverantörer.'
        }
      }
    ],
    boundaries: [
      {
        id: 'bound1',
        label: {
          en: 'Political System',
          sv: 'Politiskt System'
        },
        points: [
          { x: 100, y: 100 },
          { x: 300, y: 100 },
          { x: 400, y: 200 },
          { x: 300, y: 300 },
          { x: 100, y: 300 },
          { x: 50, y: 200 }
        ],
        color: '#3498db'
      },
      {
        id: 'bound2',
        label: {
          en: 'Social System',
          sv: 'Socialt System'
        },
        points: [
          { x: 300, y: 100 },
          { x: 550, y: 100 },
          { x: 600, y: 200 },
          { x: 550, y: 300 },
          { x: 300, y: 300 },
          { x: 400, y: 200 }
        ],
        color: '#2ecc71'
      },
      {
        id: 'bound3',
        label: {
          en: 'Security System',
          sv: 'Säkerhetssystem'
        },
        points: [
          { x: 200, y: 350 },
          { x: 400, y: 350 },
          { x: 550, y: 500 },
          { x: 400, y: 550 },
          { x: 200, y: 550 },
          { x: 50, y: 500 }
        ],
        color: '#e74c3c'
      }
    ],
    availableInterventions: [
      {
        id: 'interv1',
        name: {
          en: 'Truth & Reconciliation Process',
          sv: 'Sannings- och försoningsprocess'
        },
        description: {
          en: 'Facilitated process of acknowledging historical wrongs and developing a shared understanding of the past.',
          sv: 'Faciliterad process för att erkänna historiska oförrätter och utveckla en gemensam förståelse av det förflutna.'
        },
        targetPoint: 'lp1',
        directEffect: 2,
        icon: '⚖️'
      },
      {
        id: 'interv2',
        name: {
          en: 'Power-Sharing Reform',
          sv: 'Reform för maktdelning'
        },
        description: {
          en: 'Constitutional changes to ensure all groups have representation in key decision-making bodies.',
          sv: 'Konstitutionella förändringar för att säkerställa att alla grupper har representation i viktiga beslutsfattande organ.'
        },
        targetPoint: 'lp2',
        directEffect: 2.5,
        icon: '🏛️'
      },
      {
        id: 'interv3',
        name: {
          en: 'Media Literacy Campaign',
          sv: 'Kampanj för mediekunskap'
        },
        description: {
          en: 'Educational initiative to help communities critically evaluate divisive messaging and propaganda.',
          sv: 'Utbildningsinitiativ för att hjälpa samhällen att kritiskt utvärdera splittrade budskap och propaganda.'
        },
        targetConnection: 'conn5',
        multiplier: 1.5,
        icon: '📱'
      },
      {
        id: 'interv4',
        name: {
          en: 'Intercultural Education',
          sv: 'Interkulturell utbildning'
        },
        description: {
          en: 'School-based programs promoting understanding and respect between different ethnic groups.',
          sv: 'Skolbaserade program som främjar förståelse och respekt mellan olika etniska grupper.'
        },
        targetPoint: 'lp3',
        directEffect: 1.5,
        icon: '🎓'
      },
      {
        id: 'interv5',
        name: {
          en: 'Community Early Warning Network',
          sv: 'Nätverk för tidig varning i samhället'
        },
        description: {
          en: 'Grassroots system to identify and respond to rising tensions before violence occurs.',
          sv: 'Gräsrotssystem för att identifiera och reagera på ökande spänningar innan våld uppstår.'
        },
        targetPoint: 'lp4',
        directEffect: 2,
        icon: '🔔'
      },
      {
        id: 'interv6',
        name: {
          en: 'Equitable Development Plan',
          sv: 'Plan för rättvis utveckling'
        },
        description: {
          en: 'Economic initiatives ensuring all communities benefit from development and investment.',
          sv: 'Ekonomiska initiativ som säkerställer att alla samhällen gynnas av utveckling och investeringar.'
        },
        targetPoint: 'lp5',
        directEffect: 1.5,
        icon: '📊'
      },
      {
        id: 'interv7',
        name: {
          en: 'Community Policing Initiative',
          sv: 'Initiativ för närpolisverksamhet'
        },
        description: {
          en: 'Restructuring security forces to work closely with community representatives.',
          sv: 'Omstrukturering av säkerhetsstyrkor för att arbeta nära med samhällsrepresentanter.'
        },
        targetPoint: 'lp6',
        directEffect: 1,
        icon: '👮'
      },
      {
        id: 'interv8',
        name: {
          en: 'Peacekeeping Deployment',
          sv: 'Utplacering av fredsbevarande styrkor'
        },
        description: {
          en: 'International forces to maintain basic security and monitor agreements.',
          sv: 'Internationella styrkor för att upprätthålla grundläggande säkerhet och övervaka avtal.'
        },
        targetConnection: 'conn7',
        multiplier: 2,
        icon: '🛡️'
      }
    ]
  },
  {
    id: 'climate_conflict',
    name: {
      en: 'Climate-Related Conflict',
      sv: 'Klimatrelaterad Konflikt'
    },
    description: {
      en: 'A model examining conflict dynamics related to climate change, resource scarcity, and adaptation challenges.',
      sv: 'En modell som undersöker konfliktdynamik relaterad till klimatförändringar, resursbrist och anpassningsutmaningar.'
    },
    leveragePoints: [
      {
        id: 'lp1',
        x: 300,
        y: 150,
        label: {
          en: 'Climate Justice\nFramework',
          sv: 'Klimaträttvise-\nramverk'
        },
        level: 2,
        initialImpact: 4,
        difficulty: 9,
        description: {
          en: 'The underlying paradigm of how climate change responsibilities and impacts are understood and addressed across different communities.',
          sv: 'Det underliggande paradigmet för hur klimatförändringarnas ansvar och effekter förstås och hanteras i olika samhällen.'
        }
      },
      {
        id: 'lp2',
        x: 150,
        y: 250,
        label: {
          en: 'Adaptive\nGovernance',
          sv: 'Adaptiv\nStyrning'
        },
        level: 4,
        initialImpact: 3,
        difficulty: 7,
        description: {
          en: 'Systems that enable communities to self-organize and adapt to changing environmental conditions.',
          sv: 'System som gör det möjligt för samhällen att självorganisera och anpassa sig till förändrade miljöförhållanden.'
        }
      },
      {
        id: 'lp3',
        x: 450,
        y: 250,
        label: {
          en: 'Resource\nSharing Rules',
          sv: 'Regler för\nResursdelning'
        },
        level: 5,
        initialImpact: 5,
        difficulty: 6,
        description: {
          en: 'Formal and informal agreements governing how increasingly scarce resources are allocated across groups.',
          sv: 'Formella och informella avtal som styr hur allt mer knappa resurser fördelas mellan grupper.'
        }
      },
      {
        id: 'lp4',
        x: 200,
        y: 350,
        label: {
          en: 'Environmental\nMonitoring',
          sv: 'Miljö-\növervakning'
        },
        level: 7,
        initialImpact: 3,
        difficulty: 4,
        description: {
          en: 'Systems to track and predict environmental changes and their social impacts.',
          sv: 'System för att spåra och förutsäga miljöförändringar och deras sociala effekter.'
        }
      },
      {
        id: 'lp5',
        x: 400,
        y: 350,
        label: {
          en: 'Migration\nManagement',
          sv: 'Migrations-\nhantering'
        },
        level: 8,
        initialImpact: 4,
        difficulty: 5,
        description: {
          en: 'Approaches to managing population movements driven by environmental change.',
          sv: 'Metoder för att hantera befolkningsrörelser som drivs av miljöförändringar.'
        }
      },
      {
        id: 'lp6',
        x: 300,
        y: 450,
        label: {
          en: 'Disaster\nResponse',
          sv: 'Katastrof-\nrespons'
        },
        level: 11,
        initialImpact: 3,
        difficulty: 3,
        description: {
          en: 'Immediate management of climate disasters that can trigger or exacerbate conflicts.',
          sv: 'Omedelbar hantering av klimatkatastrofer som kan utlösa eller förvärra konflikter.'
        }
      }
    ],
    // Additional elements would be defined here similar to the first scenario
    connections: [],
    elements: [],
    boundaries: [],
    availableInterventions: []
  }
];
