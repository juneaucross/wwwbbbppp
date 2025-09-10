// @ts-check
import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import prettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    plugins: {
      prettier: prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'vue/no-undef-properties': 'error',
      'vue/no-unused-vars': 'error',
      'vue/no-unused-components': 'error',
      'arrow-parens': ['error', 'always'],
      // Vue 3 specific rules
      'vue/multi-word-component-names': 'off', // Optional: disable if you want single-word components
    },
  },
  eslintConfigPrettier,
  {
    // Specify files to lint
    files: ['**/*.vue', '**/*.js', '**/*.ts'],
  },
];
