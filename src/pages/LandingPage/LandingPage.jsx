import React from 'react'
import { useContext} from 'react';
import {UserContext} from "../../App";
import { useNavigate } from 'react-router-dom';


const LandingPage = ({setUser}) => {
    const navigate = useNavigate();
    const user = useContext(UserContext);
    if(user?.firstName) {
        navigate("/dashboard");
        return;
    }
        return (
            <div>LandingPage</div>
        )
}

export default LandingPage