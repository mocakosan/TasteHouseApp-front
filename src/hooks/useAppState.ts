import {useRef, useState, useEffect} from 'react';
import {AppState} from 'react-native';

function useAppState() {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [isComback, setIsComback] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        setIsComback(true);
      }

      if (appState.current.match(/active/) && nextAppState === 'background') {
        setIsComback(false);
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);
  return {isComback, appStateVisible};
}

export default useAppState;
