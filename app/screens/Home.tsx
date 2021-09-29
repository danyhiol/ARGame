import React from 'react';
import {
  ViroARScene,
  ViroLightingEnvironment,
  ViroARImageMarker,
  ViroNode,
  ViroSphere,
  Viro3DObject,
  ViroSpotLight,
  ViroQuad,
  ViroAnimations,
  ViroARTrackingTargets,
  ViroMaterials,
} from '@viro-community/react-viro';
// import { StyleSheet } from 'react-native';

interface IState {
  texture: string;
  playAnim: boolean;
  animateCar: boolean;
  tapWhite: boolean;
  tapBlue: boolean;
  tapGrey: boolean;
  tapRed: boolean;
  tapYellow: boolean;
  animName: 'scaleUp' | 'scaleDown' | 'scaleUp';
  pauseUpdates: boolean;
}

ViroMaterials.createMaterials({
  white: {
    lightingModel: 'PBR',
    diffuseTexture: require('../assets/objects/car/object_car_main_Base_Color.png'),
    metalnessTexture: require('../assets/objects/car/object_car_main_Metallic.png'),
    roughnessTexture: require('../assets/objects/car/object_car_main_Roughness.png'),
  },
  blue: {
    lightingModel: 'PBR',
    diffuseTexture: require('../assets/objects/car/object_car_main_Base_Color_blue.png'),
    metalnessTexture: require('../assets/objects/car/object_car_main_Metallic.png'),
    roughnessTexture: require('../assets/objects/car/object_car_main_Roughness.png'),
  },
  grey: {
    lightingModel: 'PBR',
    diffuseTexture: require('../assets/objects/car/object_car_main_Base_Color_grey.png'),
    metalnessTexture: require('../assets/objects/car/object_car_main_Metallic.png'),
    roughnessTexture: require('../assets/objects/car/object_car_main_Roughness.png'),
  },
  red: {
    lightingModel: 'PBR',
    diffuseTexture: require('../assets/objects/car/object_car_main_Base_Color_red.png'),
    metalnessTexture: require('../assets/objects/car/object_car_main_Metallic.png'),
    roughnessTexture: require('../assets/objects/car/object_car_main_Roughness.png'),
  },
  yellow: {
    lightingModel: 'PBR',
    diffuseTexture: require('../assets/objects/car/object_car_main_Base_Color_yellow.png'),
    metalnessTexture: require('../assets/objects/car/object_car_main_Metallic.png'),
    roughnessTexture: require('../assets/objects/car/object_car_main_Roughness.png'),
  },
  white_sphere: {
    lightingModel: 'PBR',
    diffuseColor: 'rgb(231,231,231)',
  },
  blue_sphere: {
    lightingModel: 'PBR',
    diffuseColor: 'rgb(19,42,143)',
  },
  grey_sphere: {
    lightingModel: 'PBR',
    diffuseColor: 'rgb(75,76,79)',
  },
  red_sphere: {
    lightingModel: 'PBR',
    diffuseColor: 'rgb(168,0,0)',
  },
  yellow_sphere: {
    lightingModel: 'PBR',
    diffuseColor: 'rgb(200,142,31)',
  },
});

ViroARTrackingTargets.createTargets({
  logo: {
    source: require('../assets/objects/car/logo.png'),
    orientation: 'Up',
    physicalWidth: 0.165, // real world width in meters
  },
});

ViroAnimations.registerAnimations({
  scaleUp: {
    properties: { scaleX: 1, scaleY: 1, scaleZ: 1 },
    duration: 500,
    easing: 'bounce',
  },
  scaleDown: { properties: { scaleX: 0, scaleY: 0, scaleZ: 0 }, duration: 200 },
  scaleCar: {
    properties: { scaleX: 0.09, scaleY: 0.09, scaleZ: 0.09 },
    duration: 500,
    easing: 'bounce',
  },
  scaleSphereUp: {
    properties: { scaleX: 0.8, scaleY: 0.8, scaleZ: 0.8 },
    duration: 50,
    easing: 'easeineaseout',
  },
  scaleSphereDown: {
    properties: { scaleX: 1, scaleY: 1, scaleZ: 1 },
    duration: 50,
    easing: 'easeineaseout',
  },
  tapAnimation: [['scaleSphereUp', 'scaleSphereDown']],
});

