module.exports = {
    root: true,
    extends: [require.resolve('@amille/eslint-ts-config')],

    rules: {
        'class-methods-use-this': 'off',
        'import/extensions': [
            'error',
            {
                js: 'never',
                ts: 'never',
                json: 'always',
            },
        ],
    },

    settings: {
        'import/resolver': {
            node: {
                extensions: ['.mjs', '.csj', '.js', '.ts', '.tsx', '.json'],
            },
        },
    },
};
