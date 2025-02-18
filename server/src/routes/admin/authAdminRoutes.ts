import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import {
    adminLogin,
    adminRefreshToken,
    adminLogout
} from '../../controllers/admin/authAdminController';

const router = express.Router();

router.post('/login', adminLogin);
router.post('/refresh', adminRefreshToken);
router.post('/logout', authMiddleware, adminLogout);

export default router;
