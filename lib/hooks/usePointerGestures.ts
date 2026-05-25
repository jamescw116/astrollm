import { useEffect, useRef, useCallback } from "react";

// 定義一個通用回調介面
interface GestureCallbacks {
  onDrag?: (dx: number, dy: number) => void;
  onZoom?: (delta: number, origin: { x: number; y: number }) => void;
}

interface GestureEvent extends UIEvent {
  readonly scale: number;
  readonly rotation: number;
  readonly clientX: number;
  readonly clientY: number;
}

const usePointerGestures = (
  svgRef: React.RefObject<SVGElement | null>,
  callbacks: GestureCallbacks,
) => {
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);

  // 1. 平移邏輯：抽象化後的拖曳
  const handlePointerMove = useCallback(
    (e: globalThis.PointerEvent) => {
      if (!dragStartRef.current) return;
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;

      callbacks.onDrag?.(dx, dy);
      dragStartRef.current = { x: e.clientX, y: e.clientY };
    },
    [callbacks],
  );

  // 2. 縮放邏輯：抽象化後的縮放
  const handleGestureChange = useCallback(
    (e: Event) => {
      const gestureEvent = e as GestureEvent;
      e.preventDefault();
      // 這裡傳遞 scale 的變動率 (例如 1.05 代表放大 5%)
      callbacks.onZoom?.(gestureEvent.scale, {
        x: gestureEvent.clientX,
        y: gestureEvent.clientY,
      });
    },
    [callbacks],
  );

  // 3. 事件綁定 (生命週期)
  useEffect(() => {
    const el = svgRef?.current;
    if (!el) return;

    const start = (e: PointerEvent) => {
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener(
        "pointerup",
        () => {
          dragStartRef.current = null;
          window.removeEventListener("pointermove", handlePointerMove);
        },
        { once: true },
      );
    };

    el.addEventListener("pointerdown", start);
    el.addEventListener("gesturechange", handleGestureChange);

    return () => {
      el.removeEventListener("pointerdown", start);
      el.removeEventListener("gesturechange", handleGestureChange);
    };
  }, [svgRef, handlePointerMove, handleGestureChange]);
};

export default usePointerGestures;
