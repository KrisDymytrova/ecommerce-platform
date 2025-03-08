const routeNames = {
    loginAdminPage: '/',
    dashboardPage: '/dashboard',
    usersPage: '/users',
    editUserPage: '/users/edit/:id',
    createUserPage: '/users/create-user',
    productsPage: '/products',
    editProductPage: '/products/edit/:id',
    createProductPage: '/products/create-product',
    categoriesPage: '/categories',
    editCategoryPage: '/categories/edit/:id',
    createCategoryPage: '/categories/create-category',
    ordersPage: '/orders',
    notFoundPage: '*',
};

Object.freeze(routeNames);
export default routeNames;
