import * as React from 'react';
import { Link as GLink, GatsbyLinkProps } from 'gatsby';
import styled from 'styled-components';

const Link: React.FC<React.PropsWithoutRef<GatsbyLinkProps<null>>> = ({
  ...props
}) => {
  return <StyledLink {...props} activeClassName='activeLink'></StyledLink>;
};

export default Link;

const StyledLink = styled(GLink)`
  text-decoration: none;
  all: unset;
  box-sizing: border-box;
  color: inherit;
  user-select: none;
  cursor: pointer;
`;
