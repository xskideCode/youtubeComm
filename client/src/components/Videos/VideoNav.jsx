import React, { useState, useEffect } from 'react'
import { Container, Grow, Grid ,Paper, AppBar, TextField, Button, Autocomplete, Chip } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";

import Categories from '../Home/Categories'
import Videos from './Videos'
import Pagination from '../Pagination';
import { getVideos, getVideosByCategory } from '../../actions/videos';

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const VideoNav = () => {

    const query = useQuery(); 
    const page = query.get('page') || 1;
    const category = query.get('id') || '0';
    const dispatch = useDispatch();
    

    useEffect(() => {
      if (category !== '0') {
        dispatch(getVideosByCategory(category));
      } else {
        dispatch(getVideos());
      }
    }, [category]);  

    
  return (
    <div className="h-[88vh] overflow-auto scrollbar-none text-white font-poppins mb-4">
        <Categories/>
        <Grow in>
            <Container maxWidth="xl" >
                <Videos />
                <Paper elevation={6} style={{ ul: {justifyContent: 'space-around'},}}> 
                  <Pagination page={page} />
                </Paper>
            </Container>
        </Grow>
    </div>
  )
}

export default VideoNav