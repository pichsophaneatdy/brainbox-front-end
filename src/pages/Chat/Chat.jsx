import React from 'react'
import {StreamChat} from 'stream-chat';
import {Chat} from 'stream-chat-react';
import { UserContext } from '../../App';
import { useContext, useState } from 'react';
import workinprogress from "../../asset/icon/work-in-progress.png"
import "./Chat.scss";
const ChatApp = () => {
    const User = useContext(UserContext)

    return (
        <div className="workinprogress">
            <img className="workinprogress__icon" src={workinprogress} alt="workinprogress" />
        </div>
        // <div className="app__wrapper">
        //     <Chat client={client} theme="team light">
        //         <ChannelListContainer
        //             isCreating={isCreating}
        //             setIsCreating={setIsCreating}
        //             isEditing={isEditing}
        //             setIsEditing={setIsEditing}
        //             setCreateType={setCreateType}
        //         />
        //         <ChannelContainer
        //             isCreating={isCreating}
        //             setIsCreating={setIsCreating}
        //             isEditing={isEditing}
        //             setIsEditing={setIsEditing}
        //             createType={createType}
        //         />
        //     </Chat>
        // </div>
    )
}

export default ChatApp
