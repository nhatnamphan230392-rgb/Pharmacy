import { AppText } from '@components';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import {
  Animated,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { getStyles } from './styles';
import Svg, { Path } from 'react-native-svg';

interface AppTextInputProps extends TextInputProps {
  error?: string;
  name?: string;
  title?: string;
  control?: Control<any>;
  rules?: RegisterOptions;
  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  errorTextStyle?: StyleProp<ViewStyle>;
  renderRight?: any;
}
interface InputDefaultProps extends TextInputProps {
  titleStyle?: StyleProp<TextStyle>;
  error?: string;
  title?: string;
  secureTextEntry?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  errorTextStyle?: StyleProp<ViewStyle>;
  renderRight?: any;
}
const EyeIcon = ({ color }: { color: string }) => (
  <Svg width={24} height={24} viewBox="0 0 30 30" fill="none">
    <Path
      d="M1.875 15S6.875 6.875 15 6.875 28.125 15 28.125 15 23.125 23.125 15 23.125 1.875 15 1.875 15z"
      stroke={color || "#ACAEB2"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15 18.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
      stroke={color || "#ACAEB2"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const EyeOffIcon = ({ color }: { color: string }) => (
  <Svg width={24} height={24} viewBox="0 0 30 30" fill="none">
    <Path
      d="M12.615 12.615a3.374 3.374 0 104.77 4.77M13.57 7.215c.474-.06.951-.09 1.429-.09C22.875 7.125 26.25 15 26.25 15a14.807 14.807 0 01-1.879 3.015M8.936 8.936A15.217 15.217 0 003.75 15S7.125 22.875 15 22.875a10.957 10.957 0 006.064-1.811M3.75 3.75l22.5 22.5"
      stroke={color || "#ACAEB2"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);


const InputDefault = forwardRef<TextInput, InputDefaultProps>(
  (
    {
      style,
      error,
      title,
      titleStyle,
      secureTextEntry,
      containerStyle,
      inputContainerStyle,
      renderRight,
      errorTextStyle,
      ...props
    },
    ref,
  ) => {
    const styles = getStyles();
    const [isSecureTextEntry, setSecureTextEntry] = useState(secureTextEntry);
    const [isFocused, setIsFocused] = useState(false);
    const borderAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(borderAnim, {
        toValue: isFocused ? 1 : 0,
        duration: 180,
        useNativeDriver: false,
      }).start();
    }, [borderAnim, isFocused]);

    const hasError = !!error;

    const animatedBorderStyle = {
      borderColor: hasError
        ? '#FF3B30'
        : borderAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['#D0D0D0', '#007AFF'],
          }),
    } as const;
    return (
      <View style={[styles.container, containerStyle]}>
        {title && <AppText style={[styles.title, titleStyle]}>{title}</AppText>}
        <Animated.View
          style={[
            styles.inputContainer,
            animatedBorderStyle,
            isFocused && !hasError && styles.inputShadowFocused,
            inputContainerStyle,
          ]}
        >
          <TextInput
            ref={ref}
            style={[styles.input, style, error && styles.inputError]}
            placeholderTextColor="#999999"
            {...props}
            secureTextEntry={isSecureTextEntry}
            onFocus={e => {
              setIsFocused(true);
              props.onFocus && props.onFocus(e);
            }}
            onBlur={e => {
              setIsFocused(false);
              props.onBlur && props.onBlur(e);
            }}
          />
          {secureTextEntry && (
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => {
                setSecureTextEntry(!isSecureTextEntry);
              }}
            >
              {!isSecureTextEntry ? (
                <EyeIcon color={'#ACAEB2'} />
              ) : (
                <EyeOffIcon color={'#ACAEB2'}  />
              )}
            </TouchableOpacity>
          )}
          {renderRight ?? renderRight}
        </Animated.View>
        {error && (
          <AppText style={[styles.errorText, errorTextStyle]}>{error}</AppText>
        )}
      </View>
    );
  },
);

export const AppTextInput = forwardRef<TextInput, AppTextInputProps>(
  (
    {
      style,
      error,
      name,
      title,
      control,
      titleStyle,
      rules,
      containerStyle,
      errorTextStyle,
      ...props
    },
    ref,
  ) => {
    const styles = getStyles();

    if (control) {
      return (
        <Controller
          control={control}
          name={name ?? ''}
          rules={rules}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error: errorInput },
          }) => (
            <InputDefault
              ref={ref}
              style={[styles.input, style, error && styles.inputError]}
              placeholderTextColor="#999999"
              titleStyle={titleStyle}
              title={title}
              containerStyle={containerStyle}
              {...props}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errorInput?.message}
              errorTextStyle={errorTextStyle}
            />
          )}
        />
      );
    } else {
      return (
        <InputDefault
          title={title}
          error={error}
          ref={ref}
          style={style}
          {...props}
          titleStyle={titleStyle}
          containerStyle={containerStyle}
          inputContainerStyle={props.inputContainerStyle}
          errorTextStyle={errorTextStyle}
        />
      );
    }
  },
);
