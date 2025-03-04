import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product, ProductsState } from "../../types/product";
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from "../../../admin/src/api/apiService";

export const fetchProducts = createAsyncThunk<Product[]>(
    "products/fetchProducts",
    async () => {
        const response = await getProducts();
        console.log("📌 Запрос отправлен на:", response.config.url);
        console.log("✅ Товары загружены:", response.data);
        return response.data;
    }
);

export const addProduct = createAsyncThunk<Product, { name: string; price: number; image: string }>(
    "products/addProduct",
    async ({ name, price, image }) => {
        try {
            const payload = { name, price, image };
            const response = await createProduct(payload);
            console.log("✅ Товар добавлен:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("❌ Ошибка при добавлении товара:", error);
            return Promise.reject(error.response?.data?.message || "Не удалось добавить товар");
        }
    }
);

export const updateProductAction = createAsyncThunk<Product, { id: string; name: string; price: number; image: string }>(
    "products/updateProduct",
    async ({ id, name, price, image }) => {
        try {
            const response = await updateProduct(id, { name, price, image });
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

const initialState: ProductsState = {
    items: [],
    status: "idle",
    error: null,
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
            })
            .addCase(deleteProductAction.rejected, (state, action) => {
                state.error = action.error.message || "Ошибка при удалении товара";
            });
    },
});

export default productsSlice.reducer;
