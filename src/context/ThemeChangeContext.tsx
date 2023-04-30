import * as React from 'react';
import { darkTheme, lightTheme } from 'helpers/theme';
import { DefaultTheme } from 'styled-components';

export enum AvailableThemes {
  LIGHT = 'light',
  DARK = 'dark',
}

const availableThemes = {
  light: lightTheme,
  dark: darkTheme,
};

interface ThemeChangeContext {
  currentTheme: DefaultTheme;
  setCurrentTheme: React.Dispatch<AvailableThemes>;
}

const ThemeContext = React.createContext<ThemeChangeContext | null>(null);

const ThemeChangeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [currentTheme, setCurrentTheme] = React.useState<AvailableThemes>(
    AvailableThemes.LIGHT
  );

  const val = {
    currentTheme: availableThemes[currentTheme],
    setCurrentTheme,
  };
  return <ThemeContext.Provider value={val}>{children}</ThemeContext.Provider>;
};

export default ThemeChangeProvider;

export const useChangeTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context)
    throw new Error('ThemeContext can only be used in child components');
  return (newTheme: AvailableThemes) => {
    context.setCurrentTheme(newTheme);
  };
};

export const useGetTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context)
    throw new Error('ThemeContext can only be used in child components');
  return context.currentTheme;
};
