import { Effect } from 'postprocessing';

const frag = /* glsl */ `
  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    outputColor = vec4(inputColor.xy, inputColor.z, inputColor.a);
  }
`;

export default class FrameEffect extends Effect {
  constructor() {
    super('FrameEffect', frag, {});
  }
}
