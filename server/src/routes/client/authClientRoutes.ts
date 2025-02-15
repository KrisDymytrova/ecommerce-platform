import express from 'express';
import {
    clientLogin,
    clientRefreshToken,
    clientLogout,
    clientRegister
} from '../../controllers/client/authClientController';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', clientRegister);
router.post('/login', clientLogin);
router.post('/refresh', clientRefreshToken);
router.post('/logout', authMiddleware, clientLogout);

export default router;
