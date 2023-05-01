import React from 'react';
import { Canvas } from '@react-three/fiber';
import CanvasContent from '../CanvasContent';
import { Leva } from 'leva';

type CanvasProps = {
  pointerRef: HTMLElement;
};

const ThreeCanvas: React.FC<CanvasProps> = ({ pointerRef }) => {
  return (
    <>
      <Leva hidden={process.env.NODE_ENV === 'production'} />
      <Canvas
        shadows='soft'
        style={{
          position: 'absolute',
          zIndex: -1,
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          // pointerEvents: 'none',
        }}
        eventSource={pointerRef}
        eventPrefix='screen'
      >
        <CanvasContent />
      </Canvas>
    </>
  );
};

export default ThreeCanvas;
