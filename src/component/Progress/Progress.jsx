import React from 'react';
import "./Progress.scss";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const Progress = ({totalCredits, completedCredits}) => {

    // Circular Progress Bar
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
    return (
        <div className="progress">
            <p className="progress__title">
                Progress
            </p>
            <div className="progress__progress-bar">
                <CircularProgressbar
                    className="circular"
                    value={completedCredits}
                    minValue={0}
                    maxValue={totalCredits}
                    text={`${completedCredits}/${totalCredits}`}
                    styles={buildStyles(halfCircleOptions)}
                />
            </div>
            <p className="progress__text">
                Congratulation! You have completed {completedCredits} {completedCredits > 0 ? "credits" : "credit"} out of {totalCredits}.
            </p>
        </div>
    )
}

export default Progress