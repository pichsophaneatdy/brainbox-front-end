import React from 'react'
import "./CourseManagement.scss";
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../App';
import axios from "axios";
// Component 
import Progress from '../../component/Progress/Progress';
import CoursesDetail from '../../component/CoursesDetail/CoursesDetail';
import Loader from '../../component/Loader/Loader';
const CourseManagement = () => {
    const User = useContext(UserContext);
    // Completed Credits
    const [completedCredits, setCompletedCredits] = useState();
    const [totalCredits, setTotalCredits] = useState();
    useEffect(() => {
        const completedCredits = (User?.enrollment?.past.length) * 3 || 0;
        setCompletedCredits(completedCredits);
    }, [])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/university/singleDegree/${User.degree}`)
            .then((response) => setTotalCredits(response?.data?.credits))
            .catch((error) => console.log(error));
    }, [])
    // Current Course Details
    const [currentCourses, setCurrentCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
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
            if (User?.enrollment?.current) {
                const coursePromises = User?.enrollment?.current.map((course) =>
                    fetchCourse(course)
                );

                try {
                    const courseData = await Promise.all(coursePromises);
                    console.log(courseData)
                    setCurrentCourses(courseData.filter((course) => course !== null));
                } catch (error) {
                    console.log(error);
                    setCurrentCourses([]);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setCurrentCourses([]);
            }
        }
        fetchCourseData();
    }, [User])
    // Past Courses
    const [pastCourses, setPastCourses] = useState([]);
    const [isLoading2, setIsLoading2] = useState(false);

    useEffect(() => {
        setIsLoading2(true);
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
            if (User?.enrollment?.past) {
                const coursePromises = User?.enrollment?.past.map((course) =>
                    fetchCourse(course)
                );

                try {
                    const courseData = await Promise.all(coursePromises);
                    setPastCourses(courseData.filter((course) => course !== null));
                } catch (error) {
                    console.log(error);
                    setPastCourses([]);
                } finally {
                    setIsLoading2(false);
                }
            } else {
                setPastCourses([]);
            }
        }
        fetchCourseData();
    }, [User])
     // Courses you have not taken 
    const [courseLeft, setCourseLeft] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/university/course/${User?.degree}`)
            .then((response) => {
                return response.data;
            })
            .then((allCourses) => {
                if (currentCourses?.length > 0 || pastCourses?.length > 0) {
                    const currentCoursesID = currentCourses.map((course) => { return course._id});
                    const pastCoursesID = pastCourses.map((course) => {return course._id});
                    const filteredCourses = allCourses.filter((course) => {
                        return !currentCoursesID.includes(course._id) && !pastCoursesID.includes(course._id);
                    })
                    setCourseLeft(filteredCourses);
                }
            })
            .catch((error) => console.log(error))
    }, [currentCourses, pastCourses])
    return (
        <div className="dashboard">
            <div className="dashboard__col1">
                {isLoading && isLoading2 ? <p>Loading...</p> : <Progress totalCredits={totalCredits} completedCredits={completedCredits} /> }
            </div>
            <div className="dashboard__col2">
                {
                    currentCourses.length > 0 || pastCourses.length >0 ? (
                        <CoursesDetail pastCourses={pastCourses} currentCourses={currentCourses} notTakenCourses={courseLeft}/>
                    ) : (
                        <Loader/>
                    )
                }
            </div>
            <div className="dashboard__col3">
            </div>
        </div>

    )
}

export default CourseManagement