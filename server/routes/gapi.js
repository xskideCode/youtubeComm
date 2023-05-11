import express from 'express';

import { gapi, youtube, videos } from '../controllers/gapi.js'

const router = express.Router();


router.get('/', (req, res) => {
    res.send('THIS WORKS!');
});


router.get('/google', gapi);
router.post('/vid/:videoId', videos);
router.post('/google/yt', youtube);

export default router;