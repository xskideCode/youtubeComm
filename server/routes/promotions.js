import express from 'express';
import auth from '../middleware/auth.js';
import { createPromotion, getPromotions } from '../controllers/promoted.js'

const router = express.Router();

router.post('/', auth, createPromotion);
router.get('/', getPromotions);


export default router;