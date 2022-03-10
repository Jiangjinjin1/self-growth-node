module.exports = {
  root: true,

  env: {
    node: true,
    es2021: true,
  },

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },

  plugins: ['@typescript-eslint', "prettier"],

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  rules: {
    "prettier/prettier": ["warn", {
        "semi": 0,
        "tabWidth": 4,
        "useTabs": true,
        "printWidth": 100,
        "endOfLine": "auto",
        "singleQuote": true,
        "trailingComma": "all",
        "jsxSingleQuote": true,
        "bracketSpacing": true,
        "arrowParens": "always",
        "jsxBracketSameLine": false
    }],
    "eqeqeq": 2,
    "no-debugger": "warn",
    "no-unused-vars": 0,
    "indent": 0
  }
}