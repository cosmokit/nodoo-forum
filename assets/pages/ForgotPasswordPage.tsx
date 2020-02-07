import React, { useState, FormEvent } from "react";
import { Helmet } from 'react-helmet'
import userService from "../services/user.service";
import Button from "../components/Button";

interface Props { }

const ForgotPasswordPage: React.SFC<Props> = () => {
    const [email, setEmail] = useState("");
    const [isSubmit, setSubmit] = useState(false);
    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    const handleChange = (event: any) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmit(true);

        userService
            .sendResetPasswordEmail(email)
            .then(response => {
                console.log(response);
                setSubmit(false);
                setEmail("");
                setSuccess("An email has been sent to your email address.");
                setError(null);
                setTimeout(() => {
                    setSuccess(null);
                }, 7000);
            })
            .catch(err => {
                console.error(err);
                setError("Invalid email address.");
                setSuccess(null);
                setTimeout(() => {
                    setError(null);
                }, 7000);
                setSubmit(false);
            });
    };

    return (
        <>
            <Helmet>
                <title>Forgot password ? - Nodoo Forum</title>
            </Helmet>
            <div className="forgotPasswordPage">
                <h1>Forgot password ?</h1>
                <p>
                    In order to reset your password, please enter the email address linked to your account in the field below, an email containing a link to change your password will be sent to you.
              </p>
                {success && <div className="alert-success">{success}</div>}
                {error && <div className="alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form__input"
                            placeholder="Email address"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <Button isSubmit={isSubmit} className="btn--center btn--small btn--square" icon="envelope" text="Submit" />
                </form>
                <hr />
                <div className="alert-info">
                    If you do not remember your email address, please
                    contact an administrator.
              </div>
            </div>
        </>
    );
};

export default ForgotPasswordPage;
