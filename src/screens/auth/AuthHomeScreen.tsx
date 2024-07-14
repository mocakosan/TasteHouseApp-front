import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import {authNavigations} from '@/constants/navigations';
import CustomButton from '@/components/common/customButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '@/constants';
import appleAuth, {
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import Toast from 'react-native-toast-message';
import useAuth from '@/hooks/queries/useAuth';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_HOME
>;

function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const {appleLoginMutation} = useAuth();

  const handlePressAppleLogin = async () => {
    try {
      const {identityToken, fullName} = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      if (identityToken) {
        appleLoginMutation.mutate({
          identityToken,
          appId: 'org.reactjs.native.example.TasteHouseApp',
          nickname: fullName?.givenName ?? null,
        });
      }
    } catch (error: any) {
      if (error.code !== appleAuth.Error.CANCELED) {
        Toast.show({
          type: 'error',
          text1: '애플 로그인이 실패했습니다.',
          text2: '나중에 다시 시도해주세요.',
        });
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require('../../assets/matzip.png')}
        />
      </View>

      <View style={styles.buttonContainer}>
        {Platform.OS === 'ios' && (
          <AppleButton
            buttonStyle={AppleButton.Style.BLACK}
            buttonType={AppleButton.Type.SIGN_IN}
            style={styles.appleButton}
            cornerRadius={3}
            onPress={handlePressAppleLogin}
          />
        )}
        <CustomButton
          label="카카오 로그인하기"
          variant="filled"
          size="large"
          onPress={() => navigation.navigate(authNavigations.KAKAO)}
          style={styles.kakaoButtonContainer}
          textStyle={styles.kakaoButtonText}
          icon={
            <Ionicons name={'chatbubble-sharp'} color={'#181600'} size={16} />
          }
        />
        <CustomButton
          label="이메일 로그인하기"
          onPress={() => navigation.navigate(authNavigations.LOGIN)}
        />
        <Pressable onPress={() => navigation.navigate(authNavigations.SIGNUP)}>
          <Text style={styles.emailText}>이메일로 가입하기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 30,
      marginVertical: 30,
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    imageContainer: {
      flex: 1.5,
      width: Dimensions.get('screen').width / 2,
    },
    buttonContainer: {
      flex: 1,
      gap: 10,
      alignItems: 'center',
    },
    kakaoButtonContainer: {
      backgroundColor: '#fee503',
    },
    kakaoButtonText: {
      color: '#181600',
    },
    emailText: {
      textDecorationLine: 'underline',
      fontWeight: '500',
      padding: 10,
      color: colors[theme].BLACK,
    },
    appleButton: {
      width: Dimensions.get('screen').width - 60,
      height: 45,
      paddingVertical: 25,
    },
  });

export default AuthHomeScreen;
