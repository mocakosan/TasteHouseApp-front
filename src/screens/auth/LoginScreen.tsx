import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import useForm from '@/hooks/useForm';
import {validateLogin} from '@/utils';
import useAuth from '@/hooks/queries/useAuth';
import InputField from '@/components/common/InputField';
import CustomButton from '@/components/common/customButton';
import {errorMessages} from '@/constants';
import Toast from 'react-native-toast-message';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';

interface LoginScreenProps {}

function LoginScreen({}: LoginScreenProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const handleChangeEmail = (text: string) => {
  //   setEmail(text);
  // };
  // const handleChangePassword = (text: string) => {
  //   setPassword(text);
  // };
  const passwordRef = useRef<TextInput | null>(null);
  const {loginMutation} = useAuth();
  const login = useForm({
    initialValue: {email: '', password: ''},
    validate: validateLogin,
  });

  const handleSubmit = () => {
    loginMutation.mutate(login.values, {
      onError: error =>
        Toast.show({
          type: 'error',
          text1: error.response?.data.message || errorMessages.UNEXPECT_ERROR,
          position: 'bottom',
          visibilityTime: 2000,
        }),
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          error={login.errors.email}
          touched={login.touched.email}
          inputMode="email"
          // value={values.email}
          // onChangeText={text => handleChangeText('email', text)}
          // onBlur={() => handleBlur('email')}
          returnKeyType="next" //키보드가 enter가 next로 바뀜
          blurOnSubmit={false} //enter 눌러도 키보드가 안닫힘
          onSubmitEditing={() => passwordRef.current?.focus()} //이메일을 입력 한뒤에 비밀번호로 포커스 자동이동
          {...login.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          error={login.errors.password}
          touched={login.touched.password}
          secureTextEntry
          returnKeyType="join"
          blurOnSubmit={false} //enter 눌러도 키보드가 안닫힘
          onSubmitEditing={handleSubmit} //비밀번호 누르고 join을 누르면 자동으로 로그인 버튼으로 포커스 이동되면서 버튼이 눌러짐
          {...login.getTextInputProps('password')}
        />
      </View>
      <CustomButton
        label="로그인"
        variant="filled"
        size="large"
        onPress={handleSubmit}
      />
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

export default LoginScreen;
