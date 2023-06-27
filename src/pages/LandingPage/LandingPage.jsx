import React from 'react'
import { useContext} from 'react';
import {UserContext} from "../../App";
import { useNavigate, Link } from 'react-router-dom';
import workinprogress from "../../asset/icon/work-in-progress.png";
import "./LandingPage.scss"; 
import Typewriter from "typewriter-effect";
// Background Image
import bg1 from "../../asset/images/zhanhui-li-1iuxWsIZ6ko-unsplash (2).jpg";
const LandingPage = ({setUser}) => {
    const navigate = useNavigate();
    const user = useContext(UserContext);
    if(user?.firstName) {
        navigate("/dashboard");
        return;
    }
        return (
            <div className="homepage">
                <div className="homepage__content">
                    <h1 className="homepage__title">Empovering University Students<br></br> with Revolutionary Tools for<br></br> Success</h1>
                    <Link to="/signUp" className="link">
                        <button className="homepage__btn">Get Started</button>
                    </Link>
                </div>
            </div>
        )
}

export default LandingPage