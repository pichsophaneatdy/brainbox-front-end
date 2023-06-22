import React, { useState, useEffect } from "react";
import "./CourseAnalysis.scss";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SignUpPage from "../../pages/SignUpPage/SignUpPage";

const CourseAnalysis = ({ courseID }) => {
    const [course, setCourse] = useState({});
    const location = useLocation();
    // State for review
    const [review, setReview] = useState([]);
    // State for difficulty, usefulness and recommendation, and topics
    const [difficulty, setDifficulty] = useState();
    const [usefulness, setUsefulness] = useState();
    const [reccomendation, setRecommendation] = useState();
    const [topics, setTopics] = useState([]);
    const [comments, setComments] = useState([]);
    // Use Effect
    // Fetch Review
    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_BASE_URL}/courseReview/${courseID}`)
        .then((response) => {
            setReview(response.data);
        })
        .catch((error) => console.log(error));
    }, [course, location]);
    // Find average difficulty
    useEffect(() => {
        if (review.length > 0) {
        let sum = 0;
        review.forEach((singleItem) => {
            sum += singleItem.difficulty;
        });
        setDifficulty(sum / review.length);
        }
    }, [review]);
    // Find Average Usefullness
    useEffect(() => {
        if (review.length > 0) {
        let sum = 0;
        review.forEach((singleItem) => {
            sum += singleItem.usefulness;
        });
        setUsefulness(sum / review.length);
        }
    }, [review]);
    // Find percentages of student who recommends the course
    useEffect(() => {
        if (review.length > 0) {
        let yes = 0;
        review.forEach((singleItem) => {
            if (singleItem.recommendation) yes++;
        });
        setRecommendation((yes / review.length) * 100);
        }
    }, [review]);
    // Push all topics to the topics state
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
    }, [review]);
    // Fetch user info for each comment
    useEffect(() => {
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
    }, [review]);

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
    }, [location]);
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
                <div className="courseAnalysis__item">
                {difficulty ? (
                    <>
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
                    </>
                ) : (
                    <p className="CourseAnalysis_text">Loading...</p>
                )}
                </div>
                {/* Usefulness */}
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
                    text={`${reccomendation}%`}
                    styles={buildStyles(halfCircleOptions)}
                    />
                </div>
                </div>
                {/* Topic Covered in the course */}
                <div className="courseAnalysis__item2">
                <div className="">
                    <p className="courseAnalysis__title2">
                    Topics covered in the course
                    </p>
                </div>
                <div className="courseAnalysis__right2">
                    {topics.slice(0, 20).map((topic) => {
                    return <p className="courseAnalysis__topic">{topic}</p>;
                    })}
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
                    {review.length > 0 &&
                    review.map((singleItem) => {
                        return (
                        <p className="courseAnalysis__topic">
                            {singleItem.professor}
                        </p>
                        );
                    })}
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
                        ) : <p>There are no comments</p>
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
