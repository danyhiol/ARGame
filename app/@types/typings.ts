export type TMaterial = 'frontMaterial' | 'green' | 'red' | undefined;
export interface IState {
  cameraReady: boolean;
  locationReady: boolean;
  nearbyPlaces: {
    id: string;
    title: string;
    lat: number;
    lng: number;
    icon: string;
  }[];
  tracking: boolean;
  compassHeading: number;
  material: {
    Jar: TMaterial;
    Skull: TMaterial;
    StatueEgypt: TMaterial;
    BrokenKrater: TMaterial;
    BrokenPsykter: TMaterial;
    HeliBell: TMaterial;
    NavalShipCruiser: TMaterial;
    RoyalScepter: TMaterial;
    MummyHand: TMaterial;
  };
  listener?: number;
}

export interface IWelcomeScreenProps {
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setText: React.Dispatch<React.SetStateAction<number>>;
  setDialog: React.Dispatch<React.SetStateAction<string[]>>;
}