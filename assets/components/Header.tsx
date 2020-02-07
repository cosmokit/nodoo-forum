import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthService from "../services/auth.service";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AuthContext from "../contexts/auth.context";
import Dropdown from "./Dropdown";

interface Props { }

const Header: React.SFC<Props> = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const {
    isAuthenticated,
    setIsAuthenticated,
    userData,
    setUserData
  } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    setUserData({});
  };

  return (
    <>
      {showLoginModal && <LoginPage isDisplayed={setShowLoginModal} displayStatus={showLoginModal} />}
      {showRegisterModal && <RegisterPage isDisplayed={setShowRegisterModal} displayStatus={showRegisterModal} />}

      <header className="header">
        <nav className="header__nav">
          <li>
            <NavLink to="/" className="header__link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="header__link header__link--active">
              Forum
            </NavLink>
          </li>
        </nav>
        {/* <img src="#" alt="Website logo" className="header__logo" /> */}
        <div className="header__logo">Nodoo Forum</div>
        <a href="#" className="header__link header__searchbar">
          &nbsp;
        </a>
      </header>
      <div className="subheader">
        {/*
        <nav className="subheader__nav">
          <li>
            <NavLink to="/" className="subheader__link">
              <svg>
                <use xlinkHref="../img/sprite.svg#icon-group" />
              </svg>
              All members
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="subheader__link">
              <svg>
                <use xlinkHref="../img/sprite.svg#icon-chat" />
              </svg>
              Last topics
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="subheader__link">
              <svg>
                <use xlinkHref="../img/sprite.svg#icon-commenting" />
              </svg>
              Chatbox
            </NavLink>
          </li>
        </nav>
        */}
        <div className="subheader__user-informations">
          {(!isAuthenticated && (
            <>
              <button
                onClick={() => setShowLoginModal(true)}
                className="subheader__link subheader__user-informations-btn"
              >
                <svg>
                  <use xlinkHref="../img/sprite.svg#icon-sign-in" />
                </svg>
                Login
              </button>
              <button
                onClick={() => setShowRegisterModal(true)}
                className="subheader__link subheader__user-informations-btn"
              >
                <svg>
                  <use xlinkHref="../img/sprite.svg#icon-user" />
                </svg>
                Register
              </button>
            </>
          )) || (
              <>
                <div className="subheader__user-informations-name">
                  <img src={`../img/users/${userData.avatar}`} />
                  {userData.username}
                </div>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="dropdown__btn u-margin-left-sm"
                >
                  {(!showDropdown && (
                    <svg>
                      <use xlinkHref="../img/sprite.svg#icon-chevron-down" />
                    </svg>
                  )) || (
                      <svg>
                        <use xlinkHref="../img/sprite.svg#icon-chevron-up" />
                      </svg>
                    )}
                </button>
                {showDropdown && <Dropdown isDisplayed={setShowDropdown} displayStatus={showDropdown}>
                  <NavLink
                    to={`/profile/${userData.id}`}
                    className="dropdown__item"
                  >
                    <svg>
                      <use xlinkHref="../img/sprite.svg#icon-user" />
                    </svg>
                    Profile
                  </NavLink>
                  <button onClick={handleLogout} className="dropdown__item">
                    <svg>
                      <use xlinkHref="../img/sprite.svg#icon-sign-out" />
                    </svg>
                    Logout
                  </button>
                </Dropdown>}
              </>
            )}
        </div>
      </div>
    </>
  );
};

export default Header;
