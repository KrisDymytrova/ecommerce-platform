import express from 'express';
import { getAllOrders, getOrderById, updateOrderStatus } from '../../controllers/admin/orderAdminController';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = express.Router();

router.get('/orders', authMiddleware, getAllOrders);
router.get('/orders/:orderId', authMiddleware, getOrderById);
router.patch('/orders/:orderId', authMiddleware, updateOrderStatus);

export default router;
