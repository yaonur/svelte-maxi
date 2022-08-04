import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  proxy:{
      "/api/":"http://localhost:8000/"
    },
  plugins: [svelte()]
})
