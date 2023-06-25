import "./HeaderDashboard.scss";
import logo from "../../asset/images/logo_brainbox.png";
import React from 'react'
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Icons
import userImage from "../../asset/images/profile.png";
import home from "../../asset/icon/home.png";
import network from "../../asset/icon/network.png";
import courses from "../../asset/icon/courses.png";
import messaging from "../../asset/icon/chat.png";
import notification from "../../asset/icon/notification.png";
import userProfile from "../../asset/icon/user.png";
import chevron from "../../asset/icon/down.png";
import { useState } from "react";
const HeaderDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const User = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("streamChatToken");
        navigate("/login");
        setIsModalOpen(false);
    }
    return (
        <header className="header2">
            {/* Profile */}
            {
                isModalOpen && (
                    <div className="profileModal">
                        <div className="profileModal__profile">
                            <div className="profileModal__left">
                                <img src={userImage} alt="" className="profileModal__img" />
                            </div>
                            <div className="profileModal__right">
                                <p className="profileModal__name">{User?.firstName} {User?.lastName}</p>
                                <p className="profileModal__text">I love programming to heart.</p>
                            </div>
                        </div>
                        <div className="profileModal__btn-wrapper">
                            <button className="profileModal__btn">View Profile</button>
                        </div>
                        <p onClick={()=>handleSignOut()} className="profileModal__signOut">Sign Out</p>
                    </div>
                )
            }
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
                <Link className="link" to="/dashboard">
                    <div className="header2__nav">
                        <img src={home} alt="Icon" className="nav__icon" />
                        <p className="nav__text">Home</p>
                    </div>
                </Link>
                {/* Network */}
                <div className="header2__nav">
                    <img src={network} alt="Icon" className="nav__icon" />
                    <p className="nav__text">Network</p>
                </div>
                {/* Courses */}
                <Link to="/courseManagement" className="link">
                    <div className="header2__nav">
                        <img src={courses} alt="Icon" className="nav__icon" />
                        <p className="nav__text">Courses</p>
                    </div>
                </Link>
                {/* Messaging */}
                <Link to="/chat" className="link">
                    <div className="header2__nav">
                        <img src={messaging} alt="Icon" className="nav__icon" />
                        <p className="nav__text">Messaging</p>
                    </div>
                </Link>
                {/* Notification */}
                <div className="header2__nav">
                    <img src={notification} alt="Icon" className="nav__icon" />
                    <p className="nav__text">Notifications</p>
                </div>
                {/* Profile */}
                <div className="header2__nav">
                    <img src={userProfile} alt="Icon" className="nav__icon" />
                    <div className="header2__nav-wrapper">
                        <p className="nav__text">Me</p>
                        <img onClick={()=> setIsModalOpen(!isModalOpen)} src={chevron} alt="Cheveron" className="nav__icon--small" />
                    </div>
                    
                </div>
            </div>
        </header>
    )
}

export default HeaderDashboard