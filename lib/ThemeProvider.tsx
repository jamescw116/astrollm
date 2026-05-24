"use client"; // 因為這裡用了 useState，所以必須是 Client Component

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import type { ColorScheme, ColorSchemeDisplay } from "./types/common";

// 定義 Context 的型別
interface ThemeContextType {
  theme: string;
  fnChangeTheme: () => void;
  realTheme: ColorScheme;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ColorSchemeDisplay>("system"); // 預設值
  const [realTheme, setRealTheme] = useState<"light" | "dark">("dark"); // 真實主題
  const [themeName, setThemeName] = useState<string>("dark");

  const fnChangeTheme = () =>
    setTheme((p) =>
      p === "light" ? "dark" : p === "dark" ? "system" : "light",
    );

  useEffect(() => {
    // 1. 初始化讀取
    const fnInitTheme = async () => {
      const saved =
        (localStorage.getItem("theme") as "light" | "dark" | "system") ||
        "system";
      setTheme(saved);
    };

    fnInitTheme();
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // 2. 定義更新邏輯
    const update = () => {
      let isDark = false;

      setThemeName(
        theme === "system" ? "系統" : theme === "light" ? "淺色" : "深色",
      );

      if (theme === "system") {
        isDark = mediaQuery.matches;
      } else {
        isDark = theme === "dark";
      }

      if (isDark) {
        root.classList.add("dark");
        setRealTheme("dark");
      } else {
        root.classList.remove("dark");
        setRealTheme("light");
      }
    };

    // 3. 執行與監聽
    update();
    localStorage.setItem("theme", theme);
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{ theme: themeName, fnChangeTheme, realTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// 建立一個 Hook 方便子組件讀取
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme 必須在 ThemeProvider 內使用");
  return context;
};

export default ThemeProvider;
