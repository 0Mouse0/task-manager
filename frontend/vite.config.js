import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    //environment: 'node', // Para probar funciones puras
    environment: 'jsdom', // Sirve para pruebas de componentes React
    setupFiles: './src/test/setup.js', // Sirve para pruebas de componentes React
    // Para pruebas de coverage
    exclude: [
      '**/node_modules/**',
      '**/tests/**',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      thresholds: {
        lines: 60,
        functions: 60,
        branches: 50,
        statements: 60,
      },
    },
  },
})