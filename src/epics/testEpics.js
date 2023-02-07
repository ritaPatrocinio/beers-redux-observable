import { delay, filter, mergeMap, map, withLatestFrom, of } from "rxjs";
import { ofType } from "redux-observable";
import { ajax } from "rxjs/ajax";

export const nameEpic = () =>
  of({ type: "SET_NAME", payload: "Ana" }).pipe(delay(2000));

export const pingEpic = (action$) =>
  action$.pipe(
    filter((action) => action.type === "PING"),
    delay(1000),
    map((action) => ({
      type: "PONG",
    }))
  );

// action creator
export const fetchUserFulfilled = (payload) => ({
  type: "FETCH_USER_FULFILLED",
  payload,
});

export const fetchUserEpic = (action$) =>
  action$.pipe(
    ofType("FETCH_USER"),
    mergeMap((action) => {
      return ajax
        .getJSON(`https://api.github.com/users/${action.payload}`)
        .pipe(
          map((response) => {
            return fetchUserFulfilled(response);
          })
        );
    })
  );

const INCREMENT = "INCREMENT";
const INCREMENT_IF_ODD = "INCREMENT_IF_ODD";
export const increment = () => ({ type: INCREMENT });

export const incrementIfOddEpic = (action$, state$) => {
  return action$.pipe(
    ofType(INCREMENT_IF_ODD),
    withLatestFrom(state$),
    filter(([, state]) => state.app.counter % 2 === 1),
    map(() => increment())
  );
};
