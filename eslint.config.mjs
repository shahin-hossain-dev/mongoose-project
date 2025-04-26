import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import pluginJs from '@eslint/js';
export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.js'],
    languageOptions: { globals: globals.browser },
  },

  {
    rules: {
      eqeqeq: 'off',
      'no-unused-vars': 'error', //var use করলে error দিবে
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
      'no-unused-expressions': 'error', // unused expression গুলোর জন্য error দিবে।
      'no-console': 'warn', //console সহ run করলে error দিবে
      'no-undefined': 'error', //কোনো undefined পেলে error দিবে
    },
  },
  {
    ignores: ['.node_modules/*', 'dist'], //eslint ignore node_modules and dist
  },
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
]);
