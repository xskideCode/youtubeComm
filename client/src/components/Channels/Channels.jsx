import React, { useEffect } from 'react'
import { Grid, CircularProgress } from '@mui/material';
import { useSelector,useDispatch } from 'react-redux';


import Channel from './Channel/Channel'
import { getChannels } from '../../actions/channels';

const Channels = ( {setCurrentId} ) => {
    const { channels, isLoading } = useSelector((state) => state.channels);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChannels());        
      }, []);

    if(!channels.length && !isLoading) return 'No channels found';

    return (
        <div className="h-[88vh] overflow-auto scrollbar-none text-white font-poppins pb-5">
        {isLoading ? <CircularProgress /> : (
        <Grid style={{display: 'flex'}} container justifyContent="center" spacing={3}>
            {channels.map((channel) => (
            <Grid key={channel._id} item xs={12} sm={12} md={6} lg={6} >
                <Channel channel={channel} setCurrentId={setCurrentId} flexDirection="row" description={false}/>
            </Grid>
            ))}
        </Grid>
        )}
        </div>
    );
};


export default Channels