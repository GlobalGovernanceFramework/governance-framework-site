// /src/lib/data/ggf-schema.ts

/**
 * Defines the type for a core entity in the GGF ecosystem.
 * Each entity has a unique ID, a human-readable name, and a type.
 */
export interface GgfEntity {
  id: string;
  type: 'Framework' | 'Council' | 'EconomicMechanism' | 'DataMetric' | 'LegalProtocol' | 
        'Platform' | 'Initiative' | 'Process' | 'Institution' | 'Tool' | 'Protocol' | 'Hub';
  name: string;
  shortName?: string; // Optional short name for diagrams
  description?: string; // A brief description
  // New metadata for visualization
  tier?: 1 | 2 | 3; // Framework tiers from your documents
  status?: 'Draft' | 'Pilot' | 'Implemented' | 'Proposed';
  primaryDomain?: 'Ecological' | 'Economic' | 'Justice' | 'Governance' | 'Technology';
  geographicScope?: 'Local' | 'Regional' | 'Global' | 'BAZ';
}

/**
 * Defines the type for a relationship between two entities.
 * It specifies the source (from), the target (to), and the nature of the connection (type).
 */
export interface GgfRelationship {
  from: string; // The ID of the source entity
  to: string;   // The ID of the target entity
  type: 'OVERSEES' | 'INFORMS' | 'FUNDS' | 'ENFORCES' | 'PRODUCES' | 'USES_DATA_FROM' | 
        'REPORTS_TO' | 'COORDINATES_WITH' | 'IMPLEMENTS' | 'MEDIATES' | 'REWARDS' | 
        'ESCALATES_TO' | 'DELEGATES_TO' | 'AUDITS' | 'COLLABORATES_WITH' | 'ESTABLISHES' | 
        'GUIDES' | 'ACTIVATES' | 'COMMISSIONS' | 'INTEGRATES_WITH' | 'VALIDATES';
  description?: string; // Optional description of the relationship
  // New metadata
  strength?: 'Strong' | 'Medium' | 'Weak'; // For visual weight
  frequency?: 'Continuous' | 'Regular' | 'As-Needed' | 'Crisis-Only';
  direction?: 'Bidirectional' | 'Unidirectional'; // Some relationships go both ways
}

export interface GgfCluster {
  id: string;
  name: string;
  description: string;
  color?: string; // For consistent visual theming
  entities: string[]; // Array of entity IDs in this cluster
}

