module.exports = {
    roots: ['banana/frontend/src'],
    setupFilesAfterEnv: ['config/setupTests.ts'],
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
    collectCoverage: true,
    collectCoverageFrom: [
      "src/**/*.{js,jsx,ts,tsx}",
      "!**/node_modules/**",
      "!**/vendor/**"
    ],
    coverageDirectory: "<rootDir>/coverage",
    coverageReporters: ["lcov", "text"],
    coverageThreshold: {
      global: {
        branches: 50,
        functions: 50,
        lines: 50,
        statements: 50
      }
    }
  };
  