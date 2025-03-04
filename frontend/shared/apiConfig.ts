import axios from "axios";

let API_URL: string | null = null;
let apiUrlPromise: Promise<string> | null = null;

export const getApiUrl = async (): Promise<string> => {
    if (API_URL) return API_URL;
    if (apiUrlPromise) return apiUrlPromise;

    apiUrlPromise = (async () => {
        try {
            const cachedApiUrl = localStorage.getItem("API_URL");
            if (cachedApiUrl) {
                API_URL = cachedApiUrl;
                return API_URL;
            }

            const response = await axios.get("http://localhost:5002/api/config");
            API_URL = response.data.API_URL;
            localStorage.setItem("API_URL", API_URL);
            return API_URL;
        } catch (error) {
            console.error("Ошибка при получении API_URL:", error);
            throw error;
        }
    })();

    return apiUrlPromise;
};
