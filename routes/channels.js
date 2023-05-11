import express from 'express';
import { getChannelsBySearch, getChannelsByUser, getChannel, getChannels, createChannel, updateChannel, deleteChannel, likeChannel } from '../controllers/channels.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/search', getChannelsBySearch);
router.post('/', getChannelsByUser);
router.get('/', getChannels);
router.get('/:id', getChannel);
router.post('/', auth, createChannel);
router.patch('/:id', auth, updateChannel);
router.delete('/:id', auth, deleteChannel);
router.patch('/:id/likeChannel', auth, likeChannel);

export default router;