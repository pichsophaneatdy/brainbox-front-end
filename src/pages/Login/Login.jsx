import React, {useState, useContext, useEffect} from 'react';
import portrait from "../../asset/images/register__portrait.jpg";
import "./Login.scss";
import { UserContext } from '../../App';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";


const Login = ({setUser}) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [pwd, setPwd] = useState("");
    const [isValidPwd, setIsValidPwd] = useState(true);
    const [errMsg, setIsErrMsg] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!email || !pwd) {
            if(!email) {
                setIsValidEmail(false);
            }
            if(!pwd) {
                setIsValidPwd(false);
            }
            return;
        }
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`, {
                email,
                password: pwd
            })
            // Set access token to local storage
            localStorage.setItem("accessToken", response?.data?.accessToken);
            localStorage.setItem("streamChatToken", response.data.streamChatToken);
            setEmail("");
            setPwd("");
            // Set user to user context
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
            navigate("/dashboard");
        } catch(error){
            if(error?.response?.data?.message) {
                setIsErrMsg(error.response.data.message)
            } else {
                setIsErrMsg("Unable to into your account right now. Please try again later")
            }
            setTimeout(() => {
                setIsErrMsg("");
                setEmail("");
                setPwd("");
            }, 5000)
        }
        
    }
    return (
        <div className="login">
            <div className="login__col1">
                <h2 className="login__title">Login</h2>
                <p className="login__text">BrainBox is super excited to have you back!</p>
                {errMsg && <p className="login__error-msg--important">{errMsg}</p>}
                <form className="login__form" onSubmit={handleSubmit}>
                    <div className="login__form-control2">
                        <input 
                            className={isValidEmail ? "login__form-input" : "login__form-input--error" }
                            placeholder='Email Address'
                            value={email}
                            onChange={(e)=>{
                                setEmail(e.target.value);
                            }}
                        ></input>
                        {!isValidEmail && <p className="login__error-msg">Field required.</p>}
                        <input 
                            className={isValidPwd ? "login__form-input" : "login__form-input--error" } 
                            placeholder='Password'
                            value={pwd}
                            onChange={(e)=>{
                                setPwd(e.target.value)}
                            }
                        ></input>
                        {!isValidPwd && <p className="login__error-msg">Field required.</p>}
                    </div>
                    <div className="login__btn-wrapper">
                        <button className="login__btn">Login</button>
                        <p className="login__text--small">Doesn't have an account? <Link className="login__link" to="/signUp">Register</Link></p>
                    </div>
                </form>
            </div>
            <div className="login__col2">
                <img src={portrait} alt="Portrait" className="login__portrait"/>
            </div>
        </div>
    )
}

export default Login