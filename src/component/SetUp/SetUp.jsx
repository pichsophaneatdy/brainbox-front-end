import React from 'react'
import "./SetUp.scss";
import { useState, useEffect } from 'react';
import axios from "axios";
import plus from "../../asset/icon/plus-sign.png";

const SetUp = () => {
    // States for university selection
    const [uni, setUni] = useState("");
    const [uniResult, setUniResult] = useState([]);
    const [filterUni, setFilterUni] = useState([]);
    const [uniError, setUniError] = useState("");
    const [selectedUni, setSelectedUni] = useState("");
    // States for degree or major selection
    const [degree, setDegree] = useState("");
    const [selectedDegree, setSelectedDegree] = useState("");
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
    const handleDegreeClick = (e) => {
        e.preventDefault();
        if (selectedDegree) {
            
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
                        <div className="setUp__btn-wrapper" onClick={(e)=>handleDegreeClick(e)}>
                            <button className="setUp__next-btn">Next</button>
                        </div>
                    </form>)
            }
        </div>
    )
}

export default SetUp