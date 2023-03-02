import { useState } from "react";
import { TimeDisplay } from "./components/TimeDisplay";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <div className="Header">
        <TimeDisplay value={40} />
        <div className="Head">
          <span role="img" aria-label="face">
            😁
          </span>
        </div>
        <TimeDisplay value={10} />
      </div>
      <div className="Body">Body</div>
    </div>
  );
}

export default App;
