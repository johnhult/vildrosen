import * as React from 'react';

const ThreeCanvas = React.lazy(() => import('components/Three/ThreeCanvas'));

type LazyProps = {
  pointerRef: HTMLElement | null;
};

const ThreeLazy: React.FC<LazyProps> = ({ pointerRef }) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {!isMounted ||
      typeof window === 'undefined' ||
      pointerRef === null ||
      navigator?.connection?.saveData ? null : (
        <React.Suspense fallback={null}>
          <ThreeCanvas pointerRef={pointerRef} />
        </React.Suspense>
      )}
    </>
  );
};

export default ThreeLazy;
