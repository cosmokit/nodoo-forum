import React, { SFC, useState } from "react";
import userService from "../services/user.service";

export interface Props {
  match: any;
  history: any;
}

const ResetPasswordPage: React.SFC<Props> = props => {
  const [credentials, setCredentials] = useState({
    password: "",
    confirmPassword: ""
  });
  const [isSubmit, setSubmit] = useState(false);
  const token: string = props.match.params.token;
  const [error, setError] = useState();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setSubmit(true);

    if (credentials.password !== credentials.confirmPassword) {
      setError("Passwords must be the same.");
      setSubmit(false);
      return;
    }

    userService
        .resetPassword(token, credentials.password)
        .then(() => {
          setSubmit(false);
          props.history.replace('/');
        })
        .catch(err => {
          console.error(err);
          setError("An error occured during the process, please try again later.");
          setSubmit(false);
        });
  };

  return (
    <div className="resetPasswordPage">
      <h1>Reset password</h1>
      <p>Please enter your new password in the field below, once done you can log in.</p>
      {error && <div className="alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="password"
            className="form__input"
            id="password"
            name="password"
            placeholder="New Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="password" className="form__label">
            New Password
          </label>
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form__input"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={credentials.confirmPassword}
            onChange={handleChange}
            required
          />
          <label htmlFor="confirmPassword" className="form__label">
            Confirm Password
          </label>
        </div>
        <button
            type="submit"
            className={`btn btn--center ${
                isSubmit ? "btn--disabled" : ""
            }`}
        >
          {(!isSubmit && (
              <>
                <svg>
                  <use xlinkHref="../img/sprite.svg#icon-pencil" />
                </svg>
                Change
              </>
          )) || <>Loading...</>}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
