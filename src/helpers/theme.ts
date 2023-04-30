import { DefaultTheme } from 'styled-components';

const themeBase = {
  gap: {
    base: 4,
    menu: 80,
  },
  radius: {
    small: 4,
    large: 12,
  },
  breakpoints: {
    tablet: { asNumber: 768, asString: '768px' },
    desktop: { asNumber: 1024, asString: '1024px' },
  },
};

// const palette = ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'];
const palette = ['#006d77', '#83c5be', '#edf6f9', '#ffddd2', '#e29578'];
const sharedColors = {
  black: '#000000',
  dark: '#151617',
  white: '#ffffff',
  headerShadow: '#320152',
  palette,
};

export const lightTheme: DefaultTheme = {
  name: 'light',
  colors: {
    body: '#ffffff',
    text: '#162025',
    border: '#6d8095',
    cta: '#ffb600',
    ctaText: '#c50043',
    ...sharedColors,
  },
  ...themeBase,
};
export const darkTheme: DefaultTheme = {
  name: 'dark',
  colors: {
    body: '#1a242e',
    text: '#ffffff',
    border: '#2d3946',
    cta: '#228A88',
    ctaText: '#2fc500',
    ...sharedColors,
  },
  ...themeBase,
};
