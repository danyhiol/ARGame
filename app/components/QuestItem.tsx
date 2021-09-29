import React, { useEffect, useState } from 'react';
import { Viro3DObject, ViroMaterials } from '@viro-community/react-viro';

import { useSharedState } from './hooks';
import { Quest } from '../api/quests';

interface IQuestItemProps {
  quest: Quest;
  position: number[];
}

export function QuestItem({ quest, position = [0, -2, 0] }: IQuestItemProps) {
  useEffect(() => {
    console.log('Quest :');
  }, []);
  const [sharedState] = useSharedState();
  const [material, setMaterial] = useState('frontMaterial');
  const handleObjectClick = () => {
    if (sharedState.quest === quest.key) {
      console.log('Item Founded');
      setMaterial('green');
    } else {
      console.log('Wrong Item');
      setMaterial('red');
    }
  };
  return (
    <Viro3DObject
      source={require(quest.object.source)}
      position={position}
      resources={quest.object.resources.map((resource) => require(resource))}
      highAccuracyEvents={true}
      scale={[1.0, 1.0, 1.0]}
      // rotation={[45, 0, 0]}
      materials={material}
      type="OBJ"
      transformBehaviors={['billboard']}
      onClick={handleObjectClick}
    />
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
});
