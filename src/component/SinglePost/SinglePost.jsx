import React from 'react'
import "./SinglePost.scss";
import { UserContext } from '../../App';
import { useContext, useState, useEffect } from 'react';
import axios from "axios";
// Icon
import like from "../../asset/icon/like.png";
import comment from "../../asset/icon/comment.png";
import Profile from "../../asset/icon/user (2).png"
const SinglePost = ({post, newsfeed}) => {
    const User = useContext(UserContext);
    const [user, setUser] = useState(null);
    useEffect(() => {
        axios.get(`http://localhost:8080/user/${post.userID}`)
            .then((response) => {
                setUser(response.data);
                console.log(response.data)
            })
            .catch((error) => console.log(error))
    }, [post.userID])
    if (newsfeed) {
        return (
            <div className="singlePost1">
                {/* Row 1 */}
                <div className="singlePost1__row">
                    <div className="singlePost1__col1">
                        <img src={user?.picturePath ? user.picturePath : Profile} className="singlePost1__profile" alt="profile"/>
                        <div className="singlePost1__content">
                            <p className="singlePost1__name">{user?.firstName} {user?.lastName}</p>
                            <p className="singlePost1__text">I love programming to heart</p>
                        </div>
                    </div>
                    {!newsfeed && <button className="singlePost1__editBtn">
                        Edit
                    </button>}
                </div>
                {/* Row 2 */}
                <div className="singlePost1__row2">
                    <p className="singlePost1__post">{post.content}</p>
                    {
                        post?.image && <img src={post.image} alt="" className="singlePost1__img" />
                    }
                </div>
                {/* Row 3 */}
                <div className="singlePost1__row3">
                    <div className="singlePost1__left">
                        <div className="singlePost1__group">
                            <img src={like} className="singlePost1__icon" alt="Like Icon" />
                            <p className="singlePost1__icon-text">Like</p>
                        </div>
                        <div className="singlePost1__group">
                            <img src={comment} className="singlePost1__icon" alt="Like Icon" />
                            <p className="singlePost1__icon-text">Comment</p>
                        </div>
                    </div>
                    <div className="singlePost1__right">
                        <div className="singlePost1__group">
                            <p className="singlePost1__icon-text">
                                {post.like}
                            </p>
                            <p className="singlePost1__icon-text">
                                {post.like > 0 ? "Like" : "Likes"}
                            </p>
                        </div>
                        <div className="singlePost1__group">
                            <p className="singlePost1__icon-text">
                                {post.comment.length}
                            </p>
                            <p className="singlePost1__icon-text">
                                {post.comment.length > 0 ? "Comment" : "Comments"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="singlePost">
                {/* Row 1 */}
                <div className="singlePost__row">
                    <div className="singlePost__col1">
                        <img src={User?.picturePath ? User.picturePath : Profile} className="singlePost__profile" alt="profile"/>
                        <div className="singlePost__content">
                            <p className="singlePost__name">{User.firstName} {User.lastName}</p>
                            <p className="singlePost__text">I love programming to heart</p>
                        </div>
                    </div>
                    <button className="singlePost__editBtn">
                        Edit
                    </button>
                </div>
                {/* Row 2 */}
                <div className="singlePost__row2">
                    <p className="singlePost__post">{post.content}</p>
                    {
                        post?.image && <img src={post.image} alt="" className="singlePost__img" />
                    }
                </div>
                {/* Row 3 */}
                <div className="singlePost__row3">
                    <div className="singlePost__left">
                        <div className="singlePost__group">
                            <img src={like} className="singlePost__icon" alt="Like Icon" />
                            <p className="singlePost__icon-text">Like</p>
                        </div>
                        <div className="singlePost__group">
                            <img src={comment} className="singlePost__icon" alt="Like Icon" />
                            <p className="singlePost__icon-text">Comment</p>
                        </div>
                    </div>
                    <div className="singlePost__right">
                        <div className="singlePost__group">
                            <p className="singlePost__icon-text">
                                {post.like}
                            </p>
                            <p className="singlePost__icon-text">
                                {post.like > 0 ? "Like" : "Likes"}
                            </p>
                        </div>
                        <div className="singlePost__group">
                            <p className="singlePost__icon-text">
                                {post.comment.length}
                            </p>
                            <p className="singlePost__icon-text">
                                {post.comment.length > 0 ? "Comment" : "Comments"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return 
}

export default SinglePost