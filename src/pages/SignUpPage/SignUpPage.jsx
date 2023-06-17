import React, {useState} from 'react';
import portrait from "../../asset/images/register__portrait.jpg";
import "./SignUpPage.scss";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
const SignUpPage = ({setUser}) => {
    const navigate = useNavigate();
    // State to control the forms
    const [firstName, setFirstName] = useState("");
    const [isValidFName, setIsValidFName] = useState(true);
    const [lastName, setLastName] = useState("");
    const [isValidLName, setIsValidLName] = useState(true);
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [pwd, setPwd] = useState("");
    const [isValidPwd, setIsValidPwd] = useState(true);
    const [confirmPwd, setConfirmPwd] = useState("");
    const [isValidConfirmPwd, setIsValidConfirmPwd] = useState(true);
    const [location, setLocation] = useState("");
    const [isValidLocation, setIsValidLocation] = useState(true);
    const [errMsg, setErrMsg] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!firstName || !lastName || !email || !pwd || !confirmPwd || !location) {
            if(!firstName || firstName.length <4) setIsValidFName(false);
            if(!lastName || lastName.length <4) setIsValidLName(false);
            if(!email) setIsValidEmail(false);
            if(!pwd || !confirmPwd || pwd !== confirmPwd) {
                setIsValidPwd(false);
                setIsValidConfirmPwd(false);
            }
            if(!location) setIsValidLocation(false);
        }
        // Every required field is filled
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/register`, 
                                    {
                                        firstName,
                                        lastName,
                                        password: pwd,
                                        email,
                                        location
                                    });
            // Successful
            localStorage.setItem("accessToken", response.data.accessToken);
            setFirstName("");
            setLastName("");
            setEmail("");
            setPwd("");
            setConfirmPwd("");
            setLocation("");
            // Store user information in user state in the top level component
            try {
                const userInfo = await axios.get(`${process.env.REACT_APP_BASE_URL}/user`, {
                    headers: {
                        Authorization: `Bearer ${response.data.accessToken}`
                    }
                })
                setUser(userInfo.data);
            } catch(error) {
                console.log(error);
            }
            navigate("/dashboard")
        } catch(error) {
                if(error?.response?.data?.message) {
                    setErrMsg(error?.response?.data?.message);
                } else {
                    setErrMsg("Unable to create your account right now. Please try again later.")
                }
                setTimeout(()=> {
                    setErrMsg("");
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setPwd("");
                    setConfirmPwd("");
                    setLocation("");
                }, 5000);
        }
    }
    return (
        <div className="register">
            <div className="register__col1">
                <h2 className="register__title">Create an account</h2>
                <p className="register__text">BrainBox is super excited to have you!</p>
                {errMsg && <p className="register__error-msg--important">{errMsg}</p>}
                <form className="register__form" onSubmit={handleSubmit}>
                    <div className="register__form-control">
                        <div className="register__input-wrapper">
                            <input 
                                className={isValidFName ? "register__form-input register__w-100" : "register__form-input--error register__w-100" }
                                placeholder='First Name'
                                value={firstName}
                                onChange={(e)=>setFirstName(e.target.value)}
                            ></input>
                            {!isValidFName && <p className="register__error-msg">Field required. First name must be at least 3 characters.</p>}
                        </div>
                        <div className="register__input-wrapper">
                            <input 
                                className={isValidLName ? "register__form-input register__w-100" : "register__form-input--error register__w-100" }
                                placeholder='Last Name'
                                value={lastName}
                                onChange={(e)=>setLastName(e.target.value)}
                            ></input>
                            {!isValidLName && <p className="register__error-msg">Field required. Last name must be at least 3 characters.</p>}
                        </div>
                    </div>
                    <div className="register__form-control2">
                        <input 
                            className={isValidEmail ? "register__form-input" : "register__form-input--error" }
                            placeholder='Email Address'
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        ></input>
                        {!isValidEmail && <p className="register__error-msg">Field required.</p>}
                        <input 
                            className={isValidPwd ? "register__form-input" : "register__form-input--error" } 
                            placeholder='Password'
                            value={pwd}
                            onChange={(e)=>setPwd(e.target.value)}
                        ></input>
                        {!isValidPwd && <p className="register__error-msg">Field required. Password must match the confirm password</p>}
                        <input 
                            className={isValidConfirmPwd ? "register__form-input" : "register__form-input--error" }
                            placeholder='Confirm Password'
                            value={confirmPwd}
                            onChange={(e)=>setConfirmPwd(e.target.value)}
                        ></input>
                        {!isValidConfirmPwd && <p className="register__error-msg">Field required. Confirm password must match the password.</p>}
                        <input 
                            className={isValidLocation? "register__form-input" : "register__form-input--error" }
                            placeholder='Location'
                            value={location}
                            onChange={(e)=>setLocation(e.target.value)}
                        ></input>
                        {!isValidLocation && <p className="register__error-msg">Field required</p>}
                    </div>
                    <div className="register__btn-wrapper">
                        <button className="register__btn">Create an account</button>
                        <p className="register__text--small">Already have an acccount? <Link className="register__link" to="">Login</Link></p>
                    </div>
                </form>
            </div>
            <div className="register__col2">
                <img src={portrait} alt="Portrait" className="register__portrait"/>
            </div>
        </div>
    )
}

export default SignUpPage