// https://kulshekhar.github.io/ts-jest/docs/getting-started/options
import type { JestConfigWithTsJest } from 'ts-jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { readFileSync } from 'fs';
import { join } from 'path';

const tsconfig = JSON.parse(
  readFileSync(join(__dirname, './tsconfig.json'), 'utf-8'),
);
const jestConfig: JestConfigWithTsJest = {
  // [...]
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.(spec|test)\\.ts$',
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
    prefix: '<rootDir>',
  }),

  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        // ts-jest configuration goes here
      },
    ],
  },
};

export default jestConfig;
