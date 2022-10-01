import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#E5756E",
      light: "#FF827A",
      dark: "#A65550",
      contrastText: "white",
    },
    secondary: {
      main: "#262932",
      light: "#595959",
      dark: "#0A0A0A",
    },
  },
});

export default theme;
