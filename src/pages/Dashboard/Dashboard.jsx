import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../../App';
const Dashboard = () => {
    const user = useContext(UserContext);
    return (
        <div>
            <h1>Dashboard</h1>
            {user?._id ? (
                <h1>Hello {user.firstName}</h1>
            ) : (
                <p>You are not logged in</p>
            )}
        </div>
    )
}

export default Dashboard