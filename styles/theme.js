import { theme as chakraTheme } from "@chakra-ui/core";

const theme = {
  ...chakraTheme,
  fonts: {
    ...chakraTheme.fonts,
    body:
      "apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif",
  },

  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
};

export default theme;