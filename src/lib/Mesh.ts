import * as THREE from 'three';

export const validateMesh = (obj: unknown): obj is THREE.Mesh => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'isObject3D' in obj &&
    typeof obj.isObject3D === 'boolean' &&
    obj.isObject3D &&
    'isMesh' in obj &&
    typeof obj.isMesh === 'boolean' &&
    obj.isMesh
  );
};

export const parseMesh = (obj: THREE.Object3D) => {
  if (validateMesh(obj)) {
    return obj;
  } else {
    throw new Error('obj is not MESH');
  }
};

export const validateSkinnedMesh = (obj: unknown): obj is THREE.SkinnedMesh => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'isObject3D' in obj &&
    typeof obj.isObject3D === 'boolean' &&
    obj.isObject3D &&
    'isMesh' in obj &&
    typeof obj.isMesh === 'boolean' &&
    obj.isMesh &&
    'isSkinnedMesh' in obj &&
    typeof obj.isMesh === 'boolean' &&
    obj.isMesh
  );
};

export const parseSkinnedMesh = (obj: THREE.Object3D) => {
  if (validateSkinnedMesh(obj)) {
    return obj;
  } else {
    throw new Error('obj is not SKINNED MESH');
  }
};

export const validateMaterial = (m: unknown): m is THREE.Material => {
  return !!m && typeof m === 'object' && 'isMaterial' in m;
};

export const validateBasicMaterial = (
  m: unknown
): m is THREE.MeshBasicMaterial => {
  return validateMaterial(m) && m.type === 'MeshBasicMaterial';
};
