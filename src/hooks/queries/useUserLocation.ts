import {useEffect, useState} from 'react';
import {LatLng} from 'react-native-maps';
import GeoLocation from '@react-native-community/geolocation';
import useAppState from '../useAppState';

function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.5665,
    longitude: 126.978,
  });
  const [isUserLocationError, setIsLocationError] = useState(false);
  const {isComback} = useAppState();
  useEffect(() => {
    GeoLocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        setUserLocation({latitude, longitude});
        setIsLocationError(false);
      },
      () => {
        setIsLocationError(true);
      },
      {
        enableHighAccuracy: true,
      },
    );
  }, [isComback]);
  return {userLocation, isUserLocationError};
}

export default useUserLocation;
