import React, { useCallback, useContext } from 'react'
import "./CourseReview.scss";
import { UserContext } from '../../App';
import { useParams } from 'react-router-dom';
// Component 
import Profile from '../../component/Profile/Profile';
import Courses from '../../component/Courses/Courses';
import CourseAnalysis from '../../component/CourseAnalysis/CourseAnalysis';

const CourseReview = ({user}) => {
    const User = useContext(UserContext);
    const {courseID} = useParams();
    return (
        <div className="dashboard">
                <div className="dashboard__col1">
                    <Profile user={User}/>
                </div>
                <div className="dashboard__col2">
                    <CourseAnalysis courseID={courseID} />
                </div>
                <div className="dashboard__col3">
                    <Courses />
                </div>
            </div>
    )
}

export default CourseReview