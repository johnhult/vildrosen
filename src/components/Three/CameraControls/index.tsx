import { PerspectiveCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as React from 'react';
import { Vector3 } from 'three';

const CameraControls = () => {
  const overOrigin = new Vector3(0, 30, 0);
  const viewport = useThree((state) => state.viewport);
  useThree((state) => {
    state.camera.lookAt(overOrigin);
  });

  return (
    <PerspectiveCamera
      aspect={viewport.width / viewport.height}
      makeDefault
      fov={75}
      near={10}
      far={800}
      position={[0, 40, 150]}
    />
  );
};

export default CameraControls;
