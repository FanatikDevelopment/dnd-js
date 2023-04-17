import { useEffect, useRef, useState } from 'react';
import { Size } from '../engine/math';

export function useResizeObserver<T extends HTMLElement = HTMLElement>({
  elm,
  onResize,
}: {
  elm: React.MutableRefObject<T | null>;
  onResize?: (
    elm: T,
    size: Size,
    entries: ResizeObserverEntry[],
    observer: ResizeObserver
  ) => void;
}) {
  const [size, setSize] = useState<Size>({
    width: elm.current?.offsetWidth ?? 800,
    height: elm.current?.offsetHeight ?? 600,
  });
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (!elm.current) {
      return;
    }

    resizeObserverRef.current = new ResizeObserver((entries, observer) => {
      if (!elm.current) {
        return;
      }

      const width = elm.current.offsetWidth;
      const height = elm.current.offsetHeight;

      setSize({
        width,
        height,
      });

      if (onResize) {
        onResize(elm.current, { width, height }, entries, observer);
      }
    });

    resizeObserverRef.current.observe(elm.current);

    return () => {
      resizeObserverRef.current?.disconnect();
    };
  }, [elm, onResize]);

  return {
    width: size.width,
    height: size.height,
    observer: resizeObserverRef.current,
  };
}
