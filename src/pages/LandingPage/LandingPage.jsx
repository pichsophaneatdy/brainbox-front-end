import React from 'react'
import { useContext } from 'react';
import {UserContext} from "../../App";

const LandingPage = () => {
    const user = useContext(UserContext);
    console.log(user)
    if(user?.name) {
        return <h1>Welcome to BrainBox, {user.name}</h1>
    }
    return (
        <div>LandingPage</div>
    )
}

export default LandingPage