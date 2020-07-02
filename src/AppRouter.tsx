import React from "react";
import { Router, Route } from "react-router-dom";

import { MainPage } from "./pages";
import historyInstance from "./historyInstance";

export const AppRouter: React.FC = () => {
  return (
    <Router history={historyInstance}>
      <Route path="/:symbol?" component={MainPage} exact />
    </Router>
  );
};
