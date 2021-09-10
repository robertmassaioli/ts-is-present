module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  testMatch: [
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
    '**/__tests__/**/*.+(ts|tsx|js)',
  ],
  preset: 'ts-jest',
}