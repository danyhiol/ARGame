import Geolocation, {
  GeolocationError,
  GeolocationResponse,
} from '@react-native-community/geolocation';
import {
  ViroConstants,
  ViroARScene,
  ViroNode,
  ViroText,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
} from '@viro-community/react-viro';
import React, { useReducer, useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import {
  PERMISSIONS,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
import useEffectOnce from 'react-use/lib/useEffectOnce';
import useUnmount from 'react-use/lib/useUnmount';
import CompassHeading from 'react-native-compass-heading';

import {
  // PlacesAPIURL,
  Toast,
  latLongToMerc,
  distanceBetweenPoints,
  storeItem,
  EStoreKeys,
  // questGenerator,
  getDestination,
} from '../utils';
import {
  destinations,
  // initialSharedState,
  QuestKeys,
  useSharedState,
} from '../components/hooks';
import { IState, IWelcomeScreenProps } from '../@types/typings';
// import Quest from '../components/Quest';

export default function WelcomeScreen(props: IWelcomeScreenProps) {
  const [sharedState, setSharedState] = useSharedState();
  const [state, setState] = useReducer(
    (oldState: IState, newState: Partial<IState>) => ({
      ...oldState,
      ...newState,
    }),
    {
      cameraReady: false,
      locationReady: false,
      nearbyPlaces: [],
      tracking: false,
      compassHeading: 0,
      material: {
        Jar: undefined,
        Skull: undefined,
        StatueEgypt: undefined,
        BrokenKrater: undefined,
        BrokenPsykter: undefined,
        HeliBell: undefined,
        NavalShipCruiser: undefined,
        RoyalScepter: undefined,
        MummyHand: undefined,
      },
    },
  );

  const handleObjectClick = (object: QuestKeys) => {
    if (sharedState.quest === object) {
      console.log('Item Founded');
      setState({ material: { ...state.material, [object]: 'green' } });
      const timeout = setTimeout(() => {
        props.setText(0);
        props.setDialog(['Congratulation you have completed level one.']);
        props.setPlaying(false);

        clearTimeout(timeout);
      }, 1000);
    } else {
      console.log('Wrong Item');
      setState({ material: { ...state.material, [object]: 'red' } });
    }
  };

  useEffectOnce(() => {
    const permissions = Platform.select({
      ios: [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE],
      android: [
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ],
    });

    permissions &&
      requestMultiple(permissions).then((statuses) => {
        if (Platform.OS === 'ios') {
          console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
          console.log(
            'Location',
            statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE],
          );
          setState({
            locationReady:
              statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] ===
              RESULTS.GRANTED,
            cameraReady: statuses[PERMISSIONS.IOS.CAMERA] === RESULTS.GRANTED,
          });
        } else {
          console.log('Camera', statuses[PERMISSIONS.ANDROID.CAMERA]);
          console.log(
            'Location',
            statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION],
          );
          setState({
            locationReady:
              statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] ===
              RESULTS.GRANTED,
            cameraReady:
              statuses[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED,
          });
        }
      });

    CompassHeading.start(3, ({ heading }) => {
      setState({ compassHeading: heading }); // may/could be accuracy
    });

    return () => {};
  });

  useEffect(() => {
    getCurrentLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.locationReady, state.cameraReady]);

  useEffect(() => {
    // getNearbyPlaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sharedState.location]);

  useUnmount(() => {
    if (state.listener) {
      Geolocation.clearWatch(state.listener);
    }
    CompassHeading.stop();
  });

  const getCurrentLocation = () => {
    console.log(
      'state.cameraReady ',
      state.cameraReady,
      'state.cameraReady ',
      state.cameraReady,
    );
    if (state.cameraReady && state.locationReady) {
      const geoSuccess = (result: GeolocationResponse) => {
        setSharedState({ ...sharedState, location: result.coords });
        storeItem(EStoreKeys.USER_LOCATION, result.coords);
      };

      const listener = Geolocation.watchPosition(
        geoSuccess,
        (error: GeolocationError) => {
          console.log(
            '[Error:WelcomeScreen]getCurrentLocation watchPosition error',
            error.message,
          );
        },
        {
          distanceFilter: 10,
        },
      );

      setState({ listener });
    }
  };

  const getNearbyPlaces = async () => {
    if (!sharedState.location) return;

    /* const URL = PlacesAPIURL(sharedState.location.latitude, sharedState.location.longitude);
    fetch(URL)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === 'OK') {
          const places = responseJson.results
            .slice(0, 4)
            .map((rawPlace: any) => {
              return {
                id: rawPlace.place_id,
                title: rawPlace.name,
                lat: rawPlace.geometry.location.lat,
                lng: rawPlace.geometry.location.lng,
                // lat: 49.24855816845585,
                // lng: 7.0273578561176375,
                icon: rawPlace.icon,
              };
            });
          setState({ nearbyPlaces: places });
        } else {
          console.warn('Status :', responseJson.status);
        }
      })
      .catch((error) => {
        console.error(error);
      }); */
  };

  useEffect(() => {
    if (state.tracking) {
      Toast('All set!');
    } else {
      //Toast(`Move your device around gently to calibrate AR (${reason}) and compass.`);
    }
    return () => {};
  }, [state.tracking]);

  const _onInitialized = (_state: number, reason: number) => {
    setState({
      tracking:
        _state === ViroConstants.TRACKING_NORMAL ||
        _state === ViroConstants.TRACKING_LIMITED,
    });

    console.log('_onInitialized reason', reason, _state);
  };

  const transformGpsToAR = (lat: number, lng: number) => {
    const isAndroid = Platform.OS === 'android';
    const latObj = lat;
    const longObj = lng;
    const latMobile = sharedState.location.latitude;
    const longMobile = sharedState.location.longitude;

    const deviceObjPoint = latLongToMerc(latObj, longObj);
    const mobilePoint = latLongToMerc(latMobile, longMobile);
    const objDeltaY = deviceObjPoint.y - mobilePoint.y;
    const objDeltaX = deviceObjPoint.x - mobilePoint.x;

    if (isAndroid) {
      let degree = state.compassHeading;
      let angleRadian = (degree * Math.PI) / 180;
      let newObjX =
        objDeltaX * Math.cos(angleRadian) - objDeltaY * Math.sin(angleRadian);
      let newObjY =
        objDeltaX * Math.sin(angleRadian) + objDeltaY * Math.cos(angleRadian);
      return { x: newObjX, z: -newObjY };
    }

    return { x: objDeltaX, z: -objDeltaY };
  };

  const placeARObjects = () => {
    // if (state.nearbyPlaces.length === 0) {
    //   console.log('There is not places');
    //   // return undefined;
    // }

    const destination = getDestination(
      sharedState.difficulty ?? 'easy',
      sharedState.destinations ?? destinations,
    );

    const coords = transformGpsToAR(
      destination.latitude,
      destination.longitude,
    );
    const scale = Math.abs(Math.round(coords.z / 15));
    const distance =
      distanceBetweenPoints(sharedState.location, {
        latitude: destination.latitude,
        longitude: destination.longitude,
      }) * 1000;

    if (distance >= 10) {
      return (
        <ViroNode
          key={`id_${distance}`}
          scale={[scale, scale, scale]}
          // rotation={[0, 0, 0]}
          position={[coords.x, 0, coords.z]}>
          <ViroText
            width={4}
            height={0.5}
            position={[0, -1.5, 0]}
            scale={[3, 3, 3]}
            style={styles.empty}
            extrusionDepth={2}
            // text={`You are ${distance ?? 0}m away from the item`}
            text={`${Number(distance).toFixed(0)} m to object`}
          />
        </ViroNode>
      );
    }

    /* return (
      <Quest
        scale={scale}
        distance={distance}
        position={[coords.x, 0, coords.z]}
      />
    ); */

    return (
      <ViroNode
        key={`id_${distance}`}
        scale={[scale, scale, scale]}
        rotation={[0, 0, 0]}
        position={[coords.x, 0, coords.z]}>
        <ViroText
          width={4}
          height={0.5}
          scale={[3, 3, 3]}
          extrusionDepth={2}
          // text={`${Number(distance).toFixed(0)} m`}
          text={sharedState.hint}
          style={styles.empty}
          position={[0, -0.75, 0]}
        />

        <ViroAmbientLight color="#ffffff" />

        <Viro3DObject
          position={[-4, 0, 0]}
          source={require('../assets/objects/Jar/Jar.obj')}
          resources={[
            require('../assets/objects/Jar/Ancient_jar_diffuse.jpg'),
            require('../assets/objects/Jar/Jar.mtl'),
          ]}
          highAccuracyEvents={true}
          scale={[0.1, 0.1, 0.1]}
          rotation={[90, 0, 0]}
          materials={state.material.Jar}
          type="OBJ"
          // transformBehaviors={['billboard']}
          onClick={() => handleObjectClick('Jar')}
        />

        <Viro3DObject
          position={[-6, 1, 0]}
          source={require('../assets/objects/Skull/12140_Skull_v3_L2.obj')}
          resources={[
            require('../assets/objects/Skull/Skull.jpg'),
            require('../assets/objects/Skull/12140_Skull_v3_L2.mtl'),
          ]}
          highAccuracyEvents={true}
          scale={[0.1, 0.1, 0.1]}
          rotation={[-90, 0, 0]}
          materials={state.material.Skull}
          type="OBJ"
          // transformBehaviors={['billboard']}
          onClick={() => handleObjectClick('Skull')}
        />

        <Viro3DObject
          position={[-2, 1, 0]}
          source={require('../assets/objects/StatueEgypt/12343_statue_v1_l3.obj')}
          resources={[
            require('../assets/objects/StatueEgypt/12343_Statue_Diffuse.jpg'),
            require('../assets/objects/StatueEgypt/12343_statue_v1_l3.mtl'),
          ]}
          highAccuracyEvents={true}
          scale={[0.2, 0.2, 0.2]}
          rotation={[270, 160, 0]}
          materials={state.material.StatueEgypt}
          type="OBJ"
          // transformBehaviors={['billboard']}
          onClick={() => handleObjectClick('StatueEgypt')}
        />
      </ViroNode>
    );
  };

  return (
    <ViroARScene onTrackingUpdated={_onInitialized}>
      {state.locationReady && state.cameraReady && placeARObjects()}
    </ViroARScene>
  );
}

ViroMaterials.createMaterials({
  white: {
    lightingModel: 'Blinn',
    diffuseColor: 'rgb(231,231,231)',
  },
  frontMaterial: {
    diffuseColor: 'white',
  },
  founded: {
    diffuseColor: 'green',
  },
  backMaterial: {
    diffuseColor: '#FF0000',
  },
  sideMaterial: {
    diffuseColor: '#0000FF',
  },

  geometryBlue: {
    diffuseColor: '#0000FFFF',
  },
  geometryRed: {
    diffuseColor: '#FF0000FF',
  },
  green: { diffuseColor: 'green' },
  red: { diffuseColor: 'red' },
});

const styles = StyleSheet.create({
  view: { flex: 1 },
  viro_navigator: { height: 400 },
  empty: {
    fontFamily: 'Arial',
    fontSize: 40,
    fontWeight: '700',
    fontStyle: 'italic',
    color: '#0000FF',
  },
  boldFont: {
    color: '#FFFFFF',
    flex: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
