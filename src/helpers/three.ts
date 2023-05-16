import * as THREE from 'three';
import { validatePerspectiveCamera } from 'lib/Three';

export const cover = (texture: THREE.Texture, aspect: number) => {
  let imageAspect = texture.image.width / texture.image.height;

  if (aspect < imageAspect) {
    texture.matrix.setUvTransform(0, 0, aspect / imageAspect, 1, 0, 0.5, 0.5);
  } else {
    texture.matrix.setUvTransform(0, 0, 1, imageAspect / aspect, 0, 0.5, 0.5);
  }
};

const bounceOut = (k: number) => {
  if (k < 1 / 2.75) {
    return 7.5625 * k * k;
  } else if (k < 2 / 2.75) {
    return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
  } else if (k < 2.5 / 2.75) {
    return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
  } else {
    return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
  }
};

export const easings = {
  bounceOut,
};

export const fovFromCamera = (camera: THREE.Camera) => {
  if (validatePerspectiveCamera(camera)) {
    const dist = camera.position.z;
    // convert vertical fov to radians
    const vFOV = THREE.MathUtils.degToRad(camera.fov);
    // visible height
    const height = 2 * Math.tan(vFOV / 2) * dist;
    // visible width
    const width = height * camera.aspect;
    return { width, height };
  }
  return { width: 0, height: 0 };
};
