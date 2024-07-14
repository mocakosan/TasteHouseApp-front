import {colors} from '@/constants';
import {getDateWithSeparator, validateAddPost} from '@/utils';
import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import InputField from '../common/InputField';
import PreviewImageList from '../common/PreviewImageList';
import CustomButton from '../common/customButton';
import DatePickerOption from './DatePickerOption';
import ImageInput from './ImageInput';
import MarkerSelector from './MarkerSelector';
import ScoreInput from './ScoreInput';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost';
import useForm from '@/hooks/useForm';
import useGetAddress from '@/hooks/useGetAddress';
import useImagePicker from '@/hooks/useImagePicker';
import useModal from '@/hooks/useModal';
import {MarkerColor, ThemeMode} from '@/types';
import AddPostHeaderRight from './AddPostHeaderRight';
import {LatLng} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import useDetailStore from '@/store/useDetailPostStore';
import useMutateUpdatePost from '@/hooks/queries/useMutateUpdatePost';
import useThemeStore from '@/store/useThemeStore';

interface PostFormProps {
  isEdit?: boolean;
  location: LatLng;
}

function PostForm({location, isEdit = false}: PostFormProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();
  const discriptionRef = useRef<TextInput | null>(null);
  const createPost = useMutateCreatePost();
  const updatePost = useMutateUpdatePost();
  const {detailPost} = useDetailStore();
  const isEditMode = isEdit && detailPost;
  const address = useGetAddress(location);
  const addPost = useForm({
    initialValue: {
      title: isEditMode ? detailPost.title : '',
      description: isEditMode ? detailPost.description : '',
    },
    validate: validateAddPost,
  });
  const [date, setDate] = useState(
    isEditMode ? new Date(detailPost.date) : new Date(),
  );
  const [isPicked, setIsPicked] = useState(false);
  const [markerColor, setMarkerColor] = useState<MarkerColor>(
    isEditMode ? detailPost.color : 'RED',
  );
  const [score, setScore] = useState(isEditMode ? detailPost.score : 5);
  const datePickerModal = useModal();
  const imagePicker = useImagePicker({
    initialImages: isEditMode ? detailPost.images : [],
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
    if (isEditMode) {
      updatePost.mutate(
        {
          id: detailPost.id,
          body,
        },
        {
          onSuccess: () => navigation.goBack(),
        },
      );
      return;
    }
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
              <Octicons
                name="location"
                size={16}
                color={colors[theme].GRAY_500}
              />
            }
          />
          <CustomButton
            variant="outlined"
            size="large"
            label={
              isPicked || isEdit
                ? `${getDateWithSeparator(date, '. ')}`
                : '날짜 선택'
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
              showOption
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

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
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

export default PostForm;
