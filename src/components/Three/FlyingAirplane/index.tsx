import { useFrame } from '@react-three/fiber';
import * as React from 'react';
import * as THREE from 'three';

type FlyingAirplaneProps = {
  startHeight: number;
};

const FlyingAirplane: React.FC<
  React.PropsWithChildren<FlyingAirplaneProps>
> = ({ startHeight, children }) => {
  const ref = React.useRef<THREE.Group>(null);
  const radius = 50;
  const height = React.useRef<number>(startHeight);
  const prev3DVec = new THREE.Vector3(0, 0, 0);
  const deltaXYZ = new THREE.Vector3(0, 0, 0);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x =
        (-radius / 2) * Math.cos(state.clock.elapsedTime / 2);
      ref.current.position.z = radius * Math.sin(state.clock.elapsedTime / 2);
      ref.current.position.y =
        height.current + 10 * Math.sin(state.clock.elapsedTime);
      deltaXYZ.set(
        ref.current.position.x - prev3DVec.x,
        ref.current.position.y - prev3DVec.y,
        ref.current.position.z - prev3DVec.z
      );
      deltaXYZ.normalize();
      prev3DVec.set(
        ref.current.position.x,
        ref.current.position.y,
        ref.current.position.z
      );
      deltaXYZ.add(ref.current.position);
      ref.current.lookAt(deltaXYZ);
    }
  });

  return (
    <>
      <group ref={ref} position={[-radius, height.current, 0]}>
        {children}
      </group>
    </>
  );
};

export default FlyingAirplane;
