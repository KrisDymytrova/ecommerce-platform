import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const NOVA_POSHTA_API_URL = process.env.NOVA_POSHTA_API_URL!;
const API_KEY = process.env.NOVA_POSHTA_API_KEY!;

interface City {
    Ref: string;
    Name: string;
}

interface Branch {
    Ref: string;
    Description: string;
}

export const getCities = async (cityName: string = ''): Promise<City[]> => {
    try {
        const response = await axios.post(NOVA_POSHTA_API_URL, {
            apiKey: API_KEY,
            modelName: 'AddressGeneral',
            calledMethod: 'searchSettlements',
            methodProperties: {
                CityName: cityName,
                Limit: '50',
                Page: '1',
            },
        });

        const data = response.data;
        if (data.success && data.data.length > 0) {
            return data.data[0].Addresses.map((city: any) => ({
                Ref: city.DeliveryCity,
                Name: city.MainDescription,
            }));
        } else {
            return [];
        }
    } catch (error) {
        console.error('Помилка при отриманні міст Нова Пошта:', error);
        throw new Error('Помилка при отриманні міст');
    }
};

export const getBranches = async (cityRef: string): Promise<Branch[]> => {
    try {
        const response = await axios.post(NOVA_POSHTA_API_URL, {
            apiKey: API_KEY,
            modelName: 'Address',
            calledMethod: 'getWarehouses',
            methodProperties: {
                CityRef: cityRef,
            },
        });

        const data = response.data;
        if (data.success && data.data.length > 0) {
            return data.data.map((branch: any) => ({
                Ref: branch.Ref,
                Description: branch.Description,
            }));
        } else {
            return [];
        }
    } catch (error) {
        console.error('Помилка при отриманні відділень Нова Пошта:', error);
        throw new Error('Помилка при отриманні відділень');
    }
};
