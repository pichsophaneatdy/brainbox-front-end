import React from 'react'
import "./PostModal.scss";
import { useContext, useState } from 'react';
import { UserContext } from '../../App';
// Icon and image
import profile from "../../asset/images/profile.png";
import cross from "../../asset/icon/x-button.png";
const PostModal = ({setIsModalOpen}) => {
    const User = useContext(UserContext);
    return (
        <div className="postModal">
            {/* Content */}
            <div className="postModal__content">
                {/* User Profile */}
                <div className="postModal__content__profile">
                    <div className="postModal__wrapper">
                        <img src={profile} alt="" className="postModal__content__img" />
                        <div className="postModal__content__wrapper">
                            <p className="postModal__content__name">
                                {User.firstName} {User.lastName}
                            </p>
                            <p className="postModal__content__text">
                                Post to Anyone
                            </p>
                        </div>
                    </div>
                    <button onClick={()=> setIsModalOpen(false)} className="postModal__btn">
                        <img className="postModal__icon" src={cross} alt=""/>
                    </button>
                </div>
                {/* Input Section */}
                <div className="postModal__input__section">
                    <input className="postModal__input" type="text" placeholder='What do you want to talk about'/>
                </div>
                {/* Post Button */}
                <div className="postModal__action">
                    <button className="postModal__post__btn">Post</button>
                </div>
            </div>
            
        </div>
    )
}

export default PostModal
