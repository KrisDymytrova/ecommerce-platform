import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productsReducer from './slices/productsSlice';
import categoriesReducer from './slices/categoriesSlice';
import usersReducer from './slices/usersSlice';
import ordersReducer from './slices/ordersSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        categories: categoriesReducer,
        users: usersReducer,
        orders: ordersReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
