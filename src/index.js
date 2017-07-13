import { AppContainer } from "react-hot-loader";
import App from "./components/App";
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById("progress_chart")
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept();
}
