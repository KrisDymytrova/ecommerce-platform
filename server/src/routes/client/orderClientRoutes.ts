import express from 'express';
import { createOrder, getUserOrders } from '../../controllers/client/orderClientController';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = express.Router();

router.post('/orders', authMiddleware, createOrder);
router.get('/orders', authMiddleware, getUserOrders);

export default router;
