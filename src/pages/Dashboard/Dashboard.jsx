import React from 'react';
import "./Dashboard.scss";
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../App';
// Component
import Profile from '../../component/Profile/Profile';
import UploadPost from '../../component/UploadPost/UploadPost';
import SetUp from '../../component/SetUp/SetUp';
import Courses from '../../component/Courses/Courses';
import PostModal from '../../component/PostModal/PostModal';
import Posts from "../../component/Posts/Posts";
import axios from "axios";

const Dashboard = () => {
    const user = useContext(UserContext);
    // Post Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Friends's post
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/post/newsFeed/${user._id}`)
            .then((response) => setPosts(response.data))
            .catch((error) => console.log(error) )
    }, [])

    return (
        <>
            {isModalOpen && <PostModal setIsModalOpen={setIsModalOpen} />}
            <div className="dashboard">
                <div className="dashboard__col1">
                    <Profile detail={false} user={user}/>
                </div>
                <div className="dashboard__col2">
                    {/* New User */}
                    {
                        user?.degree ? (
                            <div className="newsfeed">
                                <UploadPost setIsModalOpen={setIsModalOpen} />
                                {posts.length > 0 ? (
                                        <Posts posts={posts} />
                                    ):(<p className="dashboard__nopost">No posts yet, starting connecting to other students to see their posts"</p>
                                )}
                            </div>
                        ) : (
                            <SetUp />
                        )
                    }
                </div>
                <div className="dashboard__col3">
                    <Courses />
                </div>
            </div>
        </>
    )
}

export default Dashboard