import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User, UsersState } from '../../types/User';
import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../../../admin/src/api/apiService';

export const fetchUsers = createAsyncThunk<User[]>(
    "users/fetchUsers",
    async () => {
        const response = await getUsers();
        console.log("📌 Запрос отправлен на:", response.config.url);
        console.log("✅ Пользователи загружены:", response.data);
        return response.data;
    }
);

export const addUser = createAsyncThunk<User, { email: string; username: string; password: string; role: string }>(
    "users/addUser",
    async ({ email, username, password, role }) => {
        try {
            const payload = { email, username, password, role };
            const response = await createUser(payload);
            console.log("✅ Пользователь добавлен:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("❌ Ошибка при добавлении пользователя:", error);
            return Promise.reject(error.response?.data?.message || "Не удалось добавить пользователя");
        }
    }
);

export const updateUserAction = createAsyncThunk<User, { id: string; email: string; username: string; role: string }>(
    "users/updateUser",
    async ({ id, email, username, role }) => {
        console.log(`⏳ Отправляем запрос на обновление пользователя ${id}`, { email, username, role });

        try {
            const response = await updateUser(id, { email, username, role });
            console.log("✅ Ответ от сервера:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("❌ Ошибка при обновлении пользователя:", error);
            throw new Error(error.response?.data?.message || "Не удалось обновить пользователя");
        }
    }
);

export const deleteUserAction = createAsyncThunk<string, string>(
    "users/deleteUser",
    async (id, { rejectWithValue }) => {
        try {
            await deleteUser(id);
            console.log(`✅ Пользователь ${id} удален`);
            return id;
        } catch (error: any) {
            console.error("❌ Ошибка при удалении пользователя:", error);
            return rejectWithValue(error.response?.data?.message || "Не удалось удалить пользователя");
        }
    }
);

export const fetchUserById = createAsyncThunk<User, string>(
    "users/fetchUserById",
    async (id: string) => {
        const response = await getUserById(id);
        console.log("📌 Запрос отправлен на:", response.config.url);
        console.log("✅ Пользователь загружен:", response.data);
        return response.data;
    }
);

const initialState: UsersState = {
    items: [],
    status: "idle",
    error: null,
    currentUser: null,
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Ошибка при загрузке пользователей";
            })

            .addCase(addUser.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.error = action.error.message || "Ошибка при добавлении пользователя";
            })

            .addCase(updateUserAction.fulfilled, (state, action) => {
                const index = state.items.findIndex((user) => user._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateUserAction.rejected, (state, action) => {
                state.error = action.error.message || "Ошибка при обновлении пользователя";
            })

            .addCase(deleteUserAction.fulfilled, (state, action) => {
                state.items = state.items.filter((user) => user._id !== action.payload);
            })
            .addCase(deleteUserAction.rejected, (state, action) => {
                state.error = action.error.message || "Ошибка при удалении пользователя";
            })

            .addCase(fetchUserById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.currentUser = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Ошибка при загрузке пользователя";
            });
    },
});

export default usersSlice.reducer;
