import { createTheme } from "@mui/material/styles";
import { blue, orange, deepOrange, grey } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
      darker: blue[900],
    },
    secondary: {
      light: grey[300],
      main: orange[900],
      dark: deepOrange[900],
    },
  },
});
