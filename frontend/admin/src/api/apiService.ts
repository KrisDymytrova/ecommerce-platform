import axios from "axios";
import { getApiUrl } from "../../../shared/apiConfig";

let API_URL: string | null = null;

const getAccessToken = () => localStorage.getItem("accessToken");

const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
        throw new Error("Refresh token не найден");
    }

    try {
        if (!API_URL) {
            API_URL = await getApiUrl();
        }
        const response = await axios.post(`${API_URL}/admin/auth/refresh`, { refreshToken });
        const { accessToken } = response.data;

        localStorage.setItem("accessToken", accessToken);
        return accessToken;
    } catch (error) {
        throw new Error("Ошибка при обновлении токена");
    }
};

const axiosInstance = axios.create({
    baseURL: "",
    headers: {
        "Content-Type": "application/json",
    },
});

const updateApiUrl = async () => {
    if (!API_URL) {
        API_URL = await getApiUrl();
        if (!API_URL) throw new Error("API_URL не найден");
        axiosInstance.defaults.baseURL = API_URL;
    }
};

axiosInstance.interceptors.request.use(
    async (config) => {
        await updateApiUrl();
        config.baseURL = API_URL;

        const accessToken = getAccessToken();
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            try {
                const newAccessToken = await refreshAccessToken();
                error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return axiosInstance(error.config);
            } catch (err) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export const loginUser = (data: { email: string; password: string }) => axiosInstance.post("/admin/auth/login", data);

export const createUser = (data: object) => axiosInstance.post("/admin/users/create-user", data);
export const getUsers = () => axiosInstance.get("/admin/users");
export const getUserById = (id: string) => axiosInstance.get(`/admin/users/${id}`);
export const updateUser = (id: string, data: object) => axiosInstance.put(`/admin/users/${id}`, data);
export const deleteUser = (id: string) => axiosInstance.delete(`/admin/users/${id}`);

export const createCategory = (data: object) => axiosInstance.post("/admin/categories/create-category", data);
export const getCategories = () => axiosInstance.get("/admin/categories");
export const getCategoryById = (id: string) => axiosInstance.get(`/admin/categories/${id}`);
export const updateCategory = (id: string, data: object) => axiosInstance.put(`/admin/categories/${id}`, data);
export const deleteCategory = (id: string) => axiosInstance.delete(`/admin/categories/${id}`);

export const createProduct = (data: object) => axiosInstance.post("/admin/products/create-product", data);
export const getProducts = () => axiosInstance.get("/admin/products");
export const getProductById = (id: string) => axiosInstance.get(`/admin/products/${id}`);
export const updateProduct = (id: string, data: object) => axiosInstance.put(`/admin/products/${id}`, data);
export const deleteProduct = (id: string) => axiosInstance.delete(`/admin/products/${id}`);

export const getOrders = () => axiosInstance.get("/admin/orders");
export const getOrderById = (id: string) => axiosInstance.get(`/admin/orders/${id}`);
export const updateOrderStatus = (id: string, data: object) => axiosInstance.patch(`/admin/orders/${id}`, data);
export const deleteOrder = (id: string) => axiosInstance.delete(`/admin/orders/${id}`);

export default axiosInstance;
