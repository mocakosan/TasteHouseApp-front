import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthHomeScreen from '@/screens/auth/AuthHomeScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import {authNavigations} from '@/constants';
import SignUpScreen from '@/screens/auth/SignUpScreen';
import KaKaoLoginScreen from '@/screens/auth/KakaoLoginScreen';

export type AuthStackParamList = {
  [authNavigations.AUTH_HOME]: undefined;
  [authNavigations.LOGIN]: undefined;
  [authNavigations.SIGNUP]: undefined;
  [authNavigations.KAKAO]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          backgroundColor: 'white',
          shadowColor: 'gray',
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: 'black',
      }}>
      <Stack.Screen
        name={authNavigations.AUTH_HOME}
        component={AuthHomeScreen}
        options={{
          headerTitle: '',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={authNavigations.LOGIN}
        component={LoginScreen}
        options={{
          headerTitle: '로그인',
        }}
      />
      <Stack.Screen
        name={authNavigations.SIGNUP}
        component={SignUpScreen}
        options={{
          headerTitle: '회원가입',
        }}
      />
      <Stack.Screen
        name={authNavigations.KAKAO}
        component={KaKaoLoginScreen}
        options={{
          headerTitle: '카카오 로그인',
        }}
      />
    </Stack.Navigator>
  );
}

export default AuthStackNavigator;
