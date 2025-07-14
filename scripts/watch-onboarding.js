#!/usr/bin/env node

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { copyOnboardingFiles } from './copy-onboarding.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define directories to watch
const watchPaths = [
  'documentation/ggf-operating-system/ggf-catalyst',
  'documentation/onboarding/en/welcome-kit',
  'documentation/onboarding/sv/welcome-kit',
  'documentation/onboarding/en/foundational',
  'documentation/onboarding/sv/foundational'
];

async function watchOnboardingFiles() {
  console.log('👀 Watching onboarding source files for changes...');
  
  // Initial copy
  await copyOnboardingFiles();
  
  const projectRoot = path.resolve(__dirname, '..');
  
  // Set up watchers for each directory
  for (const watchPath of watchPaths) {
    const fullPath = path.resolve(projectRoot, watchPath);
    
    try {
      await fs.access(fullPath);
      
      const watcher = fs.watch(fullPath, { recursive: false });
      
      console.log(`👁️  Watching: ${watchPath}`);
      
      for await (const event of watcher) {
        if (event.eventType === 'change' && event.filename?.endsWith('.md')) {
          console.log(`📝 File changed: ${path.join(watchPath, event.filename)}`);
          console.log('🔄 Copying onboarding files...');
          await copyOnboardingFiles();
        }
      }
      
    } catch (error) {
      console.warn(`⚠️  Could not watch directory: ${watchPath} (${error.message})`);
    }
  }
}

// Handle cleanup
process.on('SIGINT', () => {
  console.log('\n👋 Stopping file watcher...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n👋 Stopping file watcher...');
  process.exit(0);
});

// Run the watcher if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  watchOnboardingFiles().catch(error => {
    console.error('💥 File watcher error:', error.message);
    process.exit(1);
  });
}

export { watchOnboardingFiles };
