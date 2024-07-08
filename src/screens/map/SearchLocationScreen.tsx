import SearchInput from '@/components/common/SearchInput';
import useUserLocation from '@/hooks/queries/useUserLocation';
import useSearchLocation from '@/hooks/useSearchLocation';
import React, {useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';

const SearchLocationScreen = () => {
  const [keyword, setKeyword] = useState<string>('');
  const {userLocation} = useUserLocation();
  const {regionInfo} = useSearchLocation(keyword, userLocation);

  const handleChangeKeyword = (text: string) => {
    setKeyword(text);
  };

  return (
    <View style={styles.container}>
      <SearchInput
        autoFocus
        value={keyword}
        onChangeText={handleChangeKeyword}
        onSubmit={() => Keyboard.dismiss()}
        placeholder="검색할 장소를 입력하세요."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default SearchLocationScreen;
