module.exports = {
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-var': 'error',
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    'no-multiple-empty-lines': 'error',
    eqeqeq: 'error',
    'no-unused-vars': 'error',
  },
};
