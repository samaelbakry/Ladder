
"use client";

import type React from "react";
import { useContext, useEffect, useState } from "react";
import { Theme, themeContext } from "./themeContext";

const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setThemeState] = useState<Theme>("light");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const initialTheme = savedTheme ?? "light";

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThemeState(initialTheme);

    document.documentElement.classList.toggle(
      "dark",
      initialTheme === "dark",
    );

    setIsInitialized(true);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);

    document.documentElement.classList.toggle(
      "dark",
      newTheme === "dark",
    );

    localStorage.setItem("theme", newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!isInitialized) return null;

  return (
    <themeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </themeContext.Provider>
  );
};

export default ThemeContextProvider;

export function useTheme() {
  const context = useContext(themeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeContextProvider",
    );
  }

  return context;
}
