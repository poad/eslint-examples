import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import tseslint, { ConfigArray, configs, parser } from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

// @ts-expect-error ignore type error --- IGNORE ---
import pluginPromise from 'eslint-plugin-promise';

import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '../.gitignore');

const eslintConfig: ConfigArray =  tseslint.config(
  includeIgnoreFile(gitignorePath),
  {
    ignores: [
      '**/*.d.ts',
      'src/tsconfig.json',
      'src/stories',
      '**/*.css',
      'node_modules/**/*',
      'out',
      'cdk.out',
      'dist',
    ],
  },
  eslint.configs.recommended,
  ...configs.strict,
  ...configs.stylistic,
  pluginPromise.configs['flat/recommended'],
  {
    files: ['src/**/*.ts', '*.js'],
    plugins: {
      '@stylistic': stylistic,
    },
    extends: [importPlugin.flatConfigs.recommended, importPlugin.flatConfigs.typescript],
    languageOptions: {
      parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      // parserOptions: {
      //   projectService: true,
      //   tsconfigRootDir: __dirname,
      // },
    },
    settings: {
      'import/resolver': {
        // You will also need to install and configure the TypeScript resolver
        // See also https://github.com/import-js/eslint-import-resolver-typescript#configuration
        'typescript': true,
        'node': true,
      },
    },
    rules: {
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],
    },

  },
);

export default eslintConfig;