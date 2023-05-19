import 'styled-components';

type Breakpoint = {
  asNumber: number;
  asString: string;
};

interface Base {
  gap: {
    base: number;
    menu: number;
    section: {
      y: {
        desktop: number;
        mobile: number;
      };
      x: {
        desktop: number;
        mobile: number;
      };
    };
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
      background: string;
      black: string;
      border: string;
      cta: string;
      ctaText: string;
      dark: string;
      headerShadow: string;
      light: string;
      palette: string[];
      text: string;
      white: string;
    };
  }
}
