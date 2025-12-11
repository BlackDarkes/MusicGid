  import nextJest from "next/jest.js";
  import type {Config} from 'jest';

  const createJestConfig = nextJest({ dir: "./" });

  const config: Config = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.tsx"],
    moduleNameMapper: {
      "\\.(s?css)$": "identity-obj-proxy",
    }
  };

  export default createJestConfig(config);
