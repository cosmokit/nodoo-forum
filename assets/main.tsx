import React, { useState } from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SubcategoryPage from "./pages/SubcategoryPage";
import TopicPage from "./pages/TopicPage";
import CreateTopicPage from "./pages/CreateTopicPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthService from "./services/auth.service";
import AuthContext from "./contexts/auth.context";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import "./scss/main.scss";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

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
              <Route
                path="/reset-password/:token"
                component={ResetPasswordPage}
              />
              <Route path="/forgot-password" component={ForgotPasswordPage} />
              <Route path="/profile/:id" component={ProfilePage} />
              <Route
                path="/topics/new"
                render={props =>
                  isAuthenticated ? (
                    <CreateTopicPage {...props} />
                  ) : (
                    <Redirect to="/" />
                  )
                }
              />
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
