import {useEffect} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import {
  PERMISSIONS,
  Permission,
  RESULTS,
  check,
  request,
} from 'react-native-permissions';

type PermissionType = 'LOCATION' | 'PHOTO';

type permissionOs = {
  [key in PermissionType]: Permission;
};

const androidPermissions: permissionOs = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};
const iosPermissions: permissionOs = {
  LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PHOTO: PERMISSIONS.IOS.PHOTO_LIBRARY,
};

function usePermission(type: PermissionType) {
  useEffect(() => {
    (async () => {
      const isAndroid = Platform.OS === 'android';
      const permissionOs = isAndroid ? androidPermissions : iosPermissions;
      const checked = await check(permissionOs[type]);
      const showPermissionAlert = () => {
        Alert.alert(
          alerts[`${type}_PERMISSION`].TITLE,
          alerts[`${type}_PERMISSION`].DESCRIPTION,
          [
            {
              text: '설정하기',
              onPress: () => Linking.openSettings(),
            },
            {
              text: '취소',
              style: 'cancel',
            },
          ],
        );
      };
      switch (checked) {
        case RESULTS.DENIED:
          if (isAndroid) {
            showPermissionAlert();
            return;
          }
          await request(permissionOs[type]);
          break;
        case RESULTS.BLOCKED:
        case RESULTS.LIMITED:
          showPermissionAlert();
          break;
        default:
          break;
      }
    })();
  }, []);
}

export default usePermission;
