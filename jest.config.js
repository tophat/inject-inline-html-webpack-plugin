const CI = process.env.CI === '1'
const ARTIFACT_DIR = process.env.ARTIFACT_DIR || 'artifacts'

module.exports = {
    ...(CI && {
        reporters: [
            'default',
            [
                'jest-junit',
                {
                    suiteName: 'Jest Tests',
                    outputDirectory: `${ARTIFACT_DIR}/test_results/jest/`,
                    outputName: 'jest.junit.xml',
                },
            ],
        ],
        coverageReporters: ['lcov'],
        collectCoverage: true,
        coverageDirectory: `${ARTIFACT_DIR}/test_results/jest/`,
        collectCoverageFrom: [
            'src/**/*.ts',
            '!src/**/*.test.ts',
            '!src/**/*.mock.ts',
            '!src/**/__mocks__/**',
        ],
    }),
    watchPathIgnorePatterns: [
        '<rootDir>/lib',
        '<rootDir>/artifacts',
        '<rootDir>/__mocks__',
    ],
}
