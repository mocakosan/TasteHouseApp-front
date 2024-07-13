import React from 'react';
import {CompoundOptions} from '../common/CompoundOptions';
import useMutateDeletePost from '@/hooks/queries/useMutateDeletePost';
import {useNavigation} from '@react-navigation/core';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import useDetailStore from '@/store/useDetailPostStore';
import {StackNavigationProp} from '@react-navigation/stack';
import {Alert} from 'react-native';
import {alerts, feedNavigations} from '@/constants';

interface FeedDetailOptionProps {
  isVisible: boolean;
  hideOption: () => void;
}

function FeedDetailOption({isVisible, hideOption}: FeedDetailOptionProps) {
  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();
  const deletePost = useMutateDeletePost();
  const {detailPost} = useDetailStore();

  const handleDeletePost = () => {
    if (!detailPost) {
      return;
    }
    Alert.alert(alerts.DELETE_POST.TITLE, alerts.DELETE_POST.DESCRIPTION, [
      {
        text: '삭제',
        onPress: () => {
          deletePost.mutate(detailPost.id, {
            onSuccess: () => {
              hideOption();
              navigation.goBack();
            },
          });
        },
        style: 'destructive',
      },
      {
        text: '취소',
        style: 'cancel',
      },
    ]);
  };

  const handleEditPost = () => {
    if (!detailPost) {
      return;
    }
    navigation.navigate(feedNavigations.EDIT_POST, {
      location: {
        latitude: detailPost.latitude,
        longitude: detailPost.longitude,
      },
    });
    hideOption();
  };
  return (
    <CompoundOptions isVisible={isVisible} hideOption={hideOption}>
      <CompoundOptions.Background>
        <CompoundOptions.Container>
          <CompoundOptions.Button isDanger onPress={handleDeletePost}>
            삭제하기
          </CompoundOptions.Button>
          <CompoundOptions.Divider />
          <CompoundOptions.Button onPress={handleEditPost}>
            수정하기
          </CompoundOptions.Button>
        </CompoundOptions.Container>
        <CompoundOptions.Container>
          <CompoundOptions.Button onPress={hideOption}>
            취소
          </CompoundOptions.Button>
        </CompoundOptions.Container>
      </CompoundOptions.Background>
    </CompoundOptions>
  );
}

export default FeedDetailOption;
