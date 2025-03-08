import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Order, OrdersState } from '../../types/Order';
import { getOrders, getOrderById, updateOrderStatus, deleteOrder } from '../../../admin/src/api/apiService';

export const fetchOrders = createAsyncThunk<Order[]>(
    "orders/fetchOrders",
    async () => {
        const response = await getOrders();
        console.log("📌 Ответ от сервера:", response.data);
        return response.data.orders || [];
    }
);

export const fetchOrderById = createAsyncThunk<Order, string>(
    "orders/fetchOrderById",
    async (id) => {
        const response = await getOrderById(id);
        console.log("📌 Заказ загружен:", response.data);
        return response.data;
    }
);

export const updateOrderStatusAction = createAsyncThunk<Order, { id: string; status: string }>(
    "orders/updateOrderStatus",
    async ({ id, status }) => {
        try {
            const response = await updateOrderStatus(id, { status });
            console.log("✅ Статус заказа обновлен:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("❌ Ошибка при обновлении статуса заказа:", error);
            throw new Error(error.response?.data?.message || "Не удалось обновить статус заказа");
        }
    }
);

export const deleteOrderAction = createAsyncThunk<string, string>(
    "orders/deleteOrder",
    async (id, { rejectWithValue }) => {
        try {
            await deleteOrder(id);
            console.log(`✅ Заказ ${id} удален`);
            return id;
        } catch (error: any) {
            console.error("❌ Ошибка при удалении заказа:", error);
            return rejectWithValue(error.response?.data?.message || "Не удалось удалить заказ");
        }
    }
);

const initialState: OrdersState = {
    items: [],
    totalOrders: 0,
    status: "idle",
    error: null,
    currentOrder: null,
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
                state.totalOrders = action.payload.length;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Ошибка при загрузке заказов";
            })

            .addCase(fetchOrderById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.currentOrder = action.payload;
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Ошибка при загрузке заказа";
            })

            .addCase(updateOrderStatusAction.fulfilled, (state, action) => {
                const index = state.items.findIndex(order => order._id === action.payload._id);
                if (index !== -1) {
                    state.items[index].status = action.payload.status;
                }
            })
            .addCase(updateOrderStatusAction.rejected, (state, action) => {
                state.error = action.error.message || "Ошибка при обновлении статуса заказа";
            })

            .addCase(deleteOrderAction.fulfilled, (state, action) => {
                state.items = state.items.filter((order) => order._id !== action.payload);
                state.totalOrders = state.items.length;
            })
            .addCase(deleteOrderAction.rejected, (state, action) => {
                state.error = action.error.message || "Ошибка при удалении заказа";
            });
    },
});

export default ordersSlice.reducer;
