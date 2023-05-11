import React, { useEffect} from 'react'
import { useDispatch } from "react-redux";
import { getChannels } from '../../actions/channels';

const UserChannel = ({ channel }) => {     

  return (
    <div>
      <div className="flex items-center ss:flex-row flex-col rounded-[20px] ">
        <img src={channel.snippet.thumbnails.default.url} alt={channel.snippet.title} className="rounded-full h-[136px] w-[136px] hover:scale-125 cursor-pointer mr-5 my-5 " />

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
    </div>
  )
}

export default UserChannel