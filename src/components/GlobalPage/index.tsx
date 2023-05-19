import * as React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import ThemeChangeProvider, { useGetTheme } from 'context/ThemeChangeContext';
import ThreeLazy from 'components/Three/ThreeLazy';
import Menu from 'components/Menu';
import backgroundImage from 'assets/images/background-colored.png';
import ResizeProvider from 'context/ResizeContext';
import Footer from 'components/Footer';

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
      <ResizeProvider>
        <ThemeChangeProvider>
          <StyledTheme>
            <GlobalStyles />
            <Menu />
            <main>{children}</main>
            <ThreeLazy pointerRef={pointerRef} />
            <Footer />
          </StyledTheme>
        </ThemeChangeProvider>
      </ResizeProvider>
    </>
  );
};

export default Global;

const GlobalStyles = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
    /* background-color: cadetblue; */
  }
  html {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    background-color: white;
    background-image: url(${backgroundImage});
    background-repeat: repeat;
    background-size: 500px 500px;
    color: ${({ theme }) => theme.colors.text};
    font-family: 'Poppins', sans-serif;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.colors.background};
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
    /* height: 100%; */
  }
`;
