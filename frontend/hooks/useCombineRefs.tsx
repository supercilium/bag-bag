import React from "react";

type UseCombineRefsType = <T = HTMLElement>(
  ...refs: React.Ref<T>[]
) => React.MutableRefObject<T>;

export const useCombinedRefs: UseCombineRefsType = (...refs) => {
  const targetRef = React.useRef();

  React.useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === "function") {
        ref(targetRef.current);
      } else {
        (ref as React.MutableRefObject<unknown>).current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
};
