import React, {useState} from 'react'
import {useChatContext} from 'stream-chat-react';

import {CloseCreateChannel} from "../../asset/CloseCreateChannel";
import UserList from '../UserList/UserList';
const ChannelNameInput = ({channelName = "", setChannelName}) => {
    
    const handleChange = (e) => {
        e.preventDefault();
        setChannelName(e.target.name)
    }
    return (
        <div className="channel-name-input__wrapper">
            <p>Name</p>
            <input type="text" value={channelName} onChange={handleChange} placeholder='channel-name' />
            <p>Add Members</p>

        </div>
    )
};

const CreateChannel = ({createType, setIsCreating}) => {
    const [channelName, setChannelName] = useState("")
    const {client, setActiveChannel} = useChatContext();
    const [selectedUsers, setSelectedUsers] = useState([client.userID || ""]);
    return (
        <div className="create-channel__container">
            <div className="create-channel__header">
                <p>{createType === "team" ? "Create a new channel" : "Send a direct message"}</p>
                <CloseCreateChannel setIsCreating={setIsCreating}/>
            </div>
            {createType === "team" && <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>}
            <UserList setSelectedUsers={setSelectedUsers} />        
        </div>
    )
}

export default CreateChannel