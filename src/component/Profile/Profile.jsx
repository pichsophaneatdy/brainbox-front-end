import React from 'react';
import "./Profile.scss";
import profile from "../../asset/images/profile.png";
const Profile = ({user}) => {
    return (
        <div className="profile">
            <div className="profile__banner">
                <img src={profile} alt="User Profile" className="profile__img" />
            </div>
            <div className="profile__content">
                <div className="profile__desc">
                    <p className="profile__name">{user.firstName} {user.lastName}</p>
                    <p className="profile__bio">I love programming to heart.</p>
                </div>
                <div className="profile__desc2">
                    <p className="profile__text">{user?.university ? user.university : "Fairleigh Dickinson University"}</p>
                    <p className="profile__text">{user?.degree ? user.degree : "B.S. in Information Technology"}</p>
                </div>
                <div className="profile__desc3">
                    <p className="profile__text">Your connections: {user.friends.length}</p>
                    <p className="profile__text">Your course: {user.enrollment.length}</p>
                </div>
            </div>
        </div>
    )
}
export default Profile