import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AuthStackNavigator from './src/navigations/stack/AuthStackNavigator';
import RootNavigator from './src/navigations/root/RootNavigator';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default App;
