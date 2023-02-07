import { ajax } from "rxjs/ajax";
import {
  catchError,
  concat,
  debounceTime,
  delay,
  filter,
  forkJoin,
  fromEvent,
  map,
  merge,
  of,
  race,
  switchMap,
  takeUntil,
  withLatestFrom,
} from "rxjs";
import {
  CANCEL,
  fetchFailed,
  fetchFulfilled,
  RANDOM,
  reset,
} from "../reducers/beersActions";
import { ofType } from "redux-observable";
import { setStatus, SEARCH } from "../reducers/beersActions";

const search = (APIbase, perPage, term) =>
  `${APIbase}?beer_name=${encodeURIComponent(term)}&per_page=${perPage}`;

const random = (APIbase) => `${APIbase}/random`;

export const fetchRandomBeersEpic = (action$, state$) =>
  action$.pipe(
    ofType(RANDOM),
    withLatestFrom(state$.pipe(map((x) => x?.config))),
    switchMap(([, config]) => {
      const reqs = [...Array(config.perPage)].map(() =>
        ajax.getJSON(random(config.APIbase)).pipe(map((x) => x[0]))
      );

      const ajax$ = forkJoin(reqs).pipe(
        map((resp) => fetchFulfilled(resp)),
        catchError((err) => of(fetchFailed(err.response.message)))
      );

      const blocker$ = merge(
        action$.pipe(ofType(CANCEL)),
        fromEvent(document, "keyup").pipe(
          filter((evt) => evt.key === "Escape" || evt.key === "Esc")
        )
      ).pipe(map(() => reset()));

      return concat(of(setStatus("pending")), race(ajax$, blocker$));
    })
  );

export const fetchBeersEpic = (action$, state$) =>
  action$.pipe(
    ofType(SEARCH),
    debounceTime(500), // each action waits 500ms before going through to switchMap()
    filter(({ payload }) => payload.trim() !== ""),
    withLatestFrom(state$.pipe(map((x) => x?.config))),
    switchMap(([{ payload }, config]) => {
      const ajax$ = ajax
        .getJSON(search(config.APIbase, config.perPage, payload))
        .pipe(
          map((resp) => fetchFulfilled(resp)),
          delay(2000),
          catchError((err) => of(fetchFailed(err.response.message)))
        );

      const blocker$ = merge(
        action$.pipe(ofType(CANCEL)),
        fromEvent(document, "keyup").pipe(
          filter((evt) => evt.key === "Escape" || evt.key === "Esc")
        )
      ).pipe(map(() => reset()));

      return concat(of(setStatus("pending")), race(ajax$, blocker$));
    })
  );




  
//what we really want them to do is have a race. We want to subscribe to both of these.
//The one who emits a value first, we want that to cause the other one to be unsubscribed to.
//when we get values from one, it causes the other to be unsubscribed.

//If we fill this out, you can see it made a number of network requests. They were canceled mid-flight.
//We finally made one with school there. This feature of canceling in-flight requests is something we get
//for free because we used switchMap.

// Because this action fires for every keystroke, we end up executing this function once for each action.
// That means that an AJAX request begins, but before it can complete, another action comes through.
// What switchMap does is it will unsubscribe to whatever you returned here. Then it will execute the function again,
// creating a new request.

//If the user selected five, this will become an array of five elements.
//We don't care about the elements, we just want to map that into five different AJAX requests.
//Now this is going to be a plain array that inside it contains a number of observables that are
//not making AJAX requests yet. They're just sitting there waiting to be subscribed to.
//Then we just need something from Rx that can take this array of observables, subscribe to them all,
//and give us the results back in one array. For that we can use forkJoin(reqs).
