import {colors} from '@/constants';
import React, {ReactNode} from 'react';
import {Pressable, PressableProps, StyleSheet, Text, View} from 'react-native';

interface HeaderButtonProps extends PressableProps {
  labelText?: string;
  icon?: ReactNode;
  hasError?: boolean;
}

function HeaderButton({labelText, hasError = false, icon}: HeaderButtonProps) {
  return (
    <Pressable disabled={hasError} style={styles.container}>
      {!labelText && icon}
      {!icon && labelText && (
        <Text style={[styles.text, hasError && styles.textError]}>
          {labelText}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.PINK_700,
  },
  textError: {
    color: colors.GRAY_200,
  },
});

export default HeaderButton;
