import React from 'react';
import "./CoursesDetail.scss";
// Component 
import CourseList from '../CourseList/CourseList';

const CoursesDetail = ({currentCourses, pastCourses, notTakenCourses}) => {
    return (
        <div className="courseDetail">
            <p className="courseDetail__title">Details</p>
            {/* Course Courses */}
            <div className="courseDetail__section">
                <CourseList list={currentCourses} title="Current Courses"/>
            </div>
            {/* Past Courses */}
            <div className="courseDetail__section">
                <CourseList list={pastCourses} title="Courses you have taken"/>
            </div>
            <div className="courseDetail__section">
                <CourseList list={notTakenCourses} title="Courses you have not taken"/>
            </div>
        </div>
    )
}

export default CoursesDetail