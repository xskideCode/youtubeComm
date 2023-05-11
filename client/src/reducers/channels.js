import { FETCH_ALL_CHANNELS, CREATE, FETCH_CHANNEL, UPDATE, DELETE, FETCH_BY_SEARCH, FETCH_CHANNEL_BY_USER, START_LOADING, END_LOADING } from '../constants/actionTypes';

export default (state = { isLoading: true, channels: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return {...state, isLoading: false };
        case FETCH_ALL_CHANNELS:
            return {
                ...state,
                channels: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_BY_SEARCH:
            return { ...state, channels: action.payload };
        case FETCH_CHANNEL:
            return { ...state, channel: action.payload };
        case FETCH_CHANNEL_BY_USER:
            return { ...state, channels: action.payload };
        case CREATE:
            return { ...state, channels: [ ...state.channels, action.payload]};    
        case UPDATE:
            return { ...state, channels: state.channels.map((channel) => (channel._id === action.payload._id ? action.payload : channel))};
        case DELETE:
            return { ...state, channels: state.channels.filter((channel) => channel._id !== action.payload)};
        default:
            return state;
    }
}