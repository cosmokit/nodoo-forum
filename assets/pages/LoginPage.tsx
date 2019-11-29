import React, { SFC, useState, useEffect, useContext } from "react";
import AuthService from "../services/auth.service";
import AuthContext from "../contexts/auth.context";

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
      .then(() => {
        setSubmit(false);
        setUserData({ username: credentiels.username });
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
        <div className="login-box__aside">
          <button className="login-box__aside-socialMedias--twitter">
            <a href="#" title="Login with Twitter">
              <svg>
                <use xlinkHref="../img/sprite.svg#icon-twitter" />
              </svg>
            </a>
          </button>
          <button className="login-box__aside-socialMedias--facebook">
            <a href="#" title="Login with Facebook">
              <svg>
                <use xlinkHref="../img/sprite.svg#icon-facebook" />
              </svg>
            </a>
          </button>
          <button className="login-box__aside-socialMedias--github">
            <a href="#" title="Login with Github">
              <svg>
                <use xlinkHref="../img/sprite.svg#icon-github" />
              </svg>
            </a>
          </button>
          <button className="login-box__aside-socialMedias--spotify">
            <a href="#" title="Login with Spotify">
              <svg>
                <use xlinkHref="../img/sprite.svg#icon-spotify" />
              </svg>
            </a>
          </button>
          <button className="login-box__aside-socialMedias--steam">
            <a href="#" title="Login with Steam">
              <svg>
                <use xlinkHref="../img/sprite.svg#icon-steam" />
              </svg>
            </a>
          </button>
          <button className="login-box__aside-socialMedias--discord">
            <a href="#" title="Login with Discord">
              <svg>
                <use xlinkHref="../img/sprite.svg#icon-discord" />
              </svg>
            </a>
          </button>
        </div>
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
            <button
              type="submit"
              className={`btn btn--long ${isSubmit ? "btn--disabled" : ""}`}
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
