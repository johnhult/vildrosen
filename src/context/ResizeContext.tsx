import * as React from 'react';
import useResizeEventListener from 'hooks/useResizeEventListener';

interface ResizeContextInterface {
  windowSize: { w: number; h: number };
}

const ResizeContext = React.createContext<ResizeContextInterface | null>(null);

const ResizeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const windowSize = useResizeEventListener();

  const val = {
    windowSize,
  };
  return (
    <ResizeContext.Provider value={val}>{children}</ResizeContext.Provider>
  );
};

export default ResizeProvider;

export const useResize = () => {
  const context = React.useContext(ResizeContext);
  if (!context)
    throw new Error('ThemeContext can only be used in child components');
  return context.windowSize;
};
