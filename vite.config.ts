// vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    sveltekit({
      compilerOptions: {
        // Disable a11y checks
        a11y: {
          noEmptyAnchor: false
        }
      }
    })
  ],
  resolve: {
    alias: {
      '$lib': '/src/lib'
    }
  },
  optimizeDeps: {
    include: [
      'src/lib/data/compassData.js',
      'src/lib/data/precomputedFrameworkDatabase.js',
      'src/lib/data/citizenshipConnections.js',
      'src/lib/data/connectionReasons.js'
    ]
  },
  build: {
    // Updated build targets to support top-level await
    target: ['es2022', 'chrome89', 'firefox89', 'safari15'],
    assetsInclude: ['service-worker.js'], // Ensure service-worker.js is copied to output
    rollupOptions: {
      output: {
        manualChunks: {
          'framework-data': [
            'src/lib/data/compassData.js',
            'src/lib/data/precomputedFrameworkDatabase.js'
          ]
        }
      }
    }
  },
  esbuild: {
    // Updated esbuild target to support top-level await
    target: 'es2022'
  },
  server: {
    fs: {
      // Allow serving files from one level up the project root
      allow: ['..'],
    },
  },
});
