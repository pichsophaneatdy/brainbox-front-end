import React from 'react'
import { useContext} from 'react';
import {UserContext} from "../../App";
import { useNavigate } from 'react-router-dom';
import workinprogress from "../../asset/icon/work-in-progress.png";

const LandingPage = ({setUser}) => {
    const navigate = useNavigate();
    const user = useContext(UserContext);
    if(user?.firstName) {
        navigate("/dashboard");
        return;
    }
        return (
            <div className="workinprogress">
                <img className="workinprogress__icon" src={workinprogress} alt="workinprogress" />
            </div>
        )
}

export default LandingPage