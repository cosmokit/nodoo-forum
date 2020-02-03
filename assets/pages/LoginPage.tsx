import React, { SFC, useState, useEffect, useContext, useReducer } from "react";
import AuthService from "../services/auth.service";
import AuthContext from "../contexts/auth.context";
import { NavLink } from "react-router-dom";

export interface Props {
  onClose: (value: boolean) => void;
}

const LoginPage: SFC<Props> = ({ onClose }) => {
  const { setIsAuthenticated, setUserData } = useContext(AuthContext);
  const [credentiels, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState();
  const [opacity, setOpacity] = useState(0);
  const [transform, setTransform] = useState(
    "translate(-50%, -50%) scale(0.25)"
  );
  const [isSubmit, setSubmit] = useState(false);

  const handleChange = (event: any) => {
    const { name, value } = event.currentTarget;
    setCredentials({ ...credentiels, [name]: value });
  };

  const handleClose = () => {
    onClose(false);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

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
        onClose(false);
      })
      .catch(err => {
        console.error(err.response);
        setError("Invalid username or password.");
        setSubmit(false);
      });
  };

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      setOpacity(1);
      setTransform("translate(-50%, -50%) scale(1)");
    }

    return () => {
      isSubscribed = false;
    };
  });

  return (
    <div className="modal" style={{ opacity: opacity, visibility: "visible" }}>
      <div
        className="modal__content login-box"
        style={{ opacity: opacity, transform: transform }}
      >
        <button onClick={handleClose} className="modal__close">
          &times;
        </button>
        <div className="modal__body login-box__body">
          <h2 className="modal__title heading-2">Login</h2>
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
            <button
              type="submit"
              className={`btn btn--center btn--small ${isSubmit ? "btn--disabled" : ""}`}
            >
              {(!isSubmit && (
                <>
                  <svg>
                    <use xlinkHref="../img/sprite.svg#icon-sign-in" />
                  </svg>
                  Login
                </>
              )) || <>Loading...</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
