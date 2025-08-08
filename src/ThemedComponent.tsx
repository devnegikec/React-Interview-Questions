import React from 'react';
import { useTheme } from './ThemeContext';

const ThemedComponent: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const styles = {
    padding: '1rem',
    backgroundColor: theme === 'light' ? '#fff' : '#333',
    color: theme === 'light' ? '#000' : '#fff',
  };

  return (
    <div style={styles}>
      <h1>Current Theme: {theme}</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
    </div>
  );
};

export default ThemedComponent;