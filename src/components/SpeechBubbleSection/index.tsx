import Text from 'components/Text';
import { minWidth, useGetGap } from 'helpers/style';
import * as React from 'react';
import styled from 'styled-components';
import parent from 'assets/images/parent2.png';
import teacher from 'assets/images/teacher2.png';
import SpeechBubble from 'components/SpeechBubble';

type SpeechProps = {
  question: string;
  answer: string;
};

type StyleProps = {
  $answer?: boolean;
};

const bubbleSize = {
  desktop: 300,
};

const SpeechBubbleSection: React.FC<SpeechProps> = ({ question, answer }) => {
  return (
    <StyledSection>
      <StyledMidWrapper>
        <StyledImageFlex>
          <QuestionWrapper>
            <StyledOuterImageWrapper>
              <StyledInnerImageWrapper>
                <img src={parent} alt='en frågande förälder' />
              </StyledInnerImageWrapper>
            </StyledOuterImageWrapper>
          </QuestionWrapper>
          <SpeechBubbleWrapper>
            <SpeechBubble>
              <Text mb={0}>{question}</Text>
            </SpeechBubble>
          </SpeechBubbleWrapper>
          <div></div>
        </StyledImageFlex>
        <StyledImageFlex $answer>
          <AnswerWrapper>
            <StyledOuterImageWrapper>
              <StyledInnerImageWrapper>
                <img src={teacher} alt='en svarande pedagog' />
              </StyledInnerImageWrapper>
            </StyledOuterImageWrapper>
          </AnswerWrapper>
          <SpeechBubbleWrapper>
            <SpeechBubble left={false}>
              <Text mb={0}>{answer}</Text>
            </SpeechBubble>
          </SpeechBubbleWrapper>
          <div></div>
        </StyledImageFlex>
      </StyledMidWrapper>
    </StyledSection>
  );
};

const StyledImageFlex = styled.div<Pick<StyleProps, '$answer'>>`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  column-gap: ${() => useGetGap(8)};

  ${({ theme }) => minWidth(theme.breakpoints.desktop.asNumber)} {
    margin-top: ${({ $answer }) => $answer && `-${useGetGap(56)}`};
  }

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${bubbleSize.desktop}px;
    flex-shrink: 0;
    flex-grow: 0;
    flex: 0 0 ${bubbleSize.desktop}px;
  }
  & > div:not(:nth-child(2)) {
    display: none;
    ${({ theme }) => minWidth(theme.breakpoints.desktop.asNumber)} {
      display: flex;
    }
  }
`;

const SpeechBubbleWrapper = styled.div`
  && {
    flex: 1;
  }
`;

const StyledOuterImageWrapper = styled.div`
  width: ${bubbleSize.desktop}px;
  height: ${bubbleSize.desktop + 100}px;
  border-bottom-left-radius: 150px;
  border-bottom-right-radius: 150px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
const StyledInnerImageWrapper = styled.div`
  margin-top: auto;
  height: 100%;
  position: relative;
  &::after {
    content: '';
    z-index: -1;
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: ${bubbleSize.desktop}px;
    height: ${bubbleSize.desktop}px;
    border-radius: 150px;
    background-color: ${({ theme }) => theme.colors.cta};
  }
`;

const QuestionWrapper = styled.div`
  padding-top: ${() => useGetGap(12)};
  img {
    position: relative;
    width: ${bubbleSize.desktop + 200}px;
    height: ${bubbleSize.desktop + 200}px;
    top: 0px;
    left: -100px;
    object-fit: contain;
    transform: scaleX(-1);
  }
`;

const AnswerWrapper = styled.div`
  padding-top: ${() => useGetGap(64)};
  img {
    position: relative;
    width: ${bubbleSize.desktop + 150}px;
    height: ${bubbleSize.desktop + 150}px;
    top: -0px;
    right: 100px;
    object-fit: contain;
    transform: scaleX(-1);
  }

  ${StyledInnerImageWrapper}::after {
    background-color: ${({ theme }) => theme.colors.ctaText};
  }
`;

const StyledMidWrapper = styled.div`
  width: 100%;
  ${({ theme }) => minWidth(theme.breakpoints.desktop.asNumber)} {
    flex: 0 0 1200px;
    width: 1200px;
  }
`;

const StyledSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-content: center;
  justify-content: center;
  padding: ${() => `${useGetGap(16)} ${useGetGap(4)}`};

  ${({ theme }) => minWidth(theme.breakpoints.tablet.asNumber)} {
    padding: ${() => useGetGap(16)};
  }

  & ${StyledImageFlex}:nth-child(even) {
    flex-direction: row-reverse;
  }
`;

export default SpeechBubbleSection;
