import 'polyfill/polyfill';

const testsContext = require.context('.', true, /Test\.js$/);
testContext.keys().forEach(testsContext);

const componentsContext = require.context(
  '../src/',
  true,
  /(components|store|services|polyfill)(?!.*App|.*index|.*store).*\.(js|jsx)$/
);
componentsContext.keys().forEach(componentsContext);
