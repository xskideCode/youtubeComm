import React, { useEffect } from "react";  
import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getVideos } from '../actions/videos';

const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector((state) => state.videos);
    const dispatch = useDispatch();

    useEffect(() => {
        if(page) dispatch(getVideos(page));
    }, [page]);

    return (
        <Pagination
            style={{ 
                ul: {
                justifyContent: 'space-around'
                },
                borderRadius: 4,
                padding: '1rem',
                marginTop: '16px',
        }}
            count = {numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )} 
        />
    );
};

export default Paginate;