import { useEffect, useRef } from 'react';

export const useIsFirstRender = () => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return isFirstRender.current;
}

export const useIsFirstRenderPartTwo = () => {
  const isFirstRender = useRef(true);

  if (isFirstRender.current) {
    isFirstRender.current = false;
    return true;
  }
  return false;
}
