import React, { useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { NavigationContainer } from '@react-navigation/native';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
// @ts-ignore no need for typing
import TypeWriter from 'react-native-typewriter';

import WelcomeScreen from './app/screens/WelcomeScreen';
import {
  initialSharedState,
  IShareState,
  SharedStateProvider,
} from './app/components/hooks';
import useEffectOnce from 'react-use/lib/useEffectOnce';

const Dialog = [
  'Welcome to our outdoor museum App (OutSeum)',
  'To complete a quest, use the provided hint and description to find the appropriate item. \nYou will be propose a set of 3 items from wish only one is the right one. \nContinue to get directives.',
  `Description: ${initialSharedState.description}. \nHint : ${initialSharedState.hint}.`,
  'Complete Quest',
];

export default function App() {
  const [text, setText] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [dialog, setDialog] = useState(Dialog);
  const [location, setLocation] = useState(
    undefined as unknown as IShareState['location'],
  );

  const next = () => {
    if (text === dialog.length - 1) {
      return setPlaying(true);
    }

    setText(text + 1);
  };

  useEffectOnce(() => {
    Geolocation.getCurrentPosition(
      (position) => setLocation(position.coords),
      (err) => {
        console.log('Error while getting location :', err.message);
        setLocation({
          latitude: 49.255883217204634,
          longitude: 7.038680962582064,
        } as IShareState['location']);
      },
    );
  });

  return (
    <NavigationContainer>
      <ImageBackground
        source={require('./app/assets/animate3d.gif')}
        style={styles.background}>
        {playing && (
          <SharedStateProvider
            initialValue={{
              ...initialSharedState,
              location,
            }}>
            <WelcomeScreen
              setText={setText}
              setPlaying={setPlaying}
              setDialog={setDialog}
            />
          </SharedStateProvider>
        )}
        {!playing && (
          <View>
            <TypeWriter style={styles.typing} typing={1} maxDelay={10}>
              {dialog[text]}
            </TypeWriter>
            <Button
              title={text < dialog.length - 1 ? 'Continue ' : 'Start Play '}
              style={styles.btn}
              onPress={next}
              raised
              type="solid"
              iconRight
              icon={<Icon name="arrow-right" size={15} color="white" />}
            />
          </View>
        )}
      </ImageBackground>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  typing: {
    padding: 10,
    fontSize: 25,
    width: '100%',
    color: 'white',
    height: 'auto',
    backgroundColor: '#232b2b',
  },
  btn: {
    position: 'absolute',
    // margin: 16,
    // right: 10,
    top: 400,
    bottom: 10,
    alignSelf: 'flex-end',
  },
});
