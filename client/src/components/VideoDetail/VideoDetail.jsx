import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, Divider } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch } from "react-redux";

import { Videos, Loader } from "../../components"
import { getVideo, getVideos } from "../../actions/videos";
import { useSelector } from "react-redux";

const VideoDetail = () => {
  const { video, videos } = useSelector((state) => state.videos)
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos1, setVideos1] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideo(id))
    dispatch(getVideos())
    setVideoDetail(video)

    setVideos1(videos)
  }, [id]);

  if(!video) return <Loader />;

  const recommendedVideos = videos.filter(({ _id }) => _id !== video._id);

  return (
    <Box minHeight="95vh" className="font-poppins ">
      <Stack direction={{ xs: "column", md: "column" }}>
        <Box flex={1}>
        {video?.map((video) => (
          <Box sx={{ width: {lg: "75%", sm: "100%"}, position: "sticky", top: "86px" }}>
            <div className="relative pb-[56.25%] w-full ">
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="absolute top-0 left-0" controls width='100%'       height='100%' />
            </div>
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {video?.snippet?.title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2} >
              <Link to={`/channel/${video?.snippet?.channelId}`}>
                <Typography variant={{ sm: "subtitle1", md: 'h6' }}  color="#fff" >
                  {video?.snippet?.channelTitle}
                  <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(video?.statistics?.viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(video?.statistics?.likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        ))[0]}
        </Box>
        <Box  py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" >
        <Typography gutterBottom variant="h6">You might also like</Typography>
          <Divider sx={{ marginBottom: 5}} />
          <Videos videos={recommendedVideos} />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;