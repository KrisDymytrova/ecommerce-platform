import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getApiUrl } from "../../apiConfig";
import { getAuthHeaders } from "../../../admin/src/utils/authUtils";
import { Order, OrdersState } from "../../types/order";

// 📌 Получить все заказы
export const fetchOrders = createAsyncThunk<Order[], void>(
    "orders/fetchOrders",
    async () => {
        const API_URL = await getApiUrl();
        try {
            const response = await axios.get(`${API_URL}/admin/orders`, {
                headers: getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching orders:", error);
            throw error;
        }
    }
);

// 📌 Обновить статус заказа
export const updateOrderStatus = createAsyncThunk<Order, { id: string; status: string }>(
    "orders/updateOrderStatus",
    async ({ id, status }) => {
        const API_URL = await getApiUrl();
        const response = await axios.put(
            `${API_URL}/admin/orders/${id}`,
            { status },
            { headers: getAuthHeaders() }
        );
        return response.data;
    }
);

// 📌 Удалить заказ
export const deleteOrder = createAsyncThunk<void, string>(
    "orders/deleteOrder",
    async (id) => {
        const API_URL = await getApiUrl();
        await axios.delete(`${API_URL}/admin/orders/${id}`, {
            headers: getAuthHeaders(),
        });
    }
);

const initialState: OrdersState = {
    items: [],
    status: "idle",
    error: null,
};

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Failed to load orders.";
            })

            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const index = state.items.findIndex((order) => order._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })

            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.items = state.items.filter((order) => order._id !== action.meta.arg);
            });
    },
});

export default ordersSlice.reducer;
