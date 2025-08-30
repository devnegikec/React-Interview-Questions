import React, { useState } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

export default function TradingGrid() {
  const [layout, setLayout] = useState<Layout[]>([
    { i: "chart-1", x: 0, y: 0, w: 4, h: 6 },
    { i: "chart-2", x: 4, y: 0, w: 4, h: 6 },
    { i: "chart-3", x: 0, y: 4, w: 4, h: 6 },
  ]);

  return (
    <div style={{ height: "100vh", background: "#111" }}>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
        onLayoutChange={(newLayout) => setLayout(newLayout)}
        draggableHandle=".drag-handle"
      >
        {layout.map((item) => (
          <div key={item.i} style={{ background: "#222", borderRadius: "8px" }}>
            <div
              className="drag-handle"
              style={{
                padding: "4px",
                cursor: "move",
                background: "#333",
                color: "#fff",
              }}
            >
              {item.i.toUpperCase()}
            </div>
            <div style={{ height: "100%", padding: "8px", color: "white" }}>
              📊 Chart Window
            </div>
          </div>
        ))}
      </GridLayout>
    </div>
  );
}
