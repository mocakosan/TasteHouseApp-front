import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {AuthStackParamList} from '../../navigations/stack/AuthStackNavigator';
import {authNaviagtions} from '../../constants/navigations';
import CustomButton from '../../components/customButton';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNaviagtions.AUTH_HOME
>;

function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
  return (
    <SafeAreaView>
      <View>
        <CustomButton
          label="로그인하기"
          onPress={() => navigation.navigate(authNaviagtions.LOGIN)}
        />
        <CustomButton
          label="회원가입하기"
          varient="outlined"
          onPress={() => navigation.navigate(authNaviagtions.SIGNUP)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default AuthHomeScreen;
