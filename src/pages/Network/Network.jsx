import React from 'react'
import "./Network.scss";
import Profile from '../../component/Profile/Profile';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../App';
import axios from 'axios';
import Loader from "../../component/Loader/Loader";
const Network = () => {
    const User = useContext(UserContext);
    const [recommendedUsers, setRecommendedUsers] = useState([]);
    const [loading, setIsLoading] = useState(false);
    useEffect(() => {
        if(User._id) {
            setIsLoading(true);
            axios.get(`${process.env.REACT_APP_BASE_URL}/user/recommend/${User._id}`)
                .then((response) => setRecommendedUsers(response.data))
                .catch((error) => console.log(error))
                .finally(()=>setIsLoading(false))
        }
    }, [User._id])
    return (
        <div className="network">
            <div className="dashboard">
                <div className="dashboard__col1">
                        <Profile user={User}/>
                </div>
                <div className="dashboard__col">
                    <p className="network__title">
                        Your Connections
                    </p>
                    <div className="network__container">
                        {
                            User?.friends?.length > 0 ? (
                                User?.friends.map((friend) => {
                                    return <Profile detail={true} user={friend} />
                                })
                            ) : (
                                <p className="network__noconnection">You have not made any connection yet.</p>
                            )
                        }
                    </div>
                    <p className="network__title">
                        People you might be interested in
                    </p>
                    <div className="network__container">
                        {
                            loading ? <Loader /> : (
                                recommendedUsers.map((user) => {
                                    return <Profile user={user} detail={true}/>
                                })
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Network