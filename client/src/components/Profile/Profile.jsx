import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useGoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { fetchgchannel } from '../../actions/gapi';
import { useNavigate } from "react-router-dom";
import styles from '../../style'
import { Box } from '@mui/material';
import BasicTabs from './userProfile';
import { getChannelsByUser } from '../../actions/channels';
import { getVideosByUser } from '../../actions/videos';


const initialState = { code: '', scope: '', authuser: '', prompt: '' }
  
  
const Profile = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [channel, setChannel] = useState(JSON.parse(localStorage.getItem('channels')));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [codeRes , setCodeRes] = useState(initialState);
  
  useEffect(() => {
    dispatch(getChannelsByUser(user));
    dispatch(getVideosByUser(user));
  }, [dispatch]);

  return (
    <GoogleOAuthProvider clientId="376664485964-kdfse7jc4193ou3sagioq95qm4s79lh9.apps.googleusercontent.com">
      <div className="overflow-auto scrollbar-none h-[92vh]">        
        <BasicTabs/>        
      </div>
    </GoogleOAuthProvider>
  )
}

export default Profile
