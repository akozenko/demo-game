import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import typescriptEslint from 'typescript-eslint';

export default [
  {
    ignores: ['dist/*'],
  },
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/strongly-recommended'],

  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        sourceType: 'module',
        parser: {
          ts: typescriptEslint.parser,
        },
      },
    },
  },
  {
    rules: {
      'comma-dangle': ['error', {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
      }],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
    },
  },
];
