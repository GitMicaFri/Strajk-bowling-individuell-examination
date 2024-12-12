module.exports = {
    transform: {
        '^.+\\.[tj]sx?$': 'babel-jest', // Hanterar JS och JSX
    },
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy', // Mocka CSS/SCSS
        '\\.svg$': '<rootDir>/jest-svg-mock.js', // Mocka SVG-filer
    },
    setupFilesAfterEnv: [
        '@testing-library/jest-dom',
        '<rootDir>/jest.setup.js',
    ],
    collectCoverage: true,
    coverageProvider: 'v8',
    coverageReporters: ['json', 'json-summary'],
};
