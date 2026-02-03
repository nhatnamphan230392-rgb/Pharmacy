import { StyleSheet } from 'react-native';
import { scaleFont } from './scale'

export const FontSize = {
  FONT_SIZE_10: scaleFont(10),
  FONT_SIZE_12: scaleFont(12),
  FONT_SIZE_14: scaleFont(14),
  FONT_SIZE_15: scaleFont(15),
  FONT_SIZE_16: scaleFont(16),
  FONT_SIZE_18: scaleFont(18),
  FONT_SIZE_20: scaleFont(20),
  FONT_SIZE_22: scaleFont(22),
  FONT_SIZE_24: scaleFont(24),
  FONT_SIZE_26: scaleFont(26),
  FONT_SIZE_28: scaleFont(28),
  FONT_SIZE_30: scaleFont(30),
  FONT_SIZE_32: scaleFont(32),
  FONT_SIZE_34: scaleFont(34),
  FONT_SIZE_36: scaleFont(36),
  FONT_SIZE_38: scaleFont(38),
  FONT_SIZE_40: scaleFont(40),
  FONT_SIZE_42: scaleFont(42),
  FONT_SIZE_44: scaleFont(44),
  FONT_SIZE_46: scaleFont(46),
  FONT_SIZE_48: scaleFont(48),
  FONT_SIZE_50: scaleFont(50),
};

export const FontWeight = StyleSheet.create({
  FONT_WEIGHT_100: {
    fontWeight: '100',
    fontFamily: 'Roboto-Thin',
  },
  FONT_WEIGHT_200: {
    fontWeight: '200',
    fontFamily: 'Roboto-Light',
  },
  FONT_WEIGHT_300: {
    fontWeight: '300',
    fontFamily: 'Roboto-Light',
  },
  FONT_WEIGHT_400: {
    fontWeight: '400',
    fontFamily: 'Roboto-Regular',
  },
  FONT_WEIGHT_400_ITALIC: {
    fontWeight: '400',
    fontFamily: 'Roboto-Italic',
  },
  FONT_WEIGHT_500: {
    fontWeight: '500',
    fontFamily: 'Roboto-Medium',
  },
  FONT_WEIGHT_600: {
    fontWeight: '600',
    fontFamily: 'Roboto-Medium',
    letterSpacing: 1,
  },
  FONT_WEIGHT_700: {
    fontWeight: '700',
    fontFamily: 'Roboto-Bold',
    letterSpacing: 1,
  },
  FONT_WEIGHT_800: {
    fontWeight: '800',
    fontFamily: 'Roboto-Bold',
    letterSpacing: 1,
  },
  FONT_WEIGHT_900: {
    fontWeight: '900',
    fontFamily: 'Roboto-Black',
  }
});
