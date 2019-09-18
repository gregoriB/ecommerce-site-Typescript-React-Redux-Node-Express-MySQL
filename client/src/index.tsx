import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./store/index";

import "./styles/normalize.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/body.css";
import "./fontAwesome/fontawesome";

import App from "./App";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
