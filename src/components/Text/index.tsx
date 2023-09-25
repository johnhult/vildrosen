import { minWidth } from 'helpers/style';
import * as React from 'react';
import styled from 'styled-components';

type TextProps = {
  mb?: number | string;
};
type StyledTextProps = {
  $mb: number | string;
};

const Text: React.FC<React.PropsWithChildren<TextProps>> = ({
  children,
  mb = '1em',
  ...props
}) => {
  return (
    <StyledText {...props} $mb={mb}>
      {children}
    </StyledText>
  );
};

const StyledText = styled.p<StyledTextProps>`
  display: block;
  font-size: calc(16rem / 16);
  line-height: 1.6em;
  margin-top: 0;
  margin-bottom: ${({ $mb }) => (typeof $mb === 'string' ? $mb : `${$mb}px`)};
  ${({ theme }) => minWidth(theme.breakpoints.tablet.asNumber)} {
    font-size: calc(18rem / 16);
  }
`;

export default Text;
