import { DefaultTheme, css, useTheme } from 'styled-components';

export const useGetGap = (multiple: number): string => {
  const theme = useTheme();
  return `${theme.gap.base * multiple}px`;
};

export const useGetGapNumber = (multiple: number): number => {
  const theme = useTheme();
  return theme.gap.base * multiple;
};

export const getRandomColorFromPalette = (theme: DefaultTheme) => {
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
  return css`
    padding-left: ${typeof p === 'string' ? p : `${p}px`};
    padding-right: ${typeof p === 'string' ? p : `${p}px`};
  `;
};

export const pY = (p: string | number) => {
  return css`
    padding-top: ${typeof p === 'string' ? p : `${p}px`};
    padding-bottom: ${typeof p === 'string' ? p : `${p}px`};
  `;
};
