import * as React from 'react';
import * as THREE from 'three';
import {
  Center,
  ComputedAttribute,
  GradientTexture,
  Instance,
  Instances,
  Plane,
  Sampler,
  Sphere,
  useGLTF,
  useTexture,
} from '@react-three/drei';
import { degToRad } from 'three/src/math/MathUtils';
import { extend, useFrame } from '@react-three/fiber';
import { rgba } from 'polished';
import StylizedPineTree from '../Mesh/StylizedPineTree';
import { GLTF } from 'three-stdlib';
import { ThreeGradientTexture } from '../GradientTexture';

type GroundProps = {
  repeat: number;
  rotateWorld: boolean;
};

const Ground: React.FC<GroundProps> = ({ repeat, rotateWorld }) => {
  const geomRef = React.useRef<THREE.Mesh>(null!);
  const instancesRef = React.useRef<
    THREE.InstancedMesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>
  >(null!);
  const tex = useTexture(
    {
      map: '/assets/textures/Stylized_Grass_BaseColor.png',
      roughnessMap: '/assets/textures/Stylized_Grass_Roughness.png',
      normalMap: '/assets/textures/Stylized_Grass_Normal.png',
    },
    (textures) => {
      if (Array.isArray(textures)) {
        textures.forEach((texture, i) => {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
          texture.repeat.set(repeat, repeat);
        });
      }
    }
  );
  const gradientTexture = ThreeGradientTexture({
    stops: [0, 0.5, 1],
    colors: ['white', 'red', 'white'],
  });

  const computePath = (geo: THREE.BufferGeometry): THREE.BufferAttribute => {
    const uv = geo.attributes.uv;
    const arr = Float32Array.from({ length: uv.count });
    console.log(uv);
    return new THREE.BufferAttribute(arr, 1);
  };

  useFrame((_, delta) => {
    if (geomRef.current && rotateWorld) {
      let r = geomRef.current;
      r.rotateY(delta / 12);
    }
  });

  return (
    <>
      <mesh receiveShadow position={[0, 30, 0]} rotation={[0, 0, degToRad(90)]}>
        <sphereGeometry args={[20, 64, 64]}>
          <ComputedAttribute name='removePath' compute={computePath} />
        </sphereGeometry>
        <meshBasicMaterial map={gradientTexture}></meshBasicMaterial>
      </mesh>
      <Center bottom>
        <mesh ref={geomRef} receiveShadow rotation={[0, 0, degToRad(90)]}>
          <sphereGeometry args={[500, 64, 64]}>
            <ComputedAttribute name='removePath' compute={computePath} />
          </sphereGeometry>
          <meshStandardMaterial {...tex} />
          <StylizedPineTree ref={instancesRef} count={500} />
        </mesh>
      </Center>
      <Sampler
        key={'sampler-of-mundo'}
        mesh={geomRef}
        weight='removePath'
        instances={instancesRef}
        count={500}
        transform={({ position, dummy: object, normal }, i) => {
          object.scale.set(0.5, 0.5, 0.5);
          object.position.copy(position);
          object.lookAt(normal.add(position));
          object.rotateX(degToRad(90));
          object.translateY(-5);
          object.updateMatrix();
          return object;
        }}
      />
    </>
  );
};

useGLTF.preload('/assets/mesh/stylized_pine_tree.glb');

export default Ground;
