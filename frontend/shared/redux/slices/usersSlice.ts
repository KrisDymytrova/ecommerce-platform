import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getApiUrl } from "../../apiConfig";
import { getAuthHeaders } from "../../../admin/src/utils/authUtils";
import { User, UsersState } from "../../types/User";

export const fetchUsers = createAsyncThunk<User[]>(
    "users/fetchUsers",
    async () => {
        const API_URL = await getApiUrl();
        const headers = getAuthHeaders();
        try {
            const response = await axios.get(`${API_URL}/admin/users`, { headers });
            return response.data;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }
);

export const addUser = createAsyncThunk<User, { email: string; username: string; role: string }>(
    "users/addUser",
    async ({ email, username, role }) => {
        const API_URL = await getApiUrl();
        const response = await axios.post(
            `${API_URL}/admin/users/create-user`,
            { email, username, role },
            { headers: getAuthHeaders() }
        );
        return response.data;
    }
);

export const updateUser = createAsyncThunk<User, { id: string; email: string; username: string; role: string }>(
    "users/updateUser",
    async ({ id, email, username, role }) => {
        const API_URL = await getApiUrl();
        const response = await axios.put(
            `${API_URL}/admin/users/${id}`,
            { email, username, role },
            { headers: getAuthHeaders() }
        );
        return response.data;
    }
);

export const deleteUser = createAsyncThunk<void, string>(
    "users/deleteUser",
    async (id) => {
        const API_URL = await getApiUrl();
        await axios.delete(`${API_URL}/admin/users/${id}`, { headers: getAuthHeaders() });
    }
);

const initialState: UsersState = {
    items: [],
    status: "idle",
    error: null,
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
                state.error = action.error.message ?? "Failed to load users.";
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.items.findIndex((user) => user._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.items = state.items.filter((user) => user._id !== action.meta.arg);
            });
    },
});

export default usersSlice.reducer;
