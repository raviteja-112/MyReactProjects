import { createGlobPatternsForDependencies } from '@nx/react/tailwind';
import { join } from 'path';
import baseConfig from './tailwind.base.config.js';

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class', // Enable dark mode
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    ...createGlobPatternsForDependencies(__dirname, {
      dependencies: ['@shadcn/ui'],
      includeDependencies: true,
    }),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4f46e5',
          dark: '#4338ca',
        },
        secondary: {
          DEFAULT: '#10b981',
          dark: '#059669',
        },
        dark: {
          DEFAULT: '#1f2937',
          light: '#374151',
        },
      },
    },
  },
  plugins: [],
};

export default config;
