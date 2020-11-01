module.exports = {
  verbose: true,
  coveragePathIgnorePatterns: ['src/**/types', 'src/**/tests', 'src/**/routes/'],
  coverageDirectory: 'reports/coverage',
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageReporters: ['json', 'lcov', 'text', 'html'],
  moduleFileExtensions: ['ts', 'js'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es)'],
  transform: {
    // process ts with ts-jest
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/tests/**/*.+(spec|test).[jt]s?(x)', '**/tests/**/**/*.+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['<rootDir>/build/*'],
  roots: ['<rootDir>'],
};
