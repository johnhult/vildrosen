import * as React from 'react';
import {
  Center,
  OrbitControls,
  SoftShadows,
  Sphere,
  Stats,
  useHelper,
} from '@react-three/drei';
import * as THREE from 'three';
import { Boy } from 'components/Three/Mesh/Boy';
import CameraControls from '../CameraControls';
import ChangeMaterial from '../ChangeMaterial';
import RotateWithMouse from '../RotateWithMouse';
import { Airplane } from '../Mesh/Airplane';
import FlyingAirplane from '../FlyingAirplane';
import Ground from '../Ground';
import { useControls } from 'leva';
import { EffectComposer } from '@react-three/postprocessing';
import FrameEffect from 'components/Three/Effects/FrameEffect';

const softShadowConfig = {
  size: 30,
  focus: 0,
  samples: 5,
};

const CanvasContent: React.FC = () => {
  const { debug, performance, rotateWorld, orbitCamera } = useControls({
    debug: false,
    performance: false,
    rotateWorld: true,
    orbitCamera: false,
  });
  const frameEffect = new FrameEffect();
  const cameraRef = React.useRef<THREE.OrthographicCamera>(null!);
  // @ts-ignore-next-line
  useHelper(debug && cameraRef, THREE.CameraHelper);

  return (
    <>
      <EffectComposer>
        <primitive object={frameEffect} />
      </EffectComposer>
      <SoftShadows {...softShadowConfig} />
      <fog attach='fog' args={['cadetblue', 100, 500]} />
      <ambientLight intensity={0.4} />
      <directionalLight
        castShadow
        position={[20, 300, 300]}
        color='navajowhite'
        intensity={2}
        shadow-bias={-0.01}
        shadow-mapSize={[2048, 2048]}
      >
        {debug && (
          <Sphere scale={1}>
            <meshBasicMaterial color='red'></meshBasicMaterial>
          </Sphere>
        )}
        <orthographicCamera
          ref={cameraRef}
          attach='shadow-camera'
          args={[-300, 300, -300, 300, 100, 600]}
        />
      </directionalLight>
      <CameraControls />
      {orbitCamera && <OrbitControls zoomSpeed={0.4} />}
      {performance && <Stats />}
      <Center top>
        <RotateWithMouse rotateZ>
          <ChangeMaterial>
            <Boy />
          </ChangeMaterial>
        </RotateWithMouse>
      </Center>
      <FlyingAirplane startHeight={50}>
        <Center top>
          <Airplane />
        </Center>
      </FlyingAirplane>
      <RotateWithMouse>
        <Ground repeat={25} rotateWorld={rotateWorld} />
      </RotateWithMouse>
    </>
  );
};

export default CanvasContent;
