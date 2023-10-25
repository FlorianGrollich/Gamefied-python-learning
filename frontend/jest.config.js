module.exports = {
    roots: ['banana/frontend/src'],
    setupFilesAfterEnv: ['banana/frontend/src/config/setupTests.ts'],
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'banana/node_modules/babel-jest',
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  };
  