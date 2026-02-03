import { StyleSheet, Platform } from 'react-native';
import { FontWeight } from '@services';
import { scaleFont, scaleWidth, scaleHeight } from '@utils';

export const getStyles = () =>
  StyleSheet.create({
    container: {
      width: '100%',
      marginBottom: scaleHeight(24),
    },
    inputContainer: {
      flexDirection: 'row',
      // flex: 1,
      minHeight: scaleHeight(60),
      borderRadius: scaleWidth(5),
      backgroundColor: '#FFFFFF',
      paddingHorizontal: scaleWidth(10),
      borderWidth: 1,
      borderColor: '#D0D0D0',
    },
    inputContainerFocused: {
      borderColor: '#007AFF',
    },
    inputShadowFocused: {
      shadowColor: '#007AFF',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 3,
    },
    input: {
      flex: 1,
      color: '#000000',
      fontSize: scaleFont(18),
      ...FontWeight.FONT_WEIGHT_400,
      paddingHorizontal: scaleWidth(5),
      ...(Platform.OS === 'android' && {
        fontWeight: undefined,
        includeFontPadding: false,
      }),
    },
    inputError: {
      borderColor: '#FF3B30',
    },
    errorText: {
      color: '#FF3B30',
      fontSize: scaleFont(16),
      marginTop: scaleWidth(8),
    },
    title: {
      paddingBottom: scaleWidth(8),
      ...FontWeight.FONT_WEIGHT_400,
      color: '#000000',
      fontSize: scaleFont(15),
    },

    eyeIcon: {
      paddingLeft: scaleWidth(8),

      alignItems: 'center',
      justifyContent: 'center',
    },
  });
