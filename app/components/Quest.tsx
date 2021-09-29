import React from 'react';
import { StyleSheet } from 'react-native';
import {
  ViroAmbientLight,
  ViroNode,
  ViroText,
} from '@viro-community/react-viro';

import { useSharedState } from './hooks';
// import { QuestItem } from '../components/QuestItem';
import { quests } from '../api/quests';

interface IQuestProps {
  distance: number;
  scale: number;
  position: number[];
}

export default function Quest(props: IQuestProps) {
  const [sharedState] = useSharedState();
  const GameQuests = quests.filter((quest) =>
    sharedState.questGroup.includes(quest.key),
  );

  return (
    <ViroNode
      key={`id_${props.distance}`}
      scale={[props.scale, props.scale, props.scale]}
      rotation={[0, 0, 0]}
      position={props.position}>
      <ViroText
        width={4}
        height={0.5}
        scale={[3, 3, 3]}
        text={`${Number(props.distance).toFixed(0)} m`}
        style={styles.helloWorldTextStyle}
        position={[0, -0.75, 0]}
      />

      {/* <ViroAmbientLight color="#ffffff" /> */}

      {/* {GameQuests.map((quest, index) => (
        <QuestItem
          quest={quest}
          position={
            index == 0 ? [0, -2, 0] : index === 1 ? [1, 0, 0] : [-0.5, 0, 3]
          }
        />
      ))} */}
    </ViroNode>
  );
}

const styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 50,
    fontWeight: '700',
    color: 'white',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
