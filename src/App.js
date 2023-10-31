import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    palette: {
      primary: {main:"#353535"},
      secondary: {
        main: '#3C6E71'
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header />
        <div className="body">
          <Body />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
