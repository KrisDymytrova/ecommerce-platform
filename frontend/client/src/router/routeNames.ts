const routeNames = {
    homePage: '/',
    loginPage: '/login',
    registerPage: '/register',
    productPage: '/product/:id',
    categoryPage: '/category/:categoryName',
    favoritesPage: '/favorites',
    cartPage: '/cart',
    checkoutPage: '/checkout',
    successPage: '/order-success',
    profilePage: '/profile',
    notFoundPage: '*',
};

Object.freeze(routeNames);
export default routeNames;
