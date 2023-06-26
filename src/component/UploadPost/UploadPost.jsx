import React from 'react'
import profile from "../../asset/icon/user (2).png";
import "./UploadPost.scss";
import { useContext } from 'react';
import { UserContext } from '../../App';

const UploadPost = ({setIsModalOpen}) => {
    const User = useContext(UserContext);

    return (
        <div className="uploadPost">
            <div className="uploadPost__row">
                <img src={User?.picturePath ? User.picturePath : profile} alt="User Profile" className="uploadPost__profile" />
                <input onFocus={()=>setIsModalOpen(true)} type="text" className="uploadPost__input" placeholder='Start a post' />
            </div>
            <div className="uploadPost__row uploadPost__row2">
                <button onClick={()=>setIsModalOpen(true)} className="uploadPost__btn">Photo</button>
                <button onClick={()=>setIsModalOpen(true)} className="uploadPost__btn">Review</button>
                <button onClick={()=>setIsModalOpen(true)} className="uploadPost__btn">Article</button>
                <button onClick={()=>setIsModalOpen(true)} className="uploadPost__btn">Video</button>
            </div>
        </div>
    )
}

export default UploadPost 