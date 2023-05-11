import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { getChannel } from "../../actions/channels";
import { useSelector } from "react-redux";

import Videos from "../Videos/Videos";
import Channel from "../Channels/Channel/Channel";
import { getVideosByChannel } from "../../actions/videos";

const ChannelDetail = () => {
  const { channel, channels, isLoading } = useSelector((state) => state.channels);
  const { videos, loading } = useSelector((state) => state.videos);
  const dispatch = useDispatch();

  const { id } = useParams();
  

  useEffect(() => {
      dispatch(getChannel(id));
      
      dispatch(getVideosByChannel(id));  
   
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box mb={3}>
        <div
        className=" sm:h-60 h-32 "
          style={{           
            background:
              "linear-gradient(90deg, rgba(65,17,148,1) 0%, rgba(147,45,205,1) 50%, rgba(111,31,159,1) 100%)",
            zIndex: 10,
          }}
        />
            <Channel channel={channel} marginTop="-90px" contacts={true} />
      </Box>
      <Box p={2} display="flex m-auto overflow-auto scrollbar-none ">
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos videos={videos} />
        
      </Box>
    </Box>
  );
};

export default ChannelDetail;
