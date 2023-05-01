import * as React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import ThemeChangeProvider, { useGetTheme } from 'context/ThemeChangeContext';
import ThreeLazy from 'components/Three/ThreeLazy';

const StyledTheme: React.FC<React.PropsWithChildren> = ({ children }) => {
  const theme = useGetTheme();
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const Global: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [pointerRef, setPointerRef] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined')
      setPointerRef(document.getElementsByTagName('html')[0]);
  }, []);

  return (
    <>
      <ThemeChangeProvider>
        <StyledTheme>
          <GlobalStyles />
          <main>{children}</main>
          <ThreeLazy pointerRef={pointerRef} />
        </StyledTheme>
      </ThemeChangeProvider>
    </>
  );
};

export default Global;

const GlobalStyles = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
    background-color: cadetblue;
    /* overflow: hidden; */
  }
  html {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    background: ${({ theme }) => theme.colors.body};
    color: ${({ theme }) => theme.colors.text};
    font-family: 'Poppins', sans-serif;
    box-sizing: border-box;
    *, *:before, *:after {
      box-sizing: inherit;
    }
  }
  body {
    position: relative;
    z-index: 0;
  }
  
  body, #___gatsby, #gatsby-focus-wrapper {
    width: 100%;
    height: 100%;
  }
  
  main {
    height: 100%;
  }
`;
