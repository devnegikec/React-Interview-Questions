import React, { useState, useEffect } from "react";

interface Position {
  x: number;
  y: number;
}

interface MouseTrackerProps {
  render: (position: Position) => React.ReactNode;
}

function MouseTracker({ render }: MouseTrackerProps) {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", updatePosition);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
    };
  }, []);

  return <div style={{ height: "100vh" }}>{render(position)}</div>;
}

export default MouseTracker;
