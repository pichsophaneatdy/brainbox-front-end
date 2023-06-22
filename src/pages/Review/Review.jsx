import React, { useContext } from 'react'
import "./Review.scss";
import { UserContext } from '../../App';
// Component 
import Profile from '../../component/Profile/Profile';
import Courses from '../../component/Courses/Courses';
import ReviewForm from '../../component/ReviewForm/ReviewForm';
const Review = () => {
    const User = useContext(UserContext);
    
    return (
        <div className="dashboard">
                <div className="dashboard__col1">
                    <Profile user={User}/>
                </div>
                <div className="dashboard__col2">
                    <ReviewForm />
                </div>
                <div className="dashboard__col3">
                    <Courses />
                </div>
            </div>
    )
}

export default Review