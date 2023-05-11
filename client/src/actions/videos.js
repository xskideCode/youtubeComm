import { FETCH_ALL_VIDEOS, FETCH_VIDEO, FETCH_BY_SEARCH, FETCH_VIDEO_BY_USER, FETCH_VIDEO_BY_CATEGORY, FETCH_VIDEO_BY_CHANNEL, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api';

// Action Creators

export const getVideo = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        

        const { data } = await api.fetchVideo(id);

        dispatch({ type: FETCH_VIDEO, payload: data });

        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getVideos = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
  
        const { data } = await api.fetchVideos(page);
  
        dispatch({ type: FETCH_ALL_VIDEOS, payload: data });
  
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}


export const getVideosBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data: { data } } = await api.fetchVideosBySearch(searchQuery);

        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getVideosByUser = (user) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchVideosByUser(user);

        dispatch({ type: FETCH_VIDEO_BY_USER, payload: data });
        
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getVideosByCategory = (category) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchVideosByCategory(category);

        dispatch({ type: FETCH_VIDEO_BY_CATEGORY, payload: data });
        
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getVideosByChannel = (channel) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchVideosByChannel(channel);

        dispatch({ type: FETCH_VIDEO_BY_CHANNEL, payload: data });
        
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}
  
export const createVideo = (Video) => async (dispatch) => {
    try {
        //dispatch({ type: START_LOADING });

        const { data } = await api.createVideo(Video);

        //navigate(`/videos/${data._id}`)

        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error)
    }
}

export const updateVideo = (id, video) => async (dispatch) => {
try {
    const { data } = await api.updateVideo(id, video);

    dispatch({ type: UPDATE, payload: data });
} catch (error) {
    console.log(error);
}
}

export const deleteVideo = (id) => async (dispatch) => {
try {
    await api.deleteVideo(id);

    dispatch({ type: DELETE, payload: id });
} catch (error) {
    console.log(error);
}
}  

export const likeVideo = (id) => async (dispatch) => {
    try {
        const { data } = await api.likeVideo(id);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}