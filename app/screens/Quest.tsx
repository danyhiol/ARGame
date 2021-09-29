import React from 'react';
import { ViroARSceneNavigator } from '@viro-community/react-viro';
import { ScrollView, View } from 'react-native';
import { Button } from 'react-native-elements';

import { QuestItem } from '../components/QuestItem';
import { IAppProps } from '../utils';
import { quests } from '../api/quests';
import GameSettings from '../components/GameSettings';

interface IQuestProps extends IAppProps {}

export default function Quest({}: IQuestProps) {
  const handleGameStart = () => {
    console.log('Game start');
  };
  return (
    <ScrollView
      style={{ flex: 1 }}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <GameSettings />

      <Button
        title="Start Game"
        onPress={handleGameStart}
        raised
        type="solid"
      />

      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: QuestItem,
        }}
        style={{ flex: 1 }}
      />
    </ScrollView>
  );
}
