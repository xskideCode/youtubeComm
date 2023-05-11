import { FETCH_CHANNEL_REQUEST, FETCH_CHANNEL_SUCCESS, FETCH_CHANNEL_FAILURE, REMOVE_CHANNEL, FETCH_VIDEO_REQUEST, FETCH_VIDEO_SUCCESS, FETCH_VIDEO_FAILURE, REMOVE_VIDEO } from "../constants/actionTypes";


// Initial state
const initialState = {
  channels: [],
  videos: [],
  loading: true,
  error: null,

};

// Reducer function
const youtubeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHANNEL_REQUEST:
      return { ...state, loading: true };
    case FETCH_CHANNEL_SUCCESS:
       localStorage.setItem("channels", JSON.stringify({ ...action.data }));
      return { ...state, channels: action.data, loading: false };
    case FETCH_CHANNEL_FAILURE:
      return { ...state, loading: false, error: action.error };
    case REMOVE_CHANNEL:
      localStorage.removeItem("channels");
      return { ...state, channels: null,};
    case FETCH_VIDEO_REQUEST:
      return { ...state, loading: true };
    case FETCH_VIDEO_SUCCESS:
        localStorage.setItem("videos", JSON.stringify({ ...action.data }));
      return { ...state, videos: action.data, loading: false };
    case FETCH_VIDEO_FAILURE:
      return { ...state, loading: false, error: action.error };
    case REMOVE_VIDEO:
      localStorage.removeItem("videos");
      return { ...state, videos: null,};
    default:
      return state;
  }
};

export default youtubeReducer;
