// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, './'),
  globals: {
    NODE_ENV: 'test',
  },
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(ts)$': 'ts-jest',
  },
  setupFiles: ['<rootDir>/test/config.js'],
};