export const clusters: GgfCluster[] = [
  {
    id: 'golden_triangle',
    name: 'Golden Triangle - Core Governance',
    description: 'The foundational governance architecture: Treaty (Hardware), Indigenous Framework (Heart), Meta-Governance (Nervous System)',
    entities: [
      'framework_treaty',
      'framework_indigenous', 
      'framework_meta_gov',
      'institution_unsc_reformed',
      'institution_unga_reformed',
      'institution_dj_tribunal',
      'institution_gem',
      'council_earth',
      'institution_baz',
      'council_mgcc',
      'mechanism_gcf',
      'protocol_fpic2',
      'process_crisis_command',
      'protocol_polycentric'
    ],
    color: '#8b5cf6' // Purple theme for core governance
];

// Validation functions
export function validateSchema(entities: GgfEntity[], relationships: GgfRelationship[]): ValidationResult {
  const entityIds = new Set(entities.map(e => e.id));
  const errors: string[] = [];
  
  // Check that all relationship endpoints exist
  for (const rel of relationships) {
    if (!entityIds.has(rel.from)) {
      errors.push(`Relationship references unknown entity: ${rel.from}`);
    }
    if (!entityIds.has(rel.to)) {
      errors.push(`Relationship references unknown entity: ${rel.to}`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function findOrphanedEntities(): string[] {
  const referencedIds = new Set<string>();
  relationships.forEach(rel => {
    referencedIds.add(rel.from);
    referencedIds.add(rel.to);
  });
  
  return entities
    .filter(entity => !referencedIds.has(entity.id))
    .map(entity => entity.id);
}

export function findCircularDependencies(): string[][] {
  const cycles: string[][] = [];
  const visited = new Set<string>();
  const recursionStack = new Set<string>();
  
  function dfs(entityId: string, path: string[]): void {
    if (recursionStack.has(entityId)) {
      const cycleStart = path.indexOf(entityId);
      cycles.push(path.slice(cycleStart).concat(entityId));
      return;
    }
    
    if (visited.has(entityId)) return;
    
    visited.add(entityId);
    recursionStack.add(entityId);
    
    const outgoingRels = relationships.filter(rel => rel.from === entityId);
    for (const rel of outgoingRels) {
      dfs(rel.to, [...path, entityId]);
    }
    
    recursionStack.delete(entityId);
  }
  
  entities.forEach(entity => {
    if (!visited.has(entity.id)) {
      dfs(entity.id, []);
    }
  });
  
  return cycles;
}

// Helper functions for generating different views
export function getEntitiesByCluster(clusterId: string): GgfEntity[] {
  const cluster = clusters.find(c => c.id === clusterId);
  if (!cluster) return [];
  
  return entities.filter(entity => cluster.entities.includes(entity.id));
}

export function getRelationshipsForEntity(entityId: string): GgfRelationship[] {
  return relationships.filter(rel => rel.from === entityId || rel.to === entityId);
}

export function getFrameworkIntegrationView(frameworkId: string): {
  framework: GgfEntity | undefined;
  inputs: GgfRelationship[];
  outputs: GgfRelationship[];
} {
  const framework = entities.find(e => e.id === frameworkId);
  const inputs = relationships.filter(rel => rel.to === frameworkId);
  const outputs = relationships.filter(rel => rel.from === frameworkId);
  
  return { framework, inputs, outputs };
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
},
  {
    id: 'ecological_intelligence',
    name: 'Ecological Intelligence Cluster',
    description: 'Integrated frameworks for planetary health, ecosystem rights, biodiversity, food systems, and disaster resilience',
    entities: [
      'framework_planetary_health',
      'framework_eco_intel',
      'framework_food',
      'framework_drr',
      'framework_biodiversity',
      'framework_animal_welfare',
      'council_phc',
      'institution_bct',
      'council_animal_welfare',
      'metric_bhi',
      'metric_ecosystem_health',
      'metric_crs'
    ],
    color: '#22c55e' // Green theme
  },
  {
    id: 'justice_peace',
    name: 'Justice & Peace Cluster',
    description: 'Comprehensive system for conflict prevention, mediation, formal justice, and transnational crime enforcement',
    entities: [
      'framework_peace',
      'framework_justice',
      'framework_shield',
      'council_gpc',
      'council_tsc',
      'institution_gjo',
      'institution_cjet',
      'institution_gcic',
      'institution_getf',
      'institution_rrt_peace',
      'process_vbt',
      'process_trc',
      'protocol_mos_rights'
    ],
    color: '#dc2626' // Red theme for justice/security
  },
  {
    id: 'economic',
    name: 'Regenerative Economy Cluster',
    description: 'Economic frameworks for post-capitalist, community-centered prosperity', 
    entities: ['framework_aubi', 'mechanism_hearts_leaves', 'platform_love_ledger'],
    color: '#3b82f6' // Blue theme
  }
  // ... etc
];

// --- The GGF Master Schema Definition ---

export const entities: GgfEntity[] = [
  // === GOLDEN TRIANGLE: THE TREATY FOR OUR ONLY HOME (Hardware) ===
  {
    id: 'framework_treaty',
    type: 'Framework',
    name: 'The Treaty for Our Only Home',
    shortName: 'The Treaty',
    description: 'Core legal framework providing enforcement mechanisms and institutional reforms for global governance',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global'
  },
  {
    id: 'institution_unsc_reformed',
    type: 'Institution',
    name: 'Reformed UN Security Council',
    shortName: 'Reformed UNSC',
    description: 'UNSC with tiered veto override and expanded membership',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global'
  },
  {
    id: 'institution_unga_reformed',
    type: 'Institution',
    name: 'Reformed UN General Assembly',
    shortName: 'Reformed UNGA',
    description: 'UNGA with binding resolution powers on crises',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global'
  },
  {
    id: 'institution_dj_tribunal',
    type: 'Institution',
    name: 'Digital Justice Tribunal',
    shortName: 'Digital Justice Tribunal',
    description: 'Adjudicates major global harms, including Ecocide and digital rights violations. Enforces Treaty law',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global'
  },
  {
    id: 'institution_gem',
    type: 'Institution',
    name: 'Global Enforcement Mechanism',
    shortName: 'GEM',
    description: 'The Treaty\'s enforcement arm with specialized corps for health, environmental, and cyber threats',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global'
  },
  {
    id: 'mechanism_gcf',
    type: 'EconomicMechanism',
    name: 'Global Commons Fund',
    shortName: 'Global Commons Fund',
    description: 'Fund for planetary public goods, financed by global taxes from Treaty Pillar 4',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Economic',
    geographicScope: 'Global'
  },

  // === GOLDEN TRIANGLE: INDIGENOUS & TRADITIONAL KNOWLEDGE GOVERNANCE (Heart) ===
  {
    id: 'framework_indigenous',
    type: 'Framework',
    name: 'Indigenous & Traditional Knowledge Governance Framework',
    shortName: 'Indigenous Framework',
    description: 'Ethical guidance framework centering Indigenous sovereignty and Traditional Ecological Knowledge',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Global'
  },
  {
    id: 'council_earth',
    type: 'Council',
    name: 'Earth Council (Kawsay Pacha)',
    shortName: 'Earth Council',
    description: 'Provides moral authority and planetary coordination based on Traditional Ecological Knowledge',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global'
  },
  {
    id: 'institution_baz',
    type: 'Institution',
    name: 'Bioregional Autonomous Zones',
    shortName: 'BAZs',
    description: 'Indigenous-led governance systems based on ecosystem boundaries, replacing nation-state authority',
    tier: 1,
    status: 'Pilot',
    primaryDomain: 'Governance',
    geographicScope: 'Regional'
  },
  {
    id: 'protocol_fpic2',
    type: 'LegalProtocol',
    name: 'Free, Prior, and Informed Consent 2.0',
    shortName: 'FPIC 2.0',
    description: 'Enhanced consent protocol with veto power for Indigenous communities',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Justice',
    geographicScope: 'Regional'
  },

  // === GOLDEN TRIANGLE: INTEGRATED META-GOVERNANCE FRAMEWORK (Nervous System) ===
  {
    id: 'framework_meta_gov',
    type: 'Framework',
    name: 'Integrated Meta-Governance Framework',
    shortName: 'Meta-Governance',
    description: 'Coordination framework enabling interoperability across different governance domains',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Global'
  },
  {
    id: 'council_mgcc',
    type: 'Council',
    name: 'Meta-Governance Coordination Council',
    shortName: 'MGCC',
    description: 'Primary venue for alignment across different governance domains and frameworks',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Governance',
    geographicScope: 'Global'
  },
  {
    id: 'process_crisis_command',
    type: 'Process',
    name: 'Crisis Command Protocol',
    shortName: 'Crisis Command',
    description: 'Temporary configuration of Meta-Governance councils to manage existential crises',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Global'
  },
  {
    id: 'protocol_polycentric',
    type: 'Protocol',
    name: 'Polycentric Coordination',
    shortName: 'Polycentric Coordination',
    description: 'Core principle of sharing power across many centers rather than a single hierarchy',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Governance',
    geographicScope: 'Global'
  },

  // === ECOLOGICAL INTELLIGENCE CLUSTER ===
  {
    id: 'framework_planetary_health',
    type: 'Framework',
    name: 'Planetary Health Governance Framework',
    shortName: 'Planetary Health',
    description: 'Overarching framework for planetary health governance and coordination',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Ecological',
    geographicScope: 'Global'
  },
  {
    id: 'framework_eco_intel',
    type: 'Framework',
    name: 'Ecological Intelligence & Rights Layer',
    shortName: 'Eco Intel',
    description: 'Scientific brain and ecological conscience providing standards, rights architecture, and ethical technology protocols',
    tier: 2,
    status: 'Draft',
    primaryDomain: 'Ecological',
    geographicScope: 'Global'
  },
  {
    id: 'framework_food',
    type: 'Framework',
    name: 'The Kinship Garden Framework',
    shortName: 'Kinship Garden',
    description: 'Global framework for regenerative food systems and agriculture based on Right Relationship principles',
    tier: 2,
    status: 'Draft',
    primaryDomain: 'Ecological',
    geographicScope: 'Global'
  },
  {
    id: 'framework_drr',
    type: 'Framework',
    name: 'Disaster Risk Reduction & Resilience Framework',
    shortName: 'DRR&R',
    description: 'Framework for strengthening disaster resilience and adaptive capacity for frequent, localized disasters',
    tier: 2,
    status: 'Draft',
    primaryDomain: 'Ecological',
    geographicScope: 'Global'
  },
  {
    id: 'framework_biodiversity',
    type: 'Framework',
    name: 'Global Governance Biodiversity Implementation Framework',
    shortName: 'Biodiversity',
    description: 'Framework for biodiversity conservation and ecosystem restoration',
    tier: 2,
    status: 'Draft',
    primaryDomain: 'Ecological',
    geographicScope: 'Global'
  },
  {
    id: 'framework_animal_welfare',
    type: 'Framework',
    name: 'Global Guardian Framework for Animal Welfare',
    shortName: 'Animal Welfare',
    description: 'Framework ensuring rights and welfare of sentient animals within the Dynamic Rights Spectrum',
    tier: 2,
    status: 'Draft',
    primaryDomain: 'Ecological',
    geographicScope: 'Global'
  },
  {
    id: 'council_phc',
    type: 'Council',
    name: 'Planetary Health Council',
    shortName: 'PHC',
    description: 'Meta-Governance council overseeing planetary boundaries, ecosystem health indicators, and ecological frameworks',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Ecological',
    geographicScope: 'Global'
  },
  {
    id: 'institution_bct',
    type: 'Institution',
    name: 'Global Biodiversity Commons Trust',
    shortName: 'BCT',
    description: 'Institution implementing restoration mandates and managing biodiversity conservation',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Ecological',
    geographicScope: 'Global'
  },
  {
    id: 'council_animal_welfare',
    type: 'Council',
    name: 'Animal Welfare Council',
    shortName: 'Animal Welfare Council',
    description: 'Sub-council under the PHC focused on animal rights and welfare within the MOS Dynamic Rights Spectrum',
    tier: 2,
    status: 'Proposed',
    primaryDomain: 'Ecological',
    geographicScope: 'Global'
  },

  // === JUSTICE & PEACE CLUSTER ===
  // Peace & Conflict Resolution Framework
  {
    id: 'framework_peace',
    type: 'Framework',
    name: 'Peace & Conflict Resolution Framework',
    shortName: 'Peace Framework',
    description: 'Comprehensive framework for values-based conflict transformation, mediation, and peacebuilding',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Justice',
    geographicScope: 'Global'
  },
  {
    id: 'council_gpc',
    type: 'Council',
    name: 'Global Peace Council',
    shortName: 'Global Peace Council',
    description: 'Oversees global peacebuilding strategy and coordinates mediation efforts within Meta-Governance structure',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global'
  },
  {
    id: 'process_vbt',
    type: 'Process',
    name: 'Values-Based Transformation',
    shortName: 'Spiral Peacecraft',
    description: 'Core methodology for diagnosing and resolving conflicts based on underlying values and developmental stages',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Justice',
    geographicScope: 'Global'
  },
  {
    id: 'institution_rrt_peace',
    type: 'Institution',
    name: 'Rapid Response Peace Teams',
    shortName: 'Peace Teams',
    description: 'Teams of trained mediators deployed to de-escalate active crises using Values-Based Transformation',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global'
  },
  {
    id: 'process_trc',
    type: 'Process',
    name: 'Truth and Reconciliation Process',
    shortName: 'Truth & Reconciliation',
    description: 'Community-led processes for post-conflict healing and transitional justice',
    tier: 1,
    status: 'Pilot',
    primaryDomain: 'Justice',
    geographicScope: 'Regional'
  },

  // Justice Systems Implementation Framework
  {
    id: 'framework_justice',
    type: 'Framework',
    name: 'Justice Systems Implementation Framework',
    shortName: 'Justice Systems',
    description: 'Comprehensive framework for equitable, transparent, and culturally sensitive global justice systems',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Justice',
    geographicScope: 'Global'
  },
  {
    id: 'institution_gjo',
    type: 'Institution',
    name: 'Global Justice Oversight Body',
    shortName: 'Global Justice Oversight',
    description: 'Oversees global justice system implementation, develops policy, monitors compliance, and coordinates enforcement',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global'
  },
  {
    id: 'institution_cjet',
    type: 'Institution',
    name: 'Climate and Ecological Justice Tribunals',
    shortName: 'Ecological Justice Tribunals',
    description: 'Specialized chamber of the Digital Justice Tribunal for ecocide and environmental rights cases',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global'
  },
  {
    id: 'protocol_mos_rights',
    type: 'LegalProtocol',
    name: 'MOS Dynamic Rights Spectrum',
    shortName: 'MOS Rights',
    description: 'Ethical and legal foundation for defining and adjudicating rights for all beings across the spectrum of consciousness',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Justice',
    geographicScope: 'Global'
  },

  // The Shield Protocol
  {
    id: 'framework_shield',
    type: 'Framework',
    name: 'The Shield Protocol',
    shortName: 'Shield Protocol',
    description: 'Comprehensive framework for eradicating transnational crime through ethical, technologically-integrated enforcement',
    tier: 1,
    status: 'Draft',
    primaryDomain: 'Justice',
    geographicScope: 'Global'
  },
  {
    id: 'council_tsc',
    type: 'Council',
    name: 'Transnational Security Council',
    shortName: 'Security Council',
    description: 'Specialized Meta-Governance Council overseeing response to systemic crime and transnational threats',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global'
  },
  {
    id: 'institution_gcic',
    type: 'Institution',
    name: 'Global Crime Intelligence Center',
    shortName: 'GCIC',
    description: 'Hub for intelligence fusion and analysis to map, predict, and counter criminal threats using AI and traditional methods',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global'
  },
  {
    id: 'institution_getf',
    type: 'Institution',
    name: 'Global Enforcement Task Force',
    shortName: 'GETF',
    description: 'Operational enforcement arm conducting poly-jurisdictional investigations and operations against transnational crime',
    tier: 1,
    status: 'Proposed',
    primaryDomain: 'Justice',
    geographicScope: 'Global'
  },

  // === KEY DATA METRICS ===
  {
    id: 'metric_bhi',
    type: 'DataMetric',
    name: 'Biosphere Health Index',
    shortName: 'BHI',
    description: 'Comprehensive metric tracking planetary health and ecosystem integrity',
    tier: 2,
    status: 'Draft',
    primaryDomain: 'Ecological',
    geographicScope: 'Global'
  },
  {
    id: 'metric_ecosystem_health',
    type: 'DataMetric',
    name: 'Ecosystem Health Indicators',
    shortName: 'Ecosystem Health Indicators',
    description: 'Detailed metrics for specific ecosystem health parameters used across frameworks',
    tier: 2,
    status: 'Draft',
    primaryDomain: 'Ecological',
    geographicScope: 'Regional'
  },
  {
    id: 'metric_crs',
    type: 'DataMetric',
    name: 'Community Resilience Score',
    shortName: 'CRS',
    description: 'BAZ-level composite index measuring disaster preparedness and community resilience',
    tier: 2,
    status: 'Draft',
    primaryDomain: 'Ecological',
    geographicScope: 'BAZ'
  }
];

export const relationships: GgfRelationship[] = [
  // === HOW THE TREATY (Hardware) PROVIDES STRUCTURE ===
  {
    from: 'framework_treaty',
    to: 'institution_dj_tribunal',
    type: 'ESTABLISHES',
    description: 'The Treaty establishes the Digital Justice Tribunal as its primary judicial body',
    strength: 'Strong',
    frequency: 'Continuous'
  },
  {
    from: 'framework_treaty',
    to: 'institution_gem',
    type: 'ESTABLISHES',
    description: 'The Treaty establishes the Global Enforcement Mechanism as its enforcement arm',
    strength: 'Strong',
    frequency: 'Continuous'
  },
  {
    from: 'framework_treaty',
    to: 'mechanism_gcf',
    type: 'ESTABLISHES',
    description: 'The Treaty creates the Global Commons Fund through Pillar 4 financing mechanisms',
    strength: 'Strong',
    frequency: 'Continuous'
  },
  {
    from: 'institution_dj_tribunal',
    to: 'framework_treaty',
    type: 'ENFORCES',
    description: 'The Tribunal enforces the laws and principles set out in the Treaty',
    strength: 'Strong',
    frequency: 'Regular'
  },
  {
    from: 'institution_gem',
    to: 'institution_dj_tribunal',
    type: 'REPORTS_TO',
    description: 'The enforcement arm acts on the rulings of the judicial arm',
    strength: 'Strong',
    frequency: 'Regular'
  },

  // === HOW THE INDIGENOUS FRAMEWORK (Heart) PROVIDES GUIDANCE ===
  {
    from: 'framework_indigenous',
    to: 'framework_treaty',
    type: 'INFORMS',
    description: 'Indigenous principles of Rights of Nature and sovereignty are foundational to the Treaty\'s legal reforms',
    strength: 'Strong',
    frequency: 'Continuous'
  },
  {
    from: 'framework_indigenous',
    to: 'framework_meta_gov',
    type: 'GUIDES',
    description: 'Meta-Governance coordination must respect Indigenous protocols and sovereignty',
    strength: 'Strong',
    frequency: 'Continuous'
  },
  {
    from: 'council_earth',
    to: 'council_mgcc',
    type: 'OVERSEES',
    description: 'The Earth Council holds moral and ethical oversight over the procedural coordination of the MGCC',
    strength: 'Strong',
    frequency: 'Continuous'
  },
  {
    from: 'protocol_fpic2',
    to: 'institution_baz',
    type: 'IMPLEMENTS',
    description: 'BAZs are the primary institution for implementing FPIC 2.0',
    strength: 'Strong',
    frequency: 'Regular'
  },
  {
    from: 'council_earth',
    to: 'institution_baz',
    type: 'OVERSEES',
    description: 'The Earth Council provides guidance and oversight to BAZ governance',
    strength: 'Medium',
    frequency: 'Regular'
  },

  // === HOW META-GOVERNANCE (Nervous System) COORDINATES ===
  {
    from: 'framework_meta_gov',
    to: 'framework_treaty',
    type: 'COORDINATES_WITH',
    description: 'Meta-Governance coordinates the application of Treaty laws across different frameworks',
    strength: 'Strong',
    frequency: 'Continuous'
  },
  {
    from: 'framework_meta_gov',
    to: 'framework_indigenous',
    type: 'COORDINATES_WITH',
    description: 'Meta-Governance facilitates dialogue and interoperability with Indigenous governance systems',
    strength: 'Strong',
    frequency: 'Continuous'
  },
  {
    from: 'council_mgcc',
    to: 'institution_baz',
    type: 'DELEGATES_TO',
    description: 'Following the principle of subsidiarity, the MGCC delegates local governance to BAZs',
    strength: 'Medium',
    frequency: 'Regular'
  },
  {
    from: 'process_crisis_command',
    to: 'institution_gem',
    type: 'ACTIVATES',
    description: 'During an existential crisis, the Crisis Command Protocol can deploy the Global Enforcement Mechanism',
    strength: 'Strong',
    frequency: 'Crisis-Only'
  },
  {
    from: 'protocol_polycentric',
    to: 'council_mgcc',
    type: 'GUIDES',
    description: 'Polycentric coordination principles guide how the MGCC operates across multiple centers of power',
    strength: 'Medium',
    frequency: 'Continuous'
  },

  // === ECOLOGICAL INTELLIGENCE CLUSTER: PHC OVERSIGHT ===
  {
    from: 'council_phc',
    to: 'framework_food',
    type: 'OVERSEES',
    description: 'PHC provides strategic oversight for regenerative food systems implementation',
    strength: 'Strong',
    frequency: 'Regular'
  },
  {
    from: 'council_phc',
    to: 'framework_drr',
    type: 'OVERSEES',
    description: 'PHC oversees disaster resilience strategy and coordinates with Meta-Governance emergency protocols',
    strength: 'Strong',
    frequency: 'Regular'
  },
  {
    from: 'council_phc',
    to: 'framework_biodiversity',
    type: 'OVERSEES',
    description: 'PHC provides strategic oversight for global biodiversity conservation efforts',
    strength: 'Strong',
    frequency: 'Regular'
  },
  {
    from: 'council_phc',
    to: 'framework_animal_welfare',
    type: 'OVERSEES',
    description: 'PHC oversees animal welfare framework implementation within ecological context',
    strength: 'Medium',
    frequency: 'Regular'
  },

  // === ECOLOGICAL INTELLIGENCE CLUSTER: DATA FLOWS ===
  {
    from: 'framework_eco_intel',
    to: 'council_phc',
    type: 'INFORMS',
    description: 'The Eco Intel Layer provides the BHI and other core metrics to inform PHC decision-making',
    strength: 'Strong',
    frequency: 'Continuous'
  },
  {
    from: 'framework_eco_intel',
    to: 'metric_bhi',
    type: 'PRODUCES',
    description: 'Eco Intel Layer generates and maintains the Biosphere Health Index',
    strength: 'Strong',
    frequency: 'Continuous'
  },
  {
    from: 'framework_eco_intel',
    to: 'metric_ecosystem_health',
    type: 'PRODUCES',
    description: 'Eco Intel Layer produces detailed ecosystem health indicators used by other frameworks',
    strength: 'Strong',
    frequency: 'Continuous'
  },
  {
    from: 'metric_bhi',
    to: 'council_phc',
    type: 'INFORMS',
    description: 'The BHI is a key performance indicator informing PHC strategy and decisions',
    strength: 'Strong',
    frequency: 'Regular'
  },

  // === ECOLOGICAL INTELLIGENCE CLUSTER: FRAMEWORK INTEGRATION ===
  {
    from: 'framework_food',
    to: 'metric_ecosystem_health',
    type: 'USES_DATA_FROM',
    description: 'Kinship Garden Framework uses ecosystem health indicators to verify regenerative agriculture practices',
    strength: 'Strong',
    frequency: 'Regular'
  },
  {
    from: 'framework_drr',
    to: 'metric_ecosystem_health',
    type: 'USES_DATA_FROM',
    description: 'DRR&R Framework uses ecosystem health data for risk assessment and early warning systems',
    strength: 'Strong',
    frequency: 'Regular'
  },
  {
    from: 'framework_drr',
    to: 'metric_crs',
    type: 'PRODUCES',
    description: 'DRR&R Framework generates Community Resilience Scores for BAZ-level resilience tracking',
    strength: 'Strong',
    frequency: 'Regular'
  },
  {
    from: 'framework_biodiversity',
    to: 'metric_ecosystem_health',
    type: 'USES_DATA_FROM',
    description: 'Biodiversity Framework relies on ecosystem health indicators to guide conservation priorities',
    strength: 'Strong',
    frequency: 'Continuous'
  },

  // === ECOLOGICAL INTELLIGENCE CLUSTER: INSTITUTIONAL RELATIONSHIPS ===
  {
    from: 'framework_biodiversity',
    to: 'institution_bct',
    type: 'ESTABLISHES',
    description: 'Biodiversity Framework establishes the Global Biodiversity Commons Trust as its implementation body',
    strength: 'Strong',
    frequency: 'Continuous'
  },
  {
    from: 'council_phc',
    to: 'institution_bct',
    type: 'COMMISSIONS',
    description: 'PHC commissions restoration mandates for the BCT to implement based on ecological priorities',
    strength: 'Strong',
    frequency: 'Regular'
  },
  {
    from: 'council_animal_welfare',
    to: 'council_phc',
    type: 'REPORTS_TO',
    description: 'The Animal Welfare Council operates as a specialized sub-council under PHC oversight',
    strength: 'Medium',
    frequency: 'Regular'
  },

  // === ECOLOGICAL INTELLIGENCE CLUSTER: BAZ IMPLEMENTATION ===
  {
    from: 'framework_food',
    to: 'institution_baz',
    type: 'IMPLEMENTS',
    description: 'Kinship Garden principles are implemented through BAZ-led regenerative agriculture initiatives',
    strength: 'Medium',
    frequency: 'Regular'
  },
  {
    from: 'framework_drr',
    to: 'institution_baz',
    type: 'IMPLEMENTS',
    description: 'DRR&R Framework is implemented through BAZ-level Community Weavers and resilience planning',
    strength: 'Strong',
    frequency: 'Regular'
  },
  {
    from: 'framework_biodiversity',
    to: 'institution_baz',
    type: 'IMPLEMENTS',
    description: 'Biodiversity conservation is implemented through BAZ-led ecosystem restoration projects',
    strength: 'Medium',
    frequency: 'Regular'
  },

  // === CONNECTIONS TO GOLDEN TRIANGLE ===
  {
    from: 'council_phc',
    to: 'council_mgcc',
    type: 'COORDINATES_WITH',
    description: 'PHC coordinates with MGCC as a Meta-Governance Coordination Council',
    strength: 'Strong',
    frequency: 'Regular'
  },
  {
    from: 'council_earth',
    to: 'council_phc',
    type: 'GUIDES',
    description: 'Earth Council provides Indigenous wisdom and oversight to PHC planetary health decisions',
    strength: 'Strong',
    frequency: 'Regular'
  },
  {
    from: 'mechanism_gcf',
    to: 'framework_food',
    type: 'FUNDS',
    description: 'Global Commons Fund provides financing for regenerative agriculture and food system transitions',
    strength: 'Medium',
    frequency: 'Regular'
  },
  {
    from: 'mechanism_gcf',
    to: 'framework_drr',
    type: 'FUNDS',
    description: 'Global Commons Fund finances disaster resilience infrastructure and community preparedness',
    strength: 'Medium',
    frequency: 'Regular'
  },
  {
    from: 'mechanism_gcf',
    to: 'institution_bct',
    type: 'FUNDS',
    description: 'Global Commons Fund provides resources for biodiversity restoration mandates',
    strength: 'Medium',
    frequency: 'Regular'
  },

  // === JUSTICE & PEACE CLUSTER: PEACE -> JUSTICE -> ENFORCEMENT FLOW ===
  {
    from: 'framework_peace',
    to: 'framework_justice',
    type: 'ESCALATES_TO',
    description: 'Unresolved conflicts from the Peace Framework can be escalated to the Justice Systems for formal adjudication',
    strength: 'Strong',
    frequency: 'As-Needed'
  },
  {
    from: 'institution_gjo',
    to: 'framework_shield',
    type: 'DELEGATES_TO',
    description: 'The Global Justice Oversight body delegates enforcement actions for criminal matters to The Shield Protocol',
    strength: 'Strong',
    frequency: 'Regular'
  },
  {
    from: 'council_tsc',
    to: 'institution_getf',
    type: 'OVERSEES',
    description: 'The Transnational Security Council directs the operations of the Global Enforcement Task Force',
    strength: 'Strong',
    frequency: 'Continuous'
  },
  {
    from: 'institution_gcic',
    to: 'institution_getf',
    type: 'INFORMS',
    description: 'Intelligence from the GCIC guides the operational priorities of the GETF',
    strength: 'Strong',
    frequency: 'Continuous'
  },
  {
    from: 'process_trc',
    to: 'framework_justice',
    type: 'COLLABORATES_WITH',
    description: 'Truth and Reconciliation processes are a form of restorative justice that complements the formal justice system',
    strength: 'Medium',
    frequency: 'Regular'
  },

  // === JUSTICE & PEACE CLUSTER: INTERNAL FRAMEWORK RELATIONSHIPS ===
  {
    from: 'council_gpc',
    to: 'process_vbt',
    type: 'OVERSEES',
    description: 'Global Peace Council oversees the development and application of Values-Based Transformation methodology',
    strength: 'Strong',
    frequency: 'Continuous'
  },
  {
    from: 'process_vbt',
    to: 'institution_rrt_peace',
    type: 'GUIDES',
    description: 'Values-Based Transformation methodology guides the mediation work of Rapid Response Peace Teams',
    strength: 'Strong',
    frequency: 'Continuous'
  },
  {
    from: 'institution_gjo',
    to: 'institution_cjet',
    type: 'OVERSEES',
    description: 'Global Justice Oversight Body coordinates the Climate and Ecological Justice Tribunals',
    strength: 'Strong',
    frequency: 'Regular'
  },
  {
    from: 'framework_justice',
    to: 'protocol_mos_rights',
    type: 'USES_DATA_FROM',
    description: 'The Justice System uses the MOS Dynamic Rights Spectrum as its foundational legal and ethical code',
    strength: 'Strong',
    frequency: 'Continuous'
  },
  {
    from: 'council_tsc',
    to: 'institution_gcic',
    type: 'OVERSEES',
    description: 'Transnational Security Council provides strategic direction to the Global Crime Intelligence Center',
    strength: 'Strong',
    frequency: 'Regular'
  },

  // === JUSTICE & PEACE CLUSTER: CONNECTIONS TO GOLDEN TRIANGLE ===
  {
    from: 'institution_dj_tribunal',
    to: 'framework_justice',
    type: 'IMPLEMENTS',
    description: 'The Justice Systems framework operationalizes the Digital Justice Tribunal established by the Treaty',
    strength: 'Strong',
    frequency: 'Continuous'
  },
  {
    from: 'institution_dj_tribunal',
    to: 'institution_cjet',
    type: 'ESTABLISHES',
    description: 'Digital Justice Tribunal establishes the Climate and Ecological Justice Tribunals as a specialized chamber',
    strength: 'Strong',
    frequency: 'Continuous'
  },
  {
    from: 'council_gpc',
    to: 'council_mgcc',
    type: 'COORDINATES_WITH',
    description: 'The Global Peace Council operates as a coordination body within the Meta-Governance architecture',
    strength: 'Strong',
    frequency: 'Regular'
  },
  {
    from: 'council_tsc',
    to: 'council_mgcc',
    type: 'COORDINATES_WITH',
    description: 'The Transnational Security Council operates as a specialized council within the Meta-Governance architecture',
    strength: 'Strong',
    frequency: 'Regular'
  },
  {
    from: 'framework_peace',
    to: 'framework_indigenous',
    type: 'COLLABORATES_WITH',
    description: 'The Peace Framework defers to Indigenous tribunals and uses FPIC 2.0 protocols for disputes involving BAZs',
    strength: 'Strong',
    frequency: 'Regular'
  },
  {
    from: 'framework_peace',
    to: 'institution_baz',
    type: 'IMPLEMENTS',
    description: 'Values-Based Transformation is implemented through BAZ-led mediation and community dialogue processes',
    strength: 'Medium',
    frequency: 'Regular'
  },
  {
    from: 'institution_getf',
    to: 'institution_gem',
    type: 'IMPLEMENTS',
    description: 'The GETF operates as a specialized unit within the Treaty\'s Global Enforcement Mechanism',
    strength: 'Strong',
    frequency: 'Continuous'
  },
  {
    from: 'mechanism_gcf',
    to: 'framework_peace',
    type: 'FUNDS',
    description: 'Global Commons Fund provides resources for peacebuilding initiatives and conflict prevention programs',
    strength: 'Medium',
    frequency: 'Regular'
  },
  {
    from: 'mechanism_gcf',
    to: 'framework_justice',
    type: 'FUNDS',
    description: 'Global Commons Fund finances justice system implementation and capacity building',
    strength: 'Medium',
    frequency: 'Regular'
  },
  {
    from: 'mechanism_gcf',
    to: 'framework_shield',
    type: 'FUNDS',
    description: 'Global Commons Fund provides resources for transnational crime prevention and enforcement operations',
    strength: 'Medium',
    frequency: 'Regular'
  },

  // === CROSS-CLUSTER INTEGRATION: JUSTICE & PEACE ↔ ECOLOGICAL ===
  {
    from: 'institution_cjet',
    to: 'framework_eco_intel',
    type: 'USES_DATA_FROM',
    description: 'Climate and Ecological Justice Tribunals use ecosystem health indicators for ecocide case evidence',
    strength: 'Strong',
    frequency: 'Regular'
  },
  {
    from: 'institution_cjet',
    to: 'council_phc',
    type: 'COLLABORATES_WITH',
    description: 'Ecological Justice Tribunals coordinate with PHC on ecosystem rights enforcement',
    strength: 'Strong',
    frequency: 'Regular'
  },
  {
    from: 'framework_peace',
    to: 'framework_drr',
    type: 'COLLABORATES_WITH',
    description: 'Peace Framework provides conflict-sensitive approaches for disaster response and recovery',
    strength: 'Medium',
    frequency: 'As-Needed'
  },
  {
    from: 'framework_peace',
    to: 'framework_food',
    type: 'MEDIATES',
    description: 'Peace Framework mediates resource conflicts related to food and water access',
    strength: 'Medium',
    frequency: 'As-Needed'
  },
  {
    from: 'protocol_mos_rights',
    to: 'framework_eco_intel',
    type: 'COORDINATES_WITH',
    description: 'MOS Dynamic Rights Spectrum coordinates with Ecological Intelligence on rights for non-human entities',
    strength: 'Strong',
    frequency: 'Continuous'
  },
  {
    from: 'protocol_mos_rights',
    to: 'framework_animal_welfare',
    type: 'GUIDES',
    description: 'MOS Rights Spectrum provides the ethical foundation for animal welfare protections',
    strength: 'Strong',
    frequency: 'Continuous'
  }
