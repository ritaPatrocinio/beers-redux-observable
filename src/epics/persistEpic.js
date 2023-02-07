import { ofType } from "redux-observable";
import { withLatestFrom, map, tap, ignoreElements, of, EMPTY } from "rxjs";
import { setConfig, SET_CONFIG } from "../reducers/configActions";

export const CACHE_KEY = "ro-config";

export const persistEpic = (action$, state$) => {
  return action$.pipe(
    ofType(SET_CONFIG),
    withLatestFrom(state$.pipe(map((x) => x?.config))),
    tap(([action, config]) => {
      localStorage.setItem(CACHE_KEY, JSON.stringify(config));
    }),
    ignoreElements()
  );
};

export const hidrateEpic = (action$, state$) => {
  const maybeConfig = localStorage.getItem(CACHE_KEY);
  if (typeof maybeConfig === "string") {
    try {
      const parsed = JSON.parse(maybeConfig);
      return of(setConfig(parsed));
    } catch (e) {
      return EMPTY;
    }
  }
  return EMPTY;
};
