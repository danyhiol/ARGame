import createStateContext from 'react-use/lib/factory/createStateContext';
import { GeolocationResponse } from '@react-native-community/geolocation';
import { arrRandomEl, questGenerator, questKeys } from '../utils';
import { quests } from '../api/quests';

export type QuestKeys = typeof questKeys[number];

export interface IShareState {
  location: GeolocationResponse['coords'];
  destinations: { latitude: number; longitude: number }[];
  difficulty: 'easy' | 'medium' | 'hard';
  quest: QuestKeys;
  questGroup: QuestKeys[];
  hint: string;
  description: string;
}

const questGroup = questGenerator('easy');
const generateInitQuest = arrRandomEl(questGroup);
const _quest = quests.find(({ key }) => key === generateInitQuest)!;
const hint = _quest.easy.hint;
const quest = _quest.key;
const description = _quest.easy.description;

export const destinations: IShareState['destinations'] = [
  {
    // Rathaus
    latitude: 49.23645,
    longitude: 6.99617,
  },
  {
    // CineStart
    latitude: 49.23919,
    longitude: 6.98121,
  },
  // Saarland
  {
    latitude: 49.25322,
    longitude: 7.03901,
  },
  {
    // johanneskirche
    latitude: 49.23690991932931,
    longitude: 6.9969868648614195,
  },
];
export const initialSharedState: IShareState = {
  location: undefined as unknown as GeolocationResponse['coords'],
  destinations,
  difficulty: 'easy',
  quest,
  questGroup,
  hint,
  description,
};

export const [useSharedState, SharedStateProvider] =
  createStateContext<IShareState>(initialSharedState);
