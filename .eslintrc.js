// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  env: {
    jest: true,
  },
  extends: [
    'expo',
    'prettier',
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
    'plugin:promise/recommended',
  ],
  overrides: [],
  plugins: [
    'prettier',
    'import',
    'promise',
    'react-hooks',
    'sort-keys-fix',
    'sort-destructure-keys',
    'react-native',
  ],
  root: true,
  rules: {
    'import/newline-after-import': [
      'error',
      {
        count: 1,
      },
    ],
    'import/no-duplicates': 'error',
    'import/order': [
      'error',
      {
        'alphabetize': {
          caseInsensitive: true,
          order: 'asc',
        },
        'groups': [
          ['external', 'builtin'],
          'internal',
          ['sibling', 'parent'],
          'index',
        ],
        'newlines-between': 'always',
        'pathGroups': [
          {
            group: 'external',
            pattern: '@(react|react-native)',
            position: 'before',
          },
          {
            group: 'internal',
            pattern: '@miBoilerplate/**',
          },
          {
            group: 'internal',
            pattern: '@src/**',
          },
        ],
        'pathGroupsExcludedImportTypes': ['internal', 'react'],
      },
    ],
    'no-console': ['error'],
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'avoid',
        bracketSameLine: true,
        bracketSpacing: true,
        quoteProps: 'consistent',
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'es5',
        useTabs: false,
      },
    ],
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    // 'react-native/no-single-element-style-arrays': 2,
    // 'react-native/no-unused-styles': 2,
    // 'react-native/split-platform-components': 2,
    // 'react-native/no-inline-styles': 2,
    // 'react-native/no-color-literals': 2,
    // "react-native/no-raw-text": 2, //? if you do not have a wrapper around the text component you the react native plugin to enable all rules

    'sort-destructure-keys/sort-destructure-keys': [
      2,
      { caseSensitive: false },
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
      },
    ],

    'sort-keys-fix/sort-keys-fix': [
      'error',
      'asc',
      {
        caseSensitive: false,
        natural: true,
      },
    ],
  },
};
