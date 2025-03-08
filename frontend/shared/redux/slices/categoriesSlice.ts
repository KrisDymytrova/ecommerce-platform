import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Category, CategoriesState } from '../../types/Category';
import {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} from '../../../admin/src/api/apiService';

export const fetchCategories = createAsyncThunk<Category[]>(
    "categories/fetchCategories",
    async () => {
        const response = await getCategories();
        console.log("📌 Запрос отправлен на:", response.config.url);
        console.log("✅ Категории загружены:", response.data);
        return response.data;
    }
);

export const addCategory = createAsyncThunk<Category, { name: string; image: string }>(
    "categories/addCategory",
    async ({ name, image }) => {
        try {
            const payload = { name, image };
            const response = await createCategory(payload);
            console.log("✅ Категория добавлена:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("❌ Ошибка при добавлении категории:", error);
            return Promise.reject(error.response?.data?.message || "Не удалось добавить категорию");
        }
    }
);

export const updateCategoryAction = createAsyncThunk<Category, { id: string; name: string; image: string }>(
    "categories/updateCategory",
    async ({ id, name, image }) => {
        try {
            const response = await updateCategory(id, { name, image });
            console.log("✅ Категория обновлена:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("❌ Ошибка при обновлении категории:", error);
            throw new Error(error.response?.data?.message || "Не удалось обновить категорию");
        }
    }
);

export const deleteCategoryAction = createAsyncThunk<
    string,
    string
>(
    "categories/deleteCategory",
    async (id, { rejectWithValue }) => {
        try {
            await deleteCategory(id);
            console.log(`✅ Категория ${id} удалена`);
            return id;
        } catch (error: any) {
            console.error("❌ Ошибка при удалении категории:", error);
            return rejectWithValue(error.response?.data?.message || "Не удалось удалить категорию");
        }
    }
);

export const fetchCategoryById = createAsyncThunk<Category, string>(
    "categories/fetchCategoryById",
    async (id) => {
        const response = await getCategoryById(id);
        console.log("📌 Запрос отправлен на:", response.config.url);
        console.log("✅ Категория загружена:", response.data);
        return response.data;
    }
);

const initialState: CategoriesState = {
    items: [],
    status: "idle",
    error: null,
    currentCategory: null,
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Ошибка при загрузке категорий";
            })

            .addCase(addCategory.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.error = action.error.message || "Ошибка при добавлении категории";
            })

            .addCase(updateCategoryAction.fulfilled, (state, action) => {
                const index = state.items.findIndex((category) => category._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateCategoryAction.rejected, (state, action) => {
                state.error = action.error.message || "Ошибка при обновлении категории";
            })

            .addCase(deleteCategoryAction.fulfilled, (state, action) => {
                state.items = state.items.filter((category) => category._id !== action.meta.arg);
            })
            .addCase(deleteCategoryAction.rejected, (state, action) => {
                state.error = action.error.message || "Ошибка при удалении категории";
            })

            .addCase(fetchCategoryById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCategoryById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.currentCategory = action.payload;
            })
            .addCase(fetchCategoryById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Ошибка при загрузке категории";
            });
    },
});

export default categoriesSlice.reducer;