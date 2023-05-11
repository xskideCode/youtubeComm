import React from 'react'
import { Button } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { deleteVideo } from '../../actions/videos'

const UserVideo = ({ video }) => {
  return (
    <div>
      <div className="flex items-center self-center p-auto sm:flex-row flex-col sm:mb-2 ">
        <img src={video.snippet.thumbnails.maxres.url} alt={video.snippet.title} className=" sm:w-[180px] w-[155px] cursor-pointer mr-5 mt-3 " />

        <div className="flex self-center flex-col sm: mt-2  w-64 ">
          <h3 className="font-poppins font-semibold text-[14px] line-clamp-2 text-white">
            {video.snippet.title}
          </h3>
          <h4 className="font-poppins text-[12px] text-gray-400">
            {video.snippet.channelTitle}
          </h4>
        </div>
          <Button
            size="small"
            color="secondary"
            onClick={() => dispatch(deleteVideo(video._id))}
          >
            <Delete fontSize="small" />
          </Button>
      </div>
    </div>
  )
}

export default UserVideo