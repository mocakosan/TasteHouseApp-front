import useLegendStorage from '@/hooks/useLegendStorage';
import React from 'react';
import {CompoundOptions} from '../common/CompoundOptions';

interface MapLegendOptionProps {
  isVisible: boolean;
  hideOption: () => void;
}

function MapLegendOption({isVisible, hideOption}: MapLegendOptionProps) {
  const {isVisible: isVisibleLegend, set} = useLegendStorage();

  const handlePressShow = () => {
    set(true);
    hideOption();
  };

  const handlePressHide = () => {
    set(false);
    hideOption();
  };

  return (
    <CompoundOptions isVisible={isVisible} hideOption={hideOption}>
      <CompoundOptions.Background>
        <CompoundOptions.Container>
          <CompoundOptions.Button
            onPress={handlePressShow}
            isChecked={isVisibleLegend}>
            표시하기
          </CompoundOptions.Button>
          <CompoundOptions.Divider />
          <CompoundOptions.Button
            onPress={handlePressHide}
            isChecked={!isVisibleLegend}>
            숨기기
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

export default MapLegendOption;
