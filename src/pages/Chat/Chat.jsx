import React from 'react'
import {StreamChat} from 'stream-chat';
import {Chat} from 'stream-chat-react';
import { UserContext } from '../../App';
import { useContext, useState } from 'react';
import 'stream-chat-react/dist/css/index.css';
import workinprogress from "../../asset/icon/work-in-progress.png"
// Component
import ChannelContainer from '../../component/ChannelContainer/ChannelContainer';
import ChannelListContainer from '../../component/ChannelListContainer/ChannelListContainer';
import UserList from '../../component/UserList/UserList';
const ChatApp = () => {
    const User = useContext(UserContext);

    const apiKey = process.env.REACT_APP_STREAM_CHAT_API;
    const streamChatToken = localStorage.getItem("streamChatToken");
    const client = StreamChat.getInstance(apiKey);

    const [isCreating, setIsCreating] = useState(false);
    const [createType, setCreateType] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    // Stream chat
    if(User._id) {
        client.connectUser({
            id: User._id,
            firstName: User.firstName,
            lastName: User.lastName,
            image: "https://img.freepik.com/free-vector/young-teen-girl-portrait-happy-teenager-casual-clothes_90220-219.jpg?w=900&t=st=1687643656~exp=1687644256~hmac=4a88c5408a778c125c07cf2d49a0300b4e7619e5d837aa4723596faa813d14b3",
            email: User.email
        }, streamChatToken);
    }
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
