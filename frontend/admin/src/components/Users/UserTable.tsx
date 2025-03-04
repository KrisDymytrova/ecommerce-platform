import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../shared/redux/store';
import { fetchUsers, deleteUserAction } from '../../../../shared/redux/slices/usersSlice';
import Table from '../../../src/components/UI/Table';
import Button from '../../../src/components/UI/Button';
import ConfirmationModal from '../../../../shared/components/UI/ConfirmationModal';
import Snackbar from '../../../../shared/components/UI/Snackbar';

const UserTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { items: users, status, error } = useSelector((state: RootState) => state.users);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('success');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (status === "idle" && users.length === 0) {
            dispatch(fetchUsers());
        }
    }, [dispatch, status, users.length]);

    const handleCreate = () => {
        navigate('/users/create-user');
    };

    const handleEdit = (id: string) => {
        navigate(`/users/edit/${id}`);
    };

    const handleDelete = async () => {
        if (!selectedUserId || isDeleting) return;
        setIsDeleting(true);

        try {
            await dispatch(deleteUserAction(selectedUserId));
            setSnackbarMessage('User deleted successfully');
            setSnackbarType('success');
            setOpenSnackbar(true);
        } catch (error) {
            setSnackbarMessage('Error deleting the user');
            setSnackbarType('error');
            setOpenSnackbar(true);
        } finally {
            setIsModalOpen(false);
            setSelectedUserId(null);
            setIsDeleting(false);
        }
    };

    const openDeleteModal = (id: string) => {
        setSelectedUserId(id);
        setIsModalOpen(true);
    };

    if (status === "loading") return <p>Loading users...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Users</h2>
            <div className="mb-4">
                <Button variant="primary" size="sm" onClick={handleCreate}>
                    Create User
                </Button>
            </div>
            <Table>
                <thead>
                <tr className="bg-gray-100 text-center">
                    <th className="p-3">ID</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Username</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user._id} className="border-b">
                        <td className="p-3 text-gray-600">{user._id}</td>
                        <td className="p-3 text-gray-600">{user.email}</td>
                        <td className="p-3 text-gray-600">{user.username}</td>
                        <td className="p-3 text-gray-600">{user.role}</td>
                        <td className="flex gap-2 p-3 justify-center">
                            <Button variant="outline" size="sm" onClick={() => handleEdit(user._id)}>
                                Edit
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => openDeleteModal(user._id)}>
                                Delete
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
                message="Are you sure you want to delete this user?"
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

export default UserTable;
