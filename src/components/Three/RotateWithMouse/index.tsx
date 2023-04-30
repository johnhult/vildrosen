import { useFrame } from '@react-three/fiber';
import * as React from 'react';
import * as THREE from 'three';

type RotateWithMouseProps = {
  rotateZ?: boolean;
};

const RotateWithMouse: React.FC<
  React.PropsWithChildren<RotateWithMouseProps>
> = ({ rotateZ, children }) => {
  const ref = React.useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = (state.mouse.x / 4) * Math.PI;
      if (rotateZ) {
        ref.current.rotation.z = (state.mouse.x / 12) * Math.PI;
      }
    }
  });

  return <group ref={ref}>{children}</group>;
};

export default RotateWithMouse;
