import React from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';
import { render, screen, fireEvent } from '@testing-library/react';

// dummy test component to use the ThemeContext
const TestComponent: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>
        Toggle
      </button>
    </div>
  );
}

const renderWithThemeProvider = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <TestComponent />
    </ThemeProvider>
  );
}

describe('ThemeContext', () => {
  it('should provide the default theme as light', () => {
    renderWithThemeProvider(<TestComponent />);
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });
  
  it('toggles theme from light to dark and back again', () => {
    renderWithThemeProvider(<TestComponent />);
    const toggleButton = screen.getByText('Toggle');
    const themeText = screen.getByTestId('theme');

    // Click to toggle to dark theme
    fireEvent.click(toggleButton);
    expect(themeText).toHaveTextContent('dark');

    // Click to toggle back to light theme
    fireEvent.click(toggleButton);
    expect(themeText).toHaveTextContent('light');
  });

  it('throws an error if used outside of a ThemeProvider', () => {
    expect(() => render(<TestComponent />)).toThrowError(/useTheme must be used within a ThemeProvider/i);  
  });
});