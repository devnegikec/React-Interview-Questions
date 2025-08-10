import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "./ThemeContext";
import ThemedComponent from "./ThemedComponent";

describe("ThemedComponent", () => {
  it("renders with light theme by default", () => {
    const { getByText } = render(
      <ThemeProvider>
        <ThemedComponent />
      </ThemeProvider>);

    expect(getByText(/Current Theme: light/i)).toBeInTheDocument();
  })

  test("toggles to dark theme on button click", () => {
    const { getByText } = render(
      <ThemeProvider>
        <ThemedComponent />
      </ThemeProvider>
    );

    const button = getByText(/Switch to Dark Theme/i);
    fireEvent.click(button);

    expect(getByText(/Current Theme: dark/i)).toBeInTheDocument();
  });
});