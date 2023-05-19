import Button, { ButtonProps } from 'components/Button';
import Header, { HeaderTypes } from 'components/Header';
import Text from 'components/Text';
import { minWidth, useGetGap, useGetGapNumber } from 'helpers/style';
import * as React from 'react';
import styled from 'styled-components';

type HeroProps = {
  title: string;
  ingress: string;
  cta: ButtonProps;
};

const Hero: React.FC<HeroProps> = ({ title, cta, ingress }) => {
  return (
    <StyledHero>
      <Header type={HeaderTypes.HERO} fancy>
        {title}
      </Header>
      <StyledInfo>
        <Text>{ingress}</Text>
        <Button
          label={cta.label}
          ariaLabel={cta.ariaLabel}
          interaction={cta.interaction}
        />
      </StyledInfo>
    </StyledHero>
  );
};

const StyledHero = styled.section`
  overflow: hidden;
  height: 100vh;
  min-height: 100vh;
  min-height: -moz-available;
  min-height: -webkit-fill-available;
  min-height: fill-available;
  /* min-height: 600px; */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) =>
    `${theme.gap.menu + useGetGapNumber(12)}px ${useGetGap(4)} ${useGetGap(
      4
    )}`};
  transform: translateZ(0);
  ${({ theme }) => minWidth(theme.breakpoints.tablet.asNumber)} {
    padding: ${({ theme }) =>
      `${theme.gap.menu + useGetGapNumber(24)}px ${useGetGap(8)} ${useGetGap(
        8
      )}`};
  }
`;

const StyledInfo = styled.div`
  width: 500px;
  text-align: center;
  max-width: 100%;
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${() => useGetGap(4)} ${() => useGetGap(4)};
  &::before {
    content: '';
    display: block;
    width: calc(100% + 0px);
    height: calc(100% + 0px);
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: -1;
    background-color: ${({ theme }) => theme.colors.ctaText};
  }
  ${({ theme }) => minWidth(theme.breakpoints.tablet.asNumber)} {
    padding: ${() => useGetGap(8)} ${() => useGetGap(12)};
  }
`;

export default Hero;
