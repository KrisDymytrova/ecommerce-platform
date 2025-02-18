import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import {
    addToCart,
    removeFromCart,
    clearCart,
    getCart
} from '../../controllers/client/cartClientController';

const router = express.Router();

router.post('/', authMiddleware, addToCart);
router.delete('/:productId', authMiddleware, removeFromCart);
router.delete('/clear', authMiddleware, clearCart);
router.get('/', authMiddleware, getCart);

export default router;
