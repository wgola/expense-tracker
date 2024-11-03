import { defineConfig, coverageConfigDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    coverage: {
      enabled: true,
      reporter: ['cobertura'],
      provider: 'istanbul',
      reportsDirectory: './reports/coverage',
      exclude: [
        ...coverageConfigDefaults.exclude,
        '**/{tailwind,postcss,next,vitest,database,storage}.config.*',
        '**/instrumentation.ts',
        '**/schemas/**',
        '**/models/**'
      ]
    }
  }
});
