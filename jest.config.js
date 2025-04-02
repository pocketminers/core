import { pathsToModuleNameMapper } from "ts-jest";

import tsconfig from "./tsconfig.aliases.json" assert { type: "json" };

export default {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "docs/test_coverage",
    coverageProvider: "v8",
    maxWorkers: 5,
    testEnvironment: "node",
    testPathIgnorePatterns: ["/node_modules/", "/dist/", "/docs/"],
    roots: [
        "<rootDir>/src",
        "<rootDir>/tests"
    ],
    moduleDirectories: ["node_modules"],
    moduleFileExtensions: [
        "js",
        "ts",
        "json",
        "node"
    ],
    moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: "<rootDir>/" }),
    transform: {
        "^.+\\.(ts)$": [ "ts-jest", {
            tsconfig: "<rootDir>/tsconfig.prod.json"
        }],
    },
    extensionsToTreatAsEsm: [".ts"],
    transformIgnorePatterns: [
        "/node_modules/",
        "/docs/",
        "/dist/"
    ],
    detectOpenHandles: true,
    verbose: true,
    testTimeout: 30000
};
