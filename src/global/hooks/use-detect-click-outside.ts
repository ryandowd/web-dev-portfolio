import { useRef, useEffect } from 'react';

export const useDetectClickOutside = (callback: () => void) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event: any) => {
      console.log('ref', ref);
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref]);

  return ref;
};
