import { FETCH_ALL_CHANNELS, FETCH_CHANNEL, FETCH_BY_SEARCH, FETCH_CHANNEL_BY_USER, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api';

// Action Creators

export const getChannel = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        

        const { data } = await api.fetchChannel(id);

        dispatch({ type: FETCH_CHANNEL, payload: data });

        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getChannels = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
  
        const { data } = await api.fetchChannels(page);
  
  
        dispatch({ type: FETCH_ALL_CHANNELS, payload: data });
  
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}


export const getChannelsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data: { data } } = await api.fetchChannelsBySearch(searchQuery);

        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getChannelsByUser = (user) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchChannelsByUser(user);

        dispatch({ type: FETCH_CHANNEL_BY_USER, payload: data });
        
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}
  
export const createChannel = (channel) => async (dispatch) => {
try {
    //dispatch({ type: START_LOADING });

    const { data } = await api.createChannel(channel);

    //navigate(`/channels/${data._id}`)

    dispatch({ type: CREATE, payload: data });
} catch (error) {
    console.log(error)
}
}

export const updateChannel = (id, channel) => async (dispatch) => {
try {
    const { data } = await api.updateChannel(id, channel);

    dispatch({ type: UPDATE, payload: data });
} catch (error) {
    console.log(error);
}
}

export const deleteChannel = (id) => async (dispatch) => {
try {
    await api.deleteChannel(id);

    dispatch({ type: DELETE, payload: id });
} catch (error) {
    console.log(error);
}
}  