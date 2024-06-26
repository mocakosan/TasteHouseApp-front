import AddPostHeaderRight from '@/components/AddPostHeaderRight';
import DatePickerOption from '@/components/DatePickerOption';
import ImageInput from '@/components/ImageInput';
import InputField from '@/components/InputField';
import MarkerSelector from '@/components/MarkerSelector';
import PreviewImageList from '@/components/PreviewImageList';
import ScoreInput from '@/components/ScoreInput';
import CustomButton from '@/components/customButton';
import {colors, mapNavigations} from '@/constants';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost';
import useForm from '@/hooks/useForm';
import useGetAddress from '@/hooks/useGetAddress';
import useImagePicker from '@/hooks/useImagePicker';
import useModal from '@/hooks/useModal';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {MarkerColor} from '@/types';
import {getDateWithSeparator, validateAddPost} from '@/utils';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_POST
>;

function AddPostScreen({route, navigation}: AddPostScreenProps) {
  const {location} = route.params;
  const discriptionRef = useRef<TextInput | null>(null);
  const createPost = useMutateCreatePost();
  const address = useGetAddress(location);
  const addPost = useForm({
    initialValue: {
      title: '',
      description: '',
    },
    validate: validateAddPost,
  });
  const [date, setDate] = useState(new Date());
  const [isPicked, setIsPicked] = useState(false);
  const [markerColor, setMarkerColor] = useState<MarkerColor>('RED');
  const [score, setScore] = useState(5);
  const datePickerModal = useModal();
  const imagePicker = useImagePicker({
    initialImages: [],
  });

  const handleConfirmDate = () => {
    setIsPicked(true);
    datePickerModal.hide();
  };

  const handleChangeDate = (pickedDate: Date) => {
    setDate(pickedDate);
  };

  const handleSelectMarker = (name: MarkerColor) => {
    setMarkerColor(name);
  };

  const handleChangeScore = (value: number) => {
    setScore(value);
  };

  const handleSubmit = () => {
    const body = {
      date: date,
      title: addPost.values.title,
      description: addPost.values.description,
      color: markerColor,
      score,
      imageUris: imagePicker.imageUris,
    };
    createPost.mutate(
      {address, ...location, ...body},
      {
        onSuccess: () => navigation.goBack(),
      },
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => AddPostHeaderRight(handleSubmit),
    });
  });
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <InputField
            value={address}
            disabled
            icon={
              <Octicons name="location" size={16} color={colors.GRAY_500} />
            }
          />
          <CustomButton
            variant="outlined"
            size="large"
            label={
              isPicked ? `${getDateWithSeparator(date, '. ')}` : '날짜 선택'
            }
            onPress={datePickerModal.show}
          />
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
          <MarkerSelector
            markerColor={markerColor}
            onPressMarker={handleSelectMarker}
          />
          <ScoreInput score={score} onChangeScore={handleChangeScore} />
          <View style={styles.imagesViewer}>
            <ImageInput onChange={imagePicker.handleChange} />
            <PreviewImageList
              imageUris={imagePicker.imageUris}
              onDelete={imagePicker.delete}
              onChangeOrder={imagePicker.changeOrder}
            />
          </View>
          <DatePickerOption
            date={date}
            isVisible={datePickerModal.isVisible}
            onChangeDate={handleChangeDate}
            onConfirmDate={handleConfirmDate}
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
  imagesViewer: {
    flexDirection: 'row',
  },
});

export default AddPostScreen;
