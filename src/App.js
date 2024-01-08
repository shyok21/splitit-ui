import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";
import AccountPage from "./components/AccountPage";
import ActivityPage from "./components/ActivityPage";
import FriendsPage from "./components/FriendsPage";
import GroupPage from "./components/GroupPage";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import { darkTheme } from "./utils/theme";

import GroupExpense from "./components/GroupExpense";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={createTheme(darkTheme)}>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<GroupPage />} />
              <Route path="/group" element={<GroupPage />} />
              <Route path="/group/:id" element={<GroupExpense />} />
              <Route path="/friends" element={<FriendsPage />} />
              <Route path="/activity" element={<ActivityPage />} />
              <Route path="/account" element={<AccountPage />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
