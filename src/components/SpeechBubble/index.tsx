import { useGetGap } from 'helpers/style';
import * as React from 'react';
import styled, { css } from 'styled-components';

type SpeechBubbleProps = {
  left?: boolean;
};
type StyledSpeechBubbleProps = {
  $left: boolean;
};

const SpeechBubble: React.FC<React.PropsWithChildren<SpeechBubbleProps>> = ({
  left = true,
  children,
}) => {
  return (
    <StyledBubbleWrapper>
      <StyledSpeechBubble>{children}</StyledSpeechBubble>
      <StyledPointer $left={left} />
    </StyledBubbleWrapper>
  );
};

const StyledPointer = styled.div<StyledSpeechBubbleProps>`
  display: block;
  position: relative;
  width: 100px;
  height: 100px;
  bottom: calc(50px + 0.5vmin - 0.25vmin + 0.25vmin);
  /* bottom: calc(50px); */
  border-radius: 50%;
  box-shadow: 0.5vmin 0, 2.2vmin -0.5vmin #ffd, 2vmin -0.5vmin 0 0.5vmin;
  clip-path: polygon(0% 50%, 150% 50%, 150% 100%, 0% 100%);
  ${({ $left }) =>
    $left
      ? css`
          left: calc(-50% + 50px);
        `
      : css`
          transform: scaleX(-1);
          right: calc(-50% + 100px);
        `}
`;

const StyledBubbleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > * {
    flex: 0 0 auto;
  }
`;

const StyledSpeechBubble = styled.div`
  background: #ffd;
  border-radius: 15% 10% / 50%;
  position: relative;
  padding: ${() => useGetGap(8)} ${() => useGetGap(12)};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 0.5vmin solid black;
  box-shadow: 0 -0.25vmin, 0 0.125vmin;
`;

export default SpeechBubble;
