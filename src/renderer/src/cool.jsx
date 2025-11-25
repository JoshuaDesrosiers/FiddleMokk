import { useRef, useState, useEffect } from "react";

export default function ViewportContainer({ children }) {
  const planeRef = useRef(null);
  const containerRef = useRef(null);

  const [scale, setScale] = useState(1);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [panning, setPanning] = useState(false);
  const start = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMouseDown = (e) => {
      // ✅ Only pan if background was clicked
      const isBackground =
        e.target === container || e.target === planeRef.current;
    // if(!container.hasFocus()||!planeRef.current.hasFocus()) return;
      if (!isBackground) return;

      setPanning(true);
      start.current = {
        x: e.clientX - origin.x,
        y: e.clientY - origin.y,
      };
    };

    const onMouseMove = (e) => {
      if (!panning) return;
      const newOrigin = {
        x: e.clientX - start.current.x,
        y: e.clientY - start.current.y,
      };
      setOrigin(newOrigin);
    };

    const stop = () => setPanning(false);

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stop);

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stop);
    };
  }, [panning, origin]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e) => {
      e.preventDefault();
      const delta = -e.deltaY * 0.001;
      setScale((prev) => Math.min(Math.max(0.1, prev + delta), 5));
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div
      ref={containerRef}
      id='viewport'
      tabIndex={'0'}
      className="relative w-full duration-700 h-screen overflow-hidden bg-neutral-300 cursor-grab active:cursor-grabbing"
    >
      <div
        ref={planeRef}
        tabIndex={'0'}
        className="absolute top-1/2 left-1/2 w-0 h-0 origin-center"
        style={{
          transform: `translate(${origin.x}px, ${origin.y}px) scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {children}
      </div>
    </div>
  );
}
