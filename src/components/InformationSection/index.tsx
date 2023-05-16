import SectionWrapper from 'components/SectionWrapper';
import { minWidth, useGetGap } from 'helpers/style';
import * as React from 'react';
import styled from 'styled-components';

type InformationSectionProps = {
  color?: string;
};

type StyledProps = {
  $color?: string;
};

const InformationSection: React.FC<
  React.PropsWithChildren<InformationSectionProps>
> = ({ children }) => {
  return (
    <SectionWrapper>
      <StyledFancyBox>{children}</StyledFancyBox>
    </SectionWrapper>
  );
};

const StyledFancyBox = styled.section<StyledProps>`
  width: 800px;
  max-width: 100%;
  position: relative;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${() => useGetGap(4)};
  background-color: white;
  ${({ theme }) => minWidth(theme.breakpoints.tablet.asNumber)} {
    padding: ${() => useGetGap(8)} ${() => useGetGap(12)};
  }

  &::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: -1;
    background-color: ${({ theme, $color }) =>
      $color ? $color : theme.colors.palette[4]};
  }
`;

export default InformationSection;
