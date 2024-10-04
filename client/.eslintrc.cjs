/* eslint-env node */
module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/strict',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/stylistic',
    'plugin:prettier/recommended',
    'prettier',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['dist', '.eslintrc.cjs', 'src/charting_library'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'import',
    'jsx-a11y',
    'react-hooks',
    'react-refresh',
    'prettier',
  ],
  rules: {
    'no-var': 'error',
    'no-alert': 'off',
    'no-console': ["off", { allow: ["warn", "error"] }],
    'prefer-const': 'error',

    'import/no-duplicates': 'error',
    'import/no-self-import': 'error',
    'import/no-relative-packages': 'error',
    'import/no-relative-parent-imports': 'error',
    'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
    'import/no-empty-named-blocks': 'error',
    'import/no-extraneous-dependencies': 'error',
    'import/no-import-module-exports': 'error',
    'import/newline-after-import': 'error',
    'import/group-exports': 'error',
    'import/exports-last': 'error',
    'import/no-useless-path-segments': ['error', { noUselessIndex: true }],

    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    '@typescript-eslint/consistent-type-definitions': 'off',

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',

    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',

    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'lf',
        singleQuote: true,
      },
    ],

    'react-refresh/only-export-components': ['error', { allowConstantExport: true }],
  },
}
