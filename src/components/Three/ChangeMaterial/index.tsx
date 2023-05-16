import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { validateSkinnedMesh } from 'lib/Three';
import * as React from 'react';

const ChangeMaterial: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { scene } = useThree();
  const group = React.useRef<THREE.Group>(null);
  React.useLayoutEffect(() => {
    if (group.current) {
      group.current.traverse((child) => {
        if (validateSkinnedMesh(child)) {
          const prevMaterial = Array.isArray(child.material)
            ? (child.material[0] as THREE.MeshBasicMaterial)
            : (child.material as THREE.MeshBasicMaterial);

          child.castShadow = true;
          child.receiveShadow = true;
          child.material = new THREE.MeshStandardMaterial();

          THREE.MeshBasicMaterial.prototype.copy.call(
            child.material,
            prevMaterial
          );
        }
      });
    }
  }, [scene, group]);
  return <group ref={group}>{children}</group>;
};

export default ChangeMaterial;
