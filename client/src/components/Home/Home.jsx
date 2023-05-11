import React, { useState, useEffect } from "react";
import { Grid} from '@mui/material';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import styles from '../../style'
import { Hero, Promoted, Categories, CTA, Footer, Community } from '../../components';
import { getVideos } from "../../actions/videos";
import Videos from "../Videos/Videos";
import { getChannels } from "../../actions/channels";
import { getPromotions } from "../../actions/promotions";

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideos());
    dispatch(getChannels());
    dispatch(getPromotions());
  }, [currentId, dispatch]);  

  return (
    <><div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Promoted />
          <Categories />
          <div className=" sm:max-h-[750px] max-h-[1090px] mx-4 overflow-clip">
            <Grid  item xs={12} sm={6} md={9} justifyContent="center">
              <Videos setCurrentId={setCurrentId} />
            </Grid>
          </div>
          <div class="relative flex py-5 items-center opacity-50 hover:opacity-90">
              <div class="flex-grow border-t border-gray-400"></div>
              <Link to="/videos">
                <span class="flex-shrink mx-4 text-gray-400">View More</span>
              </Link>
              <div class="flex-grow border-t border-gray-400"></div>
          </div>
          <Community />
          <CTA />
          <Footer />
        </div>
      </div>
    </>

  )
}

export default Home