import React, { SFC, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthService from "../services/auth.service";
import Login from "./Login";
import AuthContext from "../contexts/auth.context";

export interface Props {}

const Header: SFC<Props> = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleDropdownMenu = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
  };

  return (
    <>
      {showLoginModal && <Login onClose={setShowLoginModal} />}
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
        <div className="subheader__user-informations">
          {(!isAuthenticated && (
            <>
              <button onClick={handleLogin} className="subheader__link">
                <svg>
                  <use xlinkHref="../img/sprite.svg#icon-sign-in" />
                </svg>
                Login
              </button>
              <NavLink to="/" className="subheader__link">
                <svg>
                  <use xlinkHref="../img/sprite.svg#icon-user" />
                </svg>
                Register
              </NavLink>
            </>
          )) || (
            <>
              <NavLink to="/" className="subheader__link">
                <svg>
                  <use xlinkHref="../img/sprite.svg#icon-user" />
                </svg>
                John Doe
                <button
                  onClick={handleDropdownMenu}
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
                {showDropdown && (
                  <div className="dropdown__menu">
                    <NavLink to="#" className="dropdown__item">
                      My profile
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="dropdown__item u-text-danger"
                    >
                      <svg>
                        <use xlinkHref="../img/sprite.svg#icon-sign-out" />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </NavLink>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
