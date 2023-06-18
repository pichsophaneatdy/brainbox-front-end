import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../../App';
// Component
import Profile from '../../component/Profile/Profile';

const Dashboard = () => {
    const user = useContext(UserContext);
    return (
        <div className="dashboard">
            <div className="dashboard__col1">
                <Profile />
            </div>
            <div className="dashboard__col2">

            </div>
            <div className="dashboard__col3">

            </div>
        </div>
    )
}

export default Dashboard