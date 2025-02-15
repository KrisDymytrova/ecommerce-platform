import { Router } from 'express';
import clientAuthRoutes from './client/authClientRoutes';
import adminAuthRoutes from './admin/authAdminRoutes';
import cartClientRoutes from './client/cartClientRoutes';
import orderClientRoutes from './client/orderClientRoutes';
import orderAdminRoutes from './admin/orderAdminRoutes';
import productClientRoutes from './client/productClientRoutes';
import productAdminRoutes from './admin/productAdminRoutes';
import categoryClientRoutes from './client/categoryClientRoutes';
import categoryAdminRoutes from './admin/categoryAdminRoutes';
import userClientRoutes from './client/userClientRoutes';
import userAdminRoutes from './admin/userAdminRoutes';

const router = Router();

router.use('/auth/client', clientAuthRoutes);
router.use('/auth/admin', adminAuthRoutes);

router.use('/cart/client', cartClientRoutes);

router.use('/order/client', orderClientRoutes);
router.use('/order/admin', orderAdminRoutes);

router.use('/product/client', productClientRoutes);
router.use('/product/admin', productAdminRoutes);

router.use('/category/client', categoryClientRoutes);
router.use('/category/admin', categoryAdminRoutes);

router.use('/user/client', userClientRoutes);
router.use('/user/admin', userAdminRoutes);

export default router;
