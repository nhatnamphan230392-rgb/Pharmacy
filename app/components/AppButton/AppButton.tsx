import {FontWeight} from '@assets';
import {AppText} from '@components/AppText/AppText';
import {scaleFont, scaleWidth} from '@utils';
import React, {memo} from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
interface AppButtonProps {
  onPress: () => void;
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  loading?: boolean;
}
export const AppButton = memo((props: AppButtonProps) => {
  const {onPress, title, style, textStyle, disabled, loading} = props;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {backgroundColor: '#007AFF'},
        disabled && {backgroundColor: '#CCCCCC'},
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : textStyle ? (
        <AppText style={[textStyle, disabled && {opacity: 0.8}]}>
          {title}
        </AppText>
      ) : (
        <AppText style={[styles.text, disabled && {opacity: 0.8}]}>
          {title}
        </AppText>
      )}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: scaleWidth(20),
    paddingHorizontal: scaleWidth(16),
    borderRadius: scaleWidth(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    ...FontWeight.FONT_WEIGHT_600,
    fontSize: scaleFont(16),
  },
});
