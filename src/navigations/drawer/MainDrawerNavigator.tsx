import {createDrawerNavigator} from '@react-navigation/drawer';
import CalendarHomeScreen from '@/screens/calendar/CalendarHomeScreen';
import MapStackNavigator, {MapStackParamList} from '../stack/MapStackNavigator';
import {colors, mainNavigations} from '@/constants';
import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Dimensions} from 'react-native';
import CustomDrawerContent from './CustomDrawerContent';
import FeedStackNavigator from '../stack/FeedStackNavigator';

export type MainDrawerParamList = {
  [mainNavigations.HOME]: NavigatorScreenParams<MapStackParamList>;
  [mainNavigations.FEED]: undefined;
  [mainNavigations.CALENDAR]: undefined;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

function DrawerIcons(route: RouteProp<MainDrawerParamList>, focused: boolean) {
  let iconName = '';

  switch (route.name) {
    case mainNavigations.HOME: {
      iconName = 'location-on';
      break;
    }
    case mainNavigations.FEED: {
      iconName = 'book';
      break;
    }
    case mainNavigations.CALENDAR: {
      iconName = 'event-note';
      break;
    }
  }

  return (
    <MaterialIcons
      name={iconName}
      size={18}
      color={focused ? colors.BLACK : colors.GRAY_500}
    />
  );
}
function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={({route}) => ({
        headerShown: false,
        drawerType: 'front', //스크린이 밀리지 않고 열리는 옵션
        drawerStyle: {
          // 드로우 네이게이션바 스타일
          width: Dimensions.get('screen').width * 0.6,
          backgroundColor: colors.WHITE,
        },
        drawerActiveTintColor: colors.BLACK, //현재 활성화된 네비게이션 글씨 색상
        drawerInactiveTintColor: colors.GRAY_500,
        drawerActiveBackgroundColor: colors.PINK_200, //현재 활성화된 네비게이션 상자 색상
        drawerInactiveBackgroundColor: colors.GRAY_100, //현재 선택되지 않는 네이게이션 상자 색상
        drawerLabelStyle: {
          fontWeight: '600',
        },
        drawerIcon: ({focused}) => DrawerIcons(route, focused),
      })}>
      <Drawer.Screen
        name={mainNavigations.HOME}
        component={MapStackNavigator}
        options={{title: '홈', swipeEnabled: false}} //swipeEnabled: 왼쪽에서 오른쪽으로 슬라이드 방지
      />
      <Drawer.Screen
        name={mainNavigations.FEED}
        component={FeedStackNavigator}
        options={{title: '피드'}}
      />
      <Drawer.Screen
        name={mainNavigations.CALENDAR}
        component={CalendarHomeScreen}
        options={{title: '캘린더'}}
      />
    </Drawer.Navigator>
  );
}

export default MainDrawerNavigator;
