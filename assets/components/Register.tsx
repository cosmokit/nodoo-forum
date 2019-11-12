import React, { SFC, useState, useEffect, useContext } from "react";
import AuthContext from "../contexts/auth.context";
import UserService from "../services/user.service";

export interface Props {
  onClose: (value: boolean) => void;
}

const Register: SFC<Props> = ({ onClose }) => {
  const [credentiels, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
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

    if (credentiels.password !== credentiels.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: "Passwords must be the same."
      });
      setSubmit(false);
    } else {
      UserService.register({
        username: credentiels.username,
        email: credentiels.email,
        password: credentiels.password
      })
        .then((response: any) => {
          onClose(false);
          setSubmit(false);
        })
        .catch(err => {
          if (err.response.data.violations) {
            const responseErrors: any = {};
            err.response.data.violations.forEach((violation: any) => {
              responseErrors[violation.propertyPath] = violation.message;
            });
            setErrors(responseErrors);
            setSubmit(false);
          }
        });
    }
  };

  useEffect(() => {
    setOpacity(1);
    setTransform("translate(-50%, -50%) scale(1)");
  });

  return (
    <div className="modal" style={{ opacity: opacity, visibility: "visible" }}>
      <div
        className="modal__content register-box"
        style={{ opacity: opacity, transform: transform }}
      >
        <button onClick={handleClose} className="modal__close">
          &times;
        </button>
        <div className="modal__body register-box__body">
          <h2 className="modal__title heading-2">Register</h2>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="form-group">
              <input
                type="text"
                className={`form__input ${
                  errors.username ? "form__input--invalid" : ""
                }`}
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
              {errors.username && (
                <span className="form__invalid-feedback">
                  {errors.username}
                </span>
              )}
            </div>
            <div className="form-group">
              <input
                type="email"
                className={`form__input ${
                  errors.email ? "form__input--invalid" : ""
                }`}
                placeholder="Email address"
                name="email"
                id="email"
                value={credentiels.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="email" className="form__label">
                Email address
              </label>
              {errors.email && (
                <span className="form__invalid-feedback">{errors.email}</span>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                className={`form__input ${
                  errors.password ? "form__input--invalid" : ""
                }`}
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
              {errors.password && (
                <span className="form__invalid-feedback">
                  {errors.password}
                </span>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                className={`form__input ${
                  errors.confirmPassword ? "form__input--invalid" : ""
                }`}
                placeholder="Password confirmation"
                name="confirmPassword"
                id="confirmPassword"
                value={credentiels.confirmPassword}
                onChange={handleChange}
                required
              />
              <label htmlFor="confirmPassword" className="form__label">
                Password confirmation
              </label>
              {errors.confirmPassword && (
                <span className="form__invalid-feedback">
                  {errors.confirmPassword}
                </span>
              )}
            </div>
            <button
              type="submit"
              className={`btn btn--long ${isSubmit ? "btn--disabled" : ""}`}
            >
              {(!isSubmit && (
                <>
                  <svg>
                    <use xlinkHref="../img/sprite.svg#icon-user" />
                  </svg>
                  Register
                </>
              )) || <>Loading...</>}
            </button>
          </form>
        </div>
        <div className="register-box__aside">
          <button className="register-box__aside-socialMedias--twitter">
            <a href="#" title="Register with Twitter">
              <svg>
                <use xlinkHref="../img/sprite.svg#icon-twitter" />
              </svg>
            </a>
          </button>
          <button className="register-box__aside-socialMedias--facebook">
            <a href="#" title="Register with Facebook">
              <svg>
                <use xlinkHref="../img/sprite.svg#icon-facebook" />
              </svg>
            </a>
          </button>
          <button className="register-box__aside-socialMedias--github">
            <a href="#" title="Register with Github">
              <svg>
                <use xlinkHref="../img/sprite.svg#icon-github" />
              </svg>
            </a>
          </button>
          <button className="register-box__aside-socialMedias--spotify">
            <a href="#" title="Register with Spotify">
              <svg>
                <use xlinkHref="../img/sprite.svg#icon-spotify" />
              </svg>
            </a>
          </button>
          <button className="register-box__aside-socialMedias--steam">
            <a href="#" title="Register with Steam">
              <svg>
                <use xlinkHref="../img/sprite.svg#icon-steam" />
              </svg>
            </a>
          </button>
          <button className="register-box__aside-socialMedias--discord">
            <a href="#" title="Register with Discord">
              <svg>
                <use xlinkHref="../img/sprite.svg#icon-discord" />
              </svg>
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
