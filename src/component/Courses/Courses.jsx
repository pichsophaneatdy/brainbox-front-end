import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../App'
import "./Courses.scss";
import axios from "axios";
// icon
import info from "../../asset/icon/info.png";

const Courses = () => {
    const User = useContext(UserContext);
    const courses = User?.enrollment?.current;
    const [currentCourses, setCurrentCourses] = useState([]);
    
    useEffect(() => {
        const fetchCourse = async(courseID) => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/university/singleCourse/${courseID}`
                    );
                return response.data;
            } catch(error) {
                console.log(error)
            }
        }
        const fetchCourseData = async() => {
            if (courses) {
                const coursePromises = courses.map((course) =>
                    fetchCourse(course)
                );

                try {
                    const courseData = await Promise.all(coursePromises);
                    setCurrentCourses(courseData.filter((course) => course !== null));
                } catch (error) {
                    console.log(error);
                    setCurrentCourses([]);
                }
            } else {
                setCurrentCourses([]);
            }
        }
        fetchCourseData();
    }, []);

    return (
        <div className="course">
            <div className="course__header">
                <p className="course__title">Courses you are currently enrolled</p>
                <img src={info} className="course__icon" alt="Info Icon"/>
            </div>
            <div className="course__current">
                    {
                        currentCourses.length > 0 ? (
                            currentCourses.map((course) => {
                                return <p className="course__name">{course?.code}: {course?.name}</p>
                            })
                        ) : "No course"
                    }
                </div>
        </div>
    )
}

export default Courses
