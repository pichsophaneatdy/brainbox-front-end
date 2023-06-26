import React from 'react';
import "./Profile.scss";
import {useState, useEffect} from "react";
import avatar from "../../asset/icon/user (2).png";
import axios from "axios";
import { useLocation } from 'react-router-dom';

const Profile = ({user}) => {
    const [uni, setUni] = useState({});
    const [degree, setDegree] = useState({});
    const numberOfCourse = user?.enrollment?.current?.length + user?.enrollment?.past?.length;
    const location = useLocation();
    useEffect(() => {
        if(user?.university) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/university/singleUniversity/${user.university}`)
                .then((response) => setUni(response.data))
                .catch((error) => console.log(error))
        }
    }, [user?.university, location])

    useEffect(() => {
        if(user?.degree) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/university/singleDegree/${user.degree}`)
                .then((response) => setDegree(response.data))
                .catch((error) => console.log(error))
        }
    }, [user?.degree, location])
    return (
        <div className="profile">
            <div className="profile__banner">
                <img src={user?.picturePath ? user.picturePath : avatar} alt="User Profile" className="profile__img" />
            </div>
            <div className="profile__content">
                <div className="profile__desc">
                    <p className="profile__name">{user.firstName} {user.lastName}</p>
                    <p className="profile__bio">I love programming to heart.</p>
                </div>
                <div className="profile__desc2">
                    <p className="profile__text">{uni ? uni.name : "Fairleigh Dickinson University"}</p>
                    <p className="profile__text">{degree ? degree.name : "B.S. in Information Technology"}</p>
                </div>
                <div className="profile__desc3">
                    <p className="profile__text">Your connections: {user?.friends?.length}</p>
                    <p className="profile__text">Your course: {numberOfCourse}</p>
                </div>
            </div>
        </div>
    )
}
export default Profile