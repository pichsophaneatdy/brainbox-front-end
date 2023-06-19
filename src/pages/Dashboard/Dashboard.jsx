import React from 'react';
import "./Dashboard.scss";
import { useContext } from 'react';
import { UserContext } from '../../App';
// Component
import Profile from '../../component/Profile/Profile';
import UploadPost from '../../component/UploadPost/UploadPost';
import SetUp from '../../component/SetUp/SetUp';
import Courses from '../../component/Courses/Courses';
const Dashboard = () => {
    const user = useContext(UserContext);
    console.log(user);
    return (
        <div className="dashboard">
            <div className="dashboard__col1">
                <Profile user={user}/>
            </div>
            <div className="dashboard__col2">
                {/* New User */}
                {
                    user?.degree ? (
                        <UploadPost />
                    ) : (
                        <SetUp />
                    )
                }
            </div>
            <div className="dashboard__col3">
                <Courses />
            </div>
        </div>
    )
}

export default Dashboard