import React, {useState, useEffect} from 'react'
import "./CourseAnalysis.scss";
import axios from "axios";
import { useLocation, Link } from 'react-router-dom';

const CourseAnalysis = ({courseID}) => {
    const [course, setCourse] = useState({});
    const location = useLocation();

    useEffect(() => {
        if(courseID) {
                axios.get(`${process.env.REACT_APP_BASE_URL}/university/singleCourse/${courseID}`)
                    .then((response)=> {
                        setCourse(response.data);
                        console.log(response.data)
                    })
                    .catch((error) => console.log(error))
        }
        
    }, [location])
    return (
        <div className="courseAnalysis">
            {
                course?.name ? (
                    <>
                        <p className="courseAnalysis__title">{course.code} {course.name}</p>
                        <Link className="link" to={`/reviewForm/${courseID}`}>
                            <button className="courseAnalysis__btn">Write a course review</button>
                        </Link>
                    </>
                ) : (
                    <p>Loading...</p>
                )
                
            }
        </div>
    )
}

export default CourseAnalysis