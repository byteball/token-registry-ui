import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { dataReducer } from "./reducers/data";
import { modalsReducer } from "./reducers/modals";
import { settingsReducer } from "./reducers/settings";

import socket from "../services/socket";
import { activeReducer } from "./reducers/active";

const rootReducer = combineReducers({
  active: activeReducer,
  data: dataReducer,
  modals: modalsReducer,
  settings: settingsReducer,
});

const persistConfig = {
  key: "tokens",
  storage,
  whitelist: ["settings", "active"],
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    persistedReducer,
    compose(
      applyMiddleware(thunk.withExtraArgument(socket)),
      composeEnhancers()
    )
  );

  return { store, persistor: persistStore(store) };
};
