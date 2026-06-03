"use client";

import { createTheme } from "@mui/material/styles";

// Brand palette derived from the Garlemald icon: an emerald-green winged "G"
// on near-black. The site runs a single, always-on dark theme.

const BRAND_GREEN = "#3FB950";
const BRAND_GREEN_DEEP = "#2EA043";

export const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "dark",
    primary: {
      main: BRAND_GREEN,
      dark: BRAND_GREEN_DEEP,
      light: "#56D364",
      contrastText: "#06140A",
    },
    secondary: {
      main: "#1CC8B6",
      contrastText: "#04130F",
    },
    background: {
      default: "#0A0D0B",
      paper: "#11150F",
    },
    text: {
      primary: "#E8EFE9",
      secondary: "#9DAAA0",
    },
    divider: "rgba(255,255,255,0.10)",
    success: { main: "#3FB950" },
    info: { main: "#58A6FF" },
    warning: { main: "#E3B341" },
    error: { main: "#F85149" },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "var(--font-sans), system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    fontFamilyMonospace:
      "var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
    h1: { fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 },
    h2: { fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15 },
    h3: { fontWeight: 700, letterSpacing: "-0.01em" },
    h4: { fontWeight: 700, letterSpacing: "-0.01em" },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 600 },
  } as Record<string, unknown>,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: "smooth" },
        body: {
          backgroundColor: "#0A0D0B",
          backgroundImage:
            "radial-gradient(1200px 600px at 80% -10%, rgba(63,185,80,0.10), transparent 60%), radial-gradient(900px 500px at -10% 10%, rgba(28,200,182,0.06), transparent 55%)",
          backgroundAttachment: "fixed",
        },
        "::selection": {
          background: "rgba(63,185,80,0.30)",
        },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0, color: "transparent" },
      styleOverrides: {
        root: {
          backdropFilter: "saturate(140%) blur(10px)",
          backgroundColor: "rgba(10,13,11,0.72)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          border: "1px solid rgba(255,255,255,0.08)",
          backgroundImage: "none",
          backgroundColor: "rgba(255,255,255,0.018)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        outlined: { borderColor: "rgba(255,255,255,0.10)" },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 10 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600 },
        outlined: { borderColor: "rgba(255,255,255,0.16)" },
      },
    },
    MuiLink: {
      defaultProps: { underline: "hover" },
      styleOverrides: {
        root: { color: BRAND_GREEN, fontWeight: 500 },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: { fontSize: "0.75rem", backgroundColor: "#1b211c" },
      },
    },
  },
});

export default theme;
