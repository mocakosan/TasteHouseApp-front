import {LatLng} from 'react-native-maps';
import {create} from 'zustand';

interface LocationState {
  moveLocation: LatLng | null;
  setMoveLocation: (location: LatLng) => void;
  selectLocation: LatLng | null;
  setSelectLocation: (location: LatLng) => void;
}

const useLocationStore = create<LocationState>(set => ({
  moveLocation: null,
  selectLocation: null,
  setMoveLocation: (moveLocation: LatLng) => {
    set(state => ({...state, moveLocation}));
  },
  setSelectLocation: (selectLocation: LatLng) => {
    set(state => ({...state, selectLocation}));
  },
}));

export default useLocationStore;
