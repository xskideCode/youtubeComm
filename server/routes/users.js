import express from 'express';
import auth from '../middleware/auth.js';
import { signin, signup, gsignup, fetchuser, updateUser, createMessage } from '../controllers/user.js'

const router = express.Router();

router.get('/', (req, res) => {
    res.send('THIS WORKS!');
});

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/gsignup', gsignup);
router.post('/fetchuser', fetchuser);
router.patch('/:id', auth, updateUser);
router.post('/message', auth, createMessage);

export default router;