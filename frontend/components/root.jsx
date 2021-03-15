import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import React from 'react'

const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);

export default Root

//test2