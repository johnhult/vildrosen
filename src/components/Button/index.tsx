import { Link } from 'gatsby';
import { minWidth, useGetGap } from 'helpers/style';
import * as React from 'react';
import styled, { DefaultTheme, ThemeProps } from 'styled-components';
import ButtonBackground from 'assets/gfx/button.svg';
import { darken } from 'polished';

export type ButtonProps = {
  label: string;
  interaction: string | (() => void);
};

type LabelStyleProps = {
  $shadow?: boolean;
};

type SvgStyleProps = {
  $line: boolean;
};

const Button: React.FC<ButtonProps> = ({ label, interaction, ...props }) => {
  return typeof interaction === 'string' ? (
    <Link to={interaction}>{label}</Link>
  ) : (
    <StyledButton onClick={interaction} {...props}>
      <StyledLabel $shadow>{label}</StyledLabel>
      <StyledLabel>{label}</StyledLabel>
      <Svg />
      <Svg $line />
    </StyledButton>
  );
};

const StyledButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  appearance: none;
  border-style: none;
  background: none;
  padding: ${() => `${useGetGap(6)} ${useGetGap(16)}`};
  font-size: calc(24rem / 16);
  font-family: 'Poppins';
  font-weight: 900;
  position: relative;
  user-select: 'none';
  ${({ theme }) => minWidth(theme.breakpoints.tablet.asNumber)} {
    font-size: calc(36rem / 16);
  }

  &:hover {
    span:not(:first-of-type) {
      transform: translate3d(3px, -3px, 0);
    }
    svg:not(:first-of-type) {
      transform: translate3d(0, 0, 0);
    }
  }
`;

const StyledLabel = styled.span<LabelStyleProps>`
  position: ${({ $shadow }) => ($shadow ? 'relative' : 'absolute')};
  transition: 0.3s;
  transform: ${({ $shadow }) =>
    $shadow ? 'translate3d(0,0,0)' : 'translate3d(2px, -2px, 0)'};
  color: ${({ theme, $shadow }) =>
    $shadow ? darken(0.2, theme.colors.ctaText) : theme.colors.ctaText};
`;

const Svg = styled(ButtonBackground)<SvgStyleProps>`
  box-sizing: content-box;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  transition: 0.3s;
  path {
    fill: ${({ theme, $line }) => ($line ? 'transparent' : theme.colors.cta)};
  }
  ${({ theme, $line }: ThemeProps<DefaultTheme> & SvgStyleProps) =>
    $line &&
    `
    transform: translate3d(5px, 5px, 0);
    path {
      stroke: ${darken(0.1, theme.colors.ctaText)};
      stroke-width: 3px;
    }
  `}
`;

export default Button;
