import * as React from 'react';
import styled from 'styled-components';

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      Made with &lt;3 by <a href='https://iamjohnhult.com'>@iamjohnhult</a>
    </StyledFooter>
  );
};

const StyledFooter = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.cta};
  display: flex;
`;

export default Footer;
