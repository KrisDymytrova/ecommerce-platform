import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getApiUrl } from "../../apiConfig";
import { getAuthHeaders } from "../../../admin/src/utils/authUtils";
import { CategoriesState, Category } from "../../types/category";

// 🔹 Получение всех категорий
export const fetchCategories = createAsyncThunk<Category[]>(
    "categories/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const API_URL = await getApiUrl();
            const response = await axios.get(`${API_URL}/admin/categories`, {
                headers: getAuthHeaders(),
            });
            console.log("✅ Категории загружены:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("❌ Ошибка при загрузке категорий:", error);
            return rejectWithValue(error.response?.data?.message || "Не удалось загрузить категории");
        }
    }
);

// 🔹 Добавление новой категории
export const addCategory = createAsyncThunk<Category, { name: string; image: string }>(
    "categories/addCategory",
    async ({ name, image }, { rejectWithValue }) => {
        try {
            const API_URL = await getApiUrl();
            const payload = { name, image };
            const response = await axios.post(`${API_URL}/admin/categories/create`, payload, {
                headers: {
                    ...getAuthHeaders(),
                    "Content-Type": "application/json",
                },
            });
            console.log("✅ Категория добавлена:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("❌ Ошибка при добавлении категории:", error);
            return rejectWithValue(error.response?.data?.message || "Не удалось добавить категорию");
        }
    }
);

// 🔹 Обновление категории
export const updateCategory = createAsyncThunk<Category, { id: string; name: string; image: string }>(
    "categories/updateCategory",
    async ({ id, name, image }, { rejectWithValue }) => {
        try {
            const API_URL = await getApiUrl();
            const response = await axios.put(
                `${API_URL}/admin/categories/${id}`,
                { name, image },
                {
                    headers: {
                        ...getAuthHeaders(),
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("✅ Категория обновлена:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("❌ Ошибка при обновлении категории:", error);
            return rejectWithValue(error.response?.data?.message || "Не удалось обновить категорию");
        }
    }
);

// 🔹 Удаление категории
export const deleteCategory = createAsyncThunk<void, string>(
    "categories/deleteCategory",
    async (id, { rejectWithValue }) => {
        try {
            const API_URL = await getApiUrl();
            await axios.delete(`${API_URL}/admin/categories/${id}`, {
                headers: getAuthHeaders(),
            });
            console.log(`✅ Категория ${id} удалена`);
        } catch (error: any) {
            console.error("❌ Ошибка при удалении категории:", error);
            return rejectWithValue(error.response?.data?.message || "Не удалось удалить категорию");
        }
    }
);

// 🔹 Начальное состояние
const initialState: CategoriesState = {
    items: [],
    status: "idle",
    error: null,
};

// 🔹 Создание слайса категорий
const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Получение категорий
            .addCase(fetchCategories.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })

            // Добавление категории
            .addCase(addCategory.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.error = action.payload as string;
            })

            // Обновление категории
            .addCase(updateCategory.fulfilled, (state, action) => {
                const index = state.items.findIndex((category) => category._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.error = action.payload as string;
            })

            // Удаление категории
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.items = state.items.filter((category) => category._id !== action.meta.arg);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export default categoriesSlice.reducer;