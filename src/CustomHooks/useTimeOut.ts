/**
 *
  Create a hook to easily use setTimeout(callback, delay).

  1. reset the timer if delay changes
  2. DO NOT reset the timer if only callback changes
 */

import React from "react";

export const useTimeOut = (callback: () => void, delay: number) => {
  const timerRef = React.useRef<any>(null);
  timerRef.current = callback;

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      timerRef.current();
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay, callback]);
};
