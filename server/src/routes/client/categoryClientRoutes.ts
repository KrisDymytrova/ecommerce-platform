import { Router } from 'express';
import { getCategories } from '../../controllers/admin/categoryAdminController';

const router = Router();

router.get('/categories', getCategories);

export default router;
