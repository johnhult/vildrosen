import * as React from 'react';
import styled from 'styled-components';
import Wave from 'assets/gfx/wave-pattern.svg';
import { degToRad } from 'three/src/math/MathUtils';
import { useGetGap } from 'helpers/style';
import useResize from 'hooks/useResize';

type WaveProps = {
  bg?: string;
};
type StyledWaveProps = {
  $bg: string;
  $top?: boolean;
  $height: number;
  $extraWidth: number;
  $angle: number;
  $triH: number;
  $triW: number;
};

const svgProps = {
  $height: 75,
  $extraWidth: 20,
  $angle: 3,
};

const WaveSection: React.FC<React.PropsWithChildren<WaveProps>> = ({
  children,
  bg = 'white',
}) => {
  const windowSize = useResize();
  // Calculate triangle height from screenWidth. Fun trigonometry!
  const triHeight = React.useMemo(
    () =>
      typeof window !== 'undefined'
        ? Math.ceil(windowSize.w * Math.tan(degToRad(svgProps.$angle)))
        : 0,
    [windowSize]
  );
  const triWidth = React.useMemo(
    () => (typeof window !== 'undefined' ? windowSize.w : 0),
    [windowSize]
  );

  return (
    <StyledWrapper $triH={triHeight}>
      <StyledWave $bg={bg} $top {...svgProps} />
      <StyledBackground $bg={bg} $triH={triHeight}>
        <Tri $triH={triHeight} $triW={triWidth} $bg={bg} />
        <StyledMid>{children}</StyledMid>
      </StyledBackground>
      <StyledBottomWaveWrapper>
        <Tri $triH={triHeight} $triW={triWidth} $bg={bg} />
        <StyledWave $bg={bg} {...svgProps} />
      </StyledBottomWaveWrapper>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.section<Pick<StyledWaveProps, '$triH'>>`
  z-index: -1;
  width: 100%;
  position: relative;
  overflow: hidden;
  padding-top: ${({ $triH }) => $triH}px;
  padding-bottom: ${({ $triH }) => $triH}px;
  margin-top: -${({ $triH }) => $triH + svgProps.$height}px;
`;

const StyledBackground = styled.div<Pick<StyledWaveProps, '$bg' | '$triH'>>`
  width: 100%;
  background-color: ${({ $bg }) => $bg};
  position: relative;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledMid = styled.div`
  max-width: 800px;
  padding: ${() => useGetGap(12)} ${() => useGetGap(4)};
`;

const Tri = styled.div<Pick<StyledWaveProps, '$triH' | '$triW' | '$bg'>>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  z-index: -1;
  border-style: solid;
  border-width: 0 0 ${({ $triH }) => $triH}px ${({ $triW }) => $triW}px;
  border-color: transparent transparent ${({ $bg }) => $bg} transparent;
  transform: translateY(-100%);
`;

const StyledBottomWaveWrapper = styled.div`
  transform: rotate(180deg);
  position: relative;
  ${Tri} {
    top: 100%;
  }
`;

const StyledWave = styled(Wave)<Omit<StyledWaveProps, '$triH' | '$triW'>>`
  pointer-events: none;
  position: relative;
  display: block;
  width: calc(100% + 40px);
  height: ${({ $height }) => $height}px;
  top: 2px;
  left: 0;
  z-index: -1;
  transform-origin: 0% 100%;
  transform: rotate(-${svgProps.$angle}deg);
  path {
    fill: ${({ $bg }) => $bg};
    transform: scaleY(${({ $height }) => $height / 36}) scaleX(3);
  }
`;

export default WaveSection;
