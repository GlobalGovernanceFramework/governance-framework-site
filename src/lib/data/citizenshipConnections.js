// src/lib/data/citizenshipConnections.js

// Practice to Framework connections
export const practiceToFrameworkConnections = {
  'awareness': {
    descriptionKey: 'globalCitizenship.connections.practices.awareness.description',
    frameworks: [
      { 
        tier: 0, 
        slug: 'treaty-for-our-only-home', 
        reasonKey: 'globalCitizenship.connections.practices.awareness.treatyReason',
        strength: 'foundation'
      },
      { 
        tier: 1, 
        slug: 'climate-and-energy-governance', 
        reasonKey: 'globalCitizenship.connections.practices.awareness.climateReason',
        strength: 'strong'
      },
      { 
        tier: 1, 
        slug: 'planetary-health', 
        reasonKey: 'globalCitizenship.connections.practices.awareness.healthReason',
        strength: 'moderate'
      }
    ]
  },
  'understanding': {
    descriptionKey: 'globalCitizenship.connections.practices.understanding.description',
    frameworks: [
      { 
        tier: 0, 
        slug: 'treaty-for-our-only-home', 
        reasonKey: 'globalCitizenship.connections.practices.understanding.treatyReason',
        strength: 'foundation'
      },
      { 
        tier: 2, 
        slug: 'technology-governance', 
        reasonKey: 'globalCitizenship.connections.practices.understanding.technologyReason',
        strength: 'strong'
      },
      { 
        tier: 2, 
        slug: 'educational-systems', 
        reasonKey: 'globalCitizenship.connections.practices.understanding.educationReason',
        strength: 'strong'
      }
    ]
  },
  'empathy': {
    descriptionKey: 'globalCitizenship.connections.practices.empathy.description',
    frameworks: [
      { 
        tier: 1, 
        slug: 'migration-and-human-mobility', 
        reasonKey: 'globalCitizenship.connections.practices.empathy.migrationReason',
        strength: 'strong'
      },
      { 
        tier: 2, 
        slug: 'mental-health-governance', 
        reasonKey: 'globalCitizenship.connections.practices.empathy.mentalHealthReason',
        strength: 'moderate'
      },
      { 
        tier: 3, 
        slug: 'global-ethics-and-rights-of-beings', 
        reasonKey: 'globalCitizenship.connections.practices.empathy.ethicsReason',
        strength: 'primary'
      }
    ]
  },
  'participation': {
    descriptionKey: 'globalCitizenship.connections.practices.participation.description',
    frameworks: [
      { 
        tier: 2, 
        slug: 'digital-commons', 
        reasonKey: 'globalCitizenship.connections.practices.participation.digitalReason',
        strength: 'strong'
      },
      { 
        tier: 3, 
        slug: 'global-citizenship-practice', 
        reasonKey: 'globalCitizenship.connections.practices.participation.citizenshipReason',
        strength: 'primary'
      },
      { 
        tier: 2, 
        slug: 'educational-systems', 
        reasonKey: 'globalCitizenship.connections.practices.participation.educationReason',
        strength: 'moderate'
      }
    ]
  },
  'leadership': {
    descriptionKey: 'globalCitizenship.connections.practices.leadership.description',
    frameworks: [
      { 
        tier: 0, 
        slug: 'treaty-for-our-only-home', 
        reasonKey: 'globalCitizenship.connections.practices.leadership.treatyReason',
        strength: 'foundation'
      },
      { 
        tier: 4, 
        slug: 'consciousness-and-inner-development', 
        reasonKey: 'globalCitizenship.connections.practices.leadership.consciousnessReason',
        strength: 'primary'
      },
      { 
        tier: 1, 
        slug: 'peace-and-conflict-resolution', 
        reasonKey: 'globalCitizenship.connections.practices.leadership.peaceReason',
        strength: 'strong'
      }
    ]
  }
};

