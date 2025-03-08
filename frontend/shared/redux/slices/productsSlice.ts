import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product, ProductsState } from '../../types/product';
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from '../../../admin/src/api/apiService';

export const fetchProducts = createAsyncThunk<Product[]>(
    "products/fetchProducts",
    async () => {
        const response = await getProducts();
        console.log("📌 Запрос отправлен на:", response.config.url);
        console.log("✅ Товары загружены:", response.data);
        return response.data;
    }
);

export const addProduct = createAsyncThunk<
    Product,
    { title: string; price: number; description: string; categoryId: string; images: string[] }
>(
    "products/addProduct",
    async ({ title, price, description, categoryId, images }) => {
        try {
            const payload = { title, price, description, categoryId, images };
            const response = await createProduct(payload);
            console.log("✅ Товар добавлен:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("❌ Ошибка при добавлении товара:", error);
            if (error.response) {
                console.log("🔍 Ответ сервера:", error.response);
            }
            return Promise.reject(error.response?.data?.message || "Не удалось добавить товар");
        }
    }
);

export const updateProductAction = createAsyncThunk<Product, { id: string; title: string; price: number; description: string; categoryId: string; images: string[] }>(
    "products/updateProduct",
    async ({ id, title, price, description, categoryId, images }) => {
        try {
            const response = await updateProduct(id, { title, price, description, categoryId, images });

            console.log("✅ Товар обновлен:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("❌ Ошибка при обновлении товара:", error);
            throw new Error(error.response?.data?.message || "Не удалось обновить товар");
        }
    }
);

export const deleteProductAction = createAsyncThunk<
    string,
    string
>(
    "products/deleteProduct",
    async (id, { rejectWithValue }) => {
        try {
            await deleteProduct(id);
            console.log(`✅ Товар ${id} удален`);
            return id;
        } catch (error: any) {
            console.error("❌ Ошибка при удалении товара:", error);
            return rejectWithValue(error.response?.data?.message || "Не удалось удалить товар");
        }
    }
);

export const fetchProductById = createAsyncThunk<Product, string>(
    "products/fetchProductById",
    async (id) => {
        const response = await getProductById(id);
        console.log("📌 Запрос отправлен на:", response.config.url);
        console.log("✅ Товар загружен:", response.data);
        return response.data;
    }
);

const initialState: ProductsState = {
    items: [],
    totalProducts: 0,
    status: "idle",
    error: null,
    currentProduct: null,
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
                state.totalProducts = action.payload.length;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Ошибка при загрузке товаров";
            })

            .addCase(addProduct.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.error = action.error.message || "Ошибка при добавлении товара";
            })

            .addCase(updateProductAction.fulfilled, (state, action) => {
                const index = state.items.findIndex((product) => product._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateProductAction.rejected, (state, action) => {
                state.error = action.error.message || "Ошибка при обновлении товара";
            })

            .addCase(deleteProductAction.fulfilled, (state, action) => {
                state.items = state.items.filter((product) => product._id !== action.meta.arg);
                state.totalProducts = action.payload.length;
            })
            .addCase(deleteProductAction.rejected, (state, action) => {
                state.error = action.error.message || "Ошибка при удалении товара";
            })

            .addCase(fetchProductById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.currentProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Ошибка при загрузке товара";
            });
    },
});

export default productsSlice.reducer;
