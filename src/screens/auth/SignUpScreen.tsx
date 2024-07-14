import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import useForm from '@/hooks/useForm';
import {validateSignup} from '@/utils';
import useAuth from '@/hooks/queries/useAuth';
import InputField from '@/components/common/InputField';
import CustomButton from '@/components/common/customButton';
import {errorMessages} from '@/constants';
import Toast from 'react-native-toast-message';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';

function SignUpScreen() {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const passwordRef = useRef<TextInput | null>(null);
  const {signupMutation, loginMutation} = useAuth();
  const passwordConfirmRef = useRef<TextInput | null>(null);
  const signup = useForm({
    initialValue: {email: '', password: '', passwordConfirm: ''},
    validate: validateSignup,
  });
  const handleSubmit = () => {
    const {email, password} = signup.values;
    signupMutation.mutate(
      {email, password},
      {
        onSuccess: () => loginMutation.mutate({email, password}),
        onError: error =>
          Toast.show({
            type: 'error',
            text1: error.response?.data.message || errorMessages.UNEXPECT_ERROR,
            position: 'bottom',
            visibilityTime: 2000,
          }),
      },
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          error={signup.errors.email}
          touched={signup.touched.email}
          inputMode="email"
          returnKeyType="next" //키보드가 enter가 next로 바뀜
          blurOnSubmit={false} //enter 눌러도 키보드가 안닫힘
          onSubmitEditing={() => passwordRef.current?.focus()} //이메일을 입력 한뒤에 비밀번호로 인풋을 이동하려면
          // value={values.email}
          // onChangeText={text => handleChangeText('email', text)}
          // onBlur={() => handleBlur('email')}
          {...signup.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          error={signup.errors.password}
          touched={signup.touched.password}
          secureTextEntry
          textContentType="oneTimeCode"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          {...signup.getTextInputProps('password')}
        />
        <InputField
          ref={passwordConfirmRef}
          placeholder="비밀번호 확인"
          error={signup.errors.passwordConfirm}
          touched={signup.touched.passwordConfirm}
          secureTextEntry
          textContentType="oneTimeCode"
          returnKeyType="join"
          onSubmitEditing={handleSubmit}
          {...signup.getTextInputProps('passwordConfirm')}
        />
      </View>
      <CustomButton label="회원가입" onPress={handleSubmit} />
    </SafeAreaView>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      margin: 30,
    },
    inputContainer: {
      gap: 20,
      marginBottom: 30,
    },
  });

export default SignUpScreen;