export default function Home() {
  const [state, setState] = React.useReducer(
    (oldState: IState, newState: Partial<IState>) => ({
      ...oldState,
      ...newState,
    }),
    {
      texture: 'white',
      playAnim: false,
      animateCar: false,
      tapWhite: false,
      tapBlue: false,
      tapGrey: false,
      tapRed: false,
      tapYellow: false,
      pauseUpdates: false,
      animName: 'scaleUp',
    },
  );

  const _onAnchorFound = () => {
    setState({
      animateCar: true,
    });
  };
  const _toggleButtons = () => {
    setState({
      animName: state.animName === 'scaleUp' ? 'scaleDown' : 'scaleUp',
      playAnim: true,
    });
  };
  const _selectWhite = () => {
    setState({
      texture: 'white',
      tapWhite: true,
    });
  };
  const _selectBlue = () => {
    setState({
      texture: 'blue',
      tapBlue: true,
    });
  };
  const _selectGrey = () => {
    setState({
      texture: 'grey',
      tapGrey: true,
    });
  };
  const _selectRed = () => {
    setState({
      texture: 'red',
      tapRed: true,
    });
  };
  const _selectYellow = () => {
    setState({
      texture: 'yellow',
      tapYellow: true,
    });
  };
  const _animateFinished = () => {
    setState({
      tapWhite: false,
      tapBlue: false,
      tapGrey: false,
      tapRed: false,
      tapYellow: false,
    });
  };

  return (
    <ViroARScene>
      <ViroLightingEnvironment
        source={require('../assets/objects/car/garage_1k.hdr')}
      />

      <ViroARImageMarker
        target={'logo'}
        onAnchorFound={_onAnchorFound}
        pauseUpdates={state.pauseUpdates}>
        <ViroNode
          scale={[0, 0, 0]}
          transformBehaviors={['billboardY']}
          animation={{ name: state.animName, run: state.playAnim }}>
          <ViroSphere
            materials={['white_sphere']}
            heightSegmentCount={20}
            widthSegmentCount={20}
            radius={0.03}
            position={[-0.2, 0.25, 0]}
            onClick={_selectWhite}
            animation={{
              name: 'tapAnimation',
              run: state.tapWhite,
              onFinish: _animateFinished,
            }}
            shadowCastingBitMask={0}
          />

          <ViroSphere
            materials={['blue_sphere']}
            heightSegmentCount={20}
            widthSegmentCount={20}
            radius={0.03}
            position={[-0.1, 0.25, 0]}
            onClick={_selectBlue}
            animation={{
              name: 'tapAnimation',
              run: state.tapBlue,
              onFinish: _animateFinished,
            }}
            shadowCastingBitMask={0}
          />

          <ViroSphere
            materials={['grey_sphere']}
            heightSegmentCount={20}
            widthSegmentCount={20}
            radius={0.03}
            position={[0, 0.25, 0]}
            onClick={_selectGrey}
            animation={{
              name: 'tapAnimation',
              run: state.tapGrey,
              onFinish: _animateFinished,
            }}
            shadowCastingBitMask={0}
          />

          <ViroSphere
            materials={['red_sphere']}
            heightSegmentCount={20}
            widthSegmentCount={20}
            radius={0.03}
            position={[0.1, 0.25, 0]}
            onClick={_selectRed}
            animation={{
              name: 'tapAnimation',
              run: state.tapRed,
              onFinish: _animateFinished,
            }}
            shadowCastingBitMask={0}
          />

          <ViroSphere
            materials={['yellow_sphere']}
            heightSegmentCount={20}
            widthSegmentCount={20}
            radius={0.03}
            position={[0.2, 0.25, 0]}
            onClick={_selectYellow}
            animation={{
              name: 'tapAnimation',
              run: state.tapYellow,
              onFinish: _animateFinished,
            }}
            shadowCastingBitMask={0}
          />
        </ViroNode>

        <Viro3DObject
          scale={[0, 0, 0]}
          source={require('../assets/objects/car/object_car.obj')}
          resources={[require('../assets/objects/car/object_car.mtl')]}
          type="OBJ"
          materials={state.texture}
          onClick={_toggleButtons}
          animation={{ name: 'scaleCar', run: state.animateCar }}
        />

        <ViroSpotLight
          innerAngle={5}
          outerAngle={25}
          direction={[0, -1, 0]}
          position={[0, 5, 1]}
          color="#ffffff"
          castsShadow={true}
          shadowMapSize={2048}
          shadowNearZ={2}
          shadowFarZ={7}
          shadowOpacity={0.7}
        />

        <ViroQuad
          rotation={[-90, 0, 0]}
          position={[0, -0.001, 0]}
          width={2.5}
          height={2.5}
          arShadowReceiver={true}
        />
      </ViroARImageMarker>
    </ViroARScene>
  );
}

/* const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  wrapper: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  containerVertical: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  text: {
    color: '#fff',
    fontSize: 36,
  },
}); */
