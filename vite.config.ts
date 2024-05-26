/// <reference types="vitest" />

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  envPrefix: 'COMPARUS_',

  resolve: {
    alias: {
      test: path.resolve(__dirname, 'test'),
      assets: path.resolve(__dirname, 'src', 'assets'),
      features: path.resolve(__dirname, 'src', 'features'),
      shared: path.resolve(__dirname, 'src', 'shared'),
    },
  },

  test: {
    coverage: {
      all: true,
      reporter: ['text', 'json', 'html', 'cobertura', 'text-summary'],
      clean: true,
      include: [
        'src/**',
      ],
      exclude: [
        'src/application/main.ts',
      ],
    },
    setupFiles: ['./test/setup.ts'],
    globals: true,
    environment: 'jsdom',
    clearMocks: true,
  },
});
