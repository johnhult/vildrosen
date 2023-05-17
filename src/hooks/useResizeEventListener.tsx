import * as React from 'react';

const useResizeEventListener = () => {
  // We use windowSize for triggering rerenders
  const [windowSize, setWindowSize] = React.useState({ w: 0, h: 0 });

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timer);
      timer = setTimeout(
        () => setWindowSize({ w: window.innerWidth, h: window.innerHeight }),
        250
      );
    };
    setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
    };
  }, []);

  return windowSize;
};

export default useResizeEventListener;
