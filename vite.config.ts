import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    // For a custom domain (www.kelei.site), base should be '/'
    base: '/',
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});