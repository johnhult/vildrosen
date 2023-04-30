import { PerspectiveCamera } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as React from 'react';
import { Vector3 } from 'three';
import { degToRad } from 'three/src/math/MathUtils';

const CameraControls = () => {
  const overOrigin = new Vector3(0, 30, 0);
  useThree((state) => {
    state.camera.lookAt(overOrigin);
  });

  return <PerspectiveCamera makeDefault fov={50} position={[0, 40, 150]} />;
};

export default CameraControls;
