import React, { useState, useContext } from "react";
import AuthService from "../services/auth.service";
import AuthContext from "../contexts/auth.context";
import { NavLink } from "react-router-dom";
import Modal from "../components/Modal";
import Button from "../components/Button";

interface Props {
  isDisplayed: (value: boolean) => void;
  displayStatus: boolean;
}

const LoginPage: React.SFC<Props> = ({ isDisplayed, displayStatus }) => {
  const { setIsAuthenticated, setUserData } = useContext(AuthContext);
  const [credentiels, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState();
  const [isSubmit, setSubmit] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.currentTarget;
    setCredentials({ ...credentiels, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setSubmit(true);

    AuthService.login(credentiels)
      .then((data: any) => {
        setSubmit(false);
        setUserData({
          id: data.id,
          username: data.username,
          roles: data.roles,
          avatar: data.avatar
        });
        setIsAuthenticated(true);
        isDisplayed(false);
      })
      .catch(err => {
        console.error(err.response);
        setError("Invalid username or password.");
        setSubmit(false);
      });
  };

  return (
    <Modal isDisplayed={isDisplayed} displayStatus={displayStatus} title="Login" boxWidth={25}>
      {error && <div className="alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="form-group">
          <input
            type="text"
            className="form__input"
            placeholder="Username"
            name="username"
            id="username"
            value={credentiels.username}
            onChange={handleChange}
            required
          />
          <label htmlFor="username" className="form__label">
            Username
              </label>
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form__input"
            placeholder="Password"
            name="password"
            id="password"
            value={credentiels.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="password" className="form__label">
            Password
              </label>
        </div>
        <NavLink to={`/forgot-password`} className="link">Forgot password ?</NavLink>
        <Button isSubmit={isSubmit} icon="sign-in" text="Login" className="btn--center btn--small" />
      </form>
    </Modal >
  );
};

export default LoginPage;
