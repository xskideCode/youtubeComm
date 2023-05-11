import { useSelector,useDispatch } from 'react-redux';
import { Button, Typography, CardContent, CardMedia } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
import { demoProfilePicture } from '../../constants';

import styles from '../../style'
import { promotedChannels } from '../../constants'
import {Channel, Loader} from '../../components';
//import ChannelCard from './ChannelCard'

const Promoted = () => {

    const { promotions, isloading } = useSelector((state) => state.promotions);
    const dispatch = useDispatch();

    return (

        <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
            <div className="flex flex-row justify-center items-center py-[3px] px-4 bg-discount-gradient rounded-[10px] mb-2 ">
                <p className={`font-poppins font-normal text-dimWhite xs:text-[18px] text-[12px] m-2 text-center`}>
                    <span className="  text-white">PROMOTED CHANNELS</span>
                </p>
            </div>
            <div className={`${styles.scrollbarDark1} flex flex-row justify-start items-center py-[6px] px-2 bg-discount-gradient rounded-[10px] mb-2 w-11/12 overflow-x-auto`}>
            {isloading ? (
                <Loader />
                ) : (
                promotions.map((promotion) => (
                    <div className="flex flex-row justify-center px-5 py-1 ">
                    <div className="flex flex-col items-center">
                        <Link to={`/channel/${promotion?.id}`}>
                            <div className='flex flex-col justify-center items-center'>
                            <img
                                src={promotion?.snippet?.thumbnails?.default?.url || demoProfilePicture }
                                alt={promotion?.snippet?.title}
                                className=" rounded-full w-16 h-16 sm:h-20 sm:w-20"                                
                            />
                                <h6 className='px-auto my-1 truncate font-poppins font-semibold xs:text-[14px] text-[12px]'>
                                    {promotion?.snippet?.title}
                                    <CheckCircleIcon sx={{ fontSize: '12px', color: 'gray', ml: '4px' }} />
                                </h6>
                            </div>
                        </Link>
                        <button
                            type="button" 
                            className={`py-1 px-2 bg-red-600 font-poppins font-semibold text-[12px] text-white outline-none ${styles} rounded-md`}
                            onClick={() => {
                                const url = `https://www.youtube.com/channel/${promotion.id}?sub_confirmation=1`;
                                window.open(url, '_blank');
                            }}
                            >
                            Subscribe
                        </button>
                    </div>
                    </div>
                ))
            )}
            </div>
        </section>
    )
}


export default Promoted