module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
};
