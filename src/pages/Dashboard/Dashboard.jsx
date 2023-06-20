import React from 'react';
import "./Dashboard.scss";
import { useContext, useState } from 'react';
import { UserContext } from '../../App';
// Component
import Profile from '../../component/Profile/Profile';
import UploadPost from '../../component/UploadPost/UploadPost';
import SetUp from '../../component/SetUp/SetUp';
import Courses from '../../component/Courses/Courses';
import PostModal from '../../component/PostModal/PostModal';

const Dashboard = () => {
    const user = useContext(UserContext);
    // Post Modal State
    const [isModalOpen, setIsModalOpen] = useState(true);
    return (
        <>
            {isModalOpen && <PostModal setIsModalOpen={setIsModalOpen} />}
            <div className="dashboard">
                <div className="dashboard__col1">
                    <Profile user={user}/>
                </div>
                <div className="dashboard__col2">
                    {/* New User */}
                    {
                        user?.degree ? (
                            <div className="newsfeed">
                                <UploadPost setIsModalOpen={setIsModalOpen} />
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