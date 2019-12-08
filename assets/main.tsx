import React, { useState } from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SubcategoryPage from "./pages/SubcategoryPage";
import TopicPage from "./pages/TopicPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthService from "./services/auth.service";
import AuthContext from "./contexts/auth.context";
import NotFoundPage from "./pages/NotFoundPage";

AuthService.load();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthService.isAuthenticated()
  );
  const [userData, setUserData] = useState(AuthService.getUserData());
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userData, setUserData }}
    >
      <BrowserRouter>
        <div className="container">
          <Header />

          <main className="main">
            <Switch>
              <Route path="/topics/:slug--:id" component={TopicPage} />
              <Route path="/:slug--:id" component={SubcategoryPage} />
              <Route exact path="/" component={HomePage} />
              <Route path="*" component={NotFoundPage} />
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
