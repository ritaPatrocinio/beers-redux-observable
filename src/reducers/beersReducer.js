import {
  FETCH_FAILED,
  FETCH_FULFILLED,
  SET_STATUS,
  RESET,
} from "./beersActions";

const initialState = {
  data: [],
  status: "idle",
};

export const beersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STATUS: {
      return { ...state, status: action.payload };
    }
    case RESET: {
      return { ...state, status: "idle", messages: [] };
    }
    case FETCH_FULFILLED: {
      return {
        ...state,
        data: action.payload,
        status: "success",
        messages: [],
      };
    }
    case FETCH_FAILED: {
      return {
        ...state,
        status: "failure",
        messages: [
          {
            type: "error",
            text: action.payload,
          },
        ],
      };
    }
    default:
      return state;
  }
};
