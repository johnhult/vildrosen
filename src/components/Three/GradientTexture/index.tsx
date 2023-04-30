import * as React from 'react';
import * as THREE from 'three';

type Props = {
  stops: Array<number>;
  colors: Array<string>;
  attach?: string;
  size?: number;
};

export function ThreeGradientTexture({ stops, colors, size = 1024 }: Props) {
  const texture = React.useMemo(() => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.width = 16;
    canvas.height = size;
    const gradient = context.createLinearGradient(0, 0, 0, size);
    let i = stops.length;
    while (i--) {
      gradient.addColorStop(stops[i], colors[i]);
    }
    context.fillStyle = gradient;
    context.fillRect(0, 0, 16, size);
    return new THREE.Texture(canvas, THREE.UVMapping);
  }, [stops, colors, size]);
  return texture;
}
