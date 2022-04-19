module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    extends: ['@tophat/eslint-config/base', '@tophat/eslint-config/jest'],
    ignorePatterns: ['lib'],
}
