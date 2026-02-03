import {FontSize, FontWeight} from '@services';
import React from 'react';
import {StyleProp, StyleSheet, TextProps, TextStyle, Platform, Text} from 'react-native';

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  variant?: string;
  color?: string;
  [key: string]: any; 
}

export const AppText = (props: AppTextProps) => {
  const {variant, color, style, children, ...rest} = props;

  const androidStyle = Platform.OS === 'android' ? {
    fontWeight: undefined,
    includeFontPadding: false,
  } : {};

  return (
    <Text
      style={[styles.text, color ? {color} : undefined, androidStyle, style]}
      {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: FontSize.FONT_SIZE_14,
    ...FontWeight.FONT_WEIGHT_400,
  },
});
