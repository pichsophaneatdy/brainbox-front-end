import React from 'react'
import "./SetUp.scss";
import { useState, useEffect } from 'react';
import axios from "axios";
const SetUp = () => {
    const [uni, setUni] = useState("");
    const [uniResult, setUniResult] = useState([]);

    // Search for University
    useEffect(() => {
        if(uni.length > 0) {

        }
    }, [uni])
    return (
        <div className="setUp">
            <p className="setUp__title">Let's get set up!</p>
            <form className="setUp__form">
                <div className="setUp__form__control">
                    <label htmlFor="university" className="setUp__form__label">College / University</label>
                    <input 
                        id="university" 
                        value={uni} 
                        onChange={(e) => setUni(e.target.value)}
                        type="text" 
                        className="setUp__form__input" />
                </div>
            </form>
        </div>
    )
}

export default SetUp