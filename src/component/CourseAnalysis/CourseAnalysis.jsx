import React, { useState, useEffect, useContext} from "react";
import "./CourseAnalysis.scss";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { UserContext } from "../../App";
// Avatar
import avatar from "../../asset/images/register__portrait.jpg";
import BackIcon from "../../asset/icon/keyboard-left-arrow-button.png";
// Component
import Loader from "../../component/Loader/Loader";
const CourseAnalysis = ({ courseID }) => {
    const User = useContext(UserContext);
    const [error, setError] = useState(false);
    
    const navigate = useNavigate(-1);
    // course 
    const [course, setCourse] = useState({});
    useEffect(() => {
        if (courseID) {
        axios
            .get(
            `${process.env.REACT_APP_BASE_URL}/university/singleCourse/${courseID}`
            )
            .then((response) => {
            setCourse(response.data);
            })
            .catch((error) => console.log(error));
        }
    }, [courseID]);

    // Review
    const [review, setReview] = useState([]);
    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_BASE_URL}/courseReview/${courseID}`)
        .then((response) => {
            setReview(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [courseID]);
    // Difficulty
    const [difficulty, setDifficulty] = useState(null);
    useEffect(() => {
        if (review.length > 0) {
        let sum = 0;
        review.forEach((singleItem) => {
            sum += singleItem.difficulty;
        });
        setDifficulty(sum / review.length);
        }
    }, [review, courseID]);
    const halfCircleOptions = {
        rotation: 0,
        strokeLinecap: "butt",
        pathTransitionDuration: 0.5,
        pathColor: "rgba(21, 101, 255, 1)",
        trailColor: "#E2ECFF",
        backgroundColor: "#3e98c7",
        textColor: "rgba(21, 101, 255, 1)",
        textSize: "22px",
    };
    const difficultyToText = (level) => {
        if (level <= 1) {
        return "easy";
        }
        if (level <= 2) {
        return "moderate";
        }
        if (level <= 3) {
        return "challenging";
        }
        if (level <= 4) {
        return "difficult";
        }
        if (level <= 5) {
        return "advanced";
        }
    };
    // Usefulness
    const [usefulness, setUsefulness] = useState(null);
    useEffect(() => {
        setUsefulness(null);
        if (review.length > 0) {
        let sum = 0;
        review.forEach((singleItem) => {
            sum += Number(singleItem.usefulness);
        });
        setUsefulness(sum / review.length);
        }
    }, [courseID, review]);
    const usefulnessToText = (level) => {
        if (level <= 1) {
        return "not useful";
        }
        if (level <= 2) {
        return "somewhat useful";
        }
        if (level <= 3) {
        return "useful";
        }
        if (level <= 4) {
        return "very use";
        }
        if (level <= 5) {
        return "extremely useful";
        }
    };
    // Recommendation
    const [reccomendation, setRecommendation] = useState(null);
    useEffect(() => {
        setRecommendation(null);
        if (review.length > 0) {
        let yes = 0;
        let no = 0;
        review.forEach((singleItem) => {
            if (singleItem.recommendation) {
                yes++
            }
        });
        setRecommendation((yes / review.length) * 100);
        }
    }, [courseID, review])
    // Topics
    const [topics, setTopics] = useState([]);
    useEffect(() => {
        const topics = [];
        review.forEach((singleItem) => {
        if (singleItem?.topics.length > 0) {
            singleItem.topics.forEach((topic) => {
            !topics.includes(topic) && topics.push(topic);
            });
        }
        });
        setTopics(topics);
    }, [courseID, review]);
    // Comments
    const [comments, setComments] = useState([]);
    useEffect(() => {
        setComments([]);
        const populateComments = async () => {
        const filteredComments = [];
        if (review?.length > 0) {
            const fetchUserPromises = review.map((singleReview) => {
                    return axios
                        .get(
                        `${process.env.REACT_APP_BASE_URL}/user/${singleReview.userID}`
                        )
                        .then((response) => {
                        const user = response.data;
                        return { ...user, comment: singleReview.comment };
                        })
                        .catch((error) => {
                            console.log(error);
                            return null;
                        });
            });
            const commentData = await Promise.all(fetchUserPromises);
            const validComments = commentData.filter((comment) => {
                return comment !== null && comment.comment !== "";
            })
            filteredComments.push(...validComments);
        }
        setComments(filteredComments);
        };
        populateComments();
    }, [courseID, review]);
    // Students taking or taken the class
    const [students, setStudents] = useState({});
    useEffect(()=> {
        setStudents([]);
        axios.get(`${process.env.REACT_APP_BASE_URL}/university/usersGivenCourse/${courseID}`)
            .then((response) => {
                    setStudents(response.data);
                })
            .catch((error)=> console.log(error));
    }, [courseID, review])
    // Return Component
    return (
        <div className="courseAnalysis">
            {
                course?.name ? (
                    <>
                        {/* Header */}
                        <div className="courseAnalysis__header">
                            <img onClick={()=> navigate(-1)} src={BackIcon} alt="Back Button" className="courseAnalysis__headerIcon" />
                            <p className="courseAnalysis__title">
                                {course.code} {course.name}
                            </p>
                        </div>
                        <Link className="link" to={`/reviewForm/${courseID}`}>
                            <button className="courseAnalysis__btn">
                            Write a course review
                            </button>
                        </Link>
                        {review && review.length > 0 ? (
                            // Content
                            <div className="courseAnalysis__content">
                                {/* Difficulty */}
                                <div className="courseAnalysis__item">
                                    <div className="courseAnalysis__left">
                                        <p className="courseAnalysis__title2">Difficulty</p>
                                        <p className="courseAnalysis__text">
                                        On average, {review?.length} students has reported that
                                        that the course is{" "}
                                        {difficulty && difficultyToText(difficulty)}.
                                        </p>
                                    </div>
                                    <div className="courseAnalysis__right">
                                        <CircularProgressbar
                                        className="circular"
                                        value={((difficulty - 1) / 4) * 100}
                                        text={`${difficulty?.toFixed(2)}`}
                                        styles={buildStyles(halfCircleOptions)}
                                        />
                                    </div>
                                </div>
                                {/* Usefulness */}
                                <div className="courseAnalysis__item">
                                    <div className="courseAnalysis__left">
                                        <p className="courseAnalysis__title2">Usefulness</p>
                                        <p className="courseAnalysis__text">
                                        On average, {review?.length} students has reported that that
                                        the course is {usefulnessToText(usefulness)}.
                                        </p>
                                    </div>
                                    <div className="courseAnalysis__right">
                                        <CircularProgressbar
                                        className="circular"
                                        value={((usefulness - 1) / 4) * 100}
                                        text={`${usefulness?.toFixed(2)}`}
                                        styles={buildStyles(halfCircleOptions)}
                                        />
                                    </div>
                                </div>
                                {/* Recommendation */}
                                <div className="courseAnalysis__item">
                                    <div className="courseAnalysis__left">
                                        <p className="courseAnalysis__title2">Reccomendation</p>
                                        <p className="courseAnalysis__text">
                                        {reccomendation}% students of {review.length} students
                                        recommends to take this course.
                                        </p>
                                    </div>
                                    <div className="courseAnalysis__right">
                                        <CircularProgressbar
                                        className="circular"
                                        value={reccomendation}
                                        text={`${reccomendation?.toFixed(0)}%`}
                                        styles={buildStyles(halfCircleOptions)}
                                        />
                                    </div>
                                </div>
                                {/* Topics */}
                                <div className="courseAnalysis__item2">
                                    <div className="">
                                        <p className="courseAnalysis__title2">
                                        Topics covered in the course
                                        </p>
                                    </div>
                                    <div className="courseAnalysis__right2">
                                        {topics.length > 0 ? (
                                                topics.slice(0, 20).map((topic) => {
                                                    return <p className="courseAnalysis__topic">{topic}</p>;
                                                    })
                                            ) : (
                                                <p className="courseAnalysis__topic">No information on this course</p>
                                            )
                                        }
                                    </div>
                                </div>
                                {/* Professor */}
                                <div className="courseAnalysis__item2">
                                    <div className="">
                                        <p className="courseAnalysis__title2">
                                        Professor who taught this course before
                                        </p>
                                    </div>
                                    <div className="courseAnalysis__right2">
                                        {
                                            review.map(singleItem => {
                                                return <p className="courseAnalysis__topic">{singleItem.professor}</p>
                                            })
                                        }
                                    </div>
                                </div>
                                {/* Comment */}
                                <div className="courseAnalysis__item2">
                                    <div className="">
                                        <p className="courseAnalysis__title2">
                                        Comments from other students
                                        </p>
                                    </div>
                                    <div className="courseAnalysis__right2">
                                        {
                                            comments.length > 0 ? (
                                                comments.map((comment) => {
                                                    return (
                                                        <div className="courseAnalysis__comment">
                                                            <p className="courseAnalysis__comment__content">{comment.comment}</p>
                                                            <p className="courseAnalysis__topic">From {comment.firstName} {comment.lastName}</p>
                                                        </div>
                                                    )
                                                })
                                            ) : <p className="courseAnalysis__topic">There are no comments</p>
                                        }
                                    </div>
                                </div>
                                {/* Student Connect */}
                                <div className="courseAnalysis__item2">
                                    <div className="courseAnalysis__left2">
                                        <p className="courseAnalysis__title2">
                                        Connect to other students
                                        </p>
                                    </div>
                                    <div className="courseAnalysis__right3">
                                        <div className="courseAnalysis__current">
                                                <p className="courseAnalysis__current__title">Current Students</p>
                                                {/* Current Students */}
                                                {
                                                    students?.current?.filter((student)=>student._id !== User._id).length > 0 ? (
                                                        students?.current.filter((student)=>student._id !== User._id).map((student) => {
                                                            return (
                                                                <div className="courseAnalysis__student">
                                                                    <div className="courseAnalysis__col--wrapper">
                                                                        <div className="courseAnalysis__col1">
                                                                            <img className="courseAnalysis__avatar" src={avatar} alt="User profile" />
                                                                        </div>
                                                                        <div className="courseAnalysis__col2">
                                                                            <p className="courseAnalysis__name">{student.firstName} {student.lastName}</p>
                                                                            <p className="courseAnalysis__info">Fairleigh Dickinson University</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="courseAnalysis__col3">
                                                                        <button className="courseAnalysis__connect-btn">Connect</button>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    ) : (
                                                        <p className="courseAnalysis__topic">There are no current students.</p>
                                                    )
                                                }
                                                {/* Past Students */}
                                                <p className="courseAnalysis__current__title">Former Students</p>
                                                {
                                                    students?.past?.filter((student)=>student._id !== User._id).length > 0 ? (
                                                        students?.past.filter((student)=>student._id !== User._id).map((student) => {
                                                            return (
                                                                <div className="courseAnalysis__student">
                                                                    <div className="courseAnalysis__col--wrapper">
                                                                        <div className="courseAnalysis__col1">
                                                                            <img className="courseAnalysis__avatar" src={avatar} alt="User profile" />
                                                                        </div>
                                                                        <div className="courseAnalysis__col2">
                                                                            <p className="courseAnalysis__name">{student.firstName} {student.lastName}</p>
                                                                            <p className="courseAnalysis__info">Fairleigh Dickinson University</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="courseAnalysis__col3">
                                                                        <button className="courseAnalysis__connect-btn">Connect</button>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    ) : (
                                                        <p className="courseAnalysis__topic">There are no students who have taken this course.</p>
                                                    )
                                                    }
                                            </div>
                                    </div>
                                </div>
                            </div>
                        ): (
                            <p className="courseAnalysis__topic mt-1">There is no review for this course yet.</p>
                        )}
                        
                    </>
                ) : (
                    <Loader />
                )
            }
        </div>
    );
};

export default CourseAnalysis;
