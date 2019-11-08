import React, { useState } from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthService from "./services/auth.service";
import AuthContext from "./contexts/auth.context";

AuthService.load();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthService.isAuthenticated()
  );
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <BrowserRouter>
        <div className="container">
          <Header />

          <main className="main">
            <Switch>
              <Route exact path="/" component={HomePage} />
            </Switch>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

import "./scss/main.scss";
