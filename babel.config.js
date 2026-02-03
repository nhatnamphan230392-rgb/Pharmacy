module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    '@babel/plugin-transform-export-namespace-from',
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@components': './app/components',
          '@services': './app/services',
          '@navigation': './app/navigation',
          '@assets': './app/assets',
          '@theme': './app/theme',
          '@utils': './app/utils',
          '@screens': './app/screens',
          '@redux': './app/redux',
        },
      },
    ],
    'react-native-reanimated/plugin', // Must be last
  ],
};
