import express from 'express';
import { authMiddleware, adminMiddleware } from '../../middlewares/authMiddleware';
import {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} from '../../controllers/admin/categoriesAdminController';

const router = express.Router();

router.post('/create-category', authMiddleware, adminMiddleware, createCategory);
router.get('/', authMiddleware, adminMiddleware, getCategories);
router.get('/:id', authMiddleware, adminMiddleware, getCategoryById);
router.put('/:id', authMiddleware, adminMiddleware, updateCategory);
router.delete('/:id', authMiddleware, adminMiddleware, deleteCategory);

export default router;
