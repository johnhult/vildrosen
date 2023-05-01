import * as React from 'react';
import * as THREE from 'three';
import {
  Center,
  ComputedAttribute,
  Sampler,
  useGLTF,
  useTexture,
} from '@react-three/drei';
import { degToRad } from 'three/src/math/MathUtils';
import { useFrame } from '@react-three/fiber';
import StylizedPineTree from '../Mesh/StylizedPineTree';

type GroundProps = {
  repeat: number;
  rotateWorld: boolean;
};

const Ground: React.FC<GroundProps> = ({ repeat, rotateWorld }) => {
  const geomRef = React.useRef<THREE.Mesh>(null!);
  const instancesRef =
    React.useRef<
      THREE.InstancedMesh<
        THREE.BufferGeometry,
        THREE.Material | THREE.Material[]
      >
    >(null);
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

  // Saving for remembering
  // const gradientTexture = React.useMemo(
  //   () =>
  //     ThreeGradientTexture({
  //       stops: [0, 0.4, 0.5, 0.6, 1],
  //       colors: ['black', 'red', 'black', 'red', 'black'],
  //     }),
  //   []
  // );

  const computePath = React.useCallback(
    () =>
      (geo: THREE.BufferGeometry): THREE.BufferAttribute => {
        //@ts-ignore-next-line
        const { array, count } = geo.attributes.position;
        const arr = Float32Array.from({ length: count });
        const normalVector = new THREE.Vector3();
        const up = new THREE.Vector3(0, 1, 0);
        for (let i = 0; i < count; i++) {
          const n = array.slice(i * 3, i * 3 + 3);

          normalVector.set(n[0], n[1], n[2]);

          const dot = normalVector.dot(up);
          const value =
            (dot > 50 || dot < -50) && !(dot > 200 || dot < -200) ? 1 : 0;
          arr[i] = Number(value);
        }

        return new THREE.BufferAttribute(arr, 1);
      },
    []
  );

  useFrame((_, delta) => {
    if (geomRef.current && rotateWorld) {
      let r = geomRef.current;
      r.rotateY(delta / 12);
    }
  });

  return (
    <>
      <Center bottom>
        <mesh ref={geomRef} receiveShadow rotation={[0, 0, degToRad(90)]}>
          <sphereGeometry args={[500, 64, 64]}>
            <ComputedAttribute name='removePath' compute={computePath()} />
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
        count={200}
        transform={({ position, dummy: object, normal }, i) => {
          const randScale = THREE.MathUtils.randFloat(0.3, 0.6);
          object.scale.set(randScale, randScale, randScale);
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
