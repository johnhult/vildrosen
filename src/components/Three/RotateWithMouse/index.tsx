import { useFrame } from '@react-three/fiber';
import * as React from 'react';
import { useTheme } from 'styled-components';
import * as THREE from 'three';
import { lerp } from 'three/src/math/MathUtils';

type RotateWithMouseProps = {
  rotateZ?: boolean;
};

const RotateWithMouse: React.FC<
  React.PropsWithChildren<RotateWithMouseProps>
> = ({ rotateZ, children }) => {
  const theme = useTheme();
  const ref = React.useRef<THREE.Group>(null);
  const isMobile = matchMedia(
    `(min-width: ${theme.breakpoints.tablet.asString})`
  ).matches
    ? false
    : true;
  useFrame((state) => {
    if (ref.current && !isMobile) {
      ref.current.rotation.y = lerp(
        ref.current.rotation.y,
        (state.mouse.x / 24) * Math.PI,
        0.1
      );
      if (rotateZ) {
        ref.current.rotation.z = lerp(
          ref.current.rotation.x,
          (state.mouse.x / 24) * Math.PI,
          0.1
        );
      }
    }
  });

  return <group ref={ref}>{children}</group>;
};

export default RotateWithMouse;
