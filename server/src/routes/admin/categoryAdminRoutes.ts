import { Router } from 'express';
import { createCategory, getCategories, updateCategory, deleteCategory } from '../../controllers/admin/categoryAdminController';

const router = Router();

router.post('/categories', createCategory);
router.get('/categories', getCategories);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

export default router;
