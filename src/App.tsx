import React from "react";
import "./App.css";
import { SearchBox } from "./SearchBox";
import { ThemeProvider } from "./ContextApi/ThemeContext";
import ThemedComponent from "./ContextApi/ThemedComponent";
import ForwardRefContainer from "./ForwardRef/ForwardRefContainer";
import MouseTracker from "./RenderProps/MouseTracker";
import ErrorBoundaryContainer from "./ErrorBoundary/ErrorBoundaryContainer";
import TradingGrid from "./GridLayout/TradingGrid";

function App() {
  return (
    <div className="App">
      {/* <ThemeProvider>
        <ThemedComponent />
        <SearchBox />
        <ForwardRefContainer />
        <ErrorBoundaryContainer />
        <MouseTracker
          render={({ x, y }) => (
            <h2>
              The mouse position is ({x}, {y})
            </h2>
          )}
        /> */}
      <TradingGrid />
      {/* </ThemeProvider> */}
    </div>
  );
}

export default App;
