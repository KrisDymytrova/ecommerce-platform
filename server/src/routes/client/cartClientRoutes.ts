import express from 'express';
import { addToCart, removeFromCart, getCart } from '../../controllers/client/cartClientController';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = express.Router();

router.post('/cart', authMiddleware, addToCart);
router.delete('/cart/:productId', authMiddleware, removeFromCart);
router.get('/cart', authMiddleware, getCart);

export default router;
