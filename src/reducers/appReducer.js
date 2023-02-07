export const appReducer = (
  state = { name: "Rita", pingPong: "Ping", counter: 1 },
  action
) => {
  switch (action.type) {
    case "SET_NAME": {
      return {
        ...state,
        name: action.payload,
      };
    }
    case "PING": {
      console.log("ping");
      return { ...state, pingPong: "Ping" };
    }
    case "PONG": {
      console.log("pong");
      return { ...state, pingPong: "Pong" };
    }
    case "FETCH_USER_FULFILLED": {
      return { ...state, user: action.payload };
    }
    case "CLEAR_USER": {
      return { ...state, user: null };
    }
    case "INCREMENT": {
        return { ...state, counter: state.counter + 1 };
      }
    default:
      return state;
  }
};
