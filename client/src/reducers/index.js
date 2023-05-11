import { combineReducers } from "redux";

// import posts from './posts';
import auth from './auth';
import gapi from './gapi';
import channels from './channels';
import videos from './videos';
import promotions from './promotions';

export default combineReducers({ auth, gapi, channels, videos , promotions });