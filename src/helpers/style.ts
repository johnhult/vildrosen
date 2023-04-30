import { DefaultTheme, useTheme } from 'styled-components';

export const useGetGap = (multiple: number): string => {
  const theme = useTheme();
  return `${theme.gap.base * multiple}px`;
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
