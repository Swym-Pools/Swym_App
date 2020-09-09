// "off" or 0 - turn the rule off
// "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
// "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
    'react-native/react-native': true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-native', 'react-hooks', 'prettier'],
  extends: [
    'eslint:recommended',
    'prettier/react',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:jsx-a11y/strict',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  globals: {
    fetch: true,
  },
  rules: {
    'prettier/prettier': ['error'],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'import/no-unresolved': [
      1,
      {
        caseSensitive: false,
      },
    ],
    'import/named': 0,
    'react/jsx-fragments': [1, 'syntax'],
    'react/display-name': 0,
    'react/prop-types': ['error', { ignore: ['navigation'] }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/sort-styles': [
      'error',
      'asc',
      { ignoreClassNames: true, ignoreStyleProperties: false },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
