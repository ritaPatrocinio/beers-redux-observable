import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { appReducer, beersReducer, configReducer } from "./reducers";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { fetchBeersEpic, fetchRandomBeersEpic } from "./epics/fetchBeers";
import { persistEpic, hidrateEpic } from "./epics/persistEpic";

export const configureStore = () => {
  const rootEpic = combineEpics(
    fetchBeersEpic,
    persistEpic,
    hidrateEpic,
    fetchRandomBeersEpic
  );

  const epicMiddleware = createEpicMiddleware();

  const rootReducer = combineReducers({
    beers: beersReducer,
    config: configReducer,
  });

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );

  epicMiddleware.run(rootEpic);

  return store;
};
