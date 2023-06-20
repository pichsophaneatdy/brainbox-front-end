import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../App'
const Courses = () => {
    const User = useContext(UserContext);
    return (
        <div>
            Courses
        </div>
    )
}

export default Courses
