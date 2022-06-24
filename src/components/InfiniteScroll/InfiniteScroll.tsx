import useDebounce from "hooks/useDebounce";
import { createRef, useState } from "react";

import { ReactNode } from "react";

export type InfiniteScrollProps = {
  children: ReactNode;
  variant?: string;
  onLoad: (e: number) => void;
  debounceTimeOut?: number;
  dir?: "top" | "bottom";
};

const CustomInfiniteScroll = ({
  children,
  variant,
  debounceTimeOut,
  onLoad,
}: InfiniteScrollProps): JSX.Element => {
  const ref = createRef<HTMLDivElement>();
  const debounced = useDebounce(onLoad, debounceTimeOut || 1000);
  const [prevScrollable, setPrevScrollable] = useState(-1);
  function updatePosition() {
    if (ref?.current) {
      const height = ref.current.scrollHeight - ref.current.scrollTop;

      if (prevScrollable !== height) {
        if (
          ref.current.scrollHeight - ref.current.scrollTop ===
            ref.current.clientHeight &&
          ref.current.scrollTop !== 0
        ) {
          debounced();
        }
      }

      setPrevScrollable(ref.current.scrollHeight - ref.current.scrollTop);
    }
  }

  return (
    <div
      className={`scroll ${variant as string}`}
      ref={ref}
      onScroll={updatePosition}
      style={{
        // position: "relative",
        left: 0,
        top: 0,
        height: "100%",
        width: "100%",
        overflowY: "scroll",
        display: "flex",
      }}
    >
      {children}
    </div>
  );
};

export default CustomInfiniteScroll;
