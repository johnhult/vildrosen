import * as React from 'react';
import { Canvas } from '@react-three/fiber';
import CanvasContent from '../CanvasContent';
import { Leva } from 'leva';
import styled from 'styled-components';
import { minWidth } from 'helpers/style';

type CanvasProps = {
  pointerRef: HTMLElement;
};

const ThreeCanvas: React.FC<CanvasProps> = ({ pointerRef }) => {
  return (
    <>
      <Leva hidden={process.env.NODE_ENV === 'production' || true} />
      <StyledCanvas
        shadows='soft'
        eventSource={pointerRef}
        eventPrefix='screen'
      >
        <CanvasContent />
      </StyledCanvas>
    </>
  );
};

export default ThreeCanvas;

const StyledCanvas = styled(Canvas)`
  position: absolute !important;
  height: auto !important;
  width: auto !important;
  z-index: -1;
  left: 0px;
  right: 0px;
  top: 60px;
  bottom: 0px;
  background: linear-gradient(to top left, #f0c27b, #219ad4);
  ${({ theme }) => minWidth(theme.breakpoints.tablet.asNumber)} {
    left: 60px;
    right: 60px;
    bottom: 60px;
    border-radius: 5px;
  }
  ${({ theme }) => minWidth(theme.breakpoints.tablet.asNumber)} {
    box-shadow: 0px 15px 15px 0px rgba(0, 0, 0, 0.4);
  }
`;
