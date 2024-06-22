import {createDrawerNavigator} from '@react-navigation/drawer';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import CalendarHomeScreen from '@/screens/calendar/CalendarHomeScreen';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
const Drawer = createDrawerNavigator();
function MainDrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="MapHome" component={MapHomeScreen} />
      <Drawer.Screen name="FeedHome" component={FeedHomeScreen} />
      <Drawer.Screen name="CalendarHome" component={CalendarHomeScreen} />
    </Drawer.Navigator>
  );
}

export default MainDrawerNavigator;
