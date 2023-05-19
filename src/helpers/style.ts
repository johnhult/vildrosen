// import * because es6-string-html extension breaks syntax highlighting when using css
import * as Styled from 'styled-components';

export const useGetGap = (multiple: number): string => {
  const theme = Styled.useTheme();
  return `${theme.gap.base * multiple}px`;
};

export const useGetGapNumber = (multiple: number): number => {
  const theme = Styled.useTheme();
  return theme.gap.base * multiple;
};

export const getRandomColorFromPalette = (theme: Styled.DefaultTheme) => {
  const color =
    theme.colors.palette[
      Math.floor(Math.random() * theme.colors.palette.length)
    ];
  return color;
};

export const minWidth = (point: number) => {
  return `@media screen and (min-width: ${point}px)`;
};

export const pX = (p: string | number) => {
  return Styled.css`
    padding-left: ${typeof p === 'string' ? p : `${p}px`};
    padding-right: ${typeof p === 'string' ? p : `${p}px`};
  `;
};

export const pY = (p: string | number) => {
  return Styled.css`
    padding-top: ${typeof p === 'string' ? p : `${p}px`};
    padding-bottom: ${typeof p === 'string' ? p : `${p}px`};
  `;
};

export const mY = (
  m:
    | string
    | number
    | {
        top: number | string;
        bot: number | string;
      }
) => {
  return typeof m === 'object'
    ? Styled.css`
  margin-top: ${typeof m.top === 'string' ? m.top : `${m.top}px`};
  margin-bottom: ${typeof m.bot === 'string' ? m.bot : `${m.bot}px`};
`
    : Styled.css`
    margin-top: ${typeof m === 'string' ? m : `${m}px`};
    margin-bottom: ${typeof m === 'string' ? m : `${m}px`};
  `;
};

export const mX = (m: string | number) => {
  return Styled.css`
    margin-top: ${typeof m === 'string' ? m : `${m}px`};
    margin-bottom: ${typeof m === 'string' ? m : `${m}px`};
  `;
};
