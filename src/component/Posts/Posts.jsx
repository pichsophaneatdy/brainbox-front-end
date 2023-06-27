import React from 'react'
import SinglePost from '../SinglePost/SinglePost'

const Posts = ({posts}) => {
    return (
        <div className="posts__container">
            {
                posts.map((post) => {
                    return <SinglePost newsfeed={true} post={post} />
                })
            }
        </div>
    )
}

export default Posts