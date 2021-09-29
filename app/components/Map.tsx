import React, { useEffect } from 'react';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker } from 'react-native-maps';
import { Dimensions } from 'react-native';

import { getDestination, GOOGLE_MAPS_APIKEY } from '../utils';
import { destinations, useSharedState } from './hooks';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function Map() {
  let mapRef: MapView;
  const [sharedState] = useSharedState();
  const destination = getDestination(
    sharedState.difficulty ?? 'easy',
    sharedState.destinations ?? destinations,
  );

  useEffect(() => {
    console.log('Map Destination :', destination);
    return () => {};
  });

  return (
    <MapView
      initialRegion={{
        latitude: sharedState.location.latitude,
        longitude: sharedState.location.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
        // latitudeDelta: 0.0922,
        // longitudeDelta: 0.0421,
      }}
      ref={(ref) => ref && (mapRef = ref)}
      onPress={() => console.log('MapView pressed')}
      style={{ height: 200 }}
      showsUserLocation={true}
      followsUserLocation={true}
      loadingEnabled={true}>
      <Marker
        coordinate={{
          latitude: sharedState.location.latitude,
          longitude: sharedState.location.longitude,
        }}
      />
      <Marker coordinate={destination} />
      <MapViewDirections
        origin={{
          latitude: sharedState.location.latitude,
          longitude: sharedState.location.longitude,
        }}
        destination={destination}
        apikey={GOOGLE_MAPS_APIKEY}
        mode="WALKING"
        optimizeWaypoints={true}
        strokeWidth={3}
        strokeColor="green"
        onStart={(params) => {
          console.log(
            `Started routing between "${params.origin}" and "${params.destination}"`,
          );
        }}
        onReady={(result) => {
          console.log(`Distance: ${result.distance * 1000} m`);
          console.log(`Duration: ${result.duration} min.`);

          mapRef.fitToCoordinates(result.coordinates, {
            edgePadding: {
              right: width / 20,
              bottom: height / 20,
              left: width / 20,
              top: height / 20,
            },
          });
        }}
        onError={(errorMessage) => {
          console.log('GOT AN ERROR :', errorMessage);
        }}
      />
    </MapView>
  );
}

export default Map;
