import type { Config } from "jest";

const config: Config = {
  moduleFileExtensions: ["js", "ts"],
  collectCoverageFrom: ["**/*.ts", "!**/node_modules/**", "!**/vendor/**"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
  displayName: "Password Validator",
  extensionsToTreatAsEsm: [".ts"],
  roots: ["<rootDir>/src/"],
  testMatch: ["**/test/**/*.ts", "**/?(*.)+(spec|test).ts"],
  verbose: true,
  preset: "ts-jest/presets/default-esm", // or other ESM presets
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  coveragePathIgnorePatterns: ["src/password/usages/*"],
  testPathIgnorePatterns: ["src/password/usages/*"],
};

export default config;
