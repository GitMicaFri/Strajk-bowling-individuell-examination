import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";

if (import.meta.env.MODE === "development") {
  import("./mocks/browser").then(({ worker }) => {
    worker.start();
  });
}

ReactDOM.render(<App />, document.getElementById("root"));



