import express from 'express';
import { authMiddleware, adminMiddleware } from '../../middlewares/authMiddleware';
import {
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    updateOrder,
    deleteOrder
} from '../../controllers/admin/ordersAdminController';

const router = express.Router();

router.get('/', authMiddleware, adminMiddleware, getAllOrders);
router.get('/:orderId', authMiddleware, adminMiddleware, getOrderById);
router.patch('/:orderId', authMiddleware, adminMiddleware, updateOrderStatus);
router.put("/:orderId", authMiddleware, adminMiddleware, updateOrder);
router.delete('/:orderId', authMiddleware, adminMiddleware, deleteOrder);

export default router;
