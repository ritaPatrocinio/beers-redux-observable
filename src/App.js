import logo from "./redux-observable.svg";
import "./App.css";
import { Beers } from "./components";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img
          style={{ height: 150, width: 150, margin: 4 }}
          src={logo}
          className="App-logo"
          alt="logo"
        />

        <Beers />
      </header>
    </div>
  );
}

export default App;
