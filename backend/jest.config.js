export default {
  // other Jest configurations...
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
  moduleNameMapper: {
    "\\.(mjs)$": "babel-jest",
  },
//   extensionsToTreatAsEsm: ['.js', '.mjs'],
//   testEnvironment: 'node',
};

