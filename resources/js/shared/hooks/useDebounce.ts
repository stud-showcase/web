import { useCallback } from "react";

export const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
  const debouncedFunction = useCallback(
    (...args: any[]) => {
      const handler = setTimeout(() => {
        callback(...args);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    [callback, delay]
  );

  return debouncedFunction;
};
