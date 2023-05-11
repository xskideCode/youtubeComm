import React, { useEffect, useState } from "react";
import { TabPanel, useTabs } from "react-headless-tabs";
import { TabSelector } from "./tabSelector";
import { useSelector, useDispatch } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import { Grid, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom'

import { fetchgchannel, fetchgvideo } from '../../actions/gapi';
import { getChannels, createChannel } from '../../actions/channels';
import { getVideos, createVideo } from '../../actions/videos';
import { fetchuser } from '../../actions/auth';
import styles from '../../style'
import UserInfo from './userInfo';
import UserChannel from "./userChannel";
import UserVideo from "./userVideo";
import UserPromotion from "./userPromotion";

const initialState = { code: '', scope: '', authuser: '', prompt: '' }

const BasicTabs = () => { 
  const [selectedTab, setSelectedTab] = useTabs([
    "user",
    "videos",
    "channels",
    "promotions",
  ]);

  const { channels, isLoading } = useSelector((state) => state.channels);
  const { videos, loading } = useSelector((state) => state.videos);

  const dispatch = useDispatch();
  const [channel, setChannel] = useState(JSON.parse(localStorage.getItem('channels')));
  const [video, setVideo] = useState(JSON.parse(localStorage.getItem('videos')));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [codeRes , setCodeRes] = useState(initialState);
  const [videoUrl , setVideoUrl] = useState('');
  const [toggleVid , setToggleVid] = useState(false);


  const handleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {

      //console.log(codeResponse);
      setCodeRes(codeResponse);

    },
    flow: 'auth-code',
    scope: 'https://www.googleapis.com/auth/youtube.readonly',
    redirect_uri: 'http://localhost:5000/auth/google/callback'
  });
  const handleChannel = async () => {
    if (codeRes === initialState) {
      handleLogin();
    }else {
      dispatch(fetchgchannel(codeRes))

      setTimeout(() => {
        // do something 1 sec after clicked has changed
        setChannel(JSON.parse(localStorage.getItem('channels')))
        
      }, 2500);
    }
    
    dispatch(fetchgchannel(codeRes))

    setTimeout(() => {
      // do something 1 sec after clicked has changed
      setChannel(JSON.parse(localStorage.getItem('channels')))
      
   }, 2500);
  };



  const handleVideo = (e) => {
    e.preventDefault();
    
    if (codeRes !== initialState) {
      const videoId = videoUrl.split('watch?v=')[1]; 
      console.log(videoUrl);
      console.log(videoId);
      setTimeout(() => {
        setToggleVid((prev) => !prev);
        dispatch(fetchgvideo(codeRes,videoId))
      }, 1500);
      setTimeout(() => {

        setVideo(JSON.parse(localStorage.getItem('videos')))
        
      }, 2500);
    } else {
      handleLogin();
      console.log(codeRes)
    }
    
  };

  const handleToogleVid = async () => {
    setToggleVid((prev) => !prev);
  };


  const handleCancel = () => {
    dispatch({ type: 'REMOVE_CHANNEL' });

    setChannel(null);
  };

  const handleVidCancel = () => {
    dispatch({ type: 'REMOVE_VIDEO' });

    setVideo(null);
  };
  
  const handleSubmit = () => {

      const { items } = channel;
      {channel.items.map((item) => (
        dispatch(createChannel({ ...item, email: user?.result?.email }))
      ))};

      setTimeout(() => {
        // do something 1 sec after clicked has changed
        dispatch(fetchuser(user))
        handleCancel();

     }, 2500);


          
  };

  const handleVidSubmit = () => {

      const { items } = video;
      {video.items.map((item) => (
        dispatch(createVideo({ ...item, email: user?.result?.email }))
      ))};

      setTimeout(() => {
        // do something 1 sec after clicked has changed
        dispatch(fetchuser(user))
        handleVidCancel();

     }, 2500);


          
  };
  
  
  const handleChange = (e) => {
    setVideoUrl(e.target.value);
  };

  const navigate = useNavigate();
  const [type, setType]= useState('');

  useEffect(() => {
    if (type === '1') {
      navigate(`/checkout?type=${type}`);
    }
    else if (type === '2') {
      navigate(`/checkout?type=${type}`);
    }
  }, [type]);

  const checkout = () => {
    setType('1');
  }
  const checkout1 = () => {    
    setType('2');
  }



  return (
    <>
      <nav className="flex flex-row justify-between md:w-3/5 w-4/5 m-auto overflow-x-auto">
        <TabSelector
          isActive={selectedTab === "user"}
          onClick={() => setSelectedTab("user")}
        >
          USER
        </TabSelector>
        <TabSelector
          isActive={selectedTab === "videos"}
          onClick={() => setSelectedTab("videos")}
        >
          VIDEOS
        </TabSelector>
        <TabSelector
          isActive={selectedTab === "channels"}
          onClick={() => setSelectedTab("channels")}
        >
          CHANNELS
        </TabSelector>
        <TabSelector
          isActive={selectedTab === "promotions"}
          onClick={() => setSelectedTab("promotions")}
        >
          PROMOTIONS
        </TabSelector>
      </nav>
      <div className="p-4">
        <TabPanel hidden={selectedTab !== "user"}>
          <div className="flex md:flex-row flex-col-reverse sm:grid sm:grid-cols-2 sm:gap-4 sm:place-content-center">
            <div>
              {channel ?(
              <div className="bg-[#1e1e1e] fixed inset-0 m-auto grid sm:w-2/5 w-4/5 h-2/6 justify-center rounded-lg p-4 z-10">
                {channel.items.map((channel) => (
                  <div className="flex items-center justify-center ss:flex-row flex-col rounded-[20px] ">
                    <img src={channel.snippet.thumbnails.default.url} alt={channel.snippet.title} className="rounded-full sm:h-[116px] h-20 sm:w-[116px] w-20 hover:scale-125 cursor-pointer sm:mr-5 sm:my-5 " />
            
                    <div className="flex flex-col ">
                      <h4 className="font-poppins font-semibold text-[18px] text-white">
                        {channel.snippet.title}
                      </h4>
                      <div className="flex flex-row ">
                        <p className="font-poppins font-normal mr-1 text-[12px] text-dimWhite whitespace-nowrap">{channel.snippet.customUrl} •</p>
                        <p className="font-poppins font-normal text-[12px] text-dimWhite whitespace-nowrap">{channel.statistics.subscriberCount} subscribers</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex flex-row justify-self-center self-end ">
                  <button onClick={handleSubmit} className={`py-2 px-4 mr-4 bg-purple-700 font-poppins font-medium text-[16px] text-white outline-none ${styles} rounded-[10px]`}>submit</button>
                  <button onClick={handleCancel} className={`py-2 px-4 bg-purple-700 font-poppins font-medium text-[16px] text-white outline-none ${styles} rounded-[10px]`}>Cancel</button>
                </div>
              </div>
              ) : (
                <div className="flex flex-col items-center sm:w-96 w-90% p-4 mt-3 overflow-hidden bg-zinc-800 shadow rounded-3xl ">
                  <button onClick={handleChannel} className={`py-1 px-7 m-4 bg-purple-700 font-poppins font-semibold text-[15px] drop-shadow-xl sm:w-64 w-60 h-10 text-white outline-none rounded-[12px]`}>Add Channel</button>
                  <button onClick={handleToogleVid} className={`py-1 px-7 m-4 bg-purple-700 font-poppins font-semibold text-[15px] drop-shadow-xl sm:w-64 w-60 h-10 text-white outline-none rounded-[12px]`}>Add Video</button>
                </div> 
              )}
              <div>
                {toggleVid &&(
                  <div className="bg-[#1e1e1e] fixed inset-0 m-auto flex flex-col sm:w-3/5 w-4/5 h-1/4 rounded-[5px] px-4 z-10">
                    <form className="w-full max-w-xl px-4 pt-2" onSubmit={handleVideo}>
                      <div class="flex flex-wrap -mx-3 mb-6">
                        <h2 class="px-4 pt-3 pb-2 font-semibold text-white text-lg">Enter video url</h2>
                        <div className="w-full md:w-full px-3 mb-2 mt-2 ">
                              <input className="w-full font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" type="text" placeholder="Enter video url" onChange={handleChange}></input>
                        </div>
                      </div>
                    </form>
                    <div className="self-end">
                            <button onClick={handleVideo} className={`py-2 px-4 mr-4 bg-purple-700 font-poppins font-medium text-[16px] text-white outline-none ${styles} rounded-[10px]`}>submit</button>
                            <button onClick={handleToogleVid} className={`py-2 px-4 bg-purple-700 font-poppins font-medium text-[16px] text-white outline-none ${styles} rounded-[10px]`}>Cancel</button>
                    </div>
                  </div>                  
                )}
                {video &&(
                <div className="bg-[#1e1e1e] fixed inset-0 m-auto grid sm:w-2/4 w-4/5 sm:h-[40%] h-[42%] justify-center rounded-[20px] p-4 z-10">
                  {video.items.map((video) => (
                    <div className="flex items-center self-center p-auto sm:flex-row flex-col sm:mb-2 ">
                      <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} className=" sm:w-[180px] w-[155px] cursor-pointer mr-5 mt-3 " />
              
                      <div className="flex self-center flex-col sm: mt-2  w-64 ">
                        <h3 className="font-poppins font-semibold text-[14px] line-clamp-2 text-white">
                          {video.snippet.title}
                        </h3>
                        <h4 className="font-poppins text-[12px] text-gray-400">
                          {video.snippet.channelTitle}
                        </h4>
                      </div>
                    </div>
                  ))}
                  <div className="flex flex-row justify-self-center  self-end">
                    <button onClick={handleVidSubmit} className={`py-2 px-4 mr-4 bg-purple-700 font-poppins font-medium text-[16px] text-white outline-none ${styles} rounded-[10px]`}>Confirm</button>
                    <button onClick={handleVidCancel} className={`py-2 px-4 bg-purple-700 font-poppins font-medium text-[16px] text-white outline-none ${styles} rounded-[10px]`}>Cancel</button>
                  </div>
                </div>
                )}
            </div>
            <div className="flex flex-col items-center sm:w-[29rem] w-90% p-4 mt-3 overflow-hidden bg-zinc-800 shadow rounded-3xl ">
              <div className="flex sm:flex-row flex-col justify-between sm:mb-6 mx-auto max-w-5xl rounded-lg ring-2 ring-gray-400 px-2 py-1 m-auto lg:mx-0 lg:flex lg:max-w-none">
                <div className="m-auto sm:w-60 ">
                  Promote channel for 2 days
                </div>
                <div className="flex justify-around sm:flex-col flex-row sm:mr-6 sm:my-0 my-2">
                  <h4 className="text-lg font-poppins font-semibold tracking-tight text-gray-30">$1.5</h4>
                </div>
                <button onClick={checkout} className={`py-1 px-4 sm:my-1 my-2 bg-purple-700 font-poppins font-medium text-[16px] text-white outline-none rounded-[10px]`}>Promote</button>
              </div>
              <div className="flex sm:flex-row flex-col justify-between mx-auto max-w-5xl rounded-lg ring-2 ring-gray-400 px-2 py-1 m-auto lg:mx-0 lg:flex lg:max-w-none sm:mt-0 mt-4 ">
                <div className="m-auto sm:w-60 ">
                  Promote channel for a week
                </div>
                <div className="flex justify-around sm:flex-col flex-row sm:mr-5 sm:my-0 my-2">
                  <h4 className="text-lg font-poppins font-semibold tracking-tight text-gray-30">$3.0</h4>
                </div>
                <button onClick={checkout1} className={`py-1 px-4 sm:my-1 my-2 bg-purple-700 font-poppins font-medium text-[16px] text-white outline-none rounded-[10px]`}>Promote</button>
              </div>
            </div>
            </div>
            <div className="sm:mr-4">
              <UserInfo/>
            </div>
          </div>
        </TabPanel>
        <TabPanel hidden={selectedTab !== "videos"}>
          {(!videos.length && !loading) ? <div className="">No uploaded videos...</div> : (
            loading ? <CircularProgress /> : (
            <Grid style={{display: 'flex', alignItems: 'stretch',}} sm={{margin: '8px'}} container alignItems="stretch" spacing={3}>
              {videos?.map((video) => (
                <Grid key={video._id} item xs={12} sm={12} md={6} lg={3}>
                  <UserVideo video={video} />
                </Grid>
              ))}
            </Grid>
            )
          )}
        </TabPanel>
        <TabPanel hidden={selectedTab !== "channels"}>
          {(!channels.length && !isLoading) ? <div className="">No uploaded channels...</div> : (
            isLoading ? <CircularProgress /> : (
            <Grid style={{display: 'flex', alignItems: 'stretch',}} sm={{margin: '8px'}} container alignItems="stretch" spacing={3}>
              {channels?.map((channel) => (
                <Grid key={channel._id} item xs={12} sm={12} md={6} lg={3}>
                  <UserChannel channel={channel} />
                </Grid>
              ))}
            </Grid>
            )
          )}
        </TabPanel>
        <TabPanel hidden={selectedTab !== "promotions"}>
          {(user?.result?.promotions?.length === 0) ? <div className="">No active promotions...</div> : (            
            <div>
              {user?.result?.promotions.map((promotion) => (
                <UserPromotion promotion={promotion} />
                ))}
            </div>
            
          )}
        </TabPanel>
      </div>
    </>
  );
}

export default BasicTabs