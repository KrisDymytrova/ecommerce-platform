import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getApiUrl } from "../../apiConfig";
import { getAuthHeaders } from "../../../admin/src/utils/authUtils";
import { Product, ProductsState } from "../../types/product";

export const fetchProducts = createAsyncThunk<Product[]>(
    "products/fetchProducts",
    async () => {
        const API_URL = await getApiUrl();
        const response = await axios.get(`${API_URL}/admin/products`, {
            headers: getAuthHeaders(),
        });
        return response.data;
    }
);

export const addProduct = createAsyncThunk<Product, Omit<Product, "_id" | "createdAt" | "updatedAt">>(
    "products/addProduct",
    async (product) => {
        const API_URL = await getApiUrl();
        const response = await axios.post(
            `${API_URL}/admin/products`,
            product,
            { headers: getAuthHeaders() }
        );
        return response.data;
    }
);

export const updateProduct = createAsyncThunk<Product, { id: string; data: Partial<Product> }>(
    "products/updateProduct",
    async ({ id, data }) => {
        const API_URL = await getApiUrl();
        const response = await axios.put(
            `${API_URL}/admin/products/${id}`,
            data,
            { headers: getAuthHeaders() }
        );
        return response.data;
    }
);

export const deleteProduct = createAsyncThunk<void, string>(
    "products/deleteProduct",
    async (id) => {
        const API_URL = await getApiUrl();
        await axios.delete(`${API_URL}/admin/products/${id}`, {
            headers: getAuthHeaders(),
        });
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
                state.error = action.error.message ?? "Failed to load products";
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.items.findIndex((p) => p._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter((p) => p._id !== action.meta.arg);
            });
    },
});

export default productsSlice.reducer;
