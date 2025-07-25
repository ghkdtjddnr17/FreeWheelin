module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    testMatch: [
      "**/tests/**/*.test.ts",
      "**/tests/**/*.test.tsx"
    ],
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest"
    }
  };
  