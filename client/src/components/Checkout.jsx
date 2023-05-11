import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Done } from '@mui/icons-material'

import { getChannelsByUser } from '../actions/channels';
import PurchaseButton from './PurchaseButton';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Checkout = () => {

  const query = useQuery();
  const type = query.get('type');
  const dispatch = useDispatch();

  const { channels, isLoading } = useSelector((state) => state.channels);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [channel, setChannel] = useState(JSON.parse(localStorage.getItem('channels')));

  const [selectedChannel, setSelectedChannel] = useState(null);

  const handleChannelClick = (channel) => {
    setSelectedChannel(channel);
    
  };

  function handlePurchaseClick() {
    if (!selectedChannel) {
      alert("Please select a channel.");
      return;
    }
  
    // show popup with channel details and confirm/cancel button
  }

  useEffect(() => {
    if (channels) {
      dispatch(getChannelsByUser(user));
    }
  }, [dispatch]);

  


  return (
    <div className="h-[88vh] overflow-auto scrollbar-none text-white font-poppins mb-4">
      <div className="isolate bg-primary px-6 py-10 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl">Complete Your Purchase</h2>
        </div>
      {type === '1' && (
          <div class="pt-24 flex">
          <div class="flex flex-col justify-around w-72 h-[450px] m-auto p-8 bg-[#27292b] text-center rounded-3xl text-white  shadow-xl border-white transform scale-125 ">
            <h1 class="text-white font-semibold text-2xl">3-Day Plan</h1>
            <div class="bg-[#323537] rounded-lg mx-auto mt-2 w-3/4 p-4">
            <p class="tracking-wide">
            <span class="text-gray-400 align-top">$ </span>
              <span class="text-3xl font-semibold">1.5</span>
              <span class="text-gray-400 font-light "> USD</span>
            </p>
            </div>
            <hr class="mt-4 border-1 border-gray-600"/>
            {channels &&(
              <div className="grid justify-center bg-[#212325] rounded-[20px] mt-4 w-42 h-30 overflow-auto scrollbar-thin">
                <span class="text-gray-400 font-light text-xs m-2">Select channel</span>
                {channels?.map((channel) => (
                  <button key={channel.id} onClick={() => handleChannelClick(channel)} className="flex items-center flex-row h-12 my-2 p-1 rounded-lg hover:bg-[#323537] overflow-x-auto scrollbar-thin focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:ring-offset-slate-900">
                    <img src={channel.snippet.thumbnails.default.url} alt={channel.snippet.title} className="rounded-full h-[36px] w-[36px] hover:scale-125 cursor-pointer mr-3  " />

                    <div className="flex flex-col ">
                      <h4 className="font-poppins font-semibold text-xs text-white">
                        {channel.snippet.title}
                      </h4>
                      <div className="flex flex-row ">
                        <p className="font-poppins font-normal mr-1 text-xs text-dimWhite whitespace-nowrap">{channel.snippet.customUrl}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
              <div class="pt-8">
                <p class="font-semibold text-gray-400 text-left">
                  <Done/>
                  <span class="pl-2">
                    <span class="text-white">3</span>
                  </span> Day promotion 
                </p>
                <PurchaseButton onClick={handlePurchaseClick}  channel={selectedChannel} order={1}/>
              </div>
              <div class="absolute top-3 right-4">
                <p class="bg-purple-700 font-semibold px-4 py-1 rounded-full uppercase text-xs">Popular</p>
              </div>
          </div>
          </div>
      )}
      {type === '2' && (
          <div class="pt-24 flex">
          <div class="flex flex-col justify-around w-72 h-[400px] m-auto p-8 bg-[#27292b] text-center rounded-3xl text-white  shadow-xl border-white transform scale-125 ">
            <h1 class="text-white font-semibold text-2xl">Weekly Plan</h1>
            <div class="bg-[#323537] rounded-lg mx-auto mt-2 w-3/4 p-4">
            <p class="tracking-wide">
            <span class="text-gray-400 align-top">$ </span>
              <span class="text-3xl font-semibold">3.0</span>
              <span class="text-gray-400 font-light "> USD</span>
            </p>
            </div>
            <hr class="mt-4 border-1 border-gray-600"/>
            {channels &&(
              <div className="grid justify-center bg-[#212325] rounded-[20px] mt-4 w-42 h-30 overflow-auto scrollbar-thin">
                <span class="text-gray-400 font-light text-xs m-2">Select channel</span>
                {channels?.map((channel) => (
                  <button key={channel.id} onClick={() => handleChannelClick(channel)} className="flex items-center flex-row h-12 my-2 p-1 rounded-lg hover:bg-[#323537] overflow-x-auto scrollbar-thin focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:ring-offset-slate-900">
                    <img src={channel.snippet.thumbnails.default.url} alt={channel.snippet.title} className="rounded-full h-[36px] w-[36px] hover:scale-125 cursor-pointer mr-3  " />

                    <div className="flex flex-col ">
                      <h4 className="font-poppins font-semibold text-xs text-white">
                        {channel.snippet.title}
                      </h4>
                      <div className="flex flex-row ">
                        <p className="font-poppins font-normal mr-1 text-xs text-dimWhite whitespace-nowrap">{channel.snippet.customUrl}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
              <div class="pt-8">
                <p class="font-semibold text-gray-400 text-left">
                  <Done/>
                  <span class="pl-2">
                    <span class="text-white">7</span>
                  </span> Day promotion 
                </p>
                <PurchaseButton onClick={handlePurchaseClick}  channel={selectedChannel} order={2} />
              </div>
          </div>
          </div>
      )}
      </div>
    </div>
  )
}

export default Checkout