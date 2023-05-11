import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase
} from "@mui/material";
import {
  ThumbUpAlt,
  Delete,
  MoreHoriz,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "../../../style"
import { deleteVideo, likeVideo } from "../../../actions/videos";

const Video = ({ video, setCurrentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (video?.likes?.length > 0) {
      return video.likes.find(
        (like) => like === (user?.result?.sub || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAlt fontSize="small" />
          &nbsp;
          {video.likes.length > 2
            ? `You and ${video.likes.length - 1} others`
            : `${video.likes.length} like${video.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{video.likes.length} {video.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openVideo = () => navigate(`/video/${video.id}`);
  const openChannel = () => navigate(`/channel/${video.snippet.channelId}`);

  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "15px",
        height: "100%",
        //position: "relative",
        backgroundColor: "black",
        color: "white",
        //maxWidth: 320, 
        minWidth: 200,
      }}
      
    >
      <ButtonBase style={{display: 'block', textAlign: 'initial'}} onClick={openVideo} >      
        <CardMedia
          style={{
            height: 0,
            paddingTop: "56.25%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backgroundBlendMode: "darken",

          }}
          image={video?.snippet?.thumbnails?.maxres?.url}
          title={video?.snippet?.title}
        />
        </ButtonBase>
        <CardContent style={{ backgroundcolor: "bg-primary" }} >
          <div className={`${styles.paragraph}`} >
            <h5 className={`pb-2 font-semibold`} >
              {video?.snippet?.title}
            </h5>
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => openChannel()}
              zIndex={10}
            >
            <h6 className={` font-normal text-gray-400 text-base`} >{video?.snippet?.channelTitle}</h6>
            </Button>
            <div className="flex flex-row text-gray-400">
              <h6 className={` text-sm  pr-1`} >{video?.statistics?.viewCount} views •</h6>
              <h6 className={` text-sm`}>
                {moment(video?.createdAt).fromNow()}
              </h6>
            </div>
          </div>          
        </CardContent>
      
      <CardActions
        style={{
          padding: "0 16px 8px 16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          size="small"
          color="primary"          
          disabled={!user?.result}
          onClick={() => dispatch(likeVideo(video._id))}
        >
          <Likes />
        </Button>
        {(user?.result?.sub === video?.creator || user?.result?._id === video?.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deleteVideo(video._id))}
          >
            <Delete fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Video;
