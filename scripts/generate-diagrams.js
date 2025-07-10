#!/usr/bin/env node

/**
 * GGF DIAGRAM GENERATOR - Complete Implementation
 * Programmatically generates Mermaid diagrams from the GGF Master Schema
 * 
 * Usage:
 *   npm run generate:diagrams
 *   node scripts/generate-diagrams.js [options]
 * 
 * Options:
 *   --level1    Generate Tiered Ecosystem Map
 *   --level2    Generate all Cluster Maps
 *   --level3    Generate Single Framework Integration Views
 *   --framework <id>  Generate specific framework view
 *   --cluster <id>    Generate specific cluster view
 *   --all       Generate all diagrams
 *   --output <dir>    Output directory (default: ./diagrams)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES modules compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dynamic import function for the schema
async function loadSchema() {
  try {
    // First, try to use tsx/ts-node for direct TypeScript import
    const possibleTsPaths = [
      '../src/lib/data/schema/_index.ts',
      './src/lib/data/schema/_index.ts',
      '../src/lib/data/schema/index.ts',
      './src/lib/data/schema/index.ts'
    ];
    
    // Try built JavaScript files
    const possibleJsPaths = [
      '../src/lib/data/schema/_index.js',
      '../src/lib/data/schema/index.js',
      './src/lib/data/schema/_index.js',
      './lib/data/schema/_index.js',
      '../dist/src/lib/data/schema/_index.js',
      './dist/src/lib/data/schema/_index.js'
    ];
    
    let schemaModule = null;
    let loadedFrom = '';
    
    // First try TypeScript files (requires tsx or ts-node)
    for (const schemaPath of possibleTsPaths) {
      try {
        // Check if file exists first
        const fullPath = path.resolve(schemaPath);
        if (fs.existsSync(fullPath)) {
          schemaModule = await import(fullPath);
          loadedFrom = schemaPath;
          console.log(`✅ Loaded TypeScript schema from: ${schemaPath}`);
          break;
        }
      } catch (e) {
        continue; // Try next path
      }
    }
    
    // If TypeScript import failed, try JavaScript files
    if (!schemaModule) {
      for (const schemaPath of possibleJsPaths) {
        try {
          const fullPath = path.resolve(schemaPath);
          if (fs.existsSync(fullPath)) {
            schemaModule = await import(fullPath);
            loadedFrom = schemaPath;
            console.log(`✅ Loaded JavaScript schema from: ${schemaPath}`);
            break;
          }
        } catch (e) {
          continue; // Try next path
        }
      }
    }
    
    if (!schemaModule) {
      console.error('📁 Searched in the following locations:');
      [...possibleTsPaths, ...possibleJsPaths].forEach(p => {
        const fullPath = path.resolve(p);
        const exists = fs.existsSync(fullPath) ? '✅' : '❌';
        console.error(`   ${exists} ${fullPath}`);
      });
      throw new Error('Could not find schema file in any expected location');
    }
    
    // Validate that we have the required exports
    const requiredExports = ['allEntities', 'allRelationships', 'clusters', 'tierMetadata'];
    const missingExports = requiredExports.filter(exp => !schemaModule[exp]);
    
    if (missingExports.length > 0) {
      console.error(`❌ Missing exports from schema: ${missingExports.join(', ')}`);
      console.error(`Available exports: ${Object.keys(schemaModule).join(', ')}`);
      throw new Error(`Schema file is missing required exports: ${missingExports.join(', ')}`);
    }
    
    return {
      allEntities: schemaModule.allEntities || schemaModule.entities,
      allRelationships: schemaModule.allRelationships || schemaModule.relationships,
      clusters: schemaModule.clusters,
      tierMetadata: schemaModule.tierMetadata
    };
  } catch (error) {
    console.error('❌ Error loading schema:', error);
    console.error('\n💡 Troubleshooting steps:');
    console.error('   1. Build TypeScript files: npm run build');
    console.error('   2. Or install tsx for direct TS support: npm install -g tsx');
    console.error('   3. Then run: tsx scripts/generate-diagrams.js');
    console.error('   4. Or use ts-node: npx ts-node scripts/generate-diagrams.js');
    throw error;
  }
}

// Utility functions
function sanitizeId(id) {
  return id.replace(/[^a-zA-Z0-9_]/g, '_');
}

function getEntityDisplayName(entity) {
  return entity.shortName || entity.name;
}

function truncateText(text, maxLength = 40) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

function getRelationshipLabel(relationship) {
  const typeLabels = {
    'ENABLES': 'enables',
    'DEPENDS_ON': 'depends on',
    'INTEGRATES_WITH': 'integrates with',
    'COORDINATES_WITH': 'coordinates with',
    'OVERSEES': 'oversees',
    'REPORTS_TO': 'reports to',
    'FUNDS': 'funds',
    'INFORMS': 'informs',
    'GUIDES': 'guides',
    'ESTABLISHES': 'establishes',
    'IMPLEMENTS': 'implements',
    'COLLABORATES_WITH': 'collaborates with',
    'ESCALATES_TO': 'escalates to',
    'VALIDATES': 'validates',
    'REWARDS': 'rewards',
    'USES_DATA_FROM': 'uses data from'
  };
  
  return typeLabels[relationship.type] || relationship.type.toLowerCase().replace(/_/g, ' ');
}

function getEntityTypeIcon(type) {
  const icons = {
    'Framework': '📋',
    'Council': '🏛️',
    'Institution': '🏢',
    'EconomicMechanism': '💰',
    'Platform': '⚙️',
    'Process': '🔄',
    'Tool': '🛠️',
    'LegalProtocol': '⚖️',
    'DataMetric': '📊',
    'Protocol': '📜',
    'Hub': '🔗'
  };
  return icons[type] || '🔷';
}

function getRelationshipStyle(relationship) {
  // Return Mermaid link styling based on relationship properties
  const strength = relationship.strength;
  const frequency = relationship.frequency;
  
  if (strength === 'Strong') {
    return 'stroke:#2563eb,stroke-width:3px';
  } else if (strength === 'Weak') {
    return 'stroke:#9ca3af,stroke-width:1px,stroke-dasharray:5 5';
  } else if (frequency === 'Crisis-Only') {
    return 'stroke:#dc2626,stroke-width:2px,stroke-dasharray:10 5';
  }
  
  return 'stroke:#6b7280,stroke-width:2px';
}

// LEVEL 1: Tiered Ecosystem Map
function generateTieredEcosystemMap(schema) {
  const { allEntities, allRelationships, tierMetadata } = schema;
  
  let mermaid = `graph TD
    %% GGF Tiered Ecosystem Map - Generated from Master Schema
    %% Shows the overall architecture across all tiers
    
`;

  // Create subgraphs for each tier
  for (let tier = 0; tier <= 4; tier++) {
    const tierEntities = allEntities.filter(e => 
      e.tier === tier && 
      (e.type === 'Framework' || (e.type === 'Council' && tier <= 1))
    );
    
    if (tierEntities.length === 0) continue;
    
    const tierInfo = tierMetadata[tier];
    mermaid += `    subgraph T${tier}["🎯 Tier ${tier}: ${tierInfo.name}"]\n`;
    mermaid += `        direction TB\n`;
    
    tierEntities.forEach(entity => {
      const sanitizedId = sanitizeId(entity.id);
      const displayName = truncateText(getEntityDisplayName(entity));
      const emoji = entity.ui?.emoji || getEntityTypeIcon(entity.type);
      mermaid += `        ${sanitizedId}["${emoji} ${displayName}"]\n`;
    });
    
    mermaid += `    end\n\n`;
  }

  // Add cross-tier relationships (focus on key enabling relationships)
  const frameworkAndCouncilIds = new Set(
    allEntities
      .filter(e => e.type === 'Framework' || e.type === 'Council')
      .map(e => e.id)
  );
  
  mermaid += `    %% Key cross-tier relationships\n`;
  allRelationships
    .filter(rel => 
      frameworkAndCouncilIds.has(rel.from) && 
      frameworkAndCouncilIds.has(rel.to) &&
      ['ENABLES', 'ESTABLISHES', 'FUNDS'].includes(rel.type)
    )
    .slice(0, 15) // Limit for visual clarity
    .forEach(rel => {
      const fromId = sanitizeId(rel.from);
      const toId = sanitizeId(rel.to);
      const label = getRelationshipLabel(rel);
      mermaid += `    ${fromId} -->|"${label}"| ${toId}\n`;
    });

  // Add styling using your preferred tier colors
  mermaid += `
    %% Tier-based styling (matching website CSS)
    classDef tier0 fill:#fbbf24,stroke:#d97706,stroke-width:3px,color:#000
    classDef tier1 fill:#60a5fa,stroke:#2563eb,stroke-width:2px,color:#000
    classDef tier2 fill:#34d399,stroke:#059669,stroke-width:2px,color:#000
    classDef tier3 fill:#a78bfa,stroke:#7c3aed,stroke-width:2px,color:#000
    classDef tier4 fill:#f472b6,stroke:#db2777,stroke-width:2px,color:#000
`;

  // Apply classes to entities
  for (let tier = 0; tier <= 4; tier++) {
    const tierEntities = allEntities.filter(e => 
      e.tier === tier && 
      (e.type === 'Framework' || (e.type === 'Council' && tier <= 1))
    );
    
    if (tierEntities.length > 0) {
      const entityIds = tierEntities.map(e => sanitizeId(e.id)).join(',');
      mermaid += `    class ${entityIds} tier${tier}\n`;
    }
  }

  return mermaid;
}

// LEVEL 2: Cluster-Specific Maps
function generateClusterMap(clusterId, schema) {
  const { allEntities, allRelationships, clusters } = schema;
  
  const cluster = clusters.find(c => c.id === clusterId);
  if (!cluster) {
    return `graph TD\n    A["❌ Cluster '${clusterId}' not found!"]\n`;
  }

  const clusterEntities = allEntities.filter(e => cluster.entities.includes(e.id));
  const entityIdsInCluster = new Set(clusterEntities.map(e => e.id));

  // Find relationships within the cluster and key external dependencies
  const internalRelationships = allRelationships.filter(r =>
    entityIdsInCluster.has(r.from) && entityIdsInCluster.has(r.to)
  );
  
  const externalDependencies = allRelationships.filter(r =>
    !entityIdsInCluster.has(r.from) && 
    entityIdsInCluster.has(r.to) &&
    ['ENABLES', 'FUNDS', 'ESTABLISHES', 'GUIDES'].includes(r.type)
  );

  let mermaid = `graph TD
    %% ${cluster.name} Cluster Map
    %% Generated from GGF Master Schema
    
`;

  // Add external dependencies first
  if (externalDependencies.length > 0) {
    mermaid += `    subgraph EXT["🔗 Key Dependencies"]\n`;
    mermaid += `        direction LR\n`;
    
    const externalEntityIds = new Set();
    externalDependencies.slice(0, 8).forEach(rel => { // Limit external entities
      if (!externalEntityIds.has(rel.from)) {
        const externalEntity = allEntities.find(e => e.id === rel.from);
        if (externalEntity) {
          const sanitizedId = sanitizeId(rel.from);
          const displayName = truncateText(getEntityDisplayName(externalEntity));
          const emoji = externalEntity.ui?.emoji || getEntityTypeIcon(externalEntity.type);
          mermaid += `        ${sanitizedId}["${emoji} ${displayName}"]\n`;
          externalEntityIds.add(rel.from);
        }
      }
    });
    mermaid += `    end\n\n`;
  }

  // Add main cluster
  mermaid += `    subgraph MAIN["🎯 ${cluster.name}"]\n`;
  mermaid += `        direction TB\n`;

  // Group entities by type for better organization
  const entityTypes = {};
  clusterEntities.forEach(entity => {
    if (!entityTypes[entity.type]) {
      entityTypes[entity.type] = [];
    }
    entityTypes[entity.type].push(entity);
  });

  // Add entities grouped by type
  Object.entries(entityTypes).forEach(([type, entities]) => {
    if (entities.length > 3) {
      // Create subgraph for entity types with many instances
      mermaid += `        subgraph ${type.toUpperCase()}["${getEntityTypeIcon(type)} ${type}s"]\n`;
      entities.forEach(entity => {
        const sanitizedId = sanitizeId(entity.id);
        const displayName = truncateText(getEntityDisplayName(entity));
        mermaid += `            ${sanitizedId}["${displayName}"]\n`;
      });
      mermaid += `        end\n`;
    } else {
      // Add individual entities for smaller groups
      entities.forEach(entity => {
        const sanitizedId = sanitizeId(entity.id);
        const displayName = truncateText(getEntityDisplayName(entity));
        const emoji = entity.ui?.emoji || getEntityTypeIcon(entity.type);
        mermaid += `        ${sanitizedId}["${emoji} ${displayName}"]\n`;
      });
    }
  });

  mermaid += `    end\n\n`;

  // Add external dependency relationships
  mermaid += `    %% External dependencies\n`;
  externalDependencies.slice(0, 8).forEach(rel => {
    const fromId = sanitizeId(rel.from);
    const toId = sanitizeId(rel.to);
    const label = getRelationshipLabel(rel);
    mermaid += `    ${fromId} -->|"${label}"| ${toId}\n`;
  });

  // Add internal relationships
  mermaid += `\n    %% Internal cluster relationships\n`;
  internalRelationships.slice(0, 20).forEach(rel => { // Limit for readability
    const fromId = sanitizeId(rel.from);
    const toId = sanitizeId(rel.to);
    const label = getRelationshipLabel(rel);
    mermaid += `    ${fromId} -->|"${label}"| ${toId}\n`;
  });

  // Add styling using your preferred tier colors
  mermaid += `
    %% Entity type styling (with tier colors for frameworks)
    classDef framework fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef council fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef institution fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
    classDef mechanism fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef external fill:#fafafa,stroke:#666,stroke-width:1px,stroke-dasharray: 5 5
    
    %% Tier-based colors for frameworks (matching website CSS)
    classDef tier0 fill:#fbbf24,stroke:#d97706,stroke-width:3px,color:#000
    classDef tier1 fill:#60a5fa,stroke:#2563eb,stroke-width:2px,color:#000
    classDef tier2 fill:#34d399,stroke:#059669,stroke-width:2px,color:#000
    classDef tier3 fill:#a78bfa,stroke:#7c3aed,stroke-width:2px,color:#000
    classDef tier4 fill:#f472b6,stroke:#db2777,stroke-width:2px,color:#000
`;

  // Apply styling classes (prioritize tier colors for frameworks)
  const frameworks = clusterEntities.filter(e => e.type === 'Framework');
  const councils = clusterEntities.filter(e => e.type === 'Council');
  const institutions = clusterEntities.filter(e => e.type === 'Institution');
  const mechanisms = clusterEntities.filter(e => e.type === 'EconomicMechanism');

  // Apply tier-based styling to frameworks first
  for (let tier = 0; tier <= 4; tier++) {
    const tierFrameworks = frameworks.filter(e => e.tier === tier);
    if (tierFrameworks.length > 0) {
      const entityIds = tierFrameworks.map(e => sanitizeId(e.id)).join(',');
      mermaid += `    class ${entityIds} tier${tier}\n`;
    }
  }

  // Apply type-based styling to non-framework entities
  if (councils.length > 0) {
    mermaid += `    class ${councils.map(e => sanitizeId(e.id)).join(',')} council\n`;
  }
  if (institutions.length > 0) {
    mermaid += `    class ${institutions.map(e => sanitizeId(e.id)).join(',')} institution\n`;
  }
  if (mechanisms.length > 0) {
    mermaid += `    class ${mechanisms.map(e => sanitizeId(e.id)).join(',')} mechanism\n`;
  }

  return mermaid;
}

// LEVEL 3: Single Framework Integration View
function generateFrameworkIntegrationView(frameworkId, schema) {
  const { allEntities, allRelationships } = schema;
  
  const framework = allEntities.find(e => e.id === frameworkId);
  if (!framework) {
    return `mindmap\n  root["❌ Framework '${frameworkId}' not found!"]\n`;
  }

  // Find all relationships involving this framework
  const incomingRels = allRelationships.filter(r => r.to === frameworkId);
  const outgoingRels = allRelationships.filter(r => r.from === frameworkId);

  const displayName = getEntityDisplayName(framework);
  const emoji = framework.ui?.emoji || getEntityTypeIcon(framework.type);

  let mermaid = `mindmap
  root(("${emoji} ${displayName}"))
`;

  // Add dependencies section
  if (incomingRels.length > 0) {
    mermaid += `    Dependencies\n`;
    
    // Group by relationship type
    const depGroups = {};
    incomingRels.forEach(rel => {
      const relType = getRelationshipLabel(rel);
      if (!depGroups[relType]) depGroups[relType] = [];
      depGroups[relType].push(rel);
    });

    Object.entries(depGroups).forEach(([relType, rels]) => {
      if (rels.length > 0) {
        mermaid += `      ${relType}\n`;
        rels.slice(0, 4).forEach(rel => { // Limit for readability
          const sourceEntity = allEntities.find(e => e.id === rel.from);
          if (sourceEntity) {
            const sourceName = truncateText(getEntityDisplayName(sourceEntity), 30);
            const sourceEmoji = sourceEntity.ui?.emoji || getEntityTypeIcon(sourceEntity.type);
            mermaid += `        ${sourceEmoji} ${sourceName}\n`;
          }
        });
      }
    });
  }

  // Add outputs section
  if (outgoingRels.length > 0) {
    mermaid += `    Enables & Affects\n`;
    
    // Group by relationship type
    const outGroups = {};
    outgoingRels.forEach(rel => {
      const relType = getRelationshipLabel(rel);
      if (!outGroups[relType]) outGroups[relType] = [];
      outGroups[relType].push(rel);
    });

    Object.entries(outGroups).forEach(([relType, rels]) => {
      if (rels.length > 0) {
        mermaid += `      ${relType}\n`;
        rels.slice(0, 4).forEach(rel => { // Limit for readability
          const targetEntity = allEntities.find(e => e.id === rel.to);
          if (targetEntity) {
            const targetName = truncateText(getEntityDisplayName(targetEntity), 30);
            const targetEmoji = targetEntity.ui?.emoji || getEntityTypeIcon(targetEntity.type);
            mermaid += `        ${targetEmoji} ${targetName}\n`;
          }
        });
      }
    });
  }

  // Add metadata section
  mermaid += `    Framework Info\n`;
  mermaid += `      📊 Tier ${framework.tier || 'N/A'}\n`;
  mermaid += `      🎯 ${framework.primaryDomain || 'General'} Domain\n`;
  mermaid += `      🌍 ${framework.geographicScope || 'Unknown'} Scope\n`;
  mermaid += `      ⚡ ${framework.implementationPriority || 'Medium'} Priority\n`;
  if (framework.status) {
    mermaid += `      📋 Status: ${framework.status}\n`;
  }

  return mermaid;
}

// File output utilities
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function saveDiagram(content, filename, outputDir) {
  ensureDirectoryExists(outputDir);
  const filePath = path.join(outputDir, filename);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Generated: ${filePath}`);
  return filePath;
}

function generateIndexFile(generatedFiles, outputDir) {
  const indexContent = `# GGF Diagram Index

Generated: ${new Date().toISOString()}

## Generated Diagrams

${generatedFiles.map(file => `- [${path.basename(file, '.mmd')}](${file})`).join('\n')}

## Usage

These are Mermaid.js diagrams that can be:
1. Rendered directly in GitHub/GitLab
2. Imported into documentation
3. Converted to images using Mermaid CLI
4. Embedded in websites with Mermaid.js

## Converting to Images

\`\`\`bash
npm install -g @mermaid-js/mermaid-cli
mmdc -i diagram.mmd -o diagram.png
\`\`\`
`;

  const indexPath = path.join(outputDir, 'README.md');
  fs.writeFileSync(indexPath, indexContent, 'utf8');
  console.log(`📋 Generated index: ${indexPath}`);
}

// Add image generation function
async function generateImages(mmdFiles, outputDir) {
  console.log('\n🖼️  Generating SVG images from Mermaid files...');
  
  try {
    // Check if mermaid CLI is installed
    const { execSync } = await import('child_process');
    
    try {
      execSync('mmdc --version', { stdio: 'pipe' });
    } catch (e) {
      console.log('💡 Mermaid CLI not found. Install with: npm install -g @mermaid-js/mermaid-cli');
      console.log('💡 Skipping image generation - .mmd files are ready for web use');
      return [];
    }
    
    const generatedImages = [];
    
    for (const mmdFile of mmdFiles) {
      const svgFile = mmdFile.replace('.mmd', '.svg');
      const pngFile = mmdFile.replace('.mmd', '.png');
      
      try {
        // Generate SVG (vector, scalable)
        execSync(`mmdc -i "${mmdFile}" -o "${svgFile}" -t default`, { stdio: 'pipe' });
        console.log(`✅ Generated SVG: ${svgFile}`);
        generatedImages.push(svgFile);
        
        // Optionally generate PNG (for email, presentations)
        execSync(`mmdc -i "${mmdFile}" -o "${pngFile}" -t default`, { stdio: 'pipe' });
        console.log(`✅ Generated PNG: ${pngFile}`);
        generatedImages.push(pngFile);
        
      } catch (error) {
        console.log(`⚠️  Failed to generate images for ${mmdFile}: ${error.message}`);
      }
    }
    
    return generatedImages;
    
  } catch (error) {
    console.log('⚠️  Image generation failed:', error.message);
    console.log('💡 You can still use .mmd files directly in your Svelte app');
    return [];
  }
}
async function main() {
  const args = process.argv.slice(2);
  const outputDir = args.includes('--output') 
    ? args[args.indexOf('--output') + 1] 
    : path.join(process.cwd(), 'diagrams');

  console.log('🎨 GGF Diagram Generator - Converting Master Schema to Mermaid diagrams...\n');

  try {
    const schema = await loadSchema();
    
    let generatedFiles = [];
    let diagramsGenerated = 0;

    // Level 1: Tiered Ecosystem Map
    if (args.includes('--level1') || args.includes('--all')) {
      console.log('📊 Generating Level 1: Tiered Ecosystem Map...');
      const diagram = generateTieredEcosystemMap(schema);
      const filePath = saveDiagram(diagram, 'tiered-ecosystem-map.mmd', outputDir);
      generatedFiles.push(filePath);
      diagramsGenerated++;
    }

    // Level 2: All Cluster Maps
    if (args.includes('--level2') || args.includes('--all')) {
      console.log('🗺️  Generating Level 2: Cluster Maps...');
      ensureDirectoryExists(path.join(outputDir, 'clusters'));
      
      schema.clusters.forEach(cluster => {
        const diagram = generateClusterMap(cluster.id, schema);
        const filename = `clusters/${cluster.id}-map.mmd`;
        const filePath = saveDiagram(diagram, filename, outputDir);
        generatedFiles.push(filePath);
        diagramsGenerated++;
      });
    }

    // Specific cluster
    const clusterArg = args.indexOf('--cluster');
    if (clusterArg !== -1 && clusterArg + 1 < args.length) {
      const clusterId = args[clusterArg + 1];
      console.log(`🎯 Generating cluster map for: ${clusterId}`);
      const diagram = generateClusterMap(clusterId, schema);
      const filename = `cluster-${clusterId}-map.mmd`;
      const filePath = saveDiagram(diagram, filename, outputDir);
      generatedFiles.push(filePath);
      diagramsGenerated++;
    }

    // Level 3: Framework Integration Views
    if (args.includes('--level3') || args.includes('--all')) {
      console.log('🔍 Generating Level 3: Framework Integration Views...');
      ensureDirectoryExists(path.join(outputDir, 'frameworks'));
      
      const frameworks = schema.allEntities.filter(e => e.type === 'Framework');
      frameworks.forEach(framework => {
        const diagram = generateFrameworkIntegrationView(framework.id, schema);
        const filename = `frameworks/${framework.id}-integration.mmd`;
        const filePath = saveDiagram(diagram, filename, outputDir);
        generatedFiles.push(filePath);
        diagramsGenerated++;
      });
    }

    // Specific framework
    const frameworkArg = args.indexOf('--framework');
    if (frameworkArg !== -1 && frameworkArg + 1 < args.length) {
      const frameworkId = args[frameworkArg + 1];
      console.log(`🔍 Generating framework integration view for: ${frameworkId}`);
      const diagram = generateFrameworkIntegrationView(frameworkId, schema);
      const filename = `framework-${frameworkId}-integration.mmd`;
      const filePath = saveDiagram(diagram, filename, outputDir);
      generatedFiles.push(filePath);
      diagramsGenerated++;
    }

    // Default behavior if no specific level requested
    if (!args.some(arg => ['--level1', '--level2', '--level3', '--cluster', '--framework', '--all'].includes(arg))) {
      console.log('🎯 No specific level requested, generating Level 1 (Tiered Ecosystem Map)...');
      const diagram = generateTieredEcosystemMap(schema);
      const filePath = saveDiagram(diagram, 'tiered-ecosystem-map.mmd', outputDir);
      generatedFiles.push(filePath);
      diagramsGenerated++;
    }

    // Optionally generate images if requested
    if (args.includes('--images') && generatedFiles.length > 0) {
      const imageFiles = await generateImages(generatedFiles, outputDir);
      generatedFiles.push(...imageFiles);
    }

    // Generate index file
    if (generatedFiles.length > 0) {
      generateIndexFile(generatedFiles, outputDir);
    }

    console.log(`\n🎉 Successfully generated ${diagramsGenerated} diagram(s) in ${outputDir}/`);
    console.log('\n📖 Usage examples:');
    console.log('  node scripts/generate-diagrams.js --level1           # Ecosystem overview');
    console.log('  node scripts/generate-diagrams.js --level2           # All cluster maps');
    console.log('  node scripts/generate-diagrams.js --level3           # All framework views');
    console.log('  node scripts/generate-diagrams.js --cluster constitutional_foundation');
    console.log('  node scripts/generate-diagrams.js --framework framework_aubi');
    console.log('  node scripts/generate-diagrams.js --all              # Generate everything');
    console.log('  node scripts/generate-diagrams.js --all --images     # Generate .mmd + .svg + .png');
    console.log('\n💡 Tip: Add --output ./custom-dir to specify output location');

  } catch (error) {
    console.error('❌ Error generating diagrams:', error);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Make sure the schema files are built (if using TypeScript)');
    console.error('   2. Check that the import path in loadSchema() is correct');
    console.error('   3. Verify that allEntities, allRelationships, and clusters are exported');
    process.exit(1);
  }
}

// Handle both direct execution and module import
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { 
  generateTieredEcosystemMap, 
  generateClusterMap, 
  generateFrameworkIntegrationView,
  loadSchema
};
