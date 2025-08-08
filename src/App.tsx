import React from 'react';
import { ThemeProvider } from './ThemeContext';
import ThemedComponent from './ThemedComponent';
import { SearchBox } from './SearchBox';
import './App.css';

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <ThemedComponent />
        <SearchBox />
      </ThemeProvider>
    </div>
  );
}

export default App;
