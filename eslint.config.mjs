import { defineConfig, globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import globals from 'globals'

const eslintConfig = defineConfig([
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'public/sw.js',
    'public/workbox-*.js',
  ]),
  js.configs.recommended,
  nextPlugin.configs['core-web-vitals'],
  reactHooks.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    files: ['*.config.js', '*.config.mjs'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['jest.setup.js'],
    languageOptions: {
      globals: { ...globals.node, ...globals.jest },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
  },
])

export default eslintConfig
