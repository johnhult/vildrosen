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

const softShadowConfig = {
  size: 10,
  focus: 1,
  samples: 10,
};

const CanvasContent: React.FC = () => {
  const { debug, rotateWorld, useOrbit } = useControls({
    debug: false,
    rotateWorld: true,
    useOrbit: false,
  });
  const cameraRef = React.useRef<THREE.OrthographicCamera>(null);
  // @ts-ignore-next-line
  useHelper(debug && cameraRef, THREE.CameraHelper);

  return (
    <>
      <SoftShadows {...softShadowConfig} />
      <fog attach='fog' args={['cadetblue', 100, 500]} />
      <ambientLight intensity={0.4} />
      <directionalLight
        castShadow
        position={[20, 100, 100]}
        color='navajowhite'
        intensity={2}
      >
        {debug && (
          <Sphere scale={1}>
            <meshBasicMaterial color='red'></meshBasicMaterial>
          </Sphere>
        )}
        <orthographicCamera
          ref={cameraRef}
          attach='shadow-camera'
          args={[-200, 200, -200, 200, 1, 500]}
        />
      </directionalLight>
      {/* <Sky inclination={0.55} azimuth={0.5} rayleigh={1} /> */}
      <CameraControls />
      {useOrbit && <OrbitControls zoomSpeed={0.4} />}
      {/* <Center>
        <SetRandomColor>
          <Text3D font={'/assets/fonts/DynaPuff_Regular.json'} scale={10}>
            Vildrosen
          </Text3D>
        </SetRandomColor>
      </Center> */}
      {debug && <Stats />}
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
      {/* <Plane scale={10000} receiveShadow rotation-x={degToRad(-90)}>
        <shadowMaterial
          transparent
          opacity={0.4}
          color='#3a1d01'
        ></shadowMaterial>
      </Plane> */}
      {/* <StylizedPineTree /> */}
      <RotateWithMouse>
        <Ground repeat={20} rotateWorld={rotateWorld} />
      </RotateWithMouse>
      {/* <Center bottom>
        <Sphere
          receiveShadow
          args={[1, 32, 32]}
          scale={500}
          rotation={[0, 0, degToRad(90)]}
        >
          <meshStandardMaterial color='green' map={abstract} />
        </Sphere>
      </Center> */}
      {/* <RotateWithMouse>
        <Ground />
      </RotateWithMouse> */}
      {/* <Environment preset='sunset' /> */}
    </>
  );
};

export default CanvasContent;
