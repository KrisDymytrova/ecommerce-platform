import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../shared/redux/store';
import { fetchUsers } from '../../../../shared/redux/slices/usersSlice';
import { Users } from 'lucide-react';

const TotalUsersCard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const totalUsers = useSelector((state: RootState) => state.users.totalUsers);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <div className="p-6 bg-gradient-to-b from-blue-100 to-gray-50 rounded-lg shadow-md flex flex-col items-center text-center">
            <Users size={40} className="text-blue-500 mb-2"/>
            <h3 className="text-blue-500 font-medium text-lg">Users</h3>
            <p className="pt-3 text-3xl font-bold text-black">{totalUsers}</p>
        </div>
    );
};

export default TotalUsersCard;
