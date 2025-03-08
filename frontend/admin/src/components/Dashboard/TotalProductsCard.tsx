import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../shared/redux/store';
import { fetchProducts } from '../../../../shared/redux/slices/productsSlice';
import { Package } from 'lucide-react';

const TotalProductsCard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const totalProducts = useSelector((state: RootState) => state.products.totalProducts);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div className="p-6 bg-gradient-to-b from-green-100 to-gray-50 rounded-lg shadow-md flex flex-col items-center text-center">
            <Package size={40} className="text-green-500 mb-2"/>
            <h3 className="text-green-500 font-medium text-lg">Products</h3>
            <p className="pt-3 text-3xl font-bold text-black">{totalProducts}</p>
        </div>
    );
};

export default TotalProductsCard;
