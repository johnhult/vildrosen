import { Link } from 'gatsby';
import { minWidth, useGetGap } from 'helpers/style';
import * as React from 'react';
import styled from 'styled-components';

export type ButtonProps = {
  label: string;
  ariaLabel: string;
  interaction: string | (() => void);
};

type LabelStyleProps = {
  $shadow?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  label,
  interaction,
  ariaLabel,
  ...props
}) => {
  return typeof interaction === 'string' ? (
    <StyledButton as={Link} to={interaction} aria-label={ariaLabel} {...props}>
      <StyledBackground>
        <StyledLabel>{label}</StyledLabel>
      </StyledBackground>
    </StyledButton>
  ) : (
    <StyledButton onClick={interaction} aria-label={ariaLabel} {...props}>
      <StyledBackground>
        <StyledLabel>{label}</StyledLabel>
      </StyledBackground>
    </StyledButton>
  );
};

const StyledBackground = styled.div`
  border: 3px solid ${({ theme }) => theme.colors.ctaText};
  padding: ${() => `${useGetGap(4)} ${useGetGap(8)}`};
  background-color: ${({ theme }) => theme.colors.cta};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  box-shadow: 5px 5px ${({ theme }) => theme.colors.ctaText};
  transition: 0.1s;
`;

const StyledLabel = styled.span<LabelStyleProps>`
  display: block;
  transition: 0.3s;
  color: ${({ theme }) => theme.colors.ctaText};
`;

const StyledButton = styled.button`
  cursor: pointer;
  position: relative;
  appearance: none;
  border-style: none;
  background: none;
  font-size: calc(18rem / 16);
  font-family: 'Poppins';
  font-weight: 700;
  position: relative;
  user-select: none;
  text-decoration: none;
  z-index: 1;

  ${({ theme }) => minWidth(theme.breakpoints.tablet.asNumber)} {
    font-size: calc(24rem / 16);
  }

  &:hover {
    ${StyledBackground} {
      transform: translate3d(-2px, -2px, 0);
      box-shadow: 7px 7px ${({ theme }) => theme.colors.ctaText};
    }
  }
  &:active {
    ${StyledBackground} {
      transform: translate3d(5px, 5px, 0);
      box-shadow: 0px 0px ${({ theme }) => theme.colors.ctaText};
    }
  }
`;

export default Button;
