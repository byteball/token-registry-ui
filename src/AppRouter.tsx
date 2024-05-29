import React, { useEffect } from "react";
import { Router, Route } from "react-router-dom";

import { MainPage } from "./pages";
import historyInstance from "./historyInstance";
import { useDispatch } from "react-redux";
import { getData } from "store/actions/data/getData";
import { botCheck } from "utils/botCheck";

export const AppRouter: React.FC = () => {
  
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getData(true, botCheck()));
  }, [dispatch]);

  return (
    <Router history={historyInstance}>
      <Route path="/:symbol?" component={MainPage} exact />
    </Router>
  );
};
