module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // change this line
  transformIgnorePatterns: [
    "/node_modules/(?!axios).+\\.js$"
  ],

  setupFilesAfterEnv: ['./jest.setup.ts'],
};
export {};