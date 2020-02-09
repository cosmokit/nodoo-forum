import React, { useState } from "react";
import UserService from "../services/user.service";
import Modal from "../components/Modal";
import Button from "../components/Button";
interface Props {
  isDisplayed: (value: boolean) => void;
  displayStatus: boolean;
}

const RegisterPage: React.SFC<Props> = ({ isDisplayed, displayStatus }) => {
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
  const [isSubmit, setSubmit] = useState(false);

  const handleChange = (event: any) => {
    const { name, value } = event.currentTarget;
    setCredentials({ ...credentiels, [name]: value });
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
        .then(() => {
          isDisplayed(false);
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

  return (
    <Modal isDisplayed={isDisplayed} displayStatus={displayStatus} title="Register" boxWidth={30}>
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
            autoFocus
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
        <Button isSubmit={isSubmit} className="btn--long" icon="user" text="Register" />
      </form>
    </Modal>

  );
};

export default RegisterPage;
