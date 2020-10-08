/* eslint-disable no-unused-vars */
import React from 'react';

export function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <img
            src={process.env.PUBLIC_URL + 'logo.svg'}
            alt="Company logo"
            className="header__image"
          />
        </div>
        <nav className="header__nav nav">
          <a
            href="/#"
            className="nav__item"
          >
            Home
          </a>
          <a
            href="/#"
            className="nav__item"
          >
            About us
          </a>
        </nav>
      </div>
    </header>
  );
};
