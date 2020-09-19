module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        target: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@config': './src/config',
          '@controllers': './src/controllers',
          '@database': './src/database',
          '@middleware': './src/middleware',
          '@models': './src/models',
          '@repository': './src/repository',
          '@routes': './src/routes',
          '@services': './src/services',
        },
      },
    ],
  ],
};
