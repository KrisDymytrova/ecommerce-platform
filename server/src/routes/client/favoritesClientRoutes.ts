import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import {
    addToFavorites,
    removeFromFavorites,
    getFavorites
} from '../../controllers/client/favoritesClientController';

const router = express.Router();

router.post('/add-to-favorites', authMiddleware, addToFavorites);
router.delete('/:productId', authMiddleware, removeFromFavorites);
router.get('/', authMiddleware, getFavorites);

export default router;
