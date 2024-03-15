export default {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }], // For ES modules
    '@babel/preset-typescript', // For TypeScript
  ],
};
