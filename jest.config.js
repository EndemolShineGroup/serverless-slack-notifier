const preset = require('ts-jest').jestPreset;
const { pathsToModuleNameMapper } = require('ts-jest/utils');

const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/tests/',
    '/__fixtures__/',
  ],
  globals: {
    'ts-jest': {
      tsConfig: "tsconfig.test.json",
    },
  },
  // @TODO Uncomment the following lines once test coverage has reached an acceptable threshold
  // 'coverageThreshold': {
  //   'global': {
  //     'branches': 90,
  //     'functions': 95,
  //     'lines': 95,
  //     'statements': 95
  //   }
  // },
  moduleDirectories: [
    'src',
    'node_modules',
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  testMatch: [
    ...preset.testMatch,
    '**/?(*.)+(spec|i10n|test).ts?(x)',
  ],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
};
