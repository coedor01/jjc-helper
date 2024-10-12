/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: "node",
  setupFilesAfterEnv: ['<rootDir>/src/singleton.ts'],
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',  // 将 @/ 映射到 src 文件夹
  },
};