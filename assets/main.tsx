import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";

ReactDOM.render(
  <BrowserRouter>
    <div className="container">
      <Header />

      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>

      <Footer />
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);

import "./scss/main.scss";
