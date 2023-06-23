import React, { useState, useEffect, useContext} from "react";
import "./CourseAnalysis.scss";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { UserContext } from "../../App";
// Avatar
import avatar from "../../asset/images/register__portrait.jpg";
const CourseAnalysis = ({ courseID }) => {
    const User = useContext(UserContext);
    const [course, setCourse] = useState({});
    
    // State for review
    const [review, setReview] = useState([]);
    // State for difficulty, usefulness and recommendation, and topics
    const [difficulty, setDifficulty] = useState(null);
    const [usefulness, setUsefulness] = useState(null);
    const [reccomendation, setRecommendation] = useState(null);
    const [topics, setTopics] = useState([]);
    const [comments, setComments] = useState([]);
    // State for students who are taking the course, or who have taken the course in the past
    const [students, setStudents] = useState({});
    const [studentsLoading, setStudentsLoading] = useState(true);
    // State for adding friends
    const [status, setStatus] = useState("Connect");
    // const [friends, setFriends] = useState([]);
    // Use Effect     
    // useEffect(() => {
    //     axios.get(`${process.env.REACT_APP_BASE_URL}/user/${User._id}`)
    //         .then((response) => {
    //             const friends = [];
    //             response.data.friends.map((friend) => {
    //                 friends.push(friend._id);
    //             })
    //             setFriends(friends);
    //         })
    // }, [])

    // Fetch Review
    useEffect(() => {
        setReview([]);
        axios
        .get(`${process.env.REACT_APP_BASE_URL}/courseReview/${courseID}`)
        .then((response) => {
            setReview(response.data);
        })
        .catch((error) => console.log(error));
    }, [courseID]);
    // Find average difficulty
    useEffect(() => {
        setDifficulty(null);
        if (review.length > 0) {
        let sum = 0;
        review.forEach((singleItem) => {
            sum += singleItem.difficulty;
        });
        setDifficulty(sum / review.length);
        }
    }, [courseID]);
    // Find Average Usefullness
    useEffect(() => {
        setUsefulness(null);
        if (review.length > 0) {
        let sum = 0;
        review.forEach((singleItem) => {
            sum += singleItem.usefulness;
        });
        setUsefulness(sum / review.length);
        }
    }, [courseID]);
    // Find percentages of student who recommends the course
    useEffect(() => {
        setRecommendation(null);
        if (review.length > 0) {
        let yes = 0;
        review.forEach((singleItem) => {
            if (singleItem.recommendation) yes++;
        });
        setRecommendation((yes / review.length) * 100);
        }
    }, [courseID]);
    // Push all topics to the topics state
    useEffect(() => {
        setTopics([]);
        const topics = [];
        review.forEach((singleItem) => {
        if (singleItem?.topics.length > 0) {
            singleItem.topics.forEach((topic) => {
            !topics.includes(topic) && topics.push(topic);
            });
        }
        });
        setTopics(topics);
    }, [courseID]);
    
    // Fetch user info for each comment
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
    }, [courseID]);
    // Fetch students who have taken the course or are taking the course
    useEffect(()=> {
        setStudents([]);
        setStudentsLoading(true);
        axios.get(`${process.env.REACT_APP_BASE_URL}/university/usersGivenCourse/${courseID}`)
            .then((response) => {
                    setStudents(response.data);
                })
            .then(() => setStudentsLoading(false))
            .catch((error)=> console.log(error));
    }, [courseID])
    // Fetch course info
    useEffect(() => {
        setCourse({})
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
    
    // const handleAddFriend = (friendID) => {
    //     axios.patch(`${process.env.REACT_APP_BASE_URL}/user/addFriend`, {
    //         userID: User._id,
    //         friendID
    //     })
    //         .then((response) => {
    //             setFriends([...friends, friendID])
    //         })
    //         // .then(() => {
    //         //     axios.get(`${process.env.REACT_APP_BASE_URL}/user/${User._id}`)
    //         //         .then((response) => {
    //         //             const friends = [];
    //         //             response.data.friends.map((friend) => {
    //         //                 friends.push(friend._id);
    //         //             })
    //         //             setFriends(friends);
    //         //         })
    //         // })
    //         .catch((error) => console.log(error));
    // }
    // For Circular progress bar
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
    return (
        <div className="courseAnalysis">
        {course?.name ? (
            <>
            <p className="courseAnalysis__title">
                {course.code} {course.name}
            </p>
            <Link className="link" to={`/reviewForm/${courseID}`}>
                <button className="courseAnalysis__btn">
                Write a course review
                </button>
            </Link>
            <div className="courseAnalysis__content">
                {/* Difficulty */}
                {difficulty !== null  ? (
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
                            text={`${difficulty}`}
                            styles={buildStyles(halfCircleOptions)}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="courseAnalysis__item2">
                        <p className="courseAnalysis__title2">Difficulty</p>
                        <p className="courseAnalysis__topic">There is no information on this.</p>
                    </div>
                    
                )}
                
                {/* Usefulness */}
                {
                    usefulness !== null ? (
                        <div className="courseAnalysis__item">
                            <div className="courseAnalysis__left">
                                <p className="courseAnalysis__title2">Usefulness</p>
                                <p className="courseAnalysis__text">
                                On average, {review.length} students has reported that that
                                the course is {usefulnessToText(usefulness)}.
                                </p>
                            </div>
                            <div className="courseAnalysis__right">
                                <CircularProgressbar
                                className="circular"
                                value={((usefulness - 1) / 4) * 100}
                                text={`${usefulness}`}
                                styles={buildStyles(halfCircleOptions)}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="courseAnalysis__item2">
                            <p className="courseAnalysis__title2">Usefulness</p>
                            <p className="courseAnalysis__topic">There is no information on this.</p>
                        </div>
                    )   
                }
                
                {/* Recommendation */}
                {
                    reccomendation !== null ? (
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
                                text={`${reccomendation}%`}
                                styles={buildStyles(halfCircleOptions)}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="courseAnalysis__item2">
                            <p className="courseAnalysis__title2">Reccomendation</p>
                            <p className="courseAnalysis__topic">There is no information on this.</p>
                        </div>
                    )
                }
                
                {/* Topic Covered in the course */}
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
                {/* Professors Section */}
                <div className="courseAnalysis__item2">
                <div className="">
                    <p className="courseAnalysis__title2">
                    Professor who taught this course before
                    </p>
                </div>
                <div className="courseAnalysis__right2">
                    {review.length > 0 ? (
                        review.map((singleItem) => {
                            return (
                            <p className="courseAnalysis__topic">
                                {singleItem.professor}
                            </p>
                            );
                        })
                    ) : (
                        <p className="courseAnalysis__topic">No information on this course</p>
                    )
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
                {/* Students who are taking the courses or have taken the course before */}
                <div className="courseAnalysis__item2">
                    <div className="courseAnalysis__left2">
                        <p className="courseAnalysis__title2">
                        Connect to other students
                        </p>
                    </div>
                    <div className="courseAnalysis__right3">
                        {
                            students?.current ? (
                                // Current Student
                                    <>
                                        <div className="courseAnalysis__current">
                                            <p className="courseAnalysis__current__title">Current Students</p>
                                            {
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
                                            }
                                        </div>
                                        {
                                            studentsLoading ? (
                                                <p className="courseAnalysis__topic">Loading...</p>
                                            ) : (
                                                <p className="courseAnalysis__topic">Loading Complete</p>
                                            )
                                        }
                                        {
                                        // Past Students
                                            students.past.length > 0 && (
                                                <div className="courseAnalysis__current">
                                                    <p className="courseAnalysis__current__title">Former students</p>
                                                    {
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
                                                    }
                                                </div>
                                            )
                                        }
                                    </>
                            ) : <p className="courseAnalysis__topic">There are no information</p>
                        }
                    </div>
                </div>
            </div>
            </>
        ) : (
            <p>Loading...</p>
        )}
        </div>
    );
};

export default CourseAnalysis;
