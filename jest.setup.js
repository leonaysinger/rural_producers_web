// jest.setup.js
require('@testing-library/jest-dom');
Object.defineProperty(globalThis, 'import.meta', {
    value: {
      env: {
        VITE_API_BASE_URL: 'http://localhost:8000'
      }
    }
  })