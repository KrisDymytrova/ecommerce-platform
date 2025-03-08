import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from '../../../admin/src/api/apiService';

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<{ accessToken: string, refreshToken: string }>) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            localStorage.setItem('accessToken', action.payload.accessToken);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.accessToken = null;
            state.refreshToken = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export const login = (data: { email: string, password: string }) => async (dispatch: any) => {
    dispatch(loginStart());
    try {
        const response = await loginUser(data);
        dispatch(loginSuccess({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
        }));
    } catch (error) {
        dispatch(loginFailure("Invalid email or password."));
    }
};

export default authSlice.reducer;
