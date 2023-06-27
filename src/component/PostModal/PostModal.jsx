import React from 'react'
import "./PostModal.scss";
import { useContext, useState } from 'react';
import { UserContext } from '../../App';

// Icon and image
import profile from "../../asset/icon/user (2).png";
import cross from "../../asset/icon/x-button.png";
import axios from "axios";

const PostModal = ({setIsModalOpen}) => {
    const User = useContext(UserContext);
    const [content, setContent] = useState("");
    const [image, SetImage] = useState(null);
    const [success, setSuccess] = useState("Post");

    const handleImageChange = (e) => {
        SetImage(e.target.files[0]);
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check for empty content 
        if (content.length < 1) {
            setSuccess("Your post can't be empty");
            setTimeout(() => {
                setSuccess("Post")
            }, 1500)
            return;
        }
        const formData = new FormData();
        formData.append("image", image);
        formData.append("content", content);
        formData.append("userID", User._id);

        if(content.length > 0) {
            axios.post(`${process.env.REACT_APP_BASE_URL}/post`, formData, {
                headers: {
                    "Content-Type": "multipath/form-data"
                }
            })
                .then((response) => {
                    console.log(response.data);
                    setSuccess("Posted");
                    setTimeout(() => {
                        setIsModalOpen(false);
                    }, 2000)
                })
                .catch((error)=> {
                    console.log(error)
                    setSuccess("Unable to post")
                })
        }
    }
    return (
        <div className="postModal">
            {/* Content */}
            <div className="postModal__content">
                {/* User Profile */}
                <div className="postModal__content__profile">
                    <div className="postModal__wrapper">
                        <img src={User?.picturePath ? User.picturePath : profile} alt="" className="postModal__content__img" />
                        <div className="postModal__content__wrapper">
                            <p className="postModal__content__name">
                                {User.firstName} {User.lastName}
                            </p>
                            <p className="postModal__content__text">
                                Post to Anyone
                            </p>
                        </div>
                    </div>
                    <button onClick={()=> {
                            setContent("");
                            SetImage(null)
                            setIsModalOpen(false)
                        }
                        } className="postModal__btn">
                        <img className="postModal__icon" src={cross} alt=""/>
                    </button>
                </div>
                {/* Input Section */}
                <div className="postModal__input__section">
                    <input value={content} onChange={(e) => setContent(e.target.value)} className="postModal__input" type="text" placeholder='What do you want to talk about'/>
                    <div className="postModal__input-wrapper">
                        <input
                            className="postModal__upload"
                            type="file" 
                            id="fileupload"
                            accept="image/png, image/jpg, image/jpeg"
                            onChange={handleImageChange}
                        >
                        </input>
                        <label className="postModal__label" htmlFor='fileupload'>Upload Image</label>
                    </div>
                </div>
                <div className="postModal__wrapper2">
                    {
                        image?.name && (
                            <>
                                <p className="postModal__success">Successfully upload {image.name}</p>
                                <p className="postModal__delete-icon" onClick={() => SetImage(null)}>remove</p>  
                            </>        
                            )
                    }
                </div>
                {/* Post Button */}
                <div className="postModal__action">
                    <button onClick={(e)=>handleSubmit(e)} className="postModal__post__btn">{success}</button>
                </div>
            </div>
            
        </div>
    )
}

export default PostModal
