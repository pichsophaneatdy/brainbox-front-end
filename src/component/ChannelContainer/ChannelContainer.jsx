import React, {useState} from 'react';
import {Channel, useChatContext, MessageSimple} from 'stream-chat-react';
import ChannelInner from '../ChannelInner/ChannelInner';
import CreateChannel from '../CreateChannel/CreateChannel';
import EditChannel from '../EditChannel/EditChannel';

const ChannelContainer = ({
    isCreating, isEditing, setIsCreating, setIsEditing, createType
}) => {
    const {channel} = useChatContext();

    

    if(isCreating) {
        return (
            <div className="channel__container">
                <CreateChannel setIsCreating={setIsCreating} createType={createType}/>
            </div>
        )
    }
    if(isEditing) {
        return (
            <div className="channel__container">
                <EditChannel setIsEditing={setIsEditing}/>
            </div>
        )
    }
    const EmptyState = () => {
        return (
            <div className="channel-empty__container">
                <p className="channel-empty__first">This is the beginning of your chat history.</p>
                <p className="channel-empty__second">Send messages, attachments, links, emojis, and more!</p>
            </div>
        )
    }
    return (
        <div className="channel__container">
            <Channel
                EmptyStateIndicator={EmptyState}
                Message={(messageProps, i) => <MessageSimple key={i} {...messageProps} />}
            >
                <ChannelInner setIsEditing={setIsEditing} />
            </Channel>
        </div>
    )
}

export default ChannelContainer