// Value to Framework connections
export const valueToFrameworkConnections = {
  'earth': [
    { tier: 1, slug: 'climate-and-energy-governance', strength: 'primary', reasonKey: 'globalCitizenship.connections.values.earth.climateReason' },
    { tier: 1, slug: 'planetary-health', strength: 'primary', reasonKey: 'globalCitizenship.connections.values.earth.healthReason' },
    { tier: 2, slug: 'environmental-stewardship', strength: 'primary', reasonKey: 'globalCitizenship.connections.values.earth.environmentReason' },
    { tier: 2, slug: 'biodiversity-governance', strength: 'strong', reasonKey: 'globalCitizenship.connections.values.earth.biodiversityReason' }
  ],
  'justice': [
    { tier: 1, slug: 'peace-and-conflict-resolution', strength: 'primary', reasonKey: 'globalCitizenship.connections.values.justice.peaceReason' },
    { tier: 1, slug: 'justice-systems', strength: 'primary', reasonKey: 'globalCitizenship.connections.values.justice.systemsReason' },
    { tier: 2, slug: 'economic-integration', strength: 'strong', reasonKey: 'globalCitizenship.connections.values.justice.economicReason' },
    { tier: 3, slug: 'gender-equality-and-lgbtq-rights', strength: 'strong', reasonKey: 'globalCitizenship.connections.values.justice.genderReason' }
  ],
  'compassion': [
    { tier: 1, slug: 'migration-and-human-mobility', strength: 'primary', reasonKey: 'globalCitizenship.connections.values.compassion.migrationReason' },
    { tier: 2, slug: 'mental-health-governance', strength: 'strong', reasonKey: 'globalCitizenship.connections.values.compassion.mentalHealthReason' },
    { tier: 3, slug: 'global-ethics-and-rights-of-beings', strength: 'primary', reasonKey: 'globalCitizenship.connections.values.compassion.ethicsReason' }
  ],
  'truth': [
    { tier: 2, slug: 'educational-systems', strength: 'strong', reasonKey: 'globalCitizenship.connections.values.truth.educationReason' },
    { tier: 2, slug: 'technology-governance', strength: 'moderate', reasonKey: 'globalCitizenship.connections.values.truth.technologyReason' },
    { tier: 3, slug: 'digital-commons', strength: 'moderate', reasonKey: 'globalCitizenship.connections.values.truth.digitalReason' }
  ],
  'freedom': [
    { tier: 1, slug: 'peace-and-conflict-resolution', strength: 'strong', reasonKey: 'globalCitizenship.connections.values.freedom.peaceReason' },
    { tier: 3, slug: 'digital-commons', strength: 'strong', reasonKey: 'globalCitizenship.connections.values.freedom.digitalReason' },
    { tier: 3, slug: 'gender-equality-and-lgbtq-rights', strength: 'strong', reasonKey: 'globalCitizenship.connections.values.freedom.genderReason' }
  ],
  'peace': [
    { tier: 1, slug: 'peace-and-conflict-resolution', strength: 'primary', reasonKey: 'globalCitizenship.connections.values.peace.conflictReason' },
    { tier: 4, slug: 'consciousness-and-inner-development', strength: 'strong', reasonKey: 'globalCitizenship.connections.values.peace.consciousnessReason' },
    { tier: 1, slug: 'justice-systems', strength: 'moderate', reasonKey: 'globalCitizenship.connections.values.peace.justiceReason' }
  ],
  'integrity': [
    { tier: 0, slug: 'treaty-for-our-only-home', strength: 'foundation', reasonKey: 'globalCitizenship.connections.values.integrity.treatyReason' },
    { tier: 2, slug: 'technology-governance', strength: 'strong', reasonKey: 'globalCitizenship.connections.values.integrity.technologyReason' },
    { tier: 4, slug: 'consciousness-and-inner-development', strength: 'moderate', reasonKey: 'globalCitizenship.connections.values.integrity.consciousnessReason' }
  ],
  'gratitude': [
    { tier: 1, slug: 'indigenous-governance-and-traditional-knowledge', strength: 'strong', reasonKey: 'globalCitizenship.connections.values.gratitude.indigenousReason' },
    { tier: 2, slug: 'environmental-stewardship', strength: 'moderate', reasonKey: 'globalCitizenship.connections.values.gratitude.environmentReason' },
    { tier: 4, slug: 'consciousness-and-inner-development', strength: 'moderate', reasonKey: 'globalCitizenship.connections.values.gratitude.consciousnessReason' }
  ],
  'wisdom': [
    { tier: 4, slug: 'consciousness-and-inner-development', strength: 'primary', reasonKey: 'globalCitizenship.connections.values.wisdom.consciousnessReason' },
    { tier: 1, slug: 'indigenous-governance-and-traditional-knowledge', strength: 'strong', reasonKey: 'globalCitizenship.connections.values.wisdom.indigenousReason' },
    { tier: 4, slug: 'wisdom-governance', strength: 'primary', reasonKey: 'globalCitizenship.connections.values.wisdom.governanceReason' }
  ],
  'life': [
    { tier: 3, slug: 'global-ethics-and-rights-of-beings', strength: 'primary', reasonKey: 'globalCitizenship.connections.values.life.ethicsReason' },
    { tier: 2, slug: 'biodiversity-governance', strength: 'strong', reasonKey: 'globalCitizenship.connections.values.life.biodiversityReason' },
    { tier: 2, slug: 'animal-welfare-governance', strength: 'strong', reasonKey: 'globalCitizenship.connections.values.life.animalReason' }
  ]
};

