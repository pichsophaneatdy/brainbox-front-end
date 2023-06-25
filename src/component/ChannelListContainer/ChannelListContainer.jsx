import React from 'react';
import "../../pages/Chat/Chat.scss";
// Components
import { ChannelList, useChatContext } from 'stream-chat-react';
import ChannelSearch from '../ChannelSearch/ChannelSearch';
import TeamChannelList from '../TeamChannelList/TeamChannelList';
import TeamChannelPreview from '../TeamChannelPreview/TeamChannelPreview';
// Icons
import HospitalIcon from "../../asset/hospital.png";
import LogoutIcon from "../../asset/logout.png";

const Sidebar = () => {
    return (
        <div className="channel-list__sidebar">
            <div className="channel-list__sidebar__icon1">
                <div className="icon1__inner">
                    <img src={HospitalIcon} alt="Hospital" width="30" />
                </div>
            </div>
            <div className="channel-list__sidebar__icon2">
                <div className="icon1__inner">
                    <img src={LogoutIcon} alt="Hospital" width="30" />
                </div>
            </div>            
        </div>
    )
}

const CompanyHeader = () => {
    return (
        <div className="channel-list__header">
            <p className="channel-list__header__text">Connect to your peers</p>
        </div>
    )
}
const ChannelListContainer = ({isCreating, setIsCreating, setCreateType, setIsEditing}) => {
    return (
        <>
            <Sidebar />
            <div className="channel-list__list__wrapper">
                <CompanyHeader />
                <ChannelSearch />
                <ChannelList 
                    filters={{}}
                    channelRenderFilterFn={()=>{}}
                    List={(listProps) =>(
                        <TeamChannelList {...listProps}
                            type="team"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType}
                            setIsEditing={setIsEditing}
                        />
                    ) }
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            type="team"
                        />
                    )}
                />
                <ChannelList 
                    filters={{}}
                    channelRenderFilterFn={()=>{}}
                    List={(listProps) =>(
                        <TeamChannelList {...listProps}
                            type="messaging"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType}
                            setIsEditing={setIsEditing}
                        />
                    ) }
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            type="messaging"
                        />
                    )}
                />
            </div>
        </>
        
    )
}

export default ChannelListContainer