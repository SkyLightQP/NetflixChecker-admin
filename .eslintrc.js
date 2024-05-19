module.exports = {
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'next/core-web-vitals'
  ],
  parser: '@typescript-eslint/parser',
  globals: {
    JSX: true
  },
  rules: {
    'arrow-body-style': 'off',
    'jsx-quotes': 'off',
    'comma-dangle': 'off',
    'object-curly-newline': 'off',
    'linebreak-style': 'off',
    'no-useless-constructor': 'off',
    'class-methods-use-this': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off'
  }
};
