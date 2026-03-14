import { defineConfig, globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
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
    'feature/api/graphql/schema.ts',
    'feature/api/graphql/operations.ts',
  ]),

  js.configs.recommended,

  // TypeScript files settings
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: { '@typescript-eslint': ts },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      ...ts.configs.recommended.rules,
      // no-undef は TypeScript の型チェックに任せる
      'no-undef': 'off',
      // TypeScript では未使用変数を @typescript-eslint 側でチェック
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      // && による副作用呼び出しパターンを許可
      '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true }],
      // setState in useEffect・memoization は警告どまり（リファクタリング要）
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  nextPlugin.configs['core-web-vitals'],
  reactHooks.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,

  // react-hooks の新規ルールは警告どまりに（リファクタリング対象）
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/preserve-manual-memoization': 'warn',
    },
  },

  {
    files: ['*.config.js', '*.config.mjs', 'codegen.ts'],
    languageOptions: {
      globals: globals.node,
    },
  },

  {
    files: ['**/__tests__/**/*.{ts,tsx}', '**/*.test.{ts,tsx}', 'jest.setup.js'],
    languageOptions: {
      globals: { ...globals.node, ...globals.jest },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
])

export default eslintConfig
