import React from "react";
import { connect } from "react-redux";
import { search, cancel, random } from "../reducers/beersActions";
import { BeersList } from ".";
import { setConfig } from "../reducers/configActions";

export function Beers(props) {
  const { data, status, messages, search, cancel, config, setConfig, random } =
    props;
  return (
    <>
      <div className="App-inputs">
        <select
          name="per-page"
          defaultValue={config.perPage}
          onChange={(e) => setConfig({ perPage: Number(e.target.value) })}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
            <option key={val} value={val}>
              {val} results
            </option>
          ))}
        </select>
        <button onClick={random} type="button" disabled={status === "pending"}>
          Random
        </button>
        <input
          type="text"
          placeholder="Search beers"
          onChange={(e) => search(e.target.value)}
        ></input>
        {status === "pending" && (
          <div style={{ height: 21.2, display: "flex" }}>
            <button type="cancel" onClick={cancel}>
              Cancel
            </button>
            <span className="App-spinner">
              <img alt="loader" src={"/ajax-loader.gif"} />
            </span>
          </div>
        )}
      </div>
      {status === "success" && data.length > 0 && (
        <div className="App-content">
          <BeersList beers={data}></BeersList>
        </div>
      )}
      {status === "failure" && (
        <div style={{ color: "#fff" }}>
          <p>Oops! {messages[0].text}</p>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  ...state.beers,
  config: state.config,
});

export default connect((state) => mapStateToProps(state), {
  search,
  cancel,
  setConfig,
  random,
})(Beers);
