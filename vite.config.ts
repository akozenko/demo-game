import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  envPrefix: 'COMPARUS_',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      features: path.resolve(__dirname, 'src', 'features'),
      shared: path.resolve(__dirname, 'src', 'shared'),
    },
  },
});
