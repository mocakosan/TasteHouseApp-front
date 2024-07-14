import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';
import React, {ReactNode} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  PressableProps,
  Dimensions,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface customButtonProps extends PressableProps {
  label?: string;
  variant?: 'filled' | 'outlined';
  size?: 'large' | 'medium';
  inValid?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: ReactNode;
}
const deviceHeight = Dimensions.get('screen').height;

function customButton({
  label,
  variant = 'filled',
  size = 'large',
  inValid = false,
  style = null,
  textStyle = null,
  icon = null,
  ...props
}: customButtonProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <Pressable
      disabled={inValid}
      style={({pressed}) => [
        styles.container,
        pressed ? styles[`${variant}Pressed`] : styles[variant],
        inValid && styles.inValid,
        style,
      ]}
      {...props}>
      <View style={styles[size]}>
        {icon}
        <Text style={[styles.text, styles[`${variant}Text`], textStyle]}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      borderRadius: 3,
      justifyContent: 'center',
      flexDirection: 'row',
    },
    inValid: {
      opacity: 0.5,
    },
    filled: {
      backgroundColor: colors[theme].PINK_700,
    },
    outlined: {
      borderColor: colors[theme].PINK_700,
      borderWidth: 1,
    },
    filledPressed: {
      backgroundColor: colors[theme].PINK_500,
    },
    outlinedPressed: {
      borderColor: colors[theme].PINK_700,
      borderWidth: 1,
      opacity: 0.5,
    },
    large: {
      width: '100%',
      paddingVertical: deviceHeight > 700 ? 15 : 10,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 5,
    },
    medium: {
      width: '50%',
      paddingVertical: deviceHeight > 700 ? 12 : 8,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 5,
    },
    text: {
      fontSize: 16,
      fontWeight: 700,
    },
    filledText: {
      color: colors[theme].WHITE,
    },
    outlinedText: {
      color: colors[theme].PINK_700,
    },
  });

export default customButton;
