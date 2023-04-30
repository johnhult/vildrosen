import Button, { ButtonProps } from 'components/Button';
import Header, { HeaderTypes } from 'components/Header';
import { useGetGap } from 'helpers/style';
import * as React from 'react';
import styled from 'styled-components';

type HeroProps = {
  title: string;
  cta: ButtonProps;
};

const Hero: React.FC<HeroProps> = ({ title, cta }) => {
  return (
    <Styled.Hero>
      <Header type={HeaderTypes.HERO} fancy>
        {title}
      </Header>
      <Button label={cta.label} interaction={cta.interaction} />
    </Styled.Hero>
  );
};

const Styled = {
  Hero: styled.div`
    overflow: hidden;
    height: 100%;
    min-height: 600px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: ${({ theme }) =>
      `${theme.gap.menu}px ${useGetGap(8)} ${useGetGap(8)}`};
    transform: translateZ(0);
  `,
};

export default Hero;
