import "./HeaderDashboard.scss";
import logo from "../../asset/images/logo_brainbox.png";
import React from 'react'
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
// Icons
import userImage from "../../asset/icon/user (2).png";
import home from "../../asset/icon/home.png";
import network from "../../asset/icon/network.png";
import courses from "../../asset/icon/courses.png";
import messaging from "../../asset/icon/send.png";
import notification from "../../asset/icon/shopping-cart.png";
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
    if(localStorage.getItem("accessToken")) {
        return (
            <header className="header2">
                {/* Profile */}
                {
                    isModalOpen && (
                        <div className="profileModal">
                            <div className="profileModal__profile">
                                <div className="profileModal__left">
                                    <img src={User?.picturePath ? User.picturePath :userImage} alt="" className="profileModal__img" />
                                </div>
                                <div className="profileModal__right">
                                    <p className="profileModal__name">{User?.firstName} {User?.lastName}</p>
                                    <p className="profileModal__text">I love programming to heart.</p>
                                </div>
                            </div>
                            <div className="profileModal__btn-wrapper">
                                <Link to="/profileDetail" className="link">
                                    <button onClick={()=>setIsModalOpen(false)} className="profileModal__btn">View Profile</button>
                                </Link>
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
                    <Link to="/network" className="link">
                        <div className="header2__nav">
                            <img src={network} alt="Icon" className="nav__icon" />
                            <p className="nav__text">Network</p>
                        </div>
                    </Link>
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
                    {/* Marketplace */}
                    <Link className="link" to="/marketplace">
                        <div className="header2__nav">
                            <img src={notification} alt="Icon" className="nav__icon" />
                            <p className="nav__text">Marketplace</p>
                        </div>
                    </Link>
                    
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
    } else {
        return <Header />
    }
    
}

export default HeaderDashboard