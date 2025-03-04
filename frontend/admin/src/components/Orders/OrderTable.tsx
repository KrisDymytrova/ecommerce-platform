import * as React from "react";
import { useEffect, useState } from "react";
import Table from "../../../src/components/UI/Table";
import Button from "../../../src/components/UI/Button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../../../shared/redux/slices/ordersSlice";
import { RootState, AppDispatch } from "../../../../shared/redux/store";
import { getAuthHeaders } from "../../utils/authUtils";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../../../../shared/apiConfig";
import ConfirmationModal from "../../../../shared/components/UI/ConfirmationModal";
import Select from "react-select";
import { Order } from "../../../../shared/types/Order";
import Snackbar from "../../../../shared/components/UI/Snackbar"; // Импортируем Snackbar

const OrderTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { items: orders, status, error } = useSelector((state: RootState) => state.orders);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('success');
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchOrders());
        }
    }, [dispatch, status]);

    const handleDelete = async () => {
        if (!selectedOrderId) return;
        try {
            const API_URL = await getApiUrl();
            await axios.delete(`${API_URL}/admin/orders/${selectedOrderId}`, {
                headers: getAuthHeaders(),
            });
            dispatch(fetchOrders());
            setSnackbarMessage('Order deleted successfully');
            setSnackbarType('success');
            setOpenSnackbar(true);
        } catch (error) {
            setSnackbarMessage('Error deleting the order');
            setSnackbarType('error');
            setOpenSnackbar(true);
        } finally {
            setIsModalOpen(false);
            setSelectedOrderId(null);
        }
    };

    const openDeleteModal = (id: string) => {
        setSelectedOrderId(id);
        setIsModalOpen(true);
    };

    const handleEdit = (id: string) => {
        navigate(`/orders/edit/${id}`);
    };

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        if (isUpdatingStatus) return; // предотвращаем несколько запросов
        setIsUpdatingStatus(true);
        try {
            const API_URL = await getApiUrl();
            await axios.patch(
                `${API_URL}/orders/${orderId}/status`,
                { status: newStatus },
                { headers: getAuthHeaders() }
            );
            dispatch(fetchOrders());
            setSnackbarMessage('Order status updated successfully');
            setSnackbarType('success');
            setOpenSnackbar(true);
        } catch (error) {
            setSnackbarMessage('Error updating order status');
            setSnackbarType('error');
            setOpenSnackbar(true);
        } finally {
            setIsUpdatingStatus(false);
        }
    };

    if (status === "loading") return <p>Завантаження замовлень...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    const statusOptions = [
        { value: "pending", label: "Очікує" },
        { value: "processing", label: "В обробці" },
        { value: "shipped", label: "Відправлено" },
        { value: "delivered", label: "Доставлено" },
        { value: "canceled", label: "Скасовано" },
    ];

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Замовлення</h2>
            <Table>
                <thead>
                <tr className="bg-gray-100 text-center">
                    <th className="p-3">Номер замовлення</th>
                    <th className="p-3">Час замовлення</th>
                    <th className="p-3">Статус</th>
                    <th className="p-3">Дії</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order: Order) => (
                    <tr key={order._id} className="border-b">
                        <td className="p-3 text-gray-600">{order._id}</td>
                        <td className="p-3 text-gray-600">{new Date(order.createdAt).toLocaleString()}</td>
                        <td className="p-3 text-gray-600">
                            <Select
                                value={statusOptions.find(option => option.value === order.status)}
                                onChange={(selectedOption) => handleStatusChange(order._id, selectedOption?.value ?? order.status)}
                                options={statusOptions}
                                isClearable={false}
                            />
                        </td>
                        <td className="flex gap-2 p-3 justify-center">
                            <Button variant="outline" size="sm" onClick={() => handleEdit(order._id)}>
                                Редагувати
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => openDeleteModal(order._id)}>
                                Видалити
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
                message="Ви впевнені, що хочете видалити це замовлення?"
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
