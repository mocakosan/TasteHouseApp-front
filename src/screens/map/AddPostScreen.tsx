import InputField from '@/components/InputField';
import CustomButton from '@/components/customButton';
import {colors, mapNavigations} from '@/constants';
import useForm from '@/hooks/useForm';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {validateAddPost} from '@/utils';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_POST
>;

function AddPostScreen({route}: AddPostScreenProps) {
  const {location} = route.params;
  const discriptionRef = useRef<TextInput | null>(null);
  const addPost = useForm({
    initialValue: {
      title: '',
      description: '',
    },
    validate: validateAddPost,
  });
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <InputField
            value=""
            disabled
            icon={
              <Octicons name="location" size={16} color={colors.GRAY_500} />
            }
          />
          <CustomButton variant="outlined" size="large" label="날짜 선택" />
          <InputField
            placeholder="제목을 입력하세요"
            error={addPost.errors.title}
            touched={addPost.touched.title}
            // value={values.email}
            // onChangeText={text => handleChangeText('email', text)}
            // onBlur={() => handleBlur('email')}
            returnKeyType="next" //키보드가 enter가 next로 바뀜
            blurOnSubmit={false} //enter 눌러도 키보드가 안닫힘
            onSubmitEditing={() => discriptionRef.current?.focus()} //이메일을 입력 한뒤에 비밀번호로 포커스 자동이동
            {...addPost.getTextInputProps('title')}
          />
          <InputField
            ref={discriptionRef}
            placeholder="기록하고 싶은 내용을 입력하세요.  (선택)"
            error={addPost.errors.descrition}
            touched={addPost.touched.descrition}
            multiline
            returnKeyType="next"
            {...addPost.getTextInputProps('description')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  inputContainer: {gap: 20, marginBottom: 20},
});

export default AddPostScreen;
