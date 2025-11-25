import { useEffect, useRef } from "react";

export function useMultiDrag(viewportId, options = {}) {
  const {
    handleClass = "drag-handle",
    targetClass = "drag-target",
    disableClass = "drag-disable",
    minLeft = -Infinity,
    minTop = -Infinity,
  } = options;

  const draggingRef = useRef(false);
  const activeRef = useRef(null);
  const startMouse = useRef({ x: 0, y: 0 });
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const viewport = document.getElementById(viewportId);
    if (!viewport) return;

    const plane = viewport.querySelector("div[style*='translate']");
    if (!plane) return;

    const getTransform = () => {
      const style = plane.style.transform;
      const translateMatch = style.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);
      const scaleMatch = style.match(/scale\(([-\d.]+)\)/);
      return {
        originX: translateMatch ? parseFloat(translateMatch[1]) : 0,
        originY: translateMatch ? parseFloat(translateMatch[2]) : 0,
        scale: scaleMatch ? parseFloat(scaleMatch[1]) : 1,
      };
    };

    const onMouseDown = (e) => {
      const handle = e.target.closest(`.${handleClass}`);
      if (!handle) return;

      const target = e.target.closest(`.${targetClass}`);
      // target.style.z = `10`;
      if (!target || !plane.contains(target)) return;

      const disable = target.querySelector(`.${disableClass}`);

      const { originX, originY, scale } = getTransform();
      const planeRect = plane.getBoundingClientRect();
      const elemRect = target.getBoundingClientRect();

      // Calculate offset of mouse relative to element's top-left in plane coordinates
      const offsetX = (e.clientX - elemRect.left) / scale;
      const offsetY = (e.clientY - elemRect.top) / scale;

      draggingRef.current = true;
      activeRef.current = { target, disable, originX, originY, scale };
      startMouse.current = { x: e.clientX, y: e.clientY };
      offset.current = { x: offsetX, y: offsetY };

      if (disable) disable.style.pointerEvents = "none";
      document.body.style.userSelect = "none";
    };

    const onMouseMove = (e) => {
      if (!draggingRef.current || !activeRef.current) return;

      const { target, originX, originY, scale } = activeRef.current;

      // Compute new top-left based on mouse position minus initial offset
      const planeMouseX = (e.clientX - plane.getBoundingClientRect().left) / scale;
      const planeMouseY = (e.clientY - plane.getBoundingClientRect().top) / scale;

      const newLeft = planeMouseX - offset.current.x;
      const newTop = planeMouseY - offset.current.y;

      target.style.position = "absolute";
      target.style.left = `${Math.max(newLeft, minLeft)}px`;
      target.style.top = `${Math.max(newTop, minTop)}px`;
    };

    const onMouseUp = () => {
      if (!draggingRef.current || !activeRef.current) return;

      const { disable } = activeRef.current;
      draggingRef.current = false;
      activeRef.current = null;

      if (disable) disable.style.pointerEvents = "auto";
      document.body.style.userSelect = "";
    };

    viewport.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      viewport.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      document.body.style.userSelect = "";
    };
  }, [viewportId, handleClass, targetClass, disableClass, minLeft, minTop]);
}
