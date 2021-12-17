module.exports = {
  root: true,
  extends: [
    'airbnb-base',
    // 'eslint/recommended',
    // 'plugin:jest/recommended',
    // 'plugin:node/recommended',
  ],
  env: {
    browser: true,
    'jest/globals': true,
    es6: true,
  },
  plugins: ['prettier', 'jest'],
  rules: {
    'no-alert': 'off',
    'no-param-reassign': [2, { props: false }],
    'no-plusplus': 'off',
    'no-iterator': 'off',
    'no-restricted-syntax': [2, 'WithStatement'],
    'func-style': 0,
    'import/extensions': ['error', 'always', {
      js: 'never',
    }],
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js'],
    }],
    'no-undef': 0,
    'linebreak-style': 0,
    radix: 0,
    'no-restricted-globals': 0,
  },
};
