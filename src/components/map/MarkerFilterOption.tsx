import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {CompoundOptions} from '../common/CompoundOptions';
import {MarkerColor} from '@/types';
import useMarkerFilterStorage from '@/hooks/useMarkerFilterStorage';
import useAuth from '@/hooks/queries/useAuth';
import {colorHex} from '@/constants';

interface MarkerFilterOptionProps {
  isVisible: boolean;
  hideOption: () => void;
}

const categoryList: MarkerColor[] = [
  'RED',
  'YELLOW',
  'GREEN',
  'BLUE',
  'PURPLE',
];

const scoreList = ['1', '2', '3', '4', '5'];

function MarkerFilterOption({isVisible, hideOption}: MarkerFilterOptionProps) {
  const [filterCondition, setFilterCondition] = useState('색상');
  const {getProfileQuery} = useAuth();
  const {categories} = getProfileQuery.data || {};
  const markerFilter = useMarkerFilterStorage();

  const handleCondition = (condition: string) => {
    setFilterCondition(condition);
  };

  const handleFilter = (name: string) => {
    markerFilter.set({
      ...markerFilter.items,
      [name]: !markerFilter.items[name],
    });
  };

  return (
    <CompoundOptions isVisible={isVisible} hideOption={hideOption}>
      <CompoundOptions.Background>
        <CompoundOptions.Container>
          <CompoundOptions.Title>마커 필터링</CompoundOptions.Title>
          <CompoundOptions.Divider />
          <View style={styles.filterContainer}>
            {['색상', '평점'].map(condition => (
              <CompoundOptions.Filter
                key={condition}
                isSelected={filterCondition === condition}
                onPress={() => handleCondition(condition)}>
                {condition}
              </CompoundOptions.Filter>
            ))}
          </View>
          <CompoundOptions.Divider />
          {filterCondition === '색상' && (
            <>
              {categoryList.map(color => (
                <CompoundOptions.CheckBox
                  key={color}
                  isChecked={markerFilter.items[color]}
                  onPress={() => handleFilter(color)}
                  icon={
                    <View
                      style={[
                        styles.marker,
                        {backgroundColor: colorHex[color]},
                      ]}
                    />
                  }>
                  {categories?.[color]}
                </CompoundOptions.CheckBox>
              ))}
            </>
          )}
          {filterCondition === '평점' && (
            <>
              {scoreList.map(score => (
                <CompoundOptions.CheckBox
                  key={score}
                  isChecked={markerFilter.items[score]}
                  onPress={() => handleFilter(score)}>
                  {score}점
                </CompoundOptions.CheckBox>
              ))}
            </>
          )}
          <CompoundOptions.Divider />
          <CompoundOptions.Button onPress={hideOption}>
            완료
          </CompoundOptions.Button>
        </CompoundOptions.Container>
      </CompoundOptions.Background>
    </CompoundOptions>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-around',
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default MarkerFilterOption;
