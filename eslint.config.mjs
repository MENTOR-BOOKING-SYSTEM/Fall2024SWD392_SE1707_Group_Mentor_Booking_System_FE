import typescriptEslint from '@typescript-eslint/eslint-plugin'
import prettier from 'eslint-plugin-prettier'
import tsParser from '@typescript-eslint/parser'
import checkFile from 'eslint-plugin-check-file'
import path from 'node:path'
import js from '@eslint/js'
import { fileURLToPath } from 'node:url'
import { FlatCompat } from '@eslint/eslintrc'

/* eslint-disable @typescript-eslint/naming-convention */

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default [
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
    'prettier/prettier'
  ),
  {
    ignores: ['vite-env.d.ts'],
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'check-file': checkFile,
      prettier
    },
    languageOptions: {
      parser: tsParser
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/naming-convention': [
        1,
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          leadingUnderscore: 'allow'
        },
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow'
        },
        {
          selector: 'property',
          format: null,
          leadingUnderscore: 'allow'
        },
        {
          selector: 'typeLike',
          format: ['PascalCase']
        }
      ],
      'prettier/prettier': [
        'warn',
        {
          arrowParens: 'always',
          semi: false,
          trailingComma: 'none',
          tabWidth: 2,
          endOfLine: 'auto',
          useTabs: false,
          singleQuote: true,
          printWidth: 120,
          jsxSingleQuote: true
        }
      ],
      'check-file/folder-naming-convention': [
        'warn',
        {
          'src/**/*.{ts,tsx}': 'KEBAB_CASE'
        }
      ]
    }
  }
]
