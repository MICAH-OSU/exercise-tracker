import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// DATA_SOURCE=api (npm run dev:api) uses the Express + MongoDB server in
// server/; anything else uses the browser-only localStorage version.
const useApi = process.env.DATA_SOURCE === 'api';
const dataModule = useApi ? './src/api/exercises.rest.js' : './src/api/exercises.local.js';

export default defineConfig({
  plugins: [react()],
  // './' makes the build work from any GitHub Pages path without
  // hard-coding the repository name.
  base: './',
  resolve: {
    alias: { '@data': fileURLToPath(new URL(dataModule, import.meta.url)) },
  },
  server: useApi ? { proxy: { '/exercises': 'http://localhost:3000' } } : {},
});
