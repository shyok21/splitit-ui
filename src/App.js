import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GroupPage from "./components/GroupPage";
import HomePage from "./components/HomePage";
import { store } from "./redux/store";
import { darkTheme } from "./utils/theme";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={createTheme(darkTheme)}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/group" element={<GroupPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
