import LoginAdminPage from '../pages/LoginAdminPage';
import DashboardPage from '../pages/DashboardPage';
import UsersPage from '../pages/UsersPage';
import EditUserPage from '../pages/EditUserPage';
import CreateUserPage from '../pages/CreateUserPage';
import ProductsPage from '../pages/ProductsPage';
import EditProductPage from '../pages/EditProductPage';
import CreateProductPage from '../pages/CreateProductPage';
import CategoriesPage from '../pages/CategoriesPage';
import EditCategoryPage from '../pages/EditCategoryPage';
import CreateCategoryPage from '../pages/CreateCategoryPage';
import OrdersPage from '../pages/OrdersPage';
import EditOrderPage from '../pages/EditOrderPage';
import NotFoundPage from '../pages/NotFoundPage';

import routeNames from './routeNames';

const routerConfig = [
    {
        path: routeNames.loginAdminPage,
        component: LoginAdminPage,
    },
    {
        path: routeNames.dashboardPage,
        component: DashboardPage,
    },
    {
        path: routeNames.usersPage,
        component: UsersPage,
    },
    {
        path: routeNames.editUserPage,
        component: EditUserPage,
    },
    {
        path: routeNames.createUserPage,
        component: CreateUserPage,
    },
    {
        path: routeNames.productsPage,
        component: ProductsPage,
    },
    {
        path: routeNames.editProductPage,
        component: EditProductPage,
    },
    {
        path: routeNames.createProductPage,
        component: CreateProductPage,
    },
    {
        path: routeNames.categoriesPage,
        component: CategoriesPage,
    },
    {
        path: routeNames.editCategoryPage,
        component: EditCategoryPage,
    },
    {
        path: routeNames.createCategoryPage,
        component: CreateCategoryPage,
    },
    {
        path: routeNames.ordersPage,
        component: OrdersPage,
    },
    {
        path: routeNames.editOrderPage,
        component: EditOrderPage,
    },
    {
        path: routeNames.notFoundPage,
        component: NotFoundPage,
    },
];

export default routerConfig;
