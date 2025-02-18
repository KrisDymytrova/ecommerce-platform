import express from 'express';
import { authMiddleware, adminMiddleware } from '../../middlewares/authMiddleware';
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from '../../controllers/admin/productsAdminController';

const router = express.Router();

router.post('/create-product', authMiddleware, adminMiddleware, createProduct);
router.get('/', authMiddleware, adminMiddleware, getProducts);
router.get('/product/:id', authMiddleware, adminMiddleware, getProductById);
router.put('/product/:id', authMiddleware, adminMiddleware, updateProduct);
router.delete('/product/:id', authMiddleware, adminMiddleware, deleteProduct);

export default router;
