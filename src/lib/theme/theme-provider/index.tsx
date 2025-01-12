import { useEffect, useState } from "react";

import { Theme, ThemeProviderContext, ThemeProviderProps } from "./theme-context";

export default function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const storedValue = localStorage.getItem(storageKey!);
    if (storedValue) setTheme(storedValue as Theme);
  }, [storageKey]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme!);
  }, [theme]);

  return (
    <ThemeProviderContext.Provider
      {...props}
      value={{
        theme,
        setTheme: (theme: Theme) => {
          localStorage.setItem(storageKey!, theme);
          setTheme(theme);
        },
      }}
    >
      {children}
    </ThemeProviderContext.Provider>
  );
}
