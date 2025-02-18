import { Router } from 'express';
import { getAllProducts, getProductById } from '../../controllers/client/productsClientController';

const router = Router();

router.get('/', getAllProducts);
router.get('/:productId', getProductById);

export default router;
