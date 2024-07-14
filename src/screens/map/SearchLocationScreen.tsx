import SearchInput from '@/components/common/SearchInput';
import SearchRegionResult from '@/components/map/SearchRegionResult';
import useUserLocation from '@/hooks/queries/useUserLocation';
import useSearchLocation from '@/hooks/useSearchLocation';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';
import React, {useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';

const SearchLocationScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const [keyword, setKeyword] = useState<string>('');
  const {userLocation} = useUserLocation();
  const {regionInfo, pageParam, fetchNextPage, fetchPrevPage, hasNextPage} =
    useSearchLocation(keyword, userLocation);

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
      <SearchRegionResult regionInfo={regionInfo} />
    </View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
  });

export default SearchLocationScreen;
