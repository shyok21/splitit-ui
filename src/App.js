import React from 'react';
import GroupPage from './components/GroupPage';

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" component={GroupPage} />
        <Route path="/group" component={GroupPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
