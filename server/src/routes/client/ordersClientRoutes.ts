import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { createOrder, getUserOrders } from '../../controllers/client/ordersClientController';

const router = express.Router();

router.post('/create-order', authMiddleware, createOrder);
router.get('/', authMiddleware, getUserOrders);

export default router;
