export const FETCH_FULFILLED = "FETCH_FULFILLED";
export const SET_STATUS = "SET_STATUS";
export const FETCH_DATA = "FETCH_DATA";
export const FETCH_FAILED = "FETCH_FAILED";
export const SEARCH = "SEARCH";
export const CANCEL = "CANCEL";
export const RESET = "RESET";
export const RANDOM = "RANDOM";

export const fetchFulfilled = (beers) => ({
  type: FETCH_FULFILLED,
  payload: beers,
});

export const setStatus = (status) => ({
  type: SET_STATUS,
  payload: status,
});

export const fetchData = () => ({
  type: FETCH_DATA,
});

export const fetchFailed = (message) => ({
  type: FETCH_FAILED,
  payload: message,
});

export const search = (input) => ({
  type: SEARCH,
  payload: input,
});

export const cancel = () => ({
  type: CANCEL,
});

export const reset = () => ({
  type: RESET,
});

export const random = () => ({
  type: RANDOM,
});
