import React from 'react'
import "./CourseList.scss";
import {Link} from "react-router-dom";
const CourseList = ({list, title}) => {
    return (
        <div className="courseList courseAnalysis__item2">
            <p className="courseList__title courseAnalysis__title2">{title}</p>
            <p className="courseList__credits">Total Credit: {list.length * 3}</p>
            <div className="courseList-wrapper">
                {
                    list.map((course) => {
                        return (
                            <Link key={course._id} className="link" to={`/courseReview/${course._id}`}>
                                <p className="course__name">{course?.code}: {course?.name}</p>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CourseList