import { ColorSchemeName, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp } from '@react-navigation/core';
import { QuestKeys } from './components/hooks';

export enum EStoreKeys {
  USER_LOCATION = 'user_location',
  USER_DESTINATION = 'user_destination',
  USER = 'user',
  GAME_SETTINGS = 'game_settings',
  APP_SETTINGS = 'app_settings',
}

export const getItem = async (key: EStoreKeys) => {
  try {
    const value = await AsyncStorage.getItem(`@${key}`);
    if (value !== null) {
      // value previously stored
    }
    return key === EStoreKeys.USER ? JSON.parse(value as any) : value;
  } catch (e) {
    // error reading value
  }
};
export const storeItem = async (key: EStoreKeys, value: string | object) => {
  try {
    typeof value === 'object'
      ? await AsyncStorage.setItem(`@${key}`, JSON.stringify(value))
      : await AsyncStorage.setItem(`@${key}`, value);
  } catch (e) {
    // saving error
  }
};

export type TTab = 'home' | 'quest' | 'setting' | 'statistic';

export interface IAppProps {
  changeTheme: (_theme: ColorSchemeName) => void;
  theme: ColorSchemeName;
  navigation: NavigationProp<any>;
}

export enum EColors {
  PRIMARY = '#fc5c65',
  SECONDARY = '#5cb5fc',
  COMPLEMENT = '#5cfca3',
}

export interface User {
  name: string;
}

export interface Setting {
  theme: ColorSchemeName;
}

export const GOOGLE_MAPS_APIKEY = 'AIzaSyBvmShLE_JAePJjAbXe8uIrBI3xNBhRw4w';

export const Toast = (message: string) => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50,
  );
};

export const PlacesAPIURL = (lat: number, lng: number) =>
  `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=50&key=${GOOGLE_MAPS_APIKEY}`;

export const distanceBetweenPoints = (p1: any, p2: any) => {
  if (!p1 || !p2) {
    return 0;
  }

  var R = 6371; // Radius of the Earth in km
  var dLat = ((p2.latitude - p1.latitude) * Math.PI) / 180;
  var dLon = ((p2.longitude - p1.longitude) * Math.PI) / 180;
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((p1.latitude * Math.PI) / 180) *
      Math.cos((p2.latitude * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
};

export const latLongToMerc = (latDeg: number, longDeg: number) => {
  // From: https://gist.github.com/scaraveos/5409402
  const longRad = (longDeg / 180.0) * Math.PI;
  const latRad = (latDeg / 180.0) * Math.PI;
  const smA = 6378137.0;
  const xmeters = smA * longRad;
  const ymeters = smA * Math.log((Math.sin(latRad) + 1) / Math.cos(latRad));
  return { x: xmeters, y: ymeters };
};

export const questKeys = [
  'BrokenKrater',
  'Jar',
  'Skull',
  'StatueEgypt',
  'BrokenPsykter',
  'HeliBell',
  'NavalShipCruiser',
  'RoyalScepter',
  'MummyHand',
] as const;

export const easyPoly: QuestKeys[] = ['BrokenKrater', 'Jar', 'Skull'];
export const mediumPoly: QuestKeys[] = [
  'StatueEgypt',
  'BrokenPsykter',
  'HeliBell',
];
export const hardPoly: QuestKeys[] = [
  'NavalShipCruiser',
  'RoyalScepter',
  'MummyHand',
];

export const arrRandomEl = (arr: QuestKeys[] = []) =>
  arr[Math.floor(Math.random() * arr.length)];

export type Difficulty = 'easy' | 'medium' | 'hard';

export const questGenerator = (difficulty: Difficulty): QuestKeys[] => {
  // return ['Jar', 'Skull', 'StatueEgypt'];
  switch (difficulty) {
    case 'easy':
      return [
        arrRandomEl(easyPoly),
        arrRandomEl(easyPoly),
        arrRandomEl(mediumPoly),
      ];

    case 'medium':
      return [
        arrRandomEl(easyPoly),
        arrRandomEl(mediumPoly),
        arrRandomEl(mediumPoly),
      ];

    default:
      return [
        arrRandomEl(mediumPoly),
        arrRandomEl(hardPoly),
        arrRandomEl(hardPoly),
      ];
  }
};

export const getDestination = (
  difficulty: Difficulty = 'easy',
  destinations: { latitude: number; longitude: number }[],
) => {
  if (!difficulty || !destinations?.length) {
    throw new Error('No difficulty or destinations provided');
  }
  if (difficulty === 'easy') {
    return destinations[0];
  }
  if (difficulty === 'medium') {
    return destinations[1];
  }
  return destinations[2];
};
