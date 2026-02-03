const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

const config = {
  resolver: {
    alias: {
      '@components': path.resolve(__dirname, 'app/components'),
      '@services': path.resolve(__dirname, 'app/services'),
      '@navigation': path.resolve(__dirname, 'app/navigation'),
      '@assets': path.resolve(__dirname, 'app/assets'),
      '@theme': path.resolve(__dirname, 'app/theme'),
      '@utils': path.resolve(__dirname, 'app/utils'),
      '@screens': path.resolve(__dirname, 'app/screens'),
      '@redux': path.resolve(__dirname, 'app/redux'),
    },
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
  watchFolders: [path.resolve(__dirname)],
};

module.exports = mergeConfig(defaultConfig, config);
