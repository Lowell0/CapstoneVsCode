import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        white: {
          100: "#f6f6f7",
          200: "#eeeeee",
          300: "#e5e5e6",
          400: "#dddddd",
          500: "#d4d4d5",
          600: "#aaaaaa",
          700: "#7f7f80",
          800: "#555555",
          900: "#2a2a2b"
        },
        black: {
          100: "#d7d8dd",
          200: "#aeb2bb",
          300: "#868b99",
          400: "#353e55",
          500: "#5d6577",
          600: "#2a3244",
          700: "#202533",
          800: "#151922",
          900: "#0b0c11"
        },
        red: {
          100: "#f4d7d7",
          200: "#e8afae",
          300: "#dd8686",
          400: "#d15e5d",
          500: "#c63635",
          600: "#9e2b2a",
          700: "#772020",
          800: "#4f1615",
          900: "#280b0b"
        },
        blue: {
          100: "#d2ecfc",
          200: "#a5d9fa",
          300: "#77c7f7",
          400: "#4ab4f5",
          500: "#1da1f2",
          600: "#1781c2",
          700: "#116191",
          800: "#0c4061",
          900: "#062030"
        },
        blueAccent: {
          100: "#e1e2fe",
          200: "#c3c6fd",
          300: "#a4a9fc",
          400: "#868dfb",
          500: "#6870fa",
          600: "#535ac8",
          700: "#3e4396",
          800: "#2a2d64",
          900: "#151632",
        },
      }
    : {
        white: {
          100: "#2a2a2b",
          200: "#555555",
          300: "#7f7f80",
          400: "#aaaaaa",
          500: "#d4d4d5",
          600: "#dddddd",
          700: "#e5e5e6",
          800: "#eeeeee",
          900: "#f6f6f7",
        },
        black: {
          100: "#0b0c11",
          200: "#151922",
          300: "#202533",
          400: "#f2f0f0",
          500: "#353e55",
          600: "#5d6577",
          700: "#868b99",
          800: "#aeb2bb",
          900: "#d7d8dd"
        },
        red: {
          100: "#280b0b",
          200: "#4f1615",
          300: "#772020",
          400: "#9e2b2a",
          500: "#c63635",
          600: "#d15e5d",
          700: "#dd8686",
          800: "#e8afae",
          900: "#f4d7d7"
        },
        blue: {
          100: "#062030",
          200: "#0c4061",
          300: "#116191",
          400: "#1781c2",
          500: "#1da1f2",
          600: "#4ab4f5",
          700: "#77c7f7",
          800: "#a5d9fa",
          900: "#d2ecfc"
        },
        blueAccent: {
          100: "#151632",
          200: "#2a2d64",
          300: "#3e4396",
          400: "#535ac8",
          500: "#6870fa",
          600: "#868dfb",
          700: "#a4a9fc",
          800: "#c3c6fd",
          900: "#e1e2fe",
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            black: {
              main: colors.black[500],
            },
            secondary: {
              main: colors.red[500],
            },
            neutral: {
              dark: colors.white[700],
              main: colors.white[500],
              light: colors.white[100],
            },
            background: {
              default: colors.black[700],
            },
          }
        : {
            // palette values for light mode
            black: {
              main: colors.black[100],
            },
            secondary: {
              main: colors.red[500],
            },
            neutral: {
              dark: colors.white[700],
              main: colors.white[500],
              light: colors.white[100],
            },
            background: {
              default: "#ffffff",
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};