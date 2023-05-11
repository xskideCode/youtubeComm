import React from 'react';
import { Box, Button, CardContent, CardMedia, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
import { demoProfilePicture } from '../../../constants';
import Contacts from '../../Contacts';

function shortenNumber(str) {
  const num = Number(str);
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "m";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  } else {
    return str;
  }
}
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Channel = ({ channel, marginTop, contacts }) => (
  <Box
    sx={{
      boxShadow: 'none',
      borderRadius: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: { xs: '90%', md: '95%' },
      margin: 'auto',
      marginTop,
    }}
  >
    {contacts && (
      <div class="absolute top-53 right-3 sm:right-24 z-20">
        <Contacts channel={channel}/>
      </div>
    )}
    <Link to={`/channel/${channel?.id}`}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', color: '#fff' }}>
        <div className="m-auto">
        <CardMedia
          image={channel?.snippet?.thumbnails?.default?.url || demoProfilePicture }
          alt={channel?.snippet?.title}
          sx={{ borderRadius: '50%', height: { xs: '150px', md: '180px' }, width: { xs: '150px', md: '180px' }, mb: 2, border: '1px solid #e3e3e3' }}
        />
        <Typography variant="h6">
          {channel?.snippet?.title}{' '}
          <CheckCircleIcon sx={{ fontSize: '14px', color: 'gray', ml: '5px' }} />
        </Typography>
        </div>
          <div className="flex m-auto ">
          <Typography sx={{ paddingRight: '8px', fontSize: '15px', fontWeight: 500, color: 'gray' }}>
            {channel?.snippet?.customUrl}
          </Typography>
          <Typography sx={{ paddingRight: '8px', fontSize: '15px', fontWeight: 500, color: 'gray' }}>
            {/* {parseInt(channel?.statistics?.subscriberCount).toLocaleString('en-US')} Subscribers */}
            {shortenNumber(channel?.statistics?.subscriberCount)} subscribers
          </Typography>
          <Typography sx={{ fontSize: '15px', fontWeight: 500, color: 'gray' }}>
            {/* {parseInt(channel?.statistics?.videoCount).toLocaleString('en-US')} */}
            {shortenNumber(channel?.statistics?.videoCount)} videos
          </Typography>
        </div>
        <div className="w-[50%] m-auto">
        <Typography sx={{ fontSize: '15px', fontWeight: 500, color: 'gray', display: '-webkit-box', overflow: 'hidden', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
          {channel?.snippet?.description}
        </Typography>
        </div>
      </CardContent>
    </Link>
    <Button
      size="medium"
      color="secondary"
      variant="contained"          
      onClick={() => {
        const url = `https://www.youtube.com/channel/${channel.id}?sub_confirmation=1`;
        window.open(url, '_blank');
      }}
    >
      Subscribe
    </Button>
  </Box>
);

export default Channel;