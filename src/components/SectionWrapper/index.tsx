import * as React from 'react';
import { minWidth, pX, pY } from 'helpers/style';
import styled from 'styled-components';

const SectionWrapper: React.FC<React.PropsWithChildren> = ({
  children,
  ...props
}) => {
  return <StyledSectionWrapper {...props}>{children}</StyledSectionWrapper>;
};

const StyledSectionWrapper = styled.section`
  ${({ theme }) => pX(theme.gap.section.x.mobile)}
  ${({ theme }) => pY(theme.gap.section.y.mobile)}
    ${({ theme }) => minWidth(theme.breakpoints.tablet.asNumber)} {
    ${({ theme }) => pX(theme.gap.section.x.desktop)}
    ${({ theme }) => pY(theme.gap.section.y.desktop)}
  }
`;

export default SectionWrapper;
