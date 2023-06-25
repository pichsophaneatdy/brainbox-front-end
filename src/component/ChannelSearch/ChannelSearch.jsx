import React, {useState, useEffect} from 'react';
import {getChannel, useChatContext} from 'stream-chat-react';
import {SearchIcon} from "../../asset/SearchIcon"; 

const ChannelSearch = () => {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);

    const getChannels = async (text) => {
        try {   
            // TODO: fetch channels
        } catch(error) {
            setQuery("");
        }
    }
    const onSearch = (e) => {
        e.preventDefault();
        setLoading(true);
        setQuery(e.target.value);
        getChannels(e.target.value);
    }
    return (
        <div className="channel-search__container">
            <div className="channel-search__input__wrapper">
                <SearchIcon />
                <input 
                value={query}
                onChange={onSearch}
                placeholder="Search" 
                type="text" 
                className="channel-search__input__text" />
            </div>
            
        </div>
    )
}

export default ChannelSearch