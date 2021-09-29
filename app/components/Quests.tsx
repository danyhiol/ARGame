import React from 'react';
import { Viro3DObject } from '@viro-community/react-viro';

import { QuestKeys } from '../components/hooks';
import { IState } from '../@types/typings';

export interface QuestLevel {
  description: string;
  hint: string;
  level?: number;
}

export interface Quest {
  key: QuestKeys;
  title: string;
  object: {
    source: string;
    resources: string[];
  };
  component: React.ReactElement<Viro3DObject>;
  easy: QuestLevel;
  medium: QuestLevel;
  hard: QuestLevel;
}

interface IQuestProps {
  handleObjectClick: (object: QuestKeys) => void;
  material: IState['material'];
}

export const Quests = ({
  handleObjectClick,
  material,
}: IQuestProps): Quest[] => {
  return [
    {
      key: 'BrokenKrater',
      title: 'Find the broken Krater',
      object: {
        source: '../assets/objects/BrokenKrater/Broken_Krater.obj',
        resources: [
          '../assets/objects/BrokenKrater/Blank image.jpg',
          '../assets/objects/BrokenKrater/Blank.mtl',
        ],
      },
      component: (
        <Viro3DObject
          // position={[-4, 0, 0]}
          source={require('../assets/objects/BrokenKrater/Broken_Krater.obj')}
          resources={[
            require('../assets/objects/BrokenKrater/Blank image.jpg'),
            require('../assets/objects/BrokenKrater/Blank.mtl'),
          ]}
          highAccuracyEvents={true}
          scale={[0.1, 0.1, 0.1]}
          rotation={[90, 0, 0]}
          materials={material.Jar}
          type="OBJ"
          // transformBehaviors={['billboard']}
          onClick={() => handleObjectClick('BrokenKrater')}
        />
      ),
      easy: {
        description:
          'A rare ancient krater, a special vessel for mixing wine and water, from the 2nd century AD, The krater has been brought to the museum broken into pieces, and is to be restored',
        hint: 'Its Director Kostadin Kostadinov has announced About 70% of the krater have been preserved',
      },
      medium: {
        description: 'Groups of bars on rim, dots below on lip.',
        hint: 'Clay: orange-buff clay, brown and white',
      },
      hard: {
        description: 'Donated to history Mueseum of saarland',
        hint: 'In 1820',
      },
    },

    {
      key: 'BrokenPsykter',
      title: 'Find the broken Psykter',
      object: {
        source: '../assets/objects/BrokenPsykter/21493_Broken_Psykter_v1.obj',
        resources: [
          '../assets/objects/BrokenPsykter/Blank image.jpg',
          '../assets/objects/BrokenPsykter/Blank.mtl',
        ],
      },
      component: (
        <Viro3DObject
          // position={[-4, 0, 0]}
          source={require('../assets/objects/BrokenPsykter/21493_Broken_Psykter_v1.obj')}
          resources={[
            require('../assets/objects/BrokenPsykter/Blank image.jpg'),
            require('../assets/objects/BrokenPsykter/Blank.mtl'),
          ]}
          highAccuracyEvents={true}
          scale={[0.1, 0.1, 0.1]}
          rotation={[90, 0, 0]}
          materials={material.BrokenPsykter}
          type="OBJ"
          // transformBehaviors={['billboard']}
          onClick={() => handleObjectClick('BrokenPsykter')}
        />
      ),
      easy: {
        description:
          'The broken vase ancient vase having a length of 21 cm with round narrow neck with broad bottom base having red soil color mixing with gery clay.',
        hint: 'Its is named as ancient Paris vase in 1920 by director of meusem.',
      },
      medium: {
        description: 'Having a story written on it in the form of pictures',
        hint: 'Women having a child',
      },
      hard: {
        description: 'Denoted to the country and preserved in glass',
        hint: 'Denoted in 1982',
      },
    },

    {
      key: 'MummyHand',
      title: 'Find Mummy Hand',
      object: {
        source: '../assets/objects/MummyHand/15800_Mummy_Hand_v1_NEW.obj',
        resources: [
          '../assets/objects/MummyHand/Blank image.jpg',
          '../assets/objects/MummyHand/Blank.mtl',
        ],
      },
      component: (
        <Viro3DObject
          // position={[-4, 0, 0]}
          source={require('../assets/objects/MummyHand/15800_Mummy_Hand_v1_NEW.obj')}
          resources={[
            require('../assets/objects/MummyHand/Blank image.jpg'),
            require('../assets/objects/MummyHand/Blank.mtl'),
          ]}
          highAccuracyEvents={true}
          scale={[0.1, 0.1, 0.1]}
          rotation={[90, 0, 0]}
          materials={material.MummyHand}
          type="OBJ"
          // transformBehaviors={['billboard']}
          onClick={() => handleObjectClick('MummyHand')}
        />
      ),
      easy: {
        description:
          'Is a dead human or an animal whose soft tissues and organs have been preserved by either intentional or accidental exposure to chemicals, extreme cold, very low humidity, or lack of air, so that the recovered body does not decay further',
        hint: 'Involved embalming the body and then wrapping it in thin strips of linen',
      },
      medium: {
        description:
          'The Ancient Egyptians believed that each individual possessed a ka, a life force, that departed the body after death.In order to ensure that the body was preserved the Ancient Egyptians began to use a process called mummification',
        hint: 'use of the word to cover accidentally desiccated bodies goes back to at least 1615 AD',
      },
      hard: {
        description:
          'The body and the internal organs were packed with natron salt for forty days to remove all moisture.',
        hint: 'A 550-year-old',
      },
    },

    {
      key: 'Jar',
      title: 'Find the Jar',
      object: {
        source: '../assets/objects/Jar/Jar.obj',
        resources: [
          '../assets/objects/Jar/Ancient_jar_diffuse.jpg',
          '../assets/objects/Jar/Jar.mtl',
        ],
      },
      component: (
        <Viro3DObject
          // position={[-4, 0, 0]}
          source={require('../assets/objects/Jar/Jar.obj')}
          resources={[
            require('../assets/objects/Jar/Ancient_jar_diffuse.jpg'),
            require('../assets/objects/Jar/Jar.mtl'),
          ]}
          highAccuracyEvents={true}
          scale={[0.1, 0.1, 0.1]}
          rotation={[90, 0, 0]}
          materials={material.Jar}
          type="OBJ"
          // transformBehaviors={['billboard']}
          onClick={() => handleObjectClick('Jar')}
        />
      ),
      easy: {
        description:
          'Historical igid, cylindrical or slightly conical container, typically made of glass, ceramic, or plastic, with a wide mouth or opening that can be closed with a lid, screw cap',
        hint: 'Earthen pot or vessel',
      },
      medium: {
        description:
          "can be used to hold solids too large to be removed from, or liquids too viscous to be poured through, a bottle's neck these may be foods, cosmetics, medications, or chemicals",
        hint: 'late 17th century, porcelain with overglaze enamels, height: 31.1 cm, diameter: 19.1 cm.',
      },
      hard: {
        description:
          'Tall and narrow cylinder, commonly used for pickled foods like olives.',
        hint: '1869-1880, germany',
      },
    },

    {
      key: 'Skull',
      title: 'Find the Skull',
      object: {
        source: '../assets/objects/Skull/12140_Skull_v3_L2.obj',
        resources: [
          '../assets/objects/Skull/Skull.jpg',
          '../assets/objects/Skull/12140_Skull_v3_L2.mtl',
        ],
      },
      component: (
        <Viro3DObject
          // position={[-4, 0, 0]}
          source={require('../assets/objects/Skull/12140_Skull_v3_L2.obj')}
          resources={[
            require('../assets/objects/Skull/Skull.jpg'),
            require('../assets/objects/Skull/12140_Skull_v3_L2.mtl'),
          ]}
          highAccuracyEvents={true}
          scale={[0.1, 0.1, 0.1]}
          rotation={[90, 0, 0]}
          materials={material.Skull}
          type="OBJ"
          // transformBehaviors={['billboard']}
          onClick={() => handleObjectClick('Skull')}
        />
      ),
      easy: {
        description:
          'Is a bone structure that forms the head in vertebrates. It supports the structures of the face and provides a protective cavity for the brain.',
        hint: 'Sensory structures are part of the facial skeleton',
      },
      medium: {
        description:
          'Include protection of the brain, fixing the distance between the eyes to allow stereoscopic vision, and fixing the position of the ears to enable sound localisation of the direction and distance of sounds.',
        hint: 'CT scan of a human.',
      },
      hard: {
        description:
          'Made up of a number of fused flat bones, and contains many foramina, fossae, processes, and several cavities or sinuses.',
        hint: 'Anatomy of Bone',
      },
    },

    {
      key: 'StatueEgypt',
      title: 'Find the Statue of Egypt',
      object: {
        source: '../assets/objects/StatueEgypt/12343_statue_v1_l3.obj',
        resources: [
          '../assets/objects/StatueEgypt/12343_Statue_Diffuse.jpg',
          '../assets/objects/StatueEgypt/12343_statue_v1_l3.mtl',
        ],
      },
      component: (
        <Viro3DObject
          // position={[-4, 0, 0]}
          source={require('../assets/objects/StatueEgypt/12343_statue_v1_l3.obj')}
          resources={[
            require('../assets/objects/StatueEgypt/12343_Statue_Diffuse.jpg'),
            require('../assets/objects/StatueEgypt/12343_statue_v1_l3.mtl'),
          ]}
          highAccuracyEvents={true}
          scale={[0.1, 0.1, 0.1]}
          rotation={[90, 0, 0]}
          materials={material.StatueEgypt}
          type="OBJ"
          // transformBehaviors={['billboard']}
          onClick={() => handleObjectClick('StatueEgypt')}
        />
      ),
      easy: {
        description:
          'the last king of the Fourth Dynasty documented to date. It is located in South Saqqara halfway between the Pyramid of Djoser at Saqqara and the pyramids of Sneferu, the founder of the Fourth Dynasty, at Dahshur.',
        hint: 'Ozymandias in Greek sources',
      },
      medium: {
        description:
          "Early in his life, Ramesses II embarked on numerous campaigns to restore possession of previously held territories lost to the Nubians and Hittites and to secure Egypt's borders. He was also responsible for suppressing some Nubian revolts and carrying out a campaign in Libya.",
        hint: 'Bust of one of the four external seated statues of Ramesses II at Abu Simbel.',
      },
      hard: {
        description:
          'Estimates of his age at death vary; 90 or 91 is considered most likely.',
        hint: 'Eygptian Statue',
      },
    },

    {
      key: 'HeliBell',
      title: 'Find the Statue of Egypt',
      object: {
        source: '../assets/objects/HeliBell/Material/Heli_bell.obj',
        resources: [
          '../assets/objects/HeliBell/Material/Heli_bell.blend',
          '../assets/objects/HeliBell/Material/Heli_bell.blend1',
          '../assets/objects/HeliBell/Material/Heli_bell.mtl',
        ],
      },
      component: (
        <Viro3DObject
          // position={[-4, 0, 0]}
          source={require('../assets/objects/HeliBell/Material/Heli_bell.obj')}
          resources={[
            require('../assets/objects/HeliBell/Material/Heli_bell.blend'),
            require('../assets/objects/HeliBell/Material/Heli_bell.blend1'),
            require('../assets/objects/HeliBell/Material/Heli_bell.mtl'),
          ]}
          highAccuracyEvents={true}
          scale={[0.1, 0.1, 0.1]}
          rotation={[90, 0, 0]}
          materials={material.HeliBell}
          type="OBJ"
          // transformBehaviors={['billboard']}
          onClick={() => handleObjectClick('HeliBell')}
        />
      ),
      easy: {
        description:
          'This allows it to take off and land vertically, to hover, and to fly forward, backward and laterally. These attributes allow it to be used in congested or isolated areas where fixed-wing aircraft cannot perform',
        hint: 'Rotor system, engine, Fan and Turbine',
      },
      medium: {
        description:
          'A rotor system may be mounted horizontally, as main rotors are, providing lift vertically, or it may be mounted vertically, such as a tail rotor, to provide horizontal thrust to counteract torque from the main rotors.',
        hint: 'turbine',
      },
      hard: {
        description: 'dropping water onto a fire',
        hint: 'Skycrane',
      },
    },

    {
      key: 'NavalShipCruiser',
      title: 'Find the Naval Ship Cruiser',
      object: {
        source:
          '../assets/objects/NavalShipCruiser/16022_Naval_Ship_Cruiser_USA_new.obj',
        resources: [
          '../assets/objects/NavalShipCruiser/Blank image.jpg',
          '../assets/objects/NavalShipCruiser/Blank.mtl',
        ],
      },
      component: (
        <Viro3DObject
          // position={[-4, 0, 0]}
          source={require('../assets/objects/NavalShipCruiser/16022_Naval_Ship_Cruiser_USA_new.obj')}
          resources={[
            require('../assets/objects/NavalShipCruiser/Blank image.jpg'),
            require('../assets/objects/NavalShipCruiser/Blank.mtl '),
          ]}
          highAccuracyEvents={true}
          scale={[0.1, 0.1, 0.1]}
          rotation={[90, 0, 0]}
          materials={material.NavalShipCruiser}
          type="OBJ"
          // transformBehaviors={['billboard']}
          onClick={() => handleObjectClick('NavalShipCruiser')}
        />
      ),
      easy: {
        description:
          'Usually they belong to the armed forces of a state. As well as being armed, warships are designed to withstand damage and are usually faster and more maneuverable than merchant ships',
        hint: 'typically carries only weapons, ammunition and supplies for its crew',
      },
      medium: {
        description:
          'A number of large vessels are usually referred to as boats. Submarines are a prime example.[11] Other types of large vessel which are traditionally called boats are Great Lakes freighters, riverboats, and ferryboats.',
        hint: 'vessels are designed for operation on inland or protected coastal waters.',
      },
      hard: {
        description:
          'supported exploration, trade, warfare, migration, colonization, and science.',
        hint: 'Marine',
      },
    },
    {
      key: 'RoyalScepter',
      title: 'Find the Royal Scepter',
      object: {
        source: '../assets/objects/RoyalScepter/13454_Royal_Scepter_v1_L3.obj',
        resources: [
          '../assets/objects/RoyalScepter/13454_Royal_Scepter_bump.jpg',
          '../assets/objects/RoyalScepter/13454_Royal_Scepter_diffuse.jpg',
          '../assets/objects/RoyalScepter/13454_Royal_Scepter_specular.jpg',
          '../assets/objects/RoyalScepter/13454_Royal_Scepter_v1_L3.mtl',
        ],
      },
      component: (
        <Viro3DObject
          // position={[-4, 0, 0]}
          source={require('../assets/objects/RoyalScepter/13454_Royal_Scepter_v1_L3.obj')}
          resources={[
            require('../assets/objects/RoyalScepter/13454_Royal_Scepter_bump.jpg'),
            require('../assets/objects/RoyalScepter/13454_Royal_Scepter_diffuse.jpg'),
            require('../assets/objects/RoyalScepter/13454_Royal_Scepter_specular.jpg'),
            require('../assets/objects/RoyalScepter/13454_Royal_Scepter_v1_L3.mtl'),
          ]}
          highAccuracyEvents={true}
          scale={[0.1, 0.1, 0.1]}
          rotation={[90, 0, 0]}
          materials={material.RoyalScepter}
          type="OBJ"
          // transformBehaviors={['billboard']}
          onClick={() => handleObjectClick('RoyalScepter')}
        />
      ),
      easy: {
        description:
          'throwing club is a wooden rod with either a pointed tip or a spearhead attached to one end, intended for use as a weapon. A throwing stick can be either straight or roughly boomerang-shaped',
        hint: 'throwing sticks',
      },
      medium: {
        description:
          'shaped like returning boomerangs are designed to fly straight to a target at long ranges, their surfaces acting as airfoils.',
        hint: 'Hunting birds with throwing sticks in ancient Egypt.',
      },
      hard: {
        description:
          'The ancient Egyptians used throwing sticks to hunt small game and waterfowl, as seen in several wall paintings.',
        hint: 'Survival tool',
      },
    },
  ];
};
