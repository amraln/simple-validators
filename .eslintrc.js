module.exports = {
    root: true,
    plugins: ['@typescript-eslint'],
    extends: [require.resolve('@amille/eslint-config'), 'plugin:@typescript-eslint/recommended', 'prettier'],
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.ts'],
            },
        },
    },
    rules: {
        'class-methods-use-this': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'import/extensions': [
            'error',
            'always',
            {
                js: 'never',
                ts: 'never',
            },
        ],
    },
};
