import {Dimensions, PixelRatio} from 'react-native';
import {isTablet} from 'react-native-device-info';

const {width, height} = Dimensions.get('window');

export const screenWidth = () => (width >= height ? height : width);

export const screenHeight = () => (height >= width ? height : width);

export const scaleWidth = (size: number) => {
  return Math.round(screenWidth() * (size / 414));
};

export const scaleHeight = (size: number) => {
  return Math.round(screenHeight() * (size / 896));
};

const scale = width / 414;
export function scaleFont(size: number) {
  const newSize = size * scale * 1.2;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export const maxScaleFont = (value: number) =>
  Math.min(scaleFont(value), value);
export const maxScaleWidth = (value: number) =>
  Math.min(scaleWidth(value), value);
export const maxScaleHeight = (value: number) =>
  Math.min(scaleHeight(value), value);

export const isTabletMode = () => {
  try {
    const tabletValue = isTablet();
    return tabletValue === true;
  } catch (error) {
    console.warn('Error checking tablet mode:', error);
    return false;
  }
};
