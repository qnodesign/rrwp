module.exports = {
  bail: true,
  testMatch: ['**/?(*.)test.js?(x)'],
  setupFiles: ['raf/polyfill'],
  moduleFileExtensions: ['js', 'jsx'],
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coverageDirectory: '<rootDir>/reports/coverage',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/test/unit/mocks/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  verbose: false,
  snapshotSerializers: ['<rootDir>/node_modules/enzyme-to-json/serializer'],
  setupTestFrameworkScriptFile: '<rootDir>/test/unit/setup.js',
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(qno-console.*?\\.js$))', '<rootDir>/dist/\\.js$'],
};
