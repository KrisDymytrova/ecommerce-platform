import * as React from 'react';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../shared/redux/store';
import { fetchOrders, updateOrderStatusAction, deleteOrderAction } from '../../../shared/redux/slices/ordersSlice';
import Table from './UI/Table';
import Button from './UI/Button';
import ConfirmationModal from '../../../shared/components/UI/ConfirmationModal';
import Snackbar from '../../../shared/components/UI/Snackbar';
import SearchBar from '../../../shared/components/UI/SearchBar';
import { Order, OrderStatus } from '../../../shared/types/Order';

const OrderTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { items: orders, status, error } = useSelector((state: RootState) => state.orders);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('success');
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchOrders());
        }
    }, [dispatch, status]);

    useEffect(() => {
    }, [orders]);

    const handleDelete = () => {
        if (!selectedOrderId) return;
        dispatch(deleteOrderAction(selectedOrderId))
            .unwrap()
            .then(() => {
                setSnackbarMessage('Order deleted successfully');
                setSnackbarType('success');
                setOpenSnackbar(true);
            })
            .catch(() => {
                setSnackbarMessage('Error deleting the order');
                setSnackbarType('error');
                setOpenSnackbar(true);
            })
            .finally(() => {
                setIsModalOpen(false);
                setSelectedOrderId(null);
            });
    };

    const openDeleteModal = (id: string) => {
        setSelectedOrderId(id);
        setIsModalOpen(true);
    };

    const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
        if (isUpdatingStatus) return;
        setIsUpdatingStatus(true);

        dispatch(updateOrderStatusAction({ id: orderId, status: newStatus }))
            .unwrap()
            .then(() => {
                setSnackbarMessage('Order status updated successfully');
                setSnackbarType('success');
                setOpenSnackbar(true);
                dispatch(fetchOrders());
            })
            .catch(() => {
                setSnackbarMessage('Error updating order status');
                setSnackbarType('error');
                setOpenSnackbar(true);
            })
            .finally(() => {
                setIsUpdatingStatus(false);
            });
    };

    const filteredOrders = orders.filter((order) => order._id.toLowerCase().includes(searchQuery.toLowerCase()));

    if (status === "loading") return <p>Loading orders...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    if (!Array.isArray(orders)) {
        return <p>Invalid data for orders</p>;
    }

    const statusOptions = Object.values(OrderStatus).map(status => ({
        value: status as OrderStatus,
        label: status.charAt(0).toUpperCase() + status.slice(1),
    }));

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Orders</h2>

            <div className="flex justify-between mb-4">
                <SearchBar setSearchQuery={setSearchQuery} />
            </div>

            <Table>
                <thead>
                <tr className="bg-gray-100 text-center">
                    <th className="p-3">ID</th>
                    <th className="p-3">Created At</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order: Order) => (
                        <tr key={order._id} className="border-b">
                            <td className="p-3 text-gray-600">{order._id}</td>
                            <td className="p-3 text-gray-600">{new Date(order.createdAt).toLocaleString()}</td>
                            <td className="p-3 text-gray-600">
                                <Select
                                    value={statusOptions.find(option => option.value === order.status)}
                                    onChange={(selectedOption) => handleStatusChange(order._id, selectedOption!.value)}
                                    options={statusOptions}
                                    isClearable={false}
                                />
                            </td>
                            <td className="flex gap-2 p-3 justify-center">
                                <Button variant="danger" size="sm" onClick={() => openDeleteModal(order._id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={4} className="p-3 text-center text-gray-600">
                            No orders found.
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
                message="Are you sure you want to delete this order?"
            />

            <Snackbar
                open={openSnackbar}
                onClose={() => setOpenSnackbar(false)}
                message={snackbarMessage}
                type={snackbarType}
            />
        </div>
    );
};

export default OrderTable;
