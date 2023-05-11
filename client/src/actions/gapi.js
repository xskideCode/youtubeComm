import { FETCH_CHANNEL_REQUEST, FETCH_CHANNEL_SUCCESS, FETCH_CHANNEL_FAILURE, FETCH_VIDEO_REQUEST, FETCH_VIDEO_SUCCESS, FETCH_VIDEO_FAILURE, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api';


// Action creators
export const fetchgchannel = (codeRes) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CHANNEL_REQUEST });
  try {
      const { data } = await api.fetchgChannel(codeRes);
      dispatch({ type: FETCH_CHANNEL_SUCCESS, data });

    } catch (error) {

      dispatch({ type: FETCH_CHANNEL_FAILURE, error });

    }
  };
};

export const fetchgvideo = (codeRes, videoId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_VIDEO_REQUEST });
  try {
      const { data } = await api.fetchgVideo(codeRes, videoId);
      dispatch({ type: FETCH_VIDEO_SUCCESS, data });

    } catch (error) {

      dispatch({ type: FETCH_VIDEO_FAILURE, error });

    }
  };
};