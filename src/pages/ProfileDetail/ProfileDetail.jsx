import React from 'react'
import "./ProfileDetail.scss";
import { useContext, useState, useEffect} from 'react';
import { UserContext } from '../../App';
import axios from "axios";
// Components
import Profile from '../../component/Profile/Profile';
import Courses from '../../component/Courses/Courses';
import SinglePost from '../../component/SinglePost/SinglePost';

const ProfileDetail = () => {
    const User = useContext(UserContext);
    // State and useEffect for posts
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/post/${User._id}`)
            .then((response) => {
                    console.log(response.data);
                    setPosts(response.data)
                })
            .catch((error) => console.log(error))
    }, [posts])
    return (
        <div className="dashboard profileDetail">
            <div className="profileDetail__col1">
                <Profile isFull={true} user={User}/>
                {/* Post Section */}
                <div className="profileDetail__post-section">
                    <p className="profileDetail__title4">
                        Your Posts
                    </p>
                    <div className="profileDetail__post__container">
                        {
                            posts.length > 0 ? (
                                posts.map((post) => <SinglePost post={post} />)
                            ) : (
                                <p className="profileDetail__post__text">You have not posted anything yet.</p>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="dashboard__col2">
                <Courses />
            </div>
        </div>
    )
}

export default ProfileDetail