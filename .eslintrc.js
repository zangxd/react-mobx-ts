module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  env: {
    // Specifies the ESLint Environments
    node: true,
    jest: true,
    es6: true,
    browser: true,
  },
  extends: [
    'airbnb-base', // Uses the base rules from eslint-config-airbnb-base
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // 'default-case': 'off',
    'class-methods-use-this': 'off',
    // 'new-cap': 'off',
    // 'no-bitwise': 'off',
    // 'no-continue': 'off',
    // 'no-plusplus': 'off',
    // 'no-minusminus': 'off',
    // 'no-underscore-dangle': 'off',
    // 'no-return-await': 'off',
    // 'no-await-in-loop': 'off',
    // 'no-restricted-syntax': ['error', 'WithStatement'],
    // 'no-param-reassign': 'off',
    // 'no-prototype-builtins': 'off',
    // 'prefer-destructuring': 'off',
    // 'prefer-template': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    // '@typescript-eslint/camelcase': 'off',
    // '@typescript-eslint/no-non-null-assertion': 'off',
    // '@typescript-eslint/interface-name-prefix': 'off',
  },
};
