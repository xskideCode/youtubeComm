import express from 'express';
import { getVideosBySearch, getVideosByUser, getVideosByCategory, getVideosByChannel, getVideo, getVideos, createVideo, updateVideo, deleteVideo, likeVideo } from '../controllers/videos.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/search', getVideosBySearch);
router.get('/category', getVideosByCategory);
router.get('/channel', getVideosByChannel);
router.post('/', getVideosByUser);
router.get('/', getVideos);
router.get('/:id', getVideo);
router.post('/', auth, createVideo);
router.patch('/:id', auth, updateVideo);
router.delete('/:id', auth, deleteVideo);
router.patch('/:id/likeVideo', auth, likeVideo);

export default router;