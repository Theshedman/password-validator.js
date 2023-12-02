"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
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
    preset: "ts-jest/presets/default-esm",
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
    },
    transform: {
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
exports.default = config;
