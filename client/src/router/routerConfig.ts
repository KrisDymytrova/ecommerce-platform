import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProductPage from '../pages/ProductPage';
import NotFoundPage from '../pages/NotFoundPage';
import CartPage from '../pages/CartPage';

import routeNames from './routeNames';

const routerConfig = [
    {
        path: routeNames.homePage,
        component: HomePage,
    },
    {
        path: routeNames.loginPage,
        component: LoginPage,
    },
    {
        path: routeNames.registerPage,
        component: RegisterPage,
    },
    {
        path: routeNames.productPage,
        component: ProductPage,
    },
    {
        path: routeNames.cartPage,
        component: CartPage,
    },
    {
        path: routeNames.notFoundPage,
        component: NotFoundPage,
    },


];

export default routerConfig;
