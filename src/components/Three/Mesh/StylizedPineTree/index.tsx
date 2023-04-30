/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 ./scene.gltf -t -T -s
Author: Batuhan13 (https://sketchfab.com/Batuhan13)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/stylized-pine-tree-tree-deadcadc915545a7b4701dbe6eb419e8
Title: Stylized Pine Tree Tree
*/

import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    tree_low001_StylizedTree_0: THREE.Mesh;
  };
  materials: {
    StylizedTree: THREE.MeshStandardMaterial;
  };
};

type StylizedPineTreeProps = {
  count: number;
  // randomPos: [number, number, number];
};

const WithRef = React.forwardRef<
  THREE.InstancedMesh,
  JSX.IntrinsicElements['group'] & StylizedPineTreeProps
>(function StylizedPineTree({ count, ...props }, ref) {
  const { nodes, materials } = useGLTF(
    '/assets/mesh/stylized_pine_tree.glb'
  ) as GLTFResult;
  return (
    <instancedMesh
      args={[undefined, undefined, count]}
      ref={ref}
      // castShadow
      receiveShadow
      geometry={nodes.tree_low001_StylizedTree_0.geometry}
      material={materials.StylizedTree}
    />
  );
});

useGLTF.preload('/assets/mesh/stylized_pine_tree.glb');

export default WithRef;
