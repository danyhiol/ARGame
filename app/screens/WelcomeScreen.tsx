import React from 'react';
import { ViroARSceneNavigator } from '@viro-community/react-viro';
import { StyleSheet, View } from 'react-native';

import Map from '../components/Map';
import Places from './Places';
import { IWelcomeScreenProps } from '../@types/typings';

export default function WelcomeScreen(props: IWelcomeScreenProps) {
  const Scenes = () => <Places {...props} />;
  return (
    <View style={styles.view}>
      <ViroARSceneNavigator
        autofocus={true}
        worldAlignment="GravityAndHeading"
        initialScene={{
          scene: Scenes,
        }}
        // @ts-ignore is fine
        style={styles.viro_navigator}
      />

      <Map />
    </View>
  );
}

const styles = StyleSheet.create({
  view: { flex: 1 },
  viro_navigator: { height: 400 },
  boldFont: {
    color: '#FFFFFF',
    flex: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
