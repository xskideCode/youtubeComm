import { FETCH_ALL_VIDEOS, CREATE, FETCH_VIDEO, UPDATE, DELETE, FETCH_BY_SEARCH, FETCH_VIDEO_BY_USER, FETCH_VIDEO_BY_CATEGORY, FETCH_VIDEO_BY_CHANNEL, START_LOADING, END_LOADING } from '../constants/actionTypes';

export default (state = { loading: true, videos: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, loading: true };
        case END_LOADING:
            return {...state, loading: false };
        case FETCH_ALL_VIDEOS:
            return {
                ...state,
                videos: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_BY_SEARCH:
            return { ...state, videos: action.payload };
        case FETCH_VIDEO_BY_CATEGORY:
            return { ...state, videos: action.payload };
        case FETCH_VIDEO_BY_CHANNEL:
            return { ...state, videos: action.payload };
        case FETCH_VIDEO_BY_USER:
            return { ...state, videos: action.payload };
        case FETCH_VIDEO:
            return { ...state, video: action.payload };
        case CREATE:
            return { ...state, videos: [ ...state.videos, action.payload]};    
        case UPDATE:
            return { ...state, videos: state.videos.map((video) => (video._id === action.payload._id ? action.payload : video))};
        case DELETE:
            return { ...state, videos: state.videos.filter((video) => video._id !== action.payload)};
        default:
            return state;
    }
}