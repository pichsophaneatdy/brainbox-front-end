import "./HeaderDashboard.scss";
import logo from "../../asset/images/logo_brainbox.png";
import React from 'react'
// Icons
import search from "../../asset/icon/search.png";
import home from "../../asset/icon/home.png";
import network from "../../asset/icon/network.png";
import courses from "../../asset/icon/courses.png";
import messaging from "../../asset/icon/chat.png";
import notification from "../../asset/icon/notification.png";

const HeaderDashboard = () => {
    return (
        <header className="header2">
            {/* Left Side */}
            <div className="header2__col">
                <img src={logo} alt="BrainBox Logo" className="header2__logo" />
                <div className="header2__input">
                    <input type="text"  className="header2__search" placeholder="Search for courses" />
                </div>
            </div>
            {/* Right Side */}
            <div className="header2__col header2__col2">
                {/* Home */}
                <div className="header2__nav">
                    <img src={home} alt="Icon" className="nav__icon" />
                    <p className="nav__text">Home</p>
                </div>
                {/* Network */}
                <div className="header2__nav">
                    <img src={network} alt="Icon" className="nav__icon" />
                    <p className="nav__text">Network</p>
                </div>
                {/* Courses */}
                <div className="header2__nav">
                    <img src={courses} alt="Icon" className="nav__icon" />
                    <p className="nav__text">Courses</p>
                </div>
                {/* Messaging */}
                <div className="header2__nav">
                    <img src={messaging} alt="Icon" className="nav__icon" />
                    <p className="nav__text">Messaging</p>
                </div>
                {/* Notification */}
                <div className="header2__nav">
                    <img src={notification} alt="Icon" className="nav__icon" />
                    <p className="nav__text">Notifications</p>
                </div>
                {/* Profile
                <div className="headder2__nav">
                    <img src="" alt="Icon" className="nav__icon" />
                    <p className="nav__text"></p>
                </div> */}
            </div>
        </header>
    )
}

export default HeaderDashboard