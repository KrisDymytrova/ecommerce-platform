import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../shared/redux/store';
import { fetchOrders } from '../../../../shared/redux/slices/ordersSlice';
import { PieChart } from 'lucide-react';

const TotalOrdersCard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const totalOrders = useSelector((state: RootState) => state.orders.totalOrders);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    return (
        <div className="p-6 bg-gradient-to-b from-orange-100 to-gray-50 rounded-lg shadow-md flex flex-col items-center text-center">
            <PieChart size={40} className="text-orange-500 mb-2"/>
            <h3 className="text-orange-500 font-medium text-lg">Orders</h3>
            <p className="pt-3 text-3xl font-bold text-black">{totalOrders}</p>
        </div>
    );
};

export default TotalOrdersCard;
