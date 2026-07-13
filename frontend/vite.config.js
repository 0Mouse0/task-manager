import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    //environment: 'node', // Para probar funciones puras
    environment: 'jsdom', // Sirve para pruebas de componentes React
    setupFiles: './src/test/setup.js', // Sirve para pruebas de componentes React
  },
})