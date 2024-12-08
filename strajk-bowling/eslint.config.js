export default [
    {
        files: ['**/*.js', '**/*.jsx'],
        ignores: ['node_modules/**', 'dist/**'],
        languageOptions: {
            parser: '@babel/eslint-parser',
            parserOptions: {
                ecmaVersion: 2021,
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
                requireConfigFile: false,
            },
            globals: {
                document: 'readonly',
                fetch: 'readonly',
                console: 'readonly',
                sessionStorage: 'readonly',
            },
            env: {
                browser: true, // För webbläsarrelaterade globala variabler
                jest: true, // För Jest:s globala variabler
            },
        },
        plugins: {
            react: 'eslint-plugin-react',
            jest: 'eslint-plugin-jest',
        },
        rules: {
            'no-unused-vars': 'warn',
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
];
