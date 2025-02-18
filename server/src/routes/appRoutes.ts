import { Router } from 'express';

// Клієнтські маршрути
import auth from './client/authClientRoutes';
import cart from './client/cartClientRoutes';
import orders from './client/ordersClientRoutes';
import products from './client/productsClientRoutes';
import categories from './client/categoriesClientRoutes';
import profile from './client/profileClientRoutes';
import favorites from './client/favoritesClientRoutes';

// Адмінські маршрути
import adminAuth from './admin/authAdminRoutes';
import adminOrders from './admin/ordersAdminRoutes';
import adminProducts from './admin/productsAdminRoutes';
import adminCategories from './admin/categoriesAdminRoutes';
import adminUsers from './admin/usersAdminRoutes';

// Маршрути для роботи з Новою Поштою
import novaPoshtaRoutes from './novaPoshtaRoutes';

const router = Router();

// Клієнтські маршрути
router.use('/auth', auth);
router.use('/cart', cart);
router.use('/orders', orders);
router.use('/products', products);
router.use('/categories', categories);
router.use('/profile', profile);
router.use('/favorites', favorites);

// Адмінські маршрути
router.use('/admin/auth', adminAuth);
router.use('/admin/orders', adminOrders);
router.use('/admin/products', adminProducts);
router.use('/admin/categories', adminCategories);
router.use('/admin/users', adminUsers);

// Маршрути для Нової Пошти
router.use('/nova-poshta', novaPoshtaRoutes);

export default router;
