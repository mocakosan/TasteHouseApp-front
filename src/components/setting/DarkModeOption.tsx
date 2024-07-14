import React from 'react';
import {useColorScheme} from 'react-native';
import {CompoundOptions} from '../common/CompoundOptions';
import useThemeStorage from '@/hooks/useThemeStorage';

interface DarkModeOptionProps {
  isVisible: boolean;
  hideOption: () => void;
}

function DarkModeOption({isVisible, hideOption}: DarkModeOptionProps) {
  const {theme, isSystem, setMode, setSystem} = useThemeStorage();
  const systemDefault = useColorScheme();
  const handlePressLight = () => {
    setMode('light');
    setSystem(false);
    hideOption();
  };

  const handlePressDark = () => {
    setMode('dark');
    setSystem(false);
    hideOption();
  };

  const handlePressSystem = () => {
    setMode(systemDefault ?? 'light');
    setSystem(true);
    hideOption();
  };
  return (
    <CompoundOptions isVisible={isVisible} hideOption={hideOption}>
      <CompoundOptions.Background>
        <CompoundOptions.Container>
          <CompoundOptions.Button
            onPress={handlePressLight}
            isChecked={isSystem === false && theme === 'light'}>
            라이트 모드
          </CompoundOptions.Button>
          <CompoundOptions.Divider />
          <CompoundOptions.Button
            onPress={handlePressDark}
            isChecked={isSystem === false && theme === 'dark'}>
            다크 모드
          </CompoundOptions.Button>
          <CompoundOptions.Divider />
          <CompoundOptions.Button
            onPress={handlePressSystem}
            isChecked={isSystem === true}>
            시스템 기본값
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

export default DarkModeOption;
