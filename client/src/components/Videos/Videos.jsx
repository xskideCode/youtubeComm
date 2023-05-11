import React from 'react'
import { Grid, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

import Video from './Video/Video'

const Videos = ( {setCurrentId} ) => {
    const { videos, loading } = useSelector((state) => state.videos);

    if(!videos.length && !loading) return 'No videos found';

    return (
        loading ? <CircularProgress /> : (
        <Grid style={{display: 'flex'}} container justifyContent="center" spacing={3}>
            {videos.map((video) => (
            <Grid key={video._id} item xs={12} sm={6} md={4} lg={3} >
                <Video video={video} setCurrentId={setCurrentId}/>
            </Grid>
            ))}
        </Grid>
        )
    );
};


export default Videos