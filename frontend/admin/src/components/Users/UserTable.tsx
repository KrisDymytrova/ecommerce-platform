import * as React from "react";
import { useEffect, useState } from "react";
import Table from "../../../src/components/UI/Table";
import Button from "../../../src/components/UI/Button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../../../../shared/redux/slices/usersSlice";
import { RootState, AppDispatch } from "../../../../shared/redux/store";
import { getAuthHeaders } from "../../utils/authUtils";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../../../../shared/apiConfig";
import ConfirmationModal from "../../../../shared/components/UI/ConfirmationModal";

const UserTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { items: users, status, error } = useSelector((state: RootState) => state.users);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    useEffect(() => {
        if (status === "idle" && users.length === 0) {
            dispatch(fetchUsers());
        }
    }, [dispatch, status, users.length]);

    const handleDelete = async () => {
        if (!selectedUserId) return;
        try {
            await dispatch(deleteUser(selectedUserId));
        } catch (error) {
            alert("Error deleting the user");
        } finally {
            setIsModalOpen(false);
            setSelectedUserId(null);
        }
    };

    const openDeleteModal = (id: string) => {
        setSelectedUserId(id);
        setIsModalOpen(true);
    };

    const handleEdit = (id: string) => {
        navigate(`/users/edit/${id}`);
    };

    const handleCreate = async () => {
        if (status === 'loading') return; // Не робити запит, якщо дані завантажуються

        const email = prompt("Enter email of the new user:");
        const username = prompt("Enter username:");
        const role = prompt("Enter the role (admin/user):");

        if (!email || !username || !role) return;

        try {
            const API_URL = await getApiUrl();
            await axios.post(
                `${API_URL}/admin/create-user`,
                { email, username, role },
                { headers: getAuthHeaders() }
            );
            dispatch(fetchUsers());
        } catch (err) {
            alert("Error creating the user");
        }
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
                    <th className="p-3">Created At</th>
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
                        <td className="p-3 text-gray-600">
                            {new Date(user.createdAt).toLocaleDateString()}
                        </td>
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
        </div>
    );
};

export default UserTable;
