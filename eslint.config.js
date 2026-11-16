import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
  { ignores: ['dist/**'] },
  js.configs.recommended,
  reactHooks.configs['recommended-latest'],
  {
    files: ['**/*.{js,jsx,mjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.node },
    },
    rules: { 'no-unused-vars': ['error', { varsIgnorePattern: '^(motion$|[A-Z_])' }] },
  },
]
