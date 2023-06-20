import React from 'react'
import profile from "../../asset/images/profile.png";
import "./UploadPost.scss";
const UploadPost = ({setIsModalOpen}) => {
    return (
        <div className="uploadPost">
            <div className="uploadPost__row">
                <img src={profile} alt="User Profile" className="uploadPost__profile" />
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