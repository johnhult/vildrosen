import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { ReactThreeFiber, extend } from '@react-three/fiber';

const vertexShader: string = /*glsl*/ `
  // attribute vec2 position;
  void main() {
  gl_Position = vec4(position.xy, 1.0, 1.0);
}`;

const fragmentShader: string = /* glsl */ `precision highp float;
uniform sampler2D uScene;
uniform vec2 uResolution;
void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec3 color = vec3(uv, 1.0);
  // color = texture2D(uScene, uv).rgb;
  // Do your cool postprocessing here
  // color += sin(uv.x);
  gl_FragColor = vec4(color, 1.0);
}`;

const ScreenMaterial = shaderMaterial(
  {
    uScene: new THREE.Texture(),
    uResolution: new THREE.Vector2(),
  },
  vertexShader,
  fragmentShader
);

extend({ ScreenMaterial });

type ScreenMaterialImpl = {
  uScene: THREE.Texture;
  uResolution: THREE.Vector2;
} & JSX.IntrinsicElements['shaderMaterial'];

declare global {
  namespace JSX {
    interface IntrinsicElements {
      screenMaterial: ReactThreeFiber.Object3DNode<
        ScreenMaterialImpl,
        typeof ScreenMaterial
      >;
    }
  }
}
