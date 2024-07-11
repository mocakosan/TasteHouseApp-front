import React from 'react';
import {CompoundOptions} from '../common/CompoundOptions';

interface EditProfileImageOptionProps {
  isVisible: boolean;
  hideOption: () => void;
  onChangeImage: () => void;
}

function EditProfileImageOption({
  isVisible,
  hideOption,
  onChangeImage,
}: EditProfileImageOptionProps) {
  return (
    <CompoundOptions isVisible={isVisible} hideOption={hideOption}>
      <CompoundOptions.Background>
        <CompoundOptions.Container>
          <CompoundOptions.Button onPress={onChangeImage}>
            앨범에서 사진선택
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

export default EditProfileImageOption;
