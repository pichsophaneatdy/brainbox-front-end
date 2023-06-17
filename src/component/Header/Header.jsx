import React from 'react';
import "./Header.scss";
import logo from "../../asset/images/logo_brainbox.png";
import {NavLink} from "react-router-dom";
const Header = () => {
    return (
        <header className="header">
            <img src={logo} alt="BrainBox Logo" className="header__logo" />
            {/* Navigation */}
            <div className="header__nav">
                <NavLink className="header__link" to="/about">
                    <p>About</p>
                </NavLink>
                <NavLink className="header__link" to="/about">
                    <p>Features</p>
                </NavLink>
                <NavLink className="header__link" to="/about">
                    <p>Contact</p>
                </NavLink>
            </div>
            {/* Login and Register */}
            <div className="header__action">
                <NavLink>
                    <button className="header__btn header__login">
                        Login
                    </button>
                </NavLink>
                <NavLink>
                    <button className="header__btn header__register">
                        Register
                    </button>
                </NavLink>
            </div>
        </header>
    )
}

export default Header