// Helper functions - updated to support translation function parameter
export function getConnectionsForFramework(frameworkSlug) {
  const connections = [];
  
  // Check practice connections
  Object.entries(practiceToFrameworkConnections).forEach(([practice, data]) => {
    const match = data.frameworks.find(f => f.slug === frameworkSlug);
    if (match) {
      connections.push({
        type: 'practice',
        source: practice,
        ...match
      });
    }
  });
  
  // Check value connections
  Object.entries(valueToFrameworkConnections).forEach(([value, frameworks]) => {
    const match = frameworks.find(f => f.slug === frameworkSlug);
    if (match) {
      connections.push({
        type: 'value',
        source: value,
        ...match
      });
    }
  });
  
  return connections;
}

export function getFrameworksForPractice(practice) {
  return practiceToFrameworkConnections[practice]?.frameworks || [];
}

export function getFrameworksForValue(value) {
  return valueToFrameworkConnections[value] || [];
}

// Updated to support translation function
export function calculatePersonalizedConnections(userPractices = [], userValues = [], t = null) {
  const connections = new Map();
  
  // Add practice-based connections
  userPractices.forEach(practice => {
    const practiceConnections = getFrameworksForPractice(practice);
    practiceConnections.forEach(conn => {
      const key = conn.slug;
      if (!connections.has(key)) {
        connections.set(key, {
          ...conn,
          sources: [],
          totalRelevance: 0,
          // Add translated reason if translation function provided
          reason: t && conn.reasonKey ? t(conn.reasonKey) : conn.reasonKey
        });
      }
      const existing = connections.get(key);
      existing.sources.push({ type: 'practice', name: practice });
      existing.totalRelevance += getStrengthValue(conn.strength);
    });
  });
  
  // Add value-based connections
  userValues.forEach(value => {
    const valueConnections = getFrameworksForValue(value);
    valueConnections.forEach(conn => {
      const key = conn.slug;
      if (!connections.has(key)) {
        connections.set(key, {
          ...conn,
          sources: [],
          totalRelevance: 0,
          // Add translated reason if translation function provided
          reason: t && conn.reasonKey ? t(conn.reasonKey) : conn.reasonKey
        });
      }
      const existing = connections.get(key);
      existing.sources.push({ type: 'value', name: value });
      existing.totalRelevance += getStrengthValue(conn.strength);
    });
  });
  
  return Array.from(connections.values()).sort((a, b) => b.totalRelevance - a.totalRelevance);
}

function getStrengthValue(strength) {
  const values = {
    'foundation': 10,
    'primary': 8,
    'strong': 6,
    'moderate': 4,
    'weak': 2
  };
  return values[strength] || 1;
}
