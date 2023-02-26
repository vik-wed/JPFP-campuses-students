import React from "react";
import { createRoot } from "react-dom/client";
// import router:
import { BrowserRouter as Router } from "react-router-dom";
// import Provider to be able to access the redux store + import store:
import { Provider } from "react-redux";
import store from "./store";

import { Main } from "./components";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Router>
    <Provider store={store}>
      <Main />
    </Provider>
  </Router>
);
