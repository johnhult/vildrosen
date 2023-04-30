import 'styled-components';

type Breakpoint = {
  asNumber: number;
  asString: string;
};

interface Base {
  gap: {
    base: number;
    menu: number;
  };
  radius: {
    small: number;
    large: number;
  };
  breakpoints: {
    tablet: Breakpoint;
    desktop: Breakpoint;
  };
}

declare module 'styled-components' {
  export interface DefaultTheme extends Base {
    name: string;
    colors: {
      body: string;
      text: string;
      dark: string;
      black: string;
      white: string;
      border: string;
      cta: string;
      ctaText: string;
      headerShadow: string;
      palette: string[];
    };
  }
}