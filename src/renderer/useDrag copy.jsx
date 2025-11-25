import { useEffect, useRef } from "react";

export function useMultiDrag(elements, options = {}) {
  const {
    handleClass = "drag-handle",
    targetClass = "drag-target",
    disableClass = "drag-disable",
    minLeft = 0,
    minTop = 0,
  } = options;

  const draggingRef = useRef(false);
  const activeRef = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });
  const startRect = useRef({ left: 0, top: 0 });

  useEffect(() => {
    const containers = elements
      .map((el) => (el?.current ? el.current : el))
      .filter(Boolean);

    if (!containers.length) return;

    const onMouseDown = (e, container) => {
      const handle = e.target.closest(`.${handleClass}`);
      if (!handle || !container.contains(handle)) return;

      const target = container.querySelector(`.${targetClass}`) || container;
      const disable = container.querySelector(`.${disableClass}`);
      const rect = target.getBoundingClientRect();

      draggingRef.current = true;
      activeRef.current = { target, disable };
      startPos.current = { x: e.clientX, y: e.clientY };
      startRect.current = {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
      };

      if (disable) disable.style.pointerEvents = "none";
      document.body.style.userSelect = "none";
    };

    const onMouseMove = (e) => {
      if (!draggingRef.current || !activeRef.current) return;

      const { target } = activeRef.current;
      const dx = e.clientX - startPos.current.x;
      const dy = e.clientY - startPos.current.y;

      const newLeft = Math.max(startRect.current.left + dx, minLeft);
      const newTop = Math.max(startRect.current.top + dy, minTop);

      target.style.position = "absolute";
      target.style.left = `${Math.min(newLeft,320)}px`;
      target.style.top = `${Math.max(newTop,10)}px`;
    };

    const onMouseUp = () => {
      if (!draggingRef.current || !activeRef.current) return;
      const { disable } = activeRef.current;

      draggingRef.current = false;
      activeRef.current = null;

      if (disable) disable.style.pointerEvents = "auto";
      document.body.style.userSelect = "";
    };

    // attach once
    containers.forEach((container) => {
      container.__dragHandler__ = (e) => onMouseDown(e, container);
      container.addEventListener("mousedown", container.__dragHandler__);
    });

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      containers.forEach((container) => {
        if (container.__dragHandler__) {
          container.removeEventListener("mousedown", container.__dragHandler__);
          delete container.__dragHandler__;
        }
      });
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      document.body.style.userSelect = "";
    };
  }, [elements, handleClass, targetClass, disableClass, minLeft, minTop]);
}
