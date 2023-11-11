module.exports = {
    testEnvironment: 'node',
    roots: ['banana/server'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    collectCoverage: true,
    collectCoverageFrom: [
      "**/*.{js,ts}",
      "!**/node_modules/**",
      "!Dockerfile",
      "!jest.config.js",
      "!**/coverage/**",
    ],
    coverageDirectory: "<rootDir>/coverage",
    coverageReporters: ["text-summary", "lcov"],
  };
    