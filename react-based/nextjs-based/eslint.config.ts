import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import react from 'eslint-plugin-react';
import globals from 'globals';

import nextPlugin from '@next/eslint-plugin-next';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

// @ts-expect-error ignore type error --- IGNORE ---
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';

// @ts-expect-error ignore type error --- IGNORE ---
import flowtypePlugin from 'eslint-plugin-flowtype';

// @ts-expect-error ignore type error --- IGNORE ---
import pluginPromise from 'eslint-plugin-promise';

import { configs, parser } from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

const nextCompat = compat.config(
  {
    plugins: nextPlugin.configs.recommended.plugins,
  },
);

const eslintConfig =  defineConfig(
  includeIgnoreFile(gitignorePath),
  {
    ignores: [
      '*.d.ts',
      'src/tsconfig.json',
      '*.css',
      'node_modules/**/*',
      '.next',
      'out',
    ],
  },
  eslint.configs.recommended,
  configs.strict,
  configs.stylistic,
  ...compat.config({
    extends: ['next/core-web-vitals'],
  }),
  ...nextCompat,
  pluginPromise.configs['flat/recommended'],
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    languageOptions: {
      parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      formComponents: ['Form'],
      linkComponents: [
        { name: 'Link', linkAttribute: 'to' },
        { name: 'NavLink', linkAttribute: 'to' },
      ],
      'import/internal-regex': '^~/',
      'import/resolver': {
        node: true,
        typescript: true,
      },
    },
    plugins: {
      '@stylistic': stylistic,
      '@stylistic/ts': stylistic,
      '@stylistic/js': stylistic,
      '@stylistic/jsx': stylistic,
      react,
      'jsx-a11y': jsxA11yPlugin,
      // '@next/next': nextPlugin,
      'flow-type': flowtypePlugin,
      'react-hooks': reactHooksPlugin,
    },
    extends: [
      ...compat.config(jsxA11yPlugin.configs.recommended),
    ],
    // @ts-expect-error ignore type error
    rules: {
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'off',
      'react/require-render-return': 'off',
      'react/display-name': 'off',
      'react/no-direct-mutation-state': 'off',
      'react/no-string-refs': 'off',
      'react/jsx-no-undef': 'off',
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      '@next/next/no-duplicate-head': 'off',
      '@next/next/no-img-element': 'error',
      '@next/next/no-page-custom-font': 'off',
      // 'import/namespace': 'off',
      // 'import/no-named-as-default': 'off',
      // 'import/no-named-as-default-member': 'off',
      '@stylistic/indent': ['error', 2],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],
    },
  },
);

export default eslintConfig;