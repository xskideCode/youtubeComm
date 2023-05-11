import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useGoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { fetchgchannel } from '../../actions/gapi';
import { Link } from 'react-router-dom';

import styles from '../../style'
import { youtubelogo2 } from '../../assets'

const initialState = { code: '', scope: '', authuser: '', prompt: '' }

const Hero = () => {

    

    return(
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
        <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
            <div className="flex flex-col justify-between items-center w-full">
                <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px]  text-white ss:leading-[100px] leading-[75px] text-center">
                    Youtube Community <br className="sm:block hidden" /> {" "}
                </h1>
                <p className={`${styles.paragraph} text-center max-w-[470px] mt-5`}>A communtiy for small youtube channels. Get the opportunity to share content beyond your social circle and a few tips from the community</p>  
                <div className={`${styles.flexCenter} mt-10`}>
                <Link to="/auth">
                    <button type="button"  className={`py-3 px-6 bg-purple-700 font-poppins font-medium text-[18px] text-white outline-none ${styles} rounded-[10px]`}>
                    Join Us
                    </button>
                </Link>
                </div>                                   
            </div> 
                             
        </div>
        <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
            <img src={youtubelogo2} alt="youtubelogo" className="w-[90%] relative z-[5] rounded-[30px] rotate-9" />
            <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
            <div className="absolute z-[1] w-[80%] h-[80%] rounded-full bottom-40 white__gradient" />
            <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        </div>
    </section>
  
      
    )
}


export default Hero