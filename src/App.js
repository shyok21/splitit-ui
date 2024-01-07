import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import GroupPage from "./components/GroupPage";
import HomePage from "./components/HomePage";
import { persistor, store } from "./redux/store";
import { darkTheme } from "./utils/theme";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={createTheme(darkTheme)}>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/group" element={<GroupPage />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
