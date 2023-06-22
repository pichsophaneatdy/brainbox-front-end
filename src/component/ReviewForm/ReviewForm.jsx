import React, {useState, useEffect} from 'react'
import { useLocation, useParams } from 'react-router-dom';
import axios from "axios";
import "./ReviewForm.scss";
import topicsData from "../../data/universityTopic";
const ReviewForm = () => {
    const [course, setCourse] = useState({});
    const location = useLocation();
    const {courseID} = useParams();

    // State for professor
    const [professor, setProfessor] = useState("");
    // State for difficulty
    const [difficulty, setDifficulty] = useState(5);
    const [difficultyLevel, setDifficultyLevel] = useState("Advanced");

    // State for Usefullness
    const [usefulness, setUsefulness] = useState(5);

    // State for topics
    const [topics, setTopics] = useState(topicsData);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [visibleItems, setVisibleItems] = useState(15);

    // State for recommendation
    const [recommendation, setRecommendation] = useState(false);

    const handleLoadMore = (e) => {
        e.preventDefault();
        setVisibleItems(prevVisibleItems => prevVisibleItems+15);
    }
    // State for comment
    const [commit, setCommit] = useState("");

    // Changing Handler
    const handleDifficulty = (e) => {
        setDifficulty(Number(e.target.value));
    }
    const handleUsefulness = (e) => {
        setUsefulness(Number(e.target.value));
    }
    // Handle Recommendation
    const handleRecomendation = (e)=> {
        e.preventDefault();
        e.target.value === "true" ? setRecommendation(true) : setRecommendation(false);
    }
    // Handle Topics Click
    const handleTopicsClick = (e,topic) => {
        e.preventDefault();
        if(!(selectedTopics.includes(topic))) {
            setSelectedTopics([...selectedTopics, topic]);
        } else {
            const filterArray = selectedTopics.filter((singleTopic) => singleTopic !== topic);
            setSelectedTopics(filterArray);
        }
    }

    useEffect(() => {
        switch(difficulty) {
            case 1:
                setDifficultyLevel("Easy");
                break;
            case 2:
                setDifficultyLevel("Moderate");
                break;
            case 3:
                setDifficultyLevel("Challenging");
                break;
            case 4:
                setDifficultyLevel("Difficult");
                break;
            case 5:
                setDifficultyLevel("Advanced");
                break;
            default:
                setDifficulty("Default")
                break;
        }
    }, [difficulty])
    useEffect(() => {
        if(courseID) {
                axios.get(`${process.env.REACT_APP_BASE_URL}/university/singleCourse/${courseID}`)
                    .then((response)=> {
                        setCourse(response.data);
                    })
                    .catch((error) => console.log(error))
        }

    }, [location])
    return (
        <div className="reviewForm">
            <p className="reviewForm__title">
                Let's write a course review
            </p>
            <form className="reviewForm__form">
                <div className="reviewForm__form__control">
                    <label className="reviewForm__form__label">Course</label>
                    <p className="reviewForm__form__text--gray">{course.code} {course.name}</p>
                </div>
                <div className="reviewForm__form__control">
                    {/* Professor */}
                    <label className="reviewForm__form__label">Professor</label>
                    <input
                        onChange={(e)=>setProfessor(e.target.value)}
                        type="text"
                        className="reviewForm__form__input" />
                </div>
                <div className="reviewForm__form__control">
                    {/* Difficulty */}
                    <label className="reviewForm__form__label">Difficulty</label>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        className="reviewForm__form__radio"
                        onChange={handleDifficulty}
                        />
                    <p className="reviewForm__form__text--gray">{difficultyLevel}</p>
                </div>
                <div className="reviewForm__form__control">
                    {/* Usefulness */}
                    <label className="reviewForm__form__label">Usefulness</label>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        className="reviewForm__form__radio"
                        onChange={handleUsefulness}
                        />
                    <p className="reviewForm__form__text--gray">Level: {usefulness}</p>
                </div>
                <div className="reviewForm__form__control">
                    {/* Recommendation Yes / No */}
                    <label className="reviewForm__form__label">Do you recommend other students to take the course?</label>
                    <div className="reviewForm__form__btn-wrapper">
                        <button value="true" onClick={(e)=>handleRecomendation(e)} className={recommendation ? "reviewForm__form__btn--gray--selected" : "reviewForm__form__btn--gray"}>Yes</button>
                        <button value="false" onClick={(e) => handleRecomendation(e)} className={recommendation ? "reviewForm__form__btn--gray" : "reviewForm__form__btn--gray--selected"}>No</button>
                    </div>
                </div>
                <div className="reviewForm__form__control">
                    {/* Topics */}
                    <label className="reviewForm__form__label">Topics covered in the course</label>
                    <div className="reviewForm__form__topics-wrapper">
                        {
                            topics.slice(0, visibleItems).map((topic) => {
                                return (
                                    <button
                                        onClick={(e)=>handleTopicsClick(e,topic)}
                                        className={selectedTopics.includes(topic) ?  "reviewForm__form__topics-btn--select" : "reviewForm__form__topics-btn"}
                                    >
                                        {topic}
                                    </button>
                                )
                            })
                        }
                    </div>
                    <div className="reviewForm__form__showmore-wrapper">
                        <button onClick={(e)=>handleLoadMore(e)} className="reviewForm__form__showmore">Show more</button>
                    </div>
                </div>
                {/* Comment Section */}
                <div className="reviewForm__form__control">
                    {/* Professor */}
                    <label className="reviewForm__form__label">Comment <span className="small-text">(Optional)</span></label>
                    <input
                        onChange={(e)=>setProfessor(e.target.value)}
                        type="text"
                        className="reviewForm__form__input reviewForm__form__comment" />
                </div>
            </form>
        </div>
    )
}

export default ReviewForm