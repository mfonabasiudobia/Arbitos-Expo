module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      ["module-resolver",    {
        root: ['.'], // Add the root path of your project's source code
        alias: {
          '@components': './src/components', // Add your aliases here
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@theme': './src/theme',
          '@redux': './src/redux',
          '@lib': './src/lib',
          '@src': './src',
          '@hooks': './src/hooks',
        },
      }],
    ]
  };
};