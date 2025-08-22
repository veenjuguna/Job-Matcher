// src/theme.js
import { extendTheme } from "@chakra-ui/react";
// Custom theme for the application
// This theme defines a custom color palette for the application
const theme = extendTheme({
  colors: {
    brand: {
      50: "#ffe4f0",
      100: "#ffb3d9",
      200: "#ff80c2",
      300: "#ff4da6",
      400: "#ff1a8a",
      500: "#e60073", // main pink
      600: "#b30059",
      700: "#800040",
      800: "#4d0026",
      900: "#1a000d",
    },
  },
});

export default theme;
