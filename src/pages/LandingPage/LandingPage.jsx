import React from 'react'
import { useContext, useState, useEffect} from 'react';
import {UserContext} from "../../App";
import { useNavigate, Link } from 'react-router-dom';
import workinprogress from "../../asset/icon/work-in-progress.png";
import "./LandingPage.scss"; 
import Typewriter from "typewriter-effect";
// Background Image
import bg1 from "../../asset/images/zhanhui-li-1iuxWsIZ6ko-unsplash (2).jpg";
import bg2 from "../../asset/images/darya-tryfanava-d55fhArDES0-unsplash.jpg";
import bg3 from "../../asset/images/dorin-seremet-5iU2A4fW6YA-unsplash.jpg";
import bg4 from "../../asset/images/vadim-sherbakov-d6ebY-faOO0-unsplash.jpg";
const LandingPage = ({setUser}) => {
    const navigate = useNavigate();
    const user = useContext(UserContext);
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [bg1, bg2, bg3, bg4];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev+1) % images.length);
        }, 2500);
        return () => clearInterval(interval);
    }, [images.length]);

    if(user?.firstName) {
        navigate("/dashboard");
        return;
    }
        return (
            <div className="homepage" 
                style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.35)), url(${images[currentIndex]})`}}>
                <div className="homepage__content">
                    <h1 className="homepage__title">BrainBox: Empowering University Students<br></br> with Tools for<br></br> Success</h1>
                    <Link to="/signUp" className="link">
                        <button className="homepage__btn">Get Started</button>
                    </Link>
                </div>
            </div>
        )
}

export default LandingPage