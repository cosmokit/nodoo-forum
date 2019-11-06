import * as React from "react";

export interface Props {}

const Footer: React.SFC<Props> = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer__list">
          <h4 className="footer__heading">Navigation</h4>
          <div className="footer__links">
            <a href="#" className="footer__link">
              Home
            </a>
            <a href="#" className="footer__link">
              Forum
            </a>
          </div>
        </div>
        <div className="footer__list">
          <h4 className="footer__heading">About</h4>
          <div className="footer__links">
            <a href="#" className="footer__link">
              About
            </a>
            <a href="#" className="footer__link">
              Terms and rules
            </a>
            <a href="#" className="footer__link">
              Privacy policy
            </a>
            <a href="#" className="footer__link">
              Contact
            </a>
          </div>
        </div>
        <div className="footer__list">
          <h4 className="footer__heading">Social Medias</h4>
          <div className="footer__links footer__socialMedias">
            <a target="_blank" href="#">
              <svg className="footer__icon footer__icon--twitter">
                <use xlinkHref="../img/sprite.svg#icon-twitter" />
              </svg>
            </a>
            <a target="_blank" href="#">
              <svg className="footer__icon footer__icon--facebook">
                <use xlinkHref="../img/sprite.svg#icon-facebook" />
              </svg>
            </a>
            <a target="_blank" href="https://www.linkedin.com/in/alex-chesnay/">
              <svg className="footer__icon footer__icon--linkedin">
                <use xlinkHref="../img/sprite.svg#icon-linkedin" />
              </svg>
            </a>
            <a target="_blank" href="https://github.com/Warziik/nodoo-forum">
              <svg className="footer__icon footer__icon--github">
                <use xlinkHref="../img/sprite.svg#icon-github" />
              </svg>
            </a>
          </div>
        </div>
        <div className="footer__list">
          <h4 className="footer__heading">Language</h4>
          <div className="footer__links">
            <a href="#" className="footer__link">
              <img src="../img/en.svg" alt="United Kingdom Flag" />
              English (UK)
            </a>
          </div>
        </div>
      </footer>
      <div className="subfooter">
        <p>
          Developed and designed by{" "}
          <a target="_blank" href="https://alex-chesnay.fr">
            Alex Chesnay (Warzik)
          </a>
          . LICENSE{" "}
          <a
            target="_blank"
            href="https://github.com/Warziik/nodoo-forum/blob/master/LICENSE"
          >
            MIT
          </a>
          .{" "}
          <a target="_blank" href="https://github.com/Warziik/nodoo-forum">
            Source code
          </a>
        </p>
      </div>
    </>
  );
};

export default Footer;
