import axios from "axios";

let API_URL: string | null = null;
let apiUrlPromise: Promise<string> | null = null;

export const getApiUrl = async (): Promise<string> => {
    if (API_URL) return API_URL;

    if (apiUrlPromise) return apiUrlPromise;

    apiUrlPromise = new Promise(async (resolve, reject) => {
        try {
            const cachedApiUrl = localStorage.getItem("API_URL");
            if (cachedApiUrl) {
                API_URL = cachedApiUrl;
                resolve(API_URL);
                return;
            }

            const response = await axios.get("http://localhost:5002/api/config");
            API_URL = response.data.API_URL;
            localStorage.setItem("API_URL", API_URL);
            resolve(API_URL);
        } catch (error) {
            console.error("Ошибка при получении API_URL:", error);
            reject(error);
        } finally {
            apiUrlPromise = null;
        }
    });

    return apiUrlPromise;
};
