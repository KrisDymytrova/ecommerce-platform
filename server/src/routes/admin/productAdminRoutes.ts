import { Router } from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { createProduct, updateProduct, deleteProduct } from '../../controllers/admin/productAdminController';

const router = Router();

router.post('/product', authMiddleware, createProduct);
router.put('/product/:productId', authMiddleware, updateProduct);
router.delete('/product/:productId', authMiddleware, deleteProduct);

export default router;
