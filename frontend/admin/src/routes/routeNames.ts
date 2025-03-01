const routeNames = {
    loginAdminPage: '/',
    dashboardPage: '/dashboard',
    usersPage: '/users',
    editUserPage: '/users/edit/:id',
    createUserPage: '/users/create',
    productsPage: '/products',
    editProductPage: '/products/edit/:id',
    createProductPage: '/products/create',
    categoriesPage: '/categories',
    editCategoryPage: '/categories/edit/:id',
    createCategoryPage: '/categories/create',
    ordersPage: '/orders',
    editOrderPage: '/orders/edit/:id',
    notFoundPage: '*',
};

Object.freeze(routeNames);
export default routeNames;
