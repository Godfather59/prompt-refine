import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const getPreferredTheme = (): Theme => {
  if (typeof window === "undefined") return "light";

  try {
    const stored = window.localStorage.getItem("theme-preference");
    if (stored === "light" || stored === "dark") {
      return stored;
    }
  } catch {
    // Ignore storage access errors and fallback to media query.
  }

  if (typeof window !== "undefined") {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return prefersDark ? "dark" : "light";
  }

  return "light";
};

const applyThemeClass = (theme: Theme) => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => getPreferredTheme());
  const [hasUserPreference, setHasUserPreference] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return window.localStorage.getItem("theme-preference") !== null;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    applyThemeClass(theme);
    try {
      if (hasUserPreference) {
        window.localStorage.setItem("theme-preference", theme);
      } else {
        window.localStorage.removeItem("theme-preference");
      }
    } catch {
      // Ignore storage write errors to avoid breaking theme toggling.
    }
  }, [theme, hasUserPreference]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (hasUserPreference) return;
      setTheme(event.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [hasUserPreference]);

  const setThemeSafe = useCallback((value: Theme) => {
    setHasUserPreference(true);
    setTheme(value);
  }, []);

  const toggleTheme = useCallback(() => {
    setHasUserPreference(true);
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(
    () => ({
      theme,
      setTheme: setThemeSafe,
      toggleTheme,
    }),
    [theme, setThemeSafe, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside a ThemeProvider");
  }
  return context;
}
