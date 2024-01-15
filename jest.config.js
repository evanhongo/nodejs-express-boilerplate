module.exports = {
  preset: "ts-jest",
  //collectCoverage: true,
  //coverageDirectory: "coverage",
  verbose: true,
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(j|t)sx?$",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  moduleFileExtensions: ["js", "json", "jsx", "node", "ts", "tsx"],
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  //important
  testEnvironment: "node"
};
