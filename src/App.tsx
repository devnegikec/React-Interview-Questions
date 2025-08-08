import React from "react";
import "./App.css";
import { SearchBox } from "./SearchBox";
import { ThemeProvider } from "./ThemeContext";
import ThemedComponent from "./ThemedComponent";
import ForwardRefContainer from "./ForwardRef/ForwardRefContainer";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <ThemedComponent />
        <SearchBox />
        <ForwardRefContainer />
      </ThemeProvider>
    </div>
  );
}

export default App;
