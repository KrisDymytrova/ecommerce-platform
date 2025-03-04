import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Order, OrdersState } from "../../types/order";
import {
    getOrders,
    updateOrderStatus,
    deleteOrder,
} from "../../../admin/src/api/apiService";

// 📌 Получить все заказы
export const fetchOrders = createAsyncThunk<Order[], void>(
    "orders/fetchOrders",
    async () => {
        try {
            const response = await getOrders();
            console.log("📌 Запрос на получение заказов отправлен:", response.config.url);
            console.log("✅ Заказы загружены:", response.data);
            return response.data;
        } catch (error) {
            console.error("❌ Ошибка при получении заказов:", error);
            throw error;
        }
    }
);

// 📌 Обновить статус заказа
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

// 📌 Удалить заказ
export const deleteOrderAction = createAsyncThunk<string, string>(
    "orders/deleteOrder",
    async (id, { rejectWithValue }) => {
        try {
            await deleteOrder(id);
            console.log(`✅ Заказ ${id} удален`);
            return id; // Возвращаем id удаленного заказа
        } catch (error: any) {
            console.error("❌ Ошибка при удалении заказа:", error);
            return rejectWithValue("Не удалось удалить заказ");
        }
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
                state.error = action.error.message ?? "Ошибка при загрузке заказов";
            })

            .addCase(updateOrderStatusAction.fulfilled, (state, action) => {
                const index = state.items.findIndex((order) => order._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateOrderStatusAction.rejected, (state, action) => {
                state.error = action.error.message ?? "Ошибка при обновлении статуса заказа";
            })

            .addCase(deleteOrderAction.fulfilled, (state, action) => {
                state.items = state.items.filter((order) => order._id !== action.payload);
            })
            .addCase(deleteOrderAction.rejected, (state, action) => {
                state.error = action.error.message ?? "Ошибка при удалении заказа";
            });
    },
});

export default ordersSlice.reducer;
