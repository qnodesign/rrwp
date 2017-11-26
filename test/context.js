import 'polyfill/polyfill';

const componentsContext = require.context(
  '../src/',
  true,
  /(components|store|services|polyfill)(?!.*App|.*index|.*store).*\.(js|jsx)$/
);
componentsContext.keys().forEach(componentsContext);
