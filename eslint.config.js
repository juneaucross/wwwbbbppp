// @ts-check
import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  // Ignore non-source and generated files (migrated from .eslintignore)
  {
    ignores: ['node_modules/', 'dist/', 'coverage/', '*.min.js'],
  },
  // Define environments/globals for both browser and node contexts
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  // Disable rules that would conflict with Prettier formatting
  eslintConfigPrettier,
  {
    rules: {
      'vue/no-undef-properties': 'error',
      'vue/no-unused-vars': 'error',
      'vue/no-unused-components': 'error',
      'arrow-parens': ['error', 'always'],
      // Vue 3 specific rules
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    // Limit linting to source-like files
    files: ['**/*.vue', '**/*.js', '**/*.ts'],
  },
];
