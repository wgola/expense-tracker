import { defineConfig, configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    coverage: {
      enabled: true,
      reporter: ['cobertura'],
      provider: 'istanbul',
      reportsDirectory: './reports/coverage'
    },
    exclude: [
      ...configDefaults.exclude,
      'tailwind.config.ts',
      'postcss.config.mjs',
      'next.config.mjs'
    ]
  }
});
