import { noop } from "lodash-es";
import { useEffect, useState } from "react";

export interface ScreenSize {
  width: number;
  height: number;
}

export const useDimensions = () => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenSize({
        height: document.documentElement.clientHeight,
        width: document.documentElement.clientWidth,
      });
    });
    setScreenSize({
      height: document.documentElement.clientHeight,
      width: document.documentElement.clientWidth,
    });

    return () => {
      document.removeEventListener("resize", noop);
    };
  }, []);

  return screenSize;
};
