import express from 'express';
import { authMiddleware, adminMiddleware } from '../../middlewares/authMiddleware';
import {
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder
} from '../../controllers/admin/ordersAdminController';

const router = express.Router();

router.get('/', authMiddleware, adminMiddleware, getAllOrders);
router.get('/order/:orderId', authMiddleware, adminMiddleware, getOrderById);
router.patch('/order/:orderId', authMiddleware, adminMiddleware, updateOrderStatus);
router.delete('/order/:orderId', authMiddleware, adminMiddleware, deleteOrder);

export default router;
