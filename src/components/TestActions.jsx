import React from "react";
import { useDispatch } from "react-redux";

// action creators
const fetchUser = (username) => ({ type: "FETCH_USER", payload: username });
const clearUser = () => ({ type: "CLEAR_USER" });

const INCREMENT_IF_ODD = "INCREMENT_IF_ODD";
const incrementIfOdd = () => ({ type: INCREMENT_IF_ODD });

export const TestActions = ({ props }) => {
  const dispatch = useDispatch();
  return (
    <>
      <button
        style={{ height: 30, width: 100, margin: 4 }}
        onClick={() => dispatch({ type: "PING" })}
      >
        {props.pingPong}
      </button>
      <button
        style={{ height: 30, width: 100, margin: 4 }}
        onClick={() =>
          props.user
            ? dispatch(clearUser())
            : dispatch(fetchUser("ritaPatrocinio"))
        }
      >
        {props.user ? "Clear User" : "Fetch User"}
      </button>
      {props.user && (
        <div style={{ fontSize: 20, margin: 4 }}>
          <p>{`username: ${props.user.login}`}</p>
          <p>{`location: ${props.user.location}`}</p>
          <p>{`company: ${props.user.company}`}</p>
          <p>{`role: ${props.user.bio}`}</p>
        </div>
      )}
      <button
        style={{ height: 30, margin: 4 }}
        onClick={() => dispatch(incrementIfOdd())}
      >
        Increment If Odd
      </button>
    </>
  );
};
