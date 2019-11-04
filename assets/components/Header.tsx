import * as React from "react";

export interface Props {}

const Header: React.SFC<Props> = () => {
  return (
    <>
      <header className="header">
        <nav className="header__nav">
          <li>
            <a href="#" className="header__link">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="header__link header__link--active">
              Forum
            </a>
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
            <a href="#" className="subheader__link">
              <svg>
                <use xlinkHref="../img/sprite.svg#icon-group" />
              </svg>
              All members
            </a>
          </li>
          <li>
            <a href="#" className="subheader__link">
              <svg>
                <use xlinkHref="../img/sprite.svg#icon-chat" />
              </svg>
              Last Topics
            </a>
          </li>
          <li>
            <a href="#" className="subheader__link">
              <svg>
                <use xlinkHref="../img/sprite.svg#icon-commenting" />
              </svg>
              Chatbox
            </a>
          </li>
        </nav>
        <div className="subheader__user-informations">
          <a href="#" className="subheader__link">
            <svg>
              <use xlinkHref="../img/sprite.svg#icon-sign-in" />
            </svg>
            Login
          </a>
          <a href="#" className="subheader__link">
            <svg>
              <use xlinkHref="../img/sprite.svg#icon-user" />
            </svg>
            Register
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
