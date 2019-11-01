import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

const Root: React.SFC<any> = () => (
  <BrowserRouter>
    <main className="container">
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </main>
  </BrowserRouter>
);

ReactDOM.render(<Root />, document.getElementById("root"));

import "./scss/main.scss";
