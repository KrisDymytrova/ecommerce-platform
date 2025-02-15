import { Router } from 'express';
import { getAllProducts, getProductById } from '../../controllers/client/productClientController';

const router = Router();

router.get('/products', getAllProducts);
router.get('/product/:productId', getProductById);

export default router;
