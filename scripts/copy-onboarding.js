#!/usr/bin/env node

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define source and destination mappings
const fileMappings = [
  // English files
  {
    source: 'documentation/onboarding/en/welcome-kit/overview.md',
    dest: 'src/lib/content/get-involved/onboarding/en/welcome-kit/overview.md'
  },
  {
    source: 'documentation/onboarding/en/welcome-kit/statutes.md',
    dest: 'src/lib/content/get-involved/onboarding/en/welcome-kit/statutes.md'
  },
  {
    source: 'documentation/onboarding/en/welcome-kit/work-system-guide.md',
    dest: 'src/lib/content/get-involved/onboarding/en/welcome-kit/work-system-guide.md'
  },
  {
    source: 'documentation/ggf-operating-system/ggf-catalyst/operating-system.md',
    dest: 'src/lib/content/get-involved/onboarding/en/welcome-kit/operating-system.md'
  },
  {
    source: 'documentation/ggf-operating-system/ggf-catalyst/strategic-goals.md',
    dest: 'src/lib/content/get-involved/onboarding/en/welcome-kit/strategic-goals.md'
  },
  {
    source: 'documentation/onboarding/en/foundational/working-with-ai.md',
    dest: 'src/lib/content/get-involved/onboarding/en/foundational/working-with-ai.md'
  },
  {
    source: 'documentation/onboarding/en/foundational/git-and-documentation-flow.md',
    dest: 'src/lib/content/get-involved/onboarding/en/foundational/git-and-documentation-flow.md'
  },
  {
    source: 'documentation/onboarding/en/foundational/first-love-ledger.md',
    dest: 'src/lib/content/get-involved/onboarding/en/foundational/first-love-ledger.md'
  },
  {
    source: 'documentation/onboarding/en/foundational/time-tracking.md',
    dest: 'src/lib/content/get-involved/onboarding/en/foundational/time-tracking.md'
  },
  // Swedish files
  {
    source: 'documentation/onboarding/sv/welcome-kit/overview.md',
    dest: 'src/lib/content/get-involved/onboarding/sv/welcome-kitoverview.md'
  },
  {
    source: 'documentation/onboarding/sv/welcome-kit/statutes.md',
    dest: 'src/lib/content/get-involved/onboarding/sv/welcome-kit/statutes.md'
  },
  {
    source: 'documentation/onboarding/sv/welcome-kit/work-system-guide.md',
    dest: 'src/lib/content/get-involved/onboarding/sv/welcome-kit/work-system-guide.md'
  },
  {
    source: 'documentation/ggf-operating-system/ggf-catalyst/strategic-goals-sv.md',
    dest: 'src/lib/content/get-involved/onboarding/sv/welcome-kit/strategic-goals.md'
  },
  {
    source: 'documentation/onboarding/sv/foundational/working-with-ai.md',
    dest: 'src/lib/content/get-involved/onboarding/sv/foundational/working-with-ai.md'
  },
  {
    source: 'documentation/onboarding/sv/foundational/git-and-documentation-flow.md',
    dest: 'src/lib/content/get-involved/onboarding/sv/foundational/git-and-documentation-flow.md'
  },
  {
    source: 'documentation/onboarding/sv/foundational/first-love-ledger.md',
    dest: 'src/lib/content/get-involved/onboarding/sv/foundational/first-love-ledger.md'
  },
  {
    source: 'documentation/onboarding/sv/foundational/time-tracking.md',
    dest: 'src/lib/content/get-involved/onboarding/sv/foundational/time-tracking.md'
  }
];

async function ensureDirectory(filePath) {
  const dir = path.dirname(filePath);
  try {
    await fs.access(dir);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(dir, { recursive: true });
      console.log(`📁 Created directory: ${dir}`);
    } else {
      throw error;
    }
  }
}

async function copyFile(sourceRelative, destRelative) {
  const projectRoot = path.resolve(__dirname, '..');
  const sourcePath = path.resolve(projectRoot, sourceRelative);
  const destPath = path.resolve(projectRoot, destRelative);
  
  try {
    // Check if source file exists
    await fs.access(sourcePath);
    
    // Ensure destination directory exists
    await ensureDirectory(destPath);
    
    // Read source file
    const content = await fs.readFile(sourcePath, 'utf8');
    
    // Add frontmatter comment indicating source
    const sourceComment = `<!-- This file is automatically copied from ${sourceRelative} -->\n\n`;
    const contentWithComment = sourceComment + content;
    
    // Write to destination
    await fs.writeFile(destPath, contentWithComment, 'utf8');
    
    console.log(`✅ Copied: ${sourceRelative} → ${destRelative}`);
    
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.warn(`⚠️  Source file not found: ${sourceRelative}`);
    } else {
      console.error(`❌ Error copying ${sourceRelative}:`, error.message);
      throw error;
    }
  }
}

async function copyOnboardingFiles() {
  console.log('🚀 Copying welcome kit files...');
  
  try {
    // Copy all files
    for (const mapping of fileMappings) {
      await copyFile(mapping.source, mapping.dest);
    }
    
    console.log('✨ Onboarding files copied successfully!');
    
  } catch (error) {
    console.error('💥 Failed to copy onboarding files:', error.message);
    process.exit(1);
  }
}

// Run the script if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  copyOnboardingFiles();
}

export { copyOnboardingFiles };
