import React from 'react'
import "./SetUp.scss";
import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

const SetUp = () => {
    const navigate = useNavigate();
    // UserInfo
    const User = useContext(UserContext);
    // States for university selection
    const [uni, setUni] = useState("");
    const [uniResult, setUniResult] = useState([]);
    const [filterUni, setFilterUni] = useState([]);
    const [uniError, setUniError] = useState("");
    const [selectedUni, setSelectedUni] = useState("");
    // States for degree or major selection
    const [degree, setDegree] = useState("");
    const [selectedDegree, setSelectedDegree] = useState("");
    // Courses
    const [courses, setCourses] = useState([]);
    const [currentSemester, setCurrentSemester] = useState({year: "", semester: ""})
    const [currentCourses, setCurrentCourses] = useState([]);
    const [pastCourses, setPastCourses] = useState([]);
    // Submission State
    const [success, setSuccess] = useState(false);
    // Search for University
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/university/university`)
            .then((response) => {
                setUniResult(response.data);
            })
            .catch((error)=> setUniError("Unable to retrieve universities's information right now due to internal server. Please try again later"));
    }, [])
    // Filter 
    useEffect(() => {
        if(uni.length === 0) {
            setFilterUni([]);
            return;
        }
        if (uni.length > 0) {
            const filterUni = uniResult.filter((university) => university.name.toLowerCase().startsWith(uni.toLowerCase()));
            setFilterUni(filterUni);
        }
    }, [uni])

    const handleClickNext = (e) => {
        e.preventDefault();
        if (selectedUni) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/university/degree/${selectedUni}`)
                .then((response) => {
                    setDegree(response.data);
                    console.log(response.data);
                })
                .catch((error) => console.log(error));
        }
    }
    const handleCourseClick = (e) => {
        e.preventDefault();
        if (selectedDegree) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/university/course/${selectedDegree}`)
                .then((response) => {
                    setCourses(response.data);
                })
                .catch((error) => console.log(error))
        }
    }
    const handleCourseSelect = (courseID) => {
        if(!(currentCourses.includes(courseID))) {
            setCurrentCourses([...currentCourses, courseID]);
        }
    }
    const handlePastCourseSelection = (courseID)=> {
        if(!(pastCourses.includes(courseID))) {
            setPastCourses([...pastCourses, courseID ]);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const userID = User._id;
        // Submiting update info
        try {
            axios.patch(`${process.env.REACT_APP_BASE_URL}/user`, {
                userID,
                university: selectedUni,
                degree: selectedDegree,
                enrollment: {
                    current: currentCourses,
                    past: pastCourses
                }
            })
                .then((response) => {
                    setSuccess(true);
                    console.log(response.data)
                })
                .catch((error)=> {
                    setSuccess(false);
                    console.log(error);
                })

        } catch(error) {
            console.log(error)
        }
    }
    return (
        <div className="setUp">
            <p className="setUp__title">Let's get set up!</p>
            <form className="setUp__form">
                <div className="setUp__form__control">
                    <label htmlFor="university" className="setUp__form__label">College / University</label>
                    <input 
                        id="university" 
                        value={uni} 
                        onChange={(e) => setUni(e.target.value)}
                        type="text" 
                        className="setUp__form__input" />
                    <p className="setUp__form__text">Recommended</p>
                    {
                        filterUni.length > 0 ? (
                            filterUni.map((university) => {return (
                                <div onClick={()=>setSelectedUni(university._id)} 
                                    key={university._id} 
                                    className={university._id == selectedUni ? "setUp__university--selected" : "setUp__university"}>
                                    <p className="setUp__university__name">{university.name}</p>
                                </div>
                            )})
                        ) : (uniResult.map((university) => {
                            return (
                                <div onClick={()=>{
                                        setSelectedUni(university._id);
                                    }} 
                                    key={university._id} 
                                    className={university._id == selectedUni ? "setUp__university--selected" : "setUp__university"}>
                                    <p className="setUp__university__name">{university.name}</p>
                                </div>
                            )
                        }))
                    }
                    <div className="setUp__btn-wrapper" onClick={(e)=>handleClickNext(e)}>
                        <button className="setUp__next-btn">Next</button>
                    </div>
                </div>
            </form>
            {/* Major */}
            {
                selectedUni && degree.length > 0 && (
                    <form className="setUp__form">
                        <div className="setUp__form__control">
                            <label htmlFor="university" className="setUp__form__label">Degree / Major</label>
                        </div>
                        <p className="setUp__form__text">Result</p>
                        {
                            degree.map((degree) => {
                                return (
                                    <div 
                                        onClick={()=>{
                                            setSelectedDegree(degree._id);
                                        }} 
                                        key={degree._id} 
                                        className={degree._id == selectedDegree ? "setUp__university--selected" : "setUp__university"}>
                                        <p className="setUp__university__name">{degree.name}</p>
                                    </div>
                                )
                            })
                        }
                    </form>)
            }
            {/* Current Courses */}
            {
                selectedDegree && (
                    <form className="setUp__form">
                        <div className="setUp__form__control">
                            <label htmlFor="semester" className="setUp__form__label">Current Semester</label>
                            <div className="setUp__form__wrapper">
                                <select onChange={(e)=>setCurrentSemester({...currentSemester, semester: e.target.value})} className="setUp__form__select" id="month" name="month">
                                    <option value="Spring">Spring</option>
                                    <option value="Summer">Summer</option>
                                    <option value="Fall">Fall</option>
                                </select>
                                <select onChange={(e)=>setCurrentSemester({...currentSemester, year: e.target.value})} className="setUp__form__select" id="year" name="year">
                                    <option value="2000">2023</option>
                                    <option value="2001">2022</option>
                                    <option value="2002">2021</option>
                                    <option value="2003">2020</option>
                                    <option value="2004">2019</option>
                                    <option value="2005">2018</option>
                                    <option value="2006">2017</option>
                                    <option value="2007">2016</option>
                                    <option value="2008">2015</option>
                                    <option value="2009">2014</option>
                                    <option value="2010">2013</option>
                                    <option value="2011">2012</option>
                                    <option value="2012">2011</option>
                                    <option value="2013">2010</option>
                                    <option value="2014">2009</option>
                                    <option value="2015">2008</option>
                                    <option value="2016">2007</option>
                                    <option value="2017">2006</option>
                                    <option value="2018">2005</option>
                                    <option value="2019">2004</option>
                                    <option value="2020">2003</option>
                                    <option value="2021">2002</option>
                                    <option value="2022">2001</option>
                                    <option value="2023">2000</option>
                                </select>
                            </div>
                        </div>
                        <div className="setUp__btn-wrapper" onClick={(e)=>handleCourseClick(e)}>
                            <button className="setUp__next-btn">Next</button>
                        </div>
                    </form>
                )
            }
            {/* Course */}
            {
                courses.length > 0 && (
                    <form action="" className="setUp__form">
                    <label className="setUp__form__label">Select the courses that you are currently taking</label>
                    <div className="setUp__list__wrapper">
                        {
                            courses.map((course) => {
                                return (
                                    <div
                                        onClick={()=>{
                                            handleCourseSelect(course._id);
                                        }} 
                                        key={course._id} 
                                        className={currentCourses.includes(course._id) ? "setUp__university--selected" : "setUp__university"}>
                                        <p className="setUp__university__name">{course.code}: {course.name}</p>
                                    </div>
                                )
                            }
                            )
                        }
                    </div>
                </form>
                )
            }
            
            
            {/* Courses that are already taken */}
            {
                courses.length > 0 && (
                    <form className="setUp__form">
                        <label className="setUp__form__label">Select the courses that you have taken in the past</label>
                        <div className="setUp__list__wrapper">
                            {
                                courses.map((course) => {
                                    return (
                                        <div
                                            onClick={()=>{
                                                handlePastCourseSelection(course._id);
                                            }} 
                                            key={course._id} 
                                            className={pastCourses.includes(course._id) ? "setUp__university--selected" : "setUp__university"}>
                                            <p className="setUp__university__name">{course.code}: {course.name}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="setUp__btn-wrapper" onClick={(e)=>handleSubmit(e)}>
                            <button className="setUp__next-btn">Finish Set Up</button>
                        </div>
                    </form>
                )
            }
        </div>
    )
}

export default SetUp