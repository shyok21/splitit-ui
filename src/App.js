import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GroupPage from "./components/GroupPage";
import HomePage from "./components/HomePage";
import { darkTheme } from "./utils/theme";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={createTheme(darkTheme)}>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/group" element={<GroupPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
