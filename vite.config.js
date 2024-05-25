import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/

// server_url = import.meta.env.VITE_SERVER_URL
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://rentify-server-dnlb.onrender.com/',
        secure: false,
      },
    },
  },

  plugins: [react()],
